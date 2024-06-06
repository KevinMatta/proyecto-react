import React, { useEffect, useState } from 'react';
import CIcon from '@coreui/icons-react';
import { CNavItem } from '@coreui/react';
import { getPantallas, getRolesPorPantallas } from '../services/authService';
import { cilNotes } from '@coreui/icons';

const DynamicMenu = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const pantallasResponse = await getPantallas();
        const pantallas = pantallasResponse.data;
        console.log('pantallas:', pantallas);

        if (!Array.isArray(pantallas)) {
          throw new Error('Invalid data format for pantallas');
        }

        const rolesResponse = await getRolesPorPantallas();
        const rolesPantallas = rolesResponse;
        console.log('rolesPantallas:', rolesPantallas);

        if (!Array.isArray(rolesPantallas)) {
          throw new Error('Invalid data format for rolesPantallas');
        }

        const isAdmin = sessionStorage.getItem('usua_EsAdmin') === 'true';
        const roleId = parseInt(sessionStorage.getItem('role_Id'), 10);
        const isAduana = sessionStorage.getItem('empl_EsAduana') === 'true';

        // Filtrar pantallas basadas en los criterios
        const filteredPantallas = pantallas.filter(pantalla => {
          if (isAdmin) {
            return pantalla.pant_EsAduana === isAduana;
          } else {
            return rolesPantallas.some(rolePantalla => rolePantalla.pant_Id === pantalla.pant_Id);
          }
        });

        console.log('filteredPantallas:', filteredPantallas);

        // Transformar las pantallas filtradas en el formato necesario para el menú
        const navItems = filteredPantallas.map(pantalla => ({
          component: CNavItem,
          name: pantalla.pant_Nombre,
          to: pantalla.pant_URL,
          icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
        }));

        setMenuItems(navItems);
      } catch (error) {
        console.error('Error fetching the menu:', error.message);
      }
    };

    fetchMenu();
  }, []);

  return menuItems;
};

export default DynamicMenu;
