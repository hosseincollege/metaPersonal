// File: E:\metaPersonal\src\components\TwoD\Keypad.jsx

import React from "react";

export default function Keypad({
  keypadRef,
  collapsed,
  isDark,
  pin,
  handlePinInput,
  handlePinBackspace,
  handlePinSubmit,
  passError,
}) {
  return (
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
          isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.06)"
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
                isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"
              }`,
              background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
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
              isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"
            }`,
            background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
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
              isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.14)"
            }`,
            background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
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
  );
}
