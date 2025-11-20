// src/pages/ReservationConfirm.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import { formatCurrency } from "../utils/format";
import { createReservation } from "../utils/api";
import { getCityName } from "../data/cities";
import "./ReservationConfirm.css";

/**
 * Pagina de confirmacion de reserva que muestra informacion del vuelo y pasajero
 * para revision final antes del procesamiento del pago
 */
export default function ReservationConfirm() {
  // Obtiene el estado de la navegacion y herramientas de enrutamiento
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const vuelo = state?.vuelo;
  const pasajeros = state?.pasajeros || 1; // Obtener pasajeros del estado de navegación, default 1

  // Estados para carga y errores
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Transforma el objeto 'user' del contexto a la estructura que espera la UI
  const createPasajeroFromUser = (u) => {
    if (!u) return null;
    return {
      nombre: `${u.primerNombre || ''} ${u.segundoNombre || ''} ${u.primerApellido || ''} ${u.segundoApellido || ''}`.trim().replace(/\s+/g, ' '),
      documento: u.numeroDocumento,
      correo: u.username,
      celular: u.numeroCelular,
      nacimiento: u.fechaNacimiento
    };
  };
  
  // Estado del pasajero, inicializado con datos del usuario autenticado
  const [pasajero, setPasajero] = useState(() => createPasajeroFromUser(user));

  /**
   * Efecto que verifica si hay datos actualizados del pasajero en localStorage
   * provenientes de ediciones de perfil
   */
  useEffect(() => {
    const savedPasajero = localStorage.getItem('updatedPasajero');
    if (savedPasajero) {
      setPasajero(JSON.parse(savedPasajero));
      // Limpia el almacenamiento despues de usar los datos
      localStorage.removeItem('updatedPasajero');
    }
  }, []);

  // Manejo de estado de error cuando no hay informacion del vuelo
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
   * Maneja la navegacion a la pagina de edicion de perfil
   * para actualizar datos del pasajero
   */
  const handleUpdateData = () => {
    navigate("/editar-perfil", { 
      state: { 
        pasajero: pasajero,
        returnTo: "/confirmar-reserva",
        fromConfirmation: true,
        vuelo: vuelo, // Pasamos el vuelo para poder volver
        pasajeros: pasajeros // Pasamos la cantidad de pasajeros
      } 
    });
  };

  /**
   * Maneja el inicio del proceso de pago
   * Llama a la API para crear la reserva y navega a la pagina de exito
   */
  const handlePayment = async () => {
    setLoading(true);
    setError(null);
    try {
      const reserva = await createReservation(vuelo.id, pasajeros);
      navigate("/reserva-exitosa", { 
        state: { vuelo, pasajero, cantidad: pasajeros, reserva } 
      });
    } catch (err) {
      setError(err.response?.data?.message || "Ocurrió un error al crear la reserva. Asientos no disponibles.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const total = vuelo.precio * pasajeros;

  return (
    <main className="page">
      <header className="header">
        <h1>Confirmar reserva</h1>
        <p className="muted">Revisa los datos antes de pagar</p>
            </header>
      
                  <div className="card-group">
                    {/* Seccion de informacion del vuelo */}
                    <section className="card flight-details-card">
                      <h3>Detalles del Vuelo</h3>
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
                        <p><strong>Precio por pasajero:</strong> {formatCurrency(vuelo.precio)}</p>
                      </div>
                    </section>
                  </div>
            
                  {/* Seccion de informacion del pasajero con capacidad de actualizacion */}
                  <section className="card passenger-details-card" style={{marginTop: '2rem'}}>
                    <h3>Pasajero Principal</h3>
                    <div className="passenger-details-info">
                      <p><strong>Nombre:</strong> {pasajero?.nombre}</p>
                      <p><strong>Documento:</strong> {pasajero?.documento}</p>
                      <p><strong>Email:</strong> {pasajero?.correo}</p>
                      <p><strong>Celular:</strong> {pasajero?.celular}</p>
                      <p><strong>Nacimiento:</strong> {pasajero?.nacimiento}</p>
                    </div>
                    
                    <div className="actions">
                      <Button onClick={handleUpdateData} variant="secondary">
                        Actualizar datos
                      </Button>
                    </div>
                  </section>      {/* Seccion de accion de pago */}
      <div className="actions" style={{ marginTop: "2rem", textAlign: "center" }}>
        {error && <div className="form-error" style={{marginBottom: '1rem'}}>{error}</div>}
        <Button onClick={handlePayment} variant="primary" loading={loading} disabled={loading || pasajeros < 1}>
          Pagar {formatCurrency(total)}
        </Button>
      </div>
    </main>
  );
}
