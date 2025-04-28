import React from 'react';
import { Box, Toolbar, Typography, Paper } from '@mui/material';

const AdminPanel = () => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        backgroundColor: '#F5F5F5',
        minHeight: '100vh',
      }}
    >
      {/* Espaciado debajo del Header */}
      <Toolbar />

      {/* Contenido principal del panel */}
      <Paper
        elevation={3}
        sx={{
          padding: '20px',
          backgroundColor: '#FFFFFF',
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: '20px' }}>
          Bienvenido al Panel de Administración
        </Typography>
        <Typography variant="body1">
          Desde aquí puedes gestionar el sistema, visualizar estadísticas y
          realizar tareas administrativas.
        </Typography>
      </Paper>
    </Box>
  );
};

export default AdminPanel;
