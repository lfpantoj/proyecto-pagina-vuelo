import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GestionVuelos.css";

/**
 * Componente para registrar un nuevo vuelo.
 * Permite elegir origen y destino de una lista predefinida.
 */
export default function CrearVuelo({ agregarVuelo }) {
  const [vuelo, setVuelo] = useState({
    numero: "",
    origen: "",
    destino: "",
    fecha: "",
    precio: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setVuelo({ ...vuelo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    agregarVuelo(vuelo);
    alert(`Vuelo ${vuelo.numero} creado exitosamente ✈️`);
    navigate("/admin/vuelos");
  };

  return (
    <div className="gestion-container">
      <h2>Crear Nuevo Vuelo</h2>
      <form className="form-vuelo" onSubmit={handleSubmit}>
        <label>Número de vuelo:</label>
        <input
          type="text"
          name="numero"
          value={vuelo.numero}
          onChange={handleChange}
          required
        />

        <label>Origen:</label>
        <select name="origen" value={vuelo.origen} onChange={handleChange} required>
          <option value="">Seleccione un origen...</option>
          <option>Bogotá</option>
          <option>Medellín</option>
          <option>Cali</option>
          <option>Barranquilla</option>
          <option>Cartagena</option>
          <option>Pereira</option>
          <option>Bucaramanga</option>
        </select>

        <label>Destino:</label>
        <select name="destino" value={vuelo.destino} onChange={handleChange} required>
          <option value="">Seleccione un destino...</option>
          <option>Bogotá</option>
          <option>Medellín</option>
          <option>Cali</option>
          <option>Barranquilla</option>
          <option>Cartagena</option>
          <option>Pereira</option>
          <option>Bucaramanga</option>
        </select>

        <label>Fecha:</label>
        <input type="date" name="fecha" value={vuelo.fecha} onChange={handleChange} required />

        <label>Precio (COP):</label>
        <input
          type="number"
          name="precio"
          value={vuelo.precio}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn-crear">Crear Vuelo</button>
      </form>
    </div>
  );
}
