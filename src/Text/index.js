import { typography } from 'styled-system';
import styled, { css } from 'styled-components';

import { textSize } from '../utils';
import Box from '../Box';

const TextStyling = css`
  box-sizing: border-box;
  ${typography};
`;

const Text = styled(Box)`
  ${TextStyling};
  ${textSize};
`;

Text.defaultProps = {
  fontSize: 'medium'
};

export default Text;
