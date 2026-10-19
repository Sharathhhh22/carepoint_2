export interface AssistantReplyResult {
  text: string;
  isEmergency?: boolean;
  action?: {
    label: string;
    specialitySlug?: string;
    sectionHref?: string;
  };
}

export const assistantSuggestionChips = [
  "How much is a consultation?",
  "Which doctor for a skin rash?",
  "Is cashless insurance accepted?",
  "Chest pain",
];

const EMERGENCY_KEYWORDS = [
  "chest pain",
  "heart attack",
  "breathing trouble",
  "difficulty breathing",
  "shortness of breath",
  "stroke",
  "severe bleeding",
  "unconscious",
  "collapsed",
  "emergency",
  "112",
  "choking",
  "seizure",
];

/**
 * Returns an immediate keyword-based reply according to CarePoint's demo assistant rules.
 * Strictly adheres to emergency triage protocols and transparent Indian healthcare guidance.
 */
export function getAssistantReply(query: string): AssistantReplyResult {
  const normalized = query.toLowerCase().trim();

  // 1. Critical Emergency Guard
  const isEmergency = EMERGENCY_KEYWORDS.some((kw) => normalized.includes(kw));
  if (isEmergency) {
    return {
      text: "This may be an emergency. Call 112 now or go to the nearest emergency department. CarePoint is a discovery directory and cannot triage acute or life-threatening emergencies.",
      isEmergency: true,
      action: {
        label: "Emergency Notice Details",
        sectionHref: "#services",
      },
    };
  }

  // 2. Consultation fee queries
  if (
    normalized.includes("how much") ||
    normalized.includes("fee") ||
    normalized.includes("cost") ||
    normalized.includes("price") ||
    normalized.includes("budget") ||
    normalized.includes("rate") ||
    normalized.includes("charges")
  ) {
    return {
      text: "Consultation fees on CarePoint are displayed transparently in ₹. Typical sample consultation fees are ₹400 – ₹500 for general physicians, ₹600 – ₹800 for specialists (paediatrics, dermatology, orthopaedics), and ₹950 – ₹1,200 for senior cardiologists. You can use our Budget Filter to find doctors within your range.",
      isEmergency: false,
      action: {
        label: "View Pricing Table",
        sectionHref: "#services",
      },
    };
  }

  // 3. Skin issues / Dermatology
  if (
    normalized.includes("skin") ||
    normalized.includes("rash") ||
    normalized.includes("acne") ||
    normalized.includes("itching") ||
    normalized.includes("dermatol") ||
    normalized.includes("hair fall") ||
    normalized.includes("allergy")
  ) {
    return {
      text: "For skin rashes, persistent itching, acne, or allergies, we recommend consulting a certified Dermatologist. A clinical exam will accurately differentiate allergic contact dermatitis from fungal or viral presentations.",
      isEmergency: false,
      action: {
        label: "Filter Dermatologists",
        specialitySlug: "dermatology",
        sectionHref: "#find-doctors",
      },
    };
  }

  // 4. Cashless Insurance inquiries
  if (
    normalized.includes("cashless") ||
    normalized.includes("insurance") ||
    normalized.includes("tpa") ||
    normalized.includes("mediclaim") ||
    normalized.includes("policy") ||
    normalized.includes("claim")
  ) {
    return {
      text: "CarePoint features sample tags for 'Cashless insurance (demo)'. In practice, participating hospitals coordinate with your Third-Party Administrator (TPA) upon presenting your policy card and photo ID at the billing counter. Note: This is demo data with text labels only; no live insurer tie-ups are claimed.",
      isEmergency: false,
      action: {
        label: "Check FAQ on Insurance",
        sectionHref: "#faq",
      },
    };
  }

  // 5. Children / Paediatrics
  if (
    normalized.includes("child") ||
    normalized.includes("baby") ||
    normalized.includes("kid") ||
    normalized.includes("vaccin") ||
    normalized.includes("paediatr") ||
    normalized.includes("pediatr")
  ) {
    return {
      text: "For children and infants, our directory lists qualified Paediatricians experienced in growth tracking, vaccination regimes, and childhood infections.",
      isEmergency: false,
      action: {
        label: "Find Paediatricians",
        specialitySlug: "paediatrics",
        sectionHref: "#find-doctors",
      },
    };
  }

  // 6. Heart / Cardiology
  if (
    normalized.includes("heart") ||
    normalized.includes("cardio") ||
    normalized.includes("bp") ||
    normalized.includes("blood pressure") ||
    normalized.includes("ecg") ||
    normalized.includes("cholesterol")
  ) {
    return {
      text: "For routine blood pressure checks, preventive ECGs, and cardiovascular lifestyle advice, explore our Cardiology section. (If experiencing active chest heaviness or sudden breathlessness, please dial 112 immediately).",
      isEmergency: false,
      action: {
        label: "Explore Cardiologists",
        specialitySlug: "cardiology",
        sectionHref: "#find-doctors",
      },
    };
  }

  // 7. General Physician / Seasonal sickness
  if (
    normalized.includes("fever") ||
    normalized.includes("cold") ||
    normalized.includes("cough") ||
    normalized.includes("headache") ||
    normalized.includes("weakness") ||
    normalized.includes("general")
  ) {
    return {
      text: "A General Physician is your ideal starting point for primary diagnosis of seasonal fevers, fatigue, viral symptoms, or general unwellness.",
      isEmergency: false,
      action: {
        label: "Find General Physicians",
        specialitySlug: "general-physician",
        sectionHref: "#find-doctors",
      },
    };
  }

  // Default fallback
  return {
    text: "I am the CarePoint demo assistant. I can guide you on consultation fee ranges in ₹, recommend relevant specialities for your symptoms, or explain our demo cashless insurance tags. What can I help you find today?",
    isEmergency: false,
    action: {
      label: "Browse All Specialities",
      sectionHref: "#specialities",
    },
  };
}
