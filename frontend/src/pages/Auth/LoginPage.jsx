// pages/Auth/LoginPage.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/Button";
import FormInput from "../../components/FormInput";
import { loginSchema } from "../../utils/validationSchemas";
import { useForm } from "../../hooks/useForm";

/**
 * Configuration array for login form fields
 * Defines the structure, validation, and presentation of each form field
 * 
 * @type {Array<Object>}
 * @property {string} name - Field identifier and form data key
 * @property {string} label - Display label for the field
 * @property {string} type - HTML input type
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
    name: "contrasena",
    label: "Contraseña",
    type: "password", 
    hint: "Mínimo 6 caracteres",
    autoComplete: "current-password",
    fieldType: "password"
  }
];

/**
 * Login page component that handles user authentication
 * Provides a form for users to enter credentials and access the application
 * Supports redirect functionality for seamless navigation after authentication
 * 
 * This component integrates with the authentication context for credential validation
 * and manages form state with comprehensive validation and error handling
 * 
 * @returns {JSX.Element} Rendered login page with authentication form
 */
export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  /**
   * Extracts redirect information from navigation state
   * Used when redirecting users back to their original destination after login
   */
  const { redirectTo, vuelo, message } = location.state || {};

  /**
   * Handles form submission and user authentication
   * Validates credentials and navigates to appropriate destination based on context
   * 
   * @param {Object} formData - Form data containing email and password
   * @throws {Error} When authentication fails with descriptive error message
   */
  const onSubmit = async (formData) => {
    const result = await login(formData.correo, formData.contrasena);
    
    if (result.success) {
      // Redirect to original destination or default to search page
      if (redirectTo) {
        navigate(redirectTo, { state: { vuelo } });
      } else {
        navigate("/buscar");
      }
    } else {
      throw new Error(result.error);
    }
  };

  /**
   * Form management hook providing state and handlers for login form
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
    { correo: "", contrasena: "" },
    loginSchema,
    onSubmit
  );

  return (
    <main className="page page--centered" aria-labelledby="login-title">
      <h1 id="login-title">Iniciar sesión</h1>

      {/* Contextual information message display */}
      {message && (
        <div className="form-info" style={{ 
          background: '#d1ecf1', 
          color: '#0c5460', 
          padding: '1rem', 
          borderRadius: '8px', 
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          {message}
        </div>
      )}

      <form 
        onSubmit={handleSubmit} 
        noValidate 
        className={`form-container ${loading ? 'form-loading' : ''}`}
        aria-describedby={error ? "login-error" : undefined}
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
          <div id="login-error" className="form-error" role="alert" aria-live="assertive">
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
            {loading ? 'Ingresando...' : 'Ingresar'}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/registro")}
            disabled={loading}
          >
            Crear cuenta
          </Button>
        </div>
      </form>
    </main>
  );
}