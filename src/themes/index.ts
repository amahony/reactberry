import light from "./default/modes/light/theme";
import dark from "./default/modes/dark/theme";

export const themes = {
	dark,
	light,
	// Other themes can be added here
};

export type ThemeName = keyof typeof themes;
export type Theme = (typeof themes)[ThemeName];
