const express = require("express");
const router = express.Router();
const sql = require("mssql");
const poolPromise = require("../db/config");
const authenticateToken = require("../middleware/auth");

/**
 * @swagger
 * /api/eventlog:
 *   get:
 *     summary: Obtiene los eventos del sistema
 *     description: Retorna una lista de eventos registrados en el sistema con filtros opcionales.
 *     tags:
 *       - EventLog
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: username
 *         schema:
 *           type: string
 *         description: Filtrar por nombre de usuario
 *       - in: query
 *         name: module
 *         schema:
 *           type: string
 *         description: Filtrar por módulo
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filtrar desde una fecha específica (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filtrar hasta una fecha específica (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Lista de eventos obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   EventLogId:
 *                     type: integer
 *                     example: 1
 *                   Username:
 *                     type: string
 *                     example: "d.leon"
 *                   Module:
 *                     type: string
 *                     example: "Login"
 *                   Description:
 *                     type: string
 *                     example: "El usuario d.leon ingresó exitosamente"
 *                   ClientIP:
 *                     type: string
 *                     example: "192.168.1.10"
 *                   RegisterDate:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-03-08T18:35:18.613Z"
 *                   EventUserId:
 *                     type: integer
 *                     example: 1
 *       401:
 *         description: No autorizado - Token inválido o expirado.
 *       500:
 *         description: Error al obtener los eventos.
 */

// 🔐 Middleware de autenticación antes de ejecutar la consulta
router.get("/", authenticateToken, async (req, res) => {
    try {
        // Verifica que el usuario esté autenticado correctamente
        if (!req.user) {
            return res.status(401).json({ error: "No autorizado: Token inválido o expirado" });
        }

        const pool = await poolPromise;
        const request = pool.request();

        // Validar los parámetros y convertir fechas
        const username = req.query.username || null;
        const module = req.query.module || null;
        const startDate = req.query.startDate ? new Date(req.query.startDate) : null;
        const endDate = req.query.endDate ? new Date(req.query.endDate) : null;

        // Asignar parámetros a la consulta
        request.input("Username", sql.NVarChar, username);
        request.input("Module", sql.NVarChar, module);
        request.input("StartDate", sql.DateTime, startDate);
        request.input("EndDate", sql.DateTime, endDate);

        // Ejecutar el procedimiento almacenado
        const result = await request.execute("GetEventLog");

        res.json(result.recordset);
    } catch (err) {
        console.error("Error al obtener los eventos:", err);
        res.status(500).json({ error: "Error al obtener los eventos" });
    }
});

module.exports = router;
