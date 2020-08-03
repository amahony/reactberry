import React from 'react';
import Box from '../Box';
import styled, { css } from 'styled-components';
import { variant } from 'styled-system';

const switchSize = variant({
  key: 'switchSizes',
  prop: 'switchSize'
});

const SwitchStyling = css`
  position: relative;
  transition: all 0.6s;
  border-radius: 25px;
  cursor: pointer;
  &:before {
    transition: all 0.25s;
  }

  &:before {
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
  ${props => props.state === 'off'} && {
    &:before {
      transform: translateX(100%) scale(0.8);
    }
  }
`;

const Switch = styled(Box)`
  ${SwitchStyling};
  ${switchSize};
`;

Switch.defaultProps = {
  switchSize: 'small',
  display: 'inline-flex',
  flex: 'none'
};

export default function Toggle({
  switchSize,
  initState = 'off',
  onToggle = () => {},
  ...rest
}) {
  const [state, setState] = React.useState(initState);

  function toggle() {
    const currentState = state === 'off' ? 'on' : 'off';
    setState(currentState);
    onToggle(currentState);
  }

  return (
    <Switch
      bg={state === 'on' ? 'success' : 'neutral'}
      state={state}
      switchSize={switchSize}
      onClick={toggle}
      {...rest}
    ></Switch>
  );
}
