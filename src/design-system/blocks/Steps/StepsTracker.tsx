"use client";

import React from "react";
import { Box } from "@/design-system/elements";

import Tooltip from "../Tooltip";
import { motion } from "motion/react";

interface StepsTrackerProps {
  /** Index of the completed step (all steps up to this index are completed) */
  completed?: number;
  config: { label: string }[];
}

interface TrackSegmentProps {
  isCompleted: boolean;
}

interface TrackStepProps {
  isCompleted: boolean;
  isActive?: boolean;
  item: { label: string };
}

function TrackStep({ isCompleted, isActive, item }: TrackStepProps) {
  return (
    <Tooltip content={item.label} placement="bottom" zIndex={100003}>
      <Box
        as={motion.div}
        flex="none"
        bg={isCompleted ? "accent" : "tertiary"}
        shape="circle"
        size="1rem"
        display="flex"
        alignItems="center"
        justifyContent="center"
        initial={{ scale: 0.85 }}
        animate={{ scale: isActive ? 1.125 : 0.85 }}
        exit={{ scale: 0.85 }}
        whileHover={{ scale: 1.125 }}
        //style={{ pointerEvents: "none" }}
      />
    </Tooltip>
  );
}

function TrackSegment({ isCompleted }: TrackSegmentProps) {
  return (
    <Box
      flex="auto"
      height="0.25rem"
      bg={isCompleted ? "accent" : "tertiary"}
      shape="pill"
      alignSelf="center"
    />
  );
}

function StepsTracker({ config, completed = 0, ...rest }: StepsTrackerProps) {
  return (
    <Box display="flex" alignItems="flex-start" gap="xs" width="100%" {...rest}>
      {config.map((item, i) => (
        <React.Fragment key={i}>
          {/* Step Indicator */}
          <TrackStep
            item={item}
            isCompleted={completed >= i}
            isActive={completed === i}
          />
          {/* Track Segment (if not the last step) */}
          {i < config.length - 1 && (
            <TrackSegment isCompleted={completed >= i + 1} />
          )}
        </React.Fragment>
      ))}
    </Box>
  );
}

export default StepsTracker;
