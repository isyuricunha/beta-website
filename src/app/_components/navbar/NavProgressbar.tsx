"use client";
import { useNavbarContext } from "@/context/NavbarContext";
import React, { useEffect, useState } from "react";

type Props = {
  maxIndex: number;
};

const NavProgressbar = ({ maxIndex }: Props) => {
  const { sectionArray } = useNavbarContext();

  return (
    <div
      className="col-span-4 mb-1.5 ml-1.5 h-0.5 rounded-full bg-cyellow opacity-50 transition-all duration-700 ease-in-out"
      style={{ width: `${12.5 + 26 * maxIndex}%` }}
    />
  );
};

export default NavProgressbar;
