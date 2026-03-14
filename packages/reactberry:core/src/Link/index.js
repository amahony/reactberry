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

const getFocusRadius = ({ theme = {} }) => {
  if (theme.radii && theme.radii.small) {
    return theme.radii.small;
  }

  if (theme.radius && theme.radius[1]) {
    return theme.radius[1];
  }

  return '2px';
};

const getFocusRing = ({ theme = {} }) => {
  if (theme.colors && theme.colors.focus && theme.colors.focus.ring) {
    return theme.colors.focus.ring;
  }

  return 'rgba(37, 99, 235, 0.24)';
};

const LinkStyling = css`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  ${fontFamily};
  ${fontWeight};
  ${textAlign};
  ${lineHeight};
  ${letterSpacing};
  ${textSize};
  text-decoration: none;
  text-decoration-color: currentColor;
  text-underline-offset: 0.16em;
  transition: 0.125s ease-in-out;
  &:hover {
    ${props => props.underline && underline};
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${getFocusRing};
    border-radius: ${getFocusRadius};
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
  as: 'a',
  color: 'action',
  fontFamily: 'body',
  fontSize: 'medium',
  fontWeight: 'medium'
};

export default Link;
