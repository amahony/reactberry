"use client";

import React from "react";
import { Box, Text } from "@/design-system/elements";
import StepProgress from "./StepProgress";
import { BaseStepProps } from "./types";
import { useStepNavigation } from "./hooks";

interface StepsProps extends Omit<BaseStepProps, "active"> {
  /** Initial active step (0-based) */
  initialStep?: number;
  /** Whether navigation is controlled externally */
  controlled?: boolean;
  /** Current active step when controlled */
  activeStep?: number;
  /** Callback when step changes */
  onStepChange?: (step: number) => void;
  /** Whether to show navigation buttons */
  showNavigation?: boolean;
  /** Custom labels for navigation buttons */
  navigationLabels?: {
    next?: string;
    previous?: string;
    finish?: string;
  };
  /** Whether steps can be clicked to navigate */
  allowStepClick?: boolean;
  /** Validation function for step navigation */
  validateStep?: (
    fromStep: number,
    toStep: number
  ) => boolean | Promise<boolean>;
  /** Loading state */
  loading?: boolean;
  /** Callback when all steps are completed */
  onComplete?: () => void;
}

function Steps({
  config,
  initialStep = 0,
  controlled = false,
  activeStep: controlledActiveStep,
  onStepChange,
  showNavigation = false,
  navigationLabels = {
    next: "Next",
    previous: "Previous",
    finish: "Finish",
  },
  allowStepClick = true,
  validateStep,
  loading = false,
  onComplete,
  variant = "light",
  skin,
  simple = false,
  showLabels = true,
  showEdges = true,
  showTooltip = true,
  childProps,
  ...rest
}: StepsProps) {
  const {
    activeStep: internalActiveStep,
    nextStep,
    prevStep,
    goToStep,
    isFirst,
    isLast,
  } = useStepNavigation(config.length, initialStep);

  const activeStep = controlled
    ? controlledActiveStep ?? 0
    : internalActiveStep;

  const handleStepChange = async (newStep: number) => {
    if (validateStep) {
      const isValid = await validateStep(activeStep, newStep);
      if (!isValid) return;
    }

    if (controlled) {
      onStepChange?.(newStep);
    } else {
      goToStep(newStep);
      onStepChange?.(newStep);
    }
  };

  const handleNext = async () => {
    if (isLast && onComplete) {
      onComplete();
      return;
    }

    if (controlled) {
      onStepChange?.(activeStep + 1);
    } else {
      const newStep = activeStep + 1;
      if (validateStep) {
        const isValid = await validateStep(activeStep, newStep);
        if (!isValid) return;
      }
      nextStep();
      onStepChange?.(newStep);
    }
  };

  const handlePrevious = () => {
    if (controlled) {
      onStepChange?.(activeStep - 1);
    } else {
      prevStep();
      onStepChange?.(activeStep - 1);
    }
  };

  const handleStepClick = allowStepClick ? handleStepChange : undefined;

  return (
    <Box display="flex" flexDirection="column" gap="large">
      {/* Step Progress */}
      <StepProgress
        config={config}
        active={activeStep}
        setActive={handleStepClick}
        variant={variant}
        skin={skin}
        simple={simple}
        showLabels={showLabels}
        showEdges={showEdges}
        showTooltip={showTooltip}
        childProps={childProps}
        {...rest}
      />

      {/* Navigation Buttons */}
      {showNavigation && (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap="medium"
        >
          <Box>
            {!isFirst && (
              <Box
                as="button"
                skin="default"
                px="medium"
                py="small"
                shape="pill"
                cursor="pointer"
                disabled={loading}
                onClick={handlePrevious}
              >
                <Text fontSize="small" color="inherit">
                  {navigationLabels.previous}
                </Text>
              </Box>
            )}
          </Box>

          <Box display="flex" gap="small">
            {/* Step Counter */}
            <Text fontSize="small" color="secondary">
              {activeStep + 1} of {config.length}
            </Text>
          </Box>

          <Box>
            <Box
              as="button"
              px="medium"
              py="small"
              shape="pill"
              cursor="pointer"
              disabled={loading}
              onClick={handleNext}
            >
              <Text fontSize="small" color="inherit">
                {loading
                  ? "Loading..."
                  : isLast
                  ? navigationLabels.finish
                  : navigationLabels.next}
              </Text>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Steps;
