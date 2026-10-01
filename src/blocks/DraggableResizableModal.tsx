"use client"

import { AnimatePresence, motion } from "motion/react"
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { createPortal } from "react-dom"
import { Box } from "../elements"
import type { BoxProps } from "../elements/box"
import { Backdrop } from "./Overlay"
import Modal, { ModalCloseContext } from "./Modal"
import { ResizeHandles } from "./ResizeHandles"
import { useBreakpoint } from "../hooks/useBreakpoint"
import { useKeypress } from "../hooks/useKeypress"
import { useOverlay } from "../hooks/useOverlay"
import {
  useDraggableResizable,
  type DraggableResizableBounds,
  type PanelGeometry,
} from "../hooks/useDraggableResizable"

// ── Drag context ──────────────────────────────────────────────────────────
// Exposes the desktop panel's move handler to descendants so a header region
// can act as the drag surface. Absent on mobile (Modal path), where children
// render inside the plain full-screen dialog.
interface DragContextValue {
  onStartMove: (e: React.PointerEvent) => void
  isMoving: boolean
}

const DragContext = createContext<DragContextValue | null>(null)

/**
 * Access the enclosing DraggableResizableModal's move handler. Returns a no-op
 * handler and `isMoving: false` when used outside the desktop panel (e.g. on
 * mobile), so consumers can wire drag surfaces unconditionally.
 */
export function useDraggableModalDrag(): DragContextValue {
  return useContext(DragContext) ?? { onStartMove: () => {}, isMoving: false }
}

/**
 * Grab surface that begins a panel move on pointer-down. On mobile (no drag
 * context) it renders as a plain Box with no grab affordance.
 */
export function ModalDragHandle({ children, ...rest }: BoxProps) {
  const drag = useContext(DragContext)
  return (
    <Box
      onPointerDown={drag?.onStartMove}
      cursor={drag ? (drag.isMoving ? "grabbing" : "grab") : undefined}
      {...rest}
    >
      {children}
    </Box>
  )
}

const DEFAULT_WIDTH = 900
const DEFAULT_HEIGHT = 640

/** Golden ratio used to proportion the chat/preview split. */
export const GOLDEN_RATIO = 1.6

/**
 * Fraction of the viewport width a right-docked panel occupies by default. The
 * preview takes the smaller (1) share of a GOLDEN_RATIO : 1 split while the chat
 * keeps the larger (1.6) share; the split host reserves the same fraction on the
 * right so the panel lands in the space the chat content vacates.
 */
export const SPLIT_DOCK_FRACTION = 1 / (1 + GOLDEN_RATIO)

// Center the panel on first open (no stored geometry). Anchored bottom-right
// (position: fixed), so the centered offsets are half the leftover space.
function centeredDefaults(
  width: number,
  height: number,
  bounds?: Partial<DraggableResizableBounds>,
): () => PanelGeometry {
  return () => {
    const vw = typeof window !== "undefined" ? window.innerWidth : 1280
    const vh = typeof window !== "undefined" ? window.innerHeight : 800
    const w = Math.min(width, Math.floor(vw * (bounds?.maxWidthVw ?? 0.98)))
    const h = Math.min(height, Math.floor(vh * (bounds?.maxHeightVh ?? 0.98)))
    return {
      width: w,
      height: h,
      right: Math.max(0, Math.round((vw - w) / 2)),
      bottom: Math.max(0, Math.round((vh - h) / 2)),
    }
  }
}

// Dock the panel to the right edge, spanning (near) full height. Width is a
// fraction of the viewport so it fills the space the split host reserves.
function rightDockedDefaults(
  fraction: number,
  bounds?: Partial<DraggableResizableBounds>,
): () => PanelGeometry {
  return () => {
    const vw = typeof window !== "undefined" ? window.innerWidth : 1280
    const vh = typeof window !== "undefined" ? window.innerHeight : 800
    const guard = bounds?.guard ?? 8
    const maxW = Math.floor(vw * (bounds?.maxWidthVw ?? 0.98))
    const maxH = Math.floor(vh * (bounds?.maxHeightVh ?? 0.98))
    const w = Math.max(320, Math.min(Math.floor(vw * fraction), maxW))
    const h = Math.max(240, Math.min(vh - guard * 2, maxH))
    return { width: w, height: h, right: guard, bottom: guard }
  }
}

export interface DraggableResizableModalProps {
  children: ReactNode
  onClose?: () => void
  /** localStorage key so each surface persists its own geometry. */
  storageKey: string
  /** Desktop initial panel size (px) used when nothing is stored. */
  defaultWidth?: number
  defaultHeight?: number
  /** Optional overrides for the resize/viewport bounds. */
  bounds?: Partial<DraggableResizableBounds>
  /** Whether to show the tinted backdrop. Defaults to true. */
  backdrop?: boolean
  backdropProps?: Record<string, any>
  /**
   * Whether to render the backdrop element at all. Defaults to true. Set false
   * for a docked overlay that must leave the rest of the page interactive (the
   * split host keeps the chat usable beside the panel).
   */
  overlay?: boolean
  /** Initial anchor for the panel when nothing is stored. Defaults to "center". */
  dock?: "center" | "right"
  /** Viewport-width fraction used when `dock="right"`. Defaults to SPLIT_DOCK_FRACTION. */
  dockFraction?: number
  /** Whether clicking the backdrop closes the panel. Defaults to true. */
  closeOnOverlayClick?: boolean
  /** Animate open/close with a scale + fade. Defaults to true. */
  animated?: boolean
  /** Mobile-only sizing forwarded to the fallback full-screen Modal. */
  maxWidth?: any
  maxHeight?: any
  /**
   * Styling props (skin, shape, border, boxShadow, $shadow, …) forwarded to
   * the desktop panel and, on mobile, to the fallback Modal.
   */
  [key: string]: any
}

