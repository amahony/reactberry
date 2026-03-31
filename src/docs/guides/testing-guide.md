# Testing Guide for Design System

Learn how to effectively test components built with the Design System, including unit tests, integration tests, visual regression testing, and accessibility validation.

## Overview

Testing design system components requires a multi-layered approach that covers functionality, visual consistency, accessibility, and user interactions. This guide provides comprehensive strategies and tools for testing at every level.

## Testing Philosophy

### 1. Test What Matters
- **Functionality** - Does the component work as expected?
- **Accessibility** - Can all users interact with it?
- **Visual Consistency** - Does it look right across browsers/devices?
- **Performance** - Does it render efficiently?

### 2. Testing Pyramid
```
    E2E Tests (Few)
        ↑
Integration Tests (Some)
        ↑
Unit Tests (Many)
```

### 3. Component Testing Levels
- **Element Tests** - Box, Text, Button, Field components
- **Block Tests** - Composed components like Modal, Avatar
- **Pattern Tests** - Complete UI patterns and flows
- **Theme Tests** - Theme consistency and variation

## Testing Stack

### Core Testing Tools
```json
{
  "dependencies": {
    "@testing-library/react": "^13.4.0",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/user-event": "^14.4.3",
    "jest": "^29.0.0",
    "jest-axe": "^7.0.0",
    "jest-styled-components": "^7.1.1"
  },
  "devDependencies": {
    "@storybook/addon-a11y": "^6.5.0",
    "@storybook/addon-viewport": "^6.5.0",
    "chromatic": "^6.10.0",
    "percy": "^1.6.1"
  }
}
```

### Test Setup
```javascript
// setupTests.js
import '@testing-library/jest-dom';
import { toHaveNoViolations } from 'jest-axe';
import { ThemeProvider } from 'styled-components';
import { theme } from '@reactberry/system/themes';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Test wrapper for theme provider
export const TestWrapper = ({ children }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);
```

## Unit Testing Components

### Testing Core Elements

#### Box Component Tests
```javascript
// __tests__/Box.test.tsx
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Box } from '@reactberry/system/elements';
import { TestWrapper } from '../setupTests';

describe('Box Component', () => {
  test('renders with correct semantic HTML', () => {
    render(
      <Box as="section" data-testid="box">
        Content
      </Box>,
      { wrapper: TestWrapper }
    );
    
    const box = screen.getByTestId('box');
    expect(box.tagName).toBe('SECTION');
    expect(box).toHaveTextContent('Content');
  });

  test('applies theme spacing correctly', () => {
    render(
      <Box p="m" m="l" data-testid="box">
        Content
      </Box>,
      { wrapper: TestWrapper }
    );
    
    const box = screen.getByTestId('box');
    expect(box).toHaveStyle({
      padding: '16px',
      margin: '24px'
    });
  });

  test('applies responsive styles', () => {
    render(
      <Box 
        p={['s', 'm', 'l']} 
        display={['block', 'flex']}
        data-testid="box"
      >
        Content
      </Box>,
      { wrapper: TestWrapper }
    );
    
    const box = screen.getByTestId('box');
    // Test mobile styles (base)
    expect(box).toHaveStyle({
      padding: '12px',
      display: 'block'
    });
  });

  test('applies skins correctly', () => {
    render(
      <Box skin="card" data-testid="box">
        Content
      </Box>,
      { wrapper: TestWrapper }
    );
    
    const box = screen.getByTestId('box');
    expect(box).toHaveStyle({
      backgroundColor: '#FFFFFF',
      boxShadow: expect.stringContaining('rgba')
    });
  });

  test('handles interactive states', async () => {
    const handleClick = jest.fn();
    
    render(
      <Box 
        cursor="pointer"
        hover="subtle"
        onClick={handleClick}
        data-testid="box"
      >
        Interactive content
      </Box>,
      { wrapper: TestWrapper }
    );
    
    const box = screen.getByTestId('box');
    expect(box).toHaveStyle({ cursor: 'pointer' });
    
    await userEvent.click(box);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('has no accessibility violations', async () => {
    const { container } = render(
      <Box as="main" role="main">
        <Box as="h1">Page Title</Box>
      </Box>,
      { wrapper: TestWrapper }
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

#### Text Component Tests
```javascript
// __tests__/Text.test.tsx
import { render, screen } from '@testing-library/react';
import { Text } from '@reactberry/system/elements';
import { TestWrapper } from '../setupTests';

