# Responsive Design Guide

Learn how to create mobile-first, responsive interfaces using the Design System's built-in responsive capabilities.

## Overview

The Design System is built with responsive design at its core. Every component supports responsive values through styled-system, making it easy to create interfaces that adapt seamlessly across devices.

## Mobile-First Philosophy

We follow a mobile-first approach:
1. **Start with mobile** - Design for the smallest screen first
2. **Progressive enhancement** - Add complexity for larger screens
3. **Content-first** - Prioritize content hierarchy across breakpoints
4. **Touch-friendly** - Ensure interactive elements work on touch devices

## Breakpoints

The design system uses the following breakpoints:

```javascript
breakpoints = ["32rem", "48rem", "64rem", "80rem", "96rem"]
// 512px, 768px, 1024px, 1280px, 1536px

// Available as aliases:
breakpoints.xs = "32rem"  // 512px
breakpoints.sm = "48rem"  // 768px  
breakpoints.md = "64rem"  // 1024px
breakpoints.lg = "80rem"  // 1280px
breakpoints.xl = "96rem"  // 1536px
```

## Responsive Value Syntax

### Array Syntax (Mobile-First)

Use arrays to specify values for different breakpoints:

```jsx
// [mobile, tablet, desktop, large, xlarge]
<Box p={['xs', 's', 'm', 'l', 'xl']} />
```

### Object Syntax (Named Breakpoints)

Use objects for explicit breakpoint targeting:

```jsx
<Box p={{ base: 'xs', md: 's', lg: 'm' }} />
```

### Responsive Utilities

```jsx
// Skip breakpoints with null
<Box width={[1, null, 1/2]} />  // Full width on mobile, half on desktop

// Responsive display
<Box display={['none', 'block']} />  // Hidden on mobile, visible on larger screens

// Responsive flex direction
<Box display="flex" flexDirection={['column', 'row']} />
```

## Layout Patterns

### Responsive Grid

```jsx
<Box 
  display="grid" 
  gridTemplateColumns={[
    "1fr",                    // Mobile: 1 column
    "1fr 1fr",               // Tablet: 2 columns
    "repeat(3, 1fr)",        // Desktop: 3 columns
    "repeat(4, 1fr)"         // Large: 4 columns
  ]}
  gap={['s', 'm', 'l']}
>
  {items.map(item => (
    <Box key={item.id} skin="card" p="m">
      <Text>{item.title}</Text>
    </Box>
  ))}
</Box>
```

### Responsive Flexbox

```jsx
<Box 
  display="flex" 
  flexDirection={['column', 'row']}
  gap={['s', 'm']}
  alignItems={['stretch', 'center']}
>
  <Box flex={[1, 2]} order={[2, 1]}>
    <Text>Main content</Text>
  </Box>
  <Box flex={[1, 1]} order={[1, 2]}>
    <Text>Sidebar</Text>
  </Box>
</Box>
```

### Responsive Spacing

```jsx
<Box 
  p={['s', 'm', 'l']}        // Responsive padding
  m={['xs', 's', 'm']}       // Responsive margin
  gap={['mini', 'xs', 's']}  // Responsive gap
>
  <Text fontSize={['s', 'm', 'l']}>
    Responsive content
  </Text>
</Box>
```

## Component Responsive Examples

### Typography

```jsx
<Text 
  as="h1" 
  fontSize={['l', 'xl', 'xxl']}
  fontWeight={['bold', 'bold', 'normal']}
  lineHeight={[1.2, 1.3, 1.4]}
  textAlign={['center', 'left']}
  mb={['s', 'm', 'l']}
>
  Responsive Heading
</Text>

<Text 
  as="p" 
  fontSize={['s', 'm']}
  lineHeight={['relaxed', 'normal']}
  maxWidth={['100%', '600px']}
  mx={[0, 'auto']}
>
  Responsive paragraph text
</Text>
```

### Buttons

```jsx
<Button 
  variant="primary" 
  $size={['small', 'medium', 'large']}
  fullWidth={[true, false]}
  px={['s', 'm', 'l']}
>
  Responsive Button
</Button>

<Box display="flex" flexDirection={['column', 'row']} gap="s">
  <Button 
    variant="outline" 
    $size={['medium', 'large']}
    flex={[1, 'none']}
  >
    Cancel
  </Button>
  <Button 
    variant="primary" 
    $size={['medium', 'large']}
    flex={[1, 'none']}
  >
    Save
  </Button>
</Box>
```

### Forms

