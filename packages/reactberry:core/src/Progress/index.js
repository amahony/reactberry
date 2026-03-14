import React from 'react';
import styled from 'styled-components';

import Box from '../Box';

const ProgressTrack = styled(Box)`
  position: relative;
  display: block;
  overflow: hidden;
`;

const ProgressBar = styled(Box)`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: ${props => props.$value}%;
  transition: width 0.2s ease-out;
`;

const clampProgress = progress => {
  const value = Number(progress);

  if (Number.isNaN(value)) {
    return 0;
  }

  return Math.max(0, Math.min(100, value));
};

const resolveProgressColor = ({type, progress, color}) => {
  if (color) {
    return color;
  }

  if (type === 'neutral') {
    return 'secondary';
  }

  if (type === 'custom') {
    return 'action';
  }

  if (type === 'negative') {
    if (progress <= 25) {
      return 'success';
    }

    if (progress <= 50) {
      return 'secondary';
    }

    if (progress <= 75) {
      return 'warning';
    }

    return 'danger';
  }

  if (progress > 90) {
    return 'success';
  }

  if (progress >= 70) {
    return 'secondary';
  }

  if (progress >= 50) {
    return 'warning';
  }

  return 'danger';
};

const Progress = ({progress, type, color, small, ...rest}) => {
  const value = clampProgress(progress);

  return (
    <ProgressTrack
      width="100%"
      bg="surface.sunken"
      height={small ? '0.25rem' : '0.5rem'}
      shape="pill"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
      {...rest}
    >
      <ProgressBar
        $value={value}
        bg={resolveProgressColor({type, progress: value, color})}
        shape="pill"
      />
    </ProgressTrack>
  );
};

Progress.defaultProps = {
  width: '100%',
  type: 'negative',
  progress: 0
};

export default Progress;
