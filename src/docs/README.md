# Design System Documentation

This directory contains comprehensive documentation for this React-based component library built with styled-components and styled-system for consistent, accessible, and maintainable user interfaces.

> **📋 Documentation Status:** Currently under active improvement. See [DOCUMENTATION_AUDIT.md](./DOCUMENTATION_AUDIT.md) for current gaps and planned improvements.

## Quick Start

**New to the design system?** Start here:
1. 📖 [Getting Started Guide](./guides/getting-started.md) - Your first components
2. 🧩 [Component Composition](./guides/component-composition.md) - Building complex UIs
3. 🎨 [Theme Integration](./guides/theming-guide.md) - Customizing appearance
4. 📱 [Responsive Design](./guides/responsive-design.md) - Mobile-first patterns

## Documentation Structure

```
docs/
├── README.md                    # This overview
├── DOCUMENTATION_AUDIT.md       # Current status and improvement plan
├── index.md                     # Quick reference for AI assistants
├── elements.md                  # Core components (Box, Text, Button, Field)
├── blocks.md                    # Composed components (⚠️ Being expanded)
├── themes.md                    # Theme system and customization
├── api/                         # Detailed component APIs
│   ├── Box.md                   # Layout component reference
│   ├── Text.md                  # Typography component reference
│   ├── Button.md                # Button component reference
│   ├── Field.md                 # Form input reference
│   └── blocks/                  # 🚧 Block components (coming soon)
├── guides/                      # Step-by-step tutorials
│   ├── getting-started.md       # Your first components
│   ├── component-composition.md # Building complex UIs
│   ├── theming-guide.md         # Customizing themes
│   ├── responsive-design.md     # Mobile-first patterns
│   ├── accessibility.md         # Building inclusive interfaces
│   └── 🚧 Additional guides     # Migration, testing, performance
├── examples/                    # Practical patterns
│   ├── layouts/                 # Layout examples
│   ├── forms/                   # Form patterns
│   └── 🚧 More examples         # Navigation, cards, patterns
└── assets/                      # Design resources
    ├── design-tokens.md         # Token reference
    ├── color-palettes.md        # Color system
    └── typography-scale.md      # Typography system
```

**Legend:** ✅ Complete | ⚠️ Partial | 🚧 In Progress | 📋 Planned

## Quick Start Guide

### 1. Import Components

```jsx
// Core elements (fully documented)
import { Box, Text, Button, Field } from '@reactberry/system/elements';

// Composed blocks (documentation in progress)
import { Avatar, Container, Heading } from '@reactberry/system/blocks';
```

### 2. Basic Usage

```jsx
function WelcomeCard() {
  return (
    <Box skin="card" p="m" gap="s" maxWidth="400px">
      <Text as="h2" fontSize="l" fontWeight="bold" color="primary">
        Welcome to Design System
      </Text>
      <Text as="p" fontSize="s" color="secondary" lineHeight="relaxed">
        Build amazing interfaces with our design system.
      </Text>
      <Button variant="primary" $size="medium">
        Get Started
      </Button>
    </Box>
  );
}
```

### 3. Theme Integration

```jsx
import { DesignSystemProvider } from '@reactberry/system/providers';

function App() {
  return (
    <DesignSystemProvider>
      <WelcomeCard />
    </DesignSystemProvider>
  );
}
```

> **💡 Tip:** For complete examples and patterns, see our [Getting Started Guide](./guides/getting-started.md).

## Core Architecture

### Component Hierarchy

```
┌─────────────────────────────────────┐
│              Applications           │
├─────────────────────────────────────┤
│               Blocks                │  ← 50+ Composed Components
│    (Avatar, Card, Modal, Layout)    │
├─────────────────────────────────────┤
│              Elements               │  ← Core Building Blocks
│     (Box, Text, Button, Field)      │
├─────────────────────────────────────┤
│               Themes                │  ← Design Tokens & Styling
│      (Colors, Typography, etc.)     │
└─────────────────────────────────────┘
```

### Component Rules

#### Box Component (Layout Only)
- **Use for**: containers, layouts, divs, non-text elements
- **⚠️ NO typography props**: fontSize, fontWeight, color, etc.
- **Props**: `skin`, `shape`, `gap`, `p`, `m`, `display`, flex/grid props

#### Text Component (All Text Content)
- **Use for**: h1-6, p, span, label, any text content
- **✅ Has typography props**: fontSize, fontWeight, color, lineHeight
- **Extends**: All Box props + typography props

