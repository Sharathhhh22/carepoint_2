import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowLeft, CheckCircle2, Keyboard, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Accessibility Statement | CarePoint (Demo)",
  description:
    "CarePoint's commitment to WCAG 2.2 AA accessibility, keyboard navigation shortcuts, and inclusive design standards.",
};

export default function AccessibilityPage() {
  return (
    <div className="py-12 sm:py-20 bg-cream">
      <Container className="max-w-4xl">
        <Link href="/" className="inline-block mb-6">
          <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="size-4" />}>
            Back to Homepage
          </Button>
        </Link>

        <SectionHeading
          eyebrow="Inclusive Design"
          title="Accessibility Statement"
          intro="Our commitment to ensuring that digital healthcare discovery is accessible to every individual across India."
        />

        <div className="bg-white rounded-card shadow-card border border-ink/10 p-6 sm:p-10 space-y-6 text-sm sm:text-base leading-relaxed text-ink/85">
          <div className="p-4 bg-teal/10 border border-teal/20 rounded-DEFAULT flex items-start gap-3 text-teal font-medium">
            <CheckCircle2 className="size-5 shrink-0 mt-0.5" />
            <span>
              <strong>Target Conformance: WCAG 2.2 Level AA:</strong> CarePoint has been architected and evaluated against the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA requirements.
            </span>
          </div>

          <h2 className="text-xl font-bold text-maroon pt-2">1. Core Accessibility Benchmarks Met</h2>
          <ul className="list-disc pl-6 space-y-2 text-ink/80">
            <li>
              <strong>Contrast Ratios:</strong> All body text achieves a contrast ratio of at least 4.5:1 against its background. Large headings and interactive controls exceed 3:1. Primary saffron buttons use deep ink text (#2B1B17) to guarantee a 6.4:1 contrast ratio.
            </li>
            <li>
              <strong>Touch Targets:</strong> Every button, link, and interactive selector enforces a minimum touch target size of 44 × 44 pixels (min-h-11).
            </li>
            <li>
              <strong>Semantic Structure:</strong> Every page contains exactly one <code>&lt;h1&gt;</code> heading, logical sequential heading levels (h2, h3), and standard landmark regions (<code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;footer&gt;</code>).
            </li>
            <li>
              <strong>Visible Focus Indicators:</strong> Universal high-contrast saffron focus rings (2px solid outline with 2px offset) are active across all focusable elements.
            </li>
            <li>
              <strong>Reduced Motion:</strong> Animations and reveals automatically respect the user&apos;s operating system <code>prefers-reduced-motion</code> preference.
            </li>
            <li>
              <strong>Screen Reader Support:</strong> Dynamic filter updates announce result counts using <code>aria-live=&quot;polite&quot;</code>. Form inputs feature explicit visible labels and descriptive error associations via <code>aria-describedby</code>.
            </li>
          </ul>

          <h2 className="text-xl font-bold text-maroon pt-2 flex items-center gap-2">
            <Keyboard className="size-5 text-maroon" />
            <span>2. Keyboard Navigation Guide</span>
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-ink/10 rounded-DEFAULT">
              <thead className="bg-cream/60">
                <tr>
                  <th className="p-3 border-b border-ink/10 font-bold text-maroon text-sm">Key</th>
                  <th className="p-3 border-b border-ink/10 font-bold text-maroon text-sm">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10 text-xs sm:text-sm">
                <tr>
                  <td className="p-3 font-mono font-semibold text-ink">Tab</td>
                  <td className="p-3">Navigate forward to next focusable link, button, or input field.</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-semibold text-ink">Shift + Tab</td>
                  <td className="p-3">Navigate backward to previous focusable control.</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-semibold text-ink">Enter / Space</td>
                  <td className="p-3">Activate buttons, open dialogs, and toggle checkboxes.</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-semibold text-ink">Escape</td>
                  <td className="p-3">Close active modals (Appointment Dialog, Demo Sign In, Assistant Panel, Mobile Menu) and return focus to triggering element.</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-semibold text-ink">Arrow Keys</td>
                  <td className="p-3">Navigate radio groups in Budget Filter and Appointment time slot selection.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-maroon pt-2">3. Feedback and Contact Address</h2>
          <p>
            We welcome ongoing feedback on the accessibility of CarePoint. If you encounter any barriers or have recommendations, please reach out to our accessibility coordinator:
          </p>
          <div className="p-4 bg-cream/40 border border-ink/10 rounded-DEFAULT space-y-1 text-sm">
            <p className="font-semibold text-maroon">CarePoint Accessibility Lead (Fictional)</p>
            <p>Plot 42, 3rd Cross, 100ft Road, Indiranagar, Bengaluru, Karnataka 560038</p>
            <p className="flex items-center gap-1.5 pt-1">
              <Mail className="size-4 text-teal" />
              <a href="mailto:accessibility@example.com" className="text-teal font-medium hover:underline">
                accessibility@example.com
              </a>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
