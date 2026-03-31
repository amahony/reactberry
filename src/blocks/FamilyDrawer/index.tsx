"use client";

import React, { useState, useMemo } from "react";
import { Box, Button, Text } from "../../elements";
import { Drawer, DrawerButton } from "../Drawer";
import { AnimatePresence, motion } from "motion/react";
import { IconGear } from "../../icons";
import useMeasure from "react-use-measure";

import { DefaultView } from "./views/DefaultView";
import { KeyView } from "./views/KeyView";
import { PhraseView } from "./views/PhraseView";
import { RemoveView } from "./views/RemoveView";

export type FamilyDrawerView = "default" | "key" | "phrase" | "remove";

interface FamilyDrawerProps {
  /** Unique identifier for the drawer */
  id: string;
  /** Initial view to display */
  initialView?: FamilyDrawerView;
  /** Custom trigger button */
  trigger?: React.ReactNode;
  /** Callback when view changes */
  onViewChange?: (view: FamilyDrawerView) => void;
  /** Custom drawer width */
  width?: string | number | object;
}

export const FamilyDrawer: React.FC<FamilyDrawerProps> = ({
  id,
  initialView = "default",
  trigger,
  onViewChange,
  width = "360px",
}) => {
  const [view, setView] = useState<FamilyDrawerView>(initialView);
  const [elementRef, bounds] = useMeasure();

  const handleViewChange = (newView: FamilyDrawerView) => {
    setView(newView);
    onViewChange?.(newView);
  };

  const content = useMemo(() => {
    const commonProps = { setView: handleViewChange };
    
    switch (view) {
      case "default":
        return <DefaultView {...commonProps} />;
      case "phrase":
        return <PhraseView {...commonProps} />;
      case "key":
        return <KeyView {...commonProps} />;
      case "remove":
        return <RemoveView {...commonProps} />;
      default:
        return <DefaultView {...commonProps} />;
    }
  }, [view]);

  const defaultTrigger = (
    <Button
      variant="ghost"
      $size="medium"
      display="flex"
      alignItems="center"
      gap="small"
      shape="rounded"
      skin="translucent"
    >
      <Text fontSize="medium" fontWeight="semibold">
        Settings
      </Text>
      <Box as={IconGear} size="1.25rem" />
    </Button>
  );

  return (
    <>
      <DrawerButton drawerId={id} label="">
        {trigger || defaultTrigger}
      </DrawerButton>
      
      <Drawer id={id} title="Options" width={width}>
        <Box
          as={motion.div}
          animate={{ height: bounds.height || "auto" }}
          transition={{
            type: "tween",
            ease: [0.26, 1, 0.5, 1],
            duration: 0.27,
          }}
          overflow="hidden"
        >
          <Box ref={elementRef} p="medium">
            <AnimatePresence mode="wait" initial={false}>
              <Box
                as={motion.div}
                key={view}
                initial={{ opacity: 0, scale: 0.96, filter: "blur(2px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.96, filter: "blur(2px)" }}
                transition={{
                  duration: 0.27,
                  ease: [0.26, 0.08, 0.25, 1],
                }}
              >
                {content}
              </Box>
            </AnimatePresence>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default FamilyDrawer;
