# Migration Guide

This guide helps you migrate between versions of the Design System and upgrade from other component libraries.

## Overview

The Design System follows semantic versioning and provides clear migration paths for breaking changes. This guide covers common migration scenarios and provides automated tools where possible.

## Current Version: 2.x

### Breaking Changes from 1.x

#### Component Hierarchy Changes
The component hierarchy was restructured in 2.x for better composition:

**Old (1.x):**
```jsx
// Multiple base components
import { Container, Typography, Interactive, Input } from '@/design-system';
```

**New (2.x):**
```jsx
// Unified hierarchy: Box → Text → Button/Field
import { Box, Text, Button, Field } from '@/design-system/elements';
```

#### Prop Naming Standardization

**Typography Props:**
```jsx
// Old (1.x)
<Typography size="large" weight="bold" />

// New (2.x)
<Text fontSize="l" fontWeight="bold" />
```

**Spacing Props:**
```jsx
// Old (1.x)
<Container padding="large" margin="medium" />

// New (2.x)
<Box p="l" m="m" />
```

#### Theme Structure Updates

**Old Theme (1.x):**
```javascript
theme = {
  sizes: ['xs', 's', 'm', 'l', 'xl'],
  colors: {
    blue: ['#...', '#...', '#...']
  }
}
```

**New Theme (2.x):**
```javascript
theme = {
  space: { xs: '8px', s: '12px', m: '16px', l: '24px', xl: '32px' },
  colors: {
    palette: {
      brands: { 1: '#...', 6: '#...', 10: '#...' }
    }
  },
  skins: { /* pre-defined component styles */ }
}
```

## Migration Scenarios

### From Design System 1.x to 2.x

#### Automated Migration
Use our migration script to handle common transformations:

```bash
npx @design-system/migrate --from=1.x --to=2.x src/
```

#### Manual Migration Steps

**Step 1: Update Imports**
```jsx
// Before
import { Container, Typography, Button as DSButton, Input } from '@/design-system';

// After
import { Box, Text, Button, Field } from '@/design-system/elements';
```

**Step 2: Convert Component Usage**
```jsx
// Before: Container → Box
<Container padding="large" background="white">
  <Typography variant="heading">Title</Typography>
</Container>

// After: Container → Box, Typography → Text
<Box p="l" bg="surface">
  <Text as="h2" fontSize="l" fontWeight="bold">Title</Text>
</Box>
```

**Step 3: Update Theme References**
```jsx
// Before
const StyledComponent = styled.div`
  padding: ${props => props.theme.sizes[3]};
  color: ${props => props.theme.colors.blue[5]};
`;

// After
const StyledComponent = styled(Box)`
  p="m"
  color="palette.brands.6"
`;
```

**Step 4: Convert Custom Components**
```jsx
// Before: Custom button
const CustomButton = styled(DSButton)`
  background-color: #ff6b6b;
  padding: 12px 24px;
`;

// After: Use skins and theme tokens
<Button 
  variant="custom" 
  $size="medium"
  bg="palette.reds.6"
  px="l"
  py="s"
>
  Button Text
</Button>
```

### From Material-UI to Design System

#### Component Mapping

| Material-UI | Design System | Notes |
|-------------|-------------|-------|
| `Box` | `Box` | Similar API, use theme aliases |
| `Typography` | `Text` | Use `as` prop for semantic HTML |
| `Button` | `Button` | Use `variant` and `$size` props |
| `TextField` | `Field` | Use `as="input"` with proper variants |
| `Paper` | `Box skin="card"` | Use semantic skins |
| `Container` | `Box maxWidth="..." mx="auto"` | Manual responsive setup |

#### Migration Example

**Before (Material-UI):**
```jsx
import { Box, Typography, Button, TextField, Paper } from '@mui/material';

function LoginForm() {
  return (
    <Paper elevation={2} sx={{ p: 3, maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Sign In
      </Typography>
      
      <Box component="form" sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Email"
          type="email"
          margin="normal"
          variant="outlined"
        />
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
      </Box>
    </Paper>
  );
}
```

