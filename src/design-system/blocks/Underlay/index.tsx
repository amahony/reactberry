"use client";

import { Box } from "@/design-system/elements";
import styled from "styled-components";
import { useEffect, useRef } from "react";

interface UnderlayProps {
  backgroundColor?: string;
  dotColor?: string;
  dotSize?: number;
  gridSize?: number;
  blurAmount?: number;
  maskGradient?: string;
  hasMask?: boolean;
  stop1?: string;
  stop2?: string;
  [key: string]: any;
}

const StyledBox = styled(Box).withConfig({
  shouldForwardProp: (prop) =>
    ![
      "dotColor",
      "dotSize",
      "gridSize",
      "blurAmount",
      "maskGradient",
      "hasMask",
      "stop1",
      "stop2",
    ].includes(prop),
})<UnderlayProps>`
  ${(props) => `backdrop-filter: blur(${props.blurAmount || 8}px);`}
  ${(props) =>
    props.hasMask &&
    `
    mask: linear-gradient(
      ${props.maskGradient || "rgb(0, 0, 0) 33%, rgba(0, 0, 0, 0) 100%"}
    );
  `}
  transform: translateZ(0);
  will-change: backdrop-filter;
`;

const Underlay = ({
  backgroundColor,
  dotColor,
  dotSize = 1,
  gridSize = 4,
  blurAmount = 12,
  maskGradient,
  hasMask = true,
  stop1,
  stop2,
  ...props
}: UnderlayProps) => {
  const boxRef = useRef<HTMLDivElement>(null);

  // Force blur application after sidebar state changes
  useEffect(() => {
    // This triggers a reflow to ensure the blur is applied
    if (boxRef.current) {
      // Force a repaint to ensure the backdrop-filter is applied
      const currentBlur = boxRef.current.style.backdropFilter;
      boxRef.current.style.backdropFilter = "none";
      // Force reflow
      void boxRef.current.offsetHeight;
      // Restore the blur
      boxRef.current.style.backdropFilter =
        currentBlur || `blur(${blurAmount}px)`;
    }
  }, [blurAmount, props.width, props.height, props.expanded]);

  // Determine if we're using dots or a gradient
  const useGradient = stop1 && stop2;

  // Generate the background image based on whether we're using dots or gradient
  const backgroundImage = useGradient
    ? `linear-gradient(to bottom right, ${stop1}, ${stop2})`
    : `radial-gradient(
        ${dotColor || "transparent"} 1px,
        ${backgroundColor || "currentColor"} ${dotSize}px
      )`;

  // If using gradient, don't apply grid background size
  const backgroundSize = useGradient
    ? undefined
    : `${gridSize}px ${gridSize}px`;

  return (
    <StyledBox
      ref={boxRef}
      bg="transparent"
      backgroundSize={backgroundSize}
      backgroundImage={backgroundImage}
      blurAmount={blurAmount}
      hasMask={hasMask}
      maskGradient={maskGradient}
      {...props}
    />
  );
};

export default Underlay;
