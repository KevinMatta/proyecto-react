import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import {
  CFormCheck,
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CForm,
  CFormInput,
  CCol,
  CButton,
  CFormLabel,
  CFormSwitch,
} from '@coreui/react'
import { TreeView } from '../../../components/index'
import CIcon from '@coreui/icons-react'
import { cilChevronRight, cilChevronBottom } from '@coreui/icons'
import { getPantallas, RolBuscar, RolEditar } from '../../../services/rolesPorPantallaService'

import { useNavigate } from 'react-router-dom'

function RolesPorPantallaEditar() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [nodos, setnodos] = useState([])
  const [PantallasSeleccionadas, setPantallasSeleccionadas] = useState([])
  const [formData, setFormData] = useState({
    role_Id: 0,
    role_Descripcion: '',
    pant_Ids: '',
    role_Aduana: false,
    usua_UsuarioModificacion: 1,
    role_FechaModificacion: '',
  })

  useEffect(() => {
    const getData = async () => {
      const pantallas = await getPantallas()
      const rol = await RolBuscar(id)
      setFormData(rol)
      console.log(rol)

      if (rol.detalles != null) {
        rol.detalles.forEach((pantalla) => {
          updatePantallasSeleccionadas(pantalla.pant_Id, '', true)
        })
        const updatedNodos = pantallas.map((esquema) => {
          const allChildrenChecked = esquema.children.every((child) => child.checked)
          return {
            ...esquema,
            children: esquema.children.map((child) => {
              return {
                ...child,
                checked: rol.detalles.some((detalle) => detalle.pant_Id === child.pant_Id),
              }
            }),
            checked: allChildrenChecked,
          }
        })
        const updatedEsquema = updatedNodos.map((esquema) => {
          const allChildrenChecked = esquema.children.every((child) => child.checked)
          return {
            ...esquema,
            checked: allChildrenChecked,
          }
        })

        setnodos(updatedEsquema)
        console.log(updatedEsquema)
      } else {
        setnodos(pantallas)
      }
    }

    getData()
  }, [id])

  const handleCheckbox = (id, checked, nivel) => {
    const toggleCheck = (nodos) => {
      return nodos.map((nodo, idx) => {
        if (nivel === 1) {
          if (idx === id) {
            nodo.checked = !checked
            nodo.children.forEach((nodito) => {
              nodito.checked = !checked
              updatePantallasSeleccionadas(nodito.pant_Id, nodito.pant_Nombre, !checked)
            })
          }
          updatePantallasSeleccionadas(nodo.pant_Id, nodo.pant_Nombre, !checked)
        }
        if (nivel === 2) {
          nodo.children = nodo.children.map((nodito) => {
            if (nodito.pant_Id === id) {
              nodito.checked = !checked
              updatePantallasSeleccionadas(nodito.pant_Id, nodito.pant_Nombre, !checked)
            }
            return nodito
          })
        }
        return nodo
      })
    }
    setnodos(toggleCheck(nodos))
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const updatePantallasSeleccionadas = (id, nombre, checked) => {
    setPantallasSeleccionadas((prevPantallasSeleccionadas) => {
      if (checked) {
        return [...prevPantallasSeleccionadas, { pant_Id: id }]
      } else {
        return prevPantallasSeleccionadas.filter((obj) => obj.pant_Id !== id)
      }
    })
  }

  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()
    const nuevaFechaModificacion = new Date()
    formData.role_FechaModificacion = nuevaFechaModificacion.toISOString()
    formData.role_Id = parseInt(id)
    formData.usua_UsuarioModificacion = 1

    const form = event.currentTarget
    if (form.checkValidity() === false) {
      setValidated(true)
    } else {
      setPantallasSeleccionadas((prevSelected) =>
        prevSelected.filter((obj) => obj.pant_Id !== undefined),
      )
      const idsFiltrados = PantallasSeleccionadas.filter((obj) => obj.pant_Id !== undefined)
      formData.pant_Ids = JSON.stringify(idsFiltrados)
      formData.detalles = ''
      console.log(formData)
      RolEditar(formData)
      // navigate('/pantallas/roles/index')
    }
  }

  const volver = () => {
    navigate('/pantallas/roles/index')
  }

  return (
    <>
      <CCard>
        <CCardHeader>Roles por Pantalla</CCardHeader>
        <CCardBody>
          <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <CCol md={4}>
              <CFormInput
                type="text"
                id="role_Descripcion"
                name="role_Descripcion"
                label="Rol"
                placeholder="Roles"
                aria-describedby="exampleFormControlInputHelpInline"
                required
                feedbackInvalid="Escriba un Rol"
                value={formData.role_Descripcion}
                onChange={handleChange}
              />
            </CCol>
            <CCol md={4}>
              <CFormLabel htmlFor="role_Aduana">Es Aduana</CFormLabel>
              <CFormSwitch
                size="xl"
                id="role_Aduana"
                name="role_Aduana"
                checked={formData.role_Aduana}
                onChange={handleChange}
              />
            </CCol>
            <div style={{ marginTop: '30px' }}>
              <span>Pantallas</span>
              <CCard>
                <CCardBody>
                  <TreeView nodos={nodos} handleCheckbox={handleCheckbox} />
                </CCardBody>
              </CCard>
            </div>
            <CCardFooter>
              <div style={{ display: 'flex', gap: '10px' }}>
                <CButton type="submit" color="primary">
                  Guardar
                </CButton>
                <CButton type="button" color="secondary" onClick={volver}>
                  Cancelar
                </CButton>
              </div>
            </CCardFooter>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  )
}

export default RolesPorPantallaEditar
