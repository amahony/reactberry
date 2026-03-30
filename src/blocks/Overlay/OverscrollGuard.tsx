"use client";

import { motion } from "motion/react";
import { Box } from "@/design-system/elements";

interface OverscrollGuardProps {
  zIndex?: number | string;
}

/**
 * Covers the safe-area gap at the bottom and extends well past the viewport
 * so iOS rubber-band overscroll never reveals the page behind an overlay.
 * The 200px buffer exceeds the maximum rubber-band distance on iOS.
 *
 * Must be rendered inside an `<AnimatePresence>` for exit animations.
 */
export function OverscrollGuard({ zIndex = 10008 }: OverscrollGuardProps) {
  return (
    <Box
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      position="fixed"
      left="0"
      right="0"
      zIndex={zIndex}
      bg="surface"
      skin="translucent"
      style={{
        bottom: "-200px",
        height: "calc(env(safe-area-inset-bottom, 0px) + 200px)",
      }}
    />
  );
}
