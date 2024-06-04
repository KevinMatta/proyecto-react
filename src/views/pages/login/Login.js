import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CToast,
  CToastBody,
  CToastHeader,
  CToaster,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import { login } from '../../../services/authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [toast, setToast] = useState(0);
  const toaster = useRef();
  const navigate = useNavigate();

  const exampleToast = (message, color) => (
    <CToast autohide={true} delay={5000} color={color}>
      <CToastHeader closeButton>
        <strong className="me-auto">Notificación</strong>
        <small>Ahora</small>
      </CToastHeader>
      <CToastBody>{message}</CToastBody>
    </CToast>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await login({ usua_Nombre: email, usua_Contrasenia: password });

      if (response.code === 200) {
        const { empl_EsAduana, role_Id, usua_EsAdmin } = response.data;
        console.log('Login successful:', response.data);
        console.log('empl_EsAduana:', empl_EsAduana);
        console.log('role_Id:', role_Id);
        console.log('usua_EsAdmin:', usua_EsAdmin);

        // Guardar los valores en sessionStorage
        sessionStorage.setItem('empl_EsAduana', empl_EsAduana);
        sessionStorage.setItem('role_Id', role_Id);
        sessionStorage.setItem('usua_EsAdmin', usua_EsAdmin);

        navigate('/dashboard');
        setToast(exampleToast('Login successful', 'success'));
      } else {
        setError('El usuario o contraseña son incorrectos');
        setToast(exampleToast('El usuario o contraseña son incorrectos', 'danger'));
      }
    } catch (error) {
      console.error('Error al iniciar sesión', error);
      setError('Error al conectar con el servidor');
      setToast(exampleToast('Error al conectar con el servidor', 'danger'));
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Inicia sesión en tu cuenta</p>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Usuario"
                        autoComplete="username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Contraseña"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="primary" className="px-4">
                          ENTRAR
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          ¿Olvidé la contraseña?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Registrarse</h2>
                    <p>
                      Este es un login diseñado para el aprendizaje de REACT.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        ¡Regístrate ahora!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
      <CToaster ref={toaster} push={toast} placement="top-end" />
    </div>
  );
};

export default Login;
