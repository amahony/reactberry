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
  display: inline-block;
  flex-shrink: 0;
  vertical-align: middle;
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

Svg.defaultProps = {
  fill: 'current',
  xmlns: 'http://www.w3.org/2000/svg'
};

export default Svg;
