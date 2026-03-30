# Design System Reference Documentation

**Purpose:** Complete reference materials for the Reactberry Design System

This directory contains all reference documentation designed for both human developers and AI assistants.

---

## 📂 Directory Contents

### 🌳 Decision Trees
**Location:** `./decision-trees/`

Essential flowcharts for choosing the right components and props:

- **[component-selection.md](./decision-trees/component-selection.md)** - "What component do I need?" decision tree
  - Text vs Box vs Button vs Field
  - 30+ decision points with examples
  - Common mistake warnings

- **[prop-selection.md](./decision-trees/prop-selection.md)** - "What props do I use?" decision tree
  - **Critical:** `size` vs `$size` distinction
  - Spacing, styling, layout, typography props
  - Responsive patterns

**Use when:** Starting a new component or unsure which element to use

---

### ⚡ Quick Reference Cards
**Location:** `./quick-cards/`

One-page cheat sheets for each core component:

- **[box.md](./quick-cards/box.md)** - Box component essentials
  - Most common use cases (5 examples)
  - Essential props table
  - Layout patterns
  - Common mistakes with fixes

- **[button.md](./quick-cards/button.md)** - Button component essentials
  - All variants (primary, secondary, ghost, outline)
  - Size options (small, medium, large)
  - States (disabled, loading, icon)
  - **Critical reminder:** Use `$size` not `size`

- **[field.md](./quick-cards/field.md)** - Field component essentials
  - All input types (text, email, password, textarea, select)
  - Variants and sizes
  - Accessibility patterns
  - **Critical reminder:** Use `$size` not `size`

**Use when:** Quick lookup for component syntax and common patterns

---

### 📚 Pattern Libraries

- **[patterns-registry.md](./patterns-registry.md)** - 35+ copy-paste code patterns
  - **Layout Patterns:** Flex, grid, cards, containers (8 patterns)
  - **Form Patterns:** Inputs, validation, actions (7 patterns)
  - **Interactive Patterns:** Buttons, groups, links (6 patterns)
  - **Data Display Patterns:** Stats, lists, key-value pairs (4 patterns)
  - **Navigation Patterns:** Headers, breadcrumbs, tabs (3 patterns)
  - **Content Patterns:** Headings, empty states, alerts (4 patterns)
  - **State Patterns:** Loading, error, success (3 patterns)
  - Each pattern includes: components used, tokens, complexity level, common use cases

**Use when:** Need a starting point for common UI patterns

---

### ✅ Validation & Rules

- **[prop-validation.md](./prop-validation.md)** - Valid vs invalid prop combinations
  - **Invalid combinations:** What NOT to do with examples
  - **Required combinations:** What MUST be included
  - **Recommended patterns:** Best practices
  - Validation checklist (10 items)
  - TypeScript validation examples

**Use when:** Debugging prop errors or validating code before committing

---

### 🔗 Component Dependencies

- **[component-dependencies.md](./component-dependencies.md)** - Component relationship graph
  - Element hierarchy (Box → Text → Button/Field)
  - Block dependencies (50+ blocks categorized)
  - Import recommendations
  - Circular dependency warnings
  - "When to use what" guide

**Use when:** Understanding component relationships or deciding between element and block components

---

### 🐛 Troubleshooting

- **[common-errors.md](./common-errors.md)** - Top 10 errors with solutions
  - **Error #1:** Using `size` instead of `$size` on Button/Field ⭐⭐⭐⭐⭐
  - **Error #2:** Using Box for text content ⭐⭐⭐⭐
  - **Error #3:** Missing semantic HTML (`as` prop) ⭐⭐⭐⭐
  - **Error #4:** Arbitrary values instead of theme tokens ⭐⭐⭐
  - **Error #5:** Missing label-input connection ⭐⭐⭐
  - Plus 5 more common errors
  - TypeScript error solutions
  - Runtime warning fixes
  - Styling issue troubleshooting
  - Quick debugging checklist

**Use when:** Encountering errors or unexpected behavior

---

## 🎯 Quick Access by Need

### I need to...

