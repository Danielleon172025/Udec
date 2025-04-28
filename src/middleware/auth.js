const jwt = require('jsonwebtoken');

// Middleware para validar token JWT (login local o Azure)
const authenticateToken = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ error: 'Acceso denegado, token no proporcionado' });
  }

  // Extraer token (con o sin 'Bearer ')
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7).trim()
    : authHeader.trim();

  try {
    // Verificar token firmado con la clave secreta (.env) del backend (JWT generado después del login local o Azure)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Guardar info del usuario para usar en rutas protegidas
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Error al verificar token:", err.message);
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }
};
module.exports = authenticateToken;
