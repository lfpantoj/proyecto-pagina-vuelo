// src/pages/ProfileEdit.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import FormSelect from "../components/FormSelect";
import { profileSchema } from "../utils/validationSchemas";
import { useForm } from "../hooks/useForm";

/**
 * Configuration array for profile form fields organized by logical groups
 * Defines the structure, validation rules, and presentation properties
 * for all profile management fields
 * 
 * @type {Array<Object>}
 * @property {string} title - Group section title
 * @property {Array<Object>} fields - Array of field definitions within the group
 */
const FIELD_GROUPS = [
  {
    title: "Información Personal",
    fields: [
      { 
        name: "tipoDocumento", 
        label: "Tipo de documento", 
        type: "select", 
        required: true,
        options: [
          { value: "", label: "Seleccione tipo" },
          { value: "CC", label: "Cédula de ciudadanía" },
          { value: "CE", label: "Cédula de extranjería" },
          { value: "TI", label: "Tarjeta de identidad" },
          { value: "PA", label: "Pasaporte" }
        ]
      },
      { 
        name: "numeroDocumento", 
        label: "Número de documento", 
        type: "text", 
        required: true, 
        hint: "Solo números",
        fieldType: "document" 
      },
      { 
        name: "primerNombre", 
        label: "Primer nombre", 
        type: "text", 
        required: true, 
        hint: "Solo letras",
        fieldType: "name" 
      },
      { 
        name: "segundoNombre", 
        label: "Segundo nombre", 
        type: "text", 
        hint: "Solo letras (opcional)",
        fieldType: "name" 
      },
      { 
        name: "primerApellido", 
        label: "Primer apellido", 
        type: "text", 
        required: true, 
        hint: "Solo letras",
        fieldType: "name" 
      },
      { 
        name: "segundoApellido", 
        label: "Segundo apellido", 
        type: "text", 
        hint: "Solo letras (opcional)",
        fieldType: "name" 
      },
      { 
        name: "numeroCelular", 
        label: "Número celular", 
        type: "tel", 
        required: true, 
        hint: "10 dígitos",
        fieldType: "phone" 
      },
      { 
        name: "fechaNacimiento", 
        label: "Fecha de nacimiento", 
        type: "date", 
        required: true 
      }
    ]
  },
  {
    title: "Información de Contacto", 
    fields: [
      { 
        name: "correo", 
        label: "Correo electrónico", 
        type: "email", 
        required: true,
        fieldType: "email" 
      },
      { 
        name: "confirmarCorreo", 
        label: "Confirmar correo electrónico", 
        type: "email", 
        required: true,
        fieldType: "email" 
      }
    ]
  },
  {
    title: "Seguridad",
    fields: [
      { 
        name: "contrasena", 
        label: "Contraseña", 
        type: "password", 
        required: true, 
        hint: "Mínimo 6 caracteres",
        fieldType: "password" 
      },
      { 
        name: "confirmarContrasena", 
        label: "Confirmar contraseña", 
        type: "password", 
        required: true, 
        hint: "Mínimo 6 caracteres",
        fieldType: "password" 
      }
    ]
  }
];

/**
 * Profile management page component for creating and updating user profiles
 * Provides a comprehensive form for user profile information including personal data,
 * contact information, and security credentials
 * 
 * This component supports multiple usage contexts: profile creation, profile editing,
 * and profile completion required for flight reservations
 * 
 * @returns {JSX.Element} Rendered profile management page with comprehensive form
 */
