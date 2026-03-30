# Patterns Registry

**Purpose:** Searchable library of common UI patterns with copy-paste code examples

## 📚 Pattern Categories

- [Layout Patterns](#layout-patterns)
- [Form Patterns](#form-patterns)
- [Interactive Patterns](#interactive-patterns)
- [Data Display Patterns](#data-display-patterns)
- [Navigation Patterns](#navigation-patterns)
- [Content Patterns](#content-patterns)
- [State Patterns](#state-patterns)

---

## Layout Patterns

### Flex Container - Horizontal Row

**Use Case:** Horizontal layout with spacing between items

**Components:** Box  
**Tokens:** gap (SpaceToken), display, alignItems

```tsx
<Box display="flex" gap="m" alignItems="center">
  <Text as="span">Item 1</Text>
  <Text as="span">Item 2</Text>
  <Text as="span">Item 3</Text>
</Box>
```

**Common Mistakes:**
- Forgetting `alignItems` for vertical alignment
- Using `size` prop for gap spacing

---

### Flex Container - Vertical Stack

**Use Case:** Vertical layout with spacing

**Components:** Box  
**Tokens:** gap, flexDirection

```tsx
<Box display="flex" flexDirection="column" gap="s">
  <Text as="p">Paragraph 1</Text>
  <Text as="p">Paragraph 2</Text>
  <Text as="p">Paragraph 3</Text>
</Box>
```

---

### Flex Container - Space Between

**Use Case:** Items on opposite ends with space between

**Components:** Box, Text, Button  
**Tokens:** gap, justifyContent, alignItems

```tsx
<Box 
  display="flex" 
  justifyContent="space-between" 
  alignItems="center"
  p="m"
>
  <Text as="h2" fontSize="l" fontWeight="bold">
    Page Title
  </Text>
  <Button variant="primary" $size="medium">
    Action
  </Button>
</Box>
```

---

### Grid Container - Responsive Columns

**Use Case:** Responsive card grid that adapts to screen size

**Components:** Box  
**Tokens:** display, gridTemplateColumns (responsive), gap

```tsx
<Box 
  display="grid" 
  gridTemplateColumns={["1fr", "1fr 1fr", "1fr 1fr 1fr"]} 
  gap="m"
>
  {items.map(item => (
    <Box key={item.id} skin="card" p="m" shape="rounded">
      <Text as="h3" fontSize="m" fontWeight="bold">
        {item.title}
      </Text>
    </Box>
  ))}
</Box>
```

**Breakpoints:**
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns

---

### Centered Container

**Use Case:** Center content horizontally with max width

**Components:** Box  
**Tokens:** maxWidth, mx, p

```tsx
<Box maxWidth="1200px" mx="auto" p="l">
  {/* Page content */}
</Box>
```

---

### Card Component

**Use Case:** Content card with shadow and padding

**Components:** Box, Text, Button  
**Tokens:** skin, p, shape, gap

```tsx
<Box skin="card" p="m" shape="rounded" gap="s">
  <Text as="h3" fontSize="l" fontWeight="bold">
    Card Title
  </Text>
  <Text as="p" fontSize="s" color="secondary" lineHeight="relaxed">
    Card description with relevant details about the content.
  </Text>
  <Button variant="primary" $size="small">
    Learn More
  </Button>
</Box>
```

---

### Sidebar Layout

**Use Case:** Two-column layout with sidebar

**Components:** Box  
**Tokens:** display, gridTemplateColumns, gap

```tsx
<Box display="grid" gridTemplateColumns="250px 1fr" gap="l">
  {/* Sidebar */}
  <Box bg="surface" p="m">
    <Text as="nav">
      {/* Navigation items */}
    </Text>
  </Box>
  
  {/* Main content */}
  <Box p="m">
    {/* Page content */}
  </Box>
</Box>
```

---

### Hero Section

**Use Case:** Large centered hero section

**Components:** Box, Text, Button  
**Tokens:** textAlign, p, gap

```tsx
<Box 
  textAlign="center" 
  p={['l', 'xl', 'xxl']} 
  bg="surface"
  gap="l"
>
  <Text as="h1" fontSize={['xl', 'xxl', 'xxxl']} fontWeight="bold">
    Welcome to PocketAgent
  </Text>
  <Text as="p" fontSize={['m', 'l', 'l']} color="secondary" maxWidth="600px" mx="auto">
    Build amazing applications with our design system
  </Text>
  <Box display="flex" gap="m" justifyContent="center">
    <Button variant="primary" $size="large">
      Get Started
    </Button>
    <Button variant="outline" $size="large">
      Learn More
    </Button>
  </Box>
</Box>
```

---

## Form Patterns

### Labeled Input Field

**Use Case:** Form input with accessible label

**Components:** Box, Text, Field  
**Tokens:** gap, fontSize, $size (Field)  
**Props:** htmlFor/id connection

```tsx
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
    placeholder="you@example.com"
  />
</Box>
```

**Critical:** Always connect labels to inputs with `htmlFor`/`id`

---

### Input with Error State

**Use Case:** Form field with validation error

**Components:** Box, Text, Field  
**Tokens:** gap, fontSize, color, error (Field prop)

```tsx
<Box gap="xs">
  <Text as="label" htmlFor="username" fontSize="s" fontWeight="medium">
    Username
  </Text>
  <Field 
    id="username"
    as="input" 
    type="text" 
    variant="outline" 
    $size="medium"
    error
    value={username}
    onChange={(e) => setUsername(e.target.value)}
  />
  {error && (
    <Text fontSize="xs" color="error">
      Username is already taken
    </Text>
  )}
</Box>
```

---

### Required Field Indicator

**Use Case:** Mark required form fields

**Components:** Text, Field  
**Tokens:** color

```tsx
<Box gap="xs">
  <Text as="label" htmlFor="email" fontSize="s" fontWeight="medium">
    Email Address <Text as="span" color="error">*</Text>
  </Text>
  <Field 
    id="email"
    as="input" 
    type="email" 
    variant="outline" 
    $size="medium"
    required
  />
</Box>
```

---

### Textarea Field

**Use Case:** Multi-line text input

**Components:** Box, Text, Field  
**Tokens:** gap

```tsx
<Box gap="xs">
  <Text as="label" htmlFor="description" fontSize="s" fontWeight="medium">
    Description
  </Text>
  <Field 
    id="description"
    as="textarea" 
    variant="outline" 
    $size="medium"
    rows={6}
    placeholder="Enter detailed description..."
  />
</Box>
```

---

### Select Dropdown

**Use Case:** Dropdown selection field

**Components:** Box, Text, Field  
**Tokens:** gap, $size

```tsx
<Box gap="xs">
  <Text as="label" htmlFor="country" fontSize="s" fontWeight="medium">
    Country
  </Text>
  <Field 
    id="country"
    as="select" 
    variant="outline" 
    $size="medium"
  >
    <option value="">Select a country</option>
    <option value="us">United States</option>
    <option value="uk">United Kingdom</option>
    <option value="ca">Canada</option>
  </Field>
</Box>
```

---

### Form Actions (Submit/Cancel)

**Use Case:** Form action buttons

**Components:** Box, Button  
**Tokens:** gap, justifyContent, $size

```tsx
<Box display="flex" gap="s" justifyContent="flex-end">
  <Button variant="ghost" $size="medium" onClick={handleCancel}>
    Cancel
  </Button>
  <Button variant="primary" $size="medium" type="submit">
    Save Changes
  </Button>
</Box>
```

---

### Complete Form Example

**Use Case:** Full form with multiple fields

```tsx
<Box as="form" onSubmit={handleSubmit} gap="m" maxWidth="500px">
  {/* Name Field */}
  <Box gap="xs">
    <Text as="label" htmlFor="name" fontSize="s" fontWeight="medium">
      Full Name <Text as="span" color="error">*</Text>
    </Text>
    <Field 
      id="name"
      as="input" 
      type="text" 
      variant="outline" 
      $size="medium"
      required
    />
  </Box>
  
  {/* Email Field */}
  <Box gap="xs">
    <Text as="label" htmlFor="email" fontSize="s" fontWeight="medium">
      Email Address <Text as="span" color="error">*</Text>
    </Text>
    <Field 
      id="email"
      as="input" 
      type="email" 
      variant="outline" 
      $size="medium"
      required
    />
  </Box>
  
  {/* Message Field */}
  <Box gap="xs">
    <Text as="label" htmlFor="message" fontSize="s" fontWeight="medium">
      Message
    </Text>
    <Field 
      id="message"
      as="textarea" 
      variant="outline" 
      $size="medium"
      rows={5}
    />
  </Box>
  
  {/* Actions */}
  <Box display="flex" gap="s" justifyContent="flex-end">
    <Button variant="ghost" $size="medium" type="button">
      Cancel
    </Button>
    <Button variant="primary" $size="medium" type="submit">
      Submit
    </Button>
  </Box>
</Box>
```

---

## Interactive Patterns

### Primary CTA Button

**Use Case:** Main call-to-action button

**Components:** Button  
**Tokens:** variant, $size

```tsx
<Button 
  variant="primary" 
  $size="medium" 
  onClick={handleClick}
>
  Get Started
</Button>
```

---

### Button Group

**Use Case:** Multiple related actions

**Components:** Box, Button  
**Tokens:** display, gap

```tsx
<Box display="flex" gap="s">
  <Button variant="outline" $size="small">
    Bold
  </Button>
  <Button variant="outline" $size="small">
    Italic
  </Button>
  <Button variant="outline" $size="small">
    Underline
  </Button>
</Box>
```

---

### Loading Button

**Use Case:** Button with loading state

**Components:** Button  
**Tokens:** loading, disabled

```tsx
<Button 
  variant="primary" 
  $size="medium" 
  loading={isSubmitting}
  disabled={isSubmitting}
  onClick={handleSubmit}
>
  {isSubmitting ? 'Submitting...' : 'Submit'}
</Button>
```

---

### Icon Button

**Use Case:** Icon-only button

**Components:** Button  
**Tokens:** variant, $size, icon

```tsx
<Button 
  variant="ghost" 
  $size="small" 
  icon
  onClick={handleClose}
  aria-label="Close"
>
  ✕
</Button>
```

---

### Link as Text

**Use Case:** Navigation link styled as text

**Components:** Text  
**Tokens:** color, fontWeight

```tsx
<Text 
  as="a" 
  href="/about" 
  color="primary" 
  fontWeight="medium"
  cursor="pointer"
>
  About Us
</Text>
```

---

### Clickable Card

**Use Case:** Card that acts as a link

**Components:** Box, Text  
**Tokens:** cursor, hover

```tsx
<Box
  skin="card"
  p="m"
  shape="rounded"
  cursor="pointer"
  hover="subtle"
  onClick={handleClick}
>
  <Text as="h3" fontSize="m" fontWeight="bold">
    Card Title
  </Text>
  <Text fontSize="s" color="secondary">
    Click to view details
  </Text>
</Box>
```

---

## Data Display Patterns

### Stat Card

**Use Case:** Display key metric or statistic

**Components:** Box, Text  
**Tokens:** skin, p, gap, fontSize

```tsx
<Box skin="card" p="m" shape="rounded" gap="xs">
  <Text fontSize="s" color="secondary">
    Total Revenue
  </Text>
  <Text as="div" fontSize="xxl" fontWeight="bold" color="primary">
    $42,350
  </Text>
  <Text fontSize="xs" color="success">
    +12.5% from last month
  </Text>
</Box>
```

---

### User Profile Card

**Use Case:** Display user information

**Components:** Box, Text  
**Tokens:** gap, fontSize

```tsx
<Box skin="card" p="m" shape="rounded" gap="s">
  <Box display="flex" gap="m" alignItems="center">
    <Box 
      size="xl" 
      shape="circle" 
      bg="primary"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Text color="white" fontWeight="bold">JD</Text>
    </Box>
    <Box gap="xs">
      <Text as="div" fontWeight="bold" fontSize="m">
        John Doe
      </Text>
      <Text fontSize="s" color="secondary">
        john.doe@example.com
      </Text>
    </Box>
  </Box>
</Box>
```

---

### List with Dividers

**Use Case:** Vertical list with separators

**Components:** Box, Text  
**Tokens:** borderBottom, p, gap

```tsx
<Box gap="0">
  {items.map((item, index) => (
    <Box 
      key={item.id}
      p="m"
      borderBottom={index < items.length - 1 ? "1px solid" : "none"}
      borderColor="surface"
    >
      <Text as="div" fontWeight="medium">{item.title}</Text>
      <Text fontSize="s" color="secondary">{item.description}</Text>
    </Box>
  ))}
</Box>
```

---

### Key-Value Pairs

**Use Case:** Display label-value pairs

**Components:** Box, Text  
**Tokens:** gap, fontSize, fontWeight

```tsx
<Box gap="s">
  <Box display="flex" justifyContent="space-between">
    <Text fontSize="s" color="secondary">Name:</Text>
    <Text fontSize="s" fontWeight="medium">John Doe</Text>
  </Box>
  <Box display="flex" justifyContent="space-between">
    <Text fontSize="s" color="secondary">Email:</Text>
    <Text fontSize="s" fontWeight="medium">john@example.com</Text>
  </Box>
  <Box display="flex" justifyContent="space-between">
    <Text fontSize="s" color="secondary">Status:</Text>
    <Text fontSize="s" fontWeight="medium" color="success">Active</Text>
  </Box>
</Box>
```

---

## Navigation Patterns

### Header with Logo and Actions

**Use Case:** Page header with branding and navigation

**Components:** Box, Text, Button  
**Tokens:** display, justifyContent, p, gap

```tsx
<Box 
  display="flex" 
  justifyContent="space-between" 
  alignItems="center"
  p="m" 
  bg="surface"
  borderBottom="1px solid"
  borderColor="surface"
>
  <Text as="h1" fontSize="l" fontWeight="bold" color="primary">
    PocketAgent
  </Text>
  <Box display="flex" gap="s" alignItems="center">
    <Text as="a" href="/docs" fontSize="s" color="secondary">
      Docs
    </Text>
    <Text as="a" href="/pricing" fontSize="s" color="secondary">
      Pricing
    </Text>
    <Button variant="primary" $size="small">
      Sign In
    </Button>
  </Box>
</Box>
```

---

### Breadcrumbs

**Use Case:** Breadcrumb navigation

**Components:** Box, Text  
**Tokens:** display, gap, fontSize

```tsx
<Box display="flex" gap="xs" alignItems="center">
  <Text as="a" href="/" fontSize="s" color="secondary">
    Home
  </Text>
  <Text fontSize="s" color="secondary">/</Text>
  <Text as="a" href="/products" fontSize="s" color="secondary">
    Products
  </Text>
  <Text fontSize="s" color="secondary">/</Text>
  <Text fontSize="s" fontWeight="medium">
    Item Details
  </Text>
</Box>
```

---

### Tab Navigation

**Use Case:** Tabbed content switcher

**Components:** Box, Text  
**Tokens:** display, gap, borderBottom

```tsx
<Box display="flex" gap="l" borderBottom="1px solid" borderColor="surface">
  <Text 
    as="button"
    fontSize="s"
    fontWeight={activeTab === 'overview' ? 'bold' : 'normal'}
    color={activeTab === 'overview' ? 'primary' : 'secondary'}
    pb="s"
    borderBottom={activeTab === 'overview' ? '2px solid' : 'none'}
    borderColor="primary"
    onClick={() => setActiveTab('overview')}
  >
    Overview
  </Text>
  <Text 
    as="button"
    fontSize="s"
    fontWeight={activeTab === 'settings' ? 'bold' : 'normal'}
    color={activeTab === 'settings' ? 'primary' : 'secondary'}
    pb="s"
    borderBottom={activeTab === 'settings' ? '2px solid' : 'none'}
    borderColor="primary"
    onClick={() => setActiveTab('settings')}
  >
    Settings
  </Text>
</Box>
```

---

## Content Patterns

### Page Title with Subtitle

**Use Case:** Page heading with description

**Components:** Box, Text  
**Tokens:** gap, fontSize, fontWeight, color

```tsx
<Box gap="xs" mb="l">
  <Text as="h1" fontSize="xxl" fontWeight="bold">
    Dashboard
  </Text>
  <Text as="p" fontSize="m" color="secondary">
    View your account overview and recent activity
  </Text>
</Box>
```

---

### Section Heading

**Use Case:** Section title within a page

**Components:** Text  
**Tokens:** fontSize, fontWeight

```tsx
<Text as="h2" fontSize="xl" fontWeight="bold" mb="m">
  Recent Projects
</Text>
```

---

### Empty State

**Use Case:** No content available message

**Components:** Box, Text, Button  
**Tokens:** textAlign, p, gap

```tsx
<Box textAlign="center" p="xl" gap="m">
  <Text as="h3" fontSize="l" color="secondary">
    No items found
  </Text>
  <Text as="p" fontSize="s" color="secondary">
    Get started by creating your first item
  </Text>
  <Button variant="primary" $size="medium">
    Create Item
  </Button>
</Box>
```

---

### Alert/Notice

**Use Case:** Information or warning message

**Components:** Box, Text  
**Tokens:** skin, p, shape, gap

```tsx
<Box skin="warning" p="m" shape="rounded" gap="xs">
  <Text fontWeight="bold" fontSize="s">
    Warning
  </Text>
  <Text fontSize="s">
    Your subscription will expire in 3 days. Please update your payment method.
  </Text>
</Box>
```

---

## State Patterns

### Loading State

**Use Case:** Show loading indicator

**Components:** Box, Text  
**Tokens:** display, alignItems, justifyContent, p

```tsx
{loading ? (
  <Box 
    display="flex" 
    alignItems="center" 
    justifyContent="center" 
    p="xl"
  >
    <Text color="secondary">Loading...</Text>
  </Box>
) : (
  <Box>{/* Content */}</Box>
)}
```

---

### Error State

**Use Case:** Display error message

**Components:** Box, Text  
**Tokens:** skin, p, shape, gap

```tsx
{error && (
  <Box skin="error" p="m" shape="rounded" gap="xs">
    <Text fontWeight="semibold" fontSize="s">
      Error
    </Text>
    <Text fontSize="s">
      {error.message}
    </Text>
  </Box>
)}
```

---

### Success State

**Use Case:** Success confirmation message

**Components:** Box, Text  
**Tokens:** skin, p, shape

```tsx
{success && (
  <Box skin="success" p="m" shape="rounded">
    <Text fontSize="s">
      Changes saved successfully!
    </Text>
  </Box>
)}
```

---

### Disabled State

**Use Case:** Show disabled content

**Components:** Box, Button  
**Tokens:** disabled, cursor

```tsx
<Box cursor="not-allowed" opacity={0.5}>
  <Button variant="primary" $size="medium" disabled>
    Action Not Available
  </Button>
</Box>
```

---

## 🔍 Pattern Search Guide

### By Component
- **Box only:** Layout patterns, card patterns
- **Box + Text:** Content patterns, data display patterns
- **Box + Text + Button:** Interactive patterns, form patterns
- **Box + Field:** Form patterns

### By Use Case
- **Forms:** Form Patterns section
- **Navigation:** Navigation Patterns section
- **Cards:** Layout Patterns > Card Component
- **Headers:** Navigation Patterns > Header
- **Lists:** Data Display Patterns > List with Dividers

### By Tokens
- **gap:** Most layout and spacing patterns
- **skin:** Card, alert, state patterns
- **$size:** Button and Field patterns
- **fontSize:** Typography and content patterns

---

**Last Updated:** 2025-01-09  
**Total Patterns:** 35+

**Usage:** Copy the code examples and modify for your specific needs. All examples use theme tokens and follow design system best practices.