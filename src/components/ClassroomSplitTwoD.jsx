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
  iconButton: (active = false, activeColor = "#38bdf8") => ({
    width: 38,
    height: 38,
    border: "none",
    borderRadius: 12,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: active ? activeColor : isDark ? "#999" : "#64748b",
    background: active
      ? isDark
        ? "rgba(255,255,255,0.08)"
        : "#f1f5f9"
      : "transparent",
    transition: "0.2s ease",
  }),
  layoutGrid: {
    flex: 1,
    display: "flex",
    overflow: "hidden",
  },

  // ستون اول و دوم تحت تاثیر collapsed هستند
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

  // ستون سوم عرض ثابت دارد و فقط غیب/ظاهر می‌شود
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
    // پشتیبانی از فایرفاکس
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
    // پشتیبانی از فایرفاکس
    scrollbarColor: isDark ? "#444 #0a0a0a" : "#cbd5e1 #ffffff",
    scrollbarWidth: "thin",
  },

  navItem: (active, color, collapsedMode = false) => ({
    padding: collapsedMode ? "12px 10px" : "12px 14px",
    borderRadius: 12,
    marginBottom: 8,
    cursor: "pointer",
    background: active
      ? isDark
        ? "rgba(255,255,255,0.07)"
        : "#f1f5f9"
      : "transparent",
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

  detailItem: (active, depth, color) => ({
    width: "100%",
    border: "none",
    textAlign: "right",
    cursor: "pointer",
    marginBottom: 4,
    // ایجاد تورفتگی بر اساس عمق (هر مرحله 15 پیکسل)
    padding: `10px ${12 + depth * 15}px 10px 8px`, 
    borderRadius: 10,
    background: active
      ? isDark
        ? "rgba(255,255,255,0.08)"
        : "#f0f9ff"
      : "transparent",
      
    color: active
      ? color
      : (isDark ? "#aaa" : "#475569"),
      
    display: "flex",
    alignItems: "center",
    gap: 10,
    transition: "0.2s",
    fontSize: depth === 0 ? "0.92rem" : "0.85rem",
    fontWeight: active ? 900 : (depth === 0 ? 700 : 500),
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

  const contentRefs = useRef({});
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

        // فاصله المان تا بالای کانتینر اسکرول
        const distance = Math.abs(rect.top - containerRect.top - 120);

        // فقط آیتم‌هایی که وارد محدوده دید شدند
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

    // اجرای اولیه
    handleScroll();

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [activeUnit]);

  const handleSectionClick = (idx) => {
    setActiveSectionIdx(idx);
    setActiveUnitIdx(0);
    setActiveDetailId(null);
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
      {/* 🚀 ساخت یک تگ استایل موقت برای مدیریت استایل اسکرول‌بار مرورگرهای Webkit بر اساس تم */}
      <style>
        {`
          /* تنظیمات اسکرول بار وبکیت برای حالت لایت */
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
            /* تنظیمات اسکرول بار وبکیت برای حالت دارک */
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
          
          {/* ✅ دکمه خروج / بازگشت (قرمز و برجسته) */}
          {onBack && (
            <button
              onClick={onBack}
              title="خروج"
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

          {/* دکمه جمع کردن منو (خنثی) */}
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
                ? (isDark ? "#3f3f46" : "#e4e4e7") 
                : (isDark ? "#27272a" : "#ffffff"),
              color: collapsed 
                ? (isDark ? "#ffffff" : "#18181b") 
                : (isDark ? "#a1a1aa" : "#52525b"),
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

          {/* دکمه ستون سوم (خنثی) */}
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
                ? (isDark ? "#3f3f46" : "#e4e4e7") 
                : (isDark ? "#27272a" : "#ffffff"),
              color: isThirdColumnVisible 
                ? (isDark ? "#ffffff" : "#18181b") 
                : (isDark ? "#a1a1aa" : "#52525b"),
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

          {/* دکمه 3D (خنثی) */}
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
        {/* ستون اول: بخش‌ها (قابل جمع شدن) */}
        <aside style={styles.sidePanel}>
          <div style={styles.panelHeader}>
            <span style={styles.headerLabel}>ستون اول</span>
            <div style={{ ...styles.headerActiveTitle, color: lessonColor }}>
              بخش‌ها
            </div>
          </div>
          <div style={styles.scrollArea}>
            {sections.map((s, i) => (
              <div
                key={s.id}
                onClick={() => handleSectionClick(i)}
                style={styles.navItem(activeSectionIdx === i, lessonColor, collapsed)}
              >
                <div style={styles.statusLight(activeSectionIdx === i, lessonColor)} />
                <span style={styles.collapsedText}>
                  {collapsed ? shortLabel(s.title, 2) : s.title}
                </span>
              </div>
            ))}
          </div>
        </aside>

        {/* ستون دوم: قسمت‌ها (قابل جمع شدن) */}
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
                style={styles.navItem(activeUnitIdx === i, lessonColor, collapsed)}
              >
                <div style={styles.statusLight(activeUnitIdx === i, lessonColor)} />
                <span style={styles.collapsedText}>
                  {collapsed ? shortLabel(u.title, 2) : u.title}
                </span>
              </div>
            ))}
          </div>
        </aside>

        {/* ستون سوم: فصل‌ها (عرض ثابت) */}
        <aside style={styles.thirdColumnPanel(isThirdColumnVisible)}>
          <div style={styles.panelHeader}>
            <span style={styles.headerLabel}>{activeUnit?.title || "---"}</span>
            <div style={styles.headerActiveTitle}>فصل‌ها</div>
          </div>
          <div style={styles.scrollArea}>
            {detailItems.map((item) => {
              const isLevelZero = item.depth === 0;
              const isActive = activeDetailId === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => scrollToItem(item.id)}
                  style={styles.detailItem(isActive, item.depth, lessonColor)}
                >
                  <span
                    style={{
                      color: isActive
                        ? lessonColor
                        : isLevelZero
                          ? (isDark ? "#ffffff" : "#0f172a")
                          : (isDark ? "#888" : "#64748b"),

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
                          ? (isDark ? "#ffffff" : "#0f172a")
                          : (isDark ? "#aaa" : "#475569"),
                      fontWeight: isActive ? 800 : (isLevelZero ? 700 : 500)
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
                {activeUnit.content && (
                  <p style={styles.contentText}>{activeUnit.content}</p>
                )}
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
