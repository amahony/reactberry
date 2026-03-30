import { Box } from "@/design-system/elements";
import { IconArrowLeft, IconArrowRight } from "@/design-system/icons";
import { AnimatePresence, motion } from "motion/react";
import { Control } from "../Controls/Control";

interface SliderControlsProps {
  onPrev: () => void;
  onNext: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
  slides: number;
  activeSlide: number;
  onChange: (index: number) => void;
  showDots?: boolean;
  showArrows?: boolean;
  paddingX?: number;
}

const controlVariants = {
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

const SliderControls = ({
  onPrev,
  onNext,
  canGoPrev,
  canGoNext,
  slides,
  activeSlide,
  onChange,
  showDots = true,
  showArrows = true,
  paddingX = 0,
}: SliderControlsProps) => {
  return (
    <Box
      display="flex"
      alignItems={"center"}
      justifyContent={"center"}
      //position={"absolute"}
      left={`${paddingX}px`}
      right={`${paddingX}px`}
      width="auto"
      gap="s"
      py="m"
      // height={"3rem"}
      //bg="red"
    >
      {showArrows && (
        <Control
          //ml="small"
          position="initial"
          onClick={onPrev}
          disabled={!canGoPrev}
          opacity={canGoPrev ? 1 : 0.1}
        >
          <Box as={IconArrowLeft} size="1.125rem" />
        </Control>
      )}

      {showDots && (
        <AnimatePresence>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap="xsmall"
          >
            {Array.from({ length: slides }).map((_, i) => (
              <Box
                as={motion.div}
                key={i}
                variants={controlVariants}
                initial="enter"
                animate={i === activeSlide ? "center" : "none"}
                whileHover="hover"
                exit="exit"
                flex="none"
                size="0.5rem"
                bg="black"
                shape="rounded"
                cursor="pointer"
                onClick={() => onChange(i)}
              />
            ))}
          </Box>
        </AnimatePresence>
      )}
      {showArrows && (
        <Control
          //mr="small"
          position="initial"
          onClick={onNext}
          disabled={!canGoNext}
          opacity={canGoNext ? 1 : 0.1}
        >
          <Box as={IconArrowRight} size="1.125rem" />
        </Control>
      )}
    </Box>
  );
};

export default SliderControls;
