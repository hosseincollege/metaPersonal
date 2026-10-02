// KeypadModal.jsx
import React, { useRef, useEffect } from "react";

export default function KeypadModal({
  showKeypad,
  onClose,
  pin,
  handlePinInput,
  handlePinBackspace,
  handlePinSubmit,
  passError,
  isDark,
}) {
  const keypadRef = useRef(null);

  // بستن کیپد با کلیک خارج
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (keypadRef.current && !keypadRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (showKeypad) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showKeypad, onClose]);

  if (!showKeypad) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div
        ref={keypadRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: isDark
            ? "rgba(10, 10, 10, 0.85)"
            : "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: `1px solid ${
            isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)"
          }`,
          borderRadius: "22px",
          padding: "18px 14px",
          width: "170px",
          boxShadow: isDark
            ? "0 18px 40px rgba(0, 0, 0, 0.45)"
            : "0 18px 40px rgba(0, 0, 0, 0.12)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
        }}
      >
        {/* پین کد dots */}
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

        {/* صفحه کلید عددی */}
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
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                border: `1px solid ${
                  isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"
                }`,
                background: isDark
                  ? "rgba(255,255,255,0.04)"
                  : "rgba(0,0,0,0.02)",
                color: isDark ? "#9ca3af" : "#4b5563",
                fontSize: "14px",
                fontFamily: "monospace",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                outline: "none",
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
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "none",
              background: "transparent",
              color: isDark ? "#6b7280" : "#9ca3af",
              fontSize: "11px",
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
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: `1px solid ${
                isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"
              }`,
              background: isDark
                ? "rgba(255,255,255,0.04)"
                : "rgba(0,0,0,0.02)",
              color: isDark ? "#9ca3af" : "#4b5563",
              fontSize: "14px",
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
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: `1px solid ${
                isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.14)"
              }`,
              background: isDark
                ? "rgba(255,255,255,0.08)"
                : "rgba(0,0,0,0.05)",
              color: isDark ? "#d1d5db" : "#111827",
              fontSize: "11px",
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

        {/* ارور */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            minHeight: "16px",
          }}
        >
          {passError && (
            <span
              style={{
                fontSize: "9px",
                color: "rgba(239,68,68,0.9)",
                fontFamily: "monospace",
                letterSpacing: "0.4px",
              }}
            >
              ACCESS DENIED
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
