"use client";
import { Text } from "@/design-system/elements";
import { motion } from "motion/react";
import Collection from "@/design-system/blocks/Collection";
import Placeholder from "@/design-system/blocks/Placeholder";

interface SkeletonProps {
  count?: number; // Number of placeholder items to show
  aspect?: string; // Aspect ratio of placeholders
  colsize?:
    | "small"
    | "medium"
    | "large"
    | "xlarge"
    | "xxlarge"
    | "auto"
    | "row"; // Optional column size
  showText?: boolean; // Optional flag to show/hide "Loading..." text
  variant?: "grid" | "component";
  width?: string;
  height?: string;
  [key: string]: any; // Allow additional props
}

export default function Skeleton({
  count = 9,
  aspect = "1.5/1",
  colsize = "xlarge",
  showText = true,
  variant = "grid",
  width = "100%",
  height = "40px",
  ...rest
}: SkeletonProps) {
  if (variant === "component") {
    return (
      <Placeholder
        as={motion.div}
        width={width}
        height={height}
        bg="transparent.light.0"
        shape="rounded"
        icon="IconDotsAnim"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        {...rest}
      />
    );
  }

  // Original grid variant
  return (
    <Collection colsize={colsize}>
      {[...Array(count)].map((_, i) => (
        <Placeholder
          key={i}
          as={motion.div}
          aspect={aspect}
          bg="transparent.light.0"
          shape="rounded"
          icon="IconDotsAnim"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          {...rest}
        >
          {showText && <Text fontSize="small">Loading...</Text>}
        </Placeholder>
      ))}
    </Collection>
  );
}
