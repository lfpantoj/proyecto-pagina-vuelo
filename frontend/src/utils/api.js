// src/utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080',
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
  const response = await api.post('/api/auth/login', { username: email, password });
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post('/api/auth/register', userData);
  return response.data;
};

export const getUserProfile = async () => {
  const response = await api.get('/api/usuarios/me');
  return response.data;
};

export const getMyReservations = async () => {
  const response = await api.get('/api/reservas/me');
  return response.data;
};

export const createReservation = async (vueloId, cantidad) => {
  const response = await api.post(`/api/reservas/${vueloId}?cantidad=${cantidad}`);
  return response.data;
};

export const getFlights = async () => {
  const response = await api.get('/api/vuelos');
  return response.data;
};

export const searchFlights = async (origen, destino) => {
  const response = await api.get(`/api/vuelos/buscar?origen=${origen}&destino=${destino}`);
  return response.data;
};

export const createFlight = async (flightData) => {
  const response = await api.post('/api/vuelos', flightData);
  return response.data;
};

export const updateFlight = async (id, flightData) => {
  const response = await api.put(`/api/vuelos/${id}`, flightData);
  return response.data;
};

export const deleteFlight = async (id) => {
  const response = await api.delete(`/api/vuelos/${id}`);
  return response.data;
};

export const downloadFlightsPDF = async () => {
  const response = await api.get('/api/vuelos/reporte/pdf', {
    responseType: 'blob',
  });
  return response.data;
};

export const downloadPassengersPDF = async (flightId) => {
  const response = await api.get(`/api/vuelos/${flightId}/pasajeros/pdf`, {
    responseType: 'blob',
  });
  return response.data;
};

export const getUsers = async () => {
    const response = await api.get('/api/usuarios');
    return response.data;
};

export const getReservationsByFlight = async (flightId) => {
    const response = await api.get(`/api/reservas/vuelo/${flightId}`);
    return response.data;
};

export const deleteReservation = async (id) => {
  const response = await api.delete(`/api/reservas/${id}`);
  return response.data;
};

export const updateUserProfile = async (userData) => {
    const response = await api.put('/api/usuarios/me/update', userData);
    return response.data;
};
