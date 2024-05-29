import axios from 'axios';

const API_URL = 'https://localhost:44380/api/Areas';
const proceso = 'https://localhost:44380/api/Procesos'

const API_KEY = '4b567cb1c6b24b51ab55248f8e66e5cc';
const ENCRYPTION_KEY = 'FZWv3nQTyHYyNvdx';

export const listarCategorias = async () => {
    try {
        const response = await axios.get(`${API_URL}/Listar`, {
            headers: {
                'XApiKey': API_KEY,
                'EncryptionKey': ENCRYPTION_KEY
            }
        });
        console.log('Response data:', response.data);  
        return response.data.data;  // Acceder directamente al array de datos
    } catch (error) {
        console.error('Error al listar categorías', error);
        throw error;
    }
};
export const listarproceso = async () => {
    try {
        const response = await axios.get(`${proceso}/Listar`, {
            headers: {
                'XApiKey': API_KEY,
                'EncryptionKey': ENCRYPTION_KEY
            }
        });
        console.log('Response data:', response.data);  
        return response.data.data;  // Acceder directamente al array de datos
    } catch (error) {
        console.error('Error al listar categorías', error);
        throw error;
    }
};

export const insertarCategoria = async (area) => {
    try {
        const response = await axios.post(`${API_URL}/Insertar`, area, {
            headers: {
                'XApiKey': API_KEY,
                'EncryptionKey': ENCRYPTION_KEY
            }
        });
        return response.data.data;  
    } catch (error) {
        console.error('Error al insertar categoría', error);
        throw error;
    }
};

export const actualizarCategoria = async (area) => {
    try {
        const response = await axios.post(`${API_URL}/Editar`, area, {
            headers: {
                'XApiKey': API_KEY,
                'EncryptionKey': ENCRYPTION_KEY
            }
        });
        return response.data.data;  
    } catch (error) {
        console.error('Error al actualizar categoría', error);
        throw error;
    }
};

export const eliminarCategoria = async (area) => {
    try {
        const response = await axios.post(`${API_URL}/Eliminar`, area, {
            headers: {
                'XApiKey': API_KEY,
                'EncryptionKey': ENCRYPTION_KEY
            }
        });
        return response.data.data;  
    } catch (error) {
        console.error('Error al eliminar categoría', error);
        throw error;
    }
};
