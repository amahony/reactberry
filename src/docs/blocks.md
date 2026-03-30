# Design System Blocks

Composed components built from the foundational elements. These blocks provide higher-level functionality and complex UI patterns while maintaining consistency with the design system.

> **📋 Status:** This documentation is currently being expanded. Individual API references for each block component are in development. See [DOCUMENTATION_AUDIT.md](./DOCUMENTATION_AUDIT.md) for current progress.

## Overview

Blocks are composed components that combine multiple elements to create functional UI patterns. They're built on top of the core elements (Box, Text, Button, Field) and follow the same theming and responsive design principles.

**Component Status Legend:**
- ✅ **Complete** - Full API documentation available
- ⚠️ **Partial** - Basic documentation, API reference in progress  
- 🚧 **Planned** - Component exists, documentation coming soon
- 📋 **Concept** - Planned for future development

## Core Layout Components

### Container ⚠️

A section wrapper that provides consistent padding and max-width constraints.

**Props:**
- `children`: Container content
- All Box props for customization

**Usage:**
```tsx
<Container>
  <Text as="h1">Page Content</Text>
</Container>
```

> **📖 Full API Reference:** [api/blocks/Container.md](./api/blocks/Container.md) *(Coming Soon)*

### Main ⚠️

Main content area wrapper with semantic HTML structure.

**Props:**
- `children`: Main content
- All Box props for styling

**Usage:**
```tsx
<Main>
  <Container>
    {/* Page content */}
  </Container>
</Main>
```

> **📖 Full API Reference:** [api/blocks/Main.md](./api/blocks/Main.md) *(Coming Soon)*

### Divider ⚠️

Creates horizontal separators between content sections.

**Props:**
- All Box props for customization

**Usage:**
```tsx
<Divider />
<Divider my="l" />
```

> **📖 Full API Reference:** [api/blocks/Divider.md](./api/blocks/Divider.md) *(Coming Soon)*

### Heading ⚠️

Structured page headers with optional metadata.

**Props:**
- `title`: Main heading text
- `subtitle`: Optional subtitle
- `strap`: Optional text above title
- `meta`: Optional meta content
- `$size`: Heading size variant

**Usage:**
```tsx
<Heading
  title="Page Title"
  subtitle="Page description"
  strap="Section"
/>
```

> **📖 Full API Reference:** [api/blocks/Heading.md](./api/blocks/Heading.md) *(Coming Soon)*

## UI Components

### Avatar 🚧

User avatars with multiple display types and automatic color generation.

**Props:**
- `autocolor`: Automatically generate colors based on name
- `name`: Name to display or use for initials
- `type`: "text" | "icon" | "image"
- `src`: Image URL for image type avatars
- `alt`: Alt text for accessibility
- `withPresence`: Show online status indicator
- `status`: Status configuration object
- All Box props

**Usage:**
```tsx
<Avatar name="John Doe" type="text" />
<Avatar src="/path/to/image.jpg" type="image" alt="User avatar" />
<Avatar name="Jane Smith" type="icon" withPresence={true} />
```

> **📖 Full API Reference:** [api/blocks/Avatar.md](./api/blocks/Avatar.md) *(Coming Soon)*

### Icon 🚧

Flexible icon component with various display options.

**Props:**
- `name`: Icon name or identifier
- `size`: Icon size
- All Box props

**Usage:**
```tsx
<Icon name="user" size="m" />
<Icon name="settings" size="l" color="primary" />
```

> **📖 Full API Reference:** [api/blocks/Icon.md](./api/blocks/Icon.md) *(Coming Soon)*

### Tag

Labeled tags for categorization and metadata.

**Props:**
- `label`: Tag text
- `variant`: Style variant
- `removable`: Show remove button
- `onRemove`: Remove callback
- All Box props

**Usage:**
```tsx
<Tag label="React" variant="primary" />
<Tag label="JavaScript" removable onRemove={handleRemove} />
```

### Skeleton

Loading placeholders that match content structure.

**Props:**
- `width`: Skeleton width
- `height`: Skeleton height
- `lines`: Number of lines for text skeleton
- `animated`: Enable animation
- All Box props

**Usage:**
```tsx
<Skeleton width="100%" height="20px" />
<Skeleton lines={3} animated />
```

