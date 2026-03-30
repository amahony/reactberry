import { generateThemeColors } from "../../utils";
import chroma from "chroma-js";

// Theme configuration
const colorsConfig = {
  lightBase: "dark", // Can be "dark" or "light"
  mode: "oklab", // TBD add more modes as examples from chroma-js
  //brandColor: chroma.hsl(35, 0.88, 0.63).hex(), // dominant UI color
  brandColor: "#FF9900",
  accentColor: chroma.hsl(290, 0.54, 0.16).hex(), // secondary UI color
  //systemColor: chroma.hsl(290, 0.1, 0.2).hex(), // base UI color
  systemColor: "#252F3E",
  baseSaturation: 0.04, // 0 - 1, controls overall system color saturation
  lightPaletteLightness: 0.94, // 0 - 1, controls light point lightness
  darkPaletteLightness: 0.08, // 0 - 1, controls dark point lightness
  palettePadding: [0.25, 0.1], // padding for edge colors in the palette
  paletteSize: 12, // Number of steps in the palette
  mixRatio: 0.2, // 0 - 1, controls how much of the brand color is mixed into the system colors
  transparentSteps: [
    0.0625, 0.1, 0.15, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95,
  ],
};

// Generate theme colors based on the theme configuration
const generatedColors = generateThemeColors(colorsConfig);

const aliases = {
  primary: generatedColors.palette.neutrals[11],
  secondary: generatedColors.palette.neutrals[10],
  tertiary: generatedColors.palette.neutrals[8],

  base: generatedColors.palette.neutrals[1],
  surface: generatedColors.palette.darks[2],
  panel: generatedColors.palette.darks[3],
  card: generatedColors.palette.darks[2],
  overlay: generatedColors.palette.neutrals[0],

  success: generatedColors.palette.greens[5],
  error: generatedColors.palette.reds[5],
  warning: generatedColors.palette.oranges[5],
  info: generatedColors.palette.blues[5],
};

const colors = {
  ...generatedColors,
  ...aliases,
};

export default colors;
