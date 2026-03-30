# Accessibility Guide

Learn how to build inclusive, accessible interfaces using the Design System's built-in accessibility features.

## Overview

The Design System is built with accessibility as a core principle. Every component includes semantic HTML, ARIA attributes, and keyboard navigation support to ensure your applications are usable by everyone, including users with disabilities.

## Accessibility Principles

### 1. Perceivable
Information and UI components must be presentable in ways users can perceive.

### 2. Operable
User interface components and navigation must be operable.

### 3. Understandable
Information and operation of the user interface must be understandable.

### 4. Robust
Content must be robust enough to be interpreted by a wide variety of user agents, including assistive technologies.

## Semantic HTML

### Use Proper HTML Elements

The design system encourages semantic HTML through component design:

```jsx
// ✅ Good - Semantic HTML structure
<Box as="main">
  <Box as="header">
    <Text as="h1" fontSize="xl" fontWeight="bold">
      Page Title
    </Text>
  </Box>
  
  <Box as="nav" role="navigation">
    <Text as="h2" fontSize="m" fontWeight="medium">
      Navigation
    </Text>
    <Box as="ul" role="list">
      <Box as="li" role="listitem">
        <Text as="a" href="/home">Home</Text>
      </Box>
    </Box>
  </Box>
  
  <Box as="section">
    <Text as="h2" fontSize="l" fontWeight="bold">
      Section Title
    </Text>
    <Text as="p" fontSize="m">
      Section content
    </Text>
  </Box>
</Box>
```

### Heading Hierarchy

Maintain proper heading structure for screen readers:

```jsx
<Box as="article">
  <Text as="h1" fontSize="xxl" fontWeight="bold">
    Article Title
  </Text>
  
  <Box as="section">
    <Text as="h2" fontSize="xl" fontWeight="bold">
      Section Title
    </Text>
    
    <Box as="section">
      <Text as="h3" fontSize="l" fontWeight="medium">
        Subsection Title
      </Text>
      <Text as="p" fontSize="m">
        Content goes here
      </Text>
    </Box>
  </Box>
</Box>
```

## ARIA Attributes

### Labels and Descriptions

```jsx
// Button with aria-label
<Button
  variant="ghost"
  $size="medium"
  aria-label="Close dialog"
  onClick={handleClose}
>
  ✕
</Button>

// Field with aria-describedby
<Box>
  <Text as="label" htmlFor="password-field">
    Password
  </Text>
  <Field
    id="password-field"
    as="input"
    type="password"
    aria-describedby="password-help"
    required
  />
  <Text id="password-help" fontSize="xs" color="secondary">
    Must be at least 8 characters long
  </Text>
</Box>

// Error states with aria-invalid
<Field
  as="input"
  type="email"
  aria-invalid={hasError}
  aria-describedby={hasError ? "email-error" : undefined}
/>
{hasError && (
  <Text id="email-error" fontSize="xs" color="error" role="alert">
    Please enter a valid email address
  </Text>
)}
```

### Roles and States

```jsx
// Toggle button with aria-pressed
<Button
  variant={isActive ? 'primary' : 'outline'}
  aria-pressed={isActive}
  onClick={() => setIsActive(!isActive)}
>
  {isActive ? 'Active' : 'Inactive'}
</Button>

// Expandable content with aria-expanded
<Box>
  <Button
    variant="ghost"
    aria-expanded={isExpanded}
    aria-controls="expandable-content"
    onClick={() => setIsExpanded(!isExpanded)}
  >
    {isExpanded ? 'Collapse' : 'Expand'} Details
  </Button>
  
  <Box
    id="expandable-content"
    display={isExpanded ? 'block' : 'none'}
    role="region"
    aria-labelledby="expand-button"
  >
    <Text>Expandable content</Text>
  </Box>
</Box>

// Loading states with aria-busy
<Box aria-busy={isLoading}>
  {isLoading ? (
    <Text>Loading...</Text>
  ) : (
    <Text>Content loaded</Text>
  )}
</Box>
```

## Keyboard Navigation

### Focus Management

