# Component Composition Guide

Learn how to build complex, maintainable UIs by composing simple elements in the Design System.

## Overview

Component composition is the practice of building complex interfaces by combining simple, reusable components. The Design System is specifically designed around this principle, where every component builds upon simpler ones.

## Composition Hierarchy

```
Application Components
        ↑
    Blocks (Composed Components)
        ↑
    Elements (Building Blocks)
        ↑
    Theme (Design Tokens)
```

### Elements (Foundation)
- **Box** - Layout and containers
- **Text** - Typography and semantic HTML
- **Button** - Interactive elements
- **Field** - Form inputs

### Blocks (Composed)
- **Card** - Box + Text + optional Button
- **Modal** - Box + Text + Button composition
- **Navigation** - Box + Text + Button layouts

## Basic Composition Patterns

### 1. Container + Content Pattern

The most fundamental pattern: a Box container with Text content.

```jsx
<Box p="m" bg="surface">
  <Text as="h2" fontSize="l" fontWeight="bold">
    Section Title
  </Text>
  <Text as="p" fontSize="s" color="secondary">
    Section description
  </Text>
</Box>
```

### 2. Layout + Items Pattern

Arrange multiple items in a layout container.

```jsx
<Box display="flex" gap="s" alignItems="center">
  <Text fontSize="m" fontWeight="medium">Label:</Text>
  <Text fontSize="s" color="secondary">Value</Text>
  <Button variant="outline" $size="small">Edit</Button>
</Box>
```

### 3. Form Field Pattern

Combine label, input, and help text.

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
    mb="xs"
  />
  <Text fontSize="xs" color="secondary">
    We'll never share your email with anyone else.
  </Text>
