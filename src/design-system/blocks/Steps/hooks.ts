"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Custom hook for managing hover state on an element
 * @returns A tuple with [ref, isHovered] where ref should be attached to the element
 */
export function useHover(): [React.RefObject<HTMLElement | null>, boolean] {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener("mouseenter", handleMouseEnter);
      node.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        node.removeEventListener("mouseenter", handleMouseEnter);
        node.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [handleMouseEnter, handleMouseLeave]);

  return [ref, isHovered];
}

/**
 * Custom hook for managing step navigation
 * @param totalSteps Total number of steps
 * @param initialStep Initial active step (0-based)
 */
export function useStepNavigation(totalSteps: number, initialStep = 0) {
  const [activeStep, setActiveStep] = useState(initialStep);

  const nextStep = useCallback(() => {
    setActiveStep((prev) => Math.min(prev + 1, totalSteps - 1));
  }, [totalSteps]);

  const prevStep = useCallback(() => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const goToStep = useCallback(
    (step: number) => {
      if (step >= 0 && step < totalSteps) {
        setActiveStep(step);
      }
    },
    [totalSteps]
  );

  const isFirst = activeStep === 0;
  const isLast = activeStep === totalSteps - 1;
  const progress = totalSteps > 0 ? ((activeStep + 1) / totalSteps) * 100 : 0;

  return {
    activeStep,
    nextStep,
    prevStep,
    goToStep,
    isFirst,
    isLast,
    progress,
    setActiveStep,
  };
}
