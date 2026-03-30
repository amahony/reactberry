"use client";

import { PropsWithChildren, useEffect, useMemo } from "react";
import { ThemeProvider } from "styled-components";

import GlobalStyles from "@/design-system/themes/pocketagent/global";
import { themes, type ThemeName } from "@/design-system/themes";
import { setCurrentTheme } from "@/design-system/themes/pocketagent/utils";
import StyledComponentsRegistry from "./StyledComponentsRegistry";

interface DesignSystemProviderProps extends PropsWithChildren {
  themeName?: ThemeName;
  withGlobalStyles?: boolean;
}

export default function DesignSystemProvider({
  children,
  themeName = "light",
  withGlobalStyles = true,
}: DesignSystemProviderProps) {
  const theme = useMemo(() => themes[themeName] ?? themes.light, [themeName]);

  useEffect(() => {
    setCurrentTheme(theme);
  }, [theme]);

  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        {withGlobalStyles ? <GlobalStyles /> : null}
        {children}
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}
