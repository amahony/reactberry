import {
  fontFamily,
  fontWeight,
  letterSpacing,
  lineHeight,
  textAlign
} from 'styled-system';
import styled, { css } from 'styled-components';

import { underline, textSize } from '../utils';

import Box from '../Box';

const LinkStyling = css`
  box-sizing: border-box;
  cursor: pointer;
  ${fontFamily};
  ${fontWeight};
  ${textAlign};
  ${lineHeight};
  ${letterSpacing};
  ${textSize};
  text-decoration: none;
  transition: 0.125s ease-in-out;
  &:hover {
    ${props => props.underline && underline};
  }

  ${props =>
    props.anchor &&
    `
      text-decoration: underline;
      `};
`;

const Link = styled(Box)`
  ${LinkStyling};
`;

Link.defaultProps = {
  color: 'currentColor',
  fontSize: 'medium',
  fontWeight: 500
};

export default Link;
