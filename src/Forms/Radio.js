import React from 'react';
import styled from 'styled-components';

export const StyledLabel = styled.label`
  margin-left: 0.25rem;
  margin-bottom: 0.5rem;
  & input {
    margin-right: 0.5rem;
  }
`;

const { createContext, useState, useContext } = React;

function useRadioButtons(name, onChange = () => {
}) {
  const [value, setState] = useState(null);

  const handleChange = event => {
    setState(event.target.value);
    onChange(event.target.value);
  };

  const inputProps = {
    onChange: handleChange,
    name,
    type: 'radio'
  };

  return [value, inputProps];
}

const RadioGroupContext = createContext();

export function RadioGroup({ children, name, onChange }) {
  const [state, inputProps] = useRadioButtons(name, onChange);
  return (
    <RadioGroupContext.Provider state={state} value={inputProps}>
      {children}
    </RadioGroupContext.Provider>
  );
}

export function RadioButton(props) {
  const context = useContext(RadioGroupContext);
  return (
    <StyledLabel>
      <input {...props} {...context} />
      {props.label}
    </StyledLabel>
  );
}
