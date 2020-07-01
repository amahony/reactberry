import React from 'react';
import styled from 'styled-components';

import FieldStyling from './styling';

export const StyledTextarea = styled.textarea`
  ${FieldStyling};
  margin-top: 1rem;
  /* flex: 1 0 auto; */
`;

function Textarea(props) {
  return <StyledTextarea {...this.props} />;
}

export default Textarea;
