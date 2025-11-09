// pages/Auth/LoginPage.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/Button";
import FormInput from "../../components/FormInput";
import { loginSchema, LOGIN_FIELDS } from "../../utils/validationSchemas";
import { useForm } from "../../hooks/useForm";

/**
 * Página de inicio de sesión que maneja la autenticación de usuarios
 * Incluye validación de formularios y redirección post-login
 */
export default function LoginPage() {
  // Hooks de navegación y ubicación para redirección
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  // Extrae parámetros de redirección del estado de ubicación
  const { redirectTo, vuelo, message } = location.state || {};

  /**
   * Maneja el envío del formulario de login
   * Realiza la autenticación y redirige según el resultado
   */
  const onSubmit = async (formData) => {
    const result = await login(formData.correo, formData.contrasena);
    
    if (result.success) {
      // Redirige a la página destino o a búsqueda por defecto
      if (redirectTo) {
        navigate(redirectTo, { state: { vuelo } });
      } else {
        navigate("/buscar");
      }
    } else {
      // Propaga el error para manejo en useForm
      throw new Error(result.error);
    }
  };

  // Hook personalizado para manejo de formulario con validación
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

      {/* Muestra mensaje informativo si existe */}
      {message && (
        <div className="form-info">
          {message}
        </div>
      )}

      {/* Formulario de login con estados de carga y accesibilidad */}
      <form 
        onSubmit={handleSubmit} 
        noValidate 
        className={`form-container ${loading ? 'form-loading' : ''}`}
        aria-describedby={error ? "login-error" : undefined}
      >
        {/* Renderiza dinámicamente los campos del formulario */}
        {LOGIN_FIELDS.map(field => (
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
            autoComplete={field.autoComplete}
            disabled={loading}
          />
        ))}

        {/* Muestra error general del formulario */}
        {error && (
          <div id="login-error" className="form-error" role="alert">
            {error}
          </div>
        )}

        {/* Acciones del formulario */}
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
