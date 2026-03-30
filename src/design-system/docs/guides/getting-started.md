# Getting Started with the Design System

This guide will walk you through setting up and using the Design System in your React application.

## Overview

The Design System is built on four core principles:
1. **Component-First** - Everything is built from composable components
2. **Theme-Driven** - Consistent styling through design tokens
3. **Accessibility-First** - Semantic HTML and ARIA compliance built-in
4. **Responsive by Default** - Mobile-first design patterns

## Prerequisites

- React 18+
- TypeScript (recommended)
- styled-components
- styled-system

## Installation

The design system is included in the PocketAgent frontend. No separate installation is required.

```bash
# Already available in your project
import { Box, Text, Button, Field } from '@/design-system/elements';
```

## Your First Component

Let's start with a simple example using the core elements:

```jsx
import { Box, Text, Button } from '@/design-system/elements';

function WelcomeCard() {
  return (
    <Box skin="card" p="m" gap="s" maxWidth="400px">
      <Text as="h2" fontSize="l" fontWeight="bold" color="primary">
        Welcome to the Design System
      </Text>
      <Text as="p" fontSize="s" color="secondary" lineHeight="relaxed">
        Get started building amazing interfaces with our design system components.
      </Text>
      <Button variant="primary" $size="medium">
        Get Started
      </Button>
    </Box>
  );
}
```

## Understanding the Component Hierarchy

### Box - The Foundation
Box is your layout and container component. Use it for:
- Layout containers (`div`, `section`, etc.)
- Flexbox and grid layouts
- Spacing and positioning
- Background colors and borders

```jsx
<Box display="flex" flexDirection="column" gap="m" p="l">
  {/* Content goes here */}
</Box>
```

### Text - For All Text Content
Text handles all typography and semantic HTML elements:
- Headings (`h1-6`)
- Paragraphs (`p`)
- Labels (`label`)
- Spans (`span`)
- Any text that needs styling

```jsx
<Text as="h1" fontSize="xl" fontWeight="bold">Page Title</Text>
<Text as="p" fontSize="m" color="secondary">Body text</Text>
<Text as="label" fontSize="s">Form label</Text>
```

### Button - Interactive Elements
Button extends Text with button-specific functionality:

```jsx
<Button variant="primary" $size="medium" onClick={handleClick}>
  Click Me
</Button>
```

### Field - Form Inputs
Field extends Text for form input elements:

```jsx
<Field 
  as="input" 
  type="email" 
  placeholder="Enter email"
  variant="outline" 
  $size="medium"
/>
```

## Theme Integration

### Using Theme Aliases

Always use theme aliases instead of hardcoded values:

```jsx
// ✅ Good - Use theme aliases
<Box p="m" gap="s" />
<Text fontSize="l" color="primary" />

// ❌ Bad - Hardcoded values
<Box p="16px" gap="12px" />
<Text fontSize="18px" color="#3B82F6" />
```

### Available Aliases

**Space:** `mini`, `xs`, `s`, `m`, `l`, `xl`, `xxl`, `xxxl`
**Font Sizes:** `xs`, `s`, `m`, `l`, `xl`, `xxl`, `xxxl`
**Colors:** `primary`, `secondary`, `tertiary`, `success`, `error`, `warning`

### The Skin System

Skins provide pre-defined styling combinations:

```jsx
// Surface skins for containers
<Box skin="card" p="m">Card container</Box>
<Box skin="surface" p="m">Surface container</Box>

// Semantic skins for meaning
<Box skin="success" p="s">Success message</Box>
<Box skin="error" p="s">Error message</Box>

// Color coding
<Box skin="blue" p="xs">Blue category</Box>
<Box skin="green" p="xs">Green category</Box>
```

## Building Your First Layout

Let's create a typical page layout:

```jsx
import { Box, Text, Button, Field } from '@/design-system/elements';

function ContactPage() {
  return (
    <Box maxWidth="800px" mx="auto" p="l">
      {/* Header */}
      <Box as="header" mb="xl">
        <Text as="h1" fontSize="xxxl" fontWeight="bold" color="primary" mb="s">
          Contact Us
        </Text>
        <Text as="p" fontSize="l" color="secondary">
          We'd love to hear from you. Send us a message!
        </Text>
      </Box>

      {/* Form */}
      <Box as="form" display="flex" flexDirection="column" gap="m">
        {/* Name Field */}
        <Box>
          <Text as="label" fontSize="s" fontWeight="medium" mb="xs" display="block">
            Full Name
          </Text>
          <Field 
            as="input"
            type="text" 
            placeholder="Enter your name"
            variant="outline"
            $size="medium"
          />
        </Box>

        {/* Email Field */}
        <Box>
          <Text as="label" fontSize="s" fontWeight="medium" mb="xs" display="block">
            Email Address
          </Text>
          <Field 
            as="input"
            type="email" 
            placeholder="Enter your email"
            variant="outline"
            $size="medium"
          />
        </Box>

        {/* Message Field */}
        <Box>
          <Text as="label" fontSize="s" fontWeight="medium" mb="xs" display="block">
            Message
          </Text>
          <Field 
            as="textarea"
            placeholder="Enter your message"
            variant="outline"
            rows={4}
          />
        </Box>

        {/* Submit Button */}
        <Box display="flex" justifyContent="flex-end" mt="m">
          <Button variant="primary" $size="large">
            Send Message
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
```

