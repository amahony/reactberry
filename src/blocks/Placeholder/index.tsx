"use client";
import React from "react";
import { Box, Text } from "../../elements";
import Icon from "../Icon";

interface PlaceholderProps {
  children?: React.ReactNode;
  icon?: string;
  [key: string]: any;
  iconProps?: any;
}

const Placeholder: React.FC<PlaceholderProps> = ({
  children,
  icon = "IconEmpty",
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
      {...props}
      color="tertiary"
    >
      {icon && (
        <Box
          as={Icon}
          color={"palette.neutrals.7"}
          size="2.25rem"
          flex="none"
          icon={icon}
          {...iconProps}
        />
      )}

      {children ? <>{children}</> : null}
    </Text>
  );
};

export default Placeholder;
