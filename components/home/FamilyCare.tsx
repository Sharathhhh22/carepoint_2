"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { familyCareTabsData, FamilyCareTab } from "@/lib/data/family";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { CheckCircle2, ArrowRight, Heart } from "lucide-react";

interface FamilyCareProps {
  onSelectSpeciality: (specialityName: string) => void;
}

export function FamilyCare({ onSelectSpeciality }: FamilyCareProps) {
  const { dict } = useLanguage();
  const [activeTabId, setActiveTabId] = useState<FamilyCareTab["id"]>("self");

  const currentTab =
    familyCareTabsData.find((t) => t.id === activeTabId) ||
    familyCareTabsData[0];

  const handleTabKeyDown = (
    e: React.KeyboardEvent<HTMLElement>,
    currentIndex: number
  ) => {
    let nextIndex = currentIndex;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % familyCareTabsData.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      nextIndex = (currentIndex - 1 + familyCareTabsData.length) % familyCareTabsData.length;
    }

    if (nextIndex !== currentIndex) {
      const nextTab = familyCareTabsData[nextIndex];
      setActiveTabId(nextTab.id);
      document.getElementById(`family-tab-${nextTab.id}`)?.focus();
    }
  };

  const handleSpecialityClick = (specialityName: string) => {
    onSelectSpeciality(specialityName);
    const element = document.getElementById("find-doctors");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="family-care"
      className="py-16 sm:py-24 bg-cream/40 border-t border-ink/10"
      aria-labelledby="family-care-heading"
    >
      <Container>
        <SectionHeading
          id="family-care-heading"
          eyebrow={dict.sections.familyEyebrow}
          title={dict.sections.familyTitle}
          intro={dict.sections.familyIntro}
        />

        {/* Tab Navigation (Accessible Tablist with Arrow Keys) */}
        <div
          role="tablist"
          aria-label="Family healthcare guidance categories"
          className="flex flex-wrap gap-2.5 sm:gap-3 p-1.5 bg-cream/80 border border-ink/15 rounded-card max-w-xl mx-auto mb-10"
        >
          {familyCareTabsData.map((tab, idx) => {
            const isSelected = activeTabId === tab.id;
            return (
              <button
                key={tab.id}
                id={`family-tab-${tab.id}`}
                role="tab"
                aria-selected={isSelected}
                aria-controls={`family-tabpanel-${tab.id}`}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setActiveTabId(tab.id)}
                onKeyDown={(e) => handleTabKeyDown(e, idx)}
                className={`flex-1 min-w-[100px] py-3 px-4 rounded-DEFAULT text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron text-center ${
                  isSelected
                    ? "bg-maroon text-white shadow-sm ring-1 ring-maroon"
                    : "text-ink/80 hover:text-maroon hover:bg-white/60"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Panel */}
        <div
          id={`family-tabpanel-${currentTab.id}`}
          role="tabpanel"
          aria-labelledby={`family-tab-${currentTab.id}`}
          className="bg-white rounded-card shadow-card border border-ink/10 p-6 sm:p-10 max-w-5xl mx-auto animate-in fade-in duration-200"
        >
          <div className="max-w-2xl mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-maroon mb-2">
              {currentTab.headline}
            </h3>
            <p className="text-sm sm:text-base text-ink/80 leading-relaxed">
              {currentTab.summary}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Recommended Specialities (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <h4 className="text-xs uppercase tracking-wider font-bold text-teal flex items-center gap-1.5">
                <Heart className="size-4" />
                <span>Recommended Clinical Specialities</span>
              </h4>

              <div className="space-y-3">
                {currentTab.recommendedSpecialities.map((item) => (
                  <div
                    key={item.name}
                    className="p-4 rounded-DEFAULT bg-cream/40 border border-ink/10 hover:border-saffron/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <span className="font-bold text-ink text-sm sm:text-base block">
                        {item.name}
                      </span>
                      <p className="text-xs text-ink/75 leading-relaxed">
                        {item.reason}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSpecialityClick(item.name)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-maroon hover:text-saffron transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-saffron"
                    >
                      <span>Find Doctors</span>
                      <ArrowRight className="size-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Preventive Tips (5 cols) */}
            <div className="lg:col-span-5 bg-teal/5 border border-teal/20 rounded-card p-6 space-y-4">
              <h4 className="text-xs uppercase tracking-wider font-bold text-teal">
                Preventive Health Checklist
              </h4>

              <ul className="space-y-3 text-xs sm:text-sm text-ink/85">
                {currentTab.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2.5 leading-relaxed">
                    <CheckCircle2 className="size-4 text-teal shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2 text-xs text-ink/60 italic border-t border-teal/15">
                Always consult your doctor before modifying medication or starting new wellness routines.
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
