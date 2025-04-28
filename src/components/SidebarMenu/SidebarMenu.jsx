import React, { useMemo } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
  IconButton,
  Tooltip
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CommentIcon from '@mui/icons-material/Comment';
import TagIcon from '@mui/icons-material/Label';
import PersonIcon from '@mui/icons-material/Person';
import { jwtDecode } from 'jwt-decode';
import escudo from '../../assets/images/ESCUDO-COLOR.png';

const SidebarMenu = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const drawerWidth = 270;

  //  Decodificar permisos
  const token = localStorage.getItem('token');
  const permissions = useMemo(() => {
    if (!token) return [];
    try {
      const decoded = jwtDecode(token);
      return (decoded.permissions || []).map((p) => p.toLowerCase().trim());
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      return [];
    }
  }, [token]);

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard', permission: 'dashboardlistar' },
    { text: 'Inventario', icon: <TagIcon />, path: '/inventario', permission: 'inventariolistar' },
    { text: 'Lista Negra', icon: <PersonIcon />, path: '/blacklist', permission: 'listanegra' },
    { text: 'Dispositivos', icon: <DashboardIcon />, path: '/devices', permission: 'dispositivoslistar' },
    { text: 'Penalidades', icon: <CommentIcon />, path: '/penalidades', permission: 'penalidades' },
    { text: 'Perfiles', icon: <TagIcon />, path: '/profiles', permission: 'perfileslistar' },
    { text: 'Usuarios', icon: <PersonIcon />, path: '/users', permission: 'usuarioslistar' },
    { text: 'LogEventos', icon: <PersonIcon />, path: '/log', permission: 'logeventoslistar' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isOpen ? drawerWidth : 60,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: isOpen ? drawerWidth : 60,
          backgroundColor: '#00482B',
          color: '#FFFFFF',
          borderRight: '3px solid #FBE122',
          transition: 'width 0.3s ease-in-out',
          overflowX: 'hidden',
          fontFamily: 'Century Gothic, sans-serif',
        },
      }}
    >
      {/* LOGO + FLECHA superior */}
      <Box
        sx={{
          position: 'relative',
          textAlign: 'center',
          pt: 2,
          pb: 1,
        }}
      >
        <img
          src={escudo}
          alt="Logo UdeC"
          style={{
            width: isOpen ? '60%' : '26px',
            transition: 'all 0.3s ease-in-out',
            marginBottom: isOpen ? 4 : 2,
          }}
        />

        <Tooltip title={isOpen ? 'Contraer menú' : 'Expandir menú'}>
          <IconButton
            onClick={toggleSidebar}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: '#FBE122',
            }}
          >
            {isOpen ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </Tooltip>
      </Box>

      {/* Divider visual */}
      <Divider
        sx={{
          backgroundColor: '#FBE122',
          height: '2px',
          mx: 2,
          mb: 1,
          opacity: 0.7,
        }}
      />

      {/* MENÚ DE NAVEGACIÓN */}
      <List>
        {menuItems
          .filter((item) => permissions.includes(item.permission.toLowerCase()))
          .map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItem
                key={index}
                button
                component={Link}
                to={item.path}
                sx={{
                  backgroundColor: isActive ? '#FBE122' : 'transparent',
                  color: isActive ? '#00482B' : '#FFFFFF',
                  borderRadius: '8px',
                  margin: '6px 12px',
                  padding: '10px',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: '#FBE122',
                    color: '#00482B',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? '#00482B' : '#FFFFFF',
                    minWidth: isOpen ? '40px' : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {isOpen && (
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                  />
                )}
              </ListItem>
            );
          })}
      </List>
    </Drawer>
  );
};

export default SidebarMenu;
