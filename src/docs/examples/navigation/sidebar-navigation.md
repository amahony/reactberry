# Sidebar Navigation Examples

Comprehensive sidebar navigation patterns using the Reactberry Design System components for application navigation and content organization.

## Overview

Sidebar navigation provides a persistent way to navigate through different sections of an application. These examples demonstrate various sidebar patterns including collapsible menus, nested navigation, and responsive behavior.

## Basic Sidebar Navigation

```jsx
import { Box, Text, Button } from '@/design-system/elements';

function BasicSidebar({ items, activeItem, onItemClick }) {
  return (
    <Box
      as="nav"
      width="250px"
      height="100vh"
      skin="panel"
      p="m"
      borderRight="1px solid"
      borderColor="neutral.3"
      role="navigation"
      aria-label="Main navigation"
    >
      <Box mb="l">
        <Text as="h2" fontSize="m" fontWeight="bold" color="primary">
          Reactberry
        </Text>
      </Box>

      <Box as="ul" role="list" display="flex" flexDirection="column" gap="xs">
        {items.map((item) => (
          <Box key={item.id} as="li" role="listitem">
            <Button
              as="button"
              variant="ghost"
              $size="medium"
              width="100%"
              textAlign="left"
              justifyContent="flex-start"
              skin={activeItem === item.id ? "highlight" : "transparent"}
              hover="subtle"
              px="s"
              py="s"
              onClick={() => onItemClick(item.id)}
              aria-current={activeItem === item.id ? "page" : undefined}
            >
              <Box display="flex" alignItems="center" gap="s" width="100%">
                {item.icon && (
                  <Text fontSize="s" aria-hidden="true">
                    {item.icon}
                  </Text>
                )}
                <Text fontSize="s" fontWeight={activeItem === item.id ? "medium" : "normal"}>
                  {item.label}
                </Text>
              </Box>
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

// Usage
const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'projects', label: 'Projects', icon: '📁' },
  { id: 'team', label: 'Team', icon: '👥' },
  { id: 'analytics', label: 'Analytics', icon: '📈' },
  { id: 'settings', label: 'Settings', icon: '⚙️' }
];

function App() {
  const [activeItem, setActiveItem] = useState('dashboard');

  return (
    <Box display="flex">
      <BasicSidebar
        items={navigationItems}
        activeItem={activeItem}
        onItemClick={setActiveItem}
      />
      <Box flex="1" p="l">
        {/* Main content */}
      </Box>
    </Box>
  );
}
```

## Collapsible Sidebar

```jsx
import { useState } from 'react';
import { Box, Text, Button } from '@/design-system/elements';

function CollapsibleSidebar({ items, activeItem, onItemClick }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Box
      as="nav"
      width={isCollapsed ? "64px" : "250px"}
      height="100vh"
      skin="panel"
      p={isCollapsed ? "s" : "m"}
      borderRight="1px solid"
      borderColor="neutral.3"
      transition="all 0.3s ease"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Header with toggle */}
      <Box display="flex" alignItems="center" justifyContent="space-between" mb="l">
        {!isCollapsed && (
          <Text as="h2" fontSize="m" fontWeight="bold" color="primary">
            Reactberry
          </Text>
        )}

        <Button
          variant="ghost"
          $size="small"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          shape="rounded"
          p="xs"
        >
          <Text aria-hidden="true">
            {isCollapsed ? '→' : '←'}
          </Text>
        </Button>
      </Box>

      {/* Navigation items */}
      <Box as="ul" role="list" display="flex" flexDirection="column" gap="xs">
        {items.map((item) => (
          <Box key={item.id} as="li" role="listitem">
            <Button
              as="button"
              variant="ghost"
              $size="medium"
              width="100%"
              textAlign="left"
              justifyContent={isCollapsed ? "center" : "flex-start"}
              skin={activeItem === item.id ? "highlight" : "transparent"}
              hover="subtle"
              px={isCollapsed ? "xs" : "s"}
              py="s"
              onClick={() => onItemClick(item.id)}
              aria-current={activeItem === item.id ? "page" : undefined}
              title={isCollapsed ? item.label : undefined}
            >
              <Box
                display="flex"
                alignItems="center"
                gap={isCollapsed ? "0" : "s"}
                width="100%"
                justifyContent={isCollapsed ? "center" : "flex-start"}
              >
                {item.icon && (
                  <Text fontSize="s" aria-hidden="true">
                    {item.icon}
                  </Text>
                )}
                {!isCollapsed && (
                  <Text fontSize="s" fontWeight={activeItem === item.id ? "medium" : "normal"}>
                    {item.label}
                  </Text>
                )}
              </Box>
            </Button>
          </Box>
        ))}
      </Box>

      {/* User section at bottom */}
      {!isCollapsed && (
        <Box mt="auto" pt="l" borderTop="1px solid" borderColor="neutral.3">
          <Box display="flex" alignItems="center" gap="s" p="s">
            <Box
              width="32px"
              height="32px"
              skin="primary"
              shape="circle"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize="s" fontWeight="bold" color="white">
                JD
              </Text>
            </Box>
            <Box>
              <Text fontSize="s" fontWeight="medium">John Doe</Text>
              <Text fontSize="xs" color="secondary">john@example.com</Text>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
```

## Nested Sidebar Navigation

```jsx
import { useState } from 'react';
import { Box, Text, Button } from '@/design-system/elements';

function NestedSidebar({ sections, activeItem, onItemClick }) {
  const [expandedSections, setExpandedSections] = useState(new Set(['main']));

  const toggleSection = (sectionId) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  return (
    <Box
      as="nav"
      width="280px"
      height="100vh"
      skin="panel"
      p="m"
      borderRight="1px solid"
      borderColor="neutral.3"
      overflowY="auto"
      role="navigation"
      aria-label="Main navigation"
    >
      <Box mb="l">
        <Text as="h2" fontSize="m" fontWeight="bold" color="primary">
          Dashboard
        </Text>
      </Box>

      {sections.map((section) => (
        <Box key={section.id} mb="m">
          {/* Section header */}
          <Button
            variant="ghost"
            $size="small"
            width="100%"
            textAlign="left"
            justifyContent="space-between"
            hover="subtle"
            px="xs"
            py="xs"
            onClick={() => toggleSection(section.id)}
            aria-expanded={expandedSections.has(section.id)}
            aria-controls={`section-${section.id}`}
          >
            <Text fontSize="xs" fontWeight="bold" color="tertiary" textTransform="uppercase">
              {section.title}
            </Text>
            <Text fontSize="xs" color="tertiary" aria-hidden="true">
              {expandedSections.has(section.id) ? '−' : '+'}
            </Text>
          </Button>

          {/* Section items */}
          {expandedSections.has(section.id) && (
            <Box
              id={`section-${section.id}`}
              as="ul"
              role="list"
              display="flex"
              flexDirection="column"
              gap="xs"
              mt="xs"
              ml="s"
            >
              {section.items.map((item) => (
                <Box key={item.id} as="li" role="listitem">
                  <Button
                    as="button"
                    variant="ghost"
                    $size="medium"
                    width="100%"
                    textAlign="left"
                    justifyContent="flex-start"
                    skin={activeItem === item.id ? "highlight" : "transparent"}
                    hover="subtle"
                    px="s"
                    py="xs"
                    onClick={() => onItemClick(item.id)}
                    aria-current={activeItem === item.id ? "page" : undefined}
                  >
                    <Box display="flex" alignItems="center" gap="s" width="100%">
                      {item.icon && (
                        <Text fontSize="s" aria-hidden="true">
                          {item.icon}
                        </Text>
                      )}
                      <Text fontSize="s" fontWeight={activeItem === item.id ? "medium" : "normal"}>
                        {item.label}
                      </Text>
                      {item.badge && (
                        <Box ml="auto">
                          <Text
                            fontSize="xs"
                            skin="error"
                            px="xs"
                            py="mini"
                            shape="rounded"
                            fontWeight="medium"
                          >
                            {item.badge}
                          </Text>
                        </Box>
                      )}
                    </Box>
                  </Button>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}

// Usage with nested sections
const nestedSections = [
  {
    id: 'main',
    title: 'Main',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: '📊' },
      { id: 'analytics', label: 'Analytics', icon: '📈' }
    ]
  },
  {
    id: 'content',
    title: 'Content Management',
    items: [
      { id: 'projects', label: 'Projects', icon: '📁', badge: '12' },
      { id: 'documents', label: 'Documents', icon: '📄' },
      { id: 'media', label: 'Media Library', icon: '🖼️' }
    ]
  },
  {
    id: 'admin',
    title: 'Administration',
    items: [
      { id: 'users', label: 'Users', icon: '👥' },
      { id: 'permissions', label: 'Permissions', icon: '🔐' },
      { id: 'settings', label: 'Settings', icon: '⚙️' }
    ]
  }
];
```

## Responsive Sidebar

```jsx
import { useState, useEffect } from 'react';
import { Box, Text, Button } from '@/design-system/elements';

function ResponsiveSidebar({ items, activeItem, onItemClick }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Close mobile menu when clicking outside
  const handleOverlayClick = () => {
    setIsMobileMenuOpen(false);
  };

  const handleItemClick = (itemId) => {
    onItemClick(itemId);
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Mobile menu button */}
      {isMobile && (
        <Box
          position="fixed"
          top="0"
          left="0"
          right="0"
          height="60px"
          skin="surface"
          borderBottom="1px solid"
          borderColor="neutral.3"
          display="flex"
          alignItems="center"
          px="m"
          zIndex={999}
        >
          <Button
            variant="ghost"
            $size="medium"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <Text aria-hidden="true">☰</Text>
          </Button>

          <Text as="h1" fontSize="m" fontWeight="bold" color="primary" ml="m">
            Reactberry
          </Text>
        </Box>
      )}

      {/* Overlay for mobile */}
      {isMobile && isMobileMenuOpen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="rgba(0, 0, 0, 0.5)"
          zIndex={1000}
          onClick={handleOverlayClick}
        />
      )}

      {/* Sidebar */}
      <Box
        as="nav"
        position={isMobile ? "fixed" : "relative"}
        top="0"
        left={isMobile ? (isMobileMenuOpen ? "0" : "-280px") : "0"}
        width="280px"
        height="100vh"
        skin="panel"
        p="m"
        borderRight="1px solid"
        borderColor="neutral.3"
        transition="left 0.3s ease"
        zIndex={1001}
        overflowY="auto"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Mobile header with close button */}
