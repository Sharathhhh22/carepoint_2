"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  X,
  Lock,
  Stethoscope,
  Building2,
  Activity,
  PhoneCall,
  Calendar,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { statesData } from "@/lib/data/locations";
import { specialitiesData } from "@/lib/data/specialities";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
  onOpenBooking: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

export function MobileMenu({
  isOpen,
  onClose,
  onOpenLogin,
  onOpenBooking,
  triggerRef,
}: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement | null>(null);

  const [isStatesOpen, setIsStatesOpen] = useState(false);
  const [isSpecialtiesOpen, setIsSpecialtiesOpen] = useState(false);

  // Focus trap and Escape key listener
  useEffect(() => {
    if (!isOpen) return;

    const menu = menuRef.current;
    if (!menu) return;

    const focusableElements = menu.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (firstElement) {
      firstElement.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        triggerRef.current?.focus();
        return;
      }

      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  const handleLinkClick = () => {
    onClose();
    triggerRef.current?.focus();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      className="fixed inset-0 z-50 lg:hidden"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy/60 transition-opacity"
        onClick={() => {
          onClose();
          triggerRef.current?.focus();
        }}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={menuRef}
        className="fixed inset-y-0 right-0 max-w-sm w-full bg-white shadow-floating p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200"
      >
        <div>
          {/* Header with Clickable Logo */}
          <div className="flex items-center justify-between pb-5 border-b border-border">
            <Link
              href="/"
              onClick={handleLinkClick}
              className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded"
              aria-label="CarePoint Clinic - Return to Homepage"
            >
              <div className="size-9 rounded-lg bg-teal text-white font-bold flex items-center justify-center text-sm shadow-sm group-hover:bg-teal-hover transition-colors">
                CP
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className="font-black text-lg text-navy leading-none group-hover:text-teal transition-colors">
                    CarePoint
                  </span>
                  <span className="text-sm font-bold text-teal leading-none">
                    Clinic
                  </span>
                </div>
                <span className="text-[10px] text-teal font-semibold mt-0.5">Healthcare India</span>
              </div>
            </Link>
            <button
              onClick={() => {
                onClose();
                triggerRef.current?.focus();
              }}
              aria-label="Close navigation menu"
              className="p-2 text-text-secondary hover:text-navy hover:bg-bg-secondary rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Primary Action Button */}
          <div className="mt-5">
            <Button
              fullWidth
              size="md"
              className="bg-teal hover:bg-teal-hover text-white font-bold shadow-button"
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              leftIcon={<Calendar className="size-4" />}
            >
              Book Appointment (DEMO)
            </Button>
          </div>

          {/* Navigation links */}
          <nav className="mt-6 flex flex-col space-y-1.5" aria-label="Mobile Navigation">
            <Link
              href="/"
              onClick={handleLinkClick}
              className="px-3 py-2.5 rounded-md text-sm font-semibold text-text-primary hover:bg-bg-secondary hover:text-teal"
            >
              Home
            </Link>

            <Link
              href="/doctors"
              onClick={handleLinkClick}
              className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold text-text-primary hover:bg-bg-secondary hover:text-teal"
            >
              <Stethoscope className="size-4 text-teal shrink-0" />
              <span>Find a Doctor</span>
            </Link>

            {/* Hospitals & Clinics with States Explorer Toggle */}
            <div className="rounded-md bg-bg-secondary/60 border border-border/60 overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2.5">
                <Link
                  href="/hospitals"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 text-sm font-semibold text-navy hover:text-teal"
                >
                  <Building2 className="size-4 text-teal shrink-0" />
                  <span>Hospitals & Clinics</span>
                </Link>
                <button
                  onClick={() => setIsStatesOpen(!isStatesOpen)}
                  className="p-1 text-text-secondary hover:text-teal"
                  aria-label="Toggle States Menu"
                >
                  <ChevronDown
                    className={`size-4 transition-transform duration-200 ${
                      isStatesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Collapsible States Details Menu */}
              {isStatesOpen && (
                <div className="px-4 pb-3 pt-1 space-y-1.5 border-t border-border/60 bg-white">
                  <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider block mb-1">
                    Browse By State:
                  </span>
                  <div className="grid grid-cols-2 gap-1.5 text-xs">
                    {statesData.map((st) => (
                      <Link
                        key={st.id}
                        href={`/hospitals?state=${encodeURIComponent(st.name)}`}
                        onClick={handleLinkClick}
                        className="p-1.5 rounded hover:bg-teal-pale text-text-primary hover:text-navy flex items-center justify-between"
                      >
                        <span className="truncate">{st.name}</span>
                        <span className="text-[10px] text-teal font-semibold">
                          {st.hospitalCount + st.clinicCount}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Specialties with Toggle */}
            <div className="rounded-md bg-bg-secondary/60 border border-border/60 overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2.5">
                <Link
                  href="/specialties"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 text-sm font-semibold text-navy hover:text-teal"
                >
                  <Activity className="size-4 text-teal shrink-0" />
                  <span>Medical Specialties</span>
                </Link>
                <button
                  onClick={() => setIsSpecialtiesOpen(!isSpecialtiesOpen)}
                  className="p-1 text-text-secondary hover:text-teal"
                  aria-label="Toggle Specialties Menu"
                >
                  <ChevronDown
                    className={`size-4 transition-transform duration-200 ${
                      isSpecialtiesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              {isSpecialtiesOpen && (
                <div className="px-4 pb-3 pt-1 space-y-1 border-t border-border/60 bg-white">
                  <div className="grid grid-cols-2 gap-1 text-xs">
                    {specialitiesData.map((spec) => (
                      <Link
                        key={spec.id}
                        href={`/specialties/${spec.slug}`}
                        onClick={handleLinkClick}
                        className="p-1.5 rounded hover:bg-teal-pale text-text-primary hover:text-navy truncate"
                      >
                        {spec.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/#health-packages"
              onClick={handleLinkClick}
              className="px-3 py-2.5 rounded-md text-sm font-semibold text-text-primary hover:bg-bg-secondary hover:text-teal"
            >
              Health Checkup Packages
            </Link>

            <Link
              href="/#emergency-hub"
              onClick={handleLinkClick}
              className="flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-bold text-emergency hover:bg-emergency/10"
            >
              <span className="size-2 rounded-full bg-emergency animate-pulse" />
              <span>24x7 Emergency Trauma Hub</span>
            </Link>

            <Link
              href="/#services"
              onClick={handleLinkClick}
              className="px-3 py-2.5 rounded-md text-sm font-semibold text-text-primary hover:bg-bg-secondary hover:text-teal"
            >
              Practical Services & Fee Guide
            </Link>

            <Link
              href="/#faqs"
              onClick={handleLinkClick}
              className="px-3 py-2.5 rounded-md text-sm font-semibold text-text-primary hover:bg-bg-secondary hover:text-teal"
            >
              Patient FAQs
            </Link>

            <Link
              href="/accessibility"
              onClick={handleLinkClick}
              className="px-3 py-2.5 rounded-md text-sm font-semibold text-text-primary hover:bg-bg-secondary hover:text-teal"
            >
              Accessibility Statement
            </Link>
          </nav>
        </div>

        {/* Bottom actions */}
        <div className="pt-5 border-t border-border space-y-2.5">
          <Button
            variant="outline"
            fullWidth
            onClick={() => {
              onClose();
              onOpenLogin();
            }}
            leftIcon={<Lock className="size-4 text-teal" />}
          >
            Sign In (DEMO)
          </Button>

          <a
            href="tel:+915550192831"
            className="flex items-center justify-center gap-2 py-2.5 px-4 bg-navy text-white rounded-md font-semibold text-xs hover:bg-navy/90 transition-colors"
          >
            <PhoneCall className="size-4 text-teal-pale" />
            <span>24/7 Helpline (+91 555 019 2831)</span>
          </a>

          <a
            href="mailto:contact@carepoint.in"
            className="flex items-center justify-center gap-2 py-2 px-4 text-text-secondary hover:text-teal font-medium text-xs transition-colors"
          >
            <span>contact@carepoint.in</span>
          </a>
        </div>
      </div>
    </div>
  );
}
