// hooks/useForm.js
import { useState } from "react";
import { validateForm } from "../utils/validationSchemas";
import { createChangeHandler } from "../utils/formHelpers";

/**
 * Hook personalizado de React para gestionar el estado, la validación y el envío de formularios. 
 * Este hook proporciona una solución integral de gestión de formularios que incluye el 
 * manejo del estado, la validación, la gestión de errores y el ciclo de vida del envío.
 * 
 * El hook se integra con los esquemas de validación y los helpers de formularios para crear 
 * un patrón de manejo de formularios consistente en toda la aplicación.
 * 
 * @param {Object} initialState - valores de estado de forma inicial
 * @param {Object} schema - Objeto de esquema de validación para la validación de formularios
 * @param {Function} onSubmitCallback - Función de devolución de llamada asíncrona que se ejecutará al enviar el formulario
 * @returns {Object} utilidades de gestión de formularios y estado
 * @returns {Object} return.form - Valores del estado actual del formulario
 * @returns {string} return.error - Mensaje de error global del formulario
 * @returns {boolean} return.loading - Estado de carga del envío del formulario
 * @returns {boolean} return.submitted - Indica si el formulario se ha enviado.
 * @returns {Object} return.fieldErrors - Errores de validación por campo
 * @returns {Function} return.handleChange - Controlador de cambios para entradas de formulario
 * @returns {Function} return.handleSubmit - Controlador de envío para formularios
 * @returns {Function} return.resetForm - Función para restablecer el formulario a su estado inicial
 * @returns {Function} return.setForm - Función para establecer manualmente el estado del formulario
 * @returns {Function} return.setError - Función para establecer manualmente el estado de error
 */
export const useForm = (initialState, schema, onSubmitCallback) => {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  /**
   * Gestiona los cambios introducidos en los formularios con borrado de errores integrado.
   * Utiliza la utilidad createChangeHandler para un comportamiento coherente.
   */
  const handleChange = createChangeHandler(setForm, setError, setFieldErrors);

  /**
   * Gestiona el envío de formularios con validación y control de errores.
   * Valida el formulario según el esquema proporcionado, gestiona los estados
   * de carga y ejecuta la función de devolución de llamada tras una validación exitosa.
   * 
   * @param {Event} e - evento de envío de formularios
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    
    const { errors, isValid } = validateForm(form, schema);
    setFieldErrors(errors);
    
    if (!isValid) {
      setError("Por favor corrige los errores en el formulario.");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      await onSubmitCallback(form);
    } catch (err) {
      setError(err.message || "Error al procesar la solicitud");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Restablece el formulario a su estado inicial.
   * Borra todos los valores del formulario, errores, estados de carga e indicadores de envío.
   */
  const resetForm = () => {
    setForm(initialState);
    setError("");
    setLoading(false);
    setSubmitted(false);
    setFieldErrors({});
  };

  return {
    form,
    error,
    loading,
    submitted,
    fieldErrors,
    handleChange,
    handleSubmit,
    resetForm,
    setForm,
    setError
  };
};