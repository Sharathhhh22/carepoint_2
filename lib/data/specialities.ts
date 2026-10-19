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
    | "Eye"
    | "Activity"
    | "Zap"
    | "ShieldCheck"
    | "Microscope";
  sampleConsultationFee: number;
  conditions?: string[];
  procedures?: string[];
  whenToConsult?: string[];
}

export const specialitiesData: Speciality[] = [
  {
    id: "spec-gp",
    name: "General physician",
    slug: "general-physician",
    description: "Primary care for fevers, infections, seasonal ailments, and chronic wellness.",
    iconName: "Stethoscope",
    sampleConsultationFee: 450,
    conditions: ["Viral fevers", "Seasonal flu", "Hypertension", "Diabetes management", "Digestive distress", "Fatigue"],
    procedures: ["Physical examination", "Blood pressure profiling", "Preventive blood panels", "Vaccination"],
    whenToConsult: ["Persistent fever over 3 days", "Unexplained fatigue", "Annual health review", "Blood sugar fluctuations"],
  },
  {
    id: "spec-cardio",
    name: "Cardiology",
    slug: "cardiology",
    description: "Preventive heart screenings, BP monitoring, ECG analysis, and lifestyle guidance.",
    iconName: "HeartPulse",
    sampleConsultationFee: 1100,
    conditions: ["Coronary artery disease", "Hypertension", "Arrhythmia", "Heart failure", "Lipid disorders"],
    procedures: ["Electrocardiogram (ECG)", "2D Echocardiogram", "Treadmill stress test (TMT)", "Holter monitoring"],
    whenToConsult: ["Chest pain or tightness", "Shortness of breath on exertion", "Frequent palpitations", "High cholesterol family history"],
  },
  {
    id: "spec-ortho",
    name: "Orthopaedics",
    slug: "orthopaedics",
    description: "Joint pain, sports sprains, fracture care, and musculoskeletal rehabilitation.",
    iconName: "Bone",
    sampleConsultationFee: 800,
    conditions: ["Osteoarthritis", "Ligament tears", "Chronic back pain", "Frozen shoulder", "Bone fractures"],
    procedures: ["Joint injections", "Fracture reduction & casting", "Arthroscopy guidance", "Physiotherapy planning"],
    whenToConsult: ["Persistent knee or joint swelling", "Reduced mobility", "Sports injuries", "Unresolved spinal pain"],
  },
  {
    id: "spec-neuro",
    name: "Neurology",
    slug: "neurology",
    description: "Advanced neurological assessments for headaches, vertigo, tremors, and stroke recovery.",
    iconName: "Zap",
    sampleConsultationFee: 1200,
    conditions: ["Migraine & cluster headaches", "Epilepsy & seizures", "Parkinsonism", "Peripheral neuropathy", "Vertigo"],
    procedures: ["Nerve conduction studies (NCS)", "EEG interpretation", "Reflex & sensory mapping", "Stroke rehabilitation"],
    whenToConsult: ["Frequent severe migraines", "Sudden numbness or limb weakness", "Unexplained dizziness", "Memory or coordination changes"],
  },
  {
    id: "spec-paed",
    name: "Paediatrics",
    slug: "paediatrics",
    description: "Compassionate child healthcare, developmental tracking, and vaccination plans.",
    iconName: "Baby",
    sampleConsultationFee: 600,
    conditions: ["Childhood infections", "Asthma & allergies", "Growth delays", "Nutritional deficiencies", "Colic"],
    procedures: ["Universal immunization", "Milestone growth assessment", "Pediatric nebulization", "Dietary guidance"],
    whenToConsult: ["High fever in infants", "Wheezing or breathlessness", "Delayed developmental milestones", "Scheduled vaccinations"],
  },
  {
    id: "spec-gyn",
    name: "Gynaecology",
    slug: "gynaecology",
    description: "Women’s health, maternity consultations, menstrual wellness, and screening.",
    iconName: "HeartHandshake",
    sampleConsultationFee: 750,
    conditions: ["PCOS / PCOD", "Menstrual irregularities", "Pregnancy care", "Pelvic pain", "Menopausal health"],
    procedures: ["Pap smear screening", "Antenatal ultrasound reviews", "Pelvic examinations", "Contraception counseling"],
    whenToConsult: ["Irregular menstrual cycles", "Planning pregnancy", "Severe pelvic discomfort", "Routine cervical health checks"],
  },
  {
    id: "spec-derma",
    name: "Dermatology",
    slug: "dermatology",
    description: "Expert evaluation for skin rashes, acne management, allergies, and hair concerns.",
    iconName: "Sparkles",
    sampleConsultationFee: 700,
    conditions: ["Severe acne", "Eczema & psoriasis", "Fungal skin infections", "Alopecia & hair thinning", "Contact dermatitis"],
    procedures: ["Skin biopsies", "Patch testing", "Chemical exfoliation reviews", "Cryotherapy advice"],
    whenToConsult: ["Spreading itchy rashes", "Cystic acne unresponsive to OTC care", "Sudden excessive hair shedding", "Changing skin moles"],
  },
  {
    id: "spec-dentist",
    name: "Dentist",
    slug: "dentist",
    description: "Preventive dental hygiene, cavity fillings, root canals, and orthodontic advice.",
    iconName: "Smile",
    sampleConsultationFee: 500,
    conditions: ["Dental caries & cavities", "Gingivitis & bleeding gums", "Tooth sensitivity", "Impacted wisdom teeth"],
    procedures: ["Dental scaling & polishing", "Composite fillings", "Root canal therapy consults", "Crown and bridge planning"],
    whenToConsult: ["Tooth pain aggravated by temperature", "Bleeding gums during brushing", "Bad breath", "Routine 6-month checkup"],
  },
  {
    id: "spec-eye",
    name: "Eye care",
    slug: "eye-care",
    description: "Comprehensive vision testing, eye strain checks, and cataract evaluations.",
    iconName: "Eye",
    sampleConsultationFee: 550,
    conditions: ["Refractive errors (myopia/astigmatism)", "Dry eye syndrome", "Cataracts", "Glaucoma", "Allergic conjunctivitis"],
    procedures: ["Slit-lamp examination", "Intraocular pressure tonometry", "Fundus photography review", "Refraction tests"],
    whenToConsult: ["Blurry vision or eye strain", "Sudden halos around lights", "Persistent eye redness", "Diabetic eye checkups"],
  },
  {
    id: "spec-gastro",
    name: "Gastroenterology",
    slug: "gastroenterology",
    description: "Digestive health, acid reflux management, liver care, and endoscopy consultations.",
    iconName: "Activity",
    sampleConsultationFee: 900,
    conditions: ["GERD / Acid reflux", "Irritable Bowel Syndrome (IBS)", "Fatty liver disease", "Peptic ulcers", "Gallbladder stones"],
    procedures: ["Upper GI endoscopy reviews", "Colonoscopy consults", "Liver function assessment", "Dietary gut plans"],
    whenToConsult: ["Chronic heartburn", "Frequent bloating or irregular bowel habits", "Unexplained weight loss", "Jaundice"],
  },
  {
    id: "spec-nephro",
    name: "Nephrology",
    slug: "nephrology",
    description: "Kidney function evaluation, hypertension management, and renal wellness.",
    iconName: "Microscope",
    sampleConsultationFee: 1000,
    conditions: ["Chronic kidney disease", "Kidney stones", "Proteinuria", "Renal hypertension", "Urinary tract infections"],
    procedures: ["Kidney ultrasound reviews", "Glomerular filtration rate (GFR) tracking", "Electrolyte management", "Dialysis consults"],
    whenToConsult: ["Swelling in feet or around eyes", "Abnormal creatinine or blood urea", "Foamy urine", "Recurrent flank pain"],
  },
  {
    id: "spec-ent",
    name: "ENT",
    slug: "ent",
    description: "Ear, nose, throat, sinusitis, hearing assessments, and tonsil wellness.",
    iconName: "ShieldCheck",
    sampleConsultationFee: 650,
    conditions: ["Chronic sinusitis", "Allergic rhinitis", "Tinnitus & ear discharge", "Tonsillitis & hoarseness", "Deviated nasal septum"],
    procedures: ["Diagnostic nasal endoscopy", "Pure tone audiometry review", "Ear wax micro-suction", "Throat swab review"],
    whenToConsult: ["Ear pain or reduced hearing", "Blocked nose persisting weeks", "Chronic sore throat", "Voice hoarseness"],
  },
];
