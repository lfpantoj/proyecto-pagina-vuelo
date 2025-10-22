// src/utils/format.js

/**
 * Formats numeric values into localized currency strings
 * This utility function leverages the Internationalization API to convert
 * numeric values into properly formatted currency strings according to
 * specified locale and currency conventions.
 * 
 * The function provides consistent currency formatting throughout the
 * application and includes null safety for robust error handling.
 * 
 * @param {number|null|undefined} value - Numeric value to format as currency
 * @param {string} locale - BCP 47 language tag for localization (default: "es-CO")
 * @param {string} currency - ISO 4217 currency code (default: "COP")
 * @returns {string} Formatted currency string or "-" for null/undefined values
 * 
 * @example
 * formatCurrency(500000) // returns "$500.000"
 * formatCurrency(75000, "en-US", "USD") // returns "$75,000.00"
 * formatCurrency(null) // returns "-"
 */
export function formatCurrency(value, locale = "es-CO", currency = "COP") {
  if (value == null) return "-";
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(value);
}