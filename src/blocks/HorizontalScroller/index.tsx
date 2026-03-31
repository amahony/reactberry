"use client";
import { Box, Text } from "../../elements";
import {
  animate,
  motion,
  MotionValue,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { useRef, ReactNode } from "react";

interface HorizontalScrollerProps {
  items: any[]; // Array of items to scroll through
  renderItem: (item: any, index: number) => ReactNode; // Function to render each item
  gap?: number | string; // Gap between items
  progressIndicator?: boolean; // Whether to show progress indicator
  withMask?: boolean; // Whether to apply gradient mask
  title?: string;
}

export default function HorizontalScroller({
  items,
  renderItem,
  gap = "small",
  title,
  progressIndicator = true,
  withMask = true,
}: HorizontalScrollerProps) {
  const containerRef = useRef(null);
  const { scrollXProgress } = useScroll({ container: containerRef });
  const maskImage = useScrollOverflowMask(scrollXProgress);

  return (
    <Box width="100%" position="relative" maxWidth="100%" overflow="hidden">
      <Box
        position="relative"
        display="flex"
        alignItems={"center"}
        justifyContent={"space-between"}
        py="xsmall"
      >
        {title && (
          <Text as="h3" m="0">
            {title}
          </Text>
        )}
        {progressIndicator && (
          <Box
            as={motion.svg}
            color="brand"
            size="2rem"
            viewBox="0 0 100 100"
            transform="rotate(-90deg)"
            zIndex="1"
          >
            <circle
              cx="50"
              cy="50"
              r="30"
              pathLength="1"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="10%"
              fill="none"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="30"
              stroke="currentColor"
              strokeWidth="10%"
              fill="none"
              style={{ pathLength: scrollXProgress }}
            />
          </Box>
        )}
      </Box>

      <Box
        as={motion.div}
        ref={containerRef}
        display="flex"
        overflowX="scroll"
        pb="medium"
        gap={gap}
        width="100%"
        position="relative"
        zIndex="2"
        style={withMask ? { maskImage } : undefined}
      >
        {items.map((item, index) => (
          <Box key={index}>{renderItem(item, index)}</Box>
        ))}
      </Box>
    </Box>
  );
}

// Gradient mask function
const left = `0%`;
const right = `100%`;
const leftInset = `20%`;
const rightInset = `80%`;
const transparent = `#0000`;
const opaque = `#000`;

function useScrollOverflowMask(scrollXProgress: MotionValue<number>) {
  const maskImage = useMotionValue(
    `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
  );

  useMotionValueEvent(scrollXProgress, "change", (value) => {
    if (value === 0) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
      );
    } else if (value === 1) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${right}, ${opaque})`
      );
    } else if (
      scrollXProgress.getPrevious() === 0 ||
      scrollXProgress.getPrevious() === 1
    ) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${rightInset}, ${transparent})`
      );
    }
  });

  return maskImage;
}
