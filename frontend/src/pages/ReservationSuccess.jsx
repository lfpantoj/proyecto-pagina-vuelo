// src/pages/ReservationSuccess.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../components/Button";
import { formatCurrency } from "../utils/format";

/**
 * Componente de icono SVG para indicador visual de confirmación de éxito.
 * Proporciona un icono de marca de verificación escalable con tamaño y estilo configurables.
 * 
 * @param {Object} props - Propiedades del icono
 * @param {number} props.size - Dimensiones del icono en píxeles
 * @param {string} props.className - Clases CSS adicionales para dar estilo
 * @returns {JSX.Element} Icono SVG de círculo de verificación
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
 * Componente de página de confirmación de reserva que muestra los detalles tras una reserva de vuelo exitosa.
 * Esta página proporciona a los usuarios un resumen completo de su reserva, incluyendo el número de reserva,
 * los detalles del vuelo, la información del pasajero y las acciones posteriores a la reserva.
 * 
 * El componente genera un número de reserva único y proporciona
 * funcionalidades para imprimir los detalles de la reserva e iniciar nuevas reservas.
 * 
 * @returns {JSX.Element} Se muestra la página de confirmación de reserva.
 */
export default function ReservationSuccess() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { vuelo, pasajero } = state || {};

    /**
     * Gestión de errores por falta de datos de reserva: Muestra un mensaje
     * de error y navegación cuando no están disponibles datos esenciales de la reserva.
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
     * Objeto de datos de confirmación de reserva
     * Genera un número de reserva único y captura los metadatos de la reserva.
     * 
     * @type {Object}
     * @property {string} numero - Identificador único de reserva
     * @property {string} fechaReserva - Fecha de reserva formateada
     * @property {string} estado - Indicador de estado de reserva
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
            {/* Encabezado de confirmación de éxito con indicador visual */}
            <header className="header header--success">
                <CheckCircle size={48} className="icon-success" />
                <div>
                    <h1>Reserva confirmada</h1>
                    <p className="muted">Número: {reserva.numero}</p>
                </div>
            </header>

            {/* Sección de detalles de vuelo con etiquetado accesible */}
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

            {/* Sección de información para pasajeros */}
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