```jsx
<Box as="form" display="flex" flexDirection="column" gap="m">
  {/* Responsive form grid */}
  <Box 
    display="grid" 
    gridTemplateColumns={['1fr', '1fr 1fr']}
    gap="m"
  >
    <Box>
      <Text as="label" fontSize="s" fontWeight="medium" mb="xs" display="block">
        First Name
      </Text>
      <Field 
        as="input" 
        type="text" 
        placeholder="First name"
        variant="outline"
        $size={['medium', 'large']}
      />
    </Box>
    
    <Box>
      <Text as="label" fontSize="s" fontWeight="medium" mb="xs" display="block">
        Last Name
      </Text>
      <Field 
        as="input" 
        type="text" 
        placeholder="Last name"
        variant="outline"
        $size={['medium', 'large']}
      />
    </Box>
  </Box>
  
  {/* Full width field */}
  <Box>
    <Text as="label" fontSize="s" fontWeight="medium" mb="xs" display="block">
      Email
    </Text>
    <Field 
      as="input" 
      type="email" 
      placeholder="Enter your email"
      variant="outline"
      $size={['medium', 'large']}
    />
  </Box>
</Box>
```

### Navigation

```jsx
function ResponsiveNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Box as="nav" skin="surface" p="m">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        {/* Logo */}
        <Text as="h1" fontSize="l" fontWeight="bold">
          App Name
        </Text>

        {/* Desktop Navigation */}
        <Box display={['none', 'flex']} alignItems="center" gap="l">
          <Text as="a" href="/home" fontSize="s" color="secondary">
            Home
          </Text>
          <Text as="a" href="/about" fontSize="s" color="secondary">
            About
          </Text>
          <Text as="a" href="/contact" fontSize="s" color="secondary">
            Contact
          </Text>
          <Button variant="primary" $size="small">
            Sign In
          </Button>
        </Box>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          $size="small"
          display={['block', 'none']}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </Button>
      </Box>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <Box 
          display={['flex', 'none']}
          flexDirection="column"
          gap="m"
          pt="m"
          borderTop="1px solid"
          borderColor="neutral.3"
          mt="m"
        >
          <Text as="a" href="/home" fontSize="s" color="secondary">
            Home
          </Text>
          <Text as="a" href="/about" fontSize="s" color="secondary">
            About
          </Text>
          <Text as="a" href="/contact" fontSize="s" color="secondary">
            Contact
          </Text>
          <Button variant="primary" $size="medium" fullWidth>
            Sign In
          </Button>
        </Box>
      )}
    </Box>
  );
}
```

## Common Responsive Patterns

### Container Sizing

```jsx
<Box 
  maxWidth={['100%', '600px', '800px', '1200px']}
  mx="auto"
  px={['s', 'm', 'l']}
>
  <Text>Responsive container</Text>
</Box>
```

### Responsive Cards

```jsx
<Box 
  display="grid" 
  gridTemplateColumns={[
    "1fr",
    "repeat(2, 1fr)",
    "repeat(3, 1fr)",
    "repeat(4, 1fr)"
  ]}
  gap={['s', 'm', 'l']}
>
  {cards.map(card => (
    <Box 
      key={card.id}
      skin="card"
      p={['s', 'm']}
      hover="subtle"
      cursor="pointer"
    >
      <Text 
        as="h3" 
        fontSize={['s', 'm']}
        fontWeight="bold"
        mb="xs"
      >
        {card.title}
      </Text>
      <Text 
        fontSize={['xs', 's']}
        color="secondary"
        lineClamp={[2, 3]}
      >
        {card.description}
      </Text>
    </Box>
  ))}
</Box>
```

### Responsive Tables

```jsx
<Box overflowX="auto" display={['block', 'none']}>
  {/* Mobile: Stack format */}
  <Box display="flex" flexDirection="column" gap="s">
    {data.map(item => (
      <Box key={item.id} skin="card" p="s">
        <Text fontWeight="bold">{item.name}</Text>
        <Text fontSize="s" color="secondary">{item.email}</Text>
        <Text fontSize="s" color="secondary">{item.role}</Text>
      </Box>
    ))}
  </Box>
</Box>

<Box display={['none', 'block']}>
  {/* Desktop: Table format */}
  <Box as="table" width="100%">
    <Box as="thead">
      <Box as="tr">
        <Box as="th"><Text fontWeight="bold">Name</Text></Box>
        <Box as="th"><Text fontWeight="bold">Email</Text></Box>
        <Box as="th"><Text fontWeight="bold">Role</Text></Box>
      </Box>
    </Box>
    <Box as="tbody">
      {data.map(item => (
        <Box as="tr" key={item.id}>
          <Box as="td"><Text>{item.name}</Text></Box>
          <Box as="td"><Text>{item.email}</Text></Box>
          <Box as="td"><Text>{item.role}</Text></Box>
        </Box>
      ))}
    </Box>
  </Box>
</Box>
```

### Responsive Modals

```jsx
function ResponsiveModal({ isOpen, onClose, title, children }) {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      bg="rgba(0, 0, 0, 0.5)"
      display={isOpen ? 'flex' : 'none'}
      alignItems="center"
      justifyContent="center"
      p={['s', 'm']}
      zIndex={1000}
    >
      <Box
        skin="overlay"
        width={['100%', '90%', '500px']}
        maxWidth="100%"
        maxHeight={['100%', '90vh']}
        overflowY="auto"
        shape="rounded"
        p={['m', 'l']}
        mx={['s', 'auto']}
        my={['s', 'auto']}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between" mb="m">
          <Text as="h2" fontSize={['m', 'l']} fontWeight="bold">
            {title}
          </Text>
          <Button variant="ghost" $size="small" onClick={onClose}>
            ✕
          </Button>
        </Box>
        {children}
      </Box>
    </Box>
  );
}
```

