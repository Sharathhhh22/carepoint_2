export interface PricingItem {
  id: string;
  name: string;
  category: "General Consultation" | "Specialist" | "Preventive Package";
  fee: number;
  duration: string;
  features: string[];
}

export interface DiagnosticTest {
  id: string;
  name: string;
  category: string;
  sampleFee: number;
  turnaroundHours: number;
  preparationNotes: string;
}

export const samplePricingData: PricingItem[] = [
  {
    id: "price-gp",
    name: "General Physician Consultation",
    category: "General Consultation",
    fee: 450,
    duration: "15-20 mins",
    features: [
      "Physical vitals check",
      "Digital prescription",
      "Free 3-day follow-up review (Demo)",
    ],
  },
  {
    id: "price-specialist",
    name: "Specialist Clinical Review",
    category: "Specialist",
    fee: 750,
    duration: "20-30 mins",
    features: [
      "Specialty symptom assessment",
      "Medication history appraisal",
      "Diagnostic report evaluation",
    ],
  },
  {
    id: "price-super",
    name: "Senior Super-Specialist Review",
    category: "Specialist",
    fee: 1100,
    duration: "30-45 mins",
    features: [
      "In-depth clinical evaluation",
      "Lifestyle risk stratification",
      "Care pathway planning",
    ],
  },
  {
    id: "price-basic-checkup",
    name: "Essential Wellness Screen",
    category: "Preventive Package",
    fee: 999,
    duration: "1 hour",
    features: [
      "Complete blood count (CBC)",
      "Fasting blood glucose",
      "Lipid profile & Liver enzymes",
      "Physician report discussion",
    ],
  },
  {
    id: "price-senior-checkup",
    name: "Senior Citizen Comprehensive Package",
    category: "Preventive Package",
    fee: 1850,
    duration: "2 hours",
    features: [
      "Renal & Liver function tests",
      "HbA1c & Vitamin D3/B12",
      "Resting ECG & Blood pressure",
      "Geriatric physician consultation",
    ],
  },
];

export const diagnosticTestsData: DiagnosticTest[] = [
  {
    id: "test-cbc",
    name: "Complete Blood Count (CBC)",
    category: "Haematology",
    sampleFee: 320,
    turnaroundHours: 6,
    preparationNotes: "No fasting required. Random blood sample.",
  },
  {
    id: "test-lipid",
    name: "Lipid Profile (Cholesterol & Triglycerides)",
    category: "Biochemistry",
    sampleFee: 580,
    turnaroundHours: 8,
    preparationNotes: "10-12 hours overnight fasting recommended.",
  },
  {
    id: "test-hba1c",
    name: "HbA1c (Glycated Haemoglobin)",
    category: "Diabetology",
    sampleFee: 490,
    turnaroundHours: 6,
    preparationNotes: "No fasting necessary. Tests 3-month sugar averages.",
  },
  {
    id: "test-tft",
    name: "Thyroid Profile (T3, T4, TSH)",
    category: "Endocrinology",
    sampleFee: 550,
    turnaroundHours: 12,
    preparationNotes: "Morning sample preferred before breakfast.",
  },
  {
    id: "test-vitd",
    name: "Vitamin D3 (25-Hydroxy)",
    category: "Vitamin & Bone Health",
    sampleFee: 850,
    turnaroundHours: 24,
    preparationNotes: "No special dietary restrictions prior to test.",
  },
  {
    id: "test-vitb12",
    name: "Vitamin B12 Assay",
    category: "Neurological & Blood",
    sampleFee: 780,
    turnaroundHours: 24,
    preparationNotes: "Overnight fasting of 8-10 hours advised.",
  },
];
