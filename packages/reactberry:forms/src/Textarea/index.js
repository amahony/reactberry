import React from 'react';
import styled from 'styled-components';

import FieldStyling from '../styling';

export const StyledTextarea = styled.textarea`
  ${FieldStyling};
  margin-top: 1rem;
  /* flex: 1 0 auto; */
`;

function Textarea({value, rows, placeholder, ...rest}) {
  return (
    <StyledTextarea
      rows={rows}
      value={value}
      placeholder={placeholder}
      {...rest}
    />
  );
}

Textarea.defaultProps = {
  preset: 'light',
  rows: 10
};

export default Textarea;