```jsx
// Custom focus styles
<Button
  variant="primary"
  focus="highlight"
  interactive={{
    focus: {
      outline: '2px solid',
      outlineColor: 'palette.brands.5',
      outlineOffset: '2px'
    }
  }}
>
  Focused Button
</Button>

// Skip to content link
<Box
  as="a"
  href="#main-content"
  position="absolute"
  top="-40px"
  left="0"
  bg="primary"
  color="white"
  p="s"
  zIndex={9999}
  css={{
    ':focus': {
      top: '0'
    }
  }}
>
  Skip to main content
</Box>
```

### Keyboard Event Handlers

```jsx
// Custom keyboard navigation
<Box
  as="button"
  tabIndex={0}
  role="button"
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleAction();
    }
  }}
  cursor="pointer"
  p="s"
  hover="subtle"
  focus="highlight"
>
  <Text>Custom Button</Text>
</Box>

// Arrow key navigation
function NavigationList({ items, onSelect }) {
  const [focusedIndex, setFocusedIndex] = useState(0);
  
  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex((prev) => (prev + 1) % items.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((prev) => (prev - 1 + items.length) % items.length);
        break;
      case 'Enter':
        e.preventDefault();
        onSelect(items[focusedIndex]);
        break;
    }
  };
  
  return (
    <Box role="listbox" onKeyDown={handleKeyDown}>
      {items.map((item, index) => (
        <Box
          key={item.id}
          role="option"
          aria-selected={index === focusedIndex}
          tabIndex={index === focusedIndex ? 0 : -1}
          p="s"
          cursor="pointer"
          hover="subtle"
          focus="highlight"
          bg={index === focusedIndex ? 'palette.neutrals.2' : 'transparent'}
        >
          <Text>{item.label}</Text>
        </Box>
      ))}
    </Box>
  );
}
```

## Color and Contrast

### Color Contrast Standards

Ensure sufficient contrast ratios:
- **Normal text**: 4.5:1 minimum
- **Large text**: 3:1 minimum
- **Interactive elements**: 3:1 minimum

```jsx
// Good contrast examples
<Text color="primary" bg="white">
  High contrast text
</Text>

<Text color="white" bg="primary">
  Reversed high contrast
</Text>

// Use semantic colors that maintain contrast
<Box skin="success" p="s">
  <Text>Success message with proper contrast</Text>
</Box>

<Box skin="error" p="s">
  <Text>Error message with proper contrast</Text>
</Box>
```

### Don't Rely on Color Alone

```jsx
// ❌ Bad - Color only
<Text color="error">Error message</Text>

// ✅ Good - Color + icon + text
<Box display="flex" alignItems="center" gap="xs">
  <Text color="error">⚠️</Text>
  <Text color="error" fontWeight="medium">
    Error: Please check your input
  </Text>
</Box>

// ✅ Good - Multiple indicators
<Field
  as="input"
  type="email"
  invalid={hasError}
  borderColor={hasError ? 'error' : 'neutral.5'}
  aria-invalid={hasError}
  aria-describedby={hasError ? 'email-error' : undefined}
/>
```

## Form Accessibility

### Labels and Fieldsets

```jsx
// Proper label association
<Box>
  <Text as="label" htmlFor="email-input" fontSize="s" fontWeight="medium">
    Email Address
  </Text>
  <Field
    id="email-input"
    as="input"
    type="email"
    placeholder="Enter your email"
    variant="outline"
    required
    aria-describedby="email-help"
  />
  <Text id="email-help" fontSize="xs" color="secondary">
    We'll never share your email
  </Text>
</Box>

// Fieldset for grouped fields
<Box as="fieldset">
  <Text as="legend" fontSize="m" fontWeight="bold" mb="s">
    Personal Information
  </Text>
  
  <Box display="grid" gridTemplateColumns="1fr 1fr" gap="m">
    <Box>
      <Text as="label" htmlFor="first-name">First Name</Text>
      <Field id="first-name" as="input" type="text" required />
    </Box>
    
    <Box>
      <Text as="label" htmlFor="last-name">Last Name</Text>
      <Field id="last-name" as="input" type="text" required />
    </Box>
  </Box>
</Box>
```

### Error Handling

