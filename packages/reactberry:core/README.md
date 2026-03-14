# @reactberry/core

`@reactberry/core` is an approved initial public package surface for the Reactberry hard-break release.

- Status: public package boundary for core primitives, theming, and shared low-level building blocks.
- Consumer contract: use the package root (`@reactberry/core`) rather than `/src` or `/dist` deep imports.
- Supported theme entry: use `@reactberry/core/theme` for `ThemeProvider`, `defaultTheme`, and `GlobalStyle`.
- Release posture: this package remains part of the hard-break transition, so supported entrypoints should stay package-root based.
