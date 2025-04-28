import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import AuthContext from '../../context/authcontext';
import {
  Container,
  Card,
  Typography,
  TextField,
  Button,
  Box,
  Avatar,
  Link,
} from '@mui/material';
import { styled } from '@mui/system';
import escudoImage from '../../assets/images/ESCUDO-COLOR.png';
import backgroundImage from '../../assets/images/digital-background.png';



const StyledButton = styled(Button)({
  backgroundColor: '#007B3E',
  color: '#FFFFFF',
  borderRadius: '25px',
  padding: '10px 15px',
  fontSize: '16px',
  textTransform: 'none',
  fontWeight: 'bold',
  fontFamily: 'Century Gothic, sans-serif',
  '&:hover': {
    backgroundColor: '#005a2c',
  },
});

const SecondaryButton = styled(Button)({
  backgroundColor: '#FBE122',
  color: '#00482B',
  borderRadius: '25px',
  padding: '10px 15px',
  fontSize: '14px',
  textTransform: 'none',
  marginTop: '12px',
  fontWeight: 'bold',
  fontFamily: 'Century Gothic, sans-serif',
  '&:hover': {
    backgroundColor: '#e5d112',
  },
});

const BackgroundContainer = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  fontFamily: 'Century Gothic, sans-serif',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'brightness(0.65) blur(2px)',
    opacity: 0.5,
    zIndex: -1,
  },
});

const LoginCard = styled(Card)({
  padding: '35px',
  borderRadius: '15px',
  textAlign: 'center',
  maxWidth: '400px',
  width: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
});

const StyledAvatar = styled(Avatar)({
  width: 90,
  height: 90,
  margin: '0 auto 15px auto',
  backgroundColor: '#fff',
  border: '3px solid #007B3E',
  padding: '5px',
});

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //console.log("🔗 API en uso:", process.env.REACT_APP_API_URL); Habilitar en desarrollo

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        username,
        password,
      });

      if (response.data.token && response.data.user.profileId) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('profileId', response.data.user.profileId);
        localStorage.setItem('Username', response.data.user.username);

        setUser({
          username: response.data.user.username,
          profileId: response.data.user.profileId,
        });

        toast.success('Inicio de sesión exitoso');
        navigate('/dashboard');
      } else {
        toast.error('No se pudo obtener el ProfileId.');
      }
    } catch (err) {
      toast.error('Usuario o contraseña incorrectos');
    }
  };

  return (
    <BackgroundContainer>
      <LoginCard>
        <StyledAvatar src={escudoImage} alt="Escudo" />
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, color: '#00482B' }}>
          Iniciar Sesión
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Usuario"
            variant="outlined"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            fullWidth
            type="password"
            label="Contraseña"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Box textAlign="center" mt={2}>
            <StyledButton type="submit" variant="contained">
              Ingresar
            </StyledButton>
          </Box>

          <Box textAlign="center" mt={2}>
            <Link href="/recuperar-contrasena" underline="hover" sx={{ fontSize: '14px' }}>
              Olvidé mi contraseña
            </Link>
          </Box>

          <Box textAlign="center">
            <SecondaryButton
              variant="contained"
              //href={`${process.env.REACT_APP_API_URL}/auth/azure/login`} Habilitar cuando se desee login con azure 
            >
              Autenticarse con correo institucional
            </SecondaryButton>
          </Box>
        </form>
      </LoginCard>
    </BackgroundContainer>
  );
};

export default LoginPage;