```jsx
function AccessibleForm() {
  const [errors, setErrors] = useState({});
  
  return (
    <Box as="form" onSubmit={handleSubmit}>
      {/* Error summary */}
      {Object.keys(errors).length > 0 && (
        <Box
          role="alert"
          aria-labelledby="error-summary-title"
          skin="error"
          p="m"
          mb="m"
          shape="rounded"
        >
          <Text id="error-summary-title" fontSize="m" fontWeight="bold" mb="s">
            Please correct the following errors:
          </Text>
          <Box as="ul" role="list">
            {Object.entries(errors).map(([field, error]) => (
              <Box as="li" key={field} role="listitem">
                <Text fontSize="s">
                  <Text as="a" href={`#${field}`} color="error">
                    {error}
                  </Text>
                </Text>
              </Box>
            ))}
          </Box>
        </Box>
      )}
      
      {/* Form fields */}
      <Box>
        <Text as="label" htmlFor="username">Username</Text>
        <Field
          id="username"
          as="input"
          type="text"
          invalid={!!errors.username}
          aria-invalid={!!errors.username}
          aria-describedby={errors.username ? 'username-error' : undefined}
        />
        {errors.username && (
          <Text id="username-error" fontSize="xs" color="error" role="alert">
            {errors.username}
          </Text>
        )}
      </Box>
    </Box>
  );
}
```

## Focus Management

### Focus Trapping

```jsx
function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef(null);
  
  useEffect(() => {
    if (isOpen) {
      // Focus first focusable element
      const firstFocusable = modalRef.current?.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      firstFocusable?.focus();
    }
  }, [isOpen]);
  
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
    
    if (e.key === 'Tab') {
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements) {
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      bg="rgba(0, 0, 0, 0.5)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex={1000}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onKeyDown={handleKeyDown}
    >
      <Box
        ref={modalRef}
        skin="overlay"
        p="l"
        shape="rounded"
        maxWidth="500px"
        width="90%"
      >
        {children}
      </Box>
    </Box>
  );
}
```

### Focus Indicators

```jsx
// Custom focus rings
<Button
  variant="primary"
  interactive={{
    focus: {
      outline: '2px solid',
      outlineColor: 'palette.brands.5',
      outlineOffset: '2px',
      boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.2)'
    }
  }}
>
  Custom Focus Ring
</Button>

// High contrast focus
<Button
  variant="outline"
  interactive={{
    focus: {
      outline: '3px solid',
      outlineColor: 'black',
      outlineOffset: '1px'
    }
  }}
>
  High Contrast Focus
</Button>
```

## Screen Reader Support

### Live Regions

```jsx
// Announcements
<Box
  role="status"
  aria-live="polite"
  aria-atomic="true"
  position="absolute"
  left="-10000px"
  width="1px"
  height="1px"
  overflow="hidden"
>
  {statusMessage}
</Box>

// Urgent announcements
<Box
  role="alert"
  aria-live="assertive"
  aria-atomic="true"
  position="absolute"
  left="-10000px"
  width="1px"
  height="1px"
  overflow="hidden"
>
  {alertMessage}
</Box>
```

### Descriptive Content

```jsx
// Progress indicators
<Box>
  <Text as="label" htmlFor="progress-bar">
    File Upload Progress
  </Text>
  <Box
    id="progress-bar"
    role="progressbar"
    aria-valuenow={progress}
    aria-valuemin={0}
    aria-valuemax={100}
    aria-labelledby="progress-label"
    bg="neutral.3"
    height="8px"
    shape="rounded"
    overflow="hidden"
  >
    <Box
      bg="primary"
      height="100%"
      width={`${progress}%`}
      transition="width 0.3s ease"
    />
  </Box>
  <Text id="progress-label" fontSize="xs" color="secondary">
    {progress}% complete
  </Text>
</Box>

// Complex widgets
<Box
  role="tablist"
  aria-label="Account settings"
  display="flex"
  borderBottom="1px solid"
  borderColor="neutral.3"
>
  {tabs.map((tab, index) => (
    <Button
      key={tab.id}
      role="tab"
      aria-selected={activeTab === index}
      aria-controls={`tabpanel-${tab.id}`}
      id={`tab-${tab.id}`}
      variant="ghost"
      tabIndex={activeTab === index ? 0 : -1}
      onClick={() => setActiveTab(index)}
    >
      {tab.label}
    </Button>
  ))}
