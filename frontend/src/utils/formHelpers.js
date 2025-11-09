// utils/formHelpers.js

import { filterInput } from './validators';

/**
 * Crea un manejador de cambios estandarizado para inputs de formulario
 * Esta función de orden superior genera manejadores de eventos que gestionan
 * actualizaciones de estado, filtrado de entrada y limpieza de errores
 * de manera consistente en toda la aplicación.
 * 
 * @param {Function} setForm - Función establecedora de estado para datos del formulario
 * @param {Function} setError - Función establecedora de estado para errores globales
 * @param {Function} setFieldErrors - Función establecedora de estado para errores por campo
 * @returns {Function} Función manejadora de cambios para inputs de formulario
 */
export const createChangeHandler = (setForm, setError, setFieldErrors) => (e, fieldType = null) => {
  const { name, value } = e.target;
  
  let filteredValue = value;
  // Filtra el valor si se especifica un tipo de campo
  if (fieldType) {
    filteredValue = filterInput(value, fieldType);
  }

  // Actualiza el estado del formulario con el nuevo valor
  setForm(prev => ({ ...prev, [name]: filteredValue }));
  
  // Limpia estados de error cuando el usuario modifica el campo
  if (setError) setError("");
  if (setFieldErrors) {
    setFieldErrors(prev => ({ ...prev, [name]: '' }));
  }
};

/**
 * Determina las clases CSS apropiadas para campos de formulario basado en estado de validación
 * Esta función aplica estilos dinámicos a inputs para proporcionar retroalimentación visual
 * sobre el estado de validación del campo (normal, error o éxito).
 * 
 * La función solo aplica estilos de validación después del envío del formulario
 * para evitar retroalimentación visual prematura durante la entrada del usuario.
 * 
 * @param {string} fieldName - Identificador del nombre del campo
 * @param {string} value - Valor actual del campo
 * @param {boolean} submitted - Indica si el formulario ha sido enviado
 * @param {Object} fieldErrors - Objeto que contiene mensajes de error por campo
 * @returns {string} Cadena de clases CSS para el campo del formulario
 */
export const getFieldClass = (fieldName, value, submitted, fieldErrors) => {
  // Retorna clase base si el formulario no ha sido enviado
  if (!submitted) return "form-input";
  
  const error = fieldErrors[fieldName];
  // Aplica clase de error si existe error de validación
  if (error) {
    return "form-input form-input--error";
  }
  
  // Aplica clase de éxito solo para campos con valor y sin errores
  if (value && !error) {
    return "form-input form-input--success";
  }
  
  // Retorna clase base por defecto
  return "form-input";
};
