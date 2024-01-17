import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { DATES, RANGE_OPTIONS } from "./constants";
import gsap, { Power3 } from "gsap";

export const useTimeline = () => {
  const INITIAL_DELAY = 1.5;
  const [dateMap, setDateMap] = useState(false);
  const [selectedRange, setSelectedRange] = useState(false);

  const [viewingRange, setViewingRange] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [scrollMonthDate, setScrollMonthDate] = useState(dayjs().startOf("M"));
  const [mapLoading, setMapLoading] = useState(true);
  const [screenSize, setScreenSize] = useState(getCurrentDimension());

  let listref = useRef(null);
  let timelineRef = useRef(null);

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const getListWidth = () => {
    return screenSize.width - (screenSize.width * 20) / 100;
  };

  const selectRange = ({ option }) => {
    switch (option) {
      case RANGE_OPTIONS.MONTH:
        console.log("Month Selected");
        listref.current.scrollToItem(
          findIndexByDate(selectedDate.startOf("month")),
          "smart"
        );
        return;
      case RANGE_OPTIONS.WEEK:
        console.log("Week Selected");
        listref.current.scrollToItem(
          findIndexByDate(selectedDate.startOf("week")),
          "smart"
        );
        return;
      default:
        return;
    }
  };

  const scrollToPrevMonth = () => {
    const firstDateOfPrevMonth = scrollMonthDate
      .subtract(1, "month")
      .startOf("month");
    listref.current.scrollToItem(
      findIndexByDate(firstDateOfPrevMonth),
      "start"
    );
    setScrollMonthDate(firstDateOfPrevMonth);
  };

  const scrollToNextMonth = () => {
    const firstDateOfNextMonth = scrollMonthDate
      .add(1, "month")
      .startOf("month");
    listref.current.scrollToItem(
      findIndexByDate(firstDateOfNextMonth),
      "start"
    );
    setScrollMonthDate(firstDateOfNextMonth);
  };

  const findIndexByDate = (indexOfDate) => {
    const index = indexOfDate.diff(DATES.FIRST_DATE, "day");
    return index;
  };

  const findDataByIndex = (index) => {
    // return dateMap.get(DATES.FIRST_DATE.add(index, "day").format("YYYY-MM-DD"));
    return DATES.FIRST_DATE.add(index, "day");
  };

  const getObjectAtSpike = (spike) => {
    return dateMap.get(spike?.format("YYYY-MM-DD"));
  };

  const onPressSpike = (spike) => {
    // const newScrollMonthDate = findIndexByDate(spike?.date?.startOf("month"));

    const newScrollMonthDate = findIndexByDate(spike?.startOf("month"));
    console.log("checkthis", {
      spike,
      newScrollMonthDate,
      objectAtSpike: getObjectAtSpike(spike),
      //   newScrollMonthDateData: findDataByIndex(newScrollMonthDate)?.date,

      newScrollMonthDateData: findDataByIndex(newScrollMonthDate),
    });
    if (selectedDate.format("YYYY") !== spike?.format("YYYY")) {
      listref.current.scrollToItem(newScrollMonthDate, "start");
      //   setScrollMonthDate(findDataByIndex(newScrollMonthDate)?.date);

      setScrollMonthDate(findDataByIndex(newScrollMonthDate));
      // } else if (selectedDate.format("MMMM") !== spike?.date?.format("MMMM")) {
    } else if (selectedDate.format("MMMM") !== spike?.format("MMMM")) {
      listref.current.scrollToItem(newScrollMonthDate, "start");
      //   setScrollMonthDate(findDataByIndex(newScrollMonthDate)?.date);

      setScrollMonthDate(findDataByIndex(newScrollMonthDate));
    }
    // setSelectedDate(spike?.date);

    setSelectedDate(spike);
  };

  const scrollToTodaysMonth = () => {
    listref.current.scrollToItem(
      findIndexByDate(dayjs().startOf("M")),
      "start"
    );
  };

  const constructDateMap = () => {
    setMapLoading(true);
    const newDateMap = new Map();
    let startDate = DATES.FIRST_DATE.clone();
    const lastDate = DATES.LAST_DATE.clone();

    while (startDate.isBefore(lastDate) || startDate.isSame(lastDate)) {
      let dataObject = false;
      if (Math.abs(dayjs().diff(startDate, "day")) <= 90) {
        dataObject = {
          numberOfRequests: getRandomInt(4, 34),
          data: [
            { id: 1, status: "Pending" },
            { id: 2, status: "Processed" },
          ],
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
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);

  useEffect(() => {
    constructDateMap();
  }, []);

  useEffect(() => {
    if (!mapLoading) scrollToTodaysMonth();
    else {
      gsap.fromTo(
        timelineRef.current,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          duration: 1,
          opacity: 1,
          delay: INITIAL_DELAY,
          ease: "power3.in",
        }
      );
    }
  }, [mapLoading]);

  return {
    scrollToTodaysMonth,
    dateMap,
    mapLoading,
    setMapLoading,
    findIndexByDate,
    findDataByIndex,
    listref,
    scrollToNextMonth,
    scrollToPrevMonth,
    scrollMonthDate,
    setDateMap,
    timelineRef,
    getListWidth,
    getObjectAtSpike,
    selectedDate,
    screenSize,
    getRandomInt,
    onPressSpike,
    selectRange,
    viewingRange,
  };
};