**After (Design System):**
```jsx
import { Box, Text, Button, Field } from '@/design-system/elements';

function LoginForm() {
  return (
    <Box skin="card" p="l" maxWidth="400px" mx="auto">
      <Text as="h1" fontSize="xl" fontWeight="bold" mb="m">
        Sign In
      </Text>
      
      <Box as="form" mt="s">
        <Box mb="m">
          <Text as="label" fontSize="s" fontWeight="medium" mb="xs" display="block">
            Email
          </Text>
          <Field
            as="input"
            type="email"
            placeholder="Enter your email"
            variant="outline"
            $size="medium"
          />
        </Box>
        
        <Button
          type="submit"
          variant="primary"
          $size="large"
          fullWidth
          mt="l"
        >
          Sign In
        </Button>
      </Box>
    </Box>
  );
}
```

### From Styled Components to Design System

#### Converting Custom Styled Components

**Before (Custom Styled Components):**
```jsx
const Card = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e5e9;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 16px;
`;
```

**After (Design System):**
```jsx
// Use Box with skin for consistent styling
<Box skin="card" p="l">
  <Text as="h2" fontSize="xxl" fontWeight="semibold" color="primary" mb="m">
    Title
  </Text>
</Box>
```

#### Converting Theme Objects

**Before (Custom Theme):**
```javascript
const customTheme = {
  colors: {
    primary: '#3b82f6',
    gray: {
      50: '#f9fafb',
      900: '#111827'
    }
  },
  spacing: [0, 4, 8, 16, 24, 32, 48, 64],
  fontSizes: [12, 14, 16, 18, 20, 24, 32]
};
```

**After (Design System Theme):**
```javascript
// Extend the design system theme
import { defaultTheme } from '@/design-system/themes';

const customTheme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    // Add custom colors while keeping design system structure
    palette: {
      ...defaultTheme.colors.palette,
      custom: {
        1: '#f9fafb',
        6: '#3b82f6',
        10: '#111827'
      }
    }
  }
};
```

## Common Migration Patterns

### Form Migration

**Before (Various patterns):**
```jsx
// Different libraries, different patterns
<FormControl>
  <InputLabel>Email</InputLabel>
  <Input type="email" />
  <FormHelperText>Enter your email address</FormHelperText>
</FormControl>
```

**After (Consistent pattern):**
```jsx
<Box>
  <Text as="label" htmlFor="email" fontSize="s" fontWeight="medium" mb="xs" display="block">
    Email
  </Text>
  <Field 
    id="email"
    as="input" 
    type="email" 
    placeholder="Enter your email"
    variant="outline"
    $size="medium"
    mb="xs"
  />
  <Text fontSize="xs" color="secondary">
    Enter your email address
  </Text>
</Box>
```

### Layout Migration

**Before (CSS Grid/Flexbox):**
```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  padding: 32px;
}
```

**After (Design System):**
```jsx
<Box 
  display="grid" 
  gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
  gap="l"
  p="xl"
>
  {/* Grid items */}
</Box>
```

### Responsive Migration

**Before (CSS Media Queries):**
```css
.responsive-text {
  font-size: 14px;
  padding: 8px;
}

@media (min-width: 768px) {
  .responsive-text {
    font-size: 16px;
    padding: 16px;
  }
}

@media (min-width: 1024px) {
  .responsive-text {
    font-size: 18px;
    padding: 24px;
  }
}
```

**After (Responsive Arrays):**
```jsx
<Text 
  fontSize={['s', 'm', 'l']}  // 14px, 16px, 18px
  p={['xs', 'm', 'l']}        // 8px, 16px, 24px
>
  Responsive text
</Text>
```

## Migration Tools

### Automated Migration Script

```bash
# Install migration tool
npm install -g @design-system/migrate

# Run migration on your codebase
ds-migrate --from=mui --to=design-system src/

