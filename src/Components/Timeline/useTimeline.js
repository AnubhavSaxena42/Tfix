import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { DATES, RANGE_OPTIONS, SMALL_WINDOW_WIDTH } from "./constants";
import gsap, { Power3 } from "gsap";
import { SELECTABLE_RANGES } from "../../core/constants/constants";

export const useTimeline = ({
  dateMap,
  setMapLoading,
  selectedRange,
  setSelectedRange,
  mapLoading,
  selectedDate,
  setSelectedDate,
}) => {
  const INITIAL_DELAY = 1.5;
  const [scrollMonthDate, setScrollMonthDate] = useState(dayjs().startOf("M"));
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  const [windowSize, setWindowSize] = useState("Big");
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
    console.log("SpikeSelection:", spike);
    const newScrollMonthDate = findIndexByDate(spike?.startOf("month"));
    console.log("checkthis", {
      spike,
      newScrollMonthDate,
      objectAtSpike: getObjectAtSpike(spike),
      //   newScrollMonthDateData: findDataByIndex(newScrollMonthDate)?.date,

      newScrollMonthDateData: findDataByIndex(newScrollMonthDate),
    });
    if (selectedRange === SELECTABLE_RANGES.THIS_WEEK) {
      listref.current.scrollToItem(
        findIndexByDate(spike?.startOf("week")),
        "start"
      );
      setScrollMonthDate(findDataByIndex(newScrollMonthDate));
    } else if (selectedDate.format("YYYY") !== spike?.format("YYYY")) {
      listref.current.scrollToItem(
        screenSize.width < SMALL_WINDOW_WIDTH
          ? findIndexByDate(spike)
          : newScrollMonthDate,
        "start"
      );
      //   setScrollMonthDate(findDataByIndex(newScrollMonthDate)?.date);

      setScrollMonthDate(findDataByIndex(newScrollMonthDate));
      // } else if (selectedDate.format("MMMM") !== spike?.date?.format("MMMM")) {
    } else if (selectedDate.format("MMMM") !== spike?.format("MMMM")) {
      listref.current.scrollToItem(
        screenSize.width < SMALL_WINDOW_WIDTH
          ? findIndexByDate(spike)
          : newScrollMonthDate,
        "start"
      );
      //   setScrollMonthDate(findDataByIndex(newScrollMonthDate)?.date);

      setScrollMonthDate(findDataByIndex(newScrollMonthDate));
    }
    // setSelectedDate(spike?.date);

    setSelectedDate(spike);
  };

  const scrollToTodaysMonth = () => {
    console.log(
      "ScrollingToTodaysMonth:",
      windowSize,
      windowSize === "Small" ? dayjs() : dayjs().startOf("M")
    );
    listref.current.scrollToItem(
      findIndexByDate(
        screenSize.width < SMALL_WINDOW_WIDTH ? dayjs() : dayjs().startOf("M")
      ),
      "start"
    );
  };

  // const constructDateMap = () => {
  //   setMapLoading(true);
  //   const newDateMap = new Map();
  //   let startDate = DATES.FIRST_DATE.clone();
  //   const lastDate = DATES.LAST_DATE.clone();

  //   while (startDate.isBefore(lastDate) || startDate.isSame(lastDate)) {
  //     let dataObject = false;
  //     if (Math.abs(dayjs().diff(startDate, "day")) <= 90) {
  //       dataObject = {
  //         numberOfRequests: getRandomInt(4, 34),
  //         data: [
  //           { id: 1, status: "Pending" },
  //           { id: 2, status: "Processed" },
  //         ],
  //         date: startDate,
  //       };

  //       newDateMap.set(startDate.format("YYYY-MM-DD"), dataObject);
  //     }
  //     startDate = startDate.add(1, "day");
  //   }
  //   console.log("Final Map:", newDateMap?.size);
  //   setDateMap(newDateMap);

  //   setMapLoading(false);
  // };

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);

  // useEffect(() => {
  //   constructDateMap();
  // }, []);
  useEffect(() => {
    if (mapLoading) return;
    if (selectedRange === SELECTABLE_RANGES.THIS_WEEK) {
      listref.current.scrollToItem(
        findIndexByDate(selectedDate?.startOf("week")),
        "start"
      );
    } else {
      listref.current.scrollToItem(
        findIndexByDate(selectedDate.startOf("month")),
        "start"
      );
    }
  }, [selectedRange, mapLoading]);

  //transition
  //Transition Animations

  const updateDimension = () => {
    const { width, height } = screenSize;

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
        transitionToBigWindowState();
        // transitionToSmallWindowState
      }
    }
  };
  const transitionToBigWindowState = () => {
    gsap.set(listref.current, { overflow: "hidden" });
    // gsap.to(".timelineContainer", {
    //   paddingTop: "10px",
    // });
    // gsap.set(listref.current, {
    //   overflow: "hidden",
    // });
  };
  const transitionToSmallWindowState = () => {
    gsap.to(".timelineContainer", {
      paddingTop: "30px",
    });
    console.log("Trying to set to scroll:", listref.current);
    gsap.set(listref.current, { overflow: "scroll" });
  };

  useEffect(() => {
    setTimeout(() => {
      updateDimension();
    }, 1000);
  }, [screenSize]);

  useEffect(() => {
    console.log("ListscrollingDebug:useEffect Ran", mapLoading, screenSize);
    if (!mapLoading) scrollToTodaysMonth();
    else {
      console.log("ListScrollDebug:Effect ran for current month");
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
    // dateMap,
    mapLoading,
    // setMapLoading,
    windowSize,
    findIndexByDate,
    findDataByIndex,
    listref,
    scrollToNextMonth,
    scrollToPrevMonth,
    scrollMonthDate,
    // setDateMap,
    timelineRef,
    getListWidth,
    getObjectAtSpike,
    selectedDate,
    screenSize,
    getRandomInt,
    onPressSpike,
    selectRange,
  };
};
