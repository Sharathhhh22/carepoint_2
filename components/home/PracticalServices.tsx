"use client";

import React, { useState, useRef } from "react";
import {
  Video,
  CalendarCheck,
  FlaskConical,
  Check,
  Clock,
  BookOpen,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { GlossaryTerm } from "@/components/ui/GlossaryTerm";
import { diagnosticTestsData, DiagnosticTest } from "@/lib/data/services";
import { formatINR } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { AppointmentDialog } from "@/components/modals/AppointmentDialog";
import { useToast } from "@/components/ui/Toast";

interface ConsultationFeeGuide {
  id: string;
  consultationType: string;
  termId?: string;
  category: string;
  feeRange: string;
  duration: string;
  includedNotes: string;
}

const consultationFeeGuideData: ConsultationFeeGuide[] = [
  {
    id: "cfg-1",
    consultationType: "General Physician OPD Visit",
    termId: "opd",
    category: "Primary Care",
    feeRange: "₹400 – ₹600",
    duration: "15–20 mins",
    includedNotes: "Primary medical evaluation, prescription, and vital checks.",
  },
  {
    id: "cfg-2",
    consultationType: "Specialist Clinical Consultation",
    termId: "specialist",
    category: "Specialist Care",
    feeRange: "₹700 – ₹1,200",
    duration: "20–30 mins",
    includedNotes: "In-depth clinical assessment (Cardiology, Dermatology, Orthopaedics).",
  },
  {
    id: "cfg-3",
    consultationType: "Review & Follow-up Visit",
    termId: "follow-up",
    category: "Continuity Care",
    feeRange: "₹0 – ₹300",
    duration: "10–15 mins",
    includedNotes: "Lab report review. Often complimentary if completed within 7 days (sample).",
  },
  {
    id: "cfg-4",
    consultationType: "Online Telehealth Video Consult",
    category: "Virtual OPD",
    feeRange: "₹350 – ₹600",
    duration: "15 mins",
    includedNotes: "Digital video consultation, e-prescription, and lifestyle counselling.",
  },
  {
    id: "cfg-5",
    consultationType: "Comprehensive Preventive Health Check",
    category: "Wellness",
    feeRange: "₹1,500 – ₹3,500",
    duration: "45–60 mins",
    includedNotes: "Doctor review, ECG review, baseline blood chemistry panel.",
  },
];

export function PracticalServices() {
  const { dict } = useLanguage();
  const { showToast } = useToast();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"in-clinic" | "online">("in-clinic");
  const actionTriggerRef = useRef<HTMLButtonElement | null>(null);

  const openDialog = (mode: "in-clinic" | "online", trigger: HTMLButtonElement | null) => {
    actionTriggerRef.current = trigger;
    setDialogMode(mode);
    setIsDialogOpen(true);
  };

  const handleBookTest = (test: DiagnosticTest) => {
    showToast(
      `Sample order placed for ${test.name} (${formatINR(test.sampleFee)}). Demo test booking only.`,
      "success"
    );
  };

  return (
    <section
      id="services"
      className="py-16 sm:py-24 bg-cream/30 border-t border-ink/10"
      aria-labelledby="services-heading"
    >
      <Container>
        <SectionHeading
          id="services-heading"
          eyebrow={dict.sections.servicesEyebrow}
          title={dict.sections.servicesTitle}
          intro={dict.sections.servicesIntro}
        />

        {/* Top Cards: Online Consultations & In-Clinic Appointment Booking */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16">
          {/* Card 1: Online Video Consultations */}
          <Card hoverable className="border-2 border-teal/20 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-white to-teal/5">
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="size-12 rounded-DEFAULT bg-teal/15 text-teal flex items-center justify-center font-bold">
                  <Video className="size-6" />
                </div>
                <Badge variant="teal" size="sm">
                  DEMO TELEHEALTH
                </Badge>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-maroon mb-2">
                Online Video Consultations
              </h3>

              <p className="text-sm text-ink/75 leading-relaxed mb-6">
                Consult with verified clinicians from the comfort of home. Ideal for{" "}
                <GlossaryTerm termId="follow-up">follow-up</GlossaryTerm> reviews, lab report interpretations, and mild symptom triage across India.
              </p>

              <div className="space-y-2 text-xs sm:text-sm text-ink/80 mb-6">
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-teal shrink-0" />
                  <span>Secure digital consultation interface</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-teal shrink-0" />
                  <span>Digital prescription copy via email</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-teal shrink-0" />
                  <span>Follow-up queries within 3 days (Sample)</span>
                </div>
              </div>
            </div>

            <Button
              variant="secondary"
              size="md"
              fullWidth
              onClick={(e) => openDialog("online", e.currentTarget)}
              leftIcon={<Video className="size-4" />}
            >
              Book Online Consult (DEMO)
            </Button>
          </Card>

          {/* Card 2: In-Clinic Scheduled Appointment */}
          <Card hoverable className="border-2 border-saffron/30 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-white to-saffron/5">
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="size-12 rounded-DEFAULT bg-saffron/20 text-ink flex items-center justify-center font-bold">
                  <CalendarCheck className="size-6" />
                </div>
                <Badge variant="default" size="sm">
                  IN-PERSON CARE
                </Badge>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-maroon mb-2">
                Scheduled Clinic Appointments
              </h3>

              <p className="text-sm text-ink/75 leading-relaxed mb-6">
                Reserve your prioritized time slot for an{" "}
                <GlossaryTerm termId="opd">OPD</GlossaryTerm> visit with a{" "}
                <GlossaryTerm termId="general-physician">general physician</GlossaryTerm> or{" "}
                <GlossaryTerm termId="specialist">specialist</GlossaryTerm>. Minimal waiting time and verified facilities.
              </p>

              <div className="space-y-2 text-xs sm:text-sm text-ink/80 mb-6">
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-teal shrink-0" />
                  <span>Zero queue check-in desk at facility</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-teal shrink-0" />
                  <span>Transparent <GlossaryTerm termId="consultation-fee">consultation fee</GlossaryTerm> schedule in ₹</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-teal shrink-0" />
                  <span><GlossaryTerm termId="cashless-claim">Cashless claim</GlossaryTerm> and <GlossaryTerm termId="pre-authorisation">pre-authorisation</GlossaryTerm> assistance (Demo)</span>
                </div>
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={(e) => openDialog("in-clinic", e.currentTarget)}
              leftIcon={<CalendarCheck className="size-4" />}
            >
              Book In-Clinic Visit (DEMO)
            </Button>
          </Card>
        </div>

        {/* Q1: Fee Guide Table with Common Consultation Types and ₹ Ranges */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-maroon">
                Doctor Consultation Fee Guide
              </h3>
              {/* Mandatory acceptance criteria label */}
              <p className="text-xs sm:text-sm text-ink/80 font-medium mt-1">
                Sample fees. Excludes applicable taxes. Confirm with the clinic before visiting.
              </p>
            </div>
            <span className="text-xs text-ink/60 font-medium">
              *Illustrative ranges across Bengaluru, Mumbai, and Delhi
            </span>
          </div>

          <div className="overflow-x-auto bg-white rounded-card shadow-card border border-ink/10">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-cream/60 border-b border-ink/10 text-xs sm:text-sm font-bold text-maroon">
                  <th className="p-4 sm:p-5">Consultation Type</th>
                  <th className="p-4 sm:p-5">Category</th>
                  <th className="p-4 sm:p-5">Typical Duration</th>
                  <th className="p-4 sm:p-5">What is Included</th>
                  <th className="p-4 sm:p-5 text-right">Sample Fee Range</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10 text-xs sm:text-sm text-ink/85">
                {consultationFeeGuideData.map((item) => (
                  <tr key={item.id} className="hover:bg-cream/20 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-ink">
                      {item.termId ? (
                        <GlossaryTerm termId={item.termId}>
                          {item.consultationType}
                        </GlossaryTerm>
                      ) : (
                        item.consultationType
                      )}
                    </td>
                    <td className="p-4 sm:p-5">
                      <span className="px-2.5 py-1 rounded-full bg-cream text-xs font-medium border border-ink/10">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-4 sm:p-5 text-ink/70">
                      {item.duration}
                    </td>
                    <td className="p-4 sm:p-5 text-ink/80">
                      {item.includedNotes}
                    </td>
                    <td className="p-4 sm:p-5 text-right font-extrabold text-maroon text-base sm:text-lg whitespace-nowrap">
                      {item.feeRange}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Q4: Plain Language Medical Glossary Bar */}
        <div className="mb-16 bg-white rounded-card shadow-card border border-ink/10 p-6 sm:p-8">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="size-8 rounded-DEFAULT bg-teal/15 text-teal flex items-center justify-center shrink-0">
              <BookOpen className="size-4" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-maroon">
              Healthcare Terms in Plain Language
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-ink/75 mb-4 leading-relaxed">
            Click any term below for a clear, one-sentence plain English explanation without medical jargon.
          </p>

          <div className="flex flex-wrap gap-2.5">
            <GlossaryTerm termId="opd" className="bg-cream/70 px-3 py-1.5 rounded-md border border-teal/20 text-xs sm:text-sm font-semibold">
              OPD
            </GlossaryTerm>
            <GlossaryTerm termId="follow-up" className="bg-cream/70 px-3 py-1.5 rounded-md border border-teal/20 text-xs sm:text-sm font-semibold">
              Follow-up
            </GlossaryTerm>
            <GlossaryTerm termId="cashless-claim" className="bg-cream/70 px-3 py-1.5 rounded-md border border-teal/20 text-xs sm:text-sm font-semibold">
              Cashless claim
            </GlossaryTerm>
            <GlossaryTerm termId="pre-authorisation" className="bg-cream/70 px-3 py-1.5 rounded-md border border-teal/20 text-xs sm:text-sm font-semibold">
              Pre-authorisation
            </GlossaryTerm>
            <GlossaryTerm termId="general-physician" className="bg-cream/70 px-3 py-1.5 rounded-md border border-teal/20 text-xs sm:text-sm font-semibold">
              General physician
            </GlossaryTerm>
            <GlossaryTerm termId="specialist" className="bg-cream/70 px-3 py-1.5 rounded-md border border-teal/20 text-xs sm:text-sm font-semibold">
              Specialist
            </GlossaryTerm>
            <GlossaryTerm termId="consultation-fee" className="bg-cream/70 px-3 py-1.5 rounded-md border border-teal/20 text-xs sm:text-sm font-semibold">
              Consultation fee
            </GlossaryTerm>
          </div>
        </div>

        {/* Diagnostic Tests (id="lab-tests") */}
        <div id="lab-tests" className="pt-4 scroll-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
            <div>
              <div className="eyebrow-marigold-strip mb-1">
                <span className="text-xs font-semibold tracking-wider uppercase text-teal">
                  Pathology & Scans
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-maroon">
                Popular Diagnostic Tests
              </h3>
              <p className="text-xs sm:text-sm text-ink/70 mt-1">
                Common pathology investigations with home sample collection options.
              </p>
            </div>
            <span className="text-xs text-ink/60 font-medium">
              Lab test fees labelled sample data
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {diagnosticTestsData.map((test) => (
              <Card key={test.id} hoverable className="border border-ink/10 p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="size-10 rounded-DEFAULT bg-teal/10 text-teal flex items-center justify-center shrink-0">
                      <FlaskConical className="size-5" />
                    </div>
                    <span className="text-xs font-bold text-maroon bg-cream px-2.5 py-1 rounded-full border border-ink/10">
                      {formatINR(test.sampleFee)}
                    </span>
                  </div>

                  <h4 className="font-bold text-ink text-base mb-1">
                    {test.name}
                  </h4>

                  <span className="text-xs font-semibold text-teal block mb-2">
                    {test.category}
                  </span>

                  <p className="text-xs text-ink/70 leading-relaxed mb-3">
                    {test.preparationNotes}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs text-ink/60 mb-4">
                    <Clock className="size-3.5" />
                    <span>Report in ~{test.turnaroundHours} hours (Sample)</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => handleBookTest(test)}
                  leftIcon={<FlaskConical className="size-4 text-teal" />}
                >
                  Book test (DEMO)
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </Container>

      {/* Appointment Modal Connection */}
      <AppointmentDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        initialConsultationType={dialogMode}
        triggerRef={actionTriggerRef}
      />
    </section>
  );
}
