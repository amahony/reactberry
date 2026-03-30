"use client";

import { useState, useEffect } from "react";
import { pushThemeColor, popThemeColor } from "@/design-system/utils/overlayTheme";
import { useStandaloneMode } from "@/design-system/hooks/useStandaloneMode";

/**
 * Shared behavioral hook for overlay components (Modal, Drawer, etc.).
 *
 * Handles three concerns:
 * 1. SSR-safe mounting (portal rendering requires `document.body`)
 * 2. Ref-counted theme-color tinting + body scroll lock
 * 3. PWA standalone-mode detection for safe-area padding
 *
 * @param isOpen Whether the overlay is currently visible. Defaults to `true`
 *   (Modal is always open when mounted; Drawer passes `isSidebarOpen`).
 */
export function useOverlay(isOpen: boolean = true) {
  const [mounted, setMounted] = useState(false);
  const isStandalone = useStandaloneMode();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (isOpen) {
      pushThemeColor();
      return () => popThemeColor();
    }
  }, [isOpen]);

  return { mounted, isStandalone };
}
