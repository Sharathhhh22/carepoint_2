"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Stethoscope,
  Smile,
  Sparkles,
  Baby,
  HeartHandshake,
  Bone,
  HeartPulse,
  Eye,
  Activity,
  Zap,
  ShieldCheck,
  Microscope,
  ArrowLeft,
  Calendar,
  Building2,
  CheckCircle2,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Speciality, specialitiesData } from "@/lib/data/specialities";
import { Doctor, doctorsData } from "@/lib/data/doctors";
import { Facility, facilitiesData } from "@/lib/data/facilities";
import { formatINR } from "@/lib/utils";
import { AppointmentDialog } from "@/components/modals/AppointmentDialog";

interface SpecialtyDetailClientProps {
  specialty: Speciality;
  doctors: Doctor[];
  facilities: Facility[];
}

const ICON_MAP = {
  Stethoscope,
  Smile,
  Sparkles,
  Baby,
  HeartHandshake,
  Bone,
  HeartPulse,
  Eye,
  Activity,
  Zap,
  ShieldCheck,
  Microscope,
};

export function SpecialtyDetailClient({
  specialty,
  doctors,
  facilities,
}: SpecialtyDetailClientProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<Doctor | null>(
    doctors[0] || doctorsData[0]
  );

  const Icon = ICON_MAP[specialty.iconName] || Stethoscope;

  const relatedSpecialties = specialitiesData
    .filter((s) => s.id !== specialty.id)
    .slice(0, 4);

  return (
    <div className="bg-bg-secondary min-h-screen pb-20">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-border py-3">
        <Container>
          <div className="flex items-center justify-between text-xs text-text-secondary">
            <Link
              href="/specialties"
              className="inline-flex items-center gap-1.5 text-teal font-semibold hover:underline"
            >
              <ArrowLeft className="size-3.5" />
              <span>Back to Specialties Index</span>
            </Link>
            <span className="text-[11px] bg-teal-pale text-teal font-bold px-2.5 py-0.5 rounded">
              Clinical Department
            </span>
          </div>
        </Container>
      </div>

      {/* Specialty Header */}
      <section className="bg-white border-b border-border py-10 lg:py-14">
        <Container>
          <div className="max-w-3xl">
            <div className="size-14 rounded-xl bg-teal-pale text-teal flex items-center justify-center mb-5 border border-teal/20">
              <Icon className="size-7" />
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-navy mb-4">
              {specialty.name}
            </h1>

            <p className="text-base sm:text-lg text-text-secondary leading-relaxed mb-6">
              {specialty.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
              <div className="bg-bg-secondary px-3.5 py-1.5 rounded-md border border-border font-semibold text-navy">
                Sample consultation from {formatINR(specialty.sampleConsultationFee)}
              </div>
              <div className="bg-bg-secondary px-3.5 py-1.5 rounded-md border border-border text-text-secondary">
                {doctors.length} verified clinician{doctors.length !== 1 ? "s" : ""} on roster
              </div>
              <div className="bg-bg-secondary px-3.5 py-1.5 rounded-md border border-border text-text-secondary">
                Available at {facilities.length} network facility centres
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content Columns */}
      <Container className="pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Conditions, Procedures, Doctors */}
          <div className="lg:col-span-2 space-y-8">
            {/* Common Conditions Treated */}
            {specialty.conditions && (
              <section className="bg-white rounded-lg p-6 border border-border shadow-card">
                <h2 className="text-lg font-bold text-navy mb-2 flex items-center gap-2">
                  <Activity className="size-5 text-teal" />
                  <span>Conditions & Symptoms Treated</span>
                </h2>
                <p className="text-xs text-text-secondary mb-4 leading-relaxed">
                  Informational overview of routine conditions evaluated in outpatient clinics. This guidance is general and does not replace in-person medical diagnosis.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {specialty.conditions.map((item) => (
                    <div
                      key={item}
                      className="p-3 rounded-md bg-bg-secondary border border-border flex items-center gap-2.5"
                    >
                      <CheckCircle2 className="size-4 text-teal shrink-0" />
                      <span className="text-xs font-semibold text-navy">{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Diagnostic Procedures */}
            {specialty.procedures && (
              <section className="bg-white rounded-lg p-6 border border-border shadow-card">
                <h2 className="text-lg font-bold text-navy mb-2 flex items-center gap-2">
                  <ShieldCheck className="size-5 text-teal" />
                  <span>Diagnostic Procedures & Clinical Evaluations</span>
                </h2>
                <p className="text-xs text-text-secondary mb-4">
                  Standard investigations recommended by experienced clinicians to assess patient progress.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {specialty.procedures.map((proc) => (
                    <div
                      key={proc}
                      className="p-3 rounded-md bg-bg-secondary border border-border flex items-center gap-2.5"
                    >
                      <span className="size-2 rounded-full bg-teal shrink-0" />
                      <span className="text-xs font-semibold text-navy">{proc}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* When to Consult Advisory */}
            {specialty.whenToConsult && (
              <section className="bg-white rounded-lg p-6 border border-border shadow-card">
                <h2 className="text-lg font-bold text-navy mb-2 flex items-center gap-2">
                  <HelpCircle className="size-5 text-teal" />
                  <span>When Should You Consult a {specialty.name} Specialist?</span>
                </h2>
                <p className="text-xs text-text-secondary mb-4">
                  Key indicators that warrant in-person clinical assessment
                </p>
                <ul className="space-y-2.5 text-xs text-text-primary">
                  {specialty.whenToConsult.map((adv) => (
                    <li key={adv} className="flex items-start gap-2">
                      <span className="text-teal font-bold mt-0.5">•</span>
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Verified Doctors in this Specialty */}
            <section className="bg-white rounded-lg p-6 border border-border shadow-card">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-lg font-bold text-navy flex items-center gap-2">
                    <Stethoscope className="size-5 text-teal" />
                    <span>Specialist Clinicians ({doctors.length})</span>
                  </h2>
                  <p className="text-xs text-text-secondary mt-0.5">
                    Verified doctors consulting in {specialty.name}
                  </p>
                </div>
                <Link
                  href={`/doctors?specialty=${encodeURIComponent(specialty.name)}`}
                  className="text-xs font-semibold text-teal hover:underline"
                >
                  View All in Directory →
                </Link>
              </div>

              {doctors.length === 0 ? (
                <p className="text-xs text-text-secondary py-4">
                  Consultation schedules for {specialty.name} are updated weekly. Check our hospital directory for on-call visiting faculty.
                </p>
              ) : (
                <div className="divide-y divide-border">
                  {doctors.map((doc) => {
                    const docFacility = facilitiesData.find((f) => f.id === doc.facilityId);

                    return (
                      <div
                        key={doc.id}
                        className="py-4 first:pt-2 last:pb-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div>
                          <Link
                            href={`/doctors/${doc.slug}`}
                            className="font-bold text-base text-navy hover:text-teal transition-colors"
                          >
                            {doc.name}
                          </Link>
                          <p className="text-xs text-text-secondary mt-0.5">
                            {doc.qualification} • {doc.experienceYears} yrs experience
                          </p>
                          {docFacility && (
                            <p className="text-xs text-text-primary mt-1 flex items-center gap-1">
                              <Building2 className="size-3 text-teal" />
                              <span>{docFacility.name} ({doc.city})</span>
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                          <div className="text-right">
                            <span className="text-[11px] text-text-secondary block">Fee</span>
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
                    );
                  })}
                </div>
              )}
            </section>
          </div>

          {/* Right Col: Facilities with this specialty & Related Specialties */}
          <div className="space-y-6">
            {/* Quick Booking CTA Box */}
            <div className="bg-white rounded-lg p-6 border border-border shadow-card">
              <h3 className="text-base font-bold text-navy mb-2">Book a Consultation</h3>
              <p className="text-xs text-text-secondary mb-4 leading-relaxed">
                Schedule an in-clinic or telemedicine consultation with a verified {specialty.name} specialist.
              </p>
              <Button
                fullWidth
                size="md"
                onClick={() => setIsBookingOpen(true)}
                leftIcon={<Calendar className="size-4" />}
              >
                Book Appointment (DEMO)
              </Button>
            </div>

            {/* Hospitals offering this specialty */}
            <div className="bg-white rounded-lg p-6 border border-border shadow-card">
              <h3 className="text-base font-bold text-navy mb-3 flex items-center gap-2">
                <Building2 className="size-4 text-teal" />
                <span>Centres with {specialty.name}</span>
              </h3>
              <div className="space-y-3 text-xs">
                {facilities.slice(0, 4).map((fac) => (
                  <div key={fac.id} className="p-3 rounded bg-bg-secondary border border-border">
                    <Link
                      href={`/hospitals/${fac.id}`}
                      className="font-bold text-navy hover:text-teal block mb-1"
                    >
                      {fac.name}
                    </Link>
                    <span className="text-text-secondary block">
                      {fac.locality}, {fac.city}
                    </span>
                  </div>
                ))}
              </div>
              <Link
                href={`/hospitals?specialty=${encodeURIComponent(specialty.name)}`}
                className="mt-4 block text-center text-xs font-semibold text-teal hover:underline"
              >
                View all centres offering this specialty →
              </Link>
            </div>

            {/* Related Specialties */}
            <div className="bg-white rounded-lg p-6 border border-border shadow-card">
              <h3 className="text-base font-bold text-navy mb-3">Related Departments</h3>
              <div className="space-y-2 text-xs">
                {relatedSpecialties.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/specialties/${rel.slug}`}
                    className="flex items-center justify-between p-2.5 rounded hover:bg-bg-secondary text-text-primary hover:text-teal transition-colors font-medium"
                  >
                    <span>{rel.name}</span>
                    <ChevronRight className="size-3.5 text-text-secondary" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Appointment Dialog */}
      <AppointmentDialog
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        doctor={selectedDoctorForBooking}
        facility={
          selectedDoctorForBooking
            ? facilitiesData.find((f) => f.id === selectedDoctorForBooking.facilityId)
            : facilities[0]
        }
      />
    </div>
  );
}
