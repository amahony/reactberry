import {variant} from 'styled-system';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import {shape} from '../utils';
import Box from '../Box';

const AvatarStructure = props => (
  <Box
    color={props.color}
    avatarSize={props.avatarSize}
    initials={props.initials}
    name={props.name}
    shape={props.shape}
    {...props}
  >
    {props.type === 'text' && (
      <svg
        fill="currentColor"
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <rect x="0" y="0" width="100" height="100" />
          <text
            x="50%"
            y="50%"
            dy="3%"
            alignmentBaseline="central"
            dominantBaseline="middle"
            textAnchor="middle"
            fill="white"
            fontFamily="sans-serif"
            fontWeight="600"
            fontSize="40"
          >
            {(props.name && props.name.slice(0, 2)) || props.initials}
          </text>
        </g>
      </svg>
    )}
    {props.type === 'icon' && (
      <svg
        fill="currentColor"
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <rect x="0" y="0" width="100" height="100" />
          <path
            d="M30.224 36.982C30.224 25.964 39.319 17 50.5 17c11.18 0 20.276 8.964 20.276 19.982v4.996c0 11.019-9.095 19.983-20.276 19.983-11.18 0-20.276-8.964-20.276-19.983v-4.996zM84 98.198c0 .924-.75 1.67-1.675 1.67h-63.65c-.925 0-1.675-.746-1.675-1.67v-3.34c0-14.737 12.023-26.726 26.8-26.726h13.4c14.777 0 26.8 11.99 26.8 26.725v3.341z"
            fill="white"
            fillRule="nonzero"
          />
        </g>
      </svg>
    )}
  </Box>
);

const avatarSize = variant({
  key: 'avatarSizes',
  prop: 'avatarSize'
});

const Avatar = styled(AvatarStructure)`
  overflow: hidden;
  ${avatarSize};
  ${shape};
  background-size: cover;
`;

function getRandomColor() {
  const colorValues = ['neutral', 'action', 'success', 'danger', 'warning'];
  return colorValues[Math.floor(Math.random() * colorValues.length)];
}

Avatar.defaultProps = {
  avatarSize: 'medium',
  display: 'inline-flex',
  color: getRandomColor(),
  type: 'text',
  initials: 'Aa',
  shape: 'circle',
  flex: 'none'
};

Avatar.propTypes = {
  initials: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.oneOf(['text', 'icon']),
  shape: PropTypes.oneOf(['square', 'rounded', 'circle']),
  avatarSize: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge'])
};
export default Avatar;
