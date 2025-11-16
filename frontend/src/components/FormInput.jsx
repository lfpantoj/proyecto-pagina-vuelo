// components/FormInput.jsx
import React from "react";

// Componente para campos de formulario con manejo de estados y validación
export default function FormInput({
  label,
  id,
  name,
  type = "text",           // Tipo de input, por defecto texto
  value,
  onChange,
  required = false,        // Indica si el campo es obligatorio
  disabled = false,        // Controla estado deshabilitado
  placeholder,
  hint,                   // Texto de ayuda opcional
  error,                  // Mensaje de error para validación
  autoComplete,
  ...props
}) {
  // Determina clases CSS condicionales basadas en el estado de error
  const inputClass = `form-input ${error ? 'form-input--error' : ''}`;

  return (
    <div className="form-field">
      {/* Etiqueta del campo con indicador visual para campos requeridos */}
      <label htmlFor={id} className="form-label">
        {label} {required && <span className="form-required">*</span>}
      </label>
      
      {/* Input principal con manejo de accesibilidad */}
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        // Aplica clase condicional basada en estado de error
        className={inputClass}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        // Define referencia para textos descriptivos de accesibilidad
        aria-describedby={
          error ? `${id}-error` : hint ? `${id}-hint` : undefined
        }
        // Indica estado inválido para lectores de pantalla
        aria-invalid={error ? "true" : "false"}
        autoComplete={autoComplete}
        // Propiedades adicionales pasadas al componente
        {...props}
      />

      {/* Muestra texto de ayuda solo cuando no hay error */}
      {hint && !error && (
        <span id={`${id}-hint`} className="form-hint">
          {hint}
        </span>
      )}

      {/* Muestra mensaje de error con rol de alerta para accesibilidad */}
      {error && (
        <span id={`${id}-error`} className="form-field-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
