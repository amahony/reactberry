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

Box.defaultProps = {
  boxSizing: 'border-box'
};

Box.propTypes = {
  boxSizing: PropTypes.string
};

export default Box;
