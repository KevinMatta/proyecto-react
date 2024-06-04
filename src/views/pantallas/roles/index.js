import React, { useState, useEffect, sesionStorage, useRef } from 'react'
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
  CToast,
  CToastHeader,
  CToastBody,
  CToaster,
} from '@coreui/react'
import { Link, useNavigate } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import {
  cilChevronRight,
  cilChevronBottom,
  cilChevronTop,
  cilPencil,
  cilSearch,
  cilTrash,
} from '@coreui/icons'
import { getRoles, RolEliminar } from '../../../services/rolesPorPantallaService'
import { CSmartTable } from '@coreui/react-pro'

function RolesPorPantalla() {
  const [roles, setRoles] = useState([])
  const [details, setDetails] = useState([])
  const [rolId, setRolId] = useState()
  const [formData, setFormData] = useState({})
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()
  const [toast, addToast] = useState(0)
  const toaster = useRef()
  const [notificacion, setNotificacion] = useState({
    estado: '',
    color: '',
    titulo: '',
    mensaje: '',
  })

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
      sessionStorage.setItem(
        'notificacion',
        JSON.stringify({
          estado: '',
          color: '',
          titulo: '',
          mensaje: '',
        }),
      )
    }
    getData()
  }, [visible])

  useEffect(() => {
    const notify = () => {
      if (notificacion.estado == 'eliminar') {
        addToast(exampleToast)
      }
      if (notificacion.estado == 'editar') {
        addToast(exampleToast)
      }
      if (notificacion.estado == 'crear') {
        addToast(exampleToast)
      }
      if (notificacion.estado == '') {
        // sesionStorage.notificacion
      }
      setNotificacion({
        estado: '',
        color: '',
        titulo: '',
        mensaje: '',
      })
    }
    notify()
  }, [notificacion.estado])

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
      const res = await RolEliminar(formData)
      console.log(res.data.messageStatus, 'onSend')
      if (res.data.messageStatus == 1) {
        setNotificacion({
          estado: 'eliminar',
          color: 'success',
          titulo: 'Exito',
          mensaje: 'Rol eliminado con exito',
        })
      } else {
        setNotificacion({
          estado: 'eliminar',
          color: 'warning',
          titulo: 'Advertencia',
          mensaje: 'No se pudo eliminar el rol',
        })
      }
      setVisible(false)
    } catch (error) {
      console.error('Error al eliminar el empleado:', error)
      setNotificacion({
        estado: 'eliminar',
        color: 'error',
        titulo: 'Error',
        mensaje: 'error en la peticion',
      })
    }
    // sessionStorage.setItem(
    //   'notificacion',
    //   JSON.stringify({
    //     estado: 'eliminar',
    //     color: '',
    //     titulo: '',
    //     mensaje: '',
    //   }),
    // )
  }

  const exampleToast = (
    <CToast color={notificacion.color}>
      <CToastHeader closeButton>
        <div className="fw-bold me-auto">{notificacion.titulo}</div>
      </CToastHeader>
      <CToastBody>{notificacion.mensaje}</CToastBody>
    </CToast>
  )

  return (
    <>
      <CCard>
        <CCardHeader>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <strong>Roles por Pantalla</strong>
            <Link to="/pantallas/roles/crear">
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
                          <CDropdownItem
                            onClick={() => navigate(`/pantallas/roles/editar/${item.role_Id}`)}
                          >
                            <CIcon
                              icon={cilPencil}
                              customClassName="nav-icon"
                              width={16}
                              height={16}
                              style={{ marginRight: '5px' }}
                            />
                            Editar
                          </CDropdownItem>
                          <CDropdownItem
                            onClick={() => navigate(`/pantallas/roles/detalle/${item.role_Id}`)}
                          >
                            <CIcon
                              icon={cilSearch}
                              customClassName="nav-icon"
                              width={16}
                              height={16}
                              style={{ marginRight: '5px' }}
                            />
                            Detalle
                          </CDropdownItem>
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
                            Eliminar
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
                                  <td>{detalle.pant_Id}</td>
                                  <td>{detalle.pant_Nombre}</td>
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
      <CToaster className="p-3" placement="top-end" push={toast} ref={toaster} />
    </>
  )
}

export default RolesPorPantalla
