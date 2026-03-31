"use client";
import Text, { TextProps } from "../../elements/text";
import { ThemeContext } from "styled-components";
import React, { useContext } from "react";

type HeadingElements = {
  title?: TextProps;
  subtitle?: TextProps;
  strap?: any;
  [key: string]: any;
};

type HeadingProps = TextProps & {
  children?: React.ReactNode;
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  strap?: any;
  meta?: React.ReactNode;
  elementProps?: HeadingElements;
  props?: any;
};

export default function Heading({
  children,
  title = "Page Title",
  subtitle,
  strap,
  meta,
  $size = "medium",
  color = "primary",
  elementProps = {},
  ...props
}: HeadingProps) {
  const theme: any = useContext(ThemeContext);

  const headingSize: any = {
    xsmall: {
      title: "medium",
      subtitle: "small",
    },
    small: {
      title: "large",
      subtitle: "small",
    },
    medium: {
      title: "xlarge",
      subtitle: "small",
    },
    large: {
      title: "xlarge",
      subtitle: "medium",
    },
    xlarge: {
      title: "xxlarge",
      subtitle: "medium",
    },
    xxlarge: {
      title: "xxxlarge",
      subtitle: "xlarge",
    },
    xxxlarge: {
      title: "xxxlarge",
      subtitle: "xlarge",
    },
  };

  return (
    <Text as="header" {...theme?.heading?.container} {...props}>
      {strap && (
        <Text
          as="div"
          m="0"
          fontSize={headingSize[$size].subtitle}
          fontWeight="600"
          color="secondary"
          {...theme?.heading?.strap}
          {...elementProps.strap}
        >
          {strap}
        </Text>
      )}
      <Text
        as="h1"
        m="0"
        fontSize={headingSize[$size].title}
        fontWeight="inherit"
        lineHeight="1.5"
        color={color}
        {...theme?.heading?.title}
        {...elementProps.title}
      >
        {title}
      </Text>
      {subtitle && (
        <Text
          as="p"
          m="0"
          fontSize={headingSize[$size].subtitle}
          fontWeight="400"
          color="tertiary"
          {...theme?.heading?.subtitle}
          {...elementProps.subtitle}
        >
          {subtitle}
        </Text>
      )}
      {meta && meta}
      {children}
    </Text>
  );
}
