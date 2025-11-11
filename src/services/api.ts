// src/services/api.ts
import axios from 'axios';

// 1. Defina a URL base do seu backend
const API_URL_BASE = 'http://localhost:8080/api';

// 2. Crie a instância customizada do Axios
const api = axios.create({
  baseURL: API_URL_BASE,
  timeout: 10000, // Timeout de 10 segundos
});

// 3. Adicione um interceptor para injetar o token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('tokenAuth');
    
    // Se o token existir, adicione-o ao cabeçalho Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Config.headers['Content-Type'] = 'application/json'; // Já é o padrão
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;