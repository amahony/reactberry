"use client"
import Box, { BoxProps } from "../../elements/box"
import { MOBILE_BOTTOM_INSET, MOBILE_TOP_INSET } from "./insets"
import {
  ScreenPreset,
  ScreenProps,
  SCREEN_GUTTERS,
  resolveVariant,
  useScreenSurface,
} from "./types"

const GUTTER: Record<ScreenPreset, BoxProps> = {
  framed: { px: "0" },
  page: {},
  clean: {},
}

const SURFACE: Record<ScreenPreset, BoxProps> = {
  framed: {},
  page: {},
  clean: {},
}

// Replaces the preset's vertical gutter rather than adding to it, so the
// chrome clearance is the whole top/bottom spacing of the screen.
const INSETS: BoxProps = {
  py: undefined,
  pt: MOBILE_TOP_INSET,
  pb: MOBILE_BOTTOM_INSET,
}

export default function ScreenTablet({
  children,
  preset = "framed",
  insets = true,
  desktop,
  tablet,
  phone,
  pass,
  ...props
}: ScreenProps) {
  const Variant = resolveVariant("tablet", { desktop, tablet, phone })
  const surface = useScreenSurface(preset, SURFACE[preset])
  const gutter = SCREEN_GUTTERS[preset]

  const content = (
    <Box {...surface} {...(insets && !gutter ? INSETS : null)} {...props}>
      {Variant ? <Variant {...pass} /> : children}
    </Box>
  )

  if (!gutter) return content

  return (
    <Box {...gutter} {...GUTTER[preset]} {...(insets ? INSETS : null)}>
      {content}
    </Box>
  )
}
