// src/admin/EditarVuelo.js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CrearVuelo.css";

/**
 * Componente para editar un vuelo existente.
 * Carga la información desde localStorage, permite modificarla
 * y actualiza los datos persistentes del sistema.
 */
export default function EditarVuelo({ vuelos, setVuelos }) {
  const { id } = useParams(); // ID del vuelo recibido desde la URL
  const navigate = useNavigate();

  // Estado local para los datos del vuelo a editar
  const [vuelo, setVuelo] = useState({
    id: "",
    numero: "",
    origen: "",
    destino: "",
    fecha: "",
    precio: "",
  });

  // Al cargar el componente, buscar el vuelo por ID
  useEffect(() => {
    const vueloEncontrado = vuelos.find((v) => v.id === id);
    if (vueloEncontrado) {
      setVuelo(vueloEncontrado);
    }
  }, [id, vuelos]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    setVuelo({ ...vuelo, [e.target.name]: e.target.value });
  };

  // Guardar los cambios y actualizar localStorage
  const handleSubmit = (e) => {
    e.preventDefault();

    const vuelosActualizados = vuelos.map((v) =>
      v.id === vuelo.id ? vuelo : v
    );

    setVuelos(vuelosActualizados);
    localStorage.setItem("vuelos", JSON.stringify(vuelosActualizados));

    alert(`Vuelo ${vuelo.numero} actualizado correctamente`);
    navigate("/admin/vuelos");
  };

  // Render del formulario
  return (
    <div className="crear-container">
      <h2> Editar Vuelo</h2>
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
        <input
          type="text"
          name="origen"
          value={vuelo.origen}
          onChange={handleChange}
          required
        />

        <label>Destino:</label>
        <input
          type="text"
          name="destino"
          value={vuelo.destino}
          onChange={handleChange}
          required
        />

        <label>Fecha:</label>
        <input
          type="date"
          name="fecha"
          value={vuelo.fecha}
          onChange={handleChange}
          required
        />

        <label>Precio (COP):</label>
        <input
          type="number"
          name="precio"
          value={vuelo.precio}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn-crear">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}
