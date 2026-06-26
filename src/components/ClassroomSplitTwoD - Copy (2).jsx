import React, { useMemo, useRef, useState, useEffect, useCallback } from "react";

// --- توابع کمکی بهینه شده ---
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
    // تجمیع تمام فیلدهای احتمالی فرزندان در یک آرایه واحد
    const childrenRaw = [
      ...(item.chapters || []), ...(item.sections || []), 
      ...(item.units || []), ...(item.topics || []), 
      ...(item.subtopics || []), ...(item.details || []), 
      ...(item.items || []), ...(item.children || [])
    ];

    return {
      id,
      title: pickText(item.title, item.chapterTitle, item.sectionTitle, item.unitTitle, item.topicTitle, item.subtopicTitle, item.name),
      content: pickText(item.content, item.description, item.body, item.text, item.chapterContent, item.sectionContent, item.unitContent, item.topicContent, item.subtopicContent),
      color: item.color || item.accentColor || item.themeColor || null,
      children: normalizeRecursive(childrenRaw, id),
      raw: item,
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

const getDepthColor = (depth, lessonColor, isDark) => {
  const colors = [lessonColor, "#22c55e", "#f59e0b", "#a855f7", "#ef4444", "#06b6d4"];
  return colors[depth % colors.length] || (isDark ? "#94a3b8" : "#475569");
};

// --- استایل‌ها (انتقال به تابعی که فقط در تغییر تم اجرا شود) ---
const getThemeStyles = (isDark, collapsed) => ({
  mainContainer: {
    width: "100vw",
    height: "100vh",
    backgroundColor: isDark ? "#0a0a0a" : "#f1f5f9",
    display: "flex",
    flexDirection: "column",
    color: isDark ? "#e2e8f0" : "#0f172a",
    direction: "rtl",
    fontFamily: "system-ui, -apple-system, Vazirmatn, sans-serif",
    overflow: "hidden",
  },
  topToolbar: {
    height: 64,
    padding: "0 20px",
    display: "flex",
    alignItems: "center",
    gap: 12,
    background: isDark ? "rgba(20,20,20,0.8)" : "rgba(255,255,255,0.8)",
    borderBottom: `1px solid ${isDark ? "#222" : "#e2e8f0"}`,
    backdropFilter: "blur(12px)",
    zIndex: 100,
  },
  toolbarTitle: {
    flex: 1,
    margin: 0,
    fontSize: "1.1rem",
    fontWeight: 800,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  iconButton: (active = false, activeColor = "#38bdf8") => ({
    width: 40,
    height: 40,
    border: "none",
    borderRadius: 12,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: active ? activeColor : isDark ? "#94a3b8" : "#64748b",
    background: active ? (isDark ? "rgba(56,189,248,0.15)" : "rgba(56,189,248,0.1)") : "transparent",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    outline: "none",
    ":hover": { background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }
  }),
  layoutGrid: {
    flex: 1,
    display: "flex",
    overflow: "hidden",
  },
  sidePanel: {
    width: collapsed ? 80 : 280,
    background: isDark ? "#121212" : "#ffffff",
    borderLeft: `1px solid ${isDark ? "#222" : "#e2e8f0"}`,
    display: "flex",
    flexDirection: "column",
    transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  middlePanel: {
    width: collapsed ? 0 : 280, // در حالت جمع شده، پنل میانی را می‌توان مخفی کرد یا کوچک کرد
    opacity: collapsed ? 0 : 1,
    background: isDark ? "#161616" : "#f8fafc",
    borderLeft: collapsed ? "none" : `1px solid ${isDark ? "#222" : "#e2e8f0"}`,
    display: "flex",
    flexDirection: "column",
    transition: "all 0.3s ease",
    overflow: "hidden",
  },
  thirdColumnPanel: (visible) => ({
    width: visible ? 320 : 0,
    background: isDark ? "#0f0f0f" : "#ffffff",
    borderLeft: visible ? `1px solid ${isDark ? "#222" : "#e2e8f0"}` : "none",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s",
    opacity: visible ? 1 : 0,
  }),
  contentArea: {
    flex: 1,
    overflowY: "auto",
    scrollBehavior: "smooth",
    background: isDark ? "#0a0a0a" : "#ffffff",
    padding: "40px",
  },
  panelHeader: {
    height: 56,
    padding: "0 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: `1px solid ${isDark ? "#222" : "#e2e8f0"}`,
    fontWeight: 700,
    fontSize: "0.9rem",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  scrollArea: {
    flex: 1,
    overflowY: "auto",
    padding: "12px 8px",
  },
  navItem: (active, color) => ({
    padding: "12px 16px",
    borderRadius: 12,
    marginBottom: 4,
    cursor: "pointer",
    background: active ? (isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9") : "transparent",
    borderRight: `4px solid ${active ? color : "transparent"}`,
    color: active ? (isDark ? "#fff" : "#000") : isDark ? "#71717a" : "#64748b",
    fontWeight: active ? 700 : 500,
    fontSize: "0.9rem",
    transition: "0.2s",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }),
  detailItem: (active, depth, color) => ({
    width: "100%",
    border: "none",
    textAlign: "right",
    cursor: "pointer",
    padding: "10px 12px",
    paddingRight: 12 + depth * 16,
    borderRadius: 10,
    background: active ? (isDark ? "rgba(56,189,248,0.1)" : "rgba(14,165,233,0.05)") : "transparent",
    color: active ? color : isDark ? "#94a3b8" : "#475569",
    display: "flex",
    gap: 10,
    transition: "0.2s",
    position: "relative",
    fontSize: "0.85rem",
  }),
  contentBlock: (depth, color) => ({
    marginBottom: 40,
    padding: "24px",
    borderRadius: 20,
    background: depth === 0 ? (isDark ? "rgba(255,255,255,0.02)" : "#fcfcfc") : "transparent",
    borderRight: `5px solid ${color}`,
    boxShadow: depth === 0 && !isDark ? "0 4px 6px -1px rgba(0,0,0,0.05)" : "none",
  }),
  contentText: {
    fontSize: "1.1rem",
    lineHeight: "2.2",
    color: isDark ? "#d1d5db" : "#374151",
    textAlign: "justify",
    marginTop: 16
  }
});

export default function ClassroomSplitTwoD({ lesson, onBack, onSwitchTo3D, theme = "dark" }) {
  const [collapsed, setCollapsed] = useState(false);
  const [isThirdColumnVisible, setIsThirdColumnVisible] = useState(true);
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [activeUnitIdx, setActiveUnitIdx] = useState(0);
  const [activeDetailId, setActiveDetailId] = useState(null);

  const contentRefs = useRef({});
  const observer = useRef(null);

  const isDark = theme === "dark";
  const styles = useMemo(() => getThemeStyles(isDark, collapsed), [isDark, collapsed]);

  const sections = useMemo(() => normalizeRecursive(Array.isArray(lesson) ? lesson : (lesson?.sections || lesson?.chapters || [])), [lesson]);
  const activeSection = sections[activeSectionIdx] || null;
  const units = activeSection?.children || [];
  const activeUnit = units[activeUnitIdx] || null;
  const detailItems = useMemo(() => flattenTree(activeUnit?.children || []), [activeUnit]);

  const lessonColor = lesson?.color || "#38bdf8";

  // --- سیستم تشخیص اسکرول (Intersection Observer) ---
  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setActiveDetailId(entry.target.id);
          }
        });
      },
      { threshold: [0.5], rootMargin: "-10% 0px -70% 0px" }
    );

    Object.values(contentRefs.current).forEach((el) => {
      if (el) observer.current.observe(el);
    });

    return () => observer.current?.disconnect();
  }, [activeUnit]);

  const scrollToItem = (id) => {
    setActiveDetailId(id);
    const element = contentRefs.current[id];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const renderContentRecursive = useCallback((items, depth = 0, parentNumber = "") => {
    return items.map((item, index) => {
      const number = parentNumber ? `${parentNumber}.${index + 1}` : `${index + 1}`;
      const color = item.color || getDepthColor(depth, lessonColor, isDark);
      
      return (
        <section
          key={item.id}
          id={item.id}
          ref={(el) => (contentRefs.current[item.id] = el)}
          style={styles.contentBlock(depth, color)}
          dir={detectDir(item.title + item.content)}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ color, fontWeight: 900, fontFamily: "monospace", fontSize: "1.2rem" }}>{number}</span>
            <h2 style={{ margin: 0, fontSize: depth === 0 ? "1.6rem" : "1.3rem", color }}>{item.title}</h2>
          </div>
          {item.content && <p style={styles.contentText}>{item.content}</p>}
          {item.children?.length > 0 && (
            <div style={{ marginTop: 24, borderRight: `1px solid ${isDark ? "#222" : "#eee"}`, paddingRight: 16 }}>
              {renderContentRecursive(item.children, depth + 1, number)}
            </div>
          )}
        </section>
      );
    });
  }, [isDark, lessonColor, styles]);

  return (
    <div style={styles.mainContainer}>
      {/* Toolbar */}
      <header style={styles.topToolbar}>
        {onBack && (
          <button onClick={onBack} style={styles.iconButton(false)}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <h1 style={styles.toolbarTitle}>{pickText(lesson?.title, "کلاس آموزشی")}</h1>
        
        <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setIsThirdColumnVisible(!isThirdColumnVisible)} style={styles.iconButton(isThirdColumnVisible, lessonColor)}>
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <button onClick={() => setCollapsed(!collapsed)} style={styles.iconButton(false)}>
               {collapsed ? "»" : "«"}
            </button>
        </div>
      </header>

      <div style={styles.layoutGrid}>
        {/* پنل اول: سرفصل‌ها */}
        <aside style={styles.sidePanel}>
          <div style={styles.panelHeader}>فصل‌ها</div>
          <div style={styles.scrollArea}>
            {sections.map((s, i) => (
              <div key={s.id} onClick={() => { setActiveSectionIdx(i); setActiveUnitIdx(0); }} style={styles.navItem(activeSectionIdx === i, lessonColor)}>
                {collapsed ? i + 1 : s.title}
              </div>
            ))}
          </div>
        </aside>

        {/* پنل دوم: واحدها */}
        <aside style={styles.middlePanel}>
          <div style={styles.panelHeader}>واحدها</div>
          <div style={styles.scrollArea}>
            {units.map((u, i) => (
              <div key={u.id} onClick={() => setActiveUnitIdx(i)} style={styles.navItem(activeUnitIdx === i, lessonColor)}>
                {u.title}
              </div>
            ))}
          </div>
        </aside>

        {/* پنل سوم: فهرست درختی جزئیات */}
        <aside style={styles.thirdColumnPanel(isThirdColumnVisible)}>
          <div style={styles.panelHeader}>جزئیات محتوا</div>
          <div style={styles.scrollArea}>
            {detailItems.map((item) => (
              <button key={item.id} onClick={() => scrollToItem(item.id)} style={styles.detailItem(activeDetailId === item.id, item.depth, item.color || getDepthColor(item.depth, lessonColor, isDark))}>
                <span style={{ opacity: 0.6, fontSize: '0.7rem' }}>{item.number}</span>
                <span style={{ fontWeight: activeDetailId === item.id ? 800 : 400 }}>{item.title}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* محتوای اصلی */}
        <main style={styles.contentArea}>
          {activeUnit ? (
            <div style={{ maxWidth: 850, margin: "0 auto" }}>
              <header style={{ marginBottom: 48, borderBottom: `3px solid ${lessonColor}`, paddingBottom: 24 }}>
                <h1 style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: 16 }}>{activeUnit.title}</h1>
                <p style={{ ...styles.contentText, opacity: 0.8 }}>{activeUnit.content}</p>
              </header>
              {renderContentRecursive(activeUnit.children || [])}
            </div>
          ) : (
            <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#666" }}>
              واحدی انتخاب نشده است
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
