"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { defaultWebsiteSettings, normalizeWebsiteSettings } from "@/utils/website-settings";

const WebsiteSettingsContext = createContext(null);

export function WebsiteSettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaultWebsiteSettings);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadSettings() {
      try {
        const response = await fetch("/api/settings", { cache: "no-store" });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.message || "Unable to load website settings.");
        }

        if (isMounted) {
          setSettings(normalizeWebsiteSettings(data?.data));
        }
      } catch {
        if (isMounted) {
          setSettings(defaultWebsiteSettings);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadSettings();

    return () => {
      isMounted = false;
    };
  }, []);

  const refresh = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/settings", { cache: "no-store" });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Unable to load website settings.");
      }

      setSettings(normalizeWebsiteSettings(data?.data));
    } catch {
      setSettings(defaultWebsiteSettings);
    } finally {
      setIsLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      settings,
      isLoading,
      refresh,
    }),
    [isLoading, settings]
  );

  return <WebsiteSettingsContext.Provider value={value}>{children}</WebsiteSettingsContext.Provider>;
}

export function useWebsiteSettings() {
  const context = useContext(WebsiteSettingsContext);

  if (!context) {
    throw new Error("useWebsiteSettings must be used within a WebsiteSettingsProvider");
  }

  return context;
}
