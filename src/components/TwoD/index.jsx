import React, { useMemo, useRef, useState, useEffect } from "react";
import {
  pickText,
  detectDir,
  shortLabel,
  normalizeRecursive,
  flattenTree,
} from "./utils";
import { getThemeStyles } from "./styles";
import Keypad from "./Keypad";

export default function ClassroomSplitTwoD({
  lesson,
  onBack,
  onSwitchTo3D,
  theme = "dark",
  onToggleTheme,
  isLockEnabled = false, // true , false  پراپ کنترل فعال/غیرفعال بودن رمز رویدادها
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [isThirdColumnVisible, setIsThirdColumnVisible] = useState(true);
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [activeUnitIdx, setActiveUnitIdx] = useState(0);
  const [activeDetailId, setActiveDetailId] = useState(null);

  // مدیریت تم سه‌حالته: dark / light / system
  const normalizeThemeMode = (value) => {
    return ["dark", "light", "system"].includes(value) ? value : "dark";
  };

  const [themeMode, setThemeMode] = useState(() =>
    normalizeThemeMode(theme)
  );

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

    if (onToggleTheme) {
      onToggleTheme(nextTheme);
    }
  };

  const isDark =
    themeMode === "system" ? systemIsDark : themeMode === "dark";

  // سیستم رمز
  const [showKeypad, setShowKeypad] = useState(false);
  const [pin, setPin] = useState("");
  const [pendingAction, setPendingAction] = useState(null);
  const [unlockedSections, setUnlockedSections] = useState([]);
  const [passError, setPassError] = useState(false);

  // نویگیشن کیبورد
  const [focusedCol, setFocusedCol] = useState(0);
  const [focusedIdx, setFocusedIdx] = useState({ 0: 0, 1: 0, 2: 0 });

  const contentRefs = useRef({});
  const keypadRef = useRef(null);

  const styles = useMemo(() => getThemeStyles(isDark, collapsed), [isDark, collapsed]);

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
  const detailItems = useMemo(() => flattenTree(activeUnit?.children || []), [activeUnit]);

  // Sync Scroll Logic
  useEffect(() => {
    const container = document.getElementById("main-content-area");
    if (!container) return;

    const handleScroll = () => {
      let currentId = null;
      let closestTop = Infinity;

      Object.entries(contentRefs.current).forEach(([id, el]) => {
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        const distance = Math.abs(rect.top - containerRect.top - 120);

        if (rect.top <= containerRect.top + 150) {
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

    container.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [activeUnit, activeDetailId]);

  // بستن کی‌پد با کلیک بیرون
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (keypadRef.current && !keypadRef.current.contains(event.target)) {
        setShowKeypad(false);
        setPin("");
        setPendingAction(null);
        setPassError(false);
      }
    };

    if (showKeypad) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showKeypad]);

  // هاب ورود به بخش‌ها با محافظ قفل رمز
  const handleSectionClick = (idx) => {
    const targetSection = sections[idx];

    if (
      isLockEnabled &&
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
    }
  };

  const handleUnitClick = (idx) => {
    setActiveUnitIdx(idx);
    setActiveDetailId(null);
  };

  const scrollToItem = (id) => {
    setActiveDetailId(id);
    contentRefs.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // مدیریت کی‌پد
  const handlePinInput = (digit) => {
    setPin((prev) => prev + String(digit));
  };

  const handlePinBackspace = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  const handlePinSubmit = () => {
    if (pin === "001") {
      if (pendingAction && pendingAction.type === "section") {
        setUnlockedSections((prev) => [...prev, pendingAction.id]);
        setActiveSectionIdx(pendingAction.idx);
        setActiveUnitIdx(0);
        setActiveDetailId(null);
      }
      setShowKeypad(false);
      setPin("");
      setPendingAction(null);
      setPassError(false);
    } else {
      setPin("");
      setPassError(true);
      setTimeout(() => {
        setPassError(false);
      }, 1200);
    }
  };

  // کیبورد فیزیکی و نویگیشن
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showKeypad) {
        if (/^[0-9]$/.test(e.key)) {
          e.preventDefault();
          handlePinInput(e.key);
        } else if (e.key === "Backspace") {
          e.preventDefault();
          handlePinBackspace();
        } else if (e.key === "Enter") {
          e.preventDefault();
          handlePinSubmit();
        } else if (e.key === "Escape") {
          e.preventDefault();
          setShowKeypad(false);
          setPin("");
          setPendingAction(null);
          setPassError(false);
        }
        return;
      }

      if (e.key === "0") {
        e.preventDefault();
        if (onBack) onBack();
        return;
      }

      const getMaxItems = () => {
        if (focusedCol === 0) return sections.length;
        if (focusedCol === 1) return units.length;
        if (focusedCol === 2) return detailItems.length;
        return 0;
      };

      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          setFocusedCol((prev) => Math.max(0, prev - 1));
          break;
        case "ArrowLeft":
          e.preventDefault();
          setFocusedCol((prev) => Math.min(2, prev + 1));
          break;
        case "ArrowDown":
          e.preventDefault();
          setFocusedIdx((prev) => ({
            ...prev,
            [focusedCol]: Math.min(getMaxItems() - 1, prev[focusedCol] + 1),
          }));
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedIdx((prev) => ({
            ...prev,
            [focusedCol]: Math.max(0, prev[focusedCol] - 1),
          }));
          break;
        case "Enter":
          e.preventDefault();
          const currentIdx = focusedIdx[focusedCol];
          const maxIdx = getMaxItems();
          if (currentIdx >= 0 && currentIdx < maxIdx) {
            if (focusedCol === 0) {
              handleSectionClick(currentIdx);
            } else if (focusedCol === 1) {
              handleUnitClick(currentIdx);
            } else if (focusedCol === 2) {
              const targetItem = detailItems[currentIdx];
              if (targetItem) scrollToItem(targetItem.id);
            }
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    showKeypad,
    pin,
    pendingAction,
    focusedCol,
    focusedIdx,
    sections,
    units,
    detailItems,
    unlockedSections,
    onBack,
    isLockEnabled,
  ]);

  const renderContentRecursive = (items, depth = 0, parentNumber = "") => {
    return items.map((item, index) => {
      const number = parentNumber ? `${parentNumber}.${index + 1}` : `${index + 1}`;

      return (
        <section
          key={item.id}
          ref={(el) => (contentRefs.current[item.id] = el)}
          style={styles.contentBlock(depth, lessonColor)}
          dir={detectDir((item.title || "") + " " + (item.content || ""))}
        >
          <div style={styles.contentTitleRow}>
            <span style={styles.contentNumber(lessonColor)}>{number}</span>
            <h2 style={styles.contentTitle(depth, lessonColor)}>{item.title}</h2>
          </div>

          {item.content && <p style={styles.contentText}>{item.content}</p>}

          {item.children?.length > 0 &&
            renderContentRecursive(item.children, depth + 1, number)}
        </section>
      );
    });
  };

  return (
    <div style={styles.mainContainer}>
      <style>
        {`
          * {
            box-sizing: border-box;
          }

          button, div, span {
            -webkit-tap-highlight-color: transparent;
          }

          button:focus,
          button:focus-visible,
          div:focus,
          div:focus-visible {
            outline: none;
          }

          ${!isDark ? `
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
          ` : `
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
          `}
        `}
      </style>

      <div style={styles.topToolbar}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {/* دکمه تغییر تم سه‌حالته */}
          <button
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
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}

            {themeMode === "light" && (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            )}
          </button>

          {/* دکمه بازگشت */}
          {onBack && (
            <button
              onClick={onBack}
              title="خروج (کلید 0)"
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
                background: lessonColor,
                color: "#ffffff",
                boxShadow: `0 2px 8px ${lessonColor}66`,
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
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
              background: collapsed
                ? isDark
                  ? "#3f3f46"
                  : "#e4e4e7"
                : isDark
                ? "#27272a"
                : "#ffffff",
              color: collapsed
                ? isDark
                  ? "#ffffff"
                  : "#18181b"
                : isDark
                ? "#a1a1aa"
                : "#52525b",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {collapsed ? (
                <>
                  <path d="M9 7l-3 5 3 5" />
                  <path d="M17 7l-3 5 3 5" />
                </>
              ) : (
                <>
                  <path d="M11 7l3 5-3 5" />
                  <path d="M19 7l-3 5 3 5" />
                </>
              )}
            </svg>
          </button>

          <button
            onClick={() => setIsThirdColumnVisible(!isThirdColumnVisible)}
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
              background: isThirdColumnVisible
                ? isDark
                  ? "#3f3f46"
                  : "#e4e4e7"
                : isDark
                ? "#27272a"
                : "#ffffff",
              color: isThirdColumnVisible
                ? isDark
                  ? "#ffffff"
                  : "#18181b"
                : isDark
                ? "#a1a1aa"
                : "#52525b",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="16" rx="3" />
              <path d="M9 4v16" />
            </svg>
          </button>

          <button
            onClick={onSwitchTo3D}
            title="نمای سه بعدی"
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
              color: isDark ? "#a1a1aa" : "#52525b",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3l10 6v6l-10 6-10-6V9z" />
              <path d="M22 9l-10 6-10-6" />
            </svg>
          </button>
        </div>

        {/* دکمه وسط: متاورس شخصی */}
        <button
          onClick={onBack}
          title="بازگشت به صفحه اصلی"
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
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "0.8";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
        >
          <span
            style={{
              fontSize: "1.15rem",
              fontWeight: 900,
              whiteSpace: "nowrap",
              color: lessonColor,
              userSelect: "none",
            }}
          >
            متاورس شخصی
          </span>
        </button>

        <h2 style={{ ...styles.toolbarTitle, color: lessonColor }}>
          {lesson?.title || "کلاس آموزشی"}
        </h2>
      </div>

      <div style={styles.layoutGrid}>
        {/* ستون اول */}
        <aside style={styles.sidePanel}>
          <div style={styles.panelHeader}>
            <span style={styles.headerLabel}>ستون اول</span>
            <div style={{ ...styles.headerActiveTitle, color: isDark ? "#fff" : "#111" }}>
              بخش‌ها
            </div>
          </div>

          <div style={styles.scrollArea}>
            {sections.map((s, i) => (
              <div key={s.id} style={{ position: "relative" }}>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSectionClick(i);
                  }}
                  style={styles.navItem(
                    activeSectionIdx === i,
                    lessonColor,
                    collapsed,
                    focusedCol === 0 && focusedIdx[0] === i
                  )}
                >
                  <div style={styles.statusLight(activeSectionIdx === i, lessonColor)} />
                  <span style={styles.collapsedText}>
                    {collapsed ? shortLabel(s.title, 2) : s.title}
                  </span>
                </div>

                {showKeypad && pendingAction?.id === s.id && (
                  <Keypad
                    keypadRef={keypadRef}
                    collapsed={collapsed}
                    isDark={isDark}
                    pin={pin}
                    handlePinInput={handlePinInput}
                    handlePinBackspace={handlePinBackspace}
                    handlePinSubmit={handlePinSubmit}
                    passError={passError}
                  />
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* ستون دوم */}
        <aside style={styles.middlePanel}>
          <div style={styles.panelHeader}>
            <span style={styles.headerLabel}>{activeSection?.title || "---"}</span>
            <div style={styles.headerActiveTitle}>قسمت‌ها</div>
          </div>
          <div style={styles.scrollArea}>
            {units.map((u, i) => (
              <div
                key={u.id}
                onClick={() => handleUnitClick(i)}
                style={styles.navItem(
                  activeUnitIdx === i,
                  lessonColor,
                  collapsed,
                  focusedCol === 1 && focusedIdx[1] === i
                )}
              >
                <div style={styles.statusLight(activeUnitIdx === i, lessonColor)} />
                <span style={styles.collapsedText}>
                  {collapsed ? shortLabel(u.title, 2) : u.title}
                </span>
              </div>
            ))}
          </div>
        </aside>

        {/* ستون سوم */}
        <aside style={styles.thirdColumnPanel(isThirdColumnVisible)}>
          <div style={styles.panelHeader}>
            <span style={styles.headerLabel}>{activeUnit?.title || "---"}</span>
            <div style={styles.headerActiveTitle}>فصل‌ها</div>
          </div>
          <div style={styles.scrollArea}>
            {detailItems.map((item, i) => {
              const isLevelZero = item.depth === 0;
              const isActive = activeDetailId === item.id;
              const isFocused = focusedCol === 2 && focusedIdx[2] === i;

              return (
                <button
                  key={item.id}
                  onClick={() => scrollToItem(item.id)}
                  style={styles.detailItem(isActive, item.depth, lessonColor, isFocused)}
                >
                  <span
                    style={{
                      color: isActive
                        ? lessonColor
                        : isDark
                        ? "#ffffff"
                        : "#0f172a",
                      fontWeight: isLevelZero ? 900 : 600,
                      fontSize: "0.85rem",
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
                      color: isActive
                        ? lessonColor
                        : isDark
                        ? "#ffffff"
                        : "#475569",
                      fontWeight: isActive ? 800 : isLevelZero ? 700 : 500,
                    }}
                  >
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* محتوای اصلی */}
        <main id="main-content-area" style={styles.contentArea}>
          {activeUnit ? (
            <div style={styles.contentWrapper}>
              <header
                style={{
                  marginBottom: 60,
                  borderBottom: `1px solid ${isDark ? "#222" : "#eee"}`,
                  paddingBottom: 30,
                }}
              >
                <h1
                  style={{
                    fontSize: "2rem",
                    fontWeight: 900,
                    marginBottom: 18,
                    lineHeight: 1.45,
                  }}
                >
                  {activeUnit.title}
                </h1>
                {activeUnit.content && <p style={styles.contentText}>{activeUnit.content}</p>}
              </header>

              {renderContentRecursive(activeUnit.children)}
            </div>
          ) : (
            <div style={styles.emptyState}>انتخاب کنید.</div>
          )}
        </main>
      </div>
    </div>
  );
}
