import chroma from "chroma-js";
import { spectre } from "./tokens/spectre";

// Utility function to generate system colors
const generateSystemColors = ({
  brandColor,
  accentColor,
  systemColor,
  mixRatio,
  baseSaturation,
  lightPaletteLightness,
  darkPaletteLightness,
}) => {
  const systemColors = {
    brand: brandColor,
    accent: accentColor,
    neutral: systemColor,
    light: chroma
      .mix("black", brandColor)
      .set("hsl.s", baseSaturation)
      .set("hsl.l", lightPaletteLightness)
      .hex(),
    dark: chroma
      .mix("black", brandColor)
      .set("hsl.s", baseSaturation)
      .set("hsl.l", darkPaletteLightness)
      .hex(),
  };

  Object.keys(spectre).forEach((key) => {
    systemColors[key] = chroma.mix(spectre[key], brandColor, mixRatio).hex();
  });

  return systemColors;
};

// Utility function to generate color palette scales
const generatePaletteScales = (
  colors,
  lightBase,
  palettePadding,
  paletteSize,
  mode
) => {
  // Define colors to exclude from palette generation
  const excludedColors = ["white", "black"];
  const specialColors = ["light", "dark"];

  return Object.keys(colors).reduce((acc, key) => {
    // Skip excluded colors
    if (excludedColors.includes(key)) {
      return acc;
    }

    // Handle special colors differently
    if (specialColors.includes(key)) {
      if (key === "dark") {
        // For dark palette: scale direction depends on lightBase
        acc[key + "s"] = chroma
          .scale(
            lightBase === "light"
              ? [colors.dark, colors.neutral] // light theme: dark to neutral
              : [colors.dark, colors.neutral] // dark theme: neutral to dark
          )
          .mode(mode)
          .padding(palettePadding)
          .colors(6);
      }
      if (key === "light") {
        // For light palette: scale direction depends on lightBase
        acc[key + "s"] = chroma
          .scale(
            lightBase === "light"
              ? [colors.light, colors.neutral] // light theme: neutral to light
              : [colors.light, colors.neutral] // dark theme: light to neutral
          )
          .mode(mode)
          .padding(palettePadding)
          .colors(6);
      }
    } else {
      // Regular colors
      acc[key + "s"] = chroma
        .scale(
          lightBase === "light"
            ? [
                chroma(colors[key]).brighten(10),
                colors[key],
                chroma(colors[key]).darken(10),
              ]
            : [
                chroma(colors[key]).darken(10),
                colors[key],
                chroma(colors[key]).brighten(10),
              ]
        )
        .domain([0, 50, 100])
        .mode(mode)
        .padding(palettePadding)
        .colors(paletteSize);
    }
    return acc;
  }, {});
};

// Utility function to generate transparent colors
const generateTransparentColors = (baseColor, steps) => {
  return steps.map((step) => chroma(baseColor).alpha(step).css());
};

// Primary function to generate theme colors
export const generateThemeColors = (config) => {
  const systemColors = generateSystemColors(config);
  const scales = generatePaletteScales(
    systemColors,
    config.lightBase,
    config.palettePadding,
    config.paletteSize,
    config.mode,
    spectre
  );
  return {
    ...systemColors,
    palette: scales,
    white: spectre.white,
    black: spectre.black,
    transparent: {
      brand: generateTransparentColors(
        systemColors.brand,
        config.transparentSteps
      ),
      neutral: generateTransparentColors(
        systemColors.neutral,
        config.transparentSteps
      ),
      accent: generateTransparentColors(
        systemColors.accent,
        config.transparentSteps
      ),
      light: generateTransparentColors(
        config.lightBase === "light" ? spectre.black : spectre.white,
        config.transparentSteps
      ),
      dark: generateTransparentColors(
        config.lightBase === "light" ? spectre.white : spectre.black,
        config.transparentSteps
      ),
    },
  };
};

