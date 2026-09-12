import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from "react";

import LessonRoom from "./components/LessonRoom";
import ClassroomSplitTwoD from "./components/ClassroomSplitTwoD";
import SECTIONS from "./Section";

const IS_PASSWORD_PROTECTED = false; // true, false

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

const Card = React.memo(
  ({ title, color, onClick, onThreeDClick, isDark }) => {
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
          border: `2px solid ${
            hovered ? color : isDark ? "#4a4d55" : "#d5d6d7"
          }`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
          transition: "border-color 0.22s, background 0.22s",
          background: isDark
            ? hovered
              ? `linear-gradient(180deg, ${color}15 0%, #050505 100%)`
              : "#000000"
            : hovered
            ? `linear-gradient(180deg, ${color}0d 0%, #ffffff 100%)`
            : "#ffffff",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "700",
            fontSize: "0.95rem",
            backgroundColor: color || "#38bdf8",
            color: "#fff",
          }}
        >
          {initials}
        </div>

        <h3
          style={{
            marginTop: "14px",
            fontSize: "0.95rem",
            fontWeight: "700",
            textAlign: "center",
            padding: "0 8px",
            lineHeight: "1.4",
            color: isDark ? "#f1f5f9" : "#0f172a",
          }}
        >
          {title}
        </h3>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();

            if (onThreeDClick) {
              onThreeDClick();
            }
          }}
          title="نمای سه‌بعدی"
          aria-label={`نمای سه‌بعدی ${title || ""}`}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            padding: "4px 10px",
            borderRadius: "0 0 0 12px",
            background: hovered
              ? color
              : isDark
              ? "#121824"
              : "#e2e8f0",
            border: "none",
            color: hovered
              ? "#fff"
              : isDark
              ? "#94a3b8"
              : "#475569",
            cursor: "pointer",
            fontSize: "0.75rem",
            fontWeight: "bold",
            transition: "all 0.2s",
          }}
        >
          3D
        </button>
      </div>
    );
  }
);

Card.displayName = "Card";

