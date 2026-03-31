# Button Quick Reference Card

**Component:** `Button`  
**Category:** Interactive  
**Path:** `@reactberry/system/elements`

---

## 🎯 Purpose

Button is the **interactive action component** for user-triggered actions.

**Use for:** Click actions, form submissions, CTAs, triggers  
**NOT for:** Navigation links (use `Text as="a"`), non-interactive elements

---

## 📥 Import

```tsx
import { Button } from '@reactberry/system/elements';
```

---

## 🔥 Most Common Use Cases

### 1. Primary CTA
```tsx
<Button variant="primary" $size="medium" onClick={handleClick}>
  Get Started
</Button>
```

### 2. Secondary Action
```tsx
<Button variant="secondary" $size="medium">
  Learn More
</Button>
```

### 3. Subtle Action
```tsx
<Button variant="ghost" $size="small">
  Cancel
</Button>
```

### 4. Form Submit
```tsx
<Button type="submit" variant="primary" $size="medium">
  Submit Form
</Button>
```

### 5. Icon Button
```tsx
<Button variant="ghost" $size="small" icon>
  <Icon name="close" />
</Button>
```

---

## 🎨 Essential Props

| Prop | Type | Values | Default | Use For |
|------|------|--------|---------|---------|
| **variant** | string | `primary`, `secondary`, `ghost`, `outline`, `default` | `default` | Visual style |
| **$size** ⚠️ | ComponentSize | `small`, `medium`, `large` | `medium` | Component size |
| **disabled** | boolean | `true`, `false` | `false` | Disabled state |
| **loading** | boolean | `true`, `false` | `false` | Loading state |
| **icon** | boolean | `true`, `false` | `false` | Icon-only styling |
| **onClick** | function | Event handler | - | Click handler |
| **type** | string | `button`, `submit`, `reset` | `button` | Button type |

⚠️ **CRITICAL:** Button uses `$size` (with $), NOT `size`

---

## 🎨 Variants

### Primary
```tsx
<Button variant="primary" $size="medium">
  Primary Action
</Button>
```
**Use for:** Main call-to-action, primary user flow

### Secondary
```tsx
<Button variant="secondary" $size="medium">
  Secondary Action
</Button>
```
**Use for:** Alternative actions, less prominent CTAs

### Ghost
```tsx
<Button variant="ghost" $size="small">
  Subtle Action
</Button>
```
**Use for:** Cancel, dismiss, subtle actions

### Outline
```tsx
<Button variant="outline" $size="medium">
  Outlined Action
</Button>
```
**Use for:** Bordered buttons, alternative styling

---

## 📏 Sizes

### Small
```tsx
<Button variant="primary" $size="small">
  Small Button
</Button>
```
**Use for:** Compact UIs, inline actions, table actions

### Medium (Default)
```tsx
<Button variant="primary" $size="medium">
  Medium Button
</Button>
```
**Use for:** Standard buttons, forms, most use cases

### Large
```tsx
<Button variant="primary" $size="large">
  Large Button
</Button>
```
**Use for:** Hero sections, prominent CTAs, landing pages

---

## 🎭 States

### Disabled
```tsx
<Button variant="primary" $size="medium" disabled>
  Disabled Button
</Button>
```

### Loading
```tsx
<Button variant="primary" $size="medium" loading>
  Processing...
</Button>
```

### Icon Only
```tsx
<Button variant="ghost" $size="small" icon>
  ✕
</Button>
```

---

## ⚠️ Common Mistakes

### ❌ DON'T DO THIS

```tsx
// Missing $ prefix on size (MOST COMMON MISTAKE!)
<Button size="medium">Click</Button>

// Using for navigation
<Button as="a" href="/about">About</Button>

// Using theme space tokens for size
<Button $size="m">Click</Button>

// No variant specified
<Button>Click</Button>  // Works but not semantic
```

### ✅ DO THIS INSTEAD

```tsx
// Use $size with $ prefix
<Button $size="medium">Click</Button>

// Use Text for navigation links
<Text as="a" href="/about" color="primary" fontWeight="medium">
  About
</Text>

// Use ComponentSize values (small, medium, large)
<Button $size="medium">Click</Button>

// Specify variant for clarity
<Button variant="primary" $size="medium">Click</Button>
```

