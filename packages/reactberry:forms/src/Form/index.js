import React from 'react';
import {useForm} from 'react-form';

function Form({
  children,
  defaultValues,
  onSubmit = async () => null,
  validate = async () => null
}) {
  const {Form: FormComponent} = useForm({
    defaultValues,
    onSubmit,
    validate
  });

  return <FormComponent>{children}</FormComponent>;
}

export default Form;
