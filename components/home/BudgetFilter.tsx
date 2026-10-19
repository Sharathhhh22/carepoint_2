"use client";

import React from "react";
import { BudgetRange } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Info } from "lucide-react";

interface BudgetFilterProps {
  selectedBudget: BudgetRange;
  onBudgetChange: (b: BudgetRange) => void;
  hiddenFacilitiesCount?: number;
  className?: string;
}

export function BudgetFilter({
  selectedBudget,
  onBudgetChange,
  hiddenFacilitiesCount = 0,
  className = "",
}: BudgetFilterProps) {
  const { dict } = useLanguage();

  const options: { value: BudgetRange; label: string }[] = [
    { value: "any", label: dict.common.budgetAny },
    { value: "under-500", label: dict.common.budgetUnder500 },
    { value: "500-1000", label: dict.common.budget500To1000 },
    { value: "above-1000", label: dict.common.budgetAbove1000 },
  ];

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    currentIndex: number
  ) => {
    let nextIndex = currentIndex;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % options.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      nextIndex = (currentIndex - 1 + options.length) % options.length;
    }

    if (nextIndex !== currentIndex) {
      onBudgetChange(options[nextIndex].value);
      const radio = document.getElementById(
        `budget-radio-${options[nextIndex].value}`
      );
      radio?.focus();
    }
  };

  return (
    <div
      className={`bg-white rounded-card shadow-sm border border-ink/10 p-4 sm:p-5 ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-full bg-saffron/20 text-ink flex items-center justify-center font-bold text-xs shrink-0">
            ₹
          </div>
          <h3 className="text-sm font-bold text-ink">
            {dict.common.budgetFilterTitle}
          </h3>
        </div>

        {/* Notice for hidden facilities when budget filter is active */}
        {selectedBudget !== "any" && hiddenFacilitiesCount > 0 && (
          <div
            role="status"
            className="flex items-center gap-1.5 text-xs text-amber-900 bg-amber-50 px-2.5 py-1 rounded-DEFAULT border border-amber-200"
          >
            <Info className="size-3.5 text-amber-700 shrink-0" />
            <span>
              {hiddenFacilitiesCount}{" "}
              {dict.common.hiddenFacilitiesNotice}
            </span>
          </div>
        )}
      </div>

      {/* Accessible Radio Group */}
      <div
        role="radiogroup"
        aria-label={dict.common.budgetFilterTitle}
        className="grid grid-cols-2 sm:grid-cols-4 gap-2"
      >
        {options.map((option, idx) => {
          const isChecked = selectedBudget === option.value;
          return (
            <div
              key={option.value}
              id={`budget-radio-${option.value}`}
              role="radio"
              aria-checked={isChecked}
              tabIndex={isChecked ? 0 : -1}
              onClick={() => onBudgetChange(option.value)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`flex items-center justify-center text-center px-3 py-2.5 rounded-DEFAULT text-xs sm:text-sm font-semibold cursor-pointer transition-all select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron ${
                isChecked
                  ? "bg-maroon text-white shadow-sm ring-1 ring-maroon"
                  : "bg-cream/40 text-ink hover:bg-saffron/15 border border-ink/10"
              }`}
            >
              {option.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
