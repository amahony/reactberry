import {
  fontFamily,
  fontWeight,
  letterSpacing,
  lineHeight,
  textAlign,
  variant
} from 'styled-system';
import styled, {css} from 'styled-components';

import {uppercase} from '../utils';
import Box from '../Box';

const headingSize = variant({
  key: 'headingSizes',
  prop: 'fontSize'
});

const HeadingStyling = css`
  box-sizing: border-box;
  ${fontFamily};
  ${fontWeight};
  ${textAlign};
  ${lineHeight};
  ${letterSpacing};
  ${headingSize};
  ${props => props.uppercase && uppercase};
`;

const Heading = styled(Box)`
  ${HeadingStyling};
`;

Heading.defaultProps = {
  as: 'h2',
  fontSize: 'large',
  fontWeight: '600'
};

export default Heading;
