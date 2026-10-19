import React from "react";

export function RangoliDivider({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`w-full flex items-center justify-center my-8 sm:my-12 overflow-hidden select-none pointer-events-none opacity-40 ${className}`}
    >
      <div className="h-px bg-gradient-to-r from-transparent via-maroon/30 to-maroon flex-1 max-w-xs" />
      <svg
        className="mx-3 text-maroon shrink-0 size-6 sm:size-7"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        {/* Intricate geometric 8-petal rangoli motif */}
        <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.2" />
        <path d="M12 2C12 6 9 9 5 9C9 9 12 12 12 16C12 12 15 9 19 9C15 9 12 6 12 2Z" />
        <path d="M12 22C12 18 15 15 19 15C15 15 12 12 12 8C12 12 9 15 5 15C9 15 12 18 12 22Z" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
      <div className="h-px bg-gradient-to-l from-transparent via-maroon/30 to-maroon flex-1 max-w-xs" />
    </div>
  );
}
