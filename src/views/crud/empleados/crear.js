/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import {
  CForm,
  CCol,
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
} from '../../../services/empleadoService'

function EmpleadoCrear() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    empl_Nombres: '',
    empl_Apellidos: '',
    empl_DNI: '',
    escv_Id: '',
    empl_Sexo: '',
    empl_FechaNacimiento: '',
    empl_Telefono: '',
    empl_DireccionExacta: '',
    pvin_Id: '',
    empl_CorreoElectronico: '',
    carg_Id: '',
    empl_EsAduana: false,
    usua_UsuarioCreacion: 1,
    empl_FechaCreacion: '',
  })
  const [loading, setLoading] = useState(true)
  const [estadosCiviles, setEstadosCiviles] = useState([])
  const [provincias, setProvincias] = useState([])
  const [cargos, setCargos] = useState([])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  useEffect(() => {
    const cargar = async () => {
      try {
        const estadosCivilesData = await obtenerEstadosCiviles()
        const provinciasData = await obtenerProvincias()
        const cargosData = await obtenerCargos()
        setEstadosCiviles(estadosCivilesData)
        setProvincias(provinciasData)
        setCargos(cargosData)
        setLoading(false)
      } catch (error) {
        console.error('Error al cargar los estados civiles:', error)
      }
    }

    cargar()
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const nuevaFechaNacimiento = new Date(formData.empl_FechaNacimiento).toISOString()
      const nuevaFechaCreacion = new Date()
      setFormData((prevFormData) => ({
        ...prevFormData,
        empl_FechaNacimiento: nuevaFechaNacimiento,
        empl_FechaCreacion: nuevaFechaCreacion.toISOString(),
      }))
      console.log(formData)
      await crearEmpleado(formData)
      tipoToast = 'crear'
      // setTipoToast('crear')
      navigate('/theme/crud/empleados')
    } catch (error) {
      console.error('Error al crear el empleado:', error)
    }
  }

  if (loading) {
    return <p>Cargando...</p>
  }

  return (
    <>
      <CCard>
        <CCardHeader>
          <strong>Crear Empleado</strong>
        </CCardHeader>
        <CCardBody>
          <CForm className="row g-3" onSubmit={onSubmit}>
            <CCol md={6}>
              <CFormLabel htmlFor="empl_Nombres">Nombres</CFormLabel>
              <CFormInput
                type="text"
                id="empl_Nombres"
                name="empl_Nombres"
                value={formData.empl_Nombres}
                onChange={handleChange}
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="empl_Apellidos">Apellidos</CFormLabel>
              <CFormInput
                type="text"
                id="empl_Apellidos"
                name="empl_Apellidos"
                value={formData.empl_Apellidos}
                onChange={handleChange}
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="empl_DNI">Identidad</CFormLabel>
              <CFormInput
                type="text"
                id="empl_DNI"
                name="empl_DNI"
                value={formData.empl_DNI}
                onChange={handleChange}
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="escv_Id">Estado Civil</CFormLabel>
              <select
                className="form-select"
                id="escv_Id"
                name="escv_Id"
                value={formData.escv_Id}
                onChange={handleChange}
              >
                <option value="">Seleccionar estado civil</option>
                {estadosCiviles.map((estadoCivil) => (
                  <option key={estadoCivil.escv_Id} value={estadoCivil.escv_Id}>
                    {estadoCivil.escv_Nombre}
                  </option>
                ))}
              </select>
            </CCol>
            <CCol md={6}>
              <CFormLabel>Sexo</CFormLabel>
              <div style={{ display: 'flex' }}>
                <CFormCheck
                  type="radio"
                  id="sexoMasculino"
                  name="empl_Sexo"
                  label="Masculino"
                  value="M"
                  checked={formData.empl_Sexo === 'M'}
                  onChange={handleChange}
                />

                <CFormCheck
                  type="radio"
                  id="sexoFemenino"
                  name="empl_Sexo"
                  label="Femenino"
                  value="F"
                  checked={formData.empl_Sexo === 'F'}
                  onChange={handleChange}
                />
              </div>
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="empl_FechaNacimiento">Fecha de Nacimiento</CFormLabel>
              <CFormInput
                type="date"
                id="empl_FechaNacimiento"
                name="empl_FechaNacimiento"
                value={formData.empl_FechaNacimiento}
                onChange={handleChange}
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="empl_Telefono">Teléfono</CFormLabel>
              <CFormInput
                type="text"
                id="empl_Telefono"
                name="empl_Telefono"
                value={formData.empl_Telefono}
                onChange={handleChange}
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="empl_DireccionExacta">Dirección Exacta</CFormLabel>
              <CFormInput
                type="text"
                id="empl_DireccionExacta"
                name="empl_DireccionExacta"
                value={formData.empl_DireccionExacta}
                onChange={handleChange}
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="pvin_Id">Provincia</CFormLabel>
              <select
                className="form-select"
                id="pvin_Id"
                name="pvin_Id"
                value={formData.pvin_Id}
                onChange={handleChange}
              >
                <option value="">Seleccionar provincia</option>
                {provincias.map((provincia) => (
                  <option key={provincia.pvin_Id} value={provincia.pvin_Id}>
                    {provincia.pvin_Nombre}
                  </option>
                ))}
              </select>
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="empl_CorreoElectronico">Correo Electrónico</CFormLabel>
              <CFormInput
                type="email"
                id="empl_CorreoElectronico"
                name="empl_CorreoElectronico"
                value={formData.empl_CorreoElectronico}
                onChange={handleChange}
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="carg_Id">Cargo</CFormLabel>
              <select
                className="form-select"
                id="carg_Id"
                name="carg_Id"
                value={formData.carg_Id}
                onChange={handleChange}
              >
                <option value="">Seleccionar cargo</option>
                {cargos.map((cargo) => (
                  <option key={cargo.carg_Id} value={cargo.carg_Id}>
                    {cargo.carg_Nombre}
                  </option>
                ))}
              </select>
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="empl_EsAduana">¿Es Aduana?</CFormLabel>
              <CFormSwitch
                size="xl"
                id="empl_EsAduana"
                name="empl_EsAduana"
                checked={formData.empl_EsAduana}
                onChange={handleChange}
              />
            </CCol>
            <CCol xs={12}>
              <CButton type="submit" color="primary">
                Crear
              </CButton>
            </CCol>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  )
}

export default EmpleadoCrear
