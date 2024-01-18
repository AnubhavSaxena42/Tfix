import React, { useEffect, useRef, useState } from "react";
import styles from "./greeting.module.css";
import gsap, { Power3 } from "gsap";
import { SMALL_WINDOW_WIDTH } from "../Timeline/constants";

function Greeting() {
  const [windowSize, setWindowSize] = useState("Big");
  const values = {
    username: "Anubhav",
    timeOfTheDay: "Morning",
  };

  let greetingRef = useRef(null);

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  const transitionToBigWindowState = () => {
    gsap.to(greetingRef, {
      fontSize: "32px",
    });
  };

  const transitionToSmallWindowState = () => {
    gsap.to(greetingRef, {
      fontSize: "24px",
    });
  };

  const updateDimension = () => {
    const { width, height } = getCurrentDimension();
    console.log("Updating Dimension Function:", width, windowSize);
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

  useEffect(() => {
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [windowSize]);

  const greetingEnterAnimation = () => {
    gsap.fromTo(
      greetingRef,
      {
        x: 100,
        opacity: 0,
      },
      { x: 0, duration: 1.5, opacity: 1, ease: "power3.in" }
    );
  };

  useEffect(() => {
    greetingEnterAnimation();
    updateDimension();
  }, []);
  return (
    <div ref={(el) => (greetingRef = el)} className={styles.greeting}>
      Good {values.timeOfTheDay}, {values.username}.
    </div>
  );
}

export default Greeting;
