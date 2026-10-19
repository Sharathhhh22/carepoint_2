"use client";

import React from "react";
import {
  Stethoscope,
  Smile,
  Sparkles,
  Baby,
  HeartHandshake,
  Bone,
  HeartPulse,
  Eye,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { specialitiesData, Speciality } from "@/lib/data/specialities";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { formatINR } from "@/lib/utils";

interface SpecialitiesProps {
  onSelectSpeciality: (specialityName: string) => void;
  selectedSpeciality: string;
}

export function Specialities({
  onSelectSpeciality,
  selectedSpeciality,
}: SpecialitiesProps) {
  const { dict } = useLanguage();

  const getIcon = (iconName: Speciality["iconName"]) => {
    switch (iconName) {
      case "Stethoscope":
        return <Stethoscope className="size-6 text-maroon" strokeWidth={1.75} />;
      case "Smile":
        return <Smile className="size-6 text-maroon" strokeWidth={1.75} />;
      case "Sparkles":
        return <Sparkles className="size-6 text-maroon" strokeWidth={1.75} />;
      case "Baby":
        return <Baby className="size-6 text-maroon" strokeWidth={1.75} />;
      case "HeartHandshake":
        return <HeartHandshake className="size-6 text-maroon" strokeWidth={1.75} />;
      case "Bone":
        return <Bone className="size-6 text-maroon" strokeWidth={1.75} />;
      case "HeartPulse":
        return <HeartPulse className="size-6 text-maroon" strokeWidth={1.75} />;
      case "Eye":
        return <Eye className="size-6 text-maroon" strokeWidth={1.75} />;
      default:
        return <Stethoscope className="size-6 text-maroon" strokeWidth={1.75} />;
    }
  };

  const handleCardClick = (specialityName: string) => {
    onSelectSpeciality(specialityName);
    const element = document.getElementById("find-doctors");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="specialities"
      className="py-16 sm:py-24 bg-cream"
      aria-labelledby="specialities-heading"
    >
      <Container>
        <SectionHeading
          id="specialities-heading"
          eyebrow={dict.sections.specialitiesEyebrow}
          title={dict.sections.specialitiesTitle}
          intro={dict.sections.specialitiesIntro}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {specialitiesData.map((spec) => {
            const isSelected =
              selectedSpeciality.toLowerCase() === spec.name.toLowerCase();

            return (
              <button
                key={spec.id}
                type="button"
                onClick={() => handleCardClick(spec.name)}
                className="text-left w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron rounded-card h-full"
                aria-label={`Filter by ${spec.name}: ${spec.description}`}
              >
                <Card
                  hoverable
                  className={`p-6 transition-all border ${
                    isSelected
                      ? "ring-2 ring-saffron border-saffron bg-saffron-light/20 shadow-floating"
                      : "border-ink/10 hover:border-saffron/50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <IconBadge variant="maroon" size="lg">
                      {getIcon(spec.iconName)}
                    </IconBadge>
                    <span className="text-xs font-semibold text-teal bg-teal/10 px-2 py-1 rounded-full">
                      From {formatINR(spec.sampleConsultationFee)}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-maroon mb-1.5 flex items-center justify-between group">
                    <span>{spec.name}</span>
                    <ArrowRight className="size-4 text-ink/40 group-hover:text-saffron transition-transform group-hover:translate-x-1" />
                  </h3>

                  <p className="text-xs sm:text-sm text-ink/75 leading-relaxed line-clamp-2">
                    {spec.description}
                  </p>
                </Card>
              </button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
