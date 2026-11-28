import { API_BASE } from "./apiBase.js";

const LEGACY_NOTES_KEY = "metaPersonal.notes.v1";

let legacyMigration;

async function migrateLegacyNotes() {
  if (!legacyMigration) {
    legacyMigration = (async () => {
      const raw = localStorage.getItem(LEGACY_NOTES_KEY);
      if (!raw) return;

      const legacyNotes = JSON.parse(raw);
      if (!Array.isArray(legacyNotes)) throw new Error("Legacy notes data is invalid");

      for (const note of legacyNotes) {
        const response = await fetch(`${API_BASE}/notes`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: note.id,
            lessonKey: note.lessonKey,
            lessonTitle: note.lessonTitle || note.lessonKey,
            targetId: note.targetId || note.lessonKey,
            targetTitle: note.targetTitle || note.target || note.lessonTitle || note.lessonKey,
            targetType: note.targetType || "درس",
            body: note.body,
            dueDate: note.dueDate || null,
            done: Boolean(note.done),
            createdAt: note.createdAt || null,
          }),
        });
        if (!response.ok) throw new Error("Legacy notes migration failed");
      }

      localStorage.removeItem(LEGACY_NOTES_KEY);
    })().catch((error) => {
      legacyMigration = undefined;
      throw error;
    });
  }
  return legacyMigration;
}

export async function loadNotes(url) {
  try {
    await migrateLegacyNotes();
  } catch {
    // Keep any legacy copy until the database confirms that it was imported.
  }
  const response = await fetch(url);
  if (!response.ok) throw new Error("Database request failed");
  return response.json();
}
