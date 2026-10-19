import React, { Suspense } from "react";
import type { Metadata } from "next";
import { HospitalsClient } from "./HospitalsClient";

export const metadata: Metadata = {
  title: "Hospitals & Clinics Directory | CarePoint Healthcare India",
  description:
    "Explore multi-specialty hospitals, polyclinics, and diagnostic scan centres across Karnataka, Maharashtra, Delhi NCR, Tamil Nadu, and across India with verified operating hours and consultation fees.",
};

export default function HospitalsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-bg-secondary flex items-center justify-center p-8 text-center">
          <div className="size-8 border-4 border-teal border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm font-semibold text-navy">Loading healthcare facilities...</p>
        </div>
      }
    >
      <HospitalsClient />
    </Suspense>
  );
}
