# Reactberry AI-Native Design System Transformation Guide

This document describes how to transform Reactberry into an **AI-native** UI library and how LLM agents should participate in that transformation. It is designed to be used directly as part of model instructions.

## 1. Role: how LLM agents should use this guide

If you are an LLM operating in this repository:

- You are a **coding assistant** that generates or edits React/TypeScript UI code using Reactberry under `@/`.
- Your top priority is to **respect the current design system contracts** and to gradually make the system more AI-friendly.
- Treat the files referenced in this guide as **current sources of truth**, but assume the system is **not yet fully AI-native**: some components, blocks, tokens, or docs may be incomplete or missing.
- When something is unclear or undocumented, you should **ask for clarification**, or clearly mark gaps and propose concrete follow-up changes instead of guessing.

Some LLMs may also act as **maintainer / refactoring agents** for the design system itself. Those agents must follow the audit and transformation steps in sections 7–9.

### 1.1 What “AI-native” means in this repo

For Reactberry, the UI library is considered **AI-native** when all of the following are true:

1. **Machine-readable metadata** exists for every exported design-system component (elements, important blocks, and tokens), including:
   - Clear `semanticUse` / `notFor` guidance
   - Structured prop definitions (types, allowed values, defaults)
   - `commonMistakes`, `correctUsage`, and `incorrectUsage` examples
2. **Documentation and metadata are aligned**:
   - Component docs, examples, and quick cards match the machine-readable metadata.
   - Breaking changes update both code and metadata at the same time.
3. **Decision trees and patterns** are available and discoverable:
   - There are explicit decision trees for component selection and prop selection.
   - Common UI patterns (forms, cards, tables, layouts) are represented as reusable examples.
4. **Validation is possible**:
   - There is enough metadata (in `components.json`, `types.ts`, and docs) for tools and LLMs to **validate** generated code (e.g. props, tokens, variants).
5. **Critical rules are centralized and unambiguous**:
   - Rules like `size` vs `$size`, Box vs Text, and theme-token usage are written once and reused everywhere (docs, metadata, and examples).

The rest of this guide audits how close the current system is to that target and describes how LLM agents should close the remaining gaps.

## 2. Canonical AI resources (read these first)

All paths are relative to `src`:

- `components.json` – machine-readable description of core elements, key blocks, tokens, and global rules
- `types.ts` – exported TypeScript types for components and tokens, with usage guidance
- `QUICK-START-AI.md` – 1-page onboarding for AI assistants (critical rules + pre-generation checklist)
- `docs/AI-INDEX.md` – primary index for AI assistants (decision trees, quick cards, patterns, validation)
- `docs/index.md` – documentation index with AI warnings and navigation
- `docs/elements.md` – detailed behavior of `Box`, `Text`, `Button`, `Field`
- `docs/blocks.md` – overview of composed “blocks” (many APIs still in progress)
- `docs/themes.md` – theme structure, tokens, and skin system

AI tools should typically follow this workflow:

1. Parse `components.json`
2. Import types from `types.ts`
3. Use `docs/AI-INDEX.md` and `QUICK-START-AI.md` for rules and patterns
4. Drill into `docs/*` and `docs/api/*` as needed for details

## 3. Actual design-system structure (today)

The design system currently lives under:

```text
src
  components.json          # AI-facing component and token metadata
  types.ts                 # Shared TypeScript types + usage guides
  QUICK-START-AI.md        # High-priority AI quick start
  ai-native-design-system-guide.md  # This file
  /elements                # Box, Text, Button, Field (core primitives)
  /blocks                  # Composed UI patterns (Avatar, Menu, Modal, etc.)
  /themes                  # default theme (light/dark, tokens, skins)
  /hooks                   # Interaction hooks (useAnimatedText, useHover, etc.)
  /charts                  # Chart primitives (BarChart, PieChart, ...)
  /docs                    # Human + AI documentation, examples, decision trees
```

> There is **no `/ai` folder or per-component `.ai.ts` files**. Instead, AI metadata is centralized in `components.json` and `types.ts`, backed by rich markdown docs under `docs/`.

## 4. Core component model (what AI should “see”)

### 4.1 Elements (foundational primitives)

Defined in `elements/` and exported from `elements/index.ts`:

- `Box` – layout and containers only (no typography props).
- `Text` – extends `Box` with typography; must be used for all text content and semantic HTML (`as="h1" | "p" | "label" | ...`).
- `Button` – extends `Text` with button-specific behavior and `$size`-based sizing.
- `Field` – extends `Text` with form-input behavior and `$size`-based sizing.

Authoritative documentation:

