"use client";

import React from "react";
import { Star, CheckCircle2, Quote, UserCheck, HeartHandshake } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function PatientStories() {
  const stories = [
    {
      patientName: "Rajeshwari M., 58",
      city: "Bengaluru, Karnataka",
      specialty: "Cardiology & Cardiac Surgery",
      hospital: "Banyan Crest Health Pavilion",
      doctor: "Dr. Arvind Somayaji",
      review:
        "When my father developed severe exertional breathlessness, Dr. Somayaji guided us through urgent angiography with complete clarity. The surgical team was compassionate, and the upfront fee estimate matched our final discharge bill without surprises.",
      outcome: "Normal ejection fraction restored; daily activities resumed by week 6.",
    },
    {
      patientName: "Suresh G., 67",
      city: "Mumbai, Maharashtra",
      specialty: "Orthopaedics & Joint Replacement",
      hospital: "Mayura Valley Multi-Specialty",
      doctor: "Dr. Rohith Vembar",
      review:
        "Living with severe osteoarthritis for 5 years made even simple walks agonizing. The robotic knee replacement procedure and supervised physiotherapy allowed me to walk unassisted within 24 hours of surgery.",
      outcome: "Pain-free stair climbing and complete mobility restored in 8 weeks.",
    },
    {
      patientName: "Deepika & Ananya S., 7",
      city: "New Delhi, NCR",
      specialty: "Paediatrics & Allergy Care",
      hospital: "Lotus Valley Children's Hospital",
      doctor: "Dr. Malini Kedarnath",
      review:
        "Our daughter Kabir had recurring seasonal respiratory allergies. Dr. Kedarnath provided a structured pediatric action plan that reduced school absenteeism to zero this winter. The online follow-up was prompt and reassuring.",
      outcome: "Zero emergency hospitalizations over 12 months with customized asthma plan.",
    },
  ];

  return (
    <section
      id="patient-stories"
      className="py-16 sm:py-24 bg-bg-secondary border-t border-b border-border scroll-mt-16"
      aria-labelledby="stories-heading"
    >
      <Container>
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-bold text-teal tracking-wider uppercase mb-2">
            Clinical Proof & Patient Trust
          </p>
          <h2
            id="stories-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy tracking-tight"
          >
            Patient Recovery Stories & Outcomes
          </h2>
          <p className="mt-3 text-sm sm:text-base text-text-secondary leading-relaxed">
            Every clinical journey represents a life touched and health restored. Explore verified experiences from patients treated across our multi-specialty healthcare network.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {stories.map((story, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg border border-border shadow-card p-6 sm:p-7 flex flex-col justify-between hover:border-teal/50 transition-colors"
            >
              <div>
                {/* Header: Star Rating & Verified Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1 text-marigold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="size-4 fill-marigold text-marigold" />
                    ))}
                  </div>
                  <span className="flex items-center gap-1 text-[11px] font-bold text-success bg-success/10 px-2 py-0.5 rounded">
                    <CheckCircle2 className="size-3" />
                    Verified Patient
                  </span>
                </div>

                {/* Patient Quote */}
                <p className="text-xs sm:text-sm text-text-primary leading-relaxed italic mb-6">
                  &ldquo;{story.review}&rdquo;
                </p>

                {/* Clinical Outcome Highlight Box */}
                <div className="p-3 bg-teal-pale/50 rounded-md border border-teal/20 text-xs mb-6">
                  <p className="font-bold text-teal uppercase text-[10px] tracking-wider mb-0.5">
                    Clinical Outcome:
                  </p>
                  <p className="text-navy font-semibold">{story.outcome}</p>
                </div>
              </div>

              {/* Patient and Facility Metadata */}
              <div className="border-t border-border pt-4">
                <h4 className="font-bold text-sm text-navy">{story.patientName}</h4>
                <p className="text-xs text-text-secondary">{story.city}</p>
                <div className="mt-2 text-[11px] text-teal font-medium">
                  {story.specialty} &bull; {story.hospital}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