#### Button & Field Components
- **Button**: Extends Text with interactive functionality
- **Field**: Extends Text with form input capabilities

## Essential Concepts

### 1. Theme Aliases (Always Use These)

```jsx
// ✅ Good - Use theme aliases
<Box p="m" gap="s" />
<Text fontSize="l" color="primary" />

// ❌ Bad - Don't use indices or arbitrary values
<Box p={5} gap="12px" />
<Text fontSize="18px" color="#3B82F6" />
```

**Available Aliases:**
- **Space**: `mini`, `xs`, `s`, `m`, `l`, `xl`, `xxl`, `xxxl`
- **Font Sizes**: `xs`, `s`, `m`, `l`, `xl`, `xxl`, `xxxl`
- **Shapes**: `square`, `roundedSmall`, `rounded`, `roundedLarge`, `pill`, `circle`

### 2. Skin System

Pre-defined styling combinations for consistency:

```jsx
// Surface skins for containers
<Box skin="base">Base background</Box>
<Box skin="surface">Secondary surface</Box>
<Box skin="card">Card with elevation</Box>

// Semantic skins for meaning
<Box skin="success">Success state</Box>
<Box skin="error">Error state</Box>
<Box skin="warning">Warning state</Box>

// Color coding
<Box skin="blue">Blue category</Box>
<Box skin="green">Green category</Box>
```

### 3. Responsive Design

Mobile-first approach with responsive arrays:

```jsx
<Box 
  width={[1, 1/2, 1/3]}        // 100% → 50% → 33%
  p={['xs', 's', 'm']}         // 8px → 12px → 16px
  display={['block', 'flex']}  // block → flex
>
  <Text fontSize={['s', 'm', 'l']}>
    Responsive content
  </Text>
</Box>
```

## Key Documentation

### 📚 Core References (✅ Complete)
- **[elements.md](./elements.md)** - Complete Box, Text, Button, Field documentation
- **[blocks.md](./blocks.md)** - Composed components overview (⚠️ Individual docs in progress)
- **[themes.md](./themes.md)** - Theme system, tokens, and customization

