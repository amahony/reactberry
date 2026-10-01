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

### Screen

Page-level wrapper that renders one implementation per viewport class (`desktop`, `tablet`, `phone`) inside preset chrome. Missing variants fall back to the closest supplied one. Variants mount exclusively, so shared state must live above the Screen. Requires `BreakpointProvider` higher in the tree.

**Props:**
- `preset`: `"framed"` (gutter + card surface, default), `"page"` (theme `container` chrome) or `"clean"` (no chrome)
- `desktop` / `tablet` / `phone`: Viewport-specific components
- `pass`: Props forwarded to whichever variant renders
- `insets`: Reserve room for fixed mobile chrome and safe areas (default `true` on phone/tablet)
- `children`: Rendered when no variant is supplied
- All Box props

**Usage:**
```tsx
<Screen preset="framed" desktop={ProjectDesktop} phone={ProjectPhone} pass={{ projectId }} />
```

`ScreenDesktop`, `ScreenTablet` and `ScreenPhone` are the per-viewport shells used by `Screen`. They are exported for rendering one viewport's chrome directly and accept the same `ScreenProps`.

## UI Components

### Avatar ⚠️

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

### Icon ⚠️

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

### Thumbnail

Image thumbnail rendered with `next/image` inside a relatively positioned Box.

**Props:**
- `src` / `alt`: Image source and alt text (required)
- `objectFit`: `"cover" | "contain" | "fill" | "none" | "scale-down"` (default `"cover"`)
- All Box props (except `as`)

**Usage:**
```tsx
<Thumbnail src="/photo.jpg" alt="Photo" width="200px" height="200px" />
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

Hover navigation bar with animated dropdown panels. Each `MenuItem` is a tab, and its children (usually a `MenuContent`) are shown as the panel while that tab is selected.

**Props:**
- `Menu`: `children` (`MenuItem` elements)
- `MenuItem`: `id` and `title` (required), `path` (renders a Next.js link), `children` (panel content), `disabled`
- `MenuContent`: `items` (nested `{ documentId, title, path?, items?, additionalFields?: { description?, divider? } }[]`), `children`, `level` (default `0`)

**Usage:**
```tsx
<Menu>
  <MenuItem id={1} title="Products">
    <MenuContent items={[{ documentId: "a", title: "Analytics", path: "/analytics" }]} />
  </MenuItem>
  <MenuItem id={2} title="Pricing" path="/pricing" />
</Menu>
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

Side panel with backdrop and header close button. Open state is keyed by `id`, persisted to `localStorage`, and toggled by `DrawerButton` with the matching `drawerId`. State comes from `SidebarProvider`, which `DesignSystemProvider` mounts; it is also exported with `useSidebar` from `@reactberry/system/providers`.

**Props:**
- `id`: Drawer id (required)
- `children`: Drawer content (required)
- `title`: Header title (default `"Drawer"`)
- `width`: Panel width, responsive values supported (default `"350px"`)
- `placement`: `"left" | "right"` (default `"left"`)

**DrawerButton props:**
- `drawerId`: Id of the Drawer to toggle (required)
- `label`: Button text, hidden below `md` (default `"Open"`)
- `icon`: Leading icon (default add icon)
- Remaining props are spread onto the Button

**Usage:**
```tsx
<DrawerButton drawerId="filters" label="Filters" />
<Drawer id="filters" title="Filters" placement="right">
  <Box p="l">
    <Text>Drawer content</Text>
  </Box>
</Drawer>
```

### Breadcrumbs

Linear-style breadcrumb trail for the Next.js App Router. Crumbs render as links, buttons, current-page text or custom nodes, and can expose a dropdown `menu`.

**Props:**
- `items`: Ordered `BreadcrumbItem[]` (`label`, `href`, `onClick`, `icon`, `render`, `menu`, `current`, `maxWidth`)
- `separator`: Node between crumbs (default right chevron)
- `showHome` / `homeHref`: Leading Home button
- `showBack` / `onBack`: Leading Back button (default `router.back()`)
- `actions`: Right-aligned actions
- All Group props

