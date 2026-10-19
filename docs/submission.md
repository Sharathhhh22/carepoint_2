# RYNX Digital Media Category 7: Clinic & Healthcare Website Submission

**Project Name:** CarePoint (Healthcare, Closer to Home)  
**Submission Category:** Category 7: Clinic & Healthcare Discovery Platform (India)  
**Engineering Discipline:** Senior Frontend Web Engineering & UX Design  
**Date:** October 2026  
**License & Nature:** Frontend Demonstration Site (All clinicians, patients, and content are fictional)  

---

## 1. Executive Summary

CarePoint is a frontend-only multi-specialty clinic and hospital discovery website tailored specifically for the Indian metropolitan healthcare ecosystem (Bengaluru, Mumbai, New Delhi). Built to simulate a production client project for RYNX Digital Media, CarePoint delivers verified facility discovery, upfront transparent consultation fees in Indian Rupees (₹), multilingual localized interfaces (English, हिन्दी, ಕನ್ನಡ, தமிழ், తెలుగు), an accessible multi-step appointment scheduler, and a triage-conscious AI assistant simulation.

Zero backend or external database dependencies exist; all content is driven by typed static sample models with zero placeholders, dead buttons, or medical overclaims.

---

## 2. Technology Stack & Quality Standards

- **Core Framework:** Next.js (App Router, v15.1.0) with React 19.
- **Language & Types:** TypeScript in strict mode (`"strict": true`, zero `any`, zero `ts-ignore`).
- **Styling Architecture:** Tailwind CSS with custom design tokens (`--saffron`, `--marigold`, `--maroon`, `--teal`, `--cream`, `--ink`).
- **Typography:** Google Fonts **Hind** (`latin` and `devanagari` subsets), preloaded and optimized with system regional fallbacks for Kannada, Tamil, and Telugu.
- **Iconography:** Lucide React (`lucide-react`) with fixed `IconBadge` alignment and strict size tokens.
- **Motion & Micro-interactions:** Framer Motion, strictly respecting OS `prefers-reduced-motion` settings.
- **Form Architecture & Validation:** `react-hook-form` paired with `zod` schemas for appointment booking and newsletter subscriptions.
- **Testing Suites:**
  - **Vitest:** 40 comprehensive unit tests covering currency formatting (`formatINR` with en-IN grouping ₹1,00,000), `haversineKm`, `openNowStatus` (with fixed clock), `sortByFee`, `sortByDistance`, `glossary lookup`, facility/doctor filters, and Zod schemas (100% pass in 1.3s).
  - **Playwright:** 32 automated end-to-end tests across Desktop Chromium and Mobile Chrome viewports covering Homepage rendering, Search -> Results flow, Multilingual switching (including Telugu fallback), Budget filtering, Appointment dialog modal (focus trapping, slot selection, demo confirmation, Escape handling), Mobile menu focus traps, Assistant panel launcher, horizontal scroll across viewports, Doctor profile SSG pages + custom 404, and all Patient Questions Q1 through Q5 (100% pass in 38.2s).
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

## 4. PATIENT QUESTIONS (Acceptance Criteria)

Every patient question is visibly answered on the live website and backed by automated Playwright and Vitest tests:

### Q1. "How much will it cost?"
- **Upfront Pricing:** Every doctor and facility card visibly shows consultation fees in ₹ via `formatINR()` with standard Indian number grouping (`₹1,00,000`), or "Fee not listed". No blank prices exist anywhere.
- **Budget Filter:** Interactive 4-tier filter (`Any budget`, `Under ₹500`, `₹500 to ₹1,000`, `Above ₹1,000`) filters both doctors and facilities and declares the number of hidden unlisted facilities.
- **Sort Control:** Dropdown allowing sorting by `"Fee: low to high"`, `"Fee: high to low"`, and `"Nearest first"`.
- **Fee Guide Table:** A dedicated table in Practical Services with common consultation types and ₹ ranges, labelled:  
  *"Sample fees. Excludes applicable taxes. Confirm with the clinic before visiting."*
- **What’s Included List:** Each doctor profile at `/doctors/[slug]` displays an explicit "What’s included in Consultation" list:
  1. Comprehensive doctor consultation
  2. One follow-up within 7 days (sample)
  3. Tests and procedures are charged separately

### Q2. "Which clinic is near me?"
- **Location Selector:** City cascader followed by locality selector.
- **Use My Location:** Button triggering `navigator.geolocation.getCurrentPosition`.
- **Permission Granted:** Uses the Haversine formula to compute straight-line distance from user GPS coordinates to each facility's coordinates, displaying `"2.4 km away"` on each card and sorting nearest first.
- **Permission Denied / Fallback:** Uses the selected locality coordinates as reference and visibly labels the result `"Distance based on locality (sample)"`. Never shows a distance without a label.
- **Facility Metadata:** Shows locality, address, structured operating hours, and a "Get directions" link to Google Maps search URL built directly from facility coordinates.
- **Structured Opening Hours:** Stored per weekday (`{ mon: ["08:30", "19:30"], ... }`), evaluated in `Asia/Kolkata` time: shows `"Open now until 7:30 PM"` or `"Closed. Opens Monday 8:30 AM"`.

