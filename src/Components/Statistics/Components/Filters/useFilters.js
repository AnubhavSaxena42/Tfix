import gsap from "gsap";
import { useRef, useState } from "react";

export const useFilters = ({ filters, setFilters }) => {
  const [modalFilters, setModalFilters] = useState({
    types: [],
    companies: [],
  });

  const filterModalRef = useRef(null);

  const filterTypes = {
    COMPANY: "COMPANY",
    ATTACHMENT: "ATTACHMENT",
  };

  const toggleFilter = ({ type, value }) => {
    console.log("toggleClicked", type, value);
    switch (type) {
      case filterTypes.COMPANY:
        if (modalFilters.companies.includes(value)) {
          const newCompanies = modalFilters.companies.filter(
            (company) => company !== value
          );
          setModalFilters({
            ...modalFilters,
            companies: newCompanies,
          });
          return {
            ...modalFilters,
            companies: newCompanies,
          };
        } else {
          const newCompanies = [...modalFilters.companies, value];
          setModalFilters({
            ...modalFilters,
            companies: newCompanies,
          });
          return {
            ...modalFilters,
            companies: newCompanies,
          };
        }

      case filterTypes.ATTACHMENT:
        if (modalFilters.types.includes(value)) {
          const newTypes = modalFilters.types.filter((type) => type !== value);
          setModalFilters({
            ...modalFilters,
            types: newTypes,
          });
          return {
            ...modalFilters,
            types: newTypes,
          };
        } else {
          const newTypes = [...modalFilters.types, value];
          setModalFilters({
            ...modalFilters,
            types: newTypes,
          });
          return {
            ...modalFilters,
            types: newTypes,
          };
        }

      default:
        return;
    }
  };

  const confirmSelection = () => {
    console.log("FiltersDebug:setFiltersCalled", modalFilters);
    setFilters(modalFilters);
  };

  const removeFilterFromTag = ({ type, value }) => {
    console.log("RemoveFilterClicked", type, value);
    const newFilters = toggleFilter({ type, value });
    setFilters(newFilters);
  };

  const filterModalEnterAnimation = () => {
    const modal = filterModalRef.current;
    if (modal) {
      gsap.to(modal, {
        visibility: "visible",
        opacity: 1,
        duration: 0.5,
      });
    }
  };

  const filterModalExitAnimation = () => {
    console.log("FilterModalExitAnimationDebug:Start", filterModalRef.current);
    const modal = filterModalRef.current;
    if (modal) {
      console.log("FilterModalExitAnimationDebug:BeforeGSAP");
      gsap.to(modal, {
        opacity: 0,
        duration: 0.5,
      });

      console.log("FilterModalExitAnimationDebug:afterGSAP");
      gsap.set(modal, {
        visibility: "hidden",
        delay: 0.5,
      });
    }
  };

  return {
    filterModalRef,
    filterModalEnterAnimation,
    toggleFilter,
    filterTypes,
    modalFilters,
    confirmSelection,
    filterModalExitAnimation,
    removeFilterFromTag,
  };
};
