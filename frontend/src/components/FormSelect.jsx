// src/components/FormSelect.jsx
import React from "react";

export default function FormSelect({
  label,
  id,
  name,
  value,
  onChange,
  required = false,
  disabled = false,
  placeholder,
  hint,
  error,
  options = [],
  ...props
}) {
  const selectClass = `form-select ${error ? 'form-input--error' : ''}`;

  return (
    <div className="form-field">
      <label htmlFor={id} className="form-label">
        {label} {required && <span className="form-required">*</span>}
      </label>
      
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={selectClass}
        required={required}
        disabled={disabled}
        aria-describedby={
          error ? `${id}-error` : hint ? `${id}-hint` : undefined
        }
        aria-invalid={error ? "true" : "false"}
        {...props}
      >
        {placeholder && (
          <option value="">{placeholder}</option>
        )}
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {hint && !error && (
        <span id={`${id}-hint`} className="form-hint">
          {hint}
        </span>
      )}

      {error && (
        <span id={`${id}-error`} className="form-field-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}