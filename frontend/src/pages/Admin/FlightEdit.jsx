import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/Button";
import FormInput from "../../components/FormInput";
import FormSelect from "../../components/FormSelect";
import { useForm } from "../../hooks/useForm";
import { createFlight, updateFlight } from "../../utils/api";
import { flightSchema } from "../../utils/validationSchemas";
import { AIRLINES } from "../../data/airlines";

const CIUDADES = [
    { value: "BOG", label: "Bogotá" },
    { value: "MED", label: "Medellín" },
    { value: "CAL", label: "Cali" },
    { value: "CAR", label: "Cartagena" },
    { value: "BAQ", label: "Barranquilla" },
    { value: "SMR", label: "Santa Marta" },
];

export default function FlightEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  // Obtiene datos del vuelo desde la ubicación si está en modo edición
  const { vuelo } = location.state || {};

  // Maneja el envío del formulario para crear o actualizar vuelos
  const onSubmit = async (formData) => {
    try {
        const flightData = { 
            ...formData, 
            precio: Number(formData.precio), 
            disponibles: Number(formData.disponibles) 
        };
        if (vuelo) {
            await updateFlight(vuelo.id, flightData);
        } else {
            await createFlight(flightData);
        }
        navigate("/admin/vuelos");
    } catch (error) {
        console.error("Error saving flight:", error);
    }
  };

  // Utiliza el hook useForm para manejar estado y validaciones del formulario
  const {
    form,
    error,
    loading,
    submitted,
    fieldErrors,
    handleChange,
    handleSubmit
  } = useForm(
    // Estado inicial del formulario: datos del vuelo o valores vacíos
    vuelo || {
      origen: "",
      destino: "",
      fecha: "",
      horaSalida: "",
      horaLlegada: "",
      precio: "",
      disponibles: "",
      aerolinea: ""
    },
    flightSchema,
    onSubmit
  );

  return (
    <main className="page">
      {/* Título dinámico según modo edición/creación */}
      <h1>{vuelo ? "Editar Vuelo" : "Crear Vuelo"}</h1>

      <form onSubmit={handleSubmit} noValidate className="form-container">
        {/* Primera fila: Origen y destino */}
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

        {/* Segunda fila: Fecha y hora de salida */}
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
            // Establece fecha mínima como el día actual
            min={new Date().toISOString().split('T')[0]}
          />

          <FormInput
            label="Hora de Salida"
            id="horaSalida"
            name="horaSalida"
            type="time"
            value={form.horaSalida}
            onChange={handleChange}
            required
            error={submitted ? fieldErrors.horaSalida : undefined}
            submitted={submitted}
            hint="Hora local de salida"
          />
        </div>

        {/* Tercera fila: Hora de llegada y precio */}
        <div className="form-row">
          <FormInput
            label="Hora de Llegada"
            id="horaLlegada"
            name="horaLlegada"
            type="time"
            value={form.horaLlegada}
            onChange={handleChange}
            required
            error={submitted ? fieldErrors.horaLlegada : undefined}
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

        {/* Cuarta fila: Aerolínea y Asientos disponibles */}
        <div className="form-row">
          <FormSelect
            label="Aerolínea"
            id="aerolinea"
            name="aerolinea"
            value={form.aerolinea}
            onChange={handleChange}
            required
            options={AIRLINES}
            placeholder="Seleccione aerolínea"
            error={submitted ? fieldErrors.aerolinea : undefined}
            submitted={submitted}
            hint="Aerolínea que opera el vuelo"
          />

          <FormInput
            label="Asientos Disponibles"
            id="disponibles"
            name="disponibles"
            type="number"
            value={form.disponibles}
            onChange={handleChange}
            required
            error={submitted ? fieldErrors.disponibles : undefined}
            submitted={submitted}
            min="0"
            max="300"
            placeholder="150"
            hint="Número total de asientos disponibles"
          />
        </div>

        {/* Muestra error general del formulario si existe */}
        {error && (
          <div className="form-error" role="alert">
            {error}
          </div>
        )}

        {/* Acciones del formulario: guardar y cancelar */}
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

