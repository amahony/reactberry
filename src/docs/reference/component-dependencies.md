# Component Dependency Graph

**Purpose:** Understand component relationships and dependencies for correct usage

## 📊 Component Hierarchy

### Element Dependencies (Core Building Blocks)

```
Box (base element)
├── Text (extends Box + typography)
│   ├── Button (extends Text + interaction)
│   └── Field (extends Text + form capabilities)
└── [Used by all blocks]
```

**Key Points:**
- **Box** is the foundation - all components ultimately depend on it
- **Text** extends Box and adds typography capabilities
- **Button** and **Field** extend Text for specialized use cases
- All **blocks** compose these elements

---

## 🧩 Block Dependencies

### Layout Blocks

| Block | Dependencies | Purpose |
|-------|-------------|---------|
| `Container` | Box | Max-width page container |
| `Main` | Box | Main content wrapper |
| `Group` | Box | Flex grouping container |
| `Collection` | Box | Grid collection container |
| `ScrollContainer` | Box | Custom scrollable area |
| `HorizontalScroller` | Box | Horizontal scroll container |
| `Divider` | Box | Visual separator |

**Usage Pattern:**
```tsx
import { Container, Group } from '@reactberry/system/blocks';
import { Text, Button } from '@reactberry/system/elements';

<Container>
  <Group gap="m" alignItems="center">
    <Text as="h1" fontSize="xl">Title</Text>
    <Button variant="primary" $size="medium">Action</Button>
  </Group>
</Container>
```

---

### Typography Blocks

| Block | Dependencies | Purpose |
|-------|-------------|---------|
| `Heading` | Text | Styled heading component |
| `ShinyText` | Text, Box | Animated gradient text |
| `TextBreak` | Text | Text with line breaks |

**Usage Pattern:**
```tsx
import { Heading } from '@reactberry/system/blocks';
import { Text } from '@reactberry/system/elements';

<Heading level={1}>
  Main Title
</Heading>
<Text as="p" fontSize="m">
  Body content
</Text>
```

---

### Display Blocks

| Block | Dependencies | Purpose |
|-------|-------------|---------|
| `Avatar` | Box, Text | User profile images |
| `Icon` | Box | Icon wrapper |
| `Tag` | Box, Text | Label/badge component |
| `Skeleton` | Box | Loading skeleton |
| `Placeholder` | Box, Text | Empty state placeholder |
| `Thumbnail` | Box | Image thumbnail |
| `Indicator` | Box | Status indicator dot |

**Usage Pattern:**
```tsx
import { Avatar, Tag } from '@reactberry/system/blocks';
import { Box, Text } from '@reactberry/system/elements';

<Box display="flex" gap="s" alignItems="center">
  <Avatar src="/user.jpg" alt="User" />
  <Box>
    <Text as="span" fontWeight="bold">John Doe</Text>
    <Tag variant="success">Active</Tag>
  </Box>
</Box>
```

---

### Interactive Blocks

| Block | Dependencies | Purpose |
|-------|-------------|---------|
| `Switch` | Box, Button | Toggle switch |
| `Tooltip` | Box, Text | Hover tooltip |
| `Popover` | Box, Text, Button | Popover overlay |
| `Menu` / `MenuItem` | Box, Text, Button | Dropdown menu |
| `Accordion` | Box, Text, Button | Collapsible sections |
| `Drawer` | Box, Text, Button | Slide-out drawer |

**Usage Pattern:**
```tsx
import { Menu, MenuItem, Tooltip } from '@reactberry/system/blocks';
import { Button, Text } from '@reactberry/system/elements';

<Menu>
  <MenuItem>
    <Tooltip content="Open settings">
      <Button variant="ghost" $size="small">
        Settings
      </Button>
    </Tooltip>
  </MenuItem>
</Menu>
```

---

### Form Blocks

| Block | Dependencies | Purpose |
|-------|-------------|---------|
| `FieldSet` | Box, Field, Text | Grouped form fields |
| `Controls` | Box, Button | Form action buttons |
| `InlineEditor` | Box, Field, Text, Button | Inline editing |
| `Upload` | Box, Field, Text, Button | File upload |

**Usage Pattern:**
```tsx
import { FieldSet, Controls } from '@reactberry/system/blocks';
import { Field, Text, Button } from '@reactberry/system/elements';

<form>
  <FieldSet legend="Personal Information">
    <Box gap="m">
      <Field as="input" type="text" $size="medium" />
      <Field as="input" type="email" $size="medium" />
    </Box>
  </FieldSet>
  
  <Controls>
    <Button variant="ghost" $size="medium">Cancel</Button>
    <Button variant="primary" $size="medium" type="submit">Save</Button>
  </Controls>
</form>
```

---

### Data Display Blocks

| Block | Dependencies | Purpose |
|-------|-------------|---------|
| `Table` / `TableRow` / `TableCell` | Box, Text | Data tables |
| `List` | Box, Text | Styled lists |
| `Progress` | Box, Text | Progress bars |
| `Steps` | Box, Text, Button | Step indicators |
| `Pagination` | Box, Button, Text | Pagination controls |

**Usage Pattern:**
```tsx
import { Table, TableRow, TableCell } from '@reactberry/system/blocks';
import { Text } from '@reactberry/system/elements';

<Table>
  <TableRow>
    <TableCell>
      <Text fontWeight="bold">Name</Text>
    </TableCell>
    <TableCell>
      <Text fontWeight="bold">Email</Text>
    </TableCell>
  </TableRow>
</Table>
```

---

### Animation Blocks

