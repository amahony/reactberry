"use client";
import { variant, compose } from "styled-system";
import styled from "styled-components";
import Text, { TextProps } from "./text";
import { disabled } from "./utils";

export interface ButtonProps extends TextProps {
  children?: React.ReactNode;
  variant?: string;
  $size?: string;
  disabled?: boolean;
}

const buttonStyle = variant({
  key: "skins.button",
  prop: "variant",
});

const buttonSize = variant({
  key: "skins.button.sizes",
  prop: "$size",
});

const Button = styled(Text).attrs<ButtonProps>((props) => ({
  role: "button",
  border: "none",
  $size: "medium",
  shape: "rounded",
  variant: "default",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  tabIndex: 0,
  ...props,
}))<ButtonProps>`
  transition: 0.2s ease;

  /* Prevent text jiggling during scale animations */
  will-change: transform;
  backface-visibility: hidden;
  -webkit-font-smoothing: subpixel-antialiased;
  transform-style: preserve-3d;

  ${compose(buttonStyle, buttonSize)}
  ${(p) => p.disabled && disabled}
`;

export default Button;
