// src/utils/format.js

/**
 * Formatea valores numéricos a cadenas de moneda localizadas
 * Utiliza la API de Internacionalización para convertir números
 * a formato de moneda según la configuración regional especificada
 * 
 * @param {number|null|undefined} value - Valor numérico a formatear como moneda
 * @param {string} locale - Código de localización (por defecto: "es-CO")
 * @param {string} currency - Código de moneda ISO 4217 (por defecto: "COP")
 * @returns {string} Cadena de moneda formateada o "-" para valores nulos
 * 
 * @example
 * formatCurrency(500000) // retorna "$500.000"
 * formatCurrency(75000, "en-US", "USD") // retorna "$75,000.00"
 * formatCurrency(null) // retorna "-"
 */
export function formatCurrency(value, locale = "es-CO", currency = "COP") {
  // Retorna guión para valores nulos o undefined
  if (value == null) return "-";
  // Utiliza Intl.NumberFormat para formatear el valor como moneda
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(value);
}
