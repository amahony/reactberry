"use client";
import React from "react";
import { Box, Text } from "../../elements";
import Icon from "../Icon";

interface PlaceholderProps {
  children?: React.ReactNode;
  icon?: string | React.ComponentType<any> | null;
  [key: string]: any;
  iconProps?: any;
}

const Placeholder: React.FC<PlaceholderProps> = ({
  children,
  icon = "IconDocFolder",
  iconProps,
  ...props
}) => {
  return (
    <Text
      as="div"
      display="flex"
      flexDirection={"column"}
      justifyContent="center"
      alignItems="center"
      fontSize="small"
      p="medium"
      gap="s"
      color="tertiary"
      {...props}
    >
      {typeof icon === "string" ? (
        <Box
          as={Icon}
          color={"palette.neutrals.7"}
          size="2.25rem"
          flex="none"
          icon={icon}
          {...iconProps}
        />
      ) : icon ? (
        <Box
          as={icon}
          color={"palette.neutrals.7"}
          size="2.25rem"
          flex="none"
          {...iconProps}
        />
      ) : null}

      {children ? <>{children}</> : null}
    </Text>
  );
};

export default Placeholder;
