import React, { useEffect, useState } from 'react';
import { CNavItem } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilNotes } from '@coreui/icons';
import { getPantallas, getRolesPorPantallas } from '../services/authService';

const DynamicMenu = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const roleId = parseInt(sessionStorage.getItem('role_Id'));
        const rolesPantallasResponse = await getRolesPorPantallas(roleId);
        const rolesPantallas = rolesPantallasResponse;

        const pantallasResponse = await getPantallas();
        const pantallas = pantallasResponse.data;

        const isAdmin = sessionStorage.getItem('usua_EsAdmin') === 'true';
        const isAduana = sessionStorage.getItem('empl_EsAduana') === 'true';

        const filteredPantallas = pantallas.filter(pantalla => {
          console.log('Checking pantalla:', pantalla);
          const tieneAcceso = rolesPantallas.find(rolePantalla => rolePantalla.pant_Id === pantalla.pant_Id);
          console.log('Tiene acceso:', tieneAcceso);
          const mostrarPantalla = isAdmin ? pantalla.pant_EsAduana === isAduana : (pantalla.pant_EsAduana === isAduana && tieneAcceso);
          console.log('Mostrar pantalla:', mostrarPantalla);
          return mostrarPantalla;
        });

        console.log('Filtered pantallas:', filteredPantallas);

        const navItems = filteredPantallas.map(pantalla => ({
          component: CNavItem,
          name: pantalla.pant_Nombre,
          to: pantalla.pant_URL,
          icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
        }));

        console.log('NavItems:', navItems);
        setMenuItems(navItems);
      } catch (error) {
        console.error('Error fetching the menu:', error);
      }
    };

    fetchMenu();
  }, []);

  return menuItems;
};

export default DynamicMenu;
