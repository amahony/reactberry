import {Box, Text} from '@reactberry/core'
import React, {createContext, useCallback, useContext, useMemo, useState} from 'react'
import styled from 'styled-components'

import {FieldContext} from '../Field/context'

const RadioGroupContext = createContext(null)

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
      type: 'radio',
      value
    },
    currentTarget: {
      ...target,
      name,
      type: 'radio',
      value
    }
  }
}

const HiddenRadio = styled.input`
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
  border-radius: ${({theme}) => theme.radii.circle};
  background-color: ${({theme, $disabled}) =>
    $disabled ? theme.colors.surface.subtle : theme.colors.surface.default};
  transition: border-color 0.125s ease-out, box-shadow 0.125s ease-out,
    background-color 0.125s ease-out;

  &:after {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: ${({theme}) => theme.radii.circle};
    background-color: ${({theme, $disabled}) =>
      $disabled ? theme.colors.text.muted : theme.colors.action};
    opacity: ${({$checked}) => ($checked ? 1 : 0)};
    transform: scale(${({$checked}) => ($checked ? 1 : 0.65)});
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

export const RadioGroup = React.forwardRef(
  (
    {
      children,
      name,
      onChange = () => null,
      onBlur,
      value,
      defaultValue,
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
    const [internalValue, setInternalValue] = useState(defaultValue)
    const isControlled = typeof value !== 'undefined'
    const selectedValue = isControlled ? value : internalValue
    const resolvedName = name || (field ? field.field : undefined)
    const resolvedId = id || (field ? field.controlId : undefined)
    const resolvedDisabled = disabled || Boolean(field && field.disabled)
    const resolvedRequired = required || Boolean(field && field.required)
    const isInvalid = ariaInvalid === 'true' || dataInvalid === 'true'

    const handleItemChange = useCallback(
      (event, optionValue) => {
        if (!isControlled) {
          setInternalValue(optionValue)
        }

        onChange(createSyntheticEvent(event, resolvedName, optionValue), optionValue)
      },
      [isControlled, onChange, resolvedName]
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
        value: selectedValue
      }),
      [handleItemChange, isInvalid, onBlur, resolvedDisabled, resolvedId, resolvedName, resolvedRequired, selectedValue]
    )

    return (
      <RadioGroupContext.Provider value={contextValue}>
        <Box
          as="div"
          ref={ref}
          id={resolvedId}
          role="radiogroup"
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
      </RadioGroupContext.Provider>
    )
  }
)

RadioGroup.displayName = 'RadioGroup'

export const RadioButton = React.forwardRef(
  ({children, label, value = 'on', checked, disabled = false, onChange, onBlur, id, ...rest}, ref) => {
    const group = useContext(RadioGroupContext)
    const labelContent = children || label
    const isInvalid =
      (group && group.isInvalid) || rest['aria-invalid'] === 'true' || rest['data-invalid'] === 'true'
    const resolvedChecked = group ? group.value === value : checked
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
      type: 'radio',
      value
    }

    return (
      <StyledLabel $disabled={resolvedDisabled}>
        <HiddenRadio {...inputProps} />
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

RadioButton.displayName = 'RadioButton'
