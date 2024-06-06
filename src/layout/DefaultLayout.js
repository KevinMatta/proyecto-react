// src/layout/DefaultLayout.js

import React, { Suspense } from 'react';
import { CContainer, CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react';
import { AppHeader, AppSidebar, AppFooter, AppContent } from '../components/index'; // Importa desde el index.js correcto
import DynamicMenu from '../components/DynamicMenu';

const DefaultLayout = () => {
  return (
    <div>
      <AppSidebar>
        <CSidebar>
          <CSidebarBrand to="/">Brand</CSidebarBrand>
          <CSidebarNav>
            <Suspense fallback={<div>Loading...</div>}>
              <DynamicMenu />
            </Suspense>
          </CSidebarNav>
          <CSidebarToggler />
        </CSidebar>
      </AppSidebar>
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <CContainer fluid>
            <Suspense fallback={<div>Loading...</div>}>
              <AppContent />
            </Suspense>
          </CContainer>
        </div>
        <AppFooter />
      </div>
    </div>
  );
};

export default DefaultLayout;
