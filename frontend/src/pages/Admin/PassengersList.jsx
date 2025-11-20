// pages/Admin/PassengersList.jsx
import React, { useState, useEffect } from "react";
import { getFlights, getReservationsByFlight, downloadPassengersPDF } from "../../utils/api";
import Button from "../../components/Button";
import FormSelect from "../../components/FormSelect";

/**
 * Página para generar listas de pasajeros por vuelo con opción de descargar PDF
 * 
 * @returns {JSX.Element} Lista de pasajeros por vuelo
 */
export default function PassengersList() {
  const [selectedFlight, setSelectedFlight] = useState("");
  const [flights, setFlights] = useState([]);
  const [passengers, setPassengers] = useState([]);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [errorPdf, setErrorPdf] = useState(null);

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

  useEffect(() => {
    if (selectedFlight) {
      const fetchPassengers = async () => {
        try {
          const reservations = await getReservationsByFlight(selectedFlight);
          const passengersData = reservations.map(r => r.usuario);
          setPassengers(passengersData);
        } catch (error) {
          console.error("Error fetching passengers:", error);
        }
      };
      fetchPassengers();
    } else {
      setPassengers([]);
    }
  }, [selectedFlight]);

  const handleDownloadPDF = async () => {
    if (!selectedFlight) {
      alert("Por favor selecciona un vuelo primero");
      return;
    }
    setLoadingPdf(true);
    setErrorPdf(null);
    try {
      const pdfBlob = await downloadPassengersPDF(selectedFlight);
      const url = window.URL.createObjectURL(new Blob([pdfBlob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `pasajeros_vuelo_${selectedFlight}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      setErrorPdf("Error al descargar el PDF.");
      console.error("Error downloading PDF:", error);
    } finally {
      setLoadingPdf(false);
    }
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
          options={flightOptions}
          placeholder="Seleccione un vuelo"
        />

        <div className="form-actions">
          <Button 
            variant="primary" 
            onClick={handleDownloadPDF}
            disabled={!selectedFlight || loadingPdf}
            loading={loadingPdf}
          >
            {loadingPdf ? 'Descargando...' : 'Descargar PDF de Pasajeros'}
          </Button>
        </div>
        {errorPdf && <div className="form-error" style={{marginTop: '1rem'}}>{errorPdf}</div>}
      </div>

      {selectedFlight && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Pasajeros - Vuelo {selectedFlight}</h2>
          
          {passengers.length === 0 ? (
            <div className="empty">
              <p>No hay pasajeros registrados para este vuelo.</p>
            </div>
          ) : (
            <div className="table-container">
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
                  {passengers.map((pasajero, index) => (
                    <tr key={index}>
                      <td>{pasajero.numeroDocumento}</td>
                      <td>{`${pasajero.primerNombre} ${pasajero.segundoNombre || ''} ${pasajero.primerApellido} ${pasajero.segundoApellido || ''}`.trim()}</td>
                      <td>{pasajero.username}</td>
                      <td>{pasajero.numeroCelular}</td>
                      <td>{pasajero.fechaNacimiento}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </main>
  );
}