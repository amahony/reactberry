"use client";
import Image from "next/image";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useState } from "react";
import { variants } from "../utils/animationVariants";
import downloadPhoto from "../utils/downloadPhoto";
import { useSwipeable } from "react-swipeable";
import Box from "../../../elements/box";
import {
  IconArrowLeft,
  IconArrowRight,
  IconDownloadData,
  IconLaunch,
} from "../../../icons";
import { useKeypress } from "../../../hooks/useKeypress";
import { Control } from "../../Controls/Control";

export default function Carousel({
  photos,
  current,
  navigation = true,
}: {
  photos: any;
  current: number;
  navigation?: boolean;
}) {
  // Handle undefined or empty photos array
  if (!photos || photos.length === 0) {
    return null;
  }

  const [index, setIndex] = useState(Number(current));

  const photo: any = photos[index];
  const [direction, setDirection] = useState(0);
  const filteredImages = photos;

  // console.log(photo);

  function changePhotoId(newVal: number) {
    if (newVal > index) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    setIndex(Number(newVal));
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (index < photos?.length - 1) {
        changePhotoId(index + 1);
      }
    },
    onSwipedRight: () => {
      if (index > 0) {
        changePhotoId(index - 1);
      }
    },
    trackMouse: true,
  });

  useKeypress("ArrowRight", () => {
    if (index + 1 < photos.length) {
      changePhotoId(index + 1);
    }
  });

  useKeypress("ArrowLeft", () => {
    if (index > 0) {
      changePhotoId(index - 1);
    }
  });

  return (
    <>
      <MotionConfig
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
      >
        {/* Main image */}

        <Box
          position="relative"
          aspect={3 / 2}
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="100%"
          maxWidth="80rem"
          maxHeight="90vh"
          mx="auto"
          overflow="hidden"
          {...handlers}
        >
          <AnimatePresence initial={false} custom={direction}>
            <Box
              as={motion.div}
              key={photo.url}
              initial="enter"
              animate="center"
              exit="exit"
              custom={direction}
              variants={variants}
              position="absolute"
              width="100%"
              mx="auto"
              aspect={1 / 1}
              //onClick={() => router.push(`/gallery/photos/${photo.id}`)}
            >
              <Image
                src={photo?.url}
                fill
                sizes="100vw"
                style={{ objectFit: "contain" }}
                priority
                alt="Image"
              />
            </Box>
          </AnimatePresence>
          {/* Buttons */}

          <Box as={motion.div}>
            {navigation && (
              <>
                {index > 0 && (
                  <Control ml="small" onClick={() => changePhotoId(index - 1)}>
                    <Box as={IconArrowLeft} size="1.125rem" />
                  </Control>
                )}
                {index + 1 < photos.length && (
                  <Control
                    mr="small"
                    left="auto"
                    right="0"
                    onClick={() => changePhotoId(index + 1)}
                  >
                    <Box as={IconArrowRight} size="1.125rem" />
                  </Control>
                )}
              </>
            )}
            <Box
              display="flex"
              position="absolute"
              alignItems={"center"}
              justifyContent={"space-between"}
              width={"100%"}
              top="0"
              right="0"
              gap="xxsmall"
              p="small"
              //mr="small"
            >
              <Box color="white" flex="auto">
                Title
              </Box>
              <Control
                as={motion.a}
                position={"static"}
                href={photo.url}
                target="_blank"
                title="Open fullsize version"
                rel="noreferrer"
              >
                <Box as={IconLaunch} size="1.125rem" />
              </Control>

              <Control
                position={"static"}
                onClick={() => downloadPhoto(`${photo.url}`, `${index}.jpg`)}
                title="Download fullsize version"
              >
                <Box as={IconDownloadData} size="1.125rem" />
              </Control>
            </Box>
          </Box>
        </Box>

        {navigation && (
          <Box
            position={"fixed"}
            width={"100%"}
            bottom="0"
            left="0"
            backgroundImage="linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.6))"
            height="6rem"
            zIndex={40}
            display={"flex"}
            overflow={"hidden"}
          >
            <Box
              as={motion.div}
              initial={false}
              aspect={3 / 2}
              mx="auto"
              my="small"
              display={"flex"}
            >
              {/* Bottom Nav bar */}
              <AnimatePresence initial={false}>
                {filteredImages?.map((image: { url: string }, i: number) => (
                  <Box
                    as={motion.div}
                    key={image.url + i}
                    initial={{
                      width: "0%",
                      x: `${Math.max((index - 1) * -100, 15 * -100)}%`,
                    }}
                    exit={{ width: "0%" }}
                    whileHover={{ opacity: 1 }}
                    animate={{
                      scale: Number(i) === index ? 1.25 : 1,
                      zIndex: Number(i) === index ? 19 : 1,
                      opacity: Number(i) === index ? 1 : 0.9,
                      width: "100%",
                      x: `${Math.max(index * -100, 15 * -100)}%`,
                    }}
                    onClick={() => changePhotoId(Number(i))}
                    opacity={0.9}
                    position={"relative"}
                    display={"inline-block"}
                    shape={
                      Number(i) === index
                        ? "rounded"
                        : Number(i) === 0
                          ? "roundedLeft"
                          : Number(i) === filteredImages.length - 1
                            ? "roundedRight"
                            : "square"
                    }
                    overflow="hidden"
                    flex="none"
                    style={{ transform: "translate3d(0, 0, 0)" }}
                    cursor="pointer"
                    bg="black"
                    boxShadow="medium"
                  >
                    <Image
                      alt="small photos on the bottom"
                      fill
                      src={image.url}
                      sizes="100vw"
                      style={{ objectFit: "cover" }}
                    />
                  </Box>
                ))}
              </AnimatePresence>
            </Box>
          </Box>
        )}
      </MotionConfig>
    </>
  );
}
