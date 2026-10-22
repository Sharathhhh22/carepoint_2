"use client";

import React from "react";
import Link from "next/link";
import { Stethoscope, Building2, Activity, Calendar, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

interface QuickAccessServicesProps {
  onOpenBooking: () => void;
}

export function QuickAccessServices({ onOpenBooking }: QuickAccessServicesProps) {
  const services = [
    {
      title: "Find a Doctor",
      desc: "Connect with accredited specialists, general physicians, and surgeons.",
      href: "/doctors",
      icon: Stethoscope,
      action: "Search Doctors",
      isModal: false,
    },
    {
      title: "Find a Hospital",
      desc: "Browse tertiary hospitals, daycare polyclinics, and scan centres across 8 states.",
      href: "/hospitals",
      icon: Building2,
      action: "Explore Facilities",
      isModal: false,
    },
    {
      title: "Explore Specialties",
      desc: "12 clinical departments from Cardiology to Neurology with transparent ₹ fees.",
      href: "/specialties",
      icon: Activity,
      action: "Browse Specialties",
      isModal: false,
    },
    {
      title: "Book an Appointment",
      desc: "Instant scheduling with pre-selected slots and immediate confirmation.",
      href: "#",
      icon: Calendar,
      action: "Book Now",
      isModal: true,
    },
  ];

  return (
    <section className="py-10 bg-white border-b border-border" aria-label="Quick Access Services">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {services.map((item, idx) => {
            const Icon = item.icon;
            if (item.isModal) {
              return (
                <button
                  key={idx}
                  onClick={onOpenBooking}
                  className="bg-bg-secondary p-5 rounded-lg border border-border shadow-card hover:shadow-dropdown hover:border-teal/40 transition-all text-left flex flex-col justify-between group"
                >
                  <div>
                    <div className="size-11 rounded-lg bg-teal-pale text-teal flex items-center justify-center mb-3 group-hover:bg-teal group-hover:text-white transition-colors">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="font-bold text-base text-navy group-hover:text-teal transition-colors mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-text-secondary leading-relaxed mb-4">
                      {item.desc}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-teal group-hover:underline">
                    <span>{item.action}</span>
                    <ArrowRight className="size-3.5" />
                  </span>
                </button>
              );
            }

            return (
              <Link
                key={idx}
                href={item.href}
                className="bg-bg-secondary p-5 rounded-lg border border-border shadow-card hover:shadow-dropdown hover:border-teal/40 transition-all text-left flex flex-col justify-between group"
              >
                <div>
                  <div className="size-11 rounded-lg bg-teal-pale text-teal flex items-center justify-center mb-3 group-hover:bg-teal group-hover:text-white transition-colors">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="font-bold text-base text-navy group-hover:text-teal transition-colors mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-teal group-hover:underline">
                  <span>{item.action}</span>
                  <ArrowRight className="size-3.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
