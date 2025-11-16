// src/data/passenger.js

/**
 * Datos simulados de pasajeros para demostración y pruebas
 */

// Pasajero de ejemplo para pruebas
export const mockPassenger = {
  documento: "84739728",
  nombre: "Pepito Gómez Alnurfio",
  correo: "pepito@gmail.com",
  celular: "300587687",
  nacimiento: "1985-12-16"
};

// Usuario por defecto del sistema
export const defaultUser = {
  correo: "pepito@gmail.com",
  contrasena: "123456",
  tipoDocumento: "CC",
  numeroDocumento: "84739728",
  primerNombre: "Pepito",
  segundoNombre: "",
  primerApellido: "Gómez",
  segundoApellido: "Alnurfio",
  numeroCelular: "300587687",
  fechaNacimiento: "1985-12-16",
  rol: "usuario" // Rol de usuario normal
};

// Usuario administrador del sistema
export const adminUser = {
  correo: "admin@vueloscolombia.com",
  contrasena: "admin123",
  tipoDocumento: "CC",
  numeroDocumento: "12345678",
  primerNombre: "Admin",
  segundoNombre: "",
  primerApellido: "Sistema",
  segundoApellido: "",
  numeroCelular: "3101234567",
  fechaNacimiento: "1980-01-01",
  rol: "admin" // Rol de administrador con privilegios
};

// Datos simulados de pasajeros agrupados por vuelo
export const passengersByFlight = {
  "AV-801": [
    mockPassenger,
    { 
      documento: "12345678", 
      nombre: "María García López", 
      correo: "maria@email.com",
      celular: "3101234567",
      nacimiento: "1990-05-15"
    }
  ],
  "LA-402": [mockPassenger],
  "VG-205": [
    { 
      documento: "87654321", 
      nombre: "Carlos Rodríguez", 
      correo: "carlos@email.com",
      celular: "3207654321",
      nacimiento: "1985-08-22"
    }
  ]
};

// Opciones de tipos de documento para formularios
export const TIPOS_DOCUMENTO = [
  { value: "", label: "Seleccione tipo" },
  { value: "CC", label: "Cédula de ciudadanía" },
  { value: "CE", label: "Cédula de extranjería" },
  { value: "TI", label: "Tarjeta de identidad" },
  { value: "PA", label: "Pasaporte" }
];
