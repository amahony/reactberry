import { useEffect, useCallback } from "react";

/**
 * Custom hook to handle keyboard events
 * @param targetKey - The key to listen for (e.g., "ArrowRight", "ArrowLeft")
 * @param callback - The function to execute when the key is pressed
 */
export const useKeypress = (targetKey: string, callback: () => void) => {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        callback();
      }
    },
    [targetKey, callback]
  );

  useEffect(() => {
    // Add event listener when component mounts
    window.addEventListener("keydown", handleKeyPress);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);
};