export default function ProfileEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, updateProfile } = useAuth();
  
  /**
   * Extracts navigation state parameters for contextual behavior
   * Supports profile completion flows from reservation process
   */
  const { 
    pasajero: pasajeroInicial, 
    returnTo, 
    fromConfirmation, 
    message,
    requireCompleteProfile,
    vuelo 
  } = location.state || {};

  /**
   * Handles form submission and profile data processing
   * Updates user profile in authentication context and localStorage
   * Manages navigation based on the context of the profile operation
   * 
   * @param {Object} formData - Complete profile form data
   */
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
    
    // Redirect based on profile completion context
    if (requireCompleteProfile && vuelo) {
      navigate("/confirmar-reserva", { state: { vuelo } });
    } else {
      navigate(returnTo || "/buscar");
    }
  };

  /**
   * Parses full name string into individual name components
   * Splits full name into first name, middle name, first surname, and second surname
   * 
   * @param {string} nombreCompleto - Full name string to parse
   * @returns {Object} Object containing separated name components
   */
  const parseNombreCompleto = (nombreCompleto) => {
    if (!nombreCompleto) return { primerNombre: "", segundoNombre: "", primerApellido: "", segundoApellido: "" };
    
    const partes = nombreCompleto.split(' ');
    return {
      primerNombre: partes[0] || "",
      segundoNombre: partes[1] || "",
      primerApellido: partes[2] || "",
      segundoApellido: partes[3] || ""
    };
  };

  /**
   * Determines initial form state based on existing user data and navigation context
   * Prioritizes passed passenger data, then current user data, then empty defaults
   * 
   * @returns {Object} Initial form state values
   */
  const getInitialState = () => {
    if (pasajeroInicial) {
      return {
        tipoDocumento: "CC",
        numeroDocumento: pasajeroInicial.documento || "",
        ...parseNombreCompleto(pasajeroInicial.nombre),
        numeroCelular: pasajeroInicial.celular || "",
        fechaNacimiento: pasajeroInicial.nacimiento || "",
        correo: pasajeroInicial.correo || "",
        confirmarCorreo: pasajeroInicial.correo || "",
        contrasena: "",
        confirmarContrasena: "",
      };
    } else if (user) {
      return {
        tipoDocumento: "CC",
        numeroDocumento: user.documento || "",
        ...parseNombreCompleto(user.nombre),
        numeroCelular: user.celular || "",
        fechaNacimiento: user.nacimiento || "",
        correo: user.correo || "",
        confirmarCorreo: user.correo || "",
        contrasena: "",
        confirmarContrasena: "",
      };
    } else {
      return {
        tipoDocumento: "", 
        numeroDocumento: "", 
        primerNombre: "", 
        segundoNombre: "",
        primerApellido: "", 
        segundoApellido: "", 
        numeroCelular: "", 
        fechaNacimiento: "",
        correo: "", 
        confirmarCorreo: "", 
        contrasena: "", 
        confirmarContrasena: "",
      };
    }
  };

  /**
   * Form management hook providing state and handlers for profile form
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
    getInitialState(),
    profileSchema,
    onSubmit
  );

  /**
   * Calculates maximum date for birth date validation (18 years ago from today)
   */
  const maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().slice(0, 10);

  /**
   * Renders appropriate form field component based on field type
   * Handles select dropdowns, date inputs, and standard text inputs
   * 
   * @param {Object} field - Field configuration object
   * @returns {JSX.Element} Appropriate form field component
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
      submitted: submitted
    };

    if (field.type === "select") {
      return (
        <FormSelect
          {...commonProps}
          options={field.options}
          placeholder="Seleccione una opción"
        />
      );
    }

    if (field.type === "date") {
      return (
        <FormInput
          {...commonProps}
          type="date"
          min="1900-01-01"
          max={maxDate}
        />
      );
    }

    return (
      <FormInput
        {...commonProps}
        type={field.type}
        autoComplete={field.autoComplete}
      />
    );
  };

  const submitButtonText = loading ? 'Guardando...' : (user ? 'Actualizar Datos' : 'Guardar Cambios');
  const pageTitle = requireCompleteProfile ? 'Completa Tu Perfil' : (user ? 'Editar Mi Perfil' : 'Crear Perfil');

  return (
    <main className="page">
      <div className="profile-container">
        <h1 className="profile-page__title">{pageTitle}</h1>

        {/* Contextual information message for profile completion requirements */}
        {message && (
          <div className="form-info" style={{ 
            background: '#fff3cd', 
            color: '#856404', 
            padding: '1rem', 
            borderRadius: '8px', 
            marginBottom: '1.5rem',
            textAlign: 'center',
            border: '1px solid #ffeaa7'
          }}>
            {message}
          </div>
        )}

        <form 
          onSubmit={handleSubmit} 
          noValidate 
          className={`form-container ${loading ? 'form-loading' : ''}`}
          aria-labelledby="profile-title"
        >
          {FIELD_GROUPS.map(group => (
            <div key={group.title} className="form-field-group">
              <h3 className="form-field-group-title">
                {group.title}
              </h3>
              <div className="form-row">
                {group.fields.map(field => (
                  <div key={field.name} className="form-field">
                    {renderField(field)}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {error && (
            <div className="form-error" role="alert" aria-live="assertive">
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
              {submitButtonText}
            </Button>
            
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate(returnTo || "/buscar")}
              disabled={loading}
            >
              {requireCompleteProfile ? 'Cancelar Reserva' : 'Cancelar'}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}