import chroma from "chroma-js";

// Definition of available pure colors from the spectre in hsl(0-360, 0-1, 0-1)
export const spectre = {
  white: chroma.hsl(0, 0, 1).hex(),
  black: chroma.hsl(0, 0, 0).hex(),
  gray: chroma.hsl(0, 0, 0.5).hex(),
  red: chroma.hsl(0, 1, 0.6).hex(),
  orange: chroma.hsl(32, 1, 0.6).hex(),
  yellow: chroma.hsl(48, 0.8, 0.5).hex(),
  green: chroma.hsl(129, 0.5, 0.6).hex(),
  teal: chroma.hsl(178, 0.84, 0.64).hex(),
  blue: chroma.hsl(230, 0.88, 0.67).hex(),
  purple: chroma.hsl(256, 0.8, 0.6).hex(),
  pink: chroma.hsl(310, 0.88, 0.64).hex(),
};
