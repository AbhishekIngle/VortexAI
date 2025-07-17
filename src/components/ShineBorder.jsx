"use client";

import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import '../main'
export const Meteors = ({
  number = 200,
  minDelay = 1,
  maxDelay = 2,
  minDuration = 5,
  maxDuration = 10,
  angle = 215,
  className,
}) => {
  const [meteorStyles, setMeteorStyles] = useState([]);
  const [isSmallDevice, setIsSmallDevice] = useState(false);

  useEffect(() => {
    const screenHeight = window.innerHeight * 0.8; // 80% of the screen

    const styles = [...new Array(number)].map(() => ({
      "--angle": `${-angle}deg`,
      top: `${Math.floor(Math.random() * screenHeight)}px`,
      left: `${Math.floor(Math.random() * window.innerWidth)}px`,
      animationDelay: `${Math.random() * (maxDelay - minDelay) + minDelay}s`,
      animationDuration: `${
        Math.random() * (maxDuration - minDuration) + minDuration
      }s`,
    }));
    setMeteorStyles(styles);
  }, [number, minDelay, maxDelay, minDuration, maxDuration, angle]);

  return (
    <>
      {meteorStyles.map((style, idx) => (
        <span
          key={idx}
          style={style}
          className={twMerge(
            "pointer-events-none absolute size-0.5 rotate-[var(--angle)] animate-meteor rounded-full bg-white shadow-[0_0_0_1px_#ffffff10]",
            className
          )}
        >
          <div className="pointer-events-none absolute top-1/2 -z-10 h-px w-[50px] -translate-y-1/2 bg-gradient-to-r from-white to-transparent" />
        </span>
      ))}
    </>
  );
};
