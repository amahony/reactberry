import React from 'react';
import styled from 'styled-components';

import Box from '../Box';
import Button from '../Button';
import Icon from '../Icon';
import {focusRing} from '../utils';
import useDropdown from './useDropdown';

const TriggerButton = styled(Button)`
  &:focus {
    ${focusRing};
  }
`;

const ListStyled = styled(Box)`
  position: absolute;
  box-shadow: ${({theme}) => theme.shadows.small};
  border: 1px solid ${({theme}) => theme.colors.border.default};
  border-radius: ${({theme}) => theme.radii.medium};
  transform: translateY(${({theme}) => theme.space.xxxsmall}) scale(0.98);
  transition: transform 0.125s ease-out, opacity 0.125s ease-out,
    visibility 0.125s ease-out;
  transform-origin: top center;
  opacity: 0;
  pointer-events: none;
  visibility: hidden;

  &.active {
    transform: translateY(0) scale(1);
    visibility: visible;
    opacity: 1;
    pointer-events: auto;
    z-index: 1;
  }
`;

ListStyled.defaultProps = {
  top: '100%',
  left: '0',
  display: 'flex',
  flexDirection: 'column',
  bg: 'surface.default',
  color: 'text.default',
  mt: 'xsmall',
  p: 'xsmall',
  minWidth: '12rem',
  m: '0'
};

const DropdownStyled = styled(Box)`
  position: relative;
`;

DropdownStyled.defaultProps = {
  display: 'inline-flex'
};

const Dropdown = ({
  children,
  title,
  buttonSize,
  variant,
  hideIcon,
  hover,
  hoverbg,
  shape,
  mr,
  boxProps,
  buttonProps,
  disableClose = false,
  ...rest
}) => {
  const actionEl = React.useRef(null);
  const dropEl = React.useRef(null);
  const [isOpen, toggleDrop] = useDropdown(dropEl, actionEl);
  const dropdownIconName = isOpen
    ? 'ChevronSmallUpIcon'
    : 'ChevronSmallDownIcon';
  const buttonId = buttonProps && buttonProps.id;
  const menuId = buttonId ? `${buttonId}-menu` : undefined;

  const onClick = () => {
    if (!disableClose) {
      toggleDrop();
    }
  };

  return (
    <DropdownStyled {...boxProps}>
      <TriggerButton
        fontWeight="600"
        ref={actionEl}
        buttonSize={buttonSize}
        variant={variant}
        shape={shape}
        hover={hover}
        hoverbg={hoverbg}
        mr={mr || '0'}
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls={menuId}
        onClick={toggleDrop}
        {...buttonProps}
      >
        {title || 'Select'}
        {!hideIcon && (
          <Icon
            name={dropdownIconName}
            iconSize="small"
            ml="xxxsmall"
            aria-hidden="true"
          />
        )}
      </TriggerButton>

      <ListStyled
        ref={dropEl}
        id={menuId}
        className={isOpen ? 'active' : ''}
        onClick={onClick}
        {...rest}
      >
        {children}
      </ListStyled>
    </DropdownStyled>
  );
};

Dropdown.defaultProps = {
  buttonSize: 'medium',
  variant: 'custom',
  hoverbg: 'surface.muted',
  mr: 'xxxsmall'
};

export default Dropdown;
