import "dotenv/config";
import express from "express";
import pg from "pg";

const { Pool } = pg;
const app = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5174");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});
app.use(express.json({ limit: "32kb" }));
app.get("/api/health", async (_req, res) => {
  try { await pool.query("SELECT 1"); res.json({ ok: true }); }
  catch { res.status(503).json({ ok: false }); }
});
app.get("/api/notes", async (req, res) => {
  try { const { rows } = await pool.query('SELECT id, lesson_key AS "lessonKey", lesson_title AS "lessonTitle", target_id AS "targetId", target_title AS "targetTitle", target_type AS "targetType", body, due_date::text AS "dueDate", created_at AS "createdAt", is_done AS done FROM notes WHERE ($1::text IS NULL OR lesson_key = $1) ORDER BY created_at DESC', [req.query.lessonKey || null]); res.json(rows); }
  catch { res.status(500).json({ error: "Could not load notes" }); }
});
app.post("/api/notes", async (req, res) => {
  const { lessonKey, lessonTitle, targetId, targetTitle, targetType, body, dueDate } = req.body || {};
  if (![lessonKey, lessonTitle, targetId, targetTitle, targetType, body].every((value) => typeof value === "string" && value.trim())) return res.status(400).json({ error: "All fields required" });
  try { const { rows } = await pool.query('INSERT INTO notes (lesson_key, lesson_title, target_id, target_title, target_type, body, due_date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, lesson_key AS "lessonKey", lesson_title AS "lessonTitle", target_id AS "targetId", target_title AS "targetTitle", target_type AS "targetType", body, due_date::text AS "dueDate", created_at AS "createdAt", is_done AS done', [lessonKey, lessonTitle, targetId, targetTitle, targetType, body.trim(), dueDate || null]); res.status(201).json(rows[0]); }
  catch { res.status(500).json({ error: "Could not create note" }); }
});
app.patch("/api/notes/:id", async (req, res) => {
  const { body, done, dueDate } = req.body || {};
  if (body === undefined && done === undefined && dueDate === undefined) return res.status(400).json({ error: "Provide body, done or dueDate" });
  try { const { rowCount } = await pool.query("UPDATE notes SET body = COALESCE($2, body), is_done = COALESCE($3, is_done), due_date = CASE WHEN $4 THEN $5::date ELSE due_date END, updated_at = NOW() WHERE id = $1", [req.params.id, body?.trim() ?? null, typeof done === "boolean" ? done : null, dueDate !== undefined, dueDate || null]); if (!rowCount) return res.sendStatus(404); res.json({ ok: true }); }
  catch { res.status(500).json({ error: "Could not update note" }); }
});
app.delete("/api/notes/:id", async (req, res) => {
  try { const { rowCount } = await pool.query("DELETE FROM notes WHERE id = $1", [req.params.id]); if (!rowCount) return res.sendStatus(404); res.sendStatus(204); }
  catch { res.status(500).json({ error: "Could not delete note" }); }
});
app.listen(Number(process.env.API_PORT || 3001), "127.0.0.1", () => console.log("Local notes API listening on 127.0.0.1"));
