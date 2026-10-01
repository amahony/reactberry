"use client"

import React, { useCallback, useEffect, useState } from "react"
import { Drawer } from "vaul"
import { Box, Button, Text } from "../../elements"
import { IconERemove } from "../../icons"

const VISUALLY_HIDDEN_STYLES: React.CSSProperties = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
}

const DRAWER_HANDLE_STYLES: React.CSSProperties = {
  width: "5rem",
  height: "6px",
  borderRadius: "999px",
  background: "rgba(148, 163, 184, 0.45)",
  opacity: 1,
}

export interface BottomSheetProps {
  children?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  peekContent?: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  defaultCollapsed?: boolean
  onOpenChange?: (open: boolean) => void
  onClose?: () => void
  peekHeight?: number
  collapsedHeight?: number | string
  expandedSnapPoint?: number | string
  height?: string
  /** When supplied, the panel sizes to its content and is capped at
   *  this value instead of taking the fixed `height`.  Ignored when a
   *  collapsed snap point is in play (the snap points already drive
   *  the height in that mode). */
  maxHeight?: string
  maxWidth?: string
  zIndex?: number
  showBackdrop?: boolean
  showBackdropWhenExpanded?: boolean
  backdropBlur?: string
  closeOnBackdropClick?: boolean
  closeOnEscape?: boolean
  showCloseButton?: boolean
}

