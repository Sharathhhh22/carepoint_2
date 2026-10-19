"use client";

import React, { useState } from "react";
import { MapPin, Navigation, Crosshair, Check, Loader2 } from "lucide-react";
import { locationsData } from "@/lib/data/locations";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useToast } from "@/components/ui/Toast";

interface LocationSelectorProps {
  selectedCity: string;
  selectedLocality: string;
  onCityChange: (city: string) => void;
  onLocalityChange: (locality: string) => void;
  onLocationDetected?: (
    coords: { latitude: number; longitude: number } | null,
    isGps: boolean
  ) => void;
  isGpsActive?: boolean;
  className?: string;
}

export function LocationSelector({
  selectedCity,
  selectedLocality,
  onCityChange,
  onLocalityChange,
  onLocationDetected,
  isGpsActive = false,
  className = "",
}: LocationSelectorProps) {
  const { dict } = useLanguage();
  const { showToast } = useToast();
  const [isLocating, setIsLocating] = useState(false);

  const currentCityData = locationsData.find(
    (l) => l.city.toLowerCase() === selectedCity.toLowerCase()
  );

  const localities = currentCityData ? currentCityData.localities : [];

  const handleCitySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCity = e.target.value;
    onCityChange(newCity);
    onLocalityChange("all"); // reset locality when city changes
  };

  const handleUseMyLocation = () => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      showToast("Geolocation is not supported by your browser.", "warning");
      onLocationDetected?.(null, false);
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        // Determine nearest city based on sample latitude ranges
        if (coords.latitude < 16) {
          onCityChange("Bengaluru");
        } else if (coords.latitude >= 16 && coords.latitude < 24) {
          onCityChange("Mumbai");
        } else {
          onCityChange("New Delhi");
        }

        onLocationDetected?.(coords, true);
        showToast("Location detected. Distances updated using GPS.", "success");
      },
      (error) => {
        setIsLocating(false);
        onLocationDetected?.(null, false);
        let msg = "Location permission denied. Distance will be calculated using locality reference (sample).";
        if (error.code === error.TIMEOUT) {
          msg = "Location request timed out. Using locality reference (sample).";
        }
        showToast(msg, "info");
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  return (
    <div className={`flex flex-col gap-2.5 ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
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

      {/* Geolocation Button */}
      <div className="flex items-center justify-between flex-wrap gap-2 pt-0.5">
        <button
          type="button"
          onClick={handleUseMyLocation}
          disabled={isLocating}
          aria-label={dict.hero.useLocation}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-md border transition-all ${
            isGpsActive
              ? "bg-teal-light text-teal border-teal/40"
              : "bg-white text-ink hover:text-teal hover:bg-cream-muted border-ink/15"
          }`}
        >
          {isLocating ? (
            <Loader2 className="size-3.5 animate-spin text-teal" />
          ) : isGpsActive ? (
            <Check className="size-3.5 text-teal" />
          ) : (
            <Crosshair className="size-3.5 text-teal" />
          )}
          <span>{dict.hero.useLocation}</span>
          {isGpsActive && (
            <span className="text-[10px] bg-teal text-white font-bold px-1.5 py-0.2 rounded-full ml-1">
              GPS Active
            </span>
          )}
        </button>

        <span className="text-[11px] text-ink-subtle">
          {isGpsActive
            ? "Distance computed from browser position."
            : "Optional. Distances default to locality reference (sample)."}
        </span>
      </div>
    </div>
  );
}
