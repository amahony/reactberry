// src/design-system/blocks/Menu/MenuContext.tsx
import React, { createContext, useContext, useState } from "react";

type Direction = "left" | "right" | "initial" | null;

interface MenuContextValue {
  selected: string | number | null;
  setSelected: (id: string | number | null) => void;
  dir: Direction;
  setDir: (dir: Direction) => void;
}

const MenuContext = createContext<MenuContextValue | undefined>(undefined);

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selected, setSelected] = useState<string | number | null>(null);
  const [dir, setDir] = useState<Direction>(null);
  // console.log("DIRECTION", dir);
  return (
    <MenuContext.Provider value={{ selected, setSelected, dir, setDir }}>
      {children}
    </MenuContext.Provider>
  );
};
