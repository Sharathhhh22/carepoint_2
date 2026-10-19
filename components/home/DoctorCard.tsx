"use client";

import React from "react";
import Link from "next/link";
import { Doctor } from "@/lib/data/doctors";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatINR } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Clock, CalendarCheck, UserCheck, Languages } from "lucide-react";

interface DoctorCardProps {
  doctor: Doctor;
  onBook: (doctor: Doctor) => void;
}

export function DoctorCard({ doctor, onBook }: DoctorCardProps) {
  const { dict } = useLanguage();

  // Create clean initials avatar
  const initials = doctor.name
    .replace(/^Dr\.\s+/, "")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <Card hoverable className="border border-ink/10">
      <CardHeader>
        <div className="flex items-start gap-3.5">
          {/* Initials Avatar */}
          <div
            className="size-14 sm:size-16 rounded-full bg-saffron/20 border-2 border-saffron text-maroon font-bold text-lg sm:text-xl flex items-center justify-center shrink-0 shadow-sm"
            aria-hidden="true"
          >
            {initials}
          </div>

          <div className="space-y-1 flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <Badge variant="teal" size="sm">
                {doctor.specialty}
              </Badge>
              {doctor.femaleDoctor && (
                <Badge variant="maroon" size="sm" icon={<UserCheck className="size-3" />}>
                  {dict.common.femaleDoctorBadge}
                </Badge>
              )}
            </div>

            <h3 className="text-lg font-bold text-maroon leading-tight truncate">
              {doctor.name}
            </h3>

            <p className="text-xs text-ink/75 truncate font-medium">
              {doctor.qualification}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 text-xs sm:text-sm text-ink/80">
        <p className="text-xs text-ink/70 leading-relaxed line-clamp-2">
          {doctor.bio}
        </p>

        {/* Experience and Languages */}
        <div className="space-y-1.5 pt-1 border-t border-ink/5">
          <div className="text-xs text-ink/80 font-medium">
            <span className="font-semibold text-ink">Experience:</span> {doctor.experienceYears} Years clinical practice
          </div>

          <div className="flex items-center gap-1.5 text-xs text-ink/75">
            <Languages className="size-3.5 text-teal shrink-0" />
            <span className="truncate">
              {doctor.languages.join(", ")}
            </span>
          </div>
        </div>

        {/* Sample Availability Notice */}
        <div className="p-2.5 bg-amber-50 border border-amber-200/80 rounded-DEFAULT text-xs text-amber-900 flex items-center gap-2">
          <Clock className="size-3.5 text-amber-700 shrink-0" />
          <span className="font-medium truncate">
            Sample availability: {doctor.nextAvailable}
          </span>
        </div>
      </CardContent>

      <CardFooter>
        <div>
          <span className="text-[11px] block uppercase tracking-wider text-ink/60 font-semibold">
            {dict.common.consultationFee}
          </span>
          <span className="text-base sm:text-lg font-bold text-maroon">
            {formatINR(doctor.fee)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link href={`/doctors/${doctor.slug}`}>
            <Button variant="outline" size="sm">
              {dict.common.viewProfile}
            </Button>
          </Link>

          <Button
            variant="primary"
            size="sm"
            onClick={() => onBook(doctor)}
            leftIcon={<CalendarCheck className="size-4" />}
          >
            {dict.common.bookDemo}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
