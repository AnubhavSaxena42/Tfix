import gsap, { Power2, Power3 } from "gsap";
import React, { useEffect, useMemo, useRef, useState } from "react";
import OptionBox from "./Components/OptionBox/OptionBox";
import DataBox from "./Components/DataBox/DataBox";
import dayjs from "dayjs";
import { generateData } from "../../core/helpers/helpers";
import { FaCheck, FaPlus } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import {
  ATTACHMENT_TYPES,
  COMPANIES,
  REQUEST_STATUS,
  SELECTABLE_RANGES,
} from "../../core/constants/constants";
import "./statistics.css";
import StatsSVG from "./Components/StatsSVG/StatsSVG";
import Filters from "./Components/Filters/Filters";

function Statistics({
  dateMap,
  setDateMap,
  setMapLoading,
  mapLoading,
  selectedRange,
  setSelectedRange,
  selectedDate,
  setSelectedDate,
}) {
  console.log("InStatsComp:", {
    dateMap,
    setDateMap,
    setMapLoading,
    mapLoading,
    selectedRange,
    setSelectedRange,
    selectedDate,
    setSelectedDate,
  });
  const INITIAL_DELAY = 2.3;
  const statsRef = useRef(null);
  // const redPath = useRef(null);
  // const pendingThisWeekPath = useRef(null);
  // const pendingThisMonthPath = useRef(null);
  // const bluePath = useRef(null);
  // const processedThisWeekPath = useRef(null);
  // const processedThisMonthPath = useRef(null);
  // const topCircleRef = useRef(null);
  // const thisWeekCircleRef = useRef(null);
  // const thisMonthCircleRef = useRef(null);
  // const processedCircleRef = useRef(null);
  // const pendingCircleRef = useRef(null);
  // const todayBox = useRef(null);
  // const thisMonthBox = useRef(null);
  // const thisWeekBox = useRef(null);
  // const pendingTodayPolygon = useRef(null);
  // const pendingThisMonthPolygon1 = useRef(null);
  // const pendingThisMonthPolygon2 = useRef(null);
  // const pendingThisMonthPolygon3 = useRef(null);
  // const pendingThisWeekPolygon1 = useRef(null);
  // const pendingThisWeekPolygon2 = useRef(null);
  // const pendingThisWeekPolygon3 = useRef(null);
  // const pendingThisWeekPolygon4 = useRef(null);
  // const processedTodayPolygon = useRef(null);
  // const processedThisWeekPolygon1 = useRef(null);
  // const processedThisWeekPolygon2 = useRef(null);
  // const processedThisMonthPolygon1 = useRef(null);
  // const processedThisMonthPolygon2 = useRef(null);
  // const processedThisMonthPolygon3 = useRef(null);
  // const processedThisMonthPolygon4 = useRef(null);

  // const [divPosition, setDivPosition] = useState({ top: 0, left: 0 });
  // const [thisWeekPosition, setThisWeekPosition] = useState({ top: 0, left: 0 });
  // const [thisMonthPosition, setThisMonthPosition] = useState({
  //   top: 0,
  //   left: 0,
  // });
  // const [processedPosition, setProcessedPosition] = useState({
  //   top: 0,
  //   left: 0,
  // });
  // const [pendingPosition, setPendingPosition] = useState({
  //   top: 0,
  //   left: 0,
  // });
  //Filter Component Logic and animations start
  const [filters, setFilters] = useState({
    types: [],
    companies: [],
  });
  // const [modalFilters, setModalFilters] = useState({
  //   types: [],
  //   companies: [],
  // });

  // const filterModalRef = useRef(null);

  // const filterTypes = {
  //   COMPANY: "COMPANY",
  //   ATTACHMENT: "ATTACHMENT",
  // };

  // const toggleFilter = ({ type, value }) => {
  //   switch (type) {
  //     case filterTypes.COMPANY:
  //       if (modalFilters.companies.includes(value)) {
  //         const newCompanies = modalFilters.companies.filter(
  //           (company) => company !== value
  //         );
  //         setModalFilters({
  //           ...modalFilters,
  //           companies: newCompanies,
  //         });
  //         return {
  //           ...modalFilters,
  //           companies: newCompanies,
  //         };
  //       } else {
  //         const newCompanies = [...modalFilters.companies, value];
  //         setModalFilters({
  //           ...modalFilters,
  //           companies: newCompanies,
  //         });
  //         return {
  //           ...modalFilters,
  //           companies: newCompanies,
  //         };
  //       }

  //     case filterTypes.ATTACHMENT:
  //       if (modalFilters.types.includes(value)) {
  //         const newTypes = modalFilters.types.filter((type) => type !== value);
  //         setModalFilters({
  //           ...modalFilters,
  //           types: newTypes,
  //         });
  //         return {
  //           ...modalFilters,
  //           types: newTypes,
  //         };
  //       } else {
  //         const newTypes = [...modalFilters.types, value];
  //         setModalFilters({
  //           ...modalFilters,
  //           types: newTypes,
  //         });
  //         return {
  //           ...modalFilters,
  //           types: newTypes,
  //         };
  //       }

  //     default:
  //       return;
  //   }
  // };

  // const confirmSelection = () => {
  //   console.log("FiltersDebug:setFiltersCalled", modalFilters);
  //   setFilters(modalFilters);
  // };

  // const removeFilterFromTag = ({ type, value }) => {
  //   const newFilters = toggleFilter({ type, value });
  //   setFilters(newFilters);
  // };

  // const filterModalEnterAnimation = () => {
  //   const modal = filterModalRef.current;
  //   if (modal) {
  //     gsap.to(modal, {
  //       visibility: "visible",
  //       opacity: 1,
  //       duration: 0.5,
  //     });
  //   }
  // };

  // const filterModalExitAnimation = () => {
  //   console.log("FilterModalExitAnimationDebug:Start", filterModalRef.current);
  //   const modal = filterModalRef.current;
  //   if (modal) {
  //     console.log("FilterModalExitAnimationDebug:BeforeGSAP");
  //     gsap.to(modal, {
  //       opacity: 0,
  //       duration: 0.5,
  //     });

  //     console.log("FilterModalExitAnimationDebug:afterGSAP");
  //     gsap.set(modal, {
  //       visibility: "hidden",
  //       delay: 0.5,
  //     });
  //   }
  // };
  //Filter Component Logic and animations end
  // let redProgress = 0;
  // let pendingThisWeekProgress = 0;
  // let pendingThisMonthProgress = 0;
  // let redTime = Math.PI / 2;
  // let pendingThisWeekTime = Math.PI / 2;
  // let pendingThisMonthTime = Math.PI / 2;
  // let redReqId = null;
  // let pendingThisWeekReqId = null;
  // let pendingThisMonthReqId = null;
  // let blueProgress = 0;
  // let processedThisWeekProgress = 0;
  // let processedThisMonthProgress = 0;
  // let blueTime = Math.PI / 2;
  // let processedThisWeekTime = Math.PI / 2;
  // let processedThisMonthTime = Math.PI / 2;
  // let blueReqId = null;
  // let processedThisWeekReqId = null;
  // let processedThisMonthReqId = null;
  // let redMouseStartY = 0;
  // let pendingThisWeekMouseStartY = 0;
  // let pendingThisMonthMouseStartY = 0;
  // let blueMouseStartY = 0;
  // let processedThisWeekMouseStartY = 0;
  // let processedThisMonthMouseStartY = 0;

  // useEffect(() => {
  //   setRedPath(redProgress);
  //   setBluePath(blueProgress);
  //   setPendingThisWeekPath(pendingThisWeekProgress);
  //   setPendingThisMonthPath(pendingThisMonthProgress);
  //   setProcessedThisWeekPath(processedThisWeekProgress);
  //   setProcessedThisMonthPath(processedThisMonthProgress);
  // }, []);
  // const lerp = (x, y, a) => x * (1 - a) + y * a;

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

  // useEffect(() => {
  //   // Call the function initially
  //   calculatePosition();
  //   calculateThisWeekPosition();
  //   calculateThisMonthPosition();
  //   calculateProcessedPosition();
  //   calculatePendingPosition();

  //   // Attach a resize event listener to recalculate position on window resize
  //   window.addEventListener("resize", calculatePosition);
  //   window.addEventListener("resize", calculateThisWeekPosition);
  //   window.addEventListener("resize", calculateThisMonthPosition);
  //   window.addEventListener("resize", calculateProcessedPosition);
  //   window.addEventListener("resize", calculatePendingPosition);
  //   //Use gsap resizing animations on X instead of setting position using state
  //   // Clean up the event listener on component unmount
  //   return () => {
  //     window.removeEventListener("resize", calculatePosition);
  //     window.removeEventListener("resize", calculateThisWeekPosition);
  //     window.removeEventListener("resize", calculateThisMonthPosition);
  //     window.removeEventListener("resize", calculateProcessedPosition);
  //     window.removeEventListener("resize", calculatePendingPosition);
  //   };
  // }, []);

  // useEffect(() => {
  //   const path = bluePath.current;
  //   const processedMonthPath = processedThisMonthPath.current;
  //   const processedWeekPath = processedThisWeekPath.current;
  //   const rPath = redPath.current;
  //   const pendingMonthPath = pendingThisMonthPath.current;
  //   const pendingWeekPath = pendingThisWeekPath.current;
  //   const topCircle = topCircleRef.current;
  //   const thisMonthCircle = thisMonthCircleRef.current;
  //   const thisWeekCircle = thisWeekCircleRef.current;
  //   const processedCircle = processedCircleRef.current;
  //   const pendingCircle = pendingCircleRef.current;
  //   // return;
  //   // Ensure the path element is available
  //   if (
  //     path &&
  //     rPath &&
  //     pendingMonthPath &&
  //     pendingWeekPath &&
  //     processedWeekPath &&
  //     processedMonthPath
  //   ) {
  //     // Get the total length of the path
  //     console.log("Entered the setting condition!");
  //     const pathLength = path.getTotalLength();
  //     const rPathLength = rPath.getTotalLength();
  //     const processedWeekPathLength = processedWeekPath.getTotalLength();
  //     const processedMonthPathLength = processedMonthPath.getTotalLength();
  //     const pendingWeekPathLength = pendingWeekPath.getTotalLength();
  //     const pendingMonthPathLength = pendingMonthPath.getTotalLength();

  //     gsap.set(path, {
  //       strokeDasharray: pathLength,
  //       strokeDashoffset: pathLength,
  //     });

  //     gsap.set(rPath, {
  //       strokeDasharray: rPathLength,
  //       strokeDashoffset: rPathLength,
  //     });

  //     gsap.set(processedWeekPath, {
  //       strokeDasharray: processedWeekPathLength,
  //       strokeDashoffset: processedWeekPathLength,
  //     });

  //     gsap.set(processedMonthPath, {
  //       strokeDasharray: processedMonthPathLength,
  //       strokeDashoffset: processedMonthPathLength,
  //     });

  //     gsap.set(pendingWeekPath, {
  //       strokeDasharray: pendingWeekPathLength,
  //       strokeDashoffset: pendingWeekPathLength,
  //     });

  //     gsap.set(pendingMonthPath, {
  //       strokeDasharray: pendingMonthPathLength,
  //       strokeDashoffset: pendingMonthPathLength,
  //     });

  //     gsap.set(topCircle, {
  //       opacity: 0,
  //     });

  //     gsap.set(processedCircle, {
  //       opacity: 0,
  //     });

  //     gsap.set(pendingCircle, {
  //       opacity: 0,
  //     });

  //     gsap.set(thisWeekCircle, {
  //       opacity: 0,
  //     });

  //     gsap.set(thisMonthCircle, {
  //       opacity: 0,
  //     });
  //     animateOutAllPolygons();
  //     animateInCircle(pendingCircleRef, INITIAL_DELAY, "rgb(255,158,158)");
  //     animateInCircle(
  //       processedCircleRef,
  //       INITIAL_DELAY + 0.3,
  //       "rgb(161,182,255)"
  //     );
  //     animateInCircle(topCircleRef, INITIAL_DELAY + 0.6);
  //     animateInLine(bluePath, INITIAL_DELAY + 2);
  //     animateInLine(redPath, INITIAL_DELAY + 2);
  //     AnimateInPolygons(
  //       INITIAL_DELAY + 1.5,
  //       pendingTodayPolygon,
  //       processedTodayPolygon
  //     );
  //   }
  // }, []);

  // //Animation Definitions
  // /*
  // Select Animations
  // Select This Week
  // Select This Month
  // Select Today

  // */

  // //Select This Week
  // const AnimateSelectThisWeek = () => {
  //   animateOutAllPolygons();
  //   AnimateInPolygons(
  //     1.5,
  //     processedThisWeekPolygon1,
  //     processedThisWeekPolygon2,
  //     pendingThisWeekPolygon1,
  //     pendingThisWeekPolygon2,
  //     pendingThisWeekPolygon3,
  //     pendingThisWeekPolygon4
  //   );
  //   // setSelected("THIS WEEK");
  //   animateOutAllOptionCircles();
  //   animateOutAllLines();
  //   animateInCircle(thisWeekCircleRef, 0.5);
  //   animateInLine(processedThisWeekPath, 1);
  //   animateInLine(pendingThisWeekPath, 1);
  // };

  // //Select Today
  // const AnimateSelectToday = () => {
  //   animateOutAllPolygons();
  //   AnimateInPolygons(1.5, pendingTodayPolygon, processedTodayPolygon);
  //   // setSelected("TODAY");
  //   animateOutAllOptionCircles();
  //   animateOutAllLines();
  //   animateInCircle(topCircleRef, 0.5);
  //   animateInLine(redPath, 1);
  //   animateInLine(bluePath, 1);
  // };

  // //Select This Month
  // const AnimateSelectThisMonth = () => {
  //   animateOutAllPolygons();
  //   AnimateInPolygons(
  //     1.5,
  //     processedThisMonthPolygon1,
  //     processedThisMonthPolygon2,
  //     processedThisMonthPolygon3,
  //     processedThisMonthPolygon4,
  //     pendingThisMonthPolygon1,
  //     pendingThisMonthPolygon2,
  //     pendingThisMonthPolygon3
  //   );
  //   // setSelected("THIS MONTH");
  //   animateOutAllOptionCircles();
  //   animateOutAllLines();
  //   animateInCircle(thisMonthCircleRef, 0.5);
  //   animateInLine(processedThisMonthPath, 1);
  //   animateInLine(pendingThisMonthPath, 1);
  // };

  // /*
  // Animation Helpers
  // Animate in Circles
  // Animate out Circles
  // Animate in Lines
  // Animate out Lines
  // Animate out all Lines
  // Animate out all Option Circles
  // Animate out all polygons
  // Animate in Polygon
  // */
  // //Animate Out All Polygons
  // //Animate out all polygons
  // const animateOutAllPolygons = () => {
  //   gsap.set(
  //     [
  //       pendingTodayPolygon.current,
  //       pendingThisMonthPolygon1.current,
  //       pendingThisMonthPolygon2.current,
  //       pendingThisMonthPolygon3.current,
  //       pendingThisWeekPolygon1.current,
  //       pendingThisWeekPolygon2.current,
  //       pendingThisWeekPolygon3.current,
  //       pendingThisWeekPolygon4.current,
  //       processedTodayPolygon.current,
  //       processedThisWeekPolygon1.current,
  //       processedThisWeekPolygon2.current,
  //       processedThisMonthPolygon1.current,
  //       processedThisMonthPolygon2.current,
  //       processedThisMonthPolygon3.current,
  //       processedThisMonthPolygon4.current,
  //     ],
  //     {
  //       fill: "none",
  //       duration: 0.1,
  //     }
  //   );
  // };
  // //Animate in Polygon
  // const AnimateInPolygons = (delay = 1, ...polygon) => {
  //   console.log("Animate in polygons called", delay, polygon);
  //   gsap.to(
  //     polygon.map((polygon) => polygon.current),
  //     {
  //       fill: "rgba(0,0,0,0)",
  //       delay,
  //     }
  //   );
  // };
  // //Animate out all lines
  // const animateOutAllLines = () => {
  //   animateOutLine(bluePath);
  //   animateOutLine(redPath);
  //   animateOutLine(processedThisMonthPath);
  //   animateOutLine(processedThisWeekPath);
  //   animateOutLine(pendingThisMonthPath);
  //   animateOutLine(pendingThisWeekPath);
  // };
  // //Animate Out all option circles
  // const animateOutAllOptionCircles = () => {
  //   animateOutCircle(topCircleRef);
  //   animateOutCircle(thisMonthCircleRef);
  //   animateOutCircle(thisWeekCircleRef);
  // };
  // //Animate in Circles
  // const animateInCircle = (ref, delay = 0, color = "white") => {
  //   const circle = ref.current;
  //   if (circle) {
  //     gsap.to(circle, {
  //       opacity: 1,
  //       duration: 1,
  //       fill: color,
  //       stroke: color,
  //       delay,
  //       ease: Power3.easeIn,
  //     });
  //   }
  // };
  // //Animate out circles
  // const animateOutCircle = (ref, delay = 0) => {
  //   const circle = ref.current;
  //   console.log("Animating out circle");
  //   if (circle) {
  //     gsap.to(circle, {
  //       duration: 1,
  //       stroke: "black",
  //       fill: "black",
  //       delay,
  //       ease: Power3.easeOut,
  //     });
  //   }
  // };

  // //Animate in lines
  // const animateInLine = (ref, delay = 0) => {
  //   const path = ref.current;

  //   gsap.to(path, {
  //     strokeDashoffset: 0,
  //     duration: 1, // Adjust the duration as needed
  //     delay,
  //     opacity: 1,
  //     ease: "power2.inOut", // Use your preferred easing function
  //   });
  // };

  // //Animate out Lines
  // const animateOutLine = (ref, delay = 0) => {
  //   const path = ref.current;
  //   const strokeDashOffset = path.getTotalLength();
  //   gsap.to(path, {
  //     strokeDashoffset: strokeDashOffset,
  //     strokeDasharray: strokeDashOffset,
  //     strokeLinecap: "butt",
  //     delay,
  //     duration: 1, // Adjust the duration as needed
  //     ease: "power2.inOut", // Use your preferred easing function
  //   });
  // };

  // //Red Thread manipulation helpers
  // const manageRedMouseMove = (e) => {
  //   // const { movementY } = e;
  //   if (redMouseStartY === 0) {
  //     redMouseStartY = e.clientY;
  //     return;
  //   }
  //   console.log("AnimationDebug:Moving Mouse:", redMouseStartY, e.clientY, e);
  //   const movementY = e.clientY - redMouseStartY;
  //   console.log("Red MouseMovement", movementY, e);
  //   redProgress += movementY * 3;
  //   setRedPath(redProgress);
  //   redMouseStartY = e.clientY;
  // };

  // const manageRedMouseLeave = (e) => {
  //   animateRedOut();
  // };

  // const manageRedMouseEnter = (e) => {
  //   console.log("AnimationDebug:Setting RedmouseStartY:", e.clientY, e);
  //   redMouseStartY = e.clientY;
  //   if (redReqId) {
  //     window.cancelAnimationFrame(redReqId);
  //     resetRedAnimation();
  //   }
  // };

  // const animateRedOut = (e) => {
  //   const newProgress = redProgress * Math.sin(redTime);
  //   redTime += 0.2;
  //   setRedPath(newProgress);
  //   redProgress = lerp(redProgress, 0, 0.025);
  //   if (Math.abs(redProgress) > 0.75) {
  //     redReqId = window.requestAnimationFrame(animateRedOut);
  //   } else {
  //     resetRedAnimation();
  //   }
  // };

  // const resetRedAnimation = () => {
  //   redProgress = 0;
  //   redTime = Math.PI / 2;
  // };

  // const setRedPath = (redProgress) => {
  //   redPath.current.setAttributeNS(
  //     "",
  //     "d",
  //     `M100 100 Q14 ${30 + redProgress}, 50 0`
  //   );
  // };
  // //Pending this week path thread manipulators
  // const setPendingThisWeekPath = (pendingThisWeekProgress) => {
  //   pendingThisWeekPath.current.setAttributeNS(
  //     "",
  //     "d",
  //     `M100 100 Q30 ${30 + pendingThisWeekProgress}, -60 20`
  //   );
  // };

  // const resetPendingThisWeekAnimation = () => {
  //   pendingThisWeekProgress = 0;
  //   pendingThisWeekTime = Math.PI / 2;
  // };

  // const animatePendingThisWeekOut = (e) => {
  //   const newProgress = pendingThisWeekProgress * Math.sin(pendingThisWeekTime);
  //   pendingThisWeekTime += 0.2;
  //   setPendingThisWeekPath(newProgress);
  //   pendingThisWeekProgress = lerp(pendingThisWeekProgress, 0, 0.025);
  //   if (Math.abs(pendingThisWeekProgress) > 0.75) {
  //     pendingThisWeekReqId = window.requestAnimationFrame(
  //       animatePendingThisWeekOut
  //     );
  //   } else {
  //     resetPendingThisWeekAnimation();
  //   }
  // };

  // const managePendingThisWeekMouseMove = (e) => {
  //   // const { movementY } = e;
  //   if (pendingThisWeekMouseStartY === 0) {
  //     pendingThisWeekMouseStartY = e.clientY;
  //     return;
  //   }
  //   console.log(
  //     "AnimationDebug:Moving Mouse:",
  //     pendingThisWeekMouseStartY,
  //     e.clientY,
  //     e
  //   );
  //   const movementY = e.clientY - pendingThisWeekMouseStartY;
  //   console.log("Red MouseMovement", movementY, e);
  //   pendingThisWeekProgress += movementY * 3;
  //   setPendingThisWeekPath(pendingThisWeekProgress);
  //   pendingThisWeekMouseStartY = e.clientY;
  // };

  // const managePendingThisWeekMouseLeave = (e) => {
  //   animatePendingThisWeekOut();
  // };

  // const managePendingThisWeekMouseEnter = (e) => {
  //   console.log("AnimationDebug:Setting RedmouseStartY:", e.clientY, e);
  //   pendingThisWeekMouseStartY = e.clientY;
  //   if (pendingThisWeekReqId) {
  //     window.cancelAnimationFrame(pendingThisWeekReqId);
  //     resetPendingThisWeekAnimation();
  //   }
  // };

  // //Pending this Month path thread manipulators
  // const setPendingThisMonthPath = (pendingThisMonthProgress) => {
  //   // console.log("pendingThisMonthRef", pendingThisMonthPath);
  //   pendingThisMonthPath.current.setAttributeNS(
  //     "",
  //     "d",
  //     `M100 100 Q90 ${30 + pendingThisMonthProgress}, 160 20`
  //   );
  // };

  // const resetPendingThisMonthAnimation = () => {
  //   pendingThisMonthProgress = 0;
  //   pendingThisMonthTime = Math.PI / 2;
  // };

  // const animatePendingThisMonthOut = (e) => {
  //   const newProgress =
  //     pendingThisMonthProgress * Math.sin(pendingThisMonthTime);
  //   pendingThisMonthTime += 0.2;
  //   setPendingThisMonthPath(newProgress);
  //   pendingThisMonthProgress = lerp(pendingThisMonthProgress, 0, 0.025);
  //   if (Math.abs(pendingThisMonthProgress) > 0.75) {
  //     pendingThisMonthReqId = window.requestAnimationFrame(
  //       animatePendingThisMonthOut
  //     );
  //   } else {
  //     resetPendingThisMonthAnimation();
  //   }
  // };

  // const managePendingThisMonthMouseMove = (e) => {
  //   // const { movementY } = e;
  //   if (pendingThisMonthMouseStartY === 0) {
  //     pendingThisMonthMouseStartY = e.clientY;
  //     return;
  //   }
  //   console.log(
  //     "AnimationDebug:Moving Mouse:",
  //     pendingThisMonthMouseStartY,
  //     e.clientY,
  //     e
  //   );
  //   const movementY = e.clientY - pendingThisMonthMouseStartY;
  //   console.log("Red MouseMovement", movementY, e);
  //   pendingThisMonthProgress += movementY * 3;
  //   setPendingThisMonthPath(pendingThisMonthProgress);
  //   pendingThisMonthMouseStartY = e.clientY;
  // };

  // const managePendingThisMonthMouseLeave = (e) => {
  //   animatePendingThisMonthOut();
  // };

  // const managePendingThisMonthMouseEnter = (e) => {
  //   console.log("AnimationDebug:Setting RedmouseStartY:", e.clientY, e);
  //   pendingThisMonthMouseStartY = e.clientY;
  //   if (pendingThisMonthReqId) {
  //     window.cancelAnimationFrame(pendingThisMonthReqId);
  //     resetPendingThisMonthAnimation();
  //   }
  // };

  // //Blue Thread manipulation helpers
  // const manageBlueMouseMove = (e) => {
  //   // const { movementY } = e;
  //   console.log("firstDebug:", e.clientY, blueMouseStartY);
  //   if (blueMouseStartY === 0) {
  //     blueMouseStartY = e.clientY;
  //     return;
  //   }
  //   const movementY = e.clientY - blueMouseStartY;
  //   blueProgress += movementY * 3;
  //   setBluePath(blueProgress);
  //   blueMouseStartY = e.clientY;
  // };

  // const manageBlueMouseLeave = (e) => {
  //   animateBlueOut();
  // };

  // const manageBlueMouseEnter = (e) => {
  //   if (blueReqId) {
  //     window.cancelAnimationFrame(blueReqId);
  //     resetBlueAnimation();
  //   }
  // };

  // const animateBlueOut = (e) => {
  //   const newProgress = blueProgress * Math.sin(blueTime);
  //   blueTime += 0.2;
  //   setBluePath(newProgress);
  //   blueProgress = lerp(blueProgress, 0, 0.025);
  //   if (Math.abs(blueProgress) > 0.75) {
  //     blueReqId = window.requestAnimationFrame(animateBlueOut);
  //   } else {
  //     resetBlueAnimation();
  //   }
  // };

  // const resetBlueAnimation = () => {
  //   blueProgress = 0;
  //   blueTime = Math.PI / 2;
  // };

  // const setBluePath = (blueProgress) => {
  //   bluePath.current.setAttributeNS(
  //     "",
  //     "d",
  //     `M0 100 Q87 ${30 + blueProgress}, 50 0`
  //   );
  // };

  // //Processed This Week Thread manipulation helpers
  // const manageProcessedThisWeekMouseMove = (e) => {
  //   // const { movementY } = e;
  //   console.log("firstDebug:", e.clientY, processedThisWeekMouseStartY);
  //   if (processedThisWeekMouseStartY === 0) {
  //     processedThisWeekMouseStartY = e.clientY;
  //     return;
  //   }
  //   const movementY = e.clientY - processedThisWeekMouseStartY;
  //   processedThisWeekProgress += movementY * 3;
  //   setProcessedThisWeekPath(processedThisWeekProgress);
  //   processedThisWeekMouseStartY = e.clientY;
  // };

  // const manageProcessedThisWeekMouseLeave = (e) => {
  //   animateProcessedThisWeekOut();
  // };

  // const manageProcessedThisWeekMouseEnter = (e) => {
  //   if (processedThisWeekReqId) {
  //     window.cancelAnimationFrame(processedThisWeekReqId);
  //     resetProcessedThisWeekAnimation();
  //   }
  // };

  // const animateProcessedThisWeekOut = (e) => {
  //   const newProgress =
  //     processedThisWeekProgress * Math.sin(processedThisWeekTime);
  //   processedThisWeekTime += 0.2;
  //   setProcessedThisWeekPath(newProgress);
  //   processedThisWeekProgress = lerp(processedThisWeekProgress, 0, 0.025);
  //   if (Math.abs(processedThisWeekProgress) > 0.75) {
  //     processedThisWeekReqId = window.requestAnimationFrame(
  //       animateProcessedThisWeekOut
  //     );
  //   } else {
  //     resetProcessedThisWeekAnimation();
  //   }
  // };

  // const resetProcessedThisWeekAnimation = () => {
  //   processedThisWeekProgress = 0;
  //   processedThisWeekTime = Math.PI / 2;
  // };

  // const setProcessedThisWeekPath = (processedThisWeekProgress) => {
  //   processedThisWeekPath.current.setAttributeNS(
  //     "",
  //     "d",
  //     `M0 100 Q20 ${30 + processedThisWeekProgress}, -60 20`
  //   );
  // };

  // //Processed This Month Thread manipulation helpers
  // const manageProcessedThisMonthMouseMove = (e) => {
  //   // const { movementY } = e;
  //   console.log("firstDebug:", e.clientY, processedThisMonthMouseStartY);
  //   if (processedThisMonthMouseStartY === 0) {
  //     processedThisMonthMouseStartY = e.clientY;
  //     return;
  //   }
  //   const movementY = e.clientY - processedThisMonthMouseStartY;
  //   processedThisMonthProgress += movementY * 1.6;
  //   setProcessedThisMonthPath(processedThisMonthProgress);
  //   processedThisMonthMouseStartY = e.clientY;
  // };

  // const manageProcessedThisMonthMouseLeave = (e) => {
  //   animateProcessedThisMonthOut();
  // };

  // const manageProcessedThisMonthMouseEnter = (e) => {
  //   if (processedThisMonthReqId) {
  //     window.cancelAnimationFrame(processedThisMonthReqId);
  //     resetProcessedThisMonthAnimation();
  //   }
  // };

  // const animateProcessedThisMonthOut = (e) => {
  //   const newProgress =
  //     processedThisMonthProgress * Math.sin(processedThisMonthTime);
  //   processedThisMonthTime += 0.2;
  //   setProcessedThisMonthPath(newProgress);
  //   processedThisMonthProgress = lerp(processedThisMonthProgress, 0, 0.025);
  //   if (Math.abs(processedThisMonthProgress) > 0.75) {
  //     processedThisMonthReqId = window.requestAnimationFrame(
  //       animateProcessedThisMonthOut
  //     );
  //   } else {
  //     resetProcessedThisMonthAnimation();
  //   }
  // };

  // const resetProcessedThisMonthAnimation = () => {
  //   processedThisMonthProgress = 0;
  //   processedThisMonthTime = Math.PI / 2;
  // };

  // const setProcessedThisMonthPath = (processedThisMonthProgress) => {
  //   processedThisMonthPath.current.setAttributeNS(
  //     "",
  //     "d",
  //     `M0 100 Q10 ${30 + processedThisMonthProgress}, 160 20`
  //   );
  // };
  // useEffect(() => {
  //   const resizeObserver = new ResizeObserver((entries) => {
  //     for (const entry of entries) {
  //       // The height of the observed element has changed
  //       console.log("New height:", entry.contentRect.height);
  //       calculatePosition();
  //       calculateThisWeekPosition();
  //       calculateThisMonthPosition();
  //       calculateProcessedPosition();
  //       calculatePendingPosition();
  //     }
  //   });

  //   // Start observing the height changes of the div
  //   if (statsRef.current) {
  //     resizeObserver.observe(statsRef.current);
  //   }

  //   // Clean up the observer when the component unmounts
  //   return () => {
  //     resizeObserver.disconnect();
  //   };
  // }, []);
  const calculateThisMonthCounterValue = useMemo(() => {
    //Edge Case here explain
    if (mapLoading) return;
    console.log("CounterDebug:Function enter", selectedDate);
    const startOfMonth = dayjs(selectedDate).startOf("month");
    const endOfMonth = dayjs(selectedDate).endOf("month");
    console.log(
      "CounterDebug:Function enter",
      selectedDate,
      startOfMonth,
      endOfMonth
    );

    let currentDate = startOfMonth.clone();
    let counterValue = 0;

    while (currentDate.isSame(endOfMonth) || currentDate.isBefore(endOfMonth)) {
      console.log("CounterDebug:In loop for date", currentDate);
      if (dateMap.get(currentDate?.format("YYYY-MM-DD"))) {
        counterValue += dateMap.get(currentDate?.format("YYYY-MM-DD"))?.data
          ?.length;
      } else {
        //Mock API hit
        const dataObject = {
          data: generateData(),
          date: currentDate,
        };
        counterValue += dataObject?.data?.length;
        dateMap.set(currentDate.format("YYYY-MM-DD"), dataObject);
      }

      currentDate = currentDate.add(1, "day");
    }
    return counterValue;
  }, [selectedDate.format("YYYY/MM/DD"), dateMap, mapLoading]);

  const calculateThisWeekCounterValue = useMemo(() => {
    //Edge Case here explain
    if (mapLoading) return;
    console.log("CounterDebug:Function enter", selectedDate);
    const startOfWeek = dayjs(selectedDate).startOf("week");
    const endOfWeek = dayjs(selectedDate).endOf("week");
    console.log(
      "CounterDebug:Function enter",
      selectedDate,
      startOfWeek,
      endOfWeek
    );

    let currentDate = startOfWeek.clone();
    let counterValue = 0;

    while (currentDate.isSame(endOfWeek) || currentDate.isBefore(endOfWeek)) {
      console.log("CounterDebug:In loop for date", currentDate);
      if (dateMap.get(currentDate?.format("YYYY-MM-DD"))) {
        counterValue += dateMap.get(currentDate?.format("YYYY-MM-DD"))?.data
          ?.length;
      } else {
        //Mock API hit
        const dataObject = {
          data: generateData(),
          date: currentDate,
        };
        counterValue += dataObject?.data?.length;
        dateMap.set(currentDate.format("YYYY-MM-DD"), dataObject);
      }

      currentDate = currentDate.add(1, "day");
    }
    return counterValue;
  }, [selectedDate.format("YYYY/MM/DD"), dateMap, mapLoading]);

  const calculateRequestsData = useMemo(() => {
    if (mapLoading) return;
    //Edge Case here explain
    const startOfWeek = dayjs(selectedDate).startOf(
      selectedRange === SELECTABLE_RANGES.TODAY
        ? "day"
        : selectedRange === SELECTABLE_RANGES.THIS_WEEK
        ? "week"
        : "month"
    );
    const endOfWeek = dayjs(selectedDate).endOf(
      selectedRange === SELECTABLE_RANGES.TODAY
        ? "day"
        : selectedRange === SELECTABLE_RANGES.THIS_WEEK
        ? "week"
        : "month"
    );
    console.log(
      "CounterDataDebug:Function enter",
      selectedDate,
      startOfWeek,
      endOfWeek
    );

    let currentDate = startOfWeek.clone();
    let counterValueDataArray = [];

    while (currentDate.isSame(endOfWeek) || currentDate.isBefore(endOfWeek)) {
      console.log("CounterDebug:In loop for date", currentDate);
      if (dateMap.get(currentDate?.format("YYYY-MM-DD"))) {
        counterValueDataArray.push(
          dateMap.get(currentDate?.format("YYYY-MM-DD"))?.data
        );
      } else {
        //Mock API hit
        const dataObject = {
          data: generateData(),
          date: currentDate,
        };
        counterValueDataArray.push(dataObject?.data);

        dateMap.set(currentDate.format("YYYY-MM-DD"), dataObject);
      }
      currentDate = currentDate.add(1, "day");
    }

    const filterCompanies =
      filters?.companies?.length > 0 ? filters?.companies : COMPANIES;
    const filterAttachments =
      filters?.types?.length > 0 ? filters.types : ATTACHMENT_TYPES;
    console.log("newDebug:", filterCompanies, filterAttachments);
    let counterValue = counterValueDataArray.reduce(
      (accumulator, current, index) => {
        console.log("newDebug:Reduce Ran", index);
        for (let i = 0; i < current.length; i++) {
          if (
            !(
              filterCompanies.includes(current[i]?.company) &&
              current[i]?.attachments.some((attachment) =>
                filterAttachments.includes(attachment?.type)
              )
            )
          ) {
            console.log("NewDebug:returning Condition not matched", {
              accumulator,
              counterValueDataArray,
              filterCompanies,
              filterAttachments,
              firstCondition: filterCompanies.includes(current[i]?.company),
              secondCondition: current[i]?.attachments.some((attachment) => {
                console.log(
                  "newDebug:in some debug",
                  filterAttachments,
                  attachment
                );
                return filterAttachments.includes(attachment?.type);
              }),
              current: current[i],
            });
            continue;
          }
          console.log("newDebug:conditionMatched", {
            counterValueDataArray,
            filterCompanies,
            filterAttachments,
            firstCondition: filterCompanies.includes(current[i]?.company),
            secondCondition: current[i]?.attachments.some((attachment) => {
              console.log(
                "newDebug:in some debug",
                filterAttachments,
                attachment
              );
              return filterAttachments.includes(attachment?.type);
            }),
            current: current[i],
          });
          if (current[i]?.status === REQUEST_STATUS.PROCESSED) {
            accumulator = {
              ...accumulator,
              numOfProcessedRequests: accumulator.numOfProcessedRequests + 1,
              processedData: [...accumulator.processedData, current[i]],
            };
          } else {
            accumulator = {
              ...accumulator,
              numOfPendingRequests: accumulator.numOfPendingRequests + 1,
              pendingData: [...accumulator.pendingData, current[i]],
            };
          }
        }
        return accumulator;
      },
      {
        // selectedDate: selectedDate.format("YYYY/MM/DD"),
        numOfPendingRequests: 0,
        numOfProcessedRequests: 0,
        pendingData: [],
        processedData: [],
      }
    );
    console.log("newDebug:Final", {
      counterValueDataArray,
      counterValue,
    });
    return counterValue;
  }, [
    selectedDate.format("YYYY/MM/DD"),
    dateMap,
    mapLoading,
    filters,
    selectedRange,
  ]);

  const calculateThisWeekLabel = useMemo(() => {
    //Edge Case here explain
    if (mapLoading) return;
    console.log("CounterDebug:Function enter", selectedDate);
    const startOfWeek = dayjs(selectedDate).startOf("week");
    const endOfWeek = dayjs(selectedDate).endOf("week");

    return `${startOfWeek.format("MM/DD")}-${endOfWeek.format("MM/DD")}`;
  }, [selectedDate.format("YYYY/MM/DD"), dateMap, mapLoading]);

  const calculateThisMonthLabel = useMemo(() => {
    //Edge Case here explain
    if (mapLoading) return;
    console.log("CounterDebug:Function enter", selectedDate);
    const startOfMonth = dayjs(selectedDate).startOf("month");
    const endOfMonth = dayjs(selectedDate).endOf("month");

    return `${startOfMonth.format("MM/DD")}-${endOfMonth.format("MM/DD")}`;
  }, [selectedDate.format("YYYY/MM/DD"), dateMap, mapLoading]);

  return (
    <div ref={statsRef} className="statisticsContainer">
      {/* Filters */}
      <Filters filters={filters} setFilters={setFilters} />
      {/* <div className="filtersContainer">
        <div className="filterByTextContainer">Filter by:</div>

        <div className="filterByButton" onClick={filterModalEnterAnimation}>
          <FaPlus color={"#242124"} size={10} />
          <div ref={filterModalRef} className="filterModal">
            <div className="filterModalListsContainer">
              <div className="filterModalListContainer">
                <div className="filterModalListTitleContainer">Company</div>
                <div className="filterModalListScrollView">
                  {COMPANIES.map((company) => (
                    <div
                      onClick={() => {
                        toggleFilter({
                          type: filterTypes.COMPANY,
                          value: company,
                        });
                      }}
                      key={company}
                      className="filterModalListItem"
                    >
                      {company}
                      <div className="filterModalListItemCheckbox">
                        {modalFilters.companies.includes(company) && (
                          <FaCheck size={10} color={"white"} />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="filterModalListContainer">
                <div className="filterModalListTitleContainer">Type</div>
                <div className="filterModalListScrollView">
                  {ATTACHMENT_TYPES.map((type) => (
                    <div
                      onClick={() => {
                        toggleFilter({
                          type: filterTypes.ATTACHMENT,
                          value: type,
                        });
                      }}
                      className="filterModalListItem"
                      key={type}
                    >
                      {type}
                      <div className="filterModalListItemCheckbox">
                        {modalFilters.types.includes(type) && (
                          <FaCheck size={10} color={"white"} />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              onClick={(e) => {
                e.stopPropagation();
                confirmSelection();
                filterModalExitAnimation();
              }}
              className="filterModalConfirmSelectionButton"
            >
              Confirm Selection
            </div>
          </div>
        </div>
        <div className="appliedFiltersContainer">
          {filters.companies.map((company) => (
            <div key={company} className="appliedFilterItem">
              {`comp.-${company}`}
              <div className="filterItemRemoveButton">
                <ImCross
                  onClick={() => {
                    removeFilterFromTag({
                      type: filterTypes.COMPANY,
                      value: company,
                    });
                  }}
                  size={"5px"}
                  color="#0f0f0f"
                />
              </div>
            </div>
          ))}

          {filters.types.map((type) => (
            <div key={type} className="appliedFilterItem">
              {`type-${type}`}
              <div className="filterItemRemoveButton">
                <ImCross
                  onClick={() => {
                    removeFilterFromTag({
                      type: filterTypes.ATTACHMENT,
                      value: type,
                    });
                  }}
                  size={"5px"}
                  color="#0f0f0f"
                />
              </div>
            </div>
          ))}
        </div>
      </div> */}
      {/* Filters Container over */}
      {/*SVG */}
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
