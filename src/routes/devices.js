const express = require('express');
const router = express.Router();
const sql = require('mssql');
const poolPromise = require('../db/config'); // Conexión a la base de datos
const authenticateToken = require('../middleware/auth');
const upload = require('../services/multer'); // Configuración de multer

/**
 * @swagger
 * /api/devices:
 *   get:
 *     summary: Obtiene la lista de todos los dispositivos
 *     tags: [Devices]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         Description: Lista de dispositivos obtenida exitosamente
 *       500:
 *         Description: Error interno del servidor
 */
router.get('/', authenticateToken, async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().execute('GetDevices');
        result.recordset.forEach(device => {
            device.ImagePath = device.FilePath
                ? `${process.env.API_BASE_URL}/${device.FilePath.replace(/^src[\\/]/, '')}`
                : null;
        });
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al obtener dispositivos:', error);
        res.status(500).json({ error: 'Error al obtener dispositivos', details: error.message });
    }
});

/**
 * @swagger
 * /api/devices/{id}:
 *   get:
 *     summary: Obtiene la información de un Dispositivo específico
 *     tags: [Devices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         Description: ID del Dispositivo a obtener
 *     responses:
 *       200:
 *         Description: Dispositivo obtenido exitosamente
 *       404:
 *         Description: Dispositivo no encontrado
 *       500:
 *         Description: Error interno del servidor
 */
router.get('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('DeviceId', sql.Int, id)
            .execute('GetDeviceById');

        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Dispositivo no encontrado' });
        }

        const device = result.recordset[0];
        device.ImagePath = device.FilePath
            ? `${process.env.API_BASE_URL}/${device.FilePath.replace(/^src[\\/]/, '')}`
            : null;

        res.status(200).json(device);
    } catch (error) {
        console.error('Error al obtener el dispositivo:', error);
        res.status(500).json({ error: 'Error al obtener el dispositivo', details: error.message });
    }
});

/**
 * @swagger
 * /api/devices:
 *   post:
 *     summary: Inserta un nuevo dispositivo
 *     tags: [Devices]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               DeviceType:
 *                 type: string
 *               Serial:
 *                 type: string
 *               TradeMark:
 *                 type: string
 *               Model:
 *                 type: string
 *               Description:
 *                 type: string
 *               RFID:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         Description: Dispositivo insertado correctamente
 *       400:
 *         Description: Datos inválidos
 *       500:
 *         Description: Error interno del servidor
 */
router.post('/', authenticateToken, upload.single('image'), async (req, res) => {
    const { DeviceType, Serial, TradeMark, Model, Description, RFID } = req.body;

    if (!DeviceType || !Serial || !TradeMark || !Model) {
        return res.status(400).json({ error: 'Los campos obligatorios deben estar presentes.' });
    }

    let imageId = null;
    try {
        const pool = await poolPromise;

        if (req.file) {
            const imagePath = `src/uploads/images/${req.file.filename}`;
            const imageResult = await pool.request()
                .input('ImagePath', sql.NVarChar(255), imagePath)
                .execute('InsertImage');
            imageId = imageResult.recordset[0].ImageId;
        }

        await pool.request()
            .input('DeviceType', sql.NVarChar(100), DeviceType)
            .input('Serial', sql.NVarChar(50), Serial)
            .input('TradeMark', sql.NVarChar(100), TradeMark)
            .input('Model', sql.NVarChar(100), Model)
            .input('Description', sql.NVarChar(255), Description || null)
            .input('RFID', sql.NVarChar(50), RFID || null)
            .input('ImageId', sql.Int, imageId)
            .input('IsActive', sql.Bit, 1)
            .execute('InsertDevice');

        res.status(201).json({ message: 'Dispositivo insertado correctamente' });
    } catch (error) {
        console.error('Error al insertar el dispositivo:', error);
        res.status(500).json({ error: 'Error al insertar el dispositivo', details: error.message });
    }
});

/**
 * @swagger
 * /api/devices/{id}:
 *   put:
 *     summary: Actualiza un Dispositivo existente
 *     tags: [Devices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         Description: ID del Dispositivo a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               DeviceType:
 *                 type: string
 *               Serial:
 *                 type: string
 *               TradeMark:
 *                 type: string
 *               Model:
 *                 type: string
 *               Description:
 *                 type: string
 *               RFID:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         Description: Dispositivo actualizado correctamente
 *       400:
 *         Description: Datos inválidos
 *       500:
 *         Description: Error interno del servidor
 */
router.put('/:id', authenticateToken, upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const { DeviceType, Serial, TradeMark, Model, Description, RFID, isActive } = req.body;

    if (!DeviceType || !Serial || !TradeMark || !Model) {
        return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes.' });
    }

    try {
        const pool = await poolPromise;
        await pool.request()
            .input('DeviceId', sql.Int, id)
            .input('DeviceType', sql.NVarChar(100), DeviceType)
            .input('Serial', sql.NVarChar(50), Serial)
            .input('TradeMark', sql.NVarChar(100), TradeMark)
            .input('Model', sql.NVarChar(100), Model)
            .input('Description', sql.NVarChar(255), Description || null)
            .input('RFID', sql.NVarChar(50), RFID || null)
            //.input('IsActive', sql.Bit, isActive === 'false' ? 0 : 1)
            .execute('UpdateDevice');

        res.status(200).json({ message: 'Dispositivo actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar el Dispositivo:', error);
        res.status(500).json({ error: 'Error al actualizar el Dispositivo', details: error.message });
    }
});

/**
 * @swagger
 * /api/devices/{id}:
 *   patch:
 *     summary: Inactiva un dispositivo
 *     tags: [Devices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         Description: ID del dispositivo a inactivar
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
 *         Description: Dispositivo inactivado correctamente
 *       400:
 *         Description: Datos inválidos
 *       500:
 *         Description: Error interno del servidor
 */
router.patch('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { IsActive } = req.body;

    if (typeof IsActive !== 'boolean') {
        return res.status(400).json({ error: 'El campo IsActive debe ser un valor booleano.' });
    }

    try {
        const pool = await poolPromise;
        await pool.request()
            .input('DeviceId', sql.Int, id)
            .input('IsActive', sql.Bit, IsActive)
            .execute('UpdateDeviceStatus');

        res.status(200).json({ message: 'Estado del dispositivo actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar el estado del dispositivo:', error);
        res.status(500).json({ error: 'Error al actualizar el estado del dispositivo', details: error.message });
    }
});

module.exports = router;
