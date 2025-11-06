// utils/validationSchemas.js
import { 
  isValidEmail, 
  isValidPassword, 
  isValidName, 
  isValidDocumentNumber, 
  isValidPhone, 
  isValidBirthDate,
  filterInput 
} from './validators';

// Validation schemas
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

// Profile schema with ALL fields including optional ones
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
  segundoNombre: (value) => {
    // Optional field - only validate if has value
    if (value && !isValidName(value)) return "Solo letras";
    return null;
  },
  primerApellido: (value) => {
    if (!value) return "El primer apellido es requerido";
    if (!isValidName(value)) return "Solo letras, mínimo 2 caracteres";
    return null;
  },
  segundoApellido: (value) => {
    // Optional field - only validate if has value
    if (value && !isValidName(value)) return "Solo letras";
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

// Field configuration for ProfileEdit - MOVED FROM ProfileEdit.jsx
export const PROFILE_FIELD_GROUPS = [
  {
    title: "Información Personal",
    fields: [
      { 
        name: "tipoDocumento", 
        label: "Tipo de documento", 
        type: "select", 
        required: true,
        options: [
          { value: "", label: "Seleccione tipo" },
          { value: "CC", label: "Cédula de ciudadanía" },
          { value: "CE", label: "Cédula de extranjería" },
          { value: "TI", label: "Tarjeta de identidad" },
          { value: "PA", label: "Pasaporte" }
        ]
      },
      { 
        name: "numeroDocumento", 
        label: "Número de documento", 
        type: "text", 
        required: true, 
        hint: "Solo números",
        fieldType: "document" 
      },
      { 
        name: "primerNombre", 
        label: "Primer nombre", 
        type: "text", 
        required: true, 
        hint: "Solo letras",
        fieldType: "name" 
      },
      { 
        name: "segundoNombre", 
        label: "Segundo nombre", 
        type: "text", 
        hint: "Solo letras (opcional)",
        fieldType: "name" 
      },
      { 
        name: "primerApellido", 
        label: "Primer apellido", 
        type: "text", 
        required: true, 
        hint: "Solo letras",
        fieldType: "name" 
      },
      { 
        name: "segundoApellido", 
        label: "Segundo apellido", 
        type: "text", 
        hint: "Solo letras (opcional)",
        fieldType: "name" 
      },
      { 
        name: "numeroCelular", 
        label: "Número celular", 
        type: "tel", 
        required: true, 
        hint: "10 dígitos",
        fieldType: "phone" 
      },
      { 
        name: "fechaNacimiento", 
        label: "Fecha de nacimiento", 
        type: "date", 
        required: true 
      }
    ]
  },
  {
    title: "Información de Contacto", 
    fields: [
      { 
        name: "correo", 
        label: "Correo electrónico", 
        type: "email", 
        required: true,
        fieldType: "email" 
      },
      { 
        name: "confirmarCorreo", 
        label: "Confirmar correo electrónico", 
        type: "email", 
        required: true,
        fieldType: "email" 
      }
    ]
  },
  {
    title: "Seguridad",
    fields: [
      { 
        name: "contrasena", 
        label: "Contraseña", 
        type: "password", 
        required: true, 
        hint: "Mínimo 6 caracteres",
        fieldType: "password" 
      },
      { 
        name: "confirmarContrasena", 
        label: "Confirmar contraseña", 
        type: "password", 
        required: true, 
        hint: "Mínimo 6 caracteres",
        fieldType: "password" 
      }
    ]
  }
];

// Helper functions for ProfileEdit
export const parseNombreCompleto = (nombreCompleto) => {
  if (!nombreCompleto) return { primerNombre: "", segundoNombre: "", primerApellido: "", segundoApellido: "" };
  
  const partes = nombreCompleto.split(' ');
  return {
    primerNombre: partes[0] || "",
    segundoNombre: partes[1] || "",
    primerApellido: partes[2] || "",
    segundoApellido: partes[3] || ""
  };
};

export const getFilteredValue = (value, fieldType) => {
  if (!fieldType) return value;
  return filterInput(value, fieldType);
};

export const getProfileInitialState = (pasajeroInicial, user) => {
  if (pasajeroInicial) {
    return {
      tipoDocumento: "CC",
      numeroDocumento: pasajeroInicial.documento || "",
      ...parseNombreCompleto(pasajeroInicial.nombre),
      numeroCelular: pasajeroInicial.celular || "",
      fechaNacimiento: pasajeroInicial.nacimiento || "",
      correo: pasajeroInicial.correo || "",
      confirmarCorreo: pasajeroInicial.correo || "",
      contrasena: "",
      confirmarContrasena: "",
    };
  } else if (user) {
    return {
      tipoDocumento: "CC",
      numeroDocumento: user.documento || "",
      ...parseNombreCompleto(user.nombre),
      numeroCelular: user.celular || "",
      fechaNacimiento: user.nacimiento || "",
      correo: user.correo || "",
      confirmarCorreo: user.correo || "",
      contrasena: "",
      confirmarContrasena: "",
    };
  } else {
    return {
      tipoDocumento: "", 
      numeroDocumento: "", 
      primerNombre: "", 
      segundoNombre: "",
      primerApellido: "", 
      segundoApellido: "", 
      numeroCelular: "", 
      fechaNacimiento: "",
      correo: "", 
      confirmarCorreo: "", 
      contrasena: "", 
      confirmarContrasena: "",
    };
  }
};

// Validation utilities
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

export const validateField = (field, value, form, schema) => {
  if (schema[field]) {
    return schema[field](value, form);
  }
  return null;
};

// En validationSchemas.js
export const flightSchema = {
  id: (value) => !value ? "El ID del vuelo es requerido" : null,
  aerolinea: (value) => !value ? "La aerolínea es requerida" : null,
  origen: (value) => !value ? "El origen es requerido" : null,
  destino: (value) => !value ? "El destino es requerido" : null,
  fecha: (value) => !value ? "La fecha es requerida" : null,
  salida: (value) => !value ? "La hora de salida es requerida" : null,
  llegada: (value) => !value ? "La hora de llegada es requerida" : null,
  precio: (value) => !value || value <= 0 ? "El precio debe ser mayor a 0" : null,
  asientos: (value) => !value || value < 0 ? "Los asientos no pueden ser negativos" : null
};

export const LOGIN_FIELDS = [
  {
    name: "correo",
    label: "Correo electrónico",
    type: "email",
    hint: "Ingresa tu correo electrónico",
    autoComplete: "email",
    fieldType: "email"
  },
  {
    name: "contrasena",
    label: "Contraseña",
    type: "password", 
    hint: "Mínimo 6 caracteres",
    autoComplete: "current-password",
    fieldType: "password"
  }
];

export const REGISTER_FIELDS = [
  {
    name: "correo",
    label: "Correo electrónico",
    type: "email",
    hint: "Ingresa tu correo electrónico",
    autoComplete: "email",
    fieldType: "email"
  },
  {
    name: "confirmarCorreo", 
    label: "Confirmar correo electrónico",
    type: "email",
    hint: "Repite tu correo electrónico",
    autoComplete: "email",
    fieldType: "email"
  },
  {
    name: "contrasena",
    label: "Contraseña", 
    type: "password",
    hint: "Mínimo 6 caracteres",
    autoComplete: "new-password",
    fieldType: "password"
  },
  {
    name: "confirmarContrasena",
    label: "Confirmar contraseña",
    type: "password", 
    hint: "Repite tu contraseña",
    autoComplete: "new-password",
    fieldType: "password"
  }
];

export const searchSchema = {
  origen: (value) => !value ? "Selecciona una ciudad de origen" : null,
  destino: (value, form) => {
    if (!value) return "Selecciona una ciudad de destino";
    if (value === form.origen) return "El destino no puede ser igual al origen";
    return null;
  },
  fechaIda: (value) => !value ? "Selecciona una fecha de viaje" : null
};