/**
 * Modal that is a free-floating, draggable + resizable panel on desktop
 * (>= sm) and a full-screen Modal on mobile (< sm). Shares the exact motion-
 * value drag/resize mechanic used by the AI chat panel (see
 * useDraggableResizable). Geometry persists per `storageKey`.
 */
export default function DraggableResizableModal({
  children,
  storageKey,
  defaultWidth,
  defaultHeight,
  bounds,
  // Desktop-only knobs — kept out of the mobile Modal's `rest` below.
  dock,
  dockFraction,
  overlay,
  ...rest
}: DraggableResizableModalProps) {
  const isSmUp = useBreakpoint("sm")

  // Mobile: delegate to the full-screen Modal. `rest` carries onClose, backdrop,
  // backdropProps, closeOnOverlayClick, animated, maxWidth/maxHeight and styling
  // — all valid Modal props.
  if (!isSmUp) {
    return <Modal {...rest}>{children}</Modal>
  }

  return (
    <DesktopFloatingModal
      storageKey={storageKey}
      defaultWidth={defaultWidth}
      defaultHeight={defaultHeight}
      bounds={bounds}
      dock={dock}
      dockFraction={dockFraction}
      overlay={overlay}
      {...rest}
    >
      {children}
    </DesktopFloatingModal>
  )
}

const PANEL_ANIM = {
  type: "spring" as const,
  stiffness: 500,
  damping: 30,
  mass: 0.8,
}

function DesktopFloatingModal({
  children,
  onClose,
  storageKey,
  defaultWidth = DEFAULT_WIDTH,
  defaultHeight = DEFAULT_HEIGHT,
  bounds,
  backdrop = true,
  backdropProps,
  overlay = true,
  dock = "center",
  dockFraction = SPLIT_DOCK_FRACTION,
  closeOnOverlayClick = true,
  animated = true,
  // Consumed and ignored on desktop — geometry drives the panel size here.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  maxWidth: _maxWidth,
  maxHeight: _maxHeight,
  ...styling
}: DraggableResizableModalProps) {
  const { mounted } = useOverlay(true)

  const getDefaults = useMemo(
    () =>
      dock === "right"
        ? rightDockedDefaults(dockFraction, bounds)
        : centeredDefaults(defaultWidth, defaultHeight, bounds),
    [dock, dockFraction, defaultWidth, defaultHeight, bounds],
  )

  const {
    isMoving,
    startResize,
    startMove,
    rightMV,
    bottomMV,
    widthMV,
    heightMV,
  } = useDraggableResizable({ storageKey, getDefaults, bounds })

  // Closing state so the exit animation can play before the portal unmounts.
  const [isClosing, setIsClosing] = useState(false)

  const handleClose = useCallback(() => {
    onClose?.()
  }, [onClose])

  const effectiveClose = useCallback(() => {
    if (animated) setIsClosing(true)
    else handleClose()
  }, [animated, handleClose])

  // Close on Escape. Uses effectiveClose so animated panels play their exit.
  useKeypress("Escape", effectiveClose)

  const dragValue = useMemo(
    () => ({ onStartMove: startMove(), isMoving }),
    [startMove, isMoving],
  )

  // Stop clicks/keys/pointer events from reaching draggable ancestors (the
  // panel is portaled to body, but React events still bubble through the tree).
  const stop = useCallback((e: React.SyntheticEvent) => e.stopPropagation(), [])

  const showContent = animated ? !isClosing : true

  const content = (
    <AnimatePresence onExitComplete={animated ? handleClose : undefined}>
      {showContent && (
        <>
          <Box
            as={motion.div}
            key="drmodal-panel"
            role="dialog"
            aria-modal="true"
            position="fixed"
            zIndex="100002"
            overflow="hidden"
            display="flex"
            flexDirection="column"
            shape="rounded"
            $shadow="medium"
            border="0px solid"
            skin="panel"
            initial={animated ? { opacity: 0, scale: 0.96 } : false}
            animate={{ opacity: 1, scale: 1 }}
            exit={animated ? { opacity: 0, scale: 0.96 } : undefined}
            transition={PANEL_ANIM}
            style={{
              transformOrigin: "center",
              right: rightMV,
              bottom: bottomMV,
              width: widthMV,
              height: heightMV,
            }}
            onClick={stop}
            onPointerDown={stop}
            onMouseDown={stop}
            onTouchStart={stop}
            onKeyDown={stop}
            {...styling}
          >
            <Box
              height="100%"
              width="100%"
              overflow="hidden"
              display="flex"
              flexDirection="column"
            >
              <ModalCloseContext.Provider value={effectiveClose}>
                <DragContext.Provider value={dragValue}>
                  {children}
                </DragContext.Provider>
              </ModalCloseContext.Provider>
            </Box>
            {/* Resize hit zones sit on top of the panel edges. */}
            <ResizeHandles onStart={(edge) => startResize(edge)} />
          </Box>

          {/* Clickable overlay behind the panel. Omitted entirely when
              `overlay` is false so the rest of the page stays interactive. */}
          {overlay && (
            <Backdrop
              key="drmodal-backdrop"
              animated={animated}
              transition={animated ? PANEL_ANIM : { duration: 0.2 }}
              bg={backdrop ? "transparent.light.9" : "transparent"}
              zIndex="100001"
              onClick={closeOnOverlayClick ? effectiveClose : undefined}
              {...backdropProps}
            />
          )}
        </>
      )}
    </AnimatePresence>
  )

  if (!mounted) return null
  return createPortal(content, document.body)
}