## Responsive Design

Use responsive arrays for mobile-first design:

```jsx
<Box 
  // Responsive width: 100% mobile, 50% tablet, 33% desktop
  width={[1, 1/2, 1/3]}
  
  // Responsive padding: 8px, 12px, 16px
  p={['xs', 's', 'm']}
  
  // Responsive display: block mobile, flex larger screens
  display={['block', 'flex']}
>
  <Text 
    // Responsive font size: 14px, 16px, 18px
    fontSize={['s', 'm', 'l']}
    
    // Responsive alignment: center mobile, left larger screens
    textAlign={['center', 'left']}
  >
    Responsive content
  </Text>
</Box>
```

## Common Patterns

### Card Layout

```jsx
<Box skin="card" p="m" gap="s" maxWidth="300px">
  <Text as="h3" fontSize="l" fontWeight="semibold">
    Card Title
  </Text>
  <Text as="p" fontSize="s" color="secondary">
    Card description goes here.
  </Text>
  <Box display="flex" gap="xs" mt="s">
    <Button variant="primary" $size="small">Primary</Button>
    <Button variant="outline" $size="small">Secondary</Button>
  </Box>
</Box>
```

### Navigation

```jsx
<Box as="nav" display="flex" alignItems="center" justifyContent="space-between" p="m">
  <Text as="h1" fontSize="l" fontWeight="bold" color="primary">
    App Name
  </Text>
  
  <Box display="flex" gap="m" alignItems="center">
    <Text as="a" href="/home" fontSize="s" color="secondary">Home</Text>
    <Text as="a" href="/about" fontSize="s" color="secondary">About</Text>
    <Button variant="outline" $size="small">Login</Button>
  </Box>
</Box>
```

### Alert Messages

```jsx
{/* Success Alert */}
<Box skin="success" p="s" shape="rounded" mb="s">
  <Text fontSize="s" fontWeight="medium">
    ✅ Success! Your changes have been saved.
  </Text>
</Box>

{/* Error Alert */}
<Box skin="error" p="s" shape="rounded" mb="s">
  <Text fontSize="s" fontWeight="medium">
    ❌ Error! Please check your input and try again.
  </Text>
</Box>

{/* Warning Alert */}
<Box skin="warning" p="s" shape="rounded">
  <Text fontSize="s" fontWeight="medium">
    ⚠️ Warning! This action cannot be undone.
  </Text>
</Box>
```

## Interactive States

Add hover and focus states for better UX:

```jsx
<Box
  skin="card"
  p="m"
  cursor="pointer"
  hover="subtle"
  focus="highlight"
  interactive={{
    hover: { transform: 'translateY(-2px)' },
    focus: { outline: '2px solid', outlineColor: 'primary' }
  }}
>
  <Text>Interactive card</Text>
</Box>
```

## Key Rules to Remember

### ✅ Do

1. **Use Text for all text content**
   ```jsx
   <Text as="h1">Heading</Text>
   <Text as="p">Paragraph</Text>
   <Text as="label">Label</Text>
   ```

2. **Use theme aliases**
   ```jsx
   <Box p="m" gap="s" />
   <Text fontSize="l" color="primary" />
   ```

3. **Use appropriate semantic elements**
   ```jsx
   <Text as="h1">Main heading</Text>
   <Text as="h2">Section heading</Text>
   <Text as="p">Body text</Text>
   ```

4. **Use skins for consistent styling**
   ```jsx
   <Box skin="card">Card content</Box>
   <Box skin="error">Error message</Box>
   ```

### ❌ Don't

1. **Don't use Box for text content**
   ```jsx
   <Box as="h1" fontSize="xl">Wrong!</Box>
   ```

2. **Don't use arbitrary values**
   ```jsx
   <Box p="16px" fontSize="18px" />
   ```

3. **Don't use indices instead of aliases**
   ```jsx
   <Box p={5} fontSize={3} />
   ```

## Next Steps

1. **Explore Components** - Check out the [API Reference](../api/) for detailed component documentation
2. **Learn Composition** - Read the [Component Composition Guide](./component-composition.md)
3. **Master Theming** - Dive into the [Theming Guide](./theming-guide.md)
4. **See Examples** - Browse [real-world examples](../examples/)
5. **Build Accessible UIs** - Follow the [Accessibility Guide](./accessibility.md)

## Need Help?

- **API References**: [../api/](../api/) - Detailed prop documentation
- **Examples**: [../examples/](../examples/) - Real-world patterns
- **Guides**: Browse other guides in this directory
- **Issues**: Report problems on GitHub

---

**Happy building! 🚀**