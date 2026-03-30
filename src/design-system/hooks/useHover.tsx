import {
  useRef,
  useState,
  useEffect,
  useCallback,
  type MutableRefObject,
} from "react";

export function useHover<T extends HTMLElement = HTMLDivElement>(): [
  MutableRefObject<T | null>,
  boolean
] {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<T>(null);

  const handleMouseOver = useCallback(() => setHovered(true), []);
  const handleMouseOut = useCallback(() => setHovered(false), []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    node.addEventListener("mouseenter", handleMouseOver);
    node.addEventListener("mouseleave", handleMouseOut);

    return () => {
      node.removeEventListener("mouseenter", handleMouseOver);
      node.removeEventListener("mouseleave", handleMouseOut);
    };
  }, [handleMouseOver, handleMouseOut]);

  return [ref, hovered];
}
