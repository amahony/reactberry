# Field Component API Reference

The `Field` component extends `Text` with form input capabilities, providing consistent styling and behavior for all form input elements.

## Overview

Field is designed for all form inputs and extends the Text component with input-specific features. It provides multiple variants, sizes, and validation states while maintaining full accessibility support.

## Import

```jsx
import { Field } from '@reactberry/system/elements';
```

## Basic Usage

```jsx
<Field 
  as="input"
  type="text"
  placeholder="Enter your name"
  variant="outline"
  $size="medium"
/>
```

## Props

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `string \| React.ComponentType` | `"input"` | HTML element to render (input, textarea, select) |
| `type` | `string` | `"text"` | Input type (text, email, password, etc.) |
| `placeholder` | `string` | - | Placeholder text |
| `value` | `string` | - | Input value (controlled) |
| `defaultValue` | `string` | - | Default value (uncontrolled) |
| `onChange` | `(event: React.ChangeEvent) => void` | - | Change event handler |
| `onFocus` | `(event: React.FocusEvent) => void` | - | Focus event handler |
| `onBlur` | `(event: React.FocusEvent) => void` | - | Blur event handler |

**Inherits all [Text props](./Text.md) for typography and styling.**

### Field-Specific Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `string` | `"default"` | Field style variant from `theme.skins.field` |
| `$size` | `string` | `"medium"` | Field size variant from `theme.skins.field.sizes` |
| `invalid` | `boolean` | `false` | Invalid/error state |
| `disabled` | `boolean` | `false` | Disabled state |
| `required` | `boolean` | `false` | Required field |
| `readOnly` | `boolean` | `false` | Read-only state |
| `fullWidth` | `boolean` | `true` | Make field full width |

### Input-Specific Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `autoComplete` | `string` | - | Autocomplete attribute |
| `autoFocus` | `boolean` | `false` | Auto-focus on mount |
| `maxLength` | `number` | - | Maximum character length |
| `minLength` | `number` | - | Minimum character length |
| `pattern` | `string` | - | Validation pattern (regex) |
| `step` | `number` | - | Step increment (for number inputs) |
| `min` | `number` | - | Minimum value (for number inputs) |
| `max` | `number` | - | Maximum value (for number inputs) |

### Textarea-Specific Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `rows` | `number` | `3` | Number of visible rows |
| `cols` | `number` | - | Number of visible columns |
| `resize` | `"none" \| "vertical" \| "horizontal" \| "both"` | `"vertical"` | Resize behavior |
| `wrap` | `"hard" \| "soft"` | `"soft"` | Text wrapping |

### Select-Specific Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `multiple` | `boolean` | `false` | Allow multiple selections |
| `size` | `number` | - | Number of visible options |

### Default Attributes

The Field component automatically applies these attributes:

- `display="block"` - Block display
- `width="100%"` - Full width (when fullWidth is true)
- `border="none"` - Remove default border
- `shape="rounded"` - Default border radius
- `transition="all 0.2s ease"` - Smooth transitions

## Available Variants

### Primary Variants
- `default` - Standard field with light background and border
- `outline` - Outlined field with transparent background
- `filled` - Filled background with subtle border
- `ghost` - Minimal styling with focus states only

### State Variants
- `error` - Error state with red styling
- `success` - Success state with green styling
- `warning` - Warning state with yellow styling

## Available Sizes

| Size | Height | Padding | Font Size |
|------|--------|---------|-----------|
| `small` | 36px | 8px 12px | 14px |
| `medium` | 44px | 12px 16px | 16px |
| `large` | 52px | 16px 20px | 18px |

## Examples

### Basic Input Types

```jsx
{/* Text input */}
<Field 
  as="input"
  type="text"
  placeholder="Enter your name"
  variant="outline"
  $size="medium"
/>

{/* Email input */}
<Field 
  as="input"
  type="email"
  placeholder="Enter your email"
  variant="outline"
  $size="medium"
  autoComplete="email"
/>

{/* Password input */}
<Field 
  as="input"
  type="password"
  placeholder="Enter your password"
  variant="outline"
  $size="medium"
  autoComplete="current-password"
/>

{/* Number input */}
<Field 
  as="input"
  type="number"
  placeholder="Enter amount"
  variant="outline"
  $size="medium"
  min={0}
  max={100}
  step={1}
/>
```

### Field Variants

```jsx
{/* Default variant */}
<Field 
  as="input"
  type="text"
  placeholder="Default field"
  variant="default"
  $size="medium"
/>

{/* Outline variant */}
<Field 
  as="input"
  type="text"
  placeholder="Outline field"
  variant="outline"
  $size="medium"
/>

{/* Filled variant */}
<Field 
  as="input"
  type="text"
  placeholder="Filled field"
  variant="filled"
  $size="medium"
/>

{/* Ghost variant */}
<Field 
  as="input"
  type="text"
  placeholder="Ghost field"
  variant="ghost"
  $size="medium"
/>
```

