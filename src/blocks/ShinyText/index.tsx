"use client";
import { Text } from "../../elements";
import { motion, useAnimation } from "motion/react";
import { useEffect } from "react";

type ShinyTextProps = {
  children: React.ReactNode;
  disabled?: boolean;
  speed?: number;
  color?: string;
  fontSize?: string;
  fontWeight?: string | number;
  textTransform?: string;
  [key: string]: any;
};

const ShinyText = ({
  children,
  disabled = false,
  speed = 10,
  color = "tertiary",
  fontSize = "medium",
  fontWeight = "normal",
  textTransform,
  ...props
}: ShinyTextProps) => {
  const controls = useAnimation();

  useEffect(() => {
    if (!disabled) {
      controls.start({
        backgroundPosition: ["200% 0", "-200% 0"],
        transition: {
          duration: speed,
          delay: 3,
          ease: "linear",
          repeat: Infinity,
        },
      });
    } else {
      controls.stop();
    }
  }, [disabled, speed, controls]);

  return (
    <Text
      as={motion.div}
      animate={controls}
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
      textTransform={textTransform}
      display="inline-block"
      style={{
        background: `linear-gradient(
            120deg,
            rgba(255, 255, 255, 0) 40%,
            rgba(255, 255, 255,0.8) 50%,
            rgba(255, 255, 255, 0) 60%
          )`,
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
      }}
      {...props}
    >
      <span>{children}</span>
    </Text>
  );
};

export default ShinyText;
