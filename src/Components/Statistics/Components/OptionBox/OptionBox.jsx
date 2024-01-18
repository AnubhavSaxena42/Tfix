import React, { useCallback, useEffect, useState } from "react";
import "./OptionBox.css";
import { useRef } from "react";
import gsap from "gsap";
import SlotCounter from "react-slot-counter";
import { SMALL_WINDOW_WIDTH } from "../../../Timeline/constants";

function OptionBox({
  // boxRef,
  initialDelay,
  onClick,
  dateValue,
  position,
  topOffset,
  leftOffset,
  header,
  optionalStyles,
  counterValue,
}) {
  const boxRef = useRef(null);
  const [selected, setSelected] = useState(false);
  const [windowSize, setWindowSize] = useState("Big");
  const BigWindowValues = {
    BIG_TEXT_SELECTED: "59px",
    SMALL_TEXT_SELECTED: "35px",
    DATE_TEXT_SELECTED: "17px",
    BIG_TEXT_NOT_SELECTED: "32px",
    SMALL_TEXT_NOT_SELECTED: "24px",
    DATE_TEXT_NOT_SELECTED: "14px",
  };
  const smallWindowValues = {};
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
  console.log("Updating Dimension Function:", windowSize);
  const transitionToBigWindowState = () => {
    gsap.to(boxRef.current.querySelectorAll(".otherLetters"), {
      fontSize: "18px",
    });
    gsap.to(boxRef.current.querySelectorAll(".firstLetter"), {
      fontSize: "24px",
    });
    gsap.to(boxRef.current.querySelectorAll(".dateValue"), {
      fontSize: "12px",
    });

    gsap.to(boxRef.current.querySelectorAll(".counter"), {
      fontSize: "44px",
    });
    gsap.to(boxRef.current.querySelectorAll(".counterContainer"), {
      bottom: "50px",
    });
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

    gsap.to(boxRef.current.querySelectorAll(".counter"), {
      fontSize: "24px",
    });
    gsap.to(boxRef.current.querySelectorAll(".counterContainer"), {
      bottom: "14px",
    });
  };
  useEffect(() => {
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [windowSize]);

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
    selected && onUnselectBox(1);
    !selected && onSelectBox(1);
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
    if (!selected) {
      gsap.to(box, {
        color: "rgb(183,183,183)",
        duration: 0.1,
        ease: "power2.inOut",
      });
    }
  };

  useEffect(() => {
    // setUnselectedValues();
    optionBoxEnterAnimation();
    updateDimension();
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
      <SlotCounter
        containerClassName="counterContainer"
        charClassName="counter"
        initialValue="00"
        // useMonospaceWidth={true}
        startValueOnce
        duration={1}
        animateUnchanged={false}
        value={counterValue}
        // animateOnVisible
      />

      <div
        style={{
          fontSize: "35px",
          letterSpacing: "-1px",
          fontFamily: "Jura",
        }}
      >
        {formatString(header)}
      </div>
      <div className="dateValue">{dateValue}</div>
    </div>
  );
}

export default OptionBox;
