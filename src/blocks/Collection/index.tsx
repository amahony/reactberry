"use client";
import Box, { BoxProps } from "../../elements/box";
import { ThemeContext } from "styled-components";
import { useContext } from "react";

type CollectionProps = BoxProps & {
  colsize?: string;
  children: React.ReactNode;
  [key: string]: any;
};

export default function Collection({
  colsize = "small",
  children,
  ...props
}: CollectionProps) {
  const theme: any = useContext(ThemeContext);

  const colSizes: any = {
    xsmall: {
      _: "repeat(auto-fill,minmax(6rem,1fr))",
      sm: "repeat(auto-fill,minmax(10rem,1fr))",
    },
    small: {
      _: "repeat(auto-fill,minmax(10rem,1fr))",
      md: "repeat(auto-fill,minmax(12rem,1fr))",
    },
    medium: {
      _: "repeat(auto-fill,minmax(auto,1fr))",
      md: "repeat(auto-fill,minmax(18rem,1fr))",
    },
    large: { _: "repeat(auto-fill,minmax(20rem,1fr))" },
    xlarge: {
      _: "repeat(auto-fill,minmax(20rem,1fr))",
      sm: "repeat(auto-fill,minmax(25rem,1fr))",
    },
    xxlarge: {
      _: "repeat(auto-fill,minmax(30rem,1fr))",
    },
    auto: {
      _: "repeat(auto-fill,minmax(50cqb,1fr))",
    },
    row: {
      _: "1fr",
    },
  };

  return (
    <Box
      display="grid"
      gap="small"
      gridTemplateColumns={colSizes[colsize]}
      {...theme?.collection}
      {...props}
    >
      {children}
    </Box>
  );
}
