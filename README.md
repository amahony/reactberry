# reactberry

`@reactberry/system` is the single-package Next.js UI library for Reactberry projects.

## Package model

- This package intentionally depends on Next.js APIs like `next/image` and `next/navigation`.
- It ships source files from `src/` for Next.js apps to transpile.
- Consumer apps should add `@reactberry/system` to `transpilePackages`.

## Installation

Install `@reactberry/system` together with its peer dependencies in your consuming app:

```bash
npm install @reactberry/system@beta styled-components next react react-dom
```

If you want the exact current prerelease, install `@reactberry/system@2.0.0-beta` instead.

- `next`
- `react`
- `react-dom`
- `styled-components`

## Next.js setup

Add `@reactberry/system` to `transpilePackages` in your app's `next.config.js` or `next.config.ts`.

## Example

Import components from `@reactberry/system` and wrap your app with `DesignSystemProvider`.

## Exports

- `@reactberry/system`
- `@reactberry/system/providers`
- `@reactberry/system/themes`
- `@reactberry/system/blocks`
- `@reactberry/system/elements`
- `@reactberry/system/icons`
- `@reactberry/system/charts`

## Notes

- `src/index.ts` is the root barrel export.
- `DesignSystemProvider` includes the styled-components registry for Next.js usage.
- The package keeps the extracted design-system source as the repo's source of truth.
