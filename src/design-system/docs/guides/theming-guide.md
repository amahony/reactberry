# Theming Guide

Learn how to customize and extend the Design System's theme system to match your brand and design requirements.

## Overview

The Design System uses a comprehensive theming system built on design tokens and styled-system. This allows for consistent styling across all components while providing flexibility for customization and brand adaptation.

## Theme Structure

The theme is organized into several key areas:

```javascript
const theme = {
  // Design tokens
  colors: { /* color palette */ },
  space: { /* spacing scale */ },
  fontSizes: { /* typography scale */ },
  fonts: { /* font families */ },
  fontWeights: { /* font weights */ },
  lineHeights: { /* line heights */ },
  
  // Component styles
  skins: { /* component variants */ },
  shapes: { /* border radius variants */ },
  shadows: { /* shadow variants */ },
  
  // Responsive
  breakpoints: { /* responsive breakpoints */ },
  
  // Layout
  sizes: { /* size scale */ },
  zIndices: { /* z-index scale */ }
};
```

## Design Tokens

### Color System

The color system is built on a foundation of semantic colors and a comprehensive palette:

```javascript
// Base colors
colors: {
  // Semantic colors
  primary: '#3B82F6',
  secondary: '#6B7280',
  tertiary: '#9CA3AF',
  
  // State colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  // Palette system
  palette: {
    brands: {
      1: '#EFF6FF',
      2: '#DBEAFE',
      3: '#BFDBFE',
      4: '#93C5FD',
      5: '#60A5FA',
      6: '#3B82F6', // Primary
      7: '#2563EB',
      8: '#1D4ED8',
      9: '#1E40AF',
      10: '#1E3A8A'
    },
    neutrals: {
      1: '#F9FAFB',
      2: '#F3F4F6',
      3: '#E5E7EB',
      4: '#D1D5DB',
      5: '#9CA3AF',
      6: '#6B7280',
      7: '#4B5563',
      8: '#374151',
      9: '#1F2937',
      10: '#111827'
    },
    // Additional color scales...
  }
}
```

### Spacing Scale

Consistent spacing using a modular scale:

```javascript
space: {
  0: '0px',
  mini: '4px',    // 2
  xs: '8px',      // 3
  s: '12px',      // 4
  m: '16px',      // 5
  l: '24px',      // 6
  xl: '32px',     // 7
  xxl: '48px',    // 8
  xxxl: '64px',   // 9
}
```

### Typography Scale

Harmonious font sizes for consistent typography:

```javascript
fontSizes: {
  xs: '12px',   // 0
  s: '14px',    // 1
  m: '16px',    // 2
  l: '18px',    // 3
  xl: '20px',   // 4
  xxl: '24px',  // 5
  xxxl: '32px', // 6
}

fontWeights: {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700
}
```

## Skin System

The skin system provides pre-defined component styling combinations:
### Available Skins

#### Surface Skins

```javascript
skins: {
  // Container backgrounds
  base: {
    backgroundColor: 'palette.neutrals.1',
    color: 'palette.neutrals.10',
    borderColor: 'palette.neutrals.3'
  },
  
  surface: {
    backgroundColor: '#FFFFFF',
    color: 'palette.neutrals.10',
    borderColor: 'palette.neutrals.3'
  },
  
  card: {
    backgroundColor: '#FFFFFF',
    color: 'palette.neutrals.10',
    borderColor: 'palette.neutrals.3',
    boxShadow: 'small'
  },
  
  panel: {
    backgroundColor: 'palette.neutrals.2',
    color: 'palette.neutrals.10',
    borderColor: 'palette.neutrals.4'
  }
}
```

### Semantic Skins

```javascript
skins: {
  // Brand colors
  primary: {
    backgroundColor: 'palette.brands.6',
    color: '#FFFFFF',
    borderColor: 'palette.brands.7'
  },
  
  // State colors
  success: {
    backgroundColor: 'palette.greens.1',
    color: 'palette.greens.9',
    borderColor: 'palette.greens.4'
  },
  
  error: {
    backgroundColor: 'palette.reds.1',
    color: 'palette.reds.9',
    borderColor: 'palette.reds.4'
  },
  
  warning: {
    backgroundColor: 'palette.yellows.1',
    color: 'palette.yellows.9',
    borderColor: 'palette.yellows.4'
  }
}
```

