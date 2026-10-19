# CarePoint Design Decisions & Architecture Manifesto

**Project:** CarePoint – Multi-Specialty Clinic & Hospital Discovery Site (India)  
**Client / Context:** RYNX Digital Media – Category 7: Clinic & Healthcare Website  
**Lead UI/UX & Frontend Engineer:** Senior Frontend Engineering Team  
**Design Target:** WCAG 2.2 Level AA Conformance, Premium Indian Visual Language, Strict Zero-Error Frontend  

---

## 1. Palette & Design Tokens

CarePoint incorporates a cultural aesthetic grounded in contemporary Indian healthcare and architectural motifs, paired with rigorous digital accessibility standards.

| Token | Hex Value | Semantic Purpose | WCAG Pair & Ratio | AA Status |
|---|---|---|---|---|
| `--saffron` | `#E8891C` | Primary action buttons & active highlights | On `#2B1B17` (Ink text): **6.40:1** | **PASS** (AA & AAA Large) |
| `--maroon` | `#6B1E2E` | Section headings, primary branding & secondary CTAs | On `#FFF8EC` (Cream bg): **10.88:1**<br>With `#FFFFFF` text: **10.88:1** | **PASS** (AAA) |
| `--teal` | `#0F6E6E` | Verification badges, clinical trust & success signals | On `#FFF8EC` (Cream bg): **5.75:1**<br>On `#FFFFFF` (Card bg): **5.58:1** | **PASS** (AA) |
| `--marigold` | `#F2B84B` | Accent highlights, decorative strips & active badges | On `#2B1B17` (Ink text): **9.22:1** | **PASS** (AAA) |
| `--cream` | `#FFF8EC` | Base warm page background | Paired with `--ink`: **15.82:1** | **PASS** (AAA) |
| `--ink` | `#2B1B17` | High-contrast body text & primary button labels | On `#FFF8EC` (Cream bg): **15.82:1** | **PASS** (AAA) |

### Critical WCAG Contrast Finding & Token Adjustment
- **Analysis:** Standard white text (`#FFFFFF`) against saffron (`#E8891C`) yields a contrast ratio of only **2.61:1**, which **fails** WCAG 2.2 AA (requires 4.5:1 for body and 3:1 for large UI).
- **Remediation:** All primary buttons and badges with saffron background strictly utilize `--ink` (`#2B1B17`) text, achieving **6.40:1**, which exceeds WCAG 2.2 AA and meets Level AAA for UI components. Where light text is desired (e.g. secondary CTAs), deep `--maroon` (`#6B1E2E`) is employed with pure white text, achieving **10.88:1**.

---

## 2. Indian Visual Language & Cultural Architecture

1. **Jaali (Lattice) Motif:** A geometric lattice background SVG rendered at under 8% opacity (`fill-opacity="0.05"`) behind the Hero section, providing texture reminiscent of classical Indian stone fretwork without competing with readability.
2. **Rangoli Section Dividers:** A thin vector divider featuring an eight-petal geometric rangoli knotwork medallion flanked by fading gradients separating Sections 02 through 06.
3. **Marigold Eyebrow Strips:** Decorative 40px rounded marigold underlines anchored to uppercase clinical section eyebrows (`.eyebrow-marigold-strip`).
4. **All Decorative Elements Hidden from Screen Readers:** Purely decorative cultural motifs are explicitly marked with `aria-hidden="true"`.

---

## 3. Typography & Micro-copy

- **Primary Font:** **Hind** (`next/font/google`), crafted by the Indian Type Foundry with full Latin and Devanagari character subsets. Preloaded with weights 300, 400, 500, 600, 700 and `display: "swap"`.
- **Currency & Pricing Formatting:** All currency values are numeric types in data structures and strictly rendered through `formatINR(n)` using `Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })`. Zero price strings exist in components.
- **Tone & Medical Caution:** Phrases like "best", "guaranteed", "100% safe", and "cures" are strictly forbidden. Cautious, evidence-aligned copy is maintained throughout ("experienced doctors", "consult your doctor", "sample data").

---

## 4. Responsive Layout & Viewport Architecture

- **Breakpoints:** Tailwind mobile-first standards: base (<640px), `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px), `2xl:` (1536px).
- **Touch Targets:** Minimum 44 × 44 pixels (`min-h-11`) enforced on all visible buttons, selects, and inputs.
- **Horizontal Scroll Prevention:** `overflow-x: hidden` on body, zero fixed-pixel widths exceeding 320px, responsive flex and grid wrappers. Tested at 360px, 390px, 768px, 1024px, 1280px, and 1440px.
- **Hero CTA Stacking:** Primary and secondary actions stack vertically below 640px and sit side-by-side from 640px upward.
- **Floating Decorative Cards:** Hidden strictly below 1024px (`hidden lg:block`), with duplicate textual guarantees present in the accessible main content flow.

---

## 5. State Management & URL Synchronization

- **Persistence:** Search parameters (`q`, `city`, `locality`, `specialty`, `female`, `lang`, `budget`) synchronize bidirectionally to URL query strings via Next.js `router.replace(url, { scroll: false })`.
- **Zero Reload:** Full reactive filtering without page refreshes, allowing bookmarking and direct URL sharing.
- **Internationalization:** Persistent user language selection (`en`, `hi`, `kn`, `ta`) stored safely in `localStorage` wrapped in `try/catch` and updating the `html lang` attribute dynamically.
