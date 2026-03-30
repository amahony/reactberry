"use client";

import { Children, type ReactNode, useMemo, useRef } from "react";
import { motion, type MotionValue, useScroll, useTransform } from "motion/react";

import { Box, type BoxProps } from "@/design-system/elements";
import { useReducedMotion } from "@/design-system/hooks/useReducedMotion";

export interface StickySectionStackProps extends BoxProps {
  children: ReactNode;
  topPadding?: string;
  stickyTop?: string;
  stackOffsetBase?: number;
  stickyStep?: number;
  scaleStep?: number;
  minScale?: number;
  sectionMinHeight?: string;
  bottomPadding?: string;
  sectionProps?: BoxProps;
}

interface StickySectionItemProps {
  children: ReactNode;
  index: number;
  total: number;
  progress: MotionValue<number>;
  stickyTop: string;
  stackOffsetBase: number;
  stickyStep: number;
  scaleStep: number;
  minScale: number;
  sectionMinHeight: string;
  sectionProps?: BoxProps;
}

function StickySectionItem({
  children,
  index,
  total,
  progress,
  stickyTop,
  stackOffsetBase,
  stickyStep,
  scaleStep,
  minScale,
  sectionMinHeight,
  sectionProps,
}: StickySectionItemProps) {
  const rangeStart = total <= 1 ? 0 : index / total;
  const targetScale = Math.max(minScale, 1 - (total - index - 1) * scaleStep);
  const scale = useTransform(progress, [rangeStart, 1], [1, targetScale]);

  return (
    <Box
      position="sticky"
      top={stickyTop}
      zIndex={index + 1}
      minHeight={sectionMinHeight}
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
    >
      <Box
        as={motion.div}
        style={{
          scale,
          transformOrigin: "top center",
          position: "relative",
          top: `${stackOffsetBase + index * stickyStep}px`,
        }}
        width="100%"
      >
        <Box width="100%" {...sectionProps}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export default function StickySectionStack({
  children,
  topPadding = "10vh",
  stickyTop = "4vh",
  stackOffsetBase = 0,
  stickyStep = 24,
  scaleStep = 0.06,
  minScale = 0.82,
  sectionMinHeight = "auto",
  bottomPadding = "30vh",
  sectionProps,
  ...props
}: StickySectionStackProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const sections = useMemo(() => Children.toArray(children).filter(Boolean), [children]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  if (prefersReducedMotion) {
    return (
      <Box {...props}>
        {sections.map((section, index) => (
          <Box key={index} width="100%" {...sectionProps}>
            {section}
          </Box>
        ))}
      </Box>
    );
  }

  return (
    <Box ref={containerRef} position="relative" pt={topPadding} pb={bottomPadding} {...props}>
      {sections.map((section, index) => (
        <StickySectionItem
          key={index}
          index={index}
          total={sections.length}
          progress={scrollYProgress}
          stickyTop={stickyTop}
          stackOffsetBase={stackOffsetBase}
          stickyStep={stickyStep}
          scaleStep={scaleStep}
          minScale={minScale}
          sectionMinHeight={sectionMinHeight}
          sectionProps={sectionProps}
        >
          {section}
        </StickySectionItem>
      ))}
    </Box>
  );
}