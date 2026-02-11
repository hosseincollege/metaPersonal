import React, { useState, useCallback, useMemo } from "react";
import LessonRoom from "./components/LessonRoom";
import ClassroomSplitTwoD from "./components/ClassroomSplitTwoD";

/* ====== Import Life Principles Lessons ====== */
import history from "./lessons/history";
import selfKnowledge from "./lessons/selfKnowledge";
import taqwa from "./lessons/taqwa";
import tawhid from "./lessons/tawhid";
import education from "./lessons/education";
import career from "./lessons/career";
import family from "./lessons/family";
import three from "./lessons/three";
import now from "./lessons/now";

// ===============================
// ✅ Normalize Lesson
// ===============================
function normalizeLesson(raw, key, title) {
  if (Array.isArray(raw)) {
    return {
      key,
      title,
      color:
        key === "history" ? "#5f6caf" :
        key === "selfKnowledge" ? "#ff6b6b" :
        key === "taqwa" ? "#1dd1a1" :
        key === "tawhid" ? "#48dbfb" :
        key === "education" ? "#feca57" :
        key === "career" ? "#f368e0" :
        key === "family" ? "#ff9f43" :
        key === "three" ? "#54a0ff" :
        key === "now" ? "#10ac84" :
        "#ffffff",
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
  return raw;
}

// ===============================
// ✅ Final Life Lessons Data
// ===============================
const LESSONS_DATA = {
  history: normalizeLesson(history, "history", "تاریخچه مسیر زندگی"),
  selfKnowledge: normalizeLesson(selfKnowledge, "selfKnowledge", "۱- خودشناسی"),
  taqwa: normalizeLesson(taqwa, "taqwa", "۲- تقوا"),
  tawhid: normalizeLesson(tawhid, "tawhid", "۳- توحید"),
  education: normalizeLesson(education, "education", "۴- تحصیلات"),
  career: normalizeLesson(career, "career", "۵- شغل"),
  family: normalizeLesson(family, "family", "۶- تشکیل خانواده"),
  three: normalizeLesson(three, "three", "درخت اصول"),
  now: normalizeLesson(now, "now", "اکنونِ من"),
};

// ===============================
// ✅ Dark Styles
// ===============================
function getDarkStyles() {
  return {
    container: {
      width: "100vw",
      height: "100vh",
      backgroundColor: "#0f172a",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: "20px",
      color: "white",
      direction: "rtl",
      fontFamily: "sans-serif",
      overflow: "hidden",
    },
    header: {
      fontSize: "2.3rem",
      marginBottom: "6px",
      background: "linear-gradient(to right, #38bdf8, #a78bfa)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    subHeader: {
      fontSize: "1rem",
      marginBottom: "12px",
      color: "#b6c0d1",
    },
    scrollArea: {
      width: "100%",
      height: "calc(100vh - 120px)",
      overflowY: "auto",
      padding: "0 20px 40px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
      gap: "22px",
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
      transition: "0.25s",
      position: "relative",
    },
    icon: {
      width: "48px",
      height: "48px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1rem",
      fontWeight: "bold",
    },
    cardTitle: {
      marginTop: "12px",
      fontSize: "0.9rem",
      textAlign: "center",
      lineHeight: "1.4",
    },
    twoDButton: {
      background: "rgba(30,41,59,0.9)",
      border: "2px solid #475569",
      padding: "4px 12px",
      borderRadius: "0 0 0 14px",
      fontSize: "0.75rem",
      cursor: "pointer",
      position: "absolute",
      bottom: 0,
      left: 0,
      color: "#fff",
    },
    themeButton: {
      marginBottom: "10px",
      background: "#1e293b",
      color: "#fff",
      border: "1px solid #475569",
      borderRadius: "8px",
      padding: "4px 12px",
      cursor: "pointer",
      fontSize: "0.75rem",
    },
  };
}

// ===============================
// ✅ Light Styles
// ===============================
function getLightStyles() {
  return {
    ...getDarkStyles(),
    container: {
      ...getDarkStyles().container,
      backgroundColor: "#f8fafc",
      color: "#0f172a",
    },
    subHeader: {
      ...getDarkStyles().subHeader,
      color: "#475569",
    },
    card: {
      ...getDarkStyles().card,
      background: "#ffffff",
      border: "2px solid #e2e8f0",
    },
    twoDButton: {
      ...getDarkStyles().twoDButton,
      background: "#e2e8f0",
      color: "#0f172a",
    },
    themeButton: {
      ...getDarkStyles().themeButton,
      background: "#e2e8f0",
      color: "#0f172a",
    },
  };
}

// ===============================
// ✅ Lesson Card
// ===============================
const LessonCard = ({ lesson, onSelect3D, onSelect2D, styles }) => (
  <div
    style={{ ...styles.card, borderColor: lesson.color }}
    onClick={() => onSelect3D(lesson)}
  >
    <div style={{ ...styles.icon, backgroundColor: lesson.color }}>
      {lesson.title.slice(0, 2)}
    </div>

    <h3 style={styles.cardTitle}>{lesson.title}</h3>

    <button
      style={styles.twoDButton}
      onClick={(e) => {
        e.stopPropagation();
        onSelect2D(lesson);
      }}
    >
      2D
    </button>
  </div>
);

// ===============================
// ✅ App
// ===============================
export default function App() {
  const [activeLesson, setActiveLesson] = useState(null);
  const [viewMode, setViewMode] = useState(null);
  const [themeMode, setThemeMode] = useState("system");

  const systemIsDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const effectiveTheme =
    themeMode === "system" ? (systemIsDark ? "dark" : "light") : themeMode;

  const styles = useMemo(
    () => (effectiveTheme === "dark" ? getDarkStyles() : getLightStyles()),
    [effectiveTheme]
  );

  const handleBack = useCallback(() => {
    setActiveLesson(null);
    setViewMode(null);
  }, []);

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

  return (
    <div style={styles.container}>
      <button
        style={styles.themeButton}
        onClick={() =>
          setThemeMode((p) =>
            p === "system" ? "dark" : p === "dark" ? "light" : "system"
          )
        }
      >
        Theme: {themeMode}
      </button>

      <h1 style={styles.header}>اصول زندگی من</h1>
      <p style={styles.subHeader}>
        انتخاب درس برای ورود به فضای یادگیری
      </p>

      <div style={styles.scrollArea}>
        <div style={styles.grid}>
          {Object.values(LESSONS_DATA).map((lesson) => (
            <LessonCard
              key={lesson.key}
              lesson={lesson}
              onSelect3D={(l) => {
                setActiveLesson(l);
                setViewMode("3D");
              }}
              onSelect2D={(l) => {
                setActiveLesson(l);
                setViewMode("2D");
              }}
              styles={styles}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
