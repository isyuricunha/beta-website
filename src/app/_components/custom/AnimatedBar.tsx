"use client";
import { useInView } from "framer-motion";
import React, { useRef } from "react";

type Props = {};

const AnimatedBar = (props: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0% 0% -20% 0%" });

  return (
    <div className="h-0.5 flex-grow">
      <div
        ref={ref}
        className="h-full rounded-full bg-cyellow opacity-50 transition-all delay-300 duration-1000 ease-in-out"
        style={{ width: isInView ? "100%" : "0%" }}
      />
    </div>
  );
};

export default AnimatedBar;
