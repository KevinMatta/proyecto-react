import React from 'react';
import { Navigate } from 'react-router-dom';

const getSessionValue = (key) => sessionStorage.getItem(key);

const ProtectedRoute = ({ element: Element, roles, ...rest }) => {
  const isAdmin = getSessionValue('usua_EsAdmin') === 'true';
  const roleId = getSessionValue('role_Id');
  const isAduana = getSessionValue('usua_esAduana') === 'true';

  const hasAccess = () => {
    if (roles.includes('admin') && !isAdmin) return false;
    if (roles.includes('aduana') && !isAduana) return false;
    if (roles.includes(roleId)) return true;
    return true;
  };

  return hasAccess() ? <Element {...rest} /> : <Navigate to="/no-access" />;
};

export default ProtectedRoute;
