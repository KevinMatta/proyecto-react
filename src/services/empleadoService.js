/* eslint-disable prettier/prettier */
import axios from 'axios'
import { useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY
const API_ENCRIPTATION = import.meta.env.VITE_ENCRIPT
// export const [tipoToast, setTipoToas] = useState('')
export let tipoToast = ''

export const obtenerEmpleados = async () => {
  try {
    const response = await axios.get(`${API_URL}api/Empleados/Listar?empl_EsAduana=true`, {
      headers: {
        XApiKey: API_KEY,
      },
    })
    const empleados = response.data.data
    return agruparProvincias(empleados)
  } catch (error) {
    console.error('Error fetching empleados:', error)
    throw error
  }
}

export const obtenerEmpleadoPorId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}api/Empleados/Listar?empl_EsAduana=true`, {
      headers: {
        XApiKey: API_KEY,
      },
    })
    const empleados = response.data.data
    const empleado = empleados.find((empleado) => empleado.empl_Id == id)
    console.log(empleado, 'empleado por id', id)
    return empleado
  } catch (error) {
    console.error('Error fetching empleados:', error)
    throw error
  }
}
export const obtenerEstadosCiviles = async () => {
  try {
    const response = await axios.get(`${API_URL}api/EstadosCiviles/Listar?escv_EsAduana=true`, {
      headers: {
        XApiKey: API_KEY,
      },
    })
    const empleados = response.data.data
    return empleados
  } catch (error) {
    console.error('Error fetching estados civiles:', error)
    throw error
  }
}

export const obtenerProvincias = async () => {
  try {
    const response = await axios.get(`${API_URL}api/Provincias/Listar`, {
      headers: {
        XApiKey: API_KEY,
      },
    })
    const empleados = response.data.data
    return empleados
  } catch (error) {
    console.error('Error fetching provincias:', error)
    throw error
  }
}

export const obtenerCargos = async () => {
  try {
    const response = await axios.get(`${API_URL}api/Cargos/Listar`, {
      headers: {
        XApiKey: API_KEY,
      },
    })
    const empleados = response.data.data
    return empleados
  } catch (error) {
    console.error('Error fetching provincias:', error)
    throw error
  }
}

export const crearEmpleado = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}api/Empleados/Insertar`, formData, {
      headers: {
        XApiKey: API_KEY,
        EncryptionKey: API_ENCRIPTATION,
      },
    })
    console.log(response.data, 'CREAR')
    return response.data
  } catch (error) {
    console.error('Error al crear el empleado:', error)
    throw error
  }
}

export const eliminarEmpleado = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}api/Empleados/Eliminar`, formData, {
      headers: {
        XApiKey: API_KEY,
        EncryptionKey: API_ENCRIPTATION,
      },
    })
    console.log(response.data, 'Eliminar')
    return response.data
  } catch (error) {
    console.error('Error al crear el empleado:', error)
    throw error
  }
}

export const editarEmpleado = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}api/Empleados/Editar`, formData, {
      headers: {
        XApiKey: API_KEY,
        EncryptionKey: API_ENCRIPTATION,
      },
    })
    console.log(response.data, 'Editar')
    return response.data
  } catch (error) {
    console.error('Error al editar el empleado:', error)
    throw error
  }
}

const agruparProvincias = (empleados) => {
  const agrupado = empleados.reduce((acc, empleado) => {
    const provinciaId = empleado.pvin_Id
    if (!acc[provinciaId]) {
      acc[provinciaId] = {
        pvin_Id: provinciaId,
        pvin_Nombre: empleado.pvin_Nombre,
        details: [],
      }
    }
    acc[provinciaId].details.push({
      empl_Id: empleado.empl_Id,
      empl_NombreCompleto: empleado.empl_NombreCompleto,
      escv_Nombre: empleado.escv_Nombre,
      empl_Sexo: empleado.empl_Sexo,
      empl_FechaNacimiento: empleado.empl_FechaNacimiento,
      empl_Telefono: empleado.empl_Telefono,
      empl_DireccionExacta: empleado.empl_DireccionExacta,
      pvin_Nombre: empleado.pvin_Nombre,
      empl_CorreoElectronico: empleado.empl_CorreoElectronico,
      carg_Nombre: empleado.carg_Nombre,
      empl_EsAduana: empleado.empl_EsAduana ? 'si' : 'no',
    })
    return acc
  }, {})

  return Object.values(agrupado)
}
