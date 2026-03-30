"use client";

import { motion, HTMLMotionProps } from "motion/react";
import Box, { BoxProps } from "@/design-system/elements/box";

export const GRADIENT_ANGLES = {
  top: 0,
  right: 90,
  bottom: 180,
  left: 270,
} as const;

export type ProgressiveBlurProps = Omit<BoxProps, "children"> & {
  direction?: keyof typeof GRADIENT_ANGLES;
  blurLayers?: number;
  blurIntensity?: number;
  children?: React.ReactNode;
  motionProps?: Omit<HTMLMotionProps<"div">, "style">;
};

export default function ProgressiveBlur({
  direction = "bottom",
  blurLayers = 8,
  blurIntensity = 0.25,
  children,
  motionProps,
  ...boxProps
}: ProgressiveBlurProps) {
  const layers = Math.max(blurLayers, 2);
  const segmentSize = 1 / (blurLayers + 1);

  return (
    <Box position="relative" {...boxProps}>
      {children}
      {Array.from({ length: layers }).map((_, index) => {
        const angle = GRADIENT_ANGLES[direction];
        const gradientStops = [
          index * segmentSize,
          (index + 1) * segmentSize,
          (index + 2) * segmentSize,
          (index + 3) * segmentSize,
        ].map(
          (pos, posIndex) =>
            `rgba(255, 255, 255, ${posIndex === 1 || posIndex === 2 ? 1 : 0}) ${pos * 100}%`
        );

        const gradient = `linear-gradient(${angle}deg, ${gradientStops.join(
          ", "
        )})`;

        return (
          <Box
            key={index}
            as={motion.div}
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            borderRadius="inherit"
            style={{
              pointerEvents: "none",
              maskImage: gradient,
              WebkitMaskImage: gradient,
              backdropFilter: `blur(${index * blurIntensity}px)`,
              WebkitBackdropFilter: `blur(${index * blurIntensity}px)`,
            }}
            {...motionProps}
          />
        );
      })}
    </Box>
  );
}

