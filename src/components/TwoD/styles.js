// File: E:\metaPersonal\src\components\TwoD\styles.js

export const getThemeStyles = (isDark, collapsed) => ({
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
    position: "relative",
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
    transform: visible ? "translateX(0)" : "translateX(12px)",
    transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease, transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
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
    width: "100%",
    padding: collapsedMode ? "12px 10px" : "12px 14px",
    borderRadius: 12,
    marginBottom: 8,
    cursor: "pointer",
    userSelect: "text",
    WebkitUserSelect: "text",
    WebkitTapHighlightColor: "transparent",
    background: active
      ? isDark
        ? "rgba(255,255,255,0.05)"
        : "#f8fafc"
      : isFocused
      ? isDark
        ? "rgba(255,255,255,0.03)"
        : "#f1f5f9"
      : "transparent",
    border: isFocused
      ? `1px solid ${color}`
      : "1px solid transparent",
    boxShadow: isFocused ? `0 0 0 1px ${color}22, 0 0 10px ${color}18` : "none",
    color: active ? color : isDark ? "#ffffff" : "#0f172a",
    fontWeight: active ? 850 : 600,
    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    fontSize: collapsedMode ? "0.82rem" : "0.92rem",
    display: "flex",
    alignItems: "center",
    gap: collapsedMode ? 8 : 12,
    lineHeight: 1.7,
    textAlign: "right",
  }),

  statusLight: (active, color) => ({
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: active ? color : isDark ? "#2a2a2a" : "#e2e8f0",
    boxShadow: active ? `0 0 12px ${color}` : "none",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    flexShrink: 0,
  }),

  collapsedText: {
    flex: 1,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    textAlign: "right",
    userSelect: "text",
    WebkitUserSelect: "text",
    transition: "opacity 0.2s ease",
  },

  detailItem: (active, depth, color, isFocused = false) => ({
    width: "100%",
    appearance: "none",
    WebkitAppearance: "none",
    backgroundClip: "padding-box",
    outline: "none",
    textAlign: "right",
    cursor: "pointer",
    marginBottom: 6,
    padding: `10px ${12 + depth * 15}px 10px 8px`,
    borderRadius: 10,
    border: isFocused
      ? `1px solid ${color}`
      : "1px solid transparent",
    background: active
      ? `${color}12`
      : isFocused
      ? isDark
        ? "rgba(255,255,255,0.03)"
        : "#f8fafc"
      : "transparent",
    boxShadow: isFocused ? `0 0 0 1px ${color}22, 0 0 8px ${color}18` : "none",
    color: active ? color : isDark ? "#ffffff" : "#0f172a",
    display: "flex",
    alignItems: "center",
    gap: 10,
    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
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
    transition: "border-color 0.3s ease",
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
