# Common Errors & Troubleshooting

**Purpose:** Quick solutions to frequently encountered errors when using the design system

## 🚨 Most Common Errors

### Error #1: Using `size` instead of `$size` on Button/Field

**Frequency:** ⭐⭐⭐⭐⭐ (Most common!)

**Error Symptom:**
```
Warning: Received `true` for a non-boolean attribute `size`
```
or button/field doesn't size correctly

**Wrong Code:**
```tsx
<Button size="medium">Click Me</Button>
<Field size="large" as="input" />
```

**Correct Code:**
```tsx
<Button $size="medium">Click Me</Button>
<Field $size="large" as="input" />
```

**Why:** Button and Field use transient props (prefixed with `$`) to prevent them from being passed to DOM elements. This is a styled-components convention.

**Remember:** 
- Box/Text use `size` (no $)
- Button/Field use `$size` (with $)

---

### Error #2: Using Box for Text Content

**Frequency:** ⭐⭐⭐⭐ (Very common)

**Error Symptom:**
```
TypeError: Cannot read property 'fontSize' of undefined
```
or text doesn't style correctly

**Wrong Code:**
```tsx
<Box as="h1" fontSize="xl">Page Title</Box>
<Box color="primary">Some text</Box>
```

**Correct Code:**
```tsx
<Text as="h1" fontSize="xl">Page Title</Text>
<Text color="primary">Some text</Text>
```

**Why:** Box is for layout only and doesn't support typography props (fontSize, fontWeight, color for text, etc.). Text extends Box and adds these capabilities.

**Rule:** If it's readable text → use Text component

---

### Error #3: Missing Semantic HTML (`as` prop on Text)

**Frequency:** ⭐⭐⭐⭐

**Error Symptom:**
- No error, but accessibility issues
- SEO problems
- Screen readers can't navigate properly

**Wrong Code:**
```tsx
<Text fontSize="xl" fontWeight="bold">
  Page Heading
</Text>
```

**Correct Code:**
```tsx
<Text as="h1" fontSize="xl" fontWeight="bold">
  Page Heading
</Text>
```

**Why:** Semantic HTML is essential for accessibility and SEO. Always specify the `as` prop to use the correct HTML element.

**Required for:**
- Headings: `as="h1"` through `as="h6"`
- Paragraphs: `as="p"`
- Labels: `as="label"`
- Links: `as="a"`

---

### Error #4: Using Arbitrary Values Instead of Theme Tokens

**Frequency:** ⭐⭐⭐

**Error Symptom:**
```
Cannot read property 'space' of undefined
```
or spacing doesn't work as expected

**Wrong Code:**
```tsx
<Box p="16px" gap={8} />
<Text fontSize="18px" />
<Box m={5} />
```

**Correct Code:**
```tsx
<Box p="m" gap="xs" />
<Text fontSize="l" />
<Box m="m" />
```

**Why:** The design system uses theme tokens for consistency. Arbitrary values bypass the theme system and can break responsive behavior.

**Use theme tokens:**
- Space: `mini`, `xs`, `s`, `m`, `l`, `xl`, `xxl`, `xxxl`
- Font sizes: `xs`, `s`, `m`, `l`, `xl`, `xxl`, `xxxl`

---

### Error #5: Missing Label-Input Connection

**Frequency:** ⭐⭐⭐

**Error Symptom:**
- No error, but accessibility violation
- Clicking label doesn't focus input
- Screen readers don't announce field properly

**Wrong Code:**
```tsx
<Text as="label">Email Address</Text>
<Field as="input" type="email" $size="medium" />
```

**Correct Code:**
```tsx
<Text as="label" htmlFor="email">Email Address</Text>
<Field id="email" as="input" type="email" $size="medium" />
```

**Why:** Labels must be programmatically connected to inputs for accessibility. Use matching `htmlFor` and `id` attributes.

**WCAG Requirement:** Labels must be associated with form controls

---

### Error #6: Using `$size` on Box/Text

