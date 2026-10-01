"use client"
import { Fragment } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

import { Box, Button } from "../../elements"
import Group from "../Group"
import Icon from "../Icon"
import BreadcrumbCrumb from "./BreadcrumbCrumb"
import type { BreadcrumbsProps } from "./types"

/**
 * Linear-style breadcrumb trail, optimized for the Next.js App Router.
 *
 * Presentational and data-driven: pass an ordered `items` array. Each crumb
 * can be a link, a button, plain current text, or fully custom (`render`),
 * and may expose a dropdown `menu`. Optional Home/Back controls and
 * right-aligned `actions` round out the Linear-like header pattern.
 */
export default function Breadcrumbs({
  items,
  separator,
  showHome = false,
  homeHref = "/",
  showBack = false,
  onBack,
  actions,
  dataTest = "breadcrumbs",
  ...boxProps
}: BreadcrumbsProps) {
  const router = useRouter()

  const sep = separator ?? (
    <Box
      as={Icon}
      icon="IconArrowSmRight"
      size="1.125rem"
      flex="none"
      display="inline-flex"
      color="tertiary"
      aria-hidden="true"
    ></Box>
  )

  // Home reads as the root crumb, so it takes a separator. Back is a
  // navigation control, not part of the trail.
  const hasLeading = showHome

  return (
    <Group
      as="nav"
      aria-label="Breadcrumb"
      gap="xxxs"
      minWidth="0"
      data-test={dataTest}
      {...boxProps}
    >
      {showBack && (
        <Button
          $size="icon.small"
          variant="ghost"
          onClick={() => (onBack ? onBack() : router.back())}
          aria-label="Go back"
          data-test={`${dataTest}-back`}
        >
          <Box flex="none" size="1.125rem" color="secondary">
            <Icon icon="IconArrowLeft" size="1.125rem" />
          </Box>
        </Button>
      )}
      {showHome && (
        <Button
          as={Link}
          href={homeHref}
          $size="icon.small"
          variant="ghost"
          aria-label="Home"
          data-test={`${dataTest}-home`}
        >
          <Box flex="none" size="1.125rem" color="secondary">
            <Icon icon="IconHouse" size="1.125rem" />
          </Box>
        </Button>
      )}

      {items.map((item, index) => (
        <Fragment key={item.id ?? item.href ?? item.label ?? index}>
          {(index > 0 || hasLeading) && sep}
          <BreadcrumbCrumb item={item} dataTest={dataTest} />
        </Fragment>
      ))}

      {actions != null && (
        <Group flex="none" gap="xxs" ml="xs">
          {actions}
        </Group>
      )}
    </Group>
  )
}

export { Breadcrumbs }
export { default as BreadcrumbCrumb } from "./BreadcrumbCrumb"
export { humanizeSegment, pathToBreadcrumbItems, slugify } from "./helpers"
export type { BreadcrumbItem, BreadcrumbsProps } from "./types"
