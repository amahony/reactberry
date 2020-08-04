import React from 'react';
import styled from 'styled-components';

import {Box, Text} from '@reactberry/core';

import FieldStyling from '../styling';

export const StyledInput = styled.input`
  ${FieldStyling};
  &[type='checkbox'] {
    min-height: initial;
    margin: 0;
  }
`;

StyledInput.defaultProps = {
  fontSize: 'medium',
  preset: 'subtle.rounded',
  p: 'xsmall'
};

export class Input extends React.Component {
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
        display="flex"
        alignItems={this.props.flow === 'vertical' ? 'start' : 'center'}
        flexDirection={this.props.flow === 'vertical' ? 'column' : 'row'}
        {...this.props.boxProps}
      >
        {this.props.label && (
          <Text mb="xsmall" fontWeight="600">
            {this.props.label}
          </Text>
        )}
        <StyledInput
          type={this.props.type}
          placeholder={this.props.placeholder}
          onKeyPress={this._handleKeyPress}
          {...this.props}
        />
      </Box>
    );
  }
}

Input.defaultProps = {
  flow: 'vertical',
  mb: 'small',
  placeholder: 'Placeholder'
};
