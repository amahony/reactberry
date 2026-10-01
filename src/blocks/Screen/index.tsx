"use client"
import { useBreakpoint } from "../../hooks/useBreakpoint"
import ScreenDesktop from "./ScreenDesktop"
import ScreenTablet from "./ScreenTablet"
import ScreenPhone from "./ScreenPhone"
import { ScreenProps } from "./types"

/**
 * Page-level wrapper that resolves one implementation per viewport class and
 * renders it inside the preset chrome. Screens pass `desktop` / `tablet` /
 * `phone` components instead of bundling responsive branches into a single
 * tree; missing variants fall back to the closest supplied one, so a screen
 * only splits where it actually diverges.
 *
 * Variants are mounted exclusively — state shared between them must live in a
 * hook above the Screen, since switching viewport unmounts the previous one.
 */
export default function Screen(props: ScreenProps) {
  const isDesktop = useBreakpoint("md")
  const isTablet = useBreakpoint("sm")

  if (isDesktop) {
    return <ScreenDesktop {...props} />
  }

  if (isTablet) {
    return <ScreenTablet minHeight={"100vh"} {...props} />
  }

  return <ScreenPhone minHeight={"100vh"} {...props} />
}

export { ScreenDesktop, ScreenTablet, ScreenPhone }
export {
  SAFE_TOP,
  SAFE_BOTTOM,
  MOBILE_TOP_BAR,
  MOBILE_BOTTOM_BAR,
  MOBILE_TOP_INSET,
  MOBILE_BOTTOM_INSET,
} from "./insets"
export type {
  ScreenProps,
  ScreenPreset,
  ScreenVariant,
  ScreenDevice,
} from "./types"
