# Breadcrumb Navigation Examples

Breadcrumb navigation patterns using the Design System components for clear user wayfinding and hierarchy.

## Overview

Breadcrumbs provide users with a clear path of their current location within the application hierarchy. They improve navigation efficiency and help users understand the site structure.

## Basic Breadcrumb

```jsx
import { Box, Text } from '@reactberry/system/elements';

function BasicBreadcrumb({ items }) {
  return (
    <Box 
      as="nav" 
      aria-label="Breadcrumb"
      role="navigation"
      py="s"
    >
      <Box 
        as="ol" 
        display="flex" 
        alignItems="center" 
        gap="xs"
        role="list"
      >
        {items.map((item, index) => (
          <Box key={item.id} as="li" role="listitem" display="flex" alignItems="center">
            {index > 0 && (
              <Text color="tertiary" mx="xs" aria-hidden="true">
                /
              </Text>
            )}
            
            {item.href ? (
              <Text 
                as="a" 
                href={item.href}
                fontSize="s" 
                color="secondary"
                hover="primary"
                textDecoration="none"
                borderRadius="xs"
                px="xs"
                py="mini"
              >
                {item.label}
              </Text>
            ) : (
              <Text 
                fontSize="s" 
                color="primary" 
                fontWeight="medium"
                aria-current="page"
              >
                {item.label}
              </Text>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

// Usage
const breadcrumbItems = [
  { id: '1', label: 'Home', href: '/' },
  { id: '2', label: 'Products', href: '/products' },
  { id: '3', label: 'Laptops', href: '/products/laptops' },
  { id: '4', label: 'MacBook Pro 16"' } // Current page (no href)
];

<BasicBreadcrumb items={breadcrumbItems} />
```

## Icon-Enhanced Breadcrumb

```jsx
import { Box, Text } from '@reactberry/system/elements';

function IconBreadcrumb({ items }) {
  return (
    <Box 
      as="nav" 
      aria-label="Breadcrumb"
      py="s"
    >
      <Box 
        as="ol" 
        display="flex" 
        alignItems="center" 
        gap="xs"
        role="list"
      >
        {items.map((item, index) => (
          <Box key={item.id} as="li" role="listitem" display="flex" alignItems="center">
            {index > 0 && (
              <Box display="flex" alignItems="center" mx="xs" color="tertiary">
                <Text fontSize="xs" aria-hidden="true">›</Text>
              </Box>
            )}
            
            {item.href ? (
              <Text 
                as="a" 
                href={item.href}
                display="flex"
                alignItems="center"
                gap="xs"
                fontSize="s" 
                color="secondary"
                hover="primary"
                textDecoration="none"
                borderRadius="xs"
                px="xs"
                py="mini"
                transition="all 0.2s ease"
              >
                {item.icon && (
                  <Text fontSize="s" aria-hidden="true">
                    {item.icon}
                  </Text>
                )}
                {item.label}
              </Text>
            ) : (
              <Box display="flex" alignItems="center" gap="xs">
                {item.icon && (
                  <Text fontSize="s" color="primary" aria-hidden="true">
                    {item.icon}
                  </Text>
                )}
                <Text 
                  fontSize="s" 
                  color="primary" 
                  fontWeight="medium"
                  aria-current="page"
                >
                  {item.label}
                </Text>
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

// Usage with icons
const iconBreadcrumbItems = [
  { id: '1', label: 'Home', href: '/', icon: '🏠' },
  { id: '2', label: 'Dashboard', href: '/dashboard', icon: '📊' },
  { id: '3', label: 'Projects', href: '/dashboard/projects', icon: '📁' },
  { id: '4', label: 'Website Redesign', icon: '🎨' }
];

<IconBreadcrumb items={iconBreadcrumbItems} />
```

## Truncated Breadcrumb

