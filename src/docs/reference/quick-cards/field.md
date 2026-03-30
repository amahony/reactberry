# Field Quick Reference Card

**Component:** `Field`  
**Category:** Form Input  
**Path:** `@/design-system/elements`

---

## 🎯 Purpose

Field is the **form input component** for user data entry.

**Use for:** Text inputs, textareas, selects, form fields  
**NOT for:** Buttons, non-form interactive elements

---

## 📥 Import

```tsx
import { Field } from '@/design-system/elements';
```

---

## 🔥 Most Common Use Cases

### 1. Text Input
```tsx
<Field 
  as="input" 
  type="text" 
  variant="outline" 
  $size="medium"
  placeholder="Enter text"
/>
```

### 2. Email Input
```tsx
<Field 
  as="input" 
  type="email" 
  variant="outline" 
  $size="medium"
  placeholder="you@example.com"
/>
```

### 3. Password Input
```tsx
<Field 
  as="input" 
  type="password" 
  variant="outline" 
  $size="medium"
  placeholder="••••••••"
/>
```

### 4. Textarea
```tsx
<Field 
  as="textarea" 
  variant="outline" 
  $size="medium"
  rows={4}
  placeholder="Enter description"
/>
```

### 5. Select Dropdown
```tsx
<Field as="select" variant="outline" $size="medium">
  <option value="">Choose option</option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</Field>
```

---

## 🎨 Essential Props

| Prop | Type | Values | Default | Use For |
|------|------|--------|---------|---------|
| **as** | string | `input`, `textarea`, `select` | `input` | Field element type |
| **type** | string | `text`, `email`, `password`, `number`, `tel`, `url`, `search`, `date`, `time` | `text` | Input type (when as="input") |
| **variant** | string | `default`, `outline`, `filled`, `unstyled` | `default` | Visual style |
| **$size** ⚠️ | ComponentSize | `small`, `medium`, `large` | `medium` | Component size |
| **error** | boolean | `true`, `false` | `false` | Error state |
| **disabled** | boolean | `true`, `false` | `false` | Disabled state |
| **placeholder** | string | Any text | - | Placeholder text |
| **value** | string | Any text | - | Controlled value |
| **onChange** | function | Event handler | - | Change handler |

⚠️ **CRITICAL:** Field uses `$size` (with $), NOT `size`

---

## 🎨 Variants

### Outline (Default)
```tsx
<Field as="input" variant="outline" $size="medium" />
```
**Use for:** Most form inputs, clear boundaries

### Filled
```tsx
<Field as="input" variant="filled" $size="medium" />
```
**Use for:** Filled background style, alternative aesthetic

### Unstyled
```tsx
<Field as="input" variant="unstyled" $size="medium" />
```
**Use for:** Custom styling, minimal base styles

---

## 📏 Sizes

### Small
```tsx
<Field as="input" variant="outline" $size="small" />
```
**Use for:** Compact forms, inline inputs, table cells

### Medium (Default)
```tsx
<Field as="input" variant="outline" $size="medium" />
```
**Use for:** Standard forms, most use cases

### Large
```tsx
<Field as="input" variant="outline" $size="large" />
```
**Use for:** Prominent forms, landing pages, search bars

---

## 🎭 Field Types (as="input")

### Text
```tsx
<Field as="input" type="text" variant="outline" $size="medium" />
```

### Email
```tsx
<Field as="input" type="email" variant="outline" $size="medium" />
```

### Password
```tsx
<Field as="input" type="password" variant="outline" $size="medium" />
```

### Number
```tsx
<Field as="input" type="number" variant="outline" $size="medium" min={0} max={100} />
```

### Tel
```tsx
<Field as="input" type="tel" variant="outline" $size="medium" />
```

### URL
```tsx
<Field as="input" type="url" variant="outline" $size="medium" />
```

### Search
```tsx
<Field as="input" type="search" variant="outline" $size="medium" />
```

### Date
```tsx
<Field as="input" type="date" variant="outline" $size="medium" />
```

### Time
```tsx
<Field as="input" type="time" variant="outline" $size="medium" />
```

---

## 🎭 States

### Error
```tsx
<Field 
  as="input" 
  type="email" 
  variant="outline" 
  $size="medium"
  error
/>
```

### Disabled
```tsx
<Field 
  as="input" 
  type="text" 
  variant="outline" 
  $size="medium"
  disabled
/>
```

### Required
```tsx
<Field 
  as="input" 
  type="text" 
  variant="outline" 
  $size="medium"
  required
/>
```

---

## ⚠️ Common Mistakes

### ❌ DON'T DO THIS

```tsx
// Missing $ prefix on size (MOST COMMON MISTAKE!)
<Field size="medium" as="input" />

// Using theme space tokens for size
<Field $size="m" as="input" />

// Missing 'as' prop
<Field type="email" variant="outline" $size="medium" />

// Using type on textarea/select
<Field as="textarea" type="text" />

// Label without htmlFor connection
<Text as="label">Email</Text>
<Field as="input" type="email" />
```

### ✅ DO THIS INSTEAD

