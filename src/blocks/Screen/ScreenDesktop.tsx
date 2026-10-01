"use client"
import Box, { BoxProps } from "../../elements/box"
import {
  ScreenPreset,
  ScreenProps,
  SCREEN_GUTTERS,
  resolveVariant,
  useScreenSurface,
} from "./types"

// The framed gutter is pinned to the viewport so the card never grows the
// document: it is the scroll boundary, and the card scrolls inside it.
const GUTTER: Record<ScreenPreset, BoxProps> = {
  framed: {
    px: "s",
    height: "100dvh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  page: {},
  clean: {},
}

const SURFACE: Record<ScreenPreset, BoxProps> = {
  framed: { flex: "1 1 auto", minHeight: 0, overflow: "auto" },
  page: {},
  clean: {},
}

export default function ScreenDesktop({
  children,
  preset = "framed",
  // Desktop has no overlaying chrome, so insets are a no-op here.
  insets: _insets,
  desktop,
  tablet,
  phone,
  pass,
  ...props
}: ScreenProps) {
  const Variant = resolveVariant("desktop", { desktop, tablet, phone })
  const surface = useScreenSurface(preset, SURFACE[preset])
  const gutter = SCREEN_GUTTERS[preset]

  const content = (
    <Box {...surface} {...props}>
      {Variant ? <Variant {...pass} /> : children}
    </Box>
  )

  if (!gutter) return content

  return (
    <Box {...gutter} {...GUTTER[preset]}>
      {content}
    </Box>
  )
}
