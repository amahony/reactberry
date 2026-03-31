"use client";

import { designSystemIcons, type DesignSystemIconName } from "../../icons";
import { Box } from "../../elements";
import { useMemo } from "react";

interface IconComponentProps {
  icon: string;
  width?: string | number;
  height?: string | number;
  color?: string;
  size?: string | number | object;
  [key: string]: any;
}

const Icon: React.FC<IconComponentProps> = ({
  icon,
  width = "24px",
  height = "24px",
  size = "24px",
  color = "currentColor",
  ...props
}) => {
  const LazyIcon = useMemo(
    () => designSystemIcons[icon as DesignSystemIconName] ?? null,
    [icon],
  );

  if (!LazyIcon) {
    console.warn(`Icon ${icon} not found in design-system/icons`);
    return null;
  }

  return (
    <Box
      as={LazyIcon}
      width={size || width}
      height={size || height}
      color={color}
      {...props}
    />
  );
};

export default Icon;
