import React from 'react';
import styled from 'styled-components';

import {Box, Icon} from '@reactberry/core';
import FieldStyling from '../styling';

const SelectField = styled(Box)`
  position: relative;
  display: inline-flex;
  align-items: center;
  width: ${props => props.width || '100%'};
`;

const StyledIcon = styled(Icon)`
  pointer-events: none;
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
`;

StyledIcon.defaultProps = {
  name: 'ChevronSmallDownIcon',
  iconSize: 'small',
  fill: 'text.subtle'
};

export const StyledSelect = styled.select`
  ${FieldStyling};
  display: block;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  padding-right: ${props => (props.$hideIcon ? '0.75rem' : '2.25rem')};
  font-size: inherit;
  background-image: none;

  /* Hide arrow icon in IE browsers */
  &::-ms-expand {
    display: none;
  }
  /* Set options to normal weight */
  & > option {
    color: ${props => props.theme.colors.text.default};
    font-weight: normal;
  }

  &[multiple],
  &[size]:not([size='1']) {
    padding-right: 0.75rem;
  }
`;

StyledSelect.defaultProps = {
  fontSize: 'medium',
  p: 'xsmall',
  width: '100%'
};

const Select = React.forwardRef(
  ({children, hideIcon = false, iconProps, multiple, size, width = '100%', ...rest}, ref) => {
    const shouldHideIcon = hideIcon || multiple || Number(size) > 1;

    return (
      <SelectField width={width}>
        <StyledSelect ref={ref} multiple={multiple} size={size} $hideIcon={shouldHideIcon} {...rest}>
          {children}
        </StyledSelect>
        {!shouldHideIcon && <StyledIcon aria-hidden="true" {...iconProps} />}
      </SelectField>
    );
  }
);

Select.displayName = 'Select';

export default Select;