// helper function for checking the contrast ratio of two colors
export function checkContrast(c1, c2) {
  try {
    if (!c1 || !c2) {
      throw new Error("Both colors are required");
    }

    if (!chroma.valid(c1) || !chroma.valid(c2)) {
      throw new Error("Invalid color format");
    }

    const contrast = Number(chroma.contrast(c1, c2).toFixed(2));

    // WCAG 2.1 Grading
    const grade = {
      ratio: contrast,
      AA: {
        large: contrast >= 3, // 18pt+ or 14pt+ bold
        normal: contrast >= 4.5, // All other text
        ui: contrast >= 3, // UI components and graphical objects
      },
      AAA: {
        large: contrast >= 4.5, // 18pt+ or 14pt+ bold
        normal: contrast >= 7, // All other text
      },
      toString() {
        if (contrast >= 7) return "AAA";
        if (contrast >= 4.5) return "AA";
        if (contrast >= 3) return "AA Large";
        return "Fail";
      },
    };

    return grade;
  } catch (error) {
    console.error(`Contrast check failed: ${error.message}`);
    return {
      ratio: 1,
      AA: { large: false, normal: false, ui: false },
      AAA: { large: false, normal: false },
      toString: () => "Fail",
    };
  }
}
// helper function to get a transparent color from input
export function getTransparent(color, opacity) {
  // let res = colors[color];
  // if (res === undefined) return color;
  // TODO: Add additional logic to handle palette colors
  // if (color.includes("palette") === true) {
  //   let trav = color.split(".").slice(1, 3);
  //   let res2 = Object.fromEntries(Object.entries(colors.palette[trav[0]]).filter(([key]) => key.includes(trav[1])));
  //   return (res = Object.values(res2).toString());
  // }
  return chroma(color).alpha(opacity).css("hsla");
}

export function getTint(color, amount = 0.5) {
  try {
    // Tint = mix with white (lighten)
    // amount: 0 = original color, 1 = white
    return chroma.mix(color, 'white', amount).hex();
  } catch (error) {
    console.error(`Tint failed: ${error.message}`);
    return color;
  }
}

export function getShade(color, amount = 0.5) {
  try {
    // Check if color is undefined, null, or empty string
    if (color === undefined || color === null || color === "") {
      console.error(`getShade received invalid color value:`, color);
      return "#000000"; // Return fallback color
    }

    // Shade = mix with black (darken)
    // amount: 0 = original color, 1 = black
    return chroma.mix(color, 'black', amount).hex();
  } catch (error) {
    console.error(
      `Shade failed for color "${color}" with amount ${amount}: ${error.message}`
    );
    console.error("Color type:", typeof color, "Color value:", color);
    return color || "#000000"; // Return original color or fallback
  }
}

// Store for the current theme - will be set by the theme provider
let currentTheme = null;

// Function to set the current theme (called by theme provider)
export function setCurrentTheme(theme) {
  currentTheme = theme;
}

// Helper function to resolve color from theme
// function resolveThemeColor(colors, colorPath) {
//   try {
//     // Handle direct color references (e.g., "brand", "accent", "neutral")
//     if (typeof colorPath === "string" && colors[colorPath]) {
//       return chroma(colors[colorPath]).hex();
//     }

//     // Handle palette colors (e.g., "palette.reds.5", "palette.blues.0")
//     if (typeof colorPath === "string" && colorPath.includes("palette.")) {
//       const pathParts = colorPath.split(".");

//       if (pathParts.length >= 3) {
//         const paletteGroup = pathParts[1]; // e.g., "reds"
//         const paletteIndex = pathParts[2]; // e.g., "5"

//         if (colors.palette &&
//             colors.palette[paletteGroup] &&
//             colors.palette[paletteGroup][paletteIndex]) {
//           return chroma(colors.palette[paletteGroup][paletteIndex]).hex();
//         }
//       }
//     }

