// components/FormInput.jsx
import React from "react";
import { getFieldClass } from "../utils/formHelpers";

/**
 * A reusable form input component with integrated validation states and accessibility features.
 * This component provides consistent form field behavior across the application, including
 * error handling, hint messages, and proper ARIA attributes for screen readers.
 * 
 * The component dynamically applies CSS classes based on validation state and supports
 * various input types while maintaining accessibility compliance.
 * 
 * @param {Object} props - Component properties
 * @param {string} props.label - Display label for the input field
 * @param {string} props.id - Unique identifier for the input element
 * @param {string} props.name - Name attribute for form submission
 * @param {string} props.type - Input type: 'text' | 'email' | 'password' | 'tel' | 'date' | etc.
 * @param {string} props.value - Current value of the input field
 * @param {Function} props.onChange - Change event handler
 * @param {Function} props.onBlur - Blur event handler
 * @param {boolean} props.required - Whether the field is required
 * @param {boolean} props.disabled - Whether the field is disabled
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.hint - Help text displayed below the input
 * @param {string} props.error - Error message to display
 * @param {boolean} props.submitted - Whether the form has been submitted
 * @param {string} props.autoComplete - HTML autocomplete attribute value
 * @param {Object} props.props - Additional HTML input attributes
 * @returns {JSX.Element} Rendered form input component with label and validation messaging
 */
export default function FormInput({
  label,
  id,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  required = false,
  disabled = false,
  placeholder,
  hint,
  error,
  submitted = false,
  autoComplete,
  ...props
}) {
  const inputClass = getFieldClass(name, value, submitted, { [name]: error });

  return (
    <div className="form-field">
      <label htmlFor={id} className="form-label">
        {label} {required && <span className="form-required" aria-hidden="true">*</span>}
      </label>
      
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={inputClass}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        aria-describedby={
          error ? `${id}-error` : hint ? `${id}-hint` : undefined
        }
        aria-invalid={error ? "true" : "false"}
        autoComplete={autoComplete}
        {...props}
      />

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