### Placeholder

Empty state placeholders with optional actions.

**Props:**
- `title`: Placeholder title
- `description`: Placeholder description
- `icon`: Optional icon
- `action`: Optional action button
- All Box props

**Usage:**
```tsx
<Placeholder
  title="No items found"
  description="Add your first item to get started"
  action={<Button>Add Item</Button>}
/>
```

## Interactive Components

### Switch

Toggle switches for boolean settings.

**Props:**
- `checked`: Switch state
- `onChange`: Change handler
- `disabled`: Disabled state
- `label`: Optional label
- All Box props

**Usage:**
```tsx
<Switch checked={isEnabled} onChange={setIsEnabled} label="Enable notifications" />
```

### Tooltip

Contextual help tooltips.

**Props:**
- `content`: Tooltip content
- `placement`: Tooltip position
- `trigger`: Trigger element
- `delay`: Show/hide delay
- All Box props

**Usage:**
```tsx
<Tooltip content="Click to edit" placement="top">
  <Button>Edit</Button>
</Tooltip>
```

### Popover

Floating content panels with rich interactions.

**Props:**
- `trigger`: Content that triggers the popover
- `children`: Popover content
- `placement`: Popover position
- `triggerProps`: Props for trigger element
- All Box props

**Usage:**
```tsx
<Popover trigger={<Button>Options</Button>} placement="bottom-start">
  <Box p="s">
    <Text>Popover content</Text>
  </Box>
</Popover>
```

### Menu

Dropdown menus with nested support.

**Props:**
- `trigger`: Menu trigger element
- `items`: Menu items array
- `placement`: Menu position
- All Box props

**Usage:**
```tsx
<Menu 
  trigger={<Button>Actions</Button>}
  items={[
    { label: 'Edit', onClick: handleEdit },
    { label: 'Delete', onClick: handleDelete }
  ]}
/>
```

### Accordion

Collapsible content sections.

**Props:**
- `items`: Accordion items
- `multiple`: Allow multiple open sections
- `defaultOpen`: Default open items
- All Box props

**Usage:**
```tsx
<Accordion
  items={[
    { title: 'Section 1', content: <Text>Content 1</Text> },
    { title: 'Section 2', content: <Text>Content 2</Text> }
  ]}
  multiple={false}
/>
```

### Drawer

Side panels for navigation or supplementary content.

**Props:**
- `isOpen`: Drawer state
- `onClose`: Close handler
- `placement`: Drawer position
- `size`: Drawer size
- All Box props

**Usage:**
```tsx
<Drawer isOpen={isOpen} onClose={handleClose} placement="right">
  <Box p="l">
    <Text>Drawer content</Text>
  </Box>
</Drawer>
```

## Layout Components

### Collection

Responsive grid container for content collections.

**Props:**
- `colsize`: Grid column sizes ("xsmall" | "small" | "medium" | "large" | "xlarge")
- `gap`: Grid gap
- `children`: Grid content
- All Box props

**Usage:**
```tsx
<Collection colsize="medium" gap="m">
  {items.map(item => (
    <Box key={item.id} skin="card" p="m">
      <Text>{item.title}</Text>
    </Box>
  ))}
</Collection>
```

### Group

Flex container for grouping related elements.

**Props:**
- `direction`: Flex direction
- `align`: Alignment
- `justify`: Justification
- `wrap`: Flex wrap
- All Box props

**Usage:**
```tsx
<Group direction="row" align="center" justify="space-between">
  <Text>Label</Text>
  <Button>Action</Button>
</Group>
```

### List

Structured lists with consistent styling.

**Props:**
- `items`: List items
- `variant`: List style variant
- `ordered`: Use ordered list
- All Box props

**Usage:**
```tsx
<List
  items={[
    { id: 1, content: 'First item' },
    { id: 2, content: 'Second item' }
  ]}
  variant="clean"
/>
```

### ScrollContainer

Scrollable containers with custom scrollbars.

**Props:**
- `maxHeight`: Maximum height
- `direction`: Scroll direction
- `showScrollbar`: Show scrollbar
- All Box props

**Usage:**
```tsx
<ScrollContainer maxHeight="300px" direction="vertical">
  {/* Long content */}
</ScrollContainer>
```

