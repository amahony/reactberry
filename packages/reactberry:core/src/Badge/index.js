import {variant} from 'styled-system';
import React from 'react';
import styled, {css} from 'styled-components';
import PropTypes from 'prop-types';
import Text from '../Text';

const badgeSize = variant({
  key: 'badgeSizes',
  prop: 'badgeSize'
});

const BadgeStyling = css`
  cursor: pointer;
  text-decoration: none;
  transition: all 0.15s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  border-radius: 27px;
`;

const BadgeStyled = styled(Text)`
  ${BadgeStyling};
  ${badgeSize};
`;

const Badge = ({children, value, ...rest}) => (
  <BadgeStyled {...rest}>
    {value !== 0 ? value : 0}
    {children}
  </BadgeStyled>
);

Badge.defaultProps = {
  badgeSize: 'medium',
  bg: 'danger',
  color: 'white',
  fontWeight: '600'
};

Badge.propTypes = {
  color: PropTypes.objectOf('theme.colors'),
  value: PropTypes.string,
  badgeSize: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge'])
};

export default Badge;
