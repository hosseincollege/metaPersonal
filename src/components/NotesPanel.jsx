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
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(notes)); }, [notes]);
  useEffect(() => {
    const openForTarget = (event) => {
      setTargetId(event.detail.id);
      setTargetTitle(event.detail.title);
      setTargetType(event.detail.type);
      setEditing(null);
      setBody("");
      setDueDate("");
      setMessage("");
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
      if (alive) {
        setApiReady(true);
        setMessage("");
        const serverIds = new Set(items.map((note) => note.id));
        setNotes((current) => [...items, ...current.filter((note) => note.lessonKey !== lesson?.key || !serverIds.has(note.id))]);
      }
    }).catch(() => { if (alive) { setApiReady(false); setMessage("اتصال به سرور برقرار نشد؛ یادداشت‌ها فقط در همین مرورگر ذخیره می‌شوند."); } });
    return () => { alive = false; };
  }, [lesson?.key]);

  const save = async (event) => {
    event.preventDefault();
    if (!targetId || !body.trim()) return;
    const old = notes.find((item) => item.id === editing);
    let saved = { id: crypto.randomUUID(), lessonKey: lesson?.key, lessonTitle: lesson?.title, targetId, targetTitle, target: targetTitle, targetType, body: body.trim(), dueDate: dueDate || null, done: false, createdAt: openedAt };
    let persistedRemotely = false;
    if (apiReady) {
      try {
        const response = await fetch(editing ? `${API}/notes/${editing}` : `${API}/notes`, { method: editing ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing ? { body: body.trim(), dueDate: dueDate || null } : { lessonKey: lesson?.key, lessonTitle: lesson?.title, targetId, targetTitle, targetType, body: body.trim(), dueDate: dueDate || null }) });
        if (!response.ok) throw new Error("API save failed");
        if (!editing) saved = { ...(await response.json()), target: targetTitle };
        persistedRemotely = true;
      } catch { setApiReady(false); setMessage("ذخیره در سرور انجام نشد؛ نسخهٔ این یادداشت در مرورگر نگه داشته شد."); }
    }
    if (persistedRemotely) setMessage("یادداشت در سرور ذخیره شد.");
    if (editing) setNotes((items) => items.map((item) => item.id === editing ? { ...item, ...old, body: body.trim(), dueDate: dueDate || null, updatedAt: new Date().toISOString() } : item));
    else setNotes((items) => [saved, ...items]);
    setBody(""); setDueDate(""); setEditing(null);
  };

  const startEdit = (note) => { setEditing(note.id); setTargetId(note.targetId || lesson?.key || ""); setTargetTitle(note.targetTitle || note.target || ""); setTargetType(note.targetType || "درس"); setOpenedAt(note.createdAt || new Date().toISOString()); setBody(note.body); setDueDate(note.dueDate || ""); setMessage(""); };
  const visibleNotes = notes.filter((note) => {
    if (note.lessonKey !== lesson?.key) return false;
    if (filter === "pending" && note.done) return false;
    if (filter === "done" && !note.done) return false;
    const query = search.trim().toLocaleLowerCase();
    return !query || `${note.targetTitle || note.target || ""} ${note.body || ""}`.toLocaleLowerCase().includes(query);
  }).sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  const surface = isDark ? "#171a20" : "#fff";
  const foreground = isDark ? "#f1f5f9" : "#172033";

  return <>
    {showLauncher && <button type="button" onClick={() => setOpen(true)} aria-label="یادداشت‌ها" title="یادداشت‌ها" style={{ position: "fixed", bottom: 20, left: 20, zIndex: 40, border: 0, borderRadius: 999, padding: "11px 16px", background: lesson?.color || "#38bdf8", color: "white", fontWeight: 800, boxShadow: "0 5px 20px #0004" }}>یادداشت‌ها ({notes.filter((n) => n.lessonKey === lesson?.key).length})</button>}
    {open && <div role="dialog" aria-modal="true" aria-label="مدیریت یادداشت‌ها" onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(false); }} style={{ position: "fixed", inset: 0, zIndex: 100, background: "#0009", display: "grid", placeItems: "center", padding: 16 }}>
      <div style={{ width: "min(600px, 100%)", maxHeight: "85vh", overflow: "auto", background: surface, color: foreground, borderRadius: 18, padding: 20, direction: "rtl", boxShadow: "0 20px 70px #0008" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}><div><h2>یادداشت‌های {lesson?.title}</h2><small>{apiReady ? "همگام با سرور" : "ذخیره در همین مرورگر"} · {visibleNotes.length} مورد</small></div><button type="button" onClick={() => setOpen(false)} aria-label="بستن"><X size={18}/></button></header>
        {message && <p role="status" style={{ padding: 10, borderRadius: 8, background: isDark ? "#27272a" : "#f1f5f9", color: foreground }}>{message}</p>}
        <form onSubmit={save} style={{ display: "grid", gap: 10, marginBottom: 20 }}>
          <div style={{ padding: 10, borderRadius: 8, border: "1px solid #64748b55" }}>{targetType} · {targetTitle}</div>
          <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="متن یادداشت" rows={3} required style={{ padding: 10, borderRadius: 8, border: "1px solid #64748b", background: surface, color: foreground, font: "inherit" }} />
          <label style={{ display: "grid", gap: 5 }}>یادآوری (اختیاری)<input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} style={{ padding: 9, borderRadius: 8, border: "1px solid #64748b", background: surface, color: foreground, font: "inherit" }} /></label>
          <div style={{ fontSize: 13, opacity: .75 }}>زمان ثبت: {formatPersianDateTime(openedAt)}</div>
          <div style={{ display: "flex", gap: 8 }}><button type="submit" style={{ justifySelf: "start" }}><Plus size={16}/>{editing ? "ذخیرهٔ ویرایش" : "افزودن یادداشت"}</button>{editing && <button type="button" onClick={() => { setEditing(null); setBody(""); setDueDate(""); }}>انصراف</button>}</div>
        </form>
        <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="جست‌وجو در یادداشت‌ها" aria-label="جست‌وجو در یادداشت‌ها" style={{ flex: "1 1 180px", minWidth: 0, padding: 9, borderRadius: 8, border: "1px solid #64748b55", background: surface, color: foreground, font: "inherit" }} />{[["all", "همه"], ["pending", "باز"], ["done", "انجام‌شده"]].map(([key, label]) => <button type="button" key={key} onClick={() => setFilter(key)} aria-pressed={filter === key} style={{ borderRadius: 8, border: "1px solid #64748b55", background: filter === key ? "#7c3aed" : surface, color: filter === key ? "white" : foreground, padding: "6px 10px" }}>{label}</button>)}</div>
        <div style={{ display: "grid", gap: 10 }}>{visibleNotes.length === 0 ? <p style={{ textAlign: "center", opacity: .7, padding: 16 }}>یادداشتی مطابق این فیلتر پیدا نشد.</p> : visibleNotes.map((note) => <article key={note.id} style={{ border: "1px solid #64748b55", borderRadius: 12, padding: 12, opacity: note.done ? .72 : 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}><strong>{note.targetTitle || note.target}</strong><div style={{ display: "flex", gap: 4 }}><button type="button" onClick={async () => { const done = !note.done; if (apiReady) { try { const response = await fetch(`${API}/notes/${note.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ done }) }); if (!response.ok) throw new Error(); } catch { setApiReady(false); setMessage("تغییر وضعیت در سرور ثبت نشد؛ تغییر در مرورگر نگه داشته شد."); } } setNotes((items) => items.map((n) => n.id === note.id ? { ...n, done } : n)); }} title={note.done ? "علامت‌گذاری انجام‌نشده" : "علامت‌گذاری انجام‌شده"}><Check size={16}/></button><button type="button" onClick={() => startEdit(note)} title="ویرایش"><Pencil size={16}/></button><button type="button" onClick={async () => { if (apiReady) { try { const response = await fetch(`${API}/notes/${note.id}`, { method: "DELETE" }); if (!response.ok) throw new Error(); } catch { setApiReady(false); setMessage("حذف در سرور ثبت نشد؛ یادداشت از نمایش محلی برداشته شد."); } } setNotes((items) => items.filter((n) => n.id !== note.id)); }} title="حذف"><Trash2 size={16}/></button></div></div>
          <p style={{ whiteSpace: "pre-wrap", textDecoration: note.done ? "line-through" : "none" }}>{note.body}</p><small>{note.done ? "انجام‌شده" : "در انتظار"} · ثبت: {formatPersianDateTime(note.createdAt || Date.now())}{note.dueDate ? ` · یادآوری: ${new Intl.DateTimeFormat("fa-IR-u-ca-persian", { timeZone: "Asia/Tehran", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(`${note.dueDate}T12:00:00`))}` : ""}</small>
        </article>)}</div>
      </div>
    </div>}
  </>;
}
