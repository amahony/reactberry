import React from 'react';
import styled from 'styled-components';

import Button from '../Button';
import Group from '../Group';
import {focusRing} from '../utils';

const SegmentContext = React.createContext();

const getNextSegmentName = (segmentNames, currentName, key) => {
  const currentIndex = segmentNames.indexOf(currentName);

  if (currentIndex === -1) {
    return null;
  }

  if (key === 'ArrowRight' || key === 'ArrowDown') {
    return segmentNames[(currentIndex + 1) % segmentNames.length];
  }

  if (key === 'ArrowLeft' || key === 'ArrowUp') {
    return segmentNames[(currentIndex - 1 + segmentNames.length) % segmentNames.length];
  }

  if (key === 'Home') {
    return segmentNames[0];
  }

  if (key === 'End') {
    return segmentNames[segmentNames.length - 1];
  }

  return null;
};

const SegmentButton = styled(Button)`
  margin: 0;
  border: 1px solid
    ${({theme, $active}) =>
      $active ? theme.colors.surface.inverse : theme.colors.border.default};
  background-color: ${({theme, $active}) =>
    $active ? theme.colors.surface.inverse : theme.colors.surface.default};
  color: ${({theme, $active}) =>
    $active ? theme.colors.text.inverse : theme.colors.text.default};
  box-shadow: none;

  &:hover {
    background-color: ${({theme, $active}) =>
      $active ? theme.colors.surface.inverse : theme.colors.surface.muted};
    color: ${({theme, $active}) =>
      $active ? theme.colors.text.inverse : theme.colors.text.default};
  }

  &:focus {
    position: relative;
    z-index: 1;
    ${focusRing};
  }
`;

SegmentButton.defaultProps = {
  variant: 'custom',
  shape: 'square',
  mr: '0'
};

function SegmentList(props) {
  const {initialValue, value, onChange = () => {}, children, ...rest} = props;
  const segmentNames = React.Children.toArray(children)
    .filter(child => React.isValidElement(child) && child.props.name !== undefined)
    .map(child => child.props.name);
  const [internalValue, setInternalValue] = React.useState(
    initialValue !== undefined ? initialValue : segmentNames[0]
  );
  const activeSegment = value !== undefined ? value : internalValue;

  const changeSegment = (nextSegment, event) => {
    if (nextSegment === activeSegment) {
      return;
    }

    if (value === undefined) {
      setInternalValue(nextSegment);
    }

    onChange(nextSegment, event);
  };

  const segmentProviderValue = {activeSegment, changeSegment, segmentNames};

  return (
    <SegmentContext.Provider value={segmentProviderValue}>
      <Group
        type="buttons"
        role="group"
        aria-orientation={rest.vertical ? 'vertical' : 'horizontal'}
        {...rest}
      >
        {children}
      </Group>
    </SegmentContext.Provider>
  );
}

function Segment(props) {
  const {name, onClick = () => {}, children, ...rest} = props;

  const segmentContext = React.useContext(SegmentContext) || {};
  const isActive = segmentContext.activeSegment === name;

  const handleClick = event => {
    if (segmentContext.changeSegment) {
      segmentContext.changeSegment(name, event);
    }

    onClick(event);
  };

  const handleKeyDown = event => {
    const nextSegmentName = getNextSegmentName(
      segmentContext.segmentNames || [],
      name,
      event.key
    );

    if (!nextSegmentName) {
      return;
    }

    event.preventDefault();

    if (segmentContext.changeSegment) {
      segmentContext.changeSegment(nextSegmentName, event);
    }

    const nextSegment = event.currentTarget.parentElement.querySelector(
      `[data-segment-name="${nextSegmentName}"]`
    );

    if (nextSegment) {
      nextSegment.focus();
    }
  };

  return (
    <SegmentButton
      type="button"
      data-segment-name={name}
      $active={isActive}
      aria-pressed={isActive}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </SegmentButton>
  );
}

export {SegmentList, Segment};
