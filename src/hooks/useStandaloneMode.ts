"use client";

import { useState, useEffect } from "react";

/**
 * Detects whether the app is running in standalone (PWA) mode.
 *
 * Checks two signals:
 * 1. The standard `(display-mode: standalone)` media query (Chrome, Edge, Firefox).
 * 2. The iOS-specific `navigator.standalone` boolean (Safari on iOS).
 *
 * Listens for media-query changes so the value updates dynamically,
 * though in practice display-mode rarely changes during a session.
 */
export function useStandaloneMode(): boolean {
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const iosStandalone =
      "standalone" in navigator && (navigator as any).standalone === true;

    const displayModeQuery = window.matchMedia("(display-mode: standalone)");

    const update = () => {
      setIsStandalone(iosStandalone || displayModeQuery.matches);
    };

    update();

    displayModeQuery.addEventListener("change", update);
    return () => displayModeQuery.removeEventListener("change", update);
  }, []);

  return isStandalone;
}
