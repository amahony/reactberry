import {variant} from 'styled-system';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {pointer} from '../utils';
import Box from '../Box';

const cardStyle = variant({
  key: 'colorStyles',
  prop: 'type'
});

const Card = styled(Box)`
  ${cardStyle};
  transition: all 0.15s ease-in-out;
  &:hover {
    ${props => props.pointer && pointer};
  }
`;

Card.defaultProps = {
  type: 'default',
  boxShadow: 'none',
  p: 6,
  borderRadius: '.5rem'
};
Card.propTypes = {
  type: PropTypes.any
};

export default Card;
