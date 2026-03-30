type ProgressType = "negative" | "positive" | "neutral";

interface ColorRanges {
  low: string; // 0-lowThreshold
  medium: string; // lowThreshold-mediumThreshold
  high: string; // mediumThreshold-highThreshold
  max: string; // highThreshold-100
  neutral: string;
}

interface ProgressThresholds {
  low: number; // Upper bound for "low" range
  medium: number; // Upper bound for "medium" range
  high: number; // Upper bound for "high" range
}

const DEFAULT_COLORS: ColorRanges = {
  low: "red",
  medium: "orange",
  high: "palette.brands.5",
  max: "palette.greens.6",
  neutral: "neutral",
};

const DEFAULT_THRESHOLDS: ProgressThresholds = {
  low: 25,
  medium: 50,
  high: 75,
};

/**
 * Returns a color string based on progress percentage and type
 *
 * @param progress - The progress value from 0-100
 * @param type - The type of progress ("positive", "negative", "neutral")
 * @param colors - Optional color mappings
 * @param thresholds - Optional threshold values
 * @returns A color string (hex, rgb, etc.)
 */
export const getProgressColor = (
  progress: number,
  type: ProgressType,
  colors: ColorRanges = DEFAULT_COLORS,
  thresholds: ProgressThresholds = DEFAULT_THRESHOLDS,
): string => {
  // For neutral type, always return the neutral color
  if (type === "neutral") {
    return colors.neutral;
  }

  // Determine color based on progress and thresholds
  if (progress <= thresholds.low) {
    return type === "positive" ? colors.low : colors.max;
  } else if (progress <= thresholds.medium) {
    return type === "positive" ? colors.medium : colors.high;
  } else if (progress <= thresholds.high) {
    return type === "positive" ? colors.high : colors.medium;
  } else {
    return type === "positive" ? colors.max : colors.low;
  }
};
