import { element } from 'prop-types'
import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

//cruds
const Empleados = React.lazy(() => import('./views/crud/empleados/Empleados'))
const EmpleadoEditar = React.lazy(() => import('./views/crud/empleados/editar'))
const EmpleadoCrear = React.lazy(() => import('./views/crud/empleados/crear'))
const EmpleadoDetalle = React.lazy(() => import('./views/crud/empleados/detalle'))

//theme
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))
const Editar = React.lazy(() => import('./views/base/editar-fetch/Editar'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const Categoria = React.lazy(() => import('./views/categoria/CategoriaComponent'))
const Area = React.lazy(() => import('./views/area/AreaComponent'))
const Revision = React.lazy(() => import('./views/revision/revisionComponent'))

//Pantallas de dibujado
const Acuerdos = React.lazy(() => import('./views/pantallas/acuerdos TLC/acuerdos TLC'))
const Aduanas = React.lazy(() => import('./views/pantallas/aduanas/aduanas'))
const Aldeas = React.lazy(() => import('./views/pantallas/aldeas/aldeas'))
const Aranceles = React.lazy(() => import('./views/pantallas/aranceles/aranceles'))
const Areas = React.lazy(() => import('./views/pantallas/areas/areas'))
const Boletin = React.lazy(() => import('./views/pantallas/boletin de pago/boletin de pago'))
const Cargos = React.lazy(() => import('./views/pantallas/cargos/cargos'))
const Categorias = React.lazy(() => import('./views/pantallas/categorías/categorías'))
const Ciudades = React.lazy(() => import('./views/pantallas/ciudades/ciudades'))
const Clientes = React.lazy(() => import('./views/pantallas/clientes/clientes'))
const Colonias = React.lazy(() => import('./views/pantallas/colonias/colonias'))
const Codigo = React.lazy(() => import('./views/pantallas/código de impuestos/código de impuestos'))
const Colores = React.lazy(() => import('./views/pantallas/colores/colores'))
const Comerciante = React.lazy(() => import('./views/pantallas/comerciante individual/comerciante individual'))
const Concepto = React.lazy(() => import('./views/pantallas/concepto de pago/concepto de pago'))
const Condiciones = React.lazy(() => import('./views/pantallas/condiciones comerciales/condiciones comerciales'))
const Consumo = React.lazy(() => import('./views/pantallas/consumo de materiales/consumo de materiales'))
const Contratos = React.lazy(() => import('./views/pantallas/contratos de adhesion/contratos de adhesion'))
const Costos = React.lazy(() => import('./views/pantallas/costos de materiales/costos de materiales'))
const Declaracion = React.lazy(() => import('./views/pantallas/declaracion de valor/declaracion de valor'))
const Devas = React.lazy(() => import('./views/pantallas/DEVAS pendientes/DEVAS pendientes'))
const Documentos = React.lazy(() => import('./views/pantallas/documento de sanciones/documento de sanciones'))
const Duca = React.lazy(() => import('./views/pantallas/duca/duca'))

//pendiente
const Empleado = React.lazy(() => import('./views/pantallas/empleados/empleados'))
const Estados = React.lazy(() => import('./views/pantallas/estados civiles/estados civiles'))
const Estados_M = React.lazy(() => import('./views/pantallas/estados de las mercancías/estados de las mercancías'))
const Estados_B = React.lazy(() => import('./views/pantallas/estados del boletín/estados del boletín'))
const Estilos = React.lazy(() => import('./views/pantallas/estilos/estilos'))
const Facturas = React.lazy(() => import('./views/pantallas/factura de exportacion/factura de exportacion'))
const Formas = React.lazy(() => import('./views/pantallas/formas de envío/formas de envío'))
const Formas_P = React.lazy(() => import('./views/pantallas/formas de pago/formas de pago'))

const Funciones = React.lazy(() => import('./views/pantallas/funciones de máquinas/funciones de máquinas'))
const Historial = React.lazy(() => import('./views/pantallas/historial de máquinas/historial de máquinas'))
const Importaciones = React.lazy(() => import('./views/pantallas/importaciones/importaciones'))
const Impuestos = React.lazy(() => import('./views/pantallas/impuestos/impuestos'))
const Impuestos_P = React.lazy(() => import('./views/pantallas/impuestos prod/impuestos prod'))
const Incoterms = React.lazy(() => import('./views/pantallas/incoterms/incoterms'))
const Ingresos = React.lazy(() => import('./views/pantallas/ingreso de materiales/ingreso de materiales'))
const Inicio_A = React.lazy(() => import('./views/pantallas/inicio aduana/inicio aduana'))
const Inicio_G = React.lazy(() => import('./views/pantallas/inicio general/inicio general'))
const Inicio_P = React.lazy(() => import('./views/pantallas/inicio produccion/inicio produccion'))
const Inventario = React.lazy(() => import('./views/pantallas/inventario/inventario'))
const Lotes = React.lazy(() => import('./views/pantallas/lotes/lotes'))
const Lugares = React.lazy(() => import('./views/pantallas/lugares de embarque/lugares de embarque'))
const Maquinas = React.lazy(() => import('./views/pantallas/máquinas/máquinas'))
const Maquinas_H = React.lazy(() => import('./views/pantallas/máquinas habilitadas/máquinas habilitadas'))
const Marcas_C = React.lazy(() => import('./views/pantallas/marcas de carros/marcas de carros'))
const Marcas = React.lazy(() => import('./views/pantallas/marcas de máquinas/marcas de máquinas'))
const Materiales = React.lazy(() => import('./views/pantallas/materiales/materiales'))
const Materiales_B = React.lazy(() => import('./views/pantallas/materiales a brindar/materiales a brindar'))
const Materiales_O = React.lazy(() => import('./views/pantallas/materiales por orden de compra/materiales por orden de compra'))
const Modelos = React.lazy(() => import('./views/pantallas/modelos de máquinas/modelos de máquinas'))
const Modulos = React.lazy(() => import('./views/pantallas/módulos/módulos'))
const Modedas = React.lazy(() => import('./views/pantallas/monedas/monedas'))
const Niveles = React.lazy(() => import('./views/pantallas/niveles comerciales/niveles comerciales'))
const Oficinas = React.lazy(() => import('./views/pantallas/oficinas aduaneras/oficinas aduaneras'))
const Oficios = React.lazy(() => import('./views/pantallas/oficios y profesiones/oficios y profesiones'))
const Orden_C = React.lazy(() => import('./views/pantallas/orden de compra/orden de compra'))
const Orden_P = React.lazy(() => import('./views/pantallas/orden de pedido/orden de pedido'))
const Paises = React.lazy(() => import('./views/pantallas/países/países'))
const Pedidos_P = React.lazy(() => import('./views/pantallas/pedidos de producción/pedidos de producción'))
const Pedidos_C = React.lazy(() => import('./views/pantallas/pedidos por cliente/pedidos por cliente'))
const Persona_J = React.lazy(() => import('./views/pantallas/persona juridica/persona juridica'))
const Persona_N = React.lazy(() => import('./views/pantallas/persona natural/persona natural'))
const Persona = React.lazy(() => import('./views/pantallas/personas/personas'))
const Planificaciones = React.lazy(() => import('./views/pantallas/planificación/planificación'))
const Procesos = React.lazy(() => import('./views/pantallas/procesos/procesos'))
const Produccion_M = React.lazy(() => import('./views/pantallas/produccion de módulos/produccion de módulos'))
const Produccion_A = React.lazy(() => import('./views/pantallas/producción por areas/producción por areas'))
const Produccion_P = React.lazy(() => import('./views/pantallas/producción por país/producción por país'))
const Programacion = React.lazy(() => import('./views/pantallas/programación orden de compra/programación orden de compra'))
const Proveedores = React.lazy(() => import('./views/pantallas/proveedores/proveedores'))
const Provincias = React.lazy(() => import('./views/pantallas/provincias/provincias'))
const Rastreo = React.lazy(() => import('./views/pantallas/rastreo de la orden de compra/rastreo de la orden de compra'))
const Regimenes = React.lazy(() => import('./views/pantallas/regímenes aduaneros/regímenes aduaneros'))
const Reportes = React.lazy(() => import('./views/pantallas/reportes de módulos/reportes de módulos'))
const Revicion = React.lazy(() => import('./views/pantallas/revisión de calidad/revisión de calidad'))
const Roles = React.lazy(() => import('./views/pantallas/roles/roles'))
const Seguimiento = React.lazy(() => import('./views/pantallas/seguimiento de procesos/seguimiento de procesos'))
const Subcategoria = React.lazy(() => import('./views/pantallas/subcategorias/subcategorias'))
const Tallas = React.lazy(() => import('./views/pantallas/tallas/tallas'))
const Tiempo = React.lazy(() => import('./views/pantallas/tiempos de máquinas/tiempos de máquinas'))
const Tipo_D = React.lazy(() => import('./views/pantallas/tipo de documento/tipo de documento'))
const Tipo_E = React.lazy(() => import('./views/pantallas/tipo de embalaje/tipo de embalaje'))
const Tipo_L = React.lazy(() => import('./views/pantallas/tipo de liquidación/tipo de liquidación'))
const Tipo_Id = React.lazy(() => import('./views/pantallas/tipos de Identificacion/tipos de Identificacion'))
const Tipo_In = React.lazy(() => import('./views/pantallas/tipos de intermediarios/tipos de intermediarios'))
const Unidades = React.lazy(() => import('./views/pantallas/unidades de medida/unidades de medida'))
const Usuarios = React.lazy(() => import('./views/pantallas/usuarios/usuarios'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/theme/editar', name: 'Editar', element: Editar },
  { path: '/theme/crud/empleados', name: 'Empleados', element: Empleados },
  { path: '/theme/crud/empleados/crear', name: 'Crear Empleado', element: EmpleadoCrear },
  { path: '/theme/crud/empleados/editar/:id', name: 'Editar Empleado', element: EmpleadoEditar },
  { path: '/theme/crud/empleados/detalle/:id', name: 'Detalle Empleado', element: EmpleadoDetalle },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
  { path: '/categoria', name: 'Categoria', element: Categoria },
  { path: '/area', name: 'Area', element: Area },
  { path: '/revision', name: 'Revision', element: Revision },



//pantallas dibujado
{ path: '/pantallas/acuerdos TLC', name: 'Acuerdos TLC', element: Acuerdos },
{ path: '/pantallas/aduanas', name: 'Aduanas', element: Aduanas },
{ path: '/pantallas/aldeas', name: 'Aldeas', element: Aldeas },
{ path: '/pantallas/aranceles', name: 'Aranceles', element: Aranceles },
{ path: '/pantallas/areas', name: 'Areas', element: Areas },
{ path: '/pantallas/boletin de pago', name: 'Boletin de Pago', element: Boletin },
{ path: '/pantallas/cargos', name: 'Cargos', element: Cargos },
{ path: '/pantallas/categorías', name: 'Categorias', element: Categorias },
{ path: '/pantallas/ciudades', name: 'Ciudades', element: Ciudades },
{ path: '/pantallas/clientes', name: 'Clientes', element: Clientes },
{ path: '/pantallas/colonias', name: 'Colonias', element: Colonias }, // Ruta agregada
{ path: '/pantallas/código de impuestos', name: 'Código de Impuestos', element: Codigo },
{ path: '/pantallas/colores', name: 'Colores', element: Colores },
{ path: '/pantallas/comerciante individual', name: 'Comerciante Individual', element: Comerciante },
{ path: '/pantallas/concepto de pago', name: 'Concepto de Pago', element: Concepto },
{ path: '/pantallas/condiciones comerciales', name: 'Condiciones Comerciales', element: Condiciones },
{ path: '/pantallas/consumo de materiales', name: 'Consumo de Materiales', element: Consumo },
{ path: '/pantallas/contratos de adhesion', name: 'Contratos de Adhesion', element: Contratos },
{ path: '/pantallas/costos de materiales', name: 'Costos de Materiales', element: Costos },
{ path: '/pantallas/declaracion de valor', name: 'Declaracion de valor', element: Declaracion },
{ path: '/pantallas/DEVAS pendientes', name: 'DEVAS Pendientes', element: Devas },
{ path: '/pantallas/documento de sanciones', name: 'Documento de Sanciones', element: Documentos },
{ path: '/pantallas/duca', name: 'Duca', element: Duca },
{ path: '/pantallas/empleados', name: 'Empleados', element: Empleado },
{ path: '/pantallas/estados civiles', name: 'Estados Civiles', element: Estados },
{ path: '/pantallas/estados de las mercancías', name: 'Estados de las mercancías', element: Estados_M },
{ path: '/pantallas/estados del boletín', name: 'Estados del Boletín', element: Estados_B },
{ path: '/pantallas/estilos', name: 'Estilos', element: Estilos },
{ path: '/pantallas/factura de exportacion', name: 'Factura de exportacion', element: Facturas },
{ path: '/pantallas/formas de envío', name: 'Formas de envío', element: Formas },
{ path: '/pantallas/formas de pago', name: 'Formas de Pago', element: Formas_P },
{ path: '/pantallas/funciones de máquinas', name: 'Funciones de Máquinas', element: Funciones },
{ path: '/pantallas/historial de máquinas', name: 'Historial de Máquinas', element: Historial },
{ path: '/pantallas/importaciones', name: 'Importaciones', element: Importaciones },
{ path: '/pantallas/impuestos', name: 'Impuestos', element: Impuestos },
{ path: '/pantallas/impuestos prod', name: 'Impuestos Prod', element: Impuestos_P },
{ path: '/pantallas/incoterms', name: 'Incoterms', element: Incoterms },
{ path: '/pantallas/ingreso de materiales', name: 'Ingreso de Materiales', element: Ingresos },
{ path: '/pantallas/inicio aduana', name: 'Inicio Aduana', element: Inicio_A },
{ path: '/pantallas/inicio general', name: 'Inicio General', element: Inicio_G },
{ path: '/pantallas/inicio produccion', name: 'Inicio Produccion', element: Inicio_P },
{ path: '/pantallas/inventario', name: 'Inventario', element: Inventario },
{ path: '/pantallas/lotes', name: 'Lotes', element: Lotes },
{ path: '/pantallas/lugares de embarque', name: 'Lugares de Embarque', element: Lugares },
{ path: '/pantallas/máquinas', name: 'Máquinas', element: Maquinas },
{ path: '/pantallas/máquinas habilitadas', name: 'Máquinas Habilitadas', element: Maquinas_H },
{ path: '/pantallas/marcas de carros', name: 'Marcas de Carros', element: Marcas_C },
{ path: '/pantallas/marcas de máquinas', name: 'Marcas de Máquinas', element: Marcas },
{ path: '/pantallas/materiales', name: 'Materiales', element: Materiales },
{ path: '/pantallas/materiales a brindar', name: 'Materiales a Brindar', element: Materiales_B },
{ path: '/pantallas/materiales por orden de compra', name: 'Materiales por Orden de Compra', element: Materiales_O },
{ path: '/pantallas/modelos de máquinas', name: 'Modelos de Máquinas', element: Modelos },
{ path: '/pantallas/módulos', name: 'Módulos', element: Modulos },
{ path: '/pantallas/monedas', name: 'Monedas', element: Modedas },
{ path: '/pantallas/niveles comerciales', name: 'Niveles Comerciales', element: Niveles },
{ path: '/pantallas/oficinas aduaneras', name: 'Oficinas Aduaneras', element: Oficinas },
{ path: '/pantallas/oficios y profesiones', name: 'Oficios y Profesiones', element: Oficios },
{ path: '/pantallas/orden de compra', name: 'Órden de Compra', element: Orden_C },
{ path: '/pantallas/orden de pedido', name: 'Órden de Pedido', element: Orden_P },
{ path: '/pantallas/países', name: 'Países', element: Paises },
{ path: '/pantallas/pedidos de producción', name: 'Pedidos de Producción', element: Pedidos_P },
{ path: '/pantallas/pedidos por cliente', name: 'Pedidos Por Cliente', element: Pedidos_C },
{ path: '/pantallas/persona juridica', name: 'Persona Juridica', element: Persona_J },
{ path: '/pantallas/persona natural', name: 'Persona Natural', element: Persona_N },
{ path: '/pantallas/personas', name: 'Personas', element: Persona },
{ path: '/pantallas/planificación', name: 'Planificación', element: Planificaciones },
{ path: '/pantallas/procesos', name: 'Procesos', element: Procesos },
{ path: '/pantallas/produccion de módulos', name: 'Produccion de Módulos', element: Produccion_M },
{ path: '/pantallas/producción por areas', name: 'Producción por Areas', element: Produccion_A },
{ path: '/pantallas/producción por país', name: 'Producción por país', element: Produccion_P },
{ path: '/pantallas/programación orden de compra', name: 'Programación Órden de Compra', element: Programacion },
{ path: '/pantallas/proveedores', name: 'Proveedores', element: Proveedores },
{ path: '/pantallas/provincias', name: 'Provincias', element: Provincias },
{ path: '/pantallas/rastreo de la orden de compra', name: 'Rastreo de la Orden de Compra', element: Rastreo },
{ path: '/pantallas/regímenes aduaneros', name: 'Regímenes Aduaneros', element: Regimenes },
{ path: '/pantallas/reportes de módulos', name: 'Reportes de Módulos', element: Reportes },
{ path: '/pantallas/revisión de calidad', name: 'Revisión de Calidad', element: Revicion },
{ path: '/pantallas/roles', name: 'Roles', element: Roles },
{ path: '/pantallas/seguimiento de procesos', name: 'Seguimiento de Procesos', element: Seguimiento },
{ path: '/pantallas/subcategorias', name: 'Subcategorias', element: Subcategoria },
{ path: '/pantallas/tallas', name: 'Tallas', element: Tallas },
{ path: '/pantallas/tiempos de máquinas', name: 'Tiempos de Máquinas', element: Tiempo },
{ path: '/pantallas/tipo de documento', name: 'Tipo de Documento', element: Tipo_D },
{ path: '/pantallas/tipo de embalaje', name: 'Tipo de Embalaje', element: Tipo_E },
{ path: '/pantallas/tipo de liquidación', name: 'Tipo de Liquidación', element: Tipo_L }, // Ruta agregada
{ path: '/pantallas/tipos de Identificacion', name: 'Tipos de Identificacion', element: Tipo_Id },
{ path: '/pantallas/tipos de intermediarios', name: 'Tipos de Intermediarios', element: Tipo_In },
{ path: '/pantallas/unidades de medida', name: 'Unidades de medida', element: Unidades },
{ path: '/pantallas/usuarios', name: 'Usuarios', element: Usuarios },


]

export default routes
