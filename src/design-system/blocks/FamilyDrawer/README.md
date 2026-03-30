# FamilyDrawer Component

A sophisticated drawer component with multiple animated views, perfect for wallet management interfaces or any multi-step configuration flow.

## Features

- **Multi-view Navigation**: Seamlessly switch between different views (default, key, phrase, remove)
- **Smooth Animations**: Height-based animations with blur effects during transitions
- **Design System Integration**: Built using the existing Drawer component and design system elements
- **Customizable**: Custom trigger buttons, widths, and callbacks
- **Accessible**: Proper ARIA labels and keyboard navigation support

## Usage

### Basic Usage

```tsx
import { FamilyDrawer } from "@/design-system/blocks";

function MyComponent() {
  return (
    <FamilyDrawer id="wallet-settings" />
  );
}
```

### Advanced Usage

```tsx
import { FamilyDrawer } from "@/design-system/blocks";
import { Button, Text } from "@/design-system/elements";

function MyComponent() {
  const handleViewChange = (view) => {
    console.log("Current view:", view);
  };

  return (
    <FamilyDrawer
      id="wallet-settings"
      initialView="default"
      width="400px"
      onViewChange={handleViewChange}
      trigger={
        <Button variant="primary" $size="medium">
          <Text>Custom Trigger</Text>
        </Button>
      }
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | **Required** | Unique identifier for the drawer |
| `initialView` | `FamilyDrawerView` | `"default"` | Initial view to display |
| `trigger` | `React.ReactNode` | Default settings button | Custom trigger element |
| `onViewChange` | `(view: FamilyDrawerView) => void` | `undefined` | Callback when view changes |
| `width` | `string \| number \| object` | `"360px"` | Drawer width (responsive object supported) |

## Views

The component includes four built-in views:

1. **Default View** (`"default"`): Main options menu with navigation buttons
2. **Key View** (`"key"`): Private key management with security warnings
3. **Phrase View** (`"phrase"`): Recovery phrase management with security warnings  
4. **Remove View** (`"remove"`): Wallet removal confirmation with warnings

## Customization

### Custom Trigger

```tsx
<FamilyDrawer
  id="custom-drawer"
  trigger={
    <Button variant="ghost" $size="small">
      <IconGear size="1rem" />
      Options
    </Button>
  }
/>
```

### Responsive Width

```tsx
<FamilyDrawer
  id="responsive-drawer"
  width={{ _: "100%", md: "400px" }}
/>
```

## Animation Details

- **Height Animation**: Smooth height transitions using Framer Motion
- **View Transitions**: Blur and scale effects during view changes
- **Timing**: 270ms duration with custom easing curves
- **Performance**: Uses `react-use-measure` for efficient dimension tracking

## Dependencies

- `motion/react` (Framer Motion)
- `react-use-measure`
- Design system components (Box, Button, Text, Drawer)
- Icon components from the project's icon library

## Related Components

- [Drawer](../Drawer/README.md) - Base drawer component
- [Modal](../Modal/README.md) - Alternative overlay component
- [Popover](../Popover/README.md) - Lightweight overlay component
