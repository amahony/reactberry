import { style, variant } from "styled-system"
import { css } from "styled-components"

export const disabled = css`
  opacity: 0.5;
  pointer-events: none;
`

// used by Box

export const gap = style({
  prop: "gap",
  cssProperty: "gap",
  key: "space",
})

export const aspect = style({
  prop: "aspect",
  cssProperty: "aspectRatio",
})

export const $size = variant({
  key: "controlSizes",
  prop: "$size",
})

export const skin = variant({
  key: "skins",
  prop: "skin",
})

export const hover = variant({
  key: "skins",
  prop: "hover",
})

export const $shadow = variant({
  key: "shadows",
  prop: "$shadow",
})

export const focus = variant({
  key: "skins",
  prop: "focus",
})

export const shape = variant({
  key: "shapes",
  prop: "shape",
  cssProperty: "border-radius",
})

export const cursor = style({
  prop: "cursor",
  cssProperty: "cursor",
})

// used by Text
export const textTransform = style({
  prop: "textTransform",
  cssProperty: "text-transform",
})

export const textDecoration = style({
  prop: "textDecoration",
  cssProperty: "text-decoration",
})

export const textOverflow = style({
  prop: "textOverflow",
  cssProperty: "text-overflow",
})

export const outline = css`
  box-shadow: 0 0 0px 1px ${(p) =>
    p.theme.colors.palette.neutrals[8]}, 0 0 0px 4px ${(p) =>
    p.theme.colors.palette.blues[5]}
}`

export const lineClamp = css`
  max-width: 100%;
  display: -webkit-box;
  text-wrap: balance;
  -webkit-line-clamp: ${(p) => p.lineClamp || 1};
  overflow: hidden;
  word-break: break-word;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
`

export const truncate = css`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
`
