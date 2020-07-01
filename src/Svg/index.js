import { color, space, layout, flexbox, style } from 'styled-system';
import styled from 'styled-components';
import React from 'react';

const fill = style({
  // React prop name
  prop: 'fill',
  // The corresponding CSS property (defaults to prop argument)
  cssProperty: 'fill',
  // Key for theme values
  key: 'colors'
});

const stroke = style({
  prop: 'stroke',
  cssProperty: 'stroke',
  key: 'colors'
});

const SvgStyled = styled.svg`
  ${color};
  ${space};
  ${layout};
  ${flexbox};
  ${fill};
  ${stroke};
`;

const Svg = ({ children, ...rest }) => (
  <SvgStyled {...rest}>{children}</SvgStyled>
);

export default Svg;