---

## 🎓 Complete Examples

### Form Actions
```tsx
<Box display="flex" gap="s" justifyContent="flex-end">
  <Button variant="ghost" $size="medium" onClick={handleCancel}>
    Cancel
  </Button>
  <Button variant="primary" $size="medium" type="submit">
    Save Changes
  </Button>
</Box>
```

### CTA Section
```tsx
<Box display="flex" gap="m" alignItems="center">
  <Button variant="primary" $size="large" onClick={handleSignup}>
    Get Started Free
  </Button>
  <Button variant="outline" $size="large" onClick={handleDemo}>
    Watch Demo
  </Button>
</Box>
```

### Loading State
```tsx
<Button 
  variant="primary" 
  $size="medium" 
  loading={isSubmitting}
  disabled={isSubmitting}
  onClick={handleSubmit}
>
  {isSubmitting ? 'Submitting...' : 'Submit'}
</Button>
```

### Icon Button
```tsx
<Button 
  variant="ghost" 
  $size="small" 
  icon
  onClick={handleClose}
  aria-label="Close"
>
  ✕
</Button>
```

### Button Group
```tsx
<Box display="flex" gap="xs">
  <Button variant="outline" $size="small">Bold</Button>
  <Button variant="outline" $size="small">Italic</Button>
  <Button variant="outline" $size="small">Underline</Button>
</Box>
```

---

## 📱 Responsive Sizing

```tsx
// Responsive size (advanced)
<Button 
  variant="primary" 
  $size="small"  // Note: $size doesn't support responsive arrays
  // Use media queries or conditional rendering for responsive buttons
>
  Action
</Button>
```

**Note:** `$size` doesn't support responsive arrays like `[small, medium, large]`. For responsive button sizing, use conditional rendering or media queries.

---

## 🚫 When NOT to Use Button

| Scenario | Use This Instead |
|----------|-----------------|
| Navigation links | `<Text as="a" href="...">` |
| Non-interactive elements | `Box` or `Text` |
| Form labels | `<Text as="label">` |
| Text with onClick | Consider if it should be a button or link |

---

## ♿ Accessibility

### Always Provide Context
```tsx
// ✅ GOOD - Text provides context
<Button variant="primary" $size="medium">
  Save Document
</Button>

// ✅ GOOD - aria-label for icon buttons
<Button variant="ghost" $size="small" icon aria-label="Close modal">
  ✕
</Button>

// ❌ BAD - No context
<Button variant="primary" $size="small" icon>
  →
</Button>
```

### Form Buttons
```tsx
// ✅ Specify button type in forms
<form onSubmit={handleSubmit}>
  <Field as="input" type="text" $size="medium" />
  <Button type="submit" variant="primary" $size="medium">
    Submit
  </Button>
  <Button type="button" variant="ghost" $size="medium" onClick={handleReset}>
    Reset
  </Button>
</form>
```

---

## 🎯 Quick Decision Guide

**Choose variant based on importance:**
- `primary` → Main action, highest priority
- `secondary` → Alternative action, medium priority  
- `outline` → Bordered alternative, medium priority
- `ghost` → Subtle action, low priority, cancel/dismiss

**Choose size based on context:**
- `small` → Compact spaces, tables, inline
- `medium` → Default for most use cases
- `large` → Hero sections, landing pages, prominence

---

## 🔗 Related Components

- **Text** - For navigation links (`<Text as="a">`)
- **Field** - For form inputs
- **Controls** - Block for button groups
- **IconButton** - Check blocks for specialized icon buttons

---

## 📚 Learn More

- [Button API Documentation](../../api/Button.md)
- [Component Selection Decision Tree](../../decision-trees/component-selection.md)
- [Prop Selection Decision Tree](../../decision-trees/prop-selection.md)
- [Form Examples](../../examples/forms/)

---

**Quick Tip:** Remember `$size` with the dollar sign! This is the #1 mistake when using Button.