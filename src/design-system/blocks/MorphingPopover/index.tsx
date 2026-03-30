"use client";

import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { Box } from "@/design-system/elements";
import { createPortal } from "react-dom";
import { useClickOutside } from "@/design-system/hooks/useClickOutside";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  type Transition,
  type Variants,
} from "motion/react";
import Underlay from "../Underlay";

const DEFAULT_TRANSITION: Transition = {
  type: "spring",
  bounce: 0.1,
  duration: 0.4,
};

const DEFAULT_VARIANTS: Variants = {
  initial: { opacity: 0, borderRadius: 9999 },
  animate: { opacity: 1, borderRadius: 16 },
  exit: { opacity: 0, borderRadius: 9999 },
};

type MorphingPopoverRenderTriggerProps = {
  ref: (node: HTMLElement | null) => void;
  onClick?: () => void;
};

export type MorphingPopoverProps = {
  /** Trigger element shown when the popover is closed. */
  trigger?: React.ReactNode;
  /** Props forwarded to the trigger wrapper when not using renderTrigger. */
  triggerProps?: Record<string, any>;
  /** Optional placement hint (kept for API compatibility; currently ignored). */
  placement?: string;
  /** Props forwarded to the morphing panel container. */
  panelProps?: Record<string, any>;
  /** Props forwarded to the outer container Box. */
  containerProps?: Record<string, any>;
  /**
   * Custom trigger renderer for full control over the trigger element.
   * Signature mirrors the standard Popover API.
   */
  renderTrigger?: (props: MorphingPopoverRenderTriggerProps) => React.ReactNode;
  /**
   * Popover content. If a function, receives a close() helper.
   */
  children?:
    | React.ReactNode
    | ((context: { close: () => void }) => React.ReactNode);
  /** Motion transition applied via MotionConfig. */
  transition?: Transition;
  /** Framer Motion variants for the morphing panel. */
  variants?: Variants;
  /** Uncontrolled initial open state. */
  defaultOpen?: boolean;
  /** Controlled open state. */
  open?: boolean;
  /** Callback when open state changes. */
  onOpenChange?: (open: boolean) => void;
};

export default function MorphingPopover({
  trigger,
  triggerProps,
  placement: _placement = "bottom end",
  panelProps,
  containerProps,
  renderTrigger,
  children,
  transition = DEFAULT_TRANSITION,
  variants = DEFAULT_VARIANTS,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
}: MorphingPopoverProps) {
  const uniqueId = useId();
  const layoutId = `morphing-popover-${uniqueId}`;

  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? !!controlledOpen : uncontrolledOpen;

  const panelRef = useRef<HTMLDivElement | null>(null);

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(next);
      }
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  // Close on click outside of the panel when open.
  useClickOutside(panelRef, () => handleClose(), isOpen);

  // Close on Escape key.
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose]);

  const triggerRef = useRef<HTMLElement | null>(null);

  const handleTriggerRef = useCallback((node: HTMLElement | null) => {
    triggerRef.current = node;
  }, []);

  const renderTriggerNode = () => {
    // If a custom trigger renderer is provided, mirror the Popover API
    // and let the returned element control opening via the provided onClick.
    if (renderTrigger) {
      const rendered = renderTrigger({
        ref: handleTriggerRef,
        onClick: handleOpen,
      });

      if (!rendered) return null;

      if (React.isValidElement(rendered)) {
        const MotionComponent = motion.create(
          rendered.type as React.ComponentType<any>
        );
        const childProps = rendered.props as Record<string, any>;

        return (
          <MotionComponent
            {...childProps}
            layoutId={layoutId}
            onClick={(event: React.MouseEvent<any>) => {
              if (typeof childProps.onClick === "function") {
                childProps.onClick(event);
              }
              // Do not call handleOpen here; we expect the child's onClick
              // (wired via props.onClick) to manage open/close so we avoid
              // double-calling it.
            }}
          />
        );
      }

      // Fallback: wrap non-element custom triggers.
      return (
        <Box
          as={motion.div}
          layoutId={layoutId}
          onClick={handleOpen}
          {...triggerProps}
        >
          {rendered}
        </Box>
      );
    }

    // Default trigger path: use the provided trigger node and augment its
    // onClick to also open the popover.
    const rendered = trigger;

    if (!rendered) return null;

    if (React.isValidElement(rendered)) {
      const MotionComponent = motion.create(
        rendered.type as React.ComponentType<any>
      );
      const childProps = rendered.props as Record<string, any>;

      return (
        <MotionComponent
          {...childProps}
          layoutId={layoutId}
          onClick={(event: React.MouseEvent<any>) => {
            if (typeof childProps.onClick === "function") {
              childProps.onClick(event);
            }
            if (!event.defaultPrevented) {
              handleOpen();
            }
          }}
        />
      );
    }

    // Fallback: wrap non-element triggers.
    return (
      <Box
        as={motion.div}
        layoutId={layoutId}
        onClick={handleOpen}
        {...triggerProps}
      >
        {rendered}
      </Box>
    );
  };

  const { style: panelStyleFromProps, ...restPanelProps } = panelProps ?? {};

  const content =
    typeof children === "function"
      ? children({ close: handleClose })
      : children;

  const overlay = (
    <AnimatePresence>
      {isOpen && (
        <Box
          as={motion.div}
          key={`${layoutId}-overlay`}
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex="999999"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            as={motion.div}
            ref={panelRef}
            key={layoutId}
            layoutId={layoutId}
            role="dialog"
            aria-modal="true"
            id={`morphing-popover-panel-${uniqueId}`}
            shape="rounded"
            $shadow="medium"
            skin="surface"
            p="xsmall"
            style={panelStyleFromProps || {}}
            initial="initial"
            animate="animate"
            exit="exit"
            position={"relative"}
            zIndex={"1"}
            variants={variants}
            {...restPanelProps}
          >
            {content}
          </Box>
          <Underlay
            as={motion.div}
            width="100dvw"
            height="100dvh"
            color="transparent"
            top="0"
            left="0"
            position="fixed"
            zIndex="-1"
            initial="initial"
            animate="animate"
            exit="exit"
          />
        </Box>
      )}
    </AnimatePresence>
  );

  return (
    <MotionConfig transition={transition}>
      <Box position="relative" display="inline-flex" {...containerProps}>
        {renderTriggerNode()}
        {typeof window === "undefined"
          ? overlay
          : createPortal(overlay, document.body)}
      </Box>
    </MotionConfig>
  );
}
