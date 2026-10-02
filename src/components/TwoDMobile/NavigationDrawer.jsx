// NavigationDrawer.jsx
import React from "react";

export default function NavigationDrawer({
  drawerOpen,
  setDrawerOpen,
  drawerTab,
  setDrawerTab,
  lessonTitle,
  lessonColor,
  isDark,
  sections,
  activeSectionIdx,
  handleSectionSelect,
  activeSection,
  units,
  activeUnitIdx,
  handleUnitSelect,
  activeUnit,
  detailItems,
  activeDetailId,
  scrollToDetailItem,
}) {
  if (!drawerOpen) return null;

  return (
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
              {lessonTitle || "سرفصل‌ها"}
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
  );
}
