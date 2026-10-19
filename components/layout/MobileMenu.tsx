"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { X, Lock, Stethoscope, Building2, FlaskConical, Activity, PhoneCall } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Button } from "@/components/ui/Button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

export function MobileMenu({
  isOpen,
  onClose,
  onOpenLogin,
  triggerRef,
}: MobileMenuProps) {
  const { dict } = useLanguage();
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Focus trap and Escape key listener
  useEffect(() => {
    if (!isOpen) return;

    const menu = menuRef.current;
    if (!menu) return;

    // Focus first interactive element in menu
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
    // Prevent background scroll when mobile menu is active
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
        className="fixed inset-0 bg-ink/60 backdrop-blur-sm transition-opacity"
        onClick={() => {
          onClose();
          triggerRef.current?.focus();
        }}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={menuRef}
        className="fixed inset-y-0 right-0 max-w-xs w-full bg-cream shadow-floating p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-ink/10">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-DEFAULT bg-saffron text-ink font-bold flex items-center justify-center">
                CP
              </div>
              <span className="font-bold text-lg text-maroon">CarePoint</span>
            </div>
            <button
              onClick={() => {
                onClose();
                triggerRef.current?.focus();
              }}
              aria-label="Close navigation menu"
              className="p-2 text-ink/60 hover:text-ink hover:bg-black/5 rounded-DEFAULT focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
            >
              <X className="size-6" />
            </button>
          </div>

          {/* Navigation links */}
          <nav className="mt-6 flex flex-col space-y-2" aria-label="Mobile Navigation">
            <Link
              href="#find-doctors"
              onClick={handleLinkClick}
              className="flex items-center gap-3 px-3 py-3 rounded-DEFAULT text-base font-semibold text-ink hover:bg-saffron/15 hover:text-maroon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
            >
              <Stethoscope className="size-5 text-teal shrink-0" />
              <span>{dict.nav.findDoctors}</span>
            </Link>

            <Link
              href="#clinics"
              onClick={handleLinkClick}
              className="flex items-center gap-3 px-3 py-3 rounded-DEFAULT text-base font-semibold text-ink hover:bg-saffron/15 hover:text-maroon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
            >
              <Building2 className="size-5 text-teal shrink-0" />
              <span>{dict.nav.clinics}</span>
            </Link>

            <Link
              href="#lab-tests"
              onClick={handleLinkClick}
              className="flex items-center gap-3 px-3 py-3 rounded-DEFAULT text-base font-semibold text-ink hover:bg-saffron/15 hover:text-maroon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
            >
              <FlaskConical className="size-5 text-teal shrink-0" />
              <span>{dict.nav.labTests}</span>
            </Link>

            <Link
              href="#services"
              onClick={handleLinkClick}
              className="flex items-center gap-3 px-3 py-3 rounded-DEFAULT text-base font-semibold text-ink hover:bg-saffron/15 hover:text-maroon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
            >
              <Activity className="size-5 text-teal shrink-0" />
              <span>{dict.nav.services}</span>
            </Link>
          </nav>
        </div>

        {/* Bottom actions */}
        <div className="pt-6 border-t border-ink/10 space-y-3">
          <Button
            variant="outline"
            fullWidth
            onClick={() => {
              onClose();
              onOpenLogin();
            }}
            leftIcon={<Lock className="size-5" />}
          >
            {dict.nav.loginDemo}
          </Button>

          <a
            href="tel:+915550192831"
            className="flex items-center justify-center gap-2 py-3 px-4 bg-teal text-white rounded-DEFAULT font-semibold text-sm hover:bg-teal-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
          >
            <PhoneCall className="size-4" />
            <span>Call Helpline (Demo)</span>
          </a>
        </div>
      </div>
    </div>
  );
}
