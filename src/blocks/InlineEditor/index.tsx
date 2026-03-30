"use client"
import { IconPencil } from "@/design-system/icons"
import { Box, Text, Button, Field } from "@/design-system/elements"
import React, { useState, useRef, useEffect } from "react"
import Textarea from "react-textarea-autosize"
import Group from "../Group"
import {
  MaskedField,
  maskPresets,
  type MaskPresetType,
} from "../MaskedField"

import { IconDCheck, IconERemove } from "@/design-system/icons"

type InlineEditorProps = {
  id: string | number
  initialText?: string | undefined | null
  placeholder?: string
  onSave: (id: string, text: string) => Promise<void>
  label?: string | React.ReactNode
  editLabel?: string
  isDisabled?: boolean
  fieldProps?: Record<string, any>
  containerProps?: Record<string, any>
  headerProps?: Record<string, any>
  controlSize?: string
  buttonConfig?: any
  maskPreset?: string
}

const InlineEditor: React.FC<InlineEditorProps> = ({
  id = "",
  initialText,
  placeholder = "",
  onSave,
  label,
  editLabel,
  isDisabled = false,
  fieldProps = {},
  containerProps = {},
  headerProps = {},
  controlSize = "small",
  buttonConfig = {
    edit: {
      variant: "ghost",
    },
    save: {
      variant: "success",
    },
    cancel: {
      variant: "default",
    },
  },
  maskPreset,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [tempText, setTempText] = useState(initialText || "")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const handleEditClick = () => {
    setTempText(initialText || "")
    setIsEditing(true)
  }

  const handleSaveClick = async () => {
    setIsLoading(true)
    try {
      await onSave(String(id), String(tempText))
      setIsEditing(false)
    } catch (error) {
      console.error("Error saving text:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelClick = () => {
    setIsEditing(false)
    setTempText(initialText || "")
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setTempText(e.target.value)
  }

  const validMaskPreset =
    maskPreset && maskPreset in maskPresets
      ? (maskPreset as MaskPresetType)
      : null

  useEffect(() => {
    if (isEditing && !validMaskPreset && textAreaRef.current) {
      textAreaRef.current.focus()
    }
    setTempText(initialText || "")
  }, [initialText, isEditing, validMaskPreset])

  return (
    <Text
      as="div"
      display={"flex"}
      flexDirection={"column"}
      gap="xxsmall"
      py="xxsmall"
      fontSize="s"
      {...containerProps}
    >
      <Group
        justifyContent={"space-between"}
        width="100%"
        py="xxsmall"
        gap="xxsmall"
        color="secondary"
        {...headerProps}
      >
        {label && (
          <Text fontWeight={600}>
            {label} {isLoading && "(Wait...)"}
          </Text>
        )}
        <Group flex="none" gap="xs" ml="auto">
          {isEditing ? (
            <>
              <Button
                $size={controlSize}
                gap="xxsmall"
                variant="ghost"
                onClick={handleCancelClick}
                {...buttonConfig.cancel}
              >
                <Box as={IconERemove} size="1em" />
              </Button>
              <Button
                $size={controlSize}
                gap="xxsmall"
                variant="outline.dark"
                onClick={handleSaveClick}
                {...buttonConfig.save}
              >
                <Box as={IconDCheck} size="1.125em" />
              </Button>
            </>
          ) : (
            <Button
              variant="ghost"
              disabled={isDisabled}
              onClick={handleEditClick}
              $size={controlSize}
              {...buttonConfig.edit}
            >
              <Box as={IconPencil} size="1em" /> {editLabel && editLabel}
            </Button>
          )}
        </Group>
      </Group>
      {isEditing ? (
        <Box
          minWidth="0"
          bg={isEditing ? "transparent.brand.3" : "transparent"}
        >
          {validMaskPreset ? (
            <MaskedField
              autoFocus
              preset={validMaskPreset}
              value={tempText || ""}
              onChange={handleChange}
              placeholder={placeholder}
              disabled={isDisabled}
              variant="ghost"
              $size=""
              width="100%"
              {...fieldProps}
            />
          ) : (
            <Field
              autoFocus
              as={Textarea}
              ref={textAreaRef}
              placeholder={placeholder}
              value={tempText}
              onChange={handleChange}
              disabled={isDisabled}
              flex="auto"
              variant="ghost"
              $size=""
              minHeight={"2.25rem"}
              maxHeight={"25rem"}
              overflowY={"scroll"}
              //p="xxsmall"
              width="100%"
              style={{ resize: "none" }}
              {...fieldProps}
            />
          )}
        </Box>
      ) : (
        <Box minHeight={"auto"} border="1px solid transparent" minWidth="0">
          {initialText ? (
            <Text style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>
              {initialText}
            </Text>
          ) : (
            <Text color="secondary" fontStyle="italic">
              {placeholder}
            </Text>
          )}
        </Box>
      )}
    </Text>
  )
}

export default InlineEditor
