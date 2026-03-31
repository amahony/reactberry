"use client";
import { Box } from "../../elements";
import type { ImageType } from "../../types";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

export const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

type SlideshowProps = {
  photos: ImageType[];
  showProgress?: boolean;
  duration?: number;
  fade?: boolean;
};

const imageVariants = {
  enter: { opacity: 0, scale: 1.04, y: 10, transition: { duration: 0.6 } },
  center: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, scale: 1.04, y: -10, transition: { duration: 0.6 } },
};

const controlVariants = {
  enter: { opacity: 0.2, width: ".5rem" },
  center: { opacity: 0.7, width: "2rem" },
  exit: { opacity: 0.1, width: ".5rem" },
  hover: { opacity: 1, scale: 1.1 },
};

export function Slideshow({
  photos,
  showProgress,
  duration = 3,
  fade = true,
}: SlideshowProps) {
  const [page, setPage] = useState(0);
  const [autoplayKey, setAutoplayKey] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [instanceId] = useState(() => Math.random().toString(36).substr(2, 9)); // Prevents SSR mismatches

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (photos.length > 1) {
      const timer = setTimeout(
        () => setPage((prev) => (prev + 1) % photos.length),
        duration * 1000
      );
      return () => clearTimeout(timer);
    }
  }, [page, photos, duration, autoplayKey]);

  if (!photos || photos.length === 0) {
    return (
      <Box
        width="100%"
        height="100%"
        bg="base"
        shape="rounded"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        No images available
      </Box>
    );
  }

  if (photos.length === 1) {
    return (
      <Box
        as={motion.div}
        variants={imageVariants}
        initial="enter"
        animate="center"
        exit="exit"
        whileHover="initial"
        width="100%"
        height="100%"
        position="absolute"
        maxWidth="100%"
        top="0"
        left="0"
        shape="rounded"
        zIndex={1}
        background={`url(${photos[0].url}) no-repeat center center / cover`}
      />
    );
  }

  const results = photos;
  const dataIndex = wrap(0, results.length, page);

  return (
    <Box
      as={motion.div}
      overflow="hidden"
      position="relative"
      width="100%"
      height="100%"
      bg="base"
      shape="rounded"
    >
      {fade && (
        <Box
          as={motion.div}
          position="absolute"
          width="100%"
          height="100%"
          top="0"
          zIndex={2}
          backgroundImage="linear-gradient(to bottom, transparent, currentColor 100%)"
        />
      )}

      <AnimatePresence>
        {mounted && showProgress && (
          <Box
            position="absolute"
            width="100%"
            bottom="0"
            left="0"
            zIndex={2}
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap="xsmall"
            p="large"
            backgroundImage="linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.6))"
          >
            {results.map((_, i) => (
              <Box
                as={motion.div}
                key={i}
                variants={controlVariants}
                initial="enter"
                animate={i === dataIndex ? "center" : "none"}
                whileHover="hover"
                exit="exit"
                flex="none"
                size="0.5rem"
                bg="white"
                shape="rounded"
                cursor="pointer"
                onClick={() => {
                  setPage(i);
                  setAutoplayKey((prev) => prev + 1);
                }}
              />
            ))}
          </Box>
        )}
        <Box
          as={motion.div}
          key={`slideshow-${page}-${instanceId}`}
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          whileHover="initial"
          width="100%"
          height="100%"
          position="absolute"
          maxWidth="100%"
          top="0"
          left="0"
          zIndex={1}
          background={`url(${
            results[dataIndex].url || results[0].url
          }) no-repeat center center / cover`}
        />
      </AnimatePresence>
    </Box>
  );
}