**Usage:**
```tsx
<Breadcrumbs
  items={[
    { label: 'Projects', href: '/projects' },
    { label: 'Website', current: true }
  ]}
  showHome
/>

// Derive crumbs from the pathname
<Breadcrumbs items={pathToBreadcrumbItems(usePathname())} />
```

> **📖 Full API Reference:** [blocks/Breadcrumbs/README.md](../blocks/Breadcrumbs/README.md)

### BottomSheet

Draggable bottom sheet built on `vaul`, with optional peek handle and collapsed snap point.

**Props:**
- `open` / `defaultOpen` / `onOpenChange` / `onClose`: Open state (controlled or uncontrolled)
- `title` / `description`: Header content (also used for accessible labelling)
- `peekContent` / `peekHeight`: Handle shown while closed (`peekHeight={0}` hides it)
- `collapsedHeight` / `defaultCollapsed` / `expandedSnapPoint`: Snap point behaviour
- `height` / `maxHeight` / `maxWidth`: Panel sizing (`maxHeight` sizes to content)
- `showBackdrop` / `showBackdropWhenExpanded` / `backdropBlur` / `closeOnBackdropClick` / `closeOnEscape`
- `showCloseButton`: Render a close button in the header

**Usage:**
```tsx
<BottomSheet open={isOpen} onOpenChange={setIsOpen} title="Filters" peekHeight={0} showCloseButton>
  <Text>Sheet content</Text>
</BottomSheet>
```

### Modal

Full-screen dialog overlay with backdrop, Escape and click-outside closing, and history-aware close behaviour.

**Props:**
- `children`: Modal content (required)
- `onClose`: Close handler (falls back to `history.back()` or `fallbackHref`)
- `fallbackHref` / `forceFallback`: Route used when there is no history (default `forceFallback={false}`)
- `portal`: Render through a portal (default `true`)
- `backdrop` / `backdropProps`: Tinted overlay and its props (default `true`)
- `closeOnOverlayClick`: Close on backdrop click (default `true`)
- `animated`: Scale and fade animation (default `false`)
- Remaining props are spread onto the dialog Box

**Related exports:**
- `useModalClose()`: Returns the nearest Modal's close function, or `null` outside a Modal
- `pushThemeColor(color)` / `popThemeColor()`: Push and restore the browser `theme-color` while an overlay is open

**Usage:**
```tsx
<Modal onClose={() => setOpen(false)} animated>
  <Box p="l">
    <Text>Modal content</Text>
  </Box>
</Modal>
```

### MorphingPopover

Popover whose trigger morphs into the panel using a `motion` layout animation. Closes on click outside and Escape.

**Props:**
- `trigger` / `triggerProps`: Static trigger and wrapper props
- `renderTrigger`: `({ ref, onClick }) => ReactNode` for a custom trigger
- `children`: Content, or `({ close }) => ReactNode`
- `open` / `defaultOpen` / `onOpenChange`: Open state (controlled or uncontrolled, default `defaultOpen={false}`)
- `panelProps` / `containerProps`: Props for the panel and outer container
- `transition` / `variants`: `motion` animation config (default spring transition)
- `placement`: Accepted but currently unused (default `"bottom end"`)

**Usage:**
```tsx
<MorphingPopover trigger={<Button>Open</Button>}>
  {({ close }) => <Button onClick={close}>Close</Button>}
</MorphingPopover>
```

### FamilyDrawer

Multi-view drawer built on `Drawer`, with animated height and view transitions between four built-in views (`default`, `key`, `phrase`, `remove`). Like `Drawer`, its open state comes from `SidebarProvider`.

**Props:**
- `id`: Unique drawer id (required)
- `initialView`: Starting view (default `"default"`)
- `trigger`: Custom trigger; elements receive an `onClick` that toggles the drawer (defaults to a settings button)
- `onViewChange`: Called with the new view
- `width`: Drawer width, responsive values supported (default `"360px"`)
- `privateKey` / `recoveryPhrase`: Values shown after pressing "Reveal" in the key / phrase views
- `onReveal`: Called with `"key"` or `"phrase"` when "Reveal" is pressed
- `onRemove`: Called when removal is confirmed; the drawer then closes and returns to the default view

