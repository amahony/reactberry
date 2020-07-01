import React from 'react';
import styled from 'styled-components';

import Box from '../Box';

const ProgressStyled = styled(Box)`
  height: 0.5rem;
  position: relative;
  display: block;
  border-radius: 2rem;
  overflow: hidden;
  ${Box} {
    height: 100%;
    left: 0;
    top: 0;
    border-radius: 0 2rem 2rem 0;
    width: ${props => props.progress}%;
    position: absolute;
  }
  ${props => props.small && 'height: .25rem;'}
  /* negative increment */
${props =>
  props.type === 'negative' &&
  props.progress <= '25' &&
  `${Box}{background: ${props.theme.colors.palette.greens[3]};} `}
${props =>
  props.type === 'negative' &&
  props.progress >= '26' &&
  props.progress <= '50' &&
  ` ${Box}{background: ${props.theme.colors.palette.grays[5]};}`}
${props =>
  props.type === 'negative' &&
  props.progress >= '51' &&
  props.progress <= '75' &&
  ` ${Box} {background: ${props.theme.colors.warning};}`}
${props =>
  props.type === 'negative' &&
  props.progress >= '76' &&
  ` ${Box} {background: ${props.theme.colors.danger};}`}

/* type positive */

${props =>
  props.type === 'positive' &&
  props.progress > '90' &&
  `

${Box}{background: ${props.theme.colors.palette.greens[3]};}
`}
${props =>
  props.type === 'positive' &&
  props.progress >= '70' &&
  props.progress <= '90' &&
  `

${Box}{background: ${props.theme.colors.palette.grays[5]};}
`}
${props =>
  props.type === 'positive' &&
  props.progress >= '50' &&
  props.progress <= '69' &&
  `
${Box}{background: ${props.theme.colors.warning};}
`}
${props =>
  props.type === 'positive' &&
  props.progress < '50' &&
  `

${Box}{background: ${props.theme.colors.danger};}
`}

/* type neutral */

${props =>
  props.type === 'neutral' &&
  `
${Box}{background: ${props.theme.colors.palette.neutrals[3]};}
`}

/* type neutral */

${props =>
  props.type === 'custom' &&
  `

`}


`;

const Progress = props => (
  <ProgressStyled {...props}>
    <Box bg={props.color} />
  </ProgressStyled>
);

Progress.defaultProps = {
  width: '100%',
  bg: 'light',
  type: 'negative'
};

export default Progress;
