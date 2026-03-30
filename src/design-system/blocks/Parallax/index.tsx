"use client";
import { Box } from "@/design-system/elements";
import { motion, useInView, useScroll } from "motion/react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface ImageData {
  id: string;
  url: string;
}

interface CardProps {
  imgUrl: string;
}

interface ParallaxProps {
  images: ImageData[];
}

const Card = ({ imgUrl }: CardProps) => {
  // Definition for sticky position of the card
  const vertMargin = 10;

  // Ref for container
  const container = useRef(null);

  // State vars
  const [maxScrollY, setMaxScrollY] = useState(Infinity);
  const [dynamicStyles, setDynamicStyles] = useState({
    scale: 1,
    filter: 0,
  });

  // Framer Motion helpers
  const { scrollY } = useScroll({
    target: container,
  });
  const isInView = useInView(container, {
    // Fix: Use proper MarginType format
    margin: `0px 0px -${100 - vertMargin}% 0px` as any,
    once: false,
  });

  // Scroll tracking
  scrollY.on("change", (scrollY) => {
    // animationValue indicates progress after container hits sticky point, going from 1 to 0
    let animationValue = 1;
    if (scrollY > maxScrollY) {
      animationValue = Math.max(0, 1 - (scrollY - maxScrollY) / 10000);
    }

    setDynamicStyles({
      scale: animationValue,
      filter: (1 - animationValue) * 100,
    });
  });

  useEffect(() => {
    if (isInView) {
      setMaxScrollY(scrollY.get());
    }
  }, [isInView, scrollY]); // Fix: Add scrollY to dependency array

  return (
    <Box
      as={motion.div}
      ref={container}
      position={"sticky"}
      width={"100%"}
      bg="neutral"
      overflow={"hidden"}
      shape="roundedLarge"
      $shadow="medium"
      style={{
        scale: dynamicStyles.scale,
        filter: `blur(${dynamicStyles.filter}px)`,
        height: `${100 - 2 * vertMargin}vh`,
        top: `${vertMargin}vh`,
      }}
    >
      <Box position="relative" zIndex={22} p="medium">
        <h1>Card</h1>
      </Box>
      <Image
        src={imgUrl}
        alt={imgUrl}
        fill
        sizes="100vw"
        style={{ objectFit: "cover" }}
      />
    </Box>
  );
};

export default function Parallax({ images }: ParallaxProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems={"center"}
      minHeight={"100vh"}
    >
      <Box
        position={"relative"}
        display="flex"
        flexDirection="column"
        gap="10vh"
        py="10vh"
        width={"100%"}
      >
        {images.map((img) => (
          <Card key={img.id} imgUrl={img.url} />
        ))}
      </Box>
    </Box>
  );
}
