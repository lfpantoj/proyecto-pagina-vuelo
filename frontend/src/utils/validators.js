// utils/validators.js

/**
 * Valida que un string no esté vacío o contenga solo espacios
 */
export const nonEmpty = (v) => !!v && v.trim().length > 0;

/**
 * Valida que dos valores sean diferentes y ambos no estén vacíos
 */
export const notSame = (a, b) => a && b && a !== b;

/**
 * Valida el formato de email usando expresión regular estándar
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida que la contraseña cumpla con el largo mínimo requerido
 */
export const isValidPassword = (password) => {
  return password && password.length >= 6;
};

/**
 * Valida que el nombre contenga solo letras, acentos y espacios
 * Requiere mínimo 2 caracteres y soporta caracteres en español
 */
export const isValidName = (name) => {
  return name && name.length >= 2 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name);
};

/**
 * Valida número de documento según tipo con restricciones de longitud
 */
export const isValidDocumentNumber = (doc, type) => {
  // Remueve caracteres no numéricos
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
 * Valida formato de número telefónico colombiano (10 dígitos)
 */
export const isValidPhone = (phone) => {
  const cleaned = phone?.replace(/\D/g, "") || "";
  return cleaned.length === 10;
};

/**
 * Valida que la fecha de nacimiento indique mayoría de edad (18+ años)
 */
export const isValidBirthDate = (dateString) => {
  if (!dateString) return false;
  
  const birthDate = new Date(dateString);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  // Ajusta la edad si aún no ha pasado el cumpleaños este año
  const isAdult = monthDiff < 0 || 
                 (monthDiff === 0 && today.getDate() < birthDate.getDate()) ? 
                 age - 1 : age;
  
  return isAdult >= 18;
};

/**
 * Filtra valores de entrada permitiendo solo caracteres válidos según tipo de campo
 * Proporciona sanitización de entrada en el lado del cliente
 */
export const filterInput = (value, fieldType) => {
  if (!value) return "";
  
  switch (fieldType) {
    case "email":
      // Permite solo caracteres alfanuméricos y símbolos de email
      return value.replace(/[^a-zA-Z0-9@._-]/g, "");
    case "password":
      // Permite caracteres alfanuméricos y símbolos comunes de contraseña
      return value.replace(/[^\w!@#$%^&*()_+-=]/g, "");
    case "document":
      // Permite solo números, máximo 20 caracteres
      return value.replace(/[^\d]/g, "").slice(0, 20);
    case "name":
      // Permite solo letras, acentos y espacios
      return value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
    case "phone":
      // Permite solo números, máximo 15 caracteres
      return value.replace(/[^\d]/g, "").slice(0, 15);
    case "number":
      // Permite solo números
      return value.replace(/[^\d]/g, "");
    default:
      return value;
  }
};

/**
 * Valida que el perfil de usuario esté completo con todos los campos requeridos
 * Verifica cada campo individualmente usando los validadores existentes
 */
export const hasCompleteProfile = (user) => {
  if (!user) return false;
  
  return (
    user.documento &&
    user.nombre &&
    user.correo &&
    user.celular &&
    user.nacimiento &&
    isValidDocumentNumber(user.documento, "CC") &&
    isValidName(user.nombre) &&
    isValidEmail(user.correo) &&
    isValidPhone(user.celular) &&
    isValidBirthDate(user.nacimiento)
  );
};
