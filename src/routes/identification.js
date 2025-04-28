const express = require('express');
const router = express.Router();
const sql = require('mssql');
const poolPromise = require('../db/config');
const authenticateToken = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Identifications
 *   description: Gestión de tipos de identificación
 */

/**
 * @swagger
 * /api/identifications/identification:
 *   get:
 *     summary: Obtiene la lista de tipos de identificación disponibles
 *     tags: [Identifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tipos de identificación obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   IdentificationId:
 *                     type: integer
 *                     description: ID del tipo de identificación
 *                     example: 1
 *                   Name:
 *                     type: string
 *                     description: Nombre del tipo de identificación
 *                     example: "Cédula de Ciudadanía"
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/identification', authenticateToken, async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute('GetAllIdentifications');

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error al obtener tipos de identificación:', error);
    res.status(500).json({
      error: 'Error al obtener tipos de identificación',
      details: error.message,
    });
  }
});

module.exports = router;