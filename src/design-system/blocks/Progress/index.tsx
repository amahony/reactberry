import { Box } from "@/design-system/elements";
import { motion } from "motion/react";
import React from "react";

const defaults = {
  size: "2rem",
  progress: 0,
  progressColor: "brand",
  trackColor: "transparent.light.1",
};

interface ProgressProps {
  variant?: "pie" | "bar" | "circle";
  progress?: number;
  progressColor?: string;
  trackColor?: string;
  [key: string]: any;
}

const PieProgress: React.FC<ProgressProps> = ({
  progress = defaults.progress,
  progressColor = defaults.progressColor,
  trackColor = defaults.trackColor,
  size = "2rem",
  ...props
}) => {
  return (
    <Box
      as="svg"
      viewBox="0 0 64 64"
      bg="transparent"
      size={size}
      shape="circle"
      color={trackColor}
      border="1.5px solid transparent"
      boxShadow={`0 0 0 1.5px currentColor`}
      style={{
        transform: "rotate(-90deg)",
      }}
      {...props}
    >
      <Box
        as="circle"
        color={progressColor}
        r="25%"
        cx="50%"
        cy="50%"
        fill="none"
        stroke={"currentColor"}
        strokeWidth={32}
        strokeDasharray={`${progress * 10} 100`}
      />
    </Box>
  );
};

interface CircleProgressProps {
  sqSize?: number;
  progress?: number;
  strokeWidth?: number;
  progressColor?: string;
  trackColor?: string;
  fontSize?: string;
  label?: string;
}

const CircleProgress: React.FC<CircleProgressProps> = ({
  sqSize = 100,
  progress = 25,
  strokeWidth = 1,
  progressColor = defaults.progressColor,
  trackColor = defaults.trackColor,
  label,
  ...props
}) => {
  // Size of the enclosing square
  // SVG centers the stroke width on the radius, subtract out so circle fits in square
  const radius = (sqSize - strokeWidth) / 2;
  // Enclose circle in a circumscribing square
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  // Arc length at 100% coverage is the circle circumference
  const dashArray = radius * Math.PI * 2;
  // Scale 100% coverage overlay with the actual percent
  const dashOffset = dashArray - (dashArray * progress) / 100;

  return (
    <Box as="svg" size={sqSize} viewBox={viewBox} {...props}>
      <Box
        as="circle"
        color={trackColor}
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
        style={{ stroke: "currentColor", fill: "none" }}
      />
      <Box
        as="circle"
        color={progressColor}
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
        // Start progress marker at 12 O'Clock
        transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
        style={{
          fill: "none",
          strokeDasharray: dashArray,
          strokeDashoffset: dashOffset,
          stroke: "currentColor",
          strokeLinecap: "round",
          strokeLinejoin: "round",
        }}
      />
      <Box
        as="text"
        x="50%"
        y="50%"
        dy="0.375em"
        textAnchor="middle"
        color={"secondary"}
        fill="currentColor"
        fontWeight={"600"}
        fontSize="1em"
      >
        {label ? label : `${progress}%`}
      </Box>
    </Box>
  );
};

const BarProgress: React.FC<ProgressProps> = ({
  progress = 0,
  reverse = false,
  trackColor = defaults.trackColor,
  progressColor = defaults.progressColor,
  ...props
}) => {
  return (
    <Box
      position="relative"
      display="block"
      overflow="hidden"
      height={"0.25rem"}
      bg={trackColor}
      {...props}
    >
      <Box
        as={motion.div}
        height="100%"
        //width={`${progress}%`}
        animate={{ width: `${progress}%` }}
        position="absolute"
        bg={progressColor}
        top={0}
        shape="rounded"
        left={reverse ? "auto" : 0}
        right={reverse ? 0 : "auto"}
      />
    </Box>
  );
};

const Progress: React.FC<ProgressProps> = ({
  variant = "bar",
  progress = 0,
  ...props
}) => {
  switch (variant) {
    case "pie":
      return <PieProgress progress={progress} {...props} />;
    case "circle":
      return <CircleProgress progress={progress} {...props} />;
    default:
      return <BarProgress progress={progress} {...props} />;
  }
};

export default Progress;
