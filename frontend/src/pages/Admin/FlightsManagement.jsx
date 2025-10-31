// pages/Admin/FlightsManagement.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { flights } from "../../data/flights";
import Button from "../../components/Button";
import { formatCurrency } from "../../utils/format";

/**
 * Página para gestionar vuelos existentes (listar, editar, eliminar) y generar reportes PDF
 * 
 * @returns {JSX.Element} Interfaz de gestión de vuelos unificada
 */
export default function FlightsManagement() {
  const navigate = useNavigate();

  const handleEdit = (vuelo) => {
    navigate("/admin/vuelos-editar", { state: { vuelo } });
  };

  const handleDelete = (vueloId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este vuelo?")) {
      console.log("Vuelo eliminado:", vueloId);
      // Nota: En una implementación real, aquí se haría una llamada a la API
      // o se actualizaría el estado global. Por ahora solo muestra en consola.
    }
  };

  const handleCreate = () => {
    navigate("/admin/vuelos-crear");
  };

  const handleDownloadPDF = () => {
    // Simular descarga de PDF
    alert("Descargando informe PDF de vuelos...");
    console.log("Generando PDF con vuelos:", flights);
  };

  return (
    <main className="page">
      <div className="page-header">
        <h1>Gestión de Vuelos</h1>
        <div className="actions">
          <Button variant="primary" onClick={handleCreate}>
            Crear Nuevo Vuelo
          </Button>
          <Button variant="primary" onClick={handleDownloadPDF}>
            Descargar PDF
          </Button>
        </div>
      </div>

      {flights.length === 0 ? (
        <div className="empty">
          <p>No hay vuelos registrados.</p>
        </div>
      ) : (
        <table className="results-table" aria-label="Lista de vuelos">
          <thead>
            <tr>
              <th>Número</th>
              <th>Aerolínea</th>
              <th>Ruta</th>
              <th>Fecha</th>
              <th>Horario</th>
              <th>Precio</th>
              <th>Asientos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((vuelo) => (
              <tr key={vuelo.id}>
                <td>{vuelo.id}</td>
                <td>{vuelo.aerolinea}</td>
                <td>{vuelo.origen} → {vuelo.destino}</td>
                <td>{vuelo.fecha}</td>
                <td>{vuelo.salida} - {vuelo.llegada}</td>
                <td>{formatCurrency(vuelo.precio)}</td>
                <td>{vuelo.asientos}</td>
                <td>
                  <div className="actions">
                    <Button 
                      variant="secondary" 
                      onClick={() => handleEdit(vuelo)}
                      style={{ marginRight: "0.5rem", padding: "0.5rem 1rem" }}
                    >
                      Editar
                    </Button>
                    <Button 
                      variant="secondary" 
                      onClick={() => handleDelete(vuelo.id)}
                      style={{ padding: "0.5rem 1rem" }}
                    >
                      Eliminar
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}