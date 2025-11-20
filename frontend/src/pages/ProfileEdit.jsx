// src/pages/ProfileEdit.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import FormSelect from "../components/FormSelect";
import { 
  profileSchema, 
  PROFILE_FIELD_GROUPS, 
  getProfileInitialState 
} from "../utils/validationSchemas";
import { useForm } from "../hooks/useForm";

/**
 * Componente para editar o crear perfiles de usuario
 * Maneja tanto la edición de perfiles existentes como la creación de nuevos
 */
export default function ProfileEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, updateProfile } = useAuth();
  
  // Extrae parámetros de navegación para determinar el contexto
  const { 
    pasajero: pasajeroInicial, 
    returnTo, 
    fromConfirmation, 
    message,
    requireCompleteProfile,
    vuelo 
  } = location.state || {};

  /**
   * Maneja el envío del formulario de perfil
   * Actualiza el perfil y redirige según el contexto
   */
  const onSubmit = async (formData) => {
    // Simula delay de procesamiento
    await new Promise(resolve => setTimeout(resolve, 1500));

    const userData = {
        ...formData,
        username: user.username
    };

    // Actualiza perfil en contexto de autenticación
    const result = await updateProfile(userData);

    if(result.success){
        // Guarda datos temporalmente si viene desde confirmación
        if (fromConfirmation) {
            localStorage.setItem('updatedPasajero', JSON.stringify(result.user));
        }

        // Redirige según el contexto de uso
        if (requireCompleteProfile && vuelo) {
            navigate("/confirmar-reserva", { state: { vuelo } });
        } else {
            navigate(returnTo || "/buscar");
        }
    }
  };

  // Hook personalizado para manejo de formulario
  const {
    form,
    error,
    loading,
    submitted,
    fieldErrors,
    handleChange,
    handleSubmit
  } = useForm(
    getProfileInitialState(pasajeroInicial, user),
    profileSchema,
    onSubmit
  );

  // Calcula fecha máxima para validación de mayoría de edad
  const maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().slice(0, 10);

  /**
   * Renderiza campos de formulario dinámicamente según configuración
   */
  const renderField = (field) => {
    const commonProps = {
      id: field.name,
      name: field.name,
      label: field.label,
      value: form[field.name],
      onChange: (e) => handleChange(e, field.fieldType || null),
      required: field.required,
      disabled: loading,
      hint: field.hint,
      error: submitted ? fieldErrors[field.name] : undefined,
    };

    // Renderiza select para campos de tipo selección
    if (field.type === "select") {
      return <FormSelect {...commonProps} options={field.options} />;
    }

    // Renderiza input de fecha con restricciones
    if (field.type === "date") {
      return <FormInput {...commonProps} type="date" min="1900-01-01" max={maxDate} />;
    }

    // Renderiza input estándar para otros tipos
    return <FormInput {...commonProps} type={field.type} />;
  };

  // Textos dinámicos según contexto
  const submitButtonText = loading ? 'Guardando...' : (user ? 'Actualizar Datos' : 'Guardar Cambios');
  const pageTitle = requireCompleteProfile ? 'Completa Tu Perfil' : (user ? 'Editar Mi Perfil' : 'Crear Perfil');

  return (
    <main className="page">
      <div className="profile-container">
        <h1>{pageTitle}</h1>

        {/* Muestra mensaje informativo si existe */}
        {message && <div className="form-info">{message}</div>}

        <form onSubmit={handleSubmit} noValidate className={loading ? 'form-loading' : ''}>
          {/* Itera sobre grupos de campos definidos */}
          {PROFILE_FIELD_GROUPS.map(group => (
            <div key={group.title} className="form-field-group">
              <h3>{group.title}</h3>
              <div className="form-row">
                {/* Renderiza cada campo dentro del grupo */}
                {group.fields.map(field => (
                  <div key={field.name} className="form-field">
                    {renderField(field)}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Muestra error general del formulario */}
          {error && <div className="form-error">{error}</div>}

          {/* Acciones del formulario */}
          <div className="form-actions">
            <Button type="submit" variant="primary" loading={loading}>
              {submitButtonText}
            </Button>
            <Button type="button" variant="secondary" onClick={() => navigate(returnTo || "/buscar")}>
              {requireCompleteProfile ? 'Cancelar Reserva' : 'Cancelar'}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
