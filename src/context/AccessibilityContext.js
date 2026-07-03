"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AccessibilityContext = createContext(null);
const STORAGE_KEY = "nab-visnagar-accessibility";

const FONT_SIZES = {
  default: "100%",
  increase: "112.5%",
  decrease: "87.5%",
};

const DEFAULT_PREFERENCES = {
  fontSize: "default",
  highContrast: false,
  darkMode: false,
};

function readStoredPreferences() {
  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);

    if (!storedValue) {
      return null;
    }

    const parsedValue = JSON.parse(storedValue);

    return {
      fontSize: ["default", "increase", "decrease"].includes(parsedValue?.fontSize)
        ? parsedValue.fontSize
        : DEFAULT_PREFERENCES.fontSize,
      highContrast: Boolean(parsedValue?.highContrast),
      darkMode: Boolean(parsedValue?.darkMode),
    };
  } catch {
    return null;
  }
}

function applyAccessibilityPreferences(preferences) {
  const root = document.documentElement;

  root.style.fontSize = FONT_SIZES[preferences.fontSize] || FONT_SIZES.default;
  root.dataset.accessibilityDark = preferences.darkMode ? "true" : "false";
  root.dataset.accessibilityContrast = preferences.highContrast ? "true" : "false";
  root.style.colorScheme = preferences.highContrast || preferences.darkMode ? "dark" : "light";
}

export function AccessibilityProvider({ children }) {
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);
  const [isWebsiteTourOpen, setIsWebsiteTourOpen] = useState(false);

  useEffect(() => {
    const storedPreferences = readStoredPreferences();

    if (storedPreferences) {
      setPreferences(storedPreferences);
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch {
      // Ignore storage errors and keep the in-memory preferences active.
    }

    applyAccessibilityPreferences(preferences);
  }, [preferences]);

  const value = useMemo(() => {
    const updateFontSize = (fontSize) => {
      setPreferences((currentPreferences) => ({
        ...currentPreferences,
        fontSize,
      }));
    };

    return {
      preferences,
      fontSize: preferences.fontSize,
      highContrast: preferences.highContrast,
      darkMode: preferences.darkMode,
      isWebsiteTourOpen,
      increaseText: () => updateFontSize("increase"),
      decreaseText: () => updateFontSize("decrease"),
      resetText: () => updateFontSize("default"),
      openWebsiteTour: () => setIsWebsiteTourOpen(true),
      closeWebsiteTour: () => setIsWebsiteTourOpen(false),
      toggleHighContrast: () =>
        setPreferences((currentPreferences) => ({
          ...currentPreferences,
          highContrast: !currentPreferences.highContrast,
        })),
      toggleDarkMode: () =>
        setPreferences((currentPreferences) => ({
          ...currentPreferences,
          darkMode: !currentPreferences.darkMode,
        })),
    };
  }, [isWebsiteTourOpen, preferences]);

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>;
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);

  if (!context) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider");
  }

  return context;
}