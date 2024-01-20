import React from "react";
import { FaPlus } from "react-icons/fa";
import FilterModalList from "./FilterModalList";
import {
  ATTACHMENT_TYPES,
  COMPANIES,
} from "../../../../core/constants/constants";
import { useFilters } from "./useFilters";
import AppliedFiltersList from "./AppliedFiltersList";
import "./filters.css";

function Filters({ filters, setFilters }) {
  const {
    filterModalRef,
    filterModalEnterAnimation,
    toggleFilter,
    filterTypes,
    modalFilters,
    confirmSelection,
    filterModalExitAnimation,
    removeFilterFromTag,
  } = useFilters({ filters, setFilters });

  return (
    <div className="filtersContainer">
      <div className="filterByTextContainer">Filter by:</div>

      <div className="filterByButton" onClick={filterModalEnterAnimation}>
        <FaPlus color={"#242124"} size={10} />
        <div ref={filterModalRef} className="filterModal">
          <div className="filterModalListsContainer">
            <FilterModalList
              data={COMPANIES}
              title={"Company"}
              selectedOptions={modalFilters.companies}
              onClick={(dataItem) => {
                console.log("ToggleClicked1", dataItem);
                toggleFilter({
                  type: filterTypes.COMPANY,
                  value: dataItem,
                });
              }}
            />

            <FilterModalList
              data={ATTACHMENT_TYPES}
              title="Type"
              selectedOptions={modalFilters.types}
              onClick={(dataItem) => {
                console.log("ToggleClicked1", dataItem);
                toggleFilter({
                  type: filterTypes.ATTACHMENT,
                  value: dataItem,
                });
              }}
            />
          </div>

          <div
            onClick={(e) => {
              e.stopPropagation();
              confirmSelection();
              filterModalExitAnimation();
            }}
            className="filterModalConfirmSelectionButton"
          >
            Confirm Selection
          </div>
        </div>
      </div>
      <div className="appliedFiltersContainer">
        <AppliedFiltersList
          data={filters.companies}
          type={"comp."}
          onClick={(dataItem) => {
            removeFilterFromTag({
              type: filterTypes.COMPANY,
              value: dataItem,
            });
          }}
        />

        <AppliedFiltersList
          data={filters.types}
          type={"type"}
          onClick={(dataItem) => {
            removeFilterFromTag({
              type: filterTypes.ATTACHMENT,
              value: dataItem,
            });
          }}
        />
      </div>
    </div>
  );
}

export default Filters;
