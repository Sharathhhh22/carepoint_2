"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Phone,
  Navigation,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  Stethoscope,
  ArrowLeft,
  Share2,
  Check,
  Activity,
  HeartPulse,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Facility, Weekday } from "@/lib/data/facilities";
import { Doctor, doctorsData } from "@/lib/data/doctors";
import { formatINR, openNowStatus } from "@/lib/utils";
import { AppointmentDialog } from "@/components/modals/AppointmentDialog";

interface FacilityDetailClientProps {
  facility: Facility;
  affiliatedDoctors: Doctor[];
}

const WEEKDAY_DISPLAY: Record<Weekday, string> = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

export function FacilityDetailClient({
  facility,
  affiliatedDoctors,
}: FacilityDetailClientProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<Doctor | null>(
    affiliatedDoctors[0] || doctorsData[0]
  );
  const [isCopied, setIsCopied] = useState(false);

  const openStatus = openNowStatus(facility.openingHours);

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="bg-bg-secondary min-h-screen pb-20">
      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-border py-3">
        <Container>
          <div className="flex items-center justify-between text-xs text-text-secondary">
            <Link
              href="/hospitals"
              className="inline-flex items-center gap-1.5 text-teal font-semibold hover:underline"
            >
              <ArrowLeft className="size-3.5" />
              <span>Back to Hospitals Directory</span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-[11px] bg-bg-secondary px-2 py-0.5 rounded border border-border">
                {facility.state}
              </span>
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1 text-navy hover:text-teal font-semibold"
                aria-label="Share facility link"
              >
                {isCopied ? (
                  <>
                    <Check className="size-3.5 text-green-600" />
                    <span className="text-green-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="size-3.5" />
                    <span>Share</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* Hero / Header Section */}
      <section className="bg-white border-b border-border py-8 lg:py-12">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-teal bg-teal-pale px-2.5 py-1 rounded">
                  {facility.type}
                </span>
                <span className="text-xs font-bold text-navy bg-amber-50 text-amber-900 border border-amber-200 px-2.5 py-0.5 rounded">
                  ★ {facility.sampleRating} ({facility.sampleReviewCount} sample reviews)
                </span>
                <Badge variant="teal">Sample verification</Badge>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy tracking-tight mb-3">
                {facility.name}
              </h1>

              <p className="text-sm text-text-secondary leading-relaxed mb-5">
                {facility.about ||
                  "Modern healthcare institution dedicated to clinical excellence, patient dignity, and transparent consultation protocols."}
              </p>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-text-primary bg-bg-secondary p-4 rounded-lg border border-border">
                <div className="flex items-start gap-2">
                  <MapPin className="size-4 text-teal shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-navy">Address</span>
                    <span>{facility.address}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="size-4 text-teal shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-navy">Operating Timings</span>
                    <span className="text-green-700 font-semibold">{openStatus.text}</span>
                    <span className="block text-text-secondary">{facility.timings}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="size-4 text-teal shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-navy">General Desk</span>
                    <a href={`tel:${facility.phone}`} className="hover:underline text-teal font-semibold">
                      {facility.phone}
                    </a>
                  </div>
                </div>
                {facility.emergencyPhone && (
                  <div className="flex items-start gap-2">
                    <HeartPulse className="size-4 text-emergency shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block text-emergency">24/7 Emergency Helpline</span>
                      <a href={`tel:${facility.emergencyPhone}`} className="hover:underline text-emergency font-bold">
                        {facility.emergencyPhone}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Booking & Action Box */}
            <div className="bg-bg-secondary rounded-lg p-6 border border-border shadow-card">
              <h2 className="text-base font-bold text-navy mb-1">Consultation & OPD</h2>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-extrabold text-teal">
                  {facility.fee ? formatINR(facility.fee) : "Fee not listed"}
                </span>
                <span className="text-xs text-text-secondary">(Sample fee)</span>
              </div>
              <p className="text-xs text-text-secondary mb-5 leading-relaxed">
                {facility.feeNote || "Includes general OPD examination and vital review. Diagnostics billed separately."}
              </p>

              <div className="space-y-2.5">
                <Button
                  fullWidth
                  size="lg"
                  onClick={() => setIsBookingOpen(true)}
                  leftIcon={<Calendar className="size-4" />}
                >
                  Book Appointment (DEMO)
                </Button>

                <a
                  href={facility.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-md border border-border bg-white text-navy font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-teal-pale hover:text-teal transition-colors shadow-sm"
                >
                  <Navigation className="size-4 text-teal" />
                  <span>Get Directions on Google Maps</span>
                </a>
              </div>

              <div className="mt-4 pt-4 border-t border-border/80 text-[11px] text-text-secondary space-y-1">
                <p className="flex items-center gap-1 text-green-700 font-semibold">
                  <CheckCircle2 className="size-3" />
                  <span>Cashless insurance desk active (demo)</span>
                </p>
                <p>• Prior appointment recommended for specialist OPD</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Body Columns */}
      <Container className="pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Doctors, Specialties, Amenities */}
          <div className="lg:col-span-2 space-y-8">
            {/* Affiliated Doctors Section */}
            <section className="bg-white rounded-lg p-6 border border-border shadow-card">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-lg font-bold text-navy flex items-center gap-2">
                    <Stethoscope className="size-5 text-teal" />
                    <span>Doctors at this Facility ({affiliatedDoctors.length})</span>
                  </h2>
                  <p className="text-xs text-text-secondary mt-0.5">
                    Experienced clinicians consulting at {facility.name}
                  </p>
                </div>
                <Link href="/doctors" className="text-xs font-semibold text-teal hover:underline">
                  All Doctors →
                </Link>
              </div>

              {affiliatedDoctors.length === 0 ? (
                <p className="text-xs text-text-secondary py-4">
                  Doctor rosters are updated regularly. Contact the clinic desk directly for OPD visiting schedules.
                </p>
              ) : (
                <div className="divide-y divide-border">
                  {affiliatedDoctors.map((doc) => (
                    <div
                      key={doc.id}
                      className="py-4 first:pt-2 last:pb-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div>
                        <Link
                          href={`/doctors/${doc.slug}`}
                          className="font-bold text-navy hover:text-teal transition-colors text-base"
                        >
                          {doc.name}
                        </Link>
                        <p className="text-xs text-teal font-semibold">{doc.specialty}</p>
                        <p className="text-xs text-text-secondary mt-0.5">
                          {doc.qualification} • {doc.experienceYears} yrs clinical experience
                        </p>
                        <p className="text-xs text-text-secondary mt-1">
                          Languages: {doc.languages.join(", ")}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                        <div className="text-right">
                          <span className="text-xs text-text-secondary block">Fee</span>
                          <span className="font-bold text-sm text-navy">{formatINR(doc.fee)}</span>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedDoctorForBooking(doc);
                            setIsBookingOpen(true);
                          }}
                        >
                          Book (DEMO)
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Specialties Available */}
            <section className="bg-white rounded-lg p-6 border border-border shadow-card">
              <h2 className="text-lg font-bold text-navy mb-2 flex items-center gap-2">
                <Activity className="size-5 text-teal" />
                <span>Specialties & Departments</span>
              </h2>
              <p className="text-xs text-text-secondary mb-4">
                Clinical services and specialist care available at this campus
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {facility.specialities.map((spec) => (
                  <div
                    key={spec}
                    className="p-3 rounded-md bg-bg-secondary border border-border/80 flex items-center gap-2"
                  >
                    <CheckCircle2 className="size-4 text-teal shrink-0" />
                    <span className="text-xs font-semibold text-navy">{spec}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Amenities & Infrastructure */}
            {facility.amenities && facility.amenities.length > 0 && (
              <section className="bg-white rounded-lg p-6 border border-border shadow-card">
                <h2 className="text-lg font-bold text-navy mb-3">Campus Infrastructure & Patient Amenities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {facility.amenities.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-text-primary">
                      <span className="size-2 rounded-full bg-teal shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Col: Weekly Timings Schedule & Quality Standards */}
          <div className="space-y-6">
            {/* Weekly Timings */}
            <div className="bg-white rounded-lg p-6 border border-border shadow-card">
              <h3 className="text-base font-bold text-navy mb-3 flex items-center gap-2">
                <Clock className="size-4 text-teal" />
                <span>Weekly OPD Timings</span>
              </h3>
              <div className="space-y-2 text-xs divide-y divide-border">
                {(["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as Weekday[]).map((day) => {
                  const hours = facility.openingHours[day];
                  return (
                    <div key={day} className="flex items-center justify-between py-1.5 first:pt-0">
                      <span className="font-semibold text-navy">{WEEKDAY_DISPLAY[day]}</span>
                      <span className={hours ? "text-text-primary font-mono" : "text-gray-400 italic"}>
                        {hours ? `${hours[0]} - ${hours[1]}` : "Closed"}
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="text-[11px] text-text-secondary mt-4 leading-relaxed bg-bg-secondary p-2.5 rounded">
                Note: Emergency triage desk operates 24 hours regardless of outpatient consulting schedules.
              </p>
            </div>

            {/* Quality & Safety Disclaimer */}
            <div className="bg-white rounded-lg p-6 border border-border shadow-card text-xs text-text-secondary space-y-3">
              <div className="flex items-center gap-2 text-navy font-bold">
                <ShieldCheck className="size-5 text-teal" />
                <span>Verification Policy</span>
              </div>
              <p className="leading-relaxed">
                In a live listing, hospital licences and clinician affiliations are verified against state clinical establishment registries. This portal displays illustrative sample data for RYNX Digital Media Category 7.
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* Appointment Booking Modal */}
      <AppointmentDialog
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        facility={facility}
        doctor={selectedDoctorForBooking}
      />
    </div>
  );
}
