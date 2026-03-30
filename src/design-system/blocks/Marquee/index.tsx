"use client";
import React from "react";
import styled, { css, keyframes } from "styled-components";
import { Box } from "@/design-system/elements";

type MarqueeProps = {
  children: React.ReactNode;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  gap?: string | number;
  repeat?: number;
  fadeEdges?: boolean;
  className?: string;
};

const scrollMarquee = keyframes`
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    transform: translate3d(calc(-100% / var(--marquee-repeat)), 0, 0);
  }
`;

const MarqueeRoot = styled(Box)<{ $pauseOnHover: boolean; $fadeEdges: boolean }>`
  overflow: hidden;

  ${(props) =>
    props.$fadeEdges &&
    css`
      mask-image: linear-gradient(
        to right,
        transparent 0%,
        black 10%,
        black 90%,
        transparent 100%
      );
      -webkit-mask-image: linear-gradient(
        to right,
        transparent 0%,
        black 10%,
        black 90%,
        transparent 100%
      );
    `}

  ${(props) =>
    props.$pauseOnHover &&
    css`
      &:hover [data-marquee-track="true"] {
        animation-play-state: paused;
      }
    `}
`;

const MarqueeTrack = styled.div<{
  $duration: number;
  $direction: "left" | "right";
}>`
  display: flex;
  width: max-content;
  will-change: transform;
  animation: ${scrollMarquee} ${(props) => props.$duration}s linear infinite;
  animation-direction: ${(props) =>
    props.$direction === "right" ? "reverse" : "normal"};
`;

export default function Marquee({
  children,
  speed = 50,
  direction = "left",
  pauseOnHover = false,
  gap = "1rem",
  repeat = 2,
  fadeEdges = true,
  className,
}: MarqueeProps) {
  const duration = 20 * (100 / speed);
  const safeRepeat = Math.max(2, repeat);
  const rootStyle = {
    "--marquee-repeat": String(safeRepeat),
  } as React.CSSProperties;

  return (
    <MarqueeRoot
      position="relative"
      width="100%"
      className={className}
      style={rootStyle}
      $pauseOnHover={pauseOnHover}
      $fadeEdges={fadeEdges}
    >
      <MarqueeTrack
        data-marquee-track="true"
        $duration={duration}
        $direction={direction}
      >
        {Array.from({ length: safeRepeat }).map((_, index) => (
          <Box
            key={index}
            display="flex"
            flexWrap="nowrap"
            gap={gap}
            flexShrink={0}
            pr={gap}
            aria-hidden={index > 0}
          >
            {children}
          </Box>
        ))}
      </MarqueeTrack>
    </MarqueeRoot>
  );
}
