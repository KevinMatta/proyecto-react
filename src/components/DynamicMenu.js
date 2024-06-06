import React, { useEffect, useState } from 'react';
import CIcon from '@coreui/icons-react';
import { CNavItem, CNavGroup } from '@coreui/react';
import { getPantallas, getRolesPorPantallas } from '../services/authService';
import { cilNotes, cilLibrary } from '@coreui/icons';

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
        const rolesPantallas = rolesResponse || [];
        console.log('rolesPantallas:', rolesPantallas);

        if (!Array.isArray(rolesPantallas)) {
          throw new Error('Invalid data format for rolesPantallas');
        }

        const isAdmin = sessionStorage.getItem('usua_EsAdmin') === 'true';
        const roleId = parseInt(sessionStorage.getItem('role_Id'), 10);
        const isAduana = sessionStorage.getItem('empl_EsAduana') === 'true';

        let filteredPantallas = [];

        if (isAdmin) {
          filteredPantallas = pantallas.filter(pantalla => pantalla.pant_EsAduana === isAduana);
        } else if (roleId && roleId !== 0) {
          filteredPantallas = pantallas.filter(pantalla => rolesPantallas.some(rolePantalla => rolePantalla.pant_Id === pantalla.pant_Id));
        } else if (isAduana) {
          filteredPantallas = pantallas.filter(pantalla => pantalla.pant_EsAduana === isAduana);
        }

        console.log('filteredPantallas:', filteredPantallas);

        const groupedPantallas = filteredPantallas.reduce((groups, pantalla) => {
          const esquema = pantalla.pant_Esquema;
          if (!groups[esquema]) {
            groups[esquema] = [];
          }
          groups[esquema].push(pantalla);
          return groups;
        }, {});

        const esquemaNames = {
          Acce: 'Acceso',
          Gral: 'General',
          Adua: 'Aduana',
          Prod: 'Producción',
          Repo: 'Reportes'
        };

        const navItems = Object.keys(groupedPantallas).map(esquema => ({
          component: CNavGroup,
          name: esquemaNames[esquema] || esquema,
          icon: <CIcon icon={cilLibrary} customClassName="nav-icon" />,
          items: groupedPantallas[esquema].map(pantalla => ({
            component: CNavItem,
            name: pantalla.pant_Nombre,
            to: pantalla.pant_URL,
            //icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
          }))
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
