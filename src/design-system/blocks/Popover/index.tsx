"use client";
import { Box, Button } from "@/design-system/elements";
import {
  Popover as HeadlessPopover,
  PopoverPanel,
  PopoverButton,
  Portal,
} from "@headlessui/react";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  type Placement as FloatingPlacement,
} from "@floating-ui/react";
import { AnimatePresence, motion } from "motion/react";
import { forwardRef, useState, useRef, useEffect } from "react";
import type { HTMLMotionProps } from "motion/react";

const MotionBox = forwardRef<HTMLDivElement, HTMLMotionProps<"div"> & any>(
  function MotionBox(props, ref) {
    return <Box as={motion.div} ref={ref} {...props} />;
  }
);

MotionBox.displayName = "MotionBox";

type PanelProps = {
  children: React.ReactNode;
  usePortal?: boolean;
  panelRef?: (node: HTMLDivElement | null) => void;
  floatingStyles?: React.CSSProperties;
  [key: string]: any;
};

function Panel({
  children,
  usePortal = false,
  panelRef,
  floatingStyles,
  ...props
}: PanelProps) {
  const { style: styleFromProps, ...restProps } = props;
  const combinedStyles = {
    ...(floatingStyles || {}),
    ...(styleFromProps || {}),
  };

  const panelContent = (
    <PopoverPanel
      static
      as={MotionBox}
      ref={panelRef}
      {...restProps}
      style={combinedStyles}
    >
      {children}
    </PopoverPanel>
  );

  return usePortal ? <Portal>{panelContent}</Portal> : panelContent;
}

const normalizePlacement = (placement: string): FloatingPlacement => {
  const trimmed = placement.trim();
  // Support both "bottom start" and "bottom-start" style values
  return trimmed.replace(/\s+/g, "-") as FloatingPlacement;
};

function mergeRefs<T = any>(
  ...refs: Array<
    ((instance: T | null) => void) | { current: T | null } | null | undefined
  >
) {
  return (value: T | null) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === "function") {
        ref(value);
      } else {
        (ref as { current: T | null }).current = value;
      }
    });
  };
}

type PopoverProps = {
  children?:
    | React.ReactNode
    | ((props: { close: () => void; open: boolean }) => React.ReactNode);
  trigger?: string | React.ReactNode;
  placement?: string;
  triggerProps?: any;
  containerProps?: any;
  panelProps?: any;
  triggerMode?: "click" | "hover";
  hoverDelay?: number; // Delay in ms before showing/hiding on hover
  usePortal?: boolean; // Whether to render the popover in a portal
  scrollContainer?: HTMLElement | null; // Optional scroll container that should close the popover on scroll
  renderTrigger?: (props: {
    ref: (node: HTMLElement | null) => void;
    onClick?: () => void;
  }) => React.ReactNode; // Custom trigger renderer for full control
  onOpenChange?: (isOpen: boolean) => void; // Callback when popover open state changes
};

