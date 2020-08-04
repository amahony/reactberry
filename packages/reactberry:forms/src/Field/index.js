import {Box, Text} from '@reactberry/core';
import {useField} from 'react-form';
import React, {useCallback, useMemo, cloneElement} from 'react';
import isValid from './validation';

function handleError(_error, field, err) {
  if (_error === false) {
    return err.filter(str => str !== field);
  }

  return [...new Set([...err, field])];
}

function setValidation(v, validation, field, err, setError) {
  const _error = isValid(validation, v);
  if (_error !== err) {
    const _result = handleError(_error, field, err);
    setError(_result);
  }

  return _error;
}

function Field({
  field,
  label = '',
  placeholder,
  checked,
  value: customValue,
  validation = {},
  required,
  Component,
  onChange: customOnChange,
  err = [],
  setError = () => null
}) {
  const {
    meta: {error, isTouched, isValidating},
    getInputProps
  } = useField(field, {
    validate: v =>
      required ? setValidation(v, validation, field, err, setError) : null
  });

  const {value, onChange, onBlur} = getInputProps();

  const _onChange = useCallback(
    e => {
      const _type = e.target.type;
      const _event =
        _type === 'checkbox' || _type === 'radio'
          ? {...e, target: {value: e.target.checked}}
          : e;
      if (customOnChange) {
        customOnChange(_event);
      }

      onChange(_event);
    },
    [customOnChange, onChange]
  );

  const _locVal = useMemo(() => {
    if (customValue) {
      return customValue;
    }

    if (value) {
      return value;
    }

    return '';
  }, [customValue, value]);

  const _props = useMemo(() => {
    return {
      value: _locVal,
      checked,
      placeholder,
      onChange: _onChange,
      onBlur
    };
  }, [_locVal, _onChange, checked, onBlur, placeholder]);

  const _Component = useMemo(() => {
    if (typeof Component === 'function') {
      return <Component {..._props} />;
    }

    return cloneElement(Component, _props);
  }, [Component, _props]);

  return (
    <>
      <Box display="flex" flexDirection="column">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb="xsmall"
        >
          <Text fontWeight="700">{label}</Text>
          {required && (
            <Text
              fontWeight="700"
              color={required && isTouched && error ? 'danger' : 'tertiary'}
              fontSize="xsmall"
            >
              * required
            </Text>
          )}
        </Box>
        {_Component}
      </Box>
      <Box minHeight="2rem" display="flex" alignItems="center">
        {isTouched && (
          <Text fontSize="xsmall" color="danger" mt="xxsmall">
            {error}
          </Text>
        )}
        {isValidating && (
          <Text fontSize="xsmall" color="info" mt="xxsmall">
            please wait...
          </Text>
        )}
      </Box>
    </>
  );
}

Field.defaultProps = {
  width: '100%'
};

export default Field;
