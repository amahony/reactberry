"use client";
import { typography, TypographyProps, compose } from "styled-system";
import styled from "styled-components";
import Box, { BaseElementProps } from "./box";
import {
  textTransform,
  textDecoration,
  textOverflow,
  truncate,
  lineClamp,
  disabled,
} from "./utils";

export interface TextProps extends BaseElementProps, TypographyProps {
  children?: React.ReactNode;
  truncate?: boolean;
  textTransform?: string;
  textDecoration?: string;
  lineClamp?: number;
}

const newArr: any = [];
const mergeResult = [newArr].concat(typography.propNames);

const Text = styled(Box)
  .withConfig({
    shouldForwardProp: (prop) =>
      ![
        ...mergeResult,
        "textTransform",
        "textDecoration",
        "textOverflow",
        "truncate",
        "lineClamp",
      ].includes(prop),
  })
  .attrs<TextProps>((props) => ({
    as: "span",
    ...props,
  }))<TextProps>`
  ${(p) => (p.truncate ? truncate : null)}
  ${(p) => (p.lineClamp ? lineClamp : null)}
  ${() => compose(typography, textTransform, textDecoration, textOverflow)}
  ${(p) => p.disabled && disabled}
`;

export default Text;