**Usage:**
```tsx
<FamilyDrawer id="wallet-settings" onViewChange={(view) => console.log(view)} />
```

> **📖 Full API Reference:** [blocks/FamilyDrawer/README.md](../blocks/FamilyDrawer/README.md)

### SystemNotice

Inline notice bar with a message, optional icon or loading state and colour schema.

**Props:**
- `message`: Notice content (required)
- `colorSchema`: `"default" | "success" | "error" | "warning" | "info"` (default `"default"`)
- `icon`: Custom icon (hidden while loading)
- `loading`: Show loading animation (default `false`)
- `showBreaks`: Render Dividers above and below (default `false`)
- All Box props

**Usage:**
```tsx
<SystemNotice message="All systems operational" colorSchema="success" />
```

### Toast

Compact notification with message, description, icon, dismiss button and optional action.

**Props:**
- `message`: Primary message (required)
- `description`: Secondary text
- `variant`: `"default" | "success" | "error" | "info" | "warning"` (default `"default"`)
- `icon`: Custom icon
- `onClose`: Renders a dismiss button when provided
- `action`: `{ label: string; onClick: () => void }`
- All Box props

**Usage:**
```tsx
<Toast
  message="Upload failed"
  description="Check your connection"
  variant="error"
  action={{ label: "Retry", onClick: retry }}
  onClose={dismiss}
/>
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

### Filesystem

Expandable tree for nested file and folder structures, with animated expand/collapse and selection styling.

**Props:**
- `nodes`: `FilesystemNode[]` where `FilesystemNode = { name: string; id?: string; nodes?: FilesystemNode[] }` (required)
- `initiallyOpenNames`: Names of nodes expanded on mount
- `selectedIds`: Ids rendered as selected
- `onSelectNode`: Called with the clicked node
- `renderNode`: `(node, defaultContent, { isSelected }) => ReactNode`
- `renderLeading`: `(node, { hasChildren, isOpen, toggle, defaultLeading, isSelected }) => ReactNode`

**Usage:**
```tsx
<Filesystem
  nodes={[{ name: "src", id: "src", nodes: [{ name: "index.ts", id: "index" }] }]}
  initiallyOpenNames={["src"]}
  selectedIds={["index"]}
  onSelectNode={(node) => console.log(node.name)}
/>
```

## Pagination Components

### Pagination

Page-number navigation with previous/next buttons and ellipses. Syncs the current page to the `?page=` query string through the Next.js App Router, and renders nothing when `total <= pageSize`.

**Props:**
- `total`: Total item count (required)
- `pageSize`: Items per page (default `10`)
- `onPageChange`: Called with the new page (required)

**Usage:**
```tsx
<Pagination total={120} pageSize={20} onPageChange={setPage} />
```

### PaginationList

Wraps list content and renders a sticky `Pagination` below it.

**Props:**
- `children`: List content (required)
- `total`: Total item count (required)
- `pageSize`: Items per page (default `10`)
- `onPageChange`: Called with the new page

**Usage:**
```tsx
<PaginationList total={120} pageSize={20} onPageChange={setPage}>
  {items.map((item) => <Text key={item.id}>{item.name}</Text>)}
</PaginationList>
```

## Table Components

### Table

Composable table primitives: `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableCell`, `TableHeaderCell` and `TablePagination`, plus the `useTableControls`, `useTableFilters` and `useFilteredTableControls` hooks for sorting, filtering and pagination state.

**Usage:**
```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHeaderCell>Name</TableHeaderCell>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Ada</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

> **📖 Full API Reference:** [api/blocks/Table.md](./api/blocks/Table.md) and [blocks/Table/README.md](../blocks/Table/README.md)

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

### ColorPicker

Hex colour picker (via `react-colorful`) rendered inside `Popover`, with an optional alpha channel.

