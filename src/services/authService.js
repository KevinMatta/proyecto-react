import axios from 'axios';

const API_URL = 'https://localhost:44380/api/Usuarios';
const API_KEY = '4b567cb1c6b24b51ab55248f8e66e5cc';
const ENCRYPTION_KEY = 'FZWv3nQTyHYyNvdx';

const headers = {
  'XApiKey': API_KEY,
  'EncryptionKey': ENCRYPTION_KEY,
  'Content-Type': 'application/json',
};

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/Login`, credentials, { headers });
    return response.data;
  } catch (error) {
    console.error('Error al iniciar sesión', error);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/Register`, userData, { headers });
    return response.data;
  } catch (error) {
    console.error('Error al registrar usuario', error);
    throw error;
  }
};
