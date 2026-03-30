# Prop Validation Reference

**Purpose:** Document valid and invalid prop combinations to prevent common errors

## 🚨 Invalid Prop Combinations

### Box Component

#### ❌ Typography Props on Box

Box does NOT support typography props. Use Text instead.

```tsx
// ❌ INVALID - Box doesn't support fontSize
<Box fontSize="l">Text content</Box>

// ❌ INVALID - Box doesn't support fontWeight
<Box fontWeight="bold">Bold text</Box>

// ❌ INVALID - Box doesn't support color for text
<Box color="primary">Colored text</Box>

// ❌ INVALID - Box doesn't support lineHeight
<Box lineHeight="relaxed">Text with line height</Box>

// ✅ VALID - Use Text for all text content
<Text fontSize="l" fontWeight="bold" color="primary" lineHeight="relaxed">
  Text content
</Text>
```

#### ❌ Wrong Size Prop on Box

```tsx
// ❌ INVALID - Box uses 'size' not '$size'
<Box $size="medium">Content</Box>

// ✅ VALID - Use 'size' (no $) for Box
<Box size="m">Content</Box>
```

#### ❌ Arbitrary Values Instead of Tokens

```tsx
// ❌ INVALID - Using pixel values
<Box p="16px" gap={8} />

// ❌ INVALID - Using numeric indices
<Box p={5} gap={3} />

// ✅ VALID - Use theme tokens
<Box p="m" gap="xs" />
```

---

### Text Component

#### ❌ Missing Semantic HTML

```tsx
// ❌ INVALID - Missing 'as' prop for semantic HTML
<Text fontSize="xl" fontWeight="bold">
  Page Title
</Text>

// ❌ INVALID - Using div for headings
<Text as="div" fontSize="xl">
  Page Title
</Text>

// ✅ VALID - Always specify semantic 'as' prop
<Text as="h1" fontSize="xl" fontWeight="bold">
  Page Title
</Text>
```

#### ❌ Wrong Size Prop on Text

```tsx
// ❌ INVALID - Using $size on Text
<Text $size="large">Text content</Text>

// ⚠️ WORKS BUT NOT RECOMMENDED - size for text sizing
<Text size="l">Text content</Text>

// ✅ VALID - Use fontSize for text sizing
<Text fontSize="l">Text content</Text>
```

#### ❌ Using Box for Text Content

```tsx
// ❌ INVALID - Box for text content
<Box as="p">This is a paragraph</Box>
<Box as="h1">This is a heading</Box>

// ✅ VALID - Text for text content
<Text as="p">This is a paragraph</Text>
<Text as="h1">This is a heading</Text>
```

---

### Button Component

#### ❌ Wrong Size Prop (Most Common Mistake!)

```tsx
// ❌ INVALID - Missing $ prefix
<Button size="medium">Click Me</Button>

// ❌ INVALID - Using theme tokens
<Button size="m">Click Me</Button>

// ✅ VALID - Use $size with ComponentSize values
<Button $size="medium">Click Me</Button>
```

#### ❌ Button for Navigation Links

```tsx
// ❌ INVALID - Button for navigation
<Button as="a" href="/about">About Us</Button>

// ✅ VALID - Use Text for links
<Text as="a" href="/about" color="primary" fontWeight="medium">
  About Us
</Text>
```

#### ❌ Invalid Variant Combinations

```tsx
// ❌ INVALID - Non-existent variant
<Button variant="link">Click</Button>

// ❌ INVALID - Typo in variant name
<Button variant="primery">Click</Button>

// ✅ VALID - Correct variants
<Button variant="primary">Click</Button>
<Button variant="secondary">Click</Button>
<Button variant="ghost">Click</Button>
<Button variant="outline">Click</Button>
```

---

### Field Component

#### ❌ Wrong Size Prop (Most Common Mistake!)

```tsx
// ❌ INVALID - Missing $ prefix
<Field size="medium" as="input" />

// ❌ INVALID - Using theme tokens
<Field size="m" as="input" />

// ✅ VALID - Use $size with ComponentSize values
<Field $size="medium" as="input" />
```

