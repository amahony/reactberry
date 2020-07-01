import { variant } from 'styled-system';
import styled, { css } from 'styled-components';

import { pointer } from '../utils';
import Box from '../Box';

const cardStyle = variant({
  key: 'colorStyles',
  prop: 'type'
});

const CardStyling = css`
  transition: all 0.15s ease-in-out;
  &:hover {
    ${props => props.pointer && pointer};
  }
`;

const Card = styled(Box)`
  ${cardStyle};
  ${CardStyling};
  ${props => props.showBorder && 'border: 2px solid rgba(0,0,0,.125)'};
`;

Card.defaultProps = {
  type: 'default',
  boxShadow: 'none',
  p: 6,
  borderRadius: '.5rem'
};

export default Card;
