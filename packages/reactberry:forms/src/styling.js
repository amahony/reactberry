import {border, color, flexbox, layout, space, typography} from 'styled-system';
import {css} from 'styled-components';

import {presets} from '@reactberry/core';

const FieldStyling = css`
  resize: none;
  padding: 0.25rem;
  outline: currentcolor none medium;
  border: 1px solid transparent;
  line-height: 1.25;
  font-weight: 500;
  box-shadow: none;
  width: ${props => props.width || 'auto'};
  white-space: pre-wrap;
  min-height: 2.5rem;
  height: auto;
  flex: 0 0 auto;
  display: inline-block;
  box-sizing: border-box;
  transition: all 0.125s ease-out;
  &:hover {
    border-color: ${props => props.theme.colors.palette.grays[1]};
  }
  &:focus {
    background: ${props => props.theme.colors.white};
    border-color: ${props => props.theme.colors.palette.blues[2]};
  }
  ${border};
  ${color};
  ${typography};
  ${space};
  ${layout};
  ${flexbox};
  ${presets};
`;

export default FieldStyling;
