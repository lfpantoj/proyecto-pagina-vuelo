// utils/formHelpers.js

import { filterInput } from './validators';

/**
 * Crea una función de controlador de cambios estandarizada para las entradas de formularios.
 * Esta función de orden superior genera controladores de eventos que gestionan las actualizaciones del estado del formulario,
 * el filtrado de entradas y la eliminación de errores de manera coherente en toda la aplicación.
 * 
 * El controlador filtra automáticamente los valores de entrada según el tipo de campo y borra los estados
 * de error relevantes cuando los usuarios modifican los campos del formulario.
 * 
 * @param {Function} setForm - Función para establecer el estado de los datos del formulario
 * @param {Function} setError - Función de configuración de estado para errores de formulario globales
 * @param {Function} setFieldErrors - Función de configuración de estado para errores específicos del campo
 * @returns {Function} Función de controlador de eventos para cambios en la entrada del formulario
 */
export const createChangeHandler = (setForm, setError, setFieldErrors) => (e, fieldType = null) => {
  const { name, value } = e.target;
  
  let filteredValue = value;
  if (fieldType) {
    filteredValue = filterInput(value, fieldType);
  }

  setForm(prev => ({ ...prev, [name]: filteredValue }));
  
    // Borrar estados de error en la entrada del usuario
  if (setError) setError("");
  if (setFieldErrors) {
    setFieldErrors(prev => ({ ...prev, [name]: '' }));
  }
};

/**
 * Determina las clases CSS apropiadas para los campos del formulario en función del estado de validación.
 * Esta función aplica estilos dinámicos a las entradas del formulario para proporcionar información visual
 * sobre el estado de validación del campo (estado normal, de error o de éxito).
 * 
 * La función solo aplica el estilo de validación después del envío del formulario
 * para evitar la retroalimentación visual prematura durante la entrada de datos del usuario.
 * 
 * @param {string} fieldName - Identificador de nombre del campo del formulario
 * @param {string} value - Valor actual del campo del formulario
 * @param {boolean} submitted - Si el formulario ha sido enviado
 * @param {Object} fieldErrors - Objeto que contiene mensajes de error específicos del campo
 * @returns {string} Cadena de clase CSS para el campo del formulario
 */
export const getFieldClass = (fieldName, value, submitted, fieldErrors) => {
  if (!submitted) return "form-input";
  
  const error = fieldErrors[fieldName];
  if (error) {
    return "form-input form-input--error";
  }
  
  // Mostrar solo el estado de éxito para los campos con valor y sin errores.
  if (value && !error) {
    return "form-input form-input--success";
  }
  
  return "form-input";
};