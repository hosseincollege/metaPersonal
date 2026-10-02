// File: E:\metaPersonal\src\components\TwoDMobile\KeypadModal.jsx

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

  // بستن کی‌پد با کلیک خارج از محدوده
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (keypadRef.current && !keypadRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (showKeypad) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "modalFadeIn 0.25s cubic-bezier(0.4, 0, 0.2, 1) forwards",
      }}
      onClick={onClose}
    >
      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes keypadScaleIn {
          from { opacity: 0; transform: scale(0.92) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        @keyframes shakeError {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-5px); }
          40%, 80% { transform: translateX(5px); }
        }

        .keypad-num-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"};
          background: ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)"};
          color: ${isDark ? "#d1d5db" : "#374151"};
          font-size: 14px;
          font-family: monospace;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          outline: none;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .keypad-num-btn:hover {
          background: ${isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)"};
          transform: translateY(-1px);
        }

        .keypad-num-btn:active {
          transform: scale(0.88);
        }

        .keypad-submit-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid ${isDark ? "rgba(255,255,255,0.16)" : "rgba(0,0,0,0.16)"};
          background: ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)"};
          color: ${isDark ? "#f3f4f6" : "#111827"};
          font-size: 11px;
          font-weight: bold;
          font-family: monospace;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          outline: none;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .keypad-submit-btn:hover {
          background: ${isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.12)"};
          transform: translateY(-1px);
        }

        .keypad-submit-btn:active {
          transform: scale(0.88);
        }
      `}</style>

      <div
        ref={keypadRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: isDark
            ? "rgba(18, 18, 18, 0.88)"
            : "rgba(255, 255, 255, 0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: `1px solid ${
            isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)"
          }`,
          borderRadius: "24px",
          padding: "20px 16px",
          width: "185px",
          boxShadow: isDark
            ? "0 20px 45px rgba(0, 0, 0, 0.55)"
            : "0 20px 45px rgba(0, 0, 0, 0.14)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "14px",
          animation: "keypadScaleIn 0.26s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        }}
      >
        {/* پین کد dots */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "16px",
            minWidth: "50px",
          }}
        >
          {pin.length > 0 &&
            Array.from({ length: pin.length }).map((_, idx) => (
              <div
                key={idx}
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: isDark ? "#ffffff" : "#111111",
                  opacity: 0.95,
                  transform: "scale(1)",
                  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
            ))}
        </div>

        {/* صفحه کلید عددی */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "10px",
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
              className="keypad-num-btn"
            >
              {n}
            </button>
          ))}

          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePinBackspace();
            }}
            className="keypad-num-btn"
            style={{
              border: "none",
              background: "transparent",
              color: isDark ? "#9ca3af" : "#6b7280",
              fontSize: "13px",
            }}
          >
            ⌫
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePinInput(0);
            }}
            className="keypad-num-btn"
          >
            0
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePinSubmit();
            }}
            className="keypad-submit-btn"
          >
            OK
          </button>
        </div>

        {/* نمایش خطا */}
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
                fontSize: "10px",
                color: "rgba(239, 68, 68, 0.95)",
                fontFamily: "monospace",
                fontWeight: "bold",
                letterSpacing: "0.5px",
                animation: "shakeError 0.4s ease-in-out",
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
