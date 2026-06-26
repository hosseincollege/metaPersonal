import React, { useMemo, useRef, useState, useEffect } from "react";

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
      title: pickText(item.title, item.chapterTitle, item.sectionTitle, item.unitTitle, item.topicTitle, item.subtopicTitle, item.name),
      content: pickText(item.content, item.description, item.body, item.text, item.chapterContent, item.sectionContent, item.unitContent, item.topicContent, item.subtopicContent),
      color: item.color || item.accentColor || item.themeColor || null,
      children,
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
    height: 60,
    padding: "0 20px",
    display: "flex",
    alignItems: "center",
    gap: 12,
    background: isDark ? "#0f0f0f" : "#ffffff",
    borderBottom: isDark ? "1px solid #222" : "1px solid #e2e8f0",
    zIndex: 20,
  },
  toolbarTitle: { flex: 1, margin: 0, fontSize: "1.1rem", fontWeight: 900 },
  iconButton: (active = false, activeColor = "#38bdf8") => ({
    width: 38, height: 38, border: "none", borderRadius: 10, cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: active ? activeColor : isDark ? "#666" : "#94a3b8",
    background: active ? (isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9") : "transparent",
    transition: "0.2s",
  }),
  layoutGrid: { flex: 1, display: "flex", overflow: "hidden" },
  sidePanel: {
    width: collapsed ? 80 : 260,
    background: isDark ? "#0a0a0a" : "#ffffff",
    borderLeft: isDark ? "1px solid #222" : "1px solid #e2e8f0",
    display: "flex", flexDirection: "column", transition: "0.3s ease",
  },
  middlePanel: {
    width: collapsed ? 80 : 260,
    background: isDark ? "#0d0d0d" : "#fcfcfc",
    borderLeft: isDark ? "1px solid #222" : "1px solid #e2e8f0",
    display: "flex", flexDirection: "column", transition: "0.3s ease",
  },
  thirdColumnPanel: (visible) => ({
    width: visible ? (collapsed ? 80 : 280) : 0,
    background: isDark ? "#0a0a0a" : "#ffffff",
    borderLeft: visible ? (isDark ? "1px solid #222" : "1px solid #e2e8f0") : "none",
    display: "flex", flexDirection: "column", overflow: "hidden", opacity: visible ? 1 : 0, transition: "0.3s ease",
  }),
  contentArea: { flex: 1, overflowY: "auto", scrollBehavior: "smooth", background: isDark ? "#080808" : "#ffffff", padding: "40px 60px" },
  panelHeader: {
    padding: "16px", borderBottom: isDark ? "1px solid #222" : "1px solid #e2e8f0",
    background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)",
  },
  headerLabel: { fontSize: "0.7rem", color: "#666", marginBottom: 4, display: "block", fontWeight: 500 },
  headerActiveTitle: { fontSize: "0.9rem", fontWeight: 800, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  scrollArea: { flex: 1, overflowY: "auto", padding: "12px 8px" },
  
  navItem: (active, color) => ({
    padding: "14px 16px", borderRadius: 12, marginBottom: 8, cursor: "pointer",
    background: active ? (isDark ? "rgba(255,255,255,0.06)" : "#f1f5f9") : "transparent",
    color: active ? (isDark ? "#ffffff" : "#0f172a") : isDark ? "#777" : "#64748b",
    fontWeight: active ? 900 : 500, transition: "0.2s", fontSize: "0.95rem",
    display: "flex", alignItems: "center", gap: 10,
  }),
  
  statusLight: (active, color) => ({
    width: 8, height: 8, borderRadius: "50%",
    background: active ? color : (isDark ? "#333" : "#ddd"),
    boxShadow: active ? `0 0 10px ${color}` : "none",
    transition: "0.3s",
  }),

  detailItem: (active, depth, color) => ({
    width: "100%", border: "none", textAlign: "right", cursor: "pointer", marginBottom: 4,
    padding: `10px 12px 10px ${12 + depth * 14}px`, borderRadius: 10,
    background: active ? (isDark ? "rgba(255,255,255,0.06)" : "#f0f9ff") : "transparent",
    color: active ? color : isDark ? "#94a3b8" : "#475569",
    display: "flex", alignItems: "flex-start", gap: 10, transition: "0.2s",
    fontSize: depth === 0 ? "0.95rem" : "0.88rem", fontWeight: active ? 800 : 500,
  }),

  contentWrapper: { maxWidth: 900, margin: "0 auto", paddingBottom: 300 },
  unitHeader: (color) => ({ marginBottom: 50, borderBottom: `1px solid ${isDark ? "#222" : "#eee"}`, paddingBottom: 25 }),
  
  contentBlock: (depth, color) => ({
    scrollMarginTop: 100,
    marginBottom: 40,
    paddingTop: 30,
    borderTop: depth === 0 ? `2px solid ${color}` : `1px solid ${isDark ? "#222" : "#eee"}`,
    paddingRight: depth > 0 ? 25 : 0,
  }),
  
  contentTitleRow: { display: "flex", alignItems: "baseline", gap: 12, marginBottom: 16 },
  contentNumber: (color) => ({ color, fontWeight: 950, fontSize: "1.1rem", direction: "ltr", opacity: 0.8 }),
  contentTitle: (depth, color) => ({
    margin: 0, 
    color: depth === 0 ? color : (isDark ? "#fff" : "#111"),
    fontSize: depth === 0 ? "2rem" : "1.3rem", 
    fontWeight: 950,
    lineHeight: 1.4,
  }),
  contentText: { fontSize: "1.1rem", lineHeight: "2.2", color: isDark ? "#d1d1d1" : "#333", textAlign: "justify", marginTop: 10 },
});

