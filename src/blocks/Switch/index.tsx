"use client";

import { Box, Text } from "../../elements";
import { Switch as HeadlessSwitch } from "@headlessui/react";
import { motion } from "motion/react";

const Switch: React.FC<{
  value?: boolean;
  onChange?: (newValue: boolean) => void;
  label?: string;
  help?: string;
  [key: string]: any; // Allow any additional props
}> = ({ value = false, onChange, label = "", help, ...props }) => {
  const handleToggle = () => {
    onChange?.(!value);
  };

  const showLabel = Boolean(label);
  const showHelp = Boolean(help);

  return (
    <Text
      as="div"
      display="flex"
      gap="small"
      alignItems="center"
      width="100%"
      justifyContent="space-between"
      cursor="pointer"
      onClick={handleToggle}
      {...props}
    >
      {(showLabel || showHelp) && (
        <Box display="flex" flexDirection={"column"} gap="mini">
          {showLabel && (
            <Text fontSize={"inherit"} color="primary" fontWeight="600">
              {label}
            </Text>
          )}
          {showHelp && (
            <Text fontSize={"xsmall"} color="secondary">
              {help}
            </Text>
          )}
        </Box>
      )}
      <input
        type="checkbox"
        checked={value}
        onChange={handleToggle}
        style={{ display: "none" }}
      />
      <Box
        as={HeadlessSwitch}
        checked={value}
        shape="pill"
        bg={value ? "brand" : "palette.neutrals.8"}
        position="relative"
        display="inline-flex"
        alignItems="center"
        width="2.5rem"
        aspect={"2.5/1"}
        // height="1.5rem"
        cursor="pointer"
        border="none"
        p="0"
        role="checkbox"
        aria-checked={value}
        tabIndex={0}
      >
        <Box
          as={motion.div}
          animate={{ x: value ? "1.125rem" : "0" }}
          height="100%"
          aspect="1.5/1"
          bg="white"
          border="1px solid"
          borderColor={value ? "brand" : "palette.neutrals.9"}
          shape="pill"
          $shadow="medium"
          position="absolute"
        />
      </Box>
    </Text>
  );
};
export default Switch;
