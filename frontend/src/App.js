// src/App.js - VERSIÓN CORREGIDA
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Main application pages
import SearchPage from "./pages/SearchPage";
import ResultsPage from "./pages/ResultsPage";
import ReservationConfirm from "./pages/ReservationConfirm";
import ReservationSuccess from "./pages/ReservationSuccess";
import ProfileEdit from "./pages/ProfileEdit";

// Authentication pages
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";

// Consolidated global styles
import "./App.css";

/**
 * Protected route component that restricts access to authenticated users only
 * Wraps route components and redirects unauthenticated users to login page
 * Displays loading state during authentication verification
 * 
 * @param {Object} props - Component properties
 * @param {ReactNode} props.children - Child components to render if authenticated
 * @returns {JSX.Element} Protected route component or redirect
 */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="page">Cargando...</div>;
  }
  
  return user ? children : <Navigate to="/login" />;
};

/**
 * Main application content component with routing configuration
 * Defines the application's route structure and wraps content with authentication context
 * Implements protected routes for authenticated-only sections of the application
 * 
 * @returns {JSX.Element} Application content with routing and layout structure
 */
function AppContent() {
  const { loading } = useAuth(); // ✅ CORREGIDO: Solo se usa 'loading'

  if (loading) {
    return <div className="page">Cargando...</div>;
  }
  
  return (
    <div className="app-wrapper">
      <Header />
      <main className="main-content">
        <Routes>
          {/* Public routes accessible to all users */}
          <Route path="/" element={<SearchPage />} />
          <Route path="/buscar" element={<SearchPage />} />
          <Route path="/resultados" element={<ResultsPage />} />
          
          {/* Protected routes requiring authentication */}
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
          
          {/* Authentication routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />
        </Routes>
      </main>
    </div>
  );
}

/**
 * Root application component
 * Provides the main application structure with authentication context
 * and routing capabilities. This component serves as the entry point
 * for the React application and establishes the foundational providers.
 * 
 * @returns {JSX.Element} Root application component with providers
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