```tsx
// Use $size with $ prefix
<Field $size="medium" as="input" />

// Use ComponentSize values (small, medium, large)
<Field $size="medium" as="input" />

// Explicitly specify 'as' prop
<Field as="input" type="email" variant="outline" $size="medium" />

// Type only for input elements
<Field as="input" type="text" />
<Field as="textarea" />  // No type prop

// Connected label and field
<Text as="label" htmlFor="email">Email</Text>
<Field id="email" as="input" type="email" $size="medium" />
```

---

## 🎓 Complete Examples

### Labeled Input
```tsx
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
  />
</Box>
```

### Input with Error
```tsx
<Box gap="xs">
  <Text as="label" htmlFor="username" fontSize="s" fontWeight="medium">
    Username
  </Text>
  <Field 
    id="username"
    as="input" 
    type="text" 
    variant="outline" 
    $size="medium"
    error
    value={username}
    onChange={(e) => setUsername(e.target.value)}
  />
  {error && (
    <Text fontSize="xs" color="error">
      Username is already taken
    </Text>
  )}
</Box>
```

### Textarea Field
```tsx
<Box gap="xs">
  <Text as="label" htmlFor="description" fontSize="s" fontWeight="medium">
    Description
  </Text>
  <Field 
    id="description"
    as="textarea" 
    variant="outline" 
    $size="medium"
    rows={6}
    placeholder="Enter detailed description..."
  />
</Box>
```

### Select Dropdown
```tsx
<Box gap="xs">
  <Text as="label" htmlFor="country" fontSize="s" fontWeight="medium">
    Country
  </Text>
  <Field 
    id="country"
    as="select" 
    variant="outline" 
    $size="medium"
    value={country}
    onChange={(e) => setCountry(e.target.value)}
  >
    <option value="">Select a country</option>
    <option value="us">United States</option>
    <option value="uk">United Kingdom</option>
    <option value="ca">Canada</option>
  </Field>
</Box>
```

### Search Input
```tsx
<Field 
  as="input" 
  type="search" 
  variant="outline" 
  $size="large"
  placeholder="Search..."
  onChange={(e) => handleSearch(e.target.value)}
/>
```

### Controlled Input
```tsx
const [value, setValue] = useState('');

<Field 
  as="input" 
  type="text" 
  variant="outline" 
  $size="medium"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="Type here..."
/>
```

---

## 📱 Responsive Sizing

```tsx
// Note: $size doesn't support responsive arrays
// Use conditional rendering for responsive field sizing

{isMobile ? (
  <Field as="input" variant="outline" $size="small" />
) : (
  <Field as="input" variant="outline" $size="medium" />
)}
```

---

## 🚫 When NOT to Use Field

| Scenario | Use This Instead |
|----------|-----------------|
| Buttons | `Button` component |
| Display text | `Text` component |
| Links | `<Text as="a">` |
| Read-only content | `Text` or `Box` |

---

## ♿ Accessibility

### Always Connect Labels
```tsx
// ✅ GOOD - Connected with htmlFor/id
<Text as="label" htmlFor="email">Email</Text>
<Field id="email" as="input" type="email" $size="medium" />

// ❌ BAD - No connection
<Text as="label">Email</Text>
<Field as="input" type="email" $size="medium" />
```

### Provide Helpful Placeholders
```tsx
// ✅ GOOD - Descriptive placeholder
<Field 
  as="input" 
  type="email" 
  $size="medium"
  placeholder="you@example.com"
  aria-label="Email address"
/>

// ⚠️ OK - But prefer visible labels
<Field 
  as="input" 
  type="email" 
  $size="medium"
  placeholder="Email"
/>
```

### Required Fields
```tsx
<Text as="label" htmlFor="email">
  Email <Text as="span" color="error">*</Text>
</Text>
<Field 
  id="email"
  as="input" 
  type="email" 
  $size="medium"
  required
  aria-required="true"
/>
```

### Error Messages
```tsx
<Box gap="xs">
  <Text as="label" htmlFor="password">Password</Text>
  <Field 
    id="password"
    as="input" 
    type="password" 
    $size="medium"
    error
    aria-invalid="true"
    aria-describedby="password-error"
  />
  <Text id="password-error" fontSize="xs" color="error">
    Password must be at least 8 characters
  </Text>
</Box>
```

---

## 🎯 Quick Decision Guide

**Choose variant based on design:**
- `outline` → Most common, clear boundaries
- `filled` → Alternative aesthetic, filled background
- `unstyled` → Custom styling needed

**Choose size based on context:**
- `small` → Compact forms, inline inputs
- `medium` → Standard forms, default choice
- `large` → Prominent forms, search bars

**Choose type based on data:**
- `text` → General text input
- `email` → Email validation
- `password` → Hidden characters
- `number` → Numeric input with steppers
- `tel` → Phone numbers
- `url` → Web addresses
- `search` → Search functionality
- `date`/`time` → Date/time pickers

---

## 🔗 Related Components

- **Text** - For labels (`<Text as="label">`)
- **Button** - For form submissions
- **FieldSet** - Block for grouped fields
- **Controls** - Block for form actions

---

## 📚 Learn More

- [Field API Documentation](../../api/Field.md)
- [Component Selection Decision Tree](../../decision-trees/component-selection.md)
- [Prop Selection Decision Tree](../../decision-trees/prop-selection.md)
- [Form Examples](../../examples/forms/)

---

**Quick Tip:** Remember `$size` with the dollar sign! Always connect labels to fields with `htmlFor`/`id` for accessibility.