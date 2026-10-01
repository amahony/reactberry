"use client"

import React from "react"
import { HexColorPicker, HexAlphaColorPicker } from "react-colorful"
import { Box } from "../../elements"
import Popover from "../Popover"

export interface ColorPickerProps {
  /** Current colour value in hex form (`#RRGGBB` or, with `alpha`, `#RRGGBBAA`). */
  color: string
  /** Fired whenever the user picks a new colour. */
  onChange: (color: string) => void
  /** Show the alpha-channel slider; defaults to `true`. */
  alpha?: boolean
  /** Custom trigger.  When omitted, a coloured swatch button is rendered. */
  trigger?: React.ReactNode
  /** Side of the trigger the picker pops out from. */
  placement?: string
  /** Edge length of the default swatch trigger. */
  swatchSize?: string
  /** Disable the swatch trigger.  Ignored when `trigger` is provided. */
  disabled?: boolean
  /** Forwarded to the underlying `Popover` panel. */
  panelProps?: any
  /** Forwarded to the underlying `Popover` trigger button. */
  triggerProps?: any
  /** Forwarded to the underlying `Popover` container. */
  containerProps?: any
}

// Visualises the current colour over a checkerboard background so a
// transparent / semi-transparent alpha channel is readable at a glance.
function ColorSwatch({
  color,
  size,
  disabled,
}: {
  color: string
  size: string
  disabled?: boolean
}) {
  return (
    <Box
      size={size}
      shape="roundedLarge"
      border="1.5px solid"
      borderColor="surface"
      position="relative"
      overflow="hidden"
      opacity={disabled ? 0.5 : 1}
      cursor={disabled ? "not-allowed" : "pointer"}
      style={{
        backgroundImage:
          "conic-gradient(rgba(0,0,0,.08) 25%, transparent 0 50%, rgba(0,0,0,.08) 0 75%, transparent 0)",
        backgroundSize: "10px 10px",
      }}
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        style={{ backgroundColor: color }}
      />
    </Box>
  )
}

/**
 * Hex colour picker with an optional alpha channel, rendered inside the
 * design-system `Popover` so it inherits click-outside, positioning and
 * animation behaviour.  Provide a custom `trigger` to embed the picker
 * inside an existing control row, or rely on the default coloured
 * swatch button.
 */
export default function ColorPicker({
  color,
  onChange,
  alpha = true,
  trigger,
  placement = "bottom end",
  swatchSize = "2rem",
  disabled = false,
  panelProps,
  triggerProps,
  containerProps,
}: ColorPickerProps) {
  const Picker = alpha ? HexAlphaColorPicker : HexColorPicker

  const resolvedTrigger = trigger ?? (
    <ColorSwatch color={color} size={swatchSize} disabled={disabled} />
  )

  return (
    <Popover
      trigger={resolvedTrigger}
      placement={placement}
      containerProps={containerProps}
      triggerProps={{
        $size: "none",
        variant: "ghost",
        p: "0",
        disabled,
        "aria-label": "Pick a color",
        ...triggerProps,
      }}
      panelProps={{
        width: "auto",
        p: "xs",
        ...panelProps,
      }}
    >
      <Picker color={color} onChange={onChange} />
    </Popover>
  )
}