describe('Text Component', () => {
  test('renders semantic HTML elements correctly', () => {
    const { rerender } = render(
      <Text as="h1" data-testid="heading">
        Main Title
      </Text>,
      { wrapper: TestWrapper }
    );
    
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByTestId('heading').tagName).toBe('H1');
    
    rerender(
      <Text as="p" data-testid="paragraph">
        Paragraph text
      </Text>
    );
    
    expect(screen.getByTestId('paragraph').tagName).toBe('P');
  });

  test('applies typography styles correctly', () => {
    render(
      <Text 
        fontSize="l" 
        fontWeight="bold" 
        color="primary"
        lineHeight="relaxed"
        data-testid="text"
      >
        Styled text
      </Text>,
      { wrapper: TestWrapper }
    );
    
    const text = screen.getByTestId('text');
    expect(text).toHaveStyle({
      fontSize: '18px',
      fontWeight: '700',
      color: '#3B82F6',
      lineHeight: '1.625'
    });
  });

  test('handles text truncation', () => {
    render(
      <Text truncate maxWidth="100px" data-testid="truncated">
        This is a very long text that should be truncated
      </Text>,
      { wrapper: TestWrapper }
    );
    
    const text = screen.getByTestId('truncated');
    expect(text).toHaveStyle({
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    });
  });

  test('supports line clamping', () => {
    render(
      <Text lineClamp={3} data-testid="clamped">
        This is a longer text that should be clamped to exactly three lines
      </Text>,
      { wrapper: TestWrapper }
    );
    
    const text = screen.getByTestId('clamped');
    expect(text).toHaveStyle({
      display: '-webkit-box',
      WebkitLineClamp: '3',
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    });
  });
});
```

#### Button Component Tests
```javascript
// __tests__/Button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@reactberry/system/elements';
import { TestWrapper } from '../setupTests';