# Options:
# --from: mui | styled-components | chakra | ant-design | 1.x
# --to: design-system | 2.x
# --dry-run: Preview changes without applying
# --backup: Create backup before applying changes
```

### Manual Migration Checklist

#### Pre-Migration
- [ ] Audit current component usage
- [ ] Identify custom styled components
- [ ] Document current theme structure
- [ ] Set up design system in project
- [ ] Create migration branch

#### During Migration
- [ ] Update package imports
- [ ] Convert component usage
- [ ] Migrate theme structure
- [ ] Update custom components
- [ ] Test responsive behavior
- [ ] Verify accessibility

#### Post-Migration
- [ ] Remove old dependencies
- [ ] Update documentation
- [ ] Run visual regression tests
- [ ] Update team guidelines
- [ ] Clean up unused code

### Migration Validation

```javascript
// Use this script to validate migration
import { validateMigration } from '@design-system/migrate';

const results = validateMigration({
  srcDir: './src',
  checks: [
    'imports',           // Verify all imports are updated
    'props',            // Check prop usage
    'themes',           // Validate theme structure
    'accessibility',    // Ensure a11y compliance
    'responsive'        // Check responsive patterns
  ]
});

console.log(results.summary);
```

## Breaking Changes by Version

### Version 2.1.0 (Current)
- ✅ **No breaking changes** - Backwards compatible
- Added new block components
- Enhanced theme system
- Improved TypeScript types

### Version 2.0.0
- 🚨 **Component hierarchy restructure**
- 🚨 **Theme system overhaul**  
- 🚨 **Prop naming standardization**
- 🚨 **Skin system introduction**

### Version 1.5.0 (Deprecated)
- Legacy component structure
- Index-based theme values
- Limited responsive support

## Troubleshooting Migration Issues

### Common Problems

#### "Component not found" errors
```jsx
// Problem: Old import paths
import { Container } from '@/design-system';

// Solution: Use new element imports
import { Box } from '@/design-system/elements';
```

#### Theme value errors
```jsx
// Problem: Using old theme indices
<Box p={3} fontSize={4} />

// Solution: Use theme aliases
<Box p="m" fontSize="l" />
```

#### TypeScript errors
```tsx
// Problem: Old prop types
interface Props {
  size: 'small' | 'medium' | 'large';
}

// Solution: Use design system types
import { SpaceValue, FontSizeValue } from '@/design-system/types';

interface Props {
  p?: SpaceValue;
  fontSize?: FontSizeValue;
}
```

#### Styling conflicts
```jsx
// Problem: CSS overrides not working
const StyledBox = styled(Box)`
  padding: 20px !important;
`;

// Solution: Use design system props
<Box p="l" css={{ padding: '20px' }}>
```

### Getting Help

- **Documentation**: Check [API references](../api/) for correct prop usage
- **Examples**: See [examples](../examples/) for migration patterns  
- **Community**: Ask in GitHub Discussions
- **Support**: Create issue with migration tag

## Migration Timeline

### Recommended Schedule

**Week 1: Preparation**
- Audit existing codebase
- Set up design system
- Plan migration strategy

**Week 2-3: Core Migration**
- Migrate core components
- Update theme usage
- Convert layout patterns

**Week 4: Polish & Test**
- Visual regression testing
- Accessibility verification
- Performance optimization

**Week 5: Deployment**
- Gradual rollout
- Monitor for issues
- Team training

### Support Timeline

- **Version 1.x**: Security fixes only until Dec 2025
- **Version 2.x**: Active development and support
- **Migration support**: Available until Jun 2025

## Next Steps

After completing your migration:

1. **Review the [Getting Started Guide](./getting-started.md)** for best practices
2. **Explore [Component Composition](./component-composition.md)** for advanced patterns
3. **Set up [Testing](./testing-guide.md)** for your migrated components
4. **Customize [Theming](./theming-guide.md)** to match your brand
5. **Implement [Accessibility](./accessibility.md)** improvements

## Contributing Migration Improvements

Found a migration pattern not covered here? Contribute to improve this guide:

1. Document your migration scenario
2. Provide before/after examples
3. Include any automation scripts
4. Submit PR with improvements

Remember: Migration is an investment in long-term maintainability, consistency, and developer experience. Take your time to do it right!