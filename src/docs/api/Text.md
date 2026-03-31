# Text Component API Reference

The `Text` component extends `Box` with typography capabilities and is designed for all text content and semantic HTML elements.

## Overview

Text is the typography component that should be used for all text content, semantic HTML elements (`h1-6`, `p`, `span`, `label`, etc.), and any element requiring text styling. It inherits all Box capabilities while adding comprehensive typography support.

## Import

```jsx
import { Text } from '@reactberry/system/elements';
```

## Basic Usage

```jsx
<Text as="h1" fontSize="xl" fontWeight="bold" color="primary">
  Page Title
</Text>
```

## Props

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Text content to render |
| `as` | `string \| React.ComponentType` | `"span"` | HTML element or React component to render as |
| `ref` | `React.Ref` | - | React ref for DOM access |

**Inherits all [Box props](./Box.md) plus typography-specific props below.**

### Typography Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `ResponsiveValue<string>` | - | Text color, maps to `theme.colors` |
| `fontFamily` | `ResponsiveValue<string>` | - | Font family, maps to `theme.fonts` |
| `fontSize` | `ResponsiveValue<string \| number>` | - | Font size, maps to `theme.fontSizes` |
| `fontWeight` | `ResponsiveValue<string \| number>` | - | Font weight, maps to `theme.fontWeights` |
| `lineHeight` | `ResponsiveValue<string \| number>` | - | Line height, maps to `theme.lineHeights` |
| `letterSpacing` | `ResponsiveValue<string \| number>` | - | Letter spacing, maps to `theme.letterSpacings` |
| `textAlign` | `ResponsiveValue<string>` | - | Text alignment (left, center, right, justify) |
| `fontStyle` | `ResponsiveValue<string>` | - | Font style (normal, italic, oblique) |
| `textShadow` | `ResponsiveValue<string>` | - | CSS text-shadow, maps to `theme.shadows` |

### Text Utility Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `truncate` | `boolean` | - | Single-line text truncation with ellipsis |
| `textTransform` | `string` | - | CSS text-transform (uppercase, lowercase, capitalize) |
| `textDecoration` | `string` | - | CSS text-decoration (underline, line-through, none) |
| `lineClamp` | `number` | - | Multi-line text clamping (WebKit only) |

## Theme Integration

### Available Aliases

#### Font Size Aliases
- `xs` - 12px
- `s` - 14px
- `m` - 16px
- `l` - 18px
- `xl` - 20px
- `xxl` - 24px
- `xxxl` - 32px

#### Color Aliases
- `primary` - Primary text color
- `secondary` - Secondary text color
- `tertiary` - Tertiary text color
- Theme palette colors (e.g., `palette.brands.5`, `palette.neutrals.10`)

#### Font Weight Options
- `normal` / `400`
- `medium` / `500`
- `semibold` / `600`
- `bold` / `700`

## Examples

### Semantic HTML Elements

```jsx
{/* Headings */}
<Text as="h1" fontSize="xxxl" fontWeight="bold" color="primary">
  Main Page Title
</Text>

<Text as="h2" fontSize="xxl" fontWeight="semibold" color="primary">
  Section Title
</Text>

<Text as="h3" fontSize="xl" fontWeight="medium">
  Subsection Title
</Text>

{/* Paragraphs */}
<Text as="p" fontSize="m" lineHeight="relaxed" color="secondary">
  This is a paragraph with comfortable line spacing for better readability.
</Text>

{/* Labels */}
<Text as="label" fontSize="s" fontWeight="medium" color="primary">
  Form Field Label
</Text>

{/* Spans */}
<Text as="span" fontSize="xs" color="tertiary">
  Helper text or metadata
</Text>
```

### Typography Variations

