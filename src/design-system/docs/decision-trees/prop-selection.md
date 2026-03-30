# Prop Selection Decision Tree

**Purpose:** Quick reference to choose the correct props for any component

## 🎯 Critical Distinction: `size` vs `$size`

**This is the #1 source of errors!** Understanding when to use each is essential.

---

## 1️⃣ Are you using Button or Field?

### ✅ YES → Use `$size` prop (with dollar sign)

Button and Field components use **component-specific sizing** with the `$size` prop.

**Valid values:** `"small"`, `"medium"`, `"large"`

```tsx
// ✅ CORRECT - Button with $size
<Button variant="primary" $size="medium">
  Click Me
</Button>

// ✅ CORRECT - Field with $size
<Field 
  as="input" 
  type="email" 
  variant="outline" 
  $size="medium"
/>

// ❌ WRONG - Missing $ prefix (most common mistake!)
<Button variant="primary" size="medium">Click</Button>
<Field as="input" variant="outline" size="large" />
```

**Why `$size`?**
- Styled-components uses `$` prefix for transient props
- These props don't get passed to DOM elements
- Prevents React warnings about invalid attributes

### ❌ NO → Continue to next question...

---

## 2️⃣ Are you using Box or Text?

### ✅ YES → Use `size` prop (no dollar sign)

Box and Text components use **generic spacing size** with the `size` prop.

**Valid values:** SpaceToken (`"mini"`, `"xs"`, `"s"`, `"m"`, `"l"`, `"xl"`, `"xxl"`, `"xxxl"`)

```tsx
// ✅ CORRECT - Box with size for width/height
<Box size="m" bg="surface">
  {/* Content */}
</Box>

// ✅ CORRECT - Text with size (though fontSize is preferred for text)
<Text size="s">Small text container</Text>

// ❌ WRONG - Using $size on Box
<Box $size="medium" />

// ❌ WRONG - Using $size on Text
<Text $size="large" />
```

**For Text sizing, prefer specific props:**
```tsx
// ✅ BEST - Use fontSize for text sizing
<Text as="p" fontSize="l">
  Large paragraph text
</Text>

// ⚠️ OK - size works but fontSize is more semantic
<Text as="p" size="l">
  Large paragraph text
</Text>
```

---

## 📊 Quick Lookup Table

| Component | Sizing Prop | Valid Values | Example |
|-----------|-------------|--------------|---------|
| **Button** | `$size` ⚠️ | small, medium, large | `<Button $size="medium" />` |
| **Field** | `$size` ⚠️ | small, medium, large | `<Field $size="medium" />` |
| **Box** | `size` | mini, xs, s, m, l, xl, xxl, xxxl | `<Box size="m" />` |
| **Text** | `size` or `fontSize` | mini→xxxl (size), xs→xxxl (fontSize) | `<Text fontSize="l" />` |

⚠️ = Most commonly confused

---

## 🎨 Spacing Props Decision

### Do you need space BETWEEN child elements?

✅ Use `gap` prop

```tsx
// Flex layout with gap
<Box display="flex" gap="m">
  <Text>Item 1</Text>
  <Text>Item 2</Text>
  <Text>Item 3</Text>
</Box>

// Grid layout with gap
<Box display="grid" gridTemplateColumns="1fr 1fr" gap="l">
  <Box>Cell 1</Box>
  <Box>Cell 2</Box>
</Box>
```

**Valid values:** SpaceToken (`"mini"`, `"xs"`, `"s"`, `"m"`, `"l"`, `"xl"`, `"xxl"`, `"xxxl"`)

**When gap works:**
- Parent has `display="flex"`
- Parent has `display="grid"`
- Modern browsers only (check compatibility if needed)

---

### Do you need space AROUND the element?

Choose between padding and margin:

#### Internal spacing → Use `p` (padding)

