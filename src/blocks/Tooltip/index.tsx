"use client";

import { Box, Text } from "../../elements";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  autoUpdate,
  flip,
  offset as floatingOffset,
  shift,
  useFloating,
  type Placement as FloatingPlacement,
} from "@floating-ui/react";

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  offset?: number;
  portal?: boolean;
  possiblePlacements?: string[];
  [key: string]: any;
}

export const Tooltip = ({
  children,
  content,
  placement = "bottom",
  offset = 8,
  portal = true,
  possiblePlacements,
  ...props
}: TooltipProps) => {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  type Side = "top" | "bottom" | "left" | "right";

  const validFallbacks = (possiblePlacements || []).filter((p): p is Side =>
    ["top", "bottom", "left", "right"].includes(p)
  );

  const {
    refs,
    x,
    y,
    strategy,
    placement: resolvedPlacement,
  } = useFloating({
    placement: placement as FloatingPlacement,
    middleware: [
      floatingOffset(offset),
      flip(
        validFallbacks.length
          ? { fallbackPlacements: validFallbacks as FloatingPlacement[] }
          : {}
      ),
      shift({ padding: 8 }),
    ],
    // Keep fixed positioning to match previous behavior
    strategy: "fixed",
    whileElementsMounted: autoUpdate,
  });

  const floatingStyles: React.CSSProperties = {
    position: strategy,
    top: y ?? 0,
    left: x ?? 0,
  };

  const actualSide = (resolvedPlacement.split("-")[0] as Side) || placement;

  useEffect(() => {
    setMounted(true);
  }, []);

  const showTooltip = () => {
    setIsVisible(true);
  };

  const hideTooltip = () => {
    setIsVisible(false);
  };

  const getArrowStyles = () => {
    switch (actualSide) {
      case "bottom":
        return { top: "-4px", left: "calc(50% - 4px)" };
      case "top":
        return { bottom: "-4px", left: "calc(50% - 4px)" };
      case "right":
        return { left: "-4px", top: "calc(50% - 4px)" };
      case "left":
        return { right: "-4px", top: "calc(50% - 4px)" };
      default:
        return {};
    }
  };

  const tooltipContent = (
    <AnimatePresence>
      {isVisible && (
        <Text
          as={motion.div}
          ref={refs.setFloating}
          fontSize="small"
          zIndex={99999}
          initial={{ opacity: 0, y: actualSide === "top" ? 10 : -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: actualSide === "top" ? 10 : -10 }}
          transition={{ duration: 0.2 }}
          style={{
            pointerEvents: "none",
            ...floatingStyles,
            ...(props.style || {}),
          }}
          {...props}
        >
          <Box
            skin="translucent.dark"
            shape="roundedLarge"
            $shadow="medium"
            p="small"
            width="fit-content"
            maxWidth="20rem"
            position="relative"
          >
            {/* Arrow */}
            <Box
              position="absolute"
              width="8px"
              height="8px"
              bg="inherit"
              style={{
                transform: "rotate(45deg)",
                ...getArrowStyles(),
              }}
            />

            {/* Content */}

            <Text
              color="inherit"
              // position="relative"
              // zIndex={1}
            >
              {content}
            </Text>
          </Box>
        </Text>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <Box
        ref={refs.setReference}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        display="flex"
        {...props}
      >
        {children}
      </Box>
      {mounted && portal
        ? createPortal(tooltipContent, document.body)
        : tooltipContent}
    </>
  );
};

export default Tooltip;
