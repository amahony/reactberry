import {style, variant} from 'styled-system';
import React from 'react';
import styled from 'styled-components';
import {ChevronSmallDownIcon, ChevronSmallUpIcon} from './icons';

import Box from '../Box';

const iconRegistry = {
  ChevronSmallDownIcon,
  ChevronSmallUpIcon,
  chevronSmallDown: ChevronSmallDownIcon,
  chevronSmallUp: ChevronSmallUpIcon
};

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

const resolveIcon = ({children, icon, name}) => {
  if (React.isValidElement(icon)) {
    return icon;
  }

  if (typeof icon === 'function') {
    const IconComponent = icon;

    return <IconComponent />;
  }

  if (name && iconRegistry[name]) {
    const IconComponent = iconRegistry[name];

    return <IconComponent />;
  }

  return icon || children;
};

const IconBase = ({children, icon, name, fill, stroke, iconSize, ...props}) => (
  <Box stroke={stroke} fill={fill} iconSize={iconSize} {...props}>
    {resolveIcon({children, icon, name})}
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
