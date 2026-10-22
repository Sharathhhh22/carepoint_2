"use client";

import React, { useMemo } from "react";
import {
  MapPin,
  Clock,
  ExternalLink,
  Star,
  CheckCircle,
  CalendarCheck,
  Phone,
  Navigation,
} from "lucide-react";
import { Facility } from "@/lib/data/facilities";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatINR, openNowStatus } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface FacilityCardProps {
  facility: Facility & { distanceKm?: number };
  isGps?: boolean;
  onBook: (facility: Facility) => void;
}

export function FacilityCard({ facility, isGps = false, onBook }: FacilityCardProps) {
  const { dict } = useLanguage();

  const typeVariant =
    facility.type === "Hospital"
      ? "maroon"
      : facility.type === "Diagnostic centre"
      ? "teal"
      : "default";

  // Compute live open/closed status in Asia/Kolkata timezone
  const openStatus = useMemo(() => {
    return openNowStatus(facility.openingHours);
  }, [facility.openingHours]);

  return (
    <Card hoverable className="border border-ink/10 flex flex-col justify-between">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant={typeVariant} size="sm">
                {facility.type}
              </Badge>
              {facility.verified && (
                <Badge variant="teal" size="sm" icon={<CheckCircle className="size-3.5" />}>
                  {dict.common.sampleVerification}
                </Badge>
              )}
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-maroon pt-1 leading-snug">
              {facility.name}
            </h3>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-1 rounded-DEFAULT shrink-0">
            <Star className="size-3.5 fill-amber-400 text-amber-500" />
            <span className="text-xs font-bold text-ink">
              {facility.sampleRating.toFixed(1)}
            </span>
            <span className="text-[10px] text-ink/60">
              ({facility.sampleReviewCount})
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3.5 text-xs sm:text-sm text-ink/80 flex-1">
        {/* Locality & Address */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 font-semibold text-ink">
            <MapPin className="size-4 text-teal shrink-0" />
            <span>
              {facility.locality}, {facility.city}
            </span>
          </div>
          <p className="text-ink/70 text-xs pl-5.5 leading-relaxed line-clamp-2">
            {facility.address}
          </p>
        </div>

        {/* Distance Display (GPS or Locality Fallback) */}
        {facility.distanceKm !== undefined && (
          <div className="flex items-center gap-1.5 text-xs">
            <Navigation className="size-3.5 text-teal shrink-0" aria-hidden="true" />
            {isGps ? (
              <span className="font-semibold text-teal">
                {facility.distanceKm} km away
              </span>
            ) : (
              <span className="text-ink/75">
                <span className="font-semibold text-ink">
                  {facility.distanceKm} km away
                </span>{" "}
                •{" "}
                <span className="italic text-ink-subtle">
                  Distance based on locality
                </span>
              </span>
            )}
          </div>
        )}

        {/* Structured Open Status & Timings */}
        <div className="space-y-1 pt-0.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            <Clock
              className={`size-3.5 shrink-0 ${
                openStatus.isOpen ? "text-teal" : "text-maroon"
              }`}
            />
            <span className={openStatus.isOpen ? "text-teal" : "text-maroon"}>
              {openStatus.text}
            </span>
          </div>
          <p className="text-[11px] text-ink/60 pl-5">
            Regular timings: {facility.timings}
          </p>
        </div>

        {/* Phone number with tel: link */}
        <div className="flex items-center gap-1.5 text-xs pt-0.5">
          <Phone className="size-3.5 text-teal shrink-0" />
          <a
            href={`tel:${facility.phone.replace(/[\s-]/g, "")}`}
            className="text-teal hover:underline font-medium focus:outline-none focus:ring-1 focus:ring-teal rounded"
            aria-label={`Call ${facility.name} at ${facility.phone}`}
          >
            {facility.phone}
          </a>
        </div>

        {/* Specialities tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {facility.specialities.map((spec) => (
            <span
              key={spec}
              className="px-2 py-0.5 rounded-full bg-cream text-ink/80 text-[11px] font-medium border border-ink/10"
            >
              {spec}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t border-ink/10">
        {/* Fee in ₹ or Fee not listed */}
        <div>
          <span className="text-[11px] block uppercase tracking-wider text-ink/60 font-semibold">
            {dict.common.consultationFee}
          </span>
          {facility.fee !== null ? (
            <div>
              <span className="text-base sm:text-lg font-bold text-maroon">
                {formatINR(facility.fee)}
              </span>
              {facility.feeNote && (
                <span className="block text-[10px] text-ink-subtle leading-tight max-w-[170px]">
                  {facility.feeNote}
                </span>
              )}
            </div>
          ) : (
            <span className="text-xs font-medium text-ink/60 italic">
              {dict.common.feeNotListed}
            </span>
          )}
        </div>

        {/* Action buttons: Directions & Book (DEMO) */}
        <div className="flex items-center gap-2">
          <a
            href={facility.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-2 text-xs font-semibold text-ink/75 hover:text-ink hover:bg-cream/60 rounded-DEFAULT border border-ink/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron transition-colors"
            title={`${dict.common.directions} (opens Google Maps)`}
            aria-label={`${dict.common.directions} for ${facility.name} (opens Google Maps search)`}
          >
            <ExternalLink className="size-3.5 text-teal" />
            <span className="hidden sm:inline">{dict.common.directions}</span>
          </a>

          <Button
            variant="primary"
            size="sm"
            onClick={() => onBook(facility)}
            leftIcon={<CalendarCheck className="size-4" />}
          >
            {dict.common.bookDemo}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
