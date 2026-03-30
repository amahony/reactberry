import { useState, type MouseEventHandler } from "react";

export type HoverProps = {
  onMouseEnter: MouseEventHandler<HTMLElement>;
  onMouseLeave: MouseEventHandler<HTMLElement>;
};

export function useHoverList() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getHoverProps = (index: number): HoverProps => ({
    onMouseEnter: () => setHoveredIndex(index),
    onMouseLeave: () => setHoveredIndex(null),
  });

  return { hoveredIndex, getHoverProps };
}