```tsx
// Padding all sides
<Box p="m">Content with internal spacing</Box>

// Padding specific sides
<Box px="l">  {/* Horizontal padding */}
<Box py="s">  {/* Vertical padding */}
<Box pt="m">  {/* Top padding */}
<Box pb="m">  {/* Bottom padding */}
<Box pl="s">  {/* Left padding */}
<Box pr="s">  {/* Right padding */}
```

#### External spacing → Use `m` (margin)

```tsx
// Margin all sides
<Box m="s">Content with external spacing</Box>

// Margin specific sides
<Box mx="auto">  {/* Horizontal centering */}
<Box my="l">     {/* Vertical margin */}
<Box mt="xl">    {/* Top margin */}
<Box mb="m">     {/* Bottom margin */}
<Box ml="s">     {/* Left margin */}
<Box mr="s">     {/* Right margin */}
```

**Valid values:** SpaceToken or `"auto"` for centering

---

## 🎭 Styling Props Decision

### Do you want predefined styles?

✅ Use `skin` prop

Skins provide pre-configured styling combinations:

```tsx
// Surface skins
<Box skin="base">Base background</Box>
<Box skin="surface">Secondary surface</Box>
<Box skin="card">Card with shadow and border</Box>
<Box skin="panel">Panel background</Box>

// Semantic skins
<Box skin="primary">Primary brand color</Box>
<Box skin="error">Error state styling</Box>
<Box skin="success">Success state styling</Box>
<Box skin="warning">Warning state styling</Box>

// Color-coded skins
<Box skin="blue">Blue category</Box>
<Box skin="green">Green category</Box>
<Box skin="red">Red category</Box>
```

**When to use skins:**
- You want consistent, pre-defined styling
- Following design system conventions
- Building cards, panels, or containers
- Showing semantic states (error, success, etc.)

**When NOT to use skins:**
- You need custom, one-off styling
- Combining multiple style properties manually

---

### Do you want custom background color?

✅ Use `bg` prop

```tsx
// Theme color tokens (preferred)
<Box bg="primary">Primary background</Box>
<Box bg="surface">Surface background</Box>

// Custom colors (use sparingly)
<Box bg="#f5f5f5">Custom gray</Box>
```

---

### Do you want border radius?

✅ Use `shape` prop

```tsx
<Box shape="square">No rounding (0px)</Box>
<Box shape="roundedSmall">Subtle (4px)</Box>
<Box shape="rounded">Standard (8px)</Box>
<Box shape="roundedLarge">Pronounced (16px)</Box>
<Box shape="pill">Pill shape (32px)</Box>
<Box shape="circle">Circular (50%)</Box>
```

---

## 📝 Typography Props Decision

### For Text component only

#### Text Size

```tsx
// ✅ BEST - Use fontSize for text sizing
<Text as="p" fontSize="l">Large text</Text>

// Available sizes: xs, s, m, l, xl, xxl, xxxl
<Text fontSize="xs">Caption (12px)</Text>
<Text fontSize="s">Small (14px)</Text>
<Text fontSize="m">Body (16px)</Text>
<Text fontSize="l">Large (20px)</Text>
<Text fontSize="xl">Heading (24px)</Text>
<Text fontSize="xxl">Title (32px)</Text>
<Text fontSize="xxxl">Hero (48px)</Text>
```

#### Text Weight

```tsx
<Text fontWeight="normal">Regular (400)</Text>
<Text fontWeight="medium">Medium (500)</Text>
<Text fontWeight="semibold">Semibold (600)</Text>
<Text fontWeight="bold">Bold (700)</Text>
```

#### Text Color

```tsx
// Theme tokens (preferred)
<Text color="primary">Primary color</Text>
<Text color="secondary">Secondary color</Text>
<Text color="error">Error color</Text>

// Custom colors
<Text color="#333">Custom dark gray</Text>
```

#### Line Height

```tsx
<Text lineHeight="tight">Tight spacing (1.2)</Text>
<Text lineHeight="normal">Normal spacing (1.5)</Text>
<Text lineHeight="relaxed">Relaxed spacing (1.75)</Text>
<Text lineHeight="loose">Loose spacing (2)</Text>
```

