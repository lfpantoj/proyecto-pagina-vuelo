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
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();

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

      <nav 
        id="main-navigation"
        className={`app-header__nav ${menuOpen ? "active" : ""}`}
        aria-label="Navegación principal"
      >
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

        {user ? (
          <>
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
            
            <button
              onClick={handleLogout}
              className="btn btn--secondary"
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