#### ❌ Missing Input Type

```tsx
// ❌ INCOMPLETE - No 'as' specified
<Field type="email" variant="outline" $size="medium" />

// ⚠️ WORKS BUT IMPLICIT - Defaults to as="input"
<Field type="email" variant="outline" $size="medium" />

// ✅ VALID - Explicit 'as' prop
<Field as="input" type="email" variant="outline" $size="medium" />
```

#### ❌ Type Mismatch

```tsx
// ❌ INVALID - textarea doesn't have type prop
<Field as="textarea" type="text" />

// ❌ INVALID - select doesn't have type prop
<Field as="select" type="text" />

// ✅ VALID - type only for input
<Field as="input" type="text" />
<Field as="textarea" />
<Field as="select" />
```

---

### Responsive Arrays

#### ❌ Mismatched Array Lengths

```tsx
// ❌ INCONSISTENT - Different breakpoint counts
<Box 
  width={[1, 1/2]} 
  p={['s', 'm', 'l']} 
/>

// ✅ VALID - Consistent array lengths
<Box 
  width={[1, 1/2, 1/3]} 
  p={['s', 'm', 'l']} 
/>
```

#### ❌ Invalid Token Values in Arrays

```tsx
// ❌ INVALID - Using px values in responsive array
<Box p={['12px', '16px', '24px']} />

// ✅ VALID - Use theme tokens
<Box p={['s', 'm', 'l']} />
```

---

## ✅ Required Prop Combinations

### Text Component - Always Specify 'as'

```tsx
// ❌ INVALID - No semantic HTML
<Text fontSize="xl" fontWeight="bold">Title</Text>

// ✅ VALID - Semantic 'as' prop
<Text as="h1" fontSize="xl" fontWeight="bold">Title</Text>
```

**Required for accessibility and SEO**

---

### Field with Label - Must Connect with htmlFor/id

```tsx
// ❌ INVALID - No connection between label and input
<Text as="label">Email Address</Text>
<Field as="input" type="email" variant="outline" $size="medium" />

// ❌ INVALID - htmlFor without matching id
<Text as="label" htmlFor="email">Email Address</Text>
<Field as="input" type="email" variant="outline" $size="medium" />

// ✅ VALID - Connected with htmlFor/id
<Text as="label" htmlFor="email">Email Address</Text>
<Field id="email" as="input" type="email" variant="outline" $size="medium" />
```

**Required for accessibility**

---

### Button Type in Forms

```tsx
// ❌ POTENTIAL ISSUE - Submit button without type
<form onSubmit={handleSubmit}>
  <Field as="input" type="text" $size="medium" />
  <Button variant="primary" $size="medium">Submit</Button>
</form>

// ✅ VALID - Explicit type="submit"
<form onSubmit={handleSubmit}>
  <Field as="input" type="text" $size="medium" />
  <Button type="submit" variant="primary" $size="medium">Submit</Button>
</form>
```

---

## 🎯 Recommended Prop Patterns

### Card Component Pattern

```tsx
// ✅ RECOMMENDED - Complete card pattern
<Box skin="card" p="m" shape="rounded" gap="s">
  <Text as="h3" fontSize="l" fontWeight="bold">
    Card Title
  </Text>
  <Text as="p" fontSize="s" color="secondary" lineHeight="relaxed">
    Card description with proper typography
  </Text>
  <Button variant="primary" $size="small">
    Action
  </Button>
</Box>
```

**Why this works:**
- Box for layout/container (skin, padding, shape)
- Text for all text content with semantic HTML
- Button with $size for actions

---

### Form Field Pattern

```tsx
// ✅ RECOMMENDED - Complete form field pattern
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
    placeholder="you@example.com"
    required
  />
</Box>
```

**Why this works:**
- Box for field group layout
- Text for label with htmlFor connection
- Field with proper id, type, and $size
- Semantic and accessible

