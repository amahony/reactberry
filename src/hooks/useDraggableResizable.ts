"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useMotionValue } from "motion/react"

export type ResizeEdge = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw"

export interface PanelGeometry {
  width: number
  height: number
  right: number
  bottom: number
}

export interface DraggableResizableBounds {
  minWidth: number
  minHeight: number
  maxWidthVw: number
  maxHeightVh: number
  guard: number
}

export interface DraggableResizableOptions {
  /** localStorage key so each consumer persists its own geometry. */
  storageKey: string
  /** Computes the initial geometry when nothing is stored. */
  getDefaults: () => PanelGeometry
  /** Optional overrides for the resize/viewport bounds. */
  bounds?: Partial<DraggableResizableBounds>
}

const DEFAULT_BOUNDS: DraggableResizableBounds = {
  minWidth: 320,
  minHeight: 240,
  maxWidthVw: 0.98,
  maxHeightVh: 0.98,
  guard: 8,
}

interface ComputeArgs {
  edge: ResizeEdge
  start: PanelGeometry & { x: number; y: number }
  dx: number
  dy: number
  alt: boolean
  shift: boolean
  viewport: { w: number; h: number }
  bounds: DraggableResizableBounds
}

const horizontalSign = (edge: ResizeEdge): -1 | 0 | 1 => {
  if (edge === "e" || edge === "ne" || edge === "se") return 1
  if (edge === "w" || edge === "nw" || edge === "sw") return -1
  return 0
}

const verticalSign = (edge: ResizeEdge): -1 | 0 | 1 => {
  if (edge === "s" || edge === "se" || edge === "sw") return 1
  if (edge === "n" || edge === "ne" || edge === "nw") return -1
  return 0
}

function clamp(value: number, min: number, max: number): number {
  if (max < min) return min
  return Math.min(Math.max(value, min), max)
}

// Edge-anchored resize (mirrors the AI chat panel mechanic): the dragged edge
// moves while the opposite edge stays put. Alt/Shift make it symmetric about
// the panel center. Anchored bottom-right (position: fixed).
export function computeNextGeometry({
  edge,
  start,
  dx,
  dy,
  alt,
  shift,
  viewport,
  bounds,
}: ComputeArgs): PanelGeometry {
  let hSign = horizontalSign(edge)
  let vSign = verticalSign(edge)

  if (shift) {
    if (hSign !== 0 && vSign === 0) {
      vSign = hSign
      dy = dx
    } else if (vSign !== 0 && hSign === 0) {
      hSign = vSign
      dx = dy
    }
  }

  const symmetric = alt || shift
  const widthDelta = hSign * dx * (symmetric ? 2 : 1)
  const heightDelta = vSign * dy * (symmetric ? 2 : 1)

  const minW = bounds.minWidth
  const maxW = Math.max(minW, Math.floor(viewport.w * bounds.maxWidthVw))
  const minH = bounds.minHeight
  const maxH = Math.max(minH, Math.floor(viewport.h * bounds.maxHeightVh))

  const width = clamp(start.width + widthDelta, minW, maxW)
  const height = clamp(start.height + heightDelta, minH, maxH)

  const appliedW = width - start.width
  const appliedH = height - start.height

  let right = start.right
  let bottom = start.bottom

  if (symmetric) {
    if (hSign !== 0) right = start.right - appliedW / 2
    if (vSign !== 0) bottom = start.bottom - appliedH / 2
  } else {
    if (hSign === 1) right = start.right - appliedW
    if (vSign === 1) bottom = start.bottom - appliedH
  }

  const guard = bounds.guard
  const maxRight = viewport.w - width - guard
  const maxBottom = viewport.h - height - guard
  right = clamp(right, 0, Math.max(0, maxRight))
  bottom = clamp(bottom, 0, Math.max(0, maxBottom))

  return { width, height, right, bottom }
}

function clampToViewport(
  g: PanelGeometry,
  bounds: DraggableResizableBounds,
): PanelGeometry {
  if (typeof window === "undefined") return g
  const minW = bounds.minWidth
  const maxW = Math.max(minW, Math.floor(window.innerWidth * bounds.maxWidthVw))
  const minH = bounds.minHeight
  const maxH = Math.max(
    minH,
    Math.floor(window.innerHeight * bounds.maxHeightVh),
  )
  const guard = bounds.guard
  const width = clamp(g.width, minW, maxW)
  const height = clamp(g.height, minH, maxH)
  const right = clamp(
    g.right,
    0,
    Math.max(0, window.innerWidth - width - guard),
  )
  const bottom = clamp(
    g.bottom,
    0,
    Math.max(0, window.innerHeight - height - guard),
  )
  return { width, height, right, bottom }
}

function loadStoredGeometry(
  key: string,
  bounds: DraggableResizableBounds,
): PanelGeometry | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (
      parsed &&
      typeof parsed.width === "number" &&
      typeof parsed.height === "number" &&
      typeof parsed.right === "number" &&
      typeof parsed.bottom === "number"
    ) {
      return clampToViewport(parsed as PanelGeometry, bounds)
    }
  } catch {}
  return null
}

