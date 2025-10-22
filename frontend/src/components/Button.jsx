// components/Button.jsx
import React from "react";

/**
 * A reusable button component that provides consistent styling and behavior
 * across the application. Supports multiple variants, loading states, and
 * standard HTML button attributes.
 * 
 * This component encapsulates button styling and behavior, ensuring visual
 * consistency while maintaining accessibility standards.
 * 
 * @param {Object} props - Component properties
 * @param {ReactNode} props.children - Button content (text, icons, etc.)
 * @param {string} props.variant - Visual style variant: 'primary' | 'secondary'
 * @param {string} props.type - HTML button type: 'button' | 'submit' | 'reset'
 * @param {boolean} props.disabled - Whether the button is disabled
 * @param {boolean} props.loading - Whether the button is in loading state
 * @param {Object} props.props - Additional HTML button attributes
 * @returns {JSX.Element} Rendered button component
 */
export default function Button({ 
  children, 
  variant = "primary", 
  type = "button",
  disabled = false,
  loading = false,
  ...props 
}) {
  return (
    <button
      type={type}
      className={`form-btn form-btn--${variant}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="form-spinner"></span>}
      {children}
    </button>
  );
}