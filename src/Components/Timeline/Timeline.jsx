import React, { useEffect, useRef, useState } from "react";
import { FixedSizeList as List } from "react-window";
import dayjs from "dayjs";
import "./timeline.css";
import { RxCaretRight, RxCaretLeft } from "react-icons/rx";
import { useTimeline } from "./useTimeline";
import { RANGE_OPTIONS, SMALL_WINDOW_WIDTH } from "./constants";
import gsap, { Power3 } from "gsap";
import Spikes from "./Components/Spikes/Spikes";

function Timeline({
  dateMap,
  setDateMap,
  setMapLoading,
  mapLoading,
  selectedRange,
  setSelectedRange,
  selectedDate,
  setSelectedDate,
}) {
  const {
    listref,
    getListWidth,
    scrollMonthDate,
    onPressSpike,
    scrollToNextMonth,
    scrollToPrevMonth,
    screenSize,
    findDataByIndex,
    getRandomInt,
    timelineRef,
    getObjectAtSpike,
  } = useTimeline({
    dateMap,
    mapLoading,
    setMapLoading,
    selectedRange,
    setSelectedRange,
    selectedDate,
    setSelectedDate,
  });

  //Transition Animations
  const [windowSize, setWindowSize] = useState("Big");

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
      }
    }
  };
  const transitionToBigWindowState = () => {
    gsap.to(".timelineContainer", {
      paddingTop: "10px",
    });
  };
  const transitionToSmallWindowState = () => {
    gsap.to(".timelineContainer", {
      paddingTop: "30px",
    });
  };

  useEffect(() => {
    updateDimension();
  }, [screenSize]);

  return (
    <div ref={timelineRef} className="timelineContainer">
      <div>
        {/* Month scroller */}
        {!mapLoading && (
          <div className="monthScrollerContainer">
            <RxCaretLeft
              onClick={scrollToPrevMonth}
              // style={}
              className="monthScrollCursors"
              size={18}
            />
            <div className="monthScrollerText">
              {scrollMonthDate.format("MMMM")} {scrollMonthDate.format("YYYY")}
            </div>
            <RxCaretRight
              onClick={scrollToNextMonth}
              className="monthScrollCursors"
              size={18}
            />
          </div>
        )}
        {!mapLoading && (
          <List
            ref={listref}
            height={120}
            itemCount={29221}
            itemSize={25}
            layout="horizontal"
            width={getListWidth()}
            style={{ overflow: "hidden", scrollBehavior: "smooth" }}
          >
            {({ index, style }) => {
              return (
                <Spikes
                  item={findDataByIndex(index)}
                  style={style}
                  dateMap={dateMap}
                  getRandomInt={getRandomInt}
                  selectedDate={selectedDate}
                  getObjectAtSpike={getObjectAtSpike}
                  onPressSpike={onPressSpike}
                  windowSize={windowSize}
                />
              );
            }}
          </List>
        )}
      </div>
    </div>
  );
}

export default Timeline;
