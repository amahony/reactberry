import type { ComponentType } from "react";

export type ThemePrimitive =
  | string
  | number
  | boolean
  | null
  | undefined;

export type ThemeComponent = ComponentType<any>;

export type ThemeToken =
  | ThemePrimitive
  | ThemeComponent
  | ThemeDictionary
  | ReadonlyArray<ThemeToken>;

export interface ThemeDictionary {
  [key: string]: ThemeToken;
}

export interface Theme extends ThemeDictionary {
  colors: ThemeDictionary;
}

export type ThemeName = "light" | "dark";
export type ThemeMap = Record<ThemeName, Theme>;
