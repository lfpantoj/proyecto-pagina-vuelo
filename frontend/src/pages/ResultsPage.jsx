// src/pages/ResultsPage.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { flights } from "../data/flights";
import Button from "../components/Button";
import { formatCurrency } from "../utils/format";
import { hasCompleteProfile } from "../utils/validators";

/**
 * Página de resultados de búsqueda de vuelos
 * Muestra vuelos filtrados según criterios de búsqueda y maneja el proceso de reserva
 * con validación de autenticación y perfil de usuario
 */
export default function ResultsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  // Obtiene parámetros de búsqueda del estado de navegación
  const search = location.state || {};

  // Extrae parámetros de búsqueda con valores por defecto
  const { origen = "", destino = "", fechaIda = "" } = search;

  /**
   * Filtra vuelos disponibles según criterios de búsqueda
   * Coincide por origen, destino y fecha de salida
   */
  const filtered = flights.filter(
    (f) => f.origen === origen && f.destino === destino && f.fecha === fechaIda
  );

  /**
   * Maneja el inicio del proceso de reserva de vuelo
   * Implementa validación en tres pasos: autenticación, perfil completo y confirmación
   * @param {Object} vuelo - Objeto de vuelo seleccionado para reserva
   */
  const reservar = (vuelo) => {
    // Paso 1: Verifica si el usuario está autenticado
    if (!user) {
      navigate("/login", { 
        state: { 
          redirectTo: "/confirmar-reserva",
          vuelo: vuelo,
          message: "Por favor inicia sesión para realizar la reserva"
        } 
      });
    } 
    // Paso 2: Verifica que el perfil de usuario esté completo
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
    // Paso 3: Navega a la página de confirmación de reserva
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

      {/* Manejo de estados: resultados vacíos vs lista de vuelos */}
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
