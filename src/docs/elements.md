# Design System Elements

This directory contains the core elements of the design system. These elements are built using `styled-components` and `styled-system` to provide a flexible and consistent design language.

## Overview

The design system follows a compositional approach where each component builds upon the previous one:
- `Box` - The foundational container component
- `Text` - Extends Box with typography capabilities
- `Button` - Extends Text with button-specific functionality
- `Field` - Extends Text with form input capabilities

All components are fully themeable and support responsive design patterns through styled-system.

## Box Component

> **⚠️ IMPORTANT: Box is for layout and containers only!**
> 
> The `Box` component does **NOT** support typography props like `fontSize`, `fontWeight`, `lineHeight`, `color`, `textShadow`, etc. 
> 
> **For any element that needs to be rendered as semantic HTML elements like `p`, `h1-6`, `span`, `label`, etc., or requires text styling, use the `Text` component instead.**

The `Box` component is the foundational building block that provides layout, spacing, background colors, and interactive capabilities.

### Props

#### Core Props
- `children?: React.ReactNode` - Child elements to render
- `as?: string | React.ComponentType` - HTML element or React component to render as
- `ref?: React.Ref` - React ref for DOM access

#### Custom Utility Props
- `gap?: any` - CSS gap property, maps to `theme.space` (use aliases: 'mini', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl')
- `skin?: string` - Style variant, maps to `theme.skins[skin]` - provides pre-defined styling combinations for backgrounds, borders, and colors. Available options include:
  - **Surface skins**: `'base'`, `'surface'`, `'panel'`, `'card'`, `'overlay'` - for different container backgrounds
  - **Color skins**: `'primary'`, `'accent'`, `'neutral'` - for brand and semantic colors
  - **State skins**: `'highlight'` - for focused/active states
  - **Signal skins**: `'error'`, `'success'`, `'warning'` - for status indicators
  - **Special skins**: `'transparent'`, `'translucent'` - for transparent effects
  - **Color pair skins**: `'red'`, `'blue'`, `'green'`, `'yellow'`, `'purple'`, `'pink'`, `'orange'`, `'teal'`, `'gray'` - for color-coded elements
- `shape?: string` - Border radius variant, maps to `theme.shapes` ('square', 'roundedSmall', 'rounded', 'roundedLarge', 'pill', 'circle', 'roundedTop', 'roundedBottom', 'roundedLeft', 'roundedRight')
- `aspect?: number | number[] | string[] | {}` - Aspect ratio (e.g., 16/9, [4/3, 16/9])
- `cursor?: string` - CSS cursor property (e.g., 'pointer', 'grab')
- `$size?: any` - Size variant, maps to `theme.controlSizes` ('xxxsmall', 'xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge')
- `$shadow?: string` - Shadow variant, maps to `theme.shadows` ('small', 'medium', 'large')
- `disabled?: boolean` - Disabled state (opacity: 0.5, pointer-events: none)

#### Interactive State Props
- `hover?: string | object` - Hover state styling, maps to `theme.skins[hover]` or accepts a direct styling object. Available hover skins: `'default'`, `'subtle'`, `'brand'`, `'error'`
- `focus?: string | object` - Focus state styling, maps to `theme.skins[focus]` or accepts a direct styling object. Available focus skins: `'highlight'` (with focus ring effect)
- `interactive?: object` - Advanced interactive states object:
  ```typescript
  {
    hover?: Record<string, any>;
    focus?: Record<string, any>;
    active?: Record<string, any>;
    disabled?: Record<string, any>;
    visited?: Record<string, any>;
  }
  ```

#### Styled System Props

**Color Props**
- `bg?: ResponsiveValue<string>` - Background color, maps to `theme.colors`
- `backgroundColor?: ResponsiveValue<string>` - Background color alias
- `opacity?: ResponsiveValue<number>` - Opacity value (0-1)

**⚠️ Note:** `Box` does NOT support `color` prop for text styling. Use `Text` component for text color.

**Space Props (Margin & Padding)**
- `m?: ResponsiveValue<string | number>` - Margin (all sides), maps to `theme.space` (use aliases: 'mini', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl')
- `mt?: ResponsiveValue<string | number>` - Margin top
- `mr?: ResponsiveValue<string | number>` - Margin right
- `mb?: ResponsiveValue<string | number>` - Margin bottom
- `ml?: ResponsiveValue<string | number>` - Margin left
- `mx?: ResponsiveValue<string | number>` - Margin horizontal (left & right)
- `my?: ResponsiveValue<string | number>` - Margin vertical (top & bottom)
- `p?: ResponsiveValue<string | number>` - Padding (all sides), maps to `theme.space` (use aliases: 'mini', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl')
- `pt?: ResponsiveValue<string | number>` - Padding top
- `pr?: ResponsiveValue<string | number>` - Padding right
- `pb?: ResponsiveValue<string | number>` - Padding bottom
- `pl?: ResponsiveValue<string | number>` - Padding left
- `px?: ResponsiveValue<string | number>` - Padding horizontal (left & right)
- `py?: ResponsiveValue<string | number>` - Padding vertical (top & bottom)

**Layout Props**
- `width?: ResponsiveValue<string | number>` - Width (can use fractions like 1/2)
- `height?: ResponsiveValue<string | number>` - Height
- `minWidth?: ResponsiveValue<string | number>` - Minimum width
- `maxWidth?: ResponsiveValue<string | number>` - Maximum width
- `minHeight?: ResponsiveValue<string | number>` - Minimum height
- `maxHeight?: ResponsiveValue<string | number>` - Maximum height
- `size?: ResponsiveValue<string | number>` - Width and height combined
- `display?: ResponsiveValue<string>` - CSS display property
- `verticalAlign?: ResponsiveValue<string>` - CSS vertical-align
- `overflow?: ResponsiveValue<string>` - CSS overflow
- `overflowX?: ResponsiveValue<string>` - CSS overflow-x
- `overflowY?: ResponsiveValue<string>` - CSS overflow-y

**Position Props**
- `position?: ResponsiveValue<string>` - CSS position (static, relative, absolute, fixed, sticky)
- `zIndex?: ResponsiveValue<number>` - CSS z-index
- `top?: ResponsiveValue<string | number>` - CSS top, maps to `theme.space` (use aliases: 'mini', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl')
- `right?: ResponsiveValue<string | number>` - CSS right, maps to `theme.space` (use aliases: 'mini', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl')
- `bottom?: ResponsiveValue<string | number>` - CSS bottom, maps to `theme.space` (use aliases: 'mini', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl')
- `left?: ResponsiveValue<string | number>` - CSS left, maps to `theme.space` (use aliases: 'mini', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl')

**Flexbox Props**
- `alignItems?: ResponsiveValue<string>` - CSS align-items
- `alignContent?: ResponsiveValue<string>` - CSS align-content
- `justifyItems?: ResponsiveValue<string>` - CSS justify-items
- `justifyContent?: ResponsiveValue<string>` - CSS justify-content
- `flexWrap?: ResponsiveValue<string>` - CSS flex-wrap
- `flexDirection?: ResponsiveValue<string>` - CSS flex-direction
- `flex?: ResponsiveValue<string | number>` - CSS flex shorthand
- `flexGrow?: ResponsiveValue<number>` - CSS flex-grow
- `flexShrink?: ResponsiveValue<number>` - CSS flex-shrink
- `flexBasis?: ResponsiveValue<string | number>` - CSS flex-basis
- `justifySelf?: ResponsiveValue<string>` - CSS justify-self
- `alignSelf?: ResponsiveValue<string>` - CSS align-self
- `order?: ResponsiveValue<number>` - CSS order

**Grid Props**
- `gridGap?: ResponsiveValue<string | number>` - CSS grid-gap, maps to `theme.space` (use aliases: 'mini', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl')
- `gridColumnGap?: ResponsiveValue<string | number>` - CSS grid-column-gap
- `gridRowGap?: ResponsiveValue<string | number>` - CSS grid-row-gap
- `gridColumn?: ResponsiveValue<string>` - CSS grid-column
- `gridRow?: ResponsiveValue<string>` - CSS grid-row
- `gridAutoFlow?: ResponsiveValue<string>` - CSS grid-auto-flow
- `gridAutoColumns?: ResponsiveValue<string>` - CSS grid-auto-columns
- `gridAutoRows?: ResponsiveValue<string>` - CSS grid-auto-rows
- `gridTemplateColumns?: ResponsiveValue<string>` - CSS grid-template-columns
- `gridTemplateRows?: ResponsiveValue<string>` - CSS grid-template-rows
- `gridTemplateAreas?: ResponsiveValue<string>` - CSS grid-template-areas
- `gridArea?: ResponsiveValue<string>` - CSS grid-area

**Background Props**
- `background?: ResponsiveValue<string>` - CSS background shorthand
- `backgroundImage?: ResponsiveValue<string>` - CSS background-image
- `backgroundSize?: ResponsiveValue<string>` - CSS background-size
- `backgroundPosition?: ResponsiveValue<string>` - CSS background-position
- `backgroundRepeat?: ResponsiveValue<string>` - CSS background-repeat

**Border Props**
- `border?: ResponsiveValue<string>` - CSS border, maps to `theme.borders`
- `borderWidth?: ResponsiveValue<string | number>` - CSS border-width, maps to `theme.borderWidths`
- `borderStyle?: ResponsiveValue<string>` - CSS border-style, maps to `theme.borderStyles`
- `borderColor?: ResponsiveValue<string>` - CSS border-color, maps to `theme.colors`
- `borderRadius?: ResponsiveValue<string | number>` - CSS border-radius, maps to `theme.radii` (use aliases: 'square', 'roundedSmall', 'rounded', 'roundedLarge', 'pill', 'circle')
- `borderTop?: ResponsiveValue<string>` - CSS border-top
- `borderRight?: ResponsiveValue<string>` - CSS border-right
- `borderBottom?: ResponsiveValue<string>` - CSS border-bottom
- `borderLeft?: ResponsiveValue<string>` - CSS border-left
- `borderX?: ResponsiveValue<string>` - Border left and right
- `borderY?: ResponsiveValue<string>` - Border top and bottom

**Shadow Props**
- `boxShadow?: ResponsiveValue<string>` - CSS box-shadow, maps to `theme.shadows`

**⚠️ Note:** `Box` does NOT support `textShadow` prop. Use `Text` component for text shadows.

### Usage Examples

```jsx
// Basic container (layout only)
<Box p="m" bg="primary">
  <Text color="white">Content</Text>
</Box>

// Flexbox layout with gap
<Box display="flex" gap="s" alignItems="center" justifyContent="space-between">
  <Box>
    <Text>Item 1</Text>
  </Box>
  <Box>
    <Text>Item 2</Text>
  </Box>
</Box>

// Responsive design
<Box 
  width={[1, 1/2, 1/3]}  // 100% mobile, 50% tablet, 33% desktop
  p={['xs', 's', 'm']}   // 8px, 12px, 16px padding
>
  <Text>Responsive content</Text>
</Box>

// Interactive states with skin
<Box
  skin="card"
  shape="rounded"
  p="m"
  cursor="pointer"
  hover="subtle"
  focus="highlight"
>
  <Text>Interactive card</Text>
</Box>

// Different skin examples
<Box skin="surface" p="m" mb="s">
  <Text>Surface container</Text>
</Box>

<Box skin="primary" p="s" mb="s">
  <Text>Primary branded container</Text>
</Box>

<Box skin="translucent" p="m" mb="s">
  <Text>Translucent backdrop effect</Text>
</Box>

// Color-coded containers
<Box skin="success" p="xs" mb="mini">
  <Text>Success state</Text>
</Box>

<Box skin="warning" p="xs" mb="mini">
  <Text>Warning state</Text>
</Box>

<Box skin="error" p="xs">
  <Text>Error state</Text>
</Box>

// Advanced interactive states
<Box
  interactive={{
    hover: { bg: 'palette.neutrals.3', transform: 'scale(1.02)' },
    focus: { outline: '2px solid', outlineOffset: '2px', outlineColor: 'palette.brands.5' },
    active: { transform: 'scale(0.98)' }
  }}
>
  <Text>Advanced interactions</Text>
</Box>

// Aspect ratio container
<Box aspect={16/9} bg="gray.200" overflow="hidden">
  <img src="video-thumbnail.jpg" alt="Video" />
</Box>

// Grid layout
<Box 
  display="grid" 
  gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
  gap="s"
>
  <Box><Text>Grid item 1</Text></Box>
  <Box><Text>Grid item 2</Text></Box>
  <Box><Text>Grid item 3</Text></Box>
</Box>
```

## Text Component

> **✅ Use Text for all text content and semantic HTML elements!**
> 
> The `Text` component extends `Box` with typography capabilities and should be used for **all text content** and **semantic HTML elements**.
> 
> **Required for:** `p`, `h1-6`, `span`, `label`, `a` (with text), and any element needing text styling.

The `Text` component extends `Box` with typography capabilities and text-specific utilities. **Use `Text` for any element that needs to be rendered as semantic HTML elements** like `p`, `h1-6`, `span`, `label`, etc., or requires text styling properties.

**When to use Text vs Box:**
- **Use `Text`** for: headings, paragraphs, labels, any text content, semantic HTML elements
- **Use `Box`** for: containers, layouts, divs, non-text elements

### Props

**Inherits all Box props plus:**

#### Typography Props
- `color?: ResponsiveValue<string>` - Text color, maps to `theme.colors`
- `fontFamily?: ResponsiveValue<string>` - Font family, maps to `theme.fonts`
- `fontSize?: ResponsiveValue<string | number>` - Font size, maps to `theme.fontSizes` (use aliases: 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl')
- `fontWeight?: ResponsiveValue<string | number>` - Font weight, maps to `theme.fontWeights`
- `lineHeight?: ResponsiveValue<string | number>` - Line height, maps to `theme.lineHeights`
- `letterSpacing?: ResponsiveValue<string | number>` - Letter spacing, maps to `theme.letterSpacings`
- `textAlign?: ResponsiveValue<string>` - Text alignment (left, center, right, justify)
- `fontStyle?: ResponsiveValue<string>` - Font style (normal, italic, oblique)
- `textShadow?: ResponsiveValue<string>` - CSS text-shadow, maps to `theme.shadows`

#### Text Utility Props
- `truncate?: boolean` - Single-line text truncation with ellipsis
- `textTransform?: string` - CSS text-transform (uppercase, lowercase, capitalize)
- `textDecoration?: string` - CSS text-decoration (underline, line-through, none)
- `lineClamp?: number` - Multi-line text clamping (WebKit only)

### Usage Examples

```jsx
// Heading text (CORRECT - use Text for semantic HTML)
<Text as="h1" fontSize="l" fontWeight="bold" color="primary">
  Page Title
</Text>

// Body text (CORRECT - use Text for paragraphs)
<Text as="p" fontSize="s" lineHeight="relaxed" color="palette.neutrals.10">
  This is body text with comfortable line spacing.
</Text>

// Label text (CORRECT - use Text for labels)
<Text as="label" fontSize="s" fontWeight="medium">
  Form Label
</Text>

// Span text (CORRECT - use Text for inline text)
<Text as="span" fontSize="xs" color="secondary">
  Helper text
</Text>

// ❌ INCORRECT - Don't use Box for text content or semantic elements
// <Box as="p" color="primary">Wrong approach</Box>
// <Box as="h1" fontSize="l">Wrong approach</Box>
// <Box as="label">Wrong approach</Box>

// Truncated text
<Text truncate maxWidth="200px" color="secondary">
  This is a very long text that will be truncated with an ellipsis
</Text>

// Multi-line clamping
<Text lineClamp={3} fontSize="s">
  This is a longer paragraph that will be clamped to exactly 3 lines with an ellipsis at the end if the content exceeds the available space.
</Text>

// Text transformations
<Text textTransform="uppercase" fontSize="xs" fontWeight="medium" letterSpacing="wide">
  Small caps text
</Text>

// Responsive typography
<Text 
  fontSize={['s', 'm', 'l']}  // 14px, 16px, 18px
  lineHeight={[1.4, 1.5, 1.6]}
>
  Responsive text
</Text>
```

## Button Component

The `Button` component extends `Text` with button-specific styling and behavior.

### Props

**Inherits all Text props plus:**

#### Button-Specific Props
- `variant?: string` - Button style variant, maps to `theme.skins.button` ('default', 'primary', 'outline', 'subtle', 'ghost', 'clean', 'cta', 'danger', 'bubble')
- `$size?: string` - Button size variant, maps to `theme.skins.button.sizes` ('xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge')
- `disabled?: boolean` - Disabled state styling

### Default Attributes
- `role="button"` - ARIA button role
- `border="none"` - Remove default border
- `$size="medium"` - Default size
- `shape="rounded"` - Default border radius
- `variant="default"` - Default style variant
- `display="inline-flex"` - Flex container
- `alignItems="center"` - Vertical center alignment
- `justifyContent="center"` - Horizontal center alignment
- `cursor="pointer"` - Pointer cursor
- `tabIndex={0}` - Keyboard navigation
- `transition="0.2s ease"` - Smooth transitions

### Theme Mapping

Button variants are defined in the theme as follows:

**Available Variants:**
- `default` - Light background with border and subtle shadow
- `primary` - Brand color background with dark text
- `outline` - Transparent background with border
- `subtle` - Light background with minimal styling
- `ghost` - Transparent background, no border
- `clean` - No styling, transparent background
- `cta` - Call-to-action styling with enhanced shadows
- `danger` - Error state styling
- `bubble` - Dark background with light text

**Available Sizes:**
- `xxsmall` - Height: 44px, padding: 4px 8px, fontSize: 14px, fontWeight: 700
- `xsmall` - Height: 48px, padding: 6px 12px, fontSize: 14px, fontWeight: 600
- `small` - Height: 52px, padding: 12px, fontSize: 16px, fontWeight: 500
- `medium` - Height: 56px, padding: 16px 24px, fontSize: 16px, fontWeight: 600
- `large` - Height: 60px, padding: 16px 48px, fontSize: 18px, fontWeight: 600
- `xlarge` - Height: 64px, padding: 16px 64px, fontSize: 18px, fontWeight: 600

### Usage Examples

```jsx
// Primary button
<Button variant="primary" $size="medium">
  Save Changes
</Button>

// Outline button with icon
<Button variant="outline" $size="small" gap="xs">
  <Icon name="plus" size="s" />
  Add Item
</Button>

// Disabled button
<Button variant="primary" disabled>
  Loading...
</Button>

// Custom styling
<Button
  variant="ghost"
  color="danger"
  hover="danger"
  fontWeight="bold"
>
  Delete
</Button>
```

## Field Component

The `Field` component extends `Text` with form input capabilities and styling.

### Props

**Inherits all Text props plus:**

#### Field-Specific Props
- `variant?: string` - Field style variant, maps to `theme.skins.field` ('default', 'outline', 'filled', 'ghost')
- `$size?: string` - Field size variant, maps to `theme.skins.field.sizes` ('small', 'medium', 'large')
- `invalid?: boolean` - Invalid state styling
- `disabled?: boolean` - Disabled state styling

### Default Attributes
- `border="none"` - Remove default border
- `$size="medium"` - Default size
- `shape="rounded"` - Default border radius
- `variant="default"` - Default style variant
- `display="block"` - Block display
- `width="100%"` - Full width
- `transition="0.2s ease"` - Smooth transitions

### Special Input Types

For certain input types, the component automatically applies appropriate styling:

- **Email/URL inputs**: Adds subtle validation styling
- **Password inputs**: Adds secure input styling
- **Number inputs**: Adds numeric input styling
- **Search inputs**: Adds search-specific styling
- **Textarea**: Adds multi-line input styling

### Theme Mapping

Field variants are defined in the theme as follows:

**Available Variants:**
- `default` - Light background with border
- `outline` - Transparent background with border
- `filled` - Filled background with no border
- `ghost` - Minimal styling with focus states

**Available Sizes:**
- `small` - Height: 48px, padding: 8px 12px, fontSize: 14px
- `medium` - Height: 56px, padding: 12px 16px, fontSize: 16px
- `large` - Height: 64px, padding: 16px 20px, fontSize: 18px

### Usage Examples

```jsx
// Basic text input
<Field 
  as="input"
  type="text"
  placeholder="Enter your name"
  variant="outline"
  $size="medium"
/>

// Email input with validation
<Field 
  as="input"
  type="email"
  placeholder="Enter your email"
  variant="default"
  invalid={hasError}
/>

// Textarea field
<Field 
  as="textarea"
  placeholder="Enter your message"
  variant="filled"
  rows={4}
/>

// Select dropdown
<Field 
  as="select"
  variant="outline"
  $size="large"
>
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
</Field>

// Disabled field
<Field 
  as="input"
  type="text"
  placeholder="Disabled field"
  disabled
/>
```

## Responsive Values

All styled-system props support responsive values using arrays or objects:

```jsx
// Array syntax (mobile-first)
<Box 
  p={['xs', 's', 'm']}        // 8px, 12px, 16px
  width={[1, 1/2, 1/3]}       // 100%, 50%, 33%
/>

<Text
  fontSize={['s', 'm', 'l']}  // 14px, 16px, 18px
  lineHeight={[1.4, 1.5, 1.6]}
>
  Responsive text
</Text>

// Object syntax (named breakpoints)
<Box 
  p={{ base: 'xs', md: 's', lg: 'm' }}
  width={{ base: 1, md: 1/2, lg: 1/3 }}
/>

<Text
  fontSize={{ base: 's', md: 'm', lg: 'l' }}
  lineHeight={{ base: 1.4, md: 1.5, lg: 1.6 }}
>
  Responsive text
</Text>
```

## Theme Integration

> **💡 Best Practice:** Always use theme aliases (e.g., 'xs', 's', 'm') instead of indices (e.g., 3, 4, 5) for better readability and maintainability.

### Actual Theme Structure

```javascript
const theme = {
  // Space values for margin, padding, gap (use aliases)
  space: {
    0: '0px',
    mini: '4px',    // 2
    xs: '8px',      // 3
    s: '12px',      // 4
    m: '16px',      // 5
    l: '24px',      // 6
    xl: '32px',     // 7
    xxl: '48px',    // 8
    xxxl: '64px',   // 9
  },

  // Font sizes (use aliases)
  fontSizes: {
    xs: '12px',   // 0
    s: '14px',    // 1
    m: '16px',    // 2
    l: '18px',    // 3
    xl: '20px',   // 4
    xxl: '24px',  // 5
    xxxl: '32px', // 6
  },

  // Colors
  colors: {
    primary: '#3B82F6',
    secondary: '#6B7280',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    palette: {
      brands: {
        1: '#EFF6FF',
        5: '#3B82F6',
        9: '#1E40AF',
      },
      neutrals: {
        1: '#F9FAFB',
        5: '#6B7280',
        10: '#111827',
      }
    }
  },

  // Shadows
  shadows: {
    small: '0 1px 2px rgba(0, 0, 0, 0.05)',
    medium: '0 4px 6px rgba(0, 0, 0, 0.07)',
    large: '0 10px 15px rgba(0, 0, 0, 0.1)',
  },

  // Shape aliases for convenience
  shapes: {
    square: '0px',
    roundedSmall: '4px',
    rounded: '8px',
    roundedLarge: '16px',
    pill: '32px',
    circle: '50%',
  },

  // Skin system - pre-defined styling combinations
  skins: {
    // Surface skins for containers
    base: {
      backgroundColor: '#F9FAFB',
      color: '#111827',
      borderColor: '#E5E7EB',
    },
    surface: {
      backgroundColor: '#FFFFFF',
      color: '#111827',
      borderColor: '#E5E7EB',
    },
    card: {
      backgroundColor: '#FFFFFF',
      color: '#111827',
      borderColor: '#E5E7EB',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    },
    panel: {
      backgroundColor: '#F3F4F6',
      color: '#111827',
      borderColor: '#D1D5DB',
    },
    overlay: {
      backgroundColor: '#FFFFFF',
      color: '#111827',
      borderColor: '#E5E7EB',
      boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
    },

    // Brand and semantic skins
    primary: {
      backgroundColor: '#3B82F6',
      color: '#FFFFFF',
      borderColor: '#2563EB',
    },
    accent: {
      backgroundColor: '#8B5CF6',
      color: '#FFFFFF',
      borderColor: '#7C3AED',
    },
    neutral: {
      backgroundColor: '#6B7280',
      color: '#FFFFFF',
      borderColor: '#4B5563',
    },

    // State and signal skins
    highlight: {
      backgroundColor: '#EFF6FF',
      color: '#1D4ED8',
      borderColor: '#3B82F6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
    },
    error: {
      backgroundColor: '#FEF2F2',
      color: '#991B1B',
      borderColor: '#EF4444',
    },
    success: {
      backgroundColor: '#ECFDF5',
      color: '#065F46',
      borderColor: '#10B981',
    },
    warning: {
      backgroundColor: '#FFFBEB',
      color: '#92400E',
      borderColor: '#F59E0B',
    },

    // Special effect skins
    transparent: {
      backgroundColor: 'transparent',
      color: '#6B7280',
    },
    translucent: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      color: '#111827',
      backdropFilter: 'blur(8px)',
      borderColor: '#E5E7EB',
    },

    // Color pair skins for categorization
    red: { backgroundColor: '#FEF2F2', color: '#991B1B' },
    blue: { backgroundColor: '#EFF6FF', color: '#1E40AF' },
    green: { backgroundColor: '#ECFDF5', color: '#065F46' },
    yellow: { backgroundColor: '#FFFBEB', color: '#92400E' },
    purple: { backgroundColor: '#F3E8FF', color: '#6B21A8' },
    pink: { backgroundColor: '#FCE7F3', color: '#BE185D' },
    orange: { backgroundColor: '#FFF7ED', color: '#9A3412' },
    teal: { backgroundColor: '#F0FDFA', color: '#134E4A' },
    gray: { backgroundColor: '#F9FAFB', color: '#374151' },

    // Hover states
    hover: {
      default: { backgroundColor: '#F3F4F6', color: '#111827' },
      subtle: { backgroundColor: '#EFF6FF', color: '#1D4ED8' },
      brand: { backgroundColor: '#2563EB', color: '#FFFFFF' },
      error: { backgroundColor: '#DC2626', color: '#FFFFFF' },
    },
  }
};
```

## Skin System

The skin system provides pre-defined styling combinations that ensure consistent visual treatments across components. Skins are theme-aware and automatically adapt to light/dark modes.

### What is a Skin?

A skin is a cohesive set of styling properties (background, color, border, etc.) that work together to create a specific visual treatment. Instead of manually setting individual style properties, you can use a skin to apply a complete styling solution.

### Available Skin Categories

#### Surface Skins
Used for different container backgrounds and surface treatments:
- `'base'` - Primary background surface
- `'surface'` - Secondary surface, slightly elevated
- `'panel'` - Panel background for grouping content
- `'card'` - Card surface with subtle elevation
- `'overlay'` - Overlay surface for modals/dropdowns

#### Brand & Semantic Skins
For brand colors and semantic meaning:
- `'primary'` - Primary brand color treatment
- `'accent'` - Accent brand color treatment
- `'neutral'` - Neutral color treatment

#### State & Signal Skins
For communicating status and feedback:
- `'highlight'` - Focus/active state treatment
- `'error'` - Error state with red coloring
- `'success'` - Success state with green coloring
- `'warning'` - Warning state with yellow coloring

#### Special Effect Skins
For unique visual treatments:
- `'transparent'` - Fully transparent background
- `'translucent'` - Backdrop blur effect with transparency

#### Color Pair Skins
For color-coded elements and categorization:
- `'red'`, `'blue'`, `'green'`, `'yellow'`, `'purple'`, `'pink'`, `'orange'`, `'teal'`, `'gray'`

### Skin Usage Examples

```jsx
// Surface treatments
<Box skin="base" p="m">Base surface</Box>
<Box skin="surface" p="m">Surface level</Box>
<Box skin="card" p="m">Card surface</Box>

// Brand and semantic
<Box skin="primary" p="s">Primary brand</Box>
<Box skin="success" p="s">Success state</Box>
<Box skin="warning" p="s">Warning state</Box>

// Interactive states
<Box skin="surface" hover="highlight" p="m">Hover for highlight</Box>
<Box skin="card" focus="highlight" p="m">Focus for highlight</Box>

// Color coding
<Box skin="blue" p="xs">Blue category</Box>
<Box skin="green" p="xs">Green category</Box>
<Box skin="red" p="xs">Red category</Box>

// Special effects
<Box skin="translucent" p="m">Backdrop blur effect</Box>
<Box skin="transparent" p="m">Transparent background</Box>
```

### Best Practices for Skins

1. **Use semantic skins** for meaningful content (`success`, `error`, `warning`)
2. **Use surface skins** for layout containers (`base`, `surface`, `card`)
3. **Use color pair skins** for categorization and data visualization
4. **Combine with hover/focus** for interactive elements
5. **Let skins handle theming** - they automatically adapt to light/dark modes

## Utility Functions Reference

### Style Utilities
- `gap` - Maps `gap` prop to `theme.space` (use aliases: 'mini', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl')
- `aspect` - Creates aspect ratio containers using CSS aspect-ratio or padding-top fallback
- `cursor` - Maps `cursor` prop to CSS cursor values
- `disabled` - Applies disabled styling (opacity: 0.5, pointer-events: none)

### Theme Variant Utilities
- `$size` - Maps `$size` prop to `theme.controlSizes` ('xxxsmall', 'xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge')
- `skin` - Maps `skin` prop to `theme.skins` for pre-defined styling combinations. Provides consistent surface treatments, color schemes, and semantic styling across the design system. Each skin includes coordinated background, text color, and border styling.
- `shape` - Maps `shape` prop to `theme.shapes` (use aliases: 'square', 'roundedSmall', 'rounded', 'roundedLarge', 'pill', 'circle')
- `$shadow` - Maps `$shadow` prop to `theme.shadows` (use aliases: 'small', 'medium', 'large')
- `hover` - Maps `hover` prop to `theme.skins.hover` (available: 'default', 'subtle', 'brand', 'error') or accepts direct styling object
- `focus` - Maps `focus` prop to `theme.skins.focus` (available: 'highlight') or accepts direct styling object

### CSS Utilities
- `disabled` - Applies disabled styling (opacity: 0.5, pointer-events: none)
- `truncate` - Single-line text truncation with ellipsis (white-space: nowrap, overflow: hidden, text-overflow: ellipsis)
- `lineClamp` - Multi-line text clamping with `-webkit-line-clamp` (requires lineClamp prop with number)
- `textTransform` - Maps to CSS text-transform ('uppercase', 'lowercase', 'capitalize')
- `textDecoration` - Maps to CSS text-decoration ('underline', 'line-through', 'none')

**💡 Best Practice:** Always use theme aliases (e.g., 'xs', 's', 'm') instead of indices (e.g., 3, 4, 5) for better readability and maintainability.

## Best Practices

### Component Selection: Box vs Text

**Use `Box` for:**
- Layout containers (`div`, `section`, `article`, `aside`, `nav`, `main`, `header`, `footer`)
- Non-semantic wrappers
- Flexbox/grid containers
- Cards, panels, modals
- Spacing and positioning elements

**Use `Text` for:**
- All text content and semantic HTML elements
- Headings (`h1`, `h2`, `h3`, `h4`, `h5`, `h6`)
- Paragraphs (`p`)
- Labels (`label`)
- Spans (`span`)
- Links (`a`) with text
- Any element that needs typography styling

```jsx
// ✅ CORRECT: Use Box for layout, Text for content
<Box display="flex" flexDirection="column" gap="m" p="m" skin="surface">
  <Text as="h2" fontSize="l" fontWeight="bold" color="primary">
    Section Title
  </Text>
  <Text as="p" fontSize="s" lineHeight="relaxed" color="text">
    This is body content that should use Text component.
  </Text>
  <Box display="flex" gap="xs">
    <Button variant="primary">Save</Button>
    <Button variant="outline">Cancel</Button>
  </Box>
</Box>

// ✅ CORRECT: Using different skins for semantic meaning
<Box skin="card" p="m" mb="s">
  <Text as="h3" fontSize="m" fontWeight="bold">Card Content</Text>
</Box>

<Box skin="warning" p="s" mb="s">
  <Text fontSize="s">Warning message</Text>
</Box>

<Box skin="primary" p="s" shape="rounded" cursor="pointer" hover="brand">
  <Text color="white">Interactive primary element</Text>
</Box>

// ❌ INCORRECT: Don't use Box for text content
// <Box as="h2" fontSize="l" fontWeight="bold">Title</Box>
// <Box as="p" color="text">Content</Box>
```

### Component Composition
Use Box as the foundation and compose other elements:

```jsx
<Box display="flex" flexDirection="column" gap="m">
  <Text as="h2" fontSize="l" fontWeight="bold">
    Section Title
  </Text>
  <Box display="flex" gap="xs">
    <Button variant="primary">Save</Button>
    <Button variant="outline">Cancel</Button>
  </Box>
</Box>
```

### Consistent Spacing
Use theme spacing values consistently:

```jsx
// Good: Uses theme spacing aliases
<Box p="m" m="xs" gap="s" />

// Avoid: Using indices instead of aliases
<Box p={5} m={3} gap={4} />

// Avoid: Arbitrary values
<Box p="20px" m="10px" />
```

### Responsive Design
Design mobile-first with responsive arrays:

```jsx
<Box
  p={['xs', 's', 'm']}        // 8px, 12px, 16px
  width={[1, 1/2, 1/3]}       // 100%, 50%, 33%
  gap={['mini', 'xs', 's']}   // 4px, 8px, 12px
/>

<Text
  fontSize={['s', 'm', 'l']}  // 14px, 16px, 18px
  lineHeight={[1.4, 1.5, 1.6]}
>
  Responsive text
</Text>
```

### Theme Values and Aliases
Always use theme aliases for better code readability and maintainability:

```jsx
// ✅ GOOD: Use theme aliases
<Box p="m" gap="s" fontSize="l" />
<Text fontSize="xs" color="primary" />

// ❌ AVOID: Using indices
<Box p={5} gap={4} fontSize={3} />
<Text fontSize={0} color="primary" />

// ❌ AVOID: Arbitrary values
<Box p="16px" gap="12px" />
<Text fontSize="12px" />
```

**Available Theme Aliases:**
- **Space**: `mini`, `xs`, `s`, `m`, `l`, `xl`, `xxl`, `xxxl`
- **Font Sizes**: `xs`, `s`, `m`, `l`, `xl`, `xxl`, `xxxl`
- **Shapes**: `square`, `roundedSmall`, `rounded`, `roundedLarge`, `pill`, `circle`
- **Shadows**: `small`, `medium`, `large`
- **Skins**: `base`, `surface`, `panel`, `card`, `overlay`, `primary`, `accent`, `neutral`, `highlight`, `error`, `success`, `warning`, `transparent`, `translucent`, `red`, `blue`, `green`, `yellow`, `purple`, `pink`, `orange`, `teal`, `gray`

### Performance
- Use theme values instead of arbitrary CSS values
- Prefer composition over complex single components
- Use semantic HTML elements with Text component for better accessibility
- Avoid inline styles; use theme-based props instead