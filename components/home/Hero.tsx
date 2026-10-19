"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Stethoscope, Building2, PhoneCall } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SmartSearch } from "./SmartSearch";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface HeroProps {
  query: string;
  onQueryChange: (q: string) => void;
  selectedCity: string;
  selectedLocality: string;
  onCityChange: (c: string) => void;
  onLocalityChange: (l: string) => void;
  onLocationDetected?: (
    coords: { latitude: number; longitude: number } | null,
    isGps: boolean
  ) => void;
  isGpsActive?: boolean;
  onSearchSubmit: (e: React.FormEvent) => void;
}

export function Hero({
  query,
  onQueryChange,
  selectedCity,
  selectedLocality,
  onCityChange,
  onLocalityChange,
  onLocationDetected,
  isGpsActive,
  onSearchSubmit,
}: HeroProps) {
  const { dict } = useLanguage();

  return (
    <section
      className="relative bg-cream bg-jaali-lattice pt-8 pb-16 sm:pt-14 sm:pb-24 border-b border-ink/10 overflow-hidden"
      aria-labelledby="hero-main-heading"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Heading, Subtext, Search, CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-6 sm:space-y-8 z-10">
            {/* Clinical Section Kicker */}
            <div className="flex items-center gap-2 text-xs font-bold text-teal tracking-wider uppercase">
              <span className="size-2 rounded-full bg-teal" />
              <span>Verified Healthcare Directory &bull; India (Demo)</span>
            </div>

            {/* Exactly ONE h1 on the page */}
            <div className="space-y-3">
              <h1
                id="hero-main-heading"
                className="text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold text-maroon tracking-tight leading-[1.15]"
              >
                {dict.hero.headline}
              </h1>
              <p className="text-lg sm:text-xl text-ink/80 leading-relaxed max-w-xl">
                {dict.hero.subtext}
              </p>
            </div>

            {/* Smart Search Card */}
            <SmartSearch
              query={query}
              onQueryChange={onQueryChange}
              selectedCity={selectedCity}
              selectedLocality={selectedLocality}
              onCityChange={onCityChange}
              onLocalityChange={onLocalityChange}
              onLocationDetected={onLocationDetected}
              isGpsActive={isGpsActive}
              onSubmit={onSearchSubmit}
            />

            {/* Hero CTAs: Stack below 640px, side by side from 640px upward */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <Link href="#find-doctors" className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="md"
                  fullWidth
                  leftIcon={<Stethoscope className="size-5" />}
                >
                  Explore Doctors
                </Button>
              </Link>
              <Link href="#clinics" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="md"
                  fullWidth
                  leftIcon={<Building2 className="size-5" />}
                >
                  Browse Facilities
                </Button>
              </Link>
              <a href="tel:+915550192831" className="w-full sm:w-auto">
                <Button
                  variant="ghost"
                  size="md"
                  fullWidth
                  leftIcon={<PhoneCall className="size-5 text-teal" />}
                >
                  Help Desk (Demo)
                </Button>
              </a>
            </div>

            {/* Micro-guarantee highlights (Content also present in floating cards) */}
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm text-ink/75 font-medium border-t border-ink/10">
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-teal shrink-0" />
                Verified Clinical Facilities
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-saffron shrink-0" />
                Transparent Fees in ₹
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-marigold shrink-0" />
                Cashless Insurance (Demo)
              </span>
            </div>
          </div>

          {/* Right Column: Hero Photo & Decorative Floating Cards (5 cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Hero Photo Container: hover zoom under 1.05, overflow-hidden */}
            <div className="relative w-full max-w-md lg:max-w-none aspect-[4/5] rounded-card shadow-card overflow-hidden border border-ink/15 group">
              <Image
                src="/images/hero-doctor.webp"
                alt="Experienced Indian doctor in clinical consultation with a patient in an outpatient room"
                fill
                priority
                quality={90}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"
                aria-hidden="true"
              />
              <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-medium bg-navy/95 p-2.5 rounded shadow-sm border border-white/10">
                <p className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-teal shrink-0" />
                  <span>Sample outpatient consultation in Bengaluru &bull; Verified facility</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
