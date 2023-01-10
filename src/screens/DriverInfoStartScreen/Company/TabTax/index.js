import React from 'react';
import {TabTax} from './view';

export default function ({
  values,
  touched,
  errors,
  handleChange,
  setFieldValue,
  checkRequiredField,
}) {
  return (
    <TabTax
      values={values}
      touched={touched}
      errors={errors}
      handleChange={handleChange}
      setFieldValue={setFieldValue}
      checkRequiredField={checkRequiredField}
    />
  );
}
