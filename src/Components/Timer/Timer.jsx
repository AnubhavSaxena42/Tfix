import { Slider, Tooltip } from "@mui/material";
import dayjs from "dayjs";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useRef, useState } from "react";
import SlotCounter from "react-slot-counter";
import "./Timer.css";
import gsap from "gsap";
import { SMALL_WINDOW_WIDTH } from "../Timeline/constants";
const theme = createTheme({
  palette: {
    primary: {
      main: "#fa8383",
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: "#fa8383",
      light: "#fa8383",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#fa8383",
    },
  },
});
function Timer() {
  const INITIAL_DELAY = 6;
  const timerRef = useRef(null);
  // const [windowSize, setWindowSize] = useState("Big");
  const [timeValue, setTimeValue] = useState(0);
  const [stringTimeValue, setStringTimeValue] = useState(
    secondsToTimeString(timeValue)
  );
  const getCurrentSecondsOfDay = () => {
    const now = dayjs();
    const startOfDay = now.startOf("day");
    const secondsPassed = now.diff(startOfDay, "second");
    return secondsPassed;
  };

  // function getCurrentDimension() {
  //   return {
  //     width: window.innerWidth,
  //     height: window.innerHeight,
  //   };
  // }

  // const transitionToSmallWindowState = () => {
  //   gsap.to(".timerCounterCharacter", {
  //     fontSize: "12px",
  //   });
  // };

  // const transitionToBigWindowState = () => {
  //   gsap.to(".timerCounterCharacter", {
  //     fontSize: "18px",
  //   });
  // };

  // const updateDimension = () => {
  //   const { width, height } = getCurrentDimension();
  //   console.log("Updating Dimension Function:", width, windowSize);
  //   if (width <= SMALL_WINDOW_WIDTH) {
  //     if (windowSize === "Big") {
  //       console.log("Setting Window Size to small");
  //       setWindowSize("Small");
  //       transitionToSmallWindowState();
  //     }
  //   } else {
  //     if (windowSize === "Small") {
  //       console.log("Setting window Size to big");
  //       setWindowSize("Big");
  //       transitionToBigWindowState();
  //     }
  //   }
  // };

  const updateTimeValue = () => {
    const getCurrentSeconds = getCurrentSecondsOfDay();

    if (stringTimeValue !== secondsToTimeString(getCurrentSeconds)) {
      setTimeValue(getCurrentSeconds);
      setStringTimeValue(secondsToTimeString(getCurrentSeconds));
    }
  };
  function secondsToTimeString(seconds) {
    const startOfDay = dayjs().startOf("day");
    const currentTime = startOfDay.add(seconds, "second");

    return currentTime.format("hh:mm A");
  }
  const AnimateEnterTimer = () => {
    const timer = timerRef.current;
    if (timer) {
      gsap.fromTo(
        timer,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.in",
          delay: INITIAL_DELAY,
        }
      );
    }
  };
  // useEffect(() => {
  //   window.addEventListener("resize", updateDimension);

  //   return () => {
  //     window.removeEventListener("resize", updateDimension);
  //   };
  // }, [windowSize]);
  useEffect(() => {
    const barTimeInterval = setInterval(() => {
      updateTimeValue();
    }, 2000);
    // updateDimension();
    AnimateEnterTimer();
    return () => {
      clearInterval(barTimeInterval);
    };
  }, []);

  return (
    <div className="timerContainer" ref={timerRef}>
      {/* Timer Slider */}
      <div className="timerSliderContainer">
        <ThemeProvider theme={theme}>
          <Slider
            value={timeValue}
            valueLabelFormat={(value) => secondsToTimeString(value)}
            color="primary"
            valueLabelDisplay="auto"
            step={1}
            min={0}
            max={86400}
            size="small"
            onChange={() => {}}
          />
        </ThemeProvider>
      </div>

      {/* Current Time Slot Counter */}
      <SlotCounter
        containerClassName="timerCounterContainer"
        charClassName="timerCounterCharacter"
        initialValue={secondsToTimeString(getCurrentSecondsOfDay)}
        value={stringTimeValue}
      />
    </div>
  );
}

export default Timer;
