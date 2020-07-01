import React from 'react';
import styled from 'styled-components';

import { IconSmallDown } from '@project/iconberry';

import { Box, Icon } from '../..';
import FieldStyling from './styling';

const StyledIcon = styled(Icon)`
  position: absolute;
  right: 0.5rem;
  top: 0.75rem;
  pointer-events: none;
`;

export const StyledSelect = styled.select`
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  padding-right: 1.5rem;
  font-size: inherit;
  background: none;
  ${FieldStyling};
  & + ${StyledIcon} {
    color: ${props => props.theme.colors.palette.grays[5]};
  }

  /* Hide arrow icon in IE browsers */
  &::-ms-expand {
    display: none;
  }
  /* Set options to normal weight */
  & > option {
    font-weight: normal;
  }

  /* Disabled styles */
  &:disabled,
  &[aria-disabled='true'] {
    color: graytext;
    background: ${props => props.theme.colors.palette.grays[1]};
  }

  &:disabled:hover,
  &[aria-disabled='true'] {
    background: ${props => props.theme.colors.palette.grays[1]};
  }
`;

export class Select extends React.Component {
  constructor() {
    super();
    this._handleKeyPress = this._handleKeyPress.bind(this);
  }

  // Loop through the ref's object, and bind each of them to onkeypress
  componentDidMount() {
    for (let x in this.refs) {
      this.refs[x].onkeypress = e => this._handleKeyPress(e, this.refs[x]);
    }
  }

  // This checks ENTER key (13), then checks if next node is an INPUT
  // Then focuses next input box
  _handleKeyPress(e, field) {
    if (e.keyCode === 13) {
      e.preventDefault(); // Prevent form submission if button present
      let next = this.refs[field.name].nextSibling;

      if (next && next.tagName === 'input') {
        this.refs[field.name].nextSibling.focus();
      }
    }
  }

  render() {
    return (
      <Box
        display="inline-flex"
        position="relative"
        width={this.props.width}
        fontSize={this.props.fontSize}
        {...this.props}
      >
        <StyledSelect
          width="100%"
          display="inline-flex"
          defaultValue={this.props.defaultValue}
          placeholder={this.props.value}
          fontSize={this.props.fontSize}
          onKeyPress={this._handleKeyPress}
        >
          {this.props.children}
        </StyledSelect>
        <StyledIcon>
          <IconSmallDown />
        </StyledIcon>
      </Box>
    );
  }
}

Select.defaultProps = {
  fontSize: 'small',
  preset: 'light'
};
