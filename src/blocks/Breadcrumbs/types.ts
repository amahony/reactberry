import type { ReactNode } from "react"

/**
 * A single crumb in the trail. Each crumb can render as plain text, a
 * Next.js link, a custom action, or a fully custom node (`render`). A crumb
 * may also expose a `menu` dropdown (e.g. a sibling switcher), mirroring the
 * legacy SingleCrumb behaviour but decoupled from any data source.
 */
export interface BreadcrumbItem {
  /** Stable identity; falls back to `href`/`label`/index. */
  id?: string
  /** Text label for the crumb. */
  label?: string
  /** Destination; when set (and not `current`) the crumb renders as a Link. */
  href?: string
  /** Click handler used when there is no `href`. */
  onClick?: () => void
  /** Leading visual (icon/avatar/status) rendered before the label. */
  icon?: ReactNode
  /** Fully custom crumb content, replacing the default icon + label. */
  render?: ReactNode
  /**
   * Optional dropdown content shown when the crumb's chevron is clicked.
   * Receives a `close` callback so consumers can dismiss after selecting.
   */
  menu?: ReactNode | ((props: { close: () => void }) => ReactNode)
  /** Marks the current-page crumb: non-interactive styling + aria-current. */
  current?: boolean
  /** Max width applied to the label before truncation. Default "12rem". */
  maxWidth?: string
  /** Suffix for the crumb's `data-test` hook. Defaults to the slugged label. */
  dataTest?: string
}

/**
 * Props for the Breadcrumbs trail. Extra props spread onto the container
 * (a `Group`), so layout/style props like `flex`, `px`, `minWidth` work.
 */
export interface BreadcrumbsProps {
  /** Ordered crumbs, root first. */
  items: BreadcrumbItem[]
  /** Node rendered between crumbs. Defaults to a right chevron. */
  separator?: ReactNode
  /** Show a leading Home button linking to `homeHref`. */
  showHome?: boolean
  /** Home destination. Default "/". */
  homeHref?: string
  /** Show a leading Back button. */
  showBack?: boolean
  /** Back handler. Defaults to `router.back()`. */
  onBack?: () => void
  /** Right-aligned actions (e.g. favourite / overflow menu). */
  actions?: ReactNode
  /** Prefix for `data-test` hooks. Default "breadcrumbs". */
  dataTest?: string
  [key: string]: any
}
