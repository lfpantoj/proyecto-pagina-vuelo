// src/components/FormSelect.jsx - CORREGIDO
import React from "react";

/**
 * A reusable form select component with integrated validation states and accessibility features.
 * This component provides consistent dropdown behavior across the application, including
 * error handling, hint messages, and proper ARIA attributes for screen readers.
 * 
 * @param {Object} props - Component properties
 * @param {string} props.label - Display label for the select field
 * @param {string} props.id - Unique identifier for the select element
 * @param {string} props.name - Name attribute for form submission
 * @param {string} props.value - Current value of the select field
 * @param {Function} props.onChange - Change event handler
 * @param {Function} props.onBlur - Blur event handler
 * @param {boolean} props.required - Whether the field is required
 * @param {boolean} props.disabled - Whether the field is disabled
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.hint - Help text displayed below the select
 * @param {string} props.error - Error message to display
 * @param {boolean} props.submitted - Whether the form has been submitted
 * @param {Array} props.options - Array of option objects with value and label
 * @param {Object} props.props - Additional HTML select attributes
 * @returns {JSX.Element} Rendered form select component with label and validation messaging
 */
export default function FormSelect({
  label,
  id,
  name,
  value,
  onChange,
  onBlur,
  required = false,
  disabled = false,
  placeholder,
  hint,
  error,
  submitted = false,
  options = [],
  ...props
}) {
  const selectClass = `form-select ${error && submitted ? 'form-input--error' : ''} ${value && !error ? 'form-input--success' : ''}`;

  return (
    <div className="form-field">
      <label htmlFor={id} className="form-label">
        {label} {required && <span className="form-required" aria-hidden="true">*</span>}
      </label>
      
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
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