# Box Component API Reference

The `Box` component is the foundational building block of the design system, providing layout, spacing, and container capabilities.

## Overview

Box is a versatile layout component designed for containers and structural elements. While it supports the `color` prop for setting text color, it does **not** support typography props like fontSize, fontWeight, or lineHeight. For semantic HTML elements and full text styling capabilities, use the Text component instead.

## Import

```jsx
import { Box } from '@reactberry/system/elements';
```

## Basic Usage

```jsx
<Box p="m" bg="surface" display="flex" gap="s">
  <Text>Content goes here</Text>
</Box>
```

## Props

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Child elements to render |
| `as` | `string \| React.ComponentType` | `"div"` | HTML element or React component to render as |
| `ref` | `React.Ref` | - | React ref for DOM access |

### Custom Utility Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `gap` | `ResponsiveValue<string>` | - | CSS gap property, maps to `theme.space` |
| `skin` | `string` | - | Style variant from `theme.skins` |
| `shape` | `string` | - | Border radius variant from `theme.shapes` |
| `aspect` | `number \| number[] \| string[]` | - | Aspect ratio (e.g., 16/9, [4/3, 16/9]) |
| `cursor` | `string` | - | CSS cursor property |
| `$size` | `string` | - | Size variant from `theme.controlSizes` |
| `$shadow` | `string` | - | Shadow variant from `theme.shadows` |
| `disabled` | `boolean` | - | Disabled state styling |

### Interactive State Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `hover` | `string \| object` | - | Hover state styling |
| `focus` | `string \| object` | - | Focus state styling |
| `interactive` | `object` | - | Advanced interactive states object |

### Styled System Props

#### Color Props
| Prop | Type | Description |
|------|------|-------------|
| `color` | `ResponsiveValue<string>` | Text color |
| `bg` | `ResponsiveValue<string>` | Background color |
| `backgroundColor` | `ResponsiveValue<string>` | Background color alias |
| `opacity` | `ResponsiveValue<number>` | Opacity value (0-1) |

#### Space Props
| Prop | Type | Description |
|------|------|-------------|
| `m` | `ResponsiveValue<string \| number>` | Margin (all sides) |
| `mt` | `ResponsiveValue<string \| number>` | Margin top |
| `mr` | `ResponsiveValue<string \| number>` | Margin right |
| `mb` | `ResponsiveValue<string \| number>` | Margin bottom |
| `ml` | `ResponsiveValue<string \| number>` | Margin left |
| `mx` | `ResponsiveValue<string \| number>` | Margin horizontal |
| `my` | `ResponsiveValue<string \| number>` | Margin vertical |
| `p` | `ResponsiveValue<string \| number>` | Padding (all sides) |
| `pt` | `ResponsiveValue<string \| number>` | Padding top |
| `pr` | `ResponsiveValue<string \| number>` | Padding right |
| `pb` | `ResponsiveValue<string \| number>` | Padding bottom |
| `pl` | `ResponsiveValue<string \| number>` | Padding left |
| `px` | `ResponsiveValue<string \| number>` | Padding horizontal |
| `py` | `ResponsiveValue<string \| number>` | Padding vertical |

#### Layout Props
| Prop | Type | Description |
|------|------|-------------|
| `width` | `ResponsiveValue<string \| number>` | Width (supports fractions like 1/2) |
| `height` | `ResponsiveValue<string \| number>` | Height |
| `minWidth` | `ResponsiveValue<string \| number>` | Minimum width |
| `maxWidth` | `ResponsiveValue<string \| number>` | Maximum width |
| `minHeight` | `ResponsiveValue<string \| number>` | Minimum height |
| `maxHeight` | `ResponsiveValue<string \| number>` | Maximum height |
| `size` | `ResponsiveValue<string \| number>` | Width and height combined |
| `display` | `ResponsiveValue<string>` | CSS display property |
| `verticalAlign` | `ResponsiveValue<string>` | CSS vertical-align |
| `overflow` | `ResponsiveValue<string>` | CSS overflow |
| `overflowX` | `ResponsiveValue<string>` | CSS overflow-x |
| `overflowY` | `ResponsiveValue<string>` | CSS overflow-y |

#### Position Props
| Prop | Type | Description |
|------|------|-------------|
| `position` | `ResponsiveValue<string>` | CSS position |
| `zIndex` | `ResponsiveValue<number>` | CSS z-index |
| `top` | `ResponsiveValue<string \| number>` | CSS top |
| `right` | `ResponsiveValue<string \| number>` | CSS right |
| `bottom` | `ResponsiveValue<string \| number>` | CSS bottom |
| `left` | `ResponsiveValue<string \| number>` | CSS left |

