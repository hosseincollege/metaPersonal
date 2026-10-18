import React from "react";

const OPTIONS = [
  { id: "low", label: "کم", value: 85 },
  { id: "normal", label: "متوسط", value: 100 },
  { id: "high", label: "زیاد", value: 120 },
];

export const contrastValue = (level) =>
  OPTIONS.find((option) => option.id === level)?.value ?? 100;

export default function ContrastControl({ isDark, levels, onChange }) {
  const theme = isDark ? "dark" : "light";
  const currentLevel = levels?.[theme] ?? "normal";
  const currentIndex = OPTIONS.findIndex((option) => option.id === currentLevel);
  const nextOption = OPTIONS[(currentIndex + 1 + OPTIONS.length) % OPTIONS.length];
  const currentLabel = OPTIONS.find((option) => option.id === currentLevel)?.label ?? "متوسط";
  const bars = [
    { x: 3, y: 13, height: 7 },
    { x: 9, y: 8, height: 12 },
    { x: 15, y: 3, height: 17 },
  ];

  return (
    <button
      type="button"
      onClick={() => onChange?.(theme, nextOption.id)}
      title={`کنتراست ${theme === "dark" ? "تاریک" : "روشن"}: ${currentLabel}؛ برای تغییر کلیک کنید`}
      aria-label={`کنتراست ${theme === "dark" ? "تاریک" : "روشن"}: ${currentLabel}. تغییر به ${nextOption.label}`}
      style={{ width: 32, height: 32, padding: 0, border: "none", borderRadius: 8, cursor: "pointer", background: isDark ? "#27272a" : "#fff", color: isDark ? "#f8fafc" : "#334155", display: "flex", justifyContent: "center", alignItems: "center", boxShadow: "0 1px 3px rgba(0,0,0,.1)" }}
    >
      <svg style={{ display: "block", flex: "0 0 20px" }} width="20" height="20" viewBox="0 0 23 23" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {bars.map((bar, index) => (
          <rect
            key={bar.x}
            x={bar.x}
            y={bar.y}
            width="4"
            height={bar.height}
            rx="1"
            fill={index <= currentIndex ? "currentColor" : "none"}
            opacity={index <= currentIndex ? 1 : 0.45}
            style={{ transition: "fill 150ms ease, opacity 150ms ease" }}
          />
        ))}
      </svg>
    </button>
  );
}
