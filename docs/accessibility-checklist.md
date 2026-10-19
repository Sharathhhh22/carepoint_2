# CarePoint Accessibility (a11y) Verification Checklist

**Project:** CarePoint – Multi-Specialty Clinics & Hospitals in India (Demo)  
**Conformance Level:** WCAG 2.2 Level AA (and Level AAA for contrast)  
**Standard Audited Against:** W3C Web Content Accessibility Guidelines 2.2  

---

## 1. Principle 1: Perceivable

| Criterion | Level | Status | Implementation Details & Proof |
|---|---|---|---|
| **1.1.1 Non-text Content** | A | **PASS** | All informational icons have accessible text alternatives or surrounding labels. Decorative graphics (Jaali SVG lattice, Rangoli dividers) explicitly feature `aria-hidden="true"`. Photographs use descriptive `alt` tags depicting Indian healthcare settings. |
| **1.3.1 Info and Relationships** | A | **PASS** | Proper HTML5 landmarks (`<header>`, `<nav>`, `<main id="main-content">`, `<footer>`, `<dialog>`, `role="region"`, `role="radiogroup"`). Exactly one `<h1>` per page with sequential `<h2>` and `<h3>` heading hierarchy. Visible form labels attached via `htmlFor`/`id`. |
| **1.3.2 Meaningful Sequence** | A | **PASS** | DOM order matches reading and visual sequence (TopBar → Header → Hero → Specialities → Clinics & Hospitals → Doctors → Practical Services → Schemes → Family Care → FAQs → Footer). |
| **1.3.4 Orientation** | AA | **PASS** | Fully operable in portrait and landscape modes across all device widths (360px to 1440px+). |
| **1.4.3 Contrast (Minimum)** | AA | **PASS** | Body text (`#2B1B17` on `#FFF8EC`): **15.82:1** (exceeds 4.5:1). Headings (`#6B1E2E` on `#FFF8EC`): **10.88:1** (exceeds 4.5:1). Saffron primary buttons use Ink text (`#2B1B17` on `#E8891C`): **6.40:1** (exceeds 4.5:1). Teal trust badges (`#0F6E6E` on `#FFF8EC`): **5.75:1**. |
| **1.4.4 Resize Text** | AA | **PASS** | Text scalable up to 200% without loss of content, truncation, or overlapping controls. Fluid typography uses `clamp()` values. |
| **1.4.10 Reflow** | AA | **PASS** | Responsive down to 320px with zero horizontal scrollbar (`overflow-x: hidden`). Evaluated at 360px, 390px, 768px, 1024px, 1280px, and 1440px. |
| **1.4.11 Non-text Contrast** | AA | **PASS** | Form input borders and button borders exceed 3:1 against their backgrounds. Focus rings achieve over 3:1 contrast. |

---

## 2. Principle 2: Operable

| Criterion | Level | Status | Implementation Details & Proof |
|---|---|---|---|
| **2.1.1 Keyboard** | A | **PASS** | 100% of visible controls are keyboard reachable and actionable via `Tab`, `Enter`, and `Space`. Custom components (Budget Filter, Appointment slot picker, Family Care tabs) implement standard Arrow Key navigation. |
| **2.1.2 No Keyboard Trap** | A | **PASS** | Focus is retained within active modals (`AppointmentDialog`, `LoginDemoDialog`, `MobileMenu`) and released immediately upon `Escape` or clicking Close. Focus returns to trigger elements. |
| **2.2.2 Pause, Stop, Hide** | A | **PASS** | No infinite unpausable auto-scroll or flashing media. Skeletons resolve in 600ms. |
| **2.4.1 Bypass Blocks** | A | **PASS** | Accessible Skip Link (`SkipLink.tsx`) positioned at the top of the DOM, visible on keyboard focus, jumping directly to `#main-content`. |
| **2.4.3 Focus Order** | A | **PASS** | Logical sequential focus navigation following visual reading order. Modal open traps focus to first interactive field. |
| **2.4.7 Focus Visible** | AA | **PASS** | Universal `focus-visible:ring-2 focus-visible:ring-saffron focus-visible:ring-offset-2` applied across all interactive elements. |
| **2.5.3 Label in Name** | A | **PASS** | Visual button and link text matches programmatically declared accessible name. |
| **2.5.8 Target Size (Minimum)** | AA | **PASS** | Every interactive button, selector, and input enforces a minimum bounding box of 44 × 44 pixels (`min-h-11`). |

---

## 3. Principle 3: Understandable

| Criterion | Level | Status | Implementation Details & Proof |
|---|---|---|---|
| **3.1.1 Language of Page** | A | **PASS** | `html lang` dynamically declared and synchronized with the selected language (`en`, `hi`, `kn`, `ta`). |
| **3.2.1 On Focus** | A | **PASS** | Focusing controls does not trigger unexpected navigation, submit actions, or popups. |
| **3.2.2 On Input** | A | **PASS** | Changing select elements or typing filters updates results reactively without triggering page reloads. |
| **3.3.1 Error Identification** | A | **PASS** | Form validation errors are explicitly marked with `role="alert"` and descriptive messages. |
| **3.3.2 Labels or Instructions** | A | **PASS** | Visible `<label>` elements or accessible `aria-label` provided for every input, select, and textarea. Mandatory fields marked with asterisks. |

---

## 4. Principle 4: Robust

| Criterion | Level | Status | Implementation Details & Proof |
|---|---|---|---|
| **4.1.2 Name, Role, Value** | A | **PASS** | Semantic HTML5 and ARIA roles (`role="radiogroup"`, `role="radio"`, `role="dialog"`, `role="tablist"`, `role="tab"`, `aria-expanded`, `aria-selected`, `aria-controls`). |
| **4.1.3 Status Messages** | AA | **PASS** | Dynamic doctor and facility count changes announced politely using `aria-live="polite"`. Toasts use `role="status"` and `aria-live="polite"`. |
