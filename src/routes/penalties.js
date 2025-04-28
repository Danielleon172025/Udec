// src/routes/penalties.js
const express = require('express');
const router = express.Router();
const sql = require('mssql');
const dbConfig = require('../db/config'); // Configuración de la base de datos
const authenticateToken = require('../middleware/auth');

router.get('/ruta-protegida', authenticateToken, (req, res) => {
  res.json({ message: 'Acceso concedido a la ruta protegida' });
});
/**
 * @swagger
 * /api/penalties:
 *   post:
 *     summary: Inserta una nueva penalización
 *     tags: [Penalties]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: ID del usuario
 *               description:
 *                 type: string
 *                 description: Descripción de la penalización
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha de inicio de la penalización
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha de finalización de la penalización
 *     responses:
 *       201:
 *         description: Penalización insertada correctamente
 */
router.post('/', async (req, res) => {
  const { userId, description, startDate, endDate } = req.body;
  try {
    let pool = await sql.connect(dbConfig);
    await pool.request()
      .input('UserId', sql.Int, userId)
      .input('Description', sql.NVarChar(255), description)
      .input('StartDate', sql.DateTime, startDate)
      .input('EndDate', sql.DateTime, endDate)
      .input('Active', sql.Bit, 1)
      .execute('InsertPenalty');

    res.status(201).json({ message: 'Penalización insertada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al insertar la penalización', details: error.message });
  }
});

/**
 * @swagger
 * /api/penalties/{id}/deactivate:
 *   put:
 *     summary: Desactiva una penalización
 *     tags: [Penalties]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la penalización
 *     responses:
 *       200:
 *         description: Penalización desactivada correctamente
 */
router.put('/:id/deactivate', async (req, res) => {
  const { id } = req.params;
  try {
    let pool = await sql.connect(dbConfig);
    await pool.request()
      .input('PenaltyId', sql.Int, id)
      .execute('DeactivatePenalty');

    res.status(200).json({ message: 'Penalización desactivada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al desactivar la penalización', details: error.message });
  }
});

module.exports = router;
