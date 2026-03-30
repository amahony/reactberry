"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type Breakpoint = "_" | "xs" | "sm" | "md" | "lg" | "xl";

interface BreakpointContextType {
  breakpoint: Breakpoint;
}

const BreakpointContext = createContext<BreakpointContextType | undefined>(
  undefined,
);

// Hardcoded order - design system breakpoints are stable
const BREAKPOINT_ORDER: Breakpoint[] = ["_", "xs", "sm", "md", "lg", "xl"];
const BREAKPOINT_KEYS = ["xl", "lg", "md", "sm", "xs"] as const;

// Type-safe breakpoint mapping - derived from design system tokens
const BREAKPOINT_VALUES: Record<Exclude<Breakpoint, "_">, string> = {
  xs: "32rem",
  sm: "48rem",
  md: "64rem",
  lg: "80rem",
  xl: "96rem",
};

/**
 * Provider to wrap your app - add to root layout
 * Only ONE set of listeners for the entire app
 */
export function BreakpointProvider({ children }: { children: ReactNode }) {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("_");

  useEffect(() => {
    const queries: Record<string, MediaQueryList> = {};

    BREAKPOINT_KEYS.forEach((key) => {
      queries[key] = window.matchMedia(
        `(min-width: ${BREAKPOINT_VALUES[key]})`,
      );
    });

    const updateBreakpoint = (): void => {
      for (const key of BREAKPOINT_KEYS) {
        if (queries[key]?.matches) {
          setBreakpoint(key as Breakpoint);
          return;
        }
      }
      setBreakpoint("_");
    };

    updateBreakpoint();

    const handleChange = (): void => updateBreakpoint();

    BREAKPOINT_KEYS.forEach((key) => {
      queries[key]?.addEventListener("change", handleChange);
    });

    return () => {
      BREAKPOINT_KEYS.forEach((key) => {
        queries[key]?.removeEventListener("change", handleChange);
      });
    };
  }, []);

  return (
    <BreakpointContext.Provider value={{ breakpoint }}>
      {children}
    </BreakpointContext.Provider>
  );
}

/**
 * Hook to check if current width is at or above a specific breakpoint
 * @param targetBreakpoint Breakpoint to check against
 * @returns boolean - true if current width >= breakpoint
 *
 * @example
 * const isMd = useBreakpoint("md");      // true if md and above
 * const isDesktop = useBreakpoint("lg"); // true if lg and above
 */
export function useBreakpoint(targetBreakpoint: Breakpoint): boolean {
  const context = useContext(BreakpointContext);

  if (!context) {
    throw new Error("useBreakpoint must be used within BreakpointProvider");
  }

  const currentIndex = BREAKPOINT_ORDER.indexOf(context.breakpoint);
  const targetIndex = BREAKPOINT_ORDER.indexOf(targetBreakpoint);

  return currentIndex >= targetIndex;
}

/**
 * Hook to check if current breakpoint matches exactly a specific breakpoint
 * @param targetBreakpoint Breakpoint to match
 * @returns boolean - true if current breakpoint === targetBreakpoint
 *
 * @example
 * const isMobileOnly = useShowOnBreakpoint("_");     // true only on mobile
 * const isTabletOnly = useShowOnBreakpoint("sm");    // true only on tablet
 */
export function useShowOnBreakpoint(targetBreakpoint: Breakpoint): boolean {
  const context = useContext(BreakpointContext);

  if (!context) {
    throw new Error(
      "useShowOnBreakpoint must be used within BreakpointProvider",
    );
  }

  return context.breakpoint === targetBreakpoint;
}
