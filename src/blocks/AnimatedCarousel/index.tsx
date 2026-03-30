// carousel.tsx
"use client";

import { Box } from "@/design-system/elements";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionTemplate,
  useSpring,
} from "motion/react";
import { useEffect, useState } from "react";
import type { ImageType } from "@/design-system/types";
import { ControlLeft, ControlRight } from "../Controls/Control";

const COLLAPSED_ASPECT_RATIO = 0.5;
const FULL_ASPECT_RATIO = 3 / 2;
const MARGIN = 24;
const GAP = 2;

type CarouselProps = {
  images: ImageType[];
};

type ThumbnailsProps = {
  images: ImageType[];
  index: number;
  setIndex: (value: number) => void;
};

export default function AnimatedCarousel({ images }: CarouselProps) {
  const [index, setIndex] = useState(0);

  const x = index * 100;
  const xSpring = useSpring(x, { bounce: 0 });
  const xPercentage = useMotionTemplate`-${xSpring}%`;

  useEffect(() => {
    xSpring.set(x);
  }, [x, xSpring]);

  useEffect(() => {
    function handleKeyPress(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") {
        if (index > 0) {
          setIndex(index - 1);
        }
      } else if (e.key === "ArrowRight") {
        if (index < images.length - 1) {
          setIndex(index + 1);
        }
      }
    }

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [index, images.length]);

  return (
    <MotionConfig transition={{ type: "spring", bounce: 0 }}>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        height={"100%"}
      >
        <Box position="relative" overflow={"hidden"}>
          <Box as={motion.div} style={{ x: xPercentage }} display={"flex"}>
            {images.map((image, i) => (
              <Box
                as={motion.img}
                key={image.id}
                src={image.url}
                animate={{ opacity: i === index ? 1 : 0.4 }}
                aspect={"1/0.85"}
                width="100%"
                height="100vh"
                maxHeight={"70vh"}
                style={{ objectFit: "cover" }}
                flex="none"
              />
            ))}
          </Box>

          <AnimatePresence initial={false}>
            {index > 0 && (
              <ControlLeft
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0, pointerEvents: "none" }}
                whileHover={{ opacity: 1, scale: 1.1 }}
                ml="small"
                onClick={() => setIndex(index - 1)}
              />
            )}
          </AnimatePresence>

          <AnimatePresence initial={false}>
            {index + 1 < images.length && (
              <ControlRight
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0, pointerEvents: "none" }}
                whileHover={{ opacity: 1, scale: 1.1 }}
                mr="small"
                left="auto"
                right="0"
                onClick={() => setIndex(index + 1)}
              />
            )}
          </AnimatePresence>
        </Box>

        <Thumbnails images={images} index={index} setIndex={setIndex} />
      </Box>
    </MotionConfig>
  );
}

function Thumbnails({ images, index, setIndex }: ThumbnailsProps) {
  const x =
    index * 100 * (COLLAPSED_ASPECT_RATIO / FULL_ASPECT_RATIO) +
    MARGIN +
    index * GAP;
  const xSpring = useSpring(x, { bounce: 0 });
  const xPercentage = useMotionTemplate`-${xSpring}%`;

  useEffect(() => {
    xSpring.set(x);
  }, [x, xSpring]);

  return (
    <Box
      display="flex"
      justifyContent={"center"}
      overflow={"hidden"}
      height="3rem"
    >
      <Box
        as={motion.div}
        style={{
          aspectRatio: FULL_ASPECT_RATIO,
          gap: `${GAP}%`,
          x: xPercentage,
        }}
        display="flex"
        minWidth={"0"}
      >
        {images.map((image, i) => (
          <Box
            as={motion.div}
            onClick={() => setIndex(i)}
            initial={false}
            animate={i === index ? "active" : "inactive"}
            cursor="pointer"
            variants={{
              active: {
                aspectRatio: FULL_ASPECT_RATIO,
                marginLeft: `${MARGIN}%`,
                marginRight: `${MARGIN}%`,
              },
              inactive: {
                aspectRatio: COLLAPSED_ASPECT_RATIO,
                marginLeft: 0,
                marginRight: 0,
              },
            }}
            height="100%"
            flex="none"
            key={image.id}
          >
            <Box
              as="img"
              alt=""
              src={image.url}
              width="100%"
              height="100vh"
              style={{ objectFit: "cover" }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