## Customizing Themes

### Creating a Custom Theme

```javascript
// themes/custom/theme.js
import { merge } from 'lodash';
import { defaultTheme } from '@/design-system/themes';

const customTheme = merge({}, defaultTheme, {
  colors: {
    primary: '#7C3AED', // Purple brand color
    palette: {
      brands: {
        1: '#F5F3FF',
        2: '#EDE9FE',
        3: '#DDD6FE',
        4: '#C4B5FD',
        5: '#A78BFA',
        6: '#8B5CF6',
        7: '#7C3AED', // Custom primary
        8: '#6D28D9',
        9: '#5B21B6',
        10: '#4C1D95'
      }
    }
  },
  
  // Custom spacing
  space: {
    ...defaultTheme.space,
    mega: '128px' // Add custom spacing
  },
  
  // Custom typography
  fonts: {
    body: 'Inter, sans-serif',
    heading: 'Poppins, sans-serif',
    mono: 'Fira Code, monospace'
  }
});

export default customTheme;
```

### Extending Component Skins

```javascript
// Add custom button variants
const customTheme = {
  ...defaultTheme,
  skins: {
    ...defaultTheme.skins,
    button: {
      ...defaultTheme.skins.button,
      
      // Custom gradient button
      gradient: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#FFFFFF',
        border: 'none',
        fontWeight: 'bold',
        '&:hover': {
          background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)'
        }
      },
      
      // Custom neon button
      neon: {
        backgroundColor: 'transparent',
        color: '#00FFFF',
        border: '2px solid #00FFFF',
        boxShadow: '0 0 10px #00FFFF',
        '&:hover': {
          backgroundColor: '#00FFFF',
          color: '#000000',
          boxShadow: '0 0 20px #00FFFF'
        }
      }
    }
  }
};
```

## Dark Mode Support

### Theme Modes

Create separate configurations for light and dark modes:

```javascript
// themes/modes/dark.js
const darkTheme = {
  colors: {
    primary: '#60A5FA',
    secondary: '#9CA3AF',
    tertiary: '#6B7280',
    
    palette: {
      neutrals: {
        1: '#111827',  // Dark background
        2: '#1F2937',
        3: '#374151',
        4: '#4B5563',
        5: '#6B7280',
        6: '#9CA3AF',
        7: '#D1D5DB',
        8: '#E5E7EB',
        9: '#F3F4F6',
        10: '#F9FAFB'  // Light text
      }
    }
  },
  
  skins: {
    base: {
      backgroundColor: 'palette.neutrals.1',
      color: 'palette.neutrals.10'
    },
    
    surface: {
      backgroundColor: 'palette.neutrals.2',
      color: 'palette.neutrals.10'
    },
    
    card: {
      backgroundColor: 'palette.neutrals.2',
      color: 'palette.neutrals.10',
      borderColor: 'palette.neutrals.3',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
    }
  }
};
```

### Theme Provider Setup

```jsx
// ThemeProvider component
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '@/design-system/themes';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const theme = isDarkMode ? darkTheme : lightTheme;
  
  return (
    <ThemeProvider theme={theme}>
      <Box minHeight="100vh" bg="base" color="primary">
        <Button 
          variant="outline" 
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
        </Button>
        
        <App />
      </Box>
    </ThemeProvider>
  );
}
```

## Responsive Breakpoints

### Customizing Breakpoints

```javascript
const customTheme = {
  ...defaultTheme,
  
  // Custom breakpoints
  breakpoints: [
    '30rem',   // 480px - Small mobile
    '48rem',   // 768px - Large mobile/small tablet
    '62rem',   // 992px - Tablet
    '75rem',   // 1200px - Small desktop
    '90rem'    // 1440px - Large desktop
  ]
};

// Add aliases
customTheme.breakpoints.sm = customTheme.breakpoints[0];
customTheme.breakpoints.md = customTheme.breakpoints[1];
customTheme.breakpoints.lg = customTheme.breakpoints[2];
customTheme.breakpoints.xl = customTheme.breakpoints[3];
customTheme.breakpoints.xxl = customTheme.breakpoints[4];
```

