import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import GestionVuelos from "./GestionVuelos";
import CrearVuelo from "./CrearVuelo";
import EditarVuelo from "./EditarVuelo";
import ListaPasajeros from "./ListaPasajeros";
import EditarPasajero from "./EditarPasajero";
import "./AdminDashboard.css";

/**
 * Panel principal del administrador.
 * Muestra estadísticas generales y permite gestionar vuelos y pasajeros.
 */
export default function AdminDashboard() {
  const [vuelos, setVuelos] = useState([]);
  const [pasajeros, setPasajeros] = useState([]);

  useEffect(() => {
    const vuelosGuardados = localStorage.getItem("vuelos");
    const pasajerosGuardados = localStorage.getItem("pasajeros");
    if (vuelosGuardados) setVuelos(JSON.parse(vuelosGuardados));
    if (pasajerosGuardados) setPasajeros(JSON.parse(pasajerosGuardados));
  }, []);

  useEffect(() => {
    localStorage.setItem("vuelos", JSON.stringify(vuelos));
  }, [vuelos]);

  const agregarVuelo = (nuevoVuelo) => {
    const vueloConId = { id: Date.now(), ...nuevoVuelo };
    setVuelos([...vuelos, vueloConId]);
  };

  // Cálculos estadísticos
  const totalVuelos = vuelos.length;
  const totalPasajeros = pasajeros.length;
  const promedio = totalVuelos > 0 ? (totalPasajeros / totalVuelos).toFixed(1) : 0;

  return (
    <div className="admin-dashboard">
      <nav className="admin-menu">
        <h1>Panel del Administrador ✈️</h1>
        <ul>
          <li><Link to="/admin/vuelos">Gestión de Vuelos</Link></li>
          <li><Link to="/admin/vuelos/nuevo">Crear Nuevo Vuelo</Link></li>
          <li><Link to="/admin/lista-pasajeros">Lista de Pasajeros</Link></li>
        </ul>

        {/* Resumen general */}
        <div className="resumen">
          <p><strong>Total de vuelos:</strong> {totalVuelos}</p>
          <p><strong>Total de pasajeros:</strong> {totalPasajeros}</p>
          <p><strong>Promedio de pasajeros por vuelo:</strong> {promedio}</p>
        </div>
      </nav>

      <main className="admin-content">
        <Routes>
          <Route path="vuelos" element={<GestionVuelos vuelos={vuelos} setVuelos={setVuelos} />} />
          <Route path="vuelos/nuevo" element={<CrearVuelo agregarVuelo={agregarVuelo} />} />
          <Route path="vuelos/editar/:id" element={<EditarVuelo />} />
          <Route path="lista-pasajeros" element={<ListaPasajeros />} />
          <Route path="lista-pasajeros/editar/:id" element={<EditarPasajero />} />
        </Routes>
      </main>
    </div>
  );
}



