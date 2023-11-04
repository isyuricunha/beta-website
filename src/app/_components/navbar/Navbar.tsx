"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import NavProgressbar from "@/components/navbar/NavProgressbar";
import { useNavbarContext } from "@/context/NavbarContext";
import { Variants, motion } from "framer-motion";
import cn from "classnames";

type Props = {};
type sectionLink = {
  title: string;
  id: string;
};

const navbarVariants: Variants = {
  hidden: {
    y: 140,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 1,
      type: "spring",
    },
  },
};

const Navbar = (props: Props) => {
  const { sectionArray } = useNavbarContext();
  const [maxIndex, setMaxIndex] = useState<number>(0);

  useEffect(() => {
    let ind = 0;
    sectionArray.forEach((arrayBoolean, i) => {
      if (arrayBoolean) {
        ind = i;
      }
    });
    setMaxIndex(ind);
  }, [sectionArray]);

  const sections: Array<sectionLink> = [
    {
      title: "About",
      id: "about",
    },
    {
      title: "Experiences",
      id: "experience",
    },
    {
      title: "Projects",
      id: "projects",
    },
    {
      title: "Skills",
      id: "skills",
    },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <motion.div
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
        className="pointer-events-none sticky bottom-6 z-50 hidden w-full items-center justify-center text-light lg:flex"
      >
        <div className="pointer-events-auto flex rounded-lg bg-[rgba(89,89,89,0.8)] shadow-md">
          {/* Title and Name */}
          <div className="py-2 pl-8 pr-10 lowercase">
            <h4 className="text-2xl leading-6 tracking-wide">The Showcase</h4>
            <p className="text-sm font-light leading-4 tracking-wide text-[#ccc]">
              by Sean Fong
            </p>
          </div>
          {/* Sections */}
          <div className="grid grid-cols-4 grid-rows-[1fr_min-content]">
            <div className="col-span-4 grid grid-cols-[repeat(4,auto)] place-items-center rounded-b-md bg-panel-darkest px-6 lowercase">
              {sections.map((section, i) => {
                return (
                  <div
                    key={`nav-section-${i}`}
                    className="relative col-span-1 grid h-fit place-items-center px-6"
                  >
                    {i === maxIndex && (
                      <div className="pointer-events-none absolute -z-10 h-9 w-full rounded-md border-2 border-[rgba(173,173,173,0.05)] bg-neutral-500 bg-opacity-80" />
                    )}
                    <Link
                      className={cn(
                        "text-lg transition-colors duration-500 hover:underline",
                        i === maxIndex ? "text-neutral-300" : "text-gray-400",
                      )}
                      href={`#${section.id}`}
                    >
                      {section.title}
                    </Link>
                  </div>
                );
              })}
            </div>
            {/* Progress bar */}
            <NavProgressbar maxIndex={maxIndex} />
          </div>
          {/* Padding Right */}
          <div className="w-5" />
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
