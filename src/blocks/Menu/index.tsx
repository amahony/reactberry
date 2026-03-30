"use client";
import React from "react";
import { Box } from "@/design-system/elements";
import { MenuProvider, useMenu } from "./MenuContext";
import { MenuItem } from "./MenuItem";
import { MenuContent } from "./MenuContent";
import { AnimatePresence } from "motion/react";

interface MenuProps {
  children: React.ReactNode;
}

// Add an interface for the child props
interface MenuChildProps {
  id: string | number;
  children: React.ReactNode;
}

const MenuInner: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setSelected, selected, setDir } = useMenu();

  const selectedContent = React.Children.toArray(children).find(
    (child) =>
      React.isValidElement(child) &&
      (child.props as MenuChildProps).id === selected,
  );

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Box
        position="relative"
        display="flex"
        alignItems="center"
        onMouseLeave={() => {
          setDir(null);
          setSelected(null);
        }}
        zIndex={9999}
      >
        {children}

        <AnimatePresence mode="sync">
          {selected !== null &&
            React.isValidElement(selectedContent) &&
            (selectedContent.props as MenuChildProps).children}
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export const Menu: React.FC<MenuProps> = ({ children }) => {
  return (
    <MenuProvider>
      <MenuInner>{children}</MenuInner>
    </MenuProvider>
  );
};

export { MenuItem, MenuContent };
