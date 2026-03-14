import { typography } from 'styled-system';
import styled, { css } from 'styled-components';

import { textSize } from '../utils';
import Box from '../Box';

const TextStyling = css`
  box-sizing: border-box;
  margin: 0;
  ${typography};
`;

const Text = styled(Box)`
  ${TextStyling};
  ${textSize};
`;

Text.defaultProps = {
  color: 'text.default',
  fontFamily: 'body',
  fontSize: 'medium'
};

export default Text;
