// src/data/flights.js

/**
 * Mock flight data for demonstration and development purposes.
 * This dataset provides sample flight information that simulates real flight data
 * for the Vuelos Colombia application.
 */
export const flights = [
  {
    id: "AV-801",
    aerolinea: "Avianca",
    origen: "Bogotá",
    destino: "Medellín",
    fecha: "2025-11-15",
    salida: "07:00",
    llegada: "08:00",
    precio: 350000,
    asientos: 12,
  },
  {
    id: "LA-402",
    aerolinea: "LATAM",
    origen: "Bogotá",
    destino: "Medellín",
    fecha: "2025-11-15",
    salida: "14:30",
    llegada: "15:30",
    precio: 320000,
    asientos: 8,
  },
  {
    id: "VG-205",
    aerolinea: "Viva Air",
    origen: "Bogotá",
    destino: "Medellín",
    fecha: "2025-11-15",
    salida: "18:45",
    llegada: "19:45",
    precio: 280000,
    asientos: 5,
  },
  {
    id: "AV-602",
    aerolinea: "Avianca",
    origen: "Medellín",
    destino: "Cartagena",
    fecha: "2025-11-16",
    salida: "06:15",
    llegada: "07:45",
    precio: 420000,
    asientos: 15,
  },
  {
    id: "WN-301",
    aerolinea: "Wingo",
    origen: "Medellín",
    destino: "Cartagena",
    fecha: "2025-11-16",
    salida: "12:00",
    llegada: "13:30",
    precio: 380000,
    asientos: 3,
  },
  {
    id: "LA-508",
    aerolinea: "LATAM",
    origen: "Cali",
    destino: "Bogotá",
    fecha: "2025-11-17",
    salida: "09:20",
    llegada: "10:20",
    precio: 290000,
    asientos: 20,
  },
  {
    id: "AV-710",
    aerolinea: "Avianca",
    origen: "Cartagena",
    destino: "Santa Marta",
    fecha: "2025-11-18",
    salida: "08:30",
    llegada: "09:00",
    precio: 180000,
    asientos: 10,
  },
  {
    id: "EF-115",
    aerolinea: "EasyFly",
    origen: "Bogotá",
    destino: "Barranquilla",
    fecha: "2025-11-19",
    salida: "16:45",
    llegada: "18:15",
    precio: 310000,
    asientos: 7,
  },
  {
    id: "VG-412",
    aerolinea: "Viva Air",
    origen: "Medellín",
    destino: "Cali",
    fecha: "2025-11-20",
    salida: "11:10",
    llegada: "12:10",
    precio: 270000,
    asientos: 4,
  },
  {
    id: "LA-609",
    aerolinea: "LATAM",
    origen: "Santa Marta",
    destino: "Bogotá",
    fecha: "2025-11-21",
    salida: "13:25",
    llegada: "14:55",
    precio: 390000,
    asientos: 18,
  }
];

// Constantes para formularios
export const AEROLINEAS = [
  { value: "Avianca", label: "Avianca" },
  { value: "Wingo", label: "Wingo" },
  { value: "LATAM", label: "LATAM" },
  { value: "Viva Air", label: "Viva Air" },
  { value: "EasyFly", label: "EasyFly" }
];

export const CIUDADES = [
  { value: "Bogotá", label: "Bogotá" },
  { value: "Medellín", label: "Medellín" },
  { value: "Cali", label: "Cali" },
  { value: "Cartagena", label: "Cartagena" },
  { value: "Barranquilla", label: "Barranquilla" },
  { value: "Santa Marta", label: "Santa Marta" }
];