- Behavior and props: `docs/elements.md`
- API details: `docs/api/Box.md`, `docs/api/Text.md`, `docs/api/Button.md`, `docs/api/Field.md`
- AI-oriented summaries and examples: `docs/AI-INDEX.md`, `QUICK-START-AI.md`

### 4.2 Blocks (composed patterns)

Defined in `blocks/` and documented in `docs/blocks.md`.

- Higher-level components such as `Container`, `Heading`, `Avatar`, `Menu`, `Modal`, `Table`, `FieldSet`, etc.
- Some high-priority blocks have additional metadata in `components.json.blocks` (e.g. `Container`, `Heading`, `Avatar`, `Menu`, `Tooltip`, `Modal`, `Table`, `FieldSet`).
- Individual block API pages live under `docs/api/blocks/` and are being filled in incrementally.

AI assistants should:

- Prefer **core elements** when a block’s API is undocumented.
- Use `components.json.blocks` and `docs/blocks.md` to understand block intent and composition.

### 4.3 Tokens, theme, and skins

Theme and token information is split between:

- `components.json.tokens` – machine-readable definitions of:
  - `space` (spacing scale, used by `gap`, `p`, `m`, `size` on Box/Text)
  - `fontSize` (typography scale, used by `fontSize` on Text)
  - `componentSize` (used by `$size` on Button/Field only)
  - `shape` (border-radius scale, used by `shape`)
- `themes/` (especially `themes/default`) – implementation of light/dark themes, skins, shapes, shadows, etc.
- `docs/themes.md` and `docs/assets/design-tokens.md` – human-readable documentation of all tokens and skins.

AI should **always** prefer these token names (`"m"`, `"xl"`, `"primary"`, etc.) instead of hard-coded pixel values or colors.

## 5. Machine-readable metadata design

### 5.1 `components.json`

Top-level shape (simplified):

- `elements` – metadata for `Box`, `Text`, `Button`, `Field`
- `blocks` – metadata for selected block components
- `tokens` – theme token scales
- `criticalRules` – global rules all generated code must obey
- `decisionTree` – high-level routing hints (`isTextContent` → Text, `isFormInput` → Field, etc.)

Each entry under `elements` or `blocks` includes:

- `path` – module path to import from
- `category` – high-level category (`layout`, `typography`, `interactive`, `form`, etc.)
- `description`, `semanticUse`, `notFor` – when to use vs. avoid
- `extends` / `inheritsAllPropsFrom` – inheritance relationships
- `props` – per-prop metadata:
  - `type` – logical type name (`SpaceToken`, `ComponentSize`, `string`, `boolean`, `function`, ...)
  - `values` – allowed literal values when known
  - `default` – default value (if any)
  - `description` – natural-language description
  - `critical` / `note` – extra guidance for AI ("Use `$size` (with $) for Button, NOT `size`")
- `commonMistakes`, `correctUsage`, `incorrectUsage`, `relatedComponents`
- Optional `requiredPatterns` for important patterns (e.g. a labeled input pairing `Text` + `Field`).

AI assistants should:

1. **Parse `components.json` first** to learn allowed props, values, and critical pitfalls.
2. Use `criticalRules` and `decisionTree` as hard constraints when generating code.
3. Treat `correctUsage` and `incorrectUsage` as examples for pattern learning and validation.

### 5.2 `types.ts`

`types.ts` provides the TypeScript layer backing the same concepts:

- Token types: `SpaceToken`, `FontSizeToken`, `ShapeToken`, `SkinToken`, `ComponentSize`, etc.
- Component types: `BaseElementProps`, `TextProps`, `ButtonProps`, `FieldProps`.
- Usage guides: `PropUsageGuide`, `UsageExamples`, and helper type-guards (e.g. `isSpaceToken`, `isComponentSize`).

For static analysis or tooling:

- Import from `"@/types"` to validate generated props.
- Use `PropUsageGuide` comments as ground truth for **`size` vs `$size`** and required `as` props.

> **Audit note:** As of early 2025, `components.json` and `types.ts` already provide a strong foundation, but coverage is not guaranteed to be complete (especially for some blocks and patterns). Audit agents should assume this metadata is **partially complete** and extend it where gaps are found.

## 6. Critical AI rules (aligned with current system)

These rules are enforced consistently across `components.json`, `types.ts`, and the docs. **Every LLM agent that generates UI code MUST enforce them on its own output before returning code.**

1. **Box vs Text**
   - `Box` is for layout, containers, and non-text elements only.
   - `Text` must be used for all text content and semantic elements (`h1`–`h6`, `p`, `span`, `label`, etc.).
   - If you find yourself putting text or typography props on `Box`, stop and switch to `Text`.

