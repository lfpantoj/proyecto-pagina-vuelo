// src/pages/ReservationConfirm.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import { formatCurrency } from "../utils/format";

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
  
  // Estado del pasajero, inicializado con datos del usuario autenticado
  const [pasajero, setPasajero] = useState(user);

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
        pasajero: user,
        returnTo: "/confirmar-reserva",
        fromConfirmation: true
      } 
    });
  };

  /**
   * Maneja el inicio del proceso de pago
   * Navega a la pagina de exito de reserva
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

      {/* Seccion de informacion del vuelo */}
      <section className="card">
        <h3>Vuelo</h3>
        <p><strong>{vuelo.id}</strong> — {vuelo.origen} → {vuelo.destino}</p>
        <p>{vuelo.fecha} • {vuelo.salida} - {vuelo.llegada}</p>
        <p>{vuelo.aerolinea} • {formatCurrency(vuelo.precio)}</p>
      </section>

      {/* Seccion de informacion del pasajero con capacidad de actualizacion */}
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

      {/* Seccion de accion de pago */}
      <div className="actions" style={{ marginTop: "2rem", textAlign: "center" }}>
        <Button onClick={handlePayment} variant="primary">
          Pagar {formatCurrency(vuelo.precio)}
        </Button>
      </div>
    </main>
  );
}