describe('Button Component', () => {
  test('renders with correct attributes', () => {
    render(
      <Button variant="primary" $size="medium">
        Click me
      </Button>,
      { wrapper: TestWrapper }
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Click me');
    expect(button).toHaveAttribute('type', 'button');
    expect(button).not.toBeDisabled();
  });

  test('handles click events', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    
    render(
      <Button onClick={handleClick}>
        Click me
      </Button>,
      { wrapper: TestWrapper }
    );
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('handles disabled state', () => {
    render(
      <Button disabled>
        Disabled button
      </Button>,
      { wrapper: TestWrapper }
    );
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveStyle({ opacity: '0.5' });
  });

  test('handles keyboard navigation', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    
    render(
      <Button onClick={handleClick}>
        Keyboard accessible
      </Button>,
      { wrapper: TestWrapper }
    );
    
    const button = screen.getByRole('button');
    button.focus();
    
    expect(button).toHaveFocus();
    
    await user.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalledTimes(1);
    
    await user.keyboard(' ');
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  test('applies variant styles correctly', () => {
    const { rerender } = render(
      <Button variant="primary" data-testid="button">
        Primary
      </Button>,
      { wrapper: TestWrapper }
    );
    
    let button = screen.getByTestId('button');
    expect(button).toHaveStyle({
      backgroundColor: expect.stringMatching(/#3B82F6|rgb\(59, 130, 246\)/)
    });
    
    rerender(
      <Button variant="outline" data-testid="button">
        Outline
      </Button>
    );
    
    button = screen.getByTestId('button');
    expect(button).toHaveStyle({
      backgroundColor: 'transparent',
      border: expect.stringContaining('1px')
    });
  });
});
```

#### Field Component Tests
```javascript
// __tests__/Field.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Field } from '@reactberry/system/elements';
import { TestWrapper } from '../setupTests';

describe('Field Component', () => {
  test('renders different input types correctly', () => {
    const { rerender } = render(
      <Field as="input" type="text" placeholder="Text input" />,
      { wrapper: TestWrapper }
    );
    
    expect(screen.getByPlaceholderText('Text input')).toHaveAttribute('type', 'text');
    
    rerender(
      <Field as="input" type="email" placeholder="Email input" />
    );
    
    expect(screen.getByPlaceholderText('Email input')).toHaveAttribute('type', 'email');
    
    rerender(
      <Field as="textarea" placeholder="Textarea input" />
    );
    
    expect(screen.getByPlaceholderText('Textarea input').tagName).toBe('TEXTAREA');
  });

  test('handles controlled input', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    
    render(
      <Field 
        as="input"
        type="text"
        value="controlled"
        onChange={handleChange}
        data-testid="field"
      />,
      { wrapper: TestWrapper }
    );
    
    const field = screen.getByTestId('field');
    expect(field).toHaveValue('controlled');
    
    await user.clear(field);
    await user.type(field, 'new value');
    
    expect(handleChange).toHaveBeenCalled();
  });

  test('shows invalid state correctly', () => {
    render(
      <Field 
        as="input"
        type="email"
        invalid
        aria-invalid="true"
        data-testid="field"
      />,
      { wrapper: TestWrapper }
    );
    
    const field = screen.getByTestId('field');
    expect(field).toHaveAttribute('aria-invalid', 'true');
    expect(field).toHaveStyle({
      borderColor: expect.stringMatching(/red|#EF4444/)
    });
  });

  test('handles form submission', async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn((e) => e.preventDefault());
    
    render(
      <form onSubmit={handleSubmit}>
        <Field 
          as="input"
          type="text"
          name="username"
          required
        />
        <button type="submit">Submit</button>
      </form>,
      { wrapper: TestWrapper }
    );
    
    const field = screen.getByRole('textbox');
    const button = screen.getByRole('button');
    
    await user.type(field, 'test user');
    await user.click(button);
    
    expect(handleSubmit).toHaveBeenCalled();
  });
});
```

### Testing Block Components

#### Modal Component Tests
```javascript
// __tests__/Modal.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from '@reactberry/system/blocks';
import { TestWrapper } from '../setupTests';

describe('Modal Component', () => {
  test('renders when open', () => {
    render(
      <Modal isOpen title="Test Modal" onClose={jest.fn()}>
        <p>Modal content</p>
      </Modal>,
      { wrapper: TestWrapper }
    );
    
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  test('does not render when closed', () => {
    render(
      <Modal isOpen={false} title="Test Modal" onClose={jest.fn()}>
        <p>Modal content</p>
      </Modal>,
      { wrapper: TestWrapper }
    );
    
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('handles close events', async () => {
    const user = userEvent.setup();
    const handleClose = jest.fn();
    
    render(
      <Modal isOpen title="Test Modal" onClose={handleClose}>
        <p>Modal content</p>
      </Modal>,
      { wrapper: TestWrapper }
    );
    
    const closeButton = screen.getByLabelText(/close/i);
    await user.click(closeButton);
    
    expect(handleClose).toHaveBeenCalled();
  });

  test('traps focus correctly', async () => {
    const user = userEvent.setup();
    
    render(
      <div>
        <button>Outside button</button>
        <Modal isOpen title="Test Modal" onClose={jest.fn()}>
          <button>Inside button 1</button>
          <button>Inside button 2</button>
        </Modal>
      </div>,
      { wrapper: TestWrapper }
    );
    
    // Focus should be trapped inside modal
    const insideButton1 = screen.getByText('Inside button 1');
    const insideButton2 = screen.getByText('Inside button 2');
    
    await waitFor(() => {
      expect(insideButton1).toHaveFocus();
    });
    
    await user.tab();
    expect(insideButton2).toHaveFocus();
    
    await user.tab();
    expect(insideButton1).toHaveFocus(); // Should cycle back
  });

  test('handles escape key', async () => {
    const user = userEvent.setup();
    const handleClose = jest.fn();
    
    render(
      <Modal isOpen title="Test Modal" onClose={handleClose}>
        <p>Modal content</p>
      </Modal>,
      { wrapper: TestWrapper }
    );
    
    await user.keyboard('{Escape}');
    expect(handleClose).toHaveBeenCalled();
  });
});
```

## Integration Testing

### Form Integration Tests
```javascript
// __tests__/ContactForm.integration.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from '@/components/ContactForm';
import { TestWrapper } from '../setupTests';

describe('ContactForm Integration', () => {
  test('complete form submission flow', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    
    render(
      <ContactForm onSubmit={mockSubmit} />,
      { wrapper: TestWrapper }
    );
    
    // Fill out form
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'Test message');
    
    // Submit form
    await user.click(screen.getByRole('button', { name: /submit/i }));
    
    expect(mockSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Test message'
    });
  });

  test('form validation errors', async () => {
    const user = userEvent.setup();
    
    render(
      <ContactForm onSubmit={jest.fn()} />,
      { wrapper: TestWrapper }
    );
    
    // Try to submit empty form
    await user.click(screen.getByRole('button', { name: /submit/i }));
    
    // Check for validation errors
    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    
    // Invalid email
    await user.type(screen.getByLabelText(/email/i), 'invalid-email');
    await user.click(screen.getByRole('button', { name: /submit/i }));
    
    expect(screen.getByText(/valid email/i)).toBeInTheDocument();
  });
});
```

### Theme Integration Tests
```javascript
// __tests__/ThemeIntegration.test.tsx
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Box, Text } from '@reactberry/system/elements';
import { lightTheme, darkTheme } from '@reactberry/system/themes';

describe('Theme Integration', () => {
  test('components use light theme correctly', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Box skin="surface" data-testid="surface">
          <Text color="primary">Light theme text</Text>
        </Box>
      </ThemeProvider>
    );
    
    const surface = container.querySelector('[data-testid="surface"]');
    const text = container.querySelector('span');
    
    expect(surface).toHaveStyle({
      backgroundColor: '#FFFFFF'
    });
    expect(text).toHaveStyle({
      color: '#3B82F6'
    });
  });

  test('components use dark theme correctly', () => {
    const { container } = render(
      <ThemeProvider theme={darkTheme}>
        <Box skin="surface" data-testid="surface">
          <Text color="primary">Dark theme text</Text>
        </Box>
      </ThemeProvider>
    );
    
    const surface = container.querySelector('[data-testid="surface"]');
    const text = container.querySelector('span');
    
    expect(surface).toHaveStyle({
      backgroundColor: '#1F2937'
    });
    expect(text).toHaveStyle({
      color: '#60A5FA'
    });
  });
});
```

## Accessibility Testing

### Automated A11y Testing
```javascript
// __tests__/accessibility.test.tsx
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Box, Text, Button, Field } from '@reactberry/system/elements';
import { TestWrapper } from '../setupTests';

