import { useEffect, useState } from "react";
import { Check, Pencil, Plus, Trash2, X } from "lucide-react";

const STORAGE_KEY = "metaPersonal.notes.v1";
const API = "/api";

function readNotes() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
  catch { return []; }
}

function formatPersianDateTime(value) {
  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", { timeZone: "Asia/Tehran", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(new Date(value));
}

export default function NotesPanel({ lesson, isDark = true, showLauncher = true }) {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState(readNotes);
  const [targetId, setTargetId] = useState(lesson?.key || "");
  const [body, setBody] = useState("");
  const [targetTitle, setTargetTitle] = useState(lesson?.title || "درس");
  const [targetType, setTargetType] = useState("درس");
  const [openedAt, setOpenedAt] = useState(() => new Date().toISOString());
  const [editing, setEditing] = useState(null);
  const [apiReady, setApiReady] = useState(false);

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(notes)); }, [notes]);
  useEffect(() => {
    const openForTarget = (event) => {
      setTargetId(event.detail.id);
      setTargetTitle(event.detail.title);
      setTargetType(event.detail.type);
      setEditing(null);
      setBody("");
      setOpenedAt(new Date().toISOString());
      setOpen(true);
    };
    window.addEventListener("metaPersonal:open-note", openForTarget);
    return () => window.removeEventListener("metaPersonal:open-note", openForTarget);
  }, []);
  useEffect(() => {
    let alive = true;
    fetch(`${API}/notes?lessonKey=${encodeURIComponent(lesson?.key || "")}`).then((response) => {
      if (!response.ok) throw new Error("API unavailable");
      return response.json();
    }).then((items) => {
      if (alive) { setApiReady(true); setNotes((current) => [...current.filter((note) => note.lessonKey !== lesson?.key), ...items]); }
    }).catch(() => { if (alive) setApiReady(false); });
    return () => { alive = false; };
  }, [lesson?.key]);

  const save = async (event) => {
    event.preventDefault();
    if (!targetId || !body.trim()) return;
    const old = notes.find((item) => item.id === editing);
    let saved = { id: crypto.randomUUID(), lessonKey: lesson?.key, lessonTitle: lesson?.title, targetId, targetTitle, target: targetTitle, targetType, body: body.trim(), done: false, createdAt: openedAt };
    if (apiReady) {
      try {
        const response = await fetch(editing ? `${API}/notes/${editing}` : `${API}/notes`, { method: editing ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing ? { body: body.trim() } : { lessonKey: lesson?.key, lessonTitle: lesson?.title, targetId, targetTitle, targetType, body: body.trim() }) });
        if (!response.ok) throw new Error("API save failed");
        if (!editing) saved = { ...(await response.json()), target: targetTitle };
      } catch { setApiReady(false); }
    }
    if (editing) setNotes((items) => items.map((item) => item.id === editing ? { ...item, ...old, body: body.trim(), updatedAt: new Date().toISOString() } : item));
    else setNotes((items) => [saved, ...items]);
    setBody(""); setEditing(null);
  };

  const startEdit = (note) => { setEditing(note.id); setTargetId(note.targetId || lesson?.key || ""); setTargetTitle(note.targetTitle || note.target || ""); setTargetType(note.targetType || "درس"); setOpenedAt(note.createdAt || new Date().toISOString()); setBody(note.body); };
  const surface = isDark ? "#171a20" : "#fff";
  const foreground = isDark ? "#f1f5f9" : "#172033";

  return <>
    {showLauncher && <button type="button" onClick={() => setOpen(true)} aria-label="یادداشت‌ها" title="یادداشت‌ها" style={{ position: "fixed", bottom: 20, left: 20, zIndex: 40, border: 0, borderRadius: 999, padding: "11px 16px", background: lesson?.color || "#38bdf8", color: "white", fontWeight: 800, boxShadow: "0 5px 20px #0004" }}>یادداشت‌ها ({notes.filter((n) => n.lessonKey === lesson?.key).length})</button>}
    {open && <div role="dialog" aria-modal="true" aria-label="مدیریت یادداشت‌ها" onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(false); }} style={{ position: "fixed", inset: 0, zIndex: 100, background: "#0009", display: "grid", placeItems: "center", padding: 16 }}>
      <div style={{ width: "min(600px, 100%)", maxHeight: "85vh", overflow: "auto", background: surface, color: foreground, borderRadius: 18, padding: 20, direction: "rtl", boxShadow: "0 20px 70px #0008" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}><div><h2>یادداشت‌های {lesson?.title}</h2><small>{apiReady ? "ذخیره در PostgreSQL" : "ذخیره محلی مرورگر؛ API در دسترس نیست"}</small></div><button onClick={() => setOpen(false)} aria-label="بستن"><X size={18}/></button></header>
        <form onSubmit={save} style={{ display: "grid", gap: 10, marginBottom: 20 }}>
          <div style={{ padding: 10, borderRadius: 8, border: "1px solid #64748b55" }}>{targetType} · {targetTitle}</div>
          <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="متن یادداشت" rows={3} required style={{ padding: 10, borderRadius: 8, border: "1px solid #64748b", background: surface, color: foreground, font: "inherit" }} />
          <div style={{ fontSize: 13, opacity: .75 }}>زمان ثبت: {formatPersianDateTime(openedAt)}</div>
          <button type="submit" style={{ justifySelf: "start" }}><Plus size={16}/>{editing ? "ذخیرهٔ ویرایش" : "افزودن یادداشت"}</button>
        </form>
        <div style={{ display: "grid", gap: 10 }}>{notes.filter((n) => n.lessonKey === lesson?.key).map((note) => <article key={note.id} style={{ border: "1px solid #64748b55", borderRadius: 12, padding: 12, opacity: note.done ? .65 : 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}><strong>{note.targetTitle || note.target}</strong><div style={{ display: "flex", gap: 4 }}><button type="button" onClick={async () => { const done = !note.done; if (apiReady) { try { const response = await fetch(`${API}/notes/${note.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ done }) }); if (!response.ok) throw new Error(); } catch { setApiReady(false); } } setNotes((items) => items.map((n) => n.id === note.id ? { ...n, done } : n)); }} title={note.done ? "علامت‌گذاری انجام‌نشده" : "علامت‌گذاری انجام‌شده"}><Check size={16}/></button><button type="button" onClick={() => startEdit(note)} title="ویرایش"><Pencil size={16}/></button><button type="button" onClick={async () => { if (apiReady) { try { const response = await fetch(`${API}/notes/${note.id}`, { method: "DELETE" }); if (!response.ok) throw new Error(); } catch { setApiReady(false); } } setNotes((items) => items.filter((n) => n.id !== note.id)); }} title="حذف"><Trash2 size={16}/></button></div></div>
          <p style={{ whiteSpace: "pre-wrap", textDecoration: note.done ? "line-through" : "none" }}>{note.body}</p><small>{note.done ? "انجام‌شده" : "در انتظار"} · {formatPersianDateTime(note.createdAt || Date.now())}</small>
        </article>)}</div>
      </div>
    </div>}
  </>;
}