## Performance Considerations

### Responsive Images

```jsx
<Box
  as="img"
  src="/hero-image.jpg"
  alt="Hero image"
  width="100%"
  height="auto"
  maxWidth={['100%', '600px', '800px']}
  shape="rounded"
/>

// Or with responsive aspect ratios
<Box 
  aspect={[16/9, 4/3, 16/9]}
  overflow="hidden"
  shape="rounded"
>
  <img 
    src="/responsive-image.jpg" 
    alt="Responsive image"
    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
  />
</Box>
```

### Conditional Content

```jsx
// Show/hide content based on breakpoints
<Box display={['block', 'none']}>
  <Text>Mobile-only content</Text>
</Box>

<Box display={['none', 'block']}>
  <Text>Desktop-only content</Text>
</Box>

// Responsive content switching
<Text fontSize={['s', 'm']}>
  {isMobile ? 'Mobile text' : 'Desktop text'}
</Text>
```

## Best Practices

### ✅ Do

```jsx
// Start with mobile-first design
<Box p={['s', 'm', 'l']} />

// Use consistent breakpoints
<Box width={[1, 1/2, 1/3]} />

// Test on real devices
<Button $size={['medium', 'large']} />

// Optimize for touch
<Button minHeight="44px" />
```

### ❌ Don't

```jsx
// Don't use too many breakpoints
<Box p={['xs', 's', 's', 'm', 'm']} />

// Don't forget mobile users
<Box display={['none', 'block']} /> // Hidden on mobile

// Don't use fixed dimensions
<Box width="300px" /> // Use responsive values instead
```

## Testing Responsive Design

### Browser DevTools

1. **Use device emulation** - Test common device sizes
2. **Check touch targets** - Ensure buttons are at least 44px
3. **Test orientations** - Check portrait and landscape modes
4. **Verify text readability** - Ensure appropriate font sizes

### Real Device Testing

```jsx
// Add responsive debugging
<Box 
  bg="red" 
  display={['block', 'none']}
  position="fixed"
  top="0"
  left="0"
  p="xs"
  zIndex={9999}
>
  <Text color="white" fontSize="xs">Mobile</Text>
</Box>
```

### Responsive Hooks

```jsx
import { useMediaQuery } from '@/hooks/useMediaQuery';

function ResponsiveComponent() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
  const isDesktop = useMediaQuery('(min-width: 1025px)');

  return (
    <Box>
      {isMobile && <Text>Mobile Layout</Text>}
      {isTablet && <Text>Tablet Layout</Text>}
      {isDesktop && <Text>Desktop Layout</Text>}
    </Box>
  );
}
```

## Accessibility Considerations

### Touch Targets

```jsx
// Ensure minimum touch target size
<Button 
  $size="medium"
  minHeight="44px"
  minWidth="44px"
  p="s"
>
  Touch Target
</Button>
```

### Focus Management

```jsx
// Responsive focus styles
<Button
  variant="primary"
  focus="highlight"
  interactive={{
    focus: {
      outline: ['2px solid', '3px solid'],
      outlineOffset: ['1px', '2px']
    }
  }}
>
  Responsive Focus
</Button>
```

### Screen Reader Support

```jsx
// Responsive aria-labels
<Button
  aria-label={isMobile ? 'Menu' : 'Open navigation menu'}
  variant="ghost"
>
  {isMobile ? '☰' : 'Menu'}
</Button>
```

## Advanced Techniques

### Container Queries (Future)

```jsx
// Prepare for container queries
<Box 
  width="100%" 
  maxWidth="800px"
  containerType="inline-size"
>
  <Box 
    display="grid"
    gridTemplateColumns={['1fr', 'repeat(auto-fit, minmax(300px, 1fr))']}
    gap="m"
  >
    {/* Content adapts to container size */}
  </Box>
</Box>
```

### Responsive Animations

```jsx
<Box
  interactive={{
    hover: {
      transform: ['scale(1.02)', 'scale(1.05)'],
      transition: ['0.2s ease', '0.3s ease']
    }
  }}
>
  <Text>Responsive animation</Text>
</Box>
```

## Next Steps

- **Practice with real projects** - Apply responsive patterns to your components
- **Test extensively** - Use various devices and screen sizes
- **Monitor performance** - Ensure responsive design doesn't impact speed
- **Stay updated** - Follow responsive design trends and best practices
- **Learn CSS Grid** - Master modern layout techniques
- **Understand flexbox** - Use flexbox for component-level layouts

Remember: responsive design is about creating flexible, adaptable interfaces that work well across all devices and screen sizes. Start mobile-first, test thoroughly, and always prioritize user experience.