#### Text Alignment

```tsx
<Text textAlign="left">Left aligned</Text>
<Text textAlign="center">Center aligned</Text>
<Text textAlign="right">Right aligned</Text>
<Text textAlign="justify">Justified</Text>
```

#### Text Truncation

```tsx
// Single line with ellipsis
<Text truncate>This text will be truncated with...</Text>

// Multiple lines with ellipsis
<Text lineClamp={3}>
  This text will be clamped to 3 lines with...
</Text>
```

---

## 🎨 Layout Props Decision

### Flex Layout

```tsx
<Box 
  display="flex" 
  flexDirection="row"           // row, column, row-reverse, column-reverse
  alignItems="center"            // flex-start, center, flex-end, stretch
  justifyContent="space-between" // flex-start, center, flex-end, space-between, space-around
  gap="m"                        // spacing between items
>
  {/* Children */}
</Box>
```

**Common flex patterns:**

```tsx
// Horizontal row with centered items
<Box display="flex" gap="m" alignItems="center">

// Vertical column with spacing
<Box display="flex" flexDirection="column" gap="s">

// Space between items
<Box display="flex" justifyContent="space-between" alignItems="center">

// Centered content
<Box display="flex" alignItems="center" justifyContent="center">
```

### Grid Layout

```tsx
<Box 
  display="grid" 
  gridTemplateColumns="1fr 1fr 1fr"  // Column definition
  gridTemplateRows="auto"            // Row definition
  gap="m"                            // Gap between cells
>
  {/* Grid items */}
</Box>
```

**Common grid patterns:**

```tsx
// Two column layout
<Box display="grid" gridTemplateColumns="1fr 1fr" gap="m">

// Three column layout
<Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gap="m">

// Sidebar layout
<Box display="grid" gridTemplateColumns="250px 1fr" gap="l">

// Responsive grid (see responsive section)
<Box 
  display="grid" 
  gridTemplateColumns={["1fr", "1fr 1fr", "1fr 1fr 1fr"]} 
  gap="m"
>
```

---

## 📱 Responsive Props Decision

### Do you need different values at different breakpoints?

✅ Use responsive arrays: `[mobile, tablet, desktop]`

```tsx
// Responsive width
<Box width={[1, 1/2, 1/3]}>
  {/* 100% on mobile, 50% on tablet, 33% on desktop */}
</Box>

// Responsive padding
<Box p={['s', 'm', 'l']}>
  {/* 12px, 16px, 24px padding */}
</Box>

// Responsive font size
<Text fontSize={['s', 'm', 'l']}>
  {/* 14px, 16px, 20px text */}
</Text>

// Responsive display
<Box display={['block', 'flex']}>
  {/* block on mobile, flex on tablet+ */}
</Box>

// Responsive grid columns
<Box 
  display="grid" 
  gridTemplateColumns={[
    '1fr',           // 1 column on mobile
    '1fr 1fr',       // 2 columns on tablet
    '1fr 1fr 1fr'    // 3 columns on desktop
  ]} 
  gap="m"
>
```

**Breakpoints:**
- Index 0: Mobile (< 768px)
- Index 1: Tablet (≥ 768px)
- Index 2: Desktop (≥ 1024px)

---

## 🎯 Interactive Props Decision

### Cursor Style

```tsx
<Box cursor="pointer">Clickable element</Box>
<Box cursor="default">Default cursor</Box>
<Box cursor="not-allowed">Disabled element</Box>
<Box cursor="text">Text selection</Box>
```

### Hover State

```tsx
<Box hover="subtle">Subtle highlight on hover</Box>
<Box hover="lift">Lift with shadow on hover</Box>
<Box hover="glow">Glow effect on hover</Box>
```

### Focus State

```tsx
<Box focus="highlight">Highlight border on focus</Box>
<Box focus="ring">Focus ring on focus</Box>
<Box focus="none">No focus styling</Box>
```

---

## ⚠️ Common Prop Mistakes

### Mistake #1: Wrong size prop on Button/Field

