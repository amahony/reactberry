# @reactberry/hooks

`@reactberry/hooks` is a Reactberry-owned private/deferred package boundary for reusable UI behavior hooks.

- Status: internal workspace package boundary only; not part of the first public Reactberry release.
- Current internal surface: initial `useDropdown` open/dismiss hook only.
- Contract guardrail: keep hooks package-safe; no `@/` aliases, no `next/*`, and no product-specific imports.
- Release posture: keep this package repo-local/private and do not document or publish it as a supported consumer entrypoint for the first release.