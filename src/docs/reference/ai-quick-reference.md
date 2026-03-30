# Reactberry - AI Assistant Quick Reference

## Component Selection Matrix

| Need | Component | Example |
|------|-----------|---------|
| Any text content | `Text` | `<Text as="p">Content</Text>` |
| Headings (h1-h6) | `Text` | `<Text as="h1" fontSize="xl" fontWeight="bold">Title</Text>` |
| Paragraphs | `Text` | `<Text as="p" fontSize="m">Paragraph text</Text>` |
| Labels | `Text` | `<Text as="label" htmlFor="input-id">Label</Text>` |
| Spans/inline text | `Text` | `<Text as="span" color="primary">Inline</Text>` |
| Layout containers | `Box` | `<Box display="flex" gap="m">Content</Box>` |
| Clickable buttons | `Button` | `<Button variant="primary" $size="medium">Click</Button>` |
| Form inputs | `Field` | `<Field as="input" variant="outline" $size="medium" />` |

## Essential Rules

1. **NEVER use Box for text** - Always use Text for any text content
2. **NEVER use arbitrary values** - Use theme aliases (e.g., 'm' not '16px')
3. **ALWAYS use semantic HTML** - via the `as` prop
4. **ALWAYS use theme tokens** - for colors, spacing, etc.

## Props Quick Reference

### Box Props
```jsx
<Box
  // Layout
  display="flex"                    // flex, grid, block, inline-block
  gap="m"                          // mini, xs, s, m, l, xl, xxl, xxxl
  width={[1, 1/2, 1/3]}           // responsive: mobile, tablet, desktop
  height="100vh"
  
  // Spacing
  p="m"                            // padding: mini, xs, s, m, l, xl, xxl, xxxl
  m="auto"                         // margin: same scale + auto
  px="l"                           // horizontal padding
  my="s"                           // vertical margin
  
  // Styling
  bg="surface"                     // background: base, surface, card, primary, etc.
  skin="card"                      // predefined styles: card, panel, error, success
  shape="rounded"                  // square, roundedSmall, rounded, roundedLarge, pill, circle
  color="primary"                  // text color (but prefer Text component)
  
  // Flexbox
  flexDirection="column"           // row, column, row-reverse, column-reverse
  alignItems="center"              // flex-start, center, flex-end, stretch
  justifyContent="space-between"   // flex-start, center, flex-end, space-between, space-around
  
  // Grid
  gridTemplateColumns="1fr 1fr"    // any valid CSS grid value
  gridGap="m"                      // uses spacing scale
  
  // Position
  position="relative"              // static, relative, absolute, fixed, sticky
  top="0"
  zIndex="10"
  
  // Interactive
  cursor="pointer"
  hover="subtle"                   // predefined hover effects
  interactive={{                   // custom interactive states
    hover: { transform: 'scale(1.02)' }
  }}
/>
```

### Text Props
```jsx
<Text
  // Semantic HTML
  as="h1"                          // h1-h6, p, span, label, div, etc.
  
  // Typography
  fontSize="l"                     // xs, s, m, l, xl, xxl, xxxl
  fontWeight="bold"                // normal, medium, semibold, bold
  lineHeight="relaxed"             // tight, normal, relaxed, loose
  textAlign="center"               // left, center, right, justify
  
  // Color
  color="primary"                  // any theme color
  
  // Layout (inherits all Box props)
  display="block"
  m="0"
  
  // Special
  truncate                         // adds text truncation with ellipsis
/>
```

### Button Props
```jsx
<Button
  // Variants
  variant="primary"                // primary, secondary, ghost, outline
  
  // Sizes
  $size="medium"                   // small, medium, large
  
  // States
  disabled
  loading
  
  // Special
  icon                             // for icon-only buttons
  
  // Events
  onClick={() => {}}
/>
```

### Field Props
```jsx
<Field
  // Element type
  as="input"                       // input, textarea, select
  
  // Input types (when as="input")
  type="text"                      // text, email, password, number, etc.
  
  // Styling
  variant="outline"                // outline, filled, unstyled
  $size="medium"                   // small, medium, large
  
  // States
  disabled
  error                            // shows error styling
  
  // Attributes
  placeholder="Enter text"
  value={value}
  onChange={(e) => {}}
/>
```

## Theme Aliases Reference

### Spacing Scale
```
mini  = 4px    // Minimal spacing
xs    = 8px    // Extra small
s     = 12px   // Small
m     = 16px   // Medium (default)
l     = 24px   // Large
xl    = 32px   // Extra large
xxl   = 48px   // 2x Extra large
xxxl  = 64px   // 3x Extra large
```

### Font Sizes
```
xs    = 12px   // Caption, small text
s     = 14px   // Secondary content
m     = 16px   // Body text (default)
l     = 20px   // Large body, small headings
xl    = 24px   // Section headings
xxl   = 32px   // Page headings
xxxl  = 48px   // Hero text
```