| Block | Dependencies | Purpose |
|-------|-------------|---------|
| `Fader` | Box | Fade in/out animation |
| `Marquee` | Box, Text | Scrolling text |
| `Ticker` | Box, Text | Number ticker |
| `CyclingNumber` | Text | Animated number |
| `AnimatedCarousel` | Box | Animated carousel |
| `Slideshow` | Box | Image slideshow |
| `Slider` | Box | Content slider |
| `Parallax` | Box | Parallax effect |
| `Spotlight` | Box | Spotlight effect |

**Usage Pattern:**
```tsx
import { Fader, Ticker } from '@reactberry/system/blocks';
import { Text, Box } from '@reactberry/system/elements';

<Fader>
  <Box skin="card" p="m">
    <Text as="h3" fontSize="l">Revenue</Text>
    <Ticker value={42000} prefix="$" />
  </Box>
</Fader>
```

---

### Utility Blocks

| Block | Dependencies | Purpose |
|-------|-------------|---------|
| `Await` | Box, Text | Async content wrapper |
| `RenderAsset` | Box | Asset rendering |
| `Underlay` | Box | Background overlay |
| `DisplaySet` | Box | Display set container |
| `SystemNotice` | Box, Text, Button | System notifications |

**Usage Pattern:**
```tsx
import { Await } from '@reactberry/system/blocks';
import { Box, Text } from '@reactberry/system/elements';

<Await promise={fetchData()}>
  {(data) => (
    <Box>
      <Text as="p">{data.message}</Text>
    </Box>
  )}
</Await>
```

---

## 🔄 Dependency Flow

### When Building UI Components

```
Your Component
    ↓
Uses Blocks (if needed)
    ↓
Blocks compose Elements
    ↓
Elements extend Box/Text
    ↓
Theme provides tokens
```

**Decision Flow:**

1. **Start simple** - Use elements (Box, Text, Button, Field)
2. **Check blocks** - See if a block exists for your pattern
3. **Compose** - Build complex UIs by combining components
4. **Create block** - If pattern is reusable, create a new block

---

## 📦 Import Dependencies

### Minimal Imports (Most Common)

```tsx
// For basic layouts
import { Box, Text } from '@reactberry/system/elements';

// For forms
import { Box, Text, Field, Button } from '@reactberry/system/elements';

// For interactive UI
import { Box, Text, Button } from '@reactberry/system/elements';
import { Menu, Tooltip } from '@reactberry/system/blocks';
```

### Complete Imports (Complex UIs)

```tsx
// Full elements
import { Box, Text, Button, Field } from '@reactberry/system/elements';

// Specific blocks
import { 
  Avatar, 
  Menu, 
  MenuItem,
  Table,
  TableRow,
  TableCell,
  Tooltip 
} from '@reactberry/system/blocks';
```

---

## 🎯 When to Use What

### I Need... → Use This

| Need | Component(s) | Dependencies |
|------|-------------|--------------|
| Layout container | `Box` | None (base) |
| Text content | `Text` | Box |
| Click action | `Button` | Text, Box |
| Form input | `Field` | Text, Box |
| User profile | `Avatar` | Box, Text |
| Dropdown menu | `Menu`, `MenuItem` | Box, Text, Button |
| Data table | `Table` components | Box, Text |
| Help tooltip | `Tooltip` | Box, Text |
| Form section | `FieldSet` | Box, Field, Text |
| Action buttons | `Controls` | Box, Button |
| Loading state | `Skeleton` | Box |
| Empty state | `Placeholder` | Box, Text |

---

## 🔗 Circular Dependencies (Avoid These)

### ❌ Don't Do This

```tsx
// MyBlock.tsx
import { AnotherBlock } from './AnotherBlock';
import { Box } from '@reactberry/system/elements';

// AnotherBlock.tsx
import { MyBlock } from './MyBlock'; // ❌ Circular dependency!
```

### ✅ Do This Instead

```tsx
// Both blocks should depend on elements only
// MyBlock.tsx
import { Box, Text } from '@reactberry/system/elements';

// AnotherBlock.tsx
import { Box, Text } from '@reactberry/system/elements';

// Compose them in your application code
// App.tsx
import { MyBlock } from './MyBlock';
import { AnotherBlock } from './AnotherBlock';

<Box>
  <MyBlock />
  <AnotherBlock />
</Box>
```

---

## 🧪 Dependency Testing

### Check Component Dependencies

```tsx
// ✅ GOOD - Single direction dependency
Elements → Blocks → Application

// ❌ BAD - Circular dependencies
Elements ↔ Blocks
Blocks ↔ Application
```

### Verify Import Paths

```tsx
// ✅ CORRECT - Import from package entries
import { Box, Text } from '@reactberry/system/elements';
import { Avatar } from '@reactberry/system/blocks';

// ❌ WRONG - Direct file imports (may cause issues)
import Box from '@reactberry/system/elements';
import Avatar from '@reactberry/system/blocks/Avatar/index';
```

---

## 📚 Related Documentation

- [Component Selection Decision Tree](../decision-trees/component-selection.md)
- [Blocks Overview](../blocks.md)
- [Elements Documentation](../elements.md)
- [Getting Started Guide](../guides/getting-started.md)

---

**Dependency Principles:**

1. **Elements** have no internal dependencies (except Box extends nothing, Text extends Box)
2. **Blocks** only depend on Elements (never on other Blocks)
3. **Applications** can depend on both Elements and Blocks
4. **No circular dependencies** - always one-way dependency flow
5. **Import from package entries** - not direct file paths

---

**Last Updated:** 2025-01-09
**Maintainer:** Design System Team