```jsx
{/* Different font sizes */}
<Text fontSize="xs">Extra small text</Text>
<Text fontSize="s">Small text</Text>
<Text fontSize="m">Medium text (default)</Text>
<Text fontSize="l">Large text</Text>
<Text fontSize="xl">Extra large text</Text>

{/* Different font weights */}
<Text fontWeight="normal">Normal weight</Text>
<Text fontWeight="medium">Medium weight</Text>
<Text fontWeight="semibold">Semibold weight</Text>
<Text fontWeight="bold">Bold weight</Text>

{/* Text alignment */}
<Text textAlign="left">Left aligned</Text>
<Text textAlign="center">Center aligned</Text>
<Text textAlign="right">Right aligned</Text>
<Text textAlign="justify">Justified text</Text>
```

### Text Transformations

```jsx
{/* Text transform */}
<Text textTransform="uppercase">Uppercase text</Text>
<Text textTransform="lowercase">Lowercase text</Text>
<Text textTransform="capitalize">Capitalized text</Text>

{/* Text decoration */}
<Text textDecoration="underline">Underlined text</Text>
<Text textDecoration="line-through">Strikethrough text</Text>

{/* Font style */}
<Text fontStyle="italic">Italic text</Text>
```

### Text Truncation

```jsx
{/* Single-line truncation */}
<Text truncate maxWidth="200px">
  This is a very long text that will be truncated with an ellipsis when it exceeds the container width
</Text>

{/* Multi-line clamping */}
<Text lineClamp={3} maxWidth="300px">
  This is a longer paragraph that will be clamped to exactly 3 lines with an ellipsis at the end if the content exceeds the available space. The rest of the text will be hidden.
</Text>
```

### Responsive Typography

```jsx
{/* Responsive font sizes */}
<Text fontSize={['s', 'm', 'l']}>
  Small on mobile, medium on tablet, large on desktop
</Text>

{/* Responsive line height */}
<Text 
  fontSize={['m', 'l', 'xl']}
  lineHeight={[1.4, 1.5, 1.6]}
>
  Responsive text with adjusted line height
</Text>

{/* Responsive alignment */}
<Text textAlign={['center', 'left']}>
  Centered on mobile, left-aligned on larger screens
</Text>
```

### Color Usage

```jsx
{/* Semantic colors */}
<Text color="primary">Primary text color</Text>
<Text color="secondary">Secondary text color</Text>
<Text color="tertiary">Tertiary text color</Text>

{/* Theme palette colors */}
<Text color="palette.brands.6">Brand color</Text>
<Text color="palette.neutrals.10">Dark neutral</Text>
<Text color="palette.reds.7">Red color</Text>

{/* State colors */}
<Text color="success">Success message</Text>
<Text color="error">Error message</Text>
<Text color="warning">Warning message</Text>
```

### Combined with Box Props

```jsx
{/* Text with spacing and layout */}
<Text 
  as="p" 
  fontSize="m" 
  lineHeight="relaxed"
  p="m" 
  mb="s"
  maxWidth="600px"
>
  Paragraph with padding, margin, and max width
</Text>

{/* Text with background (using skin) */}
<Text 
  as="span" 
  fontSize="xs" 
  fontWeight="medium"
  skin="warning"
  px="xs"
  py="mini"
  shape="rounded"
>
  Badge-like text with background
</Text>
```

## Common Patterns

### Article Content

```jsx
<Box maxWidth="800px" mx="auto">
  <Text as="h1" fontSize="xxxl" fontWeight="bold" mb="s">
    Article Title
  </Text>
  
  <Text as="p" fontSize="s" color="secondary" mb="l">
    Published on March 15, 2024
  </Text>
  
  <Text as="p" fontSize="m" lineHeight="relaxed" mb="m">
    This is the first paragraph of the article with comfortable line spacing for better readability.
  </Text>
  
  <Text as="h2" fontSize="xl" fontWeight="semibold" mt="l" mb="s">
    Section Heading
  </Text>
  
  <Text as="p" fontSize="m" lineHeight="relaxed">
    This is another paragraph continuing the article content.
  </Text>
</Box>
```

