// utils/validators.js

/**
 * Validates that a string value is not empty or whitespace-only
 * 
 * @param {string} v - String value to validate
 * @returns {boolean} True if value contains non-whitespace characters
 */
export const nonEmpty = (v) => !!v && v.trim().length > 0;

/**
 * Validates that two values are different and both are non-empty
 * 
 * @param {string} a - First value to compare
 * @param {string} b - Second value to compare
 * @returns {boolean} True if values are different and both are non-empty
 */
export const notSame = (a, b) => a && b && a !== b;

/**
 * Validates email format using standard email regex pattern
 * 
 * @param {string} email - Email address to validate
 * @returns {boolean} True if email matches valid format pattern
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates password meets minimum length requirement
 * 
 * @param {string} password - Password string to validate
 * @returns {boolean} True if password is at least 6 characters long
 */
export const isValidPassword = (password) => {
  return password && password.length >= 6;
};

/**
 * Validates name contains only letters, accents, and spaces with minimum length
 * Supports Spanish characters and requires at least 2 characters
 * 
 * @param {string} name - Name string to validate
 * @returns {boolean} True if name contains only valid characters and meets length requirement
 */
export const isValidName = (name) => {
  return name && name.length >= 2 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name);
};

/**
 * Validates document number based on document type with length constraints
 * 
 * @param {string} doc - Document number to validate
 * @param {string} type - Document type (CC, CE, PA, TI)
 * @returns {boolean} True if document number meets type-specific length requirements
 */
export const isValidDocumentNumber = (doc, type) => {
  const docNum = doc?.replace(/\D/g, "") || "";
  if (!docNum) return false;
  
  switch (type) {
    case "CC":
    case "CE":
    case "PA":
      return docNum.length >= 6 && docNum.length <= 12;
    case "TI":
      return docNum.length >= 6 && docNum.length <= 10;
    default:
      return false;
  }
};

/**
 * Validates Colombian phone number format (10 digits)
 * 
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if phone number contains exactly 10 digits
 */
export const isValidPhone = (phone) => {
  const cleaned = phone?.replace(/\D/g, "") || "";
  return cleaned.length === 10;
};

/**
 * Validates birth date indicates user is at least 18 years old
 * 
 * @param {string} dateString - Birth date in YYYY-MM-DD format
 * @returns {boolean} True if user is 18 years or older
 */
export const isValidBirthDate = (dateString) => {
  if (!dateString) return false;
  
  const birthDate = new Date(dateString);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  const isAdult = monthDiff < 0 || 
                 (monthDiff === 0 && today.getDate() < birthDate.getDate()) ? 
                 age - 1 : age;
  
  return isAdult >= 18;
};

/**
 * Filters input values to allow only valid characters based on field type
 * Provides client-side input sanitization for different data types
 * 
 * @param {string} value - Input value to filter
 * @param {string} fieldType - Type of field determining filtering rules
 * @returns {string} Filtered string containing only allowed characters
 */
export const filterInput = (value, fieldType) => {
  if (!value) return "";
  
  switch (fieldType) {
    case "email":
      return value.replace(/[^a-zA-Z0-9@._-]/g, "");
    case "password":
      return value.replace(/[^\w!@#$%^&*()_+-=]/g, "");
    case "document":
      return value.replace(/[^\d]/g, "").slice(0, 20);
    case "name":
      return value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
    case "phone":
      return value.replace(/[^\d]/g, "").slice(0, 15);
    case "number":
      return value.replace(/[^\d]/g, "");
    default:
      return value;
  }
};

export const hasCompleteProfile = (user) => {
  if (!user) return false;
  
  return (
    user.documento &&
    user.nombre &&
    user.correo &&
    user.celular &&
    user.nacimiento &&
    isValidDocumentNumber(user.documento, "CC") && // Uses existing validator
    isValidName(user.nombre) && // Uses existing validator  
    isValidEmail(user.correo) && // Uses existing validator
    isValidPhone(user.celular) && // Uses existing validator
    isValidBirthDate(user.nacimiento) // Uses existing validator
  );
};