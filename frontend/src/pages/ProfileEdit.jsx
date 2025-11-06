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

export default function ProfileEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, updateProfile } = useAuth();
  
  const { 
    pasajero: pasajeroInicial, 
    returnTo, 
    fromConfirmation, 
    message,
    requireCompleteProfile,
    vuelo 
  } = location.state || {};

  const onSubmit = async (formData) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const updatedPasajero = {
      documento: formData.numeroDocumento,
      nombre: `${formData.primerNombre} ${formData.segundoNombre || ''} ${formData.primerApellido} ${formData.segundoApellido || ''}`.trim().replace(/\s+/g, ' '),
      correo: formData.correo,
      celular: formData.numeroCelular,
      nacimiento: formData.fechaNacimiento
    };
    
    updateProfile(updatedPasajero);
    
    if (fromConfirmation) {
      localStorage.setItem('updatedPasajero', JSON.stringify(updatedPasajero));
    }
    
    if (requireCompleteProfile && vuelo) {
      navigate("/confirmar-reserva", { state: { vuelo } });
    } else {
      navigate(returnTo || "/buscar");
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
    getProfileInitialState(pasajeroInicial, user),
    profileSchema,
    onSubmit
  );

  const maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().slice(0, 10);

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

    if (field.type === "select") {
      return <FormSelect {...commonProps} options={field.options} />;
    }

    if (field.type === "date") {
      return <FormInput {...commonProps} type="date" min="1900-01-01" max={maxDate} />;
    }

    return <FormInput {...commonProps} type={field.type} />;
  };

  const submitButtonText = loading ? 'Guardando...' : (user ? 'Actualizar Datos' : 'Guardar Cambios');
  const pageTitle = requireCompleteProfile ? 'Completa Tu Perfil' : (user ? 'Editar Mi Perfil' : 'Crear Perfil');

  return (
    <main className="page">
      <div className="profile-container">
        <h1>{pageTitle}</h1>

        {message && <div className="form-info">{message}</div>}

        <form onSubmit={handleSubmit} noValidate className={loading ? 'form-loading' : ''}>
          {PROFILE_FIELD_GROUPS.map(group => (
            <div key={group.title} className="form-field-group">
              <h3>{group.title}</h3>
              <div className="form-row">
                {group.fields.map(field => (
                  <div key={field.name} className="form-field">
                    {renderField(field)}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {error && <div className="form-error">{error}</div>}

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