### Form Labels and Help Text

```jsx
<Box>
  <Text as="label" fontSize="s" fontWeight="medium" mb="xs" display="block">
    Email Address
  </Text>
  
  <Field 
    type="email" 
    placeholder="Enter your email"
    mb="xs"
  />
  
  <Text fontSize="xs" color="secondary">
    We'll never share your email with anyone else.
  </Text>
</Box>
```

### Navigation Items

```jsx
<Box display="flex" gap="m">
  <Text as="a" href="/home" fontSize="s" fontWeight="medium" color="primary">
    Home
  </Text>
  <Text as="a" href="/about" fontSize="s" fontWeight="medium" color="secondary">
    About
  </Text>
  <Text as="a" href="/contact" fontSize="s" fontWeight="medium" color="secondary">
    Contact
  </Text>
</Box>
```

## Best Practices

### ✅ Do

```jsx
// Use Text for all semantic HTML elements
<Text as="h1" fontSize="xl" fontWeight="bold">Page Title</Text>
<Text as="p" fontSize="m">Paragraph content</Text>
<Text as="label" fontSize="s">Form label</Text>

// Use theme aliases for consistency
<Text fontSize="m" color="primary" fontWeight="medium" />

// Use appropriate semantic elements
<Text as="h2">Section heading</Text>
<Text as="p">Body paragraph</Text>

// Combine typography with layout props
<Text as="h3" fontSize="l" mb="s" mt="m">Spaced heading</Text>
```

### ❌ Don't

```jsx
// Don't use Box for text content
<Box as="h1" fontSize="xl">Wrong approach</Box>

// Don't use arbitrary values
<Text fontSize="18px" color="#333333" />

// Don't use indices instead of aliases
<Text fontSize={3} color="colors.blue.500" />

// Don't nest block elements incorrectly
<Text as="p">
  <Text as="div">Wrong nesting</Text>
</Text>
```

## Accessibility

### Semantic HTML

Always use appropriate semantic HTML elements:

```jsx
// Good semantic structure
<Text as="h1">Main heading</Text>
<Text as="h2">Section heading</Text>
<Text as="p">Paragraph content</Text>
<Text as="label" htmlFor="email">Email label</Text>
```

### Color Contrast

Ensure sufficient color contrast for readability:

```jsx
// Good contrast examples
<Text color="primary">Primary text on light background</Text>
<Text color="white">White text on dark background</Text>

// Use semantic colors that maintain contrast
<Text color="secondary">Secondary text with proper contrast</Text>
```

### Screen Reader Support

Use descriptive text and proper labeling:

```jsx
<Text as="label" htmlFor="search">
  Search products
</Text>

<Text as="span" aria-label="Required field">
  Email *
</Text>
```

## TypeScript

```tsx
import { TextProps } from '@reactberry/system/elements';

interface MyTextComponentProps extends TextProps {
  variant?: 'heading' | 'body' | 'caption';
}

function MyTextComponent({ variant = 'body', children, ...textProps }: MyTextComponentProps) {
  const variantStyles = {
    heading: { fontSize: 'xl', fontWeight: 'bold' },
    body: { fontSize: 'm', lineHeight: 'relaxed' },
    caption: { fontSize: 'xs', color: 'secondary' }
  };

  return (
    <Text {...variantStyles[variant]} {...textProps}>
      {children}
    </Text>
  );
}
```

## Related Components

- **[Box](./Box.md)** - Use for layout containers and non-text elements
- **[Button](./Button.md)** - Extends Text with button-specific functionality
- **[Field](./Field.md)** - Extends Text with form input capabilities

## Migration Notes

When migrating to the Text component:

- Replace all semantic HTML elements (`h1-6`, `p`, `span`, `label`, etc.) with `Text` component
- Convert CSS font properties to Text props
- Use theme aliases instead of hardcoded values
- Ensure proper semantic HTML structure with `as` prop