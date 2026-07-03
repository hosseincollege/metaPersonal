import React, { useState, useMemo, useEffect, useCallback } from "react";
import LessonRoom from "./components/LessonRoom";
import ClassroomSplitTwoD from "./components/ClassroomSplitTwoD";
import SECTIONS from "./Section";


const IS_PASSWORD_PROTECTED = false; //true,false

const normalizeLesson = (raw, key, title, color) => ({
  key,
  title,
  color,
  chapters: (raw || []).map((c, i) => ({
    id: `ch_${i}`,
    title: c.section || "بدون عنوان",
    topics: (c.topics || []).map((t, j) => ({
      id: `t_${i}_${j}`,
      title: t.title,
      content: t.content,
      subtopics: t.subtopics || [],
    })),
  })),
});

const Card = React.memo(({ title, color, onClick, onThreeDClick, isDark }) => {
  const [hovered, setHovered] = useState(false);
  const initials = title ? title.split(".")[0] : "??";

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "150px",
        height: "170px",
        borderRadius: "16px",
        border: `2px solid ${hovered ? color : isDark ? "#4a4d55" : "#d5d6d7"}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        transition: "border-color 0.22s, background 0.22s",
        background: isDark
          ? hovered ? `linear-gradient(180deg, ${color}15 0%, #050505 100%)` : "#000000"
          : hovered ? `linear-gradient(180deg, ${color}0d 0%, #ffffff 100%)` : "#ffffff",
      }}
    >
      <div style={{
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "700",
        fontSize: "0.95rem",
        backgroundColor: color || "#38bdf8",
        color: "#fff"
      }}>
        {initials}
      </div>
      <h3 style={{
        marginTop: "14px",
        fontSize: "0.95rem",
        fontWeight: "700",
        textAlign: "center",
        padding: "0 8px",
        lineHeight: "1.4",
        color: isDark ? "#f1f5f9" : "#0f172a"
      }}>
        {title}
      </h3>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onThreeDClick();
        }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          padding: "4px 10px",
          borderRadius: "0 0 0 12px",
          background: hovered ? color : isDark ? "#121824" : "#e2e8f0",
          border: "none",
          color: hovered ? "#fff" : isDark ? "#94a3b8" : "#475569",
          cursor: "pointer",
          fontSize: "0.75rem",
          fontWeight: "bold",
          transition: "all 0.2s"
        }}
      >
        3D
      </button>
    </div>
  );
});

Card.displayName = "Card";

