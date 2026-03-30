"use client"

import { useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import Box, { BoxProps } from "@/design-system/elements/box"
import { useReducedMotion } from "@/design-system/hooks/useReducedMotion"

// Default Apple Intelligence colors
const DEFAULT_COLORS = [
  "#3B82F6", // Blue
  "#A855F7", // Purple
  "#7A84FF", // Red
  "#35B3DF", // Cyan
]

export type AppleGlowProps = Omit<BoxProps, "children"> & {
  colors?: string[]
  borderRadius?: string | number
  intensity?: "sm" | "md" | "lg" | "xl"
  preview?: boolean // Controls visibility
  blurAmount?: number // Custom blur amount in pixels
  backgroundColor?: string // Background color for the mask
  rotationSpeed?: number // ms per tick (default 50)
}

// Blur intensity mapping
const BLUR_INTENSITY = {
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
}

// Generate linear gradient — unrolled for common color counts to avoid .join()
function createLinearGradient(colors: string[], angle: number): string {
  switch (colors.length) {
    case 2:
      return `linear-gradient(${angle}deg, ${colors[0]}, ${colors[1]})`
    case 3:
      return `linear-gradient(${angle}deg, ${colors[0]}, ${colors[1]}, ${colors[2]})`
    case 4:
      return `linear-gradient(${angle}deg, ${colors[0]}, ${colors[1]}, ${colors[2]}, ${colors[3]})`
    default:
      return `linear-gradient(${angle}deg, ${colors.join(", ")})`
  }
}

export default function AppleGlow({
  colors = DEFAULT_COLORS,
  borderRadius,
  intensity = "xl",
  preview = false,
  blurAmount,
  backgroundColor = "base",
  rotationSpeed = 50,
  ...boxProps
}: AppleGlowProps) {
  const prefersReducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const angleRef = useRef(234.576)
  const rafRef = useRef<number | null>(null)
  const lastTimeRef = useRef(0)
  const blur = blurAmount ?? BLUR_INTENSITY[intensity]

  const applyFrame = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.style.background = createLinearGradient(
        colors,
        angleRef.current,
      )
    }
  }, [colors])

  // Rotate gradient angle over time (rAF-driven, frame-synced)
  useEffect(() => {
    if (!preview || prefersReducedMotion) {
      // Show a static gradient when reduced motion is preferred
      if (preview) applyFrame()
      return
    }

    const tick = (now: number) => {
      const delta = lastTimeRef.current ? now - lastTimeRef.current : 0
      lastTimeRef.current = now

      if (delta > 0 && rotationSpeed > 0) {
        angleRef.current =
          (angleRef.current + delta / rotationSpeed) % 360
      }
      applyFrame()
      rafRef.current = requestAnimationFrame(tick)
    }

    lastTimeRef.current = 0
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [preview, rotationSpeed, applyFrame, prefersReducedMotion])

  return (
    <AnimatePresence>
      {preview && (
        <Box
          as={motion.div}
          ref={containerRef}
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            pointerEvents: "none",
            borderRadius,
            willChange: "background",
          }}
          {...boxProps}
        >
          {/* Blurred inset mask - the blur on the edges reveals the gradient */}
          <Box
            position="absolute"
            top="2px"
            left="2px"
            right="2px"
            bottom="2px"
            bg={backgroundColor}
            style={{
              filter: `blur(${blur}px)`,
              borderRadius: borderRadius ? `inherit` : undefined,
            }}
          />
        </Box>
      )}
    </AnimatePresence>
  )
}
