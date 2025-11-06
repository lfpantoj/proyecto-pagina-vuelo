// src/pages/SearchPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import FormSelect from "../components/FormSelect";
import FormInput from "../components/FormInput";
import { useForm } from "../hooks/useForm";
import { searchSchema } from "../utils/validationSchemas";

const CITIES = [
  { value: "Bogotá", label: "Bogotá" },
  { value: "Medellín", label: "Medellín" },
  { value: "Cali", label: "Cali" },
  { value: "Cartagena", label: "Cartagena" }
];

const PASSENGER_OPTIONS = [
  { value: "1 adulto", label: "1 adulto" },
  { value: "2 adultos", label: "2 adultos" },
  { value: "3 adultos", label: "3 adultos" },
  { value: "1 adulto, 1 niño", label: "1 adulto, 1 niño" }
];

export default function SearchPage() {
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    navigate("/resultados", { state: formData });
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
    {
      origen: "",
      destino: "",
      fechaIda: "",
      pasajeros: "1 adulto",
    },
    searchSchema,
    onSubmit
  );

  const minDate = new Date().toISOString().slice(0, 10);

  return (
    <main className="page page--centered">
      <h1>Buscar vuelos</h1>

      <form 
        onSubmit={handleSubmit} 
        noValidate 
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
            min={minDate}
          />

          <FormSelect
            label="Pasajeros"
            id="pasajeros"
            name="pasajeros"
            value={form.pasajeros}
            onChange={handleChange}
            options={PASSENGER_OPTIONS}
            hint="Número de pasajeros"
          />
        </div>

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