import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { SMALL_WINDOW_WIDTH } from "../../../Timeline/constants";

export const useFilters = ({ filters, setFilters, initialDelay }) => {
  const [modalFilters, setModalFilters] = useState({
    types: [],
    companies: [],
  });

  const filterModalRef = useRef(null);
  const [windowSize, setWindowSize] = useState("Big");

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }
  const updateDimension = () => {
    const { width, height } = getCurrentDimension();
    console.log("Updating Dimension Function:", width, windowSize);
    if (width <= SMALL_WINDOW_WIDTH) {
      if (windowSize === "Big") {
        console.log("Setting Window Size to small");
        setWindowSize("Small");
        transitionToSmallWindowState();
      }
    } else {
      if (windowSize === "Small") {
        console.log("Setting window Size to big");
        setWindowSize("Big");
        transitionToSmallWindowState();
      }
    }
  };
  const transitionToSmallWindowState = () => {
    gsap.to(".filterModal", {
      height: "195px",
      width: "190px",
      left: "15px",
    });
    gsap.to(".filterModalListItemCheckbox", {
      height: "12px",
      width: "12px",
    });
    gsap.to(".filterModalListItem", {
      fontSize: "10px",
    });
    gsap.to(".filterModalListTitleContainer", {
      fontSize: "12px",
      height: "18px",
    });
    gsap.to(".filterModalConfirmSelectionButton", {
      borderRadius: "4px",
      fontSize: "12px",
    });
    gsap.to(".filterByButton", {
      height: "10px",
      width: "10px",
    });
    gsap.to(".appliedFilterItem", {
      fontSize: "10px",
    });
  };

  const transitionToBigWindowState = () => {
    transitionToSmallWindowState();
    return;
    gsap.to(".filterModal", {
      height: "300px",
      width: "300px",
      left: "20px",
    });
    gsap.to(".filterModalListItemCheckbox", {
      height: "17px",
      width: "17px",
    });
    gsap.to(".filterModalListItem", {
      fontSize: "14px",
    });
    gsap.to(".filterModalListTitleContainer", {
      fontSize: "16px",
      height: "30px",
    });
    gsap.to(".filterModalConfirmSelectionButton", {
      borderRadius: "8px",
      fontSize: "14px",
    });
    gsap.to(".filterByButton", {
      height: "14px",
      width: "14px",
    });
    gsap.to(".appliedFilterItem", {
      fontSize: "12px",
    });
  };

  const filtersEnterAnimation = () => {
    gsap.fromTo(
      ".filtersContainer",
      {
        opacity: 0,
        // y: 20,
      },
      {
        opacity: 1,
        // y: 0,
        duration: 1,
        ease: "power2.in",
        delay: 6,
        zIndex: 3,
      }
    );
  };

  useEffect(() => {
    window.addEventListener("resize", updateDimension);
    setTimeout(() => {
      updateDimension();
    }, 1000);
    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [windowSize]);

  useEffect(() => {
    filtersEnterAnimation();
  }, []);
  const filterTypes = {
    COMPANY: "COMPANY",
    ATTACHMENT: "ATTACHMENT",
  };

  const toggleFilter = ({ type, value }) => {
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
