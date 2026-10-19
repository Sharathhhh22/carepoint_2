"use client";

import React, { useState, useEffect } from "react";
import { Doctor } from "@/lib/data/doctors";
import { DoctorCard } from "./DoctorCard";
import { DoctorCardSkeleton } from "@/components/ui/Skeleton";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { BudgetFilter } from "./BudgetFilter";
import { BudgetRange } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Search, UserCheck, Languages, RotateCcw, Stethoscope } from "lucide-react";

interface DoctorGridProps {
  doctors: Doctor[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  femaleDoctorOnly: boolean;
  onFemaleToggle: (val: boolean) => void;
  selectedLanguage: string;
  onLanguageChange: (lang: string) => void;
  selectedBudget: BudgetRange;
  onBudgetChange: (b: BudgetRange) => void;
  hiddenFacilitiesCount: number;
  onBookDoctor: (doc: Doctor) => void;
  onClearFilters: () => void;
}

export function DoctorGrid({
  doctors,
  searchQuery,
  onSearchChange,
  femaleDoctorOnly,
  onFemaleToggle,
  selectedLanguage,
  onLanguageChange,
  selectedBudget,
  onBudgetChange,
  hiddenFacilitiesCount,
  onBookDoctor,
  onClearFilters,
}: DoctorGridProps) {
  const { dict } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const languageOptions = [
    "all",
    "English",
    "Hindi",
    "Kannada",
    "Tamil",
    "Marathi",
    "Telugu",
    "Punjabi",
  ];

  return (
    <section
      id="find-doctors"
      className="py-16 sm:py-24 bg-cream border-t border-ink/10"
      aria-labelledby="doctors-heading"
    >
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <SectionHeading
            id="doctors-heading"
            eyebrow={dict.sections.doctorsEyebrow}
            title={dict.sections.doctorsTitle}
            intro={dict.sections.doctorsIntro}
            className="mb-0"
          />

          {/* Results count announced via aria-live="polite" */}
          <div
            role="status"
            aria-live="polite"
            className="text-xs sm:text-sm font-semibold text-teal bg-teal/10 px-3.5 py-1.5 rounded-full self-start md:self-auto border border-teal/20"
          >
            {doctors.length} {doctors.length === 1 ? "Doctor" : "Doctors"} Available
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-card shadow-card border border-ink/15 p-4 sm:p-6 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
            {/* Name / Specialty Search Input */}
            <div className="md:col-span-6 relative">
              <Search
                className="absolute left-3.5 size-4 text-saffron pointer-events-none shrink-0"
                aria-hidden="true"
              />
              <label htmlFor="doctor-search-input" className="sr-only">
                Search doctor by name or specialty
              </label>
              <input
                id="doctor-search-input"
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search clinician by name or clinical specialty..."
                className="w-full pl-10 pr-4 py-2.5 bg-cream/30 text-ink placeholder:text-ink/50 text-sm font-medium rounded-DEFAULT border border-ink/20 focus:outline-none focus:ring-2 focus:ring-saffron"
              />
            </div>

            {/* Language Filter */}
            <div className="md:col-span-3 relative">
              <Languages
                className="absolute left-3.5 size-4 text-teal pointer-events-none shrink-0"
                aria-hidden="true"
              />
              <label htmlFor="doctor-lang-select" className="sr-only">
                {dict.common.languageFilter}
              </label>
              <select
                id="doctor-lang-select"
                value={selectedLanguage}
                onChange={(e) => onLanguageChange(e.target.value)}
                className="w-full pl-10 pr-8 py-2.5 bg-cream/30 text-ink text-sm font-medium rounded-DEFAULT border border-ink/20 focus:outline-none focus:ring-2 focus:ring-saffron appearance-none cursor-pointer"
              >
                <option value="all">{dict.common.allLanguages}</option>
                {languageOptions.filter((l) => l !== "all").map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
              <div
                className="absolute right-3 pointer-events-none text-ink/50 text-xs"
                aria-hidden="true"
              >
                ▼
              </div>
            </div>

            {/* Female Doctor Toggle */}
            <div className="md:col-span-3 flex items-center">
              <label
                htmlFor="female-doctor-toggle"
                className="flex items-center gap-2.5 text-sm font-semibold text-ink cursor-pointer select-none bg-cream/30 px-3 py-2.5 rounded-DEFAULT border border-ink/20 w-full hover:bg-cream/60 transition-colors"
              >
                <input
                  id="female-doctor-toggle"
                  type="checkbox"
                  checked={femaleDoctorOnly}
                  onChange={(e) => onFemaleToggle(e.target.checked)}
                  className="size-4 text-maroon rounded border-ink/30 focus:ring-saffron focus:ring-2 cursor-pointer accent-maroon"
                />
                <UserCheck className="size-4 text-maroon shrink-0" />
                <span className="truncate">{dict.common.femaleDoctorToggle}</span>
              </label>
            </div>
          </div>

          {/* Budget Filter */}
          <BudgetFilter
            selectedBudget={selectedBudget}
            onBudgetChange={onBudgetChange}
            hiddenFacilitiesCount={hiddenFacilitiesCount}
          />
        </div>

        {/* Doctor Cards Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <DoctorCardSkeleton key={i} />
            ))}
          </div>
        ) : doctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onBook={onBookDoctor}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div
            role="alert"
            className="p-12 text-center bg-white rounded-card shadow-card border border-ink/10 max-w-xl mx-auto my-6"
          >
            <div className="size-16 rounded-full bg-saffron/15 text-maroon mx-auto flex items-center justify-center mb-4">
              <Stethoscope className="size-8" />
            </div>
            <h3 className="text-xl font-bold text-maroon mb-2">
              {dict.hero.noMatches}
            </h3>
            <p className="text-sm text-ink/75 leading-relaxed mb-6">
              {dict.hero.noMatchesHint}
            </p>
            <Button
              variant="primary"
              size="md"
              onClick={onClearFilters}
              leftIcon={<RotateCcw className="size-4" />}
            >
              {dict.hero.clearSearch}
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}
