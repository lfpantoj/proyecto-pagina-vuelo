// hooks/useForm.js
import { useState } from "react";
import { validateForm } from "../utils/validationSchemas";
import { createChangeHandler } from "../utils/formHelpers";

/**
 * Custom hook para gestionar estado, validacion y envio de formularios
 * Proporciona una solucion completa de manejo de formularios incluyendo
 * estado, validacion, manejo de errores y ciclo de envio
 */
export const useForm = (initialState, schema, onSubmitCallback) => {
  // Estado del formulario y validacion
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  /**
   * Manejador de cambios en los campos del formulario
   * Limpia errores al modificar los campos
   */
  const handleChange = createChangeHandler(setForm, setError, setFieldErrors);

  /**
   * Manejador de envio del formulario con validacion
   * Valida el formulario contra el esquema proporcionado
   * Ejecuta el callback de envio si la validacion es exitosa
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Valida el formulario completo
    const { errors, isValid } = validateForm(form, schema);
    setFieldErrors(errors);
    
    // Detiene el envio si hay errores de validacion
    if (!isValid) {
      setError("Por favor corrige los errores en el formulario.");
      return;
    }
    
    // Inicia estado de carga y limpia errores previos
    setLoading(true);
    setError("");
    
    try {
      // Ejecuta la funcion de envio proporcionada
      await onSubmitCallback(form);
    } catch (err) {
      // Maneja errores durante el envio
      setError(err.message || "Error al procesar la solicitud");
    } finally {
      // Finaliza estado de carga
      setLoading(false);
    }
  };

  /**
   * Reinicia el formulario a su estado inicial
   * Limpia valores, errores, estados de carga y banderas de envio
   */
  const resetForm = () => {
    setForm(initialState);
    setError("");
    setLoading(false);
    setSubmitted(false);
    setFieldErrors({});
  };

  // Retorna utilidades y estado del formulario
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
