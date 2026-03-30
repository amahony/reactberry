# Design System Documentation Index

Quick reference guide for AI assistants and developers working with the Design System.

> **📋 Current Status:** Documentation is actively being improved. See [DOCUMENTATION_AUDIT.md](./DOCUMENTATION_AUDIT.md) for current gaps and priorities.

## 🤖 AI ASSISTANT WARNING - READ THIS FIRST!

**CRITICAL: Box vs Text Components**

```jsx
// ❌ NEVER DO THIS - Box with typography props
<Box as="h1" fontSize="xl" fontWeight="bold" color="primary">Title</Box>
<Box as="p" textAlign="center" color="secondary">Text</Box>

// ✅ ALWAYS DO THIS - Text for all text content
<Text as="h1" fontSize="xl" fontWeight="bold" color="primary">Title</Text>
<Text as="p" textAlign="center" color="secondary">Text</Text>
```

**Box = Layout ONLY** | **Text = ALL text content**

Typography props (`fontSize`, `fontWeight`, `color`, `textAlign`, etc.) should NEVER be on Box components.

## Documentation Structure

```
design-system/docs/
├── README.md                    # ✅ Main overview and getting started
├── DOCUMENTATION_AUDIT.md       # ✅ Current status and improvement plan
├── SITEMAP.md                   # ✅ Complete navigation guide
├── index.md                    # ✅ This file - AI assistant reference
├── elements.md                 # ✅ Core components API
├── blocks.md                   # ⚠️ Composed components (expanding)
├── themes.md                   # ✅ Theme system
├── api/                        # 📁 Detailed component APIs
│   ├── Box.md                  # ✅ Layout component reference
│   ├── Text.md                 # ✅ Typography component reference
│   ├── Button.md               # ✅ Button component reference
│   ├── Field.md                # ✅ Form input reference
│   └── blocks/                 # 🚧 Individual block APIs (in progress)
├── guides/                     # 📁 Step-by-step tutorials
│   ├── getting-started.md      # ✅ Your first components
│   ├── component-composition.md # ✅ Building complex UIs
│   ├── theming-guide.md        # ✅ Customizing themes
│   ├── responsive-design.md    # ✅ Mobile-first patterns
│   ├── accessibility.md        # ✅ Building inclusive interfaces
│   └── [additional guides]     # 📋 Testing, migration, performance
├── examples/                   # 📁 Practical patterns
│   ├── layouts/                # ✅ Layout examples
│   ├── forms/                  # ✅ Form patterns
│   ├── navigation/             # 📋 Navigation components (planned)
│   └── cards/                  # 📋 Card patterns (planned)
└── assets/                     # 📁 Design resources
    ├── design-tokens.md        # ✅ Token reference
    ├── color-palettes.md       # ✅ Color system
    └── typography-scale.md     # ✅ Typography system
```

**Legend:** ✅ Complete | ⚠️ Partial | 🚧 In Progress | 📋 Planned

## Quick AI Reference

### 🔥 Most Important Rules for AI

1. **🚨 NEVER use Box for text content** - Always use Text for h1-6, p, span, label, etc.
2. **🚨 NEVER use typography props on Box** - fontSize, fontWeight, color, textAlign belong ONLY on Text
3. **Always use theme aliases** - `'m'` not `5`, `'primary'` not hardcoded colors
4. **Use semantic HTML** - `<Text as="h1">` not `<Box as="h1">`
5. **Use appropriate skins** - `skin="error"` for errors, `skin="card"` for containers

**⚠️ IF YOU USE BOX WITH fontSize, fontWeight, color, textAlign, etc. - YOU ARE DOING IT WRONG!**

### Core Components (Detailed in `/api/`)

**Box Component** ✅ - Layout and containers ONLY
- **File**: [api/Box.md](./api/Box.md)
- **Props**: `skin`, `shape`, `gap`, `p`, `m`, `display`, `flex*`, `grid*`, etc.
- **⚠️ NO typography props** (fontSize, fontWeight, color, textShadow, etc.)
- **Use for**: containers, layouts, divs, non-text elements

**Text Component** ✅ - ALL text content and semantic HTML
- **File**: [api/Text.md](./api/Text.md)
- **Props**: All Box props + `fontSize`, `fontWeight`, `color`, `lineHeight`, etc.
- **✅ REQUIRED for**: h1-6, p, span, label, any text content
- **Default**: `as="span"`

**Button Component** ✅ - Interactive buttons
- **File**: [api/Button.md](./api/Button.md)
- **Props**: All Text props + `variant`, `$size`, `disabled`
- **Variants**: `primary`, `outline`, `ghost`, `subtle`, `danger`, etc.
- **Sizes**: `xxsmall`, `xsmall`, `small`, `medium`, `large`, `xlarge`

**Field Component** ✅ - Form inputs
- **File**: [api/Field.md](./api/Field.md)
- **Props**: All Text props + `variant`, `$size`, `invalid`, `disabled`
- **Variants**: `default`, `outline`, `filled`, `ghost`
- **Types**: input, textarea, select with full styling support

### 🎨 Theme Aliases (ALWAYS Use These, Never Indices)

