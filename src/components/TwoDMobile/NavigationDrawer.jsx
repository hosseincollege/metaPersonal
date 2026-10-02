// File: E:\metaPersonal\src\components\TwoDMobile\NavigationDrawer.jsx

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
  onlySubtopics = false,
  setOnlySubtopics = () => {},
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
        background: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        animation: "drawerBackdropFade 0.28s cubic-bezier(0.4, 0, 0.2, 1) forwards",
      }}
      onClick={() => setDrawerOpen(false)}
    >
      <style>{`
        @keyframes drawerBackdropFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes drawerSlideLeft {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        .drawer-interactive-btn {
          transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.2s ease, opacity 0.2s ease;
        }

        .drawer-interactive-btn:active {
          transform: scale(0.96);
        }

        /* انیمیشن آکاردئونی باز و بسته شدن زیرفصل‌ها */
        .subtopic-item-wrapper {
          display: grid;
          transition: grid-template-rows 0.32s cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 0.25s ease,
                      transform 0.32s cubic-bezier(0.4, 0, 0.2, 1),
                      margin 0.32s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .subtopic-item-wrapper.is-open {
          grid-template-rows: 1fr;
          opacity: 1;
          transform: translateY(0);
          margin-bottom: 6px;
        }

        .subtopic-item-wrapper.is-hidden {
          grid-template-rows: 0fr;
          opacity: 0;
          transform: translateY(-8px);
          margin-bottom: 0;
          pointer-events: none;
        }

        .subtopic-item-inner {
          overflow: hidden;
        }
      `}</style>

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
          animation: "drawerSlideLeft 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards",
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
            className="drawer-interactive-btn"
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
              className="drawer-interactive-btn"
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
          {/* تب بخش‌ها */}
          {drawerTab === "sections" && (
            <div>
              {sections.map((s, i) => {
                const isActive = activeSectionIdx === i;
                return (
                  <div
                    key={s.id}
                    onClick={() => handleSectionSelect(i)}
                    className="drawer-interactive-btn"
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
                        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
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

          {/* تب قسمت‌ها */}
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
                    className="drawer-interactive-btn"
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
                        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
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

          {/* تب فصل‌ها */}
          {drawerTab === "topics" && (
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 12,
                  padding: "0 4px",
                }}
              >
                <span
                  style={{
                    fontSize: "0.72rem",
                    color: "#777",
                    fontWeight: 600,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "60%",
                  }}
                >
                  قسمت: {activeUnit?.title || "---"}
                </span>

                {/* دکمه فیلتر سرفصل‌های اصلی با انیمیشن چرخش آیکون */}
                <button
                  onClick={() => setOnlySubtopics(!onlySubtopics)}
                  className="drawer-interactive-btn"
                  title={onlySubtopics ? "نمایش همه" : "فقط سرفصل‌های اصلی"}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "4px 8px",
                    borderRadius: 8,
                    border: `1px solid ${isDark ? "#27272a" : "#e2e8f0"}`,
                    background: onlySubtopics
                      ? (isDark ? "#3f3f46" : "#e4e4e7")
                      : (isDark ? "#18181b" : "#ffffff"),
                    color: onlySubtopics
                      ? (isDark ? "#ffffff" : "#18181b")
                      : (isDark ? "#a1a1aa" : "#64748b"),
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  <span>{onlySubtopics ? "همه جزئیات" : "فقط سرفصل‌ها"}</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      transform: onlySubtopics ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    {onlySubtopics ? (
                      <>
                        <line x1="4" y1="6" x2="20" y2="6" />
                        <line x1="4" y1="12" x2="20" y2="12" />
                        <line x1="4" y1="18" x2="20" y2="18" />
                      </>
                    ) : (
                      <>
                        <line x1="4" y1="6" x2="20" y2="6" />
                        <line x1="4" y1="12" x2="14" y2="12" />
                        <line x1="4" y1="18" x2="10" y2="18" />
                      </>
                    )}
                  </svg>
                </button>
              </div>

              {detailItems.map((item) => {
                const isLevelZero = item.depth === 0;
                const isActive = activeDetailId === item.id;
                const isVisible = !onlySubtopics || isLevelZero;

                return (
                  <div
                    key={item.id}
                    className={`subtopic-item-wrapper ${isVisible ? "is-open" : "is-hidden"}`}
                  >
                    <div className="subtopic-item-inner">
                      <button
                        onClick={() => scrollToDetailItem(item.id)}
                        className="drawer-interactive-btn"
                        style={{
                          width: "100%",
                          appearance: "none",
                          border: "none",
                          outline: "none",
                          textAlign: "right",
                          cursor: "pointer",
                          marginBottom: 0,
                          padding: `10px ${12 + item.depth * 14}px 10px 8px`,
                          borderRadius: 10,
                          background: isActive ? `${lessonColor}15` : "transparent",
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
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
