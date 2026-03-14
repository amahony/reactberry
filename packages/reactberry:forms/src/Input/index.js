import React from 'react';
import styled from 'styled-components';

import FieldStyling from '../styling';

export const StyledInput = styled.input`
  ${FieldStyling};
  display: block;
`;

StyledInput.defaultProps = {
  fontSize: 'medium',
  p: 'xsmall'
};

export const Input = React.forwardRef(({type = 'text', ...rest}, ref) => (
  <StyledInput ref={ref} type={type} {...rest} />
));

Input.displayName = 'Input';

export default Input;
