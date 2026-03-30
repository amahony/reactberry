"use client";
import Image from "next/image";
import Box from "@/design-system/elements/box";
import { useState } from "react";
import Modal from "./Modal";
import Carousel from "./Carousel";
import Collection from "../Collection";
import { motion } from "motion/react";
import type { ImageType } from "@/design-system/types";

type GalleryProps = {
  images: ImageType[];
};

export default function Gallery({ images }: GalleryProps) {
  const [open, setIsOpen] = useState(false);
  const [current, setCurrent] = useState(Number(0));

  return (
    <Collection colsize="medium">
      {images?.map((image: ImageType, i: number) => {
        return (
          <Box
            key={i}
            as={motion.div}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 1 }}
            aspect={3 / 2}
            position="relative"
            shape="rounded"
            overflow="hidden"
            cursor="pointer"
            $shadow="small"
            onClick={() => {
              setIsOpen(!open);
              setCurrent(Number(i));
            }}
          >
            <Image
              alt="image"
              src={image.url}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 640px) 100vw,
            (max-width: 1280px) 50vw,
            (max-width: 1536px) 33vw,
            25vw"
            />
          </Box>
        );
      })}
      <Modal open={open} onClose={() => setIsOpen(false)}>
        <Carousel current={current} photos={images} />
      </Modal>
    </Collection>
  );
}
