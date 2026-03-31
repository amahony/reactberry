"use client";

import { animate } from "motion";
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useMotionValueEvent,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import useMeasure from "react-use-measure";

import { Box, Text } from "../../elements";
import { ControlLeft, ControlRight } from "../Controls/Control";

export interface VideoMarqueeItem {
  id: string;
  src?: string;
  embedUrl?: string;
  sourceUrl?: string;
  imageSrc?: string;
  poster?: string;
  title: string;
  handle: string;
  description?: string;
}

export interface VideoMarqueeProps {
  items: VideoMarqueeItem[];
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  gap?: string | number;
  showControls?: boolean;
  showDots?: boolean;
  showPlayPause?: boolean;
}

interface VideoMarqueeCardProps {
  item: VideoMarqueeItem;
  cardRef?: React.Ref<any>;
  ariaHidden?: boolean;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

interface VideoMarqueeFooterControlsProps {
  itemsCount: number;
  activeIndex: number;
  isAutoPlaying: boolean;
  showDots: boolean;
  showPlayPause: boolean;
  onDotClick: (index: number) => void;
  onTogglePlayPause: () => void;
}

const DEFAULT_CARD_STEP = 304;

const dotVariants = {
  enter: {
    opacity: 0.2,
    width: ".5rem",
  },
  center: {
    opacity: 0.7,
    width: "2rem",
  },
  exit: {
    opacity: 0.1,
    width: ".5rem",
  },
  hover: {
    opacity: 1,
    scale: 1.1,
  },
};

function wrapOffset(offset: number, sequenceWidth: number) {
  if (!sequenceWidth) {
    return offset;
  }

  const wrapped = ((offset % sequenceWidth) + sequenceWidth) % sequenceWidth;
  return wrapped === 0 ? 0 : wrapped - sequenceWidth;
}

function VideoMarqueeCard({
  item,
  cardRef,
  ariaHidden,
  onHoverStart,
  onHoverEnd,
}: VideoMarqueeCardProps) {
  const isEmbed = Boolean(item.embedUrl);
  const isImage =
    Boolean(item.imageSrc) ||
    (!item.embedUrl && !item.src && Boolean(item.poster));
  const badgeLabel = isEmbed || isImage ? "TikTok" : "Demo reel";

  return (
    <Box
      ref={cardRef}
      as={motion.article}
      width="18rem"
      style={{ maxWidth: "calc(100vw - 3rem)" }}
      border="1px solid rgba(255, 255, 255, 0.12)"
      bg="rgba(255, 255, 255, 0.05)"
      overflow="hidden"
      position="relative"
      aspect="9/16"
      shape="roundedLarge"
      aria-hidden={ariaHidden}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      display="flex"
      flexDirection="column"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      <Box
        position="absolute"
        top="0.75rem"
        left="0.75rem"
        zIndex={2}
        px="0.625rem"
        py="0.375rem"
        bg="rgba(0, 0, 0, 0.58)"
        color="white"
        style={{ backdropFilter: "blur(10px)" }}
      >
        <Text fontSize="0.75rem" fontWeight="700">
          {badgeLabel}
        </Text>
      </Box>

      <Box position="relative" flex="1 1 auto" minHeight="0">
        {item.embedUrl ? (
          <Box
            as="iframe"
            src={item.embedUrl}
            title={`${item.title} TikTok embed`}
            width="100%"
            height="100%"
            border="0"
            loading="lazy"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          />
        ) : item.imageSrc || item.poster ? (
          <Box
            as="img"
            src={item.imageSrc || item.poster}
            alt={item.title}
            display="block"
            width="100%"
            height="100%"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <Box
            as="video"
            src={item.src}
            poster={item.poster}
            display="block"
            width="100%"
            height="100%"
            muted
            autoPlay
            loop
            playsInline
            preload="metadata"
            style={{ objectFit: "cover" }}
          />
        )}
      </Box>

      <Box
        p="1rem"
        color="white"
        bg={isEmbed || isImage ? "rgba(0, 0, 0, 0.92)" : "transparent"}
        position={isEmbed || isImage ? "relative" : "absolute"}
        left={isEmbed || isImage ? undefined : "0"}
        right={isEmbed || isImage ? undefined : "0"}
        bottom={isEmbed || isImage ? undefined : "0"}
        background={
          isEmbed || isImage
            ? undefined
            : "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.82) 100%)"
        }
      >
        <Text as="div" fontSize="1rem" fontWeight="700">
          {item.title}
        </Text>
        <Text as="div" fontSize="0.875rem" opacity={0.72}>
          {item.handle}
        </Text>
        {item.description && (
          <Text as="div" fontSize="0.875rem" lineHeight={1.4} mt="0.5rem">
            {item.description}
          </Text>
        )}
        {item.sourceUrl && (
          <Text
            as="a"
            href={item.sourceUrl}
            target="_blank"
            rel="noreferrer"
            fontSize="0.75rem"
            fontWeight="700"
            mt="0.625rem"
            style={{
              display: "inline-block",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            Open on TikTok
          </Text>
        )}
      </Box>
    </Box>
  );
}

function VideoMarqueeFooterControls({
  itemsCount,
  activeIndex,
  isAutoPlaying,
  showDots,
  showPlayPause,
  onDotClick,
  onTogglePlayPause,
}: VideoMarqueeFooterControlsProps) {
  if ((!showDots && !showPlayPause) || itemsCount <= 1) {
    return null;
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap="s"
      py="m"
    >
      {showDots && (
        <AnimatePresence>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap="xsmall"
          >
            {Array.from({ length: itemsCount }).map((_, index) => (
              <Box
                as={motion.button}
                key={index}
                type="button"
                variants={dotVariants}
                initial="enter"
                animate={index === activeIndex ? "center" : "enter"}
                whileHover="hover"
                exit="exit"
                flex="none"
                height="0.5rem"
                border="0"
                p="0"
                bg="black"
                shape="rounded"
                cursor="pointer"
                onClick={() => onDotClick(index)}
                aria-label={`Go to demo ${index + 1}`}
              />
            ))}
          </Box>
        </AnimatePresence>
      )}

      {showPlayPause && (
        <Box
          as={motion.button}
          type="button"
          border="1px solid rgba(0, 0, 0, 0.12)"
          bg="white"
          color="black"
          px="1rem"
          py="0.5rem"
          shape="pill"
          cursor="pointer"
          whileTap={{ scale: 0.97 }}
          onClick={onTogglePlayPause}
          aria-pressed={isAutoPlaying}
        >
          <Text as="span" fontSize="0.875rem" fontWeight="700">
            {isAutoPlaying ? "Pause" : "Play"}
          </Text>
        </Box>
      )}
    </Box>
  );
}

export default function VideoMarquee({
  items,
  speed = 42,
  direction = "left",
  pauseOnHover = true,
  gap = "1rem",
  showControls = true,
  showDots = true,
  showPlayPause = true,
}: VideoMarqueeProps) {
  const [sequenceRef, { width: sequenceWidth }] = useMeasure();
  const [cardRef, { width: cardWidth }] = useMeasure();
  const x = useMotionValue(0);
  const animationRef = useRef<ReturnType<typeof animate> | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isSettling, setIsSettling] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const pixelsPerSecond = Math.max(speed, 1);
  const autoDirection = direction === "left" ? -1 : 1;
  const itemStep =
    (items.length ? sequenceWidth / items.length : 0) ||
    cardWidth ||
    DEFAULT_CARD_STEP;
  const isPaused =
    !isAutoPlaying || (pauseOnHover && isHovered) || isDragging || isSettling;

  const getTravel = (offset: number) => {
    if (!sequenceWidth) {
      return 0;
    }

    const wrapped = wrapOffset(offset, sequenceWidth);
    return ((-wrapped % sequenceWidth) + sequenceWidth) % sequenceWidth;
  };

  useEffect(() => {
    if (!sequenceWidth) {
      return;
    }

    x.set(wrapOffset(x.get(), sequenceWidth));
  }, [sequenceWidth, x]);

  useEffect(() => {
    return () => {
      animationRef.current?.stop();
    };
  }, []);

  useAnimationFrame((_, delta) => {
    if (!sequenceWidth || isPaused) {
      return;
    }

    const distance = (pixelsPerSecond * delta) / 1000;
    const next = x.get() + distance * autoDirection;
    x.set(wrapOffset(next, sequenceWidth));
  });

  useMotionValueEvent(x, "change", (latest) => {
    if (!sequenceWidth || !itemStep) {
      return;
    }

    const travel = getTravel(latest);
    const nextIndex = Math.round(travel / itemStep) % items.length;
    setActiveIndex(nextIndex);
  });

  const animateTo = (target: number) => {
    if (!sequenceWidth) {
      return;
    }

    animationRef.current?.stop();
    setIsSettling(true);

    const controls = animate(x, wrapOffset(target, sequenceWidth), {
      duration: 0.35,
      ease: "easeOut",
      onComplete: () => {
        x.set(wrapOffset(x.get(), sequenceWidth));
        setIsSettling(false);
        animationRef.current = null;
      },
    });

    animationRef.current = controls;
  };

  const stepBy = (stepDirection: "prev" | "next") => {
    const step = itemStep || DEFAULT_CARD_STEP;
    const delta = stepDirection === "next" ? -step : step;
    animateTo(x.get() + delta);
  };

  const goToIndex = (targetIndex: number) => {
    if (!itemStep || !items.length) {
      return;
    }

    const currentIndex =
      Math.round(getTravel(x.get()) / itemStep) % items.length;
    let deltaIndex = targetIndex - currentIndex;

    if (Math.abs(deltaIndex) > items.length / 2) {
      deltaIndex += deltaIndex > 0 ? -items.length : items.length;
    }

    animateTo(x.get() - deltaIndex * itemStep);
  };

  const snapToClosest = () => {
    if (!itemStep) {
      return;
    }

    const snappedIndex =
      Math.round(getTravel(x.get()) / itemStep) % items.length;
    goToIndex(snappedIndex);
  };

  const renderSequence = ({
    withRefs = false,
    ariaHidden = false,
  }: {
    withRefs?: boolean;
    ariaHidden?: boolean;
  }) => (
    <Box
      ref={withRefs ? sequenceRef : undefined}
      display="flex"
      gap={gap}
      pr={gap}
      aria-hidden={ariaHidden || undefined}
    >
      {items.map((item, index) => (
        <VideoMarqueeCard
          key={`${item.id}-${ariaHidden ? "duplicate" : "primary"}`}
          item={item}
          cardRef={withRefs && index === 0 ? cardRef : undefined}
          ariaHidden={ariaHidden}
          onHoverStart={pauseOnHover ? () => setIsHovered(true) : undefined}
          onHoverEnd={pauseOnHover ? () => setIsHovered(false) : undefined}
        />
      ))}
    </Box>
  );

  if (!items.length) {
    return null;
  }

  return (
    <Box
      position="relative"
      overflow={"hidden"}
      p="l"
    >
      <Box
        as={motion.div}
        drag="x"
        dragElastic={0.04}
        style={{
          x,
          display: "flex",
          width: "max-content",
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onDragStart={() => {
          animationRef.current?.stop();
          setIsDragging(true);
        }}
        onDragEnd={() => {
          setIsDragging(false);
          snapToClosest();
        }}
      >
        {renderSequence({ withRefs: true })}
        {renderSequence({ ariaHidden: true })}
      </Box>

      {showControls && items.length > 1 && (
        <>
          <ControlLeft left="0.5rem" onClick={() => stepBy("prev")} />
          <ControlRight
            right="0.5rem"
            left="auto"
            onClick={() => stepBy("next")}
          />
        </>
      )}

      <VideoMarqueeFooterControls
        itemsCount={items.length}
        activeIndex={activeIndex}
        isAutoPlaying={isAutoPlaying}
        showDots={showDots}
        showPlayPause={showPlayPause}
        onDotClick={goToIndex}
        onTogglePlayPause={() => setIsAutoPlaying((current) => !current)}
      />
    </Box>
  );
}