</Box>
```

## Building Complex Layouts

### Dashboard Layout

```jsx
function Dashboard() {
  return (
    <Box minHeight="100vh" bg="base">
      {/* Header */}
      <Box as="header" skin="surface" p="m" borderBottom="1px solid" borderColor="neutral.3">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Text as="h1" fontSize="l" fontWeight="bold" color="primary">
            Dashboard
          </Text>
          <Box display="flex" gap="s" alignItems="center">
            <Button variant="outline" $size="small">Settings</Button>
            <Button variant="primary" $size="small">New Project</Button>
          </Box>
        </Box>
      </Box>

      {/* Main Content */}
      <Box display="flex" flex="1">
        {/* Sidebar */}
        <Box as="aside" width="250px" skin="panel" p="m">
          <Box display="flex" flexDirection="column" gap="xs">
            <Text as="h3" fontSize="s" fontWeight="medium" color="secondary" mb="xs">
              Navigation
            </Text>
            <NavigationItem label="Overview" active />
            <NavigationItem label="Projects" />
            <NavigationItem label="Team" />
            <NavigationItem label="Analytics" />
          </Box>
        </Box>

        {/* Content Area */}
        <Box as="main" flex="1" p="l">
          <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap="l">
            <StatsCard title="Total Projects" value="24" trend="+12%" />
            <StatsCard title="Active Users" value="1,847" trend="+5%" />
            <StatsCard title="Revenue" value="$12,450" trend="+18%" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function NavigationItem({ label, active = false }) {
  return (
    <Box
      as="button"
      p="s"
      width="100%"
      textAlign="left"
      skin={active ? "highlight" : "transparent"}
      hover="subtle"
      shape="rounded"
      cursor="pointer"
    >
      <Text fontSize="s" fontWeight={active ? "medium" : "normal"}>
        {label}
      </Text>
    </Box>
  );
}

function StatsCard({ title, value, trend }) {
  return (
    <Box skin="card" p="m" gap="s">
      <Text as="h3" fontSize="s" fontWeight="medium" color="secondary">
        {title}
      </Text>
      <Text as="p" fontSize="xxl" fontWeight="bold" color="primary">
        {value}
      </Text>
      <Text fontSize="xs" color="success" fontWeight="medium">
        {trend}
      </Text>
    </Box>
  );
}
```

### Article Layout

```jsx
function Article({ title, author, publishDate, content, tags }) {
  return (
    <Box maxWidth="800px" mx="auto" p="l">
      {/* Article Header */}
      <Box as="header" mb="xl">
        <Text as="h1" fontSize="xxxl" fontWeight="bold" color="primary" mb="m">
          {title}
        </Text>
        
        <Box display="flex" alignItems="center" gap="m" mb="m">
          <Text fontSize="s" color="secondary">
            By {author}
          </Text>
          <Text fontSize="s" color="tertiary">
            •
          </Text>
          <Text fontSize="s" color="secondary">
            {publishDate}
          </Text>
        </Box>

        {/* Tags */}
        <Box display="flex" gap="xs" flexWrap="wrap">
          {tags.map(tag => (
            <Box key={tag} skin="neutral" px="xs" py="mini" shape="rounded">
              <Text fontSize="xs" fontWeight="medium">
                {tag}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Article Content */}
      <Box as="article" display="flex" flexDirection="column" gap="m">
        {content.map((paragraph, index) => (
          <Text key={index} as="p" fontSize="m" lineHeight="relaxed">
            {paragraph}
          </Text>
        ))}
      </Box>

      {/* Article Footer */}
      <Box as="footer" mt="xl" pt="l" borderTop="1px solid" borderColor="neutral.3">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Text fontSize="s" color="secondary">
            Was this article helpful?
          </Text>
          <Box display="flex" gap="s">
            <Button variant="outline" $size="small">👍 Yes</Button>
            <Button variant="outline" $size="small">👎 No</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
```

## Form Composition

### Contact Form

```jsx
function ContactForm() {
  return (
    <Box maxWidth="500px" mx="auto" skin="card" p="l">
      <Text as="h2" fontSize="xl" fontWeight="bold" color="primary" mb="m">
        Get in Touch
      </Text>

      <Box as="form" display="flex" flexDirection="column" gap="m">
        {/* Name Fields */}
        <Box display="grid" gridTemplateColumns={["1fr", "1fr 1fr"]} gap="m">
          <FormField 
            label="First Name" 
            type="text" 
            placeholder="John"
            required 
          />
          <FormField 
            label="Last Name" 
            type="text" 
            placeholder="Doe"
            required 
          />
        </Box>

        {/* Contact Fields */}
        <FormField 
          label="Email" 
          type="email" 
          placeholder="john@example.com"
          required 
        />
        <FormField 
          label="Phone" 
          type="tel" 
          placeholder="+1 (555) 123-4567"
        />

        {/* Subject */}
        <Box>
          <Text as="label" fontSize="s" fontWeight="medium" mb="xs" display="block">
            Subject
          </Text>
          <Field 
            as="select"
            variant="outline"
            $size="medium"
          >
            <option value="">Select a topic</option>
            <option value="general">General Inquiry</option>
            <option value="support">Technical Support</option>
            <option value="sales">Sales Question</option>
            <option value="feedback">Feedback</option>
          </Field>
        </Box>

        {/* Message */}
        <FormField 
          label="Message" 
          as="textarea"
          placeholder="Tell us how we can help..."
          rows={4}
          required 
        />

        {/* Privacy Notice */}
        <Box skin="panel" p="s" shape="rounded">
          <Text fontSize="xs" color="secondary" lineHeight="relaxed">
            By submitting this form, you agree to our Privacy Policy and Terms of Service.
          </Text>
        </Box>

        {/* Submit Actions */}
        <Box display="flex" gap="s" justifyContent="flex-end" mt="m">
          <Button variant="outline" $size="medium">
            Cancel
          </Button>
          <Button variant="primary" $size="medium">
            Send Message
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

function FormField({ label, required, helpText, error, ...fieldProps }) {
  return (
    <Box>
      <Text 
        as="label" 
        fontSize="s" 
        fontWeight="medium" 
        mb="xs" 
        display="block"
      >
        {label}
        {required && (
          <Text as="span" color="error" ml="mini">*</Text>
        )}
      </Text>
      
      <Field 
        variant={error ? "error" : "outline"}
        $size="medium"
        {...fieldProps}
      />
      
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

## Interactive Compositions

### Modal Dialog

```jsx
function Modal({ isOpen, onClose, title, children }) {
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
      p="m"
    >
      <Box
        skin="overlay"
        maxWidth="500px"
        width="100%"
        maxHeight="90vh"
        overflowY="auto"
        shape="rounded"
        p="l"
        position="relative"
      >
        {/* Header */}
        <Box display="flex" alignItems="center" justifyContent="space-between" mb="m">
          <Text as="h2" fontSize="l" fontWeight="bold" color="primary">
            {title}
          </Text>
          <Button 
            variant="ghost" 
            $size="small" 
            onClick={onClose}
            shape="circle"
          >
            ✕
          </Button>
        </Box>

        {/* Content */}
        <Box>
          {children}
        </Box>
      </Box>
    </Box>
  );
}

function ConfirmationModal({ isOpen, onClose, onConfirm, title, message, confirmText = "Confirm", cancelText = "Cancel" }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <Box display="flex" flexDirection="column" gap="m">
        <Text fontSize="m" color="secondary">
          {message}
        </Text>
        
        <Box display="flex" gap="s" justifyContent="flex-end">
          <Button variant="outline" $size="medium" onClick={onClose}>
            {cancelText}
          </Button>
          <Button variant="primary" $size="medium" onClick={onConfirm}>
            {confirmText}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
```

### Dropdown Menu

```jsx
function DropdownMenu({ trigger, items, isOpen, onToggle }) {
  return (
    <Box position="relative" display="inline-block">
      <Box onClick={onToggle} cursor="pointer">
        {trigger}
      </Box>
      
      {isOpen && (
        <Box
          position="absolute"
          top="100%"
          right="0"
          mt="xs"
          skin="overlay"
          shape="rounded"
          py="xs"
          minWidth="200px"
          zIndex={100}
        >
          {items.map((item, index) => (
            <DropdownItem key={index} {...item} />
          ))}
        </Box>
      )}
    </Box>
  );
}

function DropdownItem({ label, onClick, icon, disabled = false }) {
  return (
    <Box
      as="button"
      width="100%"
      p="s"
      display="flex"
      alignItems="center"
      gap="s"
      textAlign="left"
      cursor={disabled ? "not-allowed" : "pointer"}
      hover={disabled ? undefined : "subtle"}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
    >
      {icon && (
        <Text fontSize="s" opacity={disabled ? 0.5 : 1}>
          {icon}
        </Text>
      )}
      <Text fontSize="s" opacity={disabled ? 0.5 : 1}>
        {label}
      </Text>
    </Box>
  );
}
```

## Responsive Compositions

### Responsive Card Grid

```jsx
function ProductGrid({ products }) {
  return (
    <Box 
      display="grid" 
      gridTemplateColumns={[
        "1fr",                    // Mobile: 1 column
        "1fr 1fr",               // Tablet: 2 columns
        "repeat(3, 1fr)",        // Desktop: 3 columns
        "repeat(4, 1fr)"         // Large: 4 columns
      ]}
      gap={["s", "m", "l"]}      // Responsive gap
      p={["m", "l", "xl"]}       // Responsive padding
    >
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Box>
  );
}

function ProductCard({ product }) {
  return (
    <Box
      skin="card"
      overflow="hidden"
      cursor="pointer"
      hover="subtle"
      interactive={{
        hover: { transform: 'translateY(-4px)' }
      }}
    >
      {/* Image */}
      <Box aspect={16/9} bg="neutral.2" overflow="hidden">
        <img 
          src={product.image} 
          alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>
      
      {/* Content */}
      <Box p="m" gap="s">
        <Text as="h3" fontSize="m" fontWeight="semibold" truncate>
          {product.name}
        </Text>
        
        <Text fontSize="s" color="secondary" lineClamp={2}>
          {product.description}
        </Text>
        
        <Box display="flex" alignItems="center" justifyContent="space-between" mt="s">
          <Text fontSize="l" fontWeight="bold" color="primary">
            ${product.price}
          </Text>
          <Button variant="outline" $size="small">
            Add to Cart
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
```

## Best Practices

### ✅ Do

1. **Start with elements, compose upward**
   ```jsx
   // Build from Box + Text + Button
   function UserCard({ user }) {
     return (
       <Box skin="card" p="m">
         <Text as="h3" fontSize="m">{user.name}</Text>
         <Text fontSize="s" color="secondary">{user.email}</Text>
         <Button variant="outline" $size="small">Contact</Button>
       </Box>
     );
   }
   ```

2. **Use consistent spacing patterns**
   ```jsx
   <Box display="flex" flexDirection="column" gap="m">
     <ComponentA />
     <ComponentB />
     <ComponentC />
   </Box>
   ```

3. **Create reusable composition patterns**
   ```jsx
   function Section({ title, children, actions }) {
     return (
       <Box mb="xl">
         <Box display="flex" justifyContent="space-between" alignItems="center" mb="m">
           <Text as="h2" fontSize="l" fontWeight="bold">{title}</Text>
           {actions && <Box display="flex" gap="s">{actions}</Box>}
         </Box>
         {children}
       </Box>
     );
   }
   ```

4. **Use semantic HTML structure**
   ```jsx
   <Box as="article">
     <Text as="h1">Article Title</Text>
     <Text as="p">Article content</Text>
   </Box>
   ```

### ❌ Don't

1. **Don't create deeply nested compositions**
   ```jsx
   // Too nested, hard to maintain
   <Box>
     <Box>
       <Box>
         <Box>
           <Text>Deep content</Text>
         </Box>
       </Box>
     </Box>
   </Box>
   ```

2. **Don't mix layout and content concerns**
   ```jsx
   // Wrong: Button handling layout
   <Button p="xl" display="flex" flexDirection="column">
     Complex layout content
   </Button>
   
   // Right: Box for layout, Button for interaction
   <Box p="xl" display="flex" flexDirection="column">
     <Button>Action</Button>
   </Box>
   ```

3. **Don't hardcode spacing everywhere**
   ```jsx
   // Wrong: Inconsistent spacing
   <Box mb="23px">
     <Text mt="15px">Content</Text>
   </Box>
   
   // Right: Consistent theme spacing
   <Box mb="l">
     <Text mt="m">Content</Text>
   </Box>
   ```

## Advanced Patterns

### Compound Components

```jsx
function Card({ children, ...props }) {
  return (
    <Box skin="card" {...props}>
      {children}
    </Box>
  );
}

Card.Header = function CardHeader({ children, ...props }) {
  return (
    <Box p="m" borderBottom="1px solid" borderColor="neutral.3" {...props}>
      {children}
    </Box>
  );
};

Card.Body = function CardBody({ children, ...props }) {
  return (
    <Box p="m" {...props}>
      {children}
    </Box>
  );
};

Card.Footer = function CardFooter({ children, ...props }) {
  return (
    <Box p="m" borderTop="1px solid" borderColor="neutral.3" {...props}>
      {children}
    </Box>
  );
};

// Usage
<Card maxWidth="400px">
  <Card.Header>
    <Text as="h3" fontSize="l" fontWeight="bold">Card Title</Text>
  </Card.Header>
  <Card.Body>
    <Text fontSize="s" color="secondary">Card content goes here.</Text>
  </Card.Body>
  <Card.Footer>
    <Box display="flex" justifyContent="flex-end" gap="s">
      <Button variant="outline" $size="small">Cancel</Button>
      <Button variant="primary" $size="small">Save</Button>
    </Box>
  </Card.Footer>
</Card>
```

### Render Props Pattern

```jsx
function DataList({ data, renderItem, emptyState }) {
  if (!data || data.length === 0) {
    return (
      <Box textAlign="center" py="xl">
        {emptyState || (
          <Text color="secondary">No items found</Text>
        )}
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" gap="s">
      {data.map((item, index) => (
        <Box key={item.id || index}>
          {renderItem(item, index)}
        </Box>
      ))}
    </Box>
  );
}

// Usage
<DataList
  data={users}
  renderItem={(user) => (
    <Box skin="surface" p="m" display="flex" justifyContent="space-between" alignItems="center">
      <Box>
        <Text fontWeight="medium">{user.name}</Text>
        <Text fontSize="s" color="secondary">{user.email}</Text>
      </Box>
      <Button variant="outline" $size="small">
        Edit
      </Button>
    </Box>
  )}
  emptyState={
    <Box textAlign="center">
      <Text fontSize="l" mb="s">No users found</Text>
      <Button variant="primary">Add User</Button>
    </Box>
  }
/>
```

## Testing Composed Components

```jsx
import { render, screen } from '@testing-library/react';
import { DesignSystemProvider } from '@reactberry/system/providers';

function TestWrapper({ children }) {
  return (
    <DesignSystemProvider>
      {children}
    </DesignSystemProvider>
  );
}

test('UserCard displays user information', () => {
  const user = { name: 'John Doe', email: 'john@example.com' };
  
  render(
    <UserCard user={user} />,
    { wrapper: TestWrapper }
  );
  
  expect(screen.getByText('John Doe')).toBeInTheDocument();
  expect(screen.getByText('john@example.com')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Contact' })).toBeInTheDocument();
});
```

## Next Steps

- **Explore Examples**: Check out [real-world examples](../examples/) for more composition patterns
- **Learn Responsive Design**: Read the [Responsive Design Guide](./responsive-design.md)
- **Master Theming**: Dive into the [Theming Guide](./theming-guide.md)
- **Build Accessible UIs**: Follow the [Accessibility Guide](./accessibility.md)