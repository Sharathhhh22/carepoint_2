"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, Lock, Globe } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { supportedLocales, SupportedLocale } from "@/lib/i18n/dictionaries";
import { MobileMenu } from "./MobileMenu";
import { LoginDemoDialog } from "@/components/modals/LoginDemoDialog";

export function Header() {
  const { locale, setLocale, dict } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  const mobileMenuTriggerRef = useRef<HTMLButtonElement | null>(null);
  const loginTriggerRef = useRef<HTMLButtonElement | null>(null);

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

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? "bg-cream/95 backdrop-blur-md shadow-card border-b border-ink/10 py-3"
            : "bg-cream py-4 border-b border-ink/5"
        }`}
      >
        <Container>
          <div className="flex items-center justify-between gap-4">
            {/* Logo mark and wordmark */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron rounded-DEFAULT p-1"
              aria-label="CarePoint - Return to Homepage"
            >
              <div className="size-10 sm:size-11 rounded-DEFAULT bg-saffron text-ink font-bold flex items-center justify-center shadow-sm group-hover:bg-saffron-hover transition-colors">
                <svg
                  className="size-6 text-ink"
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
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-maroon group-hover:text-maroon-hover transition-colors">
                  CarePoint
                </span>
                <span className="text-[10px] text-teal font-semibold tracking-wider uppercase -mt-1 hidden sm:block">
                  Verified Care • India
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav
              className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-semibold text-ink"
              aria-label="Primary Navigation"
            >
              <Link
                href="#find-doctors"
                className="hover:text-maroon transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron rounded"
              >
                {dict.nav.findDoctors}
              </Link>
              <Link
                href="#clinics"
                className="hover:text-maroon transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron rounded"
              >
                {dict.nav.clinics}
              </Link>
              <Link
                href="#lab-tests"
                className="hover:text-maroon transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron rounded"
              >
                {dict.nav.labTests}
              </Link>
              <Link
                href="#services"
                className="hover:text-maroon transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron rounded"
              >
                {dict.nav.services}
              </Link>
            </nav>

            {/* Right actions: Language switcher, Login demo, Mobile menu trigger */}
            <div className="flex items-center gap-3">
              {/* Language Selector (Desktop) */}
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-DEFAULT border border-ink/15 bg-white/70 text-xs font-semibold text-ink">
                <Globe className="size-4 text-teal shrink-0" aria-hidden="true" />
                <label htmlFor="header-language-select" className="sr-only">
                  Choose language
                </label>
                <select
                  id="header-language-select"
                  value={locale}
                  onChange={(e) => setLocale(e.target.value as SupportedLocale)}
                  className="bg-transparent border-none text-ink text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-saffron cursor-pointer"
                >
                  {supportedLocales.map((loc) => (
                    <option key={loc.code} value={loc.code}>
                      {loc.nativeName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Login Button (DEMO) */}
              <Button
                ref={loginTriggerRef}
                variant="outline"
                size="sm"
                className="hidden md:inline-flex"
                onClick={() => setIsLoginDialogOpen(true)}
                leftIcon={<Lock className="size-4" />}
              >
                {dict.nav.loginDemo}
              </Button>

              {/* Mobile Menu Trigger */}
              <button
                ref={mobileMenuTriggerRef}
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open mobile navigation menu"
                aria-expanded={isMobileMenuOpen}
                className="lg:hidden p-2 text-ink hover:text-maroon hover:bg-black/5 rounded-DEFAULT focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
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
        triggerRef={mobileMenuTriggerRef}
      />

      {/* Demo Sign In Dialog */}
      <LoginDemoDialog
        isOpen={isLoginDialogOpen}
        onClose={() => setIsLoginDialogOpen(false)}
        triggerRef={loginTriggerRef}
      />
    </>
  );
}
