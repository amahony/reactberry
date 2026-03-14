# Legacy playground

This package contains the legacy Create React App playground for internal/manual inspection only.

## Status

- Legacy/internal only
- Not the supported public Reactberry example contract
- Do not use it as adoption guidance or a starter template
- Canonical in-repo consumer validation now lives in `packages/next-starter`

## Contract guardrails

The playground should follow supported package imports only:

- Use `@reactberry/core` and `@reactberry/forms`
- Do **not** rely on package-internal deep imports

## Local use

If you still need to inspect the legacy sandbox internally, run `yarn playground:legacy` from the repo root or `yarn start` from this package.

For the supported private consumer-validation path, use `yarn starter:build` / `yarn starter:dev` from the repo root instead.