### HorizontalScroller

Horizontal scrolling containers for content carousels.

**Props:**
- `items`: Scrollable items
- `itemWidth`: Item width
- `showButtons`: Show navigation buttons
- All Box props

**Usage:**
```tsx
<HorizontalScroller itemWidth="200px" showButtons>
  {items.map(item => (
    <Box key={item.id} skin="card" p="m">
      <Text>{item.title}</Text>
    </Box>
  ))}
</HorizontalScroller>
```

## Form Components

### FieldSet

Grouped form fields with consistent styling.

**Props:**
- `legend`: Fieldset legend
- `children`: Form fields
- `disabled`: Disabled state
- All Box props

**Usage:**
```tsx
<FieldSet legend="Personal Information">
  <Field as="input" type="text" placeholder="First Name" />
  <Field as="input" type="text" placeholder="Last Name" />
</FieldSet>
```

### Controls

Form control groups with consistent spacing.

**Props:**
- `children`: Control elements
- `direction`: Layout direction
- `align`: Alignment
- All Box props

**Usage:**
```tsx
<Controls direction="row" align="center">
  <Button variant="outline">Cancel</Button>
  <Button variant="primary">Save</Button>
</Controls>
```

### InlineEditor

Inline editing functionality for text content.

**Props:**
- `value`: Current value
- `onChange`: Change handler
- `onSave`: Save handler
- `placeholder`: Placeholder text
- All Text props

**Usage:**
```tsx
<InlineEditor
  value={title}
  onChange={setTitle}
  onSave={handleSave}
  placeholder="Enter title"
/>
```

## Display Components

### Progress

Progress indicators with multiple variants.

**Props:**
- `value`: Progress value (0-100)
- `max`: Maximum value
- `variant`: Progress style
- `showLabel`: Show progress label
- All Box props

**Usage:**
```tsx
<Progress value={75} max={100} variant="primary" showLabel />
```

### Gallery

Image galleries with lightbox functionality.

**Props:**
- `images`: Image array
- `columns`: Grid columns
- `spacing`: Image spacing
- `lightbox`: Enable lightbox
- All Box props

**Usage:**
```tsx
<Gallery
  images={photos}
  columns={3}
  spacing="s"
  lightbox={true}
/>
```

### Slideshow

Image/content slideshows with navigation.

**Props:**
- `items`: Slide items
- `autoplay`: Enable autoplay
- `interval`: Autoplay interval
- `showDots`: Show dot indicators
- All Box props

**Usage:**
```tsx
<Slideshow
  items={slides}
  autoplay={true}
  interval={5000}
  showDots={true}
/>
```

### Slider

Range sliders for numeric input.

**Props:**
- `value`: Current value
- `min`: Minimum value
- `max`: Maximum value
- `step`: Step increment
- `onChange`: Change handler
- All Box props

**Usage:**
```tsx
<Slider
  value={volume}
  min={0}
  max={100}
  step={1}
  onChange={setVolume}
/>
```

### AnimatedCarousel

Animated content carousels.

**Props:**
- `items`: Carousel items
- `autoplay`: Enable autoplay
- `animation`: Animation type
- `controls`: Show controls
- All Box props

**Usage:**
```tsx
<AnimatedCarousel
  items={carouselItems}
  autoplay={true}
  animation="fade"
  controls={true}
/>
```

### Marquee

Scrolling text or content.

**Props:**
- `children`: Scrolling content
- `speed`: Scroll speed
- `direction`: Scroll direction
- `pauseOnHover`: Pause on hover
- All Box props

**Usage:**
```tsx
<Marquee speed="slow" direction="left" pauseOnHover>
  <Text>This text will scroll horizontally</Text>
</Marquee>
```

### Ticker

Animated number/text ticker.

**Props:**
- `value`: Current value
- `format`: Number formatting
- `duration`: Animation duration
- All Text props

**Usage:**
```tsx
<Ticker value={1234} format="currency" duration={1000} />
```

### CyclingNumber

Numbers that cycle through values.

**Props:**
- `values`: Array of values to cycle
- `interval`: Cycle interval
- `random`: Random cycling
- All Text props

**Usage:**
```tsx
<CyclingNumber values={[100, 200, 300]} interval={2000} />
```

