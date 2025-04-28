const express = require('express');
const router = express.Router();
const sql = require('mssql');
const poolPromise = require('../db/config');
const authenticateToken = require("../middleware/auth");

/**
 * @swagger
 * /api/users-profiles:
 *   post:
 *     summary: Asigna un perfil a un usuario
 *     tags: [UsersProfiles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - profileId
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: ID del usuario
 *               profileId:
 *                 type: integer
 *                 description: ID del perfil
 *     responses:
 *       201:
 *         description: Usuario asignado correctamente al perfil.
 *       409:
 *         description: El usuario ya tiene asignado este perfil.
 *       400:
 *         description: Datos incompletos.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/', authenticateToken, async (req, res) => {
  const { userId, profileId } = req.body;

  if (!userId || !profileId) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  try {
    const pool = await poolPromise;
    await pool.request()
      .input('UserId', sql.Int, userId)
      .input('ProfileId', sql.Int, profileId)
      .execute('InsertUserProfile');

    res.status(201).json({ message: 'Usuario asignado correctamente al perfil.' });

  } catch (error) {
    console.error('⚠️ Error al asignar usuario a perfil:', error);

    if (error.message.includes('El usuario ya tiene asignado este perfil')) {
      return res.status(409).json({ error: 'El usuario ya tiene asignado este perfil.' });
    }

    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

/**
 * @swagger
 * /api/users-profiles/{id}:
 *   put:
 *     summary: Actualiza la relación de un usuario con un perfil
 *     tags: [UsersProfiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la relación usuario-perfil
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - profileId
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: Nuevo ID del usuario
 *               profileId:
 *                 type: integer
 *                 description: Nuevo ID del perfil
 *     responses:
 *       200:
 *         description: Relación actualizada correctamente.
 *       400:
 *         description: Datos incompletos.
 *       500:
 *         description: Error interno del servidor.
 */
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { userId, profileId } = req.body;

  if (!id || !userId || !profileId) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  try {
    const pool = await poolPromise;
    await pool.request()
      .input('UserProfileId', sql.Int, id)
      .input('UserId', sql.Int, userId)
      .input('ProfileId', sql.Int, profileId)
      .execute('UpdateUserProfile');

    res.status(200).json({ message: 'Relación usuario-perfil actualizada correctamente' });
  } catch (error) {
    console.error('⚠️ Error actualizando relación:', error);
    res.status(500).json({ error: 'Error al actualizar la relación usuario-perfil', details: error.message });
  }
});

/**
 * @swagger
 * /api/users-profiles/delete:
 *   delete:
 *     summary: Elimina la relación entre un usuario y un perfil
 *     tags: [UsersProfiles]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *       - in: query
 *         name: profileId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del perfil
 *     responses:
 *       200:
 *         description: Relación eliminada correctamente.
 *       400:
 *         description: Parámetros faltantes.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete("/delete", authenticateToken, async (req, res) => {
  const { userId, profileId } = req.query;

  if (!userId || !profileId) {
    return res.status(400).json({ error: "Los parámetros userId y profileId son obligatorios" });
  }

  try {
    const pool = await poolPromise;
    await pool.request()
      .input("UserId", sql.Int, userId)
      .input("ProfileId", sql.Int, profileId)
      .execute("DeleteUserFromProfile");

    res.status(200).json({ message: "Usuario eliminado del perfil correctamente" });

  } catch (err) {
    console.error("⚠️ Error al eliminar usuario del perfil:", err);
    res.status(500).json({ error: "Error al eliminar usuario del perfil" });
  }
});

module.exports = router;
