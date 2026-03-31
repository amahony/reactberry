"use client";

import { motion } from "motion/react";
import { Box } from "../../elements";

interface BackdropProps {
  onClick?: () => void;
  bg?: string;
  zIndex?: number | string;
  /** When true, the backdrop fades in from opacity 0. Otherwise it appears instantly. */
  animated?: boolean;
  /** Custom motion transition. Falls back to a simple 200ms fade. */
  transition?: object;
  [key: string]: any;
}

/**
 * Animated full-screen backdrop overlay used by Modal, Drawer, etc.
 * Must be rendered inside an `<AnimatePresence>` for exit animations.
 */
export function Backdrop({
  onClick,
  bg = "rgba(0, 0, 0, 0.5)",
  zIndex,
  animated = false,
  transition,
  ...rest
}: BackdropProps) {
  return (
    <Box
      as={motion.div}
      initial={{ opacity: animated ? 0 : 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={transition ?? { duration: 0.2 }}
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      bg={bg}
      zIndex={zIndex}
      onClick={onClick}
      aria-hidden="true"
      {...rest}
    />
  );
}
