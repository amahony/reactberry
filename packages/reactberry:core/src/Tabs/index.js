import React from 'react';

import Box from '../Box';
import Button from '../Button';
import Group from '../Group';

const TabContext = React.createContext();

function Tabs(props) {
  const {initialValue, children, ...rest} = props;

  const [activeTab, changeTab] = React.useState(initialValue);
  const tabProviderValue = {activeTab, changeTab};

  return (
    <TabContext.Provider value={tabProviderValue}>
      <Box {...rest}>{children}</Box>
    </TabContext.Provider>
  );
}

function TabList(props) {
  const {children, ...rest} = props;

  return (
    <Group type="tabs" {...rest}>
      {children}
    </Group>
  );
}

function Tab(props) {
  const {name, onClick = () => {}, children, ...rest} = props;

  const tabContext = React.useContext(TabContext);

  const handleClick = event => {
    tabContext.changeTab(name);
    onClick(event);
  };

  return (
    <Button
      variant={tabContext.activeTab === name ? 'default' : 'custom'}
      intent={tabContext.activeTab === name ? 'action' : ''}
      shape="square"
      mr="0"
      onClick={handleClick}
      {...rest}
    >
      {children}
    </Button>
  );
}

function TabPanel(props) {
  const {name, children, ...rest} = props;

  const tabContext = React.useContext(TabContext);

  return (
    tabContext.activeTab === name && (
      <Box p="small" {...rest}>
        {children}
      </Box>
    )
  );
}

export {Tabs, TabList, Tab, TabPanel};
