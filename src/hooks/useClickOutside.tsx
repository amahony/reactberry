import { useEffect, type RefObject } from "react";

/**
 * Call `handler` when a mouse or touch event occurs outside the given ref.
 *
 * Usage:
 *   const ref = useRef<HTMLDivElement | null>(null);
 *   useClickOutside(ref, () => setOpen(false), open);
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
	  ref: RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent) => void,
  enabled: boolean = true,
): void {
  useEffect(() => {
    if (!enabled) return;

    const handleEvent = (event: MouseEvent | TouchEvent) => {
      const node = ref.current;
      if (!node) return;

      if (node.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", handleEvent);
    document.addEventListener("touchstart", handleEvent);

    return () => {
      document.removeEventListener("mousedown", handleEvent);
      document.removeEventListener("touchstart", handleEvent);
    };
  }, [ref, handler, enabled]);
}

