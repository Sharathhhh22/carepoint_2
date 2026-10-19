import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowLeft, FileText, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Terms of Use | CarePoint (Demo)",
  description:
    "CarePoint demonstration website terms of use for RYNX Digital Media portfolio assessment.",
};

export default function TermsPage() {
  return (
    <div className="py-12 sm:py-20 bg-cream">
      <Container className="max-w-4xl">
        <Link href="/" className="inline-block mb-6">
          <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="size-4" />}>
            Back to Homepage
          </Button>
        </Link>

        <SectionHeading
          eyebrow="Terms of Use"
          title="Portfolio Demonstration Terms"
          intro="Important operational guidelines and medical disclaimer regarding this sample project."
        />

        <div className="bg-white rounded-card shadow-card border border-ink/10 p-6 sm:p-10 space-y-6 text-sm sm:text-base leading-relaxed text-ink/85">
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-DEFAULT flex items-start gap-3 text-amber-900 text-sm">
            <AlertCircle className="size-5 shrink-0 text-amber-700 mt-0.5" />
            <span>
              <strong>Non-Clinical Medical Disclaimer:</strong> CarePoint is purely an interactive user-interface demonstration built for RYNX Digital Media Category 7: Clinic & Healthcare Website. It does not provide medical services, clinical diagnosis, prescription writing, or real appointment scheduling.
            </span>
          </div>

          <h2 className="text-xl font-bold text-maroon pt-2">1. Portfolio and Showcase Purpose</h2>
          <p>
            This website is presented solely to showcase modern front-end web engineering, accessible UI design, responsive layouts for Indian metropolitan cities, and multilingual interface implementations. No real medical practitioner is affiliated with or bookable through this site.
          </p>

          <h2 className="text-xl font-bold text-maroon pt-2">2. Emergency Situations</h2>
          <p>
            If you or someone you know is experiencing acute symptoms, severe pain, breathing distress, chest heaviness, or trauma, do not use this website. Immediately dial <strong>112</strong> (National Emergency Response Support System in India) or report to the nearest hospital casualty department.
          </p>

          <h2 className="text-xl font-bold text-maroon pt-2">3. Intellectual Property & Images</h2>
          <p>
            Photographs displayed on this demonstration site are sourced from licensed, royalty-free creative platforms (Unsplash / Pexels) depicting Indian healthcare environments. Complete licensing credits and photographer attributions are compiled in our documentation.
          </p>

          <h2 className="text-xl font-bold text-maroon pt-2">4. Third-Party Portals & Schemes</h2>
          <p>
            Links to external government healthcare schemes (such as Ayushman Bharat PM-JAY) are provided solely for informational context. CarePoint has no affiliation with any government body, insurance carrier, or third-party administrator.
          </p>
        </div>
      </Container>
    </div>
  );
}
