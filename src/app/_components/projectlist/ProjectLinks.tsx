"use client";
import DynamicIcon from "@/components/icons/DynamicIcon";
import { ProjectLink } from "@/types/types";
import { AnimatePresence, Variants, motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";
import cn from "classnames";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";

type Props = {
  links: Array<ProjectLink>;
};

const tooltipVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 50,
  },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.07 * i,
    },
  }),
};

const ProjectLinks = ({ links }: Props) => {
  const [isSectionHovered, setIsSectionHovered] = useState<boolean>(false);
  const [nthLinkHovered, setNthLinkHovered] = useState<number>(-1);

  return (
    <div
      className="relative col-span-1 col-start-1 row-start-3 flex flex-col items-center gap-6 rounded-bl-lg border-2 border-r-0 border-t-0 border-neutral-500 border-opacity-10 bg-panel-light px-3 pb-5 pt-10 shadow-panel lg:col-start-11 lg:gap-7 lg:rounded-bl-none lg:rounded-br-lg lg:border-l-0 lg:border-r-2"
      onMouseEnter={() => {
        setIsSectionHovered(true);
      }}
      onMouseLeave={() => {
        setIsSectionHovered(false);
        setNthLinkHovered(-1);
      }}
    >
      <AnimatePresence>
        {isSectionHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute right-full top-0 hidden h-full w-80 bg-gradient-to-r from-transparent to-[rgba(20,20,20,0.5)] lg:block"
          />
        )}
      </AnimatePresence>
      {links?.map((link, li) => (
        <LinkItem
          link={link}
          li={li}
          key={link?.linkURL}
          isSectionHovered={isSectionHovered}
          nthLinkHovered={nthLinkHovered}
          setNthLinkHovered={setNthLinkHovered}
        />
      ))}
    </div>
  );
};

type LinkItemProps = {
  li: number;
  link: ProjectLink;
  isSectionHovered: boolean;
  nthLinkHovered: number;
  setNthLinkHovered: React.Dispatch<React.SetStateAction<number>>;
};

const LinkItem = ({
  link,
  li,
  isSectionHovered,
  nthLinkHovered,
  setNthLinkHovered,
}: LinkItemProps) => {
  const { linkURL, reactIcon, linkTooltip } = link;

  return (
    <span className="relative">
      <Link
        href={linkURL}
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10"
        onMouseEnter={() => {
          setNthLinkHovered(li);
        }}
        onMouseLeave={() => {
          setNthLinkHovered(-1);
        }}
      >
        {nthLinkHovered === li ? (
          <HiArrowTopRightOnSquare className="text-3xl text-neutral-300 transition-colors duration-200 sm:text-4xl" />
        ) : (
          <DynamicIcon
            icon={reactIcon?.name}
            library={reactIcon?.library}
            className={cn(
              "text-4xl transition-colors duration-200",
              isSectionHovered ? "text-neutral-300" : "text-neutral-400",
            )}
          />
        )}
      </Link>
      <AnimatePresence>
        {isSectionHovered && (
          <motion.div
            className={cn(
              "pointer-events-none absolute bottom-1 right-12 hidden h-3/4 rounded-md  pl-8 pr-4 lg:block",
              nthLinkHovered === li
                ? "bg-gradient-to-r from-cta-left to-cta-right"
                : "bg-[rgba(111,111,111,0.8)]",
            )}
            variants={tooltipVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            custom={li}
          >
            <span className="whitespace-nowrap align-middle font-light tracking-wider text-light">
              {linkTooltip}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

export default ProjectLinks;
