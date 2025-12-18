import React, { useState } from "react";
import LessonRoom from "./components/LessonRoom";

/* ====== Import Lessons ====== */
import history from "./lessons/history";

import selfKnowledge from "./lessons/selfKnowledge";
import taqwa from "./lessons/taqwa";
import tawhid from "./lessons/tawhid";
import education from "./lessons/education";
import career from "./lessons/career";
import family from "./lessons/family";
import three from "./lessons/three";

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

/* ====== Principles (1 → 6) ====== */
const PRINCIPLES = [
  normalizeLesson(selfKnowledge, "1- خودشناسی", "#ff6b6b"),
  normalizeLesson(taqwa, "2- تقوا", "#1dd1a1"),
  normalizeLesson(tawhid, "3- توحید", "#48dbfb"),
  normalizeLesson(education, "4- تحصیلات", "#5f6caf"),
  normalizeLesson(career, "5- شغل", "#f368e0"),
  normalizeLesson(family, "6- تشکیل خانواده", "#ff9f43"),
  normalizeLesson(three, "درخت اصول", "#9bff43"),
];

export default function App() {
  const [activeLesson, setActiveLesson] = useState(null);

  if (activeLesson) {
    return (
      <LessonRoom
        lesson={activeLesson}
        onBack={() => setActiveLesson(null)}
      />
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>متاورس زندگی من</h1>
      <p style={styles.subHeader}>از آنچه بوده‌ام تا آنچه باید باشم</p>

      {/* ====== History Section ====== */}
      <div style={styles.historyWrapper}>
        <div
          style={{ ...styles.historyCard, borderColor: HISTORY.color }}
          onClick={() => setActiveLesson(HISTORY)}
        >
          <div
            style={{ ...styles.icon, backgroundColor: HISTORY.color }}
          >
            📜
          </div>
          <h3 style={styles.cardTitle}>تاریخچه مسیر زندگی</h3>
        </div>
      </div>

      {/* ====== Principles Section ====== */}
      <h2 style={styles.sectionTitle}>اصول زندگی من</h2>

      <div style={styles.grid}>
        {PRINCIPLES.map((lesson, index) => (
          <div
            key={index}
            style={{ ...styles.card, borderColor: lesson.color }}
            onClick={() => setActiveLesson(lesson)}
          >
            <div
              style={{ ...styles.icon, backgroundColor: lesson.color }}
            >
              {lesson.title.substring(0, 1)}
            </div>
            <h3 style={styles.cardTitle}>{lesson.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ====== Styles ====== */
const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "#1a1a2e",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "20px",
    color: "white",
    direction: "rtl",
    fontFamily: "Vazirmatn, sans-serif",
  },

  header: {
    fontSize: "2.2rem",
    marginBottom: "4px",
    background: "linear-gradient(to right, #4ecdc4, #c06c84)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  subHeader: {
    fontSize: "1rem",
    marginBottom: "14px",
    color: "#b6c0d1",
  },

  sectionTitle: {
    marginTop: "14px",
    marginBottom: "10px",
    fontSize: "1.1rem",
    color: "#cbd5e1",
  },

  historyWrapper: {
    marginBottom: "12px",
  },

  historyCard: {
    width: "300px",
    height: "80px",
    background: "rgba(70, 90, 140, 0.6)",
    borderRadius: "14px",
    border: "2px solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    gap: "12px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: "14px 18px",
    width: "80%",
    maxWidth: "900px",
  },

  card: {
    width: "140px",
    height: "160px",
    background: "rgba(50, 50, 80, 0.7)",
    borderRadius: "14px",
    border: "2px solid #334155",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "0.25s",
  },

  icon: {
    width: "42px",
    height: "42px",
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
};
