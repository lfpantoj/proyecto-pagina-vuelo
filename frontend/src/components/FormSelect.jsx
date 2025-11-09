// src/components/FormSelect.jsx
import React from "react";

/**
 * Componente de selección (dropdown) reutilizable para formularios
 * Maneja etiqueta, opciones, validación y estados de error
 */
export default function FormSelect({
  label,
  id,
  name,
  value,
  onChange,
  required = false,
  disabled = false,
  placeholder,
  hint,
  error,
  options = [],
  ...props
}) {
  // Define clases CSS condicionales basadas en el estado de error
  const selectClass = `form-select ${error ? 'form-input--error' : ''}`;

  return (
    <div className="form-field">
      {/* Etiqueta del campo con indicador de requerido */}
      <label htmlFor={id} className="form-label">
        {label} {required && <span className="form-required">*</span>}
      </label>
      
      {/* Elemento select principal */}
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={selectClass}
        required={required}
        disabled={disabled}
        // Atributos de accesibilidad para describir el campo
        aria-describedby={
          error ? `${id}-error` : hint ? `${id}-hint` : undefined
        }
        // Indicador de estado inválido para lectores de pantalla
        aria-invalid={error ? "true" : "false"}
        {...props}
      >
        {/* Opción placeholder si está definida */}
        {placeholder && (
          <option value="">{placeholder}</option>
        )}
        {/* Renderiza las opciones del dropdown */}
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Muestra texto de ayuda cuando no hay errores */}
      {hint && !error && (
        <span id={`${id}-hint`} className="form-hint">
          {hint}
        </span>
      )}

      {/* Muestra mensaje de error con rol de alerta */}
      {error && (
        <span id={`${id}-error`} className="form-field-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
