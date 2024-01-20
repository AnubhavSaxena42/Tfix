import React from "react";
import "./statistics.css";
import StatsSVG from "./Components/StatsSVG/StatsSVG";
import Filters from "./Components/Filters/Filters";
import { useStatistics } from "./useStatistics";

function Statistics({
  dateMap,
  mapLoading,
  selectedRange,
  setSelectedRange,
  selectedDate,
}) {
  const {
    statsRef,
    filters,
    setFilters,
    INITIAL_DELAY,
    calculateRequestsData,
    calculateThisMonthCounterValue,
    calculateThisMonthLabel,
    calculateThisWeekCounterValue,
    calculateThisWeekLabel,
  } = useStatistics({ mapLoading, selectedDate, dateMap, selectedRange });

  return (
    <div ref={statsRef} className="statisticsContainer">
      <Filters
        filters={filters}
        setFilters={setFilters}
        initialDelay={INITIAL_DELAY}
      />
      <StatsSVG
        statsRef={statsRef}
        dateMap={dateMap}
        selectedDate={selectedDate}
        mapLoading={mapLoading}
        INITIAL_DELAY={INITIAL_DELAY}
        selectedRange={selectedRange}
        setSelectedRange={setSelectedRange}
        calculateRequestsData={calculateRequestsData}
        calculateThisMonthCounterValue={calculateThisMonthCounterValue}
        calculateThisMonthLabel={calculateThisMonthLabel}
        calculateThisWeekCounterValue={calculateThisWeekCounterValue}
        calculateThisWeekLabel={calculateThisWeekLabel}
      />
    </div>
  );
}

export default Statistics;
