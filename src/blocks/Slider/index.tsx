"use client";
import { motion, type PanInfo } from "motion/react";
import { ReactNode, type WheelEvent } from "react";
import useSlider, { ResponsiveConfig, SliderConfig } from "./useSlider";
import { Box } from "../../elements";
import SliderControls from "./SliderControls";

interface Props {
  config?: SliderConfig;
  responsiveConfig?: ResponsiveConfig[];
  children: ReactNode[];
}

const Slider = ({ config, responsiveConfig = [], children }: Props) => {
  const {
    currentSlide,
    currentPage,
    canGoNext,
    canGoPrev,
    scrollTo,
    settings,
    setCurrentPage,
    nextSlide,
    prevSlide,
    setScrollTo,
    slideWidth,
    totalPages,
  } = useSlider(children, config, responsiveConfig);

  const showControls = totalPages > 1;

  return (
    <Box
      width="100%"
      position={"relative"}
      overflow={"hidden"}
      display={"flex"}
      flexDirection={"column"}
      px={`${settings.paddingX ?? 0}px`}
      py={`${settings.paddingY ?? 0}px`}
    >
      <Box
        as={motion.div}
        initial={{ x: 0 }}
        animate={{
          x: `-${(100 / children.length) * currentSlide}%`,
          width: `${slideWidth < 100 ? 100 : slideWidth}%`,
        }}
        transition={{
          type: "spring",
          visualDuration: 0.3,
          bounce: 0.2,
        }}
      >
        <Box
          as={motion.div}
          display={"flex"}
          justifyContent={
            children.length < settings.slidesToShow ? "flex-start" : "initial"
          }
          mr={`-${settings.spacing}px`}
          ml={`-${settings.spacing}px`}
          onWheel={(e: WheelEvent<HTMLDivElement>) => {
            if (e.deltaX < -1) {
              if (scrollTo) return;
              prevSlide();
              setScrollTo(true);
            } else if (e.deltaX > 1) {
              if (scrollTo) return;
              nextSlide();
              setScrollTo(true);
            } else {
              setScrollTo(false);
            }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(
            _event: MouseEvent | TouchEvent | PointerEvent,
            { offset, velocity }: PanInfo,
          ) => {
            const swipe = Math.abs(offset.x) > 50 && Math.abs(velocity.x) > 500;
            if (swipe && offset.x > 0) prevSlide();
            else if (swipe) nextSlide();
          }}
        >
          {children.map((child, index) => {
            // Calculate item width - use slidesToShow if we have enough items, otherwise use actual count
            const itemsToShow = Math.min(
              children.length,
              settings.slidesToShow,
            );
            const calculatedWidth = 100 / itemsToShow;

            // If maxItemWidth is set and we have fewer items than slidesToShow,
            // respect the maxItemWidth to prevent stretching
            const shouldRespectMaxWidth =
              children.length < settings.slidesToShow && settings.maxItemWidth;

            return (
              <Box
                key={index}
                pl={`${settings.spacing}px`}
                pr={`${settings.spacing}px`}
                width={
                  shouldRespectMaxWidth ? undefined : `${calculatedWidth}%`
                }
                maxWidth={
                  shouldRespectMaxWidth
                    ? `${settings.maxItemWidth}px`
                    : undefined
                }
                flex={shouldRespectMaxWidth ? "0 0 auto" : undefined}
              >
                {child}
              </Box>
            );
          })}
        </Box>
      </Box>

      {showControls && (
        <SliderControls
          canGoPrev={canGoPrev}
          canGoNext={canGoNext}
          onPrev={prevSlide}
          onNext={nextSlide}
          slides={totalPages}
          onChange={setCurrentPage}
          activeSlide={currentPage}
          showDots={settings.dots}
          showArrows={settings.arrows}
          paddingX={settings.paddingX}
        />
      )}
    </Box>
  );
};

export default Slider;
