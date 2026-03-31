# Design System Themes

This folder contains the theme configurations for the design system. The themes define the visual appearance of the application, including colors, typography, spacing, and other design tokens. The themes are organized into different modes (e.g., light and dark) and can be easily extended or customized.

## Folder Structure

- `default/`
  - `assets/`
    - `logo.tsx`: Contains the SVG paths for the logo used in the themes.
  - `global.ts`: Defines the global styles applied to the application.
  - `modes/`
    - `dark/`
      - `config.js`: Configuration file for the dark theme, including color definitions and theme settings.
      - `skins.js`: Defines the skin styles for various UI components in the dark theme.
      - `theme.js`: Combines the dark theme configuration and skins into a single theme object.
    - `light/`
      - `config.js`: Configuration file for the light theme, including color definitions and theme settings.
      - `skins.js`: Defines the skin styles for various UI components in the light theme.
      - `theme.js`: Combines the light theme configuration and skins into a single theme object.
  - `tokens/`
    - `controls.js`: Defines the sizes for various UI controls (e.g., buttons, inputs).
    - `shadows.js`: Defines the shadow styles used in the themes.
    - `shapes.js`: Defines the border-radius styles for different shapes.
    - `space.js`: Defines the spacing and sizing scales used in the themes.
    - `spectre.js`: Defines the base colors used in the themes.
  - `utils.js`: Utility functions for generating theme colors, checking contrast ratios, and manipulating colors.

## Themes

### Dark Theme

The dark theme is defined in the `modes/dark` folder. It includes the following files:

- `config.js`: Contains the configuration for the dark theme, including the base colors, palette settings, and other theme-specific options.
- `skins.js`: Defines the styles for various UI components in the dark theme, such as buttons, fields, links, and more.
- `theme.js`: Combines the configuration and skins into a single theme object that can be used in the application.

### Light Theme

The light theme is defined in the `modes/light` folder. It includes the following files:

- `config.js`: Contains the configuration for the light theme, including the base colors, palette settings, and other theme-specific options.
- `skins.js`: Defines the styles for various UI components in the light theme, such as buttons, fields, links, and more.
- `theme.js`: Combines the configuration and skins into a single theme object that can be used in the application.

## Tokens

The `tokens` folder contains the design tokens used across the themes. These tokens define the foundational design properties, such as spacing, sizing, colors, and shadows.

- `controls.js`: Defines the sizes for various UI controls.
- `shadows.js`: Defines the shadow styles used in the themes.
- `shapes.js`: Defines the border-radius styles for different shapes.
- `space.js`: Defines the spacing and sizing scales used in the themes.
- `spectre.js`: Defines the base colors used in the themes.

## Utilities

The `utils.js` file contains utility functions for generating theme colors, checking contrast ratios, and manipulating colors. These functions are used to create consistent and accessible color palettes for the themes.

## Usage

To use a theme in your application, import the desired theme from the `themes` folder and apply it using your preferred styling solution (e.g., styled-components, emotion, etc.).

Example:

```tsx
import { ThemeProvider } from "styled-components";
import { themes } from "@reactberry/system/themes";

const App = () => (
  <ThemeProvider theme={themes.dark}>
    <YourComponent />
  </ThemeProvider>
);

export default App;
```

## Extending Themes

You can extend or customize the existing themes by modifying the configuration files or adding new themes. Follow the structure and conventions used in the existing themes to ensure consistency.

## Contributing

If you have suggestions or improvements for the themes, feel free to open a pull request or create an issue. Contributions are always welcome!

## Conclusion
This README file provides an overview of the folder structure, the purpose of each file, and instructions on how to use and extend the themes. Feel free to customize it further based on your specific needs and preferences.
