import React, { useState, useMemo, useCallback } from "react";
import LessonRoom from "./components/LessonRoom";
import ClassroomSplitTwoD from "./components/ClassroomSplitTwoD";
import PROJECTS from "./projects";

// ===============================
// ✅ Normalize Lesson
// ===============================
function normalizeLesson(raw, key, title, color) {
  return {
    key,
    title,
    color,
    chapters: raw.map((c, i) => ({
      id: "ch" + i,
      title: c.section || "بدون عنوان",
      topics: (c.topics || []).map((t, j) => ({
        id: `t_${i}_${j}`,
        title: t.title,
        content: t.content,
        subtopics: t.subtopics || [],
      })),
    })),
  };
}

// ===============================
// ✅ Dark & Light Styles
// ===============================
function getDarkStyles() {
  return {
    container: {
      width: "100vw",
      height: "100vh",
      backgroundColor: "#0f172a",
      color: "#fff",
      fontFamily: "'Vazirmatn', sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: 20,
      overflow: "auto",
      direction: "rtl",
    },
    header: {
      fontSize: "2.2rem",
      marginBottom: 6,
      background: "linear-gradient(to right, #38bdf8, #a78bfa)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    subHeader: {
      fontSize: "1rem",
      marginBottom: "12px",
      color: "#b6c0d1",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
      gap: "22px",
      width: "90%",
      justifyItems: "center",
    },
    card: {
      width: "150px",
      height: "170px",
      background: "rgba(30, 41, 59, 0.95)",
      borderRadius: "16px",
      border: "2px solid #334155",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      position: "relative",
      transition: "0.25s",
    },
    icon: {
      width: "48px",
      height: "48px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
    },
    twoDButton: {
      position: "absolute",
      bottom: 0,
      left: 0,
      padding: "4px 10px",
      borderRadius: "0 0 0 12px",
      background: "#1e293b",
      border: "none",
      color: "#fff",
      cursor: "pointer",
      fontSize: "0.8rem",
    },
    backButton: {
      marginBottom: "12px",
      padding: "6px 12px",
      borderRadius: "8px",
      border: "1px solid #475569",
      background: "#1e293b",
      color: "#fff",
      cursor: "pointer",
    },
    themeButton: {
      marginBottom: "10px",
      background: "#1e293b",
      border: "1px solid #475569",
      borderRadius: "8px",
      padding: "4px 12px",
      cursor: "pointer",
      fontSize: "0.8rem",
      color: "#fff",
    },
  };
}

function getLightStyles() {
  const dark = getDarkStyles();
  return {
    ...dark,
    container: {
      ...dark.container,
      backgroundColor: "#f8fafc",
      color: "#0f172a",
    },
    subHeader: {
      ...dark.subHeader,
      color: "#475569",
    },
    card: {
      ...dark.card,
      background: "#ffffff",
      border: "2px solid #e2e8f0",
    },
    twoDButton: {
      ...dark.twoDButton,
      background: "#e2e8f0",
      color: "#0f172a",
    },
    backButton: {
      ...dark.backButton,
      background: "#e2e8f0",
      color: "#0f172a",
      border: "1px solid #cbd5e1",
    },
    themeButton: {
      ...dark.themeButton,
      background: "#e2e8f0",
      color: "#0f172a",
    },
  };
}

// ===============================
// ✅ Card Component
// ===============================
const Card = ({ title, color, onClick, children, styles }) => (
  <div style={{ ...styles.card, borderColor: color }} onClick={onClick}>
    <div style={{ ...styles.icon, backgroundColor: color }}>
      {title.slice(0, 2)}
    </div>
    <h3 style={{ marginTop: 12 }}>{title}</h3>
    {children}
  </div>
);

// ===============================
// ✅ App Component
// ===============================
export default function App() {
  const [activeProject, setActiveProject] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [viewMode, setViewMode] = useState(null);
  const [themeMode, setThemeMode] = useState("system");

  // تعیین تم واقعی با توجه به تنظیم سیستم
  const systemIsDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const effectiveTheme =
    themeMode === "system" ? (systemIsDark ? "dark" : "light") : themeMode;

  const styles = useMemo(
    () => (effectiveTheme === "dark" ? getDarkStyles() : getLightStyles()),
    [effectiveTheme]
  );

  // بازگشت بین مرحله انتخاب درس یا پروژه
  const handleBack = useCallback(() => {
    if (activeLesson) {
      setActiveLesson(null);
      setViewMode(null);
    } else {
      setActiveProject(null);
    }
  }, [activeLesson]);

  // نمایش صفحات 3D / 2D
  if (activeLesson && viewMode === "3D") {
    return (
      <LessonRoom
        lesson={activeLesson}
        onBack={handleBack}
        on2D={() => setViewMode("2D")}
        theme={effectiveTheme}
      />
    );
  }

  if (activeLesson && viewMode === "2D") {
    return (
      <ClassroomSplitTwoD
        lesson={activeLesson}
        onBack={handleBack}
        onSwitchTo3D={() => setViewMode("3D")}
        theme={effectiveTheme}
      />
    );
  }

  // صفحه انتخاب درس‌ها
  if (activeProject) {
    return (
      <div style={styles.container}>
        <button style={styles.themeButton}
          onClick={() =>
            setThemeMode((p) =>
              p === "system" ? "dark" : p === "dark" ? "light" : "system"
            )
          }>
           Theme: {themeMode}
        </button>

        <button style={styles.backButton} onClick={handleBack}>
          ← بازگشت به پروژه‌ها
        </button>

        <h1 style={styles.header}>{activeProject.title}</h1>

        <div style={styles.grid}>
          {activeProject.lessons.map((l) => {
            const lesson = normalizeLesson(l.raw, l.key, l.title, l.color);
            return (
              <Card
                key={lesson.key}
                title={lesson.title}
                color={lesson.color}
                styles={styles}
                onClick={() => {
                  setActiveLesson(lesson);
                  setViewMode("3D");
                }}
              >
                <button
                  style={styles.twoDButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveLesson(lesson);
                    setViewMode("2D");
                  }}
                >
                  2D
                </button>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  // صفحه انتخاب پروژه‌ها
  return (
    <div style={styles.container}>
      <button style={styles.themeButton}
        onClick={() =>
          setThemeMode((p) =>
            p === "system" ? "dark" : p === "dark" ? "light" : "system"
          )
        }>
         Theme: {themeMode}
      </button>

      <h1 style={styles.header}>انتخاب پروژه</h1>
      <p style={styles.subHeader}>ابتدا پروژه را انتخاب کنید</p>

      <div style={styles.grid}>
        {Object.values(PROJECTS).map((p) => (
          <Card
            key={p.key}
            title={p.title}
            color={p.color}
            styles={styles}
            onClick={() => setActiveProject(p)}
          />
        ))}
      </div>
    </div>
  );
}