export default function ClassroomSplitTwoD({ lesson, onBack, onSwitchTo3D, theme = "dark" }) {
  const [collapsed, setCollapsed] = useState(false);
  const [isThirdColumnVisible, setIsThirdColumnVisible] = useState(true);
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [activeUnitIdx, setActiveUnitIdx] = useState(0);
  const [activeDetailId, setActiveDetailId] = useState(null);
  
  const contentRefs = useRef({});
  const isDark = theme === "dark";
  const styles = useMemo(() => getThemeStyles(isDark, collapsed), [isDark, collapsed]);

  const lessonColor = lesson?.color || lesson?.accentColor || lesson?.themeColor || "#22c55e";
  const sections = useMemo(() => normalizeRecursive(Array.isArray(lesson) ? lesson : lesson?.sections || lesson?.chapters || []), [lesson]);
  const activeSection = sections[activeSectionIdx] || null;
  const units = activeSection?.children || [];
  const activeUnit = units[activeUnitIdx] || null;
  const detailItems = useMemo(() => flattenTree(activeUnit?.children || []), [activeUnit]);

  // Enhanced Sync Scroll Logic
  useEffect(() => {
    const contentContainer = document.getElementById('main-content-area');
    if (!contentContainer) return;

    const handleScroll = () => {
      const scrollPos = contentContainer.scrollTop + 150;
      let currentId = null;

      for (const id in contentRefs.current) {
        const el = contentRefs.current[id];
        if (el && el.offsetTop <= scrollPos) {
          currentId = id;
        }
      }
      if (currentId && currentId !== activeDetailId) {
        setActiveDetailId(currentId);
      }
    };

    contentContainer.addEventListener('scroll', handleScroll);
    return () => contentContainer.removeEventListener('scroll', handleScroll);
  }, [activeUnit, activeDetailId]);

  const handleSectionClick = (idx) => { setActiveSectionIdx(idx); setActiveUnitIdx(0); setActiveDetailId(null); };
  const handleUnitClick = (idx) => { setActiveUnitIdx(idx); setActiveDetailId(null); };

  const scrollToItem = (id) => {
    setActiveDetailId(id);
    const element = contentRefs.current[id];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const renderContentRecursive = (items, depth = 0, parentNumber = "") => {
    return items.map((item, index) => {
      const number = parentNumber ? `${parentNumber}.${index + 1}` : `${index + 1}`;
      return (
        <section
          key={item.id}
          ref={(el) => (contentRefs.current[item.id] = el)}
          style={styles.contentBlock(depth, lessonColor)}
          dir={detectDir(item.title + item.content)}
        >
          <div style={styles.contentTitleRow}>
            <span style={styles.contentNumber(lessonColor)}>{number}</span>
            <h2 style={styles.contentTitle(depth, lessonColor)}>{item.title}</h2>
          </div>
          {item.content && <p style={styles.contentText}>{item.content}</p>}
          {item.children?.length > 0 && renderContentRecursive(item.children, depth + 1, number)}
        </section>
      );
    });
  };

  return (
    <div style={styles.mainContainer}>
      {/* Toolbar */}
      <div style={styles.topToolbar}>
        {onBack && <button onClick={onBack} style={styles.iconButton()}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>}
        <h2 style={{...styles.toolbarTitle, color: lessonColor}}>{lesson?.title || "کلاس آموزشی"}</h2>
        
        <button onClick={() => setIsThirdColumnVisible(!isThirdColumnVisible)} style={styles.iconButton(isThirdColumnVisible, lessonColor)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/></svg>
        </button>
        <button onClick={() => setCollapsed(!collapsed)} style={styles.iconButton()}>
           <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={collapsed ? "M13 17l5-5-5-5M6 17l5-5-5-5" : "M11 17l-5-5 5-5M18 17l-5-5 5-5"}/></svg>
        </button>
      </div>

      <div style={styles.layoutGrid}>
        {/* Column 1: بخش‌ها */}
        <aside style={styles.sidePanel}>
          <div style={styles.panelHeader}>
            <span style={styles.headerLabel}>ستون اول</span>
            <div style={{...styles.headerActiveTitle, color: lessonColor}}>بخش‌ها</div>
          </div>
          <div style={styles.scrollArea}>
            {sections.map((s, i) => (
              <div key={s.id} onClick={() => handleSectionClick(i)} style={styles.navItem(activeSectionIdx === i, lessonColor)}>
                <div style={styles.statusLight(activeSectionIdx === i, lessonColor)} />
                {!collapsed && <span>{s.title}</span>}
              </div>
            ))}
          </div>
        </aside>

        {/* Column 2: قسمت‌ها */}
        <aside style={styles.middlePanel}>
          <div style={styles.panelHeader}>
            <span style={styles.headerLabel}>{activeSection?.title || "---"}</span>
            <div style={styles.headerActiveTitle}>قسمت‌ها</div>
          </div>
          <div style={styles.scrollArea}>
            {units.map((u, i) => (
              <div key={u.id} onClick={() => handleUnitClick(i)} style={styles.navItem(activeUnitIdx === i, lessonColor)}>
                <div style={styles.statusLight(activeUnitIdx === i, lessonColor)} />
                {!collapsed && <span>{u.title}</span>}
              </div>
            ))}
          </div>
        </aside>

        {/* Column 3: فصل‌ها */}
        <aside style={styles.thirdColumnPanel(isThirdColumnVisible)}>
          <div style={styles.panelHeader}>
            <span style={styles.headerLabel}>{activeUnit?.title || "---"}</span>
            <div style={styles.headerActiveTitle}>فصل‌ها</div>
          </div>
          <div style={styles.scrollArea}>
            {detailItems.length > 0 ? detailItems.map((item) => (
              <button key={item.id} onClick={() => scrollToItem(item.id)} style={styles.detailItem(activeDetailId === item.id, item.depth, lessonColor)}>
                <span style={{color: lessonColor, fontWeight: 900, minWidth: '30px', fontSize: '0.8rem', direction: 'ltr', textAlign: 'left'}}>{item.number}</span>
                <span style={{textAlign: 'right', flex: 1}}>{item.title}</span>
              </button>
            )) : <div style={{padding: 20, fontSize: '0.8rem', color: '#666', textAlign: 'center'}}>موردی یافت نشد.</div>}
          </div>
        </aside>

        {/* Main Content Area */}
        <main id="main-content-area" style={styles.contentArea}>
          {activeUnit ? (
            <div style={styles.contentWrapper}>
              <header style={styles.unitHeader(lessonColor)}>
                <h1 style={{fontSize: '2.8rem', fontWeight: 950, marginBottom: 20, lineHeight: 1.3}}>{activeUnit.title}</h1>
                {activeUnit.content && <p style={styles.contentText}>{activeUnit.content}</p>}
              </header>
              {renderContentRecursive(activeUnit.children)}
            </div>
          ) : (
            <div style={{display: 'grid', placeItems: 'center', height: '100%', color: '#555', fontSize: '1.1rem'}}>لطفاً یک قسمت را برای نمایش محتوا انتخاب کنید.</div>
          )}
        </main>
      </div>
    </div>
  );
}
