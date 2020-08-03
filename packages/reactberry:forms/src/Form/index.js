import React from 'react';
import { useForm } from 'react-form';

function Form({
  children,
  defaultValue = {},
  onSubmit = async () => null,
  validate = async () => null
}) {
  const { Form: FormComponent } = useForm({
    defaultValue,
    onSubmit,
    validate
  });

  return <FormComponent>{children}</FormComponent>;
}

export default Form;
