import React, { useEffect, useState, useRef } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CTable,
  CTableBody,
  CTableHeaderCell,
  CTableHead,
  CTableRow,
  CTableDataCell,
  CToast,
  CToastBody,
  CToastClose,
  CToaster,
  CToastHeader,
} from '@coreui/react';
import { listarCategorias, insertarCategoria, actualizarCategoria, eliminarCategoria } from '../../apiService';

const CategoriaComponent = () => {
  const [categorias, setCategorias] = useState([]);
  const [nuevaCategoria, setNuevaCategoria] = useState({ nombre: '' });
  const [visible, setVisible] = useState(false);
  const [categoriaEditada, setCategoriaEditada] = useState(null);
  const [nombreEditado, setNombreEditado] = useState('');
  const [toast, addToast] = useState(0);
  const toaster = useRef();

  const fetchCategorias = async () => {
    try {
      const data = await listarCategorias();
      if (Array.isArray(data)) {
        setCategorias(data);
      } else {
        console.error('Datos recibidos no son un array:', data);
        setCategorias([]);
      }
    } catch (error) {
      console.error('Error al listar categorías', error);
      setCategorias([]);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

//   const handleInsertar = async () => {
//     try {
//       const response = await insertarCategoria(nuevaCategoria);
//       setCategorias([...categorias, response]);
//       fetchCategorias();
//       addToast(exampleToast('Categoría insertada correctamente', 'success'));
//     } catch (error) {
//       console.error('Error al insertar categoría', error);
//       addToast(exampleToast('No se pudo insertar la categoría', 'danger'));
//     }
//   };

  const handleActualizar = async () => {
    try {
      const updatedCategoria = { ...categoriaEditada, cate_Descripcion: nombreEditado };
      await actualizarCategoria(updatedCategoria);
      fetchCategorias();
      setVisible(false);
      addToast(exampleToast('Categoría actualizada correctamente', 'success'));
    } catch (error) {
      console.error('Error al actualizar categoría', error);
      addToast(exampleToast('No se pudo actualizar la categoría', 'danger'));
    }
  };

//   const handleEliminar = async (categoria) => {
//     try {
//       await eliminarCategoria(categoria);
//       fetchCategorias();
//       addToast(exampleToast('Categoría eliminada correctamente', 'success'));
//     } catch (error) {
//       console.error('Error al eliminar categoría', error);
//       addToast(exampleToast('No se pudo eliminar la categoría', 'danger'));
//     }
//   };

  const abrirModalEditar = (categoria) => {
    setCategoriaEditada(categoria);
    setNombreEditado(categoria.cate_Descripcion);
    setVisible(true);
  };

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
            <strong>Categorías</strong>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Acciones</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {categorias.map((categoria, index) => (
                  <CTableRow key={categoria.cate_Id}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{categoria.cate_Descripcion}</CTableDataCell>
                    <CTableDataCell>
                      <CButton color="info" onClick={() => abrirModalEditar(categoria)}>Editar</CButton>
                      {/* <CButton color="danger" onClick={() => handleEliminar(categoria)}>Eliminar</CButton> */}
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
           
          </CCardBody>
        </CCard>
      </CCol>
      
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Editar Categoría</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <input
            type="text"
            value={nombreEditado}
            onChange={(e) => setNombreEditado(e.target.value)}
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>Cancelar</CButton>
          <CButton color="primary" onClick={handleActualizar}>Guardar Cambios</CButton>
        </CModalFooter>
      </CModal>
      <CToaster ref={toaster} push={toast} placement="top-end" />
    </CRow>
  );
};

export default CategoriaComponent;
