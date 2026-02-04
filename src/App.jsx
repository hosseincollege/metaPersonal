import React, { useState, useCallback } from "react";
import LessonRoom from "./components/LessonRoom";
import ClassroomSplitTwoD from "./components/ClassroomSplitTwoD";

/* ====== Import Lessons ====== */
import history from "./lessons/history";
import selfKnowledge from "./lessons/selfKnowledge";
import taqwa from "./lessons/taqwa";
import tawhid from "./lessons/tawhid";
import education from "./lessons/education";
import career from "./lessons/career";
import family from "./lessons/family";
import three from "./lessons/three";
import now from "./lessons/now";

/* ====== Normalizer ====== */
function normalizeLesson(raw, title, color) {
  return {
    title,
    color,
    chapters: raw.map((c, i) => ({
      id: "ch_" + i,
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

/* ====== History (Separate) ====== */
const HISTORY = normalizeLesson(
  history,
  "تاریخچه مسیر زندگی",
  "#4ecdc4"
);

/* ====== Principles ====== */
const PRINCIPLES = [
  normalizeLesson(selfKnowledge, "1- خودشناسی", "#ff6b6b"),
  normalizeLesson(taqwa, "2- تقوا", "#1dd1a1"),
  normalizeLesson(tawhid, "3- توحید", "#48dbfb"),
  normalizeLesson(education, "4- تحصیلات", "#5f6caf"),
  normalizeLesson(career, "5- شغل", "#f368e0"),
  normalizeLesson(family, "6- تشکیل خانواده", "#ff9f43"),
  normalizeLesson(three, "درخت اصول", "#9bff43"),
  normalizeLesson(now, "اکنون", "#43ddff"),
];

/* ====== Styles ====== */
function getStyles() {
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
      fontSize: "2.2rem",
      marginBottom: "6px",
      background: "linear-gradient(to right, #4eaaff, #a355ff)",
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
      overflowX: "hidden",
      padding: "0 20px 40px 20px",
      boxSizing: "border-box",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
      gap: "22px",
      justifyItems: "center",
      alignItems: "center",
    },
    card: {
      width: "140px",
      height: "160px",
      background: "rgba(30, 41, 59, 0.9)",
      borderRadius: "14px",
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
      width: "46px",
      height: "46px",
      borderRadius: "50%",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.2rem",
      fontWeight: "bold",
    },
    cardTitle: {
      marginTop: "10px",
      fontSize: "0.95rem",
      textAlign: "center",
    },
    twoDButton: {
      background: "rgba(30, 41, 59, 0.9)",
      color: "rgba(30, 41, 59, 0.9)",
      border: "2px solid #4e5d7e",
      padding: "4px 10px",
      borderRadius: "0 0 0 11px",
      fontSize: "0.75rem",
      cursor: "pointer",
      fontWeight: "bold",
      position: "absolute",
      bottom: "0",
      left: "0",
    },
  };
}

/* ====== Lesson Card ====== */
const LessonCard = ({ lesson, onSelect3D, onSelect2D }) => {
  const styles = getStyles();
  return (
    <div
      style={{ ...styles.card, borderColor: lesson.color }}
      onClick={() => onSelect3D(lesson)}
    >
      <div style={{ ...styles.icon, backgroundColor: lesson.color }}>
        {lesson.title.substring(0, 2)}
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
};

/* ====== App ====== */
export default function App() {
  const [activeLesson, setActiveLesson] = useState(null);
  const [viewMode, setViewMode] = useState(null);

  const handleBack = useCallback(() => {
    setActiveLesson(null);
    setViewMode(null);
  }, []);

  const handleSelect3D = useCallback((lesson) => {
    setActiveLesson(lesson);
    setViewMode("3D");
  }, []);

  const handleSelect2D = useCallback((lesson) => {
    setActiveLesson(lesson);
    setViewMode("2D");
  }, []);

  /* ====== 3D ====== */
  if (activeLesson && viewMode === "3D") {
    return (
      <LessonRoom
        lesson={activeLesson}
        onBack={handleBack}
        on2D={() => handleSelect2D(activeLesson)}
      />
    );
  }

  /* ====== 2D ====== */
  if (activeLesson && viewMode === "2D") {
    return (
      <ClassroomSplitTwoD
        lesson={activeLesson}
        onBack={handleBack}
        onSwitchTo3D={() => handleSelect3D(activeLesson)}
      />
    );
  }

  /* ====== Home ====== */
  return (
    <div style={getStyles().container}>
      <h1 style={getStyles().header}>اصول زندگی من</h1>
      <p style={getStyles().subHeader}>
        روی کارت کلیک کنید (پیش‌فرض 3D) یا دکمه 2D را بزنید
      </p>

      <div style={getStyles().scrollArea}>
        <div style={getStyles().grid}>
          {/* History */}
          <LessonCard
            lesson={HISTORY}
            onSelect3D={handleSelect3D}
            onSelect2D={handleSelect2D}
          />

          {/* Principles */}
          {PRINCIPLES.map((lesson, i) => (
            <LessonCard
              key={i}
              lesson={lesson}
              onSelect3D={handleSelect3D}
              onSelect2D={handleSelect2D}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
