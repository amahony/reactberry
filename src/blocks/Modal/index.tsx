"use client";

/**
 * Enhanced Modal component
 *
 * Improvements:
 * - Adds robust fallback navigation logic when closing (overlay click or programmatic).
 * - Supports an optional `fallbackHref` prop for deterministic navigation when history is shallow.
 * - Keeps support for user-supplied `onClose` (which always takes precedence).
 * - Derives a parent path for common resource detail routes (/tasks/[id], /activity/[id]) if no fallback supplied.
 * - Adds `closeOnOverlayClick` prop to allow disabling close when clicking the backdrop overlay.
 *
 * Usage:
 * <Modal onClose={navigateBack} fallbackHref="/tasks" closeOnOverlayClick={false}>
 *   ...
 * </Modal>
 */

import { AnimatePresence, motion } from "motion/react";
import { Box } from "../../elements";
import { useKeypress } from "../../hooks/useKeypress";
import { useOverlay } from "../../hooks/useOverlay";
import { Backdrop } from "../Overlay";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

// Re-export for consumers that import these directly from Modal
export { pushThemeColor, popThemeColor } from "../../utils/overlayTheme";

/**
 * Context that exposes the Modal's close function to children.
 * When `animated` is true, this triggers the exit animation before unmounting.
 * When `animated` is false, this calls the close handler directly.
 *
 * Exported so sibling overlay wrappers (e.g. DraggableResizableModal) can
 * provide the same context, keeping `useModalClose()`/`ModalCloseButton`
 * working regardless of which shell rendered the children.
 */
export const ModalCloseContext = createContext<(() => void) | null>(null);

/**
 * Hook to access the parent Modal's close function.
 * Returns null if used outside a Modal.
 */
export function useModalClose() {
  return useContext(ModalCloseContext);
}

interface ModalProps {
  children: ReactNode;
  onClose?: () => void;
  portal?: boolean;
  /**
   * Explicit fallback route used when there is no browser history to return to.
   * Example: "/tasks"
   */
  fallbackHref?: string;
  /**
   * (Optional) Disable using browser history even if available and always use fallback / derived path.
   */
  forceFallback?: boolean;
  /**
   * Whether clicking the backdrop overlay should close the modal.
   * Defaults to true for current behavior. Set to false to prevent overlay clicks from closing.
   */
  closeOnOverlayClick?: boolean;
  /**
   * Whether to show the tinted backdrop overlay behind the modal.
   * Defaults to true. Set to false for a transparent backdrop.
   */
  backdrop?: boolean;
  /**
   * Additional props forwarded to the underlying `Backdrop` element
   * (e.g. `bg`, `zIndex`, custom `transition`). Spread after the
   * Modal-managed defaults so callers can override them.
   */
  backdropProps?: Record<string, any>;
  /**
   * Whether to animate the modal open/close with a scale + fade
   * animation matching the sign-in card style. Defaults to false.
   */
  animated?: boolean;
  /**
   * Additional style/semantic props forwarded to container.
   */
  [key: string]: any;
}

