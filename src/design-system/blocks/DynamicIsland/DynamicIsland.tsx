"use client";

import { Box } from "@/design-system/elements";
import { motion } from "motion/react";
import { type ReactNode, useState } from "react";

const BOUNCE_VARIANTS = {
  idle: 0.5,
} as const;
// 'ease-in': [0.55, 0.055, 0.675, 0.19], // -- ease-in-cubic
//    'ease-out': [0.23, 1, 0.32, 1], // -- ease-out-quint
//    'ease-in-out': [0.785, 0.135, 0.15, 0.86], // -- ease-in-out-circ
const DEFAULT_BOUNCE = 0.5;

export type DynamicIslandView = string;

export interface DynamicIslandProps {
  view?: DynamicIslandView;
  onViewChange?: (view: DynamicIslandView) => void;
  content?: ReactNode;
  controlIcons?: Record<string, ReactNode>;
  containerProps?: any;
}

export default function DynamicIsland({
  view: controlledView,
  content,
  containerProps,
}: DynamicIslandProps) {
  const [internalView] = useState<DynamicIslandView>("default");
  const [variantKey] = useState<string>("default");

  const view = controlledView ?? internalView;

  return (
    <Box
      as={motion.div}
      layout
      skin="translucent.dark"
      shape="pill"
      minWidth={"6rem"}
      m="0 auto"
      overflow={"hidden"}
      flex="none"
      height={"fit-content"}
      width={"fit-content"}
      display="flex"
      alignItems="center"
      justifyContent={"center"}
      gap="xxxs"
      // style={{ pointerEvents: "initial" }}
      {...containerProps}
      transition={{
        type: "spring",
        bounce:
          BOUNCE_VARIANTS[variantKey as keyof typeof BOUNCE_VARIANTS] ??
          DEFAULT_BOUNCE,
      }}
    >
      <Box
        as={motion.div}
        animate={{
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          originX: 0.5,
          originY: 0.5,
          transition: { delay: 0.05 },
        }}
        initial={{
          scale: 0.9,
          opacity: 0,
          filter: "blur(5px)",
          originX: 0.5,
          originY: 0.5,
        }}
        key={view}
        transition={{
          type: "spring",
          bounce:
            BOUNCE_VARIANTS[variantKey as keyof typeof BOUNCE_VARIANTS] ??
            DEFAULT_BOUNCE,
        }}
      >
        {content}
      </Box>
    </Box>
  );
}
