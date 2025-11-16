// src/pages/ReservationSuccess.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../components/Button";
import { formatCurrency } from "../utils/format";

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
  const { vuelo, pasajero } = state || {};

  // Maneja el estado de error cuando faltan datos de reserva
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

  // Objeto de datos de confirmación de reserva
  const reserva = {
    // Genera un número de reserva único
    numero: Math.random().toString(36).slice(2, 9).toUpperCase(),
    // Formatea la fecha de reserva en español colombiano
    fechaReserva: new Date().toLocaleDateString("es-CO", { 
      year: "numeric", 
      month: "short", 
      day: "numeric" 
    }),
    estado: "Confirmada",
  };

  return (
    <main className="page">
      {/* Encabezado de confirmación exitosa con indicador visual */}
      <header className="header header--success">
        <CheckCircle size={48} className="icon-success" />
        <div>
          <h1>Reserva confirmada</h1>
          <p className="muted">Número: {reserva.numero}</p>
        </div>
      </header>

      {/* Sección de detalles del vuelo con etiquetado accesible */}
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

      {/* Sección de información del pasajero */}
      <section className="card" aria-labelledby="pasajero-title">
        <h3 id="pasajero-title">Pasajero</h3>
        <p><strong>Nombre:</strong> {pasajero.nombre}</p>
        <p><strong>Documento:</strong> {pasajero.documento}</p>
        <p><strong>Email:</strong> {pasajero.correo}</p>
      </section>

      {/* Sección de metadatos de la reserva */}
      <section className="card" aria-labelledby="reserva-title">
        <h3 id="reserva-title">Información de la Reserva</h3>
        <p><strong>Número de reserva:</strong> {reserva.numero}</p>
        <p><strong>Fecha de reserva:</strong> {reserva.fechaReserva}</p>
        <p><strong>Estado:</strong> {reserva.estado}</p>
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
