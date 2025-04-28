const express = require("express");
const router = express.Router();
const sql = require("mssql");
const poolPromise = require("../db/config");

/**
 * @swagger
 * /api/entrance/register:
 *   post:
 *     summary: Registra entrada o salida de un dispositivo basado en su RFID
 *     tags: [Entrance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rfid
 *             properties:
 *               rfid:
 *                 type: string
 *                 description: Código RFID del dispositivo
 *                 example: "1234567890ABC"
 *     responses:
 *       200:
 *         description: Registro procesado correctamente (entrada o salida)
 *       400:
 *         description: Datos inválidos o dispositivo no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.post("/register", async (req, res) => {
  const { rfid } = req.body;

  if (!rfid) {
    return res.status(400).json({ error: "El campo 'rfid' es obligatorio." });
  }

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("RFID", sql.NVarChar(50), rfid)
      .execute("sp_RegisterEntrance");

    const response = result.recordset[0];

    if (!response) {
      return res.status(400).json({ error: "Dispositivo no encontrado o sin asignación." });
    }

 
    if (response.UserImagePath) {
      response.UserImage = `${process.env.API_BASE_URL}/${response.UserImagePath.replace(/^src[\\/]/, '')}`;
    }
    if (response.DeviceImagePath) {
      response.DeviceImage = `${process.env.API_BASE_URL}/${response.DeviceImagePath.replace(/^src[\\/]/, '')}`;
    }

    res.status(200).json({
      message: response.Estado === "Salida" ? "Salida registrada" : "Entrada registrada",
      data: response,
    });
  } catch (error) {
    console.error("Error registrando entrada/salida:", error);
    res.status(500).json({ error: "Error al registrar entrada/salida", details: error.message });
  }
});

module.exports = router;
