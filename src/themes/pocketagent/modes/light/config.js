import { generateThemeColors } from "../../utils";
import chroma from "chroma-js";

// Theme configuration
const colorsConfig = {
  lightBase: "light", // Can be "dark" or "light"
  mode: "oklab", // TBD add more modes as examples from chroma-js
  brandColor: chroma.hsl(196, 0.6, 0.5).hex(), // dominant UI color
  accentColor: chroma.hsl(256, 0.9, 0.66).hex(), // secondary UI color
  systemColor: chroma.hsl(228, 0.08, 0.88).hex(), // base UI color
  baseSaturation: 0.25, // 0 - 1, controls overall system color saturation
  lightPaletteLightness: 0.08, // 0 - 1, controls light point lightness
  darkPaletteLightness: 0.96, // 0 - 1, controls dark point lightness
  palettePadding: [0.05, 0.2], // padding for edge colors in the palette
  paletteSize: 12, // Number of steps in the palette
  mixRatio: 0.01, // 0 - 1, controls how much of the brand color is mixed into the system colors
  transparentSteps: [
    0.0625, 0.1, 0.15, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95,
  ],
};
//
// Generate theme colors based on the theme configuration
const generatedColors = generateThemeColors(colorsConfig);

const aliases = {
  primary: generatedColors.palette.neutrals[11],
  secondary: generatedColors.palette.neutrals[10],
  tertiary: generatedColors.palette.neutrals[9],

  base: generatedColors.palette.neutrals[2],
  surface: generatedColors.palette.neutrals[0],
  panel: generatedColors.palette.neutrals[1],
  card: generatedColors.white,
  overlay: generatedColors.palette.neutrals[0],

  success: generatedColors.palette.greens[8],
  error: generatedColors.palette.reds[7],
  warning: generatedColors.palette.oranges[8],
  info: generatedColors.palette.blues[7],
  signal: chroma.hsl(56, 1, 0.92).hex(),
};

const colors = {
  ...generatedColors,
  ...aliases,
};

export default colors;