</Box>
```

## Mobile Accessibility

### Touch Targets

```jsx
// Minimum touch target size (44x44px)
<Button
  variant="ghost"
  minHeight="44px"
  minWidth="44px"
  p="s"
  aria-label="Close"
>
  ✕
</Button>

// Adequate spacing between touch targets
<Box display="flex" gap="s">
  <Button variant="outline" $size="medium" minHeight="44px">
    Cancel
  </Button>
  <Button variant="primary" $size="medium" minHeight="44px">
    Save
  </Button>
</Box>
```

### Responsive Focus

```jsx
// Larger focus areas on mobile
<Button
  variant="primary"
  interactive={{
    focus: {
      outline: ['2px solid', '3px solid'],
      outlineOffset: ['1px', '2px']
    }
  }}
>
  Mobile-Friendly Focus
</Button>
```

## Testing Accessibility

### Automated Testing

```jsx
// Add accessibility testing attributes
<Button
  variant="primary"
  data-testid="submit-button"
  aria-label="Submit form"
  role="button"
>
  Submit
</Button>

// Test with jest-axe
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('should not have accessibility violations', async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Manual Testing

1. **Keyboard Navigation**
   - Tab through all interactive elements
   - Ensure focus is visible
   - Test keyboard shortcuts

2. **Screen Reader Testing**
   - Use NVDA, JAWS, or VoiceOver
   - Check heading structure
   - Verify announcements

3. **Color Contrast**
   - Use browser dev tools
   - Test with color blindness simulators
   - Check in different lighting conditions

## Common Patterns

### Accessible Cards

```jsx
<Box
  as="article"
  skin="card"
  p="m"
  cursor="pointer"
  hover="subtle"
  focus="highlight"
  tabIndex={0}
  role="button"
  aria-label={`Read more about ${title}`}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
>
  <Text as="h3" fontSize="m" fontWeight="bold" mb="s">
    {title}
  </Text>
  <Text fontSize="s" color="secondary">
    {description}
  </Text>
</Box>
```

### Accessible Navigation

```jsx
<Box as="nav" role="navigation" aria-label="Main navigation">
  <Box as="ul" role="list" display="flex" gap="m">
    {navItems.map((item) => (
      <Box as="li" key={item.id} role="listitem">
        <Text
          as="a"
          href={item.href}
          fontSize="s"
          color="secondary"
          hover="primary"
          aria-current={item.current ? 'page' : undefined}
          fontWeight={item.current ? 'bold' : 'normal'}
        >
          {item.label}
        </Text>
      </Box>
    ))}
  </Box>
</Box>
```

## Best Practices

### ✅ Do

- Use semantic HTML elements
- Provide text alternatives for images
- Ensure keyboard accessibility
- Maintain proper heading hierarchy
- Use sufficient color contrast
- Provide clear focus indicators
- Use ARIA attributes appropriately
- Test with assistive technologies

### ❌ Don't

- Rely on color alone to convey information
- Use placeholder text as labels
- Create keyboard traps
- Remove focus indicators
- Use generic link text like "click here"
- Assume all users use a mouse
- Ignore screen reader testing
- Use auto-playing media without controls

## Resources

### Tools
- **axe-core** - Accessibility testing engine
- **Lighthouse** - Performance and accessibility auditing
- **Wave** - Web accessibility evaluation tool
- **Colour Contrast Analyser** - Color contrast testing

### Screen Readers
- **NVDA** - Free Windows screen reader
- **JAWS** - Popular Windows screen reader
- **VoiceOver** - macOS/iOS built-in screen reader
- **TalkBack** - Android screen reader

### Guidelines
- **WCAG 2.1** - Web Content Accessibility Guidelines
- **Section 508** - US federal accessibility standards
- **ADA** - Americans with Disabilities Act compliance

Remember: Accessibility is not a feature to be added later—it should be considered from the beginning of the design and development process. The Design System provides the foundation, but thoughtful implementation and testing are essential for creating truly inclusive experiences.