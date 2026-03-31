# Box Quick Reference Card

**Component:** `Box`  
**Category:** Layout & Container  
**Path:** `@reactberry/system/elements`

---

## 🎯 Purpose

Box is the **foundation layout component** for structure and containers.

**Use for:** Containers, layouts, wrappers, divs, any non-text structural element  
**NOT for:** Text content, typography, headings, paragraphs (use Text instead)

---

## 📥 Import

```tsx
import { Box } from '@reactberry/system/elements';
```

---

## 🔥 Most Common Use Cases

### 1. Flex Container
```tsx
<Box display="flex" gap="m" alignItems="center">
  <Text>Item 1</Text>
  <Text>Item 2</Text>
</Box>
```

### 2. Grid Layout
```tsx
<Box display="grid" gridTemplateColumns="1fr 1fr" gap="m">
  <Box>Column 1</Box>
  <Box>Column 2</Box>
</Box>
```

### 3. Card Wrapper
```tsx
<Box skin="card" p="m" shape="rounded">
  <Text as="h3" fontSize="l">Card Title</Text>
  <Text as="p">Card content</Text>
</Box>
```

### 4. Spacing Wrapper
```tsx
<Box p="l" m="m">
  {/* Content with padding and margin */}
</Box>
```

### 5. Responsive Container
```tsx
<Box width={[1, 1/2, 1/3]} p={['s', 'm', 'l']}>
  {/* Responsive sizing */}
</Box>
```

---

## 🎨 Essential Props

| Prop | Type | Values | Use For |
|------|------|--------|---------|
| **display** | string | `flex`, `grid`, `block`, `inline-block`, `none` | Layout type |
| **gap** | SpaceToken | `mini`, `xs`, `s`, `m`, `l`, `xl`, `xxl`, `xxxl` | Space between children |
| **p** | SpaceToken | `mini`, `xs`, `s`, `m`, `l`, `xl`, `xxl`, `xxxl` | Padding (internal spacing) |
| **m** | SpaceToken | `mini`, `xs`, `s`, `m`, `l`, `xl`, `xxl`, `xxxl`, `auto` | Margin (external spacing) |
| **size** | SpaceToken | `mini`, `xs`, `s`, `m`, `l`, `xl`, `xxl`, `xxxl` | Generic width/height |
| **skin** | string | `base`, `surface`, `card`, `panel`, `primary`, `error`, `success` | Predefined styles |
| **shape** | ShapeToken | `square`, `roundedSmall`, `rounded`, `roundedLarge`, `pill`, `circle` | Border radius |
| **bg** | string | Theme colors or custom | Background color |
| **cursor** | string | `pointer`, `default`, `not-allowed`, `text` | Cursor style |
| **hover** | string | `subtle`, `lift`, `glow` | Hover state |

---

## 📐 Layout Props

### Flexbox
```tsx
<Box 
  display="flex" 
  flexDirection="row"              // row, column, row-reverse, column-reverse
  alignItems="center"              // flex-start, center, flex-end, stretch
  justifyContent="space-between"   // flex-start, center, flex-end, space-between
  gap="m"
>
```

### Grid
```tsx
<Box 
  display="grid" 
  gridTemplateColumns="1fr 1fr 1fr" 
  gridTemplateRows="auto" 
  gap="m"
>
```

### Spacing
```tsx
// Padding (all sides)
<Box p="m">

// Padding (specific sides)
<Box px="l" py="s">  // horizontal, vertical
<Box pt="m" pr="s" pb="l" pl="s">  // top, right, bottom, left

// Margin (all sides)
<Box m="s">

// Margin (specific sides)
<Box mx="auto" my="l">  // horizontal, vertical
<Box mt="xl" mr="0" mb="m" ml="0">  // top, right, bottom, left
```

---

## 🎨 Styling Props

### Skins (Predefined Styles)
```tsx
<Box skin="base">Base background</Box>
<Box skin="surface">Secondary surface</Box>
<Box skin="card">Card with elevation</Box>
<Box skin="primary">Primary color</Box>
<Box skin="error">Error state</Box>
```

