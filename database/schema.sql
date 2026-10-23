-- PostgreSQL schema for lesson notes. Apply with psql after configuring the DB.
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_key TEXT NOT NULL,
  lesson_title TEXT NOT NULL,
  target_id TEXT NOT NULL,
  target_title TEXT NOT NULL,
  target_type TEXT NOT NULL,
  body TEXT NOT NULL,
  due_date DATE,
  is_done BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS notes_lesson_key_idx ON notes (lesson_key);
CREATE INDEX IF NOT EXISTS notes_lesson_target_idx ON notes (lesson_key, target_title);
CREATE INDEX IF NOT EXISTS notes_target_idx ON notes (lesson_key, target_id);
