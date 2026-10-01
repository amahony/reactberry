# Breadcrumbs

A Linear-style breadcrumb trail, optimized for the Next.js App Router.

Presentational and data-driven: pass an ordered `items` array. Each crumb can
render as a link, a button, plain current-page text, or a fully custom node
(`render`), and may expose a dropdown `menu` (e.g. a sibling switcher). Optional
Home/Back controls and right-aligned `actions` complete the Linear-like header.

Built on `Box`, `Text`, `Button`, `Group`, `Icon` and `Popover`, with
`next/link` + `next/navigation` for routing.

## Usage

```tsx
import { Breadcrumbs, Icon } from "@reactberry/system/blocks";

<Breadcrumbs
  items={[
    { label: "Development", href: "/development", icon: <Icon icon="IconDocFolder" size="1rem" /> },
    { label: "Cycles", href: "/development/cycles" },
    {
      label: "Cycle 18",
      current: true,
      menu: ({ close }) => <SiblingSwitcher onSelect={close} />,
    },
  ]}
  actions={
    <Button $size="icon.small" variant="ghost" aria-label="More">
      <Icon icon="IconDotsAnim" size="1.125rem" />
    </Button>
  }
/>;
```

### Deriving crumbs from the pathname

For simple routes, build items straight from the App Router pathname:

```tsx
"use client";
import { usePathname } from "next/navigation";
import { Breadcrumbs, pathToBreadcrumbItems } from "@reactberry/system/blocks";

const pathname = usePathname();
const items = pathToBreadcrumbItems(pathname, {
  labels: { "123": project?.name ?? "…" },
  exclude: (segment) => segment === "(app)", // drop route groups
});

<Breadcrumbs items={items} />;
```

## Props

| Prop        | Type               | Default         | Description                                     |
| ----------- | ------------------ | --------------- | ----------------------------------------------- |
| `items`     | `BreadcrumbItem[]` | —               | Ordered crumbs, root first.                     |
| `separator` | `ReactNode`        | right chevron   | Node rendered between crumbs.                   |
| `showHome`  | `boolean`          | `false`         | Leading Home button linking to `homeHref`.      |
| `homeHref`  | `string`           | `"/"`           | Home destination.                               |
| `showBack`  | `boolean`          | `false`         | Leading Back button.                            |
| `onBack`    | `() => void`       | `router.back()` | Back handler.                                   |
| `actions`   | `ReactNode`        | —               | Right-aligned actions (favourite, overflow …).  |
| `dataTest`  | `string`           | `"breadcrumbs"` | Prefix for `data-test` hooks.                   |

Extra props spread onto the container `Group`, so `flex`, `px`, `minWidth`,
etc. work directly.

### `BreadcrumbItem`

| Field      | Type                                              | Description                                            |
| ---------- | ------------------------------------------------- | ------------------------------------------------------ |
| `label`    | `string`                                          | Crumb text.                                            |
| `href`     | `string`                                          | When set (and not `current`), renders a Next.js Link.  |
| `onClick`  | `() => void`                                      | Action used when there is no `href`.                   |
| `icon`     | `ReactNode`                                       | Leading visual (icon/avatar/status).                   |
| `render`   | `ReactNode`                                       | Fully custom crumb content, replacing icon + label.    |
| `menu`     | `ReactNode \| (({ close }) => ReactNode)`         | Dropdown content behind a chevron toggle.              |
| `current`  | `boolean`                                         | Current page: non-link styling + `aria-current`.       |
| `maxWidth` | `string`                                          | Label truncation width (default `"12rem"`).            |
| `dataTest` | `string`                                          | `data-test` suffix (defaults to the slugged label).    |

## Helpers

- `pathToBreadcrumbItems(pathname, { labels, exclude, markLastCurrent })` —
  build crumbs with cumulative hrefs from an App Router pathname.
- `humanizeSegment(segment)` — `"project-templates"` → `"Project Templates"`.
- `slugify(label)` — `"Cycle 18"` → `"cycle-18"`.

## Exports

- `Breadcrumbs` (default) — the trail component.
- `BreadcrumbCrumb` — a single crumb (link/button/text + optional menu).
- Helpers: `pathToBreadcrumbItems`, `humanizeSegment`, `slugify`.
- Types: `BreadcrumbItem`, `BreadcrumbsProps`.