```jsx
import { Box, Text } from '@reactberry/system/elements';

function TruncatedBreadcrumb({ items, maxItems = 4 }) {
  const shouldTruncate = items.length > maxItems;
  
  const getDisplayItems = () => {
    if (!shouldTruncate) return items;
    
    const firstItem = items[0];
    const lastItems = items.slice(-(maxItems - 2));
    
    return [
      firstItem,
      { id: 'ellipsis', label: '...', isEllipsis: true },
      ...lastItems
    ];
  };

  const displayItems = getDisplayItems();

  return (
    <Box 
      as="nav" 
      aria-label="Breadcrumb"
      py="s"
    >
      <Box 
        as="ol" 
        display="flex" 
        alignItems="center" 
        gap="xs"
        role="list"
      >
        {displayItems.map((item, index) => (
          <Box key={item.id} as="li" role="listitem" display="flex" alignItems="center">
            {index > 0 && (
              <Text color="tertiary" mx="xs" aria-hidden="true">
                /
              </Text>
            )}
            
            {item.isEllipsis ? (
              <Text 
                fontSize="s" 
                color="tertiary"
                cursor="pointer"
                hover="secondary"
                px="xs"
                py="mini"
                borderRadius="xs"
                title={`${items.length - maxItems + 1} more levels`}
              >
                {item.label}
              </Text>
            ) : item.href ? (
              <Text 
                as="a" 
                href={item.href}
                fontSize="s" 
                color="secondary"
                hover="primary"
                textDecoration="none"
                borderRadius="xs"
                px="xs"
                py="mini"
                maxWidth="150px"
                truncate
              >
                {item.label}
              </Text>
            ) : (
              <Text 
                fontSize="s" 
                color="primary" 
                fontWeight="medium"
                aria-current="page"
                maxWidth="200px"
                truncate
              >
                {item.label}
              </Text>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

// Usage with many levels
const longBreadcrumbItems = [
  { id: '1', label: 'Home', href: '/' },
  { id: '2', label: 'Organization', href: '/org' },
  { id: '3', label: 'Department of Technology', href: '/org/tech' },
  { id: '4', label: 'Frontend Team', href: '/org/tech/frontend' },
  { id: '5', label: 'React Projects', href: '/org/tech/frontend/react' },
  { id: '6', label: 'Design System Implementation Project' }
];

<TruncatedBreadcrumb items={longBreadcrumbItems} maxItems={4} />
```

## Responsive Breadcrumb

```jsx
import { Box, Text } from '@reactberry/system/elements';

function ResponsiveBreadcrumb({ items }) {
  return (
    <Box 
      as="nav" 
      aria-label="Breadcrumb"
      py="s"
    >
      {/* Mobile: Show only current page with back link */}
      <Box display={['flex', 'none']} alignItems="center" gap="s">
        {items.length > 1 && (
          <Text 
            as="a" 
            href={items[items.length - 2]?.href}
            display="flex"
            alignItems="center"
            gap="xs"
            fontSize="s"
            color="secondary"
            textDecoration="none"
            hover="primary"
          >
            <Text aria-hidden="true">←</Text>
            Back
          </Text>
        )}
        
        <Text fontSize="s" color="primary" fontWeight="medium">
          {items[items.length - 1]?.label}
        </Text>
      </Box>

      {/* Desktop: Show full breadcrumb */}
      <Box 
        as="ol" 
        display={['none', 'flex']} 
        alignItems="center" 
        gap="xs"
        role="list"
      >
        {items.map((item, index) => (
          <Box key={item.id} as="li" role="listitem" display="flex" alignItems="center">
            {index > 0 && (
              <Text color="tertiary" mx="xs" aria-hidden="true">
                /
              </Text>
            )}
            
            {item.href ? (
              <Text 
                as="a" 
                href={item.href}
                fontSize="s" 
                color="secondary"
                hover="primary"
                textDecoration="none"
                borderRadius="xs"
                px="xs"
                py="mini"
              >
                {item.label}
              </Text>
            ) : (
              <Text 
                fontSize="s" 
                color="primary" 
                fontWeight="medium"
                aria-current="page"
              >
                {item.label}
              </Text>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
```

## Dropdown Breadcrumb

