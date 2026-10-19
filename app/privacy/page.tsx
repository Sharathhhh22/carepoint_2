import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Privacy Policy | CarePoint (Demo)",
  description:
    "CarePoint demonstration website privacy policy. No personal medical or user data is collected or stored.",
};

export default function PrivacyPage() {
  return (
    <div className="py-12 sm:py-20 bg-cream">
      <Container className="max-w-4xl">
        <Link href="/" className="inline-block mb-6">
          <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="size-4" />}>
            Back to Homepage
          </Button>
        </Link>

        <SectionHeading
          eyebrow="Privacy Policy"
          title="CarePoint Privacy & Data Handling"
          intro="Learn how this demonstration clinic discovery platform handles privacy and client simulation."
        />

        <div className="bg-white rounded-card shadow-card border border-ink/10 p-6 sm:p-10 space-y-6 text-sm sm:text-base leading-relaxed text-ink/85">
          <div className="p-4 bg-teal/10 border border-teal/20 rounded-DEFAULT flex items-start gap-3 text-teal font-medium">
            <ShieldCheck className="size-5 shrink-0 mt-0.5" />
            <span>
              <strong>Zero Data Collection Guarantee:</strong> CarePoint is a strictly frontend demonstration created for RYNX Digital Media’s Category 7. It operates without a backend database, telemetry, tracking cookies, or medical record storage.
            </span>
          </div>

          <h2 className="text-xl font-bold text-maroon pt-2">1. Demonstration Scope</h2>
          <p>
            Any text entered into the smart search inputs, appointment simulation modals, demo sign-in dialogs, or newsletter forms is processed strictly in-memory within your local web browser session. No data is transmitted to external servers, cloud storage, or third-party marketing entities.
          </p>

          <h2 className="text-xl font-bold text-maroon pt-2">2. Local Storage Usage</h2>
          <p>
            This website uses your browser&apos;s standard <code>localStorage</code> solely to remember your chosen interface language (English, हिन्दी, ಕನ್ನಡ, தமிழ்). This preference remains locally on your device and can be cleared at any time through your browser settings.
          </p>

          <h2 className="text-xl font-bold text-maroon pt-2">3. Fictional Entities & Personas</h2>
          <p>
            Every clinic, hospital, doctor profile, patient testimonial, address, telephone number, and price shown on CarePoint is completely fictional. Fictional phone numbers utilize the reserved +91 555 sample prefix and example.com domain format.
          </p>

          <h2 className="text-xl font-bold text-maroon pt-2">4. Contact & Inquiries</h2>
          <p>
            For design inquiries regarding this portfolio demonstration project, please contact RYNX Digital Media via <a href="mailto:hello@example.com" className="text-teal font-medium underline">hello@example.com</a>.
          </p>
        </div>
      </Container>
    </div>
  );
}
