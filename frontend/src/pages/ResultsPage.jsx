// src/pages/ResultsPage.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { flights } from "../data/flights";
import Button from "../components/Button";
import { formatCurrency } from "../utils/format";
import { hasCompleteProfile } from "../utils/validators";

/**
 * Componente de página de resultados de búsqueda de vuelos que muestra opciones filtradas según los criterios de búsqueda del usuario.
 * Esta página muestra los vuelos disponibles que coinciden con los parámetros de búsqueda y gestiona el proceso de reserva,
 * incluyendo la autenticación del usuario y la validación de que el perfil esté completo.
 * 
 * El componente implementa un proceso de validación de varios pasos para las reservas,
 * asegurando que los usuarios estén autenticados y tengan perfiles completos antes de continuar.
 * 
 * @returns {JSX.Element} Página con resultados de búsqueda y opciones de reserva.
 */
export default function ResultsPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    const search = location.state || {};

    /**
     * Extrae los parámetros de búsqueda del estado de navegación con valores predeterminados.
     */
    const { origen = "", destino = "", fechaIda = "" } = search;

    /**
     * Filtra los vuelos disponibles según los criterios de búsqueda.
     * Busca vuelos por origen, destino y fecha de salida.
     */
    const filtered = flights.filter(
        (f) => f.origen === origen && f.destino === destino && f.fecha === fechaIda
    );

    /**
     * Gestiona el inicio de la reserva de vuelos con validación de usuario.
     * Implementa un proceso de validación de tres pasos:
     * 1. Comprobación de la autenticación del usuario.
     * 2. Validación de que el perfil esté completo.
     * 3. Confirmación de la reserva.
     * 
     * @param {Object} vuelo - Objeto de vuelo seleccionado para reserva
     */
    const reservar = (vuelo) => {
        // Paso 1: Verificar la autenticación del usuario
        if (!user) {
            navigate("/login", {
                state: {
                    redirectTo: "/confirmar-reserva",
                    vuelo: vuelo,
                    message: "Por favor inicia sesión para realizar la reserva"
                }
            });
        }
        // Paso 2: Verificar que el perfil del usuario esté completo mediante un validador centralizado.
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
        // Paso 3: Proceda a la confirmación de la reserva
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

            {/* Gestión del estado de los resultados: resultados vacíos frente a listado de vuelos */}
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