"use client";
import Box from "@/design-system/elements/box";
import Text from "@/design-system/elements/text";
import { BoxProps } from "@/design-system/elements/box";
import React from "react";
import { IconERemove } from "@/design-system/icons";
import { Button } from "@/design-system/elements";

interface ToastProps extends BoxProps {
  message: React.ReactNode;
  description?: string;
  variant?: "default" | "success" | "error" | "info" | "warning";
  icon?: React.ReactNode;
  onClose?: () => void;
}

export default function Toast({
  message,
  description,
  variant = "default",
  icon,
  onClose,
  ...props
}: ToastProps) {
  const variantStyles = {
    default: { skin: "translucent", color: "palette.grays.11" },
    success: { bg: "palette.greens.0", color: "palette.greens.11" },
    error: { bg: "palette.reds.0", color: "palette.reds.11" },
    info: { bg: "palette.brands.0", color: "palette.brands.11" },
    warning: { bg: "palette.yellows.0", color: "palette.yellows.11" },
  };

  const currentStyle = variantStyles[variant];

  return (
    <Box
      display="flex"
      alignItems="center"
      gap="xs"
      p="s"
      py="xs"
      shape="rounded"
      width="22.5rem"
      boxShadow="rgba(0, 0, 0, 0.125) 0px 4px 12px"
      {...currentStyle}
      {...props}
    >
      {icon && (
        <Box display="flex" alignItems="center" pl="xxxs">
          {icon}
        </Box>
      )}
      <Box display="flex" flexDirection="column" gap="xxs" flex="auto">
        <Text fontSize="13px" fontWeight="500" color="inherit">
          {message}
        </Text>
        {description && (
          <Text fontSize="xs" color="inherit" opacity={0.8}>
            {description}
          </Text>
        )}
      </Box>
      {onClose && (
        <Button
          as="button"
          onClick={onClose}
          shape="circle"
          $size="icon.xsmall"
          variant="ghost.dim"
          flex="none"
        >
          <Text as={IconERemove} size="0.875rem" color="inherit"></Text>
        </Button>
      )}
    </Box>
  );
}
