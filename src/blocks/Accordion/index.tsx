"use client";
import { Box } from "../../elements";
import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import { useLocalStorage } from "../../hooks/use-local-storage";

import { IconArrowSmDown } from "../../icons";
import Group from "../Group";

interface AccordionItem {
  id: string;
  trigger: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
  /** Hide the toggle icon and make the row static (no expand/collapse). */
  hideIcon?: boolean;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpen?: string[];
  onToggle?: (itemId: string, isOpen: boolean, openItems: string[]) => void;
  fontSize?: string;
  spacing?: string;
  persistKey?: string;
  iconPosition?: "start" | "end";
  /** Icon rendered in the trigger (defaults to a downward chevron). */
  icon?: React.ElementType;
  /** Size of the trigger icon, passed to Box's `size` (defaults to "1.75em"). */
  iconSize?: string | number;
  containerProps?: {
    [key: string]: any;
  };
  itemProps?: {
    [key: string]: any;
  };
  headerProps?: {
    [key: string]: any;
  };
  [key: string]: any;
}

const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = true,
  defaultOpen = [],
  onToggle,
  persistKey,
  iconPosition = "end",
  icon: Icon = IconArrowSmDown,
  iconSize = "1.75em",
  containerProps = {},
  itemProps = {},
  headerProps = {},
}) => {
  const [persistedOpenItems, setPersistedOpenItems] = useLocalStorage<string[]>(
    persistKey ? `accordion-${persistKey}` : "",
    defaultOpen
  );

  const [openItems, setOpenItems] = useState<Set<string>>(() => {
    return new Set(persistKey ? persistedOpenItems : defaultOpen);
  });

  const handleToggle = (itemId: string) => {
    const item = items.find((item) => item.id === itemId);
    if (item?.disabled) return;

    setOpenItems((prevOpenItems) => {
      const newOpenItems = new Set(prevOpenItems);
      const isCurrentlyOpen = newOpenItems.has(itemId);

      if (isCurrentlyOpen) {
        newOpenItems.delete(itemId);
      } else {
        if (!allowMultiple) {
          newOpenItems.clear();
        }
        newOpenItems.add(itemId);
      }

      const openItemsArray = Array.from(newOpenItems);
      onToggle?.(itemId, !isCurrentlyOpen, openItemsArray);

      // Persist to localStorage if persistKey is provided
      if (persistKey) {
        setPersistedOpenItems(openItemsArray);
      }

      return newOpenItems;
    });
  };

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection={"column"}
      {...containerProps}
    >
      {items.map((item) => {
        const isOpen = openItems.has(item.id);
        const isDisabled = item.disabled;
        const isStatic = item.hideIcon;

        return (
          <Box
            key={item.id}
            as={motion.div}
            opacity={isDisabled ? 0.5 : 1}
            {...itemProps}
          >
            <Box
              width="100%"
              cursor={
                isStatic ? "default" : isDisabled ? "not-allowed" : "pointer"
              }
              display="flex"
              alignItems="center"
              justifyContent={"space-between"}
              gap="mini"
              disabled={isDisabled}
              onClick={isStatic ? undefined : () => handleToggle(item.id)}
              {...headerProps}
            >
              <Group
                as={motion.div}
                justifyContent="center"
                flex="none"
                order={iconPosition === "start" ? 0 : 1}
                style={isStatic ? { pointerEvents: "none" } : undefined}
                animate={{
                  rotate: isOpen
                    ? iconPosition === "start"
                      ? 0
                      : 180
                    : iconPosition === "start"
                      ? -90
                      : 0,
                  opacity: isStatic ? 0 : isOpen ? 1 : 0.5,
                }}
                transition={{ duration: 0.1 }}
              >
                <Box as={Icon} size={iconSize} />
              </Group>
              <Box flex="1" order={iconPosition === "start" ? 1 : 0}>
                {item.trigger}
              </Box>
            </Box>

            <AnimatePresence mode="sync">
              {isOpen && !isStatic && (
                <Box
                  as={motion.div}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                  }}
                >
                  {item.content}
                </Box>
              )}
            </AnimatePresence>
          </Box>
        );
      })}
    </Box>
  );
};

export default Accordion;
