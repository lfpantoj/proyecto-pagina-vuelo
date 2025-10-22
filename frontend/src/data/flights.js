// src/data/flights.js

/**
 * Mock flight data for demonstration and development purposes.
 * This dataset provides sample flight information that simulates real flight data
 * for the Vuelos Colombia application. The data includes flight details such as
 * airline, route, schedule, pricing, and seat availability.
 * 
 * This static dataset serves as a temporary data source until backend integration
 * is implemented. It supports the flight search and booking functionality during
 * the frontend development phase.
 * 
 * @type {Array<Object>}
 * @property {string} id - Unique flight identifier (e.g., "VCO-123")
 * @property {string} aerolinea - Airline company name
 * @property {string} origen - Departure city
 * @property {string} destino - Arrival city
 * @property {string} fecha - Flight date in YYYY-MM-DD format
 * @property {string} salida - Departure time in HH:MM format (24-hour)
 * @property {string} llegada - Arrival time in HH:MM format (24-hour)
 * @property {number} precio - Flight price in Colombian pesos (COP)
 * @property {number} asientos - Number of available seats
 */
export const flights = [
  {
    id: "VCO-123",
    aerolinea: "Avianca",
    origen: "Bogotá",
    destino: "Medellín",
    fecha: "2025-11-03",
    salida: "18:00",
    llegada: "19:00",
    precio: 500000,
    asientos: 15,
  },
  {
    id: "VCO-321",
    aerolinea: "Wingo",
    origen: "Bogotá",
    destino: "Medellín",
    fecha: "2025-11-02",
    salida: "02:00",
    llegada: "03:00",
    precio: 480000,
    asientos: 3,
  },
  {
    id: "VCO-312",
    aerolinea: "LATAM",
    origen: "Bogotá",
    destino: "Medellín",
    fecha: "2025-11-02",
    salida: "14:00",
    llegada: "15:00",
    precio: 510000,
    asientos: 20,
  },
];