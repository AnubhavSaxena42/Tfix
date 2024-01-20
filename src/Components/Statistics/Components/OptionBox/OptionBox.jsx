import React, { useCallback, useEffect, useState } from "react";
import "./OptionBox.css";
import { useRef } from "react";
import gsap from "gsap";
import SlotCounter from "react-slot-counter";
import { SMALL_WINDOW_WIDTH } from "../../../Timeline/constants";
import SplitType from "split-type";

function OptionBox({
  // boxRef,
  initialDelay,
  onClick,
  animatingSwitch,
  setAnimatingSwitch,
  setAnimatingSwitchToFalseAfterDelay,
  position,
  topOffset,
  leftOffset,
  header,
  selectedDate,
  label,
  optionalStyles,
  counterValue,
  selectedRange,
  setSelectedRange,
  boxRange,
}) {
  const boxRef = useRef(null);
  const valueRef = useRef(null);
  const labelRef = useRef(null);
  const [selected, setSelected] = useState(false);
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
        transitionToSmallWindowState();
      }
    }
  };
  console.log("Updating Dimension Function:", windowSize);
  const transitionToBigWindowState = () => {
    transitionToSmallWindowState();
    return;
    gsap.to(boxRef.current.querySelectorAll(".otherLetters"), {
      fontSize: "18px",
    });
    gsap.to(boxRef.current.querySelectorAll(".firstLetter"), {
      fontSize: "24px",
    });
    gsap.to(boxRef.current.querySelectorAll(".dateValue"), {
      fontSize: "12px",
    });

    gsap.to(valueRef.current, {
      fontSize: "44px",
    });
    // gsap.to(boxRef.current.querySelectorAll(".counterContainer"), {
    //   bottom: "30px",
    // });
  };
  const transitionToSmallWindowState = () => {
    // return;
    //Depends if it is selected or not

    gsap.to(boxRef.current.querySelectorAll(".otherLetters"), {
      fontSize: "14px",
    });
    gsap.to(boxRef.current.querySelectorAll(".firstLetter"), {
      fontSize: "16px",
    });
    gsap.to(boxRef.current.querySelectorAll(".dateValue"), {
      fontSize: "8px",
    });

    gsap.to(valueRef.current, {
      fontSize: "24px",
    });
    // gsap.to(boxRef.current.querySelectorAll(".counterContainer"), {
    //   bottom: "30px",
    // });
  };
  useEffect(() => {
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [windowSize]);

  useEffect(() => {
    if (selectedRange === boxRange) {
      gsap.to(boxRef.current, {
        color: "white",
        duration: 1,
        ease: "power3.inOut",
      });
    } else {
      gsap.to(boxRef.current, {
        color: "rgb(183, 183, 183)",
        duration: 1,
        ease: "power3.inOut",
      });
    }
  }, [selectedRange, boxRange]);

  const formatString = useCallback(
    (inputString) => {
      const words = inputString.split(" ");

      const formattedWords = words.map((word, index) => {
        const firstLetter = word[0];
        const otherLetters = word.slice(1);

        return (
          <span key={index}>
            <span
              className={
                index === 0 ? "firstLetter" : "firstLetter firstLetterMargin"
              }
            >
              {firstLetter}
            </span>
            <span className="otherLetters">{otherLetters}</span>
          </span>
        );
      });

      return <div>{formattedWords}</div>; // You can use any suitable parent element
    },
    [header]
  );

  //Animation Definitions
  /*
  SelectBoxAnimation
  UnselectBoxAnimation
  */
  //Select Box Animation
  const onSelectBox = (duration = 2) => {
    return;
    setSelected(true);
    // gsap.to(boxRef.current.querySelectorAll(".firstLetter"), {
    //   fontSize: "59px",
    //   duration: duration,
    //   ease: "power3.inOut",
    // });
    // gsap.to(boxRef.current.querySelectorAll(".otherLetters"), {
    //   fontSize: "35px",
    //   duration: duration,
    //   ease: "power3.inOut",
    // });
    // gsap.to(boxRef.current.querySelectorAll(".dateValue"), {
    //   fontSize: "17px",
    //   duration: duration,
    //   ease: "power3.inOut",
    // });
    gsap.to(boxRef.current, {
      color: "white",
      duration: duration,
      ease: "power3.inOut",
    });
  };

  const optionBoxEnterAnimation = () => {
    gsap.fromTo(
      boxRef.current,
      {
        opacity: 0,
        y: -20,
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

  //Unselect Box
  const onUnselectBox = (duration = 2) => {
    setSelected(false);
    // gsap.to(boxRef.current.querySelectorAll(".firstLetter"), {
    //   fontSize: "32px",
    //   duration: duration,
    //   ease: "power3.inOut",
    // });
    // gsap.to(boxRef.current.querySelectorAll(".otherLetters"), {
    //   fontSize: "24px",
    //   duration: duration,
    //   ease: "power3.inOut",
    // });
    // gsap.to(boxRef.current.querySelectorAll(".dateValue"), {
    //   fontSize: "14px",
    //   duration: duration,
    //   ease: "power3.inOut",
    // });
    gsap.to(boxRef.current, {
      color: "rgb(183, 183, 183)",
      duration: duration,
      ease: "power3.inOut",
    });
  };

  const onClickBox = () => {
    // return;
    if (animatingSwitch) {
      return;
    }
    setAnimatingSwitch(true);
    setAnimatingSwitchToFalseAfterDelay();
    setSelectedRange(boxRange);
    onClick();
  };

  // const setUnselectedValues = () => {
  //   gsap.set(boxRef.current.querySelectorAll(".firstLetter"), {
  //     fontSize: "24px",
  //   });
  //   gsap.set(boxRef.current.querySelectorAll(".otherLetters"), {
  //     fontSize: "18px",
  //   });
  //   // gsap.set(boxRef.current.querySelectorAll(".firstLetter"), {
  //   //   fontSize: "32px",
  //   // });
  //   gsap.set(boxRef.current.querySelectorAll(".dateValue"), {
  //     fontSize: "12px",
  //   });
  // };

  //Box Animation Functions
  const onHoverBox = (box) => {
    gsap.to(box, {
      color: "white",
      duration: 0.1,
      ease: "power2.inOut",
    });
  };

  const onMouseLeaveBox = (box) => {
    console.log("in leave cb", selected, header);
    if (selectedRange !== boxRange) {
      gsap.to(box, {
        color: "rgb(183,183,183)",
        duration: 0.1,
        ease: "power2.inOut",
      });
    }
  };
  const updateTextAnimation = () => {
    const vRef = valueRef.current;
    gsap.fromTo(
      vRef,
      {
        y: -40,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power1.out",
      }
    );
  };

  useEffect(() => {
    const lRef = labelRef.current;
    gsap.fromTo(
      lRef,
      {
        // x: -10,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power1.out",
      }
    );
  }, [label]);

  useEffect(() => {
    updateTextAnimation();
  }, [counterValue, selectedDate]);

  useEffect(() => {
    // setUnselectedValues();
    optionBoxEnterAnimation();
    setTimeout(() => {
      updateDimension();
    }, 1000);
  }, []);
  return (
    <div
      ref={boxRef}
      onClick={onClickBox}
      onMouseEnter={() => onHoverBox(boxRef.current)}
      onMouseLeave={() => onMouseLeaveBox(boxRef.current)}
      style={{
        top: `${position.top - topOffset}px`,
        left: `${position.left - leftOffset}px`,
        ...optionalStyles,
        opacity: 0,
      }}
      className={`optionBox`}
    >
      <div
        ref={valueRef}
        className="counterValueText"
        style={
          {
            // fontSize: "24px",
            // fontSize: "44px",
            // position: "absolute",
            // bottom: "40px",
            // bottom: "55px",
          }
        }
      >
        {counterValue}
      </div>
      {/* <div
        style={{
          // fontSize: "35px",
          letterSpacing: "-1px",
          // fontFamily: "Jura",
          border: "1px solid blue",
        }}
      > */}
      {formatString(header)}
      {/* </div> */}
      <div ref={labelRef} className="dateValue">
        {label}
      </div>
    </div>
  );
}

export default OptionBox;
