// src/components/Header.jsx
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo_header_white.png";

/**
 * Componente de cabecera principal que maneja navegación,
 * estado de usuario y menú responsive
 */
export default function Header() {
  // Estado para controlar la visibilidad del menú móvil
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();

  // Funciones para manejar el estado del menú
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const isActive = (path) => location.pathname === path;

  // Maneja el cierre del menú con tecla Escape
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setMenuOpen(false);
    }
  };

  // Maneja el cierre de sesión del usuario
  const handleLogout = () => {
    logout();
    navigate("/");
    closeMenu();
  };

  return (
    <header className="app-header" role="banner">
      {/* Logo de la aplicación con enlace al inicio */}
      <div className="app-header__logo" onClick={closeMenu}>
        <Link
          to="/"
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          aria-label="Vuelos Colombia - Ir al inicio"
        >
          <img src={logo} alt="" />
          <span>
            Vuelos <br /> <strong>Colombia</strong>
          </span>
        </Link>
      </div>

      {/* Botón de menú hamburguesa para dispositivos móviles */}
      <button
        className={`app-menu-toggle ${menuOpen ? "open" : ""}`}
        onClick={toggleMenu}
        onKeyDown={handleKeyDown}
        aria-label="Menú de navegación"
        aria-expanded={menuOpen}
        aria-controls="main-navigation"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Navegación principal con enlaces dinámicos según el usuario */}
      <nav 
        id="main-navigation"
        className={`app-header__nav ${menuOpen ? "active" : ""}`}
        aria-label="Navegación principal"
      >
        {/* Muestra enlace de búsqueda solo para usuarios no administradores */}
        {!isAdmin() && (
          <Link
            to="/buscar"
            className={isActive("/buscar") ? "active" : ""}
            onClick={closeMenu}
            aria-current={isActive("/buscar") ? "page" : undefined}
          >
            Buscar Vuelos
          </Link>
        )}

        {/* Renderizado condicional según el estado de autenticación */}
        {user ? (
          <>
            {/* Enlaces diferentes para administradores y usuarios regulares */}
            {isAdmin() ? (
              <Link
                to="/admin"
                className={isActive("/admin") ? "active" : ""}
                onClick={closeMenu}
                aria-current={isActive("/admin") ? "page" : undefined}
              >
                Administración
              </Link>
            ) : (
              <Link
                to="/editar-perfil"
                className={isActive("/editar-perfil") ? "active" : ""}
                onClick={closeMenu}
                aria-current={isActive("/editar-perfil") ? "page" : undefined}
              >
                Mi Perfil
              </Link>
            )}
            
            {/* Botón para cerrar sesión */}
            <button
              onClick={handleLogout}
              className="btn btn--secondary"
              style={{ background: 'transparent', border: '1px solid white' }}
            >
              Cerrar Sesión
            </button>
          </>
        ) : (
          {/* Enlaces para usuarios no autenticados */}
          <>
            <Link
              to="/registro"
              className={isActive("/registro") ? "active" : ""}
              onClick={closeMenu}
              aria-current={isActive("/registro") ? "page" : undefined}
            >
              Crear Cuenta
            </Link>

            <Link
              to="/login"
              className={isActive("/login") ? "active" : ""}
              onClick={closeMenu}
              aria-current={isActive("/login") ? "page" : undefined}
            >
              Iniciar Sesión
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
