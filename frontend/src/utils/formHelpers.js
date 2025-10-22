// utils/formHelpers.js

import { filterInput } from './validators';

/**
 * Creates a standardized change handler function for form inputs
 * This higher-order function generates event handlers that manage form state updates,
 * input filtering, and error clearing in a consistent manner across the application.
 * 
 * The handler automatically filters input values based on field type and clears
 * relevant error states when users modify form fields.
 * 
 * @param {Function} setForm - State setter function for form data
 * @param {Function} setError - State setter function for global form errors
 * @param {Function} setFieldErrors - State setter function for field-specific errors
 * @returns {Function} Event handler function for form input changes
 */
export const createChangeHandler = (setForm, setError, setFieldErrors) => (e, fieldType = null) => {
  const { name, value } = e.target;
  
  let filteredValue = value;
  if (fieldType) {
    filteredValue = filterInput(value, fieldType);
  }

  setForm(prev => ({ ...prev, [name]: filteredValue }));
  
  // Clear error states on user input
  if (setError) setError("");
  if (setFieldErrors) {
    setFieldErrors(prev => ({ ...prev, [name]: '' }));
  }
};

/**
 * Determines appropriate CSS classes for form fields based on validation state
 * This function applies dynamic styling to form inputs to provide visual feedback
 * about field validation status (normal, error, or success states).
 * 
 * The function only applies validation styling after form submission to avoid
 * premature visual feedback during user input.
 * 
 * @param {string} fieldName - Name identifier of the form field
 * @param {string} value - Current value of the form field
 * @param {boolean} submitted - Whether the form has been submitted
 * @param {Object} fieldErrors - Object containing field-specific error messages
 * @returns {string} CSS class string for the form field
 */
export const getFieldClass = (fieldName, value, submitted, fieldErrors) => {
  if (!submitted) return "form-input";
  
  const error = fieldErrors[fieldName];
  if (error) {
    return "form-input form-input--error";
  }
  
  // Only show success state for fields with value and no errors
  if (value && !error) {
    return "form-input form-input--success";
  }
  
  return "form-input";
};