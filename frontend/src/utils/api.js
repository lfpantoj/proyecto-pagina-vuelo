// src/utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
});

// Interceptor para añadir el token de autenticación a las cabeceras
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { username: email, password });
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const getUserProfile = async () => {
  const response = await api.get('/usuarios/me');
  return response.data;
};

export const getMyReservations = async () => {
  const response = await api.get('/reservas/me');
  return response.data;
};

export const createReservation = async (vueloId, cantidad) => {
  const response = await api.post(`/reservas/${vueloId}?cantidad=${cantidad}`);
  return response.data;
};

export const getFlights = async () => {
  const response = await api.get('/vuelos');
  return response.data;
};

export const searchFlights = async (origen, destino) => {
  const response = await api.get(`/vuelos/buscar?origen=${origen}&destino=${destino}`);
  return response.data;
};

export const createFlight = async (flightData) => {
  const response = await api.post('/vuelos', flightData);
  return response.data;
};

export const updateFlight = async (id, flightData) => {
  const response = await api.put(`/vuelos/${id}`, flightData);
  return response.data;
};

export const deleteFlight = async (id) => {
  const response = await api.delete(`/vuelos/${id}`);
  return response.data;
};

export const downloadFlightsPDF = async () => {
  const response = await api.get('/vuelos/reporte/pdf', {
    responseType: 'blob',
  });
  return response.data;
};

export const downloadPassengersPDF = async (flightId) => {
  const response = await api.get(`/vuelos/${flightId}/pasajeros/pdf`, {
    responseType: 'blob',
  });
  return response.data;
};

export const getUsers = async () => {
    const response = await api.get('/usuarios');
    return response.data;
};

export const getReservationsByFlight = async (flightId) => {
    const response = await api.get(`/reservas/vuelo/${flightId}`);
    return response.data;
};

export const deleteReservation = async (id) => {
  const response = await api.delete(`/reservas/${id}`);
  return response.data;
};

export const updateUserProfile = async (userData) => {
    const response = await api.put('/usuarios/me/update', userData);
    return response.data;
};
