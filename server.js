const express = require('express');
const path = require('path');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const userRoutes = require('./src/routes/users'); // Importar rutas de usuarios
const userDeviceRoutes = require('./src/routes/usersdevices'); // Importar rutas de usuarios
const blacklistRoutes = require('./src/routes/blacklist'); // Importar rutas de blacklist
const devicesRoutes = require('./src/routes/devices'); // Importar rutas de dispositivos
const TypeDeviceRoutes = require('./src/routes/devicestype'); // Importar rutas de tipos de dispositivos
const profilesRoutes = require('./src/routes/profiles'); // Importar rutas de perfiles
const usersprofilesRoutes = require('./src/routes/usersprofile'); // Importar rutas de perfiles
const permissionsRoutes = require('./src/routes/profilepermissions'); // Importar rutas de permisos
const roomsRoutes = require('./src/routes/rooms'); // Importar rutas de salas
const penaltiesRoutes = require('./src/routes/penalties'); // Importar rutas de penalizaciones
const authRoutes = require('./src/routes/login'); // Importar rutas de login
const eventLogRoutes = require("./src/routes/eventlog"); // Importar rutas de logeventos
const entranceRoutes = require("./src/routes/entrance");// Importar rutas del modulo de entradas
const identificationRoutes = require("./src/routes/identification");
const programRoutes= require("./src/routes/programs");// Importar rutas de los programas academicos
const dashboardRoutes= require("./src/routes/dashboard");// Importar rutas del dashboard

const authenticateToken = require('./src/middleware/auth'); // Middleware de autenticación
require('dotenv').config(); // Cargar variables de entorno
const upload = require('./src/services/multer'); // Importa la configuración de multer
const cors = require('cors');



const app = express();
app.use(express.json());

// Configuración básica para permitir solicitudes desde diferentes locaciones,Por defecto URL, Si se requiere desde multiples
//lugares añadir las correspondientes ip o en su defecto "*"
app.use(cors({
  origin: ['https://soyudecino.co'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


// Configuración de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Control de Acceso API',
      version: '1.0.0',
      description: 'API para el control de acceso y registro de dispositivos electrónicos en la Universidad de Cundinamarca',
      contact: {
        name: 'Equipo de Desarrollo',
      },
    },
    servers: [
      {
        url: `${process.env.API_BASE_URL}`, // Usar el puerto desde .env o el predeterminado
        description: 'Servidor local de desarrollo',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Archivos donde se documentan las rutas
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// Configuración  para permitir solicitudes desde diferentes locaciones
//app.use(cors({
//  origin: 'soyudecino.com', // Origen permitido
//  methods: ['GET', 'POST', 'PUT','PATCH', 'DELETE'], // Métodos permitidos
//  credentials: true, //encabezados de autenticación
//}));



// Rutas de la API
app.use('/api/users', authenticateToken, userRoutes);
app.use('/api/blacklist', authenticateToken, blacklistRoutes);
app.use('/api/devices', authenticateToken, devicesRoutes);
app.use('/api/profiles', authenticateToken, profilesRoutes);
app.use('/api/users-profiles',authenticateToken, usersprofilesRoutes);
app.use('/api/rooms', authenticateToken, roomsRoutes);
app.use('/api/penalties', authenticateToken, penaltiesRoutes);
app.use('/api/profile-permissions',authenticateToken, permissionsRoutes);
app.use('/api/auth/login', authRoutes);
app.use('/api/eventlog',authenticateToken, eventLogRoutes);
app.use('/api/user-devices',authenticateToken, userDeviceRoutes);
app.use('/api/device-types',authenticateToken, TypeDeviceRoutes);
app.use("/api/entrance", entranceRoutes);
app.use('/api/identifications',authenticateToken, identificationRoutes);
app.use('/api/programs',authenticateToken, programRoutes);
app.use('/api/dashboard',authenticateToken, dashboardRoutes);



app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: 'No se envió ningún archivo' });
  }


  const filePath = `uploads/images/${req.file.filename}`;

  res.status(200).send({ filePath });
});




app.use('/uploads/images', express.static(path.join(__dirname, 'src/utils/uploads/images')));


app.use(express.static(path.join(__dirname, 'public')));

// Para cualquier ruta que no sea de la API, redirigir archivo index.html del frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar el servidor
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => console.log(`Servidor corriendo en '${process.env.API_BASE_URL}${PORT}`)); //URÑ Y puerto de acuerdo al .env
