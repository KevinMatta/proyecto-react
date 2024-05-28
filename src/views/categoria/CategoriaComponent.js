import React, { useEffect, useState } from 'react';
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
} from '@coreui/react';
import { listarCategorias, insertarCategoria, actualizarCategoria, eliminarCategoria } from '../../apiService';

const CategoriaComponent = () => {
  const [categorias, setCategorias] = useState([]);
  const [nuevaCategoria, setNuevaCategoria] = useState({ nombre: '' });
  const [visible, setVisible] = useState(false);
  const [categoriaEditada, setCategoriaEditada] = useState(null);
  const [nombreEditado, setNombreEditado] = useState('');

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

  const handleInsertar = async () => {
    try {
      const response = await insertarCategoria(nuevaCategoria);
      setCategorias([...categorias, response]);
      fetchCategorias();
    } catch (error) {
      console.error('Error al insertar categoría', error);
    }
  };

  const handleActualizar = async () => {
    try {
      const updatedCategoria = { ...categoriaEditada, cate_Descripcion: nombreEditado };
      await actualizarCategoria(updatedCategoria);
      fetchCategorias(); // Recargar las categorías después de actualizar
      setVisible(false);
    } catch (error) {
      console.error('Error al actualizar categoría', error);
    }
  };

  const handleEliminar = async (categoria) => {
    try {
      await eliminarCategoria(categoria);
      fetchCategorias(); // Recargar las categorías después de eliminar
    } catch (error) {
      console.error('Error al eliminar categoría', error);
    }
  };

  const abrirModalEditar = (categoria) => {
    setCategoriaEditada(categoria);
    setNombreEditado(categoria.cate_Descripcion);
    setVisible(true);
  };

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
    </CRow>
  );
};

export default CategoriaComponent;
