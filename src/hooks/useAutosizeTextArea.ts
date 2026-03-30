import { useEffect } from "react";

interface UseAutosizeTextAreaOptions {
  minRows?: number;
  maxRows?: number;
}

/**
 * Hook that automatically adjusts textarea height based on content
 * @param textareaRef - Reference to the textarea element
 * @param value - Current value of the textarea
 * @param minRows - Minimum number of rows (default: 1)
 * @param maxRows - Maximum number of rows (default: 10)
 */
export function useAutosizeTextArea(
  textareaRef: HTMLTextAreaElement | null,
  value: string,
  options: UseAutosizeTextAreaOptions = {}
): void {
  const { minRows = 1, maxRows = 10 } = options;

  useEffect(() => {
    if (!textareaRef) return;

    // Reset height to auto to get the correct scrollHeight
    textareaRef.style.height = "auto";

    // Get the line height
    const lineHeight = parseInt(
      window.getComputedStyle(textareaRef).lineHeight,
      10
    );

    // Calculate the number of rows needed
    const scrollHeight = textareaRef.scrollHeight;
    const currentRows = Math.ceil(scrollHeight / lineHeight);

    // Constrain between min and max rows
    const rowsToShow = Math.max(minRows, Math.min(currentRows, maxRows));

    // Set the height based on rows
    textareaRef.style.height = `${rowsToShow * lineHeight}px`;
  }, [textareaRef, value, minRows, maxRows]);
}

