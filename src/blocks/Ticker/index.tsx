"use client";
import React from "react";
import { animate, motion, useMotionValue } from "motion/react";
import { Box } from "../../elements";
import useMeasure from "react-use-measure";

interface TickerProps {
  children: React.ReactNode;
  fastDuration?: number;
  slowDuration?: number;
  direction?: "left" | "right";
  gap?: string | number;
  className?: string;
}

export default function Ticker({
  children,
  fastDuration = 25,
  slowDuration = 75,
  direction = "left",
  gap = "medium",
}: TickerProps) {
  const [duration, setDuration] = React.useState(fastDuration);
  const [ref, { width }] = useMeasure();
  const xTranslation = useMotionValue(0);
  const [mustFinish, setMustFinish] = React.useState(false);
  const [rerender, setRerender] = React.useState(false);

  // Convert direction string to multiplier
  const directionMultiplier = direction === "left" ? -1 : 1;

  // Convert children to array
  const childrenArray = React.Children.toArray(children);

  React.useEffect(() => {
    if (!width) return;

    let controls;
    const finalPosition = (width / 2) * directionMultiplier;

    if (mustFinish) {
      const currentPosition = xTranslation.get();
      const remainingDistance = finalPosition - currentPosition;
      const progressRatio = Math.abs(remainingDistance / finalPosition);

      controls = animate(xTranslation, finalPosition, {
        ease: "linear",
        duration: duration * progressRatio,
        onComplete: () => {
          setMustFinish(false);
          setRerender(!rerender);
          xTranslation.set(0);
        },
      });
    } else {
      controls = animate(xTranslation, finalPosition, {
        ease: "linear",
        duration: duration,
        repeat: Infinity,
        repeatType: "loop",
        onRepeat: () => {
          xTranslation.set(0);
        },
      });
    }

    return () => controls.stop();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rerender, duration, width, directionMultiplier, mustFinish]);

  const renderItems = React.useCallback(() => {
    // Create two sets of items to ensure smooth looping
    const itemSet = (
      <Box display="flex" gap={gap}>
        {childrenArray.map((item, index) => (
          <Box key={`set-${index}`}>{item}</Box>
        ))}
      </Box>
    );

    return (
      <>
        {itemSet}
        {itemSet}
      </>
    );
  }, [childrenArray, gap]);

  return (
    <Box width="100%" height="100%" overflow="hidden">
      <Box
        as={motion.div}
        ref={ref}
        style={{ x: xTranslation }}
        display="flex"
        gap={gap}
        width="fit-content"
        onHoverStart={() => {
          setMustFinish(true);
          setDuration(slowDuration);
        }}
        onHoverEnd={() => {
          setMustFinish(true);
          setDuration(fastDuration);
        }}
      >
        {renderItems()}
      </Box>
    </Box>
  );
}
