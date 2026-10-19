"use client";

import React, { useState } from "react";
import { Star, ShieldAlert } from "lucide-react";
import { Review } from "@/lib/data/doctors";
import { Badge } from "@/components/ui/Badge";

interface DoctorReviewsProps {
  reviews: Review[];
  overallRating?: number;
}

export function DoctorReviews({
  reviews,
  overallRating = 4.8,
}: DoctorReviewsProps) {
  const [filter, setFilter] = useState<"all" | "5" | "4-below">("all");

  const filteredReviews = reviews.filter((r) => {
    if (filter === "5") return r.rating === 5;
    if (filter === "4-below") return r.rating <= 4;
    return true;
  });

  const filterOptions: { id: "all" | "5" | "4-below"; label: string }[] = [
    { id: "all", label: `All (${reviews.length})` },
    {
      id: "5",
      label: `5 stars (${reviews.filter((r) => r.rating === 5).length})`,
    },
    {
      id: "4-below",
      label: `4 stars and below (${reviews.filter((r) => r.rating <= 4).length})`,
    },
  ];

  return (
    <section
      className="bg-white rounded-card shadow-card border border-ink/10 p-6 sm:p-8 space-y-6"
      aria-labelledby="sample-reviews-heading"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-ink/10 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2
              id="sample-reviews-heading"
              className="text-xl font-bold text-maroon"
            >
              Sample reviews (fictional)
            </h2>
            <Badge variant="sample" size="sm">
              Illustrative only
            </Badge>
          </div>
          <p className="text-xs text-ink/70">
            Fictional demonstrations. No review represents real patient clinical feedback.
          </p>
        </div>

        {/* Rating summary */}
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-DEFAULT shrink-0">
          <Star className="size-4 fill-amber-400 text-amber-500" />
          <span className="text-sm font-bold text-ink">
            {overallRating.toFixed(1)} / 5.0
          </span>
          <span className="text-xs text-ink-subtle">
            ({reviews.length} sample reviews)
          </span>
        </div>
      </div>

      {/* Star filter controls */}
      <div
        role="group"
        aria-label="Filter sample reviews by star rating"
        className="flex items-center gap-2 flex-wrap"
      >
        <span className="text-xs font-semibold text-ink-muted mr-1">
          Filter reviews:
        </span>
        {filterOptions.map((opt) => {
          const isActive = filter === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setFilter(opt.id)}
              aria-pressed={isActive}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-saffron ${
                isActive
                  ? "bg-maroon text-white border-maroon shadow-sm"
                  : "bg-cream/40 text-ink hover:bg-cream border-ink/15"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((rev) => (
            <article
              key={rev.id}
              className="p-4 rounded-card bg-cream/30 border border-ink/10 space-y-2 text-left"
            >
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div
                  className="flex items-center gap-1"
                  aria-label={`Rating: ${rev.rating} out of 5 stars`}
                >
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={`size-3.5 ${
                        idx < rev.rating
                          ? "fill-amber-400 text-amber-500"
                          : "text-ink/20"
                      }`}
                    />
                  ))}
                  <span className="text-xs font-bold text-ink ml-1.5">
                    {rev.rating}.0
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-ink-subtle">
                    {rev.date}
                  </span>
                  <Badge variant="sample" size="sm">
                    Fictional
                  </Badge>
                </div>
              </div>

              <p className="text-sm text-ink/85 leading-relaxed font-normal">
                {rev.text}
              </p>

              <div className="text-[11px] text-ink-subtle flex items-center gap-1 pt-1">
                <ShieldAlert className="size-3 text-amber-700" />
                <span>Sample illustrative review for demonstration purposes.</span>
              </div>
            </article>
          ))
        ) : (
          <p className="text-xs text-ink/60 py-4 italic text-center">
            No sample reviews match this rating filter.
          </p>
        )}
      </div>
    </section>
  );
}
