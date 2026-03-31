import darkConfig from "./default/modes/dark/theme";
import lightConfig from "./default/modes/light/theme";

import type { Theme, ThemeMap, ThemeName } from "./types";

export const lightTheme: Theme = lightConfig;
export const darkTheme: Theme = darkConfig;

export const themes: ThemeMap = {
  dark: darkTheme,
  light: lightTheme,
  // Other themes can be added here
};

export type { Theme, ThemeMap, ThemeName } from "./types";
