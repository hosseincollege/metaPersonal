import "dotenv/config";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { pool } from "../server/db.js";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required before running the Meta Personal migration.");
}

const schemaPath = new URL("./schema.sql", import.meta.url);
const schema = await readFile(fileURLToPath(schemaPath), "utf8");

try {
  await pool.query("BEGIN");
  await pool.query(schema);
  await pool.query("COMMIT");
  const result = await pool.query("SELECT to_regclass('public.notes') AS notes_table");
  if (result.rows[0]?.notes_table !== "notes") {
    throw new Error("Migration completed but the notes table was not found.");
  }
  process.stdout.write("Meta Personal database schema is up to date.\n");
} catch (error) {
  await pool.query("ROLLBACK").catch(() => {});
  process.exitCode = 1;
  process.stderr.write(`Meta Personal database migration failed: ${error.message}\n`);
} finally {
  await pool.end();
}
