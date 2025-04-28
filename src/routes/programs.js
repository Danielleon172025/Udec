const express = require("express");
const router = express.Router();
const sql = require("mssql");
const poolPromise = require("../db/config");
const authenticateToken = require("../middleware/auth");

/**
 * @swagger
 * tags:
 *   name: Programs
 *   description: Operaciones CRUD sobre programas académicos
 */

/**
 * @swagger
 * /api/programs:
 *   get:
 *     summary: Obtener todos los programas
 *     tags: [Programs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de programas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ProgramId:
 *                     type: integer
 *                   Name:
 *                     type: string
 */
router.get("/", authenticateToken, async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute("GetAllPrograms");
    res.json(result.recordset);
  } catch (err) {
    console.error("Error al obtener programas:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

/**
 * @swagger
 * /api/programs:
 *   post:
 *     summary: Crear un nuevo programa
 *     tags: [Programs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Name
 *             properties:
 *               Name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Programa creado correctamente
 *       400:
 *         description: Datos inválidos
 */
router.post("/", authenticateToken, async (req, res) => {
  const { Name } = req.body;
  if (!Name) return res.status(400).json({ error: "El nombre es obligatorio" });

  try {
    const pool = await poolPromise;
    await pool.request()
      .input("Name", sql.NVarChar(100), Name)
      .execute("InsertProgram");

    res.status(201).json({ message: "Programa creado correctamente" });
  } catch (err) {
    console.error("Error al crear programa:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

/**
 * @swagger
 * /api/programs/{id}:
 *   put:
 *     summary: Actualizar un programa
 *     tags: [Programs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del programa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Programa actualizado correctamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.put("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { Name } = req.body;

  if (!Name) return res.status(400).json({ error: "El nombre es obligatorio" });

  try {
    const pool = await poolPromise;
    await pool.request()
      .input("ProgramId", sql.Int, id)
      .input("Name", sql.NVarChar(100), Name)
      .execute("UpdateProgram");

    res.json({ message: "Programa actualizado correctamente" });
  } catch (err) {
    console.error("Error al actualizar programa:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

/**
 * @swagger
 * /api/programs/{id}:
 *   delete:
 *     summary: Eliminar un programa
 *     tags: [Programs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del programa a eliminar
 *     responses:
 *       200:
 *         description: Programa eliminado correctamente
 *       500:
 *         description: Error del servidor
 */
router.delete("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await poolPromise;
    await pool.request()
      .input("ProgramId", sql.Int, id)
      .execute("DeleteProgram");

    res.json({ message: "Programa eliminado correctamente" });
  } catch (err) {
    console.error("Error al eliminar programa:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