### 🔧 Detailed APIs (✅ Core Elements Complete)
- **[api/Box.md](./api/Box.md)** - Layout component props and patterns
- **[api/Text.md](./api/Text.md)** - Typography component and semantic HTML
- **[api/Button.md](./api/Button.md)** - Interactive button variants and states
- **[api/Field.md](./api/Field.md)** - Form input types and validation
- **api/blocks/** - 🚧 Individual block component documentation (coming soon)

### 📖 Step-by-Step Guides (✅ Core Guides Complete)
- **[guides/getting-started.md](./guides/getting-started.md)** - Build your first components
- **[guides/component-composition.md](./guides/component-composition.md)** - Complex UI patterns
- **[guides/responsive-design.md](./guides/responsive-design.md)** - Mobile-first design
- **[guides/accessibility.md](./guides/accessibility.md)** - Inclusive interfaces
- **[guides/theming-guide.md](./guides/theming-guide.md)** - Theme customization

### 💡 Real-World Examples (⚠️ Expanding)
- **[examples/layouts/dashboard.md](./examples/layouts/dashboard.md)** - Dashboard patterns
- **[examples/forms/form-patterns.md](./examples/forms/form-patterns.md)** - Form design patterns
- **examples/navigation/** - 🚧 Navigation patterns (planned)
- **examples/cards/** - 🚧 Card patterns (planned)

### 🎨 Design Assets (✅ Complete)
- **[assets/design-tokens.md](./assets/design-tokens.md)** - Complete token reference
- **[assets/color-palettes.md](./assets/color-palettes.md)** - Color system and accessibility
- **[assets/typography-scale.md](./assets/typography-scale.md)** - Typography system

## Common Patterns

### Form Field Pattern
```jsx
<Box>
  <Text as="label" htmlFor="email" fontSize="s" fontWeight="medium" mb="xs">
    Email Address
  </Text>
  <Field 
    id="email"
    as="input"
    type="email"
    placeholder="Enter your email"
    variant="outline"
    $size="medium"
  />
</Box>
```

### Interactive Card Pattern
```jsx
<Box
  skin="card"
  p="m"
  cursor="pointer"
  hover="subtle"
  focus="highlight"
  shape="rounded"
>
  <Text as="h3" fontSize="m" fontWeight="bold">Card Title</Text>
  <Text fontSize="s" color="secondary">Card content</Text>
</Box>
```

### Navigation Pattern
```jsx
<Box display="flex" alignItems="center" justifyContent="space-between" p="m">
  <Text as="h1" fontSize="l" fontWeight="bold" color="primary">
    Reactberry
  </Text>
  <Box display="flex" gap="m" alignItems="center">
    <Text as="a" href="/home" fontSize="s">Home</Text>
    <Button variant="primary" $size="small">Sign In</Button>
  </Box>
</Box>
```

## Best Practices Summary

### ✅ Do
1. **Use Text for all text content**
   ```jsx
   <Text as="h1">Heading</Text>
   <Text as="p">Paragraph</Text>
   <Text as="label">Label</Text>
   ```

2. **Use theme aliases consistently**
   ```jsx
   <Box p="m" gap="s" />
   <Text fontSize="l" color="primary" />
   ```

3. **Follow semantic HTML structure**
   ```jsx
   <Box as="main">
     <Text as="h1">Page Title</Text>
     <Text as="p">Content</Text>
   </Box>
   ```

4. **Use appropriate skins for meaning**
   ```jsx
   <Box skin="card">Container</Box>
   <Box skin="error">Error message</Box>
   ```

### ❌ Don't
1. **Don't use Box for text content**
   ```jsx
   // Wrong - Box doesn't support typography
   <Box as="h1" fontSize="xl">Title</Box>
   
   // Right - Text supports typography
   <Text as="h1" fontSize="xl">Title</Text>
   ```

2. **Don't use arbitrary values**
   ```jsx
   // Wrong - Hardcoded values
   <Box p="16px" color="#333" />
   
   // Right - Theme aliases
   <Box p="m" color="primary" />
   ```

3. **Don't ignore responsive design**
   ```jsx
   // Wrong - Fixed sizing
   <Box width="300px" />
   
   // Right - Responsive arrays
   <Box width={[1, 1/2, 1/3]} />
   ```

## Current Status & Roadmap

### ✅ Complete
- **Core Elements**: Fully documented Box, Text, Button, Field components
- **Theme System**: Comprehensive theme documentation and customization guides
- **Guides**: Step-by-step tutorials for common patterns
- **Examples**: Layout and form patterns with working code

### 🚧 In Progress
- **Block Components**: Individual documentation for 50+ composed components
- **Advanced Examples**: Navigation, cards, and complex patterns
- **Testing Guide**: Component testing and validation strategies
- **Performance Guide**: Optimization best practices

### 📋 Planned
- **Migration Guide**: Upgrading between versions
- **Troubleshooting**: Common issues and solutions
- **Interactive Playground**: Live component examples
- **Video Tutorials**: Visual learning resources

## Support & Contributing

### Getting Help
- **Quick Reference**: Check [index.md](./index.md) for AI-friendly documentation
- **Component APIs**: Browse detailed [api/](./api/) documentation
- **Examples**: See [examples/](./examples/) for real-world patterns
- **Guides**: Follow step-by-step [guides/](./guides/) tutorials
- **Issues**: Report documentation gaps in [DOCUMENTATION_AUDIT.md](./DOCUMENTATION_AUDIT.md)

### Contributing to Documentation
1. **Follow the audit plan** - See [DOCUMENTATION_AUDIT.md](./DOCUMENTATION_AUDIT.md) for current priorities
2. **Use standard templates** - Maintain consistency across all documentation
3. **Include working examples** - All code should be tested and functional
4. **Test accessibility** - Ensure examples meet WCAG guidelines
5. **Update cross-references** - Keep internal links accurate and helpful

### Project Overview

The design system includes:
- **50+ Blocks** - Composed components (Avatar, Card, Modal, etc.) ⚠️ *Docs in progress*
- **4 Core Elements** - Building blocks (Box, Text, Button, Field) ✅ *Fully documented*
- **Comprehensive Theming** - Colors, typography, spacing, shapes ✅ *Complete*
- **Full Accessibility** - ARIA support, semantic HTML, keyboard navigation ✅ *Documented*
- **Responsive by Default** - Mobile-first with breakpoint support ✅ *Complete*

---

**📝 Documentation Feedback**: Found an issue or gap in the documentation? Please reference the [Documentation Audit](./DOCUMENTATION_AUDIT.md) or create an issue with specific improvement suggestions.