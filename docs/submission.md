# RYNX Digital Media Category 7: Clinic & Healthcare Website Submission

**Project Name:** CarePoint (Healthcare, Closer to Home)  
**Submission Category:** Category 7: Clinic & Healthcare Discovery Platform (India)  
**Engineering Discipline:** Senior Frontend Web Engineering & UX Design  
**Date:** October 2026  
**License & Nature:** Frontend Demonstration Site (All clinicians, patients, and content are fictional)  

---

## 1. Executive Summary

CarePoint is a frontend-only multi-specialty clinic and hospital discovery website tailored specifically for the Indian metropolitan healthcare ecosystem (Bengaluru, Mumbai, New Delhi). Built to simulate a production client project for RYNX Digital Media, CarePoint delivers verified facility discovery, upfront transparent consultation fees in Indian Rupees (₹), multilingual localized interfaces (English, हिन्दी, ಕನ್ನಡ, தமிழ்), an accessible multi-step appointment scheduler, and a triage-conscious AI assistant simulation.

Zero backend or external database dependencies exist; all content is driven by typed static sample models with zero placeholders, dead buttons, or medical overclaims.

---

## 2. Technology Stack & Quality Standards

- **Core Framework:** Next.js (App Router, v15.1.0) with React 19.
- **Language & Types:** TypeScript in strict mode (`"strict": true`, zero `any`, zero `ts-ignore`).
- **Styling Architecture:** Tailwind CSS with custom design tokens (`--saffron`, `--marigold`, `--maroon`, `--teal`, `--cream`, `--ink`).
- **Typography:** Google Fonts **Hind** (`latin` and `devanagari` subsets), preloaded and optimized.
- **Iconography:** Lucide React (`lucide-react`) with fixed `IconBadge` alignment and strict size tokens.
- **Motion & Micro-interactions:** Framer Motion, strictly respecting OS `prefers-reduced-motion` settings.
- **Form Architecture & Validation:** `react-hook-form` paired with `zod` schemas for appointment booking and newsletter subscriptions.
- **Testing Suites:**
  - **Vitest:** 26 comprehensive unit tests covering currency formatting (`formatINR`), facility filters, doctor filters, budget ranges, assistant triage keyword rules, and Zod schemas (100% pass in 1.5s).
  - **Playwright:** 22 automated end-to-end tests across Chromium and Mobile Chrome viewports covering Homepage rendering, Search -> Results flow, Multilingual switching, Budget filtering, Appointment dialog modal (focus trapping, slot selection, demo confirmation, Escape handling), Mobile menu focus traps, Assistant panel launcher, horizontal scroll across viewports, and Doctor profile SSG pages + custom 404 (22/22 passed in 27.3s).
  - **Visual Artifacts:** Captured full-page high-resolution screenshots in `public/screenshots/` (`desktop-home.png`, `desktop-appointment.png`, `mobile-home.png`, `mobile-appointment.png`).

---

## 3. Mandatory Compliance & Verification Status

| Requirement / Check | Status | Verification Detail |
|---|---|---|
| **Fictional Data Adherence** | **PASS** | Every doctor, facility, address, and phone number is fictional. Phone numbers strictly use `+91 555` prefix; emails use `@example.com`. |
| **Web Conflict Check** | **PASS** | Web search verified that no listed facility or doctor matches real clinics/physicians in Bengaluru, Mumbai, or Delhi. |
| **Clear Demo Badging** | **PASS** | Sample doctors, prices, ratings, and badges are labelled "Sample data" or "Demo". Disclaimer displayed across modals and footer. |
| **No Unsubstantiated Claims** | **PASS** | Avoids superlative language ("best", "guaranteed"). Employs cautious wording ("experienced clinicians", "consult your doctor"). Insurance displayed solely as "Cashless insurance (demo)" text labels. |
| **Licensed Photography** | **PASS** | High-resolution WebP photographs (at least 1600px long edge, quality 90) licensed under Unsplash Free Commercial License. Fully documented in `docs/credits.md`. |
| **Footer Mandatory Disclaimer** | **PASS** | Footer displays exact text: *"Demonstration website. All clinicians, patients, and content are fictional."* |
| **Interactive Integrity** | **PASS** | Zero dead buttons. Zero broken links. All filter combinations have designed empty states. |
| **WCAG 2.2 Level AA Accessibility** | **PASS** | Evaluated and passing. All body text contrast exceeds 4.5:1; primary buttons achieve 6.40:1. Universal focus rings and keyboard operability. |

---

## 4. Section Architecture (01 to 06)

1. **Section 01: Global Navigation & Accessibility Bar:**
   - Emergency hotline callout (112), operating hours, desktop & mobile language selector, demo sign-in dialog with focus trapping, Skip Link, and sticky header with blur on scroll.
2. **Section 02: Hero & Smart Search:**
   - Single `<h1>` "Healthcare, closer to home.", cascading city/locality selector, free-text search input, and responsive CTA stacking.
3. **Section 03: Specialities Grid:**
   - 8 disciplines (General physician, Dentist, Dermatology, Paediatrics, Gynaecology, Orthopaedics, Cardiology, Eye care) with size-6 icons, descriptions, and one-click filter triggers.
4. **Section 04: Healthcare Discovery:**
   - Local facility cards with 600ms mount skeleton loaders, sample ratings, Google Maps directions links, and demo booking buttons.
   - Doctor search with name/specialty input, female doctor toggle, language filter, live `aria-live="polite"` result count, and 4-tier Budget Filter.
5. **Section 05: Practical Services:**
   - Transparent pricing schedule in ₹, diagnostic pathology tests list with sample booking, telehealth video consult card, and public schemes (PM-JAY & State) with verified official links.
6. **Section 06: Family Care, FAQs, & Footer:**
   - Keyboard-operable family tabs (Self, Parents, Children, Spouse) with preventive tips; accessible 5-item FAQ accordion; and comprehensive footer with newsletter validation and copyright.
