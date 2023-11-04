"use client";
import { Variants, motion, useInView } from "framer-motion";
import React, { useRef } from "react";

const contentVariants: Variants = {
  hidden: {
    y: 24,
    opacity: 0.2,
  },
  visible: (delay: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      ease: [0.16, 1, 0.3, 1],
      duration: 1,
      delay: delay + 0.2,
    },
  }),
};

type AnimatedContentProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

const AnimatedContent = ({
  children,
  className,
  delay,
}: AnimatedContentProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0% 0% -10% 0%" });

  return (
    <motion.div
      className={className}
      ref={ref}
      variants={contentVariants}
      initial="hidden"
      custom={delay ?? 0}
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedContent;
