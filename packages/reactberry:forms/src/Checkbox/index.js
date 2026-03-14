import {Box, Text} from '@reactberry/core'
import React, {createContext, useCallback, useContext, useMemo, useState} from 'react'
import styled from 'styled-components'

import {FieldContext} from '../Field/context'

const CheckboxGroupContext = createContext(null)

function normalizeValues(value) {
  if (Array.isArray(value)) {
    return value.filter(item => item !== null && typeof item !== 'undefined')
  }

  if (value === null || typeof value === 'undefined' || value === '') {
    return []
  }

  return [value]
}

function sanitizeValue(value) {
  return String(value).replace(/[^a-zA-Z0-9_-]+/g, '-')
}

function createSyntheticEvent(event, name, value) {
  const target = event && event.target ? event.target : {}

  return {
    ...event,
    target: {
      ...target,
      name,
      type: 'checkbox-group',
      value
    },
    currentTarget: {
      ...target,
      name,
      type: 'checkbox-group',
      value
    }
  }
}

const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;

  &:focus + span {
    box-shadow: 0 0 0 3px ${props => props.theme.colors.focus.ring};
  }
`

const Indicator = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  margin-top: 0.125rem;
  flex: none;
  border: 1px solid
    ${({theme, $checked, $invalid}) => {
      if ($invalid) {
        return theme.colors.danger
      }

      return $checked ? theme.colors.action : theme.colors.border.default
    }};
  border-radius: ${({theme}) => theme.radii.small};
  background-color: ${({theme, $checked, $disabled}) => {
    if ($disabled) {
      return theme.colors.surface.subtle
    }

    return $checked ? theme.colors.action : theme.colors.surface.default
  }};
  transition: border-color 0.125s ease-out, box-shadow 0.125s ease-out,
    background-color 0.125s ease-out;

  &:after {
    content: '';
    width: 0.25rem;
    height: 0.5rem;
    margin-top: -0.0625rem;
    border: solid
      ${({theme, $disabled}) =>
        $disabled ? theme.colors.text.muted : theme.colors.surface.default};
    border-width: 0 2px 2px 0;
    opacity: ${({$checked}) => ($checked ? 1 : 0)};
    transform: rotate(45deg) scale(${({$checked}) => ($checked ? 1 : 0.75)});
    transition: opacity 0.125s ease-out, transform 0.125s ease-out;
  }
`

export const StyledLabel = styled.label`
  position: relative;
  display: inline-flex;
  align-items: flex-start;
  width: 100%;
  color: ${({theme, $disabled}) =>
    $disabled ? theme.colors.text.muted : theme.colors.text.default};
  cursor: ${({$disabled}) => ($disabled ? 'not-allowed' : 'pointer')};
  margin-bottom: 0.5rem;

  &:last-child {
    margin-bottom: 0;
  }

  & > * + * {
    margin-left: 0.5rem;
  }
`

const LabelText = styled(Text).attrs({as: 'span'})`
  line-height: ${({theme}) => theme.lineHeights.body || 1.5};
`

export const CheckboxGroup = React.forwardRef(
  (
    {
      children,
      name,
      onChange = () => null,
      onBlur,
      value,
      defaultValue = [],
      disabled = false,
      required = false,
      id,
      width = '100%',
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
      'aria-busy': ariaBusy,
      'data-invalid': dataInvalid,
      'data-validating': dataValidating,
      ...rest
    },
    ref
  ) => {
    const field = useContext(FieldContext)
    const [internalValue, setInternalValue] = useState(() => normalizeValues(defaultValue))
    const isControlled = typeof value !== 'undefined'
    const selectedValues = useMemo(
      () => normalizeValues(isControlled ? value : internalValue),
      [internalValue, isControlled, value]
    )
    const resolvedName = name || (field ? field.field : undefined)
    const resolvedId = id || (field ? field.controlId : undefined)
    const resolvedDisabled = disabled || Boolean(field && field.disabled)
    const resolvedRequired = required || Boolean(field && field.required)
    const isInvalid = ariaInvalid === 'true' || dataInvalid === 'true'

    const handleItemChange = useCallback(
      (event, optionValue) => {
        const nextValue = event.target.checked
          ? [...new Set([...selectedValues, optionValue])]
          : selectedValues.filter(item => item !== optionValue)

        if (!isControlled) {
          setInternalValue(nextValue)
        }

        onChange(createSyntheticEvent(event, resolvedName, nextValue), nextValue)
      },
      [isControlled, onChange, resolvedName, selectedValues]
    )

    const contextValue = useMemo(
      () => ({
        disabled: resolvedDisabled,
        groupId: resolvedId,
        isInvalid,
        name: resolvedName,
        onBlur,
        onItemChange: handleItemChange,
        required: resolvedRequired,
        values: selectedValues
      }),
      [handleItemChange, isInvalid, onBlur, resolvedDisabled, resolvedId, resolvedName, resolvedRequired, selectedValues]
    )

    return (
      <CheckboxGroupContext.Provider value={contextValue}>
        <Box
          as="div"
          ref={ref}
          id={resolvedId}
          role="group"
          width={width}
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          aria-label={ariaLabel || (field ? field.label : undefined)}
          aria-describedby={ariaDescribedBy}
          aria-invalid={ariaInvalid}
          aria-busy={ariaBusy}
          data-invalid={dataInvalid}
          data-validating={dataValidating}
          {...rest}
        >
          {children}
        </Box>
      </CheckboxGroupContext.Provider>
    )
  }
)

CheckboxGroup.displayName = 'CheckboxGroup'

const CheckboxButton = React.forwardRef(
  ({children, label, value = 'on', checked, disabled = false, onChange, onBlur, id, ...rest}, ref) => {
    const group = useContext(CheckboxGroupContext)
    const labelContent = children || label
    const isGrouped = Boolean(group)
    const isInvalid =
      (group && group.isInvalid) || rest['aria-invalid'] === 'true' || rest['data-invalid'] === 'true'
    const resolvedChecked = isGrouped ? group.values.includes(value) : checked
    const resolvedDisabled = disabled || Boolean(group && group.disabled)
    const resolvedId = id || (group && group.groupId ? `${group.groupId}-${sanitizeValue(value)}` : undefined)
    const resolvedName = (group && group.name) || rest.name

    const handleChange = useCallback(
      event => {
        if (group) {
          group.onItemChange(event, value)
          return
        }

        if (onChange) {
          onChange(event)
        }
      },
      [group, onChange, value]
    )

    const handleBlur = useCallback(
      event => {
        if (group && group.onBlur) {
          group.onBlur(event)
        }

        if (onBlur) {
          onBlur(event)
        }
      },
      [group, onBlur]
    )

    const inputProps = {
      ...rest,
      checked: typeof resolvedChecked !== 'undefined' ? resolvedChecked : undefined,
      disabled: resolvedDisabled,
      id: resolvedId,
      name: resolvedName,
      onBlur: handleBlur,
      onChange: handleChange,
      ref,
      required: group ? group.required : rest.required,
      type: 'checkbox',
      value
    }

    return (
      <StyledLabel $disabled={resolvedDisabled}>
        <HiddenCheckbox {...inputProps} />
        <Indicator aria-hidden="true" $checked={Boolean(resolvedChecked)} $disabled={resolvedDisabled} $invalid={isInvalid} />
        {labelContent && (
          <LabelText color="inherit" fontSize="medium">
            {labelContent}
          </LabelText>
        )}
      </StyledLabel>
    )
  }
)

CheckboxButton.displayName = 'CheckboxButton'

export default CheckboxButton
