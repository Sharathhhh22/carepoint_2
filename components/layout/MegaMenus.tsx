"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Stethoscope,
  MapPin,
  Calendar,
  ShieldCheck,
  HeartPulse,
  Activity,
  ArrowRight,
  CreditCard,
  HelpCircle,
  PhoneCall,
  Smile,
  Sparkles,
  Baby,
  HeartHandshake,
  Bone,
  Eye,
  Zap,
  Microscope,
  LucideIcon,
} from "lucide-react";
import { statesData, StateInfo } from "@/lib/data/locations";
import { specialitiesData } from "@/lib/data/specialities";
import { healthPackagesData } from "@/lib/data/services";
import { formatINR } from "@/lib/utils";

interface MegaMenuProps {
  onClose: () => void;
  onOpenBooking: () => void;
}

interface SimpleMegaMenuProps {
  onClose: () => void;
}

const SPECIALTY_ICONS: Record<string, LucideIcon> = {
  "General physician": Stethoscope,
  "Cardiology": HeartPulse,
  "Orthopaedics": Bone,
  "Neurology": Zap,
  "Paediatrics": Baby,
  "Gynaecology": HeartHandshake,
  "Dermatology": Sparkles,
  "Dentist": Smile,
  "Eye care": Eye,
  "Gastroenterology": Activity,
  "Nephrology": Microscope,
  "ENT": ShieldCheck,
};

/**
 * 1. Mega Menu: Find a Doctor
 */
