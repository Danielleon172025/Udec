const sql = require('mssql');
require('dotenv').config(); // Cargar el archivo .env al inicio

// Configuración de la conexión
const config = {
  user: process.env.DB_USER, // Usuario de SQL Server
  password: process.env.DB_PASSWORD, // Contraseña de SQL Server
  server: String(process.env.DB_HOST), // Servidor de SQL Server
  database: process.env.DB_NAME, // Base de datos
  options: {
    encrypt: false, // Si  se desea usar Azure, debe ser `true`
    trustServerCertificate: true, // aplica,Solo si está en ambiente  desarrollo
  },
  port: parseInt(process.env.DB_PORT, 10), // Puerto predeterminado de SQL Server
};

// Crear y conectar al pool de conexión
const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Conexión a SQL Server establecida.');
    return pool; // Devuelve el pool conectado
  })
  .catch(err => {
    console.error('Error al conectar a SQL Server:', err);
    throw err; // Lanza el error para que pueda ser manejado
  });

// Exportar la promesa del pool para las consultas a BD
module.exports = poolPromise;