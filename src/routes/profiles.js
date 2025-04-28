const express = require('express');
const router = express.Router();
const sql = require('mssql');
const poolPromise = require('../db/config'); // Conexión a la base de datos
const authenticateToken = require('../middleware/auth');

/**
 * @swagger
 * /api/profiles:
 *   get:
 *     summary: Obtiene la lista de todos los perfiles activos
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de perfiles obtenida exitosamente
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', authenticateToken, async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute('GetAllProfiles');
    
    // Mapear los resultados para que IsActive se muestre como un booleano
    const profiles = result.recordset.map(profile => ({
      ...profile,
      IsActive: !profile.IsActive // Invertir porque 'Eliminated' es 1 cuando está inactivo por el eliminado logico
    }));

    res.status(200).json(profiles);
  } catch (error) {
    console.error('Error al obtener perfiles:', error);
    res.status(500).json({ error: 'Error al obtener perfiles', details: error.message });
  }
});
/**
 * @swagger
 * /api/profiles:
 *   post:
 *     summary: Crea un nuevo perfil
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *               Description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Perfil creado correctamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', authenticateToken, async (req, res) => {
  const { Name, Description } = req.body;

  if (!Name) {
    return res.status(400).json({ error: 'El nombre del perfil es obligatorio.' });
  }

  try {
    const pool = await poolPromise;
    await pool.request()
      .input('Name', sql.NVarChar(255), Name)
      .input('Description', sql.NVarChar(255), Description)
      .execute('InsertProfile');

    res.status(201).json({ message: 'Perfil creado correctamente' });
  } catch (error) {
    console.error('Error al crear el perfil:', error);
    res.status(500).json({ error: 'Error al crear el perfil', details: error.message });
  }
});

/**
 * @swagger
 * /api/profiles/{id}:
 *   put:
 *     summary: Edita un perfil existente
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del perfil a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *               Description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Perfil actualizado correctamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { Name, Description } = req.body;

  if (!Name) {
    return res.status(400).json({ error: 'El nombre del perfil es obligatorio.' });
  }

  try {
    const pool = await poolPromise;
    await pool.request()
      .input('IdProfile', sql.Int, id)
      .input('Name', sql.NVarChar(255), Name)
      .input('Description', sql.NVarChar(255), Description)
      .execute('UpdateProfile');

    res.status(200).json({ message: 'Perfil actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar el perfil:', error);
    res.status(500).json({ error: 'Error al actualizar el perfil', details: error.message });
  }
});



/**
 * @swagger
 * /api/profiles/{id}:
 *   patch:
 *     summary: Cambia el estado de un perfil (Activo/Inactivo)
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del perfil a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Eliminated:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Estado del perfil actualizado correctamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.patch('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { IsActive } = req.body; // Recibe el estado actualizado

  try {
    const pool = await poolPromise;
    await pool.request()
      .input('IdProfile', sql.Int, id)
      .input('Eliminated', sql.Bit, !IsActive) // Invierte el valor para almacenarlo
      .execute('UpdateProfileStatus');

    res.status(200).json({ message: 'Estado del perfil actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar estado del perfil:', error);
    res.status(500).json({ error: 'Error al actualizar estado del perfil', details: error.message });
  }
});

/**
 * @swagger
 * /api/profiles/{profileId}/users:
 *   get:
 *     summary: Obtiene los usuarios asignados a un perfil
 *     description: Retorna la lista de usuarios que pertenecen a un perfil específico.
 *     tags:
 *       - Profiles
 *     parameters:
 *       - in: path
 *         name: profileId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del perfil para obtener los usuarios asignados.
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   UserId:
 *                     type: integer
 *                     example: 1
 *                   Username:
 *                     type: string
 *                     example: "d.leon"
 *                   Email:
 *                     type: string
 *                     example: "dleon@udec.edu.co"
 *       400:
 *         description: ID del perfil no proporcionado o inválido.
 *       500:
 *         description: Error al obtener los usuarios del perfil.
 */

router.get("/:profileId/users", authenticateToken, async (req, res) => {
  const { profileId } = req.params;

  if (!profileId || isNaN(profileId)) {
    return res.status(400).json({ error: "ID de perfil inválido" });
  }

  try {
    const pool = await poolPromise;
    const request = pool.request();
    request.input("ProfileId", sql.Int, profileId);

    const result = await request.execute("GetUsersByProfile");

    res.json(result.recordset);
  } catch (err) {
    console.error("Error al obtener los usuarios del perfil:", err);
    res.status(500).json({ error: "Error al obtener los usuarios del perfil" });
  }
});





module.exports = router;
