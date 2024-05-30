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
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import { listarRevisiones, insertarRevision, actualizarRevision, eliminarRevision } from '../../services/revisionService';
import { CSmartTable } from '@coreui/react-pro';

const RevisionList = () => {
  const [revisiones, setRevisiones] = useState([]);
  const [nuevaRevision, setNuevaRevision] = useState({
    ensa_Id: '',
    reca_Descripcion: '',
    reca_Cantidad: 0,
    reca_Scrap: false,
    usua_UsuarioCreacion: 1
  });
  const [visible, setVisible] = useState(false);
  const [revisionEditada, setRevisionEditada] = useState(null);
  const [toast, setToast] = useState(0);
  const [modalEliminarVisible, setModalEliminarVisible] = useState(false);
  const [revisionAEliminar, setRevisionAEliminar] = useState(null);
  const toaster = useRef();
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRevisiones = useCallback(async () => {
    setLoading(true);
    try {
      const data = await listarRevisiones();
      setRevisiones(data || []);
    } catch (error) {
      console.error('Error al listar revisiones', error);
      setRevisiones([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRevisiones();
  }, [fetchRevisiones]);

  const handleInsertar = async () => {
    setLoading(true);
    try {
      const revision = {
        ensa_Id: nuevaRevision.ensa_Id,
        reca_Descripcion: nuevaRevision.reca_Descripcion,
        reca_Cantidad: nuevaRevision.reca_Cantidad,
        reca_Scrap: nuevaRevision.reca_Scrap,
        usua_UsuarioCreacion: 1,
        reca_FechaRevision: new Date().toISOString(), // Asegurarse de que la fecha esté en formato ISO 8601
        reca_FechaCreacion: new Date().toISOString()
      };
  
      console.log('Insertando revisión:', revision); // Agrega este log para verificar los datos enviados
      const response = await insertarRevision(revision);
      fetchRevisiones(); // Llama a fetchRevisiones para actualizar la tabla
      setVisible(false);
      setToast(exampleToast('Revisión insertada correctamente', 'success'));
    } catch (error) {
      console.error('Error al insertar revisión', error);
      setToast(exampleToast('No se pudo insertar la revisión', 'danger'));
    } finally {
      setLoading(false);
    }
  };
  
  const handleActualizar = async () => {
    try {
      const revision = {
        ...revisionEditada,
        usua_UsuarioModificacion: 1 // Ajusta esto según sea necesario
      };

      const response = await actualizarRevision(revision);
      fetchRevisiones();
      setVisible(false);
      setToast(exampleToast('Revisión actualizada correctamente', 'success'));
    } catch (error) {
      console.error('Error al actualizar revisión', error);
      setToast(exampleToast('No se pudo actualizar la revisión', 'danger'));
    }
  };

  const handleEliminar = async () => {
    try {
      await eliminarRevision(revisionAEliminar);
      fetchRevisiones();
      setToast(exampleToast('Revisión eliminada correctamente', 'success'));
    } catch (error) {
      console.error('Error al eliminar revisión', error);
      setToast(exampleToast('No se pudo eliminar la revisión', 'danger'));
    }
    setModalEliminarVisible(false);
  };

  const abrirModalEditar = (revision) => {
    setRevisionEditada(revision);
    setVisible(true);
  };

  const abrirModalInsertar = () => {
    setRevisionEditada(null);
    setNuevaRevision({
      ensa_Id: '',
      reca_Descripcion: '',
      reca_Cantidad: 0,
      reca_Scrap: false,
      usua_UsuarioCreacion: 1
    });
    setVisible(true);
  };

  const abrirModalEliminar = (revision) => {
    setRevisionAEliminar(revision);
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
      key: 'reca_Id',
      label: 'ID',
      _style: { width: '5%' },
    },
    {
      key: 'reca_Descripcion',
      label: 'Descripción',
      _style: { width: '10%' },
    },
    {
      key: 'reca_Cantidad',
      label: 'Cantidad',
      _style: { width: '5%' },
    },
    {
      key: 'reca_Scrap',
      label: 'Scrap',
      _style: { width: '10%' },
      filter: false,
      sorter: false,
      _props: { align: 'center' },
    },
    {
      key: 'reca_FechaRevision',
      label: 'Fecha de Revisión',
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
            <strong>Revisiones de Calidad</strong>
            <CButton color="primary" onClick={abrirModalInsertar} style={{ float: 'right' }}>
              Nuevo
            </CButton>
          </CCardHeader>
          <CCardBody>
            {loading ? (
              <p>Cargando...</p>
            ) : (
              <CSmartTable
                activePage={1}
                cleaner
                clickableRows
                columns={columns}
                columnFilter
                columnSorter
                footer
                items={revisiones.filter(revision => revision !== null && revision !== undefined)} // Filtra valores nulos o indefinidos
                itemsPerPageSelect
                itemsPerPage={5}
                pagination
                scopedColumns={{
                  reca_Scrap: (item) => (
                    <td>{item.reca_Scrap ? 'Sí' : 'No'}</td>
                  ),
                  reca_FechaRevision: (item) => (
                    <td>{new Date(item.reca_FechaRevision).toLocaleDateString()}</td>
                  ),
                  show_details: (item) => (
                    <td className="py-2">
                      <CButton size="sm" color="info" onClick={() => abrirModalEditar(item)}>
                        Editar
                      </CButton>
                      <CButton
                        color="primary"
                        shape="square"
                        size="sm"
                        onClick={() => mostrarDetalles(item.reca_Id)}
                      >
                        {details.includes(item.reca_Id) ? 'Ocultar' : 'Detalles'}
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
                    <CCollapse visible={details.includes(item.reca_Id)}>
                      <CCardBody className="p-3">
                        <h4>{item.reca_Descripcion}</h4>
                        <p className="text-muted">Cantidad: {item.reca_Cantidad}</p>
                        <p className="text-muted">Scrap: {item.reca_Scrap ? 'Sí' : 'No'}</p>
                        <p className="text-muted">Fecha de Revisión: {new Date(item.reca_FechaRevision).toLocaleDateString()}</p>
                        <CTable bordered responsive>
                          <CTableHead>
                            <CTableRow>
                              <CTableHeaderCell>Acción</CTableHeaderCell>
                              <CTableHeaderCell>Usuario</CTableHeaderCell>
                              <CTableHeaderCell>Fecha</CTableHeaderCell>
                            </CTableRow>
                          </CTableHead>
                          <CTableBody>
                            <CTableRow>
                              <CTableDataCell>Creador</CTableDataCell>
                              <CTableDataCell>{item.usuarioCreacionNombre}</CTableDataCell>
                              <CTableDataCell>{new Date(item.reca_FechaCreacion).toLocaleString()}</CTableDataCell>
                            </CTableRow>
                            <CTableRow>
                              <CTableDataCell>Modificador</CTableDataCell>
                              <CTableDataCell>{item.usuarioModificacionNombre}</CTableDataCell>
                              <CTableDataCell>{new Date(item.reca_FechaModificacion).toLocaleString()}</CTableDataCell>
                            </CTableRow>
                          </CTableBody>
                        </CTable>
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
            )}
          </CCardBody>
        </CCard>
      </CCol>

      <CToaster ref={toaster} push={toast} placement="top-end" />

      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>{revisionEditada ? 'Editar Revisión' : 'Insertar Nueva Revisión'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol xs={12} md={6} className="mb-3">
              <CFormInput
                type="text"
                value={revisionEditada?.ensa_Id || nuevaRevision.ensa_Id || ''}
                onChange={(e) => {
                  const value = e.target.value;
                  if (revisionEditada) {
                    setRevisionEditada({ ...revisionEditada, ensa_Id: value });
                  } else {
                    setNuevaRevision({ ...nuevaRevision, ensa_Id: value });
                  }
                }}
                placeholder="ID Ensayo"
              />
            </CCol>
            <CCol xs={12} md={6} className="mb-3">
              <CFormInput
                type="text"
                value={revisionEditada?.reca_Descripcion || nuevaRevision.reca_Descripcion || ''}
                onChange={(e) => {
                  const value = e.target.value;
                  if (revisionEditada) {
                    setRevisionEditada({ ...revisionEditada, reca_Descripcion: value });
                  } else {
                    setNuevaRevision({ ...nuevaRevision, reca_Descripcion: value });
                  }
                }}
                placeholder="Descripción"
              />
            </CCol>
            <CCol xs={12} md={6} className="mb-3">
              <CFormInput
                type="number"
                value={revisionEditada?.reca_Cantidad || nuevaRevision.reca_Cantidad || ''}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (revisionEditada) {
                    setRevisionEditada({ ...revisionEditada, reca_Cantidad: value });
                  } else {
                    setNuevaRevision({ ...nuevaRevision, reca_Cantidad: value });
                  }
                }}
                placeholder="Cantidad"
              />
            </CCol>
            <CCol xs={12} md={6} className="mb-3">
              <CFormSelect
                value={revisionEditada?.reca_Scrap !== undefined ? revisionEditada.reca_Scrap : nuevaRevision.reca_Scrap || false}
                onChange={(e) => {
                  const value = e.target.value === 'true';
                  if (revisionEditada) {
                    setRevisionEditada({ ...revisionEditada, reca_Scrap: value });
                  } else {
                    setNuevaRevision({ ...nuevaRevision, reca_Scrap: value });
                  }
                }}
              >
                <option value={false}>No Scrap</option>
                <option value={true}>Scrap</option>
              </CFormSelect>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cancelar
          </CButton>
          <CButton color="primary" onClick={revisionEditada ? handleActualizar : handleInsertar}>
            {revisionEditada ? 'Guardar Cambios' : 'Insertar'}
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal visible={modalEliminarVisible} onClose={() => setModalEliminarVisible(false)}>
        <CModalHeader>
          <CModalTitle>Confirmar Eliminación</CModalTitle>
        </CModalHeader>
        <CModalBody>
          ¿Estás seguro de que deseas eliminar la revisión "{revisionAEliminar?.reca_Descripcion}"?
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

export default RevisionList;
