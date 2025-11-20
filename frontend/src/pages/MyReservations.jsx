// src/pages/MyReservations.jsx
import React, { useEffect, useState } from 'react';
import { getMyReservations, deleteReservation } from '../utils/api';
import { getCityName } from '../data/cities';
import Button from '../components/Button';
import './MyReservations.css';

export default function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await getMyReservations();
        setReservations(data);
      } catch (err) {
        setError('No se pudieron cargar las reservas. Por favor, inténtalo de nuevo más tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const handleCancel = async (id) => {
    const isConfirmed = window.confirm('¿Estás seguro de que deseas cancelar esta reserva?');
    if (!isConfirmed) {
      return;
    }

    try {
      await deleteReservation(id);
      setReservations(reservations.filter((r) => r.id !== id));
    } catch (err) {
      alert('No se pudo cancelar la reserva.');
      console.error(err);
    }
  };

  if (loading) {
    return <div className="page">Cargando reservas...</div>;
  }

  if (error) {
    return <div className="page form-error">{error}</div>;
  }

  return (
    <main className="page">
      <div className="reservations-container">
        <h1>Mis Reservas</h1>
        {reservations.length === 0 ? (
          <p>No tienes ninguna reserva activa.</p>
        ) : (
          <div className="reservations-list">
            {reservations.map((reserva) => (
              <div key={reserva.id} className="reservation-card">
                <div className="reservation-card__route">
                  <h2>
                    {getCityName(reserva.vuelo.origen)} ({reserva.vuelo.origen})
                    <span className="route-arrow">→</span>
                    {getCityName(reserva.vuelo.destino)} ({reserva.vuelo.destino})
                  </h2>
                </div>
                <div className="reservation-card__content">
                  <div className="reservation-card__details">
                    <h4>Vuelo</h4>
                    <p><strong>Fecha:</strong> {new Date(Date.UTC(...reserva.vuelo.fecha.split('-'))).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}</p>
                    <p><strong>Salida:</strong> {reserva.vuelo.horaSalida}</p>
                    <p><strong>Llegada:</strong> {reserva.vuelo.horaLlegada}</p>
                    <p><strong>Aerolínea:</strong> {reserva.vuelo.aerolinea}</p>
                  </div>
                  <div className="reservation-card__details">
                    <h4>Reserva</h4>
                    <p><strong>Confirmación:</strong> {reserva.id}</p>
                    <p><strong>Pasajeros:</strong> {reserva.cantidad}</p>
                    <p><strong>Estado:</strong> 
                      <span className={`reservation-status ${reserva.estado.toLowerCase()}`}>
                        {reserva.estado}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="reservation-card__actions">
                  <Button 
                    onClick={() => handleCancel(reserva.id)}
                    variant="danger"
                  >
                    Cancelar Reserva
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
