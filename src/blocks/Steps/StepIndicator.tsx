"use client";

import React from "react";
import { motion } from "motion/react";
import { Box, Text } from "@/design-system/elements";
import Tooltip from "@/design-system/blocks/Tooltip";
import { useHover } from "./hooks";
import { StepThemeConfig } from "./types";
import { IconDCheck } from "@/design-system/icons";

interface StepIndicatorProps {
  /** Whether this step is currently active */
  active: boolean;
  /** The step number (1-based) */
  index: number;
  /** The label text for this step */
  label: string;
  /** Whether this step is completed */
  completed: boolean;
  /** Theme configuration */
  variant: StepThemeConfig;
  /** Whether to use simple mode (no numbers/icons) */
  simple?: boolean;
  /** Whether to show labels */
  showLabels?: boolean;
  /** Whether to show tooltips on hover */
  showTooltip?: boolean;
  /** Callback when step is clicked */
  setActive?: (index: number) => void;
  /** Additional props */
  [key: string]: any;
}

interface DotProps {
  state: {
    bg: string;
    color: string;
  };
  variant: StepThemeConfig;
  active: boolean;
  children: React.ReactNode;
}

function Dot({ state, variant, active, children }: DotProps) {
  return (
    <Box
      as={motion.div}
      bg={state.bg}
      color={state.color}
      border=".25rem solid"
      borderColor={variant.borderColor}
      shape="circle"
      flex="none"
      width={`${parseFloat(variant.size) * 8}${variant.unit}`}
      height={`${parseFloat(variant.size) * 8}${variant.unit}`}
      display="flex"
      alignItems="center"
      justifyContent="center"
      initial={{ scale: 0.75 }}
      animate={{ scale: active ? 1.125 : 0.75 }}
      exit={{ scale: 0.75 }}
      // transition={{ type: "spring", stiffness: 500 }}
      style={{ pointerEvents: "none" }}
    >
      {children}
    </Box>
  );
}

function StepIndicator({
  active,
  index,
  label,
  completed,
  variant,
  simple = false,
  showLabels = true,
  showTooltip = true,
  setActive,
  ...rest
}: StepIndicatorProps) {
  const [hoverRef, isHovered] = useHover();

  const getCurrentTheme = () => {
    if (active) {
      return variant.presets.active;
    }
    if (completed) {
      return variant.presets.completed;
    }
    return variant.presets.default;
  };

  const currentTheme = getCurrentTheme();

  const handleClick = () => {
    if (setActive) {
      setActive(index - 1); // Convert to 0-based index
    }
  };

  const stepContent = (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      flex={active ? "auto" : "none"}
      mx="auto"
      position="relative"
      zIndex={isHovered ? 3 : 2}
      cursor={setActive ? "pointer" : "default"}
      onClick={handleClick}
      {...rest}
      ref={hoverRef}
    >
      <Dot active={active} variant={variant} state={currentTheme}>
        {!simple && active && (
          <Text fontSize={variant.fontSize} color="inherit">
            {index}
          </Text>
        )}
        {!simple && completed && (
          <Box as={IconDCheck} size="1.5rem" color="inherit" />
        )}
      </Dot>

      {showLabels && (
        <Text
          fontWeight="700"
          fontSize={variant.fontSize}
          display={["none", "flex"]}
          color={active ? variant.baseColor : variant.textColor}
          textAlign="center"
          mt="xxs"
        >
          {label}
        </Text>
      )}
    </Box>
  );

  if (showTooltip) {
    return <Tooltip content={label}>{stepContent}</Tooltip>;
  }

  return stepContent;
}

export default StepIndicator;
