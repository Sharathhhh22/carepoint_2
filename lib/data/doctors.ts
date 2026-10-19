export interface Review {
  id: string;
  rating: number; // 1 to 5
  text: string;
  date: string; // ISO string
  labelledSample: true;
}

export interface VerificationItem {
  label: string;
  value: string;
  status: "sample";
}

export interface Doctor {
  id: string;
  slug: string;
  name: string;
  qualification: string;
  specialty: string;
  experienceYears: number;
  languages: string[];
  city: string;
  state?: string;
  fee: number;
  nextAvailable: string; // Labelled sample
  femaleDoctor: boolean;
  bio: string;
  facilityId: string;
  whatsIncluded: string[];
  verificationItems: VerificationItem[];
  reviews: Review[];
}

export const doctorsData: Doctor[] = [
  {
    id: "doc-01",
    slug: "dr-arvind-somayaji",
    name: "Dr. Arvind Somayaji",
    qualification: "MBBS, MD (Cardiology), FACC",
    specialty: "Cardiology",
    experienceYears: 14,
    languages: ["English", "Kannada", "Hindi"],
    city: "Bengaluru",
    fee: 1100,
    nextAvailable: "Today, 4:30 PM (Demo)",
    femaleDoctor: false,
    bio: "Dr. Arvind Somayaji is an experienced cardiologist with over 14 years of clinical practice. His focus includes preventive cardiology, hypertension regulation, and non-invasive cardiovascular evaluations. He works closely with patients on holistic lifestyle interventions to preserve heart health.",
    facilityId: "fac-blr-02",
    whatsIncluded: [
      "Comprehensive in-clinic consultation (sample)",
      "One complimentary follow-up within 7 days (sample)",
      "Blood pressure and vital monitoring review",
      "Tests and procedures are charged separately",
    ],
    verificationItems: [
      { label: "Medical Council", value: "Karnataka Medical Council (#KMC-58210)", status: "sample" },
      { label: "Primary Degree", value: "MBBS, MD (Cardiology), FACC", status: "sample" },
      { label: "Affiliation Check", value: "Banyan Crest Health Pavilion (Active)", status: "sample" },
    ],
    reviews: [
      {
        id: "rev-01-1",
        rating: 5,
        text: "Sample illustrative review: Punctual consultation and clear lifestyle advice provided during the demo visit.",
        date: "2026-09-14",
        labelledSample: true,
      },
      {
        id: "rev-01-2",
        rating: 5,
        text: "Sample illustrative review: Patiently reviewed electrocardiogram reports and answered cardiovascular queries.",
        date: "2026-08-28",
        labelledSample: true,
      },
      {
        id: "rev-01-3",
        rating: 4,
        text: "Sample illustrative review: Good discussion on preventative habits. Waiting time in clinic was about 15 minutes.",
        date: "2026-08-10",
        labelledSample: true,
      },
    ],
  },
  {
    id: "doc-02",
    slug: "dr-malini-kedarnath",
    name: "Dr. Malini Kedarnath",
    qualification: "MBBS, DGO, MS (Obstetrics & Gynaecology)",
    specialty: "Gynaecology",
    experienceYears: 12,
    languages: ["English", "Kannada", "Tamil"],
    city: "Bengaluru",
    fee: 750,
    nextAvailable: "Tomorrow, 10:00 AM (Demo)",
    femaleDoctor: true,
    bio: "Dr. Malini Kedarnath provides comprehensive women's healthcare, specializing in pre-conception counselling, maternal wellness, menstrual irregularity management, and preventive cervical screenings with empathetic guidance.",
    facilityId: "fac-blr-02",
    whatsIncluded: [
      "Detailed women's health consultation",
      "One follow-up within 7 days (sample)",
      "Dietary and lifestyle counselling",
      "Tests and procedures are charged separately",
    ],
    verificationItems: [
      { label: "Medical Council", value: "Karnataka Medical Council (#KMC-49120)", status: "sample" },
      { label: "Primary Degree", value: "MBBS, DGO, MS (OBG)", status: "sample" },
      { label: "Affiliation Check", value: "Banyan Crest Health Pavilion (Active)", status: "sample" },
    ],
    reviews: [
      {
        id: "rev-02-1",
        rating: 5,
        text: "Sample illustrative review: Thorough consultation regarding prenatal care and nutrition milestones.",
        date: "2026-09-20",
        labelledSample: true,
      },
      {
        id: "rev-02-2",
        rating: 5,
        text: "Sample illustrative review: Clear explanation of symptoms and supportive demeanour throughout.",
        date: "2026-09-02",
        labelledSample: true,
      },
      {
        id: "rev-02-3",
        rating: 4,
        text: "Sample illustrative review: Informative session on preventive health screenings for women.",
        date: "2026-07-29",
        labelledSample: true,
      },
    ],
  },
  {
    id: "doc-03",
    slug: "dr-rohith-vembar",
    name: "Dr. Rohith Vembar",
    qualification: "MBBS, MD (General Medicine)",
    specialty: "General physician",
    experienceYears: 9,
    languages: ["English", "Kannada", "Hindi"],
    city: "Bengaluru",
    fee: 400,
    nextAvailable: "Today, 5:15 PM (Demo)",
    femaleDoctor: false,
    bio: "Dr. Rohith Vembar is a primary care physician experienced in adult disease management, seasonal fevers, viral infections, and metabolic syndrome monitoring. He advocates for evidence-based medication and early diagnosis.",
    facilityId: "fac-blr-01",
    whatsIncluded: [
      "General OPD consultation",
      "One follow-up within 7 days (sample)",
      "Prescription and basic vitals review",
      "Tests and procedures are charged separately",
    ],
    verificationItems: [
      { label: "Medical Council", value: "Karnataka Medical Council (#KMC-61044)", status: "sample" },
      { label: "Primary Degree", value: "MBBS, MD (General Medicine)", status: "sample" },
      { label: "Affiliation Check", value: "Mayura Valley Community Clinic (Active)", status: "sample" },
    ],
    reviews: [
      {
        id: "rev-03-1",
        rating: 5,
        text: "Sample illustrative review: Quick diagnosis for seasonal viral fever with sensible medication advice.",
        date: "2026-09-24",
        labelledSample: true,
      },
      {
        id: "rev-03-2",
        rating: 4,
        text: "Sample illustrative review: Attentive primary care physician. Explained laboratory blood counts clearly.",
        date: "2026-08-30",
        labelledSample: true,
      },
      {
        id: "rev-03-3",
        rating: 5,
        text: "Sample illustrative review: Empathetic listener and very reasonable consultation charges.",
        date: "2026-08-11",
        labelledSample: true,
      },
    ],
  },
  {
    id: "doc-04",
    slug: "dr-ananya-bhuvanesh",
    name: "Dr. Ananya Bhuvanesh",
    qualification: "MBBS, DCH, DNB (Paediatrics)",
    specialty: "Paediatrics",
    experienceYears: 8,
    languages: ["English", "Kannada", "Telugu"],
    city: "Bengaluru",
    fee: 600,
    nextAvailable: "Tomorrow, 11:30 AM (Demo)",
    femaleDoctor: true,
    bio: "Dr. Ananya Bhuvanesh is dedicated to newborn and adolescent paediatric care. Her clinical background covers routine developmental milestones, paediatric nutrition, childhood immunization, and acute infectious illnesses.",
    facilityId: "fac-blr-01",
    whatsIncluded: [
      "Child developmental and growth check",
      "One follow-up within 7 days (sample)",
      "Immunization chart review",
      "Tests and procedures are charged separately",
    ],
    verificationItems: [
      { label: "Medical Council", value: "Karnataka Medical Council (#KMC-73891)", status: "sample" },
      { label: "Primary Degree", value: "MBBS, DCH, DNB (Paediatrics)", status: "sample" },
      { label: "Affiliation Check", value: "Mayura Valley Community Clinic (Active)", status: "sample" },
    ],
    reviews: [
      {
        id: "rev-04-1",
        rating: 5,
        text: "Sample illustrative review: Friendly and patient with young children during routine vaccine visits.",
        date: "2026-09-22",
        labelledSample: true,
      },
      {
        id: "rev-04-2",
        rating: 5,
        text: "Sample illustrative review: Helpful dietary tips provided for managing toddler nutrition.",
        date: "2026-09-05",
        labelledSample: true,
      },
      {
        id: "rev-04-3",
        rating: 4,
        text: "Sample illustrative review: Gentle approach to child examination. Clean clinic environment.",
        date: "2026-08-14",
        labelledSample: true,
      },
    ],
  },
  {
    id: "doc-05",
    slug: "dr-farhan-chinoy",
    name: "Dr. Farhan Chinoy",
    qualification: "MBBS, MS (Orthopaedics), MCh",
    specialty: "Orthopaedics",
    experienceYears: 15,
    languages: ["English", "Hindi", "Marathi"],
    city: "Mumbai",
    fee: 1200,
    nextAvailable: "Today, 6:00 PM (Demo)",
    femaleDoctor: false,
    bio: "Dr. Farhan Chinoy is a senior orthopaedic specialist with deep expertise in managing joint degeneration, sports ligament strains, and degenerative disc discomfort. He emphasizes conservative physiotherapy-first regimens.",
    facilityId: "fac-mum-01",
    whatsIncluded: [
      "Orthopaedic mobility and spine assessment",
      "One follow-up within 7 days (sample)",
      "Ergonomic and exercise recommendations",
      "Tests and procedures are charged separately",
    ],
    verificationItems: [
      { label: "Medical Council", value: "Maharashtra Medical Council (#MMC-38102)", status: "sample" },
      { label: "Primary Degree", value: "MBBS, MS (Ortho), MCh", status: "sample" },
      { label: "Affiliation Check", value: "Tarangini Coast Medical Centre (Active)", status: "sample" },
    ],
    reviews: [
      {
        id: "rev-05-1",
        rating: 5,
        text: "Sample illustrative review: Clear guidance on managing knee strain without rushing to surgery.",
        date: "2026-09-18",
        labelledSample: true,
      },
      {
        id: "rev-05-2",
        rating: 5,
        text: "Sample illustrative review: Prescribed targeted physical therapy that eased lower back discomfort.",
        date: "2026-08-25",
        labelledSample: true,
      },
      {
        id: "rev-05-3",
        rating: 4,
        text: "Sample illustrative review: Professional examination and lucid review of spinal MRI films.",
        date: "2026-08-02",
        labelledSample: true,
      },
    ],
  },
  {
    id: "doc-06",
    slug: "dr-ketaki-chitnis",
    name: "Dr. Ketaki Chitnis",
    qualification: "MBBS, MD (Dermatology, Venereology & Leprosy)",
    specialty: "Dermatology",
    experienceYears: 10,
    languages: ["English", "Marathi", "Hindi"],
    city: "Mumbai",
    fee: 700,
    nextAvailable: "Tomorrow, 03:00 PM (Demo)",
    femaleDoctor: true,
    bio: "Dr. Ketaki Chitnis is a clinical dermatologist specializing in chronic eczema, acne vulgaris, hair fall evaluation, and allergic dermatitis. She provides structured care plans focused on skin barrier recovery.",
    facilityId: "fac-mum-01",
    whatsIncluded: [
      "Clinical dermatological examination",
      "One follow-up within 7 days (sample)",
      "Skincare regimen guidance",
      "Tests and procedures are charged separately",
    ],
    verificationItems: [
      { label: "Medical Council", value: "Maharashtra Medical Council (#MMC-45980)", status: "sample" },
      { label: "Primary Degree", value: "MBBS, MD (Dermatology)", status: "sample" },
      { label: "Affiliation Check", value: "Tarangini Coast Medical Centre (Active)", status: "sample" },
    ],
    reviews: [
      {
        id: "rev-06-1",
        rating: 5,
        text: "Sample illustrative review: Prescribed a non-irritating topical regimen that stabilized persistent dermatitis.",
        date: "2026-09-19",
        labelledSample: true,
      },
      {
        id: "rev-06-2",
        rating: 4,
        text: "Sample illustrative review: Methodical explanation of scalp allergies and triggers to avoid.",
        date: "2026-09-01",
        labelledSample: true,
      },
      {
        id: "rev-06-3",
        rating: 5,
        text: "Sample illustrative review: Friendly clinician who avoided prescribing unnecessary cosmetic products.",
        date: "2026-07-20",
        labelledSample: true,
      },
    ],
  },
  {
    id: "doc-07",
    slug: "dr-jayant-keluskar",
    name: "Dr. Jayant Keluskar",
    qualification: "MBBS, DNB (Family Medicine)",
    specialty: "General physician",
    experienceYears: 11,
    languages: ["English", "Marathi", "Hindi"],
    city: "Mumbai",
    fee: 450,
    nextAvailable: "Today, 3:45 PM (Demo)",
    femaleDoctor: false,
    bio: "Dr. Jayant Keluskar is a dedicated family physician with 11 years of experience in managing day-to-day ailments, senior citizen healthcare, and preventive annual health audits.",
    facilityId: "fac-mum-02",
    whatsIncluded: [
      "Family medicine consultation",
      "One follow-up within 7 days (sample)",
      "Chronic condition review (hypertension/sugar)",
      "Tests and procedures are charged separately",
    ],
    verificationItems: [
      { label: "Medical Council", value: "Maharashtra Medical Council (#MMC-50211)", status: "sample" },
      { label: "Primary Degree", value: "MBBS, DNB (Family Medicine)", status: "sample" },
      { label: "Affiliation Check", value: "Khandagiri Daycare Polyclinic (Active)", status: "sample" },
    ],
    reviews: [
      {
        id: "rev-07-1",
        rating: 5,
        text: "Sample illustrative review: Kind doctor who took time to review my elderly father's medication chart.",
        date: "2026-09-15",
        labelledSample: true,
      },
      {
        id: "rev-07-2",
        rating: 5,
        text: "Sample illustrative review: Pragmatic advice on managing seasonal colds without antibiotics.",
        date: "2026-08-20",
        labelledSample: true,
      },
      {
        id: "rev-07-3",
        rating: 4,
        text: "Sample illustrative review: Reliable neighborhood doctor with reasonable consultation fees.",
        date: "2026-08-01",
        labelledSample: true,
      },
    ],
  },
  {
    id: "doc-08",
    slug: "dr-chirayu-nandavanam",
    name: "Dr. Chirayu Nandavanam",
    qualification: "MBBS, MD (General Medicine), DM (Cardiology)",
    specialty: "Cardiology",
    experienceYears: 16,
    languages: ["English", "Hindi", "Punjabi"],
    city: "New Delhi",
    fee: 950,
    nextAvailable: "Tomorrow, 09:30 AM (Demo)",
    femaleDoctor: false,
    bio: "Dr. Chirayu Nandavanam is an acclaimed cardiologist with over 16 years of experience evaluating coronary risk factors, chest pain triage, arrhythmia reviews, and post-angioplasty rehabilitation.",
    facilityId: "fac-del-01",
    whatsIncluded: [
      "Super-specialist cardiology consultation",
      "One follow-up within 7 days (sample)",
      "Cardiac risk profiling and lifestyle guidance",
      "Tests and procedures are charged separately",
    ],
    verificationItems: [
      { label: "Medical Council", value: "Delhi Medical Council (#DMC-32914)", status: "sample" },
      { label: "Primary Degree", value: "MBBS, MD, DM (Cardiology)", status: "sample" },
      { label: "Affiliation Check", value: "Aarohanam Care Hospital (Active)", status: "sample" },
    ],
    reviews: [
      {
        id: "rev-08-1",
        rating: 5,
        text: "Sample illustrative review: Reassuring consultation following an abnormal treadmill test report.",
        date: "2026-09-12",
        labelledSample: true,
      },
      {
        id: "rev-08-2",
        rating: 5,
        text: "Sample illustrative review: Thorough assessment of blood pressure control and lipid targets.",
        date: "2026-08-19",
        labelledSample: true,
      },
      {
        id: "rev-08-3",
        rating: 4,
        text: "Sample illustrative review: Experienced cardiologist. Hospital reception was somewhat busy.",
        date: "2026-07-30",
        labelledSample: true,
      },
    ],
  },
  {
    id: "doc-09",
    slug: "dr-harleen-chhabra",
    name: "Dr. Harleen Chhabra",
    qualification: "BDS, MDS (Conservative Dentistry & Endodontics)",
    specialty: "Dentist",
    experienceYears: 7,
    languages: ["English", "Hindi", "Punjabi"],
    city: "New Delhi",
    fee: 480,
    nextAvailable: "Today, 02:00 PM (Demo)",
    femaleDoctor: true,
    bio: "Dr. Harleen Chhabra is a gentle dental surgeon specializing in minimally invasive restorative dentistry, endodontic treatments, and preventive enamel hygiene.",
    facilityId: "fac-del-02",
    whatsIncluded: [
      "Dental oral checkup and charting",
      "One follow-up within 7 days (sample)",
      "Oral hygiene and flossing guidance",
      "Tests and procedures are charged separately",
    ],
    verificationItems: [
      { label: "Medical Council", value: "Delhi Dental Council (#DDC-11492)", status: "sample" },
      { label: "Primary Degree", value: "BDS, MDS (Endodontics)", status: "sample" },
      { label: "Affiliation Check", value: "Aravalli Horizon Medical Centre (Active)", status: "sample" },
    ],
    reviews: [
      {
        id: "rev-09-1",
        rating: 5,
        text: "Sample illustrative review: Gentle dental checkup and clear explanation of tooth sensitivity remedies.",
        date: "2026-09-25",
        labelledSample: true,
      },
      {
        id: "rev-09-2",
        rating: 4,
        text: "Sample illustrative review: Modern dental clinic setup and meticulous hygiene precautions.",
        date: "2026-09-08",
        labelledSample: true,
      },
      {
        id: "rev-09-3",
        rating: 5,
        text: "Sample illustrative review: Painless dental restoration. Very kind attitude towards anxious patients.",
        date: "2026-08-16",
        labelledSample: true,
      },
    ],
  },
  {
    id: "doc-10",
    slug: "dr-devashree-upadhyay",
    name: "Dr. Devashree Upadhyay",
    qualification: "MBBS, MS (Ophthalmology), DNB",
    specialty: "Eye care",
    experienceYears: 13,
    languages: ["English", "Hindi"],
    city: "New Delhi",
    fee: 650,
    nextAvailable: "Tomorrow, 04:00 PM (Demo)",
    femaleDoctor: true,
    bio: "Dr. Devashree Upadhyay is a skilled ophthalmologist offering comprehensive vision assessments, computer vision syndrome management, intraocular pressure checks, and cataract advice.",
    facilityId: "fac-del-03",
    whatsIncluded: [
      "Complete ophthalmic slit-lamp and vision exam",
      "One follow-up within 7 days (sample)",
      "Screen fatigue and eye lubricating advice",
      "Tests and procedures are charged separately",
    ],
    verificationItems: [
      { label: "Medical Council", value: "Delhi Medical Council (#DMC-40192)", status: "sample" },
      { label: "Primary Degree", value: "MBBS, MS (Ophthalmology), DNB", status: "sample" },
      { label: "Affiliation Check", value: "Prabhat Kiran Diagnostic Centre (Active)", status: "sample" },
    ],
    reviews: [
      {
        id: "rev-10-1",
        rating: 5,
        text: "Sample illustrative review: Accurate refraction check and helpful tips for reducing screen glare.",
        date: "2026-09-16",
        labelledSample: true,
      },
      {
        id: "rev-10-2",
        rating: 5,
        text: "Sample illustrative review: Detailed examination of intraocular pressure and retinal health.",
        date: "2026-08-27",
        labelledSample: true,
      },
      {
        id: "rev-10-3",
        rating: 4,
        text: "Sample illustrative review: Patient ophthalmologist who explained lens prescription changes clearly.",
        date: "2026-07-28",
        labelledSample: true,
      },
    ],
  },
];