```tsx
// ❌ WRONG
<Button size="medium">Click</Button>
<Field size="large" as="input" />

// ✅ CORRECT
<Button $size="medium">Click</Button>
<Field $size="large" as="input" />
```

### Mistake #2: Using $size on Box/Text

```tsx
// ❌ WRONG
<Box $size="m">Content</Box>
<Text $size="l">Text</Text>

// ✅ CORRECT
<Box size="m">Content</Box>
<Text fontSize="l">Text</Text>
```

### Mistake #3: Arbitrary values instead of tokens

```tsx
// ❌ WRONG
<Box p="16px" gap={8} />
<Text fontSize="18px" />

// ✅ CORRECT
<Box p="m" gap="xs" />
<Text fontSize="l" />
```

### Mistake #4: Missing semantic HTML

```tsx
// ❌ WRONG
<Text fontSize="xl" fontWeight="bold">Heading</Text>

// ✅ CORRECT
<Text as="h1" fontSize="xl" fontWeight="bold">Heading</Text>
```

### Mistake #5: Wrong breakpoint array length

```tsx
// ❌ INCONSISTENT - Different array lengths
<Box width={[1, 1/2]} p={['s', 'm', 'l']} />

// ✅ CORRECT - Consistent array lengths
<Box width={[1, 1/2, 1/3]} p={['s', 'm', 'l']} />
```

---

## 📚 Prop Reference by Component

### Box Props

| Category | Props | Values |
|----------|-------|--------|
| **Layout** | display | flex, grid, block, inline-block, none |
| | gap | mini, xs, s, m, l, xl, xxl, xxxl |
| | size | mini, xs, s, m, l, xl, xxl, xxxl |
| **Spacing** | p, px, py, pt, pb, pl, pr | SpaceToken |
| | m, mx, my, mt, mb, ml, mr | SpaceToken or "auto" |
| **Styling** | skin | base, surface, card, panel, primary, error, etc. |
| | shape | square, roundedSmall, rounded, roundedLarge, pill, circle |
| | bg | theme colors or custom |
| **Flex** | flexDirection | row, column, row-reverse, column-reverse |
| | alignItems | flex-start, center, flex-end, stretch |
| | justifyContent | flex-start, center, flex-end, space-between, space-around |
| **Grid** | gridTemplateColumns | CSS grid values |
| | gridTemplateRows | CSS grid values |
| **Interactive** | cursor | pointer, default, not-allowed, text |
| | hover | subtle, lift, glow |

### Text Props

Inherits all Box props, plus:

| Category | Props | Values |
|----------|-------|--------|
| **Semantic** | as | h1-h6, p, span, label, a, div |
| **Typography** | fontSize | xs, s, m, l, xl, xxl, xxxl |
| | fontWeight | normal, medium, semibold, bold |
| | color | theme colors or custom |
| | lineHeight | tight, normal, relaxed, loose |
| | textAlign | left, center, right, justify |
| **Truncation** | truncate | boolean |
| | lineClamp | number |

### Button Props

Inherits all Text props, plus:

| Category | Props | Values |
|----------|-------|--------|
| **Button** | variant | default, primary, secondary, ghost, outline |
| | $size ⚠️ | small, medium, large |
| | disabled | boolean |
| | loading | boolean |
| | icon | boolean |

### Field Props

Inherits all Text props, plus:

| Category | Props | Values |
|----------|-------|--------|
| **Field** | as | input, textarea, select |
| | type | text, email, password, number, tel, url, etc. |
| | variant | default, outline, filled, unstyled |
| | $size ⚠️ | small, medium, large |
| | error | boolean |
| | disabled | boolean |
| | placeholder | string |

---

## 📚 Related Documentation

- [Component Selection Decision Tree](./component-selection.md) - Choose the right component
- [Design Tokens Reference](../assets/design-tokens.md) - All available tokens
- [Complete Patterns](../reference/complete-patterns.md) - Real-world examples
- [API Documentation](../api/) - Detailed component APIs