### Responsive Theme Values

```javascript
// Theme values can be responsive too
const responsiveTheme = {
  ...defaultTheme,
  
  space: {
    ...defaultTheme.space,
    
    // Responsive spacing
    responsive: {
      xs: ['4px', '6px', '8px'],
      s: ['8px', '12px', '16px'],
      m: ['12px', '16px', '24px'],
      l: ['16px', '24px', '32px']
    }
  }
};
```

## Component-Specific Theming

### Button Theming

```javascript
const customButtonTheme = {
  skins: {
    button: {
      // Size variants
      sizes: {
        tiny: {
          height: '24px',
          px: '8px',
          fontSize: '12px',
          fontWeight: '600'
        },
        
        huge: {
          height: '60px',
          px: '32px',
          fontSize: '20px',
          fontWeight: '700'
        }
      },
      
      // Style variants
      variants: {
        glass: {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: '#FFFFFF'
        },
        
        neumorphic: {
          backgroundColor: '#E5E7EB',
          boxShadow: '8px 8px 16px #D1D5DB, -8px -8px 16px #F9FAFB',
          border: 'none',
          '&:hover': {
            boxShadow: '4px 4px 8px #D1D5DB, -4px -4px 8px #F9FAFB'
          }
        }
      }
    }
  }
};
```

### Field Theming

```javascript
const customFieldTheme = {
  skins: {
    field: {
      variants: {
        minimal: {
          backgroundColor: 'transparent',
          border: 'none',
          borderBottom: '2px solid',
          borderColor: 'palette.neutrals.4',
          borderRadius: '0',
          '&:focus': {
            borderColor: 'primary',
            outline: 'none'
          }
        },
        
        floating: {
          position: 'relative',
          paddingTop: '20px',
          '& + label': {
            position: 'absolute',
            top: '50%',
            left: '16px',
            transform: 'translateY(-50%)',
            transition: 'all 0.2s ease',
            pointerEvents: 'none'
          },
          '&:focus + label, &:not(:placeholder-shown) + label': {
            top: '8px',
            fontSize: '12px',
            color: 'primary'
          }
        }
      }
    }
  }
};
```

## Animation and Transitions

### Adding Animation Tokens

```javascript
const animatedTheme = {
  ...defaultTheme,
  
  // Animation tokens
  transitions: {
    fast: '0.1s ease',
    normal: '0.2s ease',
    slow: '0.3s ease',
    bounce: '0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  },
  
  animations: {
    fadeIn: 'fadeIn 0.3s ease',
    slideUp: 'slideUp 0.3s ease',
    bounce: 'bounce 0.6s ease infinite'
  },
  
  // Animation styles
  keyframes: {
    fadeIn: `
      from { opacity: 0; }
      to { opacity: 1; }
    `,
    slideUp: `
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    `,
    bounce: `
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    `
  }
};
```

### Using Animations

```jsx
<Box
  skin="card"
  p="m"
  interactive={{
    hover: {
      transform: 'scale(1.05)',
      transition: 'theme.transitions.bounce'
    }
  }}
>
  <Text>Animated card</Text>
</Box>
```

## Brand Theming Examples

### Corporate Theme

```javascript
const corporateTheme = {
  colors: {
    primary: '#003366',    // Corporate blue
    secondary: '#666666',  // Gray
    accent: '#FF6600',     // Orange accent
    
    palette: {
      brands: {
        1: '#F0F4F8',
        6: '#003366',
        10: '#001122'
      }
    }
  },
  
  fonts: {
    body: 'Roboto, sans-serif',
    heading: 'Roboto Slab, serif'
  },
  
  shapes: {
    square: '0px',    // Sharp corners
    rounded: '4px',   // Minimal rounding
    pill: '8px'       // Conservative pill shape
  }
};
```

### Creative Theme

```javascript
const creativeTheme = {
  colors: {
    primary: '#FF3366',
    secondary: '#33CCFF',
    accent: '#FFCC33',
    
    palette: {
      brands: {
        1: '#FFF0F3',
        6: '#FF3366',
        10: '#CC0033'
      }
    }
  },
  
  fonts: {
    body: 'Space Grotesk, sans-serif',
    heading: 'Playfair Display, serif'
  },
  
  shapes: {
    rounded: '12px',
    pill: '50px',
    blob: '30% 70% 70% 30% / 30% 30% 70% 70%'
  }
};
```

