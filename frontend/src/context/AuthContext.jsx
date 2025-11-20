// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as apiLogin, register as apiRegister, getUserProfile, updateUserProfile } from '../utils/api';

// Crea el contexto de autenticación
const AuthContext = createContext();

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async () => {
    try {
      const userProfile = await getUserProfile();
      setUser(userProfile);
      return userProfile; // Return the user profile directly on success
    } catch (error) {
      logout(); // Logout on any error fetching profile (e.g., token invalid)
      throw new Error("No se pudo obtener el perfil del usuario."); // Throw error for login function to catch
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Función para iniciar sesión
  const login = async (email, password) => {
    try {
      const { token } = await apiLogin(email, password);
      localStorage.setItem('token', token);
      const userProfile = await fetchUserProfile(); // fetchUserProfile now throws on error
      return { success: true, user: userProfile };
    } catch (error) {
      if (error.message === "No se pudo obtener el perfil del usuario.") {
        return { success: false, error: error.message };
      }
      return { success: false, error: "Credenciales incorrectas" };
    }
  };

  // Función para registrar nuevo usuario
  const register = async (userData) => {
    try {
      await apiRegister(userData);
      return { success: true };
    } catch (error) {
      return { success: false, error: "El usuario ya existe" };
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  // Función para actualizar perfil de usuario
  const updateProfile = async (updatedData) => {
    if (!user) return { success: false, error: "Usuario no autenticado" };

    try {
      const updatedUser = await updateUserProfile(updatedData);
      setUser(updatedUser);
      return { success: true, user: updatedUser };
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      return { success: false, error: "Error al actualizar el perfil" };
    }
  };

  // Función para verificar si el usuario es administrador
  const isAdmin = () => {
    return user && user.roles && user.roles.includes('ROLE_ADMIN');
  };

  // Valor del contexto que se provee a los componentes
  const value = {
    user,
    login,
    register,
    logout,
    updateProfile,
    isAdmin,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