**Space Values:** `mini` (4px), `xs` (8px), `s` (12px), `m` (16px), `l` (24px), `xl` (32px), `xxl` (48px), `xxxl` (64px)

**Font Sizes:** `xs` (12px), `s` (14px), `m` (16px), `l` (18px), `xl` (20px), `xxl` (24px), `xxxl` (32px)

**Border Radius:** `square`, `roundedSmall`, `rounded`, `roundedLarge`, `pill`, `circle`

**Component Skins:**
- **Surface**: `base`, `surface`, `card`, `panel`, `overlay`
- **Semantic**: `primary`, `accent`, `neutral`, `highlight`, `error`, `success`, `warning`
- **Special**: `transparent`, `translucent`
- **Color Pairs**: `red`, `blue`, `green`, `yellow`, `purple`, `pink`, `orange`, `teal`, `gray`

### 🎨 Skin System (Detailed in [themes.md](./themes.md))

**Surface Skins** (for containers and layouts):
- `base` - Primary app background
- `surface` - Secondary surface (slightly elevated)
- `card` - Card containers with subtle shadow
- `panel` - Panel/sidebar backgrounds
- `overlay` - Modal/dropdown backgrounds with blur

**Semantic Skins** (convey meaning):
- `primary` - Brand color treatment
- `success` - Green success states
- `error` - Red error states  
- `warning` - Yellow warning states
- `highlight` - Focus/active states with rings

**Color Pair Skins** (for categorization):
- `red`, `blue`, `green`, `yellow`, `purple`, `pink`, `orange`, `teal`, `gray`
- Each provides coordinated background + text color

**Interactive Skins** (for hover/focus):
- `hover="subtle"` - Light hover effect
- `focus="highlight"` - Focus ring with brand color

## 💡 Common Patterns (Full examples in [examples/](./examples/))

### ✅ Correct Basic Layout
```jsx
<Box display="flex" flexDirection="column" gap="m" p="m" skin="surface">
  <Text as="h2" fontSize="l" fontWeight="bold" color="primary">
    Section Title
  </Text>
  <Text as="p" fontSize="s" color="secondary">
    Content text
  </Text>
</Box>
```

### ✅ Correct Form Field
```jsx
<Box>
  <Text as="label" htmlFor="field-id" fontSize="s" fontWeight="medium" mb="xs" display="block">
    Field Label
  </Text>
  <Field 
    id="field-id"
    as="input" 
    type="text" 
    placeholder="Enter text"
    variant="outline" 
    $size="medium"
  />
</Box>
```

### ✅ Correct Interactive Card
```jsx
<Box
  skin="card"
  p="m"
  cursor="pointer"
  hover="subtle"
  focus="highlight"
  shape="rounded"
  tabIndex={0}
  role="button"
>
  <Text as="h3" fontSize="m" fontWeight="bold">
    Card Title
  </Text>
  <Text fontSize="s" color="secondary">
    Card description
  </Text>
</Box>
```

### ✅ Responsive Pattern
```jsx
<Box 
  width={[1, 1/2, 1/3]}          // Mobile: 100%, Tablet: 50%, Desktop: 33%
  p={['s', 'm', 'l']}            // Mobile: 12px, Tablet: 16px, Desktop: 24px
  display={['block', 'flex']}    // Mobile: block, Larger: flex
>
  <Text fontSize={['s', 'm', 'l']}>
    Responsive content
  </Text>
</Box>
```

## 🚨 Critical Mistakes to Avoid - AI MUST READ THIS

### ❌ MOST COMMON AI MISTAKE - Box for Text Content
```jsx
<Box as="h1" fontSize="l">Title</Box>        // 🚨 WRONG: Box has NO typography props
<Box as="p" color="primary">Text</Box>       // 🚨 WRONG: Box has NO color prop  
<Box as="label">Form Label</Box>             // 🚨 WRONG: Box has NO semantic text features
<Box textAlign="center">                    // 🚨 WRONG: textAlign is typography
  <Box as="h2" fontSize="m">Content</Box>    // 🚨 WRONG: Double violation
</Box>
```

### ✅ CORRECT - Text for Text Content
```jsx
<Text as="h1" fontSize="l">Title</Text>      // ✅ Text has ALL typography props
<Text as="p" color="primary">Text</Text>     // ✅ Text has color prop
<Text as="label" htmlFor="input">Form Label</Text>  // ✅ Text supports semantic HTML
<Box>                                        // ✅ Box for layout only
  <Text as="h2" fontSize="m" textAlign="center">Content</Text>  // ✅ Text for typography
</Box>
```

### 🚨 FORBIDDEN PROPS ON BOX
These props should NEVER appear on Box components:
- `fontSize`, `fontWeight`, `fontFamily`, `fontStyle` 
- `color` (for text), `textAlign`, `lineHeight`
- `letterSpacing`, `textDecoration`, `textTransform`

**Remember: If it's about text styling, it belongs on Text, not Box!**

