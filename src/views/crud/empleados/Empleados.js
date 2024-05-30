import React from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CAvatar,
  CBadge,
  CRow,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CFormSwitch,
  CToast,
  CToastHeader,
  CToastBody,
  CToastClose,
  CCollapse,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdownDivider,
} from '@coreui/react'
import { CSmartTable } from '@coreui/react-pro'
import { useState, useEffect } from 'react'
import { data } from 'autoprefixer'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilPencil, cilSearch, cilTrash } from '@coreui/icons'
import { obtenerEmpleados, eliminarEmpleado } from '../../../services/empleadoService'

const Empleados = () => {
  const [provincias, setProvincias] = useState([])
  const [visible, setVisible] = useState(false)
  const [usuarioId, setUsuarioId] = useState()
  const [formData, setFormData] = useState({
    empl_Id: '',
    usua_UsuarioEliminacion: '',
    empl_FechaEliminacion: '',
  })

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const provinciasAgrupadas = await obtenerEmpleados()
        setProvincias(provinciasAgrupadas)
      } catch (error) {
        console.error('Error loading employees:', error)
      }
    }

    getEmployees()
  }, [])

  const [details, setDetails] = useState([])
  const columns = [
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false,
      sorter: false,
    },
    'id',
    'nombre',
  ]
  const usersData = [
    {
      pvin_Id: 1,
      pvin_Codigo: 'BA',
      pvin_Nombre: 'Buenos Aires',
      details: [
        {
          empl_Id: 1,
          empl_NombreCompleto: 'kevin',
          escv_Nombre: 'soltero',
          empl_Sexo: 'masculino',
          empl_FechaNacimiento: '2001-06-25',
          empl_Telefono: '33962141',
          empl_DireccionExacta: 'col. Fesitranh',
          pvin_Nombre: 'sps',
          empl_CorreoElectronico: 'kevinmatta2@gmail.com',
          carg_Nombre: 'junior',
          empl_EsAduana: 'si',
        },
      ],
    },
  ]

  const toggleDetails = (index) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }

  const onSend = async () => {
    try {
      const nuevaFechaEliminacion = new Date()
      setFormData({
        empl_UsuarioEliminacion: nuevaFechaEliminacion.toISOString(),
        usua_UsuarioEliminacion: 1,
        empl_Id: usuarioId,
      })

      await eliminarEmpleado(formData)
      navigate('/theme/crud/empleados')
    } catch (error) {
      console.error('Error al crear el empleado:', error)
    }
  }

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>Empleados</strong>
                <Link to="crear">
                  <CButton color="primary" shape="square">
                    Crear
                  </CButton>
                </Link>
              </div>
            </CCardHeader>
            <CCardBody>
              <CSmartTable
                cleaner
                columns={columns}
                columnFilter
                columnSorter
                footer
                items={provincias}
                itemsPerPageSelect
                itemsPerPage={5}
                pagination
                scopedColumns={{
                  show_details: (item) => {
                    return (
                      <td className="py-2">
                        <CButton
                          color="primary"
                          shape="square"
                          size="sm"
                          onClick={() => {
                            toggleDetails(item.pvin_Id)
                          }}
                        >
                          <CIcon
                            icon={details.includes(item.pvin_Id) ? cilArrowTop : cilArrowBottom}
                          />
                        </CButton>
                      </td>
                    )
                  },
                  id: (item) => {
                    return <td className="py-2">{item.pvin_Id}</td>
                  },
                  nombre: (item) => {
                    return <td className="py-2">{item.pvin_Nombre}</td>
                  },
                  details: (item) => {
                    return (
                      <CCollapse visible={details.includes(item.pvin_Id)}>
                        <CCardBody className="p-3">
                          <h5>Detalles</h5>
                          <table className="table table-striped table-bordered">
                            <thead>
                              <tr style={{ textAlign: 'center' }}>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Estado Civil</th>
                                <th>Sexo</th>
                                <th>Nacimiento</th>
                                <th>Teléfono</th>
                                <th>Dirección</th>
                                <th>Correo</th>
                                <th>Cargo</th>
                                <th>Aduana</th>
                                <th className="center">Acciones</th>
                              </tr>
                            </thead>
                            <tbody>
                              {item.details.map((detail) => (
                                <tr key={detail.empl_Id} style={{ textAlign: 'center' }}>
                                  <td>{detail.empl_Id}</td>
                                  <td>{detail.empl_NombreCompleto}</td>
                                  <td>{detail.escv_Nombre}</td>
                                  <td>{detail.empl_Sexo}</td>
                                  <td>{detail.empl_FechaNacimiento}</td>
                                  <td>{detail.empl_Telefono}</td>
                                  <td>{detail.empl_DireccionExacta}</td>
                                  <td>{detail.empl_CorreoElectronico}</td>
                                  <td>{detail.carg_Nombre}</td>
                                  <td>{detail.empl_EsAduana}</td>
                                  <td>
                                    <CDropdown variant="btn-group">
                                      <CDropdownToggle
                                        color="secondary"
                                        variant="outline"
                                        size="sm"
                                      ></CDropdownToggle>
                                      <CDropdownMenu>
                                        <Link
                                          to={`editar/${detail.empl_Id}`}
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
                                          to={`detalle/${detail.empl_Id}`}
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
                                            setUsuarioId(detail.empl_Id)
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
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </CCardBody>
                      </CCollapse>
                    )
                  },
                }}
                // selectable
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
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader>
          <CModalTitle id="LiveDemoExampleLabel">Confirmar eliminar</CModalTitle>
        </CModalHeader>
        <CModalBody>Esta seguro que quiere eliminar el usuario {usuarioId}</CModalBody>
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

export default Empleados