function BottomSheet({
  children,
  title,
  description,
  peekContent,
  open,
  defaultOpen = true,
  defaultCollapsed = false,
  onOpenChange,
  onClose,
  peekHeight = 44,
  collapsedHeight,
  expandedSnapPoint,
  height = "28rem",
  maxHeight,
  maxWidth = "30rem",
  zIndex = 10000,
  showBackdrop = true,
  showBackdropWhenExpanded = false,
  backdropBlur = "8px",
  closeOnBackdropClick = true,
  closeOnEscape = true,
  showCloseButton = false,
}: BottomSheetProps) {
  const isControlled = open !== undefined
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isOpen = isControlled ? open : internalOpen
  const hasCollapsedState = collapsedHeight !== undefined
  const showPeekHandle = peekHeight > 0 && !isOpen
  const handleMinHeight = `calc(${peekHeight}px + env(safe-area-inset-bottom, 0px))`
  const accessibleTitle =
    typeof title === "string" && title.trim().length > 0
      ? title
      : "Bottom sheet"
  const hasDescription =
    description !== undefined &&
    description !== null &&
    description !== false &&
    !(typeof description === "string" && description.trim().length === 0)
  const collapsedSnapPoint =
    typeof collapsedHeight === "number"
      ? `${collapsedHeight}px`
      : collapsedHeight
  const fullSnapPoint = expandedSnapPoint ?? "448px"
  // When `maxHeight` is supplied, the panel grows with its content up
  // to that cap; otherwise we keep the historical fixed `height`.
  // Collapsed-snap mode still relies on the explicit snap point so its
  // height stays predictable for vaul.
  const useContentDrivenHeight = !hasCollapsedState && Boolean(maxHeight)
  const panelHeight = hasCollapsedState
    ? fullSnapPoint
    : useContentDrivenHeight
      ? undefined
      : height
  const panelMaxHeight = useContentDrivenHeight ? maxHeight : undefined
  const snapContainerHeight = panelHeight ?? maxHeight ?? height
  const useBoundedSnapContainer = hasCollapsedState && !showBackdrop
  const shouldRenderDrawer = isOpen || !hasCollapsedState
  const defaultSnapPoint = hasCollapsedState
    ? defaultCollapsed
      ? collapsedSnapPoint!
      : fullSnapPoint
    : null
  const [activeSnapPoint, setActiveSnapPoint] = useState<
    number | string | null
  >(isOpen ? defaultSnapPoint : null)
  const [snapContainer, setSnapContainer] = useState<HTMLElement | null>(null)
  const isCollapsedView =
    hasCollapsedState && activeSnapPoint === collapsedSnapPoint
  const isExpandedView =
    hasCollapsedState && isOpen && activeSnapPoint === fullSnapPoint
  const shouldShowBackdropOverlay =
    showBackdrop || (showBackdropWhenExpanded && isExpandedView)
  const shouldShowCustomBackdropOverlay =
    shouldShowBackdropOverlay && !showBackdrop
  const showPeekContent = Boolean(
    peekContent && (!hasCollapsedState || isCollapsedView),
  )
  // Empty / "none" / "0" disables the backdrop-filter entirely so
  // consumers can opt out of the blur without rendering a no-op filter
  // that still triggers compositor work on iOS.
  const backdropFilterValue =
    backdropBlur && backdropBlur !== "none" && backdropBlur !== "0"
      ? `blur(${backdropBlur})`
      : undefined
  const compactPeekMode = Boolean(
    showPeekContent && hasCollapsedState && !title && !showCloseButton,
  )

  useEffect(() => {
    if (!hasCollapsedState) {
      setActiveSnapPoint(null)
      return
    }
    if (isOpen) {
      setActiveSnapPoint((current) => current ?? defaultSnapPoint)
      return
    }
    setActiveSnapPoint(null)
  }, [defaultSnapPoint, hasCollapsedState, isOpen])

  const setOpenState = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) setInternalOpen(nextOpen)
      onOpenChange?.(nextOpen)
      if (!nextOpen) onClose?.()
    },
    [isControlled, onClose, onOpenChange],
  )

  const expandCollapsedSheet = useCallback(() => {
    if (!hasCollapsedState) {
      setOpenState(true)
      return
    }
    if (!isOpen) setOpenState(true)
    setActiveSnapPoint(fullSnapPoint)
  }, [fullSnapPoint, hasCollapsedState, isOpen, setOpenState])

  const preventBackdropClose = useCallback(
    (event: Event) => {
      if (!closeOnBackdropClick) event.preventDefault()
    },
    [closeOnBackdropClick],
  )

  const preventEscapeClose = useCallback(
    (event: KeyboardEvent) => {
      if (!closeOnEscape) event.preventDefault()
    },
    [closeOnEscape],
  )

  return (
    <>
      {useBoundedSnapContainer && shouldRenderDrawer && (
        <div
          ref={setSnapContainer}
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 0,
            height: snapContainerHeight,
            zIndex,
            pointerEvents: "none",
          }}
        />
      )}

      {showPeekHandle && (
        <Box
          position="fixed"
          left={0}
          right={0}
          bottom={0}
          zIndex={zIndex}
          px="xs"
          style={{ pointerEvents: "none" }}
        >
          {hasCollapsedState ? (
            <Box
              as="button"
              type="button"
              width="6rem"
              mx="auto"
              minHeight={handleMinHeight}
              border="none"
              background="transparent"
              display="flex"
              alignItems="center"
              justifyContent="center"
              p={0}
              style={{
                pointerEvents: "auto",
                WebkitTapHighlightColor: "transparent",
                outline: "none",
                appearance: "none",
              }}
              onClick={() => setOpenState(true)}
              aria-label={
                typeof title === "string"
                  ? `Open ${title}`
                  : "Open bottom sheet"
              }
            >
              <span aria-hidden="true" style={DRAWER_HANDLE_STYLES} />
            </Box>
          ) : (
            <Box
              as="button"
              type="button"
              width="100%"
              maxWidth={maxWidth}
              mx="auto"
              minHeight={handleMinHeight}
              border="none"
              borderRadius="24px 24px 0 0"
              background="var(--color-surface)"
              boxShadow="0 -8px 40px rgba(15, 23, 42, 0.18)"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              px="s"
              py="s"
              style={{
                pointerEvents: "auto",
                WebkitTapHighlightColor: "transparent",
                outline: "none",
                appearance: "none",
              }}
              onClick={() => setOpenState(true)}
              aria-label={
                typeof title === "string"
                  ? `Open ${title}`
                  : "Open bottom sheet"
              }
            >
              <span aria-hidden="true" style={DRAWER_HANDLE_STYLES} />
            </Box>
          )}
        </Box>
      )}

      {shouldRenderDrawer && shouldShowCustomBackdropOverlay && (
        <Box
          position="fixed"
          top={0}
          right={0}
          bottom={0}
          left={0}
          zIndex={zIndex - 1}
          bg="rgba(15,23,42,0.18)"
          style={{
            ...(backdropFilterValue
              ? { backdropFilter: backdropFilterValue }
              : null),
            pointerEvents: "none",
          }}
        />
      )}

      {shouldRenderDrawer && (
        <Drawer.Root
          open={isOpen}
          defaultOpen={defaultOpen}
          onOpenChange={setOpenState}
          direction="bottom"
          modal={showBackdrop}
          container={useBoundedSnapContainer ? snapContainer : undefined}
          snapPoints={
            hasCollapsedState ? [collapsedSnapPoint!, fullSnapPoint] : undefined
          }
          activeSnapPoint={activeSnapPoint}
          setActiveSnapPoint={
            hasCollapsedState ? setActiveSnapPoint : undefined
          }
          dismissible
          fixed
          closeThreshold={0.15}
          scrollLockTimeout={100}
          snapToSequentialPoint={hasCollapsedState}
          shouldScaleBackground={false}
          noBodyStyles={!showBackdrop}
          disablePreventScroll={!showBackdrop}
        >
          <Drawer.Portal>
            {showBackdrop && shouldShowBackdropOverlay && (
              <Drawer.Overlay asChild>
                <Box
                  position="fixed"
                  top={0}
                  right={0}
                  bottom={0}
                  left={0}
                  zIndex={zIndex - 1}
                  bg="rgba(15,23,42,0.18)"
                  style={
                    backdropFilterValue
                      ? { backdropFilter: backdropFilterValue }
                      : undefined
                  }
                />
              </Drawer.Overlay>
            )}

            <Drawer.Content
              asChild
              {...(!hasDescription ? { "aria-describedby": undefined } : {})}
              onOpenAutoFocus={(event) => event.preventDefault()}
              onPointerDownOutside={preventBackdropClose}
              onEscapeKeyDown={preventEscapeClose}
            >
              <Box
                position={useBoundedSnapContainer ? "absolute" : "fixed"}
                left={0}
                right={0}
                bottom={0}
                top={
                  hasCollapsedState && !useBoundedSnapContainer ? 0 : undefined
                }
                zIndex={useBoundedSnapContainer ? undefined : zIndex}
                width="100%"
                display="flex"
                flexDirection="column"
                style={{
                  pointerEvents: useBoundedSnapContainer
                    ? "auto"
                    : hasCollapsedState
                      ? "none"
                      : "auto",
                  overscrollBehaviorY: "contain",
                  outline: "none",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                <Box
                  width="100%"
                  maxWidth={maxWidth}
                  mx="auto"
                  skin="surface"
                  borderRadius="24px 24px 0 0"
                  boxShadow="0 -8px 40px rgba(15, 23, 42, 0.18)"
                  height={panelHeight}
                  maxHeight={panelMaxHeight}
                  overflow="hidden"
                  display="flex"
                  flexDirection="column"
                  style={{
                    paddingBottom: "env(safe-area-inset-bottom, 0px)",
                    pointerEvents: "auto",
                    overscrollBehaviorY: "contain",
                    outline: "none",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  <Box
                    px="s"
                    pt={compactPeekMode ? undefined : "xs"}
                    pb={
                      compactPeekMode
                        ? undefined
                        : title || showCloseButton || showPeekContent
                          ? "xs"
                          : "s"
                    }
                    borderBottom={
                      compactPeekMode
                        ? undefined
                        : title || showPeekContent
                          ? "1px solid"
                          : undefined
                    }
                    borderColor={
                      compactPeekMode
                        ? undefined
                        : title || showPeekContent
                          ? "transparent.light.3"
                          : undefined
                    }
                    minHeight={compactPeekMode ? collapsedSnapPoint : undefined}
                    position={compactPeekMode ? "relative" : undefined}
                    display={compactPeekMode ? "flex" : undefined}
                    flexDirection={compactPeekMode ? "column" : undefined}
                    justifyContent={compactPeekMode ? "center" : undefined}
                    cursor={
                      compactPeekMode && isCollapsedView ? "pointer" : undefined
                    }
                    onClick={
                      compactPeekMode && isCollapsedView
                        ? expandCollapsedSheet
                        : undefined
                    }
                    style={
                      compactPeekMode
                        ? {
                            paddingTop: "0.75rem",
                            paddingBottom: "0.5rem",
                            WebkitTapHighlightColor: "transparent",
                          }
                        : undefined
                    }
                  >
                    {compactPeekMode ? (
                      <Drawer.Handle
                        style={{
                          ...DRAWER_HANDLE_STYLES,
                          position: "absolute",
                          left: "50%",
                          top: "0.4rem",
                          transform: "translateX(-50%)",
                          WebkitTapHighlightColor: "transparent",
                          cursor: "grab",
                        }}
                      />
                    ) : (
                      <Box
                        display="flex"
                        justifyContent="center"
                        mb={title || showCloseButton ? "xs" : 0}
                      >
                        <Drawer.Handle
                          style={{
                            ...DRAWER_HANDLE_STYLES,
                            WebkitTapHighlightColor: "transparent",
                            cursor: "grab",
                          }}
                        />
                      </Box>
                    )}
                    {(title || showCloseButton) && (
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        gap="s"
                      >
                        <Drawer.Title asChild>
                          <Text fontSize="m" fontWeight={700} lineClamp={1}>
                            {title}
                          </Text>
                        </Drawer.Title>
                        {showCloseButton && (
                          <Button
                            variant="ghost"
                            $size="icon.xsmall"
                            onClick={() => setOpenState(false)}
                            title="Close sheet"
                            aria-label="Close sheet"
                          >
                            <Box as={IconERemove} size="1rem" />
                          </Button>
                        )}
                      </Box>
                    )}
                    {!title && (
                      <Drawer.Title asChild>
                        <span style={VISUALLY_HIDDEN_STYLES}>
                          {accessibleTitle}
                        </span>
                      </Drawer.Title>
                    )}
                    {hasDescription && (
                      <Drawer.Description asChild>
                        <span style={VISUALLY_HIDDEN_STYLES}>
                          {description}
                        </span>
                      </Drawer.Description>
                    )}
                    {showPeekContent && (
                      <Box
                        mt={
                          compactPeekMode
                            ? 0
                            : title || showCloseButton
                              ? "xs"
                              : 0
                        }
                      >
                        {peekContent}
                      </Box>
                    )}
                  </Box>

                  <Box
                    flex="1"
                    overflowY="auto"
                    minHeight={0}
                    style={{
                      WebkitOverflowScrolling: "touch",
                      overscrollBehaviorY: "contain",
                    }}
                  >
                    {children}
                  </Box>
                </Box>
              </Box>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      )}
    </>
  )
}

export default BottomSheet
