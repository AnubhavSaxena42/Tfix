import { useEffect, useRef, useState } from "react";
import "./NotificationList.scss";
import { motion, usePresence, AnimatePresence } from "framer-motion";
import { faker } from "@faker-js/faker";
import Color from "color";
import gsap from "gsap";
import { SMALL_WINDOW_WIDTH } from "../Timeline/constants";

const colorStart = Color("#FF9900");
const colorEnd = Color("#FF320D");

const name = () => `${faker.person.firstName()} ${faker.person.lastName()}`;
const initialState = [...Array(4)].map(name);

const dataObject = {
  time: "00:00",
  subject: "Here comes the subject of the mail body",
  company: "ABS",
  status: "processed",
  attachments: {
    pdf: 2,
    gaeb: 1,
  },
};

export default function App() {
  const INITIAL_DELAY = 6;
  const notificationListContainerRef = useRef(null);
  const [items, setItems] = useState(initialState);
  const [isSorted, setIsSorted] = useState(false);
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

  const notificationListEnterAnimation = () => {
    const notificationListContainer = notificationListContainerRef.current;
    if (notificationListContainer)
      gsap.fromTo(
        notificationListContainer,
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.in",
          delay: INITIAL_DELAY,
        }
      );
  };

  const transitionToBigWindowState = () => {
    const notificationListContainer = notificationListContainerRef.current;
    if (notificationListContainer) {
      gsap.to(notificationListContainer, {
        fontSize: "16px",
        minHeight: "300px",
      });
    }
  };

  const transitionToSmallWindowState = () => {
    const notificationListContainer = notificationListContainerRef.current;
    if (notificationListContainer) {
      gsap.to(notificationListContainer, {
        fontSize: "10px",
        minHeight: "160px",
      });
    }
  };

  useEffect(() => {
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [windowSize]);

  useEffect(() => {
    notificationListEnterAnimation();
    updateDimension();
  }, []);

  const addAtStart = () => setItems([name(), ...items]);
  const removeAtStart = () => {
    items.shift();
    setItems([...items]);
  };
  const reset = () => setItems([...initialState]);
  const removeSelf = (n) => {
    setItems([...items.filter((name) => name !== n)]);
  };

  const handleSort = () => setIsSorted(!isSorted);
  const sorter = (a, b) => (isSorted ? a.localeCompare(b) : 0);

  return (
    <div
      ref={notificationListContainerRef}
      className="bar notificationListContainer"
    >
      <div className="buttons">
        <button className="add" onClick={addAtStart}>
          Add Notification(For demonstration)
        </button>
        {/* <button className="remove" onClick={removeAtStart}>
            Remove
          </button>
          <button className="sort" onClick={handleSort}>
            Sorts: {!isSorted ? "A → Z" : "as added"}
          </button>
          <button className="reset" onClick={reset}>
            Reset
          </button> */}
      </div>
      <AnimatePresence>
        {[...items].sort(sorter).map((name, i) => (
          <ListItem
            color={colorStart.mix(colorEnd, (1 / items.length) * i)}
            key={name}
            onClick={() => removeSelf(name)}
          >
            <div className="notificationListItemPointerContainer">
              <div className="notificationListItemPointer"></div>
            </div>
            <div className="notificationListItemTimeContainer">
              {dataObject.time}
            </div>
            <div className="notificationListItemFirstDotContainer">
              <div className="notificationListItemDot"></div>
            </div>
            <div className="notificationListItemInfoContainer">
              <div className="notificationListItemInfoSubjectContainer">
                <div className="notificationListItemInfoSubject">
                  Here comes the subject of the mail body
                </div>
                <div className="notificationListItemInfoAttachmentsContainer">
                  <div className="notificationListItemInfoAttachment">2pdf</div>
                  <div className="notificationListItemInfoAttachmentsSeperator" />
                  <div className="notificationListItemInfoAttachment">
                    1 gaeb
                  </div>
                </div>
              </div>
            </div>
            <div className="notificationListItemFirstDotContainer">
              <div className="notificationListItemDot"></div>
            </div>
            <div className="notificationListItemCompanyContainer">
              {dataObject.company}
            </div>
            <div className="notificationListItemStatusContainer">
              {dataObject.status}
            </div>
          </ListItem>
        ))}
      </AnimatePresence>
    </div>
  );
}

const transition = { type: "spring", stiffness: 500, damping: 50, mass: 1 };

function ListItem({ children, onClick, color }) {
  const [isPresent, safeToRemove] = usePresence();

  const animations = {
    layout: true,
    initial: "out",
    style: {
      color: color.hex(),
      position: isPresent ? "static" : "absolute",
    },
    animate: isPresent ? "in" : "out",
    whileTap: "tapped",
    variants: {
      in: { scaleY: 1, opacity: 1, color: color.hex() },
      out: { scaleY: 0, opacity: 0, zIndex: -1, color: color.hex() },
      tapped: { scale: 0.98, opacity: 0.5, transition: { duration: 0.1 } },
    },
    onAnimationComplete: () => !isPresent && safeToRemove(),
    transition,
  };

  return (
    <motion.div className="myListItem" {...animations} onClick={onClick}>
      {children}
    </motion.div>
  );
}
