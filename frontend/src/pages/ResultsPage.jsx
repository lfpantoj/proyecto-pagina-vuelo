import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import { formatCurrency } from "../utils/format";
import { hasCompleteProfile } from "../utils/validators";
import { getFlights } from '../utils/api';
import { getCityName } from '../data/cities';
import './ResultsPage.css';

export default function ResultsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const search = location.state || {};

  const { origen = "", destino = "", fechaIda = "" } = search;

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const data = await getFlights();
        setFlights(data);
      } catch (err) {
        setError('No se pudo conectar con el servidor para obtener los vuelos.');
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  const filtered = flights.filter(
    (f) => f.origen === origen && f.destino === destino && f.fecha === fechaIda
  );

  const reservar = (vuelo) => {
    if (!user) {
      navigate("/login", { 
        state: { 
          redirectTo: "/confirmar-reserva",
          vuelo: vuelo,
          message: "Por favor inicia sesión para realizar la reserva"
        } 
      });
    } 
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
    else {
      navigate("/confirmar-reserva", { state: { vuelo, pasajeros: search.pasajeros } });
    }
  };

  if (loading) {
    return <main className="page"><p>Cargando vuelos...</p></main>;
  }

  if (error) {
    return <main className="page"><p>Error: {error}</p></main>;
  }

  return (
    <main className="page results-page">
      <div className="results-header">
        <h1>Vuelos Disponibles</h1>
        <p className="muted">
          {getCityName(origen)} → {getCityName(destino)} • {fechaIda}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="empty">
          <p>No se encontraron vuelos para la ruta y fecha seleccionadas.</p>
          <Button variant="secondary" onClick={() => navigate("/")}>
            Volver a buscar
          </Button>
        </div>
      ) : (
        <div className="flights-list">
          {filtered.map((v) => (
            <div key={v.id} className="flight-card">
              <div className="flight-card__content">
                <div className="flight-path">
                  <div className="flight-path__location">
                    <p className="flight-path__label">Origen</p>
                    <p className="flight-path__time">{v.horaSalida}</p>
                    <p className="flight-path__city">{getCityName(v.origen)}</p>
                  </div>
                  <div className="flight-path__line">
                    <span className="flight-path__plane">→</span>
                  </div>
                  <div className="flight-path__location">
                    <p className="flight-path__label">Destino</p>
                    <p className="flight-path__time">{v.horaLlegada}</p>
                    <p className="flight-path__city">{getCityName(v.destino)}</p>
                  </div>
                </div>

                <div className="flight-card__action">
                  <p className="price">{formatCurrency(v.precio)}</p>
                  <span className="seats">{v.disponibles} asientos</span>
                  <Button onClick={() => reservar(v)} variant="primary">
                    Reservar
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
