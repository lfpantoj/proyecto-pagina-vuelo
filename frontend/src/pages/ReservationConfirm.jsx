// src/pages/ReservationConfirm.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import { formatCurrency } from "../utils/format";

/**
 * Componente de página de confirmación de reserva que muestra la información del vuelo
 * y del pasajero para su revisión final antes del procesamiento del pago.
 * 
 * @returns {JSX.Element} Se muestra la página de confirmación de reserva con los detalles del vuelo y del pasajero.
 */
export default function ReservationConfirm() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const vuelo = state?.vuelo;

    /**
     * Gestión del estado del pasajero utilizando únicamente datos de usuario del contexto de autenticación.
     */
    const [pasajero, setPasajero] = useState(user);

    /**
     * Gancho de efecto para comprobar si hay datos de pasajeros actualizados tras las modificaciones de perfil
     */
    useEffect(() => {
        const savedPasajero = localStorage.getItem('updatedPasajero');
        if (savedPasajero) {
            setPasajero(JSON.parse(savedPasajero));
            localStorage.removeItem('updatedPasajero');
        }
    }, []);

    /**
     * Gestión de errores en caso de falta de información de vuelo
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
     * Gestiona la navegación a la página de edición de perfil para las actualizaciones de datos de pasajeros.
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
     *Gestiona el inicio del proceso de pago
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

            {/* Sección de información de vuelos */}
            <section className="card">
                <h3>Vuelo</h3>
                <p><strong>{vuelo.id}</strong> — {vuelo.origen} → {vuelo.destino}</p>
                <p>{vuelo.fecha} • {vuelo.salida} - {vuelo.llegada}</p>
                <p>{vuelo.aerolinea} • {formatCurrency(vuelo.precio)}</p>
            </section>

            {/* Sección de información para pasajeros con capacidad de actualización */}
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

            {/* Sección de acciones de pago */}
            <div className="actions" style={{ marginTop: "2rem", textAlign: "center" }}>
                <Button onClick={handlePayment} variant="primary">
                    Pagar {formatCurrency(vuelo.precio)}
                </Button>
            </div>
        </main>
    );
}