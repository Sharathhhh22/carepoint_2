import React, { Suspense } from "react";
import type { Metadata } from "next";
import { DoctorsClient } from "./DoctorsClient";

export const metadata: Metadata = {
  title: "Find a Doctor | Verified Specialists & General Physicians | CarePoint",
  description:
    "Search verified doctors and specialists across Indian healthcare facilities. Transparent consultation fees in ₹, qualifications, patient reviews, and next available appointment slots.",
};

export default function DoctorsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-bg-secondary flex items-center justify-center p-8 text-center">
          <div className="size-8 border-4 border-teal border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm font-semibold text-navy">Loading verified doctors...</p>
        </div>
      }
    >
      <DoctorsClient />
    </Suspense>
  );
}