export default function App() {
  const [activeLesson, setActiveLesson] = useState(null);
  const [viewMode, setViewMode] = useState(null);
  const [themeMode, setThemeMode] = useState("system");
  const [systemIsDark, setSystemIsDark] = useState(false);

  const [hiddenPassword, setHiddenPassword] = useState("");
  const hiddenInputRef = React.useRef(null);
  const pendingLessonRef = React.useRef(null);
  const pendingModeRef = React.useRef(null);
  const [passError, setPassError] = useState(false);


  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemIsDark(mq.matches);
    const handler = (e) => setSystemIsDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const isDark = useMemo(() => {
    return themeMode === "system" ? systemIsDark : themeMode === "dark";
  }, [themeMode, systemIsDark]);

  const normalizedLessons = useMemo(() => {
    return SECTIONS.map((l) => normalizeLesson(l.raw, l.key, l.title, l.color));
  }, []);

  const handleBack = useCallback(() => {
    setActiveLesson(null);
    setViewMode(null);
  }, []);

  const handleSelectLesson = useCallback((lesson, mode) => {
    if (IS_PASSWORD_PROTECTED && lesson.key === "complex") {
      pendingLessonRef.current = lesson;
      pendingModeRef.current = mode;

      if (hiddenInputRef.current) {
        hiddenInputRef.current.focus();
      }
      return;
    }

    setActiveLesson(lesson);
    setViewMode(mode);

  }, []);

  // افکت برای گوش دادن به دکمه‌های کیبورد (1 تا 5)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // اگر کاربر در حال تایپ رمز باشد (فوکوس روی اینپوت مخفی یا هر فیلد دیگری باشد) کاری انجام ندهد
      if (
        document.activeElement &&
        (document.activeElement.tagName === "INPUT" ||
          document.activeElement.tagName === "TEXTAREA")
      ) {
        return;
      }

      // فقط زمانی که درس فعالی باز نشده باشد، کلیدهای میانبر کار کنند
      if (activeLesson !== null) return;

      const key = e.key;
      // اگر دکمه‌های بین 1 تا 5 فشرده شدند
      if (key >= "1" && key <= "5") {
        const index = parseInt(key, 10) - 1;
        const targetLesson = normalizedLessons[index];
        if (targetLesson) {
          // درس مورد نظر را در حالت 2D باز می‌کند
          handleSelectLesson(targetLesson, "2D");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeLesson, normalizedLessons, handleSelectLesson]);

  if (activeLesson && viewMode === "3D") {
    return (
      <LessonRoom
        lesson={activeLesson}
        onBack={handleBack}
        on2D={() => setViewMode("2D")}
        theme={isDark ? "dark" : "light"}
      />
    );
  }

  if (activeLesson && viewMode === "2D") {
    return (
      <ClassroomSplitTwoD
        lesson={activeLesson}
        onBack={handleBack}
        onSwitchTo3D={() => setViewMode("3D")}
        theme={isDark ? "dark" : "light"}
      />
    );
  }

  return (
    <div style={{
      width: "100vw",
      minHeight: "100vh",
      direction: "rtl",
      fontFamily: "'Vazirmatn', sans-serif",
      color: isDark ? "#fff" : "#0f172a",
      background: isDark
        ? "linear-gradient(185deg, #000000 0%, #0c0e12 60%, #000000 100%)"
        : "linear-gradient(185deg, #f8fafc 0%, #f1f5f9 60%, #e2e8f0 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px 20px 40px",
      boxSizing: "border-box"
    }}>
      <button
        onClick={() => setThemeMode((p) => p === "system" ? "dark" : p === "dark" ? "light" : "system")}
        style={{
          marginBottom: "15px",
          background: isDark ? "#121824" : "#e2e8f0",
          border: `1px solid ${isDark ? "#1e293b" : "#cbd5e1"}`,
          borderRadius: "8px",
          padding: "6px 12px",
          cursor: "pointer",
          fontSize: "0.8rem",
          color: isDark ? "#fff" : "#0f172a"
        }}
      >
        پوسته: {themeMode === "system" ? "سیستم" : themeMode === "dark" ? "تاریک" : "روشن"}
      </button>

      <h1 style={{
        fontSize: "2.2rem",
        marginBottom: "6px",
        background: "linear-gradient(to right, #38bdf8, #a78bfa)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent"
      }}>
        متاورس
      </h1>
      <p style={{ fontSize: "1rem", marginBottom: "25px", color: isDark ? "#64748b" : "#94a3b8" }}>
        ver:1405.03.05
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: "22px",
        width: "90%",
        justifyItems: "center"
      }}>
        {normalizedLessons.map((lesson) => (
          <Card
            key={lesson.key}
            title={lesson.title}
            color={lesson.color}
            isDark={isDark}
            onClick={() => handleSelectLesson(lesson, "2D")}
            onThreeDClick={() => handleSelectLesson(lesson, "3D")}
          />
        ))}
      </div>

      {/* المنت‌های مربوط به فیلد مخفی پسورد فقط در صورت فعال بودن نمایش داده می‌شوند */}
      {IS_PASSWORD_PROTECTED && (
        <>
          <input
            ref={hiddenInputRef}
            type="password"
            value={hiddenPassword}
            onChange={(e)=>setHiddenPassword(e.target.value)}
            onKeyDown={(e)=>{
              if(e.key === "Enter"){
                if(hiddenPassword === "0"){
                  setPassError(false);
                  setActiveLesson(pendingLessonRef.current);
                  setViewMode(pendingModeRef.current);
                } else {
                  setPassError(true);
                  setTimeout(() => {
                    setPassError(false);
                  }, 1200);
                }
                setHiddenPassword("");
              }
            }}
            style={{
              position:"fixed",
              opacity:0
            }}
          />

          {hiddenPassword.length > 0 && (
            <div style={{
              position: "fixed",
              bottom: "12px",
              left: "50%",
              transform: "translateX(-50%)",
              color: "#666",
              fontSize: "14px",
              fontFamily: "monospace",
              letterSpacing: "4px",
              userSelect: "none",
              pointerEvents: "none"
            }}>
              {"•".repeat(hiddenPassword.length)}
            </div>
          )}

          {passError && (
            <div style={{
              position:"fixed",
              bottom:"40px",
              left:"50%",
              transform:"translateX(-50%)",
              color:"#ff4444",
              fontSize:"12px",
              fontFamily:"monospace",
              opacity:0.8
            }}>
              access denied
            </div>
          )}
        </>
      )}

    </div>
  );
}
