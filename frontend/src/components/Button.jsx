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
      // Aplica clases CSS basadas en la variante del botón
      className={`btn btn--${variant}`}
      // Deshabilita el botón si está en estado deshabilitado o carga
      disabled={disabled || loading}
      // Propiedades adicionales pasadas al componente
      {...props}
    >
      {/* Muestra spinner de carga cuando está en estado loading */}
      {loading && <span className="btn-spinner"></span>}
      {/* Renderiza el contenido del botón */}
      {children}
    </button>
  );
}
