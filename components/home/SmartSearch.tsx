"use client";

import React, { useState } from "react";
import {
  Search,
  Stethoscope,
  Building2,
  Activity,
  PhoneCall,
  AlertCircle,
  Clock,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { LocationSelector } from "./LocationSelector";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useToast } from "@/components/ui/Toast";

export type SearchTab = "doctors" | "hospitals" | "packages" | "emergency";

interface SmartSearchProps {
  query: string;
  onQueryChange: (q: string) => void;
  selectedCity: string;
  selectedLocality: string;
  onCityChange: (c: string) => void;
  onLocalityChange: (l: string) => void;
  onLocationDetected?: (
    coords: { latitude: number; longitude: number } | null,
    isGps: boolean
  ) => void;
  isGpsActive?: boolean;
  onSubmit: (e: React.FormEvent) => void;
  className?: string;
}

const popularCities = [
  "Bengaluru",
  "Mumbai",
  "New Delhi",
  "Hyderabad",
  "Chennai",
  "Kolkata",
];

export function SmartSearch({
  query,
  onQueryChange,
  selectedCity,
  selectedLocality,
  onCityChange,
  onLocalityChange,
  onLocationDetected,
  isGpsActive,
  onSubmit,
  className = "",
}: SmartSearchProps) {
  const { dict } = useLanguage();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<SearchTab>("doctors");

  const handleTabSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === "doctors") {
      const el = document.getElementById("find-doctors");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      else onSubmit(e);
    } else if (activeTab === "hospitals") {
      const el = document.getElementById("clinics");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      else onSubmit(e);
    } else if (activeTab === "packages") {
      const el = document.getElementById("health-packages");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      else onSubmit(e);
    } else if (activeTab === "emergency") {
      const el = document.getElementById("emergency-hub");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      else onSubmit(e);
    }
  };

  const handleAmbulanceRequest = () => {
    showToast(
      "Priority Ambulance Dispatched (Demo)! Nearest trauma unit alerted with GPS coordinates.",
      "success"
    );
  };

  return (
    <div
      className={`bg-white rounded-card shadow-card border border-border overflow-hidden ${className}`}
      role="search"
      aria-label="CarePoint Clinical Discovery Search"
    >
      {/* 1. Interactive Tabs Header */}
      <div
        className="flex items-center overflow-x-auto no-scrollbar border-b border-border bg-bg-secondary px-2 pt-2 gap-1"
        role="tablist"
        aria-label="Search categories"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "doctors"}
          onClick={() => setActiveTab("doctors")}
          className={`flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-bold rounded-t-md transition-all whitespace-nowrap ${
            activeTab === "doctors"
              ? "bg-white text-teal border-t-2 border-teal shadow-sm"
              : "text-text-secondary hover:text-navy hover:bg-white/60"
          }`}
        >
          <Stethoscope className="size-4 shrink-0 text-teal" />
          <span>Find a Doctor</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "hospitals"}
          onClick={() => setActiveTab("hospitals")}
          className={`flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-bold rounded-t-md transition-all whitespace-nowrap ${
            activeTab === "hospitals"
              ? "bg-white text-teal border-t-2 border-teal shadow-sm"
              : "text-text-secondary hover:text-navy hover:bg-white/60"
          }`}
        >
          <Building2 className="size-4 shrink-0 text-teal" />
          <span>Hospitals & Clinics</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "packages"}
          onClick={() => setActiveTab("packages")}
          className={`flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-bold rounded-t-md transition-all whitespace-nowrap ${
            activeTab === "packages"
              ? "bg-white text-teal border-t-2 border-teal shadow-sm"
              : "text-text-secondary hover:text-navy hover:bg-white/60"
          }`}
        >
          <Activity className="size-4 shrink-0 text-teal" />
          <span>Health Packages</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "emergency"}
          onClick={() => setActiveTab("emergency")}
          className={`flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-bold rounded-t-md transition-all whitespace-nowrap ml-auto ${
            activeTab === "emergency"
              ? "bg-emergency/10 text-emergency border-t-2 border-emergency shadow-sm"
              : "text-emergency/80 hover:text-emergency hover:bg-emergency/5"
          }`}
        >
          <span className="size-2 rounded-full bg-emergency animate-pulse" />
          <PhoneCall className="size-3.5 shrink-0" />
          <span>Emergency 24x7</span>
        </button>
      </div>

      {/* 2. Tab Contents */}
      <div className="p-4 sm:p-5 lg:p-6">
        {activeTab !== "emergency" ? (
          <form onSubmit={handleTabSubmit} className="flex flex-col gap-3.5">
            {/* Search Input Bar */}
            <div className="relative flex items-center">
              <Search
                className="absolute left-4 size-5 text-teal pointer-events-none shrink-0"
                aria-hidden="true"
              />
              <label htmlFor="smart-search-input" className="sr-only">
                {activeTab === "doctors"
                  ? "Search doctors by name or specialty"
                  : activeTab === "hospitals"
                  ? "Search hospitals and clinics"
                  : "Search health checkup packages"}
              </label>
              <input
                id="smart-search-input"
                type="search"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder={
                  activeTab === "doctors"
                    ? "Search doctor, specialty, or symptom (e.g. Dr. Arvind, Cardiologist, Chest pain)..."
                    : activeTab === "hospitals"
                    ? "Search hospitals, clinics, or scan centers (e.g. Mayura Valley, Banyan Crest)..."
                    : "Search health packages (e.g. Full Body, Cardiac, Diabetic, Senior Citizen)..."
                }
                className="w-full pl-12 pr-4 py-3 bg-bg-secondary text-text-primary placeholder:text-text-secondary/70 font-medium text-sm sm:text-base rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal transition-all"
              />
            </div>

            {/* Location Selector & Search Action */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
              <div className="lg:col-span-8">
                <LocationSelector
                  selectedCity={selectedCity}
                  selectedLocality={selectedLocality}
                  onCityChange={onCityChange}
                  onLocalityChange={onLocalityChange}
                  onLocationDetected={onLocationDetected}
                  isGpsActive={isGpsActive}
                />
              </div>
              <div className="lg:col-span-4 flex items-center">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  fullWidth
                  leftIcon={<Search className="size-4" />}
                  className="text-sm sm:text-base font-bold py-3"
                >
                  {activeTab === "doctors"
                    ? "Find Doctors"
                    : activeTab === "hospitals"
                    ? "Find Hospitals"
                    : "Explore Packages"}
                </Button>
              </div>
            </div>

            {/* Quick City Filters */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs text-text-secondary">
              <span className="font-semibold text-navy mr-1">Popular Cities:</span>
              {popularCities.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => onCityChange(selectedCity === city ? "all" : city)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all border ${
                    selectedCity === city
                      ? "bg-teal text-white border-teal shadow-sm"
                      : "bg-bg-secondary text-text-secondary hover:text-navy border-border hover:border-teal/40"
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </form>
        ) : (
          /* Emergency 24x7 Quick Response View */
          <div className="flex flex-col gap-4">
            <div className="bg-emergency/5 border border-emergency/20 rounded-lg p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-emergency animate-ping" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emergency">
                    Immediate Medical Emergency & Trauma Desk
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-navy">
                  National Emergency Dial: <span className="text-emergency">112</span> &bull; Hospital Direct: <span className="text-navy">1066</span>
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary">
                  Round-the-clock emergency casualty desks, ICU resus bays, and rapid ambulance dispatch.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
                <a
                  href="tel:112"
                  className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-emergency text-white font-bold text-xs sm:text-sm hover:bg-emergency/90 transition-colors shadow-sm"
                >
                  <PhoneCall className="size-4" />
                  <span>Call 112 (Emergency)</span>
                </a>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAmbulanceRequest}
                  className="flex-1 md:flex-none text-xs sm:text-sm font-bold border-emergency text-emergency hover:bg-emergency/10"
                >
                  Request Ambulance (Demo)
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-text-secondary px-1">
              <span className="flex items-center gap-1.5 text-success font-semibold">
                <CheckCircle2 className="size-4 text-success" />
                <span>94 Casualty Desks Active with On-Duty ER Doctors</span>
              </span>
              <a
                href="#emergency-hub"
                className="text-teal font-bold hover:underline"
              >
                View Full Trauma Guidelines & Protocol &rarr;
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
