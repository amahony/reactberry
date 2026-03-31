# Reactberry - AI Assistant Index

This is the primary reference document for AI assistants working with Reactberry. Start here to understand how to build interfaces correctly.

## 🚀 New AI-Friendly Resources

**Machine-Readable Data:**
- **[components.json](../components.json)** - Structured component metadata for AI parsing
- **[types.ts](../types.ts)** - Complete TypeScript type definitions
- **[examples/index.json](./examples/index.json)** - Searchable example library

**Decision Trees:**
- **[Component Selection](./decision-trees/component-selection.md)** - Choose the right component
- **[Prop Selection](./decision-trees/prop-selection.md)** - Choose the right props (size vs $size!)

**Quick References:**
- **[Box Quick Card](./reference/quick-cards/box.md)** - Box component at a glance
- **[Button Quick Card](./reference/quick-cards/button.md)** - Button component at a glance
- **[Field Quick Card](./reference/quick-cards/field.md)** - Field component at a glance

**Pattern Libraries:**
- **[Patterns Registry](./reference/patterns-registry.md)** - 35+ copy-paste patterns
- **[Common Errors](./reference/common-errors.md)** - Error solutions & debugging

**Validation:**
- **[Prop Validation](./reference/prop-validation.md)** - Valid/invalid prop combinations
- **[Component Dependencies](./reference/component-dependencies.md)** - Component relationships

## Quick Start for AI Assistants

### 1. Import Components
```jsx
import { Box, Text, Button, Field } from '@reactberry/system/elements';
```

### 2. Component Selection Rules

**CRITICAL: Choose the right component for each use case**

| If you need... | Use this component | Example |
|----------------|-------------------|---------|
| Any text content | `Text` | `<Text as="p">Content</Text>` |
| Headings | `Text` | `<Text as="h1" fontSize="xl" fontWeight="bold">Title</Text>` |
| Layout/containers | `Box` | `<Box display="flex" gap="m">...</Box>` |
| Buttons | `Button` | `<Button variant="primary" $size="medium">Click</Button>` |
| Form inputs | `Field` | `<Field as="input" variant="outline" $size="medium" />` |

### 3. Essential Rules

1. **NEVER use Box for text** - Always use Text component for any text content
2. **NEVER use arbitrary values** - Use theme aliases: `'m'` not `'16px'` or `16`
3. **ALWAYS use semantic HTML** - Set the `as` prop appropriately
4. **ALWAYS use theme tokens** - `'primary'` not `'#3B82F6'`
5. **CRITICAL: Understand size vs $size props** - Use `size` for generic spacing on Box/Text, `$size` for specific component sizes on Button/Field

## Component Quick Reference

### Box - Layout Component
```jsx
<Box
  // Layout
  display="flex"              // flex, grid, block, inline-block
  gap="m"                     // mini, xs, s, m, l, xl, xxl, xxxl
  width={[1, 1/2, 1/3]}      // responsive: [mobile, tablet, desktop]
  
  // Spacing (use aliases)
  p="m"                       // padding
  m="auto"                    // margin
  size="m"                    // generic size (width/height)
  
  // Styling
  bg="surface"                // background color
  skin="card"                 // predefined styles
  shape="rounded"             // border radius
  
  // Flexbox
  alignItems="center"
  justifyContent="space-between"
  
  // Interactive
  cursor="pointer"
  hover="subtle"
/>
```

### Text - Typography Component
```jsx
<Text
  as="h1"                     // REQUIRED: h1-h6, p, span, label
  fontSize="l"                // xs, s, m, l, xl, xxl, xxxl
  fontWeight="bold"           // normal, medium, semibold, bold
  color="primary"             // theme colors
  lineHeight="relaxed"        // tight, normal, relaxed, loose
  textAlign="center"          // left, center, right
  truncate                    // text truncation
/>
```

### Button - Interactive Component
```jsx
<Button
  variant="primary"           // primary, secondary, ghost, outline
  $size="medium"              // Component-specific sizes: small, medium, large
  disabled
  loading
  icon                        // for icon-only buttons
  onClick={() => {}}
/>
```

### Field - Form Input Component
```jsx
<Field
  as="input"                  // input, textarea, select
  type="text"                 // when as="input": text, email, password, etc.
  variant="outline"           // outline, filled, unstyled
  $size="medium"              // Component-specific sizes: small, medium, large
  placeholder="Enter text"
  error                       // shows error state
  disabled
/>
```

## Theme System

