export interface Location {
  city: string;
  state: string;
  localities: string[];
}

export interface StateInfo {
  id: string;
  name: string;
  code: string;
  capital: string;
  cities: string[];
  totalFacilities: number;
  hospitalCount: number;
  clinicCount: number;
  diagnosticCount: number;
  highlightSpecialties: string[];
  bannerText: string;
  emergencyHelpline: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export const statesData: StateInfo[] = [
  {
    id: "karnataka",
    name: "Karnataka",
    code: "KA",
    capital: "Bengaluru",
    cities: ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi"],
    totalFacilities: 18,
    hospitalCount: 8,
    clinicCount: 7,
    diagnosticCount: 3,
    highlightSpecialties: ["Cardiology", "Neurology", "Orthopaedics", "Oncology"],
    bannerText: "Comprehensive multi-specialty tertiary care and community healthcare across Karnataka.",
    emergencyHelpline: "+91 555 010 1081",
  },
  {
    id: "maharashtra",
    name: "Maharashtra",
    code: "MH",
    capital: "Mumbai",
    cities: ["Mumbai", "Pune", "Nagpur", "Nashik"],
    totalFacilities: 22,
    hospitalCount: 11,
    clinicCount: 8,
    diagnosticCount: 3,
    highlightSpecialties: ["Cardiac Surgery", "Gastroenterology", "Paediatrics", "Organ Transplant"],
    bannerText: "Advanced healthcare network across Western India with 24/7 critical care infrastructure.",
    emergencyHelpline: "+91 555 010 1082",
  },
  {
    id: "delhi-ncr",
    name: "Delhi NCR",
    code: "DL",
    capital: "New Delhi",
    cities: ["New Delhi", "Gurugram", "Noida", "Faridabad"],
    totalFacilities: 19,
    hospitalCount: 9,
    clinicCount: 7,
    diagnosticCount: 3,
    highlightSpecialties: ["Cardiology", "Nephrology", "Dermatology", "Emergency Medicine"],
    bannerText: "National Capital Region care centres offering super-specialty OPD and inpatient care.",
    emergencyHelpline: "+91 555 010 1083",
  },
  {
    id: "tamil-nadu",
    name: "Tamil Nadu",
    code: "TN",
    capital: "Chennai",
    cities: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli"],
    totalFacilities: 16,
    hospitalCount: 7,
    clinicCount: 6,
    diagnosticCount: 3,
    highlightSpecialties: ["Cardiovascular Science", "Eye Care", "Orthopaedics", "General Surgery"],
    bannerText: "High-trust clinical network renowned for patient outcomes and affordable surgical care.",
    emergencyHelpline: "+91 555 010 1084",
  },
  {
    id: "telangana",
    name: "Telangana",
    code: "TS",
    capital: "Hyderabad",
    cities: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"],
    totalFacilities: 14,
    hospitalCount: 6,
    clinicCount: 5,
    diagnosticCount: 3,
    highlightSpecialties: ["Neurology", "Gastroenterology", "Dental Care", "Pulmonology"],
    bannerText: "Centres of clinical excellence serving Hyderabad and neighboring districts.",
    emergencyHelpline: "+91 555 010 1085",
  },
  {
    id: "west-bengal",
    name: "West Bengal",
    code: "WB",
    capital: "Kolkata",
    cities: ["Kolkata", "Howrah", "Siliguri", "Durgapur"],
    totalFacilities: 15,
    hospitalCount: 7,
    clinicCount: 5,
    diagnosticCount: 3,
    highlightSpecialties: ["Cardiac Science", "Paediatric Surgery", "Nephrology", "Diabetes Care"],
    bannerText: "Dedicated clinical expertise serving Eastern India and neighboring regions.",
    emergencyHelpline: "+91 555 010 1086",
  },
  {
    id: "gujarat",
    name: "Gujarat",
    code: "GJ",
    capital: "Gandhinagar",
    cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
    totalFacilities: 12,
    hospitalCount: 5,
    clinicCount: 5,
    diagnosticCount: 2,
    highlightSpecialties: ["Kidney Care", "Cardiology", "Orthopaedics", "Vascular Surgery"],
    bannerText: "State-of-the-art multi-specialty hospital and daycare facilities across Gujarat.",
    emergencyHelpline: "+91 555 010 1087",
  },
  {
    id: "kerala",
    name: "Kerala",
    code: "KL",
    capital: "Thiruvananthapuram",
    cities: ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur"],
    totalFacilities: 11,
    hospitalCount: 5,
    clinicCount: 4,
    diagnosticCount: 2,
    highlightSpecialties: ["Preventive Health", "Family Medicine", "ENT", "Rehabilitation"],
    bannerText: "Holistic community health and tertiary multi-specialty care centres in Kerala.",
    emergencyHelpline: "+91 555 010 1088",
  },
];

export const locationsData: Location[] = [
  {
    city: "Bengaluru",
    state: "Karnataka",
    localities: [
      "Indiranagar",
      "Jayanagar",
      "Koramangala",
      "Whitefield",
      "Malleshwaram",
      "HSR Layout",
    ],
  },
  {
    city: "Mumbai",
    state: "Maharashtra",
    localities: [
      "Bandra West",
      "Andheri East",
      "Powai",
      "Dadar",
      "Borivali West",
      "Chembur",
    ],
  },
  {
    city: "New Delhi",
    state: "Delhi NCR",
    localities: [
      "Saket",
      "Dwarka",
      "Vasant Kunj",
      "Rohini",
      "Connaught Place",
      "Karol Bagh",
    ],
  },
  {
    city: "Chennai",
    state: "Tamil Nadu",
    localities: [
      "Adyar",
      "T. Nagar",
      "Anna Nagar",
      "Velachery",
      "Mylapore",
    ],
  },
  {
    city: "Hyderabad",
    state: "Telangana",
    localities: [
      "Banjara Hills",
      "Jubilee Hills",
      "Gachibowli",
      "Madhapur",
      "Secunderabad",
    ],
  },
  {
    city: "Kolkata",
    state: "West Bengal",
    localities: [
      "Salt Lake",
      "Ballygunge",
      "New Town",
      "Alipore",
      "Howrah",
    ],
  },
];

/**
 * Fictional reference coordinates for localities and city centers.
 * Used to calculate sample distances when GPS permission is not granted.
 */
export const localityCoordinates: Record<string, Coordinates> = {
  // Karnataka
  "Bengaluru": { latitude: 12.9716, longitude: 77.5946 },
  "Indiranagar": { latitude: 12.9784, longitude: 77.6408 },
  "Jayanagar": { latitude: 12.9308, longitude: 77.5838 },
  "Koramangala": { latitude: 12.9352, longitude: 77.6245 },
  "Whitefield": { latitude: 12.9698, longitude: 77.7500 },
  "Malleshwaram": { latitude: 13.0031, longitude: 77.5643 },
  "HSR Layout": { latitude: 12.9121, longitude: 77.6446 },
  "Mysuru": { latitude: 12.2958, longitude: 76.6394 },
  "Mangaluru": { latitude: 12.9141, longitude: 74.8560 },

  // Maharashtra
  "Mumbai": { latitude: 19.0760, longitude: 72.8777 },
  "Bandra West": { latitude: 19.0596, longitude: 72.8295 },
  "Andheri East": { latitude: 19.1136, longitude: 72.8697 },
  "Powai": { latitude: 19.1176, longitude: 72.9060 },
  "Dadar": { latitude: 19.0178, longitude: 72.8478 },
  "Borivali West": { latitude: 19.2307, longitude: 72.8567 },
  "Chembur": { latitude: 19.0522, longitude: 72.9005 },
  "Pune": { latitude: 18.5204, longitude: 73.8567 },

  // Delhi NCR
  "New Delhi": { latitude: 28.6139, longitude: 77.2090 },
  "Saket": { latitude: 28.5245, longitude: 77.2066 },
  "Dwarka": { latitude: 28.5921, longitude: 77.0460 },
  "Vasant Kunj": { latitude: 28.5298, longitude: 77.1558 },
  "Rohini": { latitude: 28.7159, longitude: 77.1128 },
  "Connaught Place": { latitude: 28.6315, longitude: 77.2167 },
  "Karol Bagh": { latitude: 28.6517, longitude: 77.1906 },
  "Gurugram": { latitude: 28.4595, longitude: 77.0266 },
  "Noida": { latitude: 28.5355, longitude: 77.3910 },

  // Tamil Nadu
  "Chennai": { latitude: 13.0827, longitude: 80.2707 },
  "Adyar": { latitude: 13.0012, longitude: 80.2565 },
  "T. Nagar": { latitude: 13.0418, longitude: 80.2341 },
  "Anna Nagar": { latitude: 13.0850, longitude: 80.2101 },

  // Telangana
  "Hyderabad": { latitude: 17.3850, longitude: 78.4867 },
  "Banjara Hills": { latitude: 17.4156, longitude: 78.4350 },
  "Hitec City": { latitude: 17.4435, longitude: 78.3772 },

  // West Bengal
  "Kolkata": { latitude: 22.5726, longitude: 88.3639 },
  "Salt Lake": { latitude: 22.5867, longitude: 88.4178 },
  "New Town": { latitude: 22.5898, longitude: 88.4744 },
};