2. **`size` vs `$size`**
   - `Box` / `Text` use `size` (a `SpaceToken`) for generic sizing.
   - `Button` / `Field` use `$size` (a `ComponentSize`) for component-specific sizing.
   - Using the wrong one is the **#1 error** and is explicitly called out in `components.json.criticalRules`.
   - Before returning any code, scan for `size`/`$size` usages and correct them according to the component.

3. **Theme tokens only**
   - Use aliases like `"m"`, `"xl"`, `"primary"`, `"success"` instead of raw pixel values or hex colors.
   - If you see `16px`, `#ffffff`, or numeric gaps like `gap={8}`, replace them with the closest documented token from `components.json.tokens` and `docs/themes.md`.

4. **Semantic HTML and accessibility**
   - Always set `as` correctly on `Text` (and on `Field` when needed).
   - Always connect labels and fields with `htmlFor`/`id`.
   - Use patterns from `docs/examples/` and `docs/reference/patterns-registry.md` when building forms or complex UIs.

For a concise, example-driven version of these rules and a pre-generation checklist, see `QUICK-START-AI.md` and `docs/AI-INDEX.md`.

## 7. Auditing current AI-readiness

This section describes how an **LLM audit agent** should evaluate the current design system and produce a gap report that tells maintainers what is missing for full AI-native support.

### 7.1 Inventory components and tokens

1. **Elements and blocks**
   - Read `elements/index.ts` and list all exported primitives (currently: `Box`, `Text`, `Button`, `Field`).
   - Scan `blocks/` for exported block components (check each folder’s `index.tsx`/`index.ts`).
2. **Tokens and themes**
   - Inspect `themes/` (especially `themes/default`) to discover all tokens (space, font sizes, colors, component sizes, shapes, shadows, skins).
   - Compare these to the `tokens` section in `components.json` and to `docs/themes.md`.

Output: a structured list of **all exported components and known tokens**.

### 7.2 Cross-check metadata coverage

For each exported element or important block from 7.1:

1. Check for a corresponding entry in `components.json.elements` or `components.json.blocks`.
2. For each prop in the TypeScript type (from `types.ts` or component source):
   - Confirm that the prop is documented under `props` in `components.json`.
   - Note any props that appear only in code but not in metadata.
3. Check if `semanticUse`, `notFor`, `commonMistakes`, `correctUsage`, and `incorrectUsage` are present and non-empty.

Output: a **metadata coverage report** listing, per component:

- Missing `components.json` entry (if any)
- Missing or incomplete fields (e.g. no `semanticUse`, no `commonMistakes`)
- Props present in code but not described in `components.json`

### 7.3 Cross-check documentation coverage

For each exported component and important block:

1. Look under `docs/api/` and `docs/blocks.md` / `docs/elements.md` for an API or usage page.
2. Check for quick-reference material:
   - `docs/reference/quick-cards/<name>.md`
   - Patterns in `docs/reference/patterns-registry.md`
   - Examples in `docs/examples/index.json`
3. Note any components that lack API docs, quick cards, or examples.

Output: a **documentation coverage report** listing, per component:

- Whether an API doc exists
- Whether a quick card exists
- Whether examples/patterns exist

### 7.4 Check alignment between metadata, types, and docs

For each component with both metadata and docs:

1. Verify that the props listed in `components.json` match those in `types.ts` and the API docs.
2. Check that default values and allowed value sets (e.g. variants, sizes) are consistent across all three.
3. Flag any inconsistencies (e.g. a prop allowed in metadata but not in types, or vice versa).

Output: an **alignment report** listing discrepancies that must be resolved.

### 7.5 Summarize AI-readiness

The audit agent should produce a final summary that includes:

- A list of **fully AI-ready components** (good metadata + docs + examples + alignment).
- A list of **partially AI-ready components** (some metadata/docs but with gaps).
- A list of **not AI-ready components** (exported but with little or no metadata/docs).
- Specific recommended follow-up tasks (grouped by component) for maintainer agents.

This report can then be used to drive the transformation steps in sections 8–10.

## 8. Recommended LLM workflow for using the design system (during transformation)

Even before the system is fully AI-native, LLM code-generation agents should follow this workflow to maximize accuracy:

1. **Understand the task and constraints**
   - Identify whether the user is asking for **layout**, **text content**, **buttons/actions**, **form inputs**, or a **more complex pattern**.
  - Default to using the design system (`@/`) rather than raw HTML/CSS unless explicitly told otherwise.

2. **Select components using current metadata and decision trees**
   - Use the quick decision tree in `QUICK-START-AI.md` and the detailed trees in `docs/decision-trees/*`.
   - Cross-check your choice against any available `semanticUse` / `notFor` in `components.json`.
   - If a suitable block exists in `components.json.blocks` and `docs/blocks.md`, prefer that over reinventing the pattern.

