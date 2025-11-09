// pages/Admin/AdminDashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

/**
 * Panel principal de administración con opciones para gestionar vuelos y pasajeros
 * Proporciona acceso rápido a todas las funcionalidades administrativas
 * 
 * @returns {JSX.Element} Panel de control de administrador
 */
export default function AdminDashboard() {
  // Hook para la navegación entre rutas
  const navigate = useNavigate();

  // Configuración de las opciones del panel administrativo
  const adminOptions = [
    {
      title: "Gestionar Vuelos",
      description: "Crear, editar, eliminar vuelos y generar reportes PDF",
      action: () => navigate("/admin/vuelos"),
      variant: "primary"
    },
    {
      title: "Lista de Pasajeros por Vuelo",
      description: "Generar listas de pasajeros y descargar informes PDF",
      action: () => navigate("/admin/pasajeros"),
      variant: "primary"
    }
  ];

  return (
    <main className="page">
      {/* Título principal del panel de administración */}
      <h1>Panel de Administración</h1>
      {/* Descripción secundaria del panel */}
      <p className="muted">Gestiona vuelos y pasajeros del sistema</p>

      {/* Contenedor principal de las opciones administrativas */}
      <div className="admin-dashboard">
        {/* Mapea cada opción administrativa a un componente de tarjeta */}
        {adminOptions.map((option, index) => (
          <div key={index} className="admin-card">
            {/* Título de la opción administrativa */}
            <h3>{option.title}</h3>
            {/* Descripción detallada de la funcionalidad */}
            <p>{option.description}</p>
            {/* Botón para acceder a la funcionalidad específica */}
            <Button 
              variant={option.variant} 
              onClick={option.action}
              style={{ marginTop: "1rem" }}
            >
              Acceder
            </Button>
          </div>
        ))}
      </div>
    </main>
  );
}
