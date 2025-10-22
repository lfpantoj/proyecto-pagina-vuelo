// pages/Auth/RegisterPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import FormInput from "../../components/FormInput";
import { registerSchema } from "../../utils/validationSchemas";
import { useForm } from "../../hooks/useForm";

/**
 * Configuration array for user registration form fields
 * Defines the structure, validation rules, and presentation properties
 * for each field in the registration form
 * 
 * @type {Array<Object>}
 * @property {string} name - Field identifier and form data key
 * @property {string} label - Display label for the field
 * @property {string} type - HTML input type (email, password)
 * @property {string} hint - Help text displayed below the field
 * @property {string} autoComplete - HTML autocomplete attribute value
 * @property {string} fieldType - Validation and filtering type for input handling
 */
const FORM_FIELDS = [
  {
    name: "correo",
    label: "Correo electrónico",
    type: "email",
    hint: "Ingresa tu correo electrónico",
    autoComplete: "email",
    fieldType: "email"
  },
  {
    name: "confirmarCorreo", 
    label: "Confirmar correo electrónico",
    type: "email",
    hint: "Repite tu correo electrónico",
    autoComplete: "email",
    fieldType: "email"
  },
  {
    name: "contrasena",
    label: "Contraseña", 
    type: "password",
    hint: "Mínimo 6 caracteres",
    autoComplete: "new-password",
    fieldType: "password"
  },
  {
    name: "confirmarContrasena",
    label: "Confirmar contraseña",
    type: "password", 
    hint: "Repite tu contraseña",
    autoComplete: "new-password",
    fieldType: "password"
  }
];

/**
 * User registration page component that handles new account creation
 * Provides a form for users to register with email and password credentials
 * Includes confirmation fields for email and password to ensure data accuracy
 * 
 * This component implements comprehensive form validation and provides
 * user feedback during the registration process
 * 
 * @returns {JSX.Element} Rendered registration page with account creation form
 */
export default function RegisterPage() {
  const navigate = useNavigate();
  
  /**
   * Handles form submission and user registration process
   * Processes registration data and navigates to login page upon success
   * 
   * @param {Object} formData - Form data containing email and password information
   */
  const onSubmit = async (formData) => {
    // Simulate registration API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Registro exitoso:", formData);
    navigate("/login");
  };

  /**
   * Form management hook providing state and handlers for registration form
   * Manages form data, validation errors, loading states, and submission handling
   */
  const {
    form,
    error,
    loading,
    submitted,
    fieldErrors,
    handleChange,
    handleSubmit
  } = useForm(
    { 
      correo: "", 
      confirmarCorreo: "", 
      contrasena: "", 
      confirmarContrasena: "" 
    },
    registerSchema,
    onSubmit
  );

  return (
    <main className="page page--centered" aria-labelledby="register-title">
      <h1 id="register-title">Crear cuenta</h1>

      <form 
        onSubmit={handleSubmit} 
        noValidate 
        className={`form-container ${loading ? 'form-loading' : ''}`}
      >
        {FORM_FIELDS.map(field => (
          <FormInput
            key={field.name}
            label={field.label}
            id={field.name}
            name={field.name}
            type={field.type}
            value={form[field.name]}
            onChange={(e) => handleChange(e, field.fieldType)}
            required
            hint={field.hint}
            error={submitted ? fieldErrors[field.name] : undefined}
            submitted={submitted}
            autoComplete={field.autoComplete}
            disabled={loading}
          />
        ))}

        {error && (
          <div className="form-error" role="alert">
            {error}
          </div>
        )}

        <div className="form-actions">
          <Button 
            type="submit" 
            variant="primary" 
            loading={loading} 
            disabled={loading}
          >
            {loading ? 'Registrando...' : 'Registrar'}
          </Button>
          <Button 
            type="button" 
            variant="secondary" 
            onClick={() => navigate("/login")}
            disabled={loading}
          >
            Ya tengo cuenta
          </Button>
        </div>
      </form>
    </main>
  );
}