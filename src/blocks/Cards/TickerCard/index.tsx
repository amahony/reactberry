"use client";
import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Box, Text } from "../../../elements";
import Image from "next/image";

interface TickerCardProps {
  image?: string;
  width?: number | string;
  height?: number | string;
  overlayContent?: React.ReactNode | string;
  children?: React.ReactNode;
  [key: string]: any;
}

export default function TickerCard({
  image,
  overlayContent = "Explore Now",
  children,
  ...props
}: TickerCardProps) {
  const [showOverlay, setShowOverlay] = React.useState(false);

  const renderOverlayContent = () => {
    if (React.isValidElement(overlayContent)) {
      return overlayContent;
    }

    return (
      <Box
        as={motion.div}
        backgroundColor="white"
        paddingX={3}
        paddingY={2}
        borderRadius="full"
        display="flex"
        alignItems="center"
        gap="4px"
        initial={{ y: 10 }}
        animate={{ y: 0 }}
        exit={{ y: 10 }}
      >
        <Text fontSize="sm" fontWeight="semibold">
          {overlayContent}
        </Text>
      </Box>
    );
  };

  return (
    <Box
      as={motion.div}
      position="relative"
      overflow="hidden"
      aspect={"1/1"}
      display="flex"
      justifyContent="center"
      alignItems="center"
      onHoverStart={() => setShowOverlay(true)}
      onHoverEnd={() => setShowOverlay(false)}
      {...props}
    >
      {/* Children content in overlay */}
      {children}

      <AnimatePresence>
        {showOverlay && (
          <Box
            as={motion.div}
            position="absolute"
            left={0}
            top={0}
            bottom={0}
            right={0}
            zIndex={10}
            display="flex"
            justifyContent="center"
            alignItems="center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Overlay background */}
            <Box
              position="absolute"
              bg="black"
              opacity={0.7}
              height="100%"
              width="100%"
            />

            {/* Overlay Content */}
            <Box
              position="relative"
              zIndex={10}
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={2}
            >
              {renderOverlayContent()}
            </Box>
          </Box>
        )}
      </AnimatePresence>

      <Box
        position="absolute"
        width="100%"
        height="100%"
        zIndex={0}
        top="0"
        left="0"
      >
        <Image
          src={image as string}
          alt="image"
          fill
          sizes="100vh"
          style={{ objectFit: "cover" }}
        />
      </Box>
    </Box>
  );
}