### Field Sizes

```jsx
{/* Small field */}
<Field 
  as="input"
  type="text"
  placeholder="Small field"
  variant="outline"
  $size="small"
/>

{/* Medium field */}
<Field 
  as="input"
  type="text"
  placeholder="Medium field"
  variant="outline"
  $size="medium"
/>

{/* Large field */}
<Field 
  as="input"
  type="text"
  placeholder="Large field"
  variant="outline"
  $size="large"
/>
```

### Field States

```jsx
{/* Invalid/Error state */}
<Field 
  as="input"
  type="email"
  placeholder="Enter valid email"
  variant="outline"
  $size="medium"
  invalid={true}
  value="invalid-email"
/>

{/* Disabled state */}
<Field 
  as="input"
  type="text"
  placeholder="Disabled field"
  variant="outline"
  $size="medium"
  disabled={true}
/>

{/* Required field */}
<Field 
  as="input"
  type="text"
  placeholder="Required field"
  variant="outline"
  $size="medium"
  required={true}
/>

{/* Read-only field */}
<Field 
  as="input"
  type="text"
  value="Read-only value"
  variant="outline"
  $size="medium"
  readOnly={true}
/>
```

### Textarea Fields

```jsx
{/* Basic textarea */}
<Field 
  as="textarea"
  placeholder="Enter your message"
  variant="outline"
  rows={4}
  resize="vertical"
/>

{/* Fixed height textarea */}
<Field 
  as="textarea"
  placeholder="Fixed height"
  variant="filled"
  rows={6}
  resize="none"
/>

{/* Auto-expanding textarea */}
<Field 
  as="textarea"
  placeholder="Auto-expanding"
  variant="outline"
  rows={2}
  resize="none"
  style={{ minHeight: '80px' }}
/>
```

### Select Fields

```jsx
{/* Basic select */}
<Field as="select" variant="outline" $size="medium">
  <option value="">Select an option</option>
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
  <option value="option3">Option 3</option>
</Field>

{/* Multiple select */}
<Field as="select" variant="outline" $size="medium" multiple size={4}>
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
  <option value="option3">Option 3</option>
  <option value="option4">Option 4</option>
</Field>
```

### Specialized Input Types

```jsx
{/* Date input */}
<Field 
  as="input"
  type="date"
  variant="outline"
  $size="medium"
/>

{/* Time input */}
<Field 
  as="input"
  type="time"
  variant="outline"
  $size="medium"
/>

{/* File input */}
<Field 
  as="input"
  type="file"
  variant="outline"
  $size="medium"
  accept="image/*"
/>

{/* Search input */}
<Field 
  as="input"
  type="search"
  placeholder="Search..."
  variant="outline"
  $size="medium"
/>
```

## Form Field Patterns

### Field with Label

```jsx
<Box>
  <Text as="label" fontSize="s" fontWeight="medium" mb="xs" display="block">
    Email Address
  </Text>
  <Field 
    as="input"
    type="email"
    placeholder="Enter your email"
    variant="outline"
    $size="medium"
    required
  />
</Box>
```

### Field with Help Text

```jsx
<Box>
  <Text as="label" fontSize="s" fontWeight="medium" mb="xs" display="block">
    Password
  </Text>
  <Field 
    as="input"
    type="password"
    placeholder="Enter your password"
    variant="outline"
    $size="medium"
    minLength={8}
    mb="xs"
  />
  <Text fontSize="xs" color="secondary">
    Password must be at least 8 characters long
  </Text>
</Box>
```

### Field with Error State

```jsx
<Box>
  <Text as="label" fontSize="s" fontWeight="medium" mb="xs" display="block">
    Username
  </Text>
  <Field 
    as="input"
    type="text"
    placeholder="Enter username"
    variant="outline"
    $size="medium"
    invalid={hasError}
    value={username}
    onChange={handleUsernameChange}
    mb="xs"
  />
  {hasError && (
    <Text fontSize="xs" color="error">
      Username is already taken
    </Text>
  )}
</Box>
```

### Field with Success State

```jsx
<Box>
  <Text as="label" fontSize="s" fontWeight="medium" mb="xs" display="block">
    Email
  </Text>
  <Field 
    as="input"
    type="email"
    placeholder="Enter your email"
    variant="outline"
    $size="medium"
    value={email}
    onChange={handleEmailChange}
    mb="xs"
  />
  {isValid && (
    <Text fontSize="xs" color="success">
      ✓ Email is valid
    </Text>
  )}
</Box>
```

## Responsive Design

```jsx
{/* Responsive sizes */}
<Field 
  as="input"
  type="text"
  placeholder="Responsive field"
  variant="outline"
  $size={['small', 'medium', 'large']}
/>

{/* Responsive full width */}
<Field 
  as="input"
  type="text"
  placeholder="Responsive width"
  variant="outline"
  $size="medium"
  fullWidth={[true, false]}
/>
```

## Accessibility

