// src/components/Header.jsx - ACTUALIZADO
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo_header_white.png";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const isActive = (path) => location.pathname === path;

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    closeMenu();
  };

  return (
    <header className="app-header" role="banner">
      {/* logo */}
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

      {/* botón menú móvil */}
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

      {/* navegación */}
      <nav 
        id="main-navigation"
        className={`app-header__nav ${menuOpen ? "active" : ""}`}
        aria-label="Navegación principal"
      >
        <Link
          to="/buscar"
          className={isActive("/buscar") ? "active" : ""}
          onClick={closeMenu}
          aria-current={isActive("/buscar") ? "page" : undefined}
        >
          Buscar Vuelos
        </Link>

        {user ? (
          <>
            <Link
              to="/editar-perfil"
              className={isActive("/editar-perfil") ? "active" : ""}
              onClick={closeMenu}
              aria-current={isActive("/editar-perfil") ? "page" : undefined}
            >
              Mi Perfil
            </Link>
            
            <div className="user-info" style={{ color: 'white', margin: '0 1rem' }}>
              Hola, {user.nombre.split(' ')[0]}
            </div>
            
            <button
              onClick={handleLogout}
              className="form-btn form-btn--secondary"
              style={{ background: 'transparent', border: '1px solid white' }}
            >
              Cerrar Sesión
            </button>
          </>
        ) : (
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