export default function App() {
  const [activeLesson, setActiveLesson] = useState(null);
  const [viewMode, setViewMode] = useState(null);

  // تم سه‌حالته: dark / light / system
  const [themeMode, setThemeMode] = useState("system");
  const [systemIsDark, setSystemIsDark] = useState(() => {
    if (typeof window === "undefined") return false;

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [hiddenPassword, setHiddenPassword] = useState("");
  const hiddenInputRef = useRef(null);
  const pendingLessonRef = useRef(null);
  const pendingModeRef = useRef(null);
  const [passError, setPassError] = useState(false);

  // دنبال‌کردن تغییر تم سیستم
  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    setSystemIsDark(mediaQuery.matches);

    const handleSystemThemeChange = (event) => {
      setSystemIsDark(event.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleSystemThemeChange);
    } else {
      mediaQuery.addListener(handleSystemThemeChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener(
          "change",
          handleSystemThemeChange
        );
      } else {
        mediaQuery.removeListener(handleSystemThemeChange);
      }
    };
  }, []);

  // تم نهایی قابل نمایش
  const isDark = useMemo(() => {
    if (themeMode === "system") {
      return systemIsDark;
    }

    return themeMode === "dark";
  }, [themeMode, systemIsDark]);

  // چرخه تم: dark → light → system → dark
  const handleThemeCycle = useCallback(() => {
    setThemeMode((currentMode) => {
      if (currentMode === "dark") return "light";
      if (currentMode === "light") return "system";
      return "dark";
    });
  }, []);

  // دریافت تغییر تم از صفحه دوبعدی
  const handleChildThemeChange = useCallback((nextTheme) => {
    if (
      nextTheme === "dark" ||
      nextTheme === "light" ||
      nextTheme === "system"
    ) {
      setThemeMode(nextTheme);
    }
  }, []);

  const normalizedLessons = useMemo(() => {
    return SECTIONS.map((lesson) =>
      normalizeLesson(
        lesson.raw,
        lesson.key,
        lesson.title,
        lesson.color
      )
    );
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

  // انتخاب کارت‌های صفحه اصلی با کلیدهای 1 تا 9
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        document.activeElement &&
        (document.activeElement.tagName === "INPUT" ||
          document.activeElement.tagName === "TEXTAREA")
      ) {
        return;
      }

      if (activeLesson !== null) return;

      const key = event.key;

      if (/^[1-9]$/.test(key)) {
        const index = parseInt(key, 10) - 1;
        const targetLesson = normalizedLessons[index];

        if (targetLesson) {
          handleSelectLesson(targetLesson, "2D");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    activeLesson,
    normalizedLessons,
    handleSelectLesson,
  ]);

  // صفحه سه‌بعدی
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

  // صفحه دوبعدی
  if (activeLesson && viewMode === "2D") {
    return (
      <ClassroomSplitTwoD
        lesson={activeLesson}
        onBack={handleBack}
        onSwitchTo3D={() => setViewMode("3D")}
        theme={themeMode}
        onToggleTheme={handleChildThemeChange}
      />
    );
  }

  // صفحه اصلی
  return (
    <div
      style={{
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
        boxSizing: "border-box",
      }}
    >
      <style>
        {`
          * {
            box-sizing: border-box;
          }

          button,
          div,
          span {
            -webkit-tap-highlight-color: transparent;
          }

          button:focus,
          button:focus-visible,
          div:focus,
          div:focus-visible {
            outline: none;
          }

          ${
            !isDark
              ? `
                ::-webkit-scrollbar {
                  width: 8px;
                  height: 8px;
                }

                ::-webkit-scrollbar-track {
                  background: #f1f5f9 !important;
                }

                ::-webkit-scrollbar-thumb {
                  background: #cbd5e1 !important;
                  border-radius: 8px;
                }

                ::-webkit-scrollbar-thumb:hover {
                  background: #94a3b8 !important;
                }
              `
              : `
                ::-webkit-scrollbar {
                  width: 8px;
                  height: 8px;
                }

                ::-webkit-scrollbar-track {
                  background: #0f0f0f !important;
                }

                ::-webkit-scrollbar-thumb {
                  background: #444444 !important;
                  border-radius: 8px;
                }

                ::-webkit-scrollbar-thumb:hover {
                  background: #555555 !important;
                }
              `
          }
        `}
      </style>

      {/* نوار بالای صفحه؛ هماهنگ با صفحه دوبعدی */}
      <div
        style={{
          width: "100%",
          height: 64,
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          background: isDark ? "#0f0f0f" : "#ffffff",
          borderBottom: isDark
            ? "1px solid #222"
            : "1px solid #e2e8f0",
          zIndex: 20,
          flexDirection: "row",
          position: "relative",
          flexShrink: 0,
        }}
      >
        {/* محل دکمه‌ها؛ دقیقاً مشابه صفحه دوبعدی */}
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
          }}
        >
          {/* دکمه تم سه‌حالته */}
          <button
            type="button"
            onClick={handleThemeCycle}
            title={
              themeMode === "dark"
                ? "تم تاریک — کلیک برای تم روشن"
                : themeMode === "light"
                ? "تم روشن — کلیک برای تم سیستم"
                : "تم سیستم — کلیک برای تم تاریک"
            }
            aria-label="تغییر حالت تم"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "32px",
              height: "32px",
              padding: 0,
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              background: isDark ? "#27272a" : "#ffffff",
              color:
                themeMode === "dark"
                  ? "#818cf8"
                  : themeMode === "light"
                  ? "#f59e0b"
                  : "#38bdf8",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            {themeMode === "dark" && (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}

            {themeMode === "light" && (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line
                  x1="4.22"
                  y1="4.22"
                  x2="5.64"
                  y2="5.64"
                />
                <line
                  x1="18.36"
                  y1="18.36"
                  x2="19.78"
                  y2="19.78"
                />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line
                  x1="4.22"
                  y1="19.78"
                  x2="5.64"
                  y2="18.36"
                />
                <line
                  x1="18.36"
                  y1="5.64"
                  x2="19.78"
                  y2="4.22"
                />
              </svg>
            )}

            {themeMode === "system" && (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect
                  x="2"
                  y="3"
                  width="20"
                  height="14"
                  rx="2"
                />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            )}
          </button>
        </div>

        {/* عنوان مرکزی نوار */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            userSelect: "none",
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <span
            style={{
              fontSize: "1.15rem",
              fontWeight: 900,
              whiteSpace: "nowrap",
              color: isDark ? "#ffffff" : "#0f172a",
            }}
          >
            متاورس شخصی
          </span>
        </div>

        {/* فضای باقی‌مانده هدر */}
        <div
          aria-hidden="true"
          style={{
            flex: 1,
          }}
        />
      </div>

      <p
        style={{
          fontSize: "1rem",
          marginTop: "28px",
          marginBottom: "25px",
          color: isDark ? "#64748b" : "#94a3b8",
        }}
      >
        ver:1405.03.05
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "22px",
          width: "90%",
          justifyItems: "center",
        }}
      >
        {normalizedLessons.map((lesson) => (
          <Card
            key={lesson.key}
            title={lesson.title}
            color={lesson.color}
            isDark={isDark}
            onClick={() =>
              handleSelectLesson(lesson, "2D")
            }
            onThreeDClick={() =>
              handleSelectLesson(lesson, "3D")
            }
          />
        ))}
      </div>

      {IS_PASSWORD_PROTECTED && (
        <>
          <input
            ref={hiddenInputRef}
            type="password"
            value={hiddenPassword}
            onChange={(event) =>
              setHiddenPassword(event.target.value)
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                if (hiddenPassword === "0") {
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
              position: "fixed",
              opacity: 0,
            }}
          />

          {hiddenPassword.length > 0 && (
            <div
              style={{
                position: "fixed",
                bottom: "12px",
                left: "50%",
                transform: "translateX(-50%)",
                color: "#666",
                fontSize: "14px",
                fontFamily: "monospace",
                letterSpacing: "4px",
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              {"•".repeat(hiddenPassword.length)}
            </div>
          )}

          {passError && (
            <div
              style={{
                position: "fixed",
                bottom: "40px",
                left: "50%",
                transform: "translateX(-50%)",
                color: "#ff4444",
                fontSize: "12px",
                fontFamily: "monospace",
                opacity: 0.8,
              }}
            >
              access denied
            </div>
          )}
        </>
      )}
    </div>
  );
}