/**
 * Reusable motion-value drag/resize engine for a bottom-right-anchored,
 * position:fixed panel. Extracted from the AI chat panel's mechanic so other
 * floating surfaces (e.g. file preview) can share the exact same behavior.
 *
 * Motion values are the live channel during a gesture (handlers write them per
 * pointermove, bypassing React renders); state is the source of truth between
 * gestures (persisted + re-clamped on viewport resize).
 */
export function useDraggableResizable(options: DraggableResizableOptions) {
  const { storageKey, getDefaults } = options
  const bounds: DraggableResizableBounds = {
    ...DEFAULT_BOUNDS,
    ...options.bounds,
  }
  const boundsRef = useRef(bounds)
  boundsRef.current = bounds

  const [geometry, setGeometry] = useState<PanelGeometry>(
    () => loadStoredGeometry(storageKey, bounds) ?? getDefaults(),
  )
  const [isResizing, setIsResizing] = useState(false)
  const [isMoving, setIsMoving] = useState(false)
  const cleanupRef = useRef<(() => void) | null>(null)

  const rightMV = useMotionValue(geometry.right)
  const bottomMV = useMotionValue(geometry.bottom)
  const widthMV = useMotionValue(geometry.width)
  const heightMV = useMotionValue(geometry.height)

  const startResize = useCallback(
    (edge: ResizeEdge, onCommit?: (g: PanelGeometry) => void) =>
      (e: React.PointerEvent) => {
        e.preventDefault()
        e.stopPropagation()

        const start = {
          x: e.clientX,
          y: e.clientY,
          width: widthMV.get(),
          height: heightMV.get(),
          right: rightMV.get(),
          bottom: bottomMV.get(),
        }
        setIsResizing(true)

        const onMove = (ev: PointerEvent) => {
          const next = computeNextGeometry({
            edge,
            start,
            dx: ev.clientX - start.x,
            dy: ev.clientY - start.y,
            alt: ev.altKey,
            shift: ev.shiftKey,
            viewport: { w: window.innerWidth, h: window.innerHeight },
            bounds: boundsRef.current,
          })
          rightMV.set(next.right)
          bottomMV.set(next.bottom)
          widthMV.set(next.width)
          heightMV.set(next.height)
        }

        const onUp = () => {
          window.removeEventListener("pointermove", onMove)
          window.removeEventListener("pointerup", onUp)
          cleanupRef.current = null
          setIsResizing(false)
          const final = {
            width: widthMV.get(),
            height: heightMV.get(),
            right: rightMV.get(),
            bottom: bottomMV.get(),
          }
          if (onCommit) onCommit(final)
          else setGeometry(final)
        }

        window.addEventListener("pointermove", onMove)
        window.addEventListener("pointerup", onUp)
        cleanupRef.current = () => {
          window.removeEventListener("pointermove", onMove)
          window.removeEventListener("pointerup", onUp)
        }
      },
    [rightMV, bottomMV, widthMV, heightMV],
  )

  const startMove = useCallback(
    (onCommit?: (g: PanelGeometry) => void) => (e: React.PointerEvent) => {
      if (e.button !== 0) return
      e.preventDefault()

      const start = {
        x: e.clientX,
        y: e.clientY,
        right: rightMV.get(),
        bottom: bottomMV.get(),
        width: widthMV.get(),
        height: heightMV.get(),
      }
      setIsMoving(true)

      const onMove = (ev: PointerEvent) => {
        const dx = ev.clientX - start.x
        const dy = ev.clientY - start.y
        const guard = boundsRef.current.guard
        const maxRight = Math.max(0, window.innerWidth - start.width - guard)
        const maxBottom = Math.max(0, window.innerHeight - start.height - guard)
        rightMV.set(clamp(start.right - dx, 0, maxRight))
        bottomMV.set(clamp(start.bottom - dy, 0, maxBottom))
      }

      const onUp = () => {
        window.removeEventListener("pointermove", onMove)
        window.removeEventListener("pointerup", onUp)
        cleanupRef.current = null
        setIsMoving(false)
        const final = {
          width: widthMV.get(),
          height: heightMV.get(),
          right: rightMV.get(),
          bottom: bottomMV.get(),
        }
        if (onCommit) onCommit(final)
        else setGeometry(final)
      }

      window.addEventListener("pointermove", onMove)
      window.addEventListener("pointerup", onUp)
      cleanupRef.current = () => {
        window.removeEventListener("pointermove", onMove)
        window.removeEventListener("pointerup", onUp)
      }
    },
    [rightMV, bottomMV, widthMV, heightMV],
  )

  const resetPanel = useCallback(() => {
    setGeometry(getDefaults())
  }, [getDefaults])

  // Persist geometry across reloads.
  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(geometry))
    } catch {}
  }, [storageKey, geometry])

  // Re-clamp when the viewport shrinks below the current panel size.
  useEffect(() => {
    const onResize = () => {
      setGeometry((current) => {
        const next = clampToViewport(current, boundsRef.current)
        if (
          next.width === current.width &&
          next.height === current.height &&
          next.right === current.right &&
          next.bottom === current.bottom
        ) {
          return current
        }
        return next
      })
    }
    window.addEventListener("resize", onResize)
    return () => {
      window.removeEventListener("resize", onResize)
      cleanupRef.current?.()
    }
  }, [])

  return {
    geometry,
    isResizing,
    isMoving,
    startResize,
    startMove,
    resetPanel,
    rightMV,
    bottomMV,
    widthMV,
    heightMV,
  }
}
