"use client"
import { IconPencil } from "../../icons"
import { Box, Text, Button, Field } from "../../elements"
import React, { useState, useRef, useEffect } from "react"
import Textarea from "react-textarea-autosize"
import Group from "../Group"
import {
  MaskedField,
  maskPresets,
  formatWithPreset,
  type MaskPresetType,
} from "../MaskedField"

import { IconDCheck, IconERemove } from "../../icons"

const getErrorMessage = (error: unknown) =>
  error instanceof Error && error.message
    ? error.message
    : "Something went wrong. Please try again."

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
  /**
   * Native input type (e.g. "email", "url", "tel"). Renders a single-line
   * input instead of the autosizing textarea, so the browser applies its own
   * keyboard and validation. Ignored when `maskPreset` resolves to a mask.
   */
  inputType?: string
  /**
   * Text shown when not editing, for fields whose stored value is not the
   * human-readable form (e.g. a date input's `YYYY-MM-DD`).
   */
  displayText?: string | null
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
  inputType,
  displayText,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [tempText, setTempText] = useState(initialText || "")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const editRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null)
  const errorId = `inline-editor-error-${String(id)}`

  const handleEditClick = () => {
    setTempText(initialText || "")
    setErrorMessage(null)
    setIsEditing(true)
  }

  const handleSaveClick = async () => {
    setErrorMessage(null)
    setIsLoading(true)
    try {
      await onSave(String(id), String(tempText))
      setIsEditing(false)
    } catch (error) {
      console.error("Error saving text:", error)
      setErrorMessage(getErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelClick = () => {
    setIsEditing(false)
    setTempText(initialText || "")
    setErrorMessage(null)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setTempText(e.target.value)
    setErrorMessage(null)
  }

  const validMaskPreset =
    maskPreset && maskPreset in maskPresets
      ? (maskPreset as MaskPresetType)
      : null

  const readOnlyText =
    displayText ??
    (validMaskPreset
      ? formatWithPreset(String(initialText || ""), validMaskPreset)
      : initialText)

  useEffect(() => {
    if (isEditing && !validMaskPreset && editRef.current) {
      editRef.current.focus()
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
        {label &&
          (typeof label === "string" ? (
            <Text fontWeight={600}>
              {label} {isLoading && "(Wait...)"}
            </Text>
          ) : (
            <Box display="flex" alignItems="center" gap="xxsmall">
              {label}
              {isLoading && (
                <Text as="span" fontWeight={600} color="inherit">
                  (Wait...)
                </Text>
              )}
            </Box>
          ))}
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
              aria-describedby={errorMessage ? errorId : undefined}
              variant="ghost"
              $size=""
              width="100%"
              {...fieldProps}
            />
          ) : inputType ? (
            <Field
              autoFocus
              as="input"
              type={inputType}
              ref={editRef}
              placeholder={placeholder}
              value={tempText}
              onChange={handleChange}
              disabled={isDisabled}
              aria-describedby={errorMessage ? errorId : undefined}
              flex="auto"
              variant="ghost"
              $size=""
              minHeight={"2.25rem"}
              width="100%"
              {...fieldProps}
            />
          ) : (
            <Field
              autoFocus
              as={Textarea}
              ref={editRef}
              placeholder={placeholder}
              value={tempText}
              onChange={handleChange}
              disabled={isDisabled}
              aria-describedby={errorMessage ? errorId : undefined}
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
          {errorMessage && (
            <Text id={errorId} as="p" role="alert" color="error" mt="xs">
              {errorMessage}
            </Text>
          )}
        </Box>
      ) : (
        <Box
          minHeight={"auto"}
          border="1px solid transparent"
          minWidth="0"
          onClick={isDisabled ? undefined : handleEditClick}
          role={isDisabled ? undefined : "button"}
          tabIndex={isDisabled ? undefined : 0}
          onKeyDown={
            isDisabled
              ? undefined
              : (e: React.KeyboardEvent) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    handleEditClick()
                  }
                }
          }
          cursor={isDisabled ? "default" : "pointer"}
        >
          {readOnlyText ? (
            <Text style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>
              {readOnlyText}
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
