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
  CTable,
  CTableHead,
  CTableRow,
  CTableBody,
  CTableFoot,
  CTableDataCell,
  CTableHeaderCell,
} from '@coreui/react'
import { RolBuscar } from '../../../services/rolesPorPantallaService'

import { useNavigate } from 'react-router-dom'
import { CCardFooter } from '@coreui/react-pro'

function RolesPorPantallaDetalle() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [rolData, setRolData] = useState({
    role_Descripcion: '',
    aduanero: '',
    usuarioCreacionNombre: '',
    usuarioModificacionNombre: '',
    role_FechaCreacion: '',
    role_FechaModificacion: '',
  })
  useEffect(() => {
    const cargarData = async () => {
      try {
        const rolData = await RolBuscar(id)
        rolData.role_FechaCreacion = new Date(rolData.role_FechaCreacion)
          .toISOString()
          .split('T')[0]
        rolData.role_FechaModificacion = new Date(rolData.role_FechaModificacion)
          .toISOString()
          .split('T')[0]
        setRolData(rolData)
      } catch (err) {
        console.error('error al cargar rol', err)
      }
    }
    cargarData()
  }, [])

  const volver = () => {
    navigate('/theme/rolesporpantalla')
  }

  return (
    <CCard>
      <CCardHeader>
        <strong>Detalle del Rol</strong>
      </CCardHeader>
      <CCardBody>
        <CRow className="mb-3">
          <CCol md={6}>
            <strong>Rol:</strong>
            <div>{rolData.role_Descripcion}</div>
          </CCol>
          <CCol md={6}>
            <strong>Es Aduana:</strong>
            <div>{rolData.aduanero}</div>
          </CCol>
        </CRow>
        <CTable bordered responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Acción</CTableHeaderCell>
              <CTableHeaderCell>Usuario</CTableHeaderCell>
              <CTableHeaderCell>Fecha</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow>
              <CTableDataCell>Creador</CTableDataCell>
              <CTableDataCell>{rolData.usuarioCreacionNombre}</CTableDataCell>
              <CTableDataCell>{rolData.role_FechaCreacion}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell>Modificador</CTableDataCell>
              <CTableDataCell>{rolData.usuarioModificacionNombre ?? 'N/A'}</CTableDataCell>
              <CTableDataCell>{rolData.role_FechaModificacion}</CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </CCardBody>
      <CCardFooter>
        <CButton color="primary" onClick={volver}>
          Regresar
        </CButton>
      </CCardFooter>
    </CCard>
  )
}

export default RolesPorPantallaDetalle
