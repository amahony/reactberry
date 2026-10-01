"use client"
import Link from "next/link"

import { Box, Text } from "../../elements"
import Group from "../Group"
import Popover from "../Popover"
import Icon from "../Icon"
import { slugify } from "./helpers"
import type { BreadcrumbItem } from "./types"

interface Props {
  item: BreadcrumbItem
  dataTest?: string
}

const HOVER = { hover: { bg: "transparent.light.1", color: "primary" } }

/**
 * A single crumb: an optional leading icon + label, rendered as a Next.js
 * Link, a button, or plain (current) text. When `menu` is supplied a chevron
 * toggle opens a Popover for switching between sibling items.
 */
export default function BreadcrumbCrumb({
  item,
  dataTest = "breadcrumbs",
}: Props) {
  const {
    label,
    href,
    onClick,
    icon,
    render,
    menu,
    current,
    maxWidth = "12rem",
  } = item
  const testId = item.dataTest ?? slugify(label)

  const content = render ?? (
    <Group gap="xxs" minWidth="0" maxWidth={maxWidth}>
      {icon != null && (
        <Box flex="none" display="inline-flex">
          {icon}
        </Box>
      )}
      {label != null && (
        <Text
          fontSize="s"
          fontWeight={600}
          lineClamp={1}
          color={current ? "primary" : "inherit"}
        >
          {label}
        </Text>
      )}
    </Group>
  )

  let crumb: React.ReactNode
  if (href && !current) {
    crumb = (
      <Box
        as={Link}
        href={href}
        display="inline-flex"
        alignItems="center"
        cursor="pointer"
        shape="rounded"
        p="xxs"
        color="secondary"
        interactive={HOVER}
        style={{ textDecoration: "none" }}
        data-test={`${dataTest}-${testId}`}
      >
        {content}
      </Box>
    )
  } else if (onClick && !current) {
    crumb = (
      <Box
        as="button"
        type="button"
        onClick={onClick}
        display="inline-flex"
        alignItems="center"
        cursor="pointer"
        shape="rounded"
        p="xxs"
        color="secondary"
        interactive={HOVER}
        data-test={`${dataTest}-${testId}`}
      >
        {content}
      </Box>
    )
  } else {
    crumb = (
      <Box
        display="inline-flex"
        alignItems="center"
        p="xxs"
        color="primary"
        aria-current={current ? "page" : undefined}
        data-test={`${dataTest}-${testId}`}
      >
        {content}
      </Box>
    )
  }

  if (!menu) return <>{crumb}</>

  const renderMenu = typeof menu === "function" ? menu : () => menu

  return (
    <Group gap="0" flex="none">
      {crumb}
      <Popover
        placement="bottom start"
        trigger={
          <Box
            p="xxs"
            display="inline-flex"
            color="tertiary"
            cursor="pointer"
            shape="rounded"
            interactive={{ hover: { bg: "transparent.light.1" } }}
            data-test={`${dataTest}-${testId}-menu`}
          >
            <Icon icon="IconArrowSmDown" size="1rem" />
          </Box>
        }
      >
        {({ close }: { close: () => void }) => renderMenu({ close })}
      </Popover>
    </Group>
  )
}
