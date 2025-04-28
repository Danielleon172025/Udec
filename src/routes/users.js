const express = require('express');
const router = express.Router();
const sql = require('mssql');
const poolPromise = require('../db/config');
const authenticateToken = require('../middleware/auth');
const upload = require('../services/multer');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operaciones sobre usuarios
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtiene la lista de todos los usuarios
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 */
router.get('/', authenticateToken, async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute('GetAllUsers');

    result.recordset.forEach((user) => {
      user.ImagePath = user.ImagePath
        ? `${process.env.API_BASE_URL}/${user.ImagePath.replace(/^src[\\/]/, '')}`
        : null;
    });

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios', details: error.message });
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('UserId', sql.Int, id)
      .execute('GetUserById');

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const user = result.recordset[0];
    user.ImagePath = user.ImagePath
      ? `${process.env.API_BASE_URL}/${user.ImagePath.replace(/^src[\\/]/, '')}`
      : null;

    res.status(200).json(user);
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    res.status(500).json({ error: 'Error al obtener el usuario', details: error.message });
  }
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - IdentificationId
 *               - Identification
 *               - Firstname
 *               - Lastname
 *               - Username
 *               - Password
 *               - Email
 *             properties:
 *               IdentificationId:
 *                 type: integer
 *               Identification:
 *                 type: string
 *               Firstname:
 *                 type: string
 *               Lastname:
 *                 type: string
 *               Username:
 *                 type: string
 *               Password:
 *                 type: string
 *               Email:
 *                 type: string
 *               ProgramId:
 *                 type: integer
 *               Ldap:
 *                 type: boolean
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 */
router.post('/', authenticateToken, upload.single('image'), async (req, res) => {
  const {
    IdentificationId, Identification, Firstname, Lastname,
    Username, Password, Email, Ldap, ProgramId
  } = req.body;

  if (!IdentificationId || !Identification || !Firstname || !Lastname || !Username || !Password || !Email) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  let imageId = null;

  try {
    const pool = await poolPromise;

    if (req.file) {
      const imagePath = `src/uploads/images/${req.file.filename}`;
      const imgResult = await pool.request()
        .input('ImagePath', sql.NVarChar(255), imagePath)
        .execute('InsertImage');

      imageId = imgResult.recordset[0].ImageId;
    }

    await pool.request()
      .input('IdentificationId', sql.Int, IdentificationId)
      .input('Identification', sql.NVarChar(50), Identification)
      .input('Firstname', sql.NVarChar(100), Firstname)
      .input('Lastname', sql.NVarChar(100), Lastname)
      .input('Username', sql.NVarChar(50), Username)
      .input('Password', sql.NVarChar(255), Password)
      .input('Email', sql.NVarChar(100), Email)
      .input('ProgramId', sql.Int, ProgramId)
      .input('Ldap', sql.Bit, Ldap || 0)
      .input('ImageId', sql.Int, imageId)
      .input('IsActive', sql.Bit, 1)
      .execute('InsertUser');

    res.status(201).json({ message: 'Usuario creado correctamente' });
  } catch (err) {
    console.error('Error al crear usuario:', err);
    res.status(500).json({ error: 'Error interno', details: err.message });
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Actualiza un usuario existente
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               IdentificationId:
 *                 type: integer
 *               Identification:
 *                 type: string
 *               Firstname:
 *                 type: string
 *               Lastname:
 *                 type: string
 *               Username:
 *                 type: string
 *               Email:
 *                 type: string
 *               ProgramId:
 *                 type: integer
 *               IsActive:
 *                 type: boolean
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 */
router.put('/:id', authenticateToken, upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const {
    IdentificationId, Identification, Firstname, Lastname,
    Username, Email, IsActive, ProgramId
  } = req.body;

  if (!IdentificationId || !Identification || !Firstname || !Lastname || !Username || !Email) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  let imageId = null;

  try {
    const pool = await poolPromise;

    if (req.file) {
      const imagePath = `src/uploads/images/${req.file.filename}`;
      const imgResult = await pool.request()
        .input('ImagePath', sql.NVarChar(255), imagePath)
        .execute('InsertImage');
      imageId = imgResult.recordset[0].ImageId;
    }

    await pool.request()
      .input('UserId', sql.Int, id)
      .input('IdentificationId', sql.Int, IdentificationId)
      .input('Identification', sql.NVarChar(50), Identification)
      .input('Firstname', sql.NVarChar(100), Firstname)
      .input('Lastname', sql.NVarChar(100), Lastname)
      .input('Username', sql.NVarChar(50), Username)
      .input('Email', sql.NVarChar(100), Email)
      .input('ProgramId', sql.Int, ProgramId || null)
      .input('IsActive', sql.Bit, IsActive)
      .input('ImageId', sql.Int, imageId)
      .execute('UpdateUser');

    res.status(200).json({ message: 'Usuario actualizado correctamente' });
  } catch (err) {
    console.error('Error al actualizar usuario:', err);
    res.status(500).json({ error: 'Error interno', details: err.message });
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Actualiza el estado activo/inactivo del usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               IsActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Estado actualizado correctamente
 */
router.patch('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { IsActive } = req.body;

  if (typeof IsActive !== 'boolean') {
    return res.status(400).json({ error: 'IsActive debe ser booleano' });
  }

  try {
    const pool = await poolPromise;
    await pool.request()
      .input('UserId', sql.Int, id)
      .input('IsActive', sql.Bit, IsActive)
      .execute('UpdateUserStatus');

    res.status(200).json({ message: 'Estado actualizado correctamente' });
  } catch (error) {
    console.error('Error al cambiar estado:', error);
    res.status(500).json({ error: 'Error interno', details: error.message });
  }
});

module.exports = router;
