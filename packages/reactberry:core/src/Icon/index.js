import { style, variant } from 'styled-system';
import React from 'react';
import styled from 'styled-components';

import Box from '../Box';

const iconSize = variant({
  key: 'iconSizes',
  prop: 'iconSize'
});
const iconColor = style({
  // React prop name
  prop: 'fill',
  // The corresponding CSS property (defaults to prop argument)
  cssProperty: 'color',
  // Key for theme values
  key: 'colors'
});
const iconStroke = style({
  // React prop name
  prop: 'stroke',
  // The corresponding CSS property (defaults to prop argument)
  cssProperty: 'stroke',
  // Key for theme values
  key: 'colors'
});

const IconBase = ({
  children,
  icon,
  name,
  fill,
  stroke,
  iconSize,
  ...props
}) => (
  <Box
    stroke={props.stroke}
    fill={props.fill}
    iconSize={props.iconSize}
    {...props}
  >
    {icon || children}
  </Box>
);

const Icon = styled(IconBase)`
  ${iconSize};
  ${iconColor};
  ${iconStroke};
  & > svg {
    width: 100%;
    height: 100%;
  }
`;

Icon.defaultProps = {
  iconSize: 'medium',
  display: 'inline-flex',
  alignItems: 'center'
};

export default Icon;
