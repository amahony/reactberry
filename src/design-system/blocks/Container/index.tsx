"use client";
import Box, { BoxProps } from "@/design-system/elements/box";
import { ThemeContext } from "styled-components";

import React, { useContext } from "react";

//const SIDEBAR_PINNED_KEY = "sidebar_pinned";

interface ContainerProps extends BoxProps {
  children: React.ReactNode;
}

export default function Container({ children, ...props }: ContainerProps) {
  const theme: any = useContext(ThemeContext);
  // const [isPinned, setIsPinned] = useState(false);

  // Load pinned state from localStorage and listen for changes
  // useEffect(() => {
  //   const loadPinnedState = () => {
  //     const stored = localStorage.getItem(SIDEBAR_PINNED_KEY);
  //     if (stored !== null) {
  //       setIsPinned(JSON.parse(stored));
  //     }
  //   };

  // Load initial state
  //   loadPinnedState();

  // Listen for storage changes (in case it's updated in another component)
  // const handleStorageChange = (e: StorageEvent) => {
  //   if (e.key === SIDEBAR_PINNED_KEY) {
  //     loadPinnedState();
  //   }
  // };

  //  window.addEventListener("storage", handleStorageChange);

  // Also listen for custom event in the same window
  //   const handleCustomEvent = () => {
  //     loadPinnedState();
  //   };
  //   window.addEventListener("sidebarPinnedChange", handleCustomEvent);

  //   return () => {
  //     window.removeEventListener("storage", handleStorageChange);
  //     window.removeEventListener("sidebarPinnedChange", handleCustomEvent);
  //   };
  // }, []);

  return (
    <Box as="section" {...theme?.container} {...props}>
      {children}
    </Box>
  );
}
