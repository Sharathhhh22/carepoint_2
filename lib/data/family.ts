export interface FamilyCareTab {
  id: "self" | "parents" | "children" | "spouse";
  label: string;
  headline: string;
  summary: string;
  recommendedSpecialities: {
    name: string;
    slug: string;
    reason: string;
  }[];
  tips: string[];
}

export const familyCareTabsData: FamilyCareTab[] = [
  {
    id: "self",
    label: "Self",
    headline: "Proactive Personal Health & Preventive Care",
    summary:
      "Stay on track with routine annual check-ups, preventive blood pressure monitoring, seasonal vaccines, and timely symptom reviews.",
    recommendedSpecialities: [
      {
        name: "General physician",
        slug: "general-physician",
        reason: "Annual health evaluations, routine blood pressure monitoring, and metabolic risk reviews.",
      },
      {
        name: "Dermatology",
        slug: "dermatology",
        reason: "Early skin checks, allergy diagnosis, pollution defense, and hair health guidance.",
      },
      {
        name: "Dentist",
        slug: "dentist",
        reason: "Twice-yearly dental scaling, cavity prevention, and gum health maintenance.",
      },
    ],
    tips: [
      "Schedule a comprehensive metabolic blood panel once every 12 months.",
      "Stay hydrated and aim for at least 30 minutes of moderate aerobic exercise daily.",
      "Track screen time to minimize digital eye strain and maintain regular sleep cycles.",
    ],
  },
  {
    id: "parents",
    label: "Parents",
    headline: "Senior Citizen Wellness & Geriatric Support",
    summary:
      "Practical healthcare for aging parents, including blood pressure monitoring, arthritis check-ups, vision screening, and regular medicine reviews.",
    recommendedSpecialities: [
      {
        name: "Cardiology",
        slug: "cardiology",
        reason: "Blood pressure regulation, resting ECG evaluations, and lipid management.",
      },
      {
        name: "Orthopaedics",
        slug: "orthopaedics",
        reason: "Osteoarthritis assessments, joint lubrication reviews, and fall-prevention physiotherapy.",
      },
      {
        name: "Eye care",
        slug: "eye-care",
        reason: "Regular cataract screening, glaucoma pressure tests, and diabetic retinopathy checks.",
      },
    ],
    tips: [
      "Keep an updated printed list of all daily medications and dosages in an accessible location.",
      "Ensure bathroom and walkway lighting is bright, with anti-skid mats to prevent slips.",
      "Monitor blood pressure and fasting sugars at consistent morning intervals.",
    ],
  },
  {
    id: "children",
    label: "Children",
    headline: "Paediatric Milestones & Childhood Health",
    summary:
      "Help your child grow well with timely vaccinations, routine growth checks, eye examinations, and cavity prevention.",
    recommendedSpecialities: [
      {
        name: "Paediatrics",
        slug: "paediatrics",
        reason: "Growth chart tracking, vaccine schedules, childhood asthma, and viral fever triage.",
      },
      {
        name: "Dentist",
        slug: "dentist",
        reason: "Fluoride applications, early bite alignment reviews, and milk tooth preservation.",
      },
      {
        name: "Eye care",
        slug: "eye-care",
        reason: "Early myopia detection and screening for digital eye fatigue from school screens.",
      },
    ],
    tips: [
      "Strictly maintain your child's immunization card as recommended by the Indian Academy of Pediatrics.",
      "Limit high-sugar snacking between meals to safeguard developing tooth enamel.",
      "Encourage at least 60 minutes of outdoor daylight play for healthy bone and eye development.",
    ],
  },
  {
    id: "spouse",
    label: "Spouse",
    headline: "Partner Wellness & Preventive Screenings",
    summary:
      "Keep up with regular preventive screenings, blood work, heart wellness, and healthy daily habits.",
    recommendedSpecialities: [
      {
        name: "Gynaecology",
        slug: "gynaecology",
        reason: "Cervical screenings, hormonal rhythm audits, prenatal counseling, and breast examinations.",
      },
      {
        name: "Cardiology",
        slug: "cardiology",
        reason: "Cardiometabolic profiling, stress ECG checks, and early lipid screening.",
      },
      {
        name: "General physician",
        slug: "general-physician",
        reason: "Comprehensive lifestyle audits, thyroid screening, and vitamin deficiency reviews.",
      },
    ],
    tips: [
      "Plan shared weekend physical activities such as cycling, brisk walks, or badminton.",
      "Review annual thyroid (TSH) and vitamin D3 levels together.",
      "Practice balanced dietary habits incorporating fiber-rich local grains and lentils.",
    ],
  },
];