```jsx
import { useState } from 'react';
import { Box, Text } from '@reactberry/system/elements';

function DropdownBreadcrumb({ items }) {
  const [showDropdown, setShowDropdown] = useState(false);
  
  const firstItem = items[0];
  const middleItems = items.slice(1, -1);
  const lastItem = items[items.length - 1];
  
  const hasMiddleItems = middleItems.length > 0;

  return (
    <Box 
      as="nav" 
      aria-label="Breadcrumb"
      py="s"
    >
      <Box 
        as="ol" 
        display="flex" 
        alignItems="center" 
        gap="xs"
        role="list"
      >
        {/* First item */}
        <Box as="li" role="listitem">
          <Text 
            as="a" 
            href={firstItem.href}
            fontSize="s" 
            color="secondary"
            hover="primary"
            textDecoration="none"
            borderRadius="xs"
            px="xs"
            py="mini"
          >
            {firstItem.label}
          </Text>
        </Box>

        {/* Dropdown for middle items */}
        {hasMiddleItems && (
          <>
            <Text color="tertiary" aria-hidden="true">/</Text>
            
            <Box as="li" role="listitem" position="relative">
              <Text
                as="button"
                fontSize="s"
                color="secondary"
                hover="primary"
                borderRadius="xs"
                px="xs"
                py="mini"
                cursor="pointer"
                onClick={() => setShowDropdown(!showDropdown)}
                aria-expanded={showDropdown}
                aria-haspopup="true"
              >
                ...
              </Text>
              
              {showDropdown && (
                <Box
                  position="absolute"
                  top="100%"
                  left="0"
                  mt="xs"
                  skin="overlay"
                  shape="rounded"
                  py="xs"
                  minWidth="200px"
                  zIndex={100}
                >
                  {middleItems.map((item) => (
                    <Box key={item.id} px="s" py="xs">
                      <Text 
                        as="a" 
                        href={item.href}
                        fontSize="s"
                        color="secondary"
                        hover="primary"
                        textDecoration="none"
                        display="block"
                        px="xs"
                        py="mini"
                        borderRadius="xs"
                      >
                        {item.label}
                      </Text>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </>
        )}

        {/* Current page */}
        <Text color="tertiary" aria-hidden="true">/</Text>
        
        <Box as="li" role="listitem">
          <Text 
            fontSize="s" 
            color="primary" 
            fontWeight="medium"
            aria-current="page"
          >
            {lastItem.label}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
```

## Styled Breadcrumb Variants

### Pill Style Breadcrumb

```jsx
function PillBreadcrumb({ items }) {
  return (
    <Box as="nav" aria-label="Breadcrumb" py="s">
      <Box as="ol" display="flex" alignItems="center" gap="xs" role="list">
        {items.map((item, index) => (
          <Box key={item.id} as="li" role="listitem" display="flex" alignItems="center">
            {index > 0 && (
              <Text color="tertiary" mx="xs" aria-hidden="true">→</Text>
            )}
            
            {item.href ? (
              <Text 
                as="a" 
                href={item.href}
                fontSize="s" 
                color="secondary"
                bg="neutral.2"
                hover="primary"
                textDecoration="none"
                shape="pill"
                px="s"
                py="xs"
                transition="all 0.2s ease"
              >
                {item.label}
              </Text>
            ) : (
              <Text 
                fontSize="s" 
                color="white"
                bg="primary"
                fontWeight="medium"
                shape="pill"
                px="s"
                py="xs"
                aria-current="page"
              >
                {item.label}
              </Text>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
```

### Underlined Breadcrumb

```jsx
function UnderlinedBreadcrumb({ items }) {
  return (
    <Box as="nav" aria-label="Breadcrumb" py="s" borderBottom="1px solid" borderColor="neutral.3">
      <Box as="ol" display="flex" alignItems="center" gap="m" role="list">
        {items.map((item, index) => (
          <Box key={item.id} as="li" role="listitem" display="flex" alignItems="center">
            {index > 0 && (
              <Text color="tertiary" mx="s" fontSize="xs" aria-hidden="true">•</Text>
            )}
            
            {item.href ? (
              <Text 
                as="a" 
                href={item.href}
                fontSize="s" 
                color="secondary"
                hover="primary"
                textDecoration="none"
                borderBottom="2px solid transparent"
                css={{
                  '&:hover': {
                    borderBottomColor: 'currentColor'
                  }
                }}
                pb="xs"
              >
                {item.label}
              </Text>
            ) : (
              <Text 
                fontSize="s" 
                color="primary" 
                fontWeight="medium"
                borderBottom="2px solid"
                borderColor="primary"
                pb="xs"
                aria-current="page"
              >
                {item.label}
              </Text>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
```

## Accessibility Best Practices

### Complete Accessible Breadcrumb

