import {
  background,
  border,
  color,
  flexbox,
  grid,
  layout,
  position,
  shadow,
  space
} from 'styled-system';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { hoverbg, hoverbr, hover, shape, pointer, presets } from '../utils';

const BoxStyling = css`
  box-sizing: border-box;
  ${color};
  ${space};
  ${layout};
  ${flexbox};
  ${border};
  ${background};
  ${position};
  ${grid};
  ${shadow};
  ${shape};
`;

const Box = styled.div`
  ${BoxStyling};
  ${presets};
  ${props => props.pointer && pointer};
  &:hover {
    ${hover};
    ${hoverbg};
    ${hoverbr};
  }
`;

Box.propTypes = {
    variant: PropTypes.oneOf(['primary','secondary', 'tertiary'])
};


export default Box;
