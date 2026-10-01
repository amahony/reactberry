"use client";

import React, { cloneElement, isValidElement, useState } from "react";
import { Box, Button, Text } from "../../elements";
import { Drawer } from "../Drawer";
import { useSidebar } from "../../hooks/use-sidebar";
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
  /** Private key shown in the key view after "Reveal" is pressed */
  privateKey?: string;
  /** Recovery phrase shown in the phrase view after "Reveal" is pressed */
  recoveryPhrase?: string;
  /** Callback when "Reveal" is pressed in the key or phrase view */
  onReveal?: (view: "key" | "phrase") => void;
  /** Callback when removal is confirmed in the remove view */
  onRemove?: () => void;
}

export const FamilyDrawer: React.FC<FamilyDrawerProps> = ({
  id,
  initialView = "default",
  trigger,
  onViewChange,
  width = "360px",
  privateKey,
  recoveryPhrase,
  onReveal,
  onRemove,
}) => {
  const [view, setView] = useState<FamilyDrawerView>(initialView);
  const [elementRef, bounds] = useMeasure();
  const { toggleSidebar } = useSidebar(id);

  const handleViewChange = (newView: FamilyDrawerView) => {
    setView(newView);
    onViewChange?.(newView);
  };

  const handleRemove = () => {
    onRemove?.();
    handleViewChange("default");
    toggleSidebar();
  };

  let content: React.ReactNode;
  switch (view) {
    case "phrase":
      content = (
        <PhraseView
          setView={handleViewChange}
          secret={recoveryPhrase}
          onReveal={() => onReveal?.("phrase")}
        />
      );
      break;
    case "key":
      content = (
        <KeyView
          setView={handleViewChange}
          secret={privateKey}
          onReveal={() => onReveal?.("key")}
        />
      );
      break;
    case "remove":
      content = <RemoveView setView={handleViewChange} onConfirm={handleRemove} />;
      break;
    default:
      content = <DefaultView setView={handleViewChange} />;
  }

  const triggerElement = isValidElement<{ onClick?: (event: React.MouseEvent) => void }>(trigger) ? (
    cloneElement(trigger, {
      onClick: (event: React.MouseEvent) => {
        trigger.props.onClick?.(event);
        toggleSidebar();
      },
    })
  ) : (
    <Button
      variant="ghost"
      $size="medium"
      display="flex"
      alignItems="center"
      gap="small"
      shape="rounded"
      skin="translucent"
      onClick={() => toggleSidebar()}
    >
      {trigger ?? (
        <>
          <Text fontSize="medium" fontWeight="semibold">
            Settings
          </Text>
          <Box as={IconGear} size="1.25rem" />
        </>
      )}
    </Button>
  );

  return (
    <>
      {triggerElement}

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
