// src/pages/SearchPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import FormSelect from "../components/FormSelect";
import FormInput from "../components/FormInput";
import { useForm } from "../hooks/useForm";
import { searchSchema } from "../utils/validationSchemas";
import { CITIES } from "../data/cities";

/**
 * Página de búsqueda de vuelos con formulario de criterios de búsqueda
 * Permite al usuario especificar origen, destino, fecha y número de pasajeros
 */
export default function SearchPage() {
  const navigate = useNavigate();

  // Maneja el envío del formulario y navegación a resultados
  const onSubmit = async (formData) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    navigate("/resultados", { state: formData });
  };

  // Hook personalizado para gestión del formulario con validación
  const {
    form,
    error,
    loading,
    submitted,
    fieldErrors,
    handleChange,
    handleSubmit
  } = useForm(
    {
      origen: "",
      destino: "",
      fechaIda: "",
      pasajeros: 1, // Default a 1 pasajero
    },
    searchSchema,
    onSubmit
  );

  // Fecha mínima permitida (hoy) para evitar selección de fechas pasadas
  const minDate = new Date().toISOString().slice(0, 10);

  return (
    <main className="page page--centered">
      <h1>Buscar vuelos</h1>

      <form 
        onSubmit={handleSubmit} 
        noValidate 
        // Aplica clase de loading durante la búsqueda
        className={loading ? 'form-loading' : ''}
      >
        <div className="form-row">
          <FormSelect
            label="Origen"
            id="origen"
            name="origen"
            value={form.origen}
            onChange={handleChange}
            required
            // Incluye opción vacía para selección inicial
            options={[{ value: "", label: "Seleccione origen" }, ...CITIES]}
            error={submitted ? fieldErrors.origen : undefined}
            submitted={submitted}
            hint="Ciudad de salida"
          />

          <FormSelect
            label="Destino"
            id="destino"
            name="destino"
            value={form.destino}
            onChange={handleChange}
            required
            options={[{ value: "", label: "Seleccione destino" }, ...CITIES]}
            error={submitted ? fieldErrors.destino : undefined}
            submitted={submitted}
            hint="Ciudad de llegada"
          />
        </div>

        <div className="form-row">
          <FormInput
            label="Fecha de ida"
            id="fechaIda"
            name="fechaIda"
            type="date"
            value={form.fechaIda}
            onChange={handleChange}
            required
            error={submitted ? fieldErrors.fechaIda : undefined}
            submitted={submitted}
            hint="Fecha del vuelo"
            // Restringe selección a fechas futuras
            min={minDate}
          />

          <FormInput
            label="Pasajeros"
            id="pasajeros"
            name="pasajeros"
            type="number"
            value={form.pasajeros}
            onChange={handleChange}
            min="1" // Mínimo 1 pasajero
            required
            error={submitted ? fieldErrors.pasajeros : undefined}
            submitted={submitted}
            hint="Número de pasajeros"
          />
        </div>

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
            {loading ? 'Buscando...' : 'Buscar vuelos'}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/login")}
          >
            Iniciar sesión
          </Button>
        </div>
      </form>
    </main>
  );
}
