import React, { useState, useMemo, useEffect, useCallback } from "react";
import LessonRoom from "./components/LessonRoom";
import ClassroomSplitTwoD from "./components/ClassroomSplitTwoD";
import SECTIONS from "./Section";

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

  const [showPassword, setShowPassword] = useState(false);
  const [pendingLesson, setPendingLesson] = useState(null);
  const [pendingMode, setPendingMode] = useState(null);
  const [password, setPassword] = useState("");

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

    if (lesson.key === "complex") {
      setPendingLesson(lesson);
      setPendingMode(mode);
      setShowPassword(true);
      return;
    }

    setActiveLesson(lesson);
    setViewMode(mode);

  }, []);

  const checkPassword = () => {

    if (password === "163264") {
      setShowPassword(false);
      setPassword("");
      setActiveLesson(pendingLesson);
      setViewMode(pendingMode);
    } else {
      alert("رمز اشتباه است");
    }

  };

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

      {showPassword && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0,0,0,0.92)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999
        }}>
          
          <div style={{
            width: "420px",
            background: "#000",
            border: "1px solid #555",
            borderRadius: "10px",
            padding: "25px",
            color: "#e5e7eb",
            fontFamily: "monospace",
            position: "relative"
          }}>

            {/* دکمه بستن */}
            <button
              onClick={() => {
                setShowPassword(false);
                setPassword("");
              }}
              style={{
                position: "absolute",
                top: "8px",
                left: "10px",
                background: "transparent",
                border: "none",
                color: "#aaa",
                fontSize: "18px",
                cursor: "pointer"
              }}
            >
              ✕
            </button>

            <div style={{ marginBottom: "12px", fontSize: "14px" }}>
              ACCESS
            </div>

            <div style={{ marginBottom: "10px", fontSize: "13px", color:"#aaa" }}>
              Enter password:
            </div>

            <input
              type="password"
              value={password}
              autoFocus
              onChange={(e)=>setPassword(e.target.value)}
              onKeyDown={(e)=> e.key === "Enter" && checkPassword()}
              style={{
                width: "100%",
                background: "#000",
                border: "1px solid #555",
                color: "#fff",
                padding: "8px",
                fontFamily: "monospace",
                outline: "none",
                borderRadius:"6px"
              }}
            />

            {/* دکمه ها */}
            <div style={{
              display:"flex",
              justifyContent:"space-between",
              marginTop:"16px"
            }}>

              <button
                onClick={checkPassword}
                style={{
                  background:"#1f2937",
                  border:"1px solid #555",
                  color:"#fff",
                  padding:"6px 14px",
                  borderRadius:"6px",
                  cursor:"pointer"
                }}
              >
                Enter
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
