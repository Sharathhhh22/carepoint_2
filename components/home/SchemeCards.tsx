"use client";

import React from "react";
import { ExternalLink, Landmark, AlertCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { healthcareSchemesData } from "@/lib/data/schemes";

export function SchemeCards() {
  return (
    <section
      id="schemes"
      className="py-16 sm:py-20 bg-cream border-t border-ink/10"
      aria-labelledby="schemes-heading"
    >
      <Container>
        <div className="mb-10 max-w-3xl">
          <div className="eyebrow-marigold-strip mb-2">
            <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-teal">
              Public Health Initiatives
            </span>
          </div>
          <h2
            id="schemes-heading"
            className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold tracking-tight text-maroon mt-1 leading-tight"
          >
            Government Healthcare Schemes
          </h2>
          <p className="mt-3 text-base sm:text-lg text-ink/80 leading-relaxed">
            Essential information regarding subsidized public healthcare coverage across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {healthcareSchemesData.map((scheme) => (
            <Card key={scheme.id} hoverable className="border border-ink/15 flex flex-col justify-between">
              <CardHeader>
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="size-11 rounded-DEFAULT bg-maroon/10 text-maroon flex items-center justify-center shrink-0">
                    <Landmark className="size-6" />
                  </div>
                  <Badge variant="teal" size="sm">
                    {scheme.tag}
                  </Badge>
                </div>
                <h3 className="text-xl font-bold text-maroon">
                  {scheme.title}
                </h3>
              </CardHeader>

              <CardContent className="space-y-4 text-xs sm:text-sm text-ink/85">
                <p className="leading-relaxed">
                  {scheme.summary}
                </p>

                <div className="p-3 bg-cream/70 rounded-DEFAULT border border-ink/10 space-y-1">
                  <span className="font-bold text-ink text-xs uppercase tracking-wider block">
                    Coverage Scope:
                  </span>
                  <p className="text-xs text-ink/80 leading-relaxed">
                    {scheme.coverageDetail}
                  </p>
                </div>

                {/* Mandatory Disclaimer Callout */}
                <div className="p-3 bg-amber-50 rounded-DEFAULT border border-amber-200 text-xs text-amber-900 flex items-start gap-2 leading-relaxed">
                  <AlertCircle className="size-4 shrink-0 text-amber-700 mt-0.5" />
                  <span>
                    <strong>Eligibility Verification:</strong> {scheme.eligibilityDisclaimer}
                  </span>
                </div>
              </CardContent>

              <CardFooter className="pt-4 border-t border-ink/10">
                <a
                  href={scheme.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-DEFAULT bg-maroon text-white font-semibold text-sm hover:bg-maroon-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron transition-colors"
                >
                  <span>{scheme.linkLabel}</span>
                  <ExternalLink className="size-4 shrink-0" />
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
