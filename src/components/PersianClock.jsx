import { useEffect, useState } from "react";
import { CalendarDays, Clock } from "lucide-react";

const dateOptions = {
  timeZone: "Asia/Tehran",
  calendar: "persian",
  numberingSystem: "arabext",
};

export default function PersianClock({ isDark = true, compact = false, top = "50%", centerVertically = true, className }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 15_000);
    return () => window.clearInterval(timer);
  }, []);

  const numericDate = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    ...dateOptions,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
  const spokenDate = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    ...dateOptions,
    weekday: "long",
  }).format(now);
  const time = new Intl.DateTimeFormat("fa-IR", {
    timeZone: "Asia/Tehran",
    numberingSystem: "arabext",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(now);
  const foreground = isDark ? "#c2c8cf" : "#334155";
  const muted = isDark ? "#9aa3ad" : "#64748b";
  const divider = isDark ? "#41464d" : "#cbd5e1";
  const chip = isDark ? "#191b1d" : "#f1f5f9";

  return (
    <div
      className={className}
      role="group"
      aria-label={`${spokenDate}، تاریخ ${numericDate}، ساعت ${time} به وقت تهران`}
      style={{
        position: "absolute",
        left: compact ? 10 : 24,
        top,
        transform: centerVertically ? "translateY(-50%)" : "none",
        zIndex: 11,
        display: "inline-flex",
        flexDirection: "row",
        alignItems: "center",
        gap: compact ? 7 : 10,
        whiteSpace: "nowrap",
        lineHeight: 1,
        color: foreground,
        fontFamily: "'Vazirmatn', sans-serif",
        fontSize: compact ? "0.78rem" : "0.92rem",
        fontWeight: 600,
        userSelect: "none",
        pointerEvents: "none",
        direction: "rtl",
      }}
    >
      <time dateTime={now.toISOString()} style={{ display: "inline-flex", alignItems: "center", padding: "7px 9px", borderRadius: 8, background: chip, color: foreground, fontVariantNumeric: "tabular-nums", fontWeight: 700, letterSpacing: "0.02em" }}>
        {time}
        <Clock size={compact ? 13 : 14} aria-hidden="true" style={{ marginInlineStart: 5, color: muted }} />
      </time>
      <span aria-hidden="true" style={{ width: 1, height: 18, background: divider }} />
      <span style={{ color: muted, fontWeight: 500 }}>{spokenDate}</span>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: muted }}>
        <span>{numericDate}</span>
        <CalendarDays size={compact ? 14 : 16} aria-hidden="true" />
      </span>
    </div>
  );
}
