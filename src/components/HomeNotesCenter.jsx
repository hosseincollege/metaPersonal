import { useEffect, useMemo, useState } from "react";
import { Check, NotebookPen, Trash2, X } from "lucide-react";

const STORAGE_KEY = "metaPersonal.notes.v1";
const API = "/api";
const tabs = [
  ["all", "همه"],
  ["pending", "انجام‌نشده"],
  ["done", "انجام‌شده"],
  ["today", "امروز"],
];

function tehranDay(value) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Tehran", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date(value));
  return ["year", "month", "day"].map((type) => parts.find((part) => part.type === type)?.value).join("-");
}

function formatPersianDateTime(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", { timeZone: "Asia/Tehran", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(new Date(value));
}

function loadStored() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
  catch { return []; }
}

export default function HomeNotesCenter({ isDark }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("all");
  const [notes, setNotes] = useState(loadStored);
  const surface = isDark ? "#171a20" : "#fff";
  const foreground = isDark ? "#f1f5f9" : "#172033";

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(notes)); }, [notes]);
  useEffect(() => {
    if (!open) return undefined;
    let alive = true;
    fetch(`${API}/notes`).then((response) => {
      if (!response.ok) throw new Error("API unavailable");
      return response.json();
    }).then((serverNotes) => {
      if (alive) setNotes((current) => {
        const serverIds = new Set(serverNotes.map((note) => note.id));
        return [...serverNotes, ...current.filter((note) => !serverIds.has(note.id))];
      });
    }).catch(() => {});
    return () => { alive = false; };
  }, [open]);

  const visible = useMemo(() => notes.filter((note) => {
    if (tab === "pending") return !note.done;
    if (tab === "done") return note.done;
    if (tab === "today") return note.createdAt && tehranDay(note.createdAt) === tehranDay(Date.now());
    return true;
  }).sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)), [notes, tab]);

  return <>
    <button type="button" onClick={() => setOpen(true)} title="یادداشت‌ها" aria-label="نمایش همهٔ یادداشت‌ها" style={{ display: "grid", placeItems: "center", width: 32, height: 32, padding: 0, borderRadius: 8, border: 0, cursor: "pointer", background: isDark ? "#27272a" : "#fff", color: isDark ? "#c4b5fd" : "#7c3aed", boxShadow: "0 1px 3px #0002" }}><NotebookPen size={18}/></button>
    {open && <div role="dialog" aria-modal="true" aria-label="همهٔ یادداشت‌ها" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }} style={{ position: "fixed", inset: 0, zIndex: 100, background: "#0009", display: "grid", placeItems: "center", padding: 16 }}>
      <section style={{ width: "min(720px, 100%)", maxHeight: "85vh", overflow: "auto", background: surface, color: foreground, borderRadius: 18, padding: 20, direction: "rtl", boxShadow: "0 20px 70px #0008" }}>
        <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}><div><h2>یادداشت‌ها</h2><small>{notes.length} یادداشت</small></div><button type="button" onClick={() => setOpen(false)} aria-label="بستن"><X size={18}/></button></header>
        <nav role="tablist" aria-label="دسته‌بندی یادداشت‌ها" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>{tabs.map(([key, label]) => <button role="tab" aria-selected={tab === key} key={key} onClick={() => setTab(key)} style={{ background: tab === key ? "#7c3aed" : isDark ? "#27272a" : "#f1f5f9", color: tab === key ? "white" : foreground }}>{label} ({key === "all" ? notes.length : key === "pending" ? notes.filter((n) => !n.done).length : key === "done" ? notes.filter((n) => n.done).length : notes.filter((n) => n.createdAt && tehranDay(n.createdAt) === tehranDay(Date.now())).length})</button>)}</nav>
        {visible.length === 0 ? <p style={{ opacity: .7, padding: 24, textAlign: "center" }}>یادداشتی در این دسته نیست.</p> : <div style={{ display: "grid", gap: 10 }}>{visible.map((note) => <article key={note.id} style={{ border: "1px solid #64748b55", borderRadius: 12, padding: 12, opacity: note.done ? .65 : 1 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 12 }}><div><strong>{note.targetTitle || note.target}</strong><div style={{ fontSize: 12, opacity: .7 }}>{note.lessonTitle || note.lessonKey}{note.targetType ? ` · ${note.targetType}` : ""} · {formatPersianDateTime(note.createdAt)}</div></div><div style={{ display: "flex", gap: 5 }}><button type="button" title={note.done ? "انجام‌نشده" : "انجام‌شده"} onClick={async () => { const done = !note.done; try { await fetch(`${API}/notes/${note.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ done }) }); } catch {} setNotes((all) => all.map((n) => n.id === note.id ? { ...n, done } : n)); }}><Check size={16}/></button><button type="button" title="حذف" onClick={async () => { try { await fetch(`${API}/notes/${note.id}`, { method: "DELETE" }); } catch {} setNotes((all) => all.filter((n) => n.id !== note.id)); }}><Trash2 size={16}/></button></div></div><p style={{ marginTop: 8, whiteSpace: "pre-wrap", textDecoration: note.done ? "line-through" : "none" }}>{note.body}</p></article>)}</div>}
      </section>
    </div>}
  </>;
}
