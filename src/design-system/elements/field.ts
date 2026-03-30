"use client";
import { variant, compose } from "styled-system";
import styled, { css } from "styled-components";
import Text, { TextProps } from "./text";
import { disabled } from "./utils";

export interface FieldProps extends TextProps {
  children?: React.ReactNode;
  variant?: string;
  $size?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}

const fieldStyle = variant({
  key: "skins.field",
  prop: "variant",
});

const fieldSize = variant({
  key: "skins.field.sizes",
  prop: "$size",
});

// Build array of props that shouldn't be forwarded to DOM
const newArr: any = [];
const fieldPropsToOmit = [newArr].concat("variant", "shape", "$size");

const selectStyling = css`
  appearance: none;
  /* SVG background image */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cg fill='%23212121'%3E%3Cpath d='M12,15a1,1,0,0,1-.707-.293l-4-4A1,1,0,1,1,8.707,9.293L12,12.586l3.293-3.293a1,1,0,0,1,1.414,1.414l-4,4A1,1,0,0,1,12,15Z' fill='gray'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
  background-size: 1.5em;
  background-position: calc(100% - 0.5em) center;
  background-repeat: no-repeat;
  padding-right: 2em;
`;

const rangeStyling = css`
  --color: ${(p: any) => p.theme.colors.primary};
  --track: ${(p: any) => p.theme.colors.transparent.light[2]};
  --shadow: ${(p: any) => p.theme.colors.dark};

  /*********** Baseline, reset styles ***********/

  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  border: none;
  cursor: pointer;
  width: 100%;
  padding: 0;

  /* Removes default focus */
  &:hover,
  &:focus {
    outline: none;
  }

  /******** Chrome, Safari, Opera and Edge Chromium styles ********/
  /* slider track */
  &::-webkit-slider-runnable-track {
    background-color: var(--track);
    border-radius: 0.5rem;
    height: 0.5rem;
  }

  /* slider thumb */
  &::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    margin-top: -4px; /* Centers thumb on the track */
    background-color: var(--color);
    border-radius: 0.5rem;
    height: 1rem;
    width: 1rem;
  }

  &:focus::-webkit-slider-thumb {
    outline: 3px solid var(--color);
    outline-offset: 0.125rem;
  }

  /*********** Firefox styles ***********/
  /* slider track */
  &::-moz-range-track {
    background-color: var(--track);
    border-radius: 0.5rem;
    height: 0.5rem;
  }

  /* slider thumb */
  &::-moz-range-thumb {
    background-color: var(--color);
    border: none; /*Removes extra border that FF applies*/
    border-radius: 0.5rem;
    height: 1rem;
    width: 1rem;
  }

  &:focus::-moz-range-thumb {
    outline: 3px solid var(--shadow);
    //outline-offset: 0.125rem;
  }
`;

const Field = styled(Text)
  .withConfig({
    shouldForwardProp: (prop) => !fieldPropsToOmit.includes(prop),
  })
  .attrs<FieldProps>((props) => ({
    as: "input",
    type: "text",
    shape: "rounded",
    variant: "default",
    display: "inline-flex",
    $size: "medium",
    placeholder: "",
    ...props,
  }))<FieldProps>`
  ${compose(fieldStyle, fieldSize)}
  ${(p) => p.disabled && disabled}
  ${(p) => p.as === "select" && selectStyling}
  ${(p) => p.type === "range" && rangeStyling}
    transition: 0.2s ease;
`;

export default Field;
