import {Box, Text} from '@reactberry/core';
import {useField} from 'react-form';
import React, {cloneElement, isValidElement, useCallback, useEffect, useMemo, useRef} from 'react';

import {FieldContext} from './context';
import isValid from './validation';

let fieldIdCounter = 0;

function createFieldId(field) {
  fieldIdCounter += 1;
  return `${String(field || 'field').replace(/[^a-zA-Z0-9_-]+/g, '-')}-${fieldIdCounter}`;
}

function getChangedValue(event, fallbackValue) {
  if (!event || !event.target) {
    return fallbackValue;
  }

  const {checked, multiple, options, type, value} = event.target;

  if (multiple && options) {
    return Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);
  }

  if (type === 'checkbox') {
    return checked;
  }

  return typeof value === 'undefined' ? fallbackValue : value;
}

function Field({
  field,
  label,
  description,
  placeholder,
  checked: checkedProp,
  value: customValue,
  validation,
  validate,
  required,
  Component,
  children,
  onChange: customOnChange,
  onBlur: customOnBlur,
  err = [],
  setError = () => null,
  id,
  width = '100%',
  hideLabel = false,
  disabled = false,
  defaultValue,
  defaultIsTouched,
  defaultError,
  defaultMeta,
  validatePristine,
  filterValue,
  formContext,
  ...rest
}) {
  const fallbackIdRef = useRef(id || createFieldId(field));
  const controlId = id || fallbackIdRef.current;
  const descriptionId = description ? `${controlId}-description` : undefined;
  const messageId = `${controlId}-message`;

  const validateField = useCallback(
    (value, fieldApi) => {
      const validations = [];

      if (required) {
        validations.push({required});
      }

      if (validation) {
        validations.push(validation);
      }

      if (validate) {
        validations.push(validate);
      }

      return isValid(validations, value, fieldApi);
    },
    [required, validate, validation]
  );

  const {
    value,
    meta: {error, isTouched, isValidating},
    setMeta,
    setValue,
    form
  } = useField(field, {
    defaultValue,
    defaultIsTouched,
    defaultError,
    defaultMeta,
    validatePristine,
    filterValue,
    formContext,
    validate: required || validation || validate ? validateField : undefined
  });

  useEffect(() => {
    if (!Array.isArray(err) || typeof setError !== 'function') {
      return;
    }

    const nextErrors = error ? [...new Set([...err, field])] : err.filter(item => item !== field);

    if (
      nextErrors.length !== err.length ||
      nextErrors.some((item, index) => item !== err[index])
    ) {
      setError(nextErrors);
    }
  }, [err, error, field, setError]);

  const onChange = useCallback(
    event => {
      const nextValue = getChangedValue(event, customValue);
      setValue(nextValue);

      if (customOnChange) {
        customOnChange(event, nextValue);
      }
    },
    [customOnChange, customValue, setValue]
  );

  const onBlur = useCallback(
    event => {
      setMeta({isTouched: true});

      if (customOnBlur) {
        customOnBlur(event);
      }
    },
    [customOnBlur, setMeta]
  );

  const resolvedValue = useMemo(() => {
    if (typeof customValue !== 'undefined') {
      return customValue;
    }

    if (typeof value === 'undefined' || value === null) {
      return '';
    }

    return value;
  }, [customValue, value]);

  const resolvedChecked = useMemo(() => {
    if (typeof checkedProp !== 'undefined') {
      return checkedProp;
    }

    return typeof resolvedValue === 'boolean' ? resolvedValue : undefined;
  }, [checkedProp, resolvedValue]);

  const message = isTouched && error ? error : null;
  const isInvalid = Boolean(message);

  const describedBy = useMemo(
    () => [descriptionId, message ? messageId : null].filter(Boolean).join(' ') || undefined,
    [descriptionId, message, messageId]
  );

  const controlProps = useMemo(() => {
    const props = {
      ...rest,
      id: controlId,
      name: field,
      width,
      placeholder,
      disabled,
      required: Boolean(required),
      onChange,
      onBlur,
      'aria-busy': isValidating ? 'true' : undefined,
      'aria-describedby': describedBy,
      'aria-invalid': isInvalid ? 'true' : undefined,
      'data-invalid': isInvalid ? 'true' : undefined,
      'data-validating': isValidating ? 'true' : undefined
    };

    if (hideLabel && label && !props['aria-label']) {
      props['aria-label'] = label;
    }

    if (typeof resolvedChecked !== 'undefined') {
      props.checked = resolvedChecked;
    }

    if (typeof resolvedChecked === 'undefined' || typeof customValue !== 'undefined') {
      props.value = resolvedValue;
    }

    return props;
  }, [
    controlId,
    customValue,
    describedBy,
    disabled,
    field,
    hideLabel,
    isInvalid,
    isValidating,
    label,
    onBlur,
    onChange,
    placeholder,
    required,
    resolvedChecked,
    resolvedValue,
    rest,
    width
  ]);

  const fieldState = useMemo(
    () => ({
      field,
      form,
      label,
      description,
      required: Boolean(required),
      disabled,
      value: resolvedValue,
      checked: resolvedChecked,
      meta: {error, isTouched, isValidating},
      isInvalid,
      message,
      controlId,
      descriptionId,
      messageId,
      controlProps
    }),
    [
      controlId,
      controlProps,
      description,
      descriptionId,
      disabled,
      error,
      field,
      form,
      isInvalid,
      isTouched,
      isValidating,
      label,
      message,
      messageId,
      required,
      resolvedChecked,
      resolvedValue
    ]
  );

  const renderedControl = useMemo(() => {
    if (typeof children === 'function') {
      return children(fieldState);
    }

    if (Component) {
      if (isValidElement(Component)) {
        return cloneElement(Component, {...Component.props, ...controlProps});
      }

      return React.createElement(Component, controlProps);
    }

    if (isValidElement(children)) {
      return cloneElement(children, {...children.props, ...controlProps});
    }

    return children || null;
  }, [children, Component, controlProps, fieldState]);

  return (
    <FieldContext.Provider value={fieldState}>
      <Box display="flex" flexDirection="column" width={width} mb="small">
        {(label || description || required) && (
          <Box as="label" htmlFor={controlId} display="flex" flexDirection="column" pb="xsmall">
            {!hideLabel && label && <Text fontWeight="700">{label}</Text>}
            {description && (
              <Text id={descriptionId} fontSize="xsmall" color="text.subtle" mt="xxsmall">
                {description}
              </Text>
            )}
            {required && (
              <Text
                fontWeight="600"
                color={isInvalid ? 'danger' : 'text.subtle'}
                fontSize="xsmall"
                mt={label || description ? 'xxsmall' : 0}
              >
                Required
              </Text>
            )}
          </Box>
        )}
        {renderedControl}
        <Box minHeight="1.5rem" display="flex" alignItems="center" pt="xxsmall">
          {isValidating ? (
            <Text id={messageId} fontSize="xsmall" color="text.subtle">
              Validating…
            </Text>
          ) : message ? (
            <Text id={messageId} fontSize="xsmall" color="danger">
              {message}
            </Text>
          ) : null}
        </Box>
      </Box>
    </FieldContext.Provider>
  );
}

export {FieldContext, useFieldContext} from './context';
export default Field;
