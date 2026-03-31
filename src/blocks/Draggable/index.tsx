"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useDragControls } from "motion/react";
import { Box, Button, Text } from "../../elements";
import { IconMove3 } from "../../icons";
// import { IconCInfo } from "../../icons";
import { useLocalStorage } from "../../hooks/use-local-storage";

// PanelHeader Component
interface PanelHeaderProps {
  label: string;
  leftControls?: React.ReactNode;
  rightControls?: React.ReactNode;
  onPointerDown?: (e: React.PointerEvent) => void;
  style?: React.CSSProperties;
}

const PanelHeader: React.FC<PanelHeaderProps> = ({
  label = "Panel Label",
  leftControls,
  rightControls,
  onPointerDown,
  style,
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderBottom="1px solid"
      borderBottomColor="transparent.light.1"
      p="xsmall"
      flex="none"
      onPointerDown={onPointerDown}
      style={style}
    >
      <Box>{leftControls}</Box>
      <Text
        flex="auto"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {label}
      </Text>
      <Box style={{ pointerEvents: "auto" }}>{rightControls}</Box>
    </Box>
  );
};

// DraggablePanel Component
interface DraggablePanelProps {
  children: React.ReactNode;
  label?: string;
  parentRef: React.RefObject<HTMLDivElement>;
  topSafeZone?: number;
  safeZone?: {
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
  };
  initial?: { width?: string; maxHeight?: string; x?: number; y?: number };
  [key: string]: any;
}

const DraggablePanel: React.FC<DraggablePanelProps> = ({
  children,
  parentRef,
  label = "Panel",
  topSafeZone = 16,
  safeZone = { top: 16, left: 16, bottom: 16, right: 16 },
  initial = {
    width: "30rem",
    maxHeight: "40rem",
    x: 64,
    y: 64,
  },
  ...rest
}) => {
  const controls = useDragControls();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [constraints, setConstraints] = useState({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });

  // Default position for SSR
  const defaultPosition = {
    x: (initial.x || 0) + (safeZone.left || 0),
    y: (safeZone.top || 0) + (initial.y || 0),
  };

  // Persisted position (per label)
  const [storedPos, setStoredPos] = useLocalStorage<{ x: number; y: number }>(
    `draggable-pos-${label.toLowerCase().replace(/\s+/g, "-")}`,
    defaultPosition,
  );
  const [position, setPosition] = useState<{ x: number; y: number }>(
    defaultPosition,
  );

  const updateConstraints = () => {
    if (sidebarRef.current && parentRef.current) {
      const parentRect = parentRef.current.getBoundingClientRect();
      const sidebarRect = sidebarRef.current.getBoundingClientRect();
      const newConstraints = {
        top: safeZone.top || 0,
        left: safeZone.left || 0,
        right: parentRect.width - sidebarRect.width - (safeZone.right || 0),
        bottom: parentRect.height - sidebarRect.height - (safeZone.bottom || 0),
      };
      setConstraints(newConstraints);

      // Clamp current position inside new constraints (e.g. after resize)
      setPosition((prev) => {
        const clampedX = Math.min(
          Math.max(prev.x, newConstraints.left),
          newConstraints.right,
        );
        const clampedY = Math.min(
          Math.max(prev.y, newConstraints.top),
          newConstraints.bottom,
        );
        if (clampedX !== prev.x || clampedY !== prev.y) {
          const next = { x: clampedX, y: clampedY };
          setStoredPos(next);
          return next;
        }
        return prev;
      });
    }
  };

  useEffect(() => {
    updateConstraints();
    window.addEventListener("resize", updateConstraints);
    const resizeObserver = new ResizeObserver(updateConstraints);
    if (parentRef.current) {
      resizeObserver.observe(parentRef.current);
    }
    return () => {
      window.removeEventListener("resize", updateConstraints);
      resizeObserver.disconnect();
    };
  }, [parentRef, topSafeZone]);

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
    setPosition(storedPos);
  }, []);

  // Sync local state if stored position changes (external reset)
  useEffect(() => {
    if (mounted) {
      setPosition(storedPos);
    }
  }, [storedPos.x, storedPos.y, mounted]);

  return (
    <Box
      as={motion.div}
      ref={sidebarRef}
      position="absolute"
      top={0}
      left={0}
      width={initial.width || "30rem"}
      height="auto"
      maxHeight={initial.maxHeight || "40rem"}
      skin="translucent"
      shape="roundedLarge"
      $shadow="medium"
      overflow="hidden"
      display="flex"
      flexDirection="column"
      zIndex={99999}
      drag
      dragControls={controls}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={constraints}
      dragListener={false}
      initial={false}
      onDragStart={updateConstraints}
      onDragEnd={() => {
        if (sidebarRef.current && parentRef.current) {
          const parentRect = parentRef.current.getBoundingClientRect();
          const panelRect = sidebarRef.current.getBoundingClientRect();
          const x = panelRect.left - parentRect.left;
          const y = panelRect.top - parentRect.top;
          const clampedX = Math.min(
            Math.max(x, constraints.left),
            constraints.right,
          );
          const clampedY = Math.min(
            Math.max(y, constraints.top),
            constraints.bottom,
          );
          const next = { x: clampedX, y: clampedY };
          setPosition(next);
          setStoredPos(next);
        }
        updateConstraints();
      }}
      style={{
        pointerEvents: "auto",
        x: mounted ? position.x : defaultPosition.x,
        y: mounted ? position.y : defaultPosition.y,
      }}
      {...rest}
    >
      <PanelHeader
        label={label}
        leftControls={
          <Button
            $size="icon.xsmall"
            variant="ghost"
            style={{ pointerEvents: "none" }}
          >
            <IconMove3 width="16" height="16" />
          </Button>
        }
        rightControls={
          <Button $size="icon.xsmall" variant="ghost">
            {/*{ <IconCInfo width="16" height="16" />}*/}
          </Button>
        }
        onPointerDown={(e) => {
          e.preventDefault();
          controls.start(e);
        }}
        style={{ cursor: "grab", touchAction: "none", userSelect: "none" }}
      />
      {children}
    </Box>
  );
};

// DraggableContainer Component
interface DraggableContainerProps {
  children: React.ReactNode;
}

function DraggableContainer({ children }: DraggableContainerProps) {
  const parentRef = useRef<HTMLDivElement>(null!);

  return (
    <Box
      position="fixed"
      width="100vw"
      height="100vh"
      ref={parentRef}
      zIndex={9999}
      style={{ pointerEvents: "none" }}
    >
      <DraggablePanel parentRef={parentRef}>{children}</DraggablePanel>
    </Box>
  );
}

// Export all components
export { DraggableContainer, DraggablePanel, PanelHeader };
