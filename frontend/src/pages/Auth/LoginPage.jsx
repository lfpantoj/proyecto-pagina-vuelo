// pages/Auth/LoginPage.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/Button";
import FormInput from "../../components/FormInput";
import { loginSchema, LOGIN_FIELDS } from "../../utils/validationSchemas";
import { useForm } from "../../hooks/useForm";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const { redirectTo, vuelo, message } = location.state || {};

  const onSubmit = async (formData) => {
    const result = await login(formData.correo, formData.contrasena);
    
    if (result.success) {
      if (redirectTo) {
        navigate(redirectTo, { state: { vuelo } });
      } else {
        navigate("/buscar");
      }
    } else {
      throw new Error(result.error);
    }
  };

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

      {message && (
        <div className="form-info">
          {message}
        </div>
      )}

      <form 
        onSubmit={handleSubmit} 
        noValidate 
        className={`form-container ${loading ? 'form-loading' : ''}`}
        aria-describedby={error ? "login-error" : undefined}
      >
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

        {error && (
          <div id="login-error" className="form-error" role="alert">
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