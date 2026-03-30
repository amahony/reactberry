# Design System Documentation Sitemap

**Last Updated:** January 2025  
**Total Files:** 40+ documentation files  
**Status:** 🟢 Complete with AI-optimized resources (see [AI-IMPROVEMENTS-SUMMARY.md](../AI-IMPROVEMENTS-SUMMARY.md))

## Navigation Quick Links

### 🤖 AI Resources (NEW!)
- **[AI-INDEX.md](./AI-INDEX.md)** - Primary AI assistant reference (UPDATED)
- **[components.json](../components.json)** - Machine-readable component metadata
- **[types.ts](../types.ts)** - TypeScript type definitions
- **[Decision Trees](./decision-trees/)** - Component & prop selection flowcharts
- **[Quick Cards](./reference/quick-cards/)** - One-page component cheat sheets
- **[Patterns Registry](./reference/patterns-registry.md)** - 35+ copy-paste patterns
- **[Common Errors](./reference/common-errors.md)** - Error solutions & debugging

### 🚀 Getting Started
- **[Main README](./README.md)** - Overview and quick start
- **[Getting Started Guide](./guides/getting-started.md)** - First steps tutorial
- **[AI Improvements Summary](../AI-IMPROVEMENTS-SUMMARY.md)** - What's new for AI

### 📚 Core Documentation
- **[Elements](./elements.md)** - Box, Text, Button, Field components
- **[Blocks](./blocks.md)** - Composed components overview
- **[Themes](./themes.md)** - Theme system and customization

### 🔧 API References
- **[Box API](./api/Box.md)** - Layout component reference
- **[Text API](./api/Text.md)** - Typography component reference
- **[Button API](./api/Button.md)** - Button component reference
- **[Field API](./api/Field.md)** - Form input reference

## Complete File Structure