//     // Handle transparent colors (e.g., "transparent.brand.0")
//     if (typeof colorPath === "string" && colorPath.includes("transparent.")) {
//       const pathParts = colorPath.split(".");

//       if (pathParts.length >= 3) {
//         const transparentGroup = pathParts[1]; // e.g., "brand"
//         const transparentIndex = pathParts[2]; // e.g., "0"

//         if (colors.transparent &&
//             colors.transparent[transparentGroup] &&
//             colors.transparent[transparentGroup][transparentIndex]) {
//           // Transparent colors are already in CSS format, convert to hex with alpha
//           return chroma(colors.transparent[transparentGroup][transparentIndex]).hex();
//         }
//       }
//     }

//     // Handle object notation (e.g., colors.palette.reds[5])
//     if (typeof colorPath === "object") {
//       return chroma(colorPath).hex();
//     }

//     // If all else fails, try to parse as direct color value
//     return chroma(colorPath).hex();

//   } catch (error) {
//     console.error(`resolveThemeColor failed: ${error.message}`);
//     console.error(`Color path: ${colorPath}`);
//     return colorPath; // Return original value as fallback
//   }
// }

// Utility function to resolve theme color path to actual color value
function resolveColorPath(colors, colorPath) {
  if (!colorPath || !colors) return colorPath;

  const pathParts = colorPath.split(".");
  let current = colors;

  for (const part of pathParts) {
    if (current && typeof current === "object" && part in current) {
      current = current[part];
    } else {
      return colorPath; // Return original if path doesn't exist
    }
  }

  return current;
}

// Template string processor that resolves theme colors in CSS functions
export function withThemeColors(template) {
  return (props) => {
    try {
      // Get colors from props.theme or fallback to currentTheme
      let colors;
      if (props && props.theme && props.theme.colors) {
        colors = props.theme.colors;
      } else if (currentTheme && currentTheme.colors) {
        colors = currentTheme.colors;
      } else {
        console.warn("No theme available, returning template as-is");
        return template;
      }

      // Replace theme color references in the template
      return template.replace(
        /getThemeColor\("([^"]+)"\)/g,
        (match, colorPath) => {
          const resolvedColor = resolveColorPath(colors, colorPath);

          // Convert to hex if it's a valid color
          if (resolvedColor && resolvedColor !== colorPath) {
            try {
              return chroma(resolvedColor).hex();
            } catch (colorError) {
              console.error(
                `Failed to convert color: ${resolvedColor}`,
                colorError
              );
              return colorPath;
            }
          }

          return colorPath;
        }
      );
    } catch (error) {
      console.error(`withThemeColors failed: ${error.message}`);
      return template;
    }
  };
}

// Utility function that accepts colors and returns HEX value directly
export function getThemeColor(colors, colorPath) {
  try {
    if (!colors || !colorPath) {
      console.error("Both colors and colorPath are required");
      return colorPath;
    }

    const resolvedColor = resolveColorPath(colors, colorPath);

    // Convert to hex if it's a valid color
    if (resolvedColor && resolvedColor !== colorPath) {
      const hexValue = chroma(resolvedColor).hex();
      //console.log(`getThemeColor('${colorPath}') -> ${hexValue}`);
      return hexValue;
    }

    //console.log(`getThemeColor('${colorPath}') -> ${colorPath} (not found)`);
    return colorPath;
  } catch (error) {
    console.error(`getThemeColor failed: ${error.message}`);
    console.error(`Color path: ${colorPath}`);
    return colorPath;
  }
}

