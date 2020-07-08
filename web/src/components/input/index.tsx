import React from 'react';
import { FieldRenderProps } from 'react-final-form';

const Input = ({
  input,
  meta,
  label: labelText,
  ...props
}: FieldRenderProps<string>) => (
  <div className="field">
    <label className="label" htmlFor={input.name}>
      {labelText}
    </label>
    <div className="control">
      <input
        className={`input ${meta.touched && meta.error && 'is-danger'}`}
        {...input}
        {...props}
      />
    </div>
    {meta.touched && meta.error && (
      <p className="help is-danger">{meta.error}</p>
    )}
  </div>
);

export default Input;
