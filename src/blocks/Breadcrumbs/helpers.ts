import type { BreadcrumbItem } from "./types"

/**
 * Humanize a URL segment for display.
 * "project-templates" -> "Project Templates"; "123" -> "123".
 */
export function humanizeSegment(segment: string): string {
  const decoded = decodeURIComponent(segment)
  return decoded
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

interface PathToItemsOptions {
  /**
   * Label overrides keyed by either the raw segment ("123") or the cumulative
   * href ("/projects/123"). Use this to resolve ids to human names.
   */
  labels?: Record<string, string>
  /** Return true to drop a segment (e.g. route groups or bare ids). */
  exclude?: (segment: string, index: number) => boolean
  /** When false, the last crumb keeps its href/link. Default true. */
  markLastCurrent?: boolean
}

/**
 * Build breadcrumb items from a Next.js App Router pathname. Each retained
 * segment becomes a crumb with a cumulative href. This is the App Router
 * equivalent of the legacy pathname parser — purely presentational, with no
 * data fetching; callers supply `labels` to resolve ids to names.
 */
export function pathToBreadcrumbItems(
  pathname: string,
  options: PathToItemsOptions = {},
): BreadcrumbItem[] {
  const { labels = {}, exclude, markLastCurrent = true } = options
  const segments = pathname.split("/").filter(Boolean)

  const items: BreadcrumbItem[] = []
  segments.forEach((segment, index) => {
    if (exclude?.(segment, index)) return
    const href = "/" + segments.slice(0, index + 1).join("/")
    items.push({
      href,
      label: labels[segment] ?? labels[href] ?? humanizeSegment(segment),
    })
  })

  if (markLastCurrent && items.length) {
    items[items.length - 1] = { ...items[items.length - 1], current: true }
  }

  return items
}

/** Slugify a label for `data-test` hooks. "Cycle 18" -> "cycle-18". */
export function slugify(value?: string): string {
  return (value ?? "").toLowerCase().trim().replace(/\s+/g, "-")
}
