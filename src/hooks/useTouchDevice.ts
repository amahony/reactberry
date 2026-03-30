"use client";

import { useState, useEffect } from "react";

/**
 * Detects whether the current device uses touch as its primary input.
 *
 * Combines hardware capability (maxTouchPoints) with the CSS pointer: coarse
 * media query so that hybrid devices (e.g. Surface Pro with trackpad) return
 * false when a fine pointer is the primary input.
 *
 * Listens for media-query changes so the value updates if the user detaches
 * a keyboard / mouse mid-session.
 */
export function useTouchDevice(): boolean {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const hasTouchCapability =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const coarsePointerQuery = window.matchMedia("(pointer: coarse)");

    const update = () => {
      setIsTouchDevice(hasTouchCapability && coarsePointerQuery.matches);
    };

    update();

    coarsePointerQuery.addEventListener("change", update);
    return () => coarsePointerQuery.removeEventListener("change", update);
  }, []);

  return isTouchDevice;
}
