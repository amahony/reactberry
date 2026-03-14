# @reactberry/ui

`@reactberry/ui` is the Reactberry-owned private/deferred package boundary for app-agnostic composites and is not part of the first public Reactberry release surface.

- Status: internal workspace package boundary only; not part of the initial public Reactberry hard-break release.
- Current internal surface: `EmptyState` plus the lightweight `FormCard` and `FormActions` composites for private, app-agnostic form shells/action areas intended to host `@reactberry/forms` content with stabilized Reactberry primitives.
- Admission guardrail: add exports here only when they depend on stable Reactberry package roots (`@reactberry/core`, `@reactberry/forms`, `@reactberry/hooks`, `@reactberry/icons`) and stay free of `@/` aliases, `next/*`, and product-specific imports.
- Consumer contract: do not document, publish, or depend on this package as a public entrypoint.
- Internal usage note: keep `@reactberry/ui` usage repo-local and treat the current surface as private/deferred even when importing from the package root inside the workspace.
