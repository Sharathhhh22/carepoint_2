import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import {
  Home,
  Search,
  Stethoscope,
  Building2,
  Activity,
  PhoneCall,
  ShieldAlert,
} from "lucide-react";

export default function NotFound() {
  return (
    <div className="py-16 sm:py-24 bg-bg-secondary min-h-[75vh] flex items-center justify-center">
      <Container className="text-center max-w-2xl">
        {/* 404 Header Badge */}
        <div className="size-20 mx-auto rounded-xl bg-teal-pale text-teal flex items-center justify-center font-extrabold text-3xl mb-6 shadow-sm border border-teal/20">
          404
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight mb-4">
          Page or Record Not Found
        </h1>

        <p className="text-base sm:text-lg text-text-secondary leading-relaxed mb-8 max-w-lg mx-auto">
          The clinic profile, doctor record, or healthcare resource you requested is unavailable or may have been moved.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10">
          <Link href="/" className="w-full sm:w-auto">
            <Button
              variant="primary"
              size="md"
              fullWidth
              leftIcon={<Home className="size-4" />}
              className="font-bold py-3"
            >
              Return to Homepage
            </Button>
          </Link>
          <Link href="/doctors" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="md"
              fullWidth
              leftIcon={<Stethoscope className="size-4 text-teal" />}
              className="font-bold py-3"
            >
              Search Doctors Directory
            </Button>
          </Link>
        </div>

        {/* Quick Directory Links Grid */}
        <div className="p-6 bg-white rounded-lg border border-border shadow-card text-left max-w-lg mx-auto mb-8">
          <h2 className="text-xs font-bold text-navy uppercase tracking-wider mb-3">
            Popular Healthcare Resources:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <Link
              href="/hospitals"
              className="p-2.5 rounded-md hover:bg-teal-pale text-text-primary hover:text-navy flex items-center gap-2 border border-border/60 transition-colors"
            >
              <Building2 className="size-4 text-teal shrink-0" />
              <span>Hospitals & Clinics</span>
            </Link>
            <Link
              href="/specialties"
              className="p-2.5 rounded-md hover:bg-teal-pale text-text-primary hover:text-navy flex items-center gap-2 border border-border/60 transition-colors"
            >
              <Activity className="size-4 text-teal shrink-0" />
              <span>Medical Specialties</span>
            </Link>
            <Link
              href="/#services"
              className="p-2.5 rounded-md hover:bg-teal-pale text-text-primary hover:text-navy flex items-center gap-2 border border-border/60 transition-colors"
            >
              <Search className="size-4 text-teal shrink-0" />
              <span>Consultation Fee Guide</span>
            </Link>
            <Link
              href="/#schemes"
              className="p-2.5 rounded-md hover:bg-teal-pale text-text-primary hover:text-navy flex items-center gap-2 border border-border/60 transition-colors"
            >
              <ShieldAlert className="size-4 text-teal shrink-0" />
              <span>Government Schemes</span>
            </Link>
          </div>
        </div>

        {/* Emergency Notice */}
        <div className="inline-flex items-center gap-2 text-xs text-emergency bg-emergency/10 px-4 py-2 rounded-md font-semibold border border-emergency/20">
          <PhoneCall className="size-4 shrink-0" />
          <span>Need immediate medical assistance? Call National Helpline 112 or 1066.</span>
        </div>
      </Container>
    </div>
  );
}
