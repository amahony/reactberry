"use client"

import React from "react"
import { motion } from "motion/react"
import { Box } from "../../elements"
import Group from "../Group"
import { IconDotsAnim } from "../../icons"

export interface CheckboxProps {
  /** Whether the checkbox is checked */
  checked?: boolean
  /** Callback when the checkbox is toggled */
  onChange?: () => void
  /** Whether the checkbox is in a loading state */
  isLoading?: boolean
  /** Whether the checkbox is disabled */
  disabled?: boolean
  /** Size of the checkbox (default: "1.375rem") */
  size?: string
  /** Title attribute for accessibility */
  title?: string
  /** Additional props for the container */
  containerProps?: React.ComponentProps<typeof Group>
}

const tickVariants = {
  checked: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.2, delay: 0.2 },
  },
  unchecked: {
    pathLength: 0,
    opacity: 0,
    transition: { duration: 0.2 },
  },
}

export default function Checkbox({
  checked = false,
  onChange,
  isLoading = false,
  disabled = false,
  size = "1.375rem",
  title,
  containerProps,
}: CheckboxProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isLoading && !disabled && onChange) {
      onChange()
    }
  }

  const resolvedTitle =
    title ?? (checked ? "Mark as incomplete" : "Mark as complete")

  return (
    <Group
      as={motion.button}
      size={size}
      shape="rounded"
      justifyContent="center"
      border="1.5px solid"
      skin={checked ? "success.static" : "panel"}
      cursor={isLoading || disabled ? "not-allowed" : "pointer"}
      onClick={handleClick}
      disabled={isLoading || disabled}
      title={resolvedTitle}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.15 }}
      position="relative"
      flex="none"
      {...containerProps}
    >
      {isLoading && (
        <Box as={IconDotsAnim} size=".875rem" position="absolute" />
      )}
      <Box
        as={motion.svg}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="3.5"
        stroke="currentColor"
        size={"0.875rem"}
        initial={false}
        animate={checked ? "checked" : "unchecked"}
        opacity={isLoading ? 0 : 1}
      >
        <motion.path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 12.75l6 6 9-13.5"
          variants={tickVariants}
        />
      </Box>
    </Group>
  )
}