```
design-system/
├── components.json                     ✅ NEW: Machine-readable component metadata
├── types.ts                            ✅ NEW: TypeScript type definitions
├── AI-IMPROVEMENTS-SUMMARY.md          ✅ NEW: AI improvements overview
│
└── docs/
    ├── README.md                       ✅ Complete overview and architecture
    ├── DOCUMENTATION_AUDIT.md          ✅ Current status and improvement plan
    ├── SITEMAP.md                      ✅ This navigation guide (UPDATED)
    ├── AI-INDEX.md                     ✅ AI assistant quick reference (UPDATED)
    ├── index.md                        ✅ Quick reference (legacy)
    ├── elements.md                     ✅ Core components documentation
    ├── blocks.md                       ⚠️ Composed components (expanding)
    ├── themes.md                       ✅ Theme system guide
    │
    ├── decision-trees/                 📁 NEW: Decision Flowcharts
    │   ├── component-selection.md      ✅ Which component to use?
    │   └── prop-selection.md           ✅ Which props to use? (size vs $size!)
    │
    ├── api/                            📁 Component API References
│   ├── Box.md                          ✅ Layout component props and examples
│   ├── Text.md                         ✅ Typography component reference
│   ├── Button.md                       ✅ Button variants and interactions
│   ├── Field.md                        ✅ Form input types and validation
│   └── blocks/                         🚧 Individual block component APIs
│       ├── Avatar.md                   🚧 User avatars and profile images
│       ├── Modal.md                    🚧 Dialog boxes and overlays
│       ├── Tooltip.md                  🚧 Contextual help components
│       ├── Menu.md                     🚧 Dropdown menus and actions
│       ├── Progress.md                 🚧 Progress indicators
│       ├── Collection.md               📋 Responsive grid containers
│       ├── Group.md                    📋 Flex grouping containers
│       ├── ScrollContainer.md          📋 Custom scrollable areas
│       ├── FieldSet.md                 📋 Grouped form fields
│       ├── Controls.md                 📋 Form action groups
│       └── [30+ more components]       📋 Additional block components
│
├── guides/                             📁 Step-by-Step Tutorials
│   ├── getting-started.md              ✅ Your first components tutorial
│   ├── component-composition.md        ✅ Building complex UIs
│   ├── theming-guide.md                ✅ Customizing themes and tokens
│   ├── responsive-design.md            ✅ Mobile-first design patterns
│   ├── accessibility.md                ✅ Building inclusive interfaces
│   ├── migration-guide.md              📋 Version upgrade instructions
│   ├── testing-guide.md                📋 Component testing strategies
│   ├── performance-guide.md            📋 Optimization best practices
│   ├── troubleshooting.md              📋 Common issues and solutions
│   └── contributing.md                 📋 How to contribute to docs
│
    ├── examples/                       📁 Real-World Patterns
    │   ├── index.json                  ✅ NEW: Searchable examples library
    │   ├── layouts/                    📁 Layout Examples
    │   │   └── dashboard.md            ✅ Dashboard layout patterns
    │   ├── forms/                      📁 Form Examples  
    │   │   └── form-patterns.md        ✅ Form design and validation
    │   ├── navigation/                 📁 Navigation Examples
    │   │   ├── breadcrumbs.md          📋 Breadcrumb navigation
    │   │   ├── sidebar-navigation.md   📋 Sidebar menu patterns
    │   │   ├── mobile-navigation.md    📋 Mobile menu patterns
    │   │   └── tabs.md                 📋 Tab navigation
    │   ├── cards/                      📁 Card Examples
    │   │   ├── product-cards.md        📋 Product display cards
    │   │   ├── user-cards.md           📋 User profile cards
    │   │   ├── stat-cards.md           📋 Statistics and metrics
    │   │   └── interactive-cards.md    📋 Clickable card patterns
    │   └── patterns/                   📁 Complex Patterns
    │       ├── modals-and-overlays.md  📋 Modal dialog patterns
    │       ├── data-tables.md          📋 Table design patterns
    │       ├── search-and-filters.md   📋 Search interface patterns
    │       └── onboarding-flows.md     📋 User onboarding sequences
    │
    ├── reference/                      📁 NEW: Reference Materials
    │   ├── README.md                   ✅ Reference directory guide
    │   ├── patterns-registry.md        ✅ 35+ copy-paste patterns
    │   ├── prop-validation.md          ✅ Valid/invalid prop combinations
    │   ├── component-dependencies.md   ✅ Component relationship graph
    │   ├── common-errors.md            ✅ Error solutions & debugging
    │   └── quick-cards/                📁 Component Cheat Sheets
    │       ├── box.md                  ✅ Box quick reference
    │       ├── button.md               ✅ Button quick reference ($size!)
    │       └── field.md                ✅ Field quick reference ($size!)
    │
    └── assets/                         📁 Design Resources
        ├── design-tokens.md            ✅ Complete token reference
        ├── color-palettes.md           ✅ Color system documentation
        └── typography-scale.md         ✅ Typography system guide
```

## Documentation Status

### ✅ Complete (Production Ready)

**AI Resources** (NEW!)
- [components.json](../components.json) - Complete component metadata
- [types.ts](../types.ts) - TypeScript type definitions
- [component-selection.md](./decision-trees/component-selection.md) - Component decision tree
- [prop-selection.md](./decision-trees/prop-selection.md) - Prop decision tree (size vs $size!)
- [box.md](./reference/quick-cards/box.md) - Box quick reference card
- [button.md](./reference/quick-cards/button.md) - Button quick reference card
- [field.md](./reference/quick-cards/field.md) - Field quick reference card
- [patterns-registry.md](./reference/patterns-registry.md) - 35+ patterns
- [prop-validation.md](./reference/prop-validation.md) - Validation rules
- [component-dependencies.md](./reference/component-dependencies.md) - Dependency graph
- [common-errors.md](./reference/common-errors.md) - Error solutions
- [index.json](./examples/index.json) - Searchable examples

**Core Elements & APIs**
- [Box.md](./api/Box.md) - Layout component with all props documented
- [Text.md](./api/Text.md) - Typography component with semantic HTML
- [Button.md](./api/Button.md) - Interactive buttons with all variants
- [Field.md](./api/Field.md) - Form inputs with validation examples