export function FindDoctorMegaMenu({ onClose, onOpenBooking }: MegaMenuProps) {
  return (
    <div className="w-[840px] max-w-[95vw] bg-white rounded-lg shadow-dropdown border border-border p-6 text-text-primary animate-in fade-in zoom-in-95 duration-150">
      <div className="grid grid-cols-3 gap-6">
        {/* Col 1: Search & Directories */}
        <div className="space-y-4 border-r border-border pr-6">
          <div className="flex items-center gap-2 text-navy font-bold text-sm">
            <Stethoscope className="size-4 text-teal" />
            <span>Search & Directory</span>
          </div>

          <div className="space-y-1.5 text-xs">
            <Link
              href="/doctors"
              onClick={onClose}
              className="flex items-center justify-between p-2 rounded hover:bg-teal-pale text-navy font-semibold transition-colors"
            >
              <span>Browse All Doctors</span>
              <ArrowRight className="size-3.5 text-teal" />
            </Link>
            <Link
              href="/doctors?budget=under-500"
              onClick={onClose}
              className="block p-2 rounded hover:bg-bg-secondary text-text-secondary hover:text-navy transition-colors"
            >
              Consultations under ₹500
            </Link>
            <Link
              href="/doctors?femaleDoctor=true"
              onClick={onClose}
              className="block p-2 rounded hover:bg-bg-secondary text-text-secondary hover:text-navy transition-colors"
            >
              Female Doctors Only
            </Link>
          </div>

          <div className="pt-3 border-t border-border">
            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="w-full py-2 px-3 rounded bg-teal text-white text-xs font-semibold hover:bg-teal-hover transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Calendar className="size-3.5" />
              <span>Book Appointment (DEMO)</span>
            </button>
          </div>
        </div>

        {/* Col 2: Popular Specialties */}
        <div className="space-y-3 border-r border-border pr-6">
          <div className="text-navy font-bold text-sm flex items-center justify-between">
            <span>Popular Specialties</span>
            <Link
              href="/specialties"
              onClick={onClose}
              className="text-[11px] text-teal hover:underline font-semibold"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-1 text-xs">
            {specialitiesData.slice(0, 6).map((spec) => {
              const Icon = SPECIALTY_ICONS[spec.name] || Stethoscope;
              return (
                <Link
                  key={spec.id}
                  href={`/doctors?specialty=${encodeURIComponent(spec.name)}`}
                  onClick={onClose}
                  className="flex items-center gap-2 p-1.5 rounded hover:bg-bg-secondary text-text-primary hover:text-teal transition-colors"
                >
                  <Icon className="size-3.5 text-teal shrink-0" />
                  <span className="truncate">{spec.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Col 3: Browse Doctors by City */}
        <div className="space-y-3">
          <div className="text-navy font-bold text-sm">Top Cities</div>
          <div className="space-y-1 text-xs">
            {["Bengaluru", "Mumbai", "New Delhi", "Chennai", "Hyderabad", "Kolkata"].map(
              (city) => (
                <Link
                  key={city}
                  href={`/doctors?city=${encodeURIComponent(city)}`}
                  onClick={onClose}
                  className="flex items-center justify-between p-1.5 rounded hover:bg-bg-secondary text-text-secondary hover:text-navy transition-colors"
                >
                  <span>{city}</span>
                  <span className="text-[10px] text-teal font-semibold">Doctors →</span>
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 2. Mega Menu: Hospitals & Clinics - with States Details Menu!
 */
export function HospitalsMegaMenu({ onClose }: SimpleMegaMenuProps) {
  const [activeState, setActiveState] = useState<StateInfo>(statesData[0]);

  return (
    <div className="w-[920px] max-w-[95vw] bg-white rounded-lg shadow-dropdown border border-border p-6 text-text-primary animate-in fade-in zoom-in-95 duration-150">
      <div className="grid grid-cols-12 gap-6">
        {/* Left Side: Indian States List (The States Details Menu) */}
        <div className="col-span-5 border-r border-border pr-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-navy flex items-center gap-1.5">
              <MapPin className="size-3.5 text-teal" />
              <span>Browse by State</span>
            </span>
            <Link
              href="/hospitals"
              onClick={onClose}
              className="text-[11px] font-semibold text-teal hover:underline"
            >
              All India →
            </Link>
          </div>

          <div className="space-y-1 max-h-[360px] overflow-y-auto pr-1">
            {statesData.map((st) => {
              const isSelected = activeState.id === st.id;
              return (
                <button
                  key={st.id}
                  onClick={() => setActiveState(st)}
                  onMouseEnter={() => setActiveState(st)}
                  className={`w-full text-left p-2 rounded flex items-center justify-between text-xs transition-colors ${
                    isSelected
                      ? "bg-teal text-white font-bold shadow-sm"
                      : "hover:bg-bg-secondary text-text-primary font-medium"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`size-2 rounded-full ${
                        isSelected ? "bg-white" : "bg-teal"
                      }`}
                    />
                    <span>{st.name}</span>
                  </span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-bg-secondary text-text-secondary"
                    }`}
                  >
                    {st.hospitalCount + st.clinicCount} facilities
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center / Right: Active State Details & Quick Links */}
        <div className="col-span-7 flex flex-col justify-between pl-1">
          <div>
            {/* Active State Header */}
            <div className="flex items-start justify-between gap-4 pb-3 border-b border-border mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-navy">{activeState.name}</h3>
                  <span className="text-[10px] bg-teal-pale text-teal px-2 py-0.5 rounded font-bold">
                    {activeState.code}
                  </span>
                </div>
                <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                  {activeState.bannerText}
                </p>
              </div>
              <Link
                href={`/hospitals?state=${encodeURIComponent(activeState.name)}`}
                onClick={onClose}
                className="py-1.5 px-3 rounded bg-teal-pale text-teal hover:bg-teal hover:text-white font-bold text-xs shrink-0 transition-colors"
              >
                View State Facilities →
              </Link>
            </div>

            {/* State Statistics */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs mb-4">
              <div className="bg-bg-secondary p-2.5 rounded border border-border">
                <span className="font-extrabold text-navy text-sm block">
                  {activeState.hospitalCount}
                </span>
                <span className="text-text-secondary text-[11px]">Hospitals</span>
              </div>
              <div className="bg-bg-secondary p-2.5 rounded border border-border">
                <span className="font-extrabold text-navy text-sm block">
                  {activeState.clinicCount}
                </span>
                <span className="text-text-secondary text-[11px]">Clinics</span>
              </div>
              <div className="bg-bg-secondary p-2.5 rounded border border-border">
                <span className="font-extrabold text-navy text-sm block">
                  {activeState.diagnosticCount}
                </span>
                <span className="text-text-secondary text-[11px]">Diagnostics</span>
              </div>
            </div>

            {/* Cities in this State */}
            <div className="mb-4">
              <span className="text-[11px] font-bold text-navy uppercase tracking-wider block mb-2">
                Major Healthcare Cities in {activeState.name}:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeState.cities.map((city) => (
                  <Link
                    key={city}
                    href={`/hospitals?city=${encodeURIComponent(city)}`}
                    onClick={onClose}
                    className="text-xs bg-bg-secondary hover:bg-teal-pale hover:text-teal text-text-primary px-2.5 py-1 rounded border border-border transition-colors font-medium"
                  >
                    {city}
                  </Link>
                ))}
              </div>
            </div>

            {/* Highlight Specialties */}
            <div>
              <span className="text-[11px] font-bold text-navy uppercase tracking-wider block mb-1.5">
                Clinical Focus Areas:
              </span>
              <div className="flex flex-wrap gap-1.5 text-[11px] text-text-secondary">
                {activeState.highlightSpecialties.map((spec) => (
                  <span key={spec} className="bg-teal-pale/50 text-navy px-2 py-0.5 rounded">
                    • {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar: 24/7 Helpline & Directory Link */}
          <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-emergency font-semibold">
              <PhoneCall className="size-3.5" />
              <span>State Helpline: {activeState.emergencyHelpline}</span>
            </div>
            <Link
              href="/hospitals"
              onClick={onClose}
              className="text-teal font-bold hover:underline"
            >
              Open Full Hospital Directory →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 3. Mega Menu: Specialties
 */
export function SpecialtiesMegaMenu({ onClose }: SimpleMegaMenuProps) {
  return (
    <div className="w-[800px] max-w-[95vw] bg-white rounded-lg shadow-dropdown border border-border p-6 text-text-primary animate-in fade-in zoom-in-95 duration-150">
      <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-navy flex items-center gap-2">
            <Activity className="size-4 text-teal" />
            <span>Clinical Departments & Specialties</span>
          </h3>
          <p className="text-xs text-text-secondary mt-0.5">
            Accredited medical departments with verified senior clinicians
          </p>
        </div>
        <Link
          href="/specialties"
          onClick={onClose}
          className="text-xs font-bold text-teal hover:underline"
        >
          View All 12 Departments →
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {specialitiesData.map((spec) => {
          const Icon = SPECIALTY_ICONS[spec.name] || Stethoscope;
          return (
            <Link
              key={spec.id}
              href={`/specialties/${spec.slug}`}
              onClick={onClose}
              className="p-2.5 rounded hover:bg-bg-secondary flex items-start gap-2.5 group transition-colors"
            >
              <div className="size-7 rounded bg-teal-pale text-teal flex items-center justify-center shrink-0 group-hover:bg-teal group-hover:text-white transition-colors">
                <Icon className="size-4" />
              </div>
              <div className="min-w-0">
                <span className="font-semibold text-xs text-navy group-hover:text-teal block truncate transition-colors">
                  {spec.name}
                </span>
                <span className="text-[11px] text-text-secondary truncate block">
                  {spec.description}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/**
 * 4. Mega Menu: Health Packages
 */
export function HealthPackagesMegaMenu({ onClose }: SimpleMegaMenuProps) {
  return (
    <div className="w-[840px] max-w-[95vw] bg-white rounded-lg shadow-dropdown border border-border p-6 text-text-primary animate-in fade-in zoom-in-95 duration-150">
      <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-navy flex items-center gap-2">
            <Activity className="size-4 text-teal" />
            <span>Preventive Health & Diagnostic Packages</span>
          </h3>
          <p className="text-xs text-text-secondary mt-0.5">
            Full body health checkups with certified home sample collection across 12 cities
          </p>
        </div>
        <Link
          href="/#health-packages"
          onClick={onClose}
          className="text-xs font-bold text-teal hover:underline flex items-center gap-1"
        >
          <span>View All Checkups</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {healthPackagesData.map((pkg) => (
          <Link
            key={pkg.id}
            href="/#health-packages"
            onClick={onClose}
            className="p-3.5 rounded-lg border border-border hover:border-teal/50 bg-bg-secondary hover:bg-white transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-teal bg-teal-pale px-2 py-0.5 rounded">
                  {pkg.testCount} Tests Included
                </span>
                <span className="text-[11px] text-text-secondary">
                  {pkg.fastingRequired ? "10h Fasting" : "No Fasting"}
                </span>
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-navy group-hover:text-teal transition-colors">
                {pkg.name}
              </h4>
              <p className="text-[11px] text-text-secondary line-clamp-1 mt-0.5">
                {pkg.tagline}
              </p>
            </div>

            <div className="flex items-baseline justify-between mt-3 pt-2 border-t border-border/60">
              <div className="flex items-baseline gap-1.5">
                <span className="text-sm font-extrabold text-navy">{formatINR(pkg.fee)}</span>
                <span className="text-[10px] text-text-secondary line-through">{formatINR(pkg.originalFee)}</span>
              </div>
              <span className="text-[11px] font-bold text-teal group-hover:underline flex items-center gap-0.5">
                <span>Book Checkup</span>
                <ArrowRight className="size-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

/**
 * 5. Mega Menu: Patient Services
 */
export function ServicesMegaMenu({ onClose, onOpenBooking }: MegaMenuProps) {
  return (
    <div className="w-[520px] max-w-[95vw] bg-white rounded-lg shadow-dropdown border border-border p-6 text-text-primary animate-in fade-in zoom-in-95 duration-150">
      <div className="text-navy font-bold text-sm mb-3">Patient Care Services</div>
      <div className="space-y-2 text-xs">
        <button
          onClick={() => {
            onClose();
            onOpenBooking();
          }}
          className="w-full text-left p-2.5 rounded hover:bg-teal-pale flex items-center justify-between text-navy font-semibold transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Calendar className="size-4 text-teal" />
            <div>
              <span className="block font-bold">Book an Appointment</span>
              <span className="text-[11px] text-text-secondary font-normal">
                Instant confirmation for in-clinic or video OPD (Demo)
              </span>
            </div>
          </div>
          <ArrowRight className="size-4 text-teal" />
        </button>

        <Link
          href="/#services"
          onClick={onClose}
          className="p-2.5 rounded hover:bg-bg-secondary flex items-center gap-2.5 text-navy font-semibold transition-colors block"
        >
          <CreditCard className="size-4 text-teal" />
          <div>
            <span className="block font-bold">Practical Services & Fee Guide</span>
            <span className="text-[11px] text-text-secondary font-normal">
              Transparent consultation price ranges across departments
            </span>
          </div>
        </Link>

        <Link
          href="/#schemes"
          onClick={onClose}
          className="p-2.5 rounded hover:bg-bg-secondary flex items-center gap-2.5 text-navy font-semibold transition-colors block"
        >
          <ShieldCheck className="size-4 text-teal" />
          <div>
            <span className="block font-bold">Cashless Insurance (Demo)</span>
            <span className="text-[11px] text-text-secondary font-normal">
              Information on TPA claims and pre-authorisation steps
            </span>
          </div>
        </Link>

        <Link
          href="/#faqs"
          onClick={onClose}
          className="p-2.5 rounded hover:bg-bg-secondary flex items-center gap-2.5 text-navy font-semibold transition-colors block"
        >
          <HelpCircle className="size-4 text-teal" />
          <div>
            <span className="block font-bold">Frequently Asked Questions</span>
            <span className="text-[11px] text-text-secondary font-normal">
              Booking procedures, cancellations, and visit preparation
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

/**
 * 5. Mega Menu: About Us
 */
export function AboutMegaMenu({ onClose }: SimpleMegaMenuProps) {
  return (
    <div className="w-[420px] max-w-[95vw] bg-white rounded-lg shadow-dropdown border border-border p-5 text-text-primary animate-in fade-in zoom-in-95 duration-150">
      <div className="text-navy font-bold text-sm mb-3">About CarePoint</div>
      <div className="space-y-1.5 text-xs">
        <Link
          href="/#how-it-works"
          onClick={onClose}
          className="p-2 rounded hover:bg-bg-secondary block text-navy font-semibold transition-colors"
        >
          How CarePoint Works
        </Link>
        <Link
          href="/hospitals"
          onClick={onClose}
          className="p-2 rounded hover:bg-bg-secondary block text-text-primary hover:text-navy transition-colors"
        >
          Our Healthcare Network (8 States)
        </Link>
        <Link
          href="/accessibility"
          onClick={onClose}
          className="p-2 rounded hover:bg-bg-secondary block text-text-primary hover:text-navy transition-colors"
        >
          Accessibility Statement (WCAG 2.2 AA)
        </Link>
        <Link
          href="/privacy"
          onClick={onClose}
          className="p-2 rounded hover:bg-bg-secondary block text-text-primary hover:text-navy transition-colors"
        >
          Privacy Policy
        </Link>
        <Link
          href="/terms"
          onClick={onClose}
          className="p-2 rounded hover:bg-bg-secondary block text-text-primary hover:text-navy transition-colors"
        >
          Terms of Service & Disclaimer
        </Link>
      </div>
    </div>
  );
}
