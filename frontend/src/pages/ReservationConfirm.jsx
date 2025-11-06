// src/pages/ReservationConfirm.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import { formatCurrency } from "../utils/format";

/**
 * Reservation confirmation page component that displays flight and passenger information
 * for final review before payment processing.
 * 
 * @returns {JSX.Element} Rendered reservation confirmation page with flight and passenger details
 */
export default function ReservationConfirm() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const vuelo = state?.vuelo;
  
  /**
   * Passenger state management using only user data from auth context
   */
  const [pasajero, setPasajero] = useState(user);

  /**
   * Effect hook to check for updated passenger data from profile edits
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