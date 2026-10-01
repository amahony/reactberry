"use client";

import React, { useCallback, useRef, useState } from "react";
import styled, { css } from "styled-components";
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
  /**
   * Brings an item into view when the caller owns the selection. Scrolling by
   * hand is left alone: only a change the caller makes moves the track.
   */
  activeIndex?: number;
  /**
   * Where an item comes to rest. `center` needs the caller to make room at
   * both ends (an inline padding of half the viewport less half an item), so
   * the first and last items can reach the middle too.
   */
  align?: "start" | "center";
  /**
   * Fades whichever end still has items behind it. Off by default so an
   * existing track keeps its hard edges.
   */
  withMask?: boolean;
  /** How far the fade reaches in from a faded edge, as any CSS length. */
  maskWidth?: string;
}

const SCROLL_PADDING_REM = 0.5;
const SCROLL_PADDING_PX = SCROLL_PADDING_REM * 16;
const GAP_PX = 16;
const SCROLL_AMOUNT = 300;
const THRESHOLD_RATIO = 0.5;
// Default distance the fade reaches in from an edge that still has items
// behind it; callers can override it with `maskWidth`.
const FADE = "3rem";

const ScrollContainerStyled = styled(Box)<{
  $showScrollbar?: boolean;
  $mask?: string;
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
    props.$mask &&
    css`
      mask-image: ${props.$mask};
      -webkit-mask-image: ${props.$mask};
    `}

  ${(props) =>
    !props.$showScrollbar &&
    `
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  `}
`;

const SnapItem = styled(Box)<{ $align: "start" | "center" }>`
  display: flex;
  scroll-snap-align: ${(props) => props.$align};
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
  activeIndex,
  align = "start",
  withMask = false,
  maskWidth = FADE,
}: CarouselProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { scrollX } = useScroll({ container: containerRef });
  // The last index the track was put on, however it got there, so a caller's
  // selection and the user's own scrolling do not fight over the position.
  const settledIndex = useRef<number | null>(null);

  // An edge is only faded while there is something behind it, so a track that
  // fits, or one scrolled to its end, keeps a clean edge.
  const [fade, setFade] = useState({ start: false, end: false });
  const updateFade = useCallback(() => {
    const el = containerRef.current;
    if (!el || !withMask) return;
    const max = el.scrollWidth - el.clientWidth;
    setFade({ start: el.scrollLeft > 1, end: el.scrollLeft < max - 1 });
  }, [withMask]);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el || !withMask) return;

    updateFade();
    const observer = new ResizeObserver(updateFade);
    observer.observe(el);
    return () => observer.disconnect();
  }, [withMask, updateFade, items.length]);

  const mask =
    fade.start || fade.end
      ? `linear-gradient(90deg, ${
          fade.start ? "transparent" : "#000"
        }, #000 ${maskWidth}, #000 calc(100% - ${maskWidth}), ${
          fade.end ? "transparent" : "#000"
        })`
      : undefined;

  // Reset carousel scroll position on mount using Motion's animate API
  // This uses Motion's animate() to set scrollLeft to 0; duration 0 keeps it instantaneous.
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    try {
      // Use Motion's animate to reset scrollLeft on the element
      // duration: 0 ensures it's an immediate reset (no visible animation)
      if (activeIndex == null) animate(el, { scrollLeft: 0 }, { duration: 0 });
    } catch {
      // Fallback to direct assignment if animate is unavailable
      if (activeIndex == null) el.scrollLeft = 0;
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

  // Put the track on the item the caller selected, edges included.
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container || activeIndex == null) return;
    if (activeIndex === settledIndex.current) return;

    const item = container.children[activeIndex] as HTMLElement | undefined;
    if (!item) return;

    const offset =
      item.getBoundingClientRect().left -
      container.getBoundingClientRect().left +
      container.scrollLeft;

    settledIndex.current = activeIndex;
    container.scrollTo({
      left:
        align === "center"
          ? offset -
            (container.clientWidth - item.getBoundingClientRect().width) / 2
          : offset - SCROLL_PADDING_PX,
    });
  }, [activeIndex, align]);

  useMotionValueEvent(scrollX, "change", (latest) => {
    const container = containerRef.current;
    if (!container) return;

    updateFade();

    const itemWidth =
      container.firstElementChild?.getBoundingClientRect().width || 0;
    if (itemWidth <= 0) return;

    // Centred items rest one step apart from the very first one, so the
    // nearest step is the item in the middle of the viewport.
    if (align === "center") {
      const second = container.children[1] as HTMLElement | undefined;
      const step = second
        ? second.getBoundingClientRect().left -
          (container.firstElementChild as HTMLElement).getBoundingClientRect()
            .left
        : itemWidth + GAP_PX;
      const centred = Math.min(
        items.length - 1,
        Math.max(0, Math.round(latest / step)),
      );

      setCurrentIndex(centred);
      settledIndex.current = centred;
      onScroll?.(centred);
      return;
    }

    const adjustedScrollLeft = Math.max(0, latest - SCROLL_PADDING_PX);
    const threshold = itemWidth * THRESHOLD_RATIO;
    const newIndex =
      adjustedScrollLeft > threshold
        ? Math.floor((adjustedScrollLeft - threshold) / (itemWidth + GAP_PX)) +
          1
        : 0;

    setCurrentIndex(newIndex);
    settledIndex.current = newIndex;
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
        $mask={mask}
      >
        {items.map((item, index) => (
          <SnapItem key={index} $align={align}>
            {item}
          </SnapItem>
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
