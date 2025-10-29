// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GestionVuelos from "./admin/GestionVuelos";
import CrearVuelo from "./admin/CrearVuelo";
import EditarVuelo from "./admin/EditarVuelo";
import ListaPasajeros from "./admin/ListaPasajeros";
import "./App.css";

/**
 * Sistema de Gestión de Vuelos Colombia ✈️
 * Permite crear, editar, eliminar vuelos, gestionar pasajeros y ver reportes.
 */
function App() {
  const [vuelos, setVuelos] = useState([]);

  // Cargar vuelos guardados desde localStorage
  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem("vuelos"));
    if (guardados) setVuelos(guardados);
  }, []);

  // Guardar vuelos cuando cambien
  useEffect(() => {
    localStorage.setItem("vuelos", JSON.stringify(vuelos));
  }, [vuelos]);

  // Agregar nuevo vuelo
  const agregarVuelo = (nuevo) => {
    const vueloConId = { ...nuevo, id: Date.now().toString(), pasajeros: 0 };
    setVuelos([...vuelos, vueloConId]);
  };

  return (
    <Router>
      <div className="App">
        {/* Barra de navegación principal */}
        <header className="navbar">
          <h1>✈️ Sistema de Gestión de Vuelos</h1>
          <nav>
            <Link to="/admin/vuelos" className="nav-link">
              Gestión de Vuelos
            </Link>
            <Link to="/admin/vuelos/nuevo" className="nav-link">
              Crear Vuelo
            </Link>
            <Link to="/admin/reportes" className="nav-link">
              Reportes
            </Link>
          </nav>
        </header>

        {/* Contenido principal */}
        <main className="main-container">
          <Routes>
            {/* Rutas de vuelos */}
            <Route
              path="/admin/vuelos"
              element={<GestionVuelos vuelos={vuelos} setVuelos={setVuelos} />}
            />
            <Route
              path="/admin/vuelos/nuevo"
              element={<CrearVuelo agregarVuelo={agregarVuelo} />}
            />
            <Route
              path="/admin/vuelos/editar/:id"
              element={<EditarVuelo vuelos={vuelos} setVuelos={setVuelos} />}
            />

            {/* Nueva ruta para pasajeros */}
            <Route path="/admin/pasajeros/:vueloId" element={<ListaPasajeros />} />

            {/* Página por defecto */}
            <Route
              path="*"
              element={<GestionVuelos vuelos={vuelos} setVuelos={setVuelos} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
