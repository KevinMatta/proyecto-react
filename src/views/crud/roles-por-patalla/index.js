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
  CCollapse,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
} from '@coreui/react'
import { Link } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import {
  cilChevronRight,
  cilChevronBottom,
  cilChevronTop,
  cilPencil,
  cilSearch,
  cilTrash,
} from '@coreui/icons'
import { getRoles } from '../../../services/rolesPorPantallaService'
import { CSmartTable } from '@coreui/react-pro'

function RolesPorPantalla() {
  const [roles, setRoles] = useState([])
  const [details, setDetails] = useState([])
  const [rolId, setRolId] = useState()
  const [formData, setFormData] = useState({})

  const [visible, setVisible] = useState(false)
  const columns = [
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false,
      sorter: false,
    },
    'id',
    'rol',
    'aduanero',
    {
      key: 'acciones',
      label: 'acciones',
      _style: { width: '5%' },
      filter: false,
      sorter: false,
    },
  ]

  useEffect(() => {
    const getData = async () => {
      const list = await getRoles()
      setRoles(list)
      console.log(list)
    }
    getData()
  }, [])

  const toggleDetails = (roleId) => {
    const newDetails = details.includes(roleId)
      ? details.filter((id) => id !== roleId)
      : [...details, roleId]
    setDetails(newDetails)
  }

  const onSend = async () => {
    try {
      const nuevaFechaEliminacion = new Date()
      formData.role_Id = rolId
      formData.usua_UsuarioEliminacion = 1
      formData.role_FechaEliminacion = nuevaFechaEliminacion.toISOString()
      console.log(formData, 'rol para eliminar')
      await eliminarRol(formData)
      setVisible(false)
    } catch (error) {
      console.error('Error al crear el empleado:', error)
    }
  }

  return (
    <>
      <CCard>
        <CCardHeader>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <strong>Roles por Pantalla</strong>
            <Link to="crear">
              <CButton color="primary" shape="square">
                Crear
              </CButton>
            </Link>
          </div>
        </CCardHeader>
        <CCardBody>
          {roles.length > 0 ? (
            <CSmartTable
              cleaner
              columns={columns}
              columnFilter
              columnSorter
              footer
              items={roles}
              itemsPerPageSelect
              itemsPerPage={5}
              pagination
              scopedColumns={{
                show_details: (item) => {
                  return (
                    <td className="py-2">
                      <CButton
                        color="secondary"
                        shape="square"
                        size="sm"
                        onClick={() => {
                          toggleDetails(item.role_Id)
                        }}
                      >
                        <CIcon
                          icon={details.includes(item.role_Id) ? cilChevronTop : cilChevronBottom}
                        />
                      </CButton>
                    </td>
                  )
                },
                id: (item) => {
                  return <td className="py-2">{item.role_Id}</td>
                },
                rol: (item) => {
                  return <td className="py-2">{item.role_Descripcion}</td>
                },
                aduanero: (item) => {
                  return <td className="py-2">{item.aduanero}</td>
                },
                acciones: (item) => {
                  return (
                    <td className="py-2">
                      <CDropdown variant="btn-group">
                        <CDropdownToggle
                          color="secondary"
                          variant="outline"
                          size="sm"
                        ></CDropdownToggle>
                        <CDropdownMenu>
                          <Link
                            to={`editar/${item.role_Id}`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                          >
                            <CDropdownItem>
                              <CIcon
                                icon={cilPencil}
                                customClassName="nav-icon"
                                width={16}
                                height={16}
                                style={{ marginRight: '5px' }}
                              />
                              Editar
                            </CDropdownItem>
                          </Link>
                          <Link
                            to={`detalle/${item.role_Id}`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                          >
                            <CDropdownItem>
                              <CIcon
                                icon={cilSearch}
                                customClassName="nav-icon"
                                width={16}
                                height={16}
                                style={{ marginRight: '5px' }}
                              />
                              Detalle
                            </CDropdownItem>
                          </Link>
                          <CDropdownItem
                            onClick={() => {
                              setVisible(!visible)
                              setRolId(item.role_Id)
                            }}
                          >
                            <CIcon
                              icon={cilTrash}
                              customClassName="nav-icon"
                              width={16}
                              height={16}
                              style={{ marginRight: '5px' }}
                            />
                            Editar
                          </CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                    </td>
                  )
                },
                details: (item) => {
                  return item.detalles > 0 || item.detalles != null ? (
                    <CCollapse visible={details.includes(item.role_Id)}>
                      <CCardBody className="p-3">
                        <h5>Detalles</h5>
                        <table className="table table-striped table-bordered">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Pantalla</th>
                            </tr>
                          </thead>
                          <tbody>
                            {item.detalles &&
                              item.detalles.map((detalle, index) => (
                                <tr key={index}>
                                  <td>{detalle.role_Id}</td>
                                  <td>{detalle.role_Descripcion}</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </CCardBody>
                    </CCollapse>
                  ) : (
                    <CCollapse visible={details.includes(item.role_Id)}>
                      <CCardBody className="p-3">
                        <h5>no hay pantallas</h5>
                      </CCardBody>
                    </CCollapse>
                  )
                },
              }}
              sorterValue={{ column: 'status', state: 'asc' }}
              tableFilter
              tableProps={{
                className: 'add-this-class',
                responsive: true,
                striped: true,
                hover: true,
              }}
              tableBodyProps={{
                className: 'align-middle',
              }}
            />
          ) : (
            <div>Cargando...</div>
          )}
        </CCardBody>
      </CCard>
      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader>
          <CModalTitle id="LiveDemoExampleLabel">Confirmar eliminar</CModalTitle>
        </CModalHeader>
        <CModalBody>Esta seguro que quiere eliminar el usuario {rolId}</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cancelar
          </CButton>
          <CButton color="primary" onClick={onSend}>
            Eliminar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default RolesPorPantalla
