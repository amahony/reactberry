"use client";
import Box, { BoxProps } from "../../elements/box";
import Text from "../../elements/text";
import Divider from "../Divider";
import React from "react";
import { IconDotsAnim } from "../../icons";

interface SystemNoticeProps extends BoxProps {
  message: React.ReactNode;
  loading?: boolean;
  showBreaks?: boolean;
  colorSchema?: "default" | "warning" | "success" | "error" | "info" | string;
  icon?: React.ReactNode;
  [key: string]: any; // Allow any additional props
}

export default function SystemNotice({
  message,
  loading = false,
  showBreaks = false,
  colorSchema = "default",
  icon,
  ...props
}: SystemNoticeProps) {
  const schemaStyles = {
    default: {
      skin: "panel",
      color: "secondary",
    },
    success: {
      skin: "success.subtle",
      color: "primary",
    },
    error: {
      skin: "error.subtle",
      color: "primary",
    },
    info: {
      skin: "info.subtle",
      color: "primary",
    },
    warning: {
      skin: "warning.subtle",
      color: "palette.yellows.10",
    },
  };

  const currentSchema =
    schemaStyles[colorSchema as keyof typeof schemaStyles] ||
    schemaStyles.default;

  return (
    <>
      {showBreaks && <Divider />}
      <Text
        as="div"
        p="s"
        my="xs"
        shape="rounded"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flex="none"
        fontSize="s"
        textAlign="center"
        fontWeight="medium"
        {...currentSchema}
        {...props}
      >
        {loading && <IconDotsAnim width="1rem" height="1rem" />}
        {icon && !loading && (
          <Box as="span" mr="xs" display="flex" alignItems="center">
            {icon}
          </Box>
        )}
        <Text color="inherit">{message}</Text>
      </Text>
      {showBreaks && <Divider />}
    </>
  );
}
