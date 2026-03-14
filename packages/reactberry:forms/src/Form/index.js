import React, {useMemo} from 'react';
import {useForm} from 'react-form';

import {FormContext} from './context';

function Form({
  children,
  defaultValues = {},
  onSubmit = async () => null,
  validate,
  debugForm,
  ...rest
}) {
  const form = useForm({
    defaultValues,
    onSubmit,
    validate,
    debugForm
  });

  const {Form: FormComponent, meta, values} = form;

  const contextValue = useMemo(
    () => ({
      form,
      meta,
      values,
      reset: form.reset,
      setValues: form.setValues,
      submit: form.handleSubmit
    }),
    [form, meta, values]
  );

  const content = typeof children === 'function' ? children(contextValue) : children;

  return (
    <FormContext.Provider value={contextValue}>
      <FormComponent {...rest}>{content}</FormComponent>
    </FormContext.Provider>
  );
}

export {FormContext, useReactberryFormContext} from './context';
export default Form;
