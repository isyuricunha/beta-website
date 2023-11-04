"use client";
import { Variants, motion, useInView } from "framer-motion";
import { useRef } from "react";

type AnimatedLettersProps = {
  className?: string;
  children: string;
  pb?: number;
  tag: "p" | "h2" | "h4" | "span";
  stagger?: number;
};

const letterVariants: Variants = {
  hidden: {
    y: "120%",
    transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.5 },
  },
  visible: {
    y: 0,
    transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.5 },
  },
};

export default function AnimatedLetters({
  className = "",
  children,
  tag,
  pb,
  stagger,
}: AnimatedLettersProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: "all" });

  const containerVariants: Variants = {
    visible: {
      transition: {
        staggerChildren: stagger ?? 0.025,
      },
    },
  };

  switch (tag) {
    case "span":
      return (
        <motion.span
          className={className}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          aria-label={children}
          custom={stagger}
          ref={ref}
        >
          <AnimatedLettersContent text={children} pb={pb} />
        </motion.span>
      );
    case "p":
      return (
        <motion.p
          className={className}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          custom={stagger}
          aria-label={children}
          ref={ref}
        >
          <AnimatedLettersContent text={children} pb={pb} />
        </motion.p>
      );
    case "h4":
      return (
        <motion.h4
          className={className}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          custom={stagger}
          aria-label={children}
          ref={ref}
        >
          <AnimatedLettersContent text={children} pb={pb} />
        </motion.h4>
      );
  }
}

type AnimatedLettersContentProps = {
  text: string;
  pb?: number;
};

const AnimatedLettersContent = ({ text, pb }: AnimatedLettersContentProps) => {
  const words: Array<string> = [];
  text.split(" ").forEach((word, ind) => {
    words.push(`${word}${ind === text.split(" ").length - 1 ? "" : " "}`);
  });

  return (
    <>
      {words.map((word, wi) => {
        return (
          <span
            aria-hidden
            key={wi}
            className="inline-block overflow-hidden whitespace-nowrap align-bottom"
            style={{ paddingBottom: `${pb ?? 0}px` }}
          >
            {word.split("").map((letter, i) => (
              <motion.span
                custom={i}
                key={i}
                variants={letterVariants}
                className="inline-block"
              >
                {letter === " " ? "\u00a0" : letter}
              </motion.span>
            ))}
          </span>
        );
      })}
    </>
  );
};
