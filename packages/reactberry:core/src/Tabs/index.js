import React from 'react';
import styled from 'styled-components';

import Box from '../Box';
import Button from '../Button';
import Group from '../Group';
import {focusRing} from '../utils';

const TabContext = React.createContext();

const sanitizeName = name =>
  String(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const createTabId = (baseId, name) => `${baseId}-tab-${sanitizeName(name)}`;
const createPanelId = (baseId, name) => `${baseId}-panel-${sanitizeName(name)}`;

const getNextTabName = (tabNames, currentName, key) => {
  const currentIndex = tabNames.indexOf(currentName);

  if (currentIndex === -1) {
    return null;
  }

  if (key === 'ArrowRight' || key === 'ArrowDown') {
    return tabNames[(currentIndex + 1) % tabNames.length];
  }

  if (key === 'ArrowLeft' || key === 'ArrowUp') {
    return tabNames[(currentIndex - 1 + tabNames.length) % tabNames.length];
  }

  if (key === 'Home') {
    return tabNames[0];
  }

  if (key === 'End') {
    return tabNames[tabNames.length - 1];
  }

  return null;
};

const TabButton = styled(Button)`
  margin: 0;
  border: 0;
  border-bottom: 2px solid
    ${({theme, $active}) => ($active ? theme.colors.action : 'transparent')};
  border-radius: 0;
  background-color: transparent;
  color: ${({theme, $active}) =>
    $active ? theme.colors.action : theme.colors.text.muted};
  box-shadow: none;

  &:hover {
    background-color: ${({theme}) => theme.colors.surface.subtle};
    color: ${({theme, $active}) =>
      $active ? theme.colors.action : theme.colors.text.default};
  }

  &:focus {
    position: relative;
    z-index: 1;
    border-radius: ${({theme}) => theme.radii.small};
    ${focusRing};
  }
`;

TabButton.defaultProps = {
  variant: 'custom',
  shape: 'square',
  mr: '0'
};

function Tabs(props) {
  const {id = 'tabs', initialValue, value, onChange = () => {}, children, ...rest} = props;
  const [tabNames, setTabNames] = React.useState([]);
  const [internalValue, setInternalValue] = React.useState(initialValue);
  const activeTab = value !== undefined ? value : internalValue;

  React.useEffect(() => {
    if (
      value === undefined &&
      initialValue === undefined &&
      internalValue === undefined &&
      tabNames.length > 0
    ) {
      setInternalValue(tabNames[0]);
    }
  }, [initialValue, internalValue, tabNames, value]);

  const changeTab = (nextTab, event) => {
    if (nextTab === activeTab) {
      return;
    }

    if (value === undefined) {
      setInternalValue(nextTab);
    }

    onChange(nextTab, event);
  };

  const registerTabNames = nextTabNames => {
    setTabNames(currentTabNames => {
      if (
        currentTabNames.length === nextTabNames.length &&
        currentTabNames.every((tabName, index) => tabName === nextTabNames[index])
      ) {
        return currentTabNames;
      }

      return nextTabNames;
    });
  };

  const tabProviderValue = {
    activeTab,
    baseId: id,
    changeTab,
    registerTabNames,
    tabNames
  };

  return (
    <TabContext.Provider value={tabProviderValue}>
      <Box id={id} {...rest}>
        {children}
      </Box>
    </TabContext.Provider>
  );
}

function TabList(props) {
  const {children, ...rest} = props;
  const tabContext = React.useContext(TabContext) || {};
  const tabNames = React.Children.toArray(children)
    .filter(child => React.isValidElement(child) && child.props.name !== undefined)
    .map(child => child.props.name);

  React.useEffect(() => {
    if (tabContext.registerTabNames) {
      tabContext.registerTabNames(tabNames);
    }
  }, [tabContext, tabNames]);

  return (
    <Group
      type="tabs"
      role="tablist"
      aria-orientation={rest.vertical ? 'vertical' : 'horizontal'}
      {...rest}
    >
      {children}
    </Group>
  );
}

function Tab(props) {
  const {name, onClick = () => {}, children, ...rest} = props;

  const tabContext = React.useContext(TabContext) || {};
  const isActive = tabContext.activeTab === name;
  const baseId = tabContext.baseId || 'tabs';
  const tabId = createTabId(baseId, name);
  const panelId = createPanelId(baseId, name);

  const handleClick = event => {
    if (tabContext.changeTab) {
      tabContext.changeTab(name, event);
    }

    onClick(event);
  };

  const handleKeyDown = event => {
    const nextTabName = getNextTabName(tabContext.tabNames || [], name, event.key);

    if (!nextTabName) {
      return;
    }

    event.preventDefault();

    if (tabContext.changeTab) {
      tabContext.changeTab(nextTabName, event);
    }

    if (typeof document !== 'undefined') {
      const nextTab = document.getElementById(createTabId(baseId, nextTabName));

      if (nextTab) {
        nextTab.focus();
      }
    }
  };

  return (
    <TabButton
      type="button"
      id={tabId}
      role="tab"
      $active={isActive}
      aria-selected={isActive}
      aria-controls={panelId}
      tabIndex={isActive ? 0 : -1}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </TabButton>
  );
}

function TabPanel(props) {
  const {name, children, ...rest} = props;

  const tabContext = React.useContext(TabContext) || {};
  const isActive = tabContext.activeTab === name;
  const baseId = tabContext.baseId || 'tabs';

  if (!isActive) {
    return null;
  }

  return (
    <Box
      p="small"
      id={createPanelId(baseId, name)}
      role="tabpanel"
      aria-labelledby={createTabId(baseId, name)}
      {...rest}
    >
      {children}
    </Box>
  );
}

export {Tabs, TabList, Tab, TabPanel};
