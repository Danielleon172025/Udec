// src/routes/blacklist.js
const express = require('express');
const router = express.Router();
const sql = require('mssql');
const dbConfig = require('../db/config'); // Configuración de la base de datos

/**
 * @swagger
 * /api/blacklist:
 *   post:
 *     summary: Inserta una nueva entrada en la lista negra
 *     tags: [BlackList]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: Descripción de la entrada en la lista negra
 *     responses:
 *       201:
 *         description: Entrada insertada correctamente
 */
router.post('/', async (req, res) => {
  const { deviceId, description } = req.body;
  try {
    let pool = await sql.connect(dbConfig);
    await pool.request()
      .input('DeviceId', sql.Int, deviceId)
      .input('Description', sql.NVarChar(255), description)
      .input('Active', sql.Bit, 1)
      .execute('InsertBlackList');

    res.status(201).json({ message: 'Entrada insertada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al insertar la entrada en la lista negra', details: error.message });
  }
});

/**
 * @swagger
 * /api/blacklist/{id}/deactivate:
 *   put:
 *     summary: Desactiva una entrada de la lista negra
 *     tags: [BlackList]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la entrada a desactivar
 *     responses:
 *       200:
 *         description: Entrada desactivada correctamente
 */
router.put('/:id/deactivate', async (req, res) => {
  const { id } = req.params;
  try {
    let pool = await sql.connect(dbConfig);
    await pool.request()
      .input('BlackListId', sql.Int, id)
      .execute('DeactivateBlackList');

    res.status(200).json({ message: 'Entrada desactivada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al desactivar la entrada', details: error.message });
  }
});

module.exports = router;
