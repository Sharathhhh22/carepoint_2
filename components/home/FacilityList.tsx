"use client";

import React, { useState, useEffect } from "react";
import { Facility } from "@/lib/data/facilities";
import { FacilityCard } from "./FacilityCard";
import { FacilityCardSkeleton } from "@/components/ui/Skeleton";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { SortControl } from "./SortControl";
import { SortOption } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Building2, RotateCcw } from "lucide-react";

interface FacilityListProps {
  facilities: (Facility & { distanceKm?: number })[];
  isGps?: boolean;
  sortBy?: SortOption;
  onSortChange?: (sort: SortOption) => void;
  onBookFacility: (facility: Facility) => void;
  onClearFilters: () => void;
}

export function FacilityList({
  facilities,
  isGps = false,
  sortBy = "default",
  onSortChange,
  onBookFacility,
  onClearFilters,
}: FacilityListProps) {
  const { dict } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);

  // Cards show skeleton loaders for 600ms on mount as specified
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="clinics"
      className="py-16 sm:py-24 bg-cream/50 border-t border-ink/10"
      aria-labelledby="clinics-heading"
    >
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <SectionHeading
            id="clinics-heading"
            eyebrow={dict.sections.clinicsEyebrow}
            title={dict.sections.clinicsTitle}
            intro={dict.sections.clinicsIntro}
            className="mb-0"
          />

          <div className="flex items-center gap-3 flex-wrap self-start md:self-auto">
            {onSortChange && (
              <SortControl
                id="facility-sort-control"
                value={sortBy}
                onChange={onSortChange}
              />
            )}
            <div
              role="status"
              aria-live="polite"
              className="text-xs sm:text-sm font-semibold text-teal bg-teal/10 px-3.5 py-1.5 rounded-full border border-teal/20"
            >
              {facilities.length} {facilities.length === 1 ? "Facility" : "Facilities"} Found
            </div>
          </div>
        </div>

        {/* Loading Skeleton */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <FacilityCardSkeleton key={i} />
            ))}
          </div>
        ) : facilities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility) => (
              <FacilityCard
                key={facility.id}
                facility={facility}
                isGps={isGps}
                onBook={onBookFacility}
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
              <Building2 className="size-8" />
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
