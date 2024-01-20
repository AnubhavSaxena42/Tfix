import React from "react";
import { FaCheck } from "react-icons/fa";
import "./filters.css";

function FilterModalList({ data, onClick, selectedOptions, title }) {
  return (
    <div className="filterModalListContainer">
      <div className="filterModalListTitleContainer">{title}</div>
      <div className="filterModalListScrollView">
        {data.map((dataItem) => (
          <div
            onClick={() => onClick(dataItem)}
            key={dataItem}
            className="filterModalListItem"
          >
            {dataItem}
            <div className="filterModalListItemCheckbox">
              {selectedOptions.includes(dataItem) && (
                <FaCheck size={10} color={"white"} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterModalList;
