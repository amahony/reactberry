"use client";
import Box, { BoxProps } from "../../elements/box";
import { ThemeContext } from "styled-components";
import React, { useContext } from "react";

export default function Main({
  children,
  ...props
}: { children: React.ReactNode; props?: any } & BoxProps) {
  const theme: any = useContext(ThemeContext);

  return (
    <Box {...theme?.main} {...props}>
      {children}
    </Box>
  );
}
