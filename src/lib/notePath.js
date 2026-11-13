export function formatNotePath(parts = []) {
  return parts
    .filter((part) => part?.title)
    .map((part) => `${part.type || "عنوان"}: ${part.title}`)
    .join(" ← ");
}

export function getNotePath(note) {
  if (typeof note.targetPath === "string" && note.targetPath.trim()) return note.targetPath;

  const folder = note.lessonTitle || note.lessonKey || "پوشه";
  const targetTitle = note.targetTitle || note.target;
  const type = note.targetType === "درس" ? "پوشه" : note.targetType;
  if (!targetTitle || type === "پوشه" || targetTitle === folder) return `پوشه: ${folder}`;
  return formatNotePath([
    { type: "پوشه", title: folder },
    { type: type || "عنوان", title: targetTitle },
  ]);
}
