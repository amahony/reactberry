import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Box, Text } from "../../elements";
import { useMenu } from "./MenuContext";

interface MenuItem {
  documentId: string;
  title: string;
  path?: string;
  items?: MenuItem[];
  additionalFields?: {
    description?: string;
    divider?: boolean;
  };
  menuAttached?: boolean;
  order?: number;
}

interface MenuContentProps {
  items?: MenuItem[];
  children?: React.ReactNode;
  level?: number;
}

const transition = {
  duration: 0.15,
  ease: "easeInOut",
};

const MenuItems: React.FC<{ items: MenuItem[]; level: number }> = ({
  items,
  level,
}) => {
  return (
    <Box
      display="grid"
      gridTemplateColumns={
        level === 0 ? `repeat(${items.length}, 1fr)` : ` 1fr`
      }
      gap="small"
    >
      {items.map((item, index) => (
        <Box
          key={item.documentId}
          borderLeft={level === 0 && index > 0 ? "1px solid" : undefined}
          borderColor="transparent.light.1"
          pl={level === 0 && index > 0 ? "small" : undefined}
          width="100%"
          display="flex"
          flexDirection="column"
          gap="xxxsmall"
        >
          {item.items && item.items.length > 0 ? (
            // Category header with nested items
            <Box p="small" display="flex" flexDirection="column" gap="xxxsmall">
              <Text
                as="h6"
                color="tertiary"
                fontSize="small"
                fontWeight="600"
                m="0"
                style={{ cursor: "default" }}
              >
                {item.title}
              </Text>
              {item.additionalFields?.description && (
                <Text color="tertiary" fontSize="xsmall">
                  {item.additionalFields.description}
                </Text>
              )}

              <MenuItems items={item.items} level={level + 1} />
            </Box>
          ) : (
            // Regular link
            <Box
              as="a"
              href={item.path}
              display="flex"
              flexDirection="column"
              gap="xxxsmall"
              shape="rounded"
              p="xsmall"
              width={"100%"}
              minWidth={"15rem"}
              interactive={{
                hover: { bg: "transparent.light.0" },
              }}
            >
              <Text
                // as="a"
                // href={item.path}
                color="primary"
                fontSize="small"
                fontWeight="bold"
              >
                {item.title}
              </Text>
              {item.additionalFields?.description && (
                <Text color="tertiary" fontSize="xsmall">
                  {item.additionalFields.description}
                </Text>
              )}
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export const MenuContent: React.FC<MenuContentProps> = ({
  items,
  children,
  level = 0,
}) => {
  const { selected, dir } = useMenu();
  const [left, setLeft] = useState(0);
  //console.log("MenuContent rendered:", { items, selected, dir });
  useEffect(() => {
    if (selected) {
      const hoveredTab = document.getElementById(`shift-tab-${selected}`);
      const overlayContent = document.getElementById("overlay-content");

      if (!hoveredTab || !overlayContent) return;

      const tabRect = hoveredTab.getBoundingClientRect();
      const { left: contentLeft } = overlayContent.getBoundingClientRect();
      const tabCenter = tabRect.left + tabRect.width / 2 - contentLeft;

      setLeft(tabCenter);
    }
  }, [selected]);

  const getInitialX = () => {
    switch (dir) {
      case "left":
        return 20;
      case "right":
        return -20;
      case "initial":
        return 0;
      default:
        return 0;
    }
  };

  return (
    <Box
      as={motion.div}
      id="overlay-content"
      initial={{
        opacity: 0,
        y: dir === "initial" ? 10 : 0,
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: dir === "initial" ? 10 : 0,
        scale: 0.98,
      }}
      transition={transition}
      position="absolute"
      left="0"
      top="calc(100% + 0.75rem)"
      minWidth="25rem"
      width="40rem"
      p="xxsmall"
      border="1px solid"
      bg="overlay"
      borderColor="transparent.light.1"
      shape="roundedLarge"
      $shadow="large"
    >
      <Bridge />
      <Nub left={left} />
      <Box
        as={motion.div}
        p="xxsmall"
        border="1px solid"
        borderColor="transparent.light.1"
        bg="surface"
        shape="rounded"
      >
        <AnimatePresence mode="popLayout">
          <Box
            as={motion.div}
            key={selected}
            initial={{
              opacity: 0,
              x: getInitialX(),
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: 0,
            }}
            transition={{
              duration: 0.125,
              ease: "easeOut",
            }}
          >
            {items ? <MenuItems items={items} level={level} /> : children}
          </Box>
        </AnimatePresence>
      </Box>
    </Box>
  );
};
const Bridge = () => (
  <Box position="absolute" top="-16px" left="0" right="0" height="16px" />
);

const Nub = ({ left }: { left: number }) => {
  return (
    <Box
      as={motion.span}
      position="absolute"
      left="50%"
      top="0"
      width="1rem"
      height="1rem"
      style={{
        clipPath: "polygon(0 0, 100% 0, 50% 50%, 0% 100%)",
        transform: "translate(-50%, -50%) rotate(45deg)",
      }}
      animate={{ left: `${left}px` }}
      transition={transition}
      border="1px solid"
      bg="overlay"
      borderColor="transparent.light.1"
      borderRadius={"2px"}
    />
  );
};

export default MenuContent;
