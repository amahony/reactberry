"use client"

import React, { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Box, Button, Text } from "../../elements"
import {
  Icon24Folder,
  IconArrowSmRight,
  IconDocFolder,
  IconFile,
} from "../../icons"

export type FilesystemNode = {
  name: string
  nodes?: FilesystemNode[]
  id?: string
}

export interface FilesystemProps {
  nodes: FilesystemNode[]
  initiallyOpenNames?: string[]
  onSelectNode?: (node: FilesystemNode) => void
  renderNode?: (
    node: FilesystemNode,
    defaultContent: React.ReactNode
  ) => React.ReactNode
}

interface FilesystemItemProps {
  node: FilesystemNode
  initiallyOpenNames?: string[]
  onSelectNode?: (node: FilesystemNode) => void
  renderNode?: (
    node: FilesystemNode,
    defaultContent: React.ReactNode
  ) => React.ReactNode
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
  depth = 0,
}: FilesystemItemProps) {
  const [isOpen, setIsOpen] = useState(
    () => !!initiallyOpenNames && initiallyOpenNames.includes(node.name)
  )

  const hasChildren = !!node.nodes && node.nodes.length > 0
  const isFolder = !!node.nodes

  return (
    <Box as={motion.li} layout transition={TRANSITION}>
      <Box
        as="div"
        display="flex"
        alignItems="center"
        gap="xxs"
        py="xxs"
        cursor="pointer"
        title={node.name}
        onClick={() => {
          if (hasChildren) {
            setIsOpen((open) => !open)
          }
          if (onSelectNode) {
            onSelectNode(node)
          }
        }}
      >
        {hasChildren ? (
          <Button
            as="button"
            type="button"
            onClick={(event: Event) => {
              event.stopPropagation()
              setIsOpen((open) => !open)
              if (onSelectNode) {
                onSelectNode(node)
              }
            }}
            variant=""
            $size=""
            size={TOGGLE_ICON_SIZE}
          >
            <Box
              as={motion.span}
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={TRANSITION}
            >
              <Box
                as={IconArrowSmRight}
                size={TOGGLE_ICON_SIZE}
                color="tertiary"
              />
            </Box>
          </Button>
        ) : (
          // Spacer so folder / file icons line up with rows that have toggles
          <Box size={TOGGLE_ICON_SIZE} flex="none" />
        )}
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
            </>
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
}) => {
  if (!nodes || nodes.length === 0) return null

  return (
    <Box as="ul" m={0} p={0} style={{ listStyle: "none" }}>
      {nodes.map((node, index) => (
        <FilesystemItem
          key={`${node.id ?? node.name}-${index}`}
          node={node}
          initiallyOpenNames={initiallyOpenNames}
          onSelectNode={onSelectNode}
          renderNode={renderNode}
          depth={0}
        />
      ))}
    </Box>
  )
}

export default Filesystem
