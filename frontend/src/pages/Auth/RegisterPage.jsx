// pages/Auth/RegisterPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import FormInput from "../../components/FormInput";
import { registerSchema, REGISTER_FIELDS } from "../../utils/validationSchemas";
import { useForm } from "../../hooks/useForm";

export default function RegisterPage() {
  const navigate = useNavigate();
  
  const onSubmit = async (formData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Registro exitoso:", formData);
    navigate("/login");
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
        {REGISTER_FIELDS.map(field => (
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

