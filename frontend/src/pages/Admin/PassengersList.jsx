// pages/Admin/PassengersList.jsx
import React, { useState } from "react";
import { flights } from "../../data/flights";
import { passengersByFlight } from "../../data/passenger";
import Button from "../../components/Button";
import FormSelect from "../../components/FormSelect";

/**
 * Página para generar listas de pasajeros por vuelo con opción de descargar PDF
 * 
 * @returns {JSX.Element} Lista de pasajeros por vuelo
 */
export default function PassengersList() {
  const [selectedFlight, setSelectedFlight] = useState("");

  const selectedPassengers = selectedFlight ? passengersByFlight[selectedFlight] || [] : [];

  const handleDownloadPDF = () => {
    if (!selectedFlight) {
      alert("Por favor selecciona un vuelo primero");
      return;
    }
    // Simular descarga de PDF
    alert(`Descargando lista de pasajeros para vuelo ${selectedFlight}...`);
    console.log("Generando PDF con pasajeros:", selectedPassengers);
  };

  const flightOptions = flights.map(flight => ({
    value: flight.id,
    label: `${flight.id} - ${flight.origen} → ${flight.destino} (${flight.fecha})`
  }));

  return (
    <main className="page">
      <h1>Lista de Pasajeros por Vuelo</h1>

      <div className="form-container">
        <FormSelect
          label="Seleccionar Vuelo"
          id="flightSelect"
          name="flightSelect"
          value={selectedFlight}
          onChange={(e) => setSelectedFlight(e.target.value)}
          options={[{ value: "", label: "Seleccione un vuelo" }, ...flightOptions]}
          placeholder="Seleccione un vuelo"
        />

        <div className="form-actions">
          <Button 
            variant="primary" 
            onClick={handleDownloadPDF}
            disabled={!selectedFlight}
          >
            Descargar PDF de Pasajeros
          </Button>
        </div>
      </div>

      {selectedFlight && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Pasajeros - Vuelo {selectedFlight}</h2>
          
          {selectedPassengers.length === 0 ? (
            <div className="empty">
              <p>No hay pasajeros registrados para este vuelo.</p>
            </div>
          ) : (
            <table className="results-table" aria-label={`Pasajeros del vuelo ${selectedFlight}`}>
              <thead>
                <tr>
                  <th>Documento</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Celular</th>
                  <th>Fecha Nacimiento</th>
                </tr>
              </thead>
              <tbody>
                {selectedPassengers.map((pasajero, index) => (
                  <tr key={index}>
                    <td>{pasajero.documento}</td>
                    <td>{pasajero.nombre}</td>
                    <td>{pasajero.correo}</td>
                    <td>{pasajero.celular}</td>
                    <td>{pasajero.nacimiento}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </main>
  );
}