**Props:**
- `color`: Current hex value (`#RRGGBB`, or `#RRGGBBAA` with alpha)
- `onChange`: Change handler
- `alpha`: Show the alpha slider (default `true`)
- `trigger`: Custom trigger (defaults to a colour swatch)
- `placement`: Popover placement (default `"bottom end"`)
- `swatchSize`: Default swatch size (default `"2rem"`)
- `disabled`: Disable the default swatch
- `panelProps` / `triggerProps` / `containerProps`: Forwarded to `Popover`

**Usage:**
```tsx
<ColorPicker color={color} onChange={setColor} alpha={false} />
```

### Checkbox

Animated checkbox with loading and disabled states.

**Props:**
- `checked`: Checked state (default `false`)
- `onChange`: `() => void` toggle handler
- `isLoading` / `disabled`: Loading and disabled states (default `false`)
- `size`: Box size (default `"1.375rem"`)
- `title` / `ariaLabel`: Accessible labelling
- `containerProps`: Props for the wrapping Group

**Usage:**
```tsx
<Checkbox checked={accepted} onChange={() => setAccepted(!accepted)} ariaLabel="Accept terms" />
```

### MaskedField

Field with input masking via `react-number-format`, either from a preset or a custom numeric/pattern format.

**Props:**
- `preset`: `currency`, `percentage`, `phone`, `date`, `zip`, `zipPlus4`, `ssn`, `ein`, `creditCard`, `time12`, `time24`, `decimal`, `integer` or `year` (see `maskPresets`)
- `maskType`: `"numeric" | "pattern"` for custom formats
- `variant` / `$size`: Field variant and size (default `"ghost"` / `"medium"`)
- `width`: Container width (default `"100%"`)
- `shape`, `bg`, `fontSize`, `fontWeight`, `textAlign`: Field styling
- All `NumericFormatProps` or `PatternFormatProps` from `react-number-format`

**Usage:**
```tsx
<MaskedField preset="phone" placeholder="(555) 123-4567" />
<MaskedField preset="currency" value={amount} onValueChange={(v) => setAmount(v.floatValue)} />
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

### Carousel

Horizontal scroll-snap carousel with optional arrows, edge fade masks and programmatic positioning.

**Props:**
- `items`: Slides (required)
- `gap`: Space between slides (default `"s"`)
- `align`: Snap alignment, `"start" | "center"` (default `"start"`)
- `activeIndex`: Scrolls the given slide into view
- `onScroll`: Called with the snapped index
- `showArrows` / `showScrollbar`: Arrow controls and scrollbar (default `true` / `false`)
- `withMask` / `maskWidth`: Edge fade (default `false` / `"3rem"`)
- `containerProps`: Props for the scroll container

**Usage:**
```tsx
<Carousel items={slides.map((s) => <Box key={s.id} width="16rem">{s.title}</Box>)} gap="m" withMask />
```

### VideoMarquee

Auto-scrolling marquee of video and embed cards with drag, play/pause, arrows and dot navigation.

**Props:**
- `items`: `VideoMarqueeItem[]` with required `title` and `handle`, plus `id`, `src`, `embedUrl`, `sourceUrl`, `imageSrc`, `poster`, `description` (required)
- `speed`: Scroll speed in px/s (default `42`)
- `direction`: `"left" | "right"` (default `"left"`)
- `pauseOnHover`: Pause while hovered (default `true`)
- `gap`: Space between cards (default `"1rem"`)
- `showControls` / `showDots` / `showPlayPause`: Toggle controls (default `true`)

**Usage:**
```tsx
<VideoMarquee items={[{ id: "1", src: "/demo.mp4", title: "Demo", handle: "@team" }]} speed={50} />
```

### DynamicIsland

Morphing container that animates between content with spring transitions.

**Props:**
- `content`: Content to render
- `view`: View identifier; changing it animates the transition
- `containerProps`: Props for the container Box
- `onViewChange` / `controlIcons`: Declared in `DynamicIslandProps` but not currently used by the component

**Usage:**
```tsx
<DynamicIsland view="playing" content={<Text>Now playing</Text>} />
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

### StickySectionStack

