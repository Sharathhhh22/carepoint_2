"use client";

import React from "react";
import {
  MapPin,
  UserCheck,
  Building2,
  BadgeIndianRupee,
  Star,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/ui/Container";

export function TrustMetrics() {
  const metrics = [
    {
      stat: "12+",
      label: "Indian States Covered",
      sublabel: "From Bengaluru to Delhi-NCR",
      icon: MapPin,
    },
    {
      stat: "500+",
      label: "Verified Clinicians",
      sublabel: "100% Medical Council verified",
      icon: UserCheck,
    },
    {
      stat: "94",
      label: "Network Facilities",
      sublabel: "NABH accredited standards",
      icon: Building2,
    },
    {
      stat: "₹400",
      label: "Starting Consult Fee",
      sublabel: "Transparent upfront pricing",
      icon: BadgeIndianRupee,
    },
    {
      stat: "4.9 ★",
      label: "Patient Trust Index",
      sublabel: "18,400+ verified consultations",
      icon: Star,
    },
  ];

  return (
    <section
      className="py-6 sm:py-8 bg-white border-b border-border"
      aria-label="CarePoint Clinical Scale and Trust Metrics"
    >
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
          {metrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-bg-secondary p-4 sm:p-5 rounded-lg border border-border flex flex-col justify-between hover:border-teal/40 transition-colors group"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-navy tracking-tight group-hover:text-teal transition-colors">
                    {item.stat}
                  </span>
                  <div className="size-8 rounded-md bg-teal-pale text-teal flex items-center justify-center shrink-0">
                    <Icon className="size-4" />
                  </div>
                </div>

                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-navy leading-snug">
                    {item.label}
                  </h4>
                  <p className="text-[11px] text-text-secondary leading-tight mt-0.5">
                    {item.sublabel}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
