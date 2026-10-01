"use client";
import React from "react";
import Box, { BoxProps } from "../../elements/box";
import Image from "next/image";

interface ThumbnailProps extends Omit<BoxProps, "as"> {
  src: string;
  alt: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  src,
  alt,
  objectFit,
  ...rest
}) => {
  return (
    <Box position="relative" overflow="hidden" {...rest}>
      <Box
        as={Image}
        src={src}
        alt={alt}
        fill
        sizes="100rem"
        objectFit={objectFit || "cover"}
      />
    </Box>
  );
};

export default Thumbnail;
