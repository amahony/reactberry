"use client";
import { motion, useScroll, useTransform } from "motion/react";
import React, { useRef } from "react";
import Image from "next/image";
import { Box } from "../../elements";

interface ParallaxSectionProps {
  image: string;
  content?: React.ReactNode;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  image,
  content,
}) => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <Box
      ref={sectionRef}
      as="section"
      position="relative"
      height="100vh"
      overflow="hidden"
    >
      {content}
      <Box
        as={motion.div}
        position="absolute"
        width="100%"
        height="120%"
        zIndex={0}
        style={{ top: y }}
      >
        <Box
          position="absolute"
          width={"100%"}
          height={"100%"}
          top="0"
          left={"0"}
          zIndex={10}
          bg="rgba(0, 0, 0, 0.3)"
        />
        <Image
          src={image}
          alt="Overview"
          fill
          sizes="100vh"
          style={{ objectFit: "cover" }}
        />
      </Box>
    </Box>
  );
};

export default ParallaxSection;
