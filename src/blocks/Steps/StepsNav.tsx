"use client";

import React from 'react';
import StepProgress from './StepProgress';
import { BaseStepProps } from './types';

interface StepsNavProps extends BaseStepProps {
  /** Additional margin top spacing */
  mt?: string | number | object;
}

function StepsNav({
  config,
  active,
  mt = "medium",
  showLabels = true,
  ...rest
}: StepsNavProps) {
  return (
    <StepProgress
      showLabels={showLabels}
      config={config}
      active={active}
      mt={mt}
      {...rest}
    />
  );
}

export default StepsNav;
