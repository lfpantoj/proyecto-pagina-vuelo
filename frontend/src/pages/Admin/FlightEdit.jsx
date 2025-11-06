// pages/Admin/FlightEdit.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/Button";
import FormInput from "../../components/FormInput";
import FormSelect from "../../components/FormSelect";
import { useForm } from "../../hooks/useForm";
import { flights, AEROLINEAS, CIUDADES } from "../../data/flights";
import { flightSchema } from "../../utils/validationSchemas";

export default function FlightEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const { vuelo } = location.state || {};

  const onSubmit = async (formData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const savedFlights = JSON.parse(localStorage.getItem('flights') || '[]');
    const currentFlights = savedFlights.length > 0 ? savedFlights : flights;
    
    let updatedFlights;
    
    if (vuelo) {
      updatedFlights = currentFlights.map(f => 
        f.id === vuelo.id ? { ...formData, precio: Number(formData.precio), asientos: Number(formData.asientos) } : f
      );
    } else {
      const newFlight = {
        ...formData,
        precio: Number(formData.precio),
        asientos: Number(formData.asientos)
      };
      updatedFlights = [...currentFlights, newFlight];
    }
    
    localStorage.setItem('flights', JSON.stringify(updatedFlights));
    navigate("/admin/vuelos");
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
    vuelo || {
      id: "",
      aerolinea: "",
      origen: "",
      destino: "",
      fecha: "",
      salida: "",
      llegada: "",
      precio: "",
      asientos: ""
    },
    flightSchema,
    onSubmit
  );

  return (
    <main className="page">
      <h1>{vuelo ? "Editar Vuelo" : "Crear Vuelo"}</h1>

      <form onSubmit={handleSubmit} noValidate className="form-container">
        <div className="form-row">
          <FormInput
            label="ID del Vuelo"
            id="id"
            name="id"
            value={form.id}
            onChange={handleChange}
            required
            error={submitted ? fieldErrors.id : undefined}
            submitted={submitted}
            placeholder="Ej: AV-801"
            hint="Formato: AA-123 (Aerolínea-Número)"
          />

          <FormSelect
            label="Aerolínea"
            id="aerolinea"
            name="aerolinea"
            value={form.aerolinea}
            onChange={handleChange}
            required
            options={AEROLINEAS}
            placeholder="Seleccione aerolínea"
            error={submitted ? fieldErrors.aerolinea : undefined}
            submitted={submitted}
            hint="Seleccione la aerolínea operadora"
          />
        </div>

        <div className="form-row">
          <FormSelect
            label="Origen"
            id="origen"
            name="origen"
            value={form.origen}
            onChange={handleChange}
            required
            options={CIUDADES}
            placeholder="Seleccione origen"
            error={submitted ? fieldErrors.origen : undefined}
            submitted={submitted}
            hint="Ciudad de salida del vuelo"
          />

          <FormSelect
            label="Destino"
            id="destino"
            name="destino"
            value={form.destino}
            onChange={handleChange}
            required
            options={CIUDADES}
            placeholder="Seleccione destino"
            error={submitted ? fieldErrors.destino : undefined}
            submitted={submitted}
            hint="Ciudad de llegada del vuelo"
          />
        </div>

        <div className="form-row">
          <FormInput
            label="Fecha del Vuelo"
            id="fecha"
            name="fecha"
            type="date"
            value={form.fecha}
            onChange={handleChange}
            required
            error={submitted ? fieldErrors.fecha : undefined}
            submitted={submitted}
            hint="Fecha de operación del vuelo"
            min={new Date().toISOString().split('T')[0]}
          />

          <FormInput
            label="Hora de Salida"
            id="salida"
            name="salida"
            type="time"
            value={form.salida}
            onChange={handleChange}
            required
            error={submitted ? fieldErrors.salida : undefined}
            submitted={submitted}
            hint="Hora local de salida"
          />
        </div>

        <div className="form-row">
          <FormInput
            label="Hora de Llegada"
            id="llegada"
            name="llegada"
            type="time"
            value={form.llegada}
            onChange={handleChange}
            required
            error={submitted ? fieldErrors.llegada : undefined}
            submitted={submitted}
            hint="Hora local de llegada"
          />

          <FormInput
            label="Precio (COP)"
            id="precio"
            name="precio"
            type="number"
            value={form.precio}
            onChange={handleChange}
            required
            error={submitted ? fieldErrors.precio : undefined}
            submitted={submitted}
            min="0"
            step="1000"
            placeholder="350000"
            hint="Precio en pesos colombianos"
          />
        </div>

        <div className="form-row">
          <FormInput
            label="Asientos Disponibles"
            id="asientos"
            name="asientos"
            type="number"
            value={form.asientos}
            onChange={handleChange}
            required
            error={submitted ? fieldErrors.asientos : undefined}
            submitted={submitted}
            min="0"
            max="300"
            placeholder="150"
            hint="Número total de asientos disponibles"
          />
        </div>

        {error && (
          <div className="form-error" role="alert">
            {error}
          </div>
        )}

        <div className="form-actions">
          <Button type="submit" variant="primary" loading={loading}>
            {loading ? 'Guardando...' : (vuelo ? 'Actualizar Vuelo' : 'Crear Vuelo')}
          </Button>
          <Button 
            type="button" 
            variant="secondary" 
            onClick={() => navigate("/admin/vuelos")}
            disabled={loading}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </main>
  );
}