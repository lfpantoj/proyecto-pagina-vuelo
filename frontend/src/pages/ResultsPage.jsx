// src/pages/ResultsPage.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { flights } from "../data/flights";
import Button from "../components/Button";
import { formatCurrency } from "../utils/format";
import { hasCompleteProfile } from "../utils/validators";

/**
 * Flight search results page component that displays filtered flight options
 * based on user search criteria. This page shows available flights matching
 * the search parameters and handles the reservation initiation process with
 * user authentication and profile completeness validation.
 * 
 * The component implements a multi-step validation process for reservations
 * ensuring users are authenticated and have complete profiles before proceeding.
 * 
 * @returns {JSX.Element} Rendered flight results page with search outcomes and booking options
 */
export default function ResultsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const search = location.state || {};

  /**
   * Extracts search parameters from navigation state with default values
   */
  const { origen = "", destino = "", fechaIda = "" } = search;

  /**
   * Filters available flights based on search criteria
   * Matches flights by origin, destination, and departure date
   */
  const filtered = flights.filter(
    (f) => f.origen === origen && f.destino === destino && f.fecha === fechaIda
  );

  /**
   * Handles flight reservation initiation with user validation
   * Implements a three-step validation process:
   * 1. User authentication check
   * 2. Profile completeness validation
   * 3. Reservation confirmation navigation
   * 
   * @param {Object} vuelo - Flight object selected for reservation
   */
  const reservar = (vuelo) => {
    // Step 1: Verify user authentication
    if (!user) {
      navigate("/login", { 
        state: { 
          redirectTo: "/confirmar-reserva",
          vuelo: vuelo,
          message: "Por favor inicia sesión para realizar la reserva"
        } 
      });
    } 
    // Step 2: Verify user profile completeness using centralized validator
    else if (!hasCompleteProfile(user)) {
      navigate("/editar-perfil", { 
        state: { 
          returnTo: "/confirmar-reserva",
          vuelo: vuelo,
          message: "Por favor completa tus datos antes de reservar",
          requireCompleteProfile: true
        } 
      });
    }
    // Step 3: Proceed to reservation confirmation
    else {
      navigate("/confirmar-reserva", { state: { vuelo } });
    }
  };

  return (
    <main className="page">
      <h1>Resultados</h1>
      <p className="muted">
        {origen} → {destino} • {fechaIda}
      </p>

      {/* Results state handling: empty results vs. flight listing */}
      {filtered.length === 0 ? (
        <div className="empty">
          <p>No se encontraron vuelos para esa ruta.</p>
          <Button variant="secondary" onClick={() => navigate("/")}>
            Volver a buscar
          </Button>
        </div>
      ) : (
        <table className="results-table" aria-label="Resultados de vuelos">
          <thead>
            <tr>
              <th>Número</th>
              <th>Aerolínea</th>
              <th>Fecha</th>
              <th>Salida</th>
              <th>Llegada</th>
              <th>Precio</th>
              <th>Asientos</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((v) => (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>{v.aerolinea}</td>
                <td>{v.fecha}</td>
                <td>{v.salida}</td>
                <td>{v.llegada}</td>
                <td>{formatCurrency(v.precio)}</td>
                <td>{v.asientos}</td>
                <td>
                  <Button onClick={() => reservar(v)}>Reservar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}