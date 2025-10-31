// utils/validators.js

/**
 * Valida que un valor de cadena no esté vacío ni contenga solo espacios en blanco.
 * 
 * @param {string} v - Valor de cadena a validar
 * @returns {boolean} Verdadero si el valor contiene caracteres que no sean espacios en blanco.
 */
export const nonEmpty = (v) => !!v && v.trim().length > 0;

/**
 * Valida que dos valores sean diferentes y que ambos no estén vacíos.
 * 
 * @param {string} a - Primer valor a comparar
 * @param {string} b - Segundo valor para comparar
 * @returns {boolean} Verdadero si los valores son diferentes y ambos no están vacíos.
 */
export const notSame = (a, b) => a && b && a !== b;

/**
 * Valida el formato del correo electrónico utilizando un patrón de expresión regular estándar.
 * 
 * @param {string} email - Dirección de correo electrónico para validar
 * @returns {boolean} Verdadero si el correo electrónico coincide con un patrón de formato válido
 */
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Verifica que la contraseña cumpla con el requisito de longitud mínima.
 * 
 * @param {string} password - Cadena de contraseña para validar
 * @returns {boolean} Verdadero si la contraseña tiene al menos 6 caracteres.
 */
export const isValidPassword = (password) => {
    return password && password.length >= 6;
};

/**
 * Valida que el nombre contenga solo letras, acentos y espacios, con una longitud mínima.
 * Admite caracteres españoles y requiere al menos 2 caracteres.
 * 
 * @param {string} name - Cadena de nombre a validar
 * @returns {boolean} Verdadero si el nombre contiene solo caracteres válidos y cumple con el requisito de longitud.
 */
export const isValidName = (name) => {
    return name && name.length >= 2 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name);
};

/**
 * Valida el número de documento según el tipo de documento con restricciones de longitud.
 * 
 * @param {string} doc - Número de documento a validar
 * @param {string} type - Tipo de documento (CC, CE, PA, TI)
 * @returns {boolean} Verdadero si el número de documento cumple con los requisitos de longitud específicos del tipo.
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
 * Valida el formato de número de teléfono colombiano (10 dígitos)
 * 
 * @param {string} phone - Número de teléfono para validar
 * @returns {boolean} Verdadero si el número de teléfono contiene exactamente 10 dígitos.
 */
export const isValidPhone = (phone) => {
    const cleaned = phone?.replace(/\D/g, "") || "";
    return cleaned.length === 10;
};

/**
 * La validación de la fecha de nacimiento indica que el usuario tiene al menos 18 años.
 * 
 * @param {string} dateString - Fecha de nacimiento en formato AAAA-MM-DD
 * @returns {boolean} Verdadero si el usuario tiene 18 años o más.
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
 * Filtra los valores de entrada para permitir solo caracteres válidos según el tipo de campo.
 * Proporciona saneamiento de entrada del lado del cliente para diferentes tipos de datos.
 * 
 * @param {string} value - Valor de entrada para filtrar
 * @param {string} fieldType - Tipo de campo que determina las reglas de filtrado
 * @returns {string} Cadena filtrada que contiene solo los caracteres permitidos
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
        isValidDocumentNumber(user.documento, "CC") && // Utiliza un validador existente.
        isValidName(user.nombre) && // Utiliza un validador existente. 
        isValidEmail(user.correo) && // Utiliza un validador existente.
        isValidPhone(user.celular) && // Utiliza un validador existente.
        isValidBirthDate(user.nacimiento) // Utiliza un validador existente.
    );
};