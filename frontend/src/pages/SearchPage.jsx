// src/pages/SearchPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { nonEmpty, notSame } from "../utils/validators";

/**
 * Available cities for flight search destinations
 * Defines the selectable origin and destination options for flight searches
 * 
 * @type {Array<string>}
 */
const CITIES = ["Bogotá", "Medellín", "Cali", "Cartagena"];

/**
 * Flight search page component that provides the main search interface
 * for users to specify flight search criteria including origin, destination,
 * travel date, and passenger information.
 * 
 * This component implements form validation, accessibility features, and
 * loading state management to provide a robust search experience.
 * 
 * @returns {JSX.Element} Rendered flight search page with search form
 */
export default function SearchPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    origen: "",
    destino: "",
    fechaIda: "",
    pasajeros: "1 adulto",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   * Minimum date for flight search (current date)
   * Prevents selection of past dates for flight searches
   */
  const minDate = new Date().toISOString().slice(0, 10);

  /**
   * Handles form input changes and updates form state
   * Clears any existing error messages when user modifies form fields
   * 
   * @param {Event} e - Change event from form inputs
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    if (error) setError("");
  };

  /**
   * Validates form data before submission
   * Checks for required field completion and logical constraints
   * 
   * @returns {boolean} True if form data is valid, false otherwise
   */
  const validate = () => {
    if (!nonEmpty(form.origen) || !nonEmpty(form.destino) || !nonEmpty(form.fechaIda)) {
      setError("Completa todos los campos requeridos.");
      return false;
    }
    if (!notSame(form.origen, form.destino)) {
      setError("El origen y destino no pueden ser la misma ciudad.");
      return false;
    }
    return true;
  };

  /**
   * Handles form submission with validation and navigation
   * Processes search criteria and navigates to results page with search parameters
   * 
   * @param {Event} e - Form submission event
   */
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setLoading(false);
    navigate("/resultados", { state: form });
  };

  return (
    <main className="page page--centered" aria-labelledby="search-title">
      <h1 id="search-title">Buscar vuelos</h1>

      <form 
        onSubmit={onSubmit} 
        noValidate 
        className={`form-container ${loading ? 'form-loading' : ''}`}
        aria-describedby={error ? "search-error" : undefined}
        role="search"
      >
        {/* Origin and destination selection row */}
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="origen" className="form-label">
              Origen <span className="form-required">*</span>
            </label>
            <select
              name="origen"
              id="origen"
              value={form.origen}
              onChange={handleChange}
              className="form-select"
              required
              aria-describedby="origen-hint"
              aria-invalid={error && !form.origen ? "true" : "false"}
            >
              <option value="">Seleccione origen</option>
              {CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <span id="origen-hint" className="form-hint">
              Ciudad de salida
            </span>
          </div>

          <div className="form-field">
            <label htmlFor="destino" className="form-label">
              Destino <span className="form-required">*</span>
            </label>
            <select
              name="destino"
              id="destino"
              value={form.destino}
              onChange={handleChange}
              className="form-select"
              required
              aria-describedby="destino-hint"
              aria-invalid={error && !form.destino ? "true" : "false"}
            >
              <option value="">Seleccione destino</option>
              {CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <span id="destino-hint" className="form-hint">
              Ciudad de llegada
            </span>
          </div>
        </div>

        {/* Date and passenger information row */}
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="fechaIda" className="form-label">
              Fecha de ida <span className="form-required">*</span>
            </label>
            <input
              type="date"
              id="fechaIda"
              name="fechaIda"
              value={form.fechaIda}
              onChange={handleChange}
              className="form-input"
              min={minDate}
              required
              aria-describedby="fechaIda-hint"
              aria-invalid={error && !form.fechaIda ? "true" : "false"}
            />
            <span id="fechaIda-hint" className="form-hint">
              Fecha del vuelo
            </span>
          </div>

          <div className="form-field">
            <label htmlFor="pasajeros" className="form-label">
              Pasajeros <span className="form-required">*</span>
            </label>
            <select
              name="pasajeros"
              id="pasajeros"
              value={form.pasajeros}
              onChange={handleChange}
              className="form-select"
              aria-describedby="pasajeros-hint"
            >
              <option>1 adulto</option>
              <option>2 adultos</option>
              <option>3 adultos</option>
              <option>1 adulto, 1 niño</option>
            </select>
            <span id="pasajeros-hint" className="form-hint">
              Número de pasajeros
            </span>
          </div>
        </div>

        {/* Error message display */}
        {error && (
          <div id="search-error" className="form-error" role="alert" aria-live="assertive">
            {error}
          </div>
        )}

        {/* Form action buttons */}
        <div className="form-actions">
          <Button
            type="submit"
            variant="primary"
            loading={loading}
            disabled={(!form.origen || !form.destino || !form.fechaIda) || loading}
            aria-describedby={loading ? "search-loading" : undefined}
          >
            {loading ? 'Buscando...' : 'Buscar vuelos'}
          </Button>
          {/* Screen reader notification for loading state */}
          {loading && (
            <div id="search-loading" className="sr-only" aria-live="polite">
              Buscando vuelos disponibles...
            </div>
          )}
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