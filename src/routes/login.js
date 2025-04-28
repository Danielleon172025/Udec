const express = require('express');
const router = express.Router();
const sql = require('mssql');
const jwt = require('jsonwebtoken');
const poolPromise = require('../db/config'); 
const msal = require('@azure/msal-node'); // dependencia Login Azure

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión y obtener un token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario
 *                 example: "admin"
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *                 example: "1234"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Inicio de sesión exitoso"
 *                 token:
 *                   type: string
 *                   description: Token JWT generado
 *                 user:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: integer
 *                       example: 1
 *                     username:
 *                       type: string
 *                       example: "admin"
 *                     email:
 *                       type: string
 *                       example: "admin@udec.edu.co"
 *                     profileId:
 *                       type: integer
 *                       example: 2
 *       400:
 *         description: Datos de inicio de sesión faltantes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "El nombre de usuario y la contraseña son obligatorios."
 *       404:
 *         description: Usuario no encontrado o credenciales incorrectas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Usuario no encontrado o contraseña incorrecta"
 *       500:
 *         description: Error en el servidor o en la base de datos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al iniciar sesión"
 *                 details:
 *                   type: string
 *                   example: "Error en la consulta SQL"
 */
router.post('/', async (req, res) => {
  const { username, password, provider } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'El nombre de usuario y la contraseña son obligatorios.' });
  }

  try {
    //  LOGIN AZURE AD
    if (provider === 'azure') {
      const cca = new msal.ConfidentialClientApplication({
        auth: {
          clientId: process.env.AZURE_CLIENT_ID,
          authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}`,
          clientSecret: process.env.AZURE_CLIENT_SECRET,
        },
      });

      const azureUser = await cca.acquireTokenByUsernamePassword({
        scopes: ['user.read'],
        username,
        password,
      });

      if (azureUser) {
        return res.status(200).json({
          message: 'Inicio de sesión exitoso con Azure AD',
          token: azureUser.accessToken,
          user: {
            username,
            email: username,
            azure: true,
          },
        });
      } else {
        return res.status(401).json({ error: 'Error de autenticación con Azure.' });
      }
    }

    //  LOGIN LOCAL
    const pool = await poolPromise;

    // Ejecutar SP de login
    const result = await pool.request()
      .input('Username', sql.VarChar(255), username)
      .input('Password', sql.VarChar(255), password)
      .execute('LoginUser');

    if (!result.recordset || result.recordset.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado o contraseña incorrecta' });
    }

    const user = result.recordset[0];

    if (!user.ProfileId) {
      return res.status(403).json({ error: "El usuario no tiene un perfil asignado." });
    }

    //  URL de imagen procesada
    const imageUrl = user.Image
  ? `${process.env.API_BASE_URL}/${encodeURI(user.Image.replace(/^src[\\/]/, ''))}`
  : null;


    //  Cargar permisos del perfil directamente para el JWT
    const permissionsResult = await pool.request()
      .input('ProfileId', sql.Int, user.ProfileId)
      .execute('GetProfilePermissionsActive');

    const rawPermissions = permissionsResult.recordset || [];
    const permissions = rawPermissions.map(p => p.OptionName.toLowerCase().trim());

    //  JWT con permisos incluidos
    const token = jwt.sign(
      {
        id: user.UserId,
        username: user.Username,
        profileId: user.ProfileId,
        permissions,
        image: imageUrl, 
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    //  Enviar respuesta al frontend
    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token,
      user: {
        userId: user.UserId,
        username: user.Username,
        firstname: user.Firstname,
        lastname: user.Lastname,
        email: user.Email,
        image: imageUrl,
        profileId: user.ProfileId,
        programId: user.ProgramId || null,
        program: user.Program || null,
        identification: user.Identification || null,
        identificationType: user.IdentificationType || null,
      }
    });

  } catch (error) {
    console.error(' Error en login:', error);
    res.status(500).json({
      error: 'Error al iniciar sesión',
      details: error.message
    });
  }
});

module.exports = router;