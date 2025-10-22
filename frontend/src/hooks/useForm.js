// hooks/useForm.js
import { useState } from "react";
import { validateForm } from "../utils/validationSchemas";
import { createChangeHandler } from "../utils/formHelpers";

/**
 * Custom React hook for managing form state, validation, and submission.
 * This hook provides a comprehensive form management solution including
 * state handling, validation, error management, and submission lifecycle.
 * 
 * The hook integrates with validation schemas and form helpers to create
 * a consistent form handling pattern across the application.
 * 
 * @param {Object} initialState - Initial form state values
 * @param {Object} schema - Validation schema object for form validation
 * @param {Function} onSubmitCallback - Async callback function to execute on form submission
 * @returns {Object} Form management utilities and state
 * @returns {Object} return.form - Current form state values
 * @returns {string} return.error - Global form error message
 * @returns {boolean} return.loading - Form submission loading state
 * @returns {boolean} return.submitted - Whether form has been submitted
 * @returns {Object} return.fieldErrors - Validation errors per field
 * @returns {Function} return.handleChange - Change handler for form inputs
 * @returns {Function} return.handleSubmit - Submission handler for forms
 * @returns {Function} return.resetForm - Function to reset form to initial state
 * @returns {Function} return.setForm - Function to manually set form state
 * @returns {Function} return.setError - Function to manually set error state
 */
export const useForm = (initialState, schema, onSubmitCallback) => {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  /**
   * Handles form input changes with integrated error clearing
   * Uses the createChangeHandler utility for consistent behavior
   */
  const handleChange = createChangeHandler(setForm, setError, setFieldErrors);

  /**
   * Handles form submission with validation and error management
   * Validates form against provided schema, manages loading states,
   * and executes the submission callback upon successful validation
   * 
   * @param {Event} e - Form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    
    const { errors, isValid } = validateForm(form, schema);
    setFieldErrors(errors);
    
    if (!isValid) {
      setError("Por favor corrige los errores en el formulario.");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      await onSubmitCallback(form);
    } catch (err) {
      setError(err.message || "Error al procesar la solicitud");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Resets the form to its initial state
   * Clears all form values, errors, loading states, and submission flags
   */
  const resetForm = () => {
    setForm(initialState);
    setError("");
    setLoading(false);
    setSubmitted(false);
    setFieldErrors({});
  };

  return {
    form,
    error,
    loading,
    submitted,
    fieldErrors,
    handleChange,
    handleSubmit,
    resetForm,
    setForm,
    setError
  };
};