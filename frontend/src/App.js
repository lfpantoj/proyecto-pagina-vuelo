// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Páginas principales de la aplicación
import SearchPage from "./pages/SearchPage";
import ResultsPage from "./pages/ResultsPage";
import ReservationConfirm from "./pages/ReservationConfirm";
import ReservationSuccess from "./pages/ReservationSuccess";
import ProfileEdit from "./pages/ProfileEdit";

// Páginas de autenticación
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";

// Páginas de administrador
import AdminDashboard from "./pages/Admin/AdminDashboard";
import FlightsManagement from "./pages/Admin/FlightsManagement";
import FlightEdit from "./pages/Admin/FlightEdit";
import PassengersList from "./pages/Admin/PassengersList";

// Estilos globales consolidados
import "./App.css";

/**
 * Componente de ruta protegida que restringe el acceso solo a usuarios autenticados
 * Envuelve componentes de ruta y redirige usuarios no autenticados a la página de login
 * Muestra estado de carga durante la verificación de autenticación
 * 
 * @param {Object} props - Propiedades del componente
 * @param {ReactNode} props.children - Componentes hijos a renderizar si está autenticado
 * @returns {JSX.Element} Componente de ruta protegida o redirección
 */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  // Mostrar estado de carga durante la verificación
  if (loading) {
    return <div className="page">Cargando...</div>;
  }
  
  // Redirigir a login si no hay usuario autenticado
  return user ? children : <Navigate to="/login" />;
};

/**
 * Componente de ruta protegida para administradores
 * Restringe el acceso solo a usuarios con rol de administrador
 * 
 * @param {Object} props - Propiedades del componente
 * @param {ReactNode} props.children - Componentes hijos a renderizar si es admin
 * @returns {JSX.Element} Componente de ruta protegida o redirección
 */
const AdminRoute = ({ children }) => {
  const { user, isAdmin, loading } = useAuth();
  
  // Mostrar estado de carga durante la verificación
  if (loading) {
    return <div className="page">Cargando...</div>;
  }
  
  // Redirigir a home si no es administrador
  if (!user || !isAdmin()) {
    return <Navigate to="/" />;
  }
  
  return children;
};

/**
 * Componente principal de contenido de la aplicación con configuración de rutas
 * Define la estructura de rutas de la aplicación y envuelve el contenido con contexto de autenticación
 * Implementa rutas protegidas para secciones que requieren autenticación
 * 
 * @returns {JSX.Element} Contenido de la aplicación con estructura de rutas y layout
 */
function AppContent() {
  const { loading } = useAuth();

  // Estado de carga global de la aplicación
  if (loading) {
    return <div className="page">Cargando...</div>;
  }
  
  return (
    <div className="app-wrapper">
      <Header />
      <main className="main-content">
        <Routes>
          {/* Rutas públicas accesibles para todos los usuarios */}
          <Route path="/" element={<SearchPage />} />
          <Route path="/buscar" element={<SearchPage />} />
          <Route path="/resultados" element={<ResultsPage />} />
          
          {/* Rutas protegidas que requieren autenticación */}
          <Route 
            path="/confirmar-reserva" 
            element={
              <ProtectedRoute>
                <ReservationConfirm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/reserva-exitosa" 
            element={
              <ProtectedRoute>
                <ReservationSuccess />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/editar-perfil" 
            element={
              <ProtectedRoute>
                <ProfileEdit />
              </ProtectedRoute>
            } 
          />
          
          {/* Rutas de administrador - protegidas solo para admins */}
          <Route 
            path="/admin" 
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } 
          />
          <Route 
            path="/admin/vuelos" 
            element={
              <AdminRoute>
                <FlightsManagement />
              </AdminRoute>
            } 
          />
          <Route 
            path="/admin/vuelos-editar" 
            element={
              <AdminRoute>
                <FlightEdit />
              </AdminRoute>
            } 
          />
          <Route 
            path="/admin/vuelos-crear" 
            element={
              <AdminRoute>
                <FlightEdit />
              </AdminRoute>
            } 
          />
          <Route 
            path="/admin/pasajeros" 
            element={
              <AdminRoute>
                <PassengersList />
              </AdminRoute>
            } 
          />
          
          {/* Rutas de autenticación */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />

          {/* Ruta de fallback para páginas no encontradas */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

/**
 * Componente raíz de la aplicación
 * Proporciona la estructura principal de la aplicación con contexto de autenticación
 * y capacidades de enrutamiento. Este componente sirve como punto de entrada
 * para la aplicación React y establece los proveedores fundamentales.
 * 
 * @returns {JSX.Element} Componente raíz de la aplicación con proveedores
 */
function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;