3. **Choose props and tokens from the source of truth**
   - For each chosen component, consult `components.json` and `types.ts` to:
     - List valid props and their allowed values when documented.
     - Confirm which props are required or strongly recommended.
   - Use theme tokens (`SpaceToken`, `FontSizeToken`, `ComponentSize`, `ShapeToken`, `SkinToken`) instead of raw values.

4. **Generate code with correct imports**
   - Import from the documented paths, typically:
    - `@/elements` for `Box`, `Text`, `Button`, `Field`.
    - `@/blocks/...` for blocks.
   - Do not introduce new top-level entry points unless they already exist in the repository.

5. **Self-validate against metadata before returning code**
   - For each component instance you generate:
     - Verify every prop name exists in the corresponding `components.json` entry or in the TypeScript props type (when available).
     - Verify every prop value is allowed (by type and by `values` lists in `components.json` when present).
     - Re-check the critical rules in section 6 (Box vs Text, `size` vs `$size`, theme tokens, semantic HTML).
   - If any part is uncertain, either:
     - Adjust the code to use a simpler, well-documented pattern; or
     - Ask a clarification question rather than guessing.

6. **Use examples and patterns rather than inventing new ones**
   - Prefer copying and adapting patterns from:
     - `docs/examples/index.json`
     - `docs/reference/patterns-registry.md`
     - `components.json[*].correctUsage`
   - Avoid inventing completely new combinations of props unless you have verified them against `types.ts` and `components.json`.

7. **Handle errors and feedback iteratively**
   - If a TypeScript or runtime error points to an invalid prop or token:
     - Look up that prop in `components.json` and `types.ts` to correct it.
   - If the user reports a visual or UX issue, consider whether you violated any critical rules (tokens, semantic HTML, Box vs Text, `size` vs `$size`).

Following this workflow will help different LLM models stay consistent while the system is being upgraded to fully AI-native.

## 9. Maintainer / refactoring agents (design system changes)

This section is for LLM agents (or humans) that are explicitly asked to **modify the design system itself**—for example, to add a new element, introduce a new block, or update tokens. If you are only using the design system to build product features, you can stop at section 8.

When adding or changing components, keep the AI surface area in sync.

### 9.1 Adding or changing an **element** (Box/Text/Button/Field-like)

1. Implement or update the component under `elements/` and export it from `elements/index.ts`.
2. Add or update its prop types and token types in `types.ts`.
3. Update `docs/api/<Name>.md` and `docs/elements.md` with behavior, props, and examples.
4. Add or update an entry under `components.json.elements[Name]`:
   - Fill in `category`, `description`, `semanticUse`, `notFor`.
   - Define each prop under `props` with type, allowed values, defaults, and critical notes.
   - Add `commonMistakes`, `correctUsage`, and `incorrectUsage` examples.
5. If the element is widely used, consider:
   - A quick card under `docs/reference/quick-cards/`
   - Updates to decision trees under `docs/decision-trees/`.

### 9.2 Adding or changing a **block**

1. Implement or update the block under `blocks/<BlockName>/`.
2. Document it in `docs/blocks.md` and optionally `docs/api/blocks/<BlockName>.md`.
3. If the block is important for AI, add an entry under `components.json.blocks[BlockName]` describing:
   - Its role, typical usage, and key dependencies (e.g. `Box`, `Text`, `Button`).
4. Provide at least one pattern in `docs/examples/` and register it in `docs/examples/index.json` if appropriate.

### 9.3 Updating tokens or themes

1. Change token or theme definitions under `themes/default/` as needed.
2. Keep `components.json.tokens` and `docs/themes.md` in sync with the new values.
3. Audit examples in `docs/*` to ensure they still use valid tokens.

## 10. Refactor / feature checklist (for maintainer agents)

Use this checklist whenever you introduce or significantly change a design-system component:

- [ ] Component is exported from the appropriate `index.ts`
- [ ] Types are updated in `types.ts`
- [ ] `components.json` entry is added/updated with:
  - [ ] Accurate props (type, values, defaults, critical notes)
  - [ ] `semanticUse` / `notFor` guidance
  - [ ] `commonMistakes` and `correctUsage` / `incorrectUsage` examples
- [ ] Relevant docs updated (`docs/elements.md`, `docs/blocks.md`, `docs/api/*`)
- [ ] At least one example added under `docs/examples/` if needed
- [ ] Decision trees / quick cards updated when the surface area changes
- [ ] New behavior still respects the critical AI rules in `components.json.criticalRules`

This guide should stay aligned with the actual structure of `src`. When you adjust the design system, treat updating this file as part of the same change.

