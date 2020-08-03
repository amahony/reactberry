import {variant} from 'styled-system';
import styled, {css} from 'styled-components';

import Box from '../Box';
import {disabled} from '../utils';

const buttonStyle = variant({
  key: 'buttonStyles'
});
const buttonSize = variant({
  key: 'buttonStyles.buttonSizes',
  prop: 'buttonSize'
});
const buttonShape = variant({
  key: 'shapes',
  prop: 'shape'
});
const intents = {
  default: variant({
    key: 'buttonStyles.default.intents',
    prop: 'intent'
  }),
  primary: variant({
    key: 'buttonStyles.primary.intents',
    prop: 'intent'
  }),
  minimal: variant({
    key: 'buttonStyles.minimal.intents',
    prop: 'intent'
  }),
  outline: variant({
    key: 'buttonStyles.outline.intents',
    prop: 'intent'
  }),
  custom: variant({
    key: 'buttonStyles.custom.intents',
    prop: 'intent'
  })
};

const buttonStyling = css`
  align-items: center;
  cursor: pointer;

  transition: all 0.125s ease-out;
  text-align: center;
  text-decoration: none;
`;

const disabledStyling = css`
  ${disabled};
`;

const Button = styled(Box)`
  ${buttonStyling};
  ${buttonStyle};
  ${props => intents[props.variant]};
  ${buttonSize};
  ${buttonShape};
  ${props => props.disabled && disabledStyling};
  ${props =>
    props.disabled &&
    props.variant !== 'custom' &&
    `
  background: none;
  `};
`;

Button.defaultProps = {
  // default props definitions
  display: 'inline-flex',
  variant: 'default',
  buttonSize: 'medium',
  fontWeight: 600,
  shape: 'rounded',
  mr: 'xxxsmall',
  justifyContent: 'center'
};

export default Button;