### ❌ WRONG - Hardcoded Values
```jsx
<Box p="16px" m="8px" fontSize="18px">       // Don't use pixel values
<Box p={5} m={3} fontSize={4}>               // Don't use numeric indices
<Text color="#3B82F6">Text</Text>            // Don't use hex colors
```

### ✅ CORRECT - Theme Aliases
```jsx
<Box p="m" m="xs">                           // Use space aliases
<Text fontSize="l" color="primary">Text</Text>  // Use size and color aliases
<Box skin="primary" shape="rounded">         // Use semantic skins
```

### ❌ WRONG - Missing Accessibility
```jsx
<Box cursor="pointer" onClick={handler}>     // Missing keyboard support
<Text as="label">Label</Text>                // Missing htmlFor connection
<Field as="input" invalid={true}>            // Missing aria-invalid
```

### ✅ CORRECT - Accessible Patterns
```jsx
<Box cursor="pointer" onClick={handler} onKeyDown={keyHandler} tabIndex={0} role="button">
<Text as="label" htmlFor="input-id">Label</Text>
<Field id="input-id" as="input" invalid={true} aria-invalid={true} aria-describedby="error-id">
```

## 🧭 Quick Navigation

### 🚀 Getting Started (New Users)
- **[Main README](./README.md)** ✅ - Complete overview and architecture
- **[Getting Started Guide](./guides/getting-started.md)** ✅ - Your first components
- **[Component Composition](./guides/component-composition.md)** ✅ - Building complex UIs
- **[Sitemap](./SITEMAP.md)** ✅ - Complete navigation guide

### 🔧 API References (Developers)
- **[Box API](./api/Box.md)** ✅ - Layout component reference (NO typography)
- **[Text API](./api/Text.md)** ✅ - Text component reference (ALL typography)
- **[Button API](./api/Button.md)** ✅ - Interactive button reference
- **[Field API](./api/Field.md)** ✅ - Form input reference
- **[Block APIs](./api/blocks/)** 🚧 - Individual block components (in progress)

### 💡 Examples & Patterns (Implementation)
- **[Layout Examples](./examples/layouts/)** ✅ - Dashboard, grid, page layouts
- **[Form Examples](./examples/forms/)** ✅ - Form patterns and validation
- **[Navigation Examples](./examples/navigation/)** 📋 - Menu patterns (planned)
- **[Card Examples](./examples/cards/)** 📋 - Card layouts (planned)

### 🎨 Theme & Design (Customization)
- **[Theme System](./themes.md)** ✅ - Colors, typography, spacing
- **[Design Tokens](./assets/design-tokens.md)** ✅ - Complete token reference
- **[Color Palettes](./assets/color-palettes.md)** ✅ - Color system guide
- **[Theming Guide](./guides/theming-guide.md)** ✅ - Customization and extension

### 📱 Specialized Guides (Advanced)
- **[Responsive Design](./guides/responsive-design.md)** ✅ - Mobile-first patterns
- **[Accessibility](./guides/accessibility.md)** ✅ - Building inclusive interfaces
- **[Testing Guide](./guides/testing-guide.md)** 📋 - Component testing (planned)
- **[Performance Guide](./guides/performance-guide.md)** 📋 - Optimization (planned)

### 🔍 Current Status & Gaps
- **[Documentation Audit](./DOCUMENTATION_AUDIT.md)** ✅ - Current improvement plan
- **[Block Components](./blocks.md)** ⚠️ - Overview complete, APIs in progress
- **Missing Examples** 📋 - Navigation, cards, complex patterns

## 📋 Documentation Status Summary

### ✅ Complete & Production Ready
**Core Elements**: Box, Text, Button, Field - Full API docs with examples
**Theme System**: Complete color, typography, spacing, and skin documentation  
**Guides**: Getting started, composition, theming, responsive design, accessibility
**Examples**: Dashboard layouts, form patterns with working code

### ⚠️ Partial (Usable but Expanding)
**Block Components**: Overview exists, individual API docs in progress
**Advanced Examples**: Basic patterns exist, more complex ones planned

### 🚧 In Active Development
**Block APIs**: Avatar, Modal, Tooltip, Menu, Progress (priority order)
**Testing Guide**: Component testing strategies and best practices
**Performance Guide**: Optimization and performance considerations

### 📋 Planned (Coming Soon)
**Migration Guide**: Version upgrade instructions and breaking changes
**Troubleshooting**: Common issues, solutions, and debugging tips
**Advanced Examples**: Navigation patterns, card layouts, complex interactions
**Interactive Playground**: Live component examples and customization

### 🔍 Known Gaps (See [Audit](./DOCUMENTATION_AUDIT.md))
- 50+ block components need individual API documentation
- Navigation and card example sections are referenced but missing
- Testing and migration guides are needed for production use
- Some cross-references point to planned but not yet created files

### 🎯 High Priority for AI Assistants
1. **Use the Core Elements** - Box, Text, Button, Field are fully documented
2. **Follow Component Rules** - Box for layout, Text for content, proper semantic HTML
3. **Use Theme Aliases** - Never hardcode values, always use design tokens
4. **Check Status** - When referencing block components, note they're in development
5. **Fallback Patterns** - Use composition of core elements for missing block components