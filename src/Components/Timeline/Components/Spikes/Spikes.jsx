import gsap, { Power1 } from "gsap";
import { Power3 } from "gsap";
import React, { useEffect, useRef, useState } from "react";
import "./Spikes.css";
import { generateData } from "../../../../core/helpers/helpers";
import dayjs from "dayjs";
import { SELECTABLE_RANGES } from "../../../../core/constants/constants";
import { Power2 } from "gsap";

const Spikes = ({
  item,
  style,
  getRandomInt,
  selectedRange,
  dateMap,
  getObjectAtSpike,
  selectedDate,
  onPressSpike,
  windowSize,
}) => {
  const [objectAtSpike, setObjectAtSpike] = useState(getObjectAtSpike(item));
  const requestsHolderRef = useRef(null);
  const spikeRef = useRef(null);
  const spikeContainerRef = useRef(null);
  const spikeMonthRef = useRef(null);
  const dayNumberRef = useRef(null);
  console.log("object at spike:", objectAtSpike);
  const loadSpike = () => {
    setTimeout(() => {
      const dataObject = {
        data: generateData(),
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

  const findOutIfItemIsInSelectedRange = () => {
    if (selectedRange === SELECTABLE_RANGES.TODAY) return false;
    if (selectedRange === SELECTABLE_RANGES.THIS_WEEK) {
      const startOfWeekDate1 = dayjs(item).startOf("week");
      const startOfWeekDate2 = dayjs(selectedDate).startOf("week");

      if (startOfWeekDate1.isSame(startOfWeekDate2, "day")) {
        return true;
      } else {
        return false;
      }
    }
    if (selectedRange === SELECTABLE_RANGES.THIS_MONTH) {
      const startOfMonthDate1 = dayjs(item).startOf("month");
      const startOfMonthDate2 = dayjs(selectedDate).startOf("month");
      if (startOfMonthDate1.isSame(startOfMonthDate2, "month")) {
        return true;
      } else {
        return false;
      }
    }
  };

  const findBackgroundForRange = () => {
    switch (selectedRange) {
      case SELECTABLE_RANGES.THIS_MONTH:
        return "linear-gradient(80deg, rgba(255,128,1,1), rgba(255,255,255,1) 99.99%)";
      case SELECTABLE_RANGES.THIS_WEEK:
        return "linear-gradient(80deg, rgb(51,205,50,1), rgba(255,255,255,1) 99.99%)";
      default:
        return;
    }
  };

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
        backgroundColor: objectAtSpike?.data?.length > 0 ? "#fbf2a4" : "none",
        color: "black",
        fontStyle: "bold",
      });
      gsap.to(dayNumberRef.current, { y: 10, duration: 0.2 });
      gsap.to(spikeMonthRef.current, { y: 10, duration: 0.2 });
      let b1 =
        "linear-gradient(0deg, rgba(255,255,255,1), rgba(255,255,255,1) 100.00%)";
      let b2 =
        "linear-gradient(80deg, rgba(37,98,255,1), rgba(255,255,255,1) 99.99%)";
      gsap
        .timeline({ repeat: 0, yoyo: false })
        .add(gsap.set(spikeRef.current, { background: b1 }))
        .add(
          gsap.to(spikeRef.current, {
            ease: Power2.easeInOut,
            duration: 0.85,
            background: b2,
          })
        );
    } else {
      const isItemInSelectedRange = findOutIfItemIsInSelectedRange();
      gsap.to(spikeRef.current, { scaleY: 1, duration: 0.2 });
      gsap.to(requestsHolderRef.current, { y: 0, duration: 0.2 });
      gsap.to(dayNumberRef.current, { y: 0, duration: 0.2 });
      gsap.to(spikeMonthRef.current, { y: 0, duration: 0.2 });
      let b1 =
        "linear-gradient(0deg, rgba(255,255,255,1), rgba(255,255,255,1) 100.00%)";
      let b2 =
        "linear-gradient(80deg, rgba(37,98,255,1), rgba(255,255,255,1) 99.99%)";
      if (isItemInSelectedRange) {
        gsap
          .timeline({ repeat: 0, yoyo: false })
          .add(gsap.set(spikeRef.current, { background: b1 }))
          .add(
            gsap.to(spikeRef.current, {
              ease: Power2.easeInOut,
              duration: 0.85,
              background: findBackgroundForRange(),
            })
          );
      }
    }
  }, [selectedDate?.format("YYYY/MM/DD")]);

  useEffect(() => {
    const currentSpike = spikeRef.current;
    const currentRequests = requestsHolderRef.current;
    const spikeContainer = spikeContainerRef.current;
    const spikeMonth = spikeMonthRef.current;
    const dayNumber = dayNumberRef.current;
    spikeContainerRef.current.addEventListener("mouseover", () => {
      const prev = spikeContainerRef.current.previousElementSibling;
      const next = spikeContainerRef.current.nextElementSibling;
      const [nextRequests, nextSpike, nextDayNumber, nextSpikeMonth] =
        next.children;
      const [prevRequests, prevSpike, prevDayNumber, prevSpikeMonth] =
        prev.children;
      if (item?.format("YYYY-MM-DD") !== selectedDate.format("YYYY-MM-DD")) {
        gsap.to(spikeRef.current, { scaleY: 2, duration: 0.2 });
        gsap.to(requestsHolderRef.current, { y: -10, duration: 0.2 });
        gsap.to(dayNumberRef.current, { y: 10, duration: 0.2 });
        gsap.to(spikeMonthRef.current, { y: 10, duration: 0.2 });
      }
      if (
        item?.add(1, "day").format("YYYY-MM-DD") !==
        selectedDate.format("YYYY-MM-DD")
      ) {
        gsap.to(nextSpike, { scaleY: 1.5, duration: 0.2 });
        gsap.to(nextRequests, { y: -5, duration: 0.2 });
        gsap.to(nextDayNumber, { y: 5, duration: 0.2 });
        gsap.to(nextSpikeMonth, { y: 5, duration: 0.2 });
      }

      if (
        item?.subtract(1, "day").format("YYYY-MM-DD") !==
        selectedDate.format("YYYY-MM-DD")
      ) {
        gsap.to(prevSpike, { scaleY: 1.5, duration: 0.2 });
        gsap.to(prevRequests, { y: -5, duration: 0.2 });
        gsap.to(prevDayNumber, { y: 5, duration: 0.2 });
        gsap.to(prevSpikeMonth, { y: 5, duration: 0.2 });
      }
    });
    spikeContainerRef.current.addEventListener("mouseout", () => {
      const prev = spikeContainerRef.current.previousElementSibling;
      const next = spikeContainerRef.current.nextElementSibling;
      const [nextRequests, nextSpike, nextDayNumber, nextSpikeMonth] =
        next.children;
      const [prevRequests, prevSpike, prevDayNumber, prevSpikeMonth] =
        prev.children;
      if (item?.format("YYYY-MM-DD") !== selectedDate.format("YYYY-MM-DD")) {
        gsap.to(spikeRef.current, { scaleY: 1, duration: 0.2 });
        gsap.to(requestsHolderRef.current, { y: 0, duration: 0.2 });
        gsap.to(dayNumberRef.current, { y: 0, duration: 0.2 });
        gsap.to(spikeMonthRef.current, { y: 0, duration: 0.2 });
      }
      if (
        item?.add(1, "day").format("YYYY-MM-DD") !==
        selectedDate.format("YYYY-MM-DD")
      ) {
        gsap.to(nextSpike, { scaleY: 1, duration: 0.2 });
        gsap.to(nextRequests, { y: 0, duration: 0.2 });
        gsap.to(nextDayNumber, { y: 0, duration: 0.2 });
        gsap.to(nextSpikeMonth, { y: 0, duration: 0.2 });
      }
      if (
        item?.subtract(1, "day").format("YYYY-MM-DD") !==
        selectedDate.format("YYYY-MM-DD")
      ) {
        gsap.to(prevSpike, { scaleY: 1, duration: 0.2 });
        gsap.to(prevRequests, { y: 0, duration: 0.2 });
        gsap.to(prevDayNumber, { y: 0, duration: 0.2 });
        gsap.to(prevSpikeMonth, { y: 0, duration: 0.2 });
      }
    });
    return () => {
      gsap.killTweensOf(currentSpike);
      gsap.killTweensOf(currentRequests);
      gsap.killTweensOf(spikeContainer);
      gsap.killTweensOf(dayNumber);
    };
  }, [spikeRef, requestsHolderRef]);

  const transitionToBigWindowState = () => {
    transitionToSmallWindowState();
    return;
    console.log("SpikeEffectCheck:setting big");
    gsap.set(spikeRef.current, {
      height: "30px",
    });
  };

  const transitionToSmallWindowState = () => {
    console.log("SpikeEffectCheck:setting small");
    gsap.set(spikeRef.current, {
      height: "20px",
    });
  };

  useEffect(() => {
    console.log("SpikeEffectCheck", windowSize);
    if (windowSize === "Small") {
      console.log("Setting Window Size to big");
      transitionToSmallWindowState();
    } else {
      console.log("Setting window Size to small");
      transitionToSmallWindowState();
    }
  }, [windowSize]);

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
      {objectAtSpike?.data?.length > 0 ? (
        <div ref={requestsHolderRef} className="requestsHolder">
          {objectAtSpike?.data?.length}
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

      <div ref={spikeMonthRef} className="spikeMonth">
        {item?.date() === 1 ? `${item?.format("MMMM").slice(0, 3)}` : ``}
      </div>
    </div>
  );
};

export default Spikes;
