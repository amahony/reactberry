# Component Selection Decision Tree

**Purpose:** Quick reference to choose the correct component for any UI element

## 🎯 Start Here: What am I building?

Follow this decision tree to select the right component every time.

---

## 1️⃣ Is it TEXT CONTENT?

### ✅ YES → Use `Text` component

Text is for **any content that is readable text**, including:
- Headings (h1-h6)
- Paragraphs
- Labels
- Links
- Inline text
- Any typography

#### Choose the right semantic HTML:

| Content Type | Use This | Example |
|-------------|----------|---------|
| Page title | `<Text as="h1">` | `<Text as="h1" fontSize="xxl" fontWeight="bold">Dashboard</Text>` |
| Section heading | `<Text as="h2">` to `<Text as="h6">` | `<Text as="h2" fontSize="xl">Overview</Text>` |
| Paragraph | `<Text as="p">` | `<Text as="p" fontSize="m" lineHeight="relaxed">Content here</Text>` |
| Form label | `<Text as="label">` | `<Text as="label" htmlFor="email" fontSize="s">Email Address</Text>` |
| Link | `<Text as="a">` | `<Text as="a" href="/about" color="primary">About Us</Text>` |
| Inline text | `<Text as="span">` | `<Text as="span" fontWeight="bold">Important</Text>` |

**Critical Rules:**
- ✅ ALWAYS set the `as` prop for semantic HTML
- ✅ Use `fontSize` for text size (not `size`)
- ✅ Use theme tokens for all props
- ❌ NEVER use Box for text content

```tsx
// ✅ CORRECT
<Text as="h1" fontSize="xl" fontWeight="bold">
  Welcome to PocketAgent
</Text>

// ❌ WRONG - Box doesn't support typography
<Box as="h1" fontSize="xl">
  Welcome to PocketAgent
</Box>
```

### ❌ NO → Continue to next question...

---

## 2️⃣ Is it a CLICKABLE ACTION?

### ✅ YES → Use `Button` component

Button is for **interactive actions that trigger behavior**, including:
- Primary calls-to-action (CTAs)
- Form submissions
- Secondary actions
- Icon buttons
- Menu triggers

#### Choose the right variant:

| Action Type | Variant | Example |
|------------|---------|---------|
| Primary CTA | `variant="primary"` | `<Button variant="primary" $size="medium">Get Started</Button>` |
| Secondary action | `variant="secondary"` | `<Button variant="secondary" $size="medium">Learn More</Button>` |
| Subtle action | `variant="ghost"` | `<Button variant="ghost" $size="small">Cancel</Button>` |
| Outlined | `variant="outline"` | `<Button variant="outline" $size="medium">Details</Button>` |

**CRITICAL: Button uses `$size` NOT `size`**

```tsx
// ✅ CORRECT - Use $size with $ prefix
<Button variant="primary" $size="medium" onClick={handleClick}>
  Click Me
</Button>

// ❌ WRONG - Missing $ prefix (most common mistake!)
<Button variant="primary" size="medium">
  Click Me
</Button>
```

**When NOT to use Button:**
- Navigation links → Use `<Text as="a" href="...">`
- Non-interactive elements → Use `Box` or `Text`

### ❌ NO → Continue to next question...

---

## 3️⃣ Is it a FORM INPUT?

### ✅ YES → Use `Field` component

Field is for **user data entry**, including:
- Text inputs
- Email/password inputs
- Textareas
- Select dropdowns
- Number inputs
- Date/time pickers

#### Choose the right field type:

| Input Type | Configuration | Example |
|-----------|---------------|---------|
| Text input | `as="input" type="text"` | `<Field as="input" type="text" variant="outline" $size="medium" />` |
| Email | `as="input" type="email"` | `<Field as="input" type="email" variant="outline" $size="medium" />` |
| Password | `as="input" type="password"` | `<Field as="input" type="password" variant="outline" $size="medium" />` |
| Multi-line | `as="textarea"` | `<Field as="textarea" variant="outline" $size="medium" rows={4} />` |
| Dropdown | `as="select"` | `<Field as="select" variant="outline" $size="medium"><option>...</option></Field>` |
| Number | `as="input" type="number"` | `<Field as="input" type="number" variant="outline" $size="medium" />` |

