import React, { useState, useContext } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Tooltip,
} from '@mui/material';
import { useLocation } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import AuthContext from '../../context/authcontext';
import escudoUdec from '../../assets/images/ESCUDO-COLOR.png'; 

const pageTitles = {
  "/dashboard": "Dashboard",
  "/inventario": "Inventario",
  "/blacklist": "Lista Negra",
  "/devices": "Dispositivos",
  "/penalidades": "Penalidades",
  "/profiles": "Perfiles",
  "/users": "Usuarios",
  "/log": "Log de Eventos"
};

const DynamicTitle = () => {
  const location = useLocation();
  const title = pageTitles[location.pathname] || "Control Dispositivos";
  return (
    <Typography
      variant="h6"
      fontWeight="bold"
      sx={{
        color: "#FFFFFF",
        fontFamily: "Century Gothic, sans-serif",
      }}
    >
      {title}
    </Typography>
  );
};

const Header = ({ isSidebarOpen, drawerWidth }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useContext(AuthContext);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${isSidebarOpen ? drawerWidth : 60}px)`,
        marginLeft: isSidebarOpen ? `${drawerWidth}px` : '60px',
        backgroundColor: '#00482B',
        boxShadow: '0px 4px 10px rgba(0, 75, 47, 0.4)',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '64px',
        }}
      >
        {/* Logo + Institución */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src={escudoUdec}
            alt="UdeC"
            variant="square"
            sx={{ width: 40, height: 40, bgcolor: 'transparent' }}
          />
          <Typography
            variant="body1"
            fontWeight="bold"
            sx={{ color: '#FBE122', fontFamily: 'Century Gothic' }}
          >
            Universidad de Cundinamarca
          </Typography>
        </Box>

        {/* Título dinámico */}
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <DynamicTitle />
        </Box>

        {/* Usuario */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" sx={{ color: '#FBE122', mr: 1, fontFamily: 'Century Gothic' }}>
            {user?.username || 'Usuario'}
          </Typography>

          <Tooltip title="Opciones de usuario">
            <IconButton onClick={handleMenuOpen}>
              <Avatar
                src={user?.image || undefined}
                alt={user?.username}
                sx={{
                  bgcolor: '#FBE122',
                  color: '#00482B',
                  fontWeight: 'bold',
                }}
              >
                {!user?.image && (user?.username?.charAt(0).toUpperCase() || 'U')}
              </Avatar>
            </IconButton>
          </Tooltip>

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleLogout}>
              <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> Cerrar Sesión
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
