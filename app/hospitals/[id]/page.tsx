import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { facilitiesData } from "@/lib/data/facilities";
import { doctorsData } from "@/lib/data/doctors";
import { FacilityDetailClient } from "./FacilityDetailClient";

interface FacilityPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return facilitiesData.map((f) => ({
    id: f.id,
  }));
}

export async function generateMetadata({
  params,
}: FacilityPageProps): Promise<Metadata> {
  const { id } = await params;
  const facility = facilitiesData.find((f) => f.id === id);

  if (!facility) {
    return {
      title: "Facility Not Found | CarePoint Healthcare",
      description: "The requested healthcare facility could not be found.",
    };
  }

  return {
    title: `${facility.name} | ${facility.locality}, ${facility.city} | CarePoint`,
    description: `Consult verified doctors, view outpatient consultation fees, and access directions for ${facility.name} in ${facility.city}, ${facility.state}.`,
  };
}

export default async function FacilityDetailPage({ params }: FacilityPageProps) {
  const { id } = await params;
  const facility = facilitiesData.find((f) => f.id === id);

  if (!facility) {
    notFound();
  }

  const affiliatedDoctors = doctorsData.filter((d) => d.facilityId === facility.id);

  return (
    <FacilityDetailClient
      facility={facility}
      affiliatedDoctors={affiliatedDoctors}
    />
  );
}
