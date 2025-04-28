import axios from 'axios';

const API_URL = process.env.API_BASE_URL //|| 'http://localhost:5000'--Habilitar solo en desarrollo;

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/login`, { username, password });
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    throw new Error('Error al iniciar sesión');
  }
};

export const getToken = () => {
  return localStorage.getItem('token');
};