| Need | Go To |
|------|-------|
| **Choose a component** | [Component Selection Decision Tree](./decision-trees/component-selection.md) |
| **Understand size vs $size** | [Prop Selection Decision Tree](./decision-trees/prop-selection.md#-critical-distinction-size-vs-size) |
| **Get started quickly** | [Quick Reference Cards](./quick-cards/) |
| **Copy a pattern** | [Patterns Registry](./patterns-registry.md) |
| **Fix an error** | [Common Errors](./common-errors.md) |
| **Validate my code** | [Prop Validation](./prop-validation.md) |
| **Understand dependencies** | [Component Dependencies](./component-dependencies.md) |
| **Learn Box** | [Box Quick Card](./quick-cards/box.md) |
| **Learn Button** | [Button Quick Card](./quick-cards/button.md) |
| **Learn Field** | [Field Quick Card](./quick-cards/field.md) |

---

## 🤖 AI Assistant Usage

### For New Components
1. **Check:** [Component Selection](./decision-trees/component-selection.md) - Which component?
2. **Reference:** [Quick Card](./quick-cards/) - Component syntax
3. **Copy:** [Patterns Registry](./patterns-registry.md) - Similar pattern
4. **Validate:** [Prop Validation](./prop-validation.md) - Props correct?

### For Debugging
1. **Error message?** → [Common Errors](./common-errors.md)
2. **Props not working?** → [Prop Validation](./prop-validation.md)
3. **Component relationships?** → [Component Dependencies](./component-dependencies.md)
4. **Still stuck?** → [Decision Trees](./decision-trees/)

### For Learning
1. **Start:** [Decision Trees](./decision-trees/) - Understand the system
2. **Practice:** [Patterns Registry](./patterns-registry.md) - Copy and modify
3. **Reference:** [Quick Cards](./quick-cards/) - Quick lookup
4. **Master:** [Prop Validation](./prop-validation.md) - Avoid mistakes

---

## 📊 Reference Statistics

- **Decision Trees:** 2 comprehensive flowcharts
- **Quick Cards:** 3 component cheat sheets
- **Patterns:** 35+ copy-paste examples
- **Error Solutions:** 10+ common issues covered
- **Validation Rules:** 50+ do's and don'ts
- **Dependency Graphs:** Complete component hierarchy

---

## 🎓 Learning Path

### Beginner → Intermediate

1. **Start:** Read [Component Selection Decision Tree](./decision-trees/component-selection.md)
   - Understand Box vs Text vs Button vs Field
   - Learn the decision process

2. **Learn:** Review [Quick Reference Cards](./quick-cards/)
   - Box for layout
   - Text for typography
   - Button for actions ($size!)
   - Field for inputs ($size!)

3. **Practice:** Copy patterns from [Patterns Registry](./patterns-registry.md)
   - Start with basic layouts
   - Try form patterns
   - Build interactive components

4. **Validate:** Use [Prop Validation](./prop-validation.md) as a checklist
   - Before committing code
   - When reviewing PRs

### Intermediate → Advanced

1. **Master:** [Prop Selection Decision Tree](./decision-trees/prop-selection.md)
   - Understand all prop types
   - Learn responsive patterns
   - Master the theme system

2. **Explore:** [Component Dependencies](./component-dependencies.md)
   - Understand block components
   - Learn composition patterns
   - Avoid circular dependencies

3. **Debug:** Use [Common Errors](./common-errors.md) proactively
   - Learn what to avoid
   - Set up linting rules
   - Educate team members

---

## ⚠️ Critical Reminders

**The Big 3 Mistakes:**

1. **size vs $size**
   - Box/Text use `size` (generic spacing)
   - Button/Field use `$size` (component sizing)
   - This is THE most common error!

2. **Box vs Text**
   - Box = layout/containers only
   - Text = all text content
   - Box doesn't support typography props

3. **Theme Tokens**
   - Always use tokens: `p="m"` not `p="16px"`
   - Enables consistency and theming
   - Required for responsive behavior

---

## 🔗 Related Documentation

### Core Documentation
- **[Main README](../README.md)** - Design system overview
- **[Elements](../elements.md)** - Core components (Box, Text, Button, Field)
- **[Blocks](../blocks.md)** - Composed components

### API References
- **[Box API](../api/Box.md)** - Complete Box documentation
- **[Text API](../api/Text.md)** - Complete Text documentation
- **[Button API](../api/Button.md)** - Complete Button documentation
- **[Field API](../api/Field.md)** - Complete Field documentation

### Guides
- **[Getting Started](../guides/getting-started.md)** - First steps
- **[Component Composition](../guides/component-composition.md)** - Building complex UIs
- **[Responsive Design](../guides/responsive-design.md)** - Mobile-first patterns
- **[Accessibility](../guides/accessibility.md)** - Inclusive design

### Assets
- **[Design Tokens](../assets/design-tokens.md)** - All theme tokens
- **[Color Palettes](../assets/color-palettes.md)** - Color system
- **[Typography Scale](../assets/typography-scale.md)** - Typography system

---

## 📝 Contributing

### Adding New Patterns
1. Add to [Patterns Registry](./patterns-registry.md)
2. Include: components, tokens, complexity, use case
3. Provide copy-paste code example
4. Add to search index

### Adding New Errors
1. Add to [Common Errors](./common-errors.md)
2. Include: frequency, symptom, wrong code, correct code, why
3. Rank by frequency (⭐⭐⭐⭐⭐ = most common)

### Updating Quick Cards
1. Keep to one page per component
2. Focus on most common use cases (top 5)
3. Include essential props table
4. Add common mistakes section

---

## 🆘 Getting Help

**Can't find what you need?**

1. **Search** the [Patterns Registry](./patterns-registry.md) by component, token, or use case
2. **Check** [Common Errors](./common-errors.md) for your specific error message
3. **Review** [Decision Trees](./decision-trees/) for conceptual understanding
4. **Consult** main [README](../README.md) for broader documentation links

**Still stuck?**
- Check the [DOCUMENTATION_AUDIT](../DOCUMENTATION_AUDIT.md) for known gaps
- File an issue with specific questions
- Contribute documentation for patterns you've solved

---

**Last Updated:** 2025-01-09  
**Maintainer:** Design System Team  
**Status:** ✅ Complete and AI-optimized

**Purpose:** This reference directory is designed to be both human-readable and machine-parsable, enabling AI assistants to quickly find the right information and generate correct code on the first try.