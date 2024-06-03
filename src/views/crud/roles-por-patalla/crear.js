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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilChevronRight, cilChevronBottom } from '@coreui/icons'
import { getPantallas } from '../../../services/rolesPorPantallaService'

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
  const [nodos, setnodos] = useState([])
  const [PantallasSeleccionadas, setPantallasSeleccionadas] = useState([])

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
              updatePantallasSeleccionadas(nodito.pant_Id, !checked)
            })
          }
          updatePantallasSeleccionadas(nodo.pant_Id, !checked)
        }
        if (nivel === 2) {
          nodo.children = nodo.children.map((nodito) => {
            if (nodito.pant_Id === id) {
              nodito.checked = !checked
              updatePantallasSeleccionadas(nodito.pant_Id, !checked)
            }
            return nodito
          })
        }
        return nodo
      })
    }
    setnodos(toggleCheck(nodos))
  }

  const updatePantallasSeleccionadas = (id, checked) => {
    setPantallasSeleccionadas((prevPantallasSeleccionadas) => {
      if (checked) {
        return [...prevPantallasSeleccionadas, id]
      } else {
        return prevPantallasSeleccionadas.filter((selectedId) => selectedId !== id)
      }
    })
  }

  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()

    const form = event.currentTarget
    if (form.checkValidity() === false) {
      setValidated(true)
    } else {
      setPantallasSeleccionadas((prevSelected) => prevSelected.filter((id) => id !== undefined))
      const idsFiltrados = PantallasSeleccionadas.filter((id) => id !== undefined)
      console.log('enviar datos', idsFiltrados)
    }
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
              id="roltxt"
              label="Rol"
              placeholder="Roles"
              aria-describedby="exampleFormControlInputHelpInline"
              required
              feedbackInvalid="Escriba un Rol"
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
            <CButton type="submit" color="primary">
              Guardar
            </CButton>
          </CCardFooter>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default RolesPorPantallaCrear