## Effects and Animations

### Fader

Fade in/out animations for content.

**Props:**
- `isVisible`: Visibility state
- `duration`: Animation duration
- `delay`: Animation delay
- All Box props

**Usage:**
```tsx
<Fader isVisible={showContent} duration={300}>
  <Text>This content will fade in/out</Text>
</Fader>
```

### Parallax

Parallax scrolling effects.

**Props:**
- `speed`: Parallax speed
- `offset`: Offset amount
- `children`: Parallax content
- All Box props

**Usage:**
```tsx
<Parallax speed={0.5}>
  <Box bg="primary" height="400px">
    <Text>Parallax content</Text>
  </Box>
</Parallax>
```

### ParallaxSection

Section-based parallax effects.

**Props:**
- `backgroundImage`: Background image URL
- `speed`: Parallax speed
- `height`: Section height
- All Box props

**Usage:**
```tsx
<ParallaxSection
  backgroundImage="/hero-bg.jpg"
  speed={0.3}
  height="600px"
>
  <Container>
    <Text>Hero content</Text>
  </Container>
</ParallaxSection>
```

### Spotlight

Spotlight effects for highlighting content.

**Props:**
- `isActive`: Spotlight state
- `size`: Spotlight size
- `position`: Spotlight position
- All Box props

**Usage:**
```tsx
<Spotlight isActive={highlighted} size="large">
  <Box skin="card" p="m">
    <Text>Spotlighted content</Text>
  </Box>
</Spotlight>
```

### ShinyText

Animated text with shine effects.

**Props:**
- `children`: Text content
- `speed`: Animation speed
- `color`: Shine color
- All Text props

**Usage:**
```tsx
<ShinyText speed="slow" color="gold">
  Premium Feature
</ShinyText>
```

### TextBreak

Animated text reveal effects.

**Props:**
- `text`: Text to animate
- `speed`: Animation speed
- `delay`: Animation delay
- All Text props

**Usage:**
```tsx
<TextBreak
  text="Welcome to Reactberry"
  speed="medium"
  delay={500}
/>
```

## Utility Components

### Await

Async content loading with suspense.

**Props:**
- `promise`: Promise to await
- `fallback`: Loading fallback
- `children`: Content renderer
- All Box props

**Usage:**
```tsx
<Await promise={fetchData()} fallback={<Skeleton />}>
  {(data) => <DataDisplay data={data} />}
</Await>
```

### RenderAsset

Dynamic component rendering.

**Props:**
- `asset`: Component to render
- `assetProps`: Props for the component
- All Box props

**Usage:**
```tsx
<RenderAsset
  asset={DynamicComponent}
  assetProps={{ title: "Dynamic Title" }}
/>
```

### Draggable

Drag and drop functionality.

**Props:**
- `children`: Draggable content
- `onDragStart`: Drag start handler
- `onDragEnd`: Drag end handler
- All Box props

**Usage:**
```tsx
<Draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
  <Box skin="card" p="m">
    <Text>Draggable content</Text>
  </Box>
</Draggable>
```

### Underlay

Background overlays for modals/drawers.

**Props:**
- `isVisible`: Visibility state
- `onClick`: Click handler
- `opacity`: Overlay opacity
- All Box props

**Usage:**
```tsx
<Underlay isVisible={showModal} onClick={handleClose} opacity={0.5} />
```

### DisplaySet

Grouped display components.

**Props:**
- `items`: Display items
- `variant`: Display variant
- `spacing`: Item spacing
- All Box props

**Usage:**
```tsx
<DisplaySet
  items={displayItems}
  variant="grid"
  spacing="m"
/>
```

## Card Components

### InfoCard

Information display cards.

**Props:**
- `title`: Card title
- `content`: Card content
- `icon`: Optional icon
- `actions`: Card actions
- All Box props

**Usage:**
```tsx
<InfoCard
  title="Project Status"
  content="All systems operational"
  icon={<Icon name="check" />}
  actions={<Button size="small">View Details</Button>}
/>
```

### TickerCard

Cards with animated ticker content.

**Props:**
- `title`: Card title
- `value`: Ticker value
- `format`: Value formatting
- `trend`: Trend indicator
- All Box props

