export interface Speciality {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName:
    | "Stethoscope"
    | "Smile"
    | "Sparkles"
    | "Baby"
    | "HeartHandshake"
    | "Bone"
    | "HeartPulse"
    | "Eye";
  sampleConsultationFee: number;
}

export const specialitiesData: Speciality[] = [
  {
    id: "spec-gp",
    name: "General physician",
    slug: "general-physician",
    description: "Primary care for fevers, infections, seasonal ailments, and chronic wellness.",
    iconName: "Stethoscope",
    sampleConsultationFee: 450,
  },
  {
    id: "spec-dentist",
    name: "Dentist",
    slug: "dentist",
    description: "Preventive dental hygiene, cavity fillings, root canals, and orthodontic advice.",
    iconName: "Smile",
    sampleConsultationFee: 500,
  },
  {
    id: "spec-derma",
    name: "Dermatology",
    slug: "dermatology",
    description: "Expert evaluation for skin rashes, acne management, allergies, and hair concerns.",
    iconName: "Sparkles",
    sampleConsultationFee: 700,
  },
  {
    id: "spec-paed",
    name: "Paediatrics",
    slug: "paediatrics",
    description: "Compassionate child healthcare, developmental tracking, and vaccination plans.",
    iconName: "Baby",
    sampleConsultationFee: 600,
  },
  {
    id: "spec-gyn",
    name: "Gynaecology",
    slug: "gynaecology",
    description: "Women’s health, maternity consultations, menstrual wellness, and screening.",
    iconName: "HeartHandshake",
    sampleConsultationFee: 750,
  },
  {
    id: "spec-ortho",
    name: "Orthopaedics",
    slug: "orthopaedics",
    description: "Joint pain, sports sprains, fracture care, and musculoskeletal rehabilitation.",
    iconName: "Bone",
    sampleConsultationFee: 800,
  },
  {
    id: "spec-cardio",
    name: "Cardiology",
    slug: "cardiology",
    description: "Preventive heart screenings, BP monitoring, ECG analysis, and lifestyle guidance.",
    iconName: "HeartPulse",
    sampleConsultationFee: 1100,
  },
  {
    id: "spec-eye",
    name: "Eye care",
    slug: "eye-care",
    description: "Comprehensive vision testing, eye strain checks, and cataract evaluations.",
    iconName: "Eye",
    sampleConsultationFee: 550,
  },
];
