// File: E:\metaPersonal\src\components\TwoDMobile\index.jsx

import React, { useMemo, useRef, useState, useEffect } from "react";
import { normalizeRecursive, flattenTree, detectDir } from "./utils";
import KeypadModal from "./KeypadModal";
import NavigationDrawer from "./NavigationDrawer";

// متغیر فعال/غیرفعال کردن رمز رویدادها (در صورت false بودن، رمز درخواست نمی‌شود)
const REQUIRE_EVENTS_PIN = false; // true , false

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
  const [onlySubtopics, setOnlySubtopics] = useState(false);

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

  const handleCloseKeypad = () => {
    setShowKeypad(false);
    setPin("");
    setPendingAction(null);
    setPassError(false);
  };

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

        .mobile-btn-interactive {
          transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.2s ease, opacity 0.2s ease;
        }

        .mobile-btn-interactive:active {
          transform: scale(0.92);
        }

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
            className="mobile-btn-interactive"
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
                <line x1="12" y1="2" x2="12" y2="3" />
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
              className="mobile-btn-interactive"
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
              className="mobile-btn-interactive"
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
          className="mobile-btn-interactive"
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
          className="mobile-btn-interactive"
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
          className="mobile-btn-interactive"
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
          className="mobile-btn-interactive"
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
          className="mobile-btn-interactive"
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

      {/* کامپوننت منوی دراور */}
      <NavigationDrawer
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        drawerTab={drawerTab}
        setDrawerTab={setDrawerTab}
        lessonTitle={lesson?.title}
        lessonColor={lessonColor}
        isDark={isDark}
        sections={sections}
        activeSectionIdx={activeSectionIdx}
        handleSectionSelect={handleSectionSelect}
        activeSection={activeSection}
        units={units}
        activeUnitIdx={activeUnitIdx}
        handleUnitSelect={handleUnitSelect}
        activeUnit={activeUnit}
        detailItems={detailItems}
        activeDetailId={activeDetailId}
        scrollToDetailItem={scrollToDetailItem}
        onlySubtopics={onlySubtopics}
        setOnlySubtopics={setOnlySubtopics}
      />

      {/* کامپوننت سیستم رمز گلس‌مورفیک */}
      <KeypadModal
        showKeypad={showKeypad}
        onClose={handleCloseKeypad}
        pin={pin}
        handlePinInput={handlePinInput}
        handlePinBackspace={handlePinBackspace}
        handlePinSubmit={handlePinSubmit}
        passError={passError}
        isDark={isDark}
      />
    </div>
  );
}