### Q3. "Can I trust this doctor?"
- **Verified Qualifications Block:** Doctor profile features degree qualifications, specialty, years of experience, languages, and practicing facility. Each item displays a `"Sample verification"` badge.
- **Medical Council Register Note:** Visibly displayed on every doctor profile:  
  *"In a live listing, qualifications would be checked against the official medical council register. This demo shows sample data only."*
- **Sample Reviews (Fictional):** Star rating summary, review count, and at least 3 illustrative reviews per doctor marked with `labelledSample: true` and illustrative badges.
- **Review Star Filter:** Keyboard-accessible filter buttons (`All`, `5 stars`, `4 stars and below`).

### Q4. "Can I understand this easily?"
- **Plain English:** Grade 8 reading level without unexplained clinical jargon.
- **GlossaryTerm Component:** Keyboard-accessible popover component (triggerable via Enter/Space/Click, dismissable via Escape or click-outside) explaining key healthcare terms in 1-2 plain sentences:
  - `OPD` (outpatient visit, no admission)
  - `Follow-up`
  - `Cashless claim`
  - `Pre-authorisation`
  - `General physician`
  - `Specialist`
  - `Consultation fee`
- **Multilingual Support:** English, हिन्दी (Hindi), ಕನ್ನಡ (Kannada), தமிழ் (Tamil), and తెలుగు (Telugu).
- **Graceful Fallback:** Missing strings recursively fall back to English without blank or broken glyphs.
- **Translation Demo Badge:** Non-English text displays a `"Machine-assisted translation (demo)"` label.
- **Regional Typography:** Font stack includes `Hind`, `'Noto Sans Devanagari'`, `'Noto Sans Kannada'`, `'Noto Sans Tamil'`, and `'Noto Sans Telugu'`.

### Q5. "Can I get an appointment without wasting time?"
- **Mobile Fast Access:** Search reachable in one tap. Sticky bottom bar on mobile viewports featuring `"Find care"` and `"Book (DEMO)"`.
- **Doctor Card Quick Book:** Sample "Next available" time slot and `"Book (DEMO)"` button opening `AppointmentDialog` with clinician preselected.
- **Appointment Dialog Upfront Details:**
  - Displays consultation fee at the top before any slot is picked.
  - Displays `"Earliest available: {day} {time} (sample)"` line.
  - Slots organized under **Morning Slots**, **Afternoon Slots**, and **Evening Slots**.
- **Tel Links:** Facility cards feature direct `tel:` links next to phone numbers for one-tap calling.
- **4-Click Booking Path:** Verified that from the homepage to the DEMO success message takes **4 or fewer clicks**:
  1. Click 1: Click "Book (DEMO)" on doctor card.
  2. Click 2: Click available time slot radio.
  3. Click 3: Click "Continue to Details".
  4. Click 4: Click "Confirm Booking (DEMO)" (after typing name).
  Confirmation banner: *"Demo only. No appointment was made."*

---

## 5. Section Architecture (01 to 06)

1. **Section 01: Global Navigation & Accessibility Bar:**
   - Emergency hotline callout (112), operating hours, desktop & mobile language selector (5 languages), demo sign-in dialog with focus trapping, Skip Link, and sticky header with blur on scroll.
2. **Section 02: Hero & Smart Search:**
   - Single `<h1>` "Healthcare, closer to home.", cascading city/locality selector, "Use my location" GPS button, free-text search input, and responsive CTA stacking.
3. **Section 03: Specialities Grid:**
   - 8 disciplines (General physician, Dentist, Dermatology, Paediatrics, Gynaecology, Orthopaedics, Cardiology, Eye care) with size-6 icons, descriptions, and one-click filter triggers.
4. **Section 04: Healthcare Discovery:**
   - Local facility cards with live open/closed status, distance display, Google Maps directions links, phone tel: links, and demo booking buttons.
   - Doctor search with name/specialty input, female doctor toggle, language filter, live `aria-live="polite"` result count, 4-tier Budget Filter, and Sort Control (`Fee: low to high`, `Fee: high to low`, `Nearest first`).
5. **Section 05: Practical Services & Schemes:**
   - Fee guide table with consultation types and ₹ ranges, plain-language medical glossary popover bar, diagnostic pathology tests list with sample booking, telehealth video consult card, and public schemes (PM-JAY & State) with verified official links.
6. **Section 06: Family Care, FAQs, & Footer:**
   - Keyboard-operable family tabs (Self, Parents, Children, Spouse) with preventive tips; accessible 5-item FAQ accordion; and comprehensive footer with newsletter validation, copyright, and the mandatory demonstration disclaimer.
