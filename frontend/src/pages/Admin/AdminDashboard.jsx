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
  const navigate = useNavigate();

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
      <h1>Panel de Administración</h1>
      <p className="muted">Gestiona vuelos y pasajeros del sistema</p>

      <div className="admin-dashboard">
        {adminOptions.map((option, index) => (
          <div key={index} className="admin-card">
            <h3>{option.title}</h3>
            <p>{option.description}</p>
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