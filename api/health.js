import { pool } from "../server/db.js";

export default async function healthHandler(_req, res) {
  if (!process.env.DATABASE_URL) return res.status(503).json({ ok: false, error: "Database is not configured" });
  try {
    await pool.query("SELECT 1");
    return res.json({ ok: true });
  } catch {
    return res.status(503).json({ ok: false, error: "Database is unavailable" });
  }
}
