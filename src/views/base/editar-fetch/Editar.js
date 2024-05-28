import React from 'react'
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
} from '@coreui/react'
import { CSmartTable } from '@coreui/react-pro'
import { useState, useEffect } from 'react'
import { data } from 'autoprefixer'

const Editar = () => {
  const [visible, setVisible] = useState(false)
  const [toast, setToast] = useState(false)
  const [toast2, setToast2] = useState(false)
  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '',
    aduana: false,
    prefijo: '',
  })
  const columns = [
    {
      key: 'codigo',
      _style: { width: '20%' },
    },
    'nombre',
    {
      key: 'aduana',
      _style: { width: '20%' },
    },
    {
      key: 'prefijo',
      _style: { width: '20%' },
    },
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false,
      sorter: false,
    },
  ]
  const [usersData, setUsersData] = useState([
    {
      id: 1,
      codigo: 'AD',
      nombre: 'ANDORRA',
      aduana: 'SI',
      prefijo: '+376',
    },
    {
      id: 2,
      codigo: 'AE',
      nombre: 'EMIRATOS ÁRABES UNIDOS',
      aduana: 'SI',
      prefijo: '+971',
    },
    {
      id: 3,
      codigo: 'AF',
      nombre: 'AFGANISTAN',
      aduana: 'SI',
      prefijo: '+93',
    },
    {
      id: 4,
      codigo: 'AG',
      nombre: 'ANTIGUA Y BARBUDA',
      aduana: 'SI',
      prefijo: '+268',
    },
    {
      id: 5,
      codigo: 'AI',
      nombre: 'ANGUILLA',
      aduana: 'SI',
      prefijo: '+264',
    },
  ])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }


  const FetchEdit = async () => {
    const API_KEY = '4b567cb1c6b24b51ab55248f8e66e5cc'
    const ENCRIPT = 'FZWv3nQTyHYyNvdx'
    const API_PREFIX = 'https://localhost:44380/'
    try{
      const res = await fetch(`${API_PREFIX}api/Paises/Editar`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json', 'XApiKey': API_KEY, 'EncryptionKey': ENCRIPT },
        body: JSON.stringify({
          pais_Id: formData.id,
          pais_Codigo: formData.codigo,
          pais_Nombre: formData.nombre,
          pais_EsAduna: formData.aduana,
          pais_prefijo: formData.prefijo,
          usua_UsuarioModificacion: 1,
        }),
      })
      const data = await res.json()
      console.log(data)
  
      if (data.data.messageStatus  >= 1) {
        setVisible(false)
        setToast(true)
        let newarr = [...usersData]
        console.log(formData.aduana)
        newarr[formData.id-1].codigo = formData.codigo
        newarr[formData.id-1].nombre = formData.nombre
        newarr[formData.id-1].aduana = formData.aduana == true ? 'SI': 'NO'
        newarr[formData.id-1].prefijo = formData.prefijo
        console.log(newarr, 'nuevo arreglo')
        setUsersData(newarr)
        setTimeout(() => {
          setToast(false)
        }, 2000)
      } else {
        setToast2(true)
        setTimeout(() => {
          setToast2(false)
        }, 2000)
      }
    }catch{
      console.log('error')
    }
  }

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Editar</strong> <small>Ejemplo</small>
            </CCardHeader>
            <CCardBody>
              <CSmartTable
                activePage={1}
                cleaner
                columns={columns}
                columnFilter
                columnSorter
                footer
                items={usersData}
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
                            setVisible(!visible)
                            setFormData({
                              id: item.id,
                              codigo: item.codigo,
                              nombre: item.nombre,
                              aduana: item.aduana === 'SI' ? true : false,
                              prefijo: item.prefijo,
                            })
                          }}
                        >
                          Editar
                        </CButton>
                      </td>
                    )
                  },
                }}
                // selectable
                sorterValue={{ column: 'statu', state: 'asc' }}
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
          <CModalTitle id="LiveDemoExampleLabel">Editar</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="row g-3">
            <CCol md={6}>
              <CFormLabel htmlFor="inputCodigo">Codigo</CFormLabel>
              <CFormInput
                type="text"
                id="inputCodigo"
                name="codigo"
                placeholder="HN"
                value={formData.codigo}
                onChange={handleChange}
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="inputNombre">Nombre</CFormLabel>
              <CFormInput
                type="text"
                id="inputNombre"
                name="nombre"
                placeholder="Honduras"
                value={formData.nombre}
                onChange={handleChange}
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="formSwitchAduana">Aduana</CFormLabel>
              <CFormSwitch
                size="xl"
                label="Es una aduana"
                id="formSwitchAduana"
                name="aduana"
                checked={formData.aduana}
                onChange={handleChange}
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="inputPrefijo">Prefijo</CFormLabel>
              <CFormInput
                type="text"
                id="inputPrefijo"
                name="prefijo"
                placeholder="+504"
                value={formData.prefijo}
                onChange={handleChange}
              />
            </CCol>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cancelar
          </CButton>
          <CButton color="primary" onClick={FetchEdit}>
            Guardar
          </CButton>
        </CModalFooter>
      </CModal>
      <CToast
        autohide={false}
        visible={toast}
        color="primary"
        className="text-white align-items-center"
      >
        <div className="d-flex">
          <CToastBody>Pais Editado Correctamente</CToastBody>
          <CToastClose className="me-2 m-auto" white />
        </div>
      </CToast>
      <CToast
        autohide={false}
        visible={toast2}
        color="warning"
        className="text-white align-items-center"
      >
        <div className="d-flex">
          <CToastBody>Error al Editar este pais</CToastBody>
          <CToastClose className="me-2 m-auto" white />
        </div>
      </CToast>
    </>
  )
}

export default Editar
