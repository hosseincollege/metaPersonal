import { pool } from "./db.js";

const columns = 'id, lesson_key AS "lessonKey", lesson_title AS "lessonTitle", target_id AS "targetId", target_title AS "targetTitle", target_type AS "targetType", body, due_date::text AS "dueDate", created_at AS "createdAt", is_done AS done';

function databaseUnavailable(res) {
  if (process.env.DATABASE_URL) return false;
  res.status(503).json({ error: "Database is not configured" });
  return true;
}

export async function notesCollectionHandler(req, res) {
  if (req.method === "GET") {
    if (databaseUnavailable(res)) return;
    try {
      const { rows } = await pool.query(`SELECT ${columns} FROM notes WHERE ($1::text IS NULL OR lesson_key = $1) ORDER BY created_at DESC`, [req.query.lessonKey || null]);
      return res.json(rows);
    } catch {
      return res.status(503).json({ error: "Database request failed" });
    }
  }

  if (req.method === "POST") {
    if (databaseUnavailable(res)) return;
    const { id, lessonKey, lessonTitle, targetId, targetTitle, targetType, body, dueDate, done, createdAt } = req.body || {};
    if (![lessonKey, lessonTitle, targetId, targetTitle, targetType, body].every((value) => typeof value === "string" && value.trim())) {
      return res.status(400).json({ error: "All fields required" });
    }
    const noteId = typeof id === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id) ? id : null;
    try {
      const { rows } = await pool.query(`INSERT INTO notes (id, lesson_key, lesson_title, target_id, target_title, target_type, body, due_date, is_done, created_at) VALUES (COALESCE($1::uuid, gen_random_uuid()), $2, $3, $4, $5, $6, $7, $8, $9, COALESCE($10::timestamptz, NOW())) ON CONFLICT (id) DO NOTHING RETURNING ${columns}`, [noteId, lessonKey, lessonTitle, targetId, targetTitle, targetType, body.trim(), dueDate || null, Boolean(done), createdAt || null]);
      if (rows[0]) return res.status(201).json(rows[0]);
      const existing = await pool.query(`SELECT ${columns} FROM notes WHERE id = $1`, [noteId]);
      if (existing.rows[0]) return res.status(200).json(existing.rows[0]);
      return res.status(500).json({ error: "Could not create note" });
    } catch {
      return res.status(503).json({ error: "Database request failed" });
    }
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ error: "Method not allowed" });
}

export async function noteItemHandler(req, res) {
  if (databaseUnavailable(res)) return;
  const id = req.params?.id || req.query?.id;

  if (req.method === "PATCH") {
    const { body, done, dueDate } = req.body || {};
    if (body === undefined && done === undefined && dueDate === undefined) return res.status(400).json({ error: "Provide body, done or dueDate" });
    try {
      const { rowCount } = await pool.query("UPDATE notes SET body = COALESCE($2, body), is_done = COALESCE($3, is_done), due_date = CASE WHEN $4 THEN $5::date ELSE due_date END, updated_at = NOW() WHERE id = $1", [id, body?.trim() ?? null, typeof done === "boolean" ? done : null, dueDate !== undefined, dueDate || null]);
      if (!rowCount) return res.sendStatus(404);
      return res.json({ ok: true });
    } catch {
      return res.status(503).json({ error: "Database request failed" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const { rowCount } = await pool.query("DELETE FROM notes WHERE id = $1", [id]);
      if (!rowCount) return res.sendStatus(404);
      return res.sendStatus(204);
    } catch {
      return res.status(503).json({ error: "Database request failed" });
    }
  }

  res.setHeader("Allow", "PATCH, DELETE");
  return res.status(405).json({ error: "Method not allowed" });
}
