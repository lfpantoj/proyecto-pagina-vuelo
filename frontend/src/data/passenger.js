// src/data/passenger.js

/**
 * Mock passenger data for demonstration and testing purposes.
 * This module provides sample passenger information that simulates real user data
 * for the Vuelos Colombia application. The data includes both simplified passenger
 * profiles and complete user registration data structures.
 * 
 * These datasets support authentication flows, profile management, and booking
 * functionality during frontend development and testing phases.
 */

/**
 * Simplified passenger profile data structure for display and basic operations.
 * This object represents a passenger with essential identification and contact information.
 * 
 * @type {Object}
 * @property {string} documento - Passenger identification number
 * @property {string} nombre - Full name of the passenger
 * @property {string} correo - Email address for communication
 * @property {string} celular - Mobile phone number for contact
 * @property {string} nacimiento - Date of birth in YYYY-MM-DD format
 */
export const mockPassenger = {
  documento: "84739728",
  nombre: "Pepito Gómez Alnurfio",
  correo: "pepito@gmail.com",
  celular: "300587687",
  nacimiento: "1985-12-16"
};

/**
 * Complete user data structure for registration and authentication systems.
 * This object contains all required fields for user account creation and management,
 * including authentication credentials and detailed personal information.
 * 
 * @type {Object}
 * @property {string} correo - User email address (also used as username)
 * @property {string} contrasena - User password for authentication
 * @property {string} tipoDocumento - Document type (CC, CE, TI, PA)
 * @property {string} numeroDocumento - Document identification number
 * @property {string} primerNombre - First name
 * @property {string} segundoNombre - Middle name (optional)
 * @property {string} primerApellido - First surname
 * @property {string} segundoApellido - Second surname (optional)
 * @property {string} numeroCelular - Mobile phone number
 * @property {string} fechaNacimiento - Date of birth in YYYY-MM-DD format
 */
export const defaultUser = {
  correo: "pepito@gmail.com",
  contrasena: "123456",
  tipoDocumento: "CC",
  numeroDocumento: "84739728",
  primerNombre: "Pepito",
  segundoNombre: "",
  primerApellido: "Gómez",
  segundoApellido: "Alnurfio",
  numeroCelular: "",
  fechaNacimiento: "1985-12-16"
};