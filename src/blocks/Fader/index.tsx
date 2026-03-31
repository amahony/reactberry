"use client"
import { motion, AnimatePresence } from "motion/react"
import Box, { BoxProps } from "../../elements/box"

import Image from "next/image"

const FADE_DIRECTION = "to bottom"

type FaderProps = BoxProps & {
  image?: string | undefined | null
  fade?: boolean
  fadeColor?: string
  fadeDirection?: string
  imgStyle?: {}
  overlay?: {
    start: { color: string; stop: string }
    end: { color: string; stop: string }
  }
  variants?: {}
}

const overlayOptions = {
  start: {
    color: "transparent",
    stop: "0%",
  },
  end: {
    color: "currentColor",
    stop: "75%",
  },
}

// const fixedStyle = {
//   backgroundAttachment: "fixed",
//   backgroundSize: "cover",
// };

// const defaultStyle = {
//   backgroundSize: "cover",
//   backgroundPosition: "center",
// };

const defaultVariants = {
  enter: {
    opacity: 0,
    scale: 1.2,
    y: 30,
    x: 0,
    filter: "blur(20px)",
    transition: { duration: 0.4 },
  },
  center: {
    opacity: 1,
    scale: 1,
    y: 0,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.4 },
  },
  exit: {
    opacity: 0,
    scale: 1.04,
    y: -30,
    x: 0,
    filter: "blur(20px)",
    transition: { duration: 0.4 },
  },
  hover: {
    opacity: 1,
    scale: 1.04,
    y: 0,
    x: 0,
    transition: { duration: 0.2 },
  },
}

export default function Fader({
  image,
  fade = true,
  fadeColor = "currentColor",
  fadeDirection = FADE_DIRECTION,
  //imgStyle = "fixed",
  overlay = overlayOptions,
  variants = defaultVariants,
  ...props
}: FaderProps) {
  return (
    <Box
      as={motion.div}
      overflow="hidden"
      position="relative"
      width="100%"
      height="100%"
      {...props}
    >
      {/* Fade overlay */}
      {fade ? (
        <Box
          as={motion.div}
          position={"absolute"}
          color={fadeColor}
          width="100%"
          height="100%"
          top="0"
          bottom="0"
          left="0"
          zIndex={3}
          backgroundImage={`linear-gradient(${fadeDirection}, ${overlay.start.color}  ${overlay.start.stop}, ${overlay.end.color} ${overlay.end.stop})`}
        />
      ) : null}

      {/* Main image */}

      {image && (
        <AnimatePresence mode="wait">
          <Box
            as={motion.div}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 2 }}
            width="100%"
            height="100%"
            position="absolute"
            maxWidth="100%"
            top="0"
            left="0"
            zIndex={1}
          >
            <Image
              src={image as string}
              priority={true}
              loading="eager"
              fill
              alt="image"
              sizes="100%"
              style={{ objectFit: "cover" }}
            />
          </Box>
        </AnimatePresence>
      )}
    </Box>
  )
}
