import React, { useEffect, useRef, useState } from "react";
import { FixedSizeList as List } from "react-window";
import dayjs from "dayjs";
import "./timeline.css";
import { RxCaretRight, RxCaretLeft } from "react-icons/rx";
import { useTimeline } from "./useTimeline";
import { RANGE_OPTIONS } from "./constants";
import gsap, { Power3 } from "gsap";

function Timeline() {
  const {
    dateMap,
    mapLoading,
    listref,
    getListWidth,
    scrollMonthDate,
    selectedDate,
    onPressSpike,
    findIndexByDate,
    scrollToNextMonth,
    scrollToPrevMonth,
    findDataByIndex,
    viewingRange,
    getRandomInt,
    selectRange,
    timelineRef,
    getObjectAtSpike,
  } = useTimeline();

  const Spikes = ({ item, style }) => {
    console.log("spikeItem", item);
    const [objectAtSpike, setObjectAtSpike] = useState(getObjectAtSpike(item));
    const requestsHolderRef = useRef(null);
    const spikeRef = useRef(null);
    const spikeContainerRef = useRef(null);
    const dayNumberRef = useRef(null);

    const loadSpike = () => {
      setTimeout(() => {
        const dataObject = {
          numberOfRequests: getRandomInt(0, 8),
          data: [
            { id: 1, status: "Pending" },
            { id: 2, status: "Processed" },
          ],
          date: item,
        };
        console.log("callback called:Debounce this");
        setObjectAtSpike(dataObject);
        gsap.killTweensOf(spikeRef.current);
        gsap.killTweensOf(requestsHolderRef.current);
        dateMap.set(item.format("YYYY-MM-DD"), dataObject);
      }, 4000);
    };

    useEffect(() => {
      if (objectAtSpike) {
        gsap.killTweensOf(spikeRef.current);
        gsap.killTweensOf(requestsHolderRef.current);
        return;
      }
      function getRandomFloat(min, max) {
        return Math.random() * (max - min) + min;
      }
      const yoyoVal = getRandomFloat(1.5, 1.2);
      loadSpike();
      gsap.fromTo(
        spikeRef.current,
        { scaleY: 1 },
        {
          scaleY: yoyoVal,
          duration: 0.5,
          ease: Power3.easeOut,
          yoyo: true,
          repeat: -1,
        }
      );
      gsap.fromTo(
        requestsHolderRef.current,
        { translateY: yoyoVal },
        {
          translateY: 0,
          duration: 0.5,
          ease: Power3.easeOut,
          yoyo: true,
          repeat: -1,
        }
      );
    }, [objectAtSpike]);

    useEffect(() => {
      if (item?.format("YYYY-MM-DD") === selectedDate.format("YYYY-MM-DD")) {
        console.log("Selected Date UseEffect Ran", item, selectedDate);

        gsap.to(spikeRef.current, {
          scaleY: 2,
          duration: 0.2,
        });

        gsap.to(requestsHolderRef.current, {
          y: -10,
          duration: 0.2,
          backgroundColor:
            objectAtSpike?.numberOfRequests > 0 ? "#fbf2a4" : "none",
          color: "black",
        });
        gsap.to(dayNumberRef.current, { y: 10, duration: 0.2 });
        let b1 =
          "linear-gradient(0deg, rgba(255,255,255,1), rgba(255,255,255,1) 100.00%)";
        let b2 =
          "linear-gradient(80deg, rgba(37,98,255,1), rgba(255,255,255,1) 99.99%)";
        gsap
          .timeline({ repeat: 0, yoyo: false })
          .add(gsap.set(spikeRef.current, { background: b1 }))
          .add(
            gsap.to(spikeRef.current, {
              ease: "ease",
              duration: 0.7,
              background: b2,
            })
          );
      } else {
        gsap.to(spikeRef.current, { scaleY: 1, duration: 0.2 });
        gsap.to(requestsHolderRef.current, { y: 0, duration: 0.2 });
        gsap.to(dayNumberRef.current, { y: 0, duration: 0.2 });
      }
    }, [selectedDate]);

    useEffect(() => {
      const currentSpike = spikeRef.current;
      const currentRequests = requestsHolderRef.current;
      const spikeContainer = spikeContainerRef.current;
      const dayNumber = dayNumberRef.current;
      spikeContainerRef.current.addEventListener("mouseover", () => {
        const prev = spikeContainerRef.current.previousElementSibling;
        const next = spikeContainerRef.current.nextElementSibling;
        const [nextRequests, nextSpike, nextDayNumber] = next.children;
        const [prevRequests, prevSpike, prevDayNumber] = prev.children;
        if (item?.format("YYYY-MM-DD") !== selectedDate.format("YYYY-MM-DD")) {
          gsap.to(spikeRef.current, { scaleY: 2, duration: 0.2 });
          gsap.to(requestsHolderRef.current, { y: -10, duration: 0.2 });
          gsap.to(dayNumberRef.current, { y: 10, duration: 0.2 });
        }
        if (
          item?.add(1, "day").format("YYYY-MM-DD") !==
          selectedDate.format("YYYY-MM-DD")
        ) {
          gsap.to(nextSpike, { scaleY: 1.5, duration: 0.2 });
          gsap.to(nextRequests, { y: -5, duration: 0.2 });
          gsap.to(nextDayNumber, { y: 5, duration: 0.2 });
        }

        if (
          item?.subtract(1, "day").format("YYYY-MM-DD") !==
          selectedDate.format("YYYY-MM-DD")
        ) {
          gsap.to(prevSpike, { scaleY: 1.5, duration: 0.2 });
          gsap.to(prevRequests, { y: -5, duration: 0.2 });
          gsap.to(prevDayNumber, { y: 5, duration: 0.2 });
        }
      });
      spikeContainerRef.current.addEventListener("mouseout", () => {
        const prev = spikeContainerRef.current.previousElementSibling;
        const next = spikeContainerRef.current.nextElementSibling;
        const [nextRequests, nextSpike, nextDayNumber] = next.children;
        const [prevRequests, prevSpike, prevDayNumber] = prev.children;
        if (item?.format("YYYY-MM-DD") !== selectedDate.format("YYYY-MM-DD")) {
          gsap.to(spikeRef.current, { scaleY: 1, duration: 0.2 });
          gsap.to(requestsHolderRef.current, { y: 0, duration: 0.2 });
          gsap.to(dayNumberRef.current, { y: 0, duration: 0.2 });
        }
        if (
          item?.add(1, "day").format("YYYY-MM-DD") !==
          selectedDate.format("YYYY-MM-DD")
        ) {
          gsap.to(nextSpike, { scaleY: 1, duration: 0.2 });
          gsap.to(nextRequests, { y: 0, duration: 0.2 });
          gsap.to(nextDayNumber, { y: 0, duration: 0.2 });
        }
        if (
          item?.subtract(1, "day").format("YYYY-MM-DD") !==
          selectedDate.format("YYYY-MM-DD")
        ) {
          gsap.to(prevSpike, { scaleY: 1, duration: 0.2 });
          gsap.to(prevRequests, { y: 0, duration: 0.2 });
          gsap.to(prevDayNumber, { y: 0, duration: 0.2 });
        }
      });
      return () => {
        gsap.killTweensOf(currentSpike);
        gsap.killTweensOf(currentRequests);
        gsap.killTweensOf(spikeContainer);
        gsap.killTweensOf(dayNumber);
      };
    }, [spikeRef, requestsHolderRef]);

    return (
      <div
        ref={spikeContainerRef}
        onClick={onPressSpike.bind({}, item)}
        style={style}
        className={
          item?.format("YYYY-MM-DD") === selectedDate.format("YYYY-MM-DD")
            ? "spikeContainer "
            : "spikeContainer"
        }
      >
        {objectAtSpike?.numberOfRequests > 0 ? (
          <div ref={requestsHolderRef} className="requestsHolder">
            {objectAtSpike?.numberOfRequests}
          </div>
        ) : (
          <div ref={requestsHolderRef} className="requestsHolder noBorder">
            {" "}
          </div>
        )}
        <div
          ref={spikeRef}
          className={
            item?.format("YYYY-MM-DD") === selectedDate.format("YYYY-MM-DD")
              ? "spike "
              : "spike"
          }
        ></div>
        <div ref={dayNumberRef} className="dayNumber">
          {item?.date()}
        </div>
      </div>
    );
  };

  return (
    <div
      ref={timelineRef}
      style={{
        opacity: 1,
        height: 200,
        width: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        {/* Month scroller */}
        {!mapLoading && (
          <div
            style={{
              color: "white",
              flex: 1,
              alignItems: "center",
              // backgroundColor: "orangered",
              fontSize: 20,
              display: "flex",
              marginBottom: 10,
            }}
          >
            <RxCaretLeft
              onClick={scrollToPrevMonth}
              style={{ cursor: "pointer" }}
              size={25}
            />
            <div className="monthScrollerText">
              {scrollMonthDate.format("MMMM")} {scrollMonthDate.format("YYYY")}
            </div>
            <RxCaretRight
              onClick={scrollToNextMonth}
              style={{ cursor: "pointer" }}
              size={25}
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
              return <Spikes item={findDataByIndex(index)} style={style} />;
            }}
          </List>
        )}
      </div>
    </div>
  );
}

export default Timeline;
