// pages/Admin/FlightsManagement.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFlights, deleteFlight, downloadFlightsPDF } from "../../utils/api";
import Button from "../../components/Button";
import { formatCurrency } from "../../utils/format";

/**
 * Página para gestionar vuelos existentes (listar, editar, eliminar) y generar reportes PDF
 * 
 * @returns {JSX.Element} Interfaz de gestión de vuelos unificada
 */
export default function FlightsManagement() {
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const flightsData = await getFlights();
        setFlights(flightsData);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };
    fetchFlights();
  }, []);

  const handleEdit = (vuelo) => {
    navigate("/admin/vuelos-editar", { state: { vuelo } });
  };

  const handleDelete = async (vueloId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este vuelo?")) {
      try {
        await deleteFlight(vueloId);
        setFlights(flights.filter((vuelo) => vuelo.id !== vueloId));
      } catch (error) {
        console.error("Error deleting flight:", error);
      }
    }
  };

  const handleCreate = () => {
    navigate("/admin/vuelos-crear");
  };

  const handleDownloadPDF = async () => {
    try {
      const blob = await downloadFlightsPDF();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'reporte_vuelos.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("Error al descargar el informe PDF.");
    }
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
        <div className="table-container">
          <table className="results-table" aria-label="Lista de vuelos">
            <thead>
              <tr>
                <th>Número</th>
                <th>Ruta</th>
                <th>Aerolínea</th>
                <th>Fecha</th>
                <th>Hora de Salida</th>
                <th>Hora de Llegada</th>
                <th>Precio</th>
                <th>Disponibles</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {flights.map((vuelo) => (
                <tr key={vuelo.id}>
                  <td>{vuelo.id}</td>
                  <td>{vuelo.origen} → {vuelo.destino}</td>
                  <td>{vuelo.aerolinea}</td>
                  <td>{vuelo.fecha}</td>
                  <td>{vuelo.horaSalida}</td>
                  <td>{vuelo.horaLlegada}</td>
                  <td>{formatCurrency(vuelo.precio)}</td>
                  <td>{vuelo.disponibles}</td>
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
        </div>
      )}
    </main>
  );
}