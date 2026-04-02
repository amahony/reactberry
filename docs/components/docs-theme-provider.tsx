"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { DesignSystemProvider } from "@reactberry/system/providers";
import type { ThemeName } from "@reactberry/system/themes";

type DocsThemePreference = ThemeName | "system";

type DocsThemeContextValue = {
  themeName: ThemeName;
  themePreference: DocsThemePreference;
  setThemeName: (themeName: DocsThemePreference) => void;
  toggleTheme: () => void;
};

const STORAGE_KEY = "reactberry-docs-theme";

const DocsThemeContext = createContext<DocsThemeContextValue | null>(null);

function getSystemTheme(): ThemeName {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getStoredThemePreference(): DocsThemePreference {
  if (typeof window === "undefined") {
    return "system";
  }

  const storedTheme = window.localStorage.getItem(STORAGE_KEY);
  if (storedTheme === "light" || storedTheme === "dark" || storedTheme === "system") {
    return storedTheme;
  }

  return "system";
}

export function DocsThemeProvider({ children }: { children: React.ReactNode }) {
  const [themePreference, setThemePreference] = useState<DocsThemePreference>("system");
  const [themeName, setResolvedThemeName] = useState<ThemeName>("light");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const nextPreference = getStoredThemePreference();
    setThemePreference(nextPreference);
    setResolvedThemeName(nextPreference === "system" ? getSystemTheme() : nextPreference);
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady || typeof window === "undefined") {
      return;
    }

    const resolvedTheme = themePreference === "system" ? getSystemTheme() : themePreference;
    setResolvedThemeName(resolvedTheme);
    window.localStorage.setItem(STORAGE_KEY, themePreference);
    document.documentElement.style.colorScheme = resolvedTheme;
    document.documentElement.dataset.theme = resolvedTheme;
    document.documentElement.dataset.themePreference = themePreference;
  }, [isReady, themePreference]);

  useEffect(() => {
    if (!isReady || typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event: MediaQueryListEvent) => {
      if (themePreference !== "system") {
        return;
      }

      const resolvedTheme = event.matches ? "dark" : "light";
      setResolvedThemeName(resolvedTheme);
      document.documentElement.style.colorScheme = resolvedTheme;
      document.documentElement.dataset.theme = resolvedTheme;
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [isReady, themePreference]);

  const value = useMemo<DocsThemeContextValue>(
    () => ({
      themeName,
      themePreference,
      setThemeName: setThemePreference,
      toggleTheme: () =>
        setThemePreference((current) => {
          if (current === "light") return "dark";
          if (current === "dark") return "system";
          return "light";
        }),
    }),
    [themeName, themePreference],
  );

  return (
    <DocsThemeContext.Provider value={value}>
      <DesignSystemProvider themeName={themeName}>{children}</DesignSystemProvider>
    </DocsThemeContext.Provider>
  );
}

export function useDocsTheme() {
  const context = useContext(DocsThemeContext);

  if (!context) {
    throw new Error("useDocsTheme must be used within DocsThemeProvider");
  }

  return context;
}