### Space Scale (ALWAYS use these)
- `mini` = 4px
- `xs` = 8px
- `s` = 12px
- `m` = 16px (default)
- `l` = 24px
- `xl` = 32px
- `xxl` = 48px
- `xxxl` = 64px

### Font Sizes
- `xs` = 12px (captions)
- `s` = 14px (secondary)
- `m` = 16px (body)
- `l` = 20px (large body)
- `xl` = 24px (headings)
- `xxl` = 32px (page titles)
- `xxxl` = 48px (hero)

### Common Skins
- `base` - Primary background
- `surface` - Elevated surface
- `card` - Card background
- `panel` - Panel background
- `primary` - Primary brand color
- `error` - Error state
- `success` - Success state
- `warning` - Warning state

### Shapes
- `square` = 0px
- `roundedSmall` = 4px
- `rounded` = 8px (default)
- `roundedLarge` = 16px
- `pill` = 32px
- `circle` = 50%

## Common Patterns

### Form Field with Label
```jsx
<Box gap="xs">
  <Text as="label" htmlFor="email" fontSize="s" fontWeight="medium">
    Email Address
  </Text>
  <Field 
    id="email" 
    as="input" 
    type="email" 
    variant="outline" 
    $size="medium" 
  />
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

### Responsive Grid
```jsx
<Box 
  display="grid" 
  gridTemplateColumns={["1fr", "1fr 1fr", "1fr 1fr 1fr"]} 
  gap="m"
>
  {items.map(item => (
    <Box key={item.id} skin="card" p="m">
      <Text>{item.name}</Text>
    </Box>
  ))}
</Box>
```

### Page Layout
```jsx
<Box minHeight="100vh" bg="base">
  {/* Header */}
  <Box bg="surface" p="m" borderBottom="1px solid" borderColor="surface">
    <Text as="h1" fontSize="xl" fontWeight="bold">Page Title</Text>
  </Box>
  
  {/* Content */}
  <Box p="l" maxWidth="1200px" mx="auto">
    {/* Page content */}
  </Box>
</Box>
```

## Decision Tree

```
What component do I need?
├─ Is it text? → Text
│   ├─ Heading? → as="h1-h6"
│   ├─ Paragraph? → as="p"
│   └─ Inline? → as="span"
├─ Is it a button? → Button
├─ Is it a form input? → Field
│   ├─ Text input? → as="input"
│   ├─ Textarea? → as="textarea"
│   └─ Dropdown? → as="select"
└─ Everything else → Box
```

## Common Mistakes to Avoid

### ❌ DON'T DO THIS
```jsx
// Using Box for text
<Box as="h1">Wrong!</Box>

// Using arbitrary values
<Box p="16px" margin={8} />

// Using color values directly
<Box bg="#3B82F6" color="rgb(255,0,0)" />

// Wrong component for the job
<Text display="flex" gap="m">Layout</Text>

// CRITICAL ERROR: Wrong prop usage
<Button size="medium" />                 // ❌ WRONG! Use $size for Button
<Field size="large" />                   // ❌ WRONG! Use $size for Field
<Box $size="medium" />                   // ❌ WRONG! Use size for Box
<Text $size="large" />                   // ❌ WRONG! Use fontSize for Text
```

### ✅ DO THIS INSTEAD
```jsx
// Use Text for text content
<Text as="h1" fontSize="xl" fontWeight="bold">Correct!</Text>

// Use theme aliases
<Box p="m" margin="xs" />

// Use theme tokens
<Box bg="primary" color="error" />

// Use Box for layout
<Box display="flex" gap="m">
  <Text>Content</Text>
</Box>

// CORRECT: Use the right prop for each component
<Button $size="medium" />                  // ✅ CORRECT! Component-specific size
<Field $size="large" />                    // ✅ CORRECT! Component-specific size  
<Box size="m" />                           // ✅ CORRECT! Generic spacing size
<Text fontSize="l" />                      // ✅ CORRECT! Typography-specific size
```

## Responsive Design

Use arrays for responsive values: `[mobile, tablet, desktop]`

```jsx
<Box
  width={[1, 1/2, 1/3]}           // 100%, 50%, 33%
  p={['s', 'm', 'l']}              // 12px, 16px, 24px
  display={['block', 'flex']}      // block on mobile, flex on larger
>
  <Text fontSize={['s', 'm', 'l']}>
    Responsive text
  </Text>
