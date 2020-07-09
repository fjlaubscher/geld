import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { FaFile } from 'react-icons/fa';

const FileUpload = ({
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
      <div className="file">
        <label className="file-label">
          <input
            {...input}
            {...props}
            className="file-input"
            type="file"
            name="resume"
          />
          <span className="file-cta">
            <span className="file-icon">
              <FaFile />
            </span>
            <span className="file-label">Choose a file…</span>
          </span>
        </label>
      </div>
    </div>
    {meta.touched && meta.error && (
      <p className="help is-danger">{meta.error}</p>
    )}
  </div>
);

export default FileUpload;
