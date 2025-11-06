// components/Button.jsx

/**
 * Componente de botón reutilizable que acepta múltiples propiedades
 * y maneja diferentes estados visuales y de interacción
 */
export default function Button({ 
  children, 
  variant = "primary",      // Define el estilo visual del botón
  type = "button",          // Especifica el tipo HTML del botón  
  disabled = false,         // Controla el estado deshabilitado
  loading = false,          // Indica estado de carga
  ...props                  // Propiedades adicionales
}) {
  return (
    <button
      type={type}
      className={`btn btn--${variant}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="btn-spinner"></span>}
      {children}
    </button>
  );
}