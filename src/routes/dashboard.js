const express = require('express');
const router = express.Router();
const sql = require('mssql');
const poolPromise = require('../db/config');
const authenticateToken = require('../middleware/auth');

/**
 * @swagger
 * tags: [Dashboard]
 * /api/dashboard/counts:
 *   get:
 *     summary: Totales generales para el dashboard
 */
router.get('/counts', authenticateToken, async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().execute('Dashboard_Counts');
        res.status(200).json(result.recordset[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo totales', details: error.message });
    }
});

/**
 * @swagger
 * tags: [Dashboard]
 * /api/dashboard/recent:
 *   get:
 *     summary: Últimas entradas registradas
 */
router.get('/recent', authenticateToken, async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().execute('Dashboard_RecentEntries');
        res.status(200).json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo entradas recientes', details: error.message });
    }
});

/**
 * @swagger
 * tags: [Dashboard]
 * /api/dashboard/activity:
 *   get:
 *     summary: Datos de actividad para gráfico por día
 */
router.get('/activity', authenticateToken, async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().execute('Dashboard_ActivityChart');
        res.status(200).json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo datos de actividad', details: error.message });
    }
});

/**
 * @swagger
 * tags: [Dashboard]
 * /api/dashboard/logs:
 *   get:
 *     summary: Últimos eventos del sistema
 */
router.get('/logs', authenticateToken, async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().execute('Dashboard_LogResumen');
        res.status(200).json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo logs', details: error.message });
    }
});

module.exports = router;
