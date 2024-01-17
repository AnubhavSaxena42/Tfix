import React, { useEffect, useRef } from "react";
import styles from "./greeting.module.css";
import gsap, { Power3 } from "gsap";

function Greeting() {
  const values = {
    username: "Anubhav",
    timeOfTheDay: "Morning",
  };
  console.log("greeting styles:", styles);
  let greetingRef = useRef(null);
  useEffect(() => {
    console.log("Greeting Ref", greetingRef);
    gsap.fromTo(
      greetingRef,
      {
        x: 100,
        opacity: 0,
      },
      { x: 0, duration: 1.5, opacity: 1, ease: "power3.in" }
    );
  }, []);
  return (
    <div ref={(el) => (greetingRef = el)} className={styles.greeting}>
      Good {values.timeOfTheDay}, {values.username}.
    </div>
  );
}

export default Greeting;
