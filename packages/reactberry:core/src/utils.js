import {style, variant} from 'styled-system';
import {css} from 'styled-components';

// Text Truncating
export const truncate = css`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
`;

export const underline = css`
  text-decoration: underline;
`;

export const uppercase = css`
  text-transform: uppercase;
`;

export const pointer = css`
  cursor: pointer;
`;

export const disabled = css`
  opacity: 0.6;
  pointer-events: none;
`;

export const focusRing = css`
  outline: none;
  box-shadow: 0 0 0 3px ${props => props.theme.colors.focus.ring};
`;

// Hover prop support
export const hover = style({
  // React prop name
  prop: 'hover',
  // The corresponding CSS property (defaults to prop argument)
  cssProperty: 'color',
  // Key for theme values
  key: 'colors'
});

// Hover Background prop support
export const hoverbg = style({
  // React prop name
  prop: 'hoverbg',
  // The corresponding CSS property (defaults to prop argument)
  cssProperty: 'background',
  // Key for theme values
  key: 'colors'
});

export const hoverbr = style({
  // React prop name
  prop: 'hoverbr',
  // The corresponding CSS property (defaults to prop argument)
  cssProperty: 'border-color',
  // Key for theme values
  key: 'colors'
});

export const textSize = variant({
  key: 'textSizes',
  prop: 'fontSize'
});

export const shape = variant({
  key: 'shapes',
  prop: 'shape'
});

export const presets = variant({
  key: 'colorStyles',
  prop: 'preset'
});
