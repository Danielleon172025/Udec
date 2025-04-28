const express = require('express');
const router = express.Router();
const sql = require('mssql');
const poolPromise = require('../db/config');
const authenticateToken = require('../middleware/auth');

/**
 * @swagger
 * /api/profile-permissions/{profileId}:
 *   get:
 *     summary: Obtiene todos los módulos y permisos del perfil, marcando los activos
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: profileId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del perfil a consultar
 *     responses:
 *       200:
 *         description: Lista agrupada por módulos con permisos activos
 *       400:
 *         description: ID inválido
 *       500:
 *         description: Error interno
 */
router.get('/:profileId', authenticateToken, async (req, res) => {
  const { profileId } = req.params;
  if (!profileId || isNaN(profileId)) {
    return res.status(400).json({ error: "ID de perfil inválido." });
  }

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("ProfileId", sql.Int, profileId)
      .execute("GetProfilePermissions");


      const modules = {};

      result.recordset.forEach((row) => {
        if (!modules[row.ModuleName]) {
          modules[row.ModuleName] = [];
        }
      
        modules[row.ModuleName].push({
          ModuleId: row.ModuleId,
          ModuleOptionId: row.ModuleOptionId,
          OptionName: row.OptionName,
          OptionPath: row.OptionPath,
          Active: row.Active == 1, // esto convierte correctamente el bit a varchar
        });
      });
      
      res.status(200).json(modules);
  } catch (error) {
    console.error(" Error al obtener permisos del perfil:", error);
    res.status(500).json({ error: "Error al obtener permisos", details: error.message });
  }
});

/**
 * @swagger
 * /api/profile-permissions:
 *   post:
 *     summary: Asigna o desasigna un permiso a un perfil
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ProfileId
 *               - ModuleId
 *               - ModuleOptionId
 *               - Active
 *             properties:
 *               ProfileId:
 *                 type: integer
 *               ModuleId:
 *                 type: integer
 *               ModuleOptionId:
 *                 type: integer
 *               Active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Permiso actualizado correctamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno
 */
router.post('/', authenticateToken, async (req, res) => {
  const { ProfileId, ModuleId, ModuleOptionId, Active } = req.body;

  if (!ProfileId || !ModuleId || !ModuleOptionId || typeof Active !== "boolean") {
    return res.status(400).json({ error: "Datos inválidos. Verifica el formato de los campos." });
  }

  try {
    const pool = await poolPromise;
    await pool.request()
      .input("ProfileId", sql.Int, ProfileId)
      .input("ModuleId", sql.Int, ModuleId)
      .input("ModuleOptionId", sql.Int, ModuleOptionId)
      .input("Active", sql.Bit, Active ? 1 : 0)
      .execute("UpdateProfilePermissions");

    res.status(200).json({
      message: `Permiso ${Active ? "asignado" : "revocado"} correctamente.`,
    });
  } catch (error) {
    console.error("Error al actualizar permiso:", error);
    res.status(500).json({ error: "Error al actualizar permiso", details: error.message });
  }
});

module.exports = router;