**CRITICAL: Field uses `$size` NOT `size`**

```tsx
// ✅ CORRECT - Use $size with $ prefix
<Field 
  as="input" 
  type="email" 
  variant="outline" 
  $size="medium"
  placeholder="Enter email"
/>

// ❌ WRONG - Missing $ prefix (most common mistake!)
<Field 
  as="input" 
  type="email" 
  variant="outline" 
  size="medium"
/>
```

**Required Pattern: Label + Field**

Always connect labels to inputs:

```tsx
// ✅ CORRECT - Connected with htmlFor/id
<Box gap="xs">
  <Text as="label" htmlFor="email" fontSize="s" fontWeight="medium">
    Email Address
  </Text>
  <Field 
    id="email"
    as="input" 
    type="email" 
    variant="outline" 
    $size="medium"
  />
</Box>

// ❌ WRONG - No connection between label and input
<Text as="label">Email Address</Text>
<Field as="input" type="email" />
```

### ❌ NO → Continue to next question...

---

## 4️⃣ Is it a CONTAINER or LAYOUT?

### ✅ YES → Use `Box` component

Box is for **structure and layout** (NOT text), including:
- Flex containers
- Grid layouts
- Card wrappers
- Spacing/padding containers
- Background containers
- Any non-text structural element

#### Choose the right layout:

| Layout Type | Configuration | Example |
|------------|---------------|---------|
| Flex row | `display="flex"` | `<Box display="flex" gap="m" alignItems="center">` |
| Flex column | `display="flex" flexDirection="column"` | `<Box display="flex" flexDirection="column" gap="s">` |
| Grid | `display="grid"` | `<Box display="grid" gridTemplateColumns="1fr 1fr" gap="m">` |
| Card | `skin="card"` | `<Box skin="card" p="m" shape="rounded">` |
| Spacer | `p="..."` or `m="..."` | `<Box p="l" m="m">` |

**Box uses `size` NOT `$size`**

```tsx
// ✅ CORRECT - Use size (no $ prefix) for generic sizing
<Box 
  display="flex" 
  gap="m" 
  p="l" 
  size="m"  // Generic width/height
>
  {/* Content */}
</Box>

// ❌ WRONG - Using $size on Box
<Box display="flex" $size="medium">
  {/* Content */}
</Box>
```

**Common Patterns:**

```tsx
// Card container
<Box skin="card" p="m" shape="rounded" gap="s">
  <Text as="h3" fontSize="l" fontWeight="bold">Card Title</Text>
  <Text as="p" fontSize="s">Card content</Text>
</Box>

// Flex layout
<Box display="flex" gap="m" alignItems="center" justifyContent="space-between">
  <Text as="h2" fontSize="l">Settings</Text>
  <Button variant="primary" $size="small">Save</Button>
</Box>

// Responsive grid
<Box 
  display="grid" 
  gridTemplateColumns={["1fr", "1fr 1fr", "1fr 1fr 1fr"]} 
  gap="m"
>
  {items.map(item => <Box key={item.id} skin="card" p="m">...</Box>)}
</Box>
```

### ❌ NO → Continue to next question...

---

## 5️⃣ Is it a COMPLEX UI PATTERN?

### ✅ YES → Check blocks components

For complex, pre-built UI patterns, use composed block components:

| Pattern | Component | Description |
|---------|-----------|-------------|
| User avatar | `Avatar` | Profile images with fallback initials |
| Navigation menu | `Menu`, `MenuItem` | Dropdown menus and action lists |
| Modal dialog | Check blocks docs | Overlay dialogs and confirmations |
| Data table | `Table`, `TableRow`, `TableCell` | Sortable, filterable tables |
| Tooltip | `Tooltip` | Contextual help on hover |
| Tabs | Check blocks docs | Tabbed navigation |
| Accordion | `Accordion` | Collapsible content sections |
| Form group | `FieldSet` | Grouped form fields with legend |
| Button group | `Controls` | Multiple buttons together |

**Example:**

