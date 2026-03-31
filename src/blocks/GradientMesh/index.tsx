"use client";

import { MeshGradient } from "@paper-design/shaders-react";
import { Box } from "../../elements";
import styled from "styled-components";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface GradientMeshProps {
  /** Animation intensity level */
  intensity?: "low" | "medium" | "high";
  /** Custom colors for the gradient (brand cyan, accent purple, bridge blue) */
  colors?: {
    primary?: string;
    secondary?: string;
    tertiary?: string;
  };
  /** Animation speed multiplier (default: 1) */
  speed?: number;
  /** Whether the animation is enabled (default: true) */
  animated?: boolean;
  /** Distortion amount (0-1) */
  distortion?: number;
  /** Swirl amount (0-1) */
  swirl?: number;
  /** Grain mixer amount (0-1) */
  grainMixer?: number;
  /** Grain overlay amount (0-1) */
  grainOverlay?: number;
  /** Scale factor */
  scale?: number;
  /** Rotation in degrees */
  rotation?: number;
  /** X offset */
  offsetX?: number;
  /** Y offset */
  offsetY?: number;
  /** Additional props passed to the container */
  [key: string]: any;
}

// Intensity presets mapped to shader parameters
const intensityConfig = {
  low: { distortion: 0.3, swirl: 0.05 },
  medium: { distortion: 0.6, swirl: 0.1 },
  high: { distortion: 0.9, swirl: 0.2 },
};

const Container = styled(Box)`
  overflow: hidden;
  pointer-events: none;
`;

/**
 * GradientMesh - Animated gradient mesh background
 *
 * Creates a flowing, organic gradient animation using WebGL shaders.
 * Uses the @paper-design/shaders-react MeshGradient component.
 */
export default function GradientMesh({
  intensity = "medium",
  colors,
  speed = 1,
  animated = true,
  distortion,
  swirl,
  grainMixer = 0,
  grainOverlay = 0,
  scale = 1,
  rotation = 0,
  offsetX = 0,
  offsetY = 0,
  ...props
}: GradientMeshProps) {
  const prefersReducedMotion = useReducedMotion();
  const config = intensityConfig[intensity];
  const isPaused = prefersReducedMotion || !animated;

  // Brand colors converted to hex
  // Brand cyan:    hsl(192, 100%, 38%) → #0099c2
  // Accent purple: hsl(256, 90%, 58%)  → #7c4dff
  // Bridge blue:   hsl(224, 95%, 52%)  → #1565ef
  const colorArray = [
    colors?.primary || "#0099c2",
    colors?.secondary || "#7c4dff",
    colors?.tertiary || "#1565ef",
    colors?.primary || "#0099c2",
  ];

  return (
    <Container {...props}>
      <MeshGradient
        style={{ width: "100%", height: "100%" }}
        colors={colorArray}
        distortion={distortion ?? config.distortion}
        swirl={swirl ?? config.swirl}
        speed={isPaused ? 0 : speed}
        grainMixer={grainMixer}
        grainOverlay={grainOverlay}
        scale={scale}
        rotation={rotation}
        offsetX={offsetX}
        offsetY={offsetY}
      />
    </Container>
  );
}
