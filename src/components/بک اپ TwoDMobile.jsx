import React, { useMemo, useRef, useState, useEffect } from "react";

// متغیر فعال/غیرفعال کردن رمز رویدادها (در صورت false بودن، رمز درخواست نمی‌شود)
const REQUIRE_EVENTS_PIN = false; // true , false

// توابع کمکی یکسان با نسخه دسکتاپ
const pickText = (...values) => {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
};

const detectDir = (text = "") => {
  const rtlRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;
  return rtlRegex.test(text) ? "rtl" : "ltr";
};

const shortLabel = (text = "", max = 3) => {
  const clean = String(text || "").trim();
  if (!clean) return "";
  return clean.slice(0, max);
};

const normalizeRecursive = (items, path = "root") => {
  if (!Array.isArray(items)) return [];
  return items.map((item, index) => {
    const id = `${path}-${index}`;
    const children = normalizeRecursive(
      [
        ...(Array.isArray(item.chapters) ? item.chapters : []),
        ...(Array.isArray(item.sections) ? item.sections : []),
        ...(Array.isArray(item.units) ? item.units : []),
        ...(Array.isArray(item.topics) ? item.topics : []),
        ...(Array.isArray(item.subtopics) ? item.subtopics : []),
        ...(Array.isArray(item.details) ? item.details : []),
        ...(Array.isArray(item.items) ? item.items : []),
        ...(Array.isArray(item.children) ? item.children : []),
      ],
      id
    );

    return {
      id,
      title: pickText(
        item.title,
        item.chapterTitle,
        item.sectionTitle,
        item.unitTitle,
        item.topicTitle,
        item.subtopicTitle,
        item.name
      ),
      content: pickText(
        item.content,
        item.description,
        item.body,
        item.text,
        item.chapterContent,
        item.sectionContent,
        item.unitContent,
        item.topicContent,
        item.subtopicContent
      ),
      color: item.color || item.accentColor || item.themeColor || null,
      children,
    };
  });
};

const flattenTree = (items, depth = 0, parentNumber = "") => {
  if (!Array.isArray(items)) return [];
  return items.flatMap((item, index) => {
    const number = parentNumber ? `${parentNumber}.${index + 1}` : `${index + 1}`;
    const current = { ...item, depth, number };
    return [current, ...flattenTree(item.children || [], depth + 1, number)];
  });
};

