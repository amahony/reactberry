import {variant} from 'styled-system';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import {shape} from '../utils';
import Box from '../Box';
import Icon from '../Icon';
import Svg from '../Svg';
import Text from '../Text';

const avatarSize = variant({
  key: 'avatarSizes',
  prop: 'avatarSize'
});

const avatarTextSize = {
  xsmall: 'xsmall',
  small: 'xsmall',
  medium: 'small',
  large: 'medium',
  xlarge: 'large'
};

const avatarIconSize = {
  xsmall: 'xsmall',
  small: 'small',
  medium: 'medium',
  large: 'large',
  xlarge: 'large'
};

const DefaultAvatarIcon = props => (
  <Svg viewBox="0 0 100 100" width="100%" height="100%" {...props}>
    <path
      fill="currentColor"
      d="M30.224 36.982C30.224 25.964 39.319 17 50.5 17c11.18 0 20.276 8.964 20.276 19.982v4.996c0 11.019-9.095 19.983-20.276 19.983-11.18 0-20.276-8.964-20.276-19.983v-4.996zM84 98.198c0 .924-.75 1.67-1.675 1.67h-63.65c-.925 0-1.675-.746-1.675-1.67v-3.34c0-14.737 12.023-26.726 26.8-26.726h13.4c14.777 0 26.8 11.99 26.8 26.725v3.341z"
    />
  </Svg>
);

const getInitials = ({name, initials}) => {
  if (name) {
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  }

  return (initials || '').slice(0, 2).toUpperCase();
};

const AvatarBase = styled(Box)`
  overflow: hidden;
  ${avatarSize};
  ${shape};
  background-size: cover;
  background-position: center;
`;

const Avatar = ({
  avatarSize,
  children,
  color,
  contentColor,
  icon,
  initials,
  name,
  type,
  ...rest
}) => {
  const resolvedInitials = getInitials({name, initials});

  return (
    <AvatarBase
      avatarSize={avatarSize}
      bg={color}
      color={contentColor}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      flex="none"
      {...rest}
    >
      {children ||
        (type === 'icon' ? (
          <Icon
            name={typeof icon === 'string' ? icon : undefined}
            icon={icon || DefaultAvatarIcon}
            iconSize={avatarIconSize[avatarSize] || 'medium'}
            aria-hidden="true"
          />
        ) : (
          <Text
            as="span"
            color="inherit"
            fontSize={avatarTextSize[avatarSize] || 'small'}
            fontWeight="600"
            lineHeight={1}
          >
            {resolvedInitials}
          </Text>
        ))}
    </AvatarBase>
  );
};

Avatar.defaultProps = {
  avatarSize: 'medium',
  color: 'action',
  contentColor: 'text.inverse',
  type: 'text',
  initials: 'Aa',
  shape: 'circle'
};

Avatar.propTypes = {
  children: PropTypes.node,
  contentColor: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.string]),
  initials: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.oneOf(['text', 'icon']),
  shape: PropTypes.oneOf(['square', 'rounded', 'circle']),
  avatarSize: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge'])
};
export default Avatar;
