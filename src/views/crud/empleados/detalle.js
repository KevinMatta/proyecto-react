/* eslint-disable prettier/prettier */
import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import {
  CForm,
  CCol,
  CRow,
  CFormLabel,
  CFormInput,
  CFormSwitch,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CFormCheck,
} from '@coreui/react'
import {
  crearEmpleado,
  obtenerEstadosCiviles,
  obtenerProvincias,
  obtenerCargos,
  obtenerEmpleadoPorId,
} from '../../../services/empleadoService'

import { useNavigate } from 'react-router-dom'
import { CCardFooter } from '@coreui/react-pro'

function EmpleadoDetalle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [empleadoData, setEmpleadoData] = useState({
    empl_Id: '',
    empl_NombreCompleto: '',
    escv_Nombre: '',
    empl_Sexo: '',
    empl_FechaNacimiento: '',
    empl_Telefono: '',
    empl_DireccionExacta: '',
    pvin_Nombre: '',
    empl_CorreoElectronico: '',
    carg_Nombre: '',
    empl_EsAduana: '',
  })

  useEffect(() => {
    const cargar = async () => {
      try {
        const empleadoData = await obtenerEmpleadoPorId(id)
        empleadoData.empl_FechaNacimiento = new Date(empleadoData.empl_FechaNacimiento)
          .toISOString()
          .split('T')[0]
        setEmpleadoData(empleadoData)
      } catch (error) {
        console.error('Error al cargar los datos:', error)
      }
    }

    cargar()
  }, [])

  const volver = () => {
    navigate('/theme/crud/empleados')
  }

  return (
    <CCard>
      <CCardHeader>
        <strong>Detalle del Empleado</strong>
      </CCardHeader>
      <CCardBody>
        <CRow className="mb-3">
          <CCol md={4}>
            <strong>Nombre Completo:</strong>
            <div>{empleadoData.empl_NombreCompleto}</div>
          </CCol>
          <CCol md={4}>
            <strong>Estado Civil:</strong>
            <div>{empleadoData.escv_Nombre}</div>
          </CCol>
          <CCol md={4}>
            <strong>Sexo:</strong>
            <div>{empleadoData.empl_Sexo === 'M' ? 'Masculino' : 'Femenino'}</div>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol md={4}>
            <strong>Fecha de Nacimiento:</strong>
            <div>{empleadoData.empl_FechaNacimiento}</div>
          </CCol>
          <CCol md={4}>
            <strong>Teléfono:</strong>
            <div>{empleadoData.empl_Telefono}</div>
          </CCol>
          <CCol md={4}>
            <strong>Correo Electrónico:</strong>
            <div>{empleadoData.empl_CorreoElectronico}</div>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol md={4}>
            <strong>Dirección Exacta:</strong>
            <div>{empleadoData.empl_DireccionExacta}</div>
          </CCol>
          <CCol md={4}>
            <strong>Provincia:</strong>
            <div>{empleadoData.pvin_Nombre}</div>
          </CCol>
          <CCol md={4}>
            <strong>Cargo:</strong>
            <div>{empleadoData.carg_Nombre}</div>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol md={4}>
            <strong>¿Es Aduana?:</strong>
            <div>{empleadoData.empl_EsAduana ? 'Sí' : 'No'}</div>
          </CCol>
        </CRow>
      </CCardBody>
      <CCardFooter>
        <CButton color="primary" onClick={volver}>
          Regresar
        </CButton>
      </CCardFooter>
    </CCard>
  )
}

export default EmpleadoDetalle
