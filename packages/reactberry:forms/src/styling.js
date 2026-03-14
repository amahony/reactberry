import {border, color, flexbox, layout, space, typography} from 'styled-system';
import {css} from 'styled-components';

import {presets} from '@reactberry/core';

const FieldStyling = css`
  resize: none;
  appearance: none;
  padding: 0.625rem 0.75rem;
  outline: none;
  border: 1px solid;
  border-color: ${props => props.theme.colors.border.default};
  border-radius: ${props => props.theme.radii.medium};
  background-color: ${props => props.theme.colors.surface.default};
  color: ${props => props.theme.colors.text.default};
  line-height: ${props => props.theme.lineHeights.body || 1.5};
  font-weight: 500;
  box-shadow: none;
  width: ${props => props.width || '100%'};
  white-space: pre-wrap;
  min-height: 2.5rem;
  height: auto;
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  transition: border-color 0.125s ease-out, box-shadow 0.125s ease-out,
    background-color 0.125s ease-out;
  ${presets};

  &::placeholder {
    color: ${props => props.theme.colors.text.subtle};
  }

  &:hover {
    border-color: ${props => props.theme.colors.border.strong};
  }

  &:focus {
    border-color: ${props => props.theme.colors.border.accent};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.focus.ring};
  }

  &:disabled,
  &[aria-disabled='true'] {
    cursor: not-allowed;
    color: ${props => props.theme.colors.text.muted};
    background-color: ${props => props.theme.colors.surface.subtle};
    border-color: ${props => props.theme.colors.border.subtle};
  }

  &[aria-invalid='true'],
  &[data-invalid='true'] {
    border-color: ${props => props.theme.colors.danger};
  }

  &[aria-invalid='true']:focus,
  &[data-invalid='true']:focus {
    border-color: ${props => props.theme.colors.danger};
  }

  ${border};
  ${color};
  ${typography};
  ${space};
  ${layout};
  ${flexbox};
`;

export default FieldStyling;
