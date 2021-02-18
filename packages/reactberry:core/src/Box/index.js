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
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {hoverbg, hoverbr, hover, shape, pointer, presets} from '../utils';

const Box = styled.div`
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
  ${presets};
  ${props => props.pointer && pointer};
  &:hover {
    ${hover};
    ${hoverbg};
    ${hoverbr};
  }
`;

export default Box;
