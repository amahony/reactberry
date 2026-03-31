"use client";
import React, { useRef } from "react";
import { createPortal } from "react-dom";
import { Box, Button, Text } from "../../elements";
import { AnimatePresence, motion } from "motion/react";
import { IconEAdd, IconERemove } from "../../icons";
import { useSidebar } from "../../hooks/use-sidebar";
import { useOverlay } from "../../hooks/useOverlay";
import { Backdrop, OverscrollGuard } from "../Overlay";

interface DrawerProps {
  children: React.ReactNode;
  title?: string;
  id: string;
  width?: string | number | object;
  placement?: "left" | "right";
}

export const Drawer: React.FC<DrawerProps> = ({
  children,
  title = "Drawer",
  id,
  width = "350px",
  placement = "left",
}) => {
  const { isSidebarOpen, toggleSidebar } = useSidebar(id);
  const drawerRef = useRef<HTMLDivElement>(null);
  const { mounted, isStandalone } = useOverlay(isSidebarOpen);

  // Compute side-dependent positioning and animation
  const sidePositionProps =
    placement === "right"
      ? { right: 0 as const, left: undefined }
      : { left: 0 as const, right: undefined };

  const motionProps =
    placement === "right"
      ? { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" } }
      : { initial: { x: "-100%" }, animate: { x: 0 }, exit: { x: "-100%" } };

  if (!mounted) return null;

  const content = (
    <AnimatePresence>
      {isSidebarOpen && (
        <>
          <Backdrop
            bg="rgba(0, 0, 0, 0.5)"
            zIndex={10002}
            onClick={() => toggleSidebar()}
          />

          {/* Drawer */}
          <Box
            as={motion.div}
            ref={drawerRef}
            position="fixed"
            top="0"
            {...sidePositionProps}
            width={width}
            height="100dvh"
            bg="surface"
            skin="translucent"
            zIndex={10009}
            {...motionProps}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            $shadow="medium"
            display="flex"
            flexDirection="column"
            style={{
              paddingTop: isStandalone
                ? "env(safe-area-inset-top, 0px)"
                : undefined,
              paddingBottom: "env(safe-area-inset-bottom, 0px)",
            }}
          >
            {/* Header */}
            <Box
              pt="small"
              px="medium"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text fontSize="medium" fontWeight="bold" color="primary">
                {title}
              </Text>
              <Button
                onClick={() => toggleSidebar()}
                variant="ghost"
                $size="icon.xsmall"
                aria-label="Close drawer"
              >
                <Box as={IconERemove} size="1.25rem" />
              </Button>
            </Box>
            {children}
          </Box>

          <OverscrollGuard />
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(content, document.body);
};

export const DrawerButton: React.FC<{
  drawerId: string;
  label?: string;
  icon?: React.ReactNode;
  [key: string]: any;
}> = ({
  drawerId,
  label = "Open",
  icon = <Box as={IconEAdd} size="1rem" />,
  ...props
}) => {
  const { isSidebarOpen, toggleSidebar } = useSidebar(drawerId);

  return (
    <Button
      variant={isSidebarOpen ? "primary" : "ghost"}
      $size="xxsmall"
      onClick={() => toggleSidebar()}
      display="flex"
      alignItems="center"
      gap="xxsmall"
      {...props}
    >
      {icon}
      <Text display={{ _: "none", md: "initial" }}>{label}</Text>
    </Button>
  );
};