**Theme System**
- [themes.md](./themes.md) - Complete theme documentation
- [design-tokens.md](./assets/design-tokens.md) - All tokens documented
- [color-palettes.md](./assets/color-palettes.md) - Color system guide
- [typography-scale.md](./assets/typography-scale.md) - Typography reference

**Guides**
- [getting-started.md](./guides/getting-started.md) - Complete tutorial
- [component-composition.md](./guides/component-composition.md) - Advanced patterns
- [theming-guide.md](./guides/theming-guide.md) - Theme customization
- [responsive-design.md](./guides/responsive-design.md) - Mobile-first design
- [accessibility.md](./guides/accessibility.md) - Inclusive design guide

**Examples**
- [dashboard.md](./examples/layouts/dashboard.md) - Dashboard layouts
- [form-patterns.md](./examples/forms/form-patterns.md) - Form examples

### ⚠️ Partial (Usable but Expanding)
**Composed Components**
- [blocks.md](./blocks.md) - Overview complete, individual APIs in progress
- [elements.md](./elements.md) - Complete but being enhanced with more examples

### 🚧 In Development (Active Work)
**Block Component APIs** (Priority Order)
1. Avatar.md - User profile images and initials
2. Modal.md - Dialog boxes and overlays
3. Tooltip.md - Contextual help and information
4. Menu.md - Dropdown menus and action lists
5. Progress.md - Loading and progress indicators

### 📋 Planned (Coming Soon)
**Enhanced Guides**
- migration-guide.md - Version upgrade instructions
- testing-guide.md - Component testing best practices
- performance-guide.md - Optimization strategies
- troubleshooting.md - Common issues and solutions

**Extended Examples**
- Navigation patterns (breadcrumbs, sidebars, mobile menus)
- Card patterns (products, users, statistics)
- Complex patterns (modals, tables, search, onboarding)

**Advanced Block APIs**
- Layout blocks (Collection, Group, ScrollContainer)
- Form blocks (FieldSet, Controls, InlineEditor)
- Display blocks (Gallery, Slideshow, Slider)
- Animation blocks (Carousel, Marquee, Parallax)

## Learning Paths

### 🆕 New to the Design System
1. **[README.md](./README.md)** - Get the big picture
2. **[Getting Started Guide](./guides/getting-started.md)** - Build your first component
3. **[Elements Documentation](./elements.md)** - Learn the building blocks
4. **[Component Composition](./guides/component-composition.md)** - Combine components

### 🎨 Designers & Design-Focused
1. **[Design Tokens](./assets/design-tokens.md)** - Understand the design language
2. **[Color Palettes](./assets/color-palettes.md)** - Learn the color system
3. **[Typography Scale](./assets/typography-scale.md)** - Typography guidelines
4. **[Theming Guide](./guides/theming-guide.md)** - Customize appearance

### 👩‍💻 Frontend Developers
1. **[API References](./api/)** - Detailed component props
2. **[Responsive Design](./guides/responsive-design.md)** - Mobile-first patterns
3. **[Examples](./examples/)** - Real-world implementation patterns
4. **[Blocks Documentation](./blocks.md)** - Advanced composed components

