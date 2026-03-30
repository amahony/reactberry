"use client";
import { useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react";
import Box, { BoxProps } from "@/design-system/elements/box";

interface SpotlightProps extends Omit<BoxProps, "children"> {
  children: React.ReactNode;
  aspect?: number | number[] | string[] | {};
  spotlightColor?: string;
}

export default function Spotlight({
  children,
  aspect = "4/5",
  spotlightColor = "transparent.brand.1",
  ...props
}: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Spotlight values with springs for smoother animation
  const spotlightX = useSpring(useMotionValue(0));
  const spotlightY = useSpring(useMotionValue(0));

  // Tilt values with adjusted spring configuration
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const tiltXSpring = useSpring(tiltX, {
    stiffness: 300,
    damping: 30,
  });
  const tiltYSpring = useSpring(tiltY, {
    stiffness: 300,
    damping: 30,
  });

  const transform = useMotionTemplate`perspective(1000px) rotateX(${tiltXSpring}deg) rotateY(${tiltYSpring}deg)`;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    // Calculate mouse position relative to card center
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Update spotlight position
    spotlightX.set(e.clientX - rect.left);
    spotlightY.set(e.clientY - rect.top);

    // Calculate rotation (reduced range for subtler effect)
    const rotateX = (mouseY / (rect.height / 2)) * -5;
    const rotateY = (mouseX / (rect.width / 2)) * 5;

    tiltX.set(rotateX);
    tiltY.set(rotateY);
  }

  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    // Reset tilt with animation
    tiltX.set(0);
    tiltY.set(0);
  }

  return (
    <Box
      as={motion.div}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      position={"relative"}
      style={{
        transformStyle: "preserve-3d",
        transform,
        transition: "all 0.2s ease-out",
        transformOrigin: "center center",
        aspectRatio: aspect,
      }}
      border="1px solid"
      skin="card"
      shape="rounded"
      borderColor="transparent.light.2"
      p="medium"
      $shadow="medium"
      overflow="hidden"
      {...props}
    >
      {/* Spotlight effect */}
      <Box
        as={motion.div}
        position={"absolute"}
        width="100%"
        height="100%"
        top="0"
        left="0"
        opacity={isHovered ? 1 : 0}
        zIndex={0}
        color={spotlightColor}
        style={{
          pointerEvents: "none",
          transition: "opacity 0.2s ease-out",
          background: useMotionTemplate`
            radial-gradient(
              300px circle at ${spotlightX}px ${spotlightY}px,
              currentColor,
              transparent 80%
            )
          `,
        }}
      />

      {/* Content */}
      <Box
        as={motion.div}
        position={"relative"}
        height={"100%"}
        width={"100%"}
        zIndex={1}
        style={{
          transform: isHovered ? "translateZ(48px)" : "translateZ(0px)",
          scale: isHovered ? 1.04 : 1,
          transition: "transform 0.2s ease-out, scale 0.2s ease-out",
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