### Shapes (Border Radius)
```tsx
<Box shape="square">0px radius</Box>
<Box shape="rounded">8px radius (default)</Box>
<Box shape="roundedLarge">16px radius</Box>
<Box shape="pill">32px radius</Box>
<Box shape="circle">50% radius</Box>
```

### Custom Colors
```tsx
<Box bg="primary">Theme primary color</Box>
<Box bg="#f5f5f5">Custom color</Box>
```

---

## 📱 Responsive Props

Use arrays for breakpoint values: `[mobile, tablet, desktop]`

```tsx
<Box
  width={[1, 1/2, 1/3]}           // 100%, 50%, 33%
  p={['s', 'm', 'l']}              // 12px, 16px, 24px
  display={['block', 'flex']}      // block on mobile, flex on tablet+
  gridTemplateColumns={[
    '1fr',                         // 1 column mobile
    '1fr 1fr',                     // 2 columns tablet
    '1fr 1fr 1fr'                  // 3 columns desktop
  ]}
>
```

---

## ⚠️ Common Mistakes

### ❌ DON'T DO THIS

```tsx
// Using Box for text content
<Box as="h1" fontSize="xl">Title</Box>

// Using $size instead of size
<Box $size="medium">Content</Box>

// Using arbitrary pixel values
<Box p="16px" gap={8} />

// Using color for text (Box doesn't support typography)
<Box color="primary">Text</Box>

// Trying to use fontSize on Box
<Box fontSize="l">Text</Box>
```

### ✅ DO THIS INSTEAD

```tsx
// Use Text for text content
<Text as="h1" fontSize="xl">Title</Text>

// Use size (without $) for Box
<Box size="m">Content</Box>

// Use theme tokens
<Box p="m" gap="xs" />

// Use bg for background color
<Box bg="primary">
  <Text color="white">Text</Text>
</Box>

// Text component for typography
<Text fontSize="l">Text</Text>
```

---

## 🎓 Complete Examples

### Card Component
```tsx
<Box skin="card" p="m" shape="rounded" gap="s">
  <Text as="h3" fontSize="l" fontWeight="bold">
    Card Title
  </Text>
  <Text as="p" fontSize="s" color="secondary" lineHeight="relaxed">
    Card description goes here
  </Text>
  <Button variant="primary" $size="small">
    Learn More
  </Button>
</Box>
```

### Flex Layout
```tsx
<Box 
  display="flex" 
  gap="m" 
  alignItems="center" 
  justifyContent="space-between"
  p="m"
  bg="surface"
>
  <Text as="h2" fontSize="l">Settings</Text>
  <Button variant="primary" $size="medium">Save</Button>
</Box>
```

### Responsive Grid
```tsx
<Box 
  display="grid" 
  gridTemplateColumns={["1fr", "1fr 1fr", "1fr 1fr 1fr"]} 
  gap="m"
  p="l"
>
  {items.map(item => (
    <Box key={item.id} skin="card" p="m" shape="rounded">
      <Text as="h4" fontWeight="bold">{item.title}</Text>
      <Text fontSize="s">{item.description}</Text>
    </Box>
  ))}
</Box>
```

### Centered Container
```tsx
<Box 
  maxWidth="1200px" 
  mx="auto" 
  p="l"
>
  {/* Page content */}
</Box>
```

---

## 🚫 When NOT to Use Box

| Scenario | Use This Instead |
|----------|-----------------|
| Text content | `Text` component |
| Headings | `Text as="h1-h6"` |
| Paragraphs | `Text as="p"` |
| Labels | `Text as="label"` |
| Buttons | `Button` component |
| Form inputs | `Field` component |

---

## 🔗 Related Components

- **Text** - For all text content
- **Button** - For clickable actions
- **Field** - For form inputs
- **Container** - Pre-styled page container block
- **Group** - Pre-styled flex group block

---

## 📚 Learn More

- [Box API Documentation](../../api/Box.md)
- [Component Selection Decision Tree](../../decision-trees/component-selection.md)
- [Prop Selection Decision Tree](../../decision-trees/prop-selection.md)
- [Layout Examples](../../examples/layouts/)

---

**Quick Tip:** Box is your go-to for **structure and layout**. If it contains text, use Text inside Box, not Box with typography props!