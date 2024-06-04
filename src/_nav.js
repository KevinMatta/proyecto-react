import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavGroup,
    name: 'Acceso',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Usuarios',
        to: '/pantallas/usuarios',
      },
      {
        component: CNavItem,
        name: 'Roles',
        to: '/pantallas/roles',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'General',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Formas de envío',
        to: '/pantallas/formas de envío',
      },
      {
        component: CNavItem,
        name: 'Monedas',
        to: '/pantallas/monedas',
      },
      {
        component: CNavItem,
        name: 'Tipos de Identificacion',
        to: '/pantallas/tipos de identificacion',
      },
      {
        component: CNavItem,
        name: 'Unidades de medida',
        to: '/pantallas/unidades de medida',
      },
      {
        component: CNavItem,
        name: 'Aldeas',
        to: '/pantallas/aldeas',
      },
      {
        component: CNavItem,
        name: 'Ciudades',
        to: '/pantallas/ciudades',
      },
      {
        component: CNavItem,
        name: 'Colonias',
        to: '/pantallas/colonias',
      },
      {
        component: CNavItem,
        name: 'Países',
        to: '/pantallas/países',
      },
      {
        component: CNavItem,
        name: 'Provincias',
        to: '/pantallas/provincias',
      },
      {
        component: CNavItem,
        name: 'Clientes',
        to: '/pantallas/clientes',
      },
      {
        component: CNavItem,
        name: 'Empleados',
        to: '/pantallas/empleados',
      },
      {
        component: CNavItem,
        name: 'Proveedores',
        to: '/pantallas/proveedores',
      },
      {
        component: CNavItem,
        name: 'Personas',
        to: '/pantallas/personas',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Aduana',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Aduanas',
        to: '/pantallas/aduanas',
      },
      {
        component: CNavItem,
        name: 'Oficinas Aduaneras',
        to: '/pantallas/oficinas aduaneras',
      },
      {
        component: CNavItem,
        name: 'Oficios y Profesiones',
        to: '/pantallas/oficios y profesiones',
      },
      {
        component: CNavItem,
        name: 'Declaracion de valor',
        to: '/pantallas/declaracion de valor',
      },
      {
        component: CNavItem,
        name: 'Duca',
        to: '/pantallas/duca',
      },
      {
        component: CNavItem,
        name: 'Estados Civiles',
        to: '/pantallas/estados civiles',
      },
      {
        component: CNavItem,
        name: 'Estados de las mercancías',
        to: '/pantallas/estados de las mercancías',
      },
      {
        component: CNavItem,
        name: 'Estados del boletín',
        to: '/pantallas/estados del boletín',
      },
      {
        component: CNavItem,
        name: 'Aranceles',
        to: '/pantallas/aranceles',
      },
      {
        component: CNavItem,
        name: 'Código de Impuestos',
        to: '/pantallas/código de impuestos',
      },
      {
        component: CNavItem,
        name: 'Concepto de Pago',
        to: '/pantallas/concepto de pago',
      },
      {
        component: CNavItem,
        name: 'Impuestos',
        to: '/pantallas/impuestos',
      },
      {
        component: CNavItem,
        name: 'Incoterms',
        to: '/pantallas/incoterms',
      },
      {
        component: CNavItem,
        name: 'Tipo de Liquidación',
        to: '/pantallas/tipo de liquidación',
      },
      {
        component: CNavItem,
        name: 'Boletin de Pago',
        to: '/pantallas/boletin de pago',
      },
      {
        component: CNavItem,
        name: 'Documento de Sanciones',
        to: '/pantallas/documento de sanciones',
      },
      {
        component: CNavItem,
        name: 'Regímenes Aduaneros',
        to: '/pantallas/regímenes aduaneros',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Producción',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Planificación',
        to: '/pantallas/planificación',
      },
      {
        component: CNavItem,
        name: 'Módulos',
        to: '/pantallas/módulos',
      },
      {
        component: CNavItem,
        name: 'Órden de Procesos',
        to: '/pantallas/orden de procesos',
      },
      {
        component: CNavItem,
        name: 'Órden de Compra',
        to: '/pantallas/orden de compra',
      },
      {
        component: CNavItem,
        name: 'Órden de Pedido',
        to: '/pantallas/orden de pedido',
      },
      {
        component: CNavItem,
        name: 'Pedidos de Producción',
        to: '/pantallas/pedidos de producción',
      },
      {
        component: CNavItem,
        name: 'Procesos',
        to: '/pantallas/procesos',
      },
      {
        component: CNavItem,
        name: 'Produccion de Módulos',
        to: '/pantallas/produccion de módulos',
      },
      {
        component: CNavItem,
        name: 'Producción por Areas',
        to: '/pantallas/producción por areas',
      },
      {
        component: CNavItem,
        name: 'Producción por País',
        to: '/pantallas/producción por país',
      },
      {
        component: CNavItem,
        name: 'Programación Órden de Compra',
        to: '/pantallas/programación orden de compra',
      },
      {
        component: CNavItem,
        name: 'Ingreso de Materiales',
        to: '/pantallas/ingreso de materiales',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Reportes',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Reportes de Módulos',
        to: '/pantallas/reportes de módulos',
      },
      {
        component: CNavItem,
        name: 'Revisión de Calidad',
        to: '/pantallas/revisión de calidad',
      },
      {
        component: CNavItem,
        name: 'Seguimiento de Procesos',
        to: '/pantallas/seguimiento de procesos',
      },
      {
        component: CNavItem,
        name: 'Subcategorias',
        to: '/pantallas/subcategorias',
      },
      {
        component: CNavItem,
        name: 'Tallas',
        to: '/pantallas/tallas',
      },
      {
        component: CNavItem,
        name: 'Tiempos de Máquinas',
        to: '/pantallas/tiempos de máquinas',
      },
      {
        component: CNavItem,
        name: 'Costos de Materiales',
        to: '/pantallas/costos de materiales',
      },
      {
        component: CNavItem,
        name: 'Consumo de Materiales',
        to: '/pantallas/consumo de materiales',
      },
      {
        component: CNavItem,
        name: 'Pedidos Por Cliente',
        to: '/pantallas/pedidos por cliente',
      },
      {
        component: CNavItem,
        name: 'Materiales por Orden de Compra',
        to: '/pantallas/materiales por orden de compra',
      },
      {
        component: CNavItem,
        name: 'DEVAS Pendientes',
        to: '/pantallas/DEVAS pendientes',
      },
      {
        component: CNavItem,
        name: 'Importaciones',
        to: '/pantallas/importaciones',
      },
      {
        component: CNavItem,
        name: 'Facturas de Exportacion',
        to: '/pantallas/factura de exportacion',
      },
    ],
  },
]

export default _nav