#### Flexbox Props
| Prop | Type | Description |
|------|------|-------------|
| `alignItems` | `ResponsiveValue<string>` | CSS align-items |
| `alignContent` | `ResponsiveValue<string>` | CSS align-content |
| `justifyItems` | `ResponsiveValue<string>` | CSS justify-items |
| `justifyContent` | `ResponsiveValue<string>` | CSS justify-content |
| `flexWrap` | `ResponsiveValue<string>` | CSS flex-wrap |
| `flexDirection` | `ResponsiveValue<string>` | CSS flex-direction |
| `flex` | `ResponsiveValue<string \| number>` | CSS flex shorthand |
| `flexGrow` | `ResponsiveValue<number>` | CSS flex-grow |
| `flexShrink` | `ResponsiveValue<number>` | CSS flex-shrink |
| `flexBasis` | `ResponsiveValue<string \| number>` | CSS flex-basis |
| `justifySelf` | `ResponsiveValue<string>` | CSS justify-self |
| `alignSelf` | `ResponsiveValue<string>` | CSS align-self |
| `order` | `ResponsiveValue<number>` | CSS order |

#### Grid Props
| Prop | Type | Description |
|------|------|-------------|
| `gridGap` | `ResponsiveValue<string \| number>` | CSS grid-gap |
| `gridColumnGap` | `ResponsiveValue<string \| number>` | CSS grid-column-gap |
| `gridRowGap` | `ResponsiveValue<string \| number>` | CSS grid-row-gap |
| `gridColumn` | `ResponsiveValue<string>` | CSS grid-column |
| `gridRow` | `ResponsiveValue<string>` | CSS grid-row |
| `gridAutoFlow` | `ResponsiveValue<string>` | CSS grid-auto-flow |
| `gridAutoColumns` | `ResponsiveValue<string>` | CSS grid-auto-columns |
| `gridAutoRows` | `ResponsiveValue<string>` | CSS grid-auto-rows |
| `gridTemplateColumns` | `ResponsiveValue<string>` | CSS grid-template-columns |
| `gridTemplateRows` | `ResponsiveValue<string>` | CSS grid-template-rows |
| `gridTemplateAreas` | `ResponsiveValue<string>` | CSS grid-template-areas |
| `gridArea` | `ResponsiveValue<string>` | CSS grid-area |

#### Border Props
| Prop | Type | Description |
|------|------|-------------|
| `border` | `ResponsiveValue<string>` | CSS border |
| `borderWidth` | `ResponsiveValue<string \| number>` | CSS border-width |
| `borderStyle` | `ResponsiveValue<string>` | CSS border-style |
| `borderColor` | `ResponsiveValue<string>` | CSS border-color |
| `borderRadius` | `ResponsiveValue<string \| number>` | CSS border-radius |
| `borderTop` | `ResponsiveValue<string>` | CSS border-top |
| `borderRight` | `ResponsiveValue<string>` | CSS border-right |
| `borderBottom` | `ResponsiveValue<string>` | CSS border-bottom |
| `borderLeft` | `ResponsiveValue<string>` | CSS border-left |

#### Shadow Props
| Prop | Type | Description |
|------|------|-------------|
| `boxShadow` | `ResponsiveValue<string>` | CSS box-shadow |

**⚠️ Note:** Box does NOT support `textShadow` prop. Use Text component for text shadows.

## Theme Integration

### Available Aliases

#### Space Aliases
- `mini` - 4px
- `xs` - 8px  
- `s` - 12px
- `m` - 16px
- `l` - 24px
- `xl` - 32px
- `xxl` - 48px
- `xxxl` - 64px

#### Shape Aliases
- `square` - 0px
- `roundedSmall` - 4px
- `rounded` - 8px
- `roundedLarge` - 16px
- `pill` - 32px
- `circle` - 50%

#### Available Skins

**Surface Skins:**
- `base` - Primary background surface
- `surface` - Secondary surface, slightly elevated
- `panel` - Panel background for grouping content
- `card` - Card surface with subtle elevation
- `overlay` - Overlay surface for modals/dropdowns

