// src/admin/Reportes.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Reportes.css";

/**
 * Componente: Reportes
 * ---------------------
 * Muestra estadísticas generales del sistema:
 * - Total de vuelos registrados
 * - Total de pasajeros
 * - Ingresos estimados
 * - Lista rápida de vuelos con ocupación
 */
function Reportes() {
  const [vuelos, setVuelos] = useState([]);

  // Cargar datos de vuelos guardados en localStorage
  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem("vuelos")) || [];
    setVuelos(guardados);
  }, []);

  // Calcular totales
  const totalVuelos = vuelos.length;
  const totalPasajeros = vuelos.reduce(
    (acum, vuelo) => acum + (vuelo.pasajeros || 0),
    0
  );
  const totalIngresos = vuelos.reduce(
    (acum, vuelo) => acum + (vuelo.precio || 0),
    0
  );

  return (
    <div className="reportes-container">
      <h2>📊 Reporte General del Sistema</h2>
      <p>Visualiza las estadísticas globales de vuelos y pasajeros.</p>

      {/* Tarjetas de resumen */}
      <div className="resumen-grid">
        <div className="card">
          <h3>✈️ Total de Vuelos</h3>
          <p>{totalVuelos}</p>
        </div>
        <div className="card">
          <h3>🧍‍♂️ Total de Pasajeros</h3>
          <p>{totalPasajeros}</p>
        </div>
        <div className="card">
          <h3>💰 Ingresos Totales</h3>
          <p>${totalIngresos.toLocaleString()}</p>
        </div>
      </div>

      {/* Tabla con información de vuelos */}
      <div className="tabla-vuelos">
        <h3>📋 Detalle de Vuelos Registrados</h3>
        {vuelos.length === 0 ? (
          <p>No hay vuelos registrados.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>N° Vuelo</th>
                <th>Origen</th>
                <th>Destino</th>
                <th>Fecha</th>
                <th>Precio</th>
                <th>Pasajeros</th>
              </tr>
            </thead>
            <tbody>
              {vuelos.map((vuelo) => (
                <tr key={vuelo.id}>
                  <td>{vuelo.numero}</td>
                  <td>{vuelo.origen}</td>
                  <td>{vuelo.destino}</td>
                  <td>{vuelo.fecha}</td>
                  <td>${vuelo.precio.toLocaleString()}</td>
                  <td>{vuelo.pasajeros || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Botón de volver */}
      <div className="acciones">
        <Link to="/admin/vuelos" className="btn-volver">
          ← Volver a Gestión de Vuelos
        </Link>
      </div>
    </div>
  );
}

export default Reportes;
