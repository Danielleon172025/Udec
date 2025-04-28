// src/routes/rooms.js
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
 * /api/rooms:
 *   post:
 *     summary: Inserta una nueva sala
 *     tags: [Rooms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la sala
 *               description:
 *                 type: string
 *                 description: Descripción de la sala (opcional)
 *     responses:
 *       201:
 *         description: Sala insertada correctamente
 */
router.post('/', async (req, res) => {
  const { name, description } = req.body;
  try {
    let pool = await sql.connect(dbConfig);
    await pool.request()
      .input('Name', sql.NVarChar(100), name)
      .input('Description', sql.NVarChar(255), description || null)
      .execute('InsertRoom');

    res.status(201).json({ message: 'Sala insertada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al insertar la sala', details: error.message });
  }
});

/**
 * @swagger
 * /api/rooms/{id}:
 *   put:
 *     summary: Actualiza una sala
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la sala a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nuevo nombre de la sala
 *               description:
 *                 type: string
 *                 description: Nueva descripción de la sala (opcional)
 *     responses:
 *       200:
 *         description: Sala actualizada correctamente
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    let pool = await sql.connect(dbConfig);
    await pool.request()
      .input('RoomId', sql.Int, id)
      .input('Name', sql.NVarChar(100), name)
      .input('Description', sql.NVarChar(255), description || null)
      .execute('UpdateRoom');

    res.status(200).json({ message: 'Sala actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la sala', details: error.message });
  }
});

/**
 * @swagger
 * /api/rooms/{roomId}/devices/{deviceId}:
 *   put:
 *     summary: Actualiza un dispositivo en una sala
 *     tags: [RoomDevices]
 *     parameters:
 *       - in: path
 *         name: roomId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la sala
 *       - in: path
 *         name: deviceId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del dispositivo a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newDeviceId:
 *                 type: integer
 *                 description: Nuevo ID del dispositivo
 *     responses:
 *       200:
 *         description: Dispositivo actualizado en la sala correctamente
 */
router.put('/:roomId/devices/:deviceId', async (req, res) => {
  const { roomId, deviceId } = req.params;
  const { newDeviceId } = req.body;
  try {
    let pool = await sql.connect(dbConfig);
    await pool.request()
      .input('RoomId', sql.Int, roomId)
      .input('DeviceId', sql.Int, deviceId)
      .input('NewDeviceId', sql.Int, newDeviceId)
      .execute('UpdateRoomDevice');

    res.status(200).json({ message: 'Dispositivo actualizado en la sala correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el dispositivo en la sala', details: error.message });
  }
});

/**
 * @swagger
 * /api/rooms/{roomId}/devices:
 *   post:
 *     summary: Inserta un dispositivo en una sala
 *     tags: [RoomDevices]
 *     parameters:
 *       - in: path
 *         name: roomId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la sala
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               deviceId:
 *                 type: integer
 *                 description: ID del dispositivo a insertar
 *     responses:
 *       201:
 *         description: Dispositivo insertado en la sala correctamente
 */
router.post('/:roomId/devices', async (req, res) => {
  const { roomId } = req.params;
  const { deviceId } = req.body;
  try {
    let pool = await sql.connect(dbConfig);
    await pool.request()
      .input('RoomId', sql.Int, roomId)
      .input('DeviceId', sql.Int, deviceId)
      .execute('InsertRoomDevice');

    res.status(201).json({ message: 'Dispositivo insertado en la sala correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al insertar el dispositivo en la sala', details: error.message });
  }
});

module.exports = router;
