"use client";

import { useMemo, useRef } from "react";
import { motion, type MotionValue, useScroll, useTransform } from "motion/react";
import styled from "styled-components";

import { Text, type TextProps } from "../../elements";
import { useReducedMotion } from "../../hooks/useReducedMotion";

type ScrollOffset = NonNullable<Parameters<typeof useScroll>[0]>["offset"];

export interface TextRevealProps extends Omit<TextProps, "children" | "as"> {
  children: string;
  baseOpacity?: number;
  offset?: ScrollOffset;
  revealEnd?: number;
}

const DEFAULT_OFFSET: ScrollOffset = ["start end", "end start"];

interface RevealedWordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  baseOpacity: number;
}

const Word = styled.span`
  position: relative;
  display: inline-grid;
  margin-right: 0.25em;
  margin-bottom: 0.1em;
`;

const WordBase = styled.span<{ $baseOpacity: number }>`
  grid-area: 1 / 1;
  opacity: ${(props) => props.$baseOpacity};
`;

const WordForeground = styled(motion.span)`
  grid-area: 1 / 1;
  color: currentColor;
`;

function RevealedWord({ children, progress, range, baseOpacity }: RevealedWordProps) {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <Word aria-hidden="true">
      <WordBase $baseOpacity={baseOpacity}>{children}</WordBase>
      <WordForeground style={{ opacity }}>{children}</WordForeground>
    </Word>
  );
}

export default function TextReveal({
  children,
  baseOpacity = 0.18,
  offset = DEFAULT_OFFSET,
  revealEnd = 0.88,
  ...props
}: TextRevealProps) {
  const textRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const words = useMemo(
    () => children.trim().split(/\s+/).filter(Boolean),
    [children],
  );

  const { scrollYProgress } = useScroll({
    target: textRef,
    offset,
  });

  const clampedRevealEnd = Math.max(0.1, Math.min(revealEnd, 1));

  if (prefersReducedMotion) {
    return (
      <Text as="div" ref={textRef} {...props}>
        {children}
      </Text>
    );
  }

  return (
    <Text as="div" ref={textRef} aria-label={children} {...props}>
      {words.map((word, index) => {
        const start = (index / words.length) * clampedRevealEnd;
        const end = ((index + 1) / words.length) * clampedRevealEnd;

        return (
          <RevealedWord
            key={`${word}-${index}`}
            progress={scrollYProgress}
            range={[start, end]}
            baseOpacity={baseOpacity}
          >
            {word}
          </RevealedWord>
        );
      })}
    </Text>
  );
}