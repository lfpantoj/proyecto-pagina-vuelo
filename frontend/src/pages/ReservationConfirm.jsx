// src/pages/ReservationConfirm.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { mockPassenger } from "../data/passenger";
import Button from "../components/Button";
import { formatCurrency } from "../utils/format";

/**
 * Reservation confirmation page component that displays flight and passenger information
 * for final review before payment processing. This page serves as the final checkpoint
 * where users can verify all reservation details and proceed with payment.
 * 
 * The component handles passenger data updates from profile edits and provides
 * navigation to both profile updates and payment completion flows.
 * 
 * @returns {JSX.Element} Rendered reservation confirmation page with flight and passenger details
 */
export default function ReservationConfirm() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const vuelo = state?.vuelo;
  
  /**
   * Passenger state management with fallback to mock data
   * Prioritizes authenticated user data, falls back to mock passenger for demonstration
   */
  const [pasajero, setPasajero] = useState(user || mockPassenger);

  /**
   * Effect hook to check for updated passenger data from profile edits
   * Retrieves and applies any passenger updates stored in localStorage
   * from the profile editing flow
   */
  useEffect(() => {
    const savedPasajero = localStorage.getItem('updatedPasajero');
    if (savedPasajero) {
      setPasajero(JSON.parse(savedPasajero));
      localStorage.removeItem('updatedPasajero');
    }
  }, []);

  /**
   * Error state handling for missing flight information
   * Renders error message and navigation when flight data is not available
   */
  if (!vuelo) {
    return (
      <main className="page">
        <div className="error">
          No hay información del vuelo.{" "}
          <Button variant="secondary" onClick={() => navigate("/")}>
            Volver
          </Button>
        </div>
      </main>
    );
  }

  /**
   * Handles navigation to profile editing page for passenger data updates
   * Preserves current context for return navigation after profile updates
   */
  const handleUpdateData = () => {
    navigate("/editar-perfil", { 
      state: { 
        pasajero: user,
        returnTo: "/confirmar-reserva",
        fromConfirmation: true
      } 
    });
  };

  /**
   * Handles payment process initiation
   * Navigates to success page with flight and passenger data for confirmation display
   */
  const handlePayment = () => {
    navigate("/reserva-exitosa", { 
      state: { vuelo, pasajero } 
    });
  };

  return (
    <main className="page">
      <header className="header">
        <h1>Confirmar reserva</h1>
        <p className="muted">Revisa los datos antes de pagar</p>
      </header>

      {/* Flight information section */}
      <section className="card">
        <h3>Vuelo</h3>
        <p><strong>{vuelo.id}</strong> — {vuelo.origen} → {vuelo.destino}</p>
        <p>{vuelo.fecha} • {vuelo.salida} - {vuelo.llegada}</p>
        <p>{vuelo.aerolinea} • {formatCurrency(vuelo.precio)}</p>
      </section>

      {/* Passenger information section with update capability */}
      <section className="card">
        <h3>Pasajero</h3>
        <p><strong>Nombre:</strong> {pasajero?.nombre}</p>
        <p><strong>Documento:</strong> {pasajero?.documento}</p>
        <p><strong>Email:</strong> {pasajero?.correo}</p>
        <p><strong>Celular:</strong> {pasajero?.celular}</p>
        <p><strong>Nacimiento:</strong> {pasajero?.nacimiento}</p>
        
        <div className="actions">
          <Button onClick={handleUpdateData} variant="secondary">
            Actualizar datos
          </Button>
        </div>
      </section>

      {/* Payment action section */}
      <div className="actions" style={{ marginTop: "2rem", textAlign: "center" }}>
        <Button onClick={handlePayment} variant="primary">
          Pagar {formatCurrency(vuelo.precio)}
        </Button>
      </div>
    </main>
  );
}