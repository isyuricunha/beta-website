"use client";
import { useNavbarContext } from "@/app/_context/NavbarContext";
import { useInView } from "framer-motion";
import React, { useEffect, useRef } from "react";

type Props = {
  curSection: number;
};

const NavbarRegion = ({ curSection }: Props) => {
  const { setSectionArray } = useNavbarContext();
  const ref = useRef<HTMLDivElement>(null);
  const sectionInView = useInView(ref, { amount: "some" });

  useEffect(() => {
    if (sectionInView) {
      setSectionArray((sectionArray) => {
        let oldArray = [...sectionArray];
        oldArray[curSection] = true;
        return oldArray;
      });
    } else {
      setSectionArray((sectionArray) => {
        let oldArray = [...sectionArray];
        oldArray[curSection] = false;
        return oldArray;
      });
    }
  }, [sectionInView, curSection, setSectionArray]);

  return (
    <div className="pointer-events-none absolute left-0 h-full w-full py-20 opacity-50">
      <div className="h-full w-full" ref={ref} />
    </div>
  );
};

export default NavbarRegion;