</Box>
```

## State Patterns

### Loading
```jsx
{loading ? (
  <Box display="flex" alignItems="center" justifyContent="center" p="xl">
    <Text color="secondary">Loading...</Text>
  </Box>
) : (
  <Box>{/* Content */}</Box>
)}
```

### Error
```jsx
{error && (
  <Box skin="error" p="m" shape="rounded">
    <Text fontWeight="semibold">Error</Text>
    <Text fontSize="s">{error.message}</Text>
  </Box>
)}
```

### Empty
```jsx
{items.length === 0 && (
  <Box textAlign="center" p="xl">
    <Text as="h3" fontSize="l" color="secondary">
      No items found
    </Text>
  </Box>
)}
```

## Quick Lookup Tables

### Component → Props
| Component | Key Props | Values |
|-----------|-----------|--------|
| Box | display, gap, p, m, bg, skin, **size** | flex/grid, spacing aliases, theme colors |
| Text | as, fontSize, fontWeight, color, **size** | semantic HTML, size aliases, theme colors |
| Button | variant, **$size**, disabled, loading | primary/secondary/ghost, small/medium/large |
| Field | as, variant, **$size**, error | input/textarea/select, outline/filled |

**Critical Distinction:**
- `size` = Generic spacing prop for Box/Text (uses theme space scale)
- `$size` = Component-specific sizing for Button/Field (predefined component sizes)

### Need → Solution
| I need to... | Use this |
|-------------|----------|
| Add spacing | `p="m"` or `m="m"` with Box |
| Make text bigger | `fontSize="l"` with Text |
| Create a card | `skin="card"` with Box |
| Make something clickable | Button component or `cursor="pointer"` on Box |
| Show an error | `skin="error"` or `color="error"` |
| Make responsive | Use arrays: `[mobile, tablet, desktop]` |

## Additional Resources

### 📊 Machine-Readable Data
- **[components.json](../components.json)** - Complete component metadata, props, and validation rules
- **[types.ts](../types.ts)** - TypeScript definitions for all components and tokens
- **[examples/index.json](./examples/index.json)** - Searchable example library with 15+ patterns

### 🌳 Decision Trees (Start Here!)
- **[Component Selection](./decision-trees/component-selection.md)** - "What component do I need?" decision tree
- **[Prop Selection](./decision-trees/prop-selection.md)** - "What props do I use?" decision tree (size vs $size!)

### ⚡ Quick Reference Cards
- **[Box Quick Card](./reference/quick-cards/box.md)** - Layout component essentials
- **[Button Quick Card](./reference/quick-cards/button.md)** - Interactive component essentials
- **[Field Quick Card](./reference/quick-cards/field.md)** - Form input essentials

### 📚 Pattern Libraries
- **[Patterns Registry](./reference/patterns-registry.md)** - 35+ copy-paste code patterns
- **[Prop Validation](./reference/prop-validation.md)** - Valid vs invalid prop combinations
- **[Component Dependencies](./reference/component-dependencies.md)** - Component relationships graph

### 🐛 Troubleshooting
- **[Common Errors](./reference/common-errors.md)** - Top 10 errors with solutions
- **[Complete API Reference](./api/)** - Detailed component documentation
- **[Design Tokens](./assets/design-tokens.md)** - All theme tokens

### 💡 Examples
- **[Layout Examples](./examples/layouts/)** - Dashboard and page layouts
- **[Form Examples](./examples/forms/)** - Form patterns and validation

---

**CRITICAL REMINDERS:**
1. **Use Text for text content and Box for everything else**
2. **Always use theme aliases instead of arbitrary values**  
3. **Understand size vs $size**: 
   - Box/Text use `size` for generic spacing (theme scale)
   - Button/Field use `$size` for component-specific sizes (small/medium/large)

**The most common mistake is confusing `size` vs `$size` - they serve different purposes!**

---

## 🎯 AI Workflow

**For new components:**
1. Check [Component Selection Decision Tree](./decision-trees/component-selection.md)
2. Review [Quick Reference Card](./reference/quick-cards/) for chosen component
3. Copy pattern from [Patterns Registry](./reference/patterns-registry.md)
4. Validate props with [Prop Validation](./reference/prop-validation.md)

**When stuck:**
1. Check [Common Errors](./reference/common-errors.md) for your error
2. Search [examples/index.json](./examples/index.json) for similar patterns
3. Review [components.json](../components.json) for component metadata

**For type checking:**
1. Import types from [types.ts](../types.ts)
2. Use `BoxProps`, `TextProps`, `ButtonProps`, `FieldProps` interfaces