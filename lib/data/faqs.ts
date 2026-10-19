export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqsData: FaqItem[] = [
  {
    id: "faq-fees",
    question: "How are consultation fees determined and displayed?",
    answer:
      "All consultation fees on CarePoint are displayed upfront in Indian Rupees (₹) with zero hidden platform charges. Fees range typically from ₹400 for primary care consultations up to ₹1,500 for senior super-specialists. Note that all fees shown on this website are sample demo prices for illustrative purposes and exclude applicable statutory taxes.",
  },
  {
    id: "faq-insurance",
    question: "How does Cashless Insurance (Demo) work?",
    answer:
      "Facilities that support cashless claims feature a 'Cashless insurance (demo)' label. In a real-world scenario, you would present your Third-Party Administrator (TPA) health card and government photo ID at the facility's insurance desk. On CarePoint, insurance support is purely a demonstration badge and does not imply tie-ups or active policy validation.",
  },
  {
    id: "faq-family",
    question: "Can I book an appointment on behalf of my parents or children?",
    answer:
      "Yes. When selecting a slot through our demo appointment dialog, you can enter the patient's full name, age, and relationship. We provide specialized guidance tabs for elderly parents (mobility, chronic illness reviews) and paediatric care for infants and children.",
  },
  {
    id: "faq-cancellation",
    question: "What is the appointment rescheduling and cancellation policy?",
    answer:
      "Clinics and hospitals listed on our directory recommend providing at least 2 hours advance notice for rescheduling or cancellations to enable other patients in need to access timely medical attention. Because CarePoint is a frontend demonstration, sample bookings incur no payment or cancellation penalty.",
  },
  {
    id: "faq-emergency",
    question: "What should I do if I experience a medical emergency?",
    answer:
      "For emergencies, call 112 immediately or go directly to the nearest hospital emergency department. CarePoint is a clinic discovery and scheduled consultation platform; it is not equipped or intended for urgent or acute life-threatening situations.",
  },
];
