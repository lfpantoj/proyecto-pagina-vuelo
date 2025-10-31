// src/utils/format.js

/**
 * Da formato a valores numéricos en cadenas de moneda localizadas.
 * Esta función de utilidad aprovecha la API de internacionalización para convertir
 * valores numéricos en cadenas de moneda con el formato adecuado según las convenciones
 * de configuración regional y de moneda especificadas.
 * 
 * La función proporciona un formato de moneda uniforme en toda la aplicación
 * e incluye seguridad contra valores nulos para un manejo de errores robusto.
 * 
 * @param {number|null|undefined} value - Valor numérico a formatear como moneda
 * @param {string} locale - Etiqueta de idioma BCP 47 para localización (predeterminado: "es-CO")
 * @param {string} currency - Código de moneda ISO 4217 (predeterminado: "COP")
 * @returns {string} Cadena de moneda formateada o "-" para valores nulos/indefinidos
 * 
 * @example
 * formatCurrency(500000) // devuelve "$500.000"
 * formatCurrency(75000, "en-US", "USD") // devuelve "$75,000.00"
 * formatCurrency(null) // devuelve "-"
 */
export function formatCurrency(value, locale = "es-CO", currency = "COP") {
  if (value == null) return "-";
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(value);
}