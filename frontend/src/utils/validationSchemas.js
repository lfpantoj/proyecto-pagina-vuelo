// utils/validationSchemas.js
import { 
  isValidEmail, 
  isValidPassword, 
  isValidName, 
  isValidDocumentNumber, 
  isValidPhone, 
  isValidBirthDate 
} from './validators';

/**
 * Validation schema for user login forms
 * Defines validation rules for email and password fields during authentication
 * 
 * @type {Object}
 * @property {Function} correo - Email validation function
 * @property {Function} contrasena - Password validation function
 */
export const loginSchema = {
  correo: (value) => {
    if (!value) return "El correo electrónico es requerido";
    if (!isValidEmail(value)) return "Por favor ingrese un correo electrónico válido";
    return null;
  },
  contrasena: (value) => {
    if (!value) return "La contraseña es requerida";
    if (!isValidPassword(value)) return "La contraseña debe tener al menos 6 caracteres";
    return null;
  }
};

/**
 * Validation schema for user registration forms
 * Defines validation rules for account creation including email confirmation
 * and password matching requirements
 * 
 * @type {Object}
 * @property {Function} correo - Primary email validation
 * @property {Function} confirmarCorreo - Email confirmation matching
 * @property {Function} contrasena - Password validation
 * @property {Function} confirmarContrasena - Password confirmation matching
 */
export const registerSchema = {
  correo: (value, form) => {
    if (!value) return "El correo electrónico es requerido";
    if (!isValidEmail(value)) return "Por favor ingrese un correo electrónico válido";
    return null;
  },
  confirmarCorreo: (value, form) => {
    if (!value) return "Confirma tu correo electrónico";
    if (value !== form.correo) return "Los correos electrónicos no coinciden";
    return null;
  },
  contrasena: (value, form) => {
    if (!value) return "La contraseña es requerida";
    if (!isValidPassword(value)) return "La contraseña debe tener al menos 6 caracteres";
    return null;
  },
  confirmarContrasena: (value, form) => {
    if (!value) return "Confirma tu contraseña";
    if (value !== form.contrasena) return "Las contraseñas no coinciden";
    return null;
  }
};

/**
 * Comprehensive validation schema for user profile forms
 * Defines validation rules for complete user profile information including
 * personal data, contact information, and security credentials
 * 
 * @type {Object}
 * @property {Function} tipoDocumento - Document type selection validation
 * @property {Function} numeroDocumento - Document number format validation
 * @property {Function} primerNombre - First name format validation
 * @property {Function} primerApellido - Last name format validation
 * @property {Function} numeroCelular - Phone number format validation
 * @property {Function} fechaNacimiento - Birth date age validation
 * @property {Function} correo - Email format validation
 * @property {Function} confirmarCorreo - Email confirmation validation
 * @property {Function} contrasena - Password strength validation
 * @property {Function} confirmarContrasena - Password confirmation validation
 */
export const profileSchema = {
  tipoDocumento: (value) => {
    if (!value) return "Selecciona un tipo de documento";
    return null;
  },
  numeroDocumento: (value, form) => {
    if (!value) return "El número de documento es requerido";
    if (!isValidDocumentNumber(value, form.tipoDocumento)) {
      return "Número de documento inválido";
    }
    return null;
  },
  primerNombre: (value) => {
    if (!value) return "El primer nombre es requerido";
    if (!isValidName(value)) return "Solo letras, mínimo 2 caracteres";
    return null;
  },
  primerApellido: (value) => {
    if (!value) return "El primer apellido es requerido";
    if (!isValidName(value)) return "Solo letras, mínimo 2 caracteres";
    return null;
  },
  numeroCelular: (value) => {
    if (!value) return "El número celular es requerido";
    if (!isValidPhone(value)) return "Debe tener 10 dígitos";
    return null;
  },
  fechaNacimiento: (value) => {
    if (!value) return "La fecha de nacimiento es requerida";
    if (!isValidBirthDate(value)) return "Debes ser mayor de 18 años";
    return null;
  },
  correo: (value) => {
    if (!value) return "El correo es requerido";
    if (!isValidEmail(value)) return "Correo electrónico inválido";
    return null;
  },
  confirmarCorreo: (value, form) => {
    if (!value) return "Confirma tu correo";
    if (value !== form.correo) return "Los correos no coinciden";
    return null;
  },
  contrasena: (value) => {
    if (!value) return "La contraseña es requerida";
    if (!isValidPassword(value)) return "Mínimo 6 caracteres";
    return null;
  },
  confirmarContrasena: (value, form) => {
    if (!value) return "Confirma tu contraseña";
    if (value !== form.contrasena) return "Las contraseñas no coinciden";
    return null;
  }
};

/**
 * Validates complete form data against a specified validation schema
 * Iterates through all fields in the schema and collects validation errors
 * 
 * @param {Object} form - Form data object to validate
 * @param {Object} schema - Validation schema object containing field validators
 * @returns {Object} Validation result object
 * @returns {Object} return.errors - Object containing field-specific error messages
 * @returns {boolean} return.isValid - Overall form validation status
 */
export const validateForm = (form, schema) => {
  const errors = {};
  let hasErrors = false;

  Object.keys(schema).forEach(field => {
    const error = schema[field](form[field], form);
    if (error) {
      errors[field] = error;
      hasErrors = true;
    }
  });

  return { errors, isValid: !hasErrors };
};

/**
 * Validates a single form field against the corresponding schema validator
 * Provides targeted validation for individual fields without full form validation
 * 
 * @param {string} field - Field name to validate
 * @param {string} value - Field value to validate
 * @param {Object} form - Complete form data for cross-field validation
 * @param {Object} schema - Validation schema containing field validators
 * @returns {string|null} Error message if validation fails, null if valid
 */
export const validateField = (field, value, form, schema) => {
  if (schema[field]) {
    return schema[field](value, form);
  }
  return null;
};