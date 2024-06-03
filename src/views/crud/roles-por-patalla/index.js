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
} from '@coreui/react'
import { Link } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilChevronRight, cilChevronBottom, cilChevronTop } from '@coreui/icons'
import { getRoles } from '../../../services/rolesPorPantallaService'
import { CSmartTable } from '@coreui/react-pro'

function RolesPorPantalla() {
  const [roles, setRoles] = useState([])
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
    'rol',
    'aduanero',
  ]

  useEffect(() => {
    const getData = async () => {
      const list = await getRoles()
      setRoles(list)
    }
    getData()
  }, [])

  const toggleDetails = (roleId) => {
    const newDetails = details.includes(roleId)
      ? details.filter((id) => id !== roleId)
      : [...details, roleId]
    setDetails(newDetails)
  }

  return (
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
              details: (item) => {
                return item.detalles > 0 || item.detalles != null ? (
                  <CCollapse visible={details.includes(item.role_Id)}>
                    <CCardBody className="p-3">
                      <h5>Detalles</h5>
                      <table className="table table-striped table-bordered">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Rol</th>
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
  )
}

export default RolesPorPantalla
