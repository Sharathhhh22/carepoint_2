"use client";

import React, { useState } from "react";
import {
  PhoneCall,
  Ambulance,
  HeartPulse,
  Brain,
  ShieldAlert,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Building2,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

export function EmergencyTraumaHub() {
  const { showToast } = useToast();
  const [ambulanceRequested, setAmbulanceRequested] = useState(false);

  const handleAmbulanceDispatch = () => {
    setAmbulanceRequested(true);
    showToast(
      "Emergency Ambulance Dispatched (Demo)! Nearest trauma unit notified with high priority.",
      "success"
    );
  };

  return (
    <section
      id="emergency-hub"
      className="py-14 sm:py-20 bg-bg-secondary border-t border-b border-border scroll-mt-20"
      aria-labelledby="emergency-hub-heading"
    >
      <Container>
        {/* Header */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <div className="flex items-center gap-2 text-xs font-bold text-emergency uppercase tracking-wider mb-2">
            <span className="size-2 rounded-full bg-emergency animate-pulse" />
            <span>24x7 Critical Care Response &bull; Level-1 Trauma Network</span>
          </div>
          <h2
            id="emergency-hub-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy tracking-tight"
          >
            Emergency Care, Trauma Desks & Ambulance Support
          </h2>
          <p className="mt-3 text-sm sm:text-base text-text-secondary leading-relaxed">
            Time is the most critical factor during severe medical emergencies. Our 24x7 casualty network provides direct helpline access, rapid ambulance coordination, and immediate ICU intervention.
          </p>
        </div>

        {/* 3 Core Emergency Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Immediate Ambulance & Hotlines */}
          <div className="bg-white p-6 sm:p-7 rounded-lg border-2 border-emergency/30 shadow-card flex flex-col justify-between">
            <div>
              <div className="size-12 rounded-md bg-emergency/10 text-emergency flex items-center justify-center mb-4">
                <Ambulance className="size-6" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">
                Rapid Ambulance Dispatch
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6">
                GPS-tracked advanced life support (ALS) ambulances equipped with oxygen, defibrillators, and trained paramedics.
              </p>

              <div className="p-3.5 bg-emergency/5 rounded-md border border-emergency/20 space-y-2 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-navy">National Helpline:</span>
                  <a href="tel:112" className="text-sm font-extrabold text-emergency hover:underline">
                    Dial 112
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-navy">CarePoint Emergency:</span>
                  <a href="tel:1066" className="text-sm font-extrabold text-navy hover:underline">
                    Dial 1066
                  </a>
                </div>
              </div>
            </div>

            <Button
              variant="secondary"
              size="md"
              fullWidth
              onClick={handleAmbulanceDispatch}
              leftIcon={<Ambulance className="size-4" />}
              className="bg-emergency hover:bg-emergency/90 text-white font-bold py-3"
            >
              {ambulanceRequested ? "Ambulance Alerted (Demo)" : "Request Ambulance (Demo)"}
            </Button>
          </div>

          {/* Card 2: 24/7 Casualty & ICU Readiness */}
          <div className="bg-white p-6 sm:p-7 rounded-lg border border-border shadow-card flex flex-col justify-between">
            <div>
              <div className="size-12 rounded-md bg-teal-pale text-teal flex items-center justify-center mb-4">
                <Building2 className="size-6" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">
                Casualty & ICU Readiness
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6">
                Round-the-clock emergency casualty desks with on-duty emergency physicians, resus bays, and rapid diagnostic scanning.
              </p>

              <div className="space-y-3 text-xs sm:text-sm text-text-primary mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-success shrink-0" />
                  <span>94 Operational Casualty Desks</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-success shrink-0" />
                  <span>Emergency CT, MRI & Blood Bank (24x7)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-success shrink-0" />
                  <span>Zero-delay cardiac catheterization labs</span>
                </div>
              </div>
            </div>

            <a href="#clinics" className="w-full">
              <Button
                variant="outline"
                size="md"
                fullWidth
                leftIcon={<Building2 className="size-4 text-teal" />}
                className="font-bold py-3"
              >
                Find Nearest Casualty Desk
              </Button>
            </a>
          </div>

          {/* Card 3: Triage & Emergency Admission */}
          <div className="bg-white p-6 sm:p-7 rounded-lg border border-border shadow-card flex flex-col justify-between">
            <div>
              <div className="size-12 rounded-md bg-teal-pale text-teal flex items-center justify-center mb-4">
                <Clock className="size-6" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">
                Instant Emergency Admission
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6">
                Direct entry for trauma and critical patients without administrative delays. Cashless insurance desk expedited for emergency care.
              </p>

              <div className="p-3.5 bg-bg-secondary rounded-md border border-border space-y-2 mb-6 text-xs text-text-secondary">
                <p>
                  <strong className="text-navy">TPA Insurance Desk:</strong> Instant pre-authorisation assistance for medical emergencies.
                </p>
                <p>
                  <strong className="text-navy">Zero Deposit in Casualty:</strong> Stabilisation comes first in accordance with national emergency guidelines.
                </p>
              </div>
            </div>

            <a href="tel:+918055501928" className="w-full">
              <Button
                variant="secondary"
                size="md"
                fullWidth
                leftIcon={<PhoneCall className="size-4" />}
                className="font-bold py-3"
              >
                Call Emergency Desk (Demo)
              </Button>
            </a>
          </div>
        </div>

        {/* Golden Hour Clinical Protocol Guidelines */}
        <div className="bg-white rounded-lg border border-border p-6 sm:p-8">
          <h3 className="text-base sm:text-lg font-bold text-navy mb-4 flex items-center gap-2">
            <ShieldAlert className="size-5 text-emergency" />
            <span>Golden Hour Protocols &mdash; Critical First-Response Steps</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div className="p-4 rounded-md bg-bg-secondary border border-border">
              <div className="flex items-center gap-2 text-emergency font-bold mb-2">
                <HeartPulse className="size-4 text-emergency" />
                <span>Suspected Heart Attack</span>
              </div>
              <p className="text-text-secondary leading-relaxed">
                Persistent chest heaviness radiating to left arm, neck, or jaw. Sit patient down immediately. Keep airway clear and dispatch emergency care without driving unassisted.
              </p>
            </div>

            <div className="p-4 rounded-md bg-bg-secondary border border-border">
              <div className="flex items-center gap-2 text-navy font-bold mb-2">
                <Brain className="size-4 text-teal" />
                <span>Stroke Recognition (FAST)</span>
              </div>
              <p className="text-text-secondary leading-relaxed">
                <strong>F</strong>acial droop, <strong>A</strong>rm weakness, <strong>S</strong>peech difficulty, <strong>T</strong>ime to call 1066. Thrombolysis is most effective within the first 4.5 hours of onset.
              </p>
            </div>

            <div className="p-4 rounded-md bg-bg-secondary border border-border">
              <div className="flex items-center gap-2 text-navy font-bold mb-2">
                <AlertTriangle className="size-4 text-warning" />
                <span>Trauma & Severe Bleeding</span>
              </div>
              <p className="text-text-secondary leading-relaxed">
                Apply direct, continuous firm pressure over open wounds with clean cloth. Keep the patient warm and lying flat. Do not rotate or move head or neck in high-impact accidents.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
