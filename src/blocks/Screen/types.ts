"use client"

import React, { useContext } from "react"
import { ThemeContext } from "styled-components"
import { BoxProps } from "../../elements/box"

/**
 * Chrome applied around a screen's content.
 * - framed: gutter + card surface (Calendar, Project detail)
 * - page: centred page column, chrome owned by the theme (legacy Container)
 * - clean: no gutter, no surface, for screens owning their own shell
 */
export type ScreenPreset = "framed" | "page" | "clean"

/**
 * Chrome of the wrapper providing the gutter around the content. `null` means
 * no wrapper is rendered, so the surface sits directly in the page flow.
 */
export const SCREEN_GUTTERS: Record<ScreenPreset, BoxProps | null> = {
  framed: { py: "xs", width: "100%", height: "100%" },
  page: null,
  clean: null,
}

/** Chrome of the element the content is rendered into. */
export const SCREEN_SURFACES: Record<ScreenPreset, BoxProps> = {
  framed: {
    skin: "card",
    shape: "roundedLarge",
    // p: "xs",
    $shadow: "xsmall",
  },
  page: {},
  clean: {},
}

/**
 * Surface chrome for the current preset. `page` mirrors the legacy Container
 * by reading its chrome from the theme, so themes keep owning the page column;
 * the other presets are device driven.
 */
export function useScreenSurface(
  preset: ScreenPreset,
  deviceSurface: BoxProps,
): BoxProps {
  const theme: any = useContext(ThemeContext)

  if (preset === "page") return { ...theme?.container }

  return { ...SCREEN_SURFACES[preset], ...deviceSurface }
}

export type ScreenVariant = React.ComponentType<any>

export type ScreenDevice = "desktop" | "tablet" | "phone"

export interface ScreenProps extends BoxProps {
  preset?: ScreenPreset
  /**
   * Room reserved for the fixed mobile chrome (top bar, bottom toolbar) and the
   * device safe areas. On by default in the phone and tablet shells, since the
   * chrome always overlays them; desktop has none and ignores it. Set to false
   * for screens that deliberately paint under the chrome, e.g. a hero image.
   */
  insets?: boolean
  /** Rendered when no viewport variant is supplied. */
  children?: React.ReactNode
  /** Viewport-specific implementations, resolved by resolveVariant. */
  desktop?: ScreenVariant
  tablet?: ScreenVariant
  phone?: ScreenVariant
  /** Props forwarded to whichever variant is rendered. */
  pass?: Record<string, unknown>
}

/**
 * Picks the implementation for the current viewport, preferring the closest
 * neighbour so a screen only defines the variants it actually needs.
 */
export function resolveVariant(
  device: ScreenDevice,
  { desktop, tablet, phone }: Pick<ScreenProps, "desktop" | "tablet" | "phone">,
): ScreenVariant | undefined {
  if (device === "desktop") return desktop ?? tablet ?? phone
  if (device === "tablet") return tablet ?? desktop ?? phone
  return phone ?? tablet ?? desktop
}
