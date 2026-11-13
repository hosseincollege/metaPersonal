import "dotenv/config";
import express from "express";
import { pool } from "./db.js";
import { notesCollectionHandler, noteItemHandler } from "./notes-api.js";

const app = express();
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
app.all("/api/notes", notesCollectionHandler);
app.all("/api/notes/:id", noteItemHandler);
const apiPort = Number(process.env.API_PORT || 3017);
app.listen(apiPort, "127.0.0.1", () => console.log(`Local notes API listening on 127.0.0.1:${apiPort}`));
