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
  options: UseAutosizeTextAreaOptions = {},
): void {
  const { minRows = 1, maxRows = 10 } = options;

  useEffect(() => {
    if (!textareaRef) return;

    const style = window.getComputedStyle(textareaRef);

    // `line-height` can compute to "normal" (parses to NaN); fall back to a
    // 1.5x font-size ratio so the row math still works.
    let lineHeight = parseFloat(style.lineHeight);
    if (Number.isNaN(lineHeight)) {
      lineHeight = parseFloat(style.fontSize) * 1.5 || 20;
    }

    const paddingY =
      parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
    const borderY =
      parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
    const isBorderBox = style.boxSizing === "border-box";

    // Reset height to auto so scrollHeight reflects the true content height.
    textareaRef.style.height = "auto";

    // scrollHeight includes vertical padding, so subtract it before counting
    // rows — otherwise a single line rounds up to two.
    const contentHeight = textareaRef.scrollHeight - paddingY;
    const currentRows = Math.round(contentHeight / lineHeight);

    // Constrain between min and max rows.
    const rowsToShow = Math.max(minRows, Math.min(currentRows, maxRows));

    // Re-add padding/border for border-box so the visible box fits the rows.
    const contentTarget = rowsToShow * lineHeight;
    textareaRef.style.height = `${
      isBorderBox ? contentTarget + paddingY + borderY : contentTarget
    }px`;
  }, [textareaRef, value, minRows, maxRows]);
}