// Styled-components helper function for getting theme colors
export const themeColor = (colorPath) => (props) => {
  try {
    if (!props.theme || !props.theme.colors) {
      console.warn("No theme available in styled-components props");
      return colorPath;
    }

    const colors = props.theme.colors;

    // Handle direct color references (e.g., "brand", "accent", "neutral")
    if (typeof colorPath === "string" && colors[colorPath]) {
      return chroma(colors[colorPath]).hex();
    }

    // Handle palette colors (e.g., "palette.reds.5", "palette.blues.0")
    if (typeof colorPath === "string" && colorPath.includes("palette.")) {
      const pathParts = colorPath.split(".");

      if (pathParts.length >= 3) {
        const paletteGroup = pathParts[1]; // e.g., "reds"
        const paletteIndex = pathParts[2]; // e.g., "5"

        if (
          colors.palette &&
          colors.palette[paletteGroup] &&
          colors.palette[paletteGroup][paletteIndex]
        ) {
          return chroma(colors.palette[paletteGroup][paletteIndex]).hex();
        }
      }
    }

    // Handle transparent colors (e.g., "transparent.brand.0")
    if (typeof colorPath === "string" && colorPath.includes("transparent.")) {
      const pathParts = colorPath.split(".");

      if (pathParts.length >= 3) {
        const transparentGroup = pathParts[1]; // e.g., "brand"
        const transparentIndex = pathParts[2]; // e.g., "0"

        if (
          colors.transparent &&
          colors.transparent[transparentGroup] &&
          colors.transparent[transparentGroup][transparentIndex]
        ) {
          // Transparent colors are already in CSS format, convert to hex with alpha
          return chroma(
            colors.transparent[transparentGroup][transparentIndex]
          ).hex();
        }
      }
    }

    // Handle object notation (e.g., colors.palette.reds[5])
    if (typeof colorPath === "object") {
      return chroma(colorPath).hex();
    }

    // If all else fails, try to parse as direct color value
    return chroma(colorPath).hex();
  } catch (error) {
    console.error(`themeColor failed: ${error.message}`);
    console.error(`Color path: ${colorPath}`);
    return colorPath; // Return original value as fallback
  }
};

// Legacy function for backward compatibility (two argument version)
export function getThemeColorLegacy(colors, colorPath) {
  try {
    if (!colors || !colorPath) {
      throw new Error("Colors object and color path are required");
    }

    // Handle direct color references (e.g., "brand", "accent", "neutral")
    if (typeof colorPath === "string" && colors[colorPath]) {
      return chroma(colors[colorPath]).hex();
    }

    // Handle palette colors (e.g., "palette.reds.5", "palette.blues.0")
    if (typeof colorPath === "string" && colorPath.includes("palette.")) {
      const pathParts = colorPath.split(".");

      if (pathParts.length >= 3) {
        const paletteGroup = pathParts[1]; // e.g., "reds"
        const paletteIndex = pathParts[2]; // e.g., "5"

        if (
          colors.palette &&
          colors.palette[paletteGroup] &&
          colors.palette[paletteGroup][paletteIndex]
        ) {
          return chroma(colors.palette[paletteGroup][paletteIndex]).hex();
        }
      }
    }

    // Handle transparent colors (e.g., "transparent.brand.0")
    if (typeof colorPath === "string" && colorPath.includes("transparent.")) {
      const pathParts = colorPath.split(".");

      if (pathParts.length >= 3) {
        const transparentGroup = pathParts[1]; // e.g., "brand"
        const transparentIndex = pathParts[2]; // e.g., "0"

        if (
          colors.transparent &&
          colors.transparent[transparentGroup] &&
          colors.transparent[transparentGroup][transparentIndex]
        ) {
          // Transparent colors are already in CSS format, convert to hex with alpha
          return chroma(
            colors.transparent[transparentGroup][transparentIndex]
          ).hex();
        }
      }
    }

    // Handle object notation (e.g., colors.palette.reds[5])
    if (typeof colorPath === "object") {
      return chroma(colorPath).hex();
    }

    // If all else fails, try to parse as direct color value
    return chroma(colorPath).hex();
  } catch (error) {
    console.error(`getThemeColorLegacy failed: ${error.message}`);
    console.error(`Color path: ${colorPath}`);
    return colorPath; // Return original value as fallback
  }
}
