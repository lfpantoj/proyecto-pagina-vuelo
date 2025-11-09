// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { defaultUser, adminUser } from '../data/passenger';

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

  useEffect(() => {
    const initializeUsers = () => {
      const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Verifica si los usuarios por defecto ya existen
      const hasDefaultUser = savedUsers.find(u => u.correo === defaultUser.correo);
      const hasAdminUser = savedUsers.find(u => u.correo === adminUser.correo);
      
      // Crea los usuarios por defecto si no existen
      if (!hasDefaultUser || !hasAdminUser) {
        const users = [];
        
        if (!hasDefaultUser) {
          users.push(defaultUser);
          console.log("Usuario por defecto creado:", defaultUser.correo);
        }
        
        if (!hasAdminUser) {
          users.push(adminUser);
          console.log("Usuario administrador creado:", adminUser.correo);
        }
        
        // Mantiene los usuarios existentes
        savedUsers.forEach(existingUser => {
          if (!users.find(u => u.correo === existingUser.correo)) {
            users.push(existingUser);
          }
        });
        
        localStorage.setItem('users', JSON.stringify(users));
        console.log("Base de usuarios inicializada");
      }
    };

    initializeUsers();

    // Restaura la sesión del usuario desde localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    setLoading(false);
  }, []);

  // Función para iniciar sesión
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
        nacimiento: user.fechaNacimiento,
        rol: user.rol || 'usuario'
      };
      
      setUser(userData);
      localStorage.setItem('currentUser', JSON.stringify(userData));
      return { success: true };
    } else {
      return { success: false, error: "Credenciales incorrectas" };
    }
  };

  // Función para registrar nuevo usuario
  const register = async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (savedUsers.find(u => u.correo === userData.correo)) {
      return { success: false, error: "El usuario ya existe" };
    }
    
    const newUser = { ...userData, rol: 'usuario' };
    savedUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(savedUsers));
    
    return { success: true };
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  // Función para actualizar perfil de usuario
  const updateProfile = (updatedData) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = savedUsers.findIndex(u => u.correo === user.correo);
    
    if (userIndex !== -1) {
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
        correo: updatedData.correo,
        rol: savedUsers[userIndex].rol
      };
      localStorage.setItem('users', JSON.stringify(savedUsers));
    }
  };

  // Función para verificar si el usuario es administrador
  const isAdmin = () => {
    return user && user.rol === 'admin';
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
