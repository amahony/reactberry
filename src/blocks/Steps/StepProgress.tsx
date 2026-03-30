"use client";

import React from "react";
import { Box } from "@/design-system/elements";
import StepIndicator from "./StepIndicator";
import { BaseStepProps, StepThemeConfig, StepVariant } from "./types";

interface StepProgressProps extends BaseStepProps {
  /** Index of the completed step (all steps up to this index are completed) */
  completed?: number;
}

const defaultThemeConfig: Record<StepVariant, StepThemeConfig> = {
  light: {
    baseColor: "primary",
    textColor: "secondary",
    borderColor: "white",
    trackColor: "tertiary",
    completedTrackColor: "accent",
    size: "0.3",
    unit: "rem",
    fontSize: "small",
    presets: {
      active: {
        bg: "accent",
        color: "white",
      },
      completed: {
        bg: "accent",
        color: "white",
      },
      default: {
        bg: "tertiary",
        color: "secondary",
      },
    },
  },
  dark: {
    baseColor: "primary",
    textColor: "secondary",
    borderColor: "tertiary",
    trackColor: "secondary",
    completedTrackColor: "brand",
    size: "0.3",
    unit: "rem",
    fontSize: "small",
    presets: {
      active: {
        bg: "white",
        color: "primary",
      },
      completed: {
        bg: "primary",
        color: "white",
      },
      default: {
        bg: "secondary",
        color: "white",
      },
    },
  },
};

function StepProgress({
  config,
  active,
  variant = "light",
  skin,
  simple = false,
  showLabels = true,
  showEdges = true,
  showTooltip = true,
  childProps,
  setActive,
  ...rest
}: StepProgressProps) {
  const currentTheme = skin || defaultThemeConfig[variant];

  // Calculate the progress width based on active step
  const progressWidth = `${
    (active + 1) * (100 / config.length) - 100 / (config.length * 2)
  }%`;

  return (
    <Box
      display="grid"
      gridTemplateColumns={`repeat(${config.length}, 1fr)`}
      position="relative"
      alignItems="center"
      width="100%"
      {...rest}
    >
      {/* Step Indicators */}
      {config.map((item, i) => (
        <StepIndicator
          key={i}
          active={active === i}
          index={i + 1}
          completed={active > i}
          showLabels={showLabels}
          showTooltip={showTooltip}
          variant={currentTheme}
          simple={simple}
          setActive={setActive}
          {...item}
          {...childProps}
        />
      ))}

      {/* Edge Circles */}
      {showEdges && (
        <>
          <Box
            size="1rem"
            shape="circle"
            bg={currentTheme.presets.default.bg}
            border="3px solid"
            borderColor={currentTheme.borderColor}
            position="absolute"
            top="50%"
            left="-1px"
            mt="-1.375rem"
            zIndex={1}
          />
          <Box
            width="1rem"
            height="1rem"
            shape="circle"
            bg={currentTheme.presets.default.bg}
            border="3px solid"
            borderColor={currentTheme.borderColor}
            position="absolute"
            top="50%"
            right="0"
            mt="-1.375rem"
            zIndex={1}
          />
        </>
      )}

      {/* Progress Track */}
      <Box
        width="100%"
        height={`${currentTheme.size}${currentTheme.unit}`}
        bg={currentTheme.trackColor}
        shape="pill"
        position="absolute"
        top="50%"
        mt="-1rem"
        zIndex={0}
      >
        {/* Completed Progress */}
        <Box
          width={progressWidth}
          height="100%"
          bg={currentTheme.completedTrackColor}
          shape="pill"
        />
      </Box>
    </Box>
  );
}

export default StepProgress;
