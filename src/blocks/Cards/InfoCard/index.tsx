"use client";

import { Box, Button, Text } from "../../../elements";
import { AnimatePresence, HTMLMotionProps, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

const ANIMATION_DELAY = 0.3;

const InfoCard = ({
  tintColor = "#000000",
  title,
  description = "",
  detailContent = "",
  imageSrc,
  imageAlt,
  imageSizes = "100vh",
  children,
  ...props
}: {
  tintColor?: string;
  title: string;
  description?: string;
  detailContent?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageSizes?: string;
  children?: React.ReactNode;
} & HTMLMotionProps<"div">) => {
  const [showDetail, setShowDetail] = useState(false);
  const hasDetail = detailContent.length > 0;

  return (
    <Box
      as={motion.div}
      position={"relative"}
      display={"flex"}
      flexDirection={"column"}
      gap={2}
      aspect="4/3"
      //minHeight={"400px"}
      shape="rounded"
      initial={false}
      overflow={"hidden"}
      animate={showDetail ? "detail" : "main"}
      {...props}
    >
      <Box position={"relative"} zIndex={"2"} p="large">
        <Box
          position={"absolute"}
          top={0}
          left={0}
          width={"100%"}
          height={"100%"}
          zIndex={-1}
          style={{
            backdropFilter: "blur(8px)",
            mask: "linear-gradient(rgb(0, 0, 0) 70%, rgba(0, 0, 0, 0) 100%)",
          }}
        ></Box>
        <Text
          as={motion.h2}
          fontSize={"xl"}
          m="0"
          fontWeight={"medium"}
          color="primary"
        >
          {title}
        </Text>
        <Text>{description}</Text>
      </Box>
      {children ??
        (imageSrc ? (
          <Box
            as={Image}
            src={imageSrc}
            alt={imageAlt ?? title}
            fill
            sizes={imageSizes}
            zIndex={0}
            style={{ objectFit: "cover" }}
          />
        ) : null)}

      {hasDetail && (
        <ToggleButton
          tintColor={tintColor}
          onClick={() => setShowDetail(!showDetail)}
        />
      )}
      <AnimatePresence>
        {showDetail && (
          <DetailContainer tintColor={tintColor} content={detailContent} />
        )}
      </AnimatePresence>
    </Box>
  );
};

const DetailContainer = ({
  tintColor,
  content,
}: {
  tintColor: string;
  content: string;
}) => {
  const animationVariants = {
    container: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0, transition: { delay: ANIMATION_DELAY } },
    },
    content: {
      initial: { y: -100, opacity: 0 },
      animate: {
        y: 0,
        opacity: 1,
        transition: { delay: ANIMATION_DELAY, bounce: 0 },
      },
      exit: { y: -100, opacity: 0 },
    },
  };

  return (
    <Box
      as={motion.div}
      position={"absolute"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      width={"100%"}
      height={"100%"}
      top="0"
      left="0"
      zIndex={"2"}
      p={"medium"}
      bg={tintColor}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={animationVariants["container"]}
    >
      <Text
        as={motion.p}
        maxWidth={"80ch"}
        mx={"auto"}
        color={"white"}
        fontSize={"large"}
        fontWeight={"medium"}
        variants={animationVariants["content"]}
      >
        {content}
      </Text>
    </Box>
  );
};

const ToggleButton = ({
  tintColor,
  ...props
}: { tintColor: string } & HTMLMotionProps<"button">) => {
  const animationVariants = {
    main: {
      rotate: 0,
      backgroundColor: "#000000",
      stroke: "#ffffff",
    },
    detail: {
      rotate: 45,
      backgroundColor: "#ffffff",
      stroke: tintColor,
    },
  };

  return (
    <Button
      as={motion.button}
      position={"absolute"}
      right={"1rem"}
      bottom={"1rem"}
      zIndex={"3"}
      $size="icon.large"
      shape="circle"
      variants={animationVariants}
      transition={{
        bounce: 0,
      }}
      {...props}
    >
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        width={"1.5rem"}
        height={"1.5rem"}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </Button>
  );
};

export default InfoCard;
