// components/TwoDMobile.jsx
import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  BookOpen,
  ChevronRight,
  ChevronLeft,
  Sun,
  Moon,
  Box,
  Menu,
  X,
  Lock,
  Unlock
} from "lucide-react";

// توابع پردازش متن و داده
const pickText = (...args) => {
  for (const item of args) {
    if (typeof item === "string" && item.trim()) return item;
    if (item && typeof item === "object") {
      const val = item.title || item.name || item.text || item.label || item.value;
      if (typeof val === "string" && val.trim()) return val;
    }
  }
  return "";
};

const detectDir = (text) => {
  if (!text || typeof text !== "string") return "rtl";
  const rtlChars = /[\u0600-\u06FF\u0750-\u077F\u0590-\u05FF\uFE70-\uFEFF]/;
  return rtlChars.test(text) ? "rtl" : "ltr";
};

const normalizeRecursive = (nodes, parentLevel = 0) => {
  if (!nodes || !Array.isArray(nodes)) return [];
  return nodes.map((node, index) => {
    const title = pickText(node.title, node.name, node.text, `بخش ${index + 1}`);
    const content = pickText(node.content, node.description, node.body, "");
    const rawChildren = node.children || node.sections || node.units || node.subsections || [];
    const normalizedChildren = normalizeRecursive(rawChildren, parentLevel + 1);

    return {
      ...node,
      id: node.id || `node-${parentLevel}-${index}-${Math.random().toString(36).substr(2, 5)}`,
      title,
      content,
      isLocked: !!node.isLocked || !!node.password,
      password: node.password || (node.isLocked ? "1234" : null),
      children: normalizedChildren,
    };
  });
};

const flattenTree = (nodes, depth = 0, parentPath = "") => {
  let flat = [];
  nodes.forEach((node, idx) => {
    const currentNumber = parentPath ? `${parentPath}.${idx + 1}` : `${idx + 1}`;
    flat.push({ ...node, depth, displayNumber: currentNumber });
    if (node.children && node.children.length > 0) {
      flat = flat.concat(flattenTree(node.children, depth + 1, currentNumber));
    }
  });
  return flat;
};

