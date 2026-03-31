import React, { useState, useContext } from "react";
import { motion } from "motion/react";
import { Box, Text } from "../../elements";
import { useMenu } from "./MenuContext";
import Link from "next/link";
import { ThemeContext } from "styled-components";

interface MenuItemProps {
  id: string | number;
  title: string;
  path?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  id,
  title,
  path,
  children,
  disabled,
}) => {
  const { selected, setSelected, setDir } = useMenu();
  const [isHovered, setIsHovered] = useState(false);
  const theme: any = useContext(ThemeContext);
  const handleSelect = () => {
    if (!children) {
      setSelected(null);
      return;
    }

    if (selected === null) {
      setDir("initial");
    } else {
      setDir(selected > id ? "right" : "left");
    }
    setSelected(id);
  };

  return (
    <Box
      position="relative"
      px="small"
      py="xxsmall"
      display="flex"
      alignItems="center"
      cursor="pointer"
      flex="none"
      onClick={handleSelect}
      onMouseEnter={() => {
        setIsHovered(true);
        handleSelect();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      disabled={disabled}
    >
      {path ? (
        <Text
          as={Link}
          href={path}
          id={`shift-tab-${id}`}
          cursor="pointer"
          textDecoration="none"
          color={isHovered ? "base" : "primary"}
          interactive={{ hover: { color: "base" } }}
          fontSize="small"
          fontWeight="600"
          onMouseEnter={() => setSelected(null)}
        >
          {title}
        </Text>
      ) : (
        <Text
          id={`shift-tab-${id}`}
          color={selected === id || isHovered ? "base" : "primary"}
          fontSize="small"
          fontWeight="600"
        >
          {title}
        </Text>
      )}

      {(selected === id || isHovered) && (
        <Box
          as={motion.div}
          layout
          layoutId="menu-item"
          bg="brand"
          position="absolute"
          width="100%"
          height="100%"
          top="0"
          left="0"
          shape="pill"
          zIndex={-1}
          transition={{ duration: 0.15, ease: "easeInOut" }}
          {...theme?.header?.public?.menu?.item?.highlight}
        />
      )}
    </Box>
  );
};
