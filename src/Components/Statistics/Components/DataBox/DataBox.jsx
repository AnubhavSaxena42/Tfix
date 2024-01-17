import gsap from "gsap";
import React, { useCallback, useEffect, useRef, useState } from "react";
import SlotCounter from "react-slot-counter";
import "./DataBox.css";
import { SMALL_WINDOW_WIDTH } from "../../../Timeline/constants";
function DataBox({
  position,
  topOffset,
  color,
  leftOffset,
  counterValue,
  displayValue,
  initialDelay,
  optionalStyles,
}) {
  const dataBox = useRef(null);
  const [windowSize, setWindowSize] = useState("Big");
  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

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

  const formatString = useCallback(
    (inputString) => {
      const words = inputString.split(" ");

      const formattedWords = words.map((word, index) => {
        const firstLetter = word[0];
        const otherLetters = word.slice(1);

        return (
          <span key={index}>
            <span className="firstLetter">{firstLetter}</span>
            <span className="otherLetters">{otherLetters}</span>
          </span>
        );
      });

      return <div>{formattedWords}</div>; // You can use any suitable parent element
    },
    [displayValue]
  );

  console.log("Updating Dimension Function:", windowSize);
  const transitionToBigWindowState = () => {
    gsap.to(dataBox.current.querySelectorAll(".otherLetters"), {
      fontSize: "18px",
    });
    gsap.to(dataBox.current.querySelectorAll(".firstLetter"), {
      fontSize: "24px",
    });

    gsap.to(dataBox.current.querySelectorAll(".counterDataBox"), {
      fontSize: "44px",
    });
    gsap.to(dataBox.current.querySelectorAll(".counterDataBoxContainer"), {
      bottom: "20px",
    });
  };

  const transitionToSmallWindowState = () => {
    // return;
    //Depends if it is selected or not

    gsap.to(dataBox.current.querySelectorAll(".otherLetters"), {
      fontSize: "14px",
    });
    gsap.to(dataBox.current.querySelectorAll(".firstLetter"), {
      fontSize: "16px",
      translateY: 6,
    });

    gsap.to(dataBox.current.querySelectorAll(".counterDataBox"), {
      fontSize: "24px",
    });
    gsap.to(dataBox.current.querySelectorAll(".counterDataBoxContainer"), {
      bottom: "14px",
      //   opacity: 0,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [windowSize]);

  useEffect(() => {
    gsap.set(dataBox.current.querySelectorAll(".otherLetters"), {
      fontSize: "18px",
    });
    gsap.set(dataBox.current.querySelectorAll(".firstLetter"), {
      fontSize: "24px",
    });
    dataBoxEnterAnimation();
    updateDimension();
  }, []);

  //dataBox Enter
  const dataBoxEnterAnimation = () => {
    gsap.fromTo(
      dataBox.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        duration: 1,
        delay: initialDelay + 3,
        y: 0,
        ease: "power1.in",
      }
    );
  };

  return (
    <div
      // onClick={AnimateSelectToday}
      ref={dataBox}
      style={{
        // top: `${position.top - topOffset}px`,
        // left: `${position.left + leftOffset}px`,
        ...optionalStyles,
        opacity: 0,
      }}
      className={`dataBoxContainer`}
    >
      <SlotCounter
        containerClassName="counterDataBoxContainer"
        charClassName="counterDataBox"
        sequentialAnimationMode
        initialValue="00"
        value={counterValue}
        animateOnVisible
      />
      <div className="displayValueCounterBox">{formatString(displayValue)}</div>
    </div>
  );
}

export default DataBox;