export default function Modal({
  children,
  onClose,
  portal = true,
  fallbackHref,
  forceFallback = false,
  closeOnOverlayClick = true,
  backdrop = true,
  backdropProps,
  animated = false,
  ...rest
}: ModalProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { mounted, isStandalone } = useOverlay(true);

  // Track if we (likely) have a prior history entry.
  // NOTE: history.length heuristic is imperfect but acceptable for typical SPA usage.
  const canGoBackRef = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      canGoBackRef.current = window.history.length > 1;
    }
  }, []);

  /**
   * Derive a reasonable parent path if no explicit fallback was provided.
   * Extend this logic as new modalized resource routes are introduced.
   */
  const deriveParentPath = useCallback((p: string): string => {
    if (!p) return "/";
    const patterns: Array<{ regex: RegExp; parent: string }> = [
      { regex: /\/tasks\/[^/]+$/, parent: "/tasks" },
      { regex: /\/activity\/[^/]+$/, parent: "/activity" },
    ];

    for (const { regex, parent } of patterns) {
      if (regex.test(p)) return parent;
    }
    return "/"; // Default root
  }, []);

  const resolvedFallback =
    fallbackHref || (pathname ? deriveParentPath(pathname) : "/") || "/";

  /**
   * Close handler:
   * 1. If user supplied onClose -> call it.
   * 2. Else if not forcing fallback and history seems viable -> router.back().
   * 3. Else -> router.push(resolvedFallback).
   */
  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
      return;
    }

    if (!forceFallback && canGoBackRef.current) {
      router.back();
      return;
    }

    router.push(resolvedFallback);
  }, [onClose, forceFallback, router, resolvedFallback]);

  /**
   * Stop propagation inside main dialog so clicks there don't trigger overlay close.
   */
  const stopPropagation = useCallback(
    (e: React.MouseEvent) => e.stopPropagation(),
    [],
  );

  /**
   * Stop React synthetic keyboard events from bubbling past the modal. The
   * modal is portaled to document.body, but React events still propagate
   * through the component tree — so without this, key presses inside the
   * modal can reach ancestor handlers (e.g. dnd-kit's KeyboardSensor
   * listeners on a draggable parent) and have their default suppressed,
   * breaking typing inside form fields like the InlineEditor textarea.
   */
  const stopKeyPropagation = useCallback(
    (e: React.KeyboardEvent) => e.stopPropagation(),
    [],
  );

  /**
   * Same rationale as `stopKeyPropagation`, applied to pointer/mouse/touch
   * events. Without this, interactions inside the dialog (e.g. dragging the
   * PDF preview) can reach a draggable ancestor's PointerSensor listeners
   * and start a drag on the underlying item.
   */
  const stopPointerPropagation = useCallback(
    (e: React.SyntheticEvent) => e.stopPropagation(),
    [],
  );

  // For animated modals, manage a closing state to allow exit animations
  // before the portal is removed.
  const [isClosing, setIsClosing] = useState(false);

  const handleAnimatedClose = useCallback(() => {
    setIsClosing(true);
  }, []);

  const onExitComplete = useCallback(() => {
    // Exit animation finished; notify the consumer to unmount the Modal.
    // We intentionally do not reset `isClosing` here — flipping it back to
    // `false` would re-mount the children inside AnimatePresence and play an
    // enter animation in the brief window before the parent's conditional
    // render tears the Modal down (e.g. when `onClose` triggers an async
    // `router.push`). The parent owns mount/unmount in response to onClose.
    handleClose();
  }, [handleClose]);

  const effectiveClose = animated ? handleAnimatedClose : handleClose;
  const showContent = animated ? !isClosing : true;

  // Close on Escape key. Uses effectiveClose so animated modals play exit animation.
  useKeypress("Escape", effectiveClose);

  const animatedTransition = {
    type: "spring" as const,
    stiffness: 500,
    damping: 30,
    mass: 0.8,
  };

  const modalContent = (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      zIndex="100002"
      pb="m"
      px="xs"
      pt={isStandalone ? "calc(1rem + env(safe-area-inset-top, 0px))" : "1rem"}
      onClick={stopPropagation}
      onPointerDown={stopPointerPropagation}
      onMouseDown={stopPointerPropagation}
      onTouchStart={stopPointerPropagation}
      onKeyDown={stopKeyPropagation}
      onKeyUp={stopKeyPropagation}
      onKeyPress={stopKeyPropagation}
    >
      <AnimatePresence onExitComplete={animated ? onExitComplete : undefined}>
        {showContent && (
          <>
            {/* Dialog Panel */}
            <Box
              as={animated ? motion.div : undefined}
              key="modal-dialog"
              {...(animated
                ? {
                    initial: { opacity: 0, y: "2rem", scale: 0.85 },
                    animate: { opacity: 1, y: 0, scale: 1 },
                    exit: { opacity: 0, y: "2rem", scale: 0.85 },
                    transition: animatedTransition,
                  }
                : {})}
              role="dialog"
              aria-modal="true"
              position="relative"
              maxWidth="inherit"
              width="100%"
              zIndex="100001"
              shape="rounded"
              $shadow="medium"
              overflow="hidden"
              height="100%"
              skin="surface"
              {...rest}
            >
              <Box
                height="100%"
                minHeight={0}
                width="100%"
                overflow="hidden"
                display="flex"
                flexDirection="column"
              >
                <ModalCloseContext.Provider value={effectiveClose}>
                  {children}
                </ModalCloseContext.Provider>
              </Box>
            </Box>

            {/* Clickable overlay (behind dialog) */}
            <Backdrop
              key="modal-overlay"
              animated={animated}
              transition={animated ? animatedTransition : { duration: 0.2 }}
              bg={backdrop ? "transparent.light.9" : "transparent"}
              onClick={closeOnOverlayClick ? effectiveClose : undefined}
              {...backdropProps}
            />
          </>
        )}
      </AnimatePresence>
    </Box>
  );

  // Avoid rendering portal content during SSR (Next.js) until mounted.
  if (!mounted) return null;

  return portal ? createPortal(modalContent, document.body) : modalContent;
}
