"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function SkipLink() {
  const { dict } = useLanguage();

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:bg-maroon focus:text-white focus:font-semibold focus:rounded-DEFAULT focus:shadow-floating focus:ring-2 focus:ring-saffron focus:outline-none transition-all duration-150"
    >
      {dict.nav.skipLink}
    </a>
  );
}
