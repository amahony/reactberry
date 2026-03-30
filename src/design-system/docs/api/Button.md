# Button Component API Reference

The `Button` component extends `Text` with interactive button functionality, providing consistent styling and behavior for all button elements.

## Overview

Button is designed for all interactive actions and extends the Text component with button-specific features. It provides multiple variants, sizes, and states while maintaining full accessibility support.

## Import

```jsx
import { Button } from '@/design-system/elements';
```

## Basic Usage

```jsx
<Button variant="primary" $size="medium" onClick={handleClick}>
  Click Me
</Button>
```

## Props

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Button content to render |
| `onClick` | `(event: React.MouseEvent) => void` | - | Click event handler |
| `type` | `"button" \| "submit" \| "reset"` | `"button"` | Button type attribute |
| `disabled` | `boolean` | `false` | Disabled state |
| `loading` | `boolean` | `false` | Loading state with spinner |

**Inherits all [Text props](./Text.md) for typography and styling.**

### Button-Specific Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `string` | `"default"` | Button style variant from `theme.skins.button` |
| `$size` | `string` | `"medium"` | Button size variant from `theme.skins.button.sizes` |
| `fullWidth` | `boolean` | `false` | Make button full width |
| `icon` | `React.ReactNode` | - | Icon element to display |
| `iconPosition` | `"left" \| "right"` | `"left"` | Icon position relative to text |

### Default Attributes

The Button component automatically applies these attributes:

- `role="button"` - ARIA button role
- `tabIndex={0}` - Keyboard navigation
- `cursor="pointer"` - Pointer cursor (when not disabled)
- `border="none"` - Remove default border
- `display="inline-flex"` - Flex container
- `alignItems="center"` - Vertical center alignment
- `justifyContent="center"` - Horizontal center alignment
- `shape="rounded"` - Default border radius
- `transition="all 0.2s ease"` - Smooth transitions

## Available Variants

### Primary Variants
- `primary` - Main action button with brand colors
- `secondary` - Secondary action with subtle styling
- `outline` - Outlined button with transparent background
- `ghost` - Minimal styling with hover states
- `subtle` - Light background with minimal contrast

### Semantic Variants
- `success` - Success state with green coloring
- `warning` - Warning state with yellow coloring
- `error` / `danger` - Error state with red coloring
- `info` - Information state with blue coloring

### Special Variants
- `clean` - No styling, transparent background
- `bubble` - Rounded bubble style
- `cta` - Call-to-action with enhanced styling
- `link` - Link-style button

## Available Sizes

| Size | Height | Padding | Font Size | Font Weight |
|------|--------|---------|-----------|-------------|
| `xxsmall` | 32px | 4px 8px | 12px | 700 |
| `xsmall` | 36px | 6px 12px | 14px | 600 |
| `small` | 40px | 8px 16px | 14px | 500 |
| `medium` | 44px | 12px 20px | 16px | 600 |
| `large` | 48px | 16px 24px | 16px | 600 |
| `xlarge` | 52px | 20px 28px | 18px | 600 |

## Examples

### Basic Button Variants

```jsx
{/* Primary actions */}
<Button variant="primary" $size="medium">
  Save Changes
</Button>

{/* Secondary actions */}
<Button variant="secondary" $size="medium">
  Cancel
</Button>

{/* Outline style */}
<Button variant="outline" $size="medium">
  Learn More
</Button>

{/* Ghost style */}
<Button variant="ghost" $size="medium">
  Skip
</Button>
```

### Button Sizes

```jsx
{/* Different sizes */}
<Button variant="primary" $size="xxsmall">Extra Small</Button>
<Button variant="primary" $size="xsmall">Small</Button>
<Button variant="primary" $size="small">Small</Button>
<Button variant="primary" $size="medium">Medium</Button>
<Button variant="primary" $size="large">Large</Button>
<Button variant="primary" $size="xlarge">Extra Large</Button>
```

### Semantic Variants

```jsx
{/* Success actions */}
<Button variant="success" $size="medium">
  Approve
</Button>

{/* Warning actions */}
<Button variant="warning" $size="medium">
  Proceed with Caution
</Button>

{/* Error/Danger actions */}
<Button variant="danger" $size="medium">
  Delete Account
</Button>

{/* Info actions */}
<Button variant="info" $size="medium">
  Learn More
</Button>
```

### Buttons with Icons

```jsx
{/* Icon on the left (default) */}
<Button variant="primary" $size="medium" icon={<Icon name="plus" />}>
  Add Item
</Button>

{/* Icon on the right */}
<Button variant="outline" $size="medium" icon={<Icon name="arrow-right" />} iconPosition="right">
  Continue
</Button>

{/* Icon only */}
<Button variant="ghost" $size="medium" aria-label="Settings">
  <Icon name="settings" />
</Button>
```

### Button States

```jsx
{/* Disabled state */}
<Button variant="primary" $size="medium" disabled>
  Disabled Button
</Button>

{/* Loading state */}
<Button variant="primary" $size="medium" loading>
  Loading...
</Button>

{/* Full width */}
<Button variant="primary" $size="medium" fullWidth>
  Full Width Button
</Button>
```

### Form Buttons

```jsx
{/* Form submission */}
<Button type="submit" variant="primary" $size="medium">
  Submit Form
</Button>

{/* Form reset */}
<Button type="reset" variant="outline" $size="medium">
  Reset Form
</Button>

{/* Regular button (default) */}
<Button type="button" variant="ghost" $size="medium">
  Cancel
</Button>
```

### Advanced Styling

