import React from 'react';
import styled from 'styled-components';

import Box from '../Box';

const DividerStyled = styled(Box)`
  flex-shrink: 0;
`;

const Divider = ({decorative, orientation, ...rest}) => {
  const isVertical = orientation === 'vertical';
  const orientationProps = isVertical
    ? {
        alignSelf: 'stretch',
        display: 'inline-flex',
        height: '1em',
        mx: 'small',
        my: 0,
        width: '1px'
      }
    : {
        display: 'block',
        height: '1px',
        mx: 0,
        my: 'small',
        width: '100%'
      };

  return (
    <DividerStyled
      aria-hidden={decorative ? true : undefined}
      aria-orientation={decorative ? undefined : orientation}
      role={decorative ? undefined : 'separator'}
      {...orientationProps}
      {...rest}
    />
  );
};

Divider.defaultProps = {
  bg: 'border.default',
  decorative: true,
  orientation: 'horizontal'
};

export default Divider;
