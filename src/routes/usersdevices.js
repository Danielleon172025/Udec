const express = require("express");
const router = express.Router();
const sql = require("mssql");
const poolPromise = require("../db/config");
const authenticateToken = require("../middleware/auth");

//  Asignar usuario al dispositivo
router.post("/assign", authenticateToken, async (req, res) => {
  const { userId, deviceId } = req.body;

  if (!userId || !deviceId) {
    return res.status(400).json({ error: "userId y deviceId son obligatorios." });
  }

  try {
    const pool = await poolPromise;
    await pool.request()
      .input("UserId", sql.Int, userId)
      .input("DeviceId", sql.Int, deviceId)
      .execute("AssignUserToDevice");

    res.status(200).json({ message: "Usuario asignado correctamente." });
  } catch (error) {
    console.error("Error asignando usuario al dispositivo:", error);
    res.status(500).json({ error: "Error asignando usuario al dispositivo." });
  }
});

//  Remover usuario del dispositivo
router.delete("/unassign/:deviceId", authenticateToken, async (req, res) => {
  const { deviceId } = req.params;

  try {
    const pool = await poolPromise;
    await pool.request()
      .input("DeviceId", sql.Int, deviceId)
      .query("DELETE FROM UserDevices WHERE DeviceId = @DeviceId");

    res.status(200).json({ message: "Asignación eliminada." });
  } catch (error) {
    console.error("Error al remover asignación:", error);
    res.status(500).json({ error: "Error al remover asignación." });
  }
});

//  Obtener usuarios asignados a un dispositivo
router.get("/:deviceId/users", authenticateToken, async (req, res) => {
  const { deviceId } = req.params;

  if (!deviceId) {
    return res.status(400).json({ error: "deviceId es obligatorio." });
  }

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("DeviceId", sql.Int, deviceId)
      .execute("GetAssignedUsersByDevice");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("Error al obtener usuarios asignados:", error);
    res.status(500).json({ error: "Error al obtener usuarios asignados." });
  }
});

//  Buscar usuarios disponibles (por nombre/email)
router.get("/search", authenticateToken, async (req, res) => {
  const { search } = req.query;

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("Search", sql.NVarChar(100), search || "")
      .execute("GetAllUsersFiltered");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("Error al buscar usuarios:", error);
    res.status(500).json({ error: "Error al buscar usuarios." });
  }
});

module.exports = router;
