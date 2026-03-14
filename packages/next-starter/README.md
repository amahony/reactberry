# @reactberry/next-starter

Private in-repo Next.js starter for internal Reactberry consumer validation.

## Status

- Private/internal only
- Canonical consumer-validation workspace for the current Reactberry release contract
- Uses only supported public Reactberry imports: `@reactberry/core`, `@reactberry/forms`, and `@reactberry/core/theme`

## Local setup

This starter intentionally validates the package-root consumer path, so build the public packages before running the app:

1. `yarn starter:prep`
2. `yarn starter:dev`

For a production-style validation run, use `yarn starter:build` from the repo root.

## Guardrails

- Do not switch this starter to `@reactberry/*/src` or `@reactberry/*/dist` imports.
- Do not treat `@reactberry/ui`, `@reactberry/hooks`, or `@reactberry/icons` as public starter dependencies.
- Keep `packages/playground` legacy/internal-only; this starter is the replacement validation target.