```tsx
// Using Avatar block
import { Avatar } from '@/design-system/blocks';

<Avatar 
  src="/user.jpg" 
  alt="John Doe" 
  size="large"
/>

// Using Table block
import { Table, TableRow, TableCell } from '@/design-system/blocks';

<Table>
  <TableRow>
    <TableCell>Name</TableCell>
    <TableCell>Email</TableCell>
  </TableRow>
</Table>
```

**When to build vs use blocks:**
- ✅ Use blocks for common patterns (avatars, tables, menus)
- ✅ Compose elements for custom layouts (Box + Text + Button)
- ⚠️ Check blocks documentation for available components

---

## 📊 Quick Reference Flow Chart

```
Start: What am I building?
│
├─ Text content (headings, paragraphs, labels)?
│  └─ ✅ Use Text component with 'as' prop
│
├─ Clickable action (buttons, triggers)?
│  └─ ✅ Use Button component with '$size' prop
│
├─ Form input (text, email, select)?
│  └─ ✅ Use Field component with '$size' prop
│
├─ Container/layout (flex, grid, wrapper)?
│  └─ ✅ Use Box component with 'size' prop
│
└─ Complex pattern (avatar, table, menu)?
   └─ ✅ Check blocks components
```

---

## ⚠️ Common Mistakes to Avoid

### Mistake #1: Using Box for text
```tsx
// ❌ WRONG
<Box as="h1" fontSize="xl">Page Title</Box>

// ✅ CORRECT
<Text as="h1" fontSize="xl">Page Title</Text>
```

### Mistake #2: Confusing size vs $size
```tsx
// ❌ WRONG - Button needs $size
<Button size="medium">Click</Button>

// ✅ CORRECT
<Button $size="medium">Click</Button>

// ❌ WRONG - Box needs size (no $)
<Box $size="m">Content</Box>

// ✅ CORRECT
<Box size="m">Content</Box>
```

### Mistake #3: Missing semantic HTML
```tsx
// ❌ WRONG - No 'as' prop
<Text fontSize="xl" fontWeight="bold">Heading</Text>

// ✅ CORRECT
<Text as="h1" fontSize="xl" fontWeight="bold">Heading</Text>
```

### Mistake #4: Using arbitrary values
```tsx
// ❌ WRONG - Hardcoded pixel values
<Box p="16px" gap={8} />

// ✅ CORRECT - Theme tokens
<Box p="m" gap="xs" />
```

---

## 🎓 Practice Examples

### Example 1: Login Form

```tsx
<Box skin="card" p="l" shape="rounded" maxWidth="400px" gap="m">
  {/* Title */}
  <Text as="h1" fontSize="xl" fontWeight="bold">
    Sign In
  </Text>
  
  {/* Email Field */}
  <Box gap="xs">
    <Text as="label" htmlFor="email" fontSize="s" fontWeight="medium">
      Email
    </Text>
    <Field 
      id="email"
      as="input" 
      type="email" 
      variant="outline" 
      $size="medium"
      placeholder="you@example.com"
    />
  </Box>
  
  {/* Password Field */}
  <Box gap="xs">
    <Text as="label" htmlFor="password" fontSize="s" fontWeight="medium">
      Password
    </Text>
    <Field 
      id="password"
      as="input" 
      type="password" 
      variant="outline" 
      $size="medium"
    />
  </Box>
  
  {/* Submit Button */}
  <Button variant="primary" $size="medium" type="submit">
    Sign In
  </Button>
</Box>
```

### Example 2: Dashboard Header

```tsx
<Box 
  display="flex" 
  alignItems="center" 
  justifyContent="space-between" 
  p="m" 
  bg="surface"
>
  {/* Logo/Title */}
  <Text as="h1" fontSize="l" fontWeight="bold" color="primary">
    PocketAgent Dashboard
  </Text>
  
  {/* Actions */}
  <Box display="flex" gap="s" alignItems="center">
    <Button variant="ghost" $size="small">
      Settings
    </Button>
    <Button variant="primary" $size="small">
      New Project
    </Button>
  </Box>
</Box>
```

---

## 📚 Related Documentation

- [Prop Selection Decision Tree](./prop-selection.md) - Choose the right props
- [Elements API](../api/) - Detailed component documentation
- [Blocks Components](../blocks.md) - Composed components
- [Common Patterns](../reference/complete-patterns.md) - Real-world examples