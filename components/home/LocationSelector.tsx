"use client";

import React from "react";
import { MapPin, Navigation } from "lucide-react";
import { locationsData } from "@/lib/data/locations";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface LocationSelectorProps {
  selectedCity: string;
  selectedLocality: string;
  onCityChange: (city: string) => void;
  onLocalityChange: (locality: string) => void;
  className?: string;
}

export function LocationSelector({
  selectedCity,
  selectedLocality,
  onCityChange,
  onLocalityChange,
  className = "",
}: LocationSelectorProps) {
  const { dict } = useLanguage();

  const currentCityData = locationsData.find(
    (l) => l.city.toLowerCase() === selectedCity.toLowerCase()
  );

  const localities = currentCityData ? currentCityData.localities : [];

  const handleCitySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCity = e.target.value;
    onCityChange(newCity);
    onLocalityChange("all"); // reset locality when city changes
  };

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2.5 ${className}`}>
      {/* City Select */}
      <div className="relative flex items-center">
        <MapPin
          className="absolute left-3.5 size-4 text-teal pointer-events-none shrink-0"
          aria-hidden="true"
        />
        <label htmlFor="location-city-select" className="sr-only">
          {dict.hero.selectCity}
        </label>
        <select
          id="location-city-select"
          value={selectedCity}
          onChange={handleCitySelect}
          className="w-full pl-10 pr-8 py-3 bg-white text-ink font-medium text-sm sm:text-base rounded-DEFAULT border border-ink/20 focus:outline-none focus:ring-2 focus:ring-saffron focus:border-saffron transition-all appearance-none cursor-pointer"
        >
          <option value="all">All Cities (India)</option>
          {locationsData.map((loc) => (
            <option key={loc.city} value={loc.city}>
              {loc.city}
            </option>
          ))}
        </select>
        <div
          className="absolute right-3 pointer-events-none text-ink/50"
          aria-hidden="true"
        >
          ▼
        </div>
      </div>

      {/* Locality Select */}
      <div className="relative flex items-center">
        <Navigation
          className="absolute left-3.5 size-4 text-teal pointer-events-none shrink-0"
          aria-hidden="true"
        />
        <label htmlFor="location-locality-select" className="sr-only">
          {dict.hero.selectLocality}
        </label>
        <select
          id="location-locality-select"
          value={selectedLocality}
          onChange={(e) => onLocalityChange(e.target.value)}
          disabled={selectedCity === "all" || localities.length === 0}
          className="w-full pl-10 pr-8 py-3 bg-white text-ink font-medium text-sm sm:text-base rounded-DEFAULT border border-ink/20 focus:outline-none focus:ring-2 focus:ring-saffron focus:border-saffron transition-all appearance-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <option value="all">
            {selectedCity === "all" ? "Select a city first" : "All Localities"}
          </option>
          {localities.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
        <div
          className="absolute right-3 pointer-events-none text-ink/50"
          aria-hidden="true"
        >
          ▼
        </div>
      </div>
    </div>
  );
}