describe('Accessibility Tests', () => {
  test('form accessibility', async () => {
    const { container } = render(
      <Box as="form">
        <Box>
          <Text as="label" htmlFor="name">Full Name</Text>
          <Field id="name" as="input" type="text" required />
        </Box>
        
        <Box>
          <Text as="label" htmlFor="email">Email</Text>
          <Field id="email" as="input" type="email" required />
        </Box>
        
        <Button type="submit">Submit</Button>
      </Box>,
      { wrapper: TestWrapper }
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('navigation accessibility', async () => {
    const { container } = render(
      <Box as="nav" role="navigation" aria-label="Main navigation">
        <Box as="ul" role="list">
          <Box as="li" role="listitem">
            <Text as="a" href="/home">Home</Text>
          </Box>
          <Box as="li" role="listitem">
            <Text as="a" href="/about">About</Text>
          </Box>
        </Box>
      </Box>,
      { wrapper: TestWrapper }
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('modal accessibility', async () => {
    const { container } = render(
      <Box 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="modal-title"
      >
        <Text as="h2" id="modal-title">Modal Title</Text>
        <Text as="p">Modal content</Text>
        <Button>Close</Button>
      </Box>,
      { wrapper: TestWrapper }
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### Manual A11y Testing Checklist
```javascript
// __tests__/accessibility.manual.test.tsx
describe('Manual Accessibility Checks', () => {
  test('keyboard navigation', async () => {
    // Test focus management
    // Test tab order
    // Test keyboard shortcuts
    // Test screen reader announcements
  });

  test('color contrast', () => {
    // Verify contrast ratios meet WCAG standards
    // Test in different lighting conditions
    // Test with color blindness simulators
  });

  test('screen reader compatibility', () => {
    // Test with NVDA, JAWS, VoiceOver
    // Verify proper announcements
    // Check heading structure
  });
});
```

## Visual Regression Testing

### Storybook Integration
```javascript
// .storybook/test-runner.js
module.exports = {
  async postRender(page, context) {
    // Accessibility testing
    const elementHandler = await page.$('#storybook-root');
    const innerHTML = await elementHandler.innerHTML();
    
    if (innerHTML.match(/data-test-accessibility="true"/)) {
      await injectAxe(page);
      const results = await checkA11y(page);
      expect(results.violations).toEqual([]);
    }
  },
};
```

### Percy Integration
```javascript
// percy.config.js
module.exports = {
  version: 2,
  discovery: {
    allowed_hostnames: ['localhost']
  },
  static_snapshots: {
    base_directory: './storybook-static',
    snapshot_directory: './percy/snapshots',
    ignore_files: '**/*.map'
  }
};
```

### Chromatic Setup
```javascript
// .circleci/config.yml
version: 2.1
jobs:
  test:
    docker:
      - image: cimg/node:16.14
    steps:
      - checkout
      - run: npm ci
      - run: npm run test
      - run: npx chromatic --project-token=$CHROMATIC_PROJECT_TOKEN
```

## Performance Testing

### Component Performance Tests
```javascript
// __tests__/performance.test.tsx
import { render } from '@testing-library/react';
import { Box, Text } from '@reactberry/system/elements';
import { TestWrapper } from '../setupTests';

describe('Performance Tests', () => {
  test('large list rendering performance', () => {
    const startTime = performance.now();
    
    render(
      <Box>
        {Array.from({ length: 1000 }, (_, i) => (
          <Box key={i} p="s" skin="surface">
            <Text>Item {i}</Text>
          </Box>
        ))}
      </Box>,
      { wrapper: TestWrapper }
    );
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    // Should render 1000 items in under 100ms
    expect(renderTime).toBeLessThan(100);
  });

  test('theme switching performance', () => {
    const { rerender } = render(
      <Box p="m" skin="surface">
        <Text color="primary">Theme test</Text>
      </Box>,
      { wrapper: TestWrapper }
    );
    
    const startTime = performance.now();
    
    // Simulate theme change
    rerender(
      <Box p="m" skin="surface">
        <Text color="primary">Theme test</Text>
      </Box>
    );
    
    const endTime = performance.now();
    const switchTime = endTime - startTime;
    
    // Theme switching should be fast
    expect(switchTime).toBeLessThan(50);
  });
});
```

## Testing Utilities

### Custom Testing Utilities
```javascript
// utils/test-utils.tsx
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@reactberry/system/themes';

// Custom render function with theme provider
export const renderWithTheme = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) =>
  render(ui, {
    wrapper: ({ children }) => (
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    ),
    ...options,
  });

// Accessibility testing helper
export const expectAccessible = async (container: HTMLElement) => {
  const results = await axe(container);
  expect(results).toHaveNoViolations();
};

// Theme value testing helper
export const expectThemeValue = (element: HTMLElement, prop: string, alias: string) => {
  const expectedValue = theme.space[alias] || theme.colors[alias] || theme.fontSizes[alias];
  expect(element).toHaveStyle({ [prop]: expectedValue });
};

// Responsive breakpoint testing
export const testAtBreakpoint = (breakpoint: string, callback: () => void) => {
  const mediaQuery = `(min-width: ${theme.breakpoints[breakpoint]})`;
  
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: query === mediaQuery,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
  
  callback();
};
```

### Mock Utilities
```javascript
// utils/mocks.tsx
export const mockIntersectionObserver = () => {
  global.IntersectionObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));
};

export const mockMatchMedia = (matches: boolean = false) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

export const mockScrollTo = () => {
  Object.defineProperty(window, 'scrollTo', {
    writable: true,
    value: jest.fn(),
  });
};
```

## Best Practices

### ✅ Do

1. **Test behavior, not implementation**
   ```javascript
   // Good - test what user sees
   expect(screen.getByRole('button')).toBeInTheDocument();
   
   // Bad - test implementation details
   expect(wrapper.find('Button')).toHaveLength(1);
   ```

2. **Use semantic queries**
   ```javascript
   // Good - accessible queries
   screen.getByRole('button', { name: 'Submit' });
   screen.getByLabelText('Email address');
   
   // Bad - fragile queries
   screen.getByClassName('btn-primary');
   screen.getByTestId('email-input');
   ```

3. **Test accessibility by default**
   ```javascript
   test('component is accessible', async () => {
     const { container } = render(<Component />);
     const results = await axe(container);
     expect(results).toHaveNoViolations();
   });
   ```

4. **Use theme-aware assertions**
   ```javascript
   expectThemeValue(element, 'padding', 'm');
   expectThemeValue(element, 'color', 'primary');
   ```

### ❌ Don't

1. **Don't test styled-components internals**
   ```javascript
   // Bad
   expect(StyledComponent).toHaveStyleRule('color', 'blue');
   
   // Good
   expect(element).toHaveStyle({ color: 'blue' });
   ```

2. **Don't test every CSS property**
   ```javascript
   // Bad - too granular
   expect(element).toHaveStyle({
     marginTop: '16px',
     marginRight: '16px',
     marginBottom: '16px',
     marginLeft: '16px'
   });
   
   // Good - test meaningful styles
   expect(element).toHaveStyle({ margin: '16px' });
   ```

3. **Don't ignore responsive behavior**
   ```javascript
   // Good - test responsive styles
   testAtBreakpoint('md', () => {
     expect(element).toHaveStyle({ display: 'flex' });
   });