---

### Page Header Pattern

```tsx
// ✅ RECOMMENDED - Page header with actions
<Box 
  display="flex" 
  alignItems="center" 
  justifyContent="space-between" 
  p="m" 
  bg="surface"
>
  <Text as="h1" fontSize="xl" fontWeight="bold" color="primary">
    Page Title
  </Text>
  <Box display="flex" gap="s" alignItems="center">
    <Button variant="ghost" $size="small">
      Cancel
    </Button>
    <Button variant="primary" $size="medium">
      Save
    </Button>
  </Box>
</Box>
```

**Why this works:**
- Box for flex layout
- Text for heading with semantic h1
- Box for button group
- Buttons with $size variants

---

## 🔍 Validation Checklist

### Before Submitting Code

- [ ] **Text content uses Text component** (not Box)
- [ ] **All Text components have 'as' prop** for semantic HTML
- [ ] **Button/Field use '$size'** (with $)
- [ ] **Box/Text use 'size'** (without $ for generic sizing)
- [ ] **All spacing uses theme tokens** (not px values)
- [ ] **Labels connected to inputs** with htmlFor/id
- [ ] **Responsive arrays have consistent lengths**
- [ ] **Valid variant names** for Button/Field
- [ ] **Proper semantic HTML structure** (h1→h6, p, label, etc.)
- [ ] **No typography props on Box** (fontSize, fontWeight, color for text)

---

## 🐛 Common Error Messages

### Error: "fontSize is not a function"

**Cause:** Using typography props on Box component

**Solution:** Use Text component for text content

```tsx
// ❌ WRONG
<Box fontSize="l">Text</Box>

// ✅ CORRECT
<Text fontSize="l">Text</Text>
```

---

### Warning: "Received `false` for a non-boolean attribute `$size`"

**Cause:** Likely using wrong size prop

**Check:**
1. Button/Field should use `$size="medium"` (not `size`)
2. Box/Text should use `size="m"` (not `$size`)

---

### Error: "Cannot read property 'space' of undefined"

**Cause:** Using invalid theme token value

**Solution:** Use valid SpaceToken values

```tsx
// ❌ WRONG
<Box p="16px" />
<Box gap={5} />

// ✅ CORRECT
<Box p="m" />
<Box gap="m" />
```

---

### Warning: `Unknown prop 'as' on <div> tag`

**Cause:** This is usually fine - styled-components handles 'as' prop correctly

**Note:** If seeing this, ensure you're using the design system components, not native HTML elements

---

## 📚 Related Documentation

- [Decision Trees](../decision-trees/) - Choose the right component and props
- [API References](../api/) - Complete prop documentation
- [Type Definitions](../../types.ts) - TypeScript type reference
- [Component Metadata](../../components.json) - Machine-readable component data

---

## 🧪 Testing Your Props

### Manual Checklist

```tsx
// Example component to validate
function MyComponent() {
  return (
    <Box display="flex" gap="m" p="l">
      <Text as="h1" fontSize="xl" fontWeight="bold">
        Title
      </Text>
      <Button variant="primary" $size="medium">
        Action
      </Button>
    </Box>
  );
}

// Validation:
// ✅ Box uses 'size' or spacing tokens (not $size)
// ✅ Text has 'as' prop
// ✅ Text uses typography props
// ✅ Button uses '$size' (with $)
// ✅ All spacing uses theme tokens
```

### TypeScript Validation

If using TypeScript, import types to validate props:

```tsx
import type { BoxProps, TextProps, ButtonProps } from '@/design-system/types';

const myBoxProps: BoxProps = {
  display: 'flex',
  gap: 'm',
  p: 'l',
  // $size: 'medium' // ❌ TypeScript error - Box doesn't have $size
};

const myButtonProps: ButtonProps = {
  variant: 'primary',
  $size: 'medium',
  // size: 'm' // ⚠️ Will work but wrong prop for button sizing
};
```

---

**Last Updated:** 2025-01-09
**Maintainer:** Design System Team