Stacks child sections as sticky cards that scale down as later sections scroll over them. Falls back to a static layout when reduced motion is preferred.

**Props:**
- `children`: Sections (required)
- `stickyTop` / `stickyStep`: Sticky offset and per-section step (default `"4vh"` / `24`)
- `scaleStep` / `minScale`: Scale reduction per section and floor (default `0.06` / `0.82`)
- `stackOffsetBase`: Base stacking offset (default `0`)
- `topPadding` / `bottomPadding`: Outer padding (default `"10vh"` / `"30vh"`)
- `sectionMinHeight` / `sectionProps`: Per-section sizing and Box props (default `"auto"`)
- All Box props

**Usage:**
```tsx
<StickySectionStack>
  <Box skin="card" p="l">First</Box>
  <Box skin="card" p="l">Second</Box>
</StickySectionStack>
```

### TextReveal

Reveals text word by word as it scrolls through the viewport.

**Props:**
- `children`: Text string (required)
- `baseOpacity`: Opacity of unrevealed words (default `0.18`)
- `offset`: `motion` scroll offset (default `["start end", "end start"]`)
- `revealEnd`: Scroll progress at which all words are revealed (default `0.88`)
- All Text props (except `as`)

**Usage:**
```tsx
<TextReveal fontSize="xxl">Design systems scale teams, not just interfaces.</TextReveal>
```

### GradientMesh

Animated WebGL mesh-gradient background built on `@paper-design/shaders-react`. Stops animating when reduced motion is preferred.

**Props:**
- `intensity`: `"low" | "medium" | "high"` (default `"medium"`)
- `colors`: `{ primary?, secondary?, tertiary? }`
- `animated` / `speed`: Animation toggle and speed (default `true` / `1`)
- `distortion`, `swirl`, `grainMixer`, `grainOverlay`: Shader tuning (grain defaults `0`)
- `scale`, `rotation`, `offsetX`, `offsetY`: Transform (defaults `1`, `0`, `0`, `0`)
- Additional props are passed to the container

**Usage:**
```tsx
<GradientMesh intensity="high" colors={{ primary: "#3B82F6", secondary: "#A855F7" }} />
```

### ProgressiveBlur

Layered backdrop blur that increases towards one edge using gradient masks.

**Props:**
- `direction`: `"top" | "right" | "bottom" | "left"` (default `"bottom"`)
- `blurLayers`: Number of layers (default `8`)
- `blurIntensity`: Blur multiplier per layer (default `0.25`)
- `motionProps`: Props for the `motion.div` layers
- All Box props

**Usage:**
```tsx
<ProgressiveBlur direction="bottom" position="absolute" bottom={0} width="100%" height="6rem" />
```

### AppleGlow

Rotating gradient glow border in the style of Apple Intelligence, masked to the element edges.

**Props:**
- `preview`: Show the glow (default `false`)
- `colors`: Gradient colours (default `["#3B82F6", "#A855F7", "#7A84FF", "#35B3DF"]`)
- `intensity`: `"sm" | "md" | "lg" | "xl"` or a number (default `"xl"`)
- `blurAmount`: Custom blur in px
- `borderRadius`: Corner radius
- `backgroundColor`: Mask background colour (default `"base"`)
- `rotationSpeed`: Milliseconds per rotation tick (default `50`)
- All Box props

**Usage:**
```tsx
<AppleGlow preview intensity="lg" borderRadius="1rem" width="20rem" height="12rem" />
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

Floating panel that can be dragged by its header within a parent, with its position clamped to safe zones and persisted to `localStorage` per `label`.

**Exports:**
- `DraggableContainer`: Full-viewport fixed layer that renders its `children` inside a `DraggablePanel`
- `DraggablePanel`: `children` and `parentRef` (required), `label` (default `"Panel"`), `safeZone` (default `16` on each side), `initial` (`{ width, maxHeight, x, y }`, default `{ width: "30rem", maxHeight: "40rem", x: 64, y: 64 }`), `topSafeZone` (default `16`); remaining props are spread onto the panel Box
- `PanelHeader`: Drag handle bar with `label` (required), `leftControls`, `rightControls`, `onPointerDown`, `style`

**Usage:**
```tsx
<DraggableContainer>
  <Box p="m">
    <Text>Panel content</Text>
  </Box>
</DraggableContainer>
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

### AnimatedCard

Card with 3D tilt and a cursor-following spotlight. Disables effects when reduced motion is preferred.

**Props:**
- `children`: Card content (required)
- `tiltEnabled` / `maxTilt`: Tilt toggle and max degrees (default `true` / `2.3`)
- `spotlightEnabled` / `spotlightColor` / `spotlightSize`: Spotlight (default `true` / `"rgba(255, 255, 255, 0.2)"` / `300`)
- `stiffness` / `damping`: Spring config (default `300` / `30`)
- All Box props

**Usage:**
```tsx
<AnimatedCard skin="card" p="l">
  <Text>Card content</Text>
</AnimatedCard>
```

### FluorescentCard

Frosted-glass card with 3D tilt, intended for placement over colourful backgrounds. Disables tilt on touch devices and when reduced motion is preferred.

**Props:**
- `children`: Card content (required)
- `tiltEnabled` / `maxTilt`: Tilt toggle and max degrees (default `true` / `2.3`)
- `spotlightColor` / `spotlightSize`: Spotlight (default `"rgba(255, 255, 255, 0.2)"` / `300`)
- `stiffness` / `damping`: Spring config (default `300` / `30`)
- All Box props

**Usage:**
```tsx
<FluorescentCard p="l">
  <Text>Glass content</Text>
</FluorescentCard>
```

## Steps Components

### Steps

Multi-step progress indicator with optional navigation buttons, step validation and controlled or uncontrolled state.

**Props:**
- `config`: `StepConfig[]` (`{ label: string; path?: string; canNavigate?: boolean }`) (required)
- `initialStep`: Starting step when uncontrolled (default `0`)
- `controlled` / `activeStep` / `onStepChange`: Controlled mode (default `controlled={false}`)
- `showNavigation` / `navigationLabels`: Previous/next/finish buttons and their labels (default `false`)
- `allowStepClick`: Allow clicking steps (default `true`)
- `validateStep`: `(from, to) => boolean | Promise<boolean>`
- `loading`: Loading state (default `false`)
- `onComplete`: Called after the last step
- `variant` (`"light" | "dark"`), `skin`, `showLabels`, `showEdges`, `showTooltip`, `simple`, `childProps`: Shared display props

**Related exports:**
- `StepProgress` / `StepsNav`: Display-only progress track; take `config`, `active` and the shared display props (`StepsNav` adds `mt`, default `"medium"`)
- `StepIndicator`: Single step dot (`active`, `index`, `label`, `completed`, `variant` required)
- `useStepNavigation(totalSteps, initialStep?)`: Returns `{ activeStep, nextStep, prevStep, goToStep, isFirst, isLast, progress, setActiveStep }`
- `useHover()`: Returns `[ref, isHovered]`

**Usage:**
```tsx
<Steps
  config={[{ label: "Details" }, { label: "Billing" }, { label: "Confirm" }]}
  showNavigation
  onComplete={submit}
/>
```

## Charts

Imported from `@reactberry/system/charts`. Both charts are responsive `@nivo` charts styled with the shared `charttheme` export.

### BarChart

**Props:**
- `data`: Nivo bar data (required)
- `keys`: Value keys to stack (required)
- `indexBy`: Category key (required)
- `props`: Extra `ResponsiveBar` props (required, pass `{}` for none)

**Usage:**
```tsx
<BarChart data={[{ month: "Jan", sales: 10 }]} keys={["sales"]} indexBy="month" props={{}} />
```

### PieChart

Donut chart with a 75% inner radius.

**Props:**
- `data`: Nivo pie data (required)
- Any other `ResponsivePie` props

**Usage:**
```tsx
<PieChart data={[{ id: "A", value: 10 }, { id: "B", value: 5 }]} />
```

## Providers

Imported from `@reactberry/system/providers` (or the package root).

### DesignSystemProvider

Root provider: wraps `StyledComponentsRegistry`, the styled-components `ThemeProvider` and global styles.

**Props:**
- `children`: App content (required)
- `themeName`: Theme key (default `"light"`)
- `withGlobalStyles`: Inject global styles (default `true`)

**Usage:**
```tsx
<DesignSystemProvider themeName="dark">{children}</DesignSystemProvider>
```

### StyledComponentsRegistry

Collects styled-components styles during server rendering and injects them with `useServerInsertedHTML`. Already included by `DesignSystemProvider`; use it directly only when providing your own `ThemeProvider`.

**Usage:**
```tsx
<StyledComponentsRegistry>{children}</StyledComponentsRegistry>
```

## Hooks

Imported from the package root, `@reactberry/system`.

### BreakpointProvider / useBreakpoint

`BreakpointProvider` tracks the viewport breakpoint and must be mounted once above any component that uses it (including `Screen`). Breakpoints: `_` (below `xs`), `xs` 32rem, `sm` 48rem, `md` 64rem, `lg` 80rem, `xl` 96rem.

- `useBreakpoint(bp)`: `true` when the viewport is at or above `bp`
- `useShowOnBreakpoint(bp)`: `true` only when the current breakpoint is exactly `bp`

**Usage:**
```tsx
<BreakpointProvider>{children}</BreakpointProvider>

const isDesktop = useBreakpoint("lg");
```

### Other hooks

- `useHoverList()`: Returns `{ hoveredIndex, getHoverProps(index) }`; spread `getHoverProps(i)` onto each item
- `useKeypress(key, callback)`: Calls `callback` when `key` (e.g. `"Escape"`) is pressed
- `useOverlay(isOpen = true)`: Returns `{ mounted, isStandalone }` for SSR-safe overlay mounting and PWA standalone detection
- `useReducedMotion()`: `true` when the user prefers reduced motion
- `useTouchDevice()`: `true` when touch is the primary input

**Usage:**
```tsx
const { hoveredIndex, getHoverProps } = useHoverList();
useKeypress("Escape", close);
const reduceMotion = useReducedMotion();
```

## Implementation Status

### Currently Available
- **Core Layout**: Container, Main, Divider, Heading, Screen
- **UI Components**: Avatar, Icon, Tag, Skeleton, Placeholder, Thumbnail
- **Interactive Components**: Switch, Tooltip, Popover, Menu, Accordion, Drawer, Breadcrumbs, BottomSheet, Modal, MorphingPopover, FamilyDrawer, SystemNotice, Toast
- **Layout Components**: Collection, Group, List, ScrollContainer, HorizontalScroller, Filesystem
- **Pagination & Table**: Pagination, PaginationList, Table
- **Form Components**: FieldSet, Controls, InlineEditor, ColorPicker, Checkbox, MaskedField
- **Display Components**: Progress, Gallery, Slideshow, Slider, AnimatedCarousel, Marquee, Ticker, CyclingNumber, Carousel, VideoMarquee, DynamicIsland
- **Effects and Animations**: Fader, Parallax, ParallaxSection, Spotlight, ShinyText, TextBreak, StickySectionStack, TextReveal, GradientMesh, ProgressiveBlur, AppleGlow
- **Utilities**: Await, RenderAsset, Draggable, Underlay, DisplaySet
- **Cards**: InfoCard, TickerCard, AnimatedCard, FluorescentCard
- **Steps**: Steps, StepProgress, StepIndicator, StepsNav
- **Charts**: BarChart, PieChart
- **Providers & Hooks**: DesignSystemProvider, StyledComponentsRegistry, BreakpointProvider, useBreakpoint, useHoverList, useKeypress, useOverlay, useReducedMotion, useTouchDevice

### Future Roadmap (📋 Planned)
- **Data Components**: DataTable, TreeView, Timeline
- **Advanced Forms**: FormWizard, FieldBuilder, ValidationSummary
- **Layout Enhancements**: StickyHeader, ResizablePanel, SplitView
- **Feedback**: Banner, StatusIndicator

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
