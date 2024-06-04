/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { CFormCheck } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilChevronRight, cilChevronBottom } from '@coreui/icons'

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

export default TreeView
