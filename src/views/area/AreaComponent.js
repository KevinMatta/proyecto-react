import React, { useEffect, useState, useRef } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableHeaderCell,
  CTableHead,
  CTableRow,
  CTableDataCell,
  CToast,
  CToastBody,
  CToastClose,
  CToaster,
  CToastHeader,
  CCollapse,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CFormSelect,
  CFormInput,
} from '@coreui/react'
import {
  listarCategorias,
  insertarCategoria,
  actualizarCategoria,
  eliminarCategoria,
} from '../../services/AreService'
import axios from 'axios'

const AreaComponent = () => {
  const [areas, setAreas] = useState([])
  const [procesos, setProcesos] = useState([])
  const [nuevaArea, setNuevaArea] = useState({ tipa_area: '', proc_Id: 0, usua_UsuarioCreacion: 1 })
  const [visible, setVisible] = useState(false)
  const [detalleVisible, setDetalleVisible] = useState(false)
  const [areaEditada, setAreaEditada] = useState(null)
  const [detalleArea, setDetalleArea] = useState(null)
  const [nombreEditado, setNombreEditado] = useState('')
  const [procIdEditado, setProcIdEditado] = useState(0)
  const [toast, addToast] = useState(0)
  const toaster = useRef()

  const fetchAreas = async () => {
    try {
      const data = await listarCategorias()
      if (Array.isArray(data)) {
        setAreas(data)
      } else {
        console.error('Datos recibidos no son un array:', data)
        setAreas([])
      }
    } catch (error) {
      console.error('Error al listar áreas', error)
      setAreas([])
    }
  }

  const API_KEY = '4b567cb1c6b24b51ab55248f8e66e5cc'
  const ENCRYPTION_KEY = 'FZWv3nQTyHYyNvdx'

  const fetchProcesos = async () => {
    try {
      const response = await axios.get('https://localhost:44380/api/Procesos/Listar', {
        headers: {
          XApiKey: API_KEY,
          EncryptionKey: ENCRYPTION_KEY,
        },
      })
      setProcesos(response.data.data)
    } catch (error) {
      console.error('Error al listar procesos', error)
      setProcesos([])
    }
  }

  useEffect(() => {
    fetchAreas()
    fetchProcesos()
  }, [])

  const handleInsertar = async () => {
    try {
      const nuevaAreaConFecha = {
        ...nuevaArea,
        tipa_FechaCreacion: new Date().toISOString(), // Asegúrate de agregar la fecha de creación
      }
      const response = await insertarCategoria(nuevaAreaConFecha)
      setAreas([...areas, response])
      fetchAreas()
      setVisible(false)
      addToast(exampleToast('Área insertada correctamente', 'success'))
    } catch (error) {
      console.error('Error al insertar área', error)
      addToast(exampleToast('No se pudo insertar el área', 'danger'))
    }
  }

  const handleActualizar = async () => {
    try {
      const updatedArea = { ...areaEditada, tipa_area: nombreEditado, proc_Id: procIdEditado }
      await actualizarCategoria(updatedArea)
      fetchAreas()
      setVisible(false)
      addToast(exampleToast('Área actualizada correctamente', 'success'))
    } catch (error) {
      console.error('Error al actualizar área', error)
      addToast(exampleToast('No se pudo actualizar el área', 'danger'))
    }
  }

  const handleEliminar = async (area) => {
    try {
      await eliminarCategoria(area)
      fetchAreas()
      addToast(exampleToast('Área eliminada correctamente', 'success'))
    } catch (error) {
      console.error('Error al eliminar área', error)
      addToast(exampleToast('No se pudo eliminar el área', 'danger'))
    }
  }

  const abrirModalEditar = (area) => {
    setAreaEditada(area)
    setNombreEditado(area?.tipa_area || '')
    setProcIdEditado(area?.proc_Id || 0)
    setVisible(true)
  }

  const abrirModalInsertar = () => {
    setAreaEditada(null)
    setNombreEditado('')
    setProcIdEditado(0)
    setNuevaArea({ tipa_area: '', proc_Id: 0, usua_UsuarioCreacion: 1 })
    setVisible(true)
  }

  const mostrarDetalles = (area) => {
    setDetalleArea(area)
    setDetalleVisible(true)
  }

  const volverATabla = () => {
    setDetalleArea(null)
    setDetalleVisible(false)
  }

  const exampleToast = (message, color) => (
    <CToast autohide={true} delay={5000} color={color}>
      <CToastHeader closeButton>
        <strong className="me-auto">Notificación</strong>
        <small>Ahora</small>
      </CToastHeader>
      <CToastBody>{message}</CToastBody>
    </CToast>
  )

  return (
    <CRow>
      <CCardHeader>
        <CCollapse visible={!detalleVisible}>
          <CButton color="primary" onClick={abrirModalInsertar} style={{ margin: 10 }}>
            Nuevo
          </CButton>
        </CCollapse>
      </CCardHeader>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCollapse visible={!detalleVisible}>
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Proceso</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Acciones</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {areas
                    .filter((area) => area)
                    .map((area, index) => (
                      <CTableRow key={area.tipa_Id}>
                        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                        <CTableDataCell>{area.tipa_area || 'Sin Nombre'}</CTableDataCell>
                        <CTableDataCell>{area.proc_Descripcion || 'Sin Proceso'}</CTableDataCell>
                        <CTableDataCell>
                          <CButton color="info" onClick={() => abrirModalEditar(area)}>
                            Editar
                          </CButton>
                          <CButton color="secondary" onClick={() => mostrarDetalles(area)}>
                            Detalles
                          </CButton>
                          <CButton color="danger" onClick={() => handleEliminar(area)}>
                            Eliminar
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCollapse>
          <CCollapse visible={detalleVisible}>
            <CCardBody>
              <h1>Detalles del Área</h1>
              {detalleArea && (
                <div>
                  <p>
                    <strong>ID:</strong> {detalleArea.tipa_Id}
                  </p>
                  <p>
                    <strong>Nombre:</strong> {detalleArea.tipa_area}
                  </p>
                  <p>
                    <strong>Proceso:</strong> {detalleArea.proc_Descripcion}
                  </p>
                  {/* Añadir más campos si es necesario */}
                  <CButton color="secondary" onClick={volverATabla}>
                    Volver
                  </CButton>
                </div>
              )}
            </CCardBody>
          </CCollapse>
        </CCard>
      </CCol>

      <CToaster ref={toaster} push={toast} placement="top-end" />

      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>{areaEditada ? 'Editar Área' : 'Insertar Nueva Área'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormInput
            type="text"
            value={nombreEditado}
            onChange={(e) => {
              setNombreEditado(e.target.value)
              if (!areaEditada) {
                setNuevaArea({ ...nuevaArea, tipa_area: e.target.value })
              }
            }}
            placeholder="Nombre del Área"
          />
          <CFormSelect
            value={procIdEditado}
            onChange={(e) => {
              setProcIdEditado(parseInt(e.target.value))
              if (!areaEditada) {
                setNuevaArea({ ...nuevaArea, proc_Id: parseInt(e.target.value) })
              }
            }}
          >
            <option value="0">Seleccione un Proceso</option>
            {procesos.map((proceso) => (
              <option key={proceso.proc_Id} value={proceso.proc_Id}>
                {proceso.proc_Descripcion}
              </option>
            ))}
          </CFormSelect>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cancelar
          </CButton>
          <CButton color="primary" onClick={areaEditada ? handleActualizar : handleInsertar}>
            {areaEditada ? 'Guardar Cambios' : 'Insertar'}
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  )
}

export default AreaComponent
