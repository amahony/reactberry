import {variant} from 'styled-system';
import React from 'react';
import styled from 'styled-components';

import Box from '../Box';

const switchSize = variant({
  key: 'switchSizes',
  prop: 'switchSize'
});

const Switch = styled(Box)`
  ${switchSize};
  position: relative;
  transition: all 0.6s;
  border-radius: 25px;
  cursor: pointer;
  &:before {
    transition: all 0.25s;
    display: block;
    position: absolute;
    content: '';
    height: 100%;
    width: calc(100% / 2);
    transform: translateX(0%) scale(0.8);
    left: 0px;
    top: 0px;
    background-color: white;
    transition-delay: 0.01s;
    border-radius: 50%;
  }
  ${props => props.checked === false} && {
    &:before {
      transform: translateX(100%) scale(0.8);
    }
  }
  ${props =>
    props.disabled &&
    `pointer-events: none;
    opacity: 0.7;
    background: gray;`}
`;

Switch.defaultProps = {
  switchSize: 'small',
  display: 'inline-flex',
  flex: 'none'
};

export default function Toggle({
  switchSize,
  initialValue = false,
  onClick = () => {},
  ...rest
}) {
  const [toggle, setToggle] = React.useState(initialValue);

  return (
    <Switch
      checked={toggle}
      bg={toggle ? 'success' : 'neutral'}
      switchSize={switchSize}
      onClick={() => {
        setToggle(!toggle);
        onClick();
      }}
      {...rest}
    />
  );
}