### ARIA Attributes

```jsx
{/* Field with ARIA label */}
<Field 
  as="input"
  type="text"
  placeholder="Search products"
  variant="outline"
  $size="medium"
  aria-label="Search products"
/>

{/* Field with ARIA description */}
<Field 
  as="input"
  type="password"
  placeholder="Password"
  variant="outline"
  $size="medium"
  aria-describedby="password-help"
/>
<Text id="password-help" fontSize="xs" color="secondary">
  Must contain at least 8 characters
</Text>
```

### Form Validation

```jsx
{/* Required field with validation */}
<Field 
  as="input"
  type="email"
  placeholder="Email"
  variant="outline"
  $size="medium"
  required
  aria-invalid={hasError}
  aria-describedby={hasError ? "email-error" : undefined}
/>
{hasError && (
  <Text id="email-error" fontSize="xs" color="error" role="alert">
    Please enter a valid email address
  </Text>
)}
```

### Label Association

```jsx
{/* Proper label association */}
<Box>
  <Text as="label" htmlFor="user-name" fontSize="s" fontWeight="medium" mb="xs" display="block">
    Full Name
  </Text>
  <Field 
    id="user-name"
    as="input"
    type="text"
    placeholder="Enter your full name"
    variant="outline"
    $size="medium"
  />
</Box>
```

## Advanced Usage

### Custom Validation

```jsx
function ValidatedField({ value, onChange, validator, ...props }) {
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const newValue = e.target.value;
    const validationError = validator(newValue);
    setError(validationError);
    onChange(e);
  };
  
  return (
    <Box>
      <Field 
        {...props}
        value={value}
        onChange={handleChange}
        invalid={!!error}
      />
      {error && (
        <Text fontSize="xs" color="error" mt="xs">
          {error}
        </Text>
      )}
    </Box>
  );
}
```

### Controlled vs Uncontrolled

```jsx
{/* Controlled field */}
<Field 
  as="input"
  type="text"
  value={inputValue}
  onChange={(e) => setInputValue(e.target.value)}
  variant="outline"
  $size="medium"
/>

{/* Uncontrolled field */}
<Field 
  as="input"
  type="text"
  defaultValue="Initial value"
  variant="outline"
  $size="medium"
/>
```

### Field with Refs

```jsx
function FocusableField() {
  const fieldRef = useRef(null);
  
  const handleFocus = () => {
    fieldRef.current?.focus();
  };
  
  return (
    <Box>
      <Field 
        ref={fieldRef}
        as="input"
        type="text"
        placeholder="Focusable field"
        variant="outline"
        $size="medium"
      />
      <Button onClick={handleFocus} variant="outline" $size="small" mt="s">
        Focus Field
      </Button>
    </Box>
  );
}
```

## Best Practices

### ✅ Do

```jsx
// Use appropriate input types
<Field as="input" type="email" placeholder="Email" />
<Field as="input" type="tel" placeholder="Phone" />
<Field as="input" type="url" placeholder="Website" />

// Use proper labels
<Text as="label" htmlFor="field-id">Field Label</Text>
<Field id="field-id" as="input" type="text" />

// Use consistent sizing
<Field variant="outline" $size="medium" />

// Provide helpful placeholder text
<Field placeholder="Enter your full name" />
```

### ❌ Don't

```jsx
// Don't use Text for form inputs
<Text as="input" type="text" />

// Don't use generic placeholders
<Field placeholder="Enter text" />

// Don't forget labels for accessibility
<Field as="input" type="text" /> // Missing label

// Don't use inconsistent sizing
<Field $size="small" />
<Field $size="large" /> // Mixed sizes in same form
```

## TypeScript

```tsx
import { FieldProps } from '@reactberry/system/elements';

interface CustomFieldProps extends FieldProps {
  label?: string;
  error?: string;
  helpText?: string;
}

function CustomField({ label, error, helpText, ...fieldProps }: CustomFieldProps) {
  return (
    <Box>
      {label && (
        <Text as="label" fontSize="s" fontWeight="medium" mb="xs" display="block">
          {label}
        </Text>
      )}
      <Field {...fieldProps} invalid={!!error} />
      {error && (
        <Text fontSize="xs" color="error" mt="xs">
          {error}
        </Text>
      )}
      {helpText && !error && (
        <Text fontSize="xs" color="secondary" mt="xs">
          {helpText}
        </Text>
      )}
    </Box>
  );
}
```

## Related Components

- **[Text](./Text.md)** - Field extends Text with form input functionality
- **[Button](./Button.md)** - Use for form submissions and actions
- **[Box](./Box.md)** - Use for form layout and grouping

## Migration Notes

When migrating to the Field component:

- Replace `<input>`, `<textarea>`, and `<select>` elements with `<Field>` component
- Use `variant` prop instead of custom CSS classes
- Use `$size` prop for consistent sizing
- Add proper labels and ARIA attributes for accessibility
- Use appropriate input types for better UX and validation