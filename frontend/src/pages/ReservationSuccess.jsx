// src/pages/ReservationSuccess.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../components/Button";
import { formatCurrency } from "../utils/format";

/**
 * SVG icon component for success confirmation visual indicator
 * Provides a scalable checkmark icon with configurable size and styling
 * 
 * @param {Object} props - Icon properties
 * @param {number} props.size - Icon dimensions in pixels
 * @param {string} props.className - Additional CSS classes for styling
 * @returns {JSX.Element} Check circle SVG icon
 */
const CheckCircle = ({ size = 48, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    className={className}
    aria-hidden="true"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
    />
  </svg>
);

/**
 * Reservation success page component that displays confirmation details
 * after a successful flight reservation. This page provides users with
 * a comprehensive summary of their booking including reservation number,
 * flight details, passenger information, and post-booking actions.
 * 
 * The component generates a unique reservation number and provides
 * functionality for printing reservation details and starting new bookings.
 * 
 * @returns {JSX.Element} Rendered reservation success page with booking confirmation
 */
export default function ReservationSuccess() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { vuelo, pasajero } = state || {};

  /**
   * Error state handling for missing reservation data
   * Renders error message and navigation when essential reservation data is unavailable
   */
  if (!vuelo || !pasajero) {
    return (
      <main className="page">
        <div className="error">
          <h2>No se encontraron datos de reserva</h2>
          <Button variant="secondary" onClick={() => navigate("/")}>
            Ir al inicio
          </Button>
        </div>
      </main>
    );
  }

  /**
   * Reservation confirmation data object
   * Generates unique reservation number and captures booking metadata
   * 
   * @type {Object}
   * @property {string} numero - Unique reservation identifier
   * @property {string} fechaReserva - Formatted reservation date
   * @property {string} estado - Reservation status indicator
   */
  const reserva = {
    numero: Math.random().toString(36).slice(2, 9).toUpperCase(),
    fechaReserva: new Date().toLocaleDateString("es-CO", { 
      year: "numeric", 
      month: "short", 
      day: "numeric" 
    }),
    estado: "Confirmada",
  };

  return (
    <main className="page">
      {/* Success confirmation header with visual indicator */}
      <header className="header header--success">
        <CheckCircle size={48} className="icon-success" />
        <div>
          <h1>Reserva confirmada</h1>
          <p className="muted">Número: {reserva.numero}</p>
        </div>
      </header>

      {/* Flight details section with accessible labeling */}
      <section className="card" aria-labelledby="vuelo-title">
        <h3 id="vuelo-title">Vuelo</h3>
        <p>
          <strong>{vuelo.id}</strong> — {vuelo.origen} → {vuelo.destino}
        </p>
        <p>
          {vuelo.fecha} • {vuelo.salida} - {vuelo.llegada}
        </p>
        <p>
          {vuelo.aerolinea} • {formatCurrency(vuelo.precio)}
        </p>
      </section>

      {/* Passenger information section */}
      <section className="card" aria-labelledby="pasajero-title">
        <h3 id="pasajero-title">Pasajero</h3>
        <p><strong>Nombre:</strong> {pasajero.nombre}</p>
        <p><strong>Documento:</strong> {pasajero.documento}</p>
        <p><strong>Email:</strong> {pasajero.correo}</p>
      </section>

      {/* Reservation metadata section */}
      <section className="card" aria-labelledby="reserva-title">
        <h3 id="reserva-title">Información de la Reserva</h3>
        <p><strong>Número de reserva:</strong> {reserva.numero}</p>
        <p><strong>Fecha de reserva:</strong> {reserva.fechaReserva}</p>
        <p><strong>Estado:</strong> {reserva.estado}</p>
      </section>

      {/* Post-reservation action buttons */}
      <div className="actions">
        <Button 
          onClick={() => window.print()}
          aria-label="Imprimir comprobante de reserva"
        >
          Imprimir
        </Button>
        <Button 
          variant="secondary" 
          onClick={() => navigate("/")}
        >
          Nueva reserva
        </Button>
      </div>
    </main>
  );
}