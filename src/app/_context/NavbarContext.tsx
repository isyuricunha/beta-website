"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface ContextProps {
  sectionArray: Array<boolean>;
  setSectionArray: React.Dispatch<React.SetStateAction<Array<boolean>>>;
}

const defaultContextValue: ContextProps = {
  sectionArray: [],
  setSectionArray: () => {},
};

const NavbarContext = createContext<ContextProps>(defaultContextValue);

export const NavbarContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [sectionArray, setSectionArray] = useState<Array<boolean>>([
    false,
    false,
    false,
    false,
  ]);

  return (
    <NavbarContext.Provider value={{ sectionArray, setSectionArray }}>
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbarContext = () => useContext(NavbarContext);
