import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { specialitiesData } from "@/lib/data/specialities";
import { doctorsData } from "@/lib/data/doctors";
import { facilitiesData } from "@/lib/data/facilities";
import { SpecialtyDetailClient } from "./SpecialtyDetailClient";

interface SpecialtyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: SpecialtyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const specialty = specialitiesData.find((s) => s.slug === slug);

  if (!specialty) {
    return {
      title: "Specialty Not Found | CarePoint Healthcare",
      description: "The requested medical specialty could not be found.",
    };
  }

  return {
    title: `${specialty.name} Department & Doctors | CarePoint Healthcare`,
    description: `Consult verified ${specialty.name} doctors and explore accredited hospital centres. Transparent consultation fees and comprehensive symptom guides.`,
  };
}

export default async function SpecialtyDetailPage({
  params,
}: SpecialtyPageProps) {
  const { slug } = await params;
  const specialty = specialitiesData.find((s) => s.slug === slug);

  if (!specialty) {
    notFound();
  }

  const doctors = doctorsData.filter(
    (d) => d.specialty.toLowerCase() === specialty.name.toLowerCase()
  );

  const facilities = facilitiesData.filter((f) =>
    f.specialities.some(
      (s) => s.toLowerCase() === specialty.name.toLowerCase()
    )
  );

  return (
    <SpecialtyDetailClient
      specialty={specialty}
      doctors={doctors}
      facilities={facilities}
    />
  );
}