export default function TwoDMobile({
  lesson,
  onBack,
  onSwitchTo3D,
  theme = "dark",
  onToggleTheme,
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerTab, setDrawerTab] = useState("sections"); // "sections" | "units" | "topics"
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [activeUnitIdx, setActiveUnitIdx] = useState(0);
  const [activeDetailId, setActiveDetailId] = useState(null);

  // سیستم تم سه‌حالته: dark / light / system
  const normalizeThemeMode = (value) => {
    return ["dark", "light", "system"].includes(value) ? value : "dark";
  };

  const [themeMode, setThemeMode] = useState(() => normalizeThemeMode(theme));
  const [systemIsDark, setSystemIsDark] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    setThemeMode(normalizeThemeMode(theme));
  }, [theme]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = (event) => setSystemIsDark(event.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleSystemThemeChange);
    } else {
      mediaQuery.addListener(handleSystemThemeChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleSystemThemeChange);
      } else {
        mediaQuery.removeListener(handleSystemThemeChange);
      }
    };
  }, []);

  const handleThemeCycle = () => {
    const nextTheme =
      themeMode === "dark"
        ? "light"
        : themeMode === "light"
        ? "system"
        : "dark";

    setThemeMode(nextTheme);
    if (onToggleTheme) onToggleTheme(nextTheme);
  };

  const isDark = themeMode === "system" ? systemIsDark : themeMode === "dark";

  // سیستم رمز
  const [showKeypad, setShowKeypad] = useState(false);
  const [pin, setPin] = useState("");
  const [pendingAction, setPendingAction] = useState(null);
  const [unlockedSections, setUnlockedSections] = useState([]);
  const [passError, setPassError] = useState(false);

  const contentRefs = useRef({});
  const keypadRef = useRef(null);

  const lessonColor =
    lesson?.color || lesson?.accentColor || lesson?.themeColor || "#22c55e";

  const sections = useMemo(
    () =>
      normalizeRecursive(
        Array.isArray(lesson) ? lesson : lesson?.sections || lesson?.chapters || []
      ),
    [lesson]
  );

  const activeSection = sections[activeSectionIdx] || null;
  const units = activeSection?.children || [];
  const activeUnit = units[activeUnitIdx] || null;
  const detailItems = useMemo(
    () => flattenTree(activeUnit?.children || []),
    [activeUnit]
  );

  // سینک اسکرول هوشمند
  useEffect(() => {
    const container = document.getElementById("mobile-content-area");
    if (!container) return;

    const handleScroll = () => {
      let currentId = null;
      let closestTop = Infinity;

      Object.entries(contentRefs.current).forEach(([id, el]) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const distance = Math.abs(rect.top - containerRect.top - 80);

        if (rect.top <= containerRect.top + 130) {
          if (distance < closestTop) {
            closestTop = distance;
            currentId = id;
          }
        }
      });

      if (currentId && currentId !== activeDetailId) {
        setActiveDetailId(currentId);
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
  }, [activeUnit, activeDetailId]);

  // کنترل باز شدن بخش‌ها با رمز
  const handleSectionSelect = (idx) => {
    const targetSection = sections[idx];
    if (
      REQUIRE_EVENTS_PIN &&
      targetSection &&
      targetSection.title.includes("رویدادها") &&
      !unlockedSections.includes(targetSection.id)
    ) {
      setPendingAction({ type: "section", idx, id: targetSection.id });
      setShowKeypad(true);
      setPin("");
      setPassError(false);
    } else {
      setActiveSectionIdx(idx);
      setActiveUnitIdx(0);
      setActiveDetailId(null);
      setDrawerTab("units");
    }
  };

  const handleUnitSelect = (idx) => {
    setActiveUnitIdx(idx);
    setActiveDetailId(null);
    setDrawerTab("topics");
  };

  const scrollToDetailItem = (id) => {
    setActiveDetailId(id);
    setDrawerOpen(false);
    setTimeout(() => {
      contentRefs.current[id]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 150);
  };

  const handlePinInput = (digit) => setPin((prev) => prev + String(digit));
  const handlePinBackspace = () => setPin((prev) => prev.slice(0, -1));
  const handlePinSubmit = () => {
    if (pin === "001") {
      if (pendingAction && pendingAction.type === "section") {
        setUnlockedSections((prev) => [...prev, pendingAction.id]);
        setActiveSectionIdx(pendingAction.idx);
        setActiveUnitIdx(0);
        setActiveDetailId(null);
        setDrawerTab("units");
      }
      setShowKeypad(false);
      setPin("");
      setPendingAction(null);
      setPassError(false);
    } else {
      setPin("");
      setPassError(true);
      setTimeout(() => setPassError(false), 1200);
    }
  };

  // بستن کیپد با کلیک خارج
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (keypadRef.current && !keypadRef.current.contains(event.target)) {
        setShowKeypad(false);
        setPin("");
        setPendingAction(null);
        setPassError(false);
      }
    };
    if (showKeypad) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showKeypad]);

  // رندر سلسله‌مراتبی محتوا
  const renderContentRecursive = (items, depth = 0, parentNumber = "") => {
    return items.map((item, index) => {
      const number = parentNumber ? `${parentNumber}.${index + 1}` : `${index + 1}`;

      return (
        <section
          key={item.id}
          ref={(el) => (contentRefs.current[item.id] = el)}
          dir={detectDir((item.title || "") + " " + (item.content || ""))}
          style={{
            scrollMarginTop: 80,
            marginBottom: 36,
            paddingTop: 24,
            borderTop:
              depth === 0
                ? `2px solid ${lessonColor}`
                : `1px solid ${isDark ? "#222" : "#eee"}`,
            paddingRight: depth > 0 ? 16 : 0,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 10,
              marginBottom: 14,
            }}
          >
            <span
              style={{
                color: lessonColor,
                fontWeight: 950,
                fontSize: depth === 0 ? "1.05rem" : "0.95rem",
                direction: "ltr",
                opacity: 0.9,
                flexShrink: 0,
              }}
            >
              {number}
            </span>
            <h2
              style={{
                margin: 0,
                color: depth === 0 ? lessonColor : isDark ? "#fff" : "#111",
                fontSize: depth === 0 ? "1.3rem" : "1.05rem",
                fontWeight: 900,
                lineHeight: 1.5,
              }}
            >
              {item.title}
            </h2>
          </div>

          {item.content && (
            <p
              style={{
                fontSize: "1rem",
                lineHeight: "2.1",
                color: isDark ? "#cfcfcf" : "#333",
                textAlign: "justify",
                marginTop: 10,
                whiteSpace: "pre-line",
              }}
            >
              {item.content}
            </p>
          )}

          {item.children?.length > 0 &&
            renderContentRecursive(item.children, depth + 1, number)}
        </section>
      );
    });
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: isDark ? "#080808" : "#f8fafc",
        display: "flex",
        flexDirection: "column",
        color: isDark ? "#f8fafc" : "#0f172a",
        direction: "rtl",
        fontFamily: "'Vazirmatn', sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <style>{`
        * { box-sizing: border-box; }
        button, div, span { -webkit-tap-highlight-color: transparent; }
        button:focus, div:focus { outline: none; }
        ${
          !isDark
            ? `
          ::-webkit-scrollbar { width: 6px; height: 6px; }
          ::-webkit-scrollbar-track { background: #f1f5f9 !important; }
          ::-webkit-scrollbar-thumb { background: #cbd5e1 !important; border-radius: 6px; }
        `
            : `
          ::-webkit-scrollbar { width: 6px; height: 6px; }
          ::-webkit-scrollbar-track { background: #0f0f0f !important; }
          ::-webkit-scrollbar-thumb { background: #444444 !important; border-radius: 6px; }
        `
        }
      `}</style>

      {/* نوار بالایی هماهنگ با دسکتاپ */}
      <header
        style={{
          height: 60,
          padding: "0 14px",
          display: "flex",
          alignItems: "center",
          background: isDark ? "#0f0f0f" : "#ffffff",
          borderBottom: isDark ? "1px solid #222" : "1px solid #e2e8f0",
          zIndex: 30,
          flexShrink: 0,
          position: "relative",
        }}
      >
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {/* دکمه تم سه‌حالته */}
          <button
            onClick={handleThemeCycle}
            aria-label="تغییر تم"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: 32,
              height: 32,
              padding: 0,
              borderRadius: 8,
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
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
            {themeMode === "light" && (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            )}
            {themeMode === "system" && (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            )}
          </button>

          {/* سوییچ به سه‌بعدی */}
          {onSwitchTo3D && (
            <button
              onClick={onSwitchTo3D}
              aria-label="نمای سه بعدی"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: 32,
                height: 32,
                padding: 0,
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                background: isDark ? "#27272a" : "#ffffff",
                color: isDark ? "#a1a1aa" : "#52525b",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l10 6v6l-10 6-10-6V9z" />
                <path d="M22 9l-10 6-10-6" />
              </svg>
            </button>
          )}

          {/* دکمه بازگشت */}
          {onBack && (
            <button
              onClick={onBack}
              aria-label="بازگشت"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: 32,
                height: 32,
                padding: 0,
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                background: lessonColor,
                color: "#ffffff",
                boxShadow: `0 2px 8px ${lessonColor}66`,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}
        </div>

        {/* دکمه وسط: متاورس شخصی */}
        <button
          onClick={onBack}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            background: "transparent",
            border: "none",
            outline: "none",
            cursor: "pointer",
            padding: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <span
            style={{
              fontSize: "1rem",
              fontWeight: 900,
              whiteSpace: "nowrap",
              color: lessonColor,
            }}
          >
            متاورس شخصی
          </span>
        </button>

        {/* عنوان درس در سمت چپ */}
        <h2
          style={{
            flex: 1,
            margin: 0,
            fontSize: "0.95rem",
            fontWeight: 900,
            textAlign: "left",
            color: lessonColor,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {lesson?.title || "کلاس آموزشی"}
        </h2>
      </header>

      {/* نوار وضعیت موقعیت کاربر */}
      <div
        style={{
          padding: "8px 14px",
          background: isDark ? "#0c0c0c" : "#f1f5f9",
          borderBottom: isDark ? "1px solid #1f1f1f" : "1px solid #e2e8f0",
          fontSize: "0.8rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6, overflow: "hidden" }}>
          <span style={{ color: lessonColor, fontWeight: 800, whiteSpace: "nowrap" }}>
            {activeSection?.title || "بخش"}
          </span>
          <span style={{ color: "#777" }}>/</span>
          <span
            style={{
              color: isDark ? "#e2e8f0" : "#334155",
              fontWeight: 700,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {activeUnit?.title || "قسمت"}
          </span>
        </div>

        <button
          onClick={() => setDrawerOpen(true)}
          style={{
            padding: "5px 10px",
            borderRadius: 8,
            border: `1px solid ${isDark ? "#2a2a2a" : "#cbd5e1"}`,
            background: isDark ? "#1a1a1a" : "#ffffff",
            color: isDark ? "#ffffff" : "#0f172a",
            fontWeight: 800,
            fontSize: "0.78rem",
            display: "flex",
            alignItems: "center",
            gap: 5,
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          فهرست سرفصل‌ها
        </button>
      </div>

      {/* محتوای اصلی */}
      <main
        id="mobile-content-area"
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "24px 16px 85px 16px",
          background: isDark ? "#080808" : "#ffffff",
          WebkitOverflowScrolling: "touch",
          scrollBehavior: "smooth",
        }}
      >
        {activeUnit ? (
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <header
              style={{
                marginBottom: 32,
                borderBottom: `1px solid ${isDark ? "#222" : "#eee"}`,
                paddingBottom: 20,
              }}
            >
              <h1
                style={{
                  fontSize: "1.6rem",
                  fontWeight: 900,
                  marginBottom: 14,
                  lineHeight: 1.45,
                  color: isDark ? "#ffffff" : "#0f172a",
                }}
              >
                {activeUnit.title}
              </h1>
              {activeUnit.content && (
                <p
                  style={{
                    fontSize: "1.02rem",
                    lineHeight: "2.2",
                    color: isDark ? "#cfcfcf" : "#333",
                    textAlign: "justify",
                  }}
                >
                  {activeUnit.content}
                </p>
              )}
            </header>

            {renderContentRecursive(activeUnit.children)}
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              placeItems: "center",
              height: "60vh",
              color: "#555",
              fontSize: "0.95rem",
            }}
          >
            لطفاً یک بخش را انتخاب کنید.
          </div>
        )}
      </main>

      {/* نوار پایین صفحه */}
      <footer
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: 56,
          background: isDark ? "rgba(15,15,15,0.92)" : "rgba(255,255,255,0.92)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderTop: isDark ? "1px solid #222" : "1px solid #e2e8f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 14px",
          zIndex: 25,
        }}
      >
        <button
          disabled={activeUnitIdx === 0}
          onClick={() => {
            setActiveUnitIdx((prev) => Math.max(0, prev - 1));
            document.getElementById("mobile-content-area")?.scrollTo({ top: 0, behavior: "smooth" });
          }}
          style={{
            padding: "8px 12px",
            borderRadius: 10,
            border: "none",
            background: activeUnitIdx === 0 ? "transparent" : isDark ? "#27272a" : "#f1f5f9",
            color: activeUnitIdx === 0 ? "#555" : isDark ? "#fff" : "#0f172a",
            fontSize: "0.82rem",
            fontWeight: 700,
            cursor: activeUnitIdx === 0 ? "default" : "pointer",
          }}
        >
          ← قسمت قبلی
        </button>

        <button
          onClick={() => {
            setDrawerTab("topics");
            setDrawerOpen(true);
          }}
          style={{
            border: "none",
            background: `${lessonColor}18`,
            color: lessonColor,
            fontWeight: 850,
            fontSize: "0.82rem",
            padding: "6px 12px",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          فصل‌ها ({detailItems.length})
        </button>

        <button
          disabled={activeUnitIdx >= units.length - 1}
          onClick={() => {
            setActiveUnitIdx((prev) => Math.min(units.length - 1, prev + 1));
            document.getElementById("mobile-content-area")?.scrollTo({ top: 0, behavior: "smooth" });
          }}
          style={{
            padding: "8px 12px",
            borderRadius: 10,
            border: "none",
            background:
              activeUnitIdx >= units.length - 1 ? "transparent" : isDark ? "#27272a" : "#f1f5f9",
            color: activeUnitIdx >= units.length - 1 ? "#555" : isDark ? "#fff" : "#0f172a",
            fontSize: "0.82rem",
            fontWeight: 700,
            cursor: activeUnitIdx >= units.length - 1 ? "default" : "pointer",
          }}
        >
          قسمت بعدی →
        </button>
      </footer>

      {/* منوی دراور مدرن هماهنگ با دسکتاپ */}
      {drawerOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            justifyContent: "flex-end",
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(6px)",
          }}
          onClick={() => setDrawerOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "84vw",
              maxWidth: 360,
              height: "100%",
              background: isDark ? "#0a0a0a" : "#ffffff",
              borderLeft: isDark ? "1px solid #222" : "1px solid #e2e8f0",
              display: "flex",
              flexDirection: "column",
              boxShadow: "-8px 0 32px rgba(0,0,0,0.35)",
            }}
          >
            {/* هدر دراور */}
            <div
              style={{
                padding: "16px",
                borderBottom: isDark ? "1px solid #222" : "1px solid #e2e8f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                minHeight: 64,
              }}
            >
              <div>
                <span style={{ fontSize: "0.68rem", color: "#777", fontWeight: 600, display: "block" }}>
                  فهرست ناوبری
                </span>
                <div style={{ fontSize: "0.95rem", fontWeight: 900, color: lessonColor }}>
                  {lesson?.title || "سرفصل‌ها"}
                </div>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                style={{
                  border: "none",
                  background: isDark ? "#1f1f1f" : "#f1f5f9",
                  color: isDark ? "#aaa" : "#555",
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ✕
              </button>
            </div>

            {/* تب‌های سه لایه */}
            <div
              style={{
                display: "flex",
                borderBottom: isDark ? "1px solid #222" : "1px solid #e2e8f0",
                background: isDark ? "#0d0d0d" : "#fcfcfc",
              }}
            >
              {[
                { key: "sections", label: "۱. بخش‌ها" },
                { key: "units", label: "۲. قسمت‌ها" },
                { key: "topics", label: "۳. فصل‌ها" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setDrawerTab(tab.key)}
                  style={{
                    flex: 1,
                    padding: "12px 4px",
                    border: "none",
                    background: "transparent",
                    borderBottom:
                      drawerTab === tab.key
                        ? `2px solid ${lessonColor}`
                        : "2px solid transparent",
                    color:
                      drawerTab === tab.key
                        ? lessonColor
                        : isDark
                        ? "#9ca3af"
                        : "#64748b",
                    fontWeight: drawerTab === tab.key ? 900 : 600,
                    fontSize: "0.82rem",
                    cursor: "pointer",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* محتوای دراور */}
            <div style={{ flex: 1, overflowY: "auto", padding: "14px 10px" }}>
              {drawerTab === "sections" && (
                <div>
                  {sections.map((s, i) => {
                    const isActive = activeSectionIdx === i;
                    return (
                      <div
                        key={s.id}
                        onClick={() => handleSectionSelect(i)}
                        style={{
                          width: "100%",
                          padding: "12px 14px",
                          borderRadius: 12,
                          marginBottom: 8,
                          cursor: "pointer",
                          background: isActive
                            ? isDark
                              ? "rgba(255,255,255,0.05)"
                              : "#f8fafc"
                            : "transparent",
                          color: isActive ? lessonColor : isDark ? "#ffffff" : "#0f172a",
                          fontWeight: isActive ? 850 : 600,
                          fontSize: "0.9rem",
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          lineHeight: 1.6,
                        }}
                      >
                        <div
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            background: isActive ? lessonColor : isDark ? "#2a2a2a" : "#e2e8f0",
                            boxShadow: isActive ? `0 0 12px ${lessonColor}` : "none",
                            flexShrink: 0,
                          }}
                        />
                        <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {s.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {drawerTab === "units" && (
                <div>
                  <div
                    style={{
                      fontSize: "0.72rem",
                      color: "#777",
                      marginBottom: 10,
                      padding: "0 8px",
                      fontWeight: 600,
                    }}
                  >
                    بخش انتخاب‌شده: {activeSection?.title || "---"}
                  </div>
                  {units.map((u, i) => {
                    const isActive = activeUnitIdx === i;
                    return (
                      <div
                        key={u.id}
                        onClick={() => handleUnitSelect(i)}
                        style={{
                          width: "100%",
                          padding: "12px 14px",
                          borderRadius: 12,
                          marginBottom: 8,
                          cursor: "pointer",
                          background: isActive
                            ? isDark
                              ? "rgba(255,255,255,0.05)"
                              : "#f8fafc"
                            : "transparent",
                          color: isActive ? lessonColor : isDark ? "#ffffff" : "#0f172a",
                          fontWeight: isActive ? 850 : 600,
                          fontSize: "0.9rem",
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          lineHeight: 1.6,
                        }}
                      >
                        <div
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            background: isActive ? lessonColor : isDark ? "#2a2a2a" : "#e2e8f0",
                            boxShadow: isActive ? `0 0 12px ${lessonColor}` : "none",
                            flexShrink: 0,
                          }}
                        />
                        <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {u.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {drawerTab === "topics" && (
                <div>
                  <div
                    style={{
                      fontSize: "0.72rem",
                      color: "#777",
                      marginBottom: 10,
                      padding: "0 8px",
                      fontWeight: 600,
                    }}
                  >
                    قسمت انتخاب‌شده: {activeUnit?.title || "---"}
                  </div>
                  {detailItems.map((item) => {
                    const isLevelZero = item.depth === 0;
                    const isActive = activeDetailId === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => scrollToDetailItem(item.id)}
                        style={{
                          width: "100%",
                          appearance: "none",
                          border: "none",
                          outline: "none",
                          textAlign: "right",
                          cursor: "pointer",
                          marginBottom: 6,
                          padding: `10px ${12 + item.depth * 14}px 10px 8px`,
                          borderRadius: 10,
                          background: isActive ? `${lessonColor}12` : "transparent",
                          color: isActive ? lessonColor : isDark ? "#ffffff" : "#0f172a",
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          fontSize: item.depth === 0 ? "0.9rem" : "0.84rem",
                          fontWeight: isActive ? 900 : isLevelZero ? 700 : 500,
                        }}
                      >
                        <span
                          style={{
                            color: isActive ? lessonColor : isDark ? "#ffffff" : "#0f172a",
                            fontWeight: isLevelZero ? 900 : 600,
                            fontSize: "0.82rem",
                            direction: "ltr",
                            textAlign: "left",
                            flexShrink: 0,
                          }}
                        >
                          {item.number}
                        </span>
                        <span
                          style={{
                            textAlign: "right",
                            flex: 1,
                            color: isActive ? lessonColor : isDark ? "#ffffff" : "#475569",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* سیستم رمز گلس‌مورفیک مشابه نسخه دسکتاپ */}
      {showKeypad && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setShowKeypad(false)}
        >
          <div
            ref={keypadRef}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: isDark
                ? "rgba(10, 10, 10, 0.85)"
                : "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: `1px solid ${
                isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)"
              }`,
              borderRadius: "22px",
              padding: "18px 14px",
              width: "170px",
              boxShadow: isDark
                ? "0 18px 40px rgba(0, 0, 0, 0.45)"
                : "0 18px 40px rgba(0, 0, 0, 0.12)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
            }}
          >
            {/* پین کد dots */}
            <div
              style={{
                display: "flex",
                gap: "7px",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "14px",
                minWidth: "50px",
              }}
            >
              {pin.length > 0 &&
                Array.from({ length: pin.length }).map((_, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: isDark ? "#d4d4d4" : "#222",
                      opacity: 0.95,
                    }}
                  />
                ))}
            </div>

            {/* صفحه کلید عددی */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "8px",
                justifyItems: "center",
              }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <button
                  key={n}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePinInput(n);
                  }}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    border: `1px solid ${
                      isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"
                    }`,
                    background: isDark
                      ? "rgba(255,255,255,0.04)"
                      : "rgba(0,0,0,0.02)",
                    color: isDark ? "#9ca3af" : "#4b5563",
                    fontSize: "14px",
                    fontFamily: "monospace",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    outline: "none",
                  }}
                >
                  {n}
                </button>
              ))}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePinBackspace();
                }}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "none",
                  background: "transparent",
                  color: isDark ? "#6b7280" : "#9ca3af",
                  fontSize: "11px",
                  fontFamily: "monospace",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  outline: "none",
                }}
              >
                ⌫
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePinInput(0);
                }}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: `1px solid ${
                    isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"
                  }`,
                  background: isDark
                    ? "rgba(255,255,255,0.04)"
                    : "rgba(0,0,0,0.02)",
                  color: isDark ? "#9ca3af" : "#4b5563",
                  fontSize: "14px",
                  fontFamily: "monospace",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  outline: "none",
                }}
              >
                0
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePinSubmit();
                }}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: `1px solid ${
                    isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.14)"
                  }`,
                  background: isDark
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(0,0,0,0.05)",
                  color: isDark ? "#d1d5db" : "#111827",
                  fontSize: "11px",
                  fontFamily: "monospace",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  outline: "none",
                }}
              >
                OK
              </button>
            </div>

            {/* ارور */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                minHeight: "16px",
              }}
            >
              {passError && (
                <span
                  style={{
                    fontSize: "9px",
                    color: "rgba(239,68,68,0.9)",
                    fontFamily: "monospace",
                    letterSpacing: "0.4px",
                  }}
                >
                  ACCESS DENIED
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
