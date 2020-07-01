import React from 'react';
import styled from 'styled-components';
import Box from '../Box';
import Button from '../Button';

import useDropdown from './utils';

const ListStyled = styled(Box)`
  position: absolute;
  box-shadow: 0 4px 4px -1px rgba(0, 0, 0, 0.1),
    0 1px 0px 0px rgba(0, 0, 0, 0.075);
  border-radius: 8px;
  transform: scale(0.9);
  transition: all 0.125s ease-out;
  transform-origin: top center;
  opacity: 0;
  pointer-events: none;
  &.active {
    transform: scale(1);
    visibility: visible;
    opacity: 1;
    pointer-events: initial;
    z-index: 1;
  }
`;

ListStyled.defaultProps = {
  top: '2.25rem',
  left: '0',
  display: 'flex',
  flexDirection: 'column',
  bg: 'white',
  color: 'primary',
  padding: 'xsmall',
  width: '200px',
  m: '0'
};

const DropdownStyled = styled(Box)`
  position: relative;
`;
DropdownStyled.defaultProps = {
  display: 'flex'
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
  const onClick = () => {
    if (!disableClose) {
      toggleDrop();
    }
  };

  return (
    <DropdownStyled className={isOpen ? 'active' : ''} {...boxProps}>
      <Button
        fontWeight="600"
        ref={actionEl}
        buttonSize={buttonSize}
        variant={variant}
        hideIcon={hideIcon}
        shape={shape}
        hover={hover}
        hoverbg={hoverbg}
        mr={mr || '0'}
        onClick={toggleDrop}
        {...buttonProps}
      >
        {title || 'Select'}
        {!hideIcon && <>{isOpen ? '+' : '-'}</>}
      </Button>

      <ListStyled
        ref={dropEl}
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
  display: 'inline-flex',
  buttonSize: 'medium',
  variant: 'custom',
  hoverbg: 'rgba(0,0,0,0.125)',
  mr: 'xxxsmall'
};

export default Dropdown;
