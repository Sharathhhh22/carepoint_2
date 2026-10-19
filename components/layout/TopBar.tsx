"use client";

import React from "react";
import { Phone, Clock, Globe } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { supportedLocales, SupportedLocale } from "@/lib/i18n/dictionaries";

export function TopBar() {
  const { locale, setLocale, dict } = useLanguage();

  return (
    <div className="bg-maroon text-cream text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-white/10 select-none">
      <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-2 sm:gap-4">
        {/* Left: Emergency & Hours */}
        <div className="flex items-center flex-wrap gap-4">
          <div className="flex items-center gap-1.5 text-marigold font-semibold">
            <Phone className="size-3.5 shrink-0" />
            <span>Emergency: Call 112 (National Emergency Helpline)</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5 text-cream/80">
            <Clock className="size-3.5 shrink-0" />
            <span>Mon - Sat: 8:00 AM – 8:00 PM IST</span>
          </div>
        </div>

        {/* Right: Demo Label and Language Selector */}
        <div className="flex items-center gap-2.5 sm:gap-3 ml-auto flex-wrap">
          {locale !== "en" && (
            <span className="px-2 py-0.5 rounded bg-marigold/20 text-marigold text-[10px] sm:text-[11px] font-semibold border border-marigold/30">
              {dict.common.machineTranslationDemo}
            </span>
          )}

          <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-white/10 text-[11px] font-medium text-cream/90 uppercase tracking-wider">
            Demo Site
          </span>

          {/* Language Selector */}
          <div className="flex items-center gap-1.5 bg-black/20 rounded px-2 py-0.5 border border-white/10">
            <Globe className="size-3.5 text-marigold shrink-0" aria-hidden="true" />
            <label htmlFor="topbar-language-select" className="sr-only">
              Select website language
            </label>
            <select
              id="topbar-language-select"
              value={locale}
              onChange={(e) => setLocale(e.target.value as SupportedLocale)}
              className="bg-transparent text-xs text-cream font-medium border-none focus:outline-none focus:ring-1 focus:ring-saffron cursor-pointer"
            >
              {supportedLocales.map((loc) => (
                <option
                  key={loc.code}
                  value={loc.code}
                  className="bg-cream text-ink font-sans"
                >
                  {loc.nativeName} ({loc.label})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
