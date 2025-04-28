import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import LoginPage from './pages/Login/loginpage';
import HomePage from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import Users from './pages/Users/Users';
import Profiles from './pages/Profiles/Profiles';
import Devices from './pages/Devices/Devices';
import Log from './pages/LogEventos/LogEventos';
import ScannerRFID  from './pages/Scanner/ScannerRFID';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { AuthProvider } from './context/authcontext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header/Header';
import SidebarMenu from './components/SidebarMenu/SidebarMenu';
import Footer from './components/Footer/Footer';
import { Box } from '@mui/material'; 

function Layout({ children }) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login"; //  Verificamos si estamos en /login

  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', //  Ocupar toda la pantalla
      }}
    >
      <ToastContainer />

      {/*  Solo mostramos Header y Sidebar si NO estamos en /login */}
      {!isLoginPage && <Header />}
      {!isLoginPage && <SidebarMenu isOpen={isOpen} toggleSidebar={toggleSidebar} />}

      {/* Contenedor principal que empuja el Footer hacia abajo */}
      <Box
        component="main"
        sx={{
          flex: 1, //  Hace que el contenido crezca y el footer quede abajo
          marginLeft: !isLoginPage ? (isOpen ? '270px' : '60px') : '0',
          transition: 'margin-left 0.3s ease-in-out',
          padding: '20px',
        }}
      >
        {children}
      </Box>

      {/*  Footer siempre en la parte inferior */}
      {!isLoginPage && <Footer />}
    </Box>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer />

        <Routes>
          {/* Rutas sin Layout */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ScannerRFID />} />

          {/* Rutas con Layout */}
          <Route
            path="*"
            element={
              <Layout>
                <Routes>
                  <Route path="/dashboard" element={<PrivateRoute requiredPermission="DashboardListar"><Dashboard /></PrivateRoute>} />
                  <Route path="/users" element={<PrivateRoute requiredPermission="UsuariosListar"><Users /></PrivateRoute>} />
                  <Route path="/profiles" element={<PrivateRoute requiredPermission="PerfilesListar"><Profiles /></PrivateRoute>} />
                  <Route path="/inventory" element={<PrivateRoute requiredPermission="InventarioListar"><Profiles /></PrivateRoute>} />
                  <Route path="/devices" element={<PrivateRoute requiredPermission="DispositivosListar"><Devices /></PrivateRoute>} />
                  <Route path="/log" element={<PrivateRoute requiredPermission="LogEventosListar"><Log /></PrivateRoute>} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
