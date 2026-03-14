import {variant} from 'styled-system';
import React from 'react';
import styled, {css} from 'styled-components';

import Box from '../Box';
import Icon from '../Icon';

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
    box-shadow: 0 0 0 2px ${props => props.theme.colors.border.accent};
    background: ${props => props.theme.colors.surface.default};
    color: ${props => props.theme.colors.text.default};
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
  & > * + * {
    margin-left: ${props => props.theme.space.xxxsmall};
  }
`;

const renderTagIcon = icon => {
  if (!icon) {
    return null;
  }

  return (
    <Icon
      name={typeof icon === 'string' ? icon : undefined}
      icon={icon}
      iconSize="xsmall"
      aria-hidden="true"
    />
  );
};

const Tag = ({children, variant, status, icon, ...rest}) => (
  <TagBase variant={variant} status={status} {...rest}>
    {renderTagIcon(icon)}
    {children || status}
  </TagBase>
);

Tag.defaultProps = {
  shape: 'pill',
  mr: 'xxsmall',
  tagSize: 'small',
  variant: 'default'
};

export default Tag;