### ♿ Accessibility-Focused
1. **[Accessibility Guide](./guides/accessibility.md)** - Inclusive design principles
2. **[Semantic HTML Examples](./api/Text.md)** - Proper HTML structure
3. **[Keyboard Navigation](./guides/accessibility.md#keyboard-navigation)** - Interaction patterns
4. **[Color Contrast](./assets/color-palettes.md#accessibility-standards)** - Visual accessibility

### 🔧 Contributors & Maintainers
1. **[Documentation Audit](./DOCUMENTATION_AUDIT.md)** - Current improvement plan
2. **[Contributing Guide](./guides/contributing.md)** *(Coming Soon)*
3. **[Testing Guide](./guides/testing-guide.md)** *(Coming Soon)*
4. **[Performance Guide](./guides/performance-guide.md)** *(Coming Soon)*

## Quick Reference Tables

### Component Usage Decision Tree
| Need | Use | Documentation |
|------|-----|---------------|
| Layout/Container | `Box` | [Box.md](./api/Box.md) |
| Text/Typography | `Text` | [Text.md](./api/Text.md) |
| Interactive Action | `Button` | [Button.md](./api/Button.md) |
| Form Input | `Field` | [Field.md](./api/Field.md) |
| Complex UI Pattern | See [blocks.md](./blocks.md) | Individual APIs coming |

### Theme Token Quick Reference
| Token Type | Documentation | Use Cases |
|------------|---------------|-----------|
| Colors | [color-palettes.md](./assets/color-palettes.md) | Backgrounds, text, borders |
| Spacing | [design-tokens.md](./assets/design-tokens.md#spacing-tokens) | Padding, margins, gaps |
| Typography | [typography-scale.md](./assets/typography-scale.md) | Font sizes, weights, line heights |
| Shapes | [design-tokens.md](./assets/design-tokens.md#shape-tokens) | Border radius values |

### Common Tasks
| Task | Start Here | Related Docs |
|------|------------|--------------|
| Build first component | [Getting Started](./guides/getting-started.md) | [Elements](./elements.md) |
| Create responsive layout | [Responsive Design](./guides/responsive-design.md) | [Dashboard Example](./examples/layouts/dashboard.md) |
| Style with theme | [Theming Guide](./guides/theming-guide.md) | [Design Tokens](./assets/design-tokens.md) |
| Build accessible UI | [Accessibility Guide](./guides/accessibility.md) | [Text API](./api/Text.md) |
| Debug component issue | [Troubleshooting](./guides/troubleshooting.md) *(Coming Soon)* | [API References](./api/) |

## Contributing to Documentation

### High Priority Needs
1. **Block Component APIs** - Individual documentation for 50+ components
2. **Navigation Examples** - Breadcrumbs, sidebars, mobile menus
3. **Card Examples** - Product cards, user cards, statistics
4. **Testing Guide** - Component testing strategies
5. **Migration Guide** - Version upgrade instructions

### How to Contribute
1. Review [Documentation Audit](./DOCUMENTATION_AUDIT.md) for current priorities
2. Follow the established documentation templates
3. Include working code examples
4. Test examples for accessibility compliance
5. Update this sitemap when adding new files

### Documentation Standards
- **Consistency**: Follow existing formats and structures
- **Completeness**: Include props, examples, and best practices
- **Accuracy**: Test all code examples
- **Accessibility**: Include accessibility considerations
- **Cross-references**: Link to related documentation

## Quick Search

**Can't find what you need?** Try these approaches:

1. **Component-specific**: Check [API References](./api/) for detailed props
2. **Pattern-specific**: Browse [Examples](./examples/) for implementation patterns
3. **Concept-specific**: Review [Guides](./guides/) for step-by-step instructions
4. **Token-specific**: See [Assets](./assets/) for design token references
5. **Problem-specific**: Check [Troubleshooting](./guides/troubleshooting.md) *(Coming Soon)*

**Can't find what you need?** The [Documentation Audit](./DOCUMENTATION_AUDIT.md) shows current gaps and planned improvements. Your needed documentation might be coming soon!

---

## 🆕 Recent Additions (January 2025)

**AI-Friendly Resources:**
- ✅ Machine-readable component metadata (components.json)
- ✅ Complete TypeScript type definitions (types.ts)
- ✅ Component & prop selection decision trees
- ✅ Quick reference cards for Box, Button, Field
- ✅ Patterns registry with 35+ examples
- ✅ Prop validation reference
- ✅ Component dependencies graph
- ✅ Common errors & troubleshooting guide
- ✅ Searchable examples index (JSON)

**Impact:** These additions significantly improve AI code generation accuracy and reduce common errors like size vs $size confusion.

See [AI-IMPROVEMENTS-SUMMARY.md](../AI-IMPROVEMENTS-SUMMARY.md) for complete details.

---

**📝 Keep This Updated**: When adding new documentation files, please update this sitemap to maintain accurate navigation for all users.