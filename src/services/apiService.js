import axios from 'axios';

// Configurar la URL base del backend desde las variables de entorno (.env)
const API_URL = process.env.API_BASE_URL //|| 'http://localhost:3500' --Habilitar solo para pruebas de desarrollo;

// Crea una instancia de Axios
const apiService = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de solicitudes para agregar el token JWT
apiService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Obtiene el token del almacenamiento local
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Función para manejar errores de las respuestas
apiService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Si el token es inválido o expiró, retona al login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiService;
