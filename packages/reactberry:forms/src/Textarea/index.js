import React from 'react';
import styled from 'styled-components';

import FieldStyling from '../styling';

export const StyledTextarea = styled.textarea`
  ${FieldStyling};
  display: block;
  align-items: initial;
  resize: vertical;
`;

StyledTextarea.defaultProps = {
  fontSize: 'medium',
  p: 'xsmall'
};

const Textarea = React.forwardRef(({rows = 6, ...rest}, ref) => (
  <StyledTextarea ref={ref} rows={rows} {...rest} />
));

Textarea.displayName = 'Textarea';

export default Textarea;
