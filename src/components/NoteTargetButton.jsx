import { StickyNote } from "lucide-react";

export default function NoteTargetButton({ lessonKey, item, type, compact = false }) {
  const id = item.id === lessonKey ? lessonKey : `${lessonKey}:${item.id}`;
  return <button type="button" title={`یادداشت برای ${item.title}`} aria-label={`ثبت یادداشت برای ${item.title}`} onClick={(event) => { event.stopPropagation(); window.dispatchEvent(new CustomEvent("metaPersonal:open-note", { detail: { id, title: item.title, type } })); }} style={{ display: "inline-grid", placeItems: "center", width: compact ? 28 : 32, height: compact ? 28 : 32, padding: 0, flexShrink: 0, color: "#a78bfa", background: "transparent", border: "1px solid #64748b55", borderRadius: 8, cursor: "pointer" }}><StickyNote size={16}/></button>;
}