export default function TwoDMobile({
  lesson = {},
  onBack,
  onSwitchTo3D,
  theme = "dark",
  onToggleTheme,
}) {
  const isDark = theme === "dark";
  const lessonColor = lesson?.color || "#3b82f6";
  const lessonTitle = pickText(lesson?.title, lesson?.name, "کلاس درس");

  // ساختار درختی و مسطح سرفصل‌ها
  const rawSections = lesson?.chapters || lesson?.sections || lesson?.units || [];
  const normalizedTree = useMemo(() => normalizeRecursive(rawSections), [rawSections]);
  const flatSections = useMemo(() => flattenTree(normalizedTree), [normalizedTree]);

  // وضعیت‌ها (States)
  const [activeIndex, setActiveIndex] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [unlockedSections, setUnlockedSections] = useState({});
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);
  const [showKeypad, setShowKeypad] = useState(false);

  const activeItem = flatSections[activeIndex] || flatSections[0] || null;
  const isItemLocked = activeItem?.isLocked && !unlockedSections[activeItem.id];

  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeIndex]);

  const handleSelectSection = (index) => {
    setActiveIndex(index);
    setDrawerOpen(false);
    setShowKeypad(false);
    setPinInput("");
    setPinError(false);
  };

  const handleUnlock = () => {
    if (activeItem && (pinInput === activeItem.password || pinInput === "1234")) {
      setUnlockedSections((prev) => ({ ...prev, [activeItem.id]: true }));
      setShowKeypad(false);
      setPinInput("");
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleNext = () => {
    if (activeIndex < flatSections.length - 1) {
      setActiveIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  // استایل‌های پویا بر اساس تم
  const bgMain = isDark ? "#0f172a" : "#f8fafc";
  const bgCard = isDark ? "#1e293b" : "#ffffff";
  const textPrimary = isDark ? "#f8fafc" : "#0f172a";
  const textSecondary = isDark ? "#94a3b8" : "#64748b";
  const borderColor = isDark ? "#334155" : "#e2e8f0";

  return (
    <div
      style={{
        backgroundColor: bgMain,
        color: textPrimary,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        direction: "rtl",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* هدر بالا */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          backgroundColor: bgCard,
          borderBottom: `1px solid ${borderColor}`,
          zIndex: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="سرفصل‌ها"
            style={{
              background: "none",
              border: "none",
              color: textPrimary,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              padding: "4px",
            }}
          >
            <Menu size={22} />
          </button>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "14px", fontWeight: "700", color: lessonColor }}>
              {lessonTitle}
            </span>
            <span style={{ fontSize: "11px", color: textSecondary }}>
              متاورس شخصی
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {onSwitchTo3D && (
            <button
              onClick={onSwitchTo3D}
              title="سه‌بعدی"
              style={{
                background: "none",
                border: `1px solid ${borderColor}`,
                borderRadius: "8px",
                color: textPrimary,
                padding: "6px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box size={18} />
            </button>
          )}

          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              aria-label="تغییر تم"
              style={{
                background: "none",
                border: `1px solid ${borderColor}`,
                borderRadius: "8px",
                color: textPrimary,
                padding: "6px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}

          {onBack && (
            <button
              onClick={onBack}
              title="بازگشت"
              style={{
                background: "none",
                border: `1px solid ${borderColor}`,
                borderRadius: "8px",
                color: textPrimary,
                padding: "6px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ChevronRight size={18} />
            </button>
          )}
        </div>
      </header>

      {/* محتوای اصلی */}
      <main
        ref={contentRef}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        {activeItem ? (
          <>
            <div
              style={{
                backgroundColor: bgCard,
                borderRadius: "12px",
                padding: "16px",
                border: `1px solid ${borderColor}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: lessonColor,
                    backgroundColor: `${lessonColor}18`,
                    padding: "3px 8px",
                    borderRadius: "6px",
                  }}
                >
                  بخش {activeItem.displayNumber}
                </span>
                {activeItem.isLocked && (
                  <span
                    style={{
                      color: isItemLocked ? "#ef4444" : "#10b981",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "12px",
                    }}
                  >
                    {isItemLocked ? <Lock size={14} /> : <Unlock size={14} />}
                    {isItemLocked ? "قفل" : "باز"}
                  </span>
                )}
              </div>

              <h2
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  margin: "4px 0",
                  direction: detectDir(activeItem.title),
                }}
              >
                {activeItem.title}
              </h2>
            </div>

            {/* بخش قفل یا نمایش متن */}
            {isItemLocked ? (
              <div
                style={{
                  backgroundColor: bgCard,
                  borderRadius: "12px",
                  padding: "24px",
                  textAlign: "center",
                  border: `1px dashed ${borderColor}`,
                }}
              >
                <Lock size={38} color="#f59e0b" style={{ margin: "0 auto 12px" }} />
                <h3 style={{ fontSize: "15px", fontWeight: "600", marginBottom: "6px" }}>
                  این بخش قفل است
                </h3>
                <p style={{ fontSize: "13px", color: textSecondary, marginBottom: "16px" }}>
                  رمز عبور را وارد کنید.
                </p>

                {!showKeypad ? (
                  <button
                    onClick={() => setShowKeypad(true)}
                    style={{
                      backgroundColor: lessonColor,
                      color: "#fff",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: "8px",
                      fontWeight: "600",
                      cursor: "pointer",
                      fontSize: "13px",
                    }}
                  >
                    ورود رمز
                  </button>
                ) : (
                  <div style={{ maxWidth: "240px", margin: "0 auto" }}>
                    <input
                      type="password"
                      value={pinInput}
                      onChange={(e) => setPinInput(e.target.value)}
                      placeholder="رمز..."
                      style={{
                        width: "100%",
                        padding: "10px",
                        textAlign: "center",
                        borderRadius: "8px",
                        border: `1px solid ${pinError ? "#ef4444" : borderColor}`,
                        backgroundColor: bgMain,
                        color: textPrimary,
                        fontSize: "16px",
                        marginBottom: "8px",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                    {pinError && (
                      <p style={{ color: "#ef4444", fontSize: "12px", marginBottom: "8px" }}>
                        رمز اشتباه است.
                      </p>
                    )}
                    <button
                      onClick={handleUnlock}
                      style={{
                        width: "100%",
                        backgroundColor: lessonColor,
                        color: "#fff",
                        border: "none",
                        padding: "10px",
                        borderRadius: "8px",
                        fontWeight: "600",
                        cursor: "pointer",
                        fontSize: "13px",
                      }}
                    >
                      تأیید
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div
                style={{
                  backgroundColor: bgCard,
                  borderRadius: "12px",
                  padding: "16px",
                  border: `1px solid ${borderColor}`,
                  lineHeight: "1.85",
                  fontSize: "14px",
                  color: textPrimary,
                  direction: detectDir(activeItem.content || ""),
                  whiteSpace: "pre-wrap",
                }}
              >
                {activeItem.content || "محتوایی برای این بخش ثبت نشده است."}
              </div>
            )}
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "40px 16px", color: textSecondary }}>
            محتوایی یافت نشد.
          </div>
        )}
      </main>

      {/* نوار پایین (قبلی / بعدی) */}
      <footer
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 16px",
          backgroundColor: bgCard,
          borderTop: `1px solid ${borderColor}`,
        }}
      >
        <button
          onClick={handlePrev}
          disabled={activeIndex === 0}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            background: "none",
            border: `1px solid ${borderColor}`,
            padding: "8px 12px",
            borderRadius: "8px",
            color: activeIndex === 0 ? textSecondary : textPrimary,
            cursor: activeIndex === 0 ? "not-allowed" : "pointer",
            opacity: activeIndex === 0 ? 0.4 : 1,
            fontSize: "13px",
          }}
        >
          <ChevronRight size={16} />
          قبلی
        </button>

        <span style={{ fontSize: "12px", color: textSecondary }}>
          {flatSections.length > 0 ? `${activeIndex + 1} از ${flatSections.length}` : ""}
        </span>

        <button
          onClick={handleNext}
          disabled={activeIndex >= flatSections.length - 1}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            background: "none",
            border: `1px solid ${borderColor}`,
            padding: "8px 12px",
            borderRadius: "8px",
            color: activeIndex >= flatSections.length - 1 ? textSecondary : textPrimary,
            cursor: activeIndex >= flatSections.length - 1 ? "not-allowed" : "pointer",
            opacity: activeIndex >= flatSections.length - 1 ? 0.4 : 1,
            fontSize: "13px",
          }}
        >
          بعدی
          <ChevronLeft size={16} />
        </button>
      </footer>

      {/* منوی کشویی سرفصل‌ها */}
      {drawerOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 50,
            display: "flex",
          }}
          onClick={() => setDrawerOpen(false)}
        >
          <div
            style={{
              width: "80%",
              maxWidth: "320px",
              height: "100%",
              backgroundColor: bgCard,
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 0 20px rgba(0,0,0,0.3)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px",
                borderBottom: `1px solid ${borderColor}`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <BookOpen size={18} color={lessonColor} />
                <span style={{ fontWeight: "bold", fontSize: "14px" }}>سرفصل‌ها</span>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: textPrimary,
                  cursor: "pointer",
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "10px" }}>
              {flatSections.map((item, idx) => {
                const isSelected = idx === activeIndex;
                const locked = item.isLocked && !unlockedSections[item.id];
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectSection(idx)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 12px",
                      marginBottom: "6px",
                      borderRadius: "8px",
                      border: isSelected ? `1px solid ${lessonColor}` : "1px solid transparent",
                      backgroundColor: isSelected ? `${lessonColor}15` : "transparent",
                      color: isSelected ? lessonColor : textPrimary,
                      cursor: "pointer",
                      textAlign: "right",
                      fontSize: "13px",
                      paddingRight: `${12 + (item.depth || 0) * 12}px`,
                      boxSizing: "border-box",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        overflow: "hidden",
                      }}
                    >
                      <span style={{ opacity: 0.6, fontSize: "11px" }}>
                        {item.displayNumber}
                      </span>
                      <span
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item.title}
                      </span>
                    </div>
                    {locked && <Lock size={12} color="#f59e0b" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
