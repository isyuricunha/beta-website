"use client";
import { Variants, motion, useInView } from "framer-motion";
import React, { useRef } from "react";

const wordVariants: Variants = {
  hidden: {
    x: "120%",
  },
  visible: (delay: number) => ({
    x: 0,
    transition: {
      ease: [0.16, 1, 0.3, 1],
      duration: 1,
      delay: delay,
    },
  }),
};

type ExperienceBarProps = {
  startDate: string;
  endDate: string;
};

const AnimatedExperienceBar = ({ startDate, endDate }: ExperienceBarProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0% -40% 0% 0%" });

  return (
    <>
      {/* Date Container */}
      <div className="relative h-fit overflow-hidden whitespace-nowrap pt-5 text-right text-sm text-dim sm:text-base lg:text-lg 2xl:text-2xl">
        <motion.p
          variants={wordVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0}
        >
          {startDate}
        </motion.p>
        <motion.p
          variants={wordVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0}
          className="pr-1"
        >
          |
        </motion.p>
        <motion.p
          variants={wordVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.2}
        >
          {endDate}
        </motion.p>
      </div>
      {/* Decoration */}
      <div className="h-auto flex-grow">
        <div
          ref={ref}
          className="h-auto w-0.5 rounded-full bg-cyellow opacity-50 transition-all delay-300 duration-1000 ease-in-out"
          style={{ height: isInView ? "100%" : "0%" }}
        />
      </div>
    </>
  );
};

export default AnimatedExperienceBar;
