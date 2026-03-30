# Design System Component Checklist

A quick reference guide to avoid common mistakes when using the design system.

## 🚨 Critical Rules - Never Break These

### Rule #1: Box vs Text Components
- **Box** = Layout and containers ONLY
- **Text** = ALL text content (h1-h6, p, span, label, etc.)

```jsx
// ❌ WRONG - Box with typography props
<Box as="h1" fontSize="xl" color="primary">Title</Box>
<Box as="p" textAlign="center">Content</Box>

// ✅ CORRECT - Text for all text content  
<Text as="h1" fontSize="xl" color="primary">Title</Text>
<Text as="p" textAlign="center">Content</Text>
```

### Rule #2: Typography Props Belong ONLY on Text/Button/Field
**Typography props that should NEVER be on Box:**
- `fontSize`, `fontWeight`, `color`, `textAlign`, `lineHeight`
- `textDecoration`, `textTransform`, `letterSpacing`

### Rule #3: Always Use Theme Aliases (Never Hardcoded Values)
```jsx
// ❌ WRONG - Hardcoded values
<Box p="16px" m="8px" />
<Box p={5} m={3} />
<Text color="#3B82F6" />

// ✅ CORRECT - Theme aliases
<Box p="m" m="xs" />
<Text color="primary" />
```

## 📋 Pre-Commit Checklist

Before committing any component code, verify:

- [ ] **No Box components with typography props** (`fontSize`, `fontWeight`, `color`, `textAlign`, etc.)
- [ ] **All text content uses Text component** (headings, paragraphs, labels, spans)
- [ ] **Semantic HTML is correct** (`<Text as="h1">` for headings, `<Text as="label" htmlFor="...">` for labels)
- [ ] **Theme aliases used throughout** (no px values, no numeric indices, no hex colors)
- [ ] **Appropriate skins applied** (`skin="error"` for errors, `skin="card"` for containers)
- [ ] **Accessibility attributes present** (`aria-*`, `htmlFor`, `role`, `tabIndex`)

## 🔧 Quick Fix Patterns

### Text Content Fixes
```jsx
// ❌ Before
<Box as="h1" fontSize="xl">Title</Box>
<Box as="p" color="secondary">Description</Box>
<Box as="label">Field Label</Box>

// ✅ After  
<Text as="h1" fontSize="xl">Title</Text>
<Text as="p" color="secondary">Description</Text>
<Text as="label" htmlFor="field-id">Field Label</Text>
```

### Container Layout Fixes
```jsx
// ❌ Before
<Box textAlign="center" p="20px" m="10px">
  <Box as="h2" fontSize="lg">Content</Box>
</Box>

// ✅ After
<Box p="l" m="xs"> {/* Layout container - no textAlign */}
  <Text as="h2" fontSize="lg" textAlign="center">Content</Text>
</Box>
```

### Theme Alias Fixes
```jsx
// ❌ Before
<Box p={4} m={2} borderRadius="8px" />
<Text fontSize="18px" color="#666" />

// ✅ After
<Box p="m" m="xs" shape="rounded" />
<Text fontSize="l" color="secondary" />
```

## 🎯 Component Selection Guide

### When to Use Each Component

**Box** - Use for:
- Layout containers (`div`, `section`, `article`)
- Flexbox/Grid layouts
- Non-text elements
- Spacing and positioning
- Background colors and borders

**Text** - Use for:
- All headings (`h1`, `h2`, `h3`, etc.)
- All paragraphs (`p`)
- Labels (`label`)
- Spans (`span`)
- Any text that needs styling
- Links with custom styling

**Button** - Use for:
- Interactive buttons
- Links styled as buttons
- Form submit buttons

**Field** - Use for:
- Text inputs
- Textareas  
- Select dropdowns
- Any form field

## 🚨 Common Anti-Patterns to Avoid

### Anti-Pattern #1: Box for Text
```jsx
// ❌ NEVER DO THIS
<Box as="h1" fontSize="xl" fontWeight="bold" textAlign="center" color="primary">
  Page Title
</Box>

// ✅ ALWAYS DO THIS
<Text as="h1" fontSize="xl" fontWeight="bold" textAlign="center" color="primary">
  Page Title  
</Text>
```

### Anti-Pattern #2: Hardcoded Values
```jsx
// ❌ NEVER DO THIS
<Box padding="16px" margin="8px 0" backgroundColor="#f5f5f5" borderRadius="4px" />

// ✅ ALWAYS DO THIS  
<Box p="m" my="xs" skin="surface" shape="roundedSmall" />
```

### Anti-Pattern #3: Missing Accessibility
```jsx
// ❌ NEVER DO THIS
<Box cursor="pointer" onClick={handleClick}>
  <Box as="h3" fontSize="m">Clickable Card</Box>
</Box>

// ✅ ALWAYS DO THIS
<Box 
  cursor="pointer" 
  onClick={handleClick}
  onKeyDown={handleKeyDown}
  tabIndex={0}
  role="button"
  aria-label="Open card details"
>
  <Text as="h3" fontSize="m">Clickable Card</Text>
</Box>
```

## 🔍 Code Review Questions

When reviewing design system usage, ask:

1. **Are all text elements using Text component?**
2. **Are Box components free of typography props?**  
3. **Are theme aliases used instead of hardcoded values?**
4. **Is semantic HTML correct?** (`as="h1"` for main headings, `as="label"` for form labels)
5. **Are appropriate skins applied?** (`skin="error"` for errors, etc.)
6. **Is accessibility properly implemented?**

## 📚 Quick References

- **[Design System Index](../src/design-system/docs/index.md)** - AI assistant reference
- **[Box API](../src/design-system/docs/api/Box.md)** - Layout component reference  
- **[Text API](../src/design-system/docs/api/Text.md)** - Typography component reference
- **[Theme Aliases](../src/design-system/docs/themes.md)** - All available theme tokens

## 🛠 Development Tools

### ESLint Rules (Already Configured)
The project includes ESLint rules that will catch Box components with typography props.

### VS Code Snippets (Recommended)
Create snippets for common patterns:
- `dstext` → Text component with common props
- `dsbox` → Box component for layout
- `dscard` → Card pattern with proper Text usage

### TypeScript Integration
The design system components have proper TypeScript definitions that will warn about incorrect prop usage in your IDE.