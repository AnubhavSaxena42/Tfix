import gsap, { Power2, Power3 } from "gsap";
import React, { useEffect, useRef, useState } from "react";
import OptionBox from "./Components/OptionBox/OptionBox";
import DataBox from "./Components/DataBox/DataBox";

function Statistics() {
  const INITIAL_DELAY = 2.3;
  const statsRef = useRef(null);
  const redPath = useRef(null);
  const pendingThisWeekPath = useRef(null);
  const pendingThisMonthPath = useRef(null);
  const bluePath = useRef(null);
  const processedThisWeekPath = useRef(null);
  const processedThisMonthPath = useRef(null);
  const topCircleRef = useRef(null);
  const thisWeekCircleRef = useRef(null);
  const thisMonthCircleRef = useRef(null);
  const processedCircleRef = useRef(null);
  const pendingCircleRef = useRef(null);
  const todayBox = useRef(null);
  const thisMonthBox = useRef(null);
  const thisWeekBox = useRef(null);
  const pendingTodayPolygon = useRef(null);
  const pendingThisMonthPolygon1 = useRef(null);
  const pendingThisMonthPolygon2 = useRef(null);
  const pendingThisMonthPolygon3 = useRef(null);
  const pendingThisWeekPolygon1 = useRef(null);
  const pendingThisWeekPolygon2 = useRef(null);
  const pendingThisWeekPolygon3 = useRef(null);
  const pendingThisWeekPolygon4 = useRef(null);
  const processedTodayPolygon = useRef(null);
  const processedThisWeekPolygon1 = useRef(null);
  const processedThisWeekPolygon2 = useRef(null);
  const processedThisMonthPolygon1 = useRef(null);
  const processedThisMonthPolygon2 = useRef(null);
  const processedThisMonthPolygon3 = useRef(null);
  const processedThisMonthPolygon4 = useRef(null);

  const [divPosition, setDivPosition] = useState({ top: 0, left: 0 });
  const [thisWeekPosition, setThisWeekPosition] = useState({ top: 0, left: 0 });
  const [thisMonthPosition, setThisMonthPosition] = useState({
    top: 0,
    left: 0,
  });
  const [processedPosition, setProcessedPosition] = useState({
    top: 0,
    left: 0,
  });
  const [pendingPosition, setPendingPosition] = useState({
    top: 0,
    left: 0,
  });

  let redProgress = 0;
  let pendingThisWeekProgress = 0;
  let pendingThisMonthProgress = 0;
  let redTime = Math.PI / 2;
  let pendingThisWeekTime = Math.PI / 2;
  let pendingThisMonthTime = Math.PI / 2;
  let redReqId = null;
  let pendingThisWeekReqId = null;
  let pendingThisMonthReqId = null;
  let blueProgress = 0;
  let processedThisWeekProgress = 0;
  let processedThisMonthProgress = 0;
  let blueTime = Math.PI / 2;
  let processedThisWeekTime = Math.PI / 2;
  let processedThisMonthTime = Math.PI / 2;
  let blueReqId = null;
  let processedThisWeekReqId = null;
  let processedThisMonthReqId = null;
  let redMouseStartY = 0;
  let pendingThisWeekMouseStartY = 0;
  let pendingThisMonthMouseStartY = 0;
  let blueMouseStartY = 0;
  let processedThisWeekMouseStartY = 0;
  let processedThisMonthMouseStartY = 0;

  useEffect(() => {
    setRedPath(redProgress);
    setBluePath(blueProgress);
    setPendingThisWeekPath(pendingThisWeekProgress);
    setPendingThisMonthPath(pendingThisMonthProgress);
    setProcessedThisWeekPath(processedThisWeekProgress);
    setProcessedThisMonthPath(processedThisMonthProgress);
  }, []);
  const lerp = (x, y, a) => x * (1 - a) + y * a;

  const calculatePosition = () => {
    // Get the bounding box of the circle
    const circleRect = topCircleRef.current.getBoundingClientRect();

    // Calculate the position relative to the window

    const position = {
      top: circleRect.top + window.scrollY,
      left: circleRect.left + window.scrollX,
    };

    console.log("PositionDebug:", {
      position,
      circleRect,
      scrollY: window.scrollY,
      scrollX: window.scrollX,
    });
    // Set the position in the state
    setDivPosition(position);
  };

  const calculateThisWeekPosition = () => {
    // Get the bounding box of the circle
    const circleRect = thisWeekCircleRef.current.getBoundingClientRect();

    // Calculate the position relative to the window
    const position = {
      top: circleRect.top + window.scrollY,
      left: circleRect.left + window.scrollX,
    };

    // Set the position in the state
    setThisWeekPosition(position);
  };

  const calculateProcessedPosition = () => {
    // Get the bounding box of the circle
    const circleRect = processedCircleRef.current.getBoundingClientRect();

    // Calculate the position relative to the window
    const position = {
      top: circleRect.top + window.scrollY,
      left: circleRect.left + window.scrollX,
    };

    // Set the position in the state
    setProcessedPosition(position);
  };

  const calculateThisMonthPosition = () => {
    // Get the bounding box of the circle
    const circleRect = thisMonthCircleRef.current.getBoundingClientRect();

    // Calculate the position relative to the window
    const position = {
      top: circleRect.top + window.scrollY,
      left: circleRect.left + window.scrollX,
    };

    // Set the position in the state
    setThisMonthPosition(position);
  };

  const calculatePendingPosition = () => {
    // Get the bounding box of the circle
    const circleRect = pendingCircleRef.current.getBoundingClientRect();

    // Calculate the position relative to the window
    const position = {
      top: circleRect.top + window.scrollY,
      left: circleRect.left + window.scrollX,
    };

    // Set the position in the state
    setPendingPosition(position);
  };

  useEffect(() => {
    // const calculatePosition = () => {
    //   // Get the bounding box of the circle
    //   const circleRect = topCircleRef.current.getBoundingClientRect();

    //   // Calculate the position relative to the window

    //   const position = {
    //     top: circleRect.top + window.scrollY,
    //     left: circleRect.left + window.scrollX,
    //   };

    //   console.log("PositionDebug:", {
    //     position,
    //     circleRect,
    //     scrollY: window.scrollY,
    //     scrollX: window.scrollX,
    //   });
    //   // Set the position in the state
    //   setDivPosition(position);
    // };

    // const calculateThisWeekPosition = () => {
    //   // Get the bounding box of the circle
    //   const circleRect = thisWeekCircleRef.current.getBoundingClientRect();

    //   // Calculate the position relative to the window
    //   const position = {
    //     top: circleRect.top + window.scrollY,
    //     left: circleRect.left + window.scrollX,
    //   };

    //   // Set the position in the state
    //   setThisWeekPosition(position);
    // };

    // const calculateProcessedPosition = () => {
    //   // Get the bounding box of the circle
    //   const circleRect = processedCircleRef.current.getBoundingClientRect();

    //   // Calculate the position relative to the window
    //   const position = {
    //     top: circleRect.top + window.scrollY,
    //     left: circleRect.left + window.scrollX,
    //   };

    //   // Set the position in the state
    //   setProcessedPosition(position);
    // };

    // const calculateThisMonthPosition = () => {
    //   // Get the bounding box of the circle
    //   const circleRect = thisMonthCircleRef.current.getBoundingClientRect();

    //   // Calculate the position relative to the window
    //   const position = {
    //     top: circleRect.top + window.scrollY,
    //     left: circleRect.left + window.scrollX,
    //   };

    //   // Set the position in the state
    //   setThisMonthPosition(position);
    // };

    // const calculatePendingPosition = () => {
    //   // Get the bounding box of the circle
    //   const circleRect = pendingCircleRef.current.getBoundingClientRect();

    //   // Calculate the position relative to the window
    //   const position = {
    //     top: circleRect.top + window.scrollY,
    //     left: circleRect.left + window.scrollX,
    //   };

    //   // Set the position in the state
    //   setPendingPosition(position);
    // };
    // Call the function initially
    calculatePosition();
    calculateThisWeekPosition();
    calculateThisMonthPosition();
    calculateProcessedPosition();
    calculatePendingPosition();

    // Attach a resize event listener to recalculate position on window resize
    window.addEventListener("resize", calculatePosition);
    window.addEventListener("resize", calculateThisWeekPosition);
    window.addEventListener("resize", calculateThisMonthPosition);
    window.addEventListener("resize", calculateProcessedPosition);
    window.addEventListener("resize", calculatePendingPosition);
    //Use gsap resizing animations on X instead of setting position using state
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", calculatePosition);
      window.removeEventListener("resize", calculateThisWeekPosition);
      window.removeEventListener("resize", calculateThisMonthPosition);
      window.removeEventListener("resize", calculateProcessedPosition);
      window.removeEventListener("resize", calculatePendingPosition);
    };
  }, []);

  useEffect(() => {
    const path = bluePath.current;
    const processedMonthPath = processedThisMonthPath.current;
    const processedWeekPath = processedThisWeekPath.current;
    const rPath = redPath.current;
    const pendingMonthPath = pendingThisMonthPath.current;
    const pendingWeekPath = pendingThisWeekPath.current;
    const topCircle = topCircleRef.current;
    const thisMonthCircle = thisMonthCircleRef.current;
    const thisWeekCircle = thisWeekCircleRef.current;
    const processedCircle = processedCircleRef.current;
    const pendingCircle = pendingCircleRef.current;
    // return;
    // Ensure the path element is available
    if (
      path &&
      rPath &&
      pendingMonthPath &&
      pendingWeekPath &&
      processedWeekPath &&
      processedMonthPath
    ) {
      // Get the total length of the path
      console.log("Entered the setting condition!");
      const pathLength = path.getTotalLength();
      const rPathLength = rPath.getTotalLength();
      const processedWeekPathLength = processedWeekPath.getTotalLength();
      const processedMonthPathLength = processedMonthPath.getTotalLength();
      const pendingWeekPathLength = pendingWeekPath.getTotalLength();
      const pendingMonthPathLength = pendingMonthPath.getTotalLength();

      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      gsap.set(rPath, {
        strokeDasharray: rPathLength,
        strokeDashoffset: rPathLength,
      });

      gsap.set(processedWeekPath, {
        strokeDasharray: processedWeekPathLength,
        strokeDashoffset: processedWeekPathLength,
      });

      gsap.set(processedMonthPath, {
        strokeDasharray: processedMonthPathLength,
        strokeDashoffset: processedMonthPathLength,
      });

      gsap.set(pendingWeekPath, {
        strokeDasharray: pendingWeekPathLength,
        strokeDashoffset: pendingWeekPathLength,
      });

      gsap.set(pendingMonthPath, {
        strokeDasharray: pendingMonthPathLength,
        strokeDashoffset: pendingMonthPathLength,
      });

      gsap.set(topCircle, {
        opacity: 0,
      });

      gsap.set(processedCircle, {
        opacity: 0,
      });

      gsap.set(pendingCircle, {
        opacity: 0,
      });

      gsap.set(thisWeekCircle, {
        opacity: 0,
      });

      gsap.set(thisMonthCircle, {
        opacity: 0,
      });
      animateOutAllPolygons();
      animateInCircle(pendingCircleRef, INITIAL_DELAY, "rgb(255,158,158)");
      animateInCircle(
        processedCircleRef,
        INITIAL_DELAY + 0.3,
        "rgb(161,182,255)"
      );
      animateInCircle(topCircleRef, INITIAL_DELAY + 0.6);
      animateInLine(bluePath, INITIAL_DELAY + 2);
      animateInLine(redPath, INITIAL_DELAY + 2);
      AnimateInPolygons(
        INITIAL_DELAY + 1.5,
        pendingTodayPolygon,
        processedTodayPolygon
      );
    }
  }, []);

  //Animation Definitions
  /*
  Select Animations
  Select This Week 
  Select This Month
  Select Today

  */

  //Select This Week
  const AnimateSelectThisWeek = () => {
    animateOutAllPolygons();
    AnimateInPolygons(
      1.5,
      processedThisWeekPolygon1,
      processedThisWeekPolygon2,
      pendingThisWeekPolygon1,
      pendingThisWeekPolygon2,
      pendingThisWeekPolygon3,
      pendingThisWeekPolygon4
    );
    // setSelected("THIS WEEK");
    animateOutAllOptionCircles();
    animateOutAllLines();
    animateInCircle(thisWeekCircleRef, 0.5);
    animateInLine(processedThisWeekPath, 1);
    animateInLine(pendingThisWeekPath, 1);
  };

  //Select Today
  const AnimateSelectToday = () => {
    animateOutAllPolygons();
    AnimateInPolygons(1.5, pendingTodayPolygon, processedTodayPolygon);
    // setSelected("TODAY");
    animateOutAllOptionCircles();
    animateOutAllLines();
    animateInCircle(topCircleRef, 0.5);
    animateInLine(redPath, 1);
    animateInLine(bluePath, 1);
  };

  //Select This Month
  const AnimateSelectThisMonth = () => {
    animateOutAllPolygons();
    AnimateInPolygons(
      1.5,
      processedThisMonthPolygon1,
      processedThisMonthPolygon2,
      processedThisMonthPolygon3,
      processedThisMonthPolygon4,
      pendingThisMonthPolygon1,
      pendingThisMonthPolygon2,
      pendingThisMonthPolygon3
    );
    // setSelected("THIS MONTH");
    animateOutAllOptionCircles();
    animateOutAllLines();
    animateInCircle(thisMonthCircleRef, 0.5);
    animateInLine(processedThisMonthPath, 1);
    animateInLine(pendingThisMonthPath, 1);
  };

  /*
  Animation Helpers
  Animate in Circles 
  Animate out Circles
  Animate in Lines
  Animate out Lines
  Animate out all Lines
  Animate out all Option Circles
  Animate out all polygons
  Animate in Polygon
  */
  //Animate Out All Polygons
  //Animate out all polygons
  const animateOutAllPolygons = () => {
    gsap.set(
      [
        pendingTodayPolygon.current,
        pendingThisMonthPolygon1.current,
        pendingThisMonthPolygon2.current,
        pendingThisMonthPolygon3.current,
        pendingThisWeekPolygon1.current,
        pendingThisWeekPolygon2.current,
        pendingThisWeekPolygon3.current,
        pendingThisWeekPolygon4.current,
        processedTodayPolygon.current,
        processedThisWeekPolygon1.current,
        processedThisWeekPolygon2.current,
        processedThisMonthPolygon1.current,
        processedThisMonthPolygon2.current,
        processedThisMonthPolygon3.current,
        processedThisMonthPolygon4.current,
      ],
      {
        fill: "none",
        duration: 0.1,
      }
    );
  };
  //Animate in Polygon
  const AnimateInPolygons = (delay = 1, ...polygon) => {
    console.log("Animate in polygons called", delay, polygon);
    gsap.to(
      polygon.map((polygon) => polygon.current),
      {
        fill: "rgba(0,0,0,0)",
        delay,
      }
    );
  };
  //Animate out all lines
  const animateOutAllLines = () => {
    animateOutLine(bluePath);
    animateOutLine(redPath);
    animateOutLine(processedThisMonthPath);
    animateOutLine(processedThisWeekPath);
    animateOutLine(pendingThisMonthPath);
    animateOutLine(pendingThisWeekPath);
  };
  //Animate Out all option circles
  const animateOutAllOptionCircles = () => {
    animateOutCircle(topCircleRef);
    animateOutCircle(thisMonthCircleRef);
    animateOutCircle(thisWeekCircleRef);
  };
  //Animate in Circles
  const animateInCircle = (ref, delay = 0, color = "white") => {
    const circle = ref.current;
    if (circle) {
      gsap.to(circle, {
        opacity: 1,
        duration: 1,
        fill: color,
        stroke: color,
        delay,
        ease: Power3.easeIn,
      });
    }
  };
  //Animate out circles
  const animateOutCircle = (ref, delay = 0) => {
    const circle = ref.current;
    console.log("Animating out circle");
    if (circle) {
      gsap.to(circle, {
        duration: 1,
        stroke: "black",
        fill: "black",
        delay,
        ease: Power3.easeOut,
      });
    }
  };

  //Animate in lines
  const animateInLine = (ref, delay = 0) => {
    const path = ref.current;

    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1, // Adjust the duration as needed
      delay,
      opacity: 1,
      ease: "power2.inOut", // Use your preferred easing function
    });
  };

  //Animate out Lines
  const animateOutLine = (ref, delay = 0) => {
    const path = ref.current;
    const strokeDashOffset = path.getTotalLength();
    gsap.to(path, {
      strokeDashoffset: strokeDashOffset,
      strokeDasharray: strokeDashOffset,
      strokeLinecap: "butt",
      delay,
      duration: 1, // Adjust the duration as needed
      ease: "power2.inOut", // Use your preferred easing function
    });
  };

  //Red Thread manipulation helpers
  const manageRedMouseMove = (e) => {
    // const { movementY } = e;
    if (redMouseStartY === 0) {
      redMouseStartY = e.clientY;
      return;
    }
    console.log("AnimationDebug:Moving Mouse:", redMouseStartY, e.clientY, e);
    const movementY = e.clientY - redMouseStartY;
    console.log("Red MouseMovement", movementY, e);
    redProgress += movementY * 3;
    setRedPath(redProgress);
    redMouseStartY = e.clientY;
  };

  const manageRedMouseLeave = (e) => {
    animateRedOut();
  };

  const manageRedMouseEnter = (e) => {
    console.log("AnimationDebug:Setting RedmouseStartY:", e.clientY, e);
    redMouseStartY = e.clientY;
    if (redReqId) {
      window.cancelAnimationFrame(redReqId);
      resetRedAnimation();
    }
  };

  const animateRedOut = (e) => {
    const newProgress = redProgress * Math.sin(redTime);
    redTime += 0.2;
    setRedPath(newProgress);
    redProgress = lerp(redProgress, 0, 0.025);
    if (Math.abs(redProgress) > 0.75) {
      redReqId = window.requestAnimationFrame(animateRedOut);
    } else {
      resetRedAnimation();
    }
  };

  const resetRedAnimation = () => {
    redProgress = 0;
    redTime = Math.PI / 2;
  };

  const setRedPath = (redProgress) => {
    redPath.current.setAttributeNS(
      "",
      "d",
      `M100 100 Q14 ${30 + redProgress}, 50 0`
    );
  };
  //Pending this week path thread manipulators
  const setPendingThisWeekPath = (pendingThisWeekProgress) => {
    pendingThisWeekPath.current.setAttributeNS(
      "",
      "d",
      `M100 100 Q30 ${30 + pendingThisWeekProgress}, -60 20`
    );
  };

  const resetPendingThisWeekAnimation = () => {
    pendingThisWeekProgress = 0;
    pendingThisWeekTime = Math.PI / 2;
  };

  const animatePendingThisWeekOut = (e) => {
    const newProgress = pendingThisWeekProgress * Math.sin(pendingThisWeekTime);
    pendingThisWeekTime += 0.2;
    setPendingThisWeekPath(newProgress);
    pendingThisWeekProgress = lerp(pendingThisWeekProgress, 0, 0.025);
    if (Math.abs(pendingThisWeekProgress) > 0.75) {
      pendingThisWeekReqId = window.requestAnimationFrame(
        animatePendingThisWeekOut
      );
    } else {
      resetPendingThisWeekAnimation();
    }
  };

  const managePendingThisWeekMouseMove = (e) => {
    // const { movementY } = e;
    if (pendingThisWeekMouseStartY === 0) {
      pendingThisWeekMouseStartY = e.clientY;
      return;
    }
    console.log(
      "AnimationDebug:Moving Mouse:",
      pendingThisWeekMouseStartY,
      e.clientY,
      e
    );
    const movementY = e.clientY - pendingThisWeekMouseStartY;
    console.log("Red MouseMovement", movementY, e);
    pendingThisWeekProgress += movementY * 3;
    setPendingThisWeekPath(pendingThisWeekProgress);
    pendingThisWeekMouseStartY = e.clientY;
  };

  const managePendingThisWeekMouseLeave = (e) => {
    animatePendingThisWeekOut();
  };

  const managePendingThisWeekMouseEnter = (e) => {
    console.log("AnimationDebug:Setting RedmouseStartY:", e.clientY, e);
    pendingThisWeekMouseStartY = e.clientY;
    if (pendingThisWeekReqId) {
      window.cancelAnimationFrame(pendingThisWeekReqId);
      resetPendingThisWeekAnimation();
    }
  };

  //Pending this Month path thread manipulators
  const setPendingThisMonthPath = (pendingThisMonthProgress) => {
    // console.log("pendingThisMonthRef", pendingThisMonthPath);
    pendingThisMonthPath.current.setAttributeNS(
      "",
      "d",
      `M100 100 Q90 ${30 + pendingThisMonthProgress}, 160 20`
    );
  };

  const resetPendingThisMonthAnimation = () => {
    pendingThisMonthProgress = 0;
    pendingThisMonthTime = Math.PI / 2;
  };

  const animatePendingThisMonthOut = (e) => {
    const newProgress =
      pendingThisMonthProgress * Math.sin(pendingThisMonthTime);
    pendingThisMonthTime += 0.2;
    setPendingThisMonthPath(newProgress);
    pendingThisMonthProgress = lerp(pendingThisMonthProgress, 0, 0.025);
    if (Math.abs(pendingThisMonthProgress) > 0.75) {
      pendingThisMonthReqId = window.requestAnimationFrame(
        animatePendingThisMonthOut
      );
    } else {
      resetPendingThisMonthAnimation();
    }
  };

  const managePendingThisMonthMouseMove = (e) => {
    // const { movementY } = e;
    if (pendingThisMonthMouseStartY === 0) {
      pendingThisMonthMouseStartY = e.clientY;
      return;
    }
    console.log(
      "AnimationDebug:Moving Mouse:",
      pendingThisMonthMouseStartY,
      e.clientY,
      e
    );
    const movementY = e.clientY - pendingThisMonthMouseStartY;
    console.log("Red MouseMovement", movementY, e);
    pendingThisMonthProgress += movementY * 3;
    setPendingThisMonthPath(pendingThisMonthProgress);
    pendingThisMonthMouseStartY = e.clientY;
  };

  const managePendingThisMonthMouseLeave = (e) => {
    animatePendingThisMonthOut();
  };

  const managePendingThisMonthMouseEnter = (e) => {
    console.log("AnimationDebug:Setting RedmouseStartY:", e.clientY, e);
    pendingThisMonthMouseStartY = e.clientY;
    if (pendingThisMonthReqId) {
      window.cancelAnimationFrame(pendingThisMonthReqId);
      resetPendingThisMonthAnimation();
    }
  };

  //Blue Thread manipulation helpers
  const manageBlueMouseMove = (e) => {
    // const { movementY } = e;
    console.log("firstDebug:", e.clientY, blueMouseStartY);
    if (blueMouseStartY === 0) {
      blueMouseStartY = e.clientY;
      return;
    }
    const movementY = e.clientY - blueMouseStartY;
    blueProgress += movementY * 3;
    setBluePath(blueProgress);
    blueMouseStartY = e.clientY;
  };

  const manageBlueMouseLeave = (e) => {
    animateBlueOut();
  };

  const manageBlueMouseEnter = (e) => {
    if (blueReqId) {
      window.cancelAnimationFrame(blueReqId);
      resetBlueAnimation();
    }
  };

  const animateBlueOut = (e) => {
    const newProgress = blueProgress * Math.sin(blueTime);
    blueTime += 0.2;
    setBluePath(newProgress);
    blueProgress = lerp(blueProgress, 0, 0.025);
    if (Math.abs(blueProgress) > 0.75) {
      blueReqId = window.requestAnimationFrame(animateBlueOut);
    } else {
      resetBlueAnimation();
    }
  };

  const resetBlueAnimation = () => {
    blueProgress = 0;
    blueTime = Math.PI / 2;
  };

  const setBluePath = (blueProgress) => {
    bluePath.current.setAttributeNS(
      "",
      "d",
      `M0 100 Q87 ${30 + blueProgress}, 50 0`
    );
  };

  //Processed This Week Thread manipulation helpers
  const manageProcessedThisWeekMouseMove = (e) => {
    // const { movementY } = e;
    console.log("firstDebug:", e.clientY, processedThisWeekMouseStartY);
    if (processedThisWeekMouseStartY === 0) {
      processedThisWeekMouseStartY = e.clientY;
      return;
    }
    const movementY = e.clientY - processedThisWeekMouseStartY;
    processedThisWeekProgress += movementY * 3;
    setProcessedThisWeekPath(processedThisWeekProgress);
    processedThisWeekMouseStartY = e.clientY;
  };

  const manageProcessedThisWeekMouseLeave = (e) => {
    animateProcessedThisWeekOut();
  };

  const manageProcessedThisWeekMouseEnter = (e) => {
    if (processedThisWeekReqId) {
      window.cancelAnimationFrame(processedThisWeekReqId);
      resetProcessedThisWeekAnimation();
    }
  };

  const animateProcessedThisWeekOut = (e) => {
    const newProgress =
      processedThisWeekProgress * Math.sin(processedThisWeekTime);
    processedThisWeekTime += 0.2;
    setProcessedThisWeekPath(newProgress);
    processedThisWeekProgress = lerp(processedThisWeekProgress, 0, 0.025);
    if (Math.abs(processedThisWeekProgress) > 0.75) {
      processedThisWeekReqId = window.requestAnimationFrame(
        animateProcessedThisWeekOut
      );
    } else {
      resetProcessedThisWeekAnimation();
    }
  };

  const resetProcessedThisWeekAnimation = () => {
    processedThisWeekProgress = 0;
    processedThisWeekTime = Math.PI / 2;
  };

  const setProcessedThisWeekPath = (processedThisWeekProgress) => {
    processedThisWeekPath.current.setAttributeNS(
      "",
      "d",
      `M0 100 Q20 ${30 + processedThisWeekProgress}, -60 20`
    );
  };

  //Processed This Month Thread manipulation helpers
  const manageProcessedThisMonthMouseMove = (e) => {
    // const { movementY } = e;
    console.log("firstDebug:", e.clientY, processedThisMonthMouseStartY);
    if (processedThisMonthMouseStartY === 0) {
      processedThisMonthMouseStartY = e.clientY;
      return;
    }
    const movementY = e.clientY - processedThisMonthMouseStartY;
    processedThisMonthProgress += movementY * 1.6;
    setProcessedThisMonthPath(processedThisMonthProgress);
    processedThisMonthMouseStartY = e.clientY;
  };

  const manageProcessedThisMonthMouseLeave = (e) => {
    animateProcessedThisMonthOut();
  };

  const manageProcessedThisMonthMouseEnter = (e) => {
    if (processedThisMonthReqId) {
      window.cancelAnimationFrame(processedThisMonthReqId);
      resetProcessedThisMonthAnimation();
    }
  };

  const animateProcessedThisMonthOut = (e) => {
    const newProgress =
      processedThisMonthProgress * Math.sin(processedThisMonthTime);
    processedThisMonthTime += 0.2;
    setProcessedThisMonthPath(newProgress);
    processedThisMonthProgress = lerp(processedThisMonthProgress, 0, 0.025);
    if (Math.abs(processedThisMonthProgress) > 0.75) {
      processedThisMonthReqId = window.requestAnimationFrame(
        animateProcessedThisMonthOut
      );
    } else {
      resetProcessedThisMonthAnimation();
    }
  };

  const resetProcessedThisMonthAnimation = () => {
    processedThisMonthProgress = 0;
    processedThisMonthTime = Math.PI / 2;
  };

  const setProcessedThisMonthPath = (processedThisMonthProgress) => {
    processedThisMonthPath.current.setAttributeNS(
      "",
      "d",
      `M0 100 Q10 ${30 + processedThisMonthProgress}, 160 20`
    );
  };
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // The height of the observed element has changed
        console.log("New height:", entry.contentRect.height);
        calculatePosition();
        calculateThisWeekPosition();
        calculateThisMonthPosition();
        calculateProcessedPosition();
        calculatePendingPosition();
      }
    });

    // Start observing the height changes of the div
    if (statsRef.current) {
      resizeObserver.observe(statsRef.current);
    }

    // Clean up the observer when the component unmounts
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={statsRef}
      style={{
        //Add Minimum height on statistics
        height: "50%",
        // height: "00px",
        minHeight: "200px",
        width: "100%",
        flexDirection: "column",
        border: "1px solid red",
        alignItems: "center",
        alignSelf: "center",
        display: "flex",
        overflow: "hidden",
      }}
    >
      {/* Filters */}
      <div
        style={{
          height: "90px",
          width: "100%",
          border: "1px solid yellow",
        }}
      ></div>
      <div
        style={{
          height: "100px",
          width: "100%",
          border: "1px solid yellow",
          // marginBottom: "5%",
        }}
      ></div>

      {/* SVG */}
      <div
        style={{
          height: "35%",
          width: "33%",
          border: "1px solid blue",
        }}
      >
        <DataBox
          position={pendingPosition}
          displayValue={"Processed"}
          counterValue={"10"}
          optionalStyles={{
            color: "rgb(161,182,255)",
            width: "10px",
            height: "10px",
            top: `${processedPosition.top + 50}px`,
            left: `${processedPosition.left - 30}px`,
          }}
          topOffset={40}
          leftOffset={14}
          initialDelay={INITIAL_DELAY}
        />

        <DataBox
          position={pendingPosition}
          displayValue={"Pending"}
          counterValue={"13"}
          optionalStyles={{
            color: "rgb(255,158,158)",
            width: "10px",
            height: "10px",
            top: `${pendingPosition.top + 50}px`,
            left: `${pendingPosition.left + 30}px`,
          }}
          topOffset={40}
          leftOffset={14}
          initialDelay={INITIAL_DELAY}
        />

        <OptionBox
          initialDelay={INITIAL_DELAY}
          boxRef={todayBox}
          onClick={AnimateSelectToday}
          position={divPosition}
          topOffset={15}
          leftOffset={21}
          optionalStyles={{ width: "50px", height: "1px" }}
          counterValue={"00"}
          header={"Today"}
          dateValue={"1/16/24"}
        />
        <OptionBox
          initialDelay={INITIAL_DELAY}
          boxRef={thisWeekBox}
          onClick={AnimateSelectThisWeek}
          position={thisWeekPosition}
          topOffset={15}
          leftOffset={25}
          optionalStyles={{
            width: "50px",
            height: "1px",
          }}
          counterValue={"00"}
          header={"This Week"}
          dateValue={"1/1-1/7"}
        />
        <OptionBox
          initialDelay={INITIAL_DELAY}
          boxRef={thisMonthBox}
          onClick={AnimateSelectThisMonth}
          position={thisMonthPosition}
          topOffset={15}
          leftOffset={12}
          optionalStyles={{ width: "50px", height: "1px" }}
          counterValue={"00"}
          header={"This Month"}
          dateValue={"1/1-1/31"}
        />
        <svg
          // preserveAspectRatio="none"
          viewBox="0 0 100 100"
          style={{
            height: "80%",
            width: "100%",
            border: "1px solid purple",
            overflow: "visible",
          }}
        >
          <defs>
            {/* Define the linear gradient */}
            <filter id="blurFilter" x="0" y="0" width="100%" height="100%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" />
            </filter>
            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="90%"
                style={{ stopColor: "rgb(161,182,255)", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "rgb(255,255,255)", stopOpacity: 1 }}
              />
            </linearGradient>
            <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="90%"
                style={{ stopColor: "rgb(255,158,158)", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "rgb(255,255,255)", stopOpacity: 1 }}
              />
            </linearGradient>
            <linearGradient
              id="whiteGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="0%"
                style={{ stopColor: "rgb(255,255,255)", stopOpacity: 1 }}
              />
              <stop
                offset="20%"
                style={{ stopColor: "rgb(255,255,255)", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
          <path stroke="green" strokeWidth={0.2} d="M10 0 V100" />
          <path stroke="green" strokeWidth={0.2} d="M20 0 V100" />
          <path stroke="green" strokeWidth={0.2} d="M30 0 V100" />
          <path stroke="green" strokeWidth={0.2} d="M40 0 V100" />
          <path stroke="green" strokeWidth={0.2} d="M50 0 V100" />
          <path stroke="green" strokeWidth={0.2} d="M60 0 V100" />
          <path stroke="green" strokeWidth={0.2} d="M70 0 V100" />
          <path stroke="green" strokeWidth={0.2} d="M80 0 V100" />
          <path stroke="green" strokeWidth={0.2} d="M90 0 V100" />

          <path stroke="green" strokeWidth={0.2} d="M100 0 V100" />
          <path stroke="green" strokeWidth={0.2} d="M110 0 V100" />
          <path stroke="green" strokeWidth={0.2} d="M120 0 V100" />
          <path stroke="green" strokeWidth={0.2} d="M130 0 V100" />
          <path stroke="green" strokeWidth={0.2} d="M140 0 V100" />
          <path stroke="green" strokeWidth={0.2} d="M150 0 V100" />
          <path stroke="green" strokeWidth={0.2} d="M160 0 V100" />
          <path stroke="green" strokeWidth={0.2} d="M170 0 V100" />
          <path stroke="green" strokeWidth={0.2} d="M180 0 V100" />
          <path stroke="green" strokeWidth={0.2} d="M190 0 V100" />

          <path stroke="purple" strokeWidth={1} d="M0 0 V100" />
          <path stroke="green" strokeWidth={0.2} d="M-10 0 V100" />

          <path stroke="green" strokeWidth={0.2} d="M-20 0 V100" />
          <path stroke="green" strokeWidth={0.2} d="M-30 0 V100" />
          <path stroke="green" strokeWidth={0.2} d="M-40 0 V100" />
          <path stroke="green" strokeWidth={0.2} d="M-50 0 V100" />
          <path stroke="green" strokeWidth={0.2} d="M-60 0 V100" />
          <path stroke="green" strokeWidth={0.2} d="M-70 0 V100" />
          <path stroke="green" strokeWidth={0.2} d="M-80 0 V100" />
          <path stroke="green" strokeWidth={0.2} d="M-90 0 V100" />

          <path stroke="green" strokeWidth={0.2} d="M0 10 H300" />
          <path stroke="green" strokeWidth={0.2} d="M0 10 H-200" />
          <path stroke="green" strokeWidth={0.2} d="M0 20 H300" />
          <path stroke="green" strokeWidth={0.2} d="M0 20 H-200" />
          <path stroke="green" strokeWidth={0.2} d="M0 30 H300" />
          <path stroke="green" strokeWidth={0.2} d="M0 30 H-200" />
          <path stroke="green" strokeWidth={0.2} d="M0 40 H300" />
          <path stroke="green" strokeWidth={0.2} d="M0 40 H-200" />
          <path stroke="green" strokeWidth={0.2} d="M0 50 H300" />
          <path stroke="green" strokeWidth={0.2} d="M0 50 H-200" />
          <path stroke="green" strokeWidth={0.2} d="M0 60 H300" />
          <path stroke="green" strokeWidth={0.2} d="M0 60 H-200" />
          <path stroke="green" strokeWidth={0.2} d="M0 70 H300" />
          <path stroke="green" strokeWidth={0.2} d="M0 70 H-200" />
          <path stroke="green" strokeWidth={0.2} d="M0 80 H300" />
          <path stroke="green" strokeWidth={0.2} d="M0 80 H-200" />

          <path stroke="green" strokeWidth={0.2} d="M0 80 H300" />
          <path stroke="green" strokeWidth={0.2} d="M0 80 H-200" />
          <path stroke="green" strokeWidth={0.2} d="M0 90 H300" />
          <path stroke="green" strokeWidth={0.2} d="M0 90 H-200" />

          <path stroke="green" strokeWidth={1} d="M50 0 V100" />
          <path stroke="green" strokeWidth={1} d="M0 50 H100" />
          <path
            ref={bluePath}
            stroke="url(#blueGradient)"
            fill="none"
            opacity={0}
            strokeWidth={1}
            // d="M0 100 Q60 30, 50 20"
          />
          {/* Red Circle to today circle */}
          <path
            ref={redPath}
            stroke="url(#redGradient)"
            fill="none"
            opacity={0}
            strokeWidth={1}
            // d="M70 60 Q40 30, 50 20"
          />
          {/* Pending This Week Path */}
          <path
            ref={pendingThisWeekPath}
            stroke="url(#redGradient)"
            fill="none"
            opacity={0}
            strokeWidth={1}
            d="M100 100 Q-00 30, -20 20"
          />
          {/* Pending this month Path */}
          <path
            ref={pendingThisMonthPath}
            stroke="url(#redGradient)"
            fill="none"
            opacity={0}
            strokeWidth={1}
            d="M100 100 Q140 30, 120 20"
          />
          {/* processed this week path */}
          <path
            ref={processedThisWeekPath}
            stroke="url(#blueGradient)"
            fill="none"
            opacity={0}
            strokeWidth={1}
            d="M0 100 Q-20 30, -20 20"
          />
          {/* processed this month path */}
          <path
            ref={processedThisMonthPath}
            stroke="url(#blueGradient)"
            fill="none"
            opacity={0}
            strokeWidth={1}
            d="M0 100 Q10 30, 120 20"
          />

          {/* red Today Polygons */}
          <polygon
            ref={pendingTodayPolygon}
            onMouseEnter={manageRedMouseEnter}
            onMouseMove={manageRedMouseMove}
            onMouseLeave={manageRedMouseLeave}
            // strokeWidth={1}
            strokeWidth={0}
            stroke="green"
            fill="rgba(0,0,0,0)"
            points="93 100,50 55,52 50, 100 98, "
          />
          {/* pending this month polygons */}
          <polygon
            ref={pendingThisMonthPolygon1}
            onMouseEnter={managePendingThisMonthMouseEnter}
            onMouseMove={managePendingThisMonthMouseMove}
            onMouseLeave={managePendingThisMonthMouseLeave}
            // strokeWidth={1}
            strokeWidth={0}
            // opacity={0}
            stroke="green"
            fill="rgba(0,0,0,0)"
            points="98 100,109 70,115 70, 102 100, "
          />
          <polygon
            ref={pendingThisMonthPolygon2}
            onMouseEnter={managePendingThisMonthMouseEnter}
            onMouseMove={managePendingThisMonthMouseMove}
            onMouseLeave={managePendingThisMonthMouseLeave}
            // strokeWidth={1}
            strokeWidth={0}
            stroke="green"
            fill="rgba(0,0,0,0)"
            points="109 70,135 40,144 40, 115 70, "
          />
          <polygon
            ref={pendingThisMonthPolygon3}
            onMouseEnter={managePendingThisMonthMouseEnter}
            onMouseMove={managePendingThisMonthMouseMove}
            onMouseLeave={managePendingThisMonthMouseLeave}
            // strokeWidth={1}
            strokeWidth={0}
            stroke="green"
            fill="rgba(0,0,0,0)"
            points="137 40,155 30,162 30, 144 40, "
          />
          {/* pending this week polygons */}
          <polygon
            ref={pendingThisWeekPolygon1}
            onMouseEnter={managePendingThisWeekMouseEnter}
            onMouseMove={managePendingThisWeekMouseMove}
            onMouseLeave={managePendingThisWeekMouseLeave}
            // strokeWidth={1}
            strokeWidth={0}
            stroke="green"
            fill="rgba(0,0,0,0)"
            points="99 100,50 71,50 65, 100 97, "
          />
          <polygon
            ref={pendingThisWeekPolygon2}
            onMouseEnter={managePendingThisWeekMouseEnter}
            onMouseMove={managePendingThisWeekMouseMove}
            onMouseLeave={managePendingThisWeekMouseLeave}
            // strokeWidth={1}
            strokeWidth={0}
            stroke="green"
            fill="rgba(0,0,0,0)"
            points="99 100,50 71,50 65, 100 97, "
          />
          <polygon
            ref={pendingThisWeekPolygon3}
            onMouseEnter={managePendingThisWeekMouseEnter}
            onMouseMove={managePendingThisWeekMouseMove}
            onMouseLeave={managePendingThisWeekMouseLeave}
            // strokeWidth={1}
            strokeWidth={0}
            stroke="green"
            fill="rgba(0,0,0,0)"
            points="50 71,0 47,0 42, 50 65, "
          />
          <polygon
            ref={pendingThisWeekPolygon4}
            onMouseEnter={managePendingThisWeekMouseEnter}
            onMouseMove={managePendingThisWeekMouseMove}
            onMouseLeave={managePendingThisWeekMouseLeave}
            // strokeWidth={1}
            strokeWidth={0}
            stroke="green"
            fill="rgba(0,0,0,0)"
            points="0 47,-45 31.8,-45 28, 0 42, "
          />
          {/* blue today polygons */}
          <polygon
            ref={processedTodayPolygon}
            onMouseEnter={manageBlueMouseEnter}
            onMouseMove={manageBlueMouseMove}
            onMouseLeave={manageBlueMouseLeave}
            // strokeWidth={1}
            strokeWidth={0}
            stroke="green"
            fill="rgba(0,0,0,0)"
            points="0 98, 48 50, 50 56, 5 100"
          />
          {/* processed this week polygons */}
          <polygon
            ref={processedThisWeekPolygon1}
            onMouseEnter={manageProcessedThisWeekMouseEnter}
            onMouseMove={manageProcessedThisWeekMouseMove}
            onMouseLeave={manageProcessedThisWeekMouseLeave}
            // strokeWidth={1}
            strokeWidth={0}
            stroke="green"
            fill="rgba(0,0,0,0)"
            points="0 93, -18 57, -22.5 60, -2 100"
          />
          <polygon
            ref={processedThisWeekPolygon2}
            onMouseEnter={manageProcessedThisWeekMouseEnter}
            onMouseMove={manageProcessedThisWeekMouseMove}
            onMouseLeave={manageProcessedThisWeekMouseLeave}
            // strokeWidth={1}
            strokeWidth={0}
            stroke="green"
            fill="rgba(0,0,0,0)"
            points="-22.5 60, -20 56, -46.5 33, -54 36"
          />
          {/* blue this month polygons */}
          <polygon
            ref={processedThisMonthPolygon1}
            onMouseEnter={manageProcessedThisMonthMouseEnter}
            onMouseMove={manageProcessedThisMonthMouseMove}
            onMouseLeave={manageProcessedThisMonthMouseLeave}
            // strokeWidth={1}
            strokeWidth={0}
            stroke="green"
            fill="rgba(0,0,0,0)"
            points="0 90, 10 70, 18 70,0.5 98 "
          />
          <polygon
            ref={processedThisMonthPolygon2}
            onMouseEnter={manageProcessedThisMonthMouseEnter}
            onMouseMove={manageProcessedThisMonthMouseMove}
            onMouseLeave={manageProcessedThisMonthMouseLeave}
            // strokeWidth={1}
            strokeWidth={0}
            stroke="green"
            fill="rgba(0,0,0,0)"
            points="10 70, 50 43.5, 50 48,18 70 "
          />
          <polygon
            ref={processedThisMonthPolygon3}
            onMouseEnter={manageProcessedThisMonthMouseEnter}
            onMouseMove={manageProcessedThisMonthMouseMove}
            onMouseLeave={manageProcessedThisMonthMouseLeave}
            // strokeWidth={1}
            strokeWidth={0}
            stroke="green"
            fill="rgba(0,0,0,0)"
            points="50 43.5, 126 23, 126 30.5,48 52 "
          />
          <polygon
            ref={processedThisMonthPolygon4}
            onMouseEnter={manageProcessedThisMonthMouseEnter}
            onMouseMove={manageProcessedThisMonthMouseMove}
            onMouseLeave={manageProcessedThisMonthMouseLeave}
            // strokeWidth={1}
            strokeWidth={0}
            stroke="green"
            fill="rgba(0,0,0,0)"
            points="126 23, 157 20, 157 26,126 30.5 "
          />

          {/*processed circle */}
          <circle
            ref={processedCircleRef}
            stroke="rgb(161,182,255)"
            fill="rgb(161,182,255)"
            strokeWidth={0.1}
            filter="url(#blurFilter)"
            cx="0"
            opacity={0}
            cy="100"
            r="4"
          />
          {/* Red start circle */}
          <circle
            ref={pendingCircleRef}
            stroke="rgb(255,158,158)"
            fill="rgb(255,158,158)"
            strokeWidth={0.1}
            filter="url(#blurFilter)"
            cx="100"
            opacity={0}
            cy="100"
            r="4"
          />
          {/* top circle */}
          <circle
            ref={topCircleRef}
            stroke="white"
            fill="white"
            strokeWidth={0.1}
            filter="url(#blurFilter)"
            cx="50"
            cy="0"
            opacity={0}
            r="4"
          />
          {/* this month circle */}

          <circle
            ref={thisMonthCircleRef}
            stroke="white"
            fill="white"
            strokeWidth={0.1}
            filter="url(#blurFilter)"
            cx="160"
            cy="20"
            opacity={0}
            r="4"
          />
          {/*this week circle */}
          <circle
            ref={thisWeekCircleRef}
            stroke="white"
            fill="white"
            strokeWidth={0.1}
            filter="url(#blurFilter)"
            cx="-60"
            opacity={0}
            cy="20"
            r="4"
          />
        </svg>
      </div>
      {/* Processed and pending count */}
      <div
        style={{
          height: "140px",
          width: "100%",
          border: "1px solid blue",
          // marginBottom: "5%",
        }}
      ></div>
    </div>
  );
}

export default Statistics;
