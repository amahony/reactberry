import React from 'react'
import styled, { css } from 'styled-components'

import Box from '../Box';


const DividerStyling = css`
  display: inline-flex;
  opacity: 0.6;
`
const DividerStyled = styled(Box)`
  ${DividerStyling};
`

const Divider = props => <DividerStyled {...props}>{props.symbol}</DividerStyled>

Divider.defaultProps = {
    mx: 'xxsmall',
    bg: 'inherit',
    symbol: '|',
}

export default Divider
