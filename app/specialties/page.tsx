import React from "react";
import type { Metadata } from "next";
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
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { specialitiesData } from "@/lib/data/specialities";
import { doctorsData } from "@/lib/data/doctors";
import { facilitiesData } from "@/lib/data/facilities";
import { formatINR } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Medical Specialties & Clinical Departments | CarePoint",
  description:
    "Explore 12+ clinical specialties including Cardiology, Neurology, Orthopaedics, Paediatrics, and Gynaecology with verified doctors across top Indian healthcare centres.",
};

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

export default function SpecialtiesIndexPage() {
  return (
    <div className="bg-bg-secondary min-h-screen pb-16">
      {/* Hero Header */}
      <section className="bg-navy text-white py-12 border-b border-border">
        <Container>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal/20 text-teal-pale text-xs font-semibold mb-4 border border-teal/40">
              <Activity className="size-3.5" />
              <span>Centres of Clinical Excellence</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
              Explore Medical Specialties
            </h1>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              CarePoint connects patients with accredited tertiary care and community polyclinics across 12 clinical specialties. Review common conditions treated, consultation fee ranges, and discover experienced clinicians.
            </p>
          </div>
        </Container>
      </section>

      {/* Grid of Specialties */}
      <Container className="pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialitiesData.map((spec) => {
            const Icon = ICON_MAP[spec.iconName] || Stethoscope;
            const doctorCount = doctorsData.filter(
              (d) => d.specialty.toLowerCase() === spec.name.toLowerCase()
            ).length;
            const facilityCount = facilitiesData.filter((f) =>
              f.specialities.some((s) => s.toLowerCase() === spec.name.toLowerCase())
            ).length;

            return (
              <article
                key={spec.id}
                className="bg-white rounded-lg border border-border shadow-card hover:shadow-dropdown transition-all flex flex-col justify-between p-6 group"
              >
                <div>
                  <div className="size-12 rounded-lg bg-teal-pale text-teal flex items-center justify-center mb-4 group-hover:bg-teal group-hover:text-white transition-colors">
                    <Icon className="size-6" />
                  </div>

                  <h2 className="text-xl font-bold text-navy mb-2 group-hover:text-teal transition-colors">
                    <Link href={`/specialties/${spec.slug}`}>{spec.name}</Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-4">
                    {spec.description}
                  </p>

                  <div className="flex flex-wrap gap-2 text-xs text-text-secondary mb-4">
                    <span className="bg-bg-secondary px-2.5 py-1 rounded border border-border font-semibold text-navy">
                      {doctorCount} verified doctor{doctorCount !== 1 ? "s" : ""}
                    </span>
                    <span className="bg-bg-secondary px-2.5 py-1 rounded border border-border">
                      {facilityCount} facility centre{facilityCount !== 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="text-xs text-text-secondary">
                    <span>Sample OPD from </span>
                    <span className="font-bold text-teal">
                      {formatINR(spec.sampleConsultationFee)}
                    </span>
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-border flex items-center justify-between">
                  <Link
                    href={`/specialties/${spec.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-teal hover:underline"
                  >
                    <span>View Department Details</span>
                    <ArrowRight className="size-3.5" />
                  </Link>

                  <Link
                    href={`/doctors?specialty=${encodeURIComponent(spec.name)}`}
                    className="text-xs text-text-secondary hover:text-navy font-semibold"
                  >
                    Find Doctors →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