**Usage:**
```tsx
<TickerCard
  title="Revenue"
  value={12500}
  format="currency"
  trend="up"
/>
```

## Usage Guidelines
## Implementation Status

### Currently Available (⚠️ Documentation in Progress)
- **Layout Components**: Container, Main, Divider, Heading, Collection, Group
- **UI Components**: Avatar, Icon, Tag, Skeleton, Placeholder
- **Interactive Components**: Switch, Tooltip, Popover, Menu, Accordion, Drawer
- **Form Components**: FieldSet, Controls, InlineEditor
- **Display Components**: Progress, Gallery, Slideshow, Slider

### Coming Soon (🚧 Implementation & Documentation)
- **Advanced Animations**: AnimatedCarousel, Marquee, Ticker, CyclingNumber
- **Effects**: Fader, Parallax, Spotlight, ShinyText, TextBreak
- **Utilities**: Await, RenderAsset, Draggable, Underlay, DisplaySet
- **Enhanced Cards**: InfoCard, TickerCard with advanced features

### Future Roadmap (📋 Planned)
- **Data Components**: DataTable, TreeView, Timeline
- **Advanced Forms**: FormWizard, FieldBuilder, ValidationSummary
- **Layout Enhancements**: StickyHeader, ResizablePanel, SplitView
- **Feedback**: Toast, Banner, StatusIndicator

## Usage Guidelines

### Component Composition

Blocks are designed to be composed together:

```tsx
<Container>
  <Heading title="Dashboard" subtitle="Welcome back!" />
  <Collection colsize="medium">
    <InfoCard title="Users" content="1,234 active" />
    <InfoCard title="Revenue" content="$12,500" />
    <InfoCard title="Orders" content="56 pending" />
  </Collection>
</Container>
```

### Theme Integration

All blocks inherit theme properties and support responsive design:

```tsx
<Avatar
  name="John Doe"
  size={["32px", "40px", "48px"]}  // Responsive sizing
  skin="primary"                   // Theme skin
/>
```

### Accessibility

Blocks include built-in accessibility features:

```tsx
<Tooltip content="Additional information" placement="top">
  <Button aria-label="More info">
    <Icon name="info" />
  </Button>
</Tooltip>
```

## Best Practices

1. **Use semantic HTML** - Blocks provide semantic structure
2. **Compose thoughtfully** - Combine blocks for complex layouts
3. **Maintain consistency** - Use consistent spacing and styling
4. **Test responsively** - Ensure blocks work across breakpoints
5. **Consider accessibility** - Use proper ARIA labels and roles

## Getting Individual Component Documentation

### Priority 1: High-Use Components (🚧 In Development)
- **[Avatar](./api/blocks/Avatar.md)** - User avatars and profile images
- **[Modal](./api/blocks/Modal.md)** - Dialog boxes and overlays
- **[Tooltip](./api/blocks/Tooltip.md)** - Contextual help and information
- **[Menu](./api/blocks/Menu.md)** - Dropdown menus and actions
- **[Progress](./api/blocks/Progress.md)** - Progress indicators and loading states

### Priority 2: Layout Components (📋 Planned)
- **[Collection](./api/blocks/Collection.md)** - Responsive grid containers
- **[Group](./api/blocks/Group.md)** - Flex grouping containers
- **[ScrollContainer](./api/blocks/ScrollContainer.md)** - Custom scrollable areas

### Priority 3: Form Components (📋 Planned)
- **[FieldSet](./api/blocks/FieldSet.md)** - Grouped form fields
- **[Controls](./api/blocks/Controls.md)** - Form action groups
- **[InlineEditor](./api/blocks/InlineEditor.md)** - In-place editing

## Contributing Block Documentation

Interested in helping complete the block documentation? See our [Documentation Audit](./DOCUMENTATION_AUDIT.md) for:
- **Documentation templates** to follow
- **Priority components** that need documentation first
- **Review process** for contributed documentation
- **Testing requirements** for code examples

**Next Steps:**
1. 📖 Check the [Getting Started Guide](./guides/getting-started.md) for basic usage
2. 🔧 Browse [Core Elements](./elements.md) for building blocks
3. 💡 See [Examples](./examples/) for real-world patterns
4. 🚧 Watch for individual block API documentation releases
