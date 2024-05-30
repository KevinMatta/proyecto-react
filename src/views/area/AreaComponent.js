import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  CButton,
  CCardBody,
  CCollapse,
  CToast,
  CToastBody,
  CToastHeader,
  CToaster,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CFormSelect,
  CFormInput,
  CRow,
  CCol,
  CCard,
  CCardHeader,
} from '@coreui/react';
import {
  listarCategorias,
  insertarCategoria,
  actualizarCategoria,
  eliminarCategoria,
} from '../../services/AreService';

import { listarRevisiones, insertarRevision, actualizarRevision, eliminarRevision } from '../../services/revisionService';


import axios from 'axios';
import { CSmartTable } from '@coreui/react-pro';

const AreaComponent = () => {
  const [areas, setAreas] = useState([]);
  const [procesos, setProcesos] = useState([]);
  const [nuevaArea, setNuevaArea] = useState({ tipa_area: '', proc_Id: 0, usua_UsuarioCreacion: 1 });
  const [visible, setVisible] = useState(false);
  const [areaEditada, setAreaEditada] = useState(null);
  const [nombreEditado, setNombreEditado] = useState('');
  const [procIdEditado, setProcIdEditado] = useState(0);
  const [toast, setToast] = useState(0);
  const [modalEliminarVisible, setModalEliminarVisible] = useState(false);
  const [areaAEliminar, setAreaAEliminar] = useState(null);
  const toaster = useRef();
  const [details, setDetails] = useState([]);

  const API_KEY = '4b567cb1c6b24b51ab55248f8e66e5cc';
  const ENCRYPTION_KEY = 'FZWv3nQTyHYyNvdx';

  const fetchAreas = useCallback(async () => {
    try {
      const data = await listarCategorias();
      if (Array.isArray(data)) {
        setAreas(data);
      } else {
        console.error('Datos recibidos no son un array:', data);
        setAreas([]);
      }
    } catch (error) {
      console.error('Error al listar áreas', error);
      setAreas([]);
    }
  }, []);

  const fetchProcesos = useCallback(async () => {
    try {
      const response = await axios.get('https://localhost:44380/api/Procesos/Listar', {
        headers: {
          'XApiKey': API_KEY,
          'EncryptionKey': ENCRYPTION_KEY,
        },
      });
      setProcesos(response.data.data);
    } catch (error) {
      console.error('Error al listar procesos', error);
      setProcesos([]);
    }
  }, [API_KEY, ENCRYPTION_KEY]);

  useEffect(() => {
    fetchAreas();
    fetchProcesos();
  }, [fetchAreas, fetchProcesos]);

  const handleInsertar = async () => {
    try {
      const nuevaAreaConFecha = {
        ...nuevaArea,
        tipa_FechaCreacion: new Date().toISOString(),
      };
      const response = await insertarCategoria(nuevaAreaConFecha);
      setAreas((prevAreas) => [...prevAreas, response]);
      fetchAreas();
      setVisible(false);
      setToast(exampleToast('Área insertada correctamente', 'success'));
    } catch (error) {
      console.error('Error al insertar área', error);
      setToast(exampleToast('No se pudo insertar el área', 'danger'));
    }
  };

  const handleActualizar = async () => {
    try {
      const updatedArea = { ...areaEditada, tipa_area: nombreEditado, proc_Id: procIdEditado };
      await actualizarCategoria(updatedArea);
      fetchAreas();
      setVisible(false);
      setToast(exampleToast('Área actualizada correctamente', 'success'));
    } catch (error) {
      console.error('Error al actualizar área', error);
      setToast(exampleToast('No se pudo actualizar el área', 'danger'));
    }
  };

  const handleEliminar = async () => {
    try {
      await eliminarCategoria(areaAEliminar);
      fetchAreas();
      setToast(exampleToast('Área eliminada correctamente', 'success'));
    } catch (error) {
      console.error('Error al eliminar área', error);
      setToast(exampleToast('No se pudo eliminar el área', 'danger'));
    }
    setModalEliminarVisible(false);
  };

  const abrirModalEditar = (area) => {
    setAreaEditada(area);
    setNombreEditado(area?.tipa_area || '');
    setProcIdEditado(area?.proc_Id || 0);
    setVisible(true);
  };

  const abrirModalInsertar = () => {
    setAreaEditada(null);
    setNombreEditado('');
    setProcIdEditado(0);
    setNuevaArea({ tipa_area: '', proc_Id: 0, usua_UsuarioCreacion: 1 });
    setVisible(true);
  };

  const abrirModalEliminar = (area) => {
    setAreaAEliminar(area);
    setModalEliminarVisible(true);
  };

  const mostrarDetalles = (index) => {
    setDetails((prevDetails) =>
      prevDetails.includes(index)
        ? prevDetails.filter((i) => i !== index)
        : [...prevDetails, index]
    );
  };

  const columns = [
    {
      key: 'tipa_Id',
      label: 'ID',
      _style: { width: '5%' },
    },
    {
      key: 'tipa_area',
      label: 'Nombre del Área',
      _style: { width: '15%' },
    },
    {
      key: 'proc_Descripcion',
      label: 'Proceso',
      _style: { width: '15%' },
    },
    {
      key: 'show_details',
      label: '',
      _style: { width: '11%' },
      filter: false,
      sorter: false,
    },
  ];

  const exampleToast = (message, color) => (
    <CToast autohide={true} delay={5000} color={color}>
      <CToastHeader closeButton>
        <strong className="me-auto">Notificación</strong>
        <small>Ahora</small>
      </CToastHeader>
      <CToastBody>{message}</CToastBody>
    </CToast>
  );

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Áreas</strong>
            <CButton color="primary" onClick={abrirModalInsertar} style={{ float: 'right' }}>
              Nuevo
            </CButton>
          </CCardHeader>
          <CCardBody>
            <CSmartTable
              activePage={1}
              cleaner
              clickableRows
              columns={columns}
              columnFilter
              columnSorter
              footer
              items={areas}
              itemsPerPageSelect
              itemsPerPage={5}
              pagination
              scopedColumns={{
                show_details: (item) => (
                  <td className="py-2">

                    <CButton size="sm" color="info" onClick={() => abrirModalEditar(item)}>
                        Editar
                      </CButton>
                      <CButton
                      color="primary"
                      //variant="outline"
                      shape="square"
                      size="sm"
                      onClick={() => mostrarDetalles(item.tipa_Id)}
                    >
                      {details.includes(item.tipa_Id) ? 'Ocultar' : 'Detalles'}
                    </CButton>
                      <CButton
                        size="sm"
                        color="danger"
                        className="ml-1"
                        onClick={() => abrirModalEliminar(item)}
                      >
                        Eliminar
                      </CButton>

                  </td>
                ),
                details: (item) => (
                  <CCollapse visible={details.includes(item.tipa_Id)}>
                    <CCardBody className="p-3">
                      <h4>{item.tipa_area}</h4>
                      <p className="text-muted">Proceso: {item.proc_Descripcion}</p>
                      <div className="mt-3">
                        <table className="table table-striped table-bordered">
                          <thead>
                            <tr>
                              <th>Acción</th>
                              <th>Usuario</th>
                              <th>Fecha</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Creador</td>
                              <td>{item.usarioCreacion}</td>
                              <td>{item.tipa_FechaCreacion}</td>
                            </tr>
                            <tr>
                              <td>Modificador</td>
                              <td>{item.usuarioModificacion}</td>
                              <td>{item.tipa_FechaModificacion}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </CCardBody>
                  </CCollapse>
                ),
              }}
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

      <CToaster ref={toaster} push={toast} placement="top-end" />

      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>{areaEditada ? 'Editar Área' : 'Insertar Nueva Área'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol xs={12} md={6}>
              <CFormInput
                type="text"
                value={nombreEditado}
                onChange={(e) => {
                  setNombreEditado(e.target.value);
                  if (!areaEditada) {
                    setNuevaArea({ ...nuevaArea, tipa_area: e.target.value });
                  }
                }}
                placeholder="Nombre del Área"
              />
            </CCol>
            <CCol xs={12} md={6}>
              <CFormSelect
                value={procIdEditado}
                onChange={(e) => {
                  setProcIdEditado(parseInt(e.target.value));
                  if (!areaEditada) {
                    setNuevaArea({ ...nuevaArea, proc_Id: parseInt(e.target.value) });
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
            </CCol>
          </CRow>
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

      <CModal visible={modalEliminarVisible} onClose={() => setModalEliminarVisible(false)}>
        <CModalHeader>
          <CModalTitle>Confirmar Eliminación</CModalTitle>
        </CModalHeader>
        <CModalBody>
          ¿Estás seguro de que deseas eliminar el área "{areaAEliminar?.tipa_area}"?
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalEliminarVisible(false)}>
            Cancelar
          </CButton>
          <CButton color="danger" onClick={handleEliminar}>
            Eliminar
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  );
};

export default AreaComponent;
