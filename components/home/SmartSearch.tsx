"use client";

import React from "react";
import { Search } from "lucide-react";
import { LocationSelector } from "./LocationSelector";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface SmartSearchProps {
  query: string;
  onQueryChange: (q: string) => void;
  selectedCity: string;
  selectedLocality: string;
  onCityChange: (c: string) => void;
  onLocalityChange: (l: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  className?: string;
}

export function SmartSearch({
  query,
  onQueryChange,
  selectedCity,
  selectedLocality,
  onCityChange,
  onLocalityChange,
  onSubmit,
  className = "",
}: SmartSearchProps) {
  const { dict } = useLanguage();

  return (
    <form
      onSubmit={onSubmit}
      className={`bg-white rounded-card shadow-card border border-ink/15 p-4 sm:p-5 lg:p-6 ${className}`}
      role="search"
      aria-label="CarePoint Clinical Discovery Search"
    >
      <div className="flex flex-col gap-3">
        {/* Top: Free-text search input */}
        <div className="relative flex items-center">
          <Search
            className="absolute left-4 size-5 text-saffron pointer-events-none shrink-0"
            aria-hidden="true"
          />
          <label htmlFor="smart-search-input" className="sr-only">
            {dict.hero.searchPlaceholder}
          </label>
          <input
            id="smart-search-input"
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={dict.hero.searchPlaceholder}
            className="w-full pl-12 pr-4 py-3.5 bg-cream/30 text-ink placeholder:text-ink/50 font-medium text-sm sm:text-base rounded-DEFAULT border border-ink/20 focus:outline-none focus:ring-2 focus:ring-saffron focus:border-saffron transition-all"
          />
        </div>

        {/* Bottom: Location Cascader + Find Care CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
          <div className="lg:col-span-8">
            <LocationSelector
              selectedCity={selectedCity}
              selectedLocality={selectedLocality}
              onCityChange={onCityChange}
              onLocalityChange={onLocalityChange}
            />
          </div>
          <div className="lg:col-span-4 flex items-center">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              leftIcon={<Search className="size-5" />}
              className="text-base font-bold"
            >
              {dict.hero.findCareBtn}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