```jsx
{/* Custom colors */}
<Button variant="primary" $size="medium" bg="purple" hover="purple.dark">
  Custom Colors
</Button>

{/* Custom spacing */}
<Button variant="outline" $size="medium" px="xl" py="s">
  Custom Spacing
</Button>

{/* Custom typography */}
<Button variant="ghost" $size="medium" fontSize="s" fontWeight="normal">
  Custom Typography
</Button>
```

## Interactive States

### Hover States

```jsx
{/* Custom hover styling */}
<Button
  variant="outline"
  $size="medium"
  hover="primary"
  interactive={{
    hover: { 
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    }
  }}
>
  Hover Effect
</Button>
```

### Focus States

```jsx
{/* Enhanced focus styling */}
<Button
  variant="primary"
  $size="medium"
  focus="highlight"
  interactive={{
    focus: { 
      outline: '2px solid',
      outlineColor: 'palette.brands.5',
      outlineOffset: '2px'
    }
  }}
>
  Focus Styling
</Button>
```

### Active States

```jsx
{/* Custom active styling */}
<Button
  variant="primary"
  $size="medium"
  interactive={{
    active: { 
      transform: 'scale(0.98)',
      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
    }
  }}
>
  Active Effect
</Button>
```

## Responsive Design

```jsx
{/* Responsive sizes */}
<Button 
  variant="primary" 
  $size={['small', 'medium', 'large']}
>
  Responsive Size
</Button>

{/* Responsive full width */}
<Button 
  variant="primary" 
  $size="medium"
  fullWidth={[true, false]}
>
  Full Width on Mobile
</Button>

{/* Responsive variants */}
<Button 
  variant={['outline', 'primary']}
  $size="medium"
>
  Responsive Variant
</Button>
```

## Accessibility

### ARIA Attributes

```jsx
{/* Button with ARIA label */}
<Button variant="ghost" $size="medium" aria-label="Close dialog">
  <Icon name="close" />
</Button>

{/* Button with ARIA description */}
<Button 
  variant="danger" 
  $size="medium"
  aria-describedby="delete-warning"
>
  Delete Account
</Button>
<Text id="delete-warning" fontSize="xs" color="secondary">
  This action cannot be undone
</Text>
```

### Keyboard Navigation

```jsx
{/* Button with keyboard handler */}
<Button
  variant="primary"
  $size="medium"
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleAction();
    }
  }}
>
  Keyboard Accessible
</Button>
```

### Loading States

```jsx
{/* Accessible loading button */}
<Button 
  variant="primary" 
  $size="medium" 
  loading={isLoading}
  disabled={isLoading}
  aria-label={isLoading ? 'Loading...' : 'Submit'}
>
  {isLoading ? 'Loading...' : 'Submit'}
</Button>
```

## Common Patterns

### Button Groups

```jsx
<Box display="flex" gap="s" alignItems="center">
  <Button variant="outline" $size="medium">
    Cancel
  </Button>
  <Button variant="primary" $size="medium">
    Save
  </Button>
</Box>
```

### Toggle Buttons

```jsx
<Button
  variant={isActive ? 'primary' : 'outline'}
  $size="medium"
  onClick={() => setIsActive(!isActive)}
  aria-pressed={isActive}
>
  {isActive ? 'Active' : 'Inactive'}
</Button>
```

### Dropdown Trigger

```jsx
<Button variant="outline" $size="medium" icon={<Icon name="chevron-down" />} iconPosition="right">
  Options
</Button>
```

### Icon Buttons

```jsx
{/* Square icon button */}
<Button
  variant="ghost"
  $size="medium"
  shape="square"
  width="44px"
  height="44px"
  aria-label="Edit"
>
  <Icon name="edit" />
</Button>

{/* Circular icon button */}
<Button
  variant="primary"
  $size="medium"
  shape="circle"
  width="44px"
  height="44px"
  aria-label="Add"
>
  <Icon name="plus" />
</Button>
```

## Best Practices

### ✅ Do

```jsx
// Use appropriate variants for context
<Button variant="primary" $size="medium">Primary Action</Button>
<Button variant="danger" $size="medium">Delete</Button>

// Use semantic HTML and ARIA
<Button type="submit" variant="primary">Submit Form</Button>
<Button aria-label="Close" variant="ghost">×</Button>

// Use consistent sizing
<Box display="flex" gap="s">
  <Button variant="outline" $size="medium">Cancel</Button>
  <Button variant="primary" $size="medium">Save</Button>
</Box>
```

### ❌ Don't

```jsx
// Don't use Box for buttons
<Box as="button" onClick={handleClick}>Wrong</Box>

// Don't mix different sizes in groups
<Box display="flex" gap="s">
  <Button $size="small">Cancel</Button>
  <Button $size="large">Save</Button>
</Box>

// Don't use buttons for navigation
<Button onClick={() => navigate('/page')}>Go to Page</Button>
// Use Link instead: <Link href="/page">Go to Page</Link>
```

## TypeScript

```tsx
import { ButtonProps } from '@/design-system/elements';

interface CustomButtonProps extends ButtonProps {
  loading?: boolean;
  icon?: React.ReactNode;
}

function CustomButton({ loading, icon, children, ...buttonProps }: CustomButtonProps) {
  return (
    <Button {...buttonProps} disabled={loading}>
      {loading ? <Spinner size="small" /> : icon}
      {children}
    </Button>
  );
}
```

## Related Components

- **[Text](./Text.md)** - Button extends Text with interactive functionality
- **[Field](./Field.md)** - Use for form inputs and text entry
- **[Box](./Box.md)** - Use for layout containers and non-interactive elements

## Migration Notes

When migrating to the Button component:

- Replace `<button>` elements with `<Button>` component
- Use `variant` prop instead of custom CSS classes
- Use `$size` prop for consistent sizing
- Add appropriate ARIA attributes for accessibility
- Use semantic `type` attributes for form buttons