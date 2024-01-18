import { useEffect, useState } from "react";
import { DATES } from "./Components/Timeline/constants";
import dayjs from "dayjs";
import { generateData, getRandomInt } from "./core/helpers/helpers";

export const useDashboard = () => {
  const [dateMap, setDateMap] = useState(false);
  const [mapLoading, setMapLoading] = useState(true);
  const [selectedRange, setSelectedRange] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const constructDateMap = () => {
    setMapLoading(true);
    const newDateMap = new Map();
    let startDate = DATES.FIRST_DATE.clone();
    const lastDate = DATES.LAST_DATE.clone();

    while (startDate.isBefore(lastDate) || startDate.isSame(lastDate)) {
      let dataObject = false;
      if (Math.abs(dayjs().diff(startDate, "day")) <= 90) {
        dataObject = {
          data: generateData(),
          date: startDate,
        };

        newDateMap.set(startDate.format("YYYY-MM-DD"), dataObject);
      }
      startDate = startDate.add(1, "day");
    }
    console.log("Final Map:", newDateMap?.size);
    setDateMap(newDateMap);

    setMapLoading(false);
  };

  useEffect(() => {
    constructDateMap();
  }, []);

  return {
    dateMap,
    selectedDate,
    setSelectedDate,
    mapLoading,
    setDateMap,
    setMapLoading,
    selectedRange,
    setSelectedRange,
  };
};
