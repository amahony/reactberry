"use client";
import { motion, MotionConfig, useInView } from "motion/react";
import NumberFlow, { useCanAnimate, Format } from "@number-flow/react";
import { Text } from "../../elements";
import { useEffect, useState, useRef } from "react";

const MotionNumberFlow = motion.create(NumberFlow);

type Props = {
  value: number;
  delay?: number;
  format?: Format; // Use Format type from @number-flow/react
  suffix?: string;
  prefix?: string;
};

export default function CyclingNumber({
  value = 0,
  delay = 500,
  format = {
    style: "currency",
    currency: "USD",
    trailingZeroDisplay: "stripIfInteger",
  } as Format,
  suffix = "",
  prefix = "",
}: Props) {
  const canAnimate = useCanAnimate();
  const [currentValue, setCurrentValue] = useState(0);
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: false, // Only animate once when coming into view
    amount: 0.5,
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isInView) {
      // Add delay before starting the animation
      timeoutId = setTimeout(() => {
        setCurrentValue(value);
      }, delay);
    }

    return () => clearTimeout(timeoutId);
  }, [isInView, value, delay]);

  return (
    <MotionConfig
      transition={
        canAnimate
          ? { duration: 2, bounce: 0, type: "spring" }
          : { duration: 0, type: "tween" }
      }
    >
      <Text
        ref={ref}
        as={motion.span}
        display={"inline-flex"}
        alignItems={"center"}
        color="primary"
        layout
      >
        <MotionNumberFlow
          value={currentValue}
          layout
          layoutRoot
          trend={0}
          format={format}
          suffix={suffix}
          prefix={prefix}
        />
      </Text>
    </MotionConfig>
  );
}
