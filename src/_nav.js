import React from 'react';
import CIcon from '@coreui/icons-react';
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
} from '@coreui/icons';
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react';


// Obtener valores de sessionStorage
const isAdmin = sessionStorage.getItem('usua_EsAdmin') === 'true';
const roleId = sessionStorage.getItem('role_Id');
const isAduana = sessionStorage.getItem('usua_esAduana') === 'true';

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
        visible: isAdmin,
      },
      {
        component: CNavItem,
        name: 'Roles',
        to: '/pantallas/roles/index',
        visible: isAdmin,
      },
    ].filter(item => item.visible !== false), // Filtrar items no visibles
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
        visible: roleId === 'formas de envío',
      },
      {
        component: CNavItem,
        name: 'Monedas',
        to: '/pantallas/monedas',
        visible: roleId === 'monedas',
      },
      {
        component: CNavItem,
        name: 'Tipos de Identificacion',
        to: '/pantallas/tipos de identificacion',
        visible: roleId === 'tipos de identificacion',
      },
      {
        component: CNavItem,
        name: 'Unidades de medida',
        to: '/pantallas/unidades de medida',
        visible: roleId === 'unidades de medida',
      },
      {
        component: CNavItem,
        name: 'Aldeas',
        to: '/pantallas/aldeas',
        visible: roleId === 'aldeas',
      },
      {
        component: CNavItem,
        name: 'Ciudades',
        to: '/pantallas/ciudades',
        visible: roleId === 'ciudades',
      },
      {
        component: CNavItem,
        name: 'Colonias',
        to: '/pantallas/colonias',
        visible: roleId === 'colonias',
      },
      {
        component: CNavItem,
        name: 'Países',
        to: '/pantallas/países',
        visible: roleId === 'países',
      },
      {
        component: CNavItem,
        name: 'Provincias',
        to: '/pantallas/provincias',
        visible: roleId === 'provincias',
      },
      {
        component: CNavItem,
        name: 'Clientes',
        to: '/pantallas/clientes',
        visible: roleId === 'clientes',
      },
      {
        component: CNavItem,
        name: 'Empleados',
        to: '/pantallas/empleados',
        visible: roleId === 'empleados',
      },
      {
        component: CNavItem,
        name: 'Proveedores',
        to: '/pantallas/proveedores',
        visible: roleId === 'proveedores',
      },
      {
        component: CNavItem,
        name: 'Personas',
        to: '/pantallas/personas',
        visible: roleId === 'personas',
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
        visible: isAduana,
      },
      {
        component: CNavItem,
        name: 'Oficinas Aduaneras',
        to: '/pantallas/oficinas aduaneras',
        visible: isAduana,
      },
      {
        component: CNavItem,
        name: 'Oficios y Profesiones',
        to: '/pantallas/oficios y profesiones',
        visible: isAduana,
      },
      {
        component: CNavItem,
        name: 'Declaracion de valor',
        to: '/pantallas/declaracion de valor',
        visible: isAduana,
      },
      {
        component: CNavItem,
        name: 'Duca',
        to: '/pantallas/duca',
        visible: isAduana,
      },
      {
        component: CNavItem,
        name: 'Estados Civiles',
        to: '/pantallas/estados civiles',
        visible: isAduana,
      },
      {
        component: CNavItem,
        name: 'Estados de las mercancías',
        to: '/pantallas/estados de las mercancías',
        visible: isAduana,
      },
      {
        component: CNavItem,
        name: 'Estados del boletín',
        to: '/pantallas/estados del boletín',
        visible: isAduana,
      },
      {
        component: CNavItem,
        name: 'Aranceles',
        to: '/pantallas/aranceles',
        visible: isAduana,
      },
      {
        component: CNavItem,
        name: 'Código de Impuestos',
        to: '/pantallas/código de impuestos',
        visible: isAduana,
      },
      {
        component: CNavItem,
        name: 'Concepto de Pago',
        to: '/pantallas/concepto de pago',
        visible: isAduana,
      },
      {
        component: CNavItem,
        name: 'Impuestos',
        to: '/pantallas/impuestos',
        visible: isAduana,
      },
      {
        component: CNavItem,
        name: 'Incoterms',
        to: '/pantallas/incoterms',
        visible: isAduana,
      },
      {
        component: CNavItem,
        name: 'Tipo de Liquidación',
        to: '/pantallas/tipo de liquidación',
        visible: isAduana,
      },
      {
        component: CNavItem,
        name: 'Boletin de Pago',
        to: '/pantallas/boletin de pago',
        visible: isAduana,
      },
      {
        component: CNavItem,
        name: 'Documento de Sanciones',
        to: '/pantallas/documento de sanciones',
        visible: isAduana,
      },
      {
        component: CNavItem,
        name: 'Regímenes Aduaneros',
        to: '/pantallas/regímenes aduaneros',
        visible: isAduana,
      },
    ].filter(item => item.visible !== false), // Filtrar items no visibles
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
];

export default _nav;
