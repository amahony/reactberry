import {variant} from 'styled-system';
import React from 'react';
import styled, {css} from 'styled-components';

import Box from '../Box';
import {disabled as disabledStyles, focusRing} from '../utils';

const switchSize = variant({
  key: 'switchSizes',
  prop: 'switchSize'
});

const Switch = styled(Box).attrs({
  as: 'button',
  type: 'button'
})`
  ${switchSize};
  position: relative;
  padding: 0;
  border: 1px solid
    ${({theme, $checked}) =>
      $checked ? theme.colors.action : theme.colors.border.default};
  background-color: ${({theme, $checked, disabled}) => {
    if (disabled) {
      return theme.colors.surface.sunken;
    }

    return $checked ? theme.colors.action : theme.colors.surface.sunken;
  }};
  border-radius: ${({theme}) => theme.radii.pill};
  cursor: ${({disabled}) => (disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.2s ease, border-color 0.2s ease,
    box-shadow 0.125s ease;

  &:before {
    transition: transform 0.2s ease;
    display: block;
    position: absolute;
    content: '';
    height: calc(100% - 4px);
    width: calc(50% - 2px);
    transform: translateX(0);
    left: 2px;
    top: 2px;
    background-color: ${({theme}) => theme.colors.surface.default};
    box-shadow: ${({theme}) => theme.shadows.small};
    border-radius: ${({theme}) => theme.radii.circle};
  }

  ${({$checked}) =>
    $checked &&
    css`
    &:before {
        transform: translateX(100%);
      }
    `}

  &:focus {
    ${focusRing};
  }

  ${({disabled}) =>
    disabled &&
    css`
      ${disabledStyles};
    `}
`;

Switch.defaultProps = {
  switchSize: 'small',
  display: 'inline-flex',
  flex: 'none'
};

export default function Toggle({
  switchSize,
  initialValue = false,
  checked,
  onChange = () => {},
  onClick = () => {},
  disabled = false,
  ...rest
}) {
  const [internalChecked, setInternalChecked] = React.useState(initialValue);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  const handleClick = event => {
    if (disabled) {
      return;
    }

    const nextChecked = !isChecked;

    if (!isControlled) {
      setInternalChecked(nextChecked);
    }

    onClick(event);
    onChange(nextChecked, event);
  };

  return (
    <Switch
      $checked={isChecked}
      switchSize={switchSize}
      role="switch"
      aria-checked={isChecked}
      disabled={disabled}
      onClick={handleClick}
      {...rest}
    />
  );
}
