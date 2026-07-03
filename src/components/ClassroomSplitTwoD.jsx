import React, { useMemo, useRef, useState, useEffect } from "react";

// توابع کمکی برای پردازش متن و تشخیص جهت
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

const getThemeStyles = (isDark, collapsed) => ({
  mainContainer: {
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
  },
  topToolbar: {
    height: 64,
    padding: "0 24px",
    display: "flex",
    alignItems: "center",
    gap: 16,
    background: isDark ? "#0f0f0f" : "#ffffff",
    borderBottom: isDark ? "1px solid #222" : "1px solid #e2e8f0",
    zIndex: 20,
    flexDirection: "row",
  },
  toolbarTitle: {
    flex: 1,
    margin: 0,
    fontSize: "1.08rem",
    fontWeight: 900,
    textAlign: "right",
  },
  layoutGrid: {
    flex: 1,
    display: "flex",
    overflow: "hidden",
  },

  sidePanel: {
    width: collapsed ? 80 : 250,
    background: isDark ? "#0a0a0a" : "#ffffff",
    borderLeft: isDark ? "1px solid #222" : "1px solid #e2e8f0",
    display: "flex",
    flexDirection: "column",
    transition: "0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  middlePanel: {
    width: collapsed ? 80 : 240,
    background: isDark ? "#0d0d0d" : "#fcfcfc",
    borderLeft: isDark ? "1px solid #222" : "1px solid #e2e8f0",
    display: "flex",
    flexDirection: "column",
    transition: "0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  },

  thirdColumnPanel: (visible) => ({
    width: visible ? 240 : 0,
    background: isDark ? "#0a0a0a" : "#ffffff",
    borderLeft: visible ? (isDark ? "1px solid #222" : "1px solid #e2e8f0") : "none",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    opacity: visible ? 1 : 0,
    transition: "0.3s ease",
  }),

  contentArea: {
    flex: 1,
    overflowY: "auto",
    scrollBehavior: "smooth",
    background: isDark ? "#080808" : "#ffffff",
    padding: "40px 30px",
    scrollbarColor: isDark ? "#444 #080808" : "#cbd5e1 #ffffff",
    scrollbarWidth: "thin",
  },
  panelHeader: {
    padding: "14px 16px",
    borderBottom: isDark ? "1px solid #222" : "1px solid #e2e8f0",
    minHeight: 64,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  headerLabel: {
    fontSize: "0.68rem",
    color: "#777",
    marginBottom: 4,
    display: "block",
    fontWeight: 600,
  },
  headerActiveTitle: {
    fontSize: "0.88rem",
    fontWeight: 800,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    lineHeight: 1.5,
  },

  scrollArea: {
    flex: 1,
    overflowY: "auto",
    padding: "12px 8px",
    scrollbarColor: isDark ? "#444 #0a0a0a" : "#cbd5e1 #ffffff",
    scrollbarWidth: "thin",
  },

  navItem: (active, color, collapsedMode = false, isFocused = false) => ({
    padding: collapsedMode ? "12px 10px" : "12px 14px",
    borderRadius: 12,
    marginBottom: 8,
    cursor: "pointer",
    userSelect: "none",
    WebkitTapHighlightColor: "transparent",
    background: active
      ? isDark
        ? "rgba(255,255,255,0.07)"
        : "#f1f5f9"
      : isFocused
      ? isDark
        ? "rgba(255,255,255,0.03)"
        : "#f8fafc"
      : "transparent",
    border: isFocused ? `1px solid ${color}aa` : "1px solid transparent",
    boxShadow: isFocused ? `0 0 8px ${color}44` : "none",
    color: active ? (isDark ? "#ffffff" : "#0f172a") : isDark ? "#888" : "#64748b",
    fontWeight: active ? 850 : 600,
    transition: "0.2s",
    fontSize: collapsedMode ? "0.82rem" : "0.92rem",
    display: "flex",
    alignItems: "center",
    gap: collapsedMode ? 8 : 12,
    lineHeight: 1.7,
  }),

  statusLight: (active, color) => ({
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: active ? color : isDark ? "#2a2a2a" : "#e2e8f0",
    boxShadow: active ? `0 0 12px ${color}` : "none",
    transition: "0.4s",
    flexShrink: 0,
  }),

  collapsedText: {
    flex: 1,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "clip",
    textAlign: "right",
  },

  detailItem: (active, depth, color, isFocused = false) => ({
    width: "100%",
    border: isFocused ? `1px solid ${color}aa` : "1px solid transparent",
    boxShadow: isFocused ? `0 0 8px ${color}44` : "none",
    textAlign: "right",
    cursor: "pointer",
    marginBottom: 4,
    padding: `10px ${12 + depth * 15}px 10px 8px`,
    borderRadius: 10,
    background: active
      ? isDark
        ? "rgba(255,255,255,0.08)"
        : "#f0f9ff"
      : isFocused
      ? isDark
        ? "rgba(255,255,255,0.03)"
        : "#f8fafc"
      : "transparent",
    color: active ? color : isDark ? "#aaa" : "#475569",
    display: "flex",
    alignItems: "center",
    gap: 10,
    transition: "0.2s",
    fontSize: depth === 0 ? "0.92rem" : "0.85rem",
    fontWeight: active ? 900 : depth === 0 ? 700 : 500,
    lineHeight: 1.6,
  }),

  contentWrapper: {
    maxWidth: 1000,
    margin: "0 auto",
    paddingBottom: 30,
  },

  contentBlock: (depth, color) => ({
    scrollMarginTop: 100,
    marginBottom: 50,
    paddingTop: 35,
    borderTop: depth === 0 ? `2px solid ${color}` : `1px solid ${isDark ? "#222" : "#eee"}`,
    paddingRight: depth > 0 ? 30 : 0,
  }),

  contentTitleRow: {
    display: "flex",
    alignItems: "baseline",
    gap: 14,
    marginBottom: 20,
  },

  contentNumber: (color) => ({
    color,
    fontWeight: 950,
    fontSize: "1.1rem",
    direction: "ltr",
    opacity: 0.9,
    flexShrink: 0,
  }),

  contentTitle: (depth, color) => ({
    margin: 0,
    color: depth === 0 ? color : isDark ? "#fff" : "#111",
    fontSize: depth === 0 ? "1.45rem" : "1.08rem",
    fontWeight: 900,
    lineHeight: 1.6,
  }),

  contentText: {
    fontSize: "1.05rem",
    lineHeight: "2.25",
    color: isDark ? "#cfcfcf" : "#333",
    textAlign: "justify",
    marginTop: 12,
    whiteSpace: "pre-line",
  },

  emptyState: {
    display: "grid",
    placeItems: "center",
    height: "100%",
    color: "#555",
    fontSize: "1rem",
  },
});

export default function ClassroomSplitTwoD({
  lesson,
  onBack,
  onSwitchTo3D,
  theme = "dark",
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [isThirdColumnVisible, setIsThirdColumnVisible] = useState(true);
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [activeUnitIdx, setActiveUnitIdx] = useState(0);
  const [activeDetailId, setActiveDetailId] = useState(null);

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

  const isDark = theme === "dark";
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
                background: "#ef4444",
                color: "#ffffff",
                boxShadow: "0 2px 8px rgba(239, 68, 68, 0.4)",
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
                  <div
                    ref={keypadRef}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      position: "absolute",
                      top: "110%",
                      right: collapsed ? "10px" : "20px",
                      zIndex: 1000,
                      background: isDark
                        ? "rgba(10, 10, 10, 0.78)"
                        : "rgba(255, 255, 255, 0.82)",
                      backdropFilter: "blur(18px)",
                      WebkitBackdropFilter: "blur(18px)",
                      border: `1px solid ${
                        isDark
                          ? "rgba(255, 255, 255, 0.04)"
                          : "rgba(0, 0, 0, 0.06)"
                      }`,
                      borderRadius: "22px",
                      padding: "14px 12px",
                      width: "150px",
                      boxShadow: isDark
                        ? "0 18px 38px rgba(0, 0, 0, 0.34)"
                        : "0 18px 38px rgba(0, 0, 0, 0.10)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
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
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            border: `1px solid ${
                              isDark
                                ? "rgba(255,255,255,0.08)"
                                : "rgba(0,0,0,0.08)"
                            }`,
                            background: isDark
                              ? "rgba(255,255,255,0.02)"
                              : "rgba(0,0,0,0.02)",
                            color: isDark ? "#9ca3af" : "#4b5563",
                            fontSize: "13px",
                            fontFamily: "monospace",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            outline: "none",
                            userSelect: "none",
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
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          border: "none",
                          background: "transparent",
                          color: isDark ? "#6b7280" : "#9ca3af",
                          fontSize: "10px",
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
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          border: `1px solid ${
                            isDark
                              ? "rgba(255,255,255,0.08)"
                              : "rgba(0,0,0,0.08)"
                          }`,
                          background: isDark
                            ? "rgba(255,255,255,0.02)"
                            : "rgba(0,0,0,0.02)",
                          color: isDark ? "#9ca3af" : "#4b5563",
                          fontSize: "13px",
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
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          border: `1px solid ${
                            isDark
                              ? "rgba(255,255,255,0.14)"
                              : "rgba(0,0,0,0.14)"
                          }`,
                          background: isDark
                            ? "rgba(255,255,255,0.05)"
                            : "rgba(0,0,0,0.04)",
                          color: isDark ? "#d1d5db" : "#111827",
                          fontSize: "10px",
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

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "4px",
                        width: "100%",
                        minHeight: "18px",
                      }}
                    >
                      {passError && (
                        <span
                          style={{
                            fontSize: "9px",
                            color: "rgba(239,68,68,0.8)",
                            fontFamily: "monospace",
                            letterSpacing: "0.4px",
                          }}
                        >
                          ACCESS DENIED
                        </span>
                      )}
                    </div>
                  </div>
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
                        : isLevelZero
                        ? isDark
                          ? "#ffffff"
                          : "#0f172a"
                        : isDark
                        ? "#888"
                        : "#64748b",
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
                        : isLevelZero
                        ? isDark
                          ? "#ffffff"
                          : "#0f172a"
                        : isDark
                        ? "#aaa"
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
