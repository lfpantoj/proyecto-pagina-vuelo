// src/admin/GestionVuelos.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./GestionVuelos.css";

/**
 * Componente para gestionar la lista de vuelos.
 * Permite buscar, editar, eliminar y acceder a la lista de pasajeros de cada vuelo.
 */
export default function GestionVuelos({ vuelos, setVuelos }) {
  const [busqueda, setBusqueda] = useState("");

  // Filtrar vuelos por número, origen o destino
  const vuelosFiltrados = vuelos.filter(
    (v) =>
      v.numero.toLowerCase().includes(busqueda.toLowerCase()) ||
      v.origen.toLowerCase().includes(busqueda.toLowerCase()) ||
      v.destino.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Eliminar vuelo
  const eliminarVuelo = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este vuelo?")) {
      const nuevosVuelos = vuelos.filter((v) => v.id !== id);
      setVuelos(nuevosVuelos);
      localStorage.setItem("vuelos", JSON.stringify(nuevosVuelos));
    }
  };

  return (
    <div className="gestion-container">
      <header>
        <h2>✈️ Gestión de Vuelos</h2>
        <p>Administra, busca y gestiona los vuelos registrados en el sistema.</p>

        {/* Campo de búsqueda */}
        <input
          type="text"
          placeholder="Buscar vuelo por número, origen o destino..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="input-busqueda"
        />

        {/* Botón para crear nuevo vuelo */}
        <Link to="/admin/vuelos/nuevo" className="btn-nuevo">
          + Crear Nuevo Vuelo
        </Link>
      </header>

      {/* Tabla de vuelos */}
      <div className="tabla-container">
        {vuelosFiltrados.length === 0 ? (
          <p className="sin-vuelos">No hay vuelos registrados.</p>
        ) : (
          <table className="tabla-vuelos">
            <thead>
              <tr>
                <th>N° Vuelo</th>
                <th>Origen</th>
                <th>Destino</th>
                <th>Fecha</th>
                <th>Precio</th>
                <th>Pasajeros</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {vuelosFiltrados.map((vuelo) => (
                <tr key={vuelo.id}>
                  <td>{vuelo.numero}</td>
                  <td>{vuelo.origen}</td>
                  <td>{vuelo.destino}</td>
                  <td>{vuelo.fecha}</td>
                  <td>${Number(vuelo.precio).toLocaleString()}</td>
                  <td>{vuelo.pasajeros || 0}</td>
                  <td>
                    <Link
                      to={`/admin/vuelos/editar/${vuelo.id}`}
                      className="btn-editar"
                    >
                      Editar
                    </Link>
                    <Link
                      to={`/admin/pasajeros/${vuelo.id}`}
                      className="btn-ver"
                    >
                      Ver Pasajeros
                    </Link>
                    <button
                      onClick={() => eliminarVuelo(vuelo.id)}
                      className="btn-eliminar"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