**Frequency:** ⭐⭐⭐

**Error Symptom:**
```
Warning: React does not recognize the `$size` prop on a DOM element
```
or component doesn't respond to size prop

**Wrong Code:**
```tsx
<Box $size="medium">Content</Box>
<Text $size="large">Text</Text>
```

**Correct Code:**
```tsx
<Box size="m">Content</Box>
<Text fontSize="l">Text</Text>
```

**Why:** Only Button and Field use `$size`. Box and Text use `size` for generic sizing, and Text should use `fontSize` for text sizing.

---

### Error #7: Inconsistent Responsive Array Lengths

**Frequency:** ⭐⭐

**Error Symptom:**
- Layout breaks at certain breakpoints
- Unexpected spacing/sizing

**Wrong Code:**
```tsx
<Box 
  width={[1, 1/2]} 
  p={['s', 'm', 'l']} 
/>
```

**Correct Code:**
```tsx
<Box 
  width={[1, 1/2, 1/3]} 
  p={['s', 'm', 'l']} 
/>
```

**Why:** Responsive arrays should have consistent lengths across props for predictable behavior. Each index represents a breakpoint: [mobile, tablet, desktop]

---

### Error #8: Using Button for Navigation Links

**Frequency:** ⭐⭐

**Error Symptom:**
- No error, but semantic HTML violation
- Accessibility issues (screen readers expect links for navigation)

**Wrong Code:**
```tsx
<Button as="a" href="/about">About Us</Button>
```

**Correct Code:**
```tsx
<Text as="a" href="/about" color="primary" fontWeight="medium">
  About Us
</Text>
```

**Why:** Buttons are for actions, links are for navigation. Using the wrong element confuses users and assistive technology.

**Rule:**
- Changes state/submits form → Button
- Goes to new page/URL → Link (Text with as="a")

---

### Error #9: Forgetting `type` on Form Buttons

**Frequency:** ⭐⭐

**Error Symptom:**
- Button submits form unintentionally
- Cancel button triggers form submission

**Wrong Code:**
```tsx
<form onSubmit={handleSubmit}>
  <Button variant="ghost">Cancel</Button>
  <Button variant="primary">Submit</Button>
</form>
```

**Correct Code:**
```tsx
<form onSubmit={handleSubmit}>
  <Button type="button" variant="ghost">Cancel</Button>
  <Button type="submit" variant="primary">Submit</Button>
</form>
```

**Why:** In forms, buttons default to `type="submit"`. Explicitly set `type="button"` for non-submit buttons.

---

### Error #10: Using Wrong ComponentSize Values

**Frequency:** ⭐⭐

**Error Symptom:**
- Button/Field doesn't size properly
- No visual change when setting size

**Wrong Code:**
```tsx
<Button $size="m">Click</Button>
<Field $size="xs" as="input" />
```

**Correct Code:**
```tsx
<Button $size="medium">Click</Button>
<Field $size="small" as="input" />
```

**Why:** `$size` on Button/Field uses ComponentSize values (`small`, `medium`, `large`), NOT SpaceToken values.

**ComponentSize:** `small`, `medium`, `large`  
**SpaceToken:** `mini`, `xs`, `s`, `m`, `l`, `xl`, `xxl`, `xxxl`

---

## 🔍 TypeScript Errors

### Type Error: Property 'fontSize' does not exist on type BoxProps

**Cause:** Trying to use typography props on Box

**Solution:** Use Text component instead
```tsx
// ❌ Wrong
<Box fontSize="l">Text</Box>

// ✅ Correct
<Text fontSize="l">Text</Text>
```

---

### Type Error: Type 'm' is not assignable to type ComponentSize

**Cause:** Using SpaceToken for $size prop on Button/Field

**Solution:** Use ComponentSize values
```tsx
// ❌ Wrong
<Button $size="m">Click</Button>

// ✅ Correct
<Button $size="medium">Click</Button>
```

---

### Type Error: Property 'as' is required

