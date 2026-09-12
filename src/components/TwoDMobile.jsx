import React, { useMemo, useRef, useState, useEffect } from "react";

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

  // تم سه‌حالته
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

  // سینک اسکرول
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

        if (rect.top <= containerRect.top + 120) {
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
    return () => container.removeEventListener("scroll", handleScroll);
  }, [activeUnit, activeDetailId]);

  // کنترل رمز
  const handleSectionSelect = (idx) => {
    const targetSection = sections[idx];
    if (
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
            scrollMarginTop: 75,
            marginBottom: 32,
            paddingTop: 20,
            borderTop:
              depth === 0
                ? `2px solid ${lessonColor}`
                : `1px solid ${isDark ? "#222" : "#e5e7eb"}`,
            paddingRight: depth > 0 ? 14 : 0,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 10,
              marginBottom: 12,
            }}
          >
            <span
              style={{
                color: lessonColor,
                fontWeight: 900,
                fontSize: depth === 0 ? "1rem" : "0.9rem",
                direction: "ltr",
                flexShrink: 0,
              }}
            >
              {number}
            </span>
            <h2
              style={{
                margin: 0,
                color: depth === 0 ? lessonColor : isDark ? "#fff" : "#0f172a",
                fontSize: depth === 0 ? "1.25rem" : "1.02rem",
                fontWeight: 800,
                lineHeight: 1.5,
              }}
            >
              {item.title}
            </h2>
          </div>

          {item.content && (
            <p
              style={{
                fontSize: "0.98rem",
                lineHeight: "2",
                color: isDark ? "#d1d5db" : "#334155",
                textAlign: "justify",
                marginTop: 8,
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
      {/* استایل سراسری */}
      <style>{`
        * { box-sizing: border-box; }
        button, div, span { -webkit-tap-highlight-color: transparent; }
        button:focus, div:focus { outline: none; }
      `}</style>

      {/* نوار بالای صفحه موبایل */}
      <header
        style={{
          height: 56,
          padding: "0 12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: isDark ? "#0f0f0f" : "#ffffff",
          borderBottom: isDark ? "1px solid #222" : "1px solid #e2e8f0",
          zIndex: 30,
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {/* دکمه تم */}
          <button
            onClick={handleThemeCycle}
            aria-label="تغییر تم"
            style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              background: isDark ? "#27272a" : "#f1f5f9",
              color:
                themeMode === "dark"
                  ? "#818cf8"
                  : themeMode === "light"
                  ? "#f59e0b"
                  : "#38bdf8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
                width: 34,
                height: 34,
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                background: isDark ? "#27272a" : "#f1f5f9",
                color: isDark ? "#a1a1aa" : "#475569",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
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
                width: 34,
                height: 34,
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                background: lessonColor,
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}
        </div>

        {/* عنوان درس در نوار بالا */}
        <div
          style={{
            flex: 1,
            textAlign: "center",
            padding: "0 8px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontWeight: 800,
            fontSize: "0.95rem",
            color: lessonColor,
          }}
        >
          {lesson?.title || "کلاس آموزشی"}
        </div>

        {/* دکمه منو/سرفصل‌ها */}
        <button
          onClick={() => setDrawerOpen(true)}
          aria-label="فهرست سرفصل‌ها"
          style={{
            padding: "6px 12px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            background: isDark ? "#27272a" : "#f1f5f9",
            color: isDark ? "#ffffff" : "#0f172a",
            fontWeight: 700,
            fontSize: "0.82rem",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          فهرست
        </button>
      </header>

      {/* بخش هدر کوچک زیر نوار: نمایش موقعیت جاری */}
      <div
        style={{
          padding: "8px 16px",
          background: isDark ? "#141414" : "#f1f5f9",
          borderBottom: isDark ? "1px solid #222" : "1px solid #e2e8f0",
          fontSize: "0.82rem",
          display: "flex",
          alignItems: "center",
          gap: 6,
          overflowX: "auto",
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ color: lessonColor, fontWeight: 700 }}>
          {activeSection?.title || "بخش"}
        </span>
        <span style={{ color: "#888" }}>/</span>
        <span style={{ color: isDark ? "#ddd" : "#334155", fontWeight: 600 }}>
          {activeUnit?.title || "قسمت"}
        </span>
      </div>

      {/* محتوای اصلی */}
      <main
        id="mobile-content-area"
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px 16px 80px 16px",
          background: isDark ? "#080808" : "#ffffff",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {activeUnit ? (
          <div>
            <header
              style={{
                marginBottom: 28,
                borderBottom: `1px solid ${isDark ? "#222" : "#eee"}`,
                paddingBottom: 16,
              }}
            >
              <h1
                style={{
                  fontSize: "1.45rem",
                  fontWeight: 900,
                  marginBottom: 12,
                  color: isDark ? "#ffffff" : "#0f172a",
                }}
              >
                {activeUnit.title}
              </h1>
              {activeUnit.content && (
                <p
                  style={{
                    fontSize: "0.98rem",
                    lineHeight: "2",
                    color: isDark ? "#d1d5db" : "#475569",
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
              color: "#888",
            }}
          >
            لطفاً یک بخش را از دکمه «فهرست» انتخاب کنید.
          </div>
        )}
      </main>

      {/* نوار ناوبری پایین صفحه (قسمت قبلی / بعدی) */}
      <footer
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: 52,
          background: isDark ? "rgba(15,15,15,0.92)" : "rgba(255,255,255,0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderTop: isDark ? "1px solid #222" : "1px solid #e2e8f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 12px",
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
            padding: "6px 12px",
            borderRadius: 8,
            border: "none",
            background: activeUnitIdx === 0 ? "transparent" : (isDark ? "#27272a" : "#f1f5f9"),
            color: activeUnitIdx === 0 ? "#555" : (isDark ? "#fff" : "#0f172a"),
            fontSize: "0.82rem",
            fontWeight: 700,
            cursor: activeUnitIdx === 0 ? "default" : "pointer",
          }}
        >
          ← قسمت قبلی
        </button>

        <button
          onClick={() => setDrawerOpen(true)}
          style={{
            border: "none",
            background: "transparent",
            color: lessonColor,
            fontWeight: 800,
            fontSize: "0.85rem",
            cursor: "pointer",
          }}
        >
          سرفصل‌ها ({detailItems.length})
        </button>

        <button
          disabled={activeUnitIdx >= units.length - 1}
          onClick={() => {
            setActiveUnitIdx((prev) => Math.min(units.length - 1, prev + 1));
            document.getElementById("mobile-content-area")?.scrollTo({ top: 0, behavior: "smooth" });
          }}
          style={{
            padding: "6px 12px",
            borderRadius: 8,
            border: "none",
            background: activeUnitIdx >= units.length - 1 ? "transparent" : (isDark ? "#27272a" : "#f1f5f9"),
            color: activeUnitIdx >= units.length - 1 ? "#555" : (isDark ? "#fff" : "#0f172a"),
            fontSize: "0.82rem",
            fontWeight: 700,
            cursor: activeUnitIdx >= units.length - 1 ? "default" : "pointer",
          }}
        >
          قسمت بعدی →
        </button>
      </footer>

      {/* منوی کشویی Drawer موبایل */}
      {drawerOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            justifyContent: "flex-end",
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setDrawerOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "82vw",
              maxWidth: 340,
              height: "100%",
              background: isDark ? "#0f0f0f" : "#ffffff",
              borderLeft: isDark ? "1px solid #222" : "1px solid #e2e8f0",
              display: "flex",
              flexDirection: "column",
              boxShadow: "-4px 0 24px rgba(0,0,0,0.3)",
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
              }}
            >
              <span style={{ fontWeight: 900, fontSize: "1rem", color: lessonColor }}>
                سرفصل‌ها و مباحث
              </span>
              <button
                onClick={() => setDrawerOpen(false)}
                style={{
                  border: "none",
                  background: isDark ? "#27272a" : "#f1f5f9",
                  color: isDark ? "#aaa" : "#555",
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ✕
              </button>
            </div>

            {/* تب‌های درون دراور */}
            <div
              style={{
                display: "flex",
                borderBottom: isDark ? "1px solid #222" : "1px solid #e2e8f0",
                background: isDark ? "#0a0a0a" : "#f8fafc",
              }}
            >
              {[
                { key: "sections", label: "بخش‌ها" },
                { key: "units", label: "قسمت‌ها" },
                { key: "topics", label: "فصل‌ها" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setDrawerTab(tab.key)}
                  style={{
                    flex: 1,
                    padding: "10px 4px",
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
                    fontWeight: drawerTab === tab.key ? 800 : 600,
                    fontSize: "0.82rem",
                    cursor: "pointer",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* محتوای تب‌های دراور */}
            <div style={{ flex: 1, overflowY: "auto", padding: "12px 10px" }}>
              {drawerTab === "sections" && (
                <div>
                  {sections.map((s, i) => {
                    const isActive = activeSectionIdx === i;
                    return (
                      <div
                        key={s.id}
                        onClick={() => handleSectionSelect(i)}
                        style={{
                          padding: "12px 14px",
                          borderRadius: 10,
                          marginBottom: 6,
                          background: isActive
                            ? (isDark ? "rgba(255,255,255,0.06)" : "#f1f5f9")
                            : "transparent",
                          color: isActive ? lessonColor : (isDark ? "#f1f5f9" : "#0f172a"),
                          fontWeight: isActive ? 800 : 600,
                          fontSize: "0.88rem",
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          cursor: "pointer",
                        }}
                      >
                        <div
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: isActive ? lessonColor : (isDark ? "#333" : "#cbd5e1"),
                          }}
                        />
                        <span style={{ flex: 1 }}>{s.title}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {drawerTab === "units" && (
                <div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#888",
                      marginBottom: 8,
                      padding: "0 6px",
                    }}
                  >
                    بخش فعلی: {activeSection?.title}
                  </div>
                  {units.map((u, i) => {
                    const isActive = activeUnitIdx === i;
                    return (
                      <div
                        key={u.id}
                        onClick={() => handleUnitSelect(i)}
                        style={{
                          padding: "12px 14px",
                          borderRadius: 10,
                          marginBottom: 6,
                          background: isActive
                            ? (isDark ? "rgba(255,255,255,0.06)" : "#f1f5f9")
                            : "transparent",
                          color: isActive ? lessonColor : (isDark ? "#f1f5f9" : "#0f172a"),
                          fontWeight: isActive ? 800 : 600,
                          fontSize: "0.88rem",
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          cursor: "pointer",
                        }}
                      >
                        <div
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: isActive ? lessonColor : (isDark ? "#333" : "#cbd5e1"),
                          }}
                        />
                        <span style={{ flex: 1 }}>{u.title}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {drawerTab === "topics" && (
                <div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#888",
                      marginBottom: 8,
                      padding: "0 6px",
                    }}
                  >
                    قسمت فعلی: {activeUnit?.title}
                  </div>
                  {detailItems.map((item) => {
                    const isActive = activeDetailId === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => scrollToDetailItem(item.id)}
                        style={{
                          width: "100%",
                          textAlign: "right",
                          border: "none",
                          padding: `10px ${10 + item.depth * 10}px`,
                          borderRadius: 8,
                          marginBottom: 4,
                          background: isActive ? `${lessonColor}18` : "transparent",
                          color: isActive ? lessonColor : (isDark ? "#e2e8f0" : "#334155"),
                          fontWeight: isActive ? 800 : (item.depth === 0 ? 700 : 500),
                          fontSize: item.depth === 0 ? "0.86rem" : "0.8rem",
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          cursor: "pointer",
                        }}
                      >
                        <span
                          style={{
                            color: isActive ? lessonColor : "#888",
                            fontSize: "0.8rem",
                            direction: "ltr",
                          }}
                        >
                          {item.number}
                        </span>
                        <span style={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
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

      {/* سیستم قفل رمز پین در صورت نیاز */}
      {showKeypad && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(6px)",
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
              background: isDark ? "#141414" : "#ffffff",
              border: `1px solid ${isDark ? "#333" : "#e2e8f0"}`,
              borderRadius: 20,
              padding: 20,
              width: 220,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            }}
          >
            <span style={{ fontSize: "0.85rem", fontWeight: 700, color: lessonColor }}>
              رمز عبور بخش
            </span>

            {/* نقطه‌های پین */}
            <div style={{ display: "flex", gap: 8, height: 16, alignItems: "center" }}>
              {Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={idx}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: idx < pin.length ? lessonColor : (isDark ? "#333" : "#cbd5e1"),
                  }}
                />
              ))}
            </div>

            {/* دکمه‌های عددی */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 10,
              }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <button
                  key={n}
                  onClick={() => handlePinInput(n)}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    border: `1px solid ${isDark ? "#2a2a2a" : "#e2e8f0"}`,
                    background: isDark ? "#1f1f1f" : "#f8fafc",
                    color: isDark ? "#fff" : "#0f172a",
                    fontSize: "1rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {n}
                </button>
              ))}

              <button
                onClick={handlePinBackspace}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  border: "none",
                  background: "transparent",
                  color: isDark ? "#888" : "#666",
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
              >
                ⌫
              </button>

              <button
                onClick={() => handlePinInput(0)}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  border: `1px solid ${isDark ? "#2a2a2a" : "#e2e8f0"}`,
                  background: isDark ? "#1f1f1f" : "#f8fafc",
                  color: isDark ? "#fff" : "#0f172a",
                  fontSize: "1rem",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                0
              </button>

              <button
                onClick={handlePinSubmit}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  border: "none",
                  background: lessonColor,
                  color: "#fff",
                  fontSize: "0.85rem",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                تایید
              </button>
            </div>

            {passError && (
              <span style={{ fontSize: "0.78rem", color: "#ef4444", fontWeight: 700 }}>
                رمز نامعتبر است
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
