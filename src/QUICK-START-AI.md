# Quick Start for AI Assistants

**Last Updated:** 2025-01-09

## 🎯 Most Important Files

1. **[components.json](./components.json)** - Parse this first for component metadata
2. **[types.ts](./types.ts)** - Import for type checking
3. **[AI-INDEX.md](./docs/AI-INDEX.md)** - Quick reference guide

## ⚡ Critical Rules

### Rule #1: size vs $size (MOST IMPORTANT!)
```tsx
// Button and Field use $size (with $)
<Button $size="medium">Click</Button>
<Field $size="medium" as="input" />

// Box and Text use size (no $)
<Box size="m">Content</Box>
<Text fontSize="l">Text</Text>  // fontSize preferred for text
```

### Rule #2: Text vs Box
```tsx
// Text for ALL text content
<Text as="h1" fontSize="xl">Heading</Text>
<Text as="p">Paragraph</Text>

// Box for layout/containers only
<Box display="flex" gap="m">
  <Text>Item</Text>
</Box>
```

### Rule #3: Semantic HTML
```tsx
// ALWAYS specify 'as' prop on Text
<Text as="h1">Heading</Text>
<Text as="p">Paragraph</Text>
<Text as="label" htmlFor="email">Email</Text>
```

### Rule #4: Theme Tokens Only
```tsx
// Use theme tokens, NOT arbitrary values
<Box p="m" gap="s" />  // ✅ Correct
<Box p="16px" gap={8} />  // ❌ Wrong
```

### Rule #5: Connect Labels to Inputs
```tsx
// ALWAYS connect with htmlFor/id
<Text as="label" htmlFor="email">Email</Text>
<Field id="email" as="input" type="email" $size="medium" />
```

## 📊 Decision Tree (Quick)

```
What am I building?
├─ Text content? → Text (with 'as' prop)
├─ Button/action? → Button (with '$size')
├─ Form input? → Field (with '$size')
├─ Container/layout? → Box (with 'size' if needed)
└─ Complex pattern? → Check blocks
```

## 🔗 Key Resources

### Decision Trees
- **[Component Selection](./docs/decision-trees/component-selection.md)** - Which component?
- **[Prop Selection](./docs/decision-trees/prop-selection.md)** - Which props?

### Quick Cards
- **[Box](./docs/reference/quick-cards/box.md)** - Layout component
- **[Button](./docs/reference/quick-cards/button.md)** - Interactive component
- **[Field](./docs/reference/quick-cards/field.md)** - Form input component

### Patterns & Examples
- **[Patterns Registry](./docs/reference/patterns-registry.md)** - 35+ copy-paste patterns
- **[Examples Index](./docs/examples/index.json)** - Searchable examples

### Validation & Debugging
- **[Prop Validation](./docs/reference/prop-validation.md)** - Valid/invalid props
- **[Common Errors](./docs/reference/common-errors.md)** - Error solutions

## ✅ Pre-Generation Checklist

Before generating code, verify:
- [ ] Text content uses Text (not Box)
- [ ] Text has 'as' prop
- [ ] Button/Field use '$size' (with $)
- [ ] Box uses 'size' (without $)
- [ ] Theme tokens used (not px)
- [ ] Labels connected (htmlFor/id)
- [ ] Responsive arrays consistent
- [ ] Valid variant names

## 🚀 Workflow

1. **Parse** components.json
2. **Check** decision tree
3. **Reference** quick card
4. **Copy** pattern
5. **Validate** props
6. **Generate** code

## 📚 Full Documentation

See [AI-IMPROVEMENTS-SUMMARY.md](./AI-IMPROVEMENTS-SUMMARY.md) for complete details.

---

**Remember:** The #1 mistake is using `size` instead of `$size` on Button/Field!
