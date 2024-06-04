/* eslint-disable react/prop-types */
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
import CIcon from '@coreui/icons-react'
import { cilChevronRight, cilChevronBottom } from '@coreui/icons'
import { getPantallas, RolInsertar } from '../../../services/rolesPorPantallaService'

import { useNavigate } from 'react-router-dom'

const TreeView = ({ nodos, handleCheckbox }) => {
  const [expandednodos, setExpandednodos] = useState({})

  const togglenodo = (nodoId) => {
    setExpandednodos((estadoAnterior) => ({
      ...estadoAnterior,
      [nodoId]: !estadoAnterior[nodoId],
    }))
  }

  function renderTreeView(nodos) {
    return nodos.map((nodo, idx) => (
      <div key={idx} style={{ marginLeft: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <CIcon
            icon={expandednodos[idx] ? cilChevronBottom : cilChevronRight}
            customClassName="nav-icon"
            onClick={() => togglenodo(idx)}
            style={{ cursor: 'pointer', marginRight: '5px' }}
            width={16}
            height={16}
          />
          <CFormCheck
            id={`nodo-${idx}`}
            label={nodo.pant_Esquema}
            checked={nodo.checked || false}
            onChange={() => handleCheckbox(idx, nodo.checked, nodo.nivel)}
          />
        </div>
        {nodo.children &&
          expandednodos[idx] &&
          nodo.children.map((nodito) => (
            <div key={nodito.pant_Id} style={{ marginLeft: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div key={nodito.pant_Id} style={{ marginLeft: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CFormCheck
                      id={`nodo-${nodito.pant_Id}`}
                      label={nodito.pant_Nombre}
                      checked={nodito.checked || false}
                      onChange={() => handleCheckbox(nodito.pant_Id, nodito.checked, nodito.nivel)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    ))
  }

  return <div>{renderTreeView(nodos)}</div>
}

function RolesPorPantallaCrear() {
  const navigate = useNavigate()
  const [nodos, setnodos] = useState([])
  const [PantallasSeleccionadas, setPantallasSeleccionadas] = useState([])
  const [formData, setFormData] = useState({
    role_Descripcion: '',
    pant_Ids: '',
    role_Aduana: false,
    usua_UsuarioCreacion: 1,
    role_FechaCreacion: '',
  })

  useEffect(() => {
    const getData = async () => {
      const data = await getPantallas()
      setnodos(data)
    }
    getData()
  }, [])

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
    const nuevaFechaCreacion = new Date()
    formData.role_FechaCreacion = nuevaFechaCreacion.toISOString()

    const form = event.currentTarget
    if (form.checkValidity() === false) {
      setValidated(true)
    } else {
      setPantallasSeleccionadas((prevSelected) =>
        prevSelected.filter((obj) => obj.pant_Id !== undefined),
      )
      const idsFiltrados = PantallasSeleccionadas.filter((obj) => obj.pant_Id !== undefined)
      formData.pant_Ids = JSON.stringify(idsFiltrados)
      RolInsertar(formData)
      navigate('/pantallas/roles/index')
    }
  }

  const volver = () => {
    navigate('/pantallas/roles/index')
  }

  return (
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
              // value={formData.role_Descripcion}
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
  )
}

export default RolesPorPantallaCrear