### Skins
```
// Surfaces
base        // Main background
surface     // Elevated surface
card        // Card background
panel       // Panel background
overlay     // Modal/dropdown background

// Semantic
primary     // Primary actions
accent      // Secondary emphasis
neutral     // Default states
highlight   // Active/selected
error       // Error states
success     // Success states
warning     // Warning states

// Colors (for categorization)
red, blue, green, yellow, purple, pink, orange, teal, gray

// Special
transparent // Fully transparent
translucent // Backdrop blur effect
```

### Shapes
```
square        = 0px    // No rounding
roundedSmall  = 4px    // Subtle rounding
rounded       = 8px    // Standard rounding
roundedLarge  = 16px   // Large rounding
pill          = 32px   // Pill shape
circle        = 50%    // Perfect circle
```

## Common Patterns

### Form Field with Label
```jsx
<Box gap="xs">
  <Text as="label" htmlFor="email" fontSize="s" fontWeight="medium">
    Email Address
  </Text>
  <Field id="email" as="input" type="email" variant="outline" $size="medium" />
</Box>
```

### Card Component
```jsx
<Box skin="card" p="m" shape="rounded">
  <Text as="h3" fontSize="l" fontWeight="bold" mb="s">
    Card Title
  </Text>
  <Text as="p" color="secondary">
    Card content goes here
  </Text>
</Box>
```

### Flex Layout
```jsx
<Box display="flex" gap="m" alignItems="center" justifyContent="space-between">
  <Text>Left content</Text>
  <Button variant="primary" $size="small">Action</Button>
</Box>
```

### Grid Layout
```jsx
<Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap="m">
  {items.map(item => (
    <Box key={item.id} skin="card" p="m">
      <Text>{item.name}</Text>
    </Box>
  ))}
</Box>
```

### Responsive Design
```jsx
// Array values: [mobile, tablet, desktop]
<Box
  width={[1, 1/2, 1/3]}
  p={['s', 'm', 'l']}
  display={['block', 'flex']}
>
  <Text fontSize={['s', 'm', 'l']}>Responsive content</Text>
</Box>
```

### Interactive Elements
```jsx
<Box
  cursor="pointer"
  hover="subtle"
  skin="card"
  p="m"
  interactive={{
    hover: { transform: 'translateY(-2px)' }
  }}
  onClick={() => {}}
>
  <Text>Click me</Text>
</Box>
```

### Loading State
```jsx
{loading ? (
  <Box display="flex" alignItems="center" justifyContent="center" p="xl">
    <Text color="secondary">Loading...</Text>
  </Box>
) : (
  <Box>{/* Content */}</Box>
)}
```

### Error State
```jsx
<Box skin="error" p="s" shape="rounded">
  <Text fontWeight="semibold">Error</Text>
  <Text fontSize="s">{error.message}</Text>
</Box>
```

## Import Statement
```jsx
import { Box, Text, Button, Field } from '@/design-system/elements';
```

## TypeScript Usage
```tsx
import { BoxProps, TextProps, ButtonProps, FieldProps } from '@/design-system/elements';

interface ComponentProps extends BoxProps {
  title: string;
}
```

## Decision Tree

```
What am I building?
├─ Text content? → Text
│   ├─ Heading? → as="h1-h6"
│   ├─ Paragraph? → as="p"
│   ├─ Label? → as="label"
│   └─ Inline? → as="span"
├─ User input? → Field
│   ├─ Single line? → as="input"
│   ├─ Multi line? → as="textarea"
│   └─ Options? → as="select"
├─ Clickable action? → Button
│   ├─ Primary action? → variant="primary"
│   ├─ Secondary? → variant="secondary"
│   └─ Subtle? → variant="ghost"
└─ Everything else? → Box
    ├─ Layout? → display="flex/grid"
    ├─ Container? → skin="card/panel"
    └─ Spacing? → p="m" gap="s"
```

## Anti-Patterns to Avoid

```jsx
// ❌ WRONG
<Box as="h1" fontSize="xl">Title</Box>
<Box p="16px" m={8}>Content</Box>
<Text display="flex" gap="m">Layout</Text>
<Button as="a" href="/link">Link</Button>

// ✅ CORRECT
<Text as="h1" fontSize="xl">Title</Text>
<Box p="m" m="xs">Content</Box>
<Box display="flex" gap="m"><Text>Layout</Text></Box>
<Button onClick={() => navigate('/link')}>Link</Button>
```

## Remember

1. **Text** = Any text content (headings, paragraphs, labels, spans)
2. **Box** = Layout and containers (divs, sections, layout wrappers)
3. **Button** = Interactive buttons and CTAs
4. **Field** = Form inputs (text, textarea, select)
5. **Always use theme aliases** instead of arbitrary values
6. **Responsive arrays** = [mobile, tablet, desktop]
7. **Skins** = Pre-styled component variants
8. **Interactive states** = hover, focus, active effects