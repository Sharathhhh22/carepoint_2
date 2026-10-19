"use client";

import React from "react";
import { ArrowUpDown } from "lucide-react";
import { SortOption } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface SortControlProps {
  value: SortOption;
  onChange: (sort: SortOption) => void;
  className?: string;
  id?: string;
}

export function SortControl({
  value,
  onChange,
  className = "",
  id = "sort-select-control",
}: SortControlProps) {
  const { dict } = useLanguage();

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <ArrowUpDown
        className="absolute left-3 size-3.5 text-teal pointer-events-none shrink-0"
        aria-hidden="true"
      />
      <label htmlFor={id} className="sr-only">
        {dict.common.sortBy}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="pl-8 pr-8 py-2 bg-white text-ink text-xs sm:text-sm font-semibold rounded-md border border-ink/20 focus:outline-none focus:ring-2 focus:ring-saffron focus:border-saffron transition-all appearance-none cursor-pointer"
      >
        <option value="default">{dict.common.sortDefault}</option>
        <option value="fee-asc">{dict.common.sortFeeAsc}</option>
        <option value="fee-desc">{dict.common.sortFeeDesc}</option>
        <option value="nearest">{dict.common.sortNearest}</option>
      </select>
      <div
        className="absolute right-2.5 pointer-events-none text-ink/50 text-[10px]"
        aria-hidden="true"
      >
        ▼
      </div>
    </div>
  );
}
