"use client";

import React, { useState } from "react";
import {
  Activity,
  Check,
  Clock,
  ShieldCheck,
  Calendar,
  Sparkles,
  ArrowRight,
  TestTube,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { healthPackagesData, HealthPackage } from "@/lib/data/services";
import { formatINR } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";

interface HealthPackagesProps {
  onBookPackage?: (pkg: HealthPackage) => void;
}

export function HealthPackages({ onBookPackage }: HealthPackagesProps) {
  const { showToast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const handleBook = (pkg: HealthPackage) => {
    if (onBookPackage) {
      onBookPackage(pkg);
    } else {
      showToast(
        `Booking initiated for ${pkg.name} (${formatINR(pkg.fee)}). Free home sample collection confirmed.`,
        "success"
      );
    }
  };

  return (
    <section
      id="health-packages"
      className="py-16 sm:py-24 bg-white border-b border-border scroll-mt-16"
      aria-labelledby="packages-heading"
    >
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-bold text-teal tracking-wider uppercase mb-2">
              Preventive Healthcare & Diagnostics
            </p>
            <h2
              id="packages-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy tracking-tight"
            >
              Curated Master Health Checkup Packages
            </h2>
            <p className="mt-3 text-sm sm:text-base text-text-secondary leading-relaxed">
              Early detection prevents severe chronic illnesses. Comprehensive diagnostic panels featuring certified home blood collection and free doctor consultation.
            </p>
          </div>

          <div className="flex items-center gap-2 p-3 bg-bg-secondary rounded-lg border border-border text-xs text-text-secondary shrink-0">
            <ShieldCheck className="size-5 text-teal shrink-0" />
            <div>
              <p className="font-bold text-navy">NABL Accredited Labs</p>
              <p>Home sample pickup across 12 cities</p>
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {healthPackagesData.map((pkg) => {
            const savings = pkg.originalFee - pkg.fee;
            return (
              <div
                key={pkg.id}
                className="bg-bg-secondary rounded-lg border border-border hover:border-teal/50 shadow-card hover:shadow-dropdown transition-all flex flex-col justify-between p-6 group"
              >
                <div>
                  {/* Test count and fasting badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-teal-pale text-teal">
                      {pkg.testCount} Tests Included
                    </span>
                    <span className="text-[11px] font-medium text-text-secondary flex items-center gap-1">
                      <Clock className="size-3 text-teal" />
                      {pkg.turnaroundHours}h Reports
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-navy mb-1 group-hover:text-teal transition-colors">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed mb-4">
                    {pkg.tagline}
                  </p>

                  {/* Pricing Box */}
                  <div className="p-3 bg-white rounded-md border border-border mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-extrabold text-navy">
                        {formatINR(pkg.fee)}
                      </span>
                      <span className="text-xs text-text-secondary line-through">
                        {formatINR(pkg.originalFee)}
                      </span>
                      <span className="text-[11px] font-bold text-success ml-auto">
                        Save {formatINR(savings)}
                      </span>
                    </div>
                    <p className="text-[11px] text-text-secondary mt-1">
                      {pkg.fastingRequired
                        ? "10-12 hours overnight fasting required"
                        : "No dietary restrictions or fasting required"}
                    </p>
                  </div>

                  {/* Key Tests Checklist */}
                  <div className="space-y-2 mb-6">
                    <p className="text-xs font-bold text-navy uppercase tracking-wider">
                      Key Highlights:
                    </p>
                    <ul className="space-y-1.5 text-xs text-text-primary">
                      {pkg.popularTests.map((t, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="size-3.5 text-teal shrink-0 mt-0.5" />
                          <span className="leading-tight">{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  onClick={() => handleBook(pkg)}
                  leftIcon={<TestTube className="size-4" />}
                  className="font-bold py-2.5 text-sm"
                >
                  Book Checkup Package
                </Button>
              </div>
            );
          })}
        </div>

        {/* Quality Commitment Footer Strip */}
        <div className="mt-12 p-5 bg-teal-pale/50 rounded-lg border border-teal/20 flex flex-wrap items-center justify-between gap-4 text-xs text-text-primary">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-5 text-teal shrink-0" />
            <span className="font-medium">
              <strong>Sample Collection Hygiene:</strong> Single-use vacuum tubes, barcoded tracking, and cold-chain transport.
            </span>
          </div>
          <span className="text-text-secondary">
            Digital reports delivered via WhatsApp and registered Email within turnaround window.
          </span>
        </div>
      </Container>
    </section>
  );
}
