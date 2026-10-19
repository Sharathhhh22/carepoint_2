"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Phone, Mail, MapPin, Clock, ArrowRight, ShieldAlert } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { siteConfig } from "@/lib/data/site";
import { newsletterSchema, NewsletterFormData } from "@/lib/validations/newsletter.schema";

export function Footer() {
  const { showToast } = useToast();
  const currentYear = new Date().getFullYear();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = () => {
    showToast(
      "Subscribed to CarePoint health bulletins (Demo). No real emails will be sent.",
      "success"
    );
    reset();
  };

  return (
    <footer className="bg-ink text-cream pt-16 pb-12 border-t border-white/10" role="contentinfo">
      <Container>
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Description (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron rounded"
              aria-label="CarePoint - Return to Homepage"
            >
              <div className="size-10 rounded-DEFAULT bg-saffron text-ink font-bold flex items-center justify-center">
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
              <span className="text-2xl font-bold tracking-tight text-cream">
                {siteConfig.wordmark}
              </span>
            </Link>

            <p className="text-sm text-cream/75 leading-relaxed max-w-sm">
              {siteConfig.description}
            </p>

            {/* Emergency Hotline Banner */}
            <div className="p-3.5 bg-maroon/50 border border-maroon rounded-DEFAULT text-xs text-cream/90 flex items-start gap-2.5 max-w-sm">
              <ShieldAlert className="size-4 shrink-0 text-marigold mt-0.5" />
              <span>
                <strong>Emergency Helpline:</strong> Dial 112 for acute medical emergencies.
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-marigold">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-cream/80">
              <li>
                <Link
                  href="#find-doctors"
                  className="hover:text-saffron transition-colors py-1 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron rounded"
                >
                  Find Doctors
                </Link>
              </li>
              <li>
                <Link
                  href="#clinics"
                  className="hover:text-saffron transition-colors py-1 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron rounded"
                >
                  Clinics & Hospitals
                </Link>
              </li>
              <li>
                <Link
                  href="#lab-tests"
                  className="hover:text-saffron transition-colors py-1 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron rounded"
                >
                  Diagnostic Tests
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="hover:text-saffron transition-colors py-1 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron rounded"
                >
                  Transparent Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#family-care"
                  className="hover:text-saffron transition-colors py-1 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron rounded"
                >
                  Family Care
                </Link>
              </li>
              <li>
                <Link
                  href="#faq"
                  className="hover:text-saffron transition-colors py-1 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron rounded"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Details (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-marigold">
              Contact & Hours
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-cream/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="size-4 shrink-0 text-saffron mt-0.5" />
                <span>
                  {siteConfig.address.street}, {siteConfig.address.locality},{" "}
                  {siteConfig.address.city}, {siteConfig.address.state} –{" "}
                  {siteConfig.address.pincode}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-saffron" />
                <a
                  href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                  className="hover:text-saffron transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron rounded"
                >
                  {siteConfig.phone} (Sample)
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-saffron" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-saffron transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron rounded"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="size-4 shrink-0 text-saffron mt-0.5" />
                <span>{siteConfig.operatingHours}</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter Form (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-marigold">
              Health Bulletins (Demo)
            </h3>
            <p className="text-xs text-cream/70 leading-relaxed">
              Receive monthly preventive wellness advice and local health updates.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5" noValidate>
              <div>
                <label htmlFor="newsletter-email" className="sr-only">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="newsletter-email"
                    type="email"
                    placeholder="you@example.com"
                    {...register("email")}
                    aria-describedby={errors.email ? "newsletter-email-error" : undefined}
                    className="w-full px-3.5 py-2.5 rounded-DEFAULT bg-white/10 border border-white/20 text-cream placeholder-cream/40 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-saffron"
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    disabled={isSubmitting}
                    className="mt-2 w-full text-xs"
                    rightIcon={<ArrowRight className="size-4" />}
                  >
                    Subscribe (DEMO)
                  </Button>
                </div>
                {errors.email && (
                  <p
                    id="newsletter-email-error"
                    role="alert"
                    className="text-xs text-amber-300 mt-1 font-medium"
                  >
                    {errors.email.message}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Mandatory Legal & Disclaimer Section */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-cream/60">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link
              href="/privacy"
              className="hover:text-cream transition-colors underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron rounded"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-cream transition-colors underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron rounded"
            >
              Terms of Use
            </Link>
            <Link
              href="/accessibility"
              className="hover:text-cream transition-colors underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron rounded"
            >
              Accessibility Statement
            </Link>
          </div>

          {/* Hard Rule Disclaimer */}
          <div className="text-center md:text-right">
            <p className="font-medium text-cream/80">
              {siteConfig.disclaimer}
            </p>
            <p className="mt-1 text-[11px] text-cream/50">
              © {currentYear} CarePoint (RYNX Digital Media Category 7 Demonstration). All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
