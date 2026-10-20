"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, ShieldAlert } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqsData } from "@/lib/data/faqs";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function FaqAccordion() {
  const { dict } = useLanguage();
  // Keep first open by default
  const [openIds, setOpenIds] = useState<string[]>(["faq-fees"]);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section
      id="faqs"
      className="py-16 sm:py-24 bg-cream border-t border-ink/10 scroll-mt-16"
      aria-labelledby="faq-heading"
    >
      <Container className="max-w-4xl">
        <SectionHeading
          id="faq-heading"
          eyebrow={dict.sections.faqEyebrow}
          title={dict.sections.faqTitle}
          intro={dict.sections.faqIntro}
        />

        <div className="space-y-3.5">
          {faqsData.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            const isEmergencyFaq = faq.id === "faq-emergency";

            return (
              <div
                key={faq.id}
                className={`bg-white rounded-card shadow-sm border transition-all duration-200 overflow-hidden ${
                  isEmergencyFaq
                    ? "border-red-300 bg-red-50/30"
                    : isOpen
                    ? "border-saffron/60 shadow-md"
                    : "border-ink/10 hover:border-ink/20"
                }`}
              >
                <button
                  type="button"
                  id={`faq-btn-${faq.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${faq.id}`}
                  onClick={() => toggleItem(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
                >
                  <div className="flex items-center gap-3">
                    {isEmergencyFaq ? (
                      <ShieldAlert className="size-5 text-red-600 shrink-0" />
                    ) : (
                      <HelpCircle className="size-5 text-saffron shrink-0" />
                    )}
                    <h3 className="text-base sm:text-lg font-bold text-ink leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  <ChevronDown
                    className={`size-5 text-ink/60 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-maroon" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {isOpen && (
                  <div
                    id={`faq-panel-${faq.id}`}
                    role="region"
                    aria-labelledby={`faq-btn-${faq.id}`}
                    className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base leading-relaxed text-ink/80 border-t border-ink/5 animate-in fade-in duration-150"
                  >
                    <p className={isEmergencyFaq ? "font-semibold text-red-950" : ""}>
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
