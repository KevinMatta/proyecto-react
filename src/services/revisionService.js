import axios from 'axios';

const API_URL = 'https://localhost:44380/api/RevisionDeCalidad';
const API_KEY = '4b567cb1c6b24b51ab55248f8e66e5cc';
const ENCRYPTION_KEY = 'FZWv3nQTyHYyNvdx';

const headers = {
  'XApiKey': API_KEY,
  'EncryptionKey': ENCRYPTION_KEY,
};

export const listarRevisiones = async () => {
  try {
    const response = await axios.get(`${API_URL}/Listar`, { headers });
    return response.data.data;
  } catch (error) {
    console.error('Error al listar revisiones', error);
    throw error;
  }
};

export const insertarRevision = async (revision) => {
  try {
    // Validar fecha antes de enviar la solicitud
    const fechaRevision = new Date(revision.reca_FechaRevision);
    const fechaMin = new Date('1753-01-01T00:00:00');
    const fechaMax = new Date('9999-12-31T23:59:59');

    if (fechaRevision < fechaMin || fechaRevision > fechaMax) {
      throw new Error('La fecha de revisión está fuera del rango permitido');
    }

    console.log('Datos enviados para insertar:', revision); // Agrega este log para verificar los datos enviados
    const response = await axios.post(
      `${API_URL}/Insertar`,
      { ...revision, usua_UsuarioCreacion: 1 },
      { headers }
    );
    console.log('Respuesta de la inserción:', response.data); // Agrega este log para verificar la respuesta
    return response.data.data;
  } catch (error) {
    console.error('Error al insertar revisión', error);
    throw error;
  }
};


export const actualizarRevision = async (revision) => {
  try {
    const response = await axios.post(
      `${API_URL}/Editar`,
      { ...revision, usua_UsuarioModificacion: 1 },
      { headers }
    );
    return response.data.data;
  } catch (error) {
    console.error('Error al actualizar revisión', error);
    throw error;
  }
};

export const eliminarRevision = async (revision) => {
  try {
    const response = await axios.post(`${API_URL}/Eliminar`, revision, { headers });
    return response.data.data;
  } catch (error) {
    console.error('Error al eliminar revisión', error);
    throw error;
  }
};
