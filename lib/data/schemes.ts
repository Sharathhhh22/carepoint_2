export interface HealthcareScheme {
  id: string;
  title: string;
  tag: string;
  summary: string;
  coverageDetail: string;
  eligibilityDisclaimer: string;
  officialUrl: string;
  linkLabel: string;
}

export const healthcareSchemesData: HealthcareScheme[] = [
  {
    id: "scheme-pmjay",
    title: "Ayushman Bharat PM-JAY",
    tag: "National Scheme",
    summary:
      "The flagship national public health insurance initiative providing coverage for secondary and tertiary hospitalization across empanelled public and private hospitals in India.",
    coverageDetail:
      "Up to ₹5,00,000 per family per year for defined secondary and tertiary care hospitalization treatments.",
    eligibilityDisclaimer:
      "Eligibility cannot be checked or claimed on CarePoint. Verification must be performed directly through the official National Health Authority beneficiary portal using an Aadhaar or Ration Card.",
    officialUrl: "https://pmjay.gov.in",
    linkLabel: "Visit PM-JAY Portal (opens official website)",
  },
  {
    id: "scheme-state",
    title: "State Government Health Schemes",
    tag: "State Initiatives",
    summary:
      "State-specific subsidized and cashless healthcare initiatives (such as Arogya Karnataka, Mahatma Jyotirao Phule Jan Arogya Yojana, and Chief Minister comprehensive schemes) operated by individual state health departments.",
    coverageDetail:
      "Varies by state jurisdiction. Typically covers catastrophic illness costs, specialized surgical interventions, and critical care procedures.",
    eligibilityDisclaimer:
      "State criteria, resident documentation, and income thresholds are determined strictly by respective state welfare authorities. Please verify status on your state government healthcare portal.",
    officialUrl: "https://nha.gov.in",
    linkLabel: "Check State Portals on NHA (opens official website)",
  },
];
