import React from "react";
import DataBox from "../DataBox/DataBox";
import OptionBox from "../OptionBox/OptionBox";
import { SELECTABLE_RANGES } from "../../../../core/constants/constants";
import { useStatsSVG } from "./useStatsSVG";

function StatsSVG({
  statsRef,
  dateMap,
  selectedDate,
  mapLoading,
  INITIAL_DELAY,
  selectedRange,
  setSelectedRange,
  calculateRequestsData,
  calculateThisWeekCounterValue,
  calculateThisMonthCounterValue,
  calculateThisMonthLabel,
  calculateThisWeekLabel,
}) {
  const {
    processedPosition,
    pendingPosition,
    todayBox,
    AnimateSelectToday,
    divPosition,
    thisWeekBox,
    AnimateSelectThisWeek,
    thisWeekPosition,
    thisMonthBox,
    AnimateSelectThisMonth,
    thisMonthPosition,
    bluePath,
    redPath,
    thisMonthCircleRef,
    thisWeekCircleRef,
    topCircleRef,
    pendingCircleRef,

    processedCircleRef,
    processedThisMonthPolygon4,
    processedThisMonthPolygon3,
    manageProcessedThisMonthMouseLeave,
    processedThisMonthPolygon2,
    manageProcessedThisMonthMouseMove,
    manageProcessedThisMonthMouseEnter,
    processedThisMonthPolygon1,
    processedThisWeekPolygon2,
    manageProcessedThisWeekMouseLeave,
    manageProcessedThisWeekMouseMove,
    processedThisWeekPolygon1,
    manageProcessedThisWeekMouseEnter,
    manageBlueMouseLeave,
    manageBlueMouseEnter,
    manageBlueMouseMove,
    processedTodayPolygon,
    pendingThisWeekPolygon4,
    pendingThisWeekPolygon3,
    pendingThisWeekPolygon2,
    managePendingThisWeekMouseLeave,
    managePendingThisWeekMouseMove,
    managePendingThisWeekMouseEnter,
    pendingThisWeekPolygon1,
    pendingThisMonthPolygon2,
    pendingThisMonthPolygon3,
    managePendingThisMonthMouseLeave,
    managePendingThisMonthMouseMove,
    managePendingThisMonthMouseEnter,
    pendingThisMonthPolygon1,
    manageRedMouseLeave,
    manageRedMouseMove,
    pendingTodayPolygon,
    manageRedMouseEnter,
    processedThisMonthPath,
    pendingThisWeekPath,
    pendingThisMonthPath,
    processedThisWeekPath,
  } = useStatsSVG({
    INITIAL_DELAY,
    statsRef,
  });

  return (
    <>
      <div className="svgUpperBox"></div>
      {/* SVG */}
      <div className="svgContainer">
        <DataBox
          position={processedPosition}
          displayValue={"Processed"}
          counterValue={
            mapLoading
              ? "00"
              : calculateRequestsData.numOfProcessedRequests
                  ?.toString()
                  .padStart(2, "0")
          }
          optionalStyles={{
            color: "rgb(161,182,255)",
            width: "10px",
            height: "10px",
            top: `${processedPosition.top + 50}px`,
            left: `${processedPosition.left - 35}px`,
          }}
          topOffset={40}
          leftOffset={14}
          initialDelay={INITIAL_DELAY}
        />

        <DataBox
          position={pendingPosition}
          displayValue={"Pending"}
          counterValue={
            mapLoading
              ? "00"
              : calculateRequestsData.numOfPendingRequests
                  ?.toString()
                  .padStart(2, "0")
          }
          optionalStyles={{
            color: "rgb(255,158,158)",
            width: "10px",
            height: "10px",
            top: `${pendingPosition.top + 50}px`,
            left: `${pendingPosition.left + 45}px`,
          }}
          topOffset={40}
          leftOffset={14}
          initialDelay={INITIAL_DELAY}
        />

        <OptionBox
          initialDelay={INITIAL_DELAY}
          boxRef={todayBox}
          onClick={AnimateSelectToday}
          boxRange={SELECTABLE_RANGES.TODAY}
          selectedRange={selectedRange}
          setSelectedRange={setSelectedRange}
          position={divPosition}
          topOffset={15}
          leftOffset={47}
          duration={2}
          optionalStyles={{ width: "100px", height: "1px" }}
          counterValue={
            mapLoading
              ? "00"
              : String(
                  dateMap.get(selectedDate?.format("YYYY-MM-DD"))?.data?.length
                ).padStart(2, "0")
          }
          header={"Today"}
          dateValue={"1/16/24"}
          label={selectedDate.format("MM/DD/YYYY")}
          selectedDate={selectedDate}
        />
        <OptionBox
          initialDelay={INITIAL_DELAY}
          boxRef={thisWeekBox}
          selectedRange={selectedRange}
          setSelectedRange={setSelectedRange}
          boxRange={SELECTABLE_RANGES.THIS_WEEK}
          onClick={AnimateSelectThisWeek}
          position={thisWeekPosition}
          topOffset={15}
          leftOffset={47}
          optionalStyles={{
            width: "100px",
            height: "1px",
          }}
          counterValue={
            mapLoading
              ? "00"
              : calculateThisWeekCounterValue.toString().padStart(2, "0")
          }
          header={"This Week"}
          dateValue={"1/1-1/7"}
          label={calculateThisWeekLabel}
        />
        <OptionBox
          initialDelay={INITIAL_DELAY}
          boxRef={thisMonthBox}
          selectedRange={selectedRange}
          setSelectedRange={setSelectedRange}
          boxRange={SELECTABLE_RANGES.THIS_MONTH}
          onClick={AnimateSelectThisMonth}
          position={thisMonthPosition}
          topOffset={15}
          leftOffset={45}
          optionalStyles={{ width: "100px", height: "1px" }}
          counterValue={
            mapLoading
              ? "00"
              : calculateThisMonthCounterValue.toString().padStart(2, "0")
          }
          header={"This Month"}
          label={calculateThisMonthLabel}
          // selectedDate={selectedDate}
        />
        <svg
          // preserveAspectRatio="none"
          viewBox="0 0 100 100"
          className="svg"
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
          {/* <path stroke="green" strokeWidth={0.2} d="M10 0 V100" />
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
          <path stroke="green" strokeWidth={1} d="M0 50 H100" /> */}
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
      <div className="svgLowerBox"></div>
    </>
  );
}

export default StatsSVG;
