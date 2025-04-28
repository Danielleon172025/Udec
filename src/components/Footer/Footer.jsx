// src/components/Footer.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, Fab, Zoom } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const version = 'v1.0.0';
  const [showScroll, setShowScroll] = useState(false);

  // Mostrar botón de scroll al hacer scroll hacia abajo
  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función para volver al top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Box
        component="footer"
        sx={{
          backgroundColor: '#00482B',
          color: '#FFFFFF',
          py: 1.5,
          px: 2,
          textAlign: 'center',
          fontFamily: 'Century Gothic, sans-serif',
          fontSize: '14px',
          boxShadow: '0px -1px 3px rgba(0,0,0,0.1)',
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          Universidad de Cundinamarca © {currentYear} &nbsp; | &nbsp; www.ucundinamarca.edu.co &nbsp; | &nbsp; Vigilada MinEducación &nbsp; | &nbsp; {version}
        </Typography>
      </Box>

      <Zoom in={showScroll}>
        <Fab
          onClick={scrollToTop}
          size="small"
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            backgroundColor: '#FBE122',
            color: '#00482B',
            '&:hover': {
              backgroundColor: '#e5ce1e',
            },
          }}
          aria-label="scroll back to top"
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Zoom>
    </>
  );
};

export default Footer;
