"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const LanguageContext = createContext(null);
const STORAGE_KEY = "nab-visnagar-language";

function readStoredLanguage() {
  try {
    const savedLanguage = window.localStorage.getItem(STORAGE_KEY);

    if (savedLanguage === "en" || savedLanguage === "gu") {
      return savedLanguage;
    }
  } catch {
    // Ignore storage errors and fall back to default language.
  }

  return "en";
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    setLanguage(readStoredLanguage());
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Ignore storage errors.
    }
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
}