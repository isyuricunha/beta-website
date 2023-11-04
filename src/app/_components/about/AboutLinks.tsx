"use client";
import DynamicIcon from "@/components/icons/DynamicIcon";
import { HeroSectionLink } from "@/types/types";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";

type HeroLinkProps = {
  links: Array<HeroSectionLink>;
};

const HeroLinks = ({ links }: HeroLinkProps) => {
  const [hoveredLink, setHoveredLink] = useState<number>(-1);

  return (
    <>
      {/* Mobile Links */}
      <ul className="flex gap-3 text-3xl lg:hidden">
        {links.map((link: HeroSectionLink, i) => (
          <li
            key={link?.key ?? i}
            className="h-20 w-20 rounded-lg bg-gradient-to-r from-cta-left to-cta-right shadow-[0px_0px_32px_rgba(74,72,157,0.20)]"
          >
            <Link
              href={link?.linkURL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-lg bg-[#222222] bg-opacity-20 font-light lowercase tracking-wider text-light"
            >
              <DynamicIcon
                library={link?.reactIcon?.library}
                icon={link?.reactIcon?.name}
              />
              <span className="text-[10px] font-light uppercase leading-none text-neutral-300">
                {link?.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {/* Desktop Links */}
      <ul
        className="hidden gap-2 rounded-lg bg-opacity-20 bg-gradient-to-r from-cta-left to-cta-right shadow-[0px_0px_32px_rgba(74,72,157,0.40)] lg:flex"
        onMouseLeave={() => {
          setHoveredLink(-1);
        }}
      >
        {links.map((link: HeroSectionLink, i) => (
          <React.Fragment key={link?.key ?? i}>
            <li className="relative w-fit font-light lowercase tracking-wider text-light">
              <Link
                href={link?.linkURL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 block w-fit px-8 py-2 text-2xl 2xl:text-3xl"
                onMouseEnter={() => {
                  setHoveredLink(i);
                }}
              >
                {link?.name}
              </Link>
              {hoveredLink === i && (
                <motion.div
                  layoutId="link-tab"
                  className="pointer-events-none absolute left-0 top-0 h-full w-full px-3 py-1"
                  transition={{ type: "spring", duration: 0.4 }}
                >
                  <div className="h-full w-full rounded-md bg-[rgba(190,190,190,0.3)]" />
                </motion.div>
              )}
            </li>
            {/* Bullet Point */}
            {i !== links.length - 1 && (
              <li aria-hidden={true} className="self-center text-gray-300">
                <span>&#8226;</span>
              </li>
            )}
          </React.Fragment>
        ))}
      </ul>
    </>
  );
};

export default HeroLinks;
