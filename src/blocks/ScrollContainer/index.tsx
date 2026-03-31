"use client";
import Box, { BoxProps } from "../../elements/box";
import React, { useRef, useEffect } from "react";

type ScrollContainerProps = BoxProps & {
  children: React.ReactNode;
  watch?: any;
  scrollToId?: string;
  onScrollStart?: () => void;
  scrollOffset?: number;
  scrollBehavior?: ScrollBehavior;
  scrollBlock?: ScrollLogicalPosition;
};

export default function ScrollContainer({
  children,
  watch,
  scrollToId,
  onScrollStart,
  scrollOffset = 0,
  scrollBehavior = "smooth",
  scrollBlock = "start",
  ...props
}: ScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollToId) {
      onScrollStart?.();
      const targetElement = document.getElementById(scrollToId);
      if (targetElement && containerRef.current) {
        // Calculate position relative to the container
        const containerRect = containerRef.current.getBoundingClientRect();
        const targetRect = targetElement.getBoundingClientRect();
        const relativeTop =
          targetRect.top -
          containerRect.top +
          containerRef.current.scrollTop -
          scrollOffset;

        containerRef.current.scrollTo({
          top: relativeTop,
          behavior: "smooth",
        });
      } else if (targetElement) {
        if (scrollOffset !== 0) {
          // Set CSS scroll margin for offset
          targetElement.style.scrollMarginTop = `${scrollOffset}px`;
        }
        targetElement.scrollIntoView({
          behavior: scrollBehavior,
          block: scrollBlock,
        });
      }
    } else if (watch !== undefined && containerRef.current && endRef.current) {
      // Scroll the container to show the end ref
      endRef.current.scrollIntoView({
        behavior: scrollBehavior,
        block: scrollBlock,
      });
    } else if (watch && containerRef.current) {
      // Scroll to bottom within the container only
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [
    watch,
    scrollToId,
    onScrollStart,
    scrollOffset,
    scrollBehavior,
    scrollBlock,
  ]);

  return (
    <Box
      ref={containerRef}
      width="100%"
      flex="auto"
      display="flex"
      flexDirection="column"
      {...props}
    >
      {children}
      <div ref={bottomRef} />
      <Box pt="1rem" ref={endRef} />
    </Box>
  );
}
