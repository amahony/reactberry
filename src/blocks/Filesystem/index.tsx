"use client"

import React, { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Box, Button, Text } from "../../elements"
import { Icon24Folder, IconArrowSmRight, IconFile } from "../../icons"

export type FilesystemNode = {
  name: string
  nodes?: FilesystemNode[]
  id?: string
}

export interface FilesystemNodeContext {
  isSelected: boolean
}

export interface FilesystemLeadingContext extends FilesystemNodeContext {
  hasChildren: boolean
  isOpen: boolean
  toggle: () => void
  defaultLeading: React.ReactNode
}

export interface FilesystemProps {
  nodes: FilesystemNode[]
  initiallyOpenNames?: string[]
  onSelectNode?: (node: FilesystemNode) => void
  renderNode?: (
    node: FilesystemNode,
    defaultContent: React.ReactNode,
    ctx: FilesystemNodeContext,
  ) => React.ReactNode
  /**
   * Override the leading slot (toggle for folders, spacer for leaves) so
   * callers can place a fixed-width control such as a checkbox in the
   * same column as the expand toggle.
   */
  renderLeading?: (
    node: FilesystemNode,
    ctx: FilesystemLeadingContext,
  ) => React.ReactNode
  /**
   * IDs of nodes considered selected. The matching ``isSelected`` flag is
   * forwarded to ``renderNode`` and ``renderLeading`` so callers can derive
   * styling/state without re-implementing the lookup. ``Filesystem`` itself
   * does not apply any visual treatment — all rendering is caller-controlled.
   */
  selectedIds?: string[]
}

interface FilesystemItemProps {
  node: FilesystemNode
  initiallyOpenNames?: string[]
  onSelectNode?: (node: FilesystemNode) => void
  renderNode?: (
    node: FilesystemNode,
    defaultContent: React.ReactNode,
    ctx: FilesystemNodeContext,
  ) => React.ReactNode
  renderLeading?: (
    node: FilesystemNode,
    ctx: FilesystemLeadingContext,
  ) => React.ReactNode
  selectedIds?: string[]
  depth?: number
}

const TOGGLE_ICON_SIZE = "1.25rem"
const ITEM_ICON_SIZE = "1.125rem"
const CHILDREN_VARIANTS = {
  open: { opacity: 1, height: "auto" },
  collapsed: { opacity: 0, height: 0 },
}

const TRANSITION = { duration: 0.15, ease: [0.4, 0, 0.2, 1] }

function FilesystemItem({
  node,
  initiallyOpenNames,
  onSelectNode,
  renderNode,
  renderLeading,
  selectedIds,
  depth = 0,
}: FilesystemItemProps) {
  const [isOpen, setIsOpen] = useState(
    () => !!initiallyOpenNames && initiallyOpenNames.includes(node.name),
  )

  const hasChildren = !!node.nodes && node.nodes.length > 0
  const isFolder = !!node.nodes
  const toggle = () => setIsOpen((open) => !open)
  const isSelected = !!node.id && !!selectedIds?.includes(node.id)

  const defaultLeading = hasChildren ? (
    <Button
      as="button"
      type="button"
      onClick={(event: Event) => {
        event.stopPropagation()
        toggle()
        if (onSelectNode) {
          onSelectNode(node)
        }
      }}
      variant="ghost"
      $size=""
      size={TOGGLE_ICON_SIZE}
    >
      <Box
        as={motion.span}
        animate={{ rotate: isOpen ? 90 : 0 }}
        transition={TRANSITION}
      >
        <Box as={IconArrowSmRight} size={TOGGLE_ICON_SIZE} color="tertiary" />
      </Box>
    </Button>
  ) : (
    // Spacer so folder / file icons line up with rows that have toggles
    <Box size={TOGGLE_ICON_SIZE} flex="none" />
  )

  return (
    <Box as={motion.li} layout transition={TRANSITION}>
      <Box
        as="div"
        display="flex"
        alignItems="center"
        gap="xxs"
        py="xxxs"
        px="xxxs"
        cursor="pointer"
        skin={isSelected ? "brand.subtle" : undefined}
        hover="hover.subtle"
        shape="rounded"
        title={node.name}
        onClick={() => {
          if (hasChildren) {
            toggle()
          }
          if (onSelectNode) {
            onSelectNode(node)
          }
        }}
      >
        {renderLeading
          ? renderLeading(node, {
              hasChildren,
              isOpen,
              toggle,
              defaultLeading,
              isSelected,
            })
          : defaultLeading}
        {renderNode ? (
          renderNode(
            node,
            <>
              <Box
                as={isFolder ? Icon24Folder : IconFile}
                size={ITEM_ICON_SIZE}
                color={"secondary"}
                flex="none"
              />
              <Text as="span" fontSize="s" color="primary" lineClamp={1}>
                {node.name}
              </Text>
            </>,
            { isSelected },
          )
        ) : (
          <>
            <Box
              as={isFolder ? Icon24Folder : IconFile}
              size={ITEM_ICON_SIZE}
              color={"secondary"}
              flex="none"
            />
            <Text as="span" fontSize="s" color="primary" lineClamp={1}>
              {node.name}
            </Text>
          </>
        )}
      </Box>

      <AnimatePresence initial={false}>
        {isOpen && hasChildren && (
          <Box
            as={motion.ul}
            m={0}
            p={0}
            listStyleType="none"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={CHILDREN_VARIANTS}
            transition={TRANSITION}
            overflow="hidden"
          >
            {node.nodes!.map((child, index) => (
              <FilesystemItem
                key={`${child.id ?? child.name}-${index}`}
                node={child}
                initiallyOpenNames={initiallyOpenNames}
                onSelectNode={onSelectNode}
                renderNode={renderNode}
                renderLeading={renderLeading}
                selectedIds={selectedIds}
                depth={depth + 1}
              />
            ))}
          </Box>
        )}
      </AnimatePresence>
    </Box>
  )
}

const Filesystem: React.FC<FilesystemProps> = ({
  nodes,
  initiallyOpenNames,
  onSelectNode,
  renderNode,
  renderLeading,
  selectedIds,
}) => {
  if (!nodes || nodes.length === 0) return null

  return (
    <Text as="ul" m={0} p={0}>
      {nodes.map((node, index) => (
        <FilesystemItem
          key={`${node.id ?? node.name}-${index}`}
          node={node}
          initiallyOpenNames={initiallyOpenNames}
          onSelectNode={onSelectNode}
          renderNode={renderNode}
          renderLeading={renderLeading}
          selectedIds={selectedIds}
          depth={0}
        />
      ))}
    </Text>
  )
}

export default Filesystem