**Semantic Skins:**
- `primary` - Primary brand color treatment
- `accent` - Accent brand color treatment
- `neutral` - Neutral color treatment
- `highlight` - Focus/active state treatment
- `error` - Error state with red coloring
- `success` - Success state with green coloring
- `warning` - Warning state with yellow coloring

**Special Effect Skins:**
- `transparent` - Fully transparent background
- `translucent` - Backdrop blur effect with transparency

**Color Pair Skins:**
- `red`, `blue`, `green`, `yellow`, `purple`, `pink`, `orange`, `teal`, `gray`

## Examples

### Basic Container

```jsx
<Box p="m" bg="surface" shape="rounded">
  <Text>Basic container with padding and background</Text>
</Box>
```

### Using Color Prop

```jsx
<Box p="m" bg="surface" color="primary">
  Direct text content will inherit this color
</Box>

{/* Better practice: use Text for semantic elements */}
<Box p="m" bg="surface">
  <Text color="primary">Styled text content</Text>
</Box>
```

### Flexbox Layout

```jsx
<Box display="flex" gap="s" alignItems="center" justifyContent="space-between">
  <Box>
    <Text>Left content</Text>
  </Box>
  <Box>
    <Text>Right content</Text>
  </Box>
</Box>
```

### Grid Layout

```jsx
<Box 
  display="grid" 
  gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
  gap="m"
>
  <Box skin="card" p="s">
    <Text>Grid item 1</Text>
  </Box>
  <Box skin="card" p="s">
    <Text>Grid item 2</Text>
  </Box>
  <Box skin="card" p="s">
    <Text>Grid item 3</Text>
  </Box>
</Box>
```

### Responsive Design

```jsx
<Box 
  width={[1, 1/2, 1/3]}  // 100% mobile, 50% tablet, 33% desktop
  p={['xs', 's', 'm']}   // 8px, 12px, 16px padding
  display={['block', 'flex']}  // block on mobile, flex on larger screens
>
  <Text>Responsive content</Text>
</Box>
```

### Interactive States

```jsx
<Box
  skin="card"
  p="m"
  cursor="pointer"
  hover="subtle"
  focus="highlight"
  interactive={{
    hover: { transform: 'translateY(-2px)' },
    focus: { outline: '2px solid', outlineColor: 'primary' }
  }}
>
  <Text>Interactive card</Text>
</Box>
```

### Skin Examples

```jsx
{/* Surface treatments */}
<Box skin="base" p="m" mb="s">
  <Text>Base surface</Text>
</Box>

<Box skin="card" p="m" mb="s">
  <Text>Card surface with elevation</Text>
</Box>

{/* Semantic states */}
<Box skin="success" p="s" mb="s">
  <Text>Success state</Text>
</Box>

<Box skin="warning" p="s" mb="s">
  <Text>Warning state</Text>
</Box>

{/* Color coding */}
<Box skin="blue" p="xs" mb="mini">
  <Text>Blue category</Text>
</Box>
```

## Best Practices

### ✅ Do

```jsx
// Use Box for layout containers
<Box display="flex" flexDirection="column" gap="m">
  <Text as="h2">Section Title</Text>
  <Text as="p">Content</Text>
</Box>

// Use theme aliases
<Box p="m" gap="s" skin="card" />

// Use appropriate skins for semantic meaning
<Box skin="error" p="s">
  <Text>Error message</Text>
</Box>
```

### ❌ Don't

```jsx
// Don't use Box as semantic text elements without Text
<Box as="h1">Title</Box>  // Wrong! Use Text instead

// Don't use arbitrary values
<Box p="16px" m="8px" />  // Wrong!

// Don't use indices instead of aliases
<Box p={5} gap={4} />  // Wrong!
```

## TypeScript

```tsx
import { BoxProps } from '@reactberry/system/elements';

interface MyComponentProps extends BoxProps {
  customProp?: string;
}

function MyComponent({ customProp, ...boxProps }: MyComponentProps) {
  return (
    <Box {...boxProps}>
      <Text>{customProp}</Text>
    </Box>
  );
}
```

## Related Components

- **[Text](./Text.md)** - Use for all text content and semantic HTML elements
- **[Button](./Button.md)** - Use for interactive button elements
- **[Field](./Field.md)** - Use for form input elements

## Migration Notes

If you're migrating from other component libraries:

- Replace `div` elements with `Box` for styled containers
- Use theme aliases instead of hardcoded values
- Leverage the skin system for consistent styling
- Ensure semantic HTML elements use `Text` component instead of `Box`
