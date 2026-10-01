"use client"

import type { CSSProperties } from "react"
import type { ResizeEdge } from "../hooks/useDraggableResizable"

// Reusable 8-edge resize hit zones for a bottom-right-anchored floating panel.
// Generalized from the AI chat panel's ChatPanelResizeHandles. Handles sit
// flush inside the panel edge (panels use overflow:hidden, so a negative offset
// would be clipped and lose pointer interactivity).
const HANDLE_THICKNESS = 6
const CORNER_SIZE = 14
const HANDLE_Z_INDEX = 10

interface HandleSpec {
  edge: ResizeEdge
  style: CSSProperties
  cursor: string
}

const handles: HandleSpec[] = [
  {
    edge: "n",
    style: {
      top: 0,
      left: CORNER_SIZE,
      right: CORNER_SIZE,
      height: HANDLE_THICKNESS,
    },
    cursor: "ns-resize",
  },
  {
    edge: "s",
    style: {
      bottom: 0,
      left: CORNER_SIZE,
      right: CORNER_SIZE,
      height: HANDLE_THICKNESS,
    },
    cursor: "ns-resize",
  },
  {
    edge: "e",
    style: {
      right: 0,
      top: CORNER_SIZE,
      bottom: CORNER_SIZE,
      width: HANDLE_THICKNESS,
    },
    cursor: "ew-resize",
  },
  {
    edge: "w",
    style: {
      left: 0,
      top: CORNER_SIZE,
      bottom: CORNER_SIZE,
      width: HANDLE_THICKNESS,
    },
    cursor: "ew-resize",
  },
  {
    edge: "ne",
    style: { top: 0, right: 0, width: CORNER_SIZE, height: CORNER_SIZE },
    cursor: "nesw-resize",
  },
  {
    edge: "nw",
    style: { top: 0, left: 0, width: CORNER_SIZE, height: CORNER_SIZE },
    cursor: "nwse-resize",
  },
  {
    edge: "se",
    style: { bottom: 0, right: 0, width: CORNER_SIZE, height: CORNER_SIZE },
    cursor: "nwse-resize",
  },
  {
    edge: "sw",
    style: { bottom: 0, left: 0, width: CORNER_SIZE, height: CORNER_SIZE },
    cursor: "nesw-resize",
  },
]

interface ResizeHandlesProps {
  onStart: (edge: ResizeEdge) => (e: React.PointerEvent) => void
}

export function ResizeHandles({ onStart }: ResizeHandlesProps) {
  return (
    <>
      {handles.map((h) => (
        <div
          key={h.edge}
          role="presentation"
          aria-hidden="true"
          onPointerDown={onStart(h.edge)}
          style={{
            position: "absolute",
            zIndex: HANDLE_Z_INDEX,
            cursor: h.cursor,
            touchAction: "none",
            background: "transparent",
            ...h.style,
          }}
        />
      ))}
    </>
  )
}
