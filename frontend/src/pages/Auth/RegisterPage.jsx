// pages/Auth/RegisterPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import FormInput from "../../components/FormInput";
import { registerSchema, REGISTER_FIELDS } from "../../utils/validationSchemas";
import { useForm } from "../../hooks/useForm";

/**
 * Página de registro de nuevos usuarios
 * Maneja el proceso de creación de cuentas con validación de formularios
 */
export default function RegisterPage() {
  const navigate = useNavigate();
  
  // Función que maneja el envío del formulario de registro
  const onSubmit = async (formData) => {
    // Simula delay de red para procesar registro
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Registro exitoso:", formData);
    // Redirige a página de login tras registro exitoso
    navigate("/login");
  };

  // Hook personalizado para manejo de estado y validación del formulario
  const {
    form,           // Estado actual del formulario
    error,          // Error general del formulario
    loading,        // Estado de carga durante envío
    submitted,      // Indica si el formulario fue enviado
    fieldErrors,    // Errores específicos por campo
    handleChange,   // Manejador de cambios en inputs
    handleSubmit    // Manejador de envío del formulario
  } = useForm(
    { 
      correo: "", 
      confirmarCorreo: "", 
      contrasena: "", 
      confirmarContrasena: "" 
    },
    registerSchema,  // Esquema de validación para registro
    onSubmit         // Callback ejecutado al enviar formulario
  );

  return (
    <main className="page page--centered" aria-labelledby="register-title">
      <h1 id="register-title">Crear cuenta</h1>

      <form 
        onSubmit={handleSubmit} 
        noValidate 
        // Aplica clase de loading cuando el formulario está procesando
        className={`form-container ${loading ? 'form-loading' : ''}`}
      >
        {/* Renderiza dinámicamente los campos del formulario de registro */}
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
            // Muestra error solo después de intento de envío
            error={submitted ? fieldErrors[field.name] : undefined}
            autoComplete={field.autoComplete}
            disabled={loading}
          />
        ))}

        {/* Muestra error general del formulario si existe */}
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
