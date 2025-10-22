// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { defaultUser, mockPassenger } from '../data/passenger';

/**
 * Authentication context for managing user authentication state across the application.
 * Provides user login, registration, logout, and profile management functionality.
 * Uses localStorage for persistent authentication state management.
 */
const AuthContext = createContext();

/**
 * Custom hook to access authentication context
 * @returns {Object} Authentication context value
 * @throws {Error} If used outside of AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

/**
 * Authentication provider component that manages user state and authentication operations.
 * This provider initializes user data from localStorage, handles user authentication flows,
 * and persists user state across browser sessions.
 * 
 * @param {Object} props - Component properties
 * @param {ReactNode} props.children - Child components to be wrapped with auth context
 * @returns {JSX.Element} AuthProvider component
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Initializes application with default user data and restores session from localStorage
   */
  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Initialize with default user if no users exist
    if (savedUsers.length === 0) {
      const users = [defaultUser];
      localStorage.setItem('users', JSON.stringify(users));
      console.log("Usuario por defecto creado desde passenger.js");
    }

    // Restore user session from localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    setLoading(false);
  }, []);

  /**
   * Authenticates user with email and password credentials
   * @param {string} email - User email address
   * @param {string} password - User password
   * @returns {Promise<Object>} Authentication result with success status and error message
   */
  const login = async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const user = savedUsers.find(u => u.correo === email && u.contrasena === password);
    
    if (user) {
      const userData = {
        documento: user.numeroDocumento,
        nombre: `${user.primerNombre} ${user.segundoNombre || ''} ${user.primerApellido} ${user.segundoApellido || ''}`.trim().replace(/\s+/g, ' '),
        correo: user.correo,
        celular: user.numeroCelular,
        nacimiento: user.fechaNacimiento
      };
      
      setUser(userData);
      localStorage.setItem('currentUser', JSON.stringify(userData));
      return { success: true };
    } else {
      return { success: false, error: "Credenciales incorrectas" };
    }
  };

  /**
   * Registers a new user account
   * @param {Object} userData - Complete user registration data
   * @returns {Promise<Object>} Registration result with success status and error message
   */
  const register = async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (savedUsers.find(u => u.correo === userData.correo)) {
      return { success: false, error: "El usuario ya existe" };
    }
    
    savedUsers.push(userData);
    localStorage.setItem('users', JSON.stringify(savedUsers));
    
    return { success: true };
  };

  /**
   * Logs out current user and clears session data
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  /**
   * Updates user profile information
   * @param {Object} updatedData - Updated user profile data
   */
  const updateProfile = (updatedData) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    // Also update user in the users list
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = savedUsers.findIndex(u => u.correo === user.correo);
    
    if (userIndex !== -1) {
      // Parse full name into parts for correct storage format
      const nombrePartes = updatedData.nombre.split(' ');
      
      savedUsers[userIndex] = { 
        ...savedUsers[userIndex], 
        numeroDocumento: updatedData.documento,
        primerNombre: nombrePartes[0] || '',
        segundoNombre: nombrePartes[1] || '',
        primerApellido: nombrePartes[2] || '',
        segundoApellido: nombrePartes[3] || '',
        numeroCelular: updatedData.celular,
        fechaNacimiento: updatedData.nacimiento,
        correo: updatedData.correo
      };
      localStorage.setItem('users', JSON.stringify(savedUsers));
    }
  };

  /**
   * Authentication context value containing user state and authentication methods
   */
  const value = {
    user,
    login,
    register,
    logout,
    updateProfile,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};