import React from "react";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
  id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className = "",
  id,
}: SectionHeadingProps) {
  const alignmentStyles =
    align === "center"
      ? "text-center items-center mx-auto"
      : "text-left items-start";

  return (
    <div
      id={id}
      className={`flex flex-col mb-8 sm:mb-12 max-w-3xl ${alignmentStyles} ${className}`}
    >
      {eyebrow && (
        <div className="eyebrow-marigold-strip mb-2">
          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-teal">
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold tracking-tight text-maroon mt-1 leading-tight">
        {title}
      </h2>
      {intro && (
        <p className="mt-3 text-base sm:text-lg text-ink/80 leading-relaxed max-w-2xl">
          {intro}
        </p>
      )}
    </div>
  );
}
