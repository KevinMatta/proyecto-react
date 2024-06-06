import React, { useEffect, useState } from 'react';
import CIcon from '@coreui/icons-react';
import { CNavItem } from '@coreui/react';
import { getPantallas } from './services/authService';
import { cilNotes } from '@coreui/icons';

const _nav = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const pantallas = await getPantallas();
        const isAdmin = sessionStorage.getItem('usua_EsAdmin') === 'true';
        const roleId = sessionStorage.getItem('role_Id');
        const isAduana = sessionStorage.getItem('empl_EsAduana') === 'true';

        // Filtrar pantallas basadas en los criterios
        const filteredPantallas = pantallas.filter(pantalla => {
          if (isAdmin) {
            return pantalla.pant_EsAduana === isAduana;
          } else {
            return pantalla.pant_EsAduana === isAduana && pantalla.role_Id === roleId;
          }
        });

        setMenuItems(filteredPantallas);
      } catch (error) {
        console.error('Error fetching the menu', error);
      }
    };

    fetchMenu();
  }, []);

  return (
    menuItems.map(item => ({
      component: CNavItem,
      name: item.pant_Nombre,
      to: item.pant_URL,
      icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    }))
  );
};

export default _nav;