## Theme Utilities

### Color Manipulation

```javascript
import { lighten, darken, alpha } from '@/design-system/themes/utils';

const dynamicTheme = {
  colors: {
    primary: '#3B82F6',
    
    // Auto-generated variations
    primaryLight: lighten('#3B82F6', 0.2),
    primaryDark: darken('#3B82F6', 0.2),
    primaryTranslucent: alpha('#3B82F6', 0.5)
  }
};
```

### Responsive Helpers

```javascript
// Responsive helper functions
const { mediaQuery, responsive } = themeUtils;

const styledComponent = styled(Box)`
  padding: ${props => responsive(props.p, props.theme)};
  
  ${props => mediaQuery('md', props.theme)`
    padding: ${props.theme.space.l};
  `}
`;
```

## Testing Themes

### Theme Testing

```javascript
// Test theme values
describe('Custom Theme', () => {
  test('has correct primary color', () => {
    expect(customTheme.colors.primary).toBe('#7C3AED');
  });
  
  test('has all required skins', () => {
    expect(customTheme.skins.base).toBeDefined();
    expect(customTheme.skins.surface).toBeDefined();
    expect(customTheme.skins.card).toBeDefined();
  });
  
  test('maintains color contrast', () => {
    const contrast = getContrast(
      customTheme.colors.primary,
      customTheme.colors.white
    );
    expect(contrast).toBeGreaterThan(4.5);
  });
});
```

### Visual Regression Testing

```jsx
// Storybook stories for theme testing
export const ThemeComparison = () => (
  <Box display="grid" gridTemplateColumns="1fr 1fr" gap="l">
    <ThemeProvider theme={lightTheme}>
      <ComponentShowcase />
    </ThemeProvider>
    
    <ThemeProvider theme={darkTheme}>
      <ComponentShowcase />
    </ThemeProvider>
  </Box>
);
```

## Best Practices

### ✅ Do

1. **Use semantic color names**
   ```javascript
   colors: {
     primary: '#3B82F6',
     success: '#10B981',
     danger: '#EF4444'
   }
   ```

2. **Maintain consistent scales**
   ```javascript
   space: {
     xs: '8px',
     s: '12px',
     m: '16px',    // Base unit
     l: '24px',    // 1.5x
     xl: '32px'    // 2x
   }
   ```

3. **Design for accessibility**
   ```javascript
   // Ensure sufficient contrast
   colors: {
     text: '#111827',      // High contrast
     textSecondary: '#6B7280'  // 4.5:1 ratio
   }
   ```

4. **Use design tokens consistently**
   ```jsx
   <Box p="m" bg="surface" color="primary" />
   ```

### ❌ Don't

1. **Don't hardcode values**
   ```jsx
   // Bad
   <Box p="16px" bg="#FFFFFF" />
   
   // Good
   <Box p="m" bg="surface" />
   ```

2. **Don't create too many variants**
   ```javascript
   // Too complex
   skins: {
     button: {
       primary, secondary, tertiary, quaternary, 
       primaryLight, primaryDark, secondaryLight...
     }
   }
   ```

3. **Don't ignore responsive design**
   ```javascript
   // Ensure themes work at all breakpoints
   breakpoints: ['32rem', '48rem', '64rem']
   ```

## Performance Considerations

### Theme Optimization

1. **Lazy load theme variations**
   ```javascript
   const DarkTheme = lazy(() => import('./themes/dark'));
   ```

2. **Use CSS custom properties for runtime changes**
   ```javascript
   const theme = {
     colors: {
       primary: 'var(--color-primary, #3B82F6)'
     }
   };
   ```

3. **Minimize theme object size**
   ```javascript
   // Extract common values
   const baseColors = { /* ... */ };
   const lightTheme = { colors: { ...baseColors, /* light overrides */ } };
   const darkTheme = { colors: { ...baseColors, /* dark overrides */ } };
   ```

Remember: A well-designed theme system provides consistency, maintainability, and flexibility. Start with a solid foundation of design tokens, then build up your component skins and variants systematically.