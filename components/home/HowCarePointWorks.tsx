"use client";

import React from "react";
import { Search, FileSearch, Calendar, CheckCircle2, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function HowCarePointWorks() {
  const steps = [
    {
      num: "01",
      title: "Search for a Doctor or Facility",
      desc: "Filter by specialty, city, state, or consultation budget across our verified directory.",
      icon: Search,
    },
    {
      num: "02",
      title: "Compare Available Information",
      desc: "Check medical council registrations, clinical experience, languages, and upfront fees in ₹.",
      icon: FileSearch,
    },
    {
      num: "03",
      title: "Choose an Available Slot",
      desc: "Select morning, afternoon, or evening slots based on real-time doctor availability.",
      icon: Calendar,
    },
    {
      num: "04",
      title: "Submit Your Booking",
      desc: "Enter patient details with full input validation and no hidden platform service charges.",
      icon: ShieldCheck,
    },
    {
      num: "05",
      title: "Receive Booking Reference",
      desc: "Get an immediate booking reference code with clear follow-up instructions.",
      icon: CheckCircle2,
    },
  ];

  return (
    <section id="how-it-works" className="py-16 bg-white border-b border-border" aria-labelledby="how-it-works-title">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-teal bg-teal-pale px-3 py-1 rounded-full mb-3 inline-block">
            Simple 5-Step Patient Journey
          </span>
          <h2 id="how-it-works-title" className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy tracking-tight mb-3">
            How CarePoint Works
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            Finding the right medical care should be calm, transparent, and prompt. Here is how our discovery and booking experience works for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-bg-secondary p-5 rounded-lg border border-border flex flex-col justify-between relative group hover:border-teal transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-extrabold text-2xl text-teal/40 group-hover:text-teal transition-colors">
                      {step.num}
                    </span>
                    <div className="size-8 rounded-full bg-teal-pale text-teal flex items-center justify-center">
                      <Icon className="size-4" />
                    </div>
                  </div>
                  <h3 className="font-bold text-sm text-navy mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {step.desc}
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
