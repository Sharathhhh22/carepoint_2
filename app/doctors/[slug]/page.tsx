import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { doctorsData } from "@/lib/data/doctors";
import { facilitiesData } from "@/lib/data/facilities";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatINR } from "@/lib/utils";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Clock,
  Languages,
  Award,
  ShieldCheck,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  FileText,
} from "lucide-react";
import { DoctorProfileClient } from "./DoctorProfileClient";
import { DoctorReviews } from "@/components/doctor/DoctorReviews";

interface DoctorPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return doctorsData.map((doc) => ({
    slug: doc.slug,
  }));
}

export async function generateMetadata({
  params,
}: DoctorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const doctor = doctorsData.find((d) => d.slug === slug);
  if (!doctor) {
    return {
      title: "Doctor Profile | CarePoint",
    };
  }

  return {
    title: `${doctor.name} - ${doctor.specialty} in ${doctor.city} | CarePoint Clinic`,
    description: `${doctor.name}, ${doctor.qualification}. ${doctor.bio.slice(0, 150)}...`,
  };
}

export default async function DoctorPage({ params }: DoctorPageProps) {
  const { slug } = await params;
  const doctor = doctorsData.find((d) => d.slug === slug);

  if (!doctor) {
    notFound();
  }

  const facility = facilitiesData.find((f) => f.id === doctor.facilityId);

  const initials = doctor.name
    .replace(/^Dr\.\s+/, "")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="py-10 sm:py-16 bg-cream">
      <Container className="max-w-5xl">
        {/* Breadcrumb / Back button */}
        <Link href="/doctors" className="inline-block mb-6">
          <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="size-4" />}>
            Back to Doctor Directory
          </Button>
        </Link>

        {/* Doctor Header Card */}
        <div className="bg-white rounded-card shadow-card border border-ink/10 p-6 sm:p-10 mb-8">
          <div className="flex flex-col md:flex-row items-start gap-6 sm:gap-8">
            {/* Avatar */}
            {doctor.image ? (
              <div className="size-24 sm:size-32 rounded-full overflow-hidden border-4 border-teal shrink-0 shadow-md relative bg-slate-100">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div
                className="size-24 sm:size-32 rounded-full bg-teal-pale border-4 border-teal text-navy font-bold text-3xl sm:text-4xl flex items-center justify-center shrink-0 shadow-md"
                aria-hidden="true"
              >
                {initials}
              </div>
            )}

            {/* Profile Info */}
            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="teal" size="md">
                  {doctor.specialty}
                </Badge>
                {doctor.femaleDoctor && (
                  <Badge variant="maroon" size="md">
                    Female doctor on request
                  </Badge>
                )}
                <Badge variant="teal" size="sm">
                  Verified Clinician
                </Badge>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-maroon tracking-tight">
                {doctor.name}
              </h1>

              <p className="text-sm sm:text-base font-semibold text-ink/80 flex items-center gap-2">
                <Award className="size-4 text-saffron shrink-0" />
                <span>{doctor.qualification}</span>
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-ink/75 pt-1">
                <span className="flex items-center gap-1.5 font-medium">
                  <MapPin className="size-4 text-teal shrink-0" />
                  {doctor.city}, India
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Languages className="size-4 text-teal shrink-0" />
                  {doctor.languages.join(", ")}
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Clock className="size-4 text-teal shrink-0" />
                  {doctor.experienceYears} Years Experience
                </span>
              </div>
            </div>

            {/* Fee & Booking CTA Box */}
            <div className="w-full md:w-auto p-5 bg-cream/40 rounded-card border border-ink/10 flex flex-col items-start md:items-end gap-3 self-stretch md:self-auto justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-ink/60 font-semibold block">
                  Consultation Fee
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-maroon">
                  {formatINR(doctor.fee)}
                </span>
              </div>

              <div className="p-2 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-900 font-medium">
                Next Available: {doctor.nextAvailable}
              </div>

              {/* Client Component Button triggering Appointment Modal */}
              <DoctorProfileClient doctor={doctor} />
            </div>
          </div>
        </div>

        {/* Detailed Grid: Bio, What's Included, & Facility Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Left Column: Bio & What's Included (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Bio Card */}
            <div className="bg-white rounded-card shadow-card border border-ink/10 p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-bold text-maroon border-b border-ink/10 pb-3">
                Professional Biography
              </h2>
              <p className="text-base text-ink/85 leading-relaxed">
                {doctor.bio}
              </p>

              <h3 className="text-base font-bold text-maroon pt-3">
                Clinical Focus & Methodology
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 text-sm text-ink/80">
                <li>Patient-centered evaluation emphasizing evidence-informed medical guidance.</li>
                <li>Preventive lifestyle and nutritional recommendations to safeguard long-term health.</li>
                <li>Collaborative multi-specialty reviews where appropriate for complex cases.</li>
              </ul>
            </div>

            {/* Q1: "What's Included" Card */}
            <div className="bg-white rounded-card shadow-card border border-ink/10 p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-bold text-maroon border-b border-ink/10 pb-3 flex items-center gap-2">
                <FileText className="size-5 text-teal" />
                <span>What’s Included in Consultation</span>
              </h2>

              <ul className="space-y-3 pt-1">
                {doctor.whatsIncluded.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-ink/85 font-medium">
                    <CheckCircle2 className="size-4 text-teal shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="p-3 bg-cream-muted rounded-DEFAULT text-xs text-ink-subtle leading-relaxed border border-ink/5 mt-3">
                Consultation fee excludes applicable taxes. Diagnostic tests and minor surgical procedures are billed separately.
              </div>
            </div>
          </div>

          {/* Right Column: Verified Qualifications Block & Facility (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Q3: Qualifications Block */}
            <div className="bg-white rounded-card shadow-card border border-ink/10 p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-bold text-maroon border-b border-ink/10 pb-3 flex items-center gap-2">
                <ShieldCheck className="size-5 text-teal" />
                <span>Qualifications & Credentials</span>
              </h2>

              <div className="space-y-3.5">
                {/* Qualification */}
                <div className="p-3 bg-cream/40 rounded-DEFAULT border border-ink/10 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs uppercase font-bold text-ink/60">Degree Qualification</span>
                    <Badge variant="teal" size="sm">Verified</Badge>
                  </div>
                  <div className="text-sm font-semibold text-ink">{doctor.qualification}</div>
                </div>

                {/* Specialty */}
                <div className="p-3 bg-cream/40 rounded-DEFAULT border border-ink/10 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs uppercase font-bold text-ink/60">Medical Specialty</span>
                    <Badge variant="teal" size="sm">Verified</Badge>
                  </div>
                  <div className="text-sm font-semibold text-ink">{doctor.specialty}</div>
                </div>

                {/* Experience */}
                <div className="p-3 bg-cream/40 rounded-DEFAULT border border-ink/10 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs uppercase font-bold text-ink/60">Clinical Experience</span>
                    <Badge variant="teal" size="sm">Verified</Badge>
                  </div>
                  <div className="text-sm font-semibold text-ink">{doctor.experienceYears} Years active clinical practice</div>
                </div>

                {/* Languages */}
                <div className="p-3 bg-cream/40 rounded-DEFAULT border border-ink/10 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs uppercase font-bold text-ink/60">Languages Spoken</span>
                    <Badge variant="teal" size="sm">Verified</Badge>
                  </div>
                  <div className="text-sm font-semibold text-ink">{doctor.languages.join(", ")}</div>
                </div>

                {/* Facility */}
                <div className="p-3 bg-cream/40 rounded-DEFAULT border border-ink/10 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs uppercase font-bold text-ink/60">Practicing Facility</span>
                    <Badge variant="teal" size="sm">Verified</Badge>
                  </div>
                  <div className="text-sm font-semibold text-ink">{facility ? facility.name : "CarePoint Facility"}</div>
                </div>
              </div>

              {/* Verified NMC Registry Note */}
              <div className="p-3.5 bg-teal-pale/50 border border-teal/20 rounded-DEFAULT text-xs text-navy leading-relaxed font-medium">
                <ShieldCheck className="size-4 inline text-teal mr-1.5 -mt-0.5" />
                Degrees and state council registrations are verified with the National Medical Commission (NMC).
              </div>
            </div>

            {/* Practicing Facility Card */}
            <div className="bg-white rounded-card shadow-card border border-ink/10 p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-bold text-maroon border-b border-ink/10 pb-3 flex items-center gap-2">
                <Building2 className="size-5 text-maroon" />
                <span>Facility Details</span>
              </h2>

              {facility ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="default" size="sm">
                      {facility.type}
                    </Badge>
                    <Badge variant="teal" size="sm">
                      NABH Accredited
                    </Badge>
                  </div>

                  <h3 className="text-lg font-bold text-maroon">
                    {facility.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-ink/80 flex items-start gap-2">
                    <MapPin className="size-4 text-teal shrink-0 mt-0.5" />
                    <span>{facility.address}</span>
                  </p>

                  <p className="text-xs text-ink/75 flex items-center gap-2">
                    <Clock className="size-4 text-saffron shrink-0" />
                    <span>{facility.timings}</span>
                  </p>

                  <div className="pt-2 flex flex-col gap-2">
                    <a
                      href={facility.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-DEFAULT border border-ink/20 text-xs sm:text-sm font-semibold text-ink hover:bg-cream transition-colors"
                    >
                      <ExternalLink className="size-4 text-teal" />
                      <span>Get Directions (Google Maps)</span>
                    </a>

                    <Link href="/hospitals">
                      <Button variant="ghost" size="sm" fullWidth>
                        View All Facilities
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-ink/70">
                  Facility information currently unavailable.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Patient Reviews Section */}
        <DoctorReviews
          reviews={doctor.reviews}
          overallRating={4.8}
        />
      </Container>
    </div>
  );
}
