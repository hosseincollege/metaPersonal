import React, { useState } from "react";
import LessonRoom from "./components/LessonRoom";

/* ====== Import Lessons ====== */
import history from "./lessons/history";           // تاریخچه / مسیر زندگی
import selfKnowledge from "./lessons/selfKnowledge";
import taqwa from "./lessons/taqwa";
import tawhid from "./lessons/tawhid";
import education from "./lessons/education";
import career from "./lessons/career";
import family from "./lessons/family";

/* ====== Normalizer ====== */
function normalizeLesson(raw, title, color) {
  if (Array.isArray(raw)) {
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
  return raw;
}

/* ====== Lessons (Order is important) ====== */
const LESSONS = [
  normalizeLesson(history, "تاریخچه", "#4ecdc4"),

  normalizeLesson(selfKnowledge, "خودشناسی", "#ff6b6b"),
  normalizeLesson(taqwa, "تقوا", "#1dd1a1"),
  normalizeLesson(tawhid, "توحید", "#48dbfb"),
  normalizeLesson(education, "تحصیلات", "#5f6caf"),
  normalizeLesson(career, "شغل", "#f368e0"),
  normalizeLesson(family, "تشکیل خانواده", "#ff9f43"),
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
      <p style={styles.subHeader}>مسیر رشد از گذشته تا آینده</p>

      <div style={styles.grid}>
        {LESSONS.map((lesson, index) => (
          <div
            key={index}
            style={{ ...styles.card, borderColor: lesson.color }}
            onClick={() => setActiveLesson(lesson)}
          >
            <div style={{ ...styles.icon, backgroundColor: lesson.color }}>
              {lesson.title.substring(0, 2)}
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
    overflow: "hidden",
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

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: "14px 18px",
    width: "80%",
    maxWidth: "900px",
    marginTop: "10px",
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
    boxShadow: "0 0 12px rgba(255,255,255,0.2)",
  },

  cardTitle: {
    marginTop: "10px",
    fontSize: "0.95rem",
    textAlign: "center",
  },
};
