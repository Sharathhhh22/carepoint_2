"use client";

import React, { useState, useRef, useEffect } from "react";
import { HelpCircle, X } from "lucide-react";
import { getGlossaryItem } from "@/lib/data/glossary";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export interface GlossaryTermProps {
  termId: string;
  children?: React.ReactNode;
  className?: string;
}

export function GlossaryTerm({ termId, children, className = "" }: GlossaryTermProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { locale } = useLanguage();

  const item = getGlossaryItem(termId);

  // Close on Escape or click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!item) {
    return <span className={className}>{children}</span>;
  }

  // Localized explanation or English fallback
  const localized = item.translations[locale] || item.translations.en;
  const displayText = children || localized.term || item.term;
  const explanation = localized.explanation || item.plainExplanation;

  return (
    <span ref={containerRef} className="relative inline-flex items-center">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label={`Definition of ${item.term}: click to view plain explanation`}
        className={`inline-flex items-center gap-1 border-b border-dotted border-teal text-teal hover:text-teal-hover focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-1 rounded-sm cursor-pointer transition-colors ${className}`}
      >
        <span>{displayText}</span>
        <HelpCircle className="size-3.5 text-teal shrink-0" aria-hidden="true" />
      </button>

      {isOpen && (
        <span
          role="dialog"
          aria-label={`Medical glossary explanation for ${item.term}`}
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 sm:w-80 p-3.5 bg-white text-ink border border-amber-200/80 rounded-xl shadow-floating text-left text-xs sm:text-sm animate-in fade-in zoom-in-95 duration-150"
        >
          <span className="flex items-start justify-between gap-2 mb-1.5 pb-1 border-b border-cream-muted">
            <span className="font-semibold text-maroon text-sm flex items-center gap-1.5">
              <span>{localized.term || item.term}</span>
              <span className="text-[10px] font-normal uppercase tracking-wider bg-cream-muted text-ink-muted px-1.5 py-0.5 rounded">
                Plain term
              </span>
            </span>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                triggerRef.current?.focus();
              }}
              aria-label="Close explanation"
              className="p-1 text-ink-subtle hover:text-ink rounded focus:outline-none focus:ring-2 focus:ring-teal"
            >
              <X className="size-3.5" aria-hidden="true" />
            </button>
          </span>

          <span className="block text-ink/90 leading-relaxed font-normal">
            {explanation}
          </span>

          <span className="block mt-2 pt-1 border-t border-cream-muted text-[11px] text-ink-subtle">
            Reading level: Grade 8 plain English. Consult your doctor for personal advice.
          </span>
        </span>
      )}
    </span>
  );
}
