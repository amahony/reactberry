"use client";

import React, { useRef, useState } from "react";
import styled from "styled-components";
import { AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { animate } from "motion";
import { Box } from "../../elements";
import { ControlLeft, ControlRight } from "../Controls/Control";
import Group from "../Group";

interface CarouselProps {
  items: React.ReactNode[];
  gap?: string | number;
  onScroll?: (index: number) => void;
  showScrollbar?: boolean;
  showArrows?: boolean;
  containerProps?: { [key: string]: any };
}

const SCROLL_PADDING_REM = 0.5;
const SCROLL_PADDING_PX = SCROLL_PADDING_REM * 16;
const GAP_PX = 16;
const SCROLL_AMOUNT = 300;
const THRESHOLD_RATIO = 0.5;

const ScrollContainerStyled = styled(Box)<{
  $showScrollbar?: boolean;
}>`
  display: flex;
  width: 100%;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  scroll-padding: ${SCROLL_PADDING_REM}rem;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: ${(props) => (props.$showScrollbar ? "auto" : "none")};

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;

    &:hover {
      background: rgba(0, 0, 0, 0.3);
    }
  }

  ${(props) =>
    !props.$showScrollbar &&
    `
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  `}
`;

const SnapItem = styled(Box)`
  display: flex;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  flex-shrink: 0;
  min-width: fit-content;
`;

const Carousel = ({
  items,
  gap = "s",
  onScroll,
  showScrollbar = false,
  showArrows = true,
  containerProps,
}: CarouselProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { scrollX } = useScroll({ container: containerRef });

  // Reset carousel scroll position on mount using Motion's animate API
  // This uses Motion's animate() to set scrollLeft to 0; duration 0 keeps it instantaneous.
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    try {
      // Use Motion's animate to reset scrollLeft on the element
      // duration: 0 ensures it's an immediate reset (no visible animation)
      animate(el, { scrollLeft: 0 }, { duration: 0 });
    } catch {
      // Fallback to direct assignment if animate is unavailable
      el.scrollLeft = 0;
    }

    // Prevent browser scroll restoration from interfering while mounted.
    // Store previous value and restore on cleanup.
    const prev =
      typeof window !== "undefined" && "history" in window
        ? (window.history as any).scrollRestoration
        : undefined;
    if (typeof window !== "undefined" && "history" in window) {
      try {
        (window.history as any).scrollRestoration = "manual";
      } catch {
        /* ignore */
      }
    }

    return () => {
      if (
        typeof window !== "undefined" &&
        "history" in window &&
        prev !== undefined
      ) {
        try {
          (window.history as any).scrollRestoration = prev;
        } catch {
          /* ignore */
        }
      }
    };
  }, []);

  useMotionValueEvent(scrollX, "change", (latest) => {
    const container = containerRef.current;
    if (!container) return;

    const itemWidth =
      container.firstElementChild?.getBoundingClientRect().width || 0;
    if (itemWidth <= 0) return;

    const adjustedScrollLeft = Math.max(0, latest - SCROLL_PADDING_PX);
    const threshold = itemWidth * THRESHOLD_RATIO;
    const newIndex =
      adjustedScrollLeft > threshold
        ? Math.floor((adjustedScrollLeft - threshold) / (itemWidth + GAP_PX)) +
          1
        : 0;

    setCurrentIndex(newIndex);
    onScroll?.(newIndex);
  });

  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({
      left: direction === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT,
      behavior: "smooth",
    });
  };

  return (
    <Box display="flex" flexDirection="column" gap="s" width="100%">
      <ScrollContainerStyled
        ref={containerRef}
        gap={gap}
        p="xs"
        {...containerProps}
        $showScrollbar={showScrollbar}
      >
        {items.map((item, index) => (
          <SnapItem key={index}>{item}</SnapItem>
        ))}
      </ScrollContainerStyled>

      {showArrows && items.length > 1 && (
        <Group
          justifyContent="end"
          gap="m"
          position="relative"
          width="100%"
          height="2.5rem"
          pb="s"
        >
          <AnimatePresence mode="sync" initial={false}>
            {currentIndex > 0 && (
              <ControlLeft
                key="control-left"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                exit={{ opacity: 0, pointerEvents: "none" }}
                whileTap={{ opacity: 1, scale: 0.92 }}
                onClick={() => scroll("left")}
                position="relative"
                top="auto"
                left="auto"
              />
            )}

            <ControlRight
              key="control-right"
              initial={{ opacity: 0 }}
              animate={{
                opacity: currentIndex >= items.length - 1 ? 0.3 : 0.8,
              }}
              exit={{ opacity: 0, pointerEvents: "none" }}
              whileTap={{ opacity: 1, scale: 0.92 }}
              onClick={() => scroll("right")}
              position="relative"
              disabled={currentIndex === items.length - 1}
              top="auto"
              right="auto"
            />
          </AnimatePresence>
        </Group>
      )}
    </Box>
  );
};

export default Carousel;
