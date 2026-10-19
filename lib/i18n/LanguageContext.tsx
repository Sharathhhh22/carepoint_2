"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { SupportedLocale, getDictionary, DictionaryStrings } from "./dictionaries";

interface LanguageContextValue {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  dict: DictionaryStrings;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = "carepoint_locale";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<SupportedLocale>("en");

  // Load from localStorage safely inside a try/catch on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as SupportedLocale | null;
      if (saved && (saved === "en" || saved === "hi" || saved === "kn" || saved === "ta")) {
        setLocaleState(saved);
        document.documentElement.lang = saved;
      } else {
        document.documentElement.lang = "en";
      }
    } catch {
      // localStorage unavailable or restricted
      document.documentElement.lang = "en";
    }
  }, []);

  const setLocale = (newLocale: SupportedLocale) => {
    setLocaleState(newLocale);
    try {
      document.documentElement.lang = newLocale;
      localStorage.setItem(STORAGE_KEY, newLocale);
    } catch {
      // Storage write error ignored gracefully
    }
  };

  const dict = getDictionary(locale);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, dict }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
