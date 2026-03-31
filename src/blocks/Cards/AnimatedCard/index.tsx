"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react";
import Box, { BoxProps } from "../../../elements/box";
import { useReducedMotion } from "../../../hooks/useReducedMotion";

interface AnimatedCardProps extends Omit<BoxProps, "ref" | "children"> {
  children: React.ReactNode;
  /** Spotlight color (default: "rgba(255, 255, 255, 0.2)") */
  spotlightColor?: string;
  /** Spotlight radius in pixels (default: 300) */
  spotlightSize?: number;
  /** Enable tilt effect (default: true) */
  tiltEnabled?: boolean;
  /** Enable spotlight effect (default: true) */
  spotlightEnabled?: boolean;
  /** Max rotation in degrees (default: 2.3) */
  maxTilt?: number;
  /** Spring stiffness (default: 300) */
  stiffness?: number;
  /** Spring damping (default: 30) */
  damping?: number;
}

/**
 * AnimatedCard - Interactive card with 3D tilt and spotlight effects
 *
 * A solid card with interactive 3D tilt and mouse-tracking spotlight.
 * Combines the best features from TiltCard and InteractiveCard components.
 */
export default function AnimatedCard({
  children,
  spotlightColor = "rgba(255, 255, 255, 0.2)",
  spotlightSize = 300,
  tiltEnabled = true,
  spotlightEnabled = true,
  maxTilt = 2.3,
  stiffness = 300,
  damping = 30,
  ...props
}: AnimatedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Spotlight values with springs for smoother animation
  const spotlightX = useSpring(useMotionValue(0), { stiffness, damping });
  const spotlightY = useSpring(useMotionValue(0), { stiffness, damping });

  // Tilt values
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const tiltXSpring = useSpring(tiltX, { stiffness, damping });
  const tiltYSpring = useSpring(tiltY, { stiffness, damping });

  // Transform template for 3D tilt
  const transform = useMotionTemplate`perspective(1000px) rotateX(${tiltXSpring}deg) rotateY(${tiltYSpring}deg)`;

  // Spotlight gradient
  const spotlightBackground = useMotionTemplate`
    radial-gradient(
      ${spotlightSize}px circle at ${spotlightX}px ${spotlightY}px,
      ${spotlightColor},
      transparent 70%
    )
  `;

  const shouldAnimate = !prefersReducedMotion && (tiltEnabled || spotlightEnabled);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current || !shouldAnimate) return;

    const rect = ref.current.getBoundingClientRect();

    // Calculate mouse position relative to card center
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Update spotlight position
    spotlightX.set(e.clientX - rect.left);
    spotlightY.set(e.clientY - rect.top);

    // Calculate rotation (clamped to maxTilt)
    if (tiltEnabled) {
      const rotateX = (mouseY / (rect.height / 2)) * -maxTilt;
      const rotateY = (mouseX / (rect.width / 2)) * maxTilt;

      tiltX.set(rotateX);
      tiltY.set(rotateY);
    }
  }

  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    // Reset tilt with animation
    if (tiltEnabled) {
      tiltX.set(0);
      tiltY.set(0);
    }
  }

  return (
    <Box
      as={motion.div}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      position="relative"
      overflow="hidden"
      shape="rounded"
      skin="card"
      $shadow="medium"
      style={{
        transformStyle: shouldAnimate ? "preserve-3d" : undefined,
        transform: shouldAnimate ? transform : undefined,
        transformOrigin: "center center",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        isolation: "isolate",
      }}
      {...props}
    >
      {/* Content */}
      <Box
        as={shouldAnimate ? motion.div : "div"}
        position="relative"
        height="100%"
        width="100%"
        zIndex={1}
        style={
          shouldAnimate
            ? {
                transform: isHovered ? "translateZ(24px)" : "translateZ(0px)",
                transition: "transform 0.3s ease-out",
                transformStyle: "preserve-3d",
              }
            : undefined
        }
      >
        {children}
      </Box>

      {/* Spotlight effect - on top of content */}
      {shouldAnimate && spotlightEnabled && (
        <Box
          as={motion.div}
          position="absolute"
          width="100%"
          height="100%"
          top="0"
          left="0"
          opacity={isHovered ? 1 : 0}
          zIndex={2}
          style={{
            pointerEvents: "none",
            transition: "opacity 0.3s ease-out",
            background: spotlightBackground,
          }}
        />
      )}
    </Box>
  );
}
