// src/routes/notifications.js
const express = require('express');
const router = express.Router();
const sql = require('mssql');
const dbConfig = require('../db/config'); // Configuración de la base de datos

/**
 * @swagger
 * /api/notifications:
 *   post:
 *     summary: Inserta una nueva notificación
 *     tags: [Notifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: ID del usuario (opcional)
 *               type:
 *                 type: integer
 *                 description: Tipo de notificación (opcional)
 *               message:
 *                 type: string
 *                 description: Mensaje de la notificación
 *     responses:
 *       201:
 *         description: Notificación insertada correctamente
 */
router.post('/', async (req, res) => {
  const { userId, type, message } = req.body;
  try {
    let pool = await sql.connect(dbConfig);
    await pool.request()
      .input('UserId', sql.Int, userId || null)
      .input('Type', sql.Int, type || null)
      .input('Message', sql.VarChar(255), message)
      .execute('InsertNotification');

    res.status(201).json({ message: 'Notificación insertada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al insertar la notificación', details: error.message });
  }
});

module.exports = router;