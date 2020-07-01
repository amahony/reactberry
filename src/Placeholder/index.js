import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { typography } from 'styled-system';
import Box from '../Box';
import { textSize } from '../utils';

const Base = styled(Box)`
  ${typography};
  ${textSize};
`;

const Placeholder = ({ children, icon, size, fill, ...rest }) => (
  <Base {...rest}>{children}</Base>
);

Placeholder.propTypes = {
  children: PropTypes.node,
  fill: PropTypes.string,
  icon: PropTypes.string,
  size: PropTypes.any
};

Placeholder.defaultProps = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  p: 'small',
  preset: 'default'
};

export default Placeholder;
