import React from 'react';
import styled from 'styled-components';

export const StyledLabel = styled.label`
  margin-left: 0.25rem;
  margin-bottom: 0.5rem;
  & input {
    margin-right: ${p => p.mr || '0.5rem'};
  }
`;

StyledLabel.defaultProps = {
  mr: '0.5rem'
};

const {createContext, useState, useContext} = React;

function useCheckboxButtons(name, onChange = () => {}) {
  const [value, setState] = useState(null);

  const handleChange = event => {
    setState(event.target.value);
    onChange(event.target.value);
  };

  const inputProps = {
    onChange: handleChange,
    name
  };

  return [value, inputProps];
}

const CheckboxGroupContext = createContext();

export function CheckboxGroup({children, name, onChange}) {
  const [state, inputProps] = useCheckboxButtons(name, onChange);
  return (
    <CheckboxGroupContext.Provider state={state} value={inputProps}>
      {children}
    </CheckboxGroupContext.Provider>
  );
}

export function CheckboxButton(props) {
  const context = useContext(CheckboxGroupContext);
  return (
    <StyledLabel>
      <input type="checkbox" {...props} {...context} />
      {props.label}
    </StyledLabel>
  );
}

export default CheckboxButton;
