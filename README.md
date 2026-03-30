# reactberry

`reactberry` is the single-package Next.js UI library for Reactberry projects.

## Package model

- This package intentionally depends on Next.js APIs like `next/image` and `next/navigation`.
- It ships source files from `src/` for Next.js apps to transpile.
- Consumer apps should add `reactberry` to `transpilePackages`.

## Installation

Install `reactberry` together with its peer dependencies in your consuming app:

- `next`
- `react`
- `react-dom`
- `styled-components`

## Next.js setup

Add `reactberry` to `transpilePackages` in your app's `next.config.js` or `next.config.ts`.

## Example

Import components from `reactberry` and wrap your app with `DesignSystemProvider`.

## Exports

- `reactberry`
- `reactberry/providers`
- `reactberry/themes`
- `reactberry/blocks`
- `reactberry/elements`
- `reactberry/icons`
- `reactberry/charts`

## Notes

- `src/index.ts` is the root barrel export.
- `DesignSystemProvider` includes the styled-components registry for Next.js usage.
- The package keeps the extracted design-system source as the repo's source of truth.