export default function Popover({
  children,
  trigger,
  triggerProps,
  placement = "bottom end",
  containerProps,
  panelProps,
  triggerMode = "click",
  hoverDelay = 200,
  usePortal = false, // Default to not using portal
  scrollContainer = null,
  renderTrigger,
  onOpenChange,
}: PopoverProps) {
  const [isHovering, setIsHovering] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const isOpenRef = useRef(false);
  const prevOpenRef = useRef(false);

  const normalizedPlacement = normalizePlacement(placement);

  const { refs, x, y, strategy } = useFloating({
    placement: normalizedPlacement,
    middleware: [offset(4), flip(), shift({ padding: 8 })],
    strategy: usePortal ? "fixed" : "absolute",
    whileElementsMounted: autoUpdate,
  });

  const floatingStyles: React.CSSProperties = {
    position: strategy,
    top: y ?? 0,
    left: x ?? 0,
  };

  const triggerRefProp = triggerProps?.ref;
  const { ref: containerRefProp, ...restContainerProps } = containerProps ?? {};

  useEffect(() => {
    // For hover-triggered popovers without an explicit scrollContainer,
    // we do NOT auto-close on window scroll. This avoids flicker when
    // the page scrolls or reflows right as the user hovers.
    if (triggerMode === "hover" && !scrollContainer) {
      return;
    }

    const handleScroll = () => {
      if (triggerMode === "hover") {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        setIsHovering(false);
      } else {
        if (isOpenRef.current && buttonRef.current) {
          // Close the popover by toggling the trigger button
          buttonRef.current.click();
        }
      }
    };

    const target: HTMLElement | Window = scrollContainer ?? window;
    target.addEventListener("scroll", handleScroll as EventListener, {
      passive: true,
    });

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      target.removeEventListener("scroll", handleScroll as EventListener);
    };
  }, [triggerMode, scrollContainer]);

  // Handle mouse enter
  const handleMouseEnter = () => {
    if (triggerMode !== "hover") return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsHovering(true);
    }, hoverDelay);
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    if (triggerMode !== "hover") return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsHovering(false);
    }, hoverDelay);
  };

  // Click mode popover
  if (triggerMode === "click") {
    return (
      <Box as={HeadlessPopover} position="relative" {...restContainerProps}>
        {({ open, close }: { open: boolean; close: () => void }) => {
          isOpenRef.current = open;
          // Notify parent of open state changes synchronously
          if (prevOpenRef.current !== open) {
            prevOpenRef.current = open;
            onOpenChange?.(open);
          }
          return (
            <>
              {renderTrigger ? (
                // Custom trigger renderer - gives full control to the consumer
                <PopoverButton
                  as="div"
                  style={{ outline: "none" }}
                  ref={mergeRefs(buttonRef, refs.setReference, triggerRefProp)}
                >
                  {renderTrigger({
                    ref: () => {
                      // Additional ref handling if needed
                    },
                  })}
                </PopoverButton>
              ) : (
                // Default trigger wrapper
                <Button
                  as={PopoverButton}
                  style={{ outline: "none" }}
                  p="0"
                  display="flex"
                  alignItems="center"
                  variant="ghost"
                  $size="none"
                  //{...(open && { variant: "default" })}
                  {...triggerProps}
                  ref={mergeRefs(buttonRef, refs.setReference, triggerRefProp)}
                >
                  {trigger}
                </Button>
              )}

              <AnimatePresence>
                {open && (
                  <Panel
                    usePortal={usePortal}
                    panelRef={refs.setFloating}
                    floatingStyles={floatingStyles}
                    initial={{
                      opacity: 0,
                      ...(normalizedPlacement.startsWith("right")
                        ? { x: -10 }
                        : normalizedPlacement.startsWith("left")
                          ? { x: 10 }
                          : normalizedPlacement.startsWith("top")
                            ? { y: 10 }
                            : { y: -10 }),
                    }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    exit={{
                      opacity: 0,
                      ...(normalizedPlacement.startsWith("right")
                        ? { x: -10 }
                        : normalizedPlacement.startsWith("left")
                          ? { x: 10 }
                          : normalizedPlacement.startsWith("top")
                            ? { y: 10 }
                            : { y: 10 }),
                    }}
                    transition={{ duration: 0.1 }}
                    p="xsmall"
                    shape="rounded"
                    width="15rem"
                    $shadow="medium"
                    zIndex="999999"
                    skin="translucent"
                    {...panelProps}
                  >
                    {typeof children === "function"
                      ? children({ close, open })
                      : children}
                  </Panel>
                )}
              </AnimatePresence>
            </>
          );
        }}
      </Box>
    );
  }

  // For hover mode popover, we'll use a custom implementation
  // but still leverage Headless UI's Portal if needed
  return (
    <Box
      as="div"
      position="relative"
      ref={mergeRefs(containerRef, refs.setReference, containerRefProp)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...restContainerProps}
    >
      {trigger}

      <AnimatePresence>
        {isHovering &&
          (usePortal ? (
            <Portal>
              <MotionBox
                ref={refs.setFloating}
                initial={{
                  opacity: 0,
                  ...(normalizedPlacement.startsWith("right")
                    ? { x: -10 }
                    : normalizedPlacement.startsWith("left")
                      ? { x: 10 }
                      : normalizedPlacement.startsWith("top")
                        ? { y: 10 }
                        : { y: -10 }),
                }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{
                  opacity: 0,
                  ...(normalizedPlacement.startsWith("right")
                    ? { x: -10 }
                    : normalizedPlacement.startsWith("left")
                      ? { x: 10 }
                      : normalizedPlacement.startsWith("top")
                        ? { y: 10 }
                        : { y: 10 }),
                }}
                transition={{ duration: 0.1 }}
                p="xsmall"
                shape="rounded"
                width="15rem"
                $shadow="medium"
                skin="translucent"
                zIndex="999999"
                {...panelProps}
                style={{
                  ...floatingStyles,
                  ...(panelProps?.style || {}),
                }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {children}
              </MotionBox>
            </Portal>
          ) : (
            <MotionBox
              ref={refs.setFloating}
              initial={{
                opacity: 0,
                ...(normalizedPlacement.startsWith("right")
                  ? { x: -10 }
                  : normalizedPlacement.startsWith("left")
                    ? { x: 10 }
                    : normalizedPlacement.startsWith("top")
                      ? { y: 10 }
                      : { y: -10 }),
              }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{
                opacity: 0,
                ...(normalizedPlacement.startsWith("right")
                  ? { x: -10 }
                  : normalizedPlacement.startsWith("left")
                    ? { x: 10 }
                    : normalizedPlacement.startsWith("top")
                      ? { y: 10 }
                      : { y: 10 }),
              }}
              transition={{ duration: 0.1 }}
              skin="translucent"
              p="xsmall"
              shape="rounded"
              width="15rem"
              $shadow="medium"
              zIndex="999999"
              {...panelProps}
              style={{
                ...floatingStyles,
                ...(panelProps?.style || {}),
              }}
            >
              {children}
            </MotionBox>
          ))}
      </AnimatePresence>
    </Box>
  );
}
