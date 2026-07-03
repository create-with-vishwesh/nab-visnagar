"use client";

import { useEffect, useRef, useState } from "react";
import { useAccessibility } from "@/context/AccessibilityContext";

export default function AccessibilityControls() {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef(null);
  const {
    fontSize,
    highContrast,
    darkMode,
    increaseText,
    decreaseText,
    resetText,
    openWebsiteTour,
    toggleHighContrast,
    toggleDarkMode,
  } = useAccessibility();

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {isOpen ? (
        <div
          className="w-80 max-w-[calc(100vw-2rem)] rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-900/15"
          role="dialog"
          aria-label="Accessibility settings"
          id="accessibility-panel"
          aria-modal="false"
          tabIndex={-1}
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-900">Accessibility</p>
              <p className="text-xs text-slate-500">Text size: {fontSize}</p>
            </div>
            <button
              type="button"
              className="rounded-full border border-slate-200 px-2 py-1 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100"
              onClick={() => setIsOpen(false)}
              aria-label="Close accessibility panel"
              ref={closeButtonRef}
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-1 gap-2" role="toolbar" aria-label="Accessibility tools">
            <button
              type="button"
              onClick={increaseText}
              className="rounded-xl bg-slate-900 px-4 py-3 text-left text-sm font-medium text-white transition-colors hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
            >
              Increase Text
            </button>
            <button
              type="button"
              onClick={decreaseText}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
            >
              Decrease Text
            </button>
            <button
              type="button"
              onClick={resetText}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
            >
              Reset Text
            </button>
            <button
              type="button"
              onClick={toggleHighContrast}
              aria-pressed={highContrast}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
            >
              High Contrast {highContrast ? "On" : "Off"}
            </button>
            <button
              type="button"
              onClick={toggleDarkMode}
              aria-pressed={darkMode}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
            >
              Dark Mode {darkMode ? "On" : "Off"}
            </button>
            <button
              type="button"
              onClick={() => {
                openWebsiteTour();
                setIsOpen(false);
              }}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
            >
              Website Tour
            </button>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="accessibility-panel"
        aria-label="Open accessibility settings"
        className="inline-flex h-14 items-center gap-2 rounded-full bg-slate-900 px-4 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition-colors hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-base font-bold">A</span>
        Accessibility
      </button>
    </div>
  );
}