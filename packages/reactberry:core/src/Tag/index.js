import {variant} from 'styled-system';
import React from 'react';
import styled, {css} from 'styled-components';

import Box from '../Box';

// adding close icon
// import IconERemove from '../icons/e-remove'

// const Icon = styled(IconERemove)`
//   width: 10px;
//   height: 10px;
// `

// default variant
const tagStyle = variant({
  key: 'tagStyles'
});

// default variant
const tagSize = variant({
  key: 'tagStyles.tagSizes',
  prop: 'tagSize'
});

// status
const status = {
  priority: variant({
    key: 'tagStyles.priority.status',
    prop: 'status'
  }),
  intent: variant({
    key: 'tagStyles.intent.status',
    prop: 'status'
  })
};

// hover state
const hoverState = css`
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 0 2px ${props => props.theme.colors.action};
    background: white;
    color: blue;
  }
`;

const tagBaseStyling = css`
  display: inline-flex;
  align-items: center;
  letter-spacing: 0px;
  text-transform: uppercase;
  transition: all 0.125s ease-out;
  text-align: center;
`;

const TagBase = styled(Box)`
  ${tagBaseStyling};
  ${tagStyle}
  ${tagSize}
  ${props => status[props.variant]};
  ${props => props.interactive && hoverState};
`;

const Tag = ({children, variant, status, icon, ...rest}) => (
  <React.Fragment>
    <TagBase showIcon variant={variant} status={status} {...rest}>
      {children ? <span>{children}</span> : <span>{status}</span>}
    </TagBase>
  </React.Fragment>
);

Tag.defaultProps = {
  borderRadius: 'pill',
  mr: 'xxsmall',
  tagSize: 'small',
  variant: 'default'
};

export default Tag;
