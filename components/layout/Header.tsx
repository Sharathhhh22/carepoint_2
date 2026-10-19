"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Menu,
  Lock,
  Calendar,
  ChevronDown,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";
import { LoginDemoDialog } from "@/components/modals/LoginDemoDialog";
import { AppointmentDialog } from "@/components/modals/AppointmentDialog";
import { doctorsData } from "@/lib/data/doctors";
import {
  FindDoctorMegaMenu,
  HospitalsMegaMenu,
  SpecialtiesMegaMenu,
  ServicesMegaMenu,
  AboutMegaMenu,
} from "./MegaMenus";

type ActiveMenu = "doctors" | "hospitals" | "specialties" | "services" | "about" | null;

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>(null);

  // Dialog states
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuTriggerRef = useRef<HTMLButtonElement | null>(null);
  const loginTriggerRef = useRef<HTMLButtonElement | null>(null);

  // Close dropdown on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navContainerRef.current &&
        !navContainerRef.current.contains(event.target as Node)
      ) {
        setActiveMenu(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Sticky header with blur after 16px of scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 16) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = (menu: ActiveMenu) => {
    setActiveMenu((prev) => (prev === menu ? null : menu));
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-card border-b border-border py-2.5"
            : "bg-white py-3.5 border-b border-border"
        }`}
      >
        <Container>
          <div className="flex items-center justify-between gap-4" ref={navContainerRef}>
            {/* Logo mark and wordmark (Narayana Health inspired, distinctive CarePoint branding) */}
            <Link
              href="/"
              onClick={() => setActiveMenu(null)}
              className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded p-1 shrink-0"
              aria-label="CarePoint - Return to Homepage"
            >
              <div className="size-10 sm:size-11 rounded-lg bg-teal text-white font-bold flex items-center justify-center shadow-sm group-hover:bg-teal-hover transition-colors">
                <svg
                  className="size-6 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 6v12m-6-6h12" />
                  <circle cx="12" cy="12" r="9" strokeWidth="1.75" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-navy group-hover:text-teal transition-colors">
                  CarePoint
                </span>
                <span className="text-[10px] text-teal font-bold tracking-wider uppercase -mt-1 hidden xl:block">
                  Verified Hospitals & Doctors
                </span>
              </div>
            </Link>

            {/* Desktop Navigation with Mega Menus */}
            <nav
              className="hidden lg:flex items-center gap-0.5 xl:gap-2 text-xs xl:text-sm font-semibold text-text-primary"
              aria-label="Primary Navigation"
            >
              <Link
                href="/"
                onClick={() => setActiveMenu(null)}
                className="px-2 xl:px-3 py-2 rounded-md hover:text-teal hover:bg-bg-secondary transition-colors"
              >
                Home
              </Link>

              {/* Find a Doctor Mega Menu Button */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => toggleMenu("doctors")}
                  aria-expanded={activeMenu === "doctors"}
                  aria-haspopup="true"
                  className={`px-2 xl:px-3 py-2 rounded-md flex items-center gap-1 transition-colors ${
                    activeMenu === "doctors"
                      ? "text-teal bg-teal-pale font-bold"
                      : "hover:text-teal hover:bg-bg-secondary"
                  }`}
                >
                  <span>Find a Doctor</span>
                  <ChevronDown
                    className={`size-3.5 transition-transform duration-200 ${
                      activeMenu === "doctors" ? "rotate-180 text-teal" : "text-text-secondary"
                    }`}
                  />
                </button>
                {activeMenu === "doctors" && (
                  <div className="absolute left-0 top-full pt-2 z-50">
                    <FindDoctorMegaMenu
                      onClose={() => setActiveMenu(null)}
                      onOpenBooking={() => setIsBookingOpen(true)}
                    />
                  </div>
                )}
              </div>

              {/* Hospitals & Clinics Mega Menu Button (With States Details Menu!) */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => toggleMenu("hospitals")}
                  aria-expanded={activeMenu === "hospitals"}
                  aria-haspopup="true"
                  className={`px-2 xl:px-3 py-2 rounded-md flex items-center gap-1 transition-colors ${
                    activeMenu === "hospitals"
                      ? "text-teal bg-teal-pale font-bold"
                      : "hover:text-teal hover:bg-bg-secondary"
                  }`}
                >
                  <span>Hospitals & Clinics</span>
                  <ChevronDown
                    className={`size-3.5 transition-transform duration-200 ${
                      activeMenu === "hospitals" ? "rotate-180 text-teal" : "text-text-secondary"
                    }`}
                  />
                </button>
                {activeMenu === "hospitals" && (
                  <div className="absolute left-[-100px] top-full pt-2 z-50">
                    <HospitalsMegaMenu
                      onClose={() => setActiveMenu(null)}
                    />
                  </div>
                )}
              </div>

              {/* Specialties Mega Menu Button */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => toggleMenu("specialties")}
                  aria-expanded={activeMenu === "specialties"}
                  aria-haspopup="true"
                  className={`px-2 xl:px-3 py-2 rounded-md flex items-center gap-1 transition-colors ${
                    activeMenu === "specialties"
                      ? "text-teal bg-teal-pale font-bold"
                      : "hover:text-teal hover:bg-bg-secondary"
                  }`}
                >
                  <span>Specialties</span>
                  <ChevronDown
                    className={`size-3.5 transition-transform duration-200 ${
                      activeMenu === "specialties" ? "rotate-180 text-teal" : "text-text-secondary"
                    }`}
                  />
                </button>
                {activeMenu === "specialties" && (
                  <div className="absolute left-[-200px] top-full pt-2 z-50">
                    <SpecialtiesMegaMenu
                      onClose={() => setActiveMenu(null)}
                    />
                  </div>
                )}
              </div>

              {/* Patient Services Mega Menu Button */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => toggleMenu("services")}
                  aria-expanded={activeMenu === "services"}
                  aria-haspopup="true"
                  className={`px-2 xl:px-3 py-2 rounded-md flex items-center gap-1 transition-colors ${
                    activeMenu === "services"
                      ? "text-teal bg-teal-pale font-bold"
                      : "hover:text-teal hover:bg-bg-secondary"
                  }`}
                >
                  <span>Patient Services</span>
                  <ChevronDown
                    className={`size-3.5 transition-transform duration-200 ${
                      activeMenu === "services" ? "rotate-180 text-teal" : "text-text-secondary"
                    }`}
                  />
                </button>
                {activeMenu === "services" && (
                  <div className="absolute right-[-100px] top-full pt-2 z-50">
                    <ServicesMegaMenu
                      onClose={() => setActiveMenu(null)}
                      onOpenBooking={() => setIsBookingOpen(true)}
                    />
                  </div>
                )}
              </div>

              {/* About Us Menu Button */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => toggleMenu("about")}
                  aria-expanded={activeMenu === "about"}
                  aria-haspopup="true"
                  className={`px-2 xl:px-3 py-2 rounded-md flex items-center gap-1 transition-colors ${
                    activeMenu === "about"
                      ? "text-teal bg-teal-pale font-bold"
                      : "hover:text-teal hover:bg-bg-secondary"
                  }`}
                >
                  <span>About Us</span>
                  <ChevronDown
                    className={`size-3.5 transition-transform duration-200 ${
                      activeMenu === "about" ? "rotate-180 text-teal" : "text-text-secondary"
                    }`}
                  />
                </button>
                {activeMenu === "about" && (
                  <div className="absolute right-0 top-full pt-2 z-50">
                    <AboutMegaMenu
                      onClose={() => setActiveMenu(null)}
                    />
                  </div>
                )}
              </div>
            </nav>

            {/* Right actions: Login demo, Book Appointment, Mobile menu */}
            <div className="flex items-center gap-2 sm:gap-2.5 xl:gap-3 shrink-0">
              {/* Sign In (DEMO) */}
              <Button
                ref={loginTriggerRef}
                variant="outline"
                size="sm"
                className="hidden xl:inline-flex border-border text-navy hover:bg-bg-secondary"
                onClick={() => setIsLoginDialogOpen(true)}
                leftIcon={<Lock className="size-3.5 text-teal" />}
              >
                Sign In (Demo)
              </Button>

              {/* Prominent Book Appointment CTA */}
              <Button
                size="sm"
                className="hidden sm:inline-flex shadow-button bg-teal hover:bg-teal-hover text-white font-bold"
                onClick={() => setIsBookingOpen(true)}
                leftIcon={<Calendar className="size-3.5" />}
              >
                Book Appointment
              </Button>

              {/* Mobile Menu Trigger */}
              <button
                ref={mobileMenuTriggerRef}
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open mobile navigation menu"
                aria-expanded={isMobileMenuOpen}
                className="lg:hidden p-2 text-navy hover:bg-bg-secondary rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
              >
                <Menu className="size-6" />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenLogin={() => setIsLoginDialogOpen(true)}
        onOpenBooking={() => setIsBookingOpen(true)}
        triggerRef={mobileMenuTriggerRef}
      />

      {/* Demo Sign In Dialog */}
      <LoginDemoDialog
        isOpen={isLoginDialogOpen}
        onClose={() => setIsLoginDialogOpen(false)}
        triggerRef={loginTriggerRef}
      />

      {/* Global Appointment Booking Dialog */}
      <AppointmentDialog
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        doctor={doctorsData[0]}
      />
    </>
  );
}
