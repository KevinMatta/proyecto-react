import axios from 'axios';

const API_URL = 'https://localhost:44380/api';
const API_KEY = '4b567cb1c6b24b51ab55248f8e66e5cc';
const ENCRYPTION_KEY = 'FZWv3nQTyHYyNvdx';

const headers = {
  'XApiKey': API_KEY,
  'EncryptionKey': ENCRYPTION_KEY,
  'Content-Type': 'application/json',
};

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/Usuarios/Login`, credentials, { headers });
    return response.data;
  } catch (error) {
    console.error('Error al iniciar sesión', error);
    throw error;
  }
};

export const getPantallas = async () => {
  try {
    const response = await axios.get(`${API_URL}/Pantallas/Listar`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching pantallas:', error);
    throw error;
  }
};

export const getRolesPorPantallas = async (roleId) => {
  try {
    const response = await axios.get(`${API_URL}/RolesPorPantallas/Listar?role_Id=${roleId}`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching roles por pantallas:', error);
    throw error;
  }
};
