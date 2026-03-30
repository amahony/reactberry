"use client";
import {
  BackgroundProps,
  BorderProps,
  ColorProps,
  FlexboxProps,
  GridProps,
  LayoutProps,
  PositionProps,
  ShadowProps,
  SpaceProps,
  background,
  border,
  color,
  compose,
  flexbox,
  grid,
  layout,
  position,
  shadow,
  space,
} from "styled-system";

import styled, { css } from "styled-components";
import {
  gap,
  skin,
  shape,
  aspect,
  cursor,
  hover,
  $size,
  focus,
  $shadow,
  disabled,
} from "./utils";

// Base interface that both Box and Text can use
export interface BaseElementProps
  extends ColorProps,
    SpaceProps,
    LayoutProps,
    PositionProps,
    BackgroundProps,
    BorderProps,
    FlexboxProps,
    GridProps,
    ShadowProps {
  children?: React.ReactNode;
  gap?: any;
  skin?: string;
  shape?: string;
  aspect?: number | number[] | string[] | {};
  cursor?: string;
  hover?: string | object;
  focus?: string | object;
  ref?: any;
  as?: any;
  $size?: any;
  $shadow?: string;
  disabled?: boolean | undefined;
  interactive?: {
    hover?: Record<string, any>;
    focus?: Record<string, any>;
    active?: Record<string, any>;
    disabled?: Record<string, any>;
    visited?: Record<string, any>;
    // Add any other interactive states you need
  };
  [key: string]: any;
}

// Box interface forbids typography props
export interface BoxProps extends BaseElementProps {}

const newArr: any = [];
const mergeResult = [newArr].concat(
  color.propNames,
  space.propNames,
  flexbox.propNames,
  layout.propNames,
  position.propNames,
  background.propNames,
  border.propNames,
  grid.propNames,
  shadow.propNames,
);

const processInteractiveStyles = (state: string, styles: any) => {
  return (props: any) => {
    const systemStyles = compose(
      color,
      space,
      layout,
      position,
      background,
      border,
      flexbox,
      grid,
      shadow,
      skin,
      shape,
      aspect,
      cursor,
      $size,
      $shadow,
    )({ ...props, ...styles });

    return css`
      &${`:${state}`} {
        ${systemStyles}
      }
    `;
  };
};

const Box = styled("div").withConfig({
  shouldForwardProp: (prop) =>
    ![
      ...mergeResult,
      "gap",
      "skin",
      "shape",
      "aspect",
      "cursor",
      "interactive",
    ].includes(prop),
})<BoxProps>`
  ${(props) => {
    return compose(
      color,
      space,
      layout,
      position,
      background,
      border,
      flexbox,
      grid,
      shadow,
      gap,
      skin,
      shape,
      aspect,
      cursor,
      $size,
      $shadow,
    )(props);
  }}
  &:hover {
    ${(p) => p.hover && hover}
  }
  &:focus,
  &:focus-within {
    ${(p) => p.focus && focus}
  }
  ${(p) => p.disabled && disabled}
  ${(p) =>
    p.interactive &&
    Object.entries(p.interactive).map(([state, styles]) =>
      processInteractiveStyles(state, styles),
    )}
`;
export default Box;
