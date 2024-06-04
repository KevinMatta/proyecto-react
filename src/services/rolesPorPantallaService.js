import axios from 'axios'
import { useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY
const API_ENCRIPTATION = import.meta.env.VITE_ENCRIPT

export const getPantallas = async () => {
  try {
    const response = await axios.get(`${API_URL}api/Pantallas/Listar?pant_EsAduana=true`, {
      headers: {
        XApiKey: API_KEY,
      },
    })
    const pantallas = response.data.data
    return reconstruir(pantallas)
  } catch (err) {
    console.log('error al obtener data', err)
  }
}

export const getRoles = async () => {
  try {
    const response = await axios.get(`${API_URL}api/Roles/Listar`, {
      headers: {
        XApiKey: API_KEY,
      },
    })

    let roles = response.data.data

    roles = roles.map((rol) => {
      if (rol.detalles) {
        try {
          rol.detalles = JSON.parse(rol.detalles.replace(/\\/g, ''))
        } catch (parseError) {
          console.log(`Error al parsear detalles del rol con id ${rol.id}`, parseError)
          rol.detalles = []
        }
      }
      return rol
    })

    return roles
  } catch (err) {
    console.log('Error al obtener datos', err)
  }
}

const getEsquemas = (pantallasList) => {
  return pantallasList.reduce((esquemas, pantalla) => {
    if (!esquemas.includes(pantalla.pant_Esquema)) {
      esquemas.push(pantalla.pant_Esquema)
    }
    return esquemas
  }, [])
}

const reconstruir = (pantallasList) => {
  let esquemas = getEsquemas(pantallasList)
  let nodos = esquemas.map((esquema) => ({
    nivel: 1,
    pant_Esquema: esquema,
    checked: false,
    children: pantallasList
      .filter((pantalla) => pantalla.pant_Esquema === esquema)
      .map((pantalla) => ({
        nivel: 2,
        pant_Id: pantalla.pant_Id,
        pant_Nombre: pantalla.pant_Nombre,
        checked: false,
      })),
  }))
  return nodos
}

export const RolInsertar = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}api/Roles/Insertar`, formData, {
      headers: {
        XApiKey: API_KEY,
        EncryptionKey: API_ENCRIPTATION,
      },
    })
    console.log(response.data, 'CREAR')
    return response.data
  } catch (error) {
    console.error('Error al crear el rol:', error)
    throw error
  }
}

export const RolEliminar = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}api/Roles/Eliminar`, formData, {
      headers: {
        XApiKey: API_KEY,
        EncryptionKey: API_ENCRIPTATION,
      },
    })
    console.log(response.data, 'ELIMINAR')
    return response.data
  } catch (error) {
    console.error('Error al eliminar el rol:', error)
    throw error
  }
}

export const RolBuscar = async (id) => {
  try {
    const response = await axios.get(`${API_URL}api/Roles/Listar`, {
      headers: {
        XApiKey: API_KEY,
      },
    })

    let roles = response.data.data

    let role = roles.filter((rol) => {
      if (rol.role_Id == id) {
        if (rol.detalles) {
          try {
            rol.detalles = JSON.parse(rol.detalles.replace(/\\/g, ''))
          } catch (parseError) {
            console.log(`Error al parsear detalles del rol con id ${rol.id}`, parseError)
            rol.detalles = []
          }
        }
        return rol
      }
    })

    return role[0]
  } catch (err) {
    console.log('Error al obtener datos', err)
  }
}

export const RolEditar = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}api/Roles/Editar`, formData, {
      headers: {
        XApiKey: API_KEY,
        EncryptionKey: API_ENCRIPTATION,
        'Content-Type': 'application/json',
      },
    })
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Error al editar el rol:', error)
  }
}
