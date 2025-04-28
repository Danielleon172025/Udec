const express = require('express');
const router = express.Router();
const sql = require('mssql');
const poolPromise = require('../db/config');
const authenticateToken = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: DeviceTypes
 *   description: Operaciones CRUD sobre tipos de dispositivos
 */

/**
 * @swagger
 * /api/device-types:
 *   get:
 *     summary: Obtener todos los tipos de dispositivos
 *     tags: [DeviceTypes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tipos de dispositivos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   DeviceTypeId:
 *                     type: integer
 *                   DeviceType:
 *                     type: string
 */
router.get('/', authenticateToken, async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute('GetAllDeviceTypes');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error al obtener tipos de dispositivos:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

/**
 * @swagger
 * /api/device-types:
 *   post:
 *     summary: Crear un nuevo tipo de dispositivo
 *     tags: [DeviceTypes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               DeviceType:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tipo de dispositivo creado correctamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post('/', authenticateToken, async (req, res) => {
  const { DeviceType } = req.body;
  if (!DeviceType) return res.status(400).json({ error: 'El campo DeviceType es obligatorio' });

  try {
    const pool = await poolPromise;
    await pool.request()
      .input('DeviceType', sql.NVarChar(100), DeviceType)
      .execute('InsertDeviceType');

    res.status(201).json({ message: 'Tipo de dispositivo creado correctamente' });
  } catch (err) {
    console.error('Error al crear tipo de dispositivo:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

/**
 * @swagger
 * /api/device-types/{id}:
 *   put:
 *     summary: Actualizar un tipo de dispositivo
 *     tags: [DeviceTypes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de dispositivo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               DeviceType:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tipo de dispositivo actualizado correctamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Tipo de dispositivo no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { DeviceType } = req.body;

  if (!DeviceType) return res.status(400).json({ error: 'El campo DeviceType es obligatorio' });

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('DeviceTypeId', sql.Int, id)
      .input('DeviceType', sql.NVarChar(100), DeviceType)
      .execute('UpdateDeviceType');

    res.json({ message: 'Tipo de dispositivo actualizado correctamente' });
  } catch (err) {
    console.error('Error al actualizar tipo de dispositivo:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