```jsx
function AccessibleBreadcrumb({ items }) {
  return (
    <Box 
      as="nav" 
      aria-label="Breadcrumb navigation"
      role="navigation"
      py="s"
    >
      <Box 
        as="ol" 
        display="flex" 
        alignItems="center" 
        gap="xs"
        role="list"
        css={{
          listStyle: 'none',
          margin: 0,
          padding: 0
        }}
      >
        {items.map((item, index) => (
          <Box 
            key={item.id} 
            as="li" 
            role="listitem" 
            display="flex" 
            alignItems="center"
          >
            {index > 0 && (
              <Text 
                color="tertiary" 
                mx="xs" 
                aria-hidden="true"
                role="separator"
              >
                /
              </Text>
            )}
            
            {item.href ? (
              <Text 
                as="a" 
                href={item.href}
                fontSize="s" 
                color="secondary"
                hover="primary"
                textDecoration="none"
                borderRadius="xs"
                px="xs"
                py="mini"
                css={{
                  '&:focus': {
                    outline: '2px solid currentColor',
                    outlineOffset: '2px'
                  }
                }}
                // Add context for screen readers
                aria-label={index === 0 ? `Go to ${item.label}` : `Go to ${item.label} page`}
              >
                {item.label}
              </Text>
            ) : (
              <Text 
                fontSize="s" 
                color="primary" 
                fontWeight="medium"
                aria-current="page"
                // Let screen readers know this is the current page
                aria-label={`Current page: ${item.label}`}
              >
                {item.label}
              </Text>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
```

## Common Patterns

### E-commerce Breadcrumb

```jsx
const ecommerceBreadcrumb = [
  { id: '1', label: 'Home', href: '/' },
  { id: '2', label: 'Electronics', href: '/electronics' },
  { id: '3', label: 'Computers', href: '/electronics/computers' },
  { id: '4', label: 'Laptops', href: '/electronics/computers/laptops' },
  { id: '5', label: 'Apple MacBook Pro 16-inch' }
];

<BasicBreadcrumb items={ecommerceBreadcrumb} />
```

### Documentation Breadcrumb

```jsx
const docsBreadcrumb = [
  { id: '1', label: 'Documentation', href: '/docs', icon: '📚' },
  { id: '2', label: 'Components', href: '/docs/components', icon: '🧩' },
  { id: '3', label: 'Navigation', href: '/docs/components/navigation', icon: '🧭' },
  { id: '4', label: 'Breadcrumbs', icon: '🍞' }
];

<IconBreadcrumb items={docsBreadcrumb} />
```

### Admin Dashboard Breadcrumb

```jsx
const adminBreadcrumb = [
  { id: '1', label: 'Dashboard', href: '/admin', icon: '📊' },
  { id: '2', label: 'Users', href: '/admin/users', icon: '👥' },
  { id: '3', label: 'User Management', href: '/admin/users/management', icon: '⚙️' },
  { id: '4', label: 'John Doe', icon: '👤' }
];

<TruncatedBreadcrumb items={adminBreadcrumb} maxItems={3} />
```

## Best Practices

### ✅ Do

- Always include proper ARIA labels and roles for screen readers
- Use semantic HTML (`nav`, `ol`, `li`) for proper document structure
- Provide clear visual hierarchy with the current page emphasized
- Include separators with `aria-hidden="true"` to hide from screen readers
- Use `aria-current="page"` for the current page
- Ensure adequate color contrast between text and background
- Make interactive elements large enough for touch devices (minimum 44px)

### ❌ Don't

- Don't make the current page clickable
- Don't use breadcrumbs for single-level navigation
- Don't include the current page URL in the last breadcrumb item
- Don't use breadcrumbs as the primary navigation method
- Don't create breadcrumbs longer than 6-7 levels without truncation
- Don't forget to test with keyboard navigation and screen readers

## Responsive Considerations

- **Mobile**: Consider showing only the current page with a back button
- **Tablet**: Show abbreviated breadcrumbs with ellipsis for long paths
- **Desktop**: Display full breadcrumb trail when space allows
- **Touch devices**: Ensure breadcrumb links are large enough (44px minimum)

## Performance Tips

- Implement breadcrumbs on the server side when possible for SEO
- Use semantic HTML for better accessibility and SEO
- Consider lazy loading for dropdown content in complex breadcrumbs
- Minimize re-renders by memoizing breadcrumb components when data doesn't change frequently