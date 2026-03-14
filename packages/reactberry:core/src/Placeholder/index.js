import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { typography } from 'styled-system';

import Box from '../Box';
import Icon from '../Icon';
import { textSize } from '../utils';

const Base = styled(Box)`
  ${typography};
  ${textSize};
  & > * + * {
    margin-left: ${props => props.theme.space.xxxsmall};
  }
`;

const Placeholder = ({ children, icon, size, fill, ...rest }) => (
  <Base {...rest}>
    {icon && (
      <Icon
        name={typeof icon === 'string' ? icon : undefined}
        icon={icon}
        iconSize={size}
        fill={fill}
        aria-hidden="true"
      />
    )}
    {children}
  </Base>
);

Placeholder.propTypes = {
  children: PropTypes.node,
  fill: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.string]),
  size: PropTypes.any
};

Placeholder.defaultProps = {
  display: 'inline-flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  p: 'small',
  preset: 'default',
  color: 'text.muted',
  shape: 'rounded'
};

export default Placeholder;