**Cause:** Missing required `as` prop on Text (if TypeScript is configured strictly)

**Solution:** Always specify semantic HTML element
```tsx
// ❌ Wrong
<Text fontSize="xl">Heading</Text>

// ✅ Correct
<Text as="h1" fontSize="xl">Heading</Text>
```

---

## 🐛 Runtime Warnings

### Warning: Each child in a list should have a unique "key" prop

**Cause:** Missing key prop when mapping over arrays

**Solution:**
```tsx
{items.map(item => (
  <Box key={item.id} skin="card" p="m">
    <Text>{item.name}</Text>
  </Box>
))}
```

---

### Warning: validateDOMNesting: div cannot appear as a descendant of p

**Cause:** Invalid HTML nesting (e.g., block elements inside paragraphs)

**Solution:**
```tsx
// ❌ Wrong
<Text as="p">
  <Box>Block element</Box>
</Text>

// ✅ Correct
<Box>
  <Text as="p">Paragraph</Text>
  <Box>Block element</Box>
</Box>
```

---

### Warning: Failed prop type: Invalid prop `skin` of value `cards`

**Cause:** Typo in skin name

**Solution:** Check available skin values
```tsx
// ❌ Wrong
<Box skin="cards">

// ✅ Correct
<Box skin="card">
```

**Valid skins:** `base`, `surface`, `card`, `panel`, `primary`, `secondary`, `error`, `success`, `warning`, `info`, `blue`, `green`, `red`, `yellow`, `purple`, `orange`

---

## 🔧 Styling Issues

### Component Doesn't Show Theme Colors

**Cause:** Theme provider not wrapping application

**Solution:**
```tsx
import { ThemeProvider } from '@/lib/theme-provider';
import { theme } from '@reactberry/system/themes';

<ThemeProvider theme={theme}>
  <App />
</ThemeProvider>
```

---

### Gap Prop Not Working

**Cause:** Parent doesn't have `display="flex"` or `display="grid"`

**Solution:**
```tsx
// ❌ Wrong - gap won't work
<Box gap="m">
  <Text>Item 1</Text>
  <Text>Item 2</Text>
</Box>

// ✅ Correct
<Box display="flex" gap="m">
  <Text>Item 1</Text>
  <Text>Item 2</Text>
</Box>
```

**Note:** `gap` only works with flex and grid layouts

---

### Responsive Props Not Working

**Cause:** Arrays not formatted correctly

**Solution:**
```tsx
// ❌ Wrong
<Box width="[1, 1/2, 1/3]" />

// ✅ Correct
<Box width={[1, 1/2, 1/3]} />
```

**Remember:** Use JavaScript array syntax `{[...]}`, not string

---

## 📚 Quick Debugging Checklist

When something isn't working, check:

- [ ] Are you using Text for text content (not Box)?
- [ ] Does Button/Field use `$size` (with $)?
- [ ] Does Box/Text use `size` (without $)?
- [ ] Are you using theme tokens (not px values)?
- [ ] Do Text components have `as` prop?
- [ ] Are labels connected to inputs with htmlFor/id?
- [ ] Are responsive arrays using `{}` syntax?
- [ ] Is ThemeProvider wrapping your app?
- [ ] Does gap have display="flex" or display="grid"?
- [ ] Are you using valid skin/variant names?

---

## 🆘 Still Having Issues?

### Check Documentation
1. [Component Selection Decision Tree](../decision-trees/component-selection.md)
2. [Prop Selection Decision Tree](../decision-trees/prop-selection.md)
3. [Prop Validation Reference](./prop-validation.md)
4. [API Documentation](../api/)

### Use Type Definitions
Import types for TypeScript validation:
```tsx
import type { BoxProps, TextProps, ButtonProps, FieldProps } from '@reactberry/system/types';
```

### Check Component Metadata
Review the component registry:
```
src/components.json
```

---

**Last Updated:** 2025-01-09  
**Most Common Error:** Using `size` instead of `$size` on Button/Field (happens to everyone!)