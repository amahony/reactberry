import React from 'react';
import {Button} from '../Button';
import {Group} from '../Group';

const SegmentContext = React.createContext();

function SegmentList(props) {
  const {initialValue, children, ...rest} = props;

  const [isActive, changeSegment] = React.useState(initialValue);
  const segmentProviderValue = {isActive, changeSegment};

  return (
    <SegmentContext.Provider value={segmentProviderValue}>
      <Group type="buttons" {...rest}>
        {children}
      </Group>
    </SegmentContext.Provider>
  );
}

function Segment(props) {
  const {name, onClick = () => {}, children, ...rest} = props;

  const segmentContext = React.useContext(SegmentContext);

  const handleClick = event => {
    segmentContext.changeSegment(name);
    onClick(event);
  };

  return (
    <Button
      variant="custom"
      bg={
        segmentContext.isActive === name ? 'palette.grays.5' : 'palette.grays.0'
      }
      color={segmentContext.isActive === name ? 'light' : 'palette.grays.7'}
      hover={segmentContext.isActive === name ? 'light' : 'palette.grays.7'}
      hoverbg={
        segmentContext.isActive === name ? 'palette.grays.7' : 'palette.grays.1'
      }
      onClick={handleClick}
      {...rest}
    >
      {children}
    </Button>
  );
}

export {SegmentList, Segment};
