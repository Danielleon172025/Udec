import React, { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import SidebarMenu from '../SidebarMenu/SidebarMenu';
import Header from '../Header/Header';

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const drawerWidth = 270;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', flexGrow: 1 }}>
      <CssBaseline />
      <SidebarMenu isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} drawerWidth={drawerWidth} />
      
      {/* Contenido Principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: isSidebarOpen ? `${drawerWidth}px` : '60px',
          padding: '90px 20px 20px', // Ajuste para evitar que el contenido se esconda detrás del header
          transition: 'margin-left 0.3s ease-in-out',
          width: `calc(100% - ${isSidebarOpen ? drawerWidth : 60}px)`,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
