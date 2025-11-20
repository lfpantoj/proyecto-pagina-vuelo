// src/pages/ReservationSuccess.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../components/Button";
import { formatCurrency } from "../utils/format";
import { getCityName } from "../data/cities";
import "./ReservationConfirm.css"; // Reusing the same styles

/**
 * Componente de icono SVG para indicador visual de confirmación exitosa
 * Proporciona un icono de verificación escalable con tamaño y estilo configurable
 */
const CheckCircle = ({ size = 48, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    className={className}
    // Oculta el icono de los lectores de pantalla
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
 * Componente de página de confirmación exitosa de reserva
 * Muestra los detalles de confirmación después de una reserva de vuelo exitosa
 */
export default function ReservationSuccess() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { vuelo, pasajero, cantidad, reserva } = state || {};

  // Maneja el estado de error cuando faltan datos de reserva
  if (!vuelo || !pasajero || !reserva) {
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

  const total = vuelo.precio * cantidad;

  return (
    <main className="page">
      {/* Encabezado de confirmación exitosa con indicador visual */}
      <header className="header header--success">
        <CheckCircle size={48} className="icon-success" />
        <div>
          <h1>Reserva confirmada</h1>
          <p className="muted">Número: {reserva.id}</p>
        </div>
      </header>

      <div className="card-group">
        {/* Sección combinada de detalles del vuelo y pasajero */}
        <section className="card flight-passenger-details-card">
          <h3 id="vuelo-title">Detalles del Vuelo y Pasajero</h3>
          <div className="flight-details-route">
            <div className="route-city">
              <span className="route-label">Origen</span>
              <span className="route-name">{getCityName(vuelo.origen)}</span>
            </div>
            <div className="route-arrow">→</div>
            <div className="route-city">
              <span className="route-label">Destino</span>
              <span className="route-name">{getCityName(vuelo.destino)}</span>
            </div>
          </div>
          <div className="flight-details-info">
            <p><strong>Fecha:</strong> {vuelo.fecha}</p>
            <p><strong>Salida:</strong> {vuelo.horaSalida}</p>
            <p><strong>Llegada:</strong> {vuelo.horaLlegada}</p>
            <p><strong>Aerolínea:</strong> {vuelo.aerolinea || 'N/A'}</p>
          </div>
          <hr style={{margin: '1.5rem 0', border: 'none', borderTop: '1px solid #eee'}} />
          <h4 style={{marginBottom: '1rem'}}>Pasajero Principal</h4>
          <div className="passenger-details-info">
            <p><strong>Nombre:</strong> {pasajero.nombre}</p>
            <p><strong>Documento:</strong> {pasajero.documento}</p>
            <p><strong>Email:</strong> {pasajero.correo}</p>
          </div>
        </section>
      </div>

      {/* Sección de metadatos de la reserva */}
      <section className="card passenger-details-card" aria-labelledby="reserva-title" style={{marginTop: '2rem'}}>
        <h3 id="reserva-title">Información de la Reserva</h3>
        <div className="passenger-details-info">
          <p><strong>Número de reserva:</strong> {reserva.id}</p>
          <p><strong>Pasajeros:</strong> {cantidad}</p>
          <p><strong>Total Pagado:</strong> {formatCurrency(total)}</p>
          <p><strong>Estado:</strong> {reserva.estado}</p>
        </div>
      </section>

      {/* Botones de acción posteriores a la reserva */}
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
