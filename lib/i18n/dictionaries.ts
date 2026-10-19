export type SupportedLocale = "en" | "hi" | "kn" | "ta" | "te";

export interface LocaleDefinition {
  code: SupportedLocale;
  label: string;
  nativeName: string;
}

export const supportedLocales: LocaleDefinition[] = [
  { code: "en", label: "English", nativeName: "English" },
  { code: "hi", label: "Hindi", nativeName: "हिन्दी" },
  { code: "kn", label: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "ta", label: "Tamil", nativeName: "தமிழ்" },
  { code: "te", label: "Telugu", nativeName: "తెలుగు" },
];

export interface DictionaryStrings {
  nav: {
    findDoctors: string;
    clinics: string;
    labTests: string;
    services: string;
    loginDemo: string;
    skipLink: string;
  };
  hero: {
    headline: string;
    subtext: string;
    searchPlaceholder: string;
    selectCity: string;
    selectLocality: string;
    findCareBtn: string;
    clearSearch: string;
    noMatches: string;
    noMatchesHint: string;
    useLocation: string;
  };
  sections: {
    specialitiesEyebrow: string;
    specialitiesTitle: string;
    specialitiesIntro: string;
    clinicsEyebrow: string;
    clinicsTitle: string;
    clinicsIntro: string;
    doctorsEyebrow: string;
    doctorsTitle: string;
    doctorsIntro: string;
    servicesEyebrow: string;
    servicesTitle: string;
    servicesIntro: string;
    familyEyebrow: string;
    familyTitle: string;
    familyIntro: string;
    faqEyebrow: string;
    faqTitle: string;
    faqIntro: string;
  };
  common: {
    bookDemo: string;
    viewProfile: string;
    sampleVerification: string;
    sampleData: string;
    directions: string;
    feeNotListed: string;
    consultationFee: string;
    femaleDoctorToggle: string;
    femaleDoctorBadge: string;
    languageFilter: string;
    allLanguages: string;
    budgetFilterTitle: string;
    budgetAny: string;
    budgetUnder500: string;
    budget500To1000: string;
    budgetAbove1000: string;
    hiddenFacilitiesNotice: string;
    emergencyCallout: string;
    demoDisclaimer: string;
    machineTranslationDemo: string;
    sortBy: string;
    sortFeeAsc: string;
    sortFeeDesc: string;
    sortNearest: string;
    sortDefault: string;
  };
}

export const dictionaries: Record<SupportedLocale, DictionaryStrings> = {
  en: {
    nav: {
      findDoctors: "Find Doctors",
      clinics: "Clinics & Hospitals",
      labTests: "Lab Tests",
      services: "Health Services",
      loginDemo: "Sign in (DEMO)",
      skipLink: "Skip to main content",
    },
    hero: {
      headline: "Healthcare, closer to home.",
      subtext: "Search by doctor, speciality, clinic, hospital, or locality.",
      searchPlaceholder: "Doctor, speciality, clinic, hospital, or locality",
      selectCity: "Select city",
      selectLocality: "Select locality",
      findCareBtn: "Find Care",
      clearSearch: "Clear search",
      noMatches: "No matches. Try another speciality or locality.",
      noMatchesHint: "Reset your search query or location to explore all clinics and doctors.",
      useLocation: "Use my location",
    },
    sections: {
      specialitiesEyebrow: "Specialized Clinical Disciplines",
      specialitiesTitle: "Consult by Medical Speciality",
      specialitiesIntro: "Explore trusted medical fields with verified clinicians and transparent sample fees.",
      clinicsEyebrow: "Local Healthcare Infrastructure",
      clinicsTitle: "Clinics & Hospitals Near You",
      clinicsIntro: "Verified community clinics, tertiary hospitals, and diagnostic centres in your neighborhood.",
      doctorsEyebrow: "Experienced Healthcare Practitioners",
      doctorsTitle: "Find Your Doctor",
      doctorsIntro: "Discover qualified physicians with clear language proficiencies, fees in ₹, and sample availability.",
      servicesEyebrow: "Practical Care Pathways",
      servicesTitle: "Transparent Health Services",
      servicesIntro: "Upfront pricing schedules, doorstep diagnostic tests, and public health scheme information.",
      familyEyebrow: "Holistic Health for Every Generation",
      familyTitle: "Family Healthcare Guidance",
      familyIntro: "Preventive recommendations and tailored specialities for yourself, aging parents, children, and spouse.",
      faqEyebrow: "Common Questions & Information",
      faqTitle: "Frequently Asked Questions",
      faqIntro: "Clear guidance on fees, insurance coverage (demo), family appointments, and emergency protocols.",
    },
    common: {
      bookDemo: "Book (DEMO)",
      viewProfile: "View profile",
      sampleVerification: "Sample verification",
      sampleData: "Sample data",
      directions: "Get directions",
      feeNotListed: "Fee not listed",
      consultationFee: "Consultation Fee",
      femaleDoctorToggle: "Female doctor only",
      femaleDoctorBadge: "Female doctor on request",
      languageFilter: "Filter by language",
      allLanguages: "All languages",
      budgetFilterTitle: "Budget (Consultation Fee)",
      budgetAny: "Any budget",
      budgetUnder500: "Under ₹500",
      budget500To1000: "₹500 to ₹1,00,000",
      budgetAbove1000: "Above ₹1,000",
      hiddenFacilitiesNotice: "facility with no listed fee is hidden",
      emergencyCallout: "For emergencies, call 112 immediately or go to the nearest emergency department.",
      demoDisclaimer: "Demonstration website. All clinicians, patients, and content are fictional.",
      machineTranslationDemo: "Machine-assisted translation (demo)",
      sortBy: "Sort by",
      sortDefault: "Recommended",
      sortFeeAsc: "Fee: low to high",
      sortFeeDesc: "Fee: high to low",
      sortNearest: "Nearest first",
    },
  },
  hi: {
    nav: {
      findDoctors: "डॉक्टर खोजें",
      clinics: "क्लीनिक और अस्पताल",
      labTests: "लैब टेस्ट",
      services: "स्वास्थ्य सेवाएं",
      loginDemo: "साइन इन (डेमो)",
      skipLink: "मुख्य सामग्री पर जाएं",
    },
    hero: {
      headline: "स्वास्थ्य सेवा, आपके घर के करीब।",
      subtext: "डॉक्टर, विशेषता, क्लीनिक, अस्पताल या क्षेत्र के अनुसार खोजें।",
      searchPlaceholder: "डॉक्टर, विशेषता, क्लीनिक, अस्पताल या क्षेत्र",
      selectCity: "शहर चुनें",
      selectLocality: "क्षेत्र चुनें",
      findCareBtn: "देखभाल खोजें",
      clearSearch: "खोज साफ़ करें",
      noMatches: "कोई परिणाम नहीं मिला। कृपया अन्य विशेषता या क्षेत्र आज़माएं।",
      noMatchesHint: "सभी क्लीनिक और डॉक्टर देखने के लिए अपनी खोज को रीसेट करें।",
      useLocation: "मेरी लोकेशन का उपयोग करें",
    },
    sections: {
      specialitiesEyebrow: "विशेषज्ञ चिकित्सा विभाग",
      specialitiesTitle: "विशेषता के अनुसार परामर्श लें",
      specialitiesIntro: "अनुभवी चिकित्सकों और पारदर्शी नमूना शुल्क के साथ विश्वसनीय चिकित्सा क्षेत्र।",
      clinicsEyebrow: "स्थानीय स्वास्थ्य केंद्र",
      clinicsTitle: "आपके निकट क्लीनिक और अस्पताल",
      clinicsIntro: "आपके पड़ोस में सत्यापित सामुदायिक क्लीनिक, अस्पताल और जांच केंद्र।",
      doctorsEyebrow: "अनुभवी चिकित्सक",
      doctorsTitle: "अपने डॉक्टर को खोजें",
      doctorsIntro: "स्पष्ट भाषा ज्ञान, ₹ में शुल्क और नमूना उपलब्धता वाले योग्य डॉक्टर देखें।",
      servicesEyebrow: "व्यावहारिक सेवाएं",
      servicesTitle: "पारदर्शी स्वास्थ्य सेवाएं",
      servicesIntro: "पारदर्शी मूल्य सूची, नैदानिक परीक्षण और सरकारी स्वास्थ्य योजनाओं की जानकारी।",
      familyEyebrow: "पूरे परिवार का स्वास्थ्य",
      familyTitle: "पारिवारिक स्वास्थ्य मार्गदर्शन",
      familyIntro: "स्वयं, बुजुर्ग माता-पिता, बच्चों और जीवनसाथी के लिए निवारक सुझाव।",
      faqEyebrow: "सामान्य प्रश्न",
      faqTitle: "अक्सर पूछे जाने वाले प्रश्न",
      faqIntro: "शुल्क, कैशलेस बीमा (डेमो), पारिवारिक अपॉइंटमेंट और आपातकालीन मार्गदर्शन।",
    },
    common: {
      bookDemo: "बुक करें (डेमो)",
      viewProfile: "प्रोफ़ाइल देखें",
      sampleVerification: "नमूना सत्यापन",
      sampleData: "नमूना डेटा",
      directions: "दिशा-निर्देश",
      feeNotListed: "शुल्क सूचीबद्ध नहीं",
      consultationFee: "परामर्श शुल्क",
      femaleDoctorToggle: "केवल महिला डॉक्टर",
      femaleDoctorBadge: "अनुरोध पर महिला डॉक्टर",
      languageFilter: "भाषा द्वारा फ़िल्टर करें",
      allLanguages: "सभी भाषाएं",
      budgetFilterTitle: "बजट (परामर्श शुल्क)",
      budgetAny: "कोई भी बजट",
      budgetUnder500: "₹500 से कम",
      budget500To1000: "₹500 से ₹1,000",
      budgetAbove1000: "₹1,000 से अधिक",
      hiddenFacilitiesNotice: "असूचीबद्ध शुल्क वाले केंद्र छिपाए गए हैं",
      emergencyCallout: "आपात स्थिति के लिए तुरंत 112 पर कॉल करें या नजदीकी आपातकालीन विभाग में जाएं।",
      demoDisclaimer: "प्रदर्शन वेबसाइट। सभी चिकित्सक, रोगी और सामग्री काल्पनिक हैं।",
      machineTranslationDemo: "मशीनी अनुवाद (डेमो)",
      sortBy: "क्रमबद्ध करें",
      sortDefault: "अनुशंसित",
      sortFeeAsc: "शुल्क: कम से अधिक",
      sortFeeDesc: "शुल्क: अधिक से कम",
      sortNearest: "समीपस्थ पहले",
    },
  },
  kn: {
    nav: {
      findDoctors: "ವೈದ್ಯರನ್ನು ಹುಡುಕಿ",
      clinics: "ಕ್ಲಿನಿಕ್‌ಗಳು ಮತ್ತು ಆಸ್ಪತ್ರೆಗಳು",
      labTests: "ಲ್ಯಾಬ್ ಪರೀಕ್ಷೆಗಳು",
      services: "ಆರೋಗ್ಯ ಸೇವೆಗಳು",
      loginDemo: "ಸೈನ್ ಇನ್ (ಡೆಮೊ)",
      skipLink: "ಮುಖ್ಯ ವಿಷಯಕ್ಕೆ ತೆರಳಿ",
    },
    hero: {
      headline: "ಆರೋಗ್ಯ ರಕ್ಷಣೆ, ನಿಮ್ಮ ಮನೆಗೆ ಹತ್ತಿರ.",
      subtext: "ವೈದ್ಯರು, ತಜ್ಞತೆ, ಕ್ಲಿನಿಕ್, ಆಸ್ಪತ್ರೆ ಅಥವಾ ಬಡಾವಣೆ ಮೂಲಕ ಹುಡುಕಿ.",
      searchPlaceholder: "ವೈದ್ಯರು, ತಜ್ಞತೆ, ಕ್ಲಿನಿಕ್, ಆಸ್ಪತ್ರೆ ಅಥವಾ ಬಡಾವಣೆ",
      selectCity: "ನಗರವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
      selectLocality: "ಬಡಾವಣೆ ಆಯ್ಕೆಮಾಡಿ",
      findCareBtn: "ಆರೈಕೆ ಹುಡುಕಿ",
      clearSearch: "ಹುಡುಕಾಟ ತೆರವುಗೊಳಿಸಿ",
      noMatches: "ಯಾವುದೇ ಫಲಿತಾಂಶಗಳಿಲ್ಲ. ಬೇರೆ ತಜ್ಞತೆ ಅಥವಾ ಬಡಾವಣೆ ಪ್ರಯತ್ನಿಸಿ.",
      noMatchesHint: "ಎಲ್ಲಾ ಆಸ್ಪತ್ರೆಗಳನ್ನು ನೋಡಲು ನಿಮ್ಮ ಹುಡುಕಾಟವನ್ನು ಮರುಹೊಂದಿಸಿ.",
      useLocation: "ನನ್ನ ಸ್ಥಳ ಬಳಸಿ",
    },
    sections: {
      specialitiesEyebrow: "ವೈದ್ಯಕೀಯ ವಿಶೇಷತೆಗಳು",
      specialitiesTitle: "ತಜ್ಞತೆಯ ಆಧಾರದ ಮೇಲೆ ಸಮಾಲೋಚಿಸಿ",
      specialitiesIntro: "ಪಾರದರ್ಶಕ ಮಾದರಿ ಶುಲ್ಕಗಳೊಂದಿಗೆ ಪರಿಣಿತ ವೈದ್ಯಕೀಯ ವಿಭಾಗಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.",
      clinicsEyebrow: "ಸ್ಥಳೀಯ ಆರೋಗ್ಯ ಕೇಂದ್ರಗಳು",
      clinicsTitle: "ನಿಮ್ಮ ಸಮೀಪದ ಕ್ಲಿನಿಕ್‌ಗಳು ಮತ್ತು ಆಸ್ಪತ್ರೆಗಳು",
      clinicsIntro: "ನಿಮ್ಮ ಬಡಾವಣೆಯಲ್ಲಿರುವ ಪರಿಶೀಲಿಸಿದ ಸಮುದಾಯ ಕ್ಲಿನಿಕ್‌ಗಳು ಮತ್ತು ಆಸ್ಪತ್ರೆಗಳು.",
      doctorsEyebrow: "ಅನುಭವಿ ವೈದ್ಯರು",
      doctorsTitle: "ನಿಮ್ಮ ವೈದ್ಯರನ್ನು ಹುಡುಕಿ",
      doctorsIntro: "ಸ್ಪಷ್ಟ ಭಾಷಾ ಪ್ರಾವೀಣ್ಯತೆ, ₹ ನಲ್ಲಿ ಶುಲ್ಕ ಮತ್ತು ಮಾದರಿ ಲಭ್ಯತೆಯೊಂದಿಗೆ ವೈದ್ಯರನ್ನು ಕಂಡುಕೊಳ್ಳಿ.",
      servicesEyebrow: "ಆರೋಗ್ಯ ಸೇವೆಗಳು",
      servicesTitle: "ಪಾರದರ್ಶಕ ಆರೋಗ್ಯ ಸೇವೆಗಳು",
      servicesIntro: "ನಿಖರ ಶುಲ್ಕ ಪಟ್ಟಿ, ಲ್ಯಾಬ್ ಪರೀಕ್ಷೆಗಳು ಮತ್ತು ಸಾರ್ವಜನಿಕ ಆರೋಗ್ಯ ಯೋಜನೆಗಳ ವಿವರ.",
      familyEyebrow: "ಸಂಪೂರ್ಣ ಕುಟುಂಬದ ಕ್ಷೇಮ",
      familyTitle: "ಕುಟುಂಬ ಆರೋಗ್ಯ ಮಾರ್ಗದರ್ಶನ",
      familyIntro: "ನಿಮಗಾಗಿ, ಪೋಷಕರಿಗೆ, ಮಕ್ಕಳಿಗೆ ಮತ್ತು ಸಂಗಾತಿಗೆ ಪೂರ್ವಭಾವಿ ಆರೋಗ್ಯ ಸಲಹೆಗಳು.",
      faqEyebrow: "ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳು",
      faqTitle: "ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು",
      faqIntro: "ಶುಲ್ಕಗಳು, ನಗದು ರಹಿತ ವಿಮೆ (ಡೆಮೊ) ಮತ್ತು ತುರ್ತು ಪರಿಸ್ಥಿತಿಯ ಮಾಹಿತಿ.",
    },
    common: {
      bookDemo: "ಬುಕ್ ಮಾಡಿ (ಡೆಮೊ)",
      viewProfile: "ವಿವರ ನೋಡಿ",
      sampleVerification: "ಮಾದರಿ ಪರಿಶೀಲನೆ",
      sampleData: "ಮಾದರಿ ಮಾಹಿತಿ",
      directions: "ಮಾರ್ಗಸೂಚಿ",
      feeNotListed: "ಶುಲ್ಕ ನಮೂದಿಸಿಲ್ಲ",
      consultationFee: "ಸಮಾಲೋಚನಾ ಶುಲ್ಕ",
      femaleDoctorToggle: "ಮಹಿಳಾ ವೈದ್ಯರು ಮಾತ್ರ",
      femaleDoctorBadge: "ಕೋರಿಕೆಯ ಮೇರೆಗೆ ಮಹಿಳಾ ವೈದ್ಯರು",
      languageFilter: "ಭಾಷೆಯ ಪ್ರಕಾರ ಫಿಲ್ಟರ್ ಮಾಡಿ",
      allLanguages: "ಎಲ್ಲಾ ಭಾಷೆಗಳು",
      budgetFilterTitle: "ಬಜೆಟ್ (ಸಮಾಲೋಚನಾ ಶುಲ್ಕ)",
      budgetAny: "ಯಾವುದೇ ಬಜೆಟ್",
      budgetUnder500: "₹500 ಕ್ಕಿಂತ ಕಡಿಮೆ",
      budget500To1000: "₹500 ರಿಂದ ₹1,000",
      budgetAbove1000: "₹1,000 ಕ್ಕಿಂತ ಹೆಚ್ಚು",
      hiddenFacilitiesNotice: "ಶುಲ್ಕ ನಮೂದಿಸದ ಕೇಂದ್ರಗಳನ್ನು ಮರೆಮಾಡಲಾಗಿದೆ",
      emergencyCallout: "ತುರ್ತು ಪರಿಸ್ಥಿತಿಗಾಗಿ ತಕ್ಷಣವೇ 112 ಗೆ ಕರೆ ಮಾಡಿ ಅಥವಾ ಸಮೀಪದ ಆಸ್ಪತ್ರೆಗೆ ಭೇಟಿ ನೀಡಿ.",
      demoDisclaimer: "ಪ್ರಾತ್ಯಕ್ಷಿಕೆ ವೆಬ್‌ಸೈಟ್. ಎಲ್ಲಾ ವೈದ್ಯರು, ರೋಗಿಗಳು ಮತ್ತು ವಿಷಯಗಳು ಕಾಲ್ಪನಿಕವಾಗಿವೆ.",
      machineTranslationDemo: "ಯಂತ್ರ ಸಹಾಯಿತ ಅನುವಾದ (ಡೆಮೊ)",
      sortBy: "ವಿಂಗಡಣೆ",
      sortDefault: "ಶಿಫಾರಸು ಮಾಡಿದ",
      sortFeeAsc: "ಶುಲ್ಕ: ಕಡಿಮೆಯಿಂದ ಹೆಚ್ಚು",
      sortFeeDesc: "ಶುಲ್ಕ: ಹೆಚ್ಚಿನಿಂದ ಕಡಿಮೆ",
      sortNearest: "ಹತ್ತಿರದ ಮೊದಲನೆಯದು",
    },
  },
  ta: {
    nav: {
      findDoctors: "மருத்துவர்களைக் கண்டறியவும்",
      clinics: "கிளினிக்குகள் & மருத்துவமனைகள்",
      labTests: "ஆய்வக சோதனைகள்",
      services: "சுகாதார சேவைகள்",
      loginDemo: "உள்நுழைக (டெமோ)",
      skipLink: "முக்கிய பகுதிக்கு செல்லவும்",
    },
    hero: {
      headline: "சுகாதாரம், உங்கள் இல்லத்திற்கு அருகில்.",
      subtext: "மருத்துவர், சிறப்புத் துறை, கிளினிக், மருத்துவமனை அல்லது பகுதி வாரியாகத் தேடுங்கள்.",
      searchPlaceholder: "மருத்துவர், சிறப்புத் துறை, கிளினிக், மருத்துவமனை அல்லது பகுதி",
      selectCity: "நகரத்தைத் தேர்ந்தெடுக்கவும்",
      selectLocality: "பகுதியைத் தேர்ந்தெடுக்கவும்",
      findCareBtn: "சிகிச்சையைத் தேடுங்கள்",
      clearSearch: "தேடலை அழிக்கவும்",
      noMatches: "பொருத்தமான முடிவுகள் இல்லை. வேறு துறை அல்லது பகுதியை முயற்சிக்கவும்.",
      noMatchesHint: "அனைத்து மருத்துவமனைகளையும் காண உங்கள் தேடலை மீட்டமைக்கவும்.",
      useLocation: "எனது இருப்பிடத்தைப் பயன்படுத்து",
    },
    sections: {
      specialitiesEyebrow: "சிறப்பு மருத்துவத் துறைகள்",
      specialitiesTitle: "மருத்துவ சிறப்புப் பிரிவின் கீழ் ஆலோசனை",
      specialitiesIntro: "வெளிப்படையான மாதிரி கட்டணங்களுடன் நம்பகமான மருத்துவ நிபுணர்களைக் கண்டறியவும்.",
      clinicsEyebrow: "உள்ளூர் சுகாதார மையங்கள்",
      clinicsTitle: "உங்கள் அருகிலுள்ள கிளினிக்குகள் & மருத்துவமனைகள்",
      clinicsIntro: "உங்கள் பகுதியில் சரிபார்க்கப்பட்ட சமூக கிளினிக்குகள் மற்றும் மருத்துவமனைகள்.",
      doctorsEyebrow: "அனுபவம் வாய்ந்த மருத்துவர்கள்",
      doctorsTitle: "உங்கள் மருத்துவரைத் தேர்வு செய்யுங்கள்",
      doctorsIntro: "தெளிவான மொழிப் புலமை, ₹ கட்டணம் மற்றும் மாதிரி கிடைக்கும் நேரத்துடன் கூடிய மருத்துவர்கள்.",
      servicesEyebrow: "பயனுள்ள சுகாதார சேவைகள்",
      servicesTitle: "வெளிப்படையான சுகாதார சேவைகள்",
      servicesIntro: "நேரடி கட்டண அட்டவணை, ஆய்வக சோதனைகள் மற்றும் அரசு சுகாதார திட்டங்களின் விவரங்கள்.",
      familyEyebrow: "குடும்ப நல்வாழ்வு",
      familyTitle: "குடும்ப சுகாதார வழிகாட்டுதல்",
      familyIntro: "உங்களுக்கும், முதிய பெற்றோர்களுக்கும், குழந்தைகளுக்கும் தேவையான சுகாதார ஆலோசனைகள்.",
      faqEyebrow: "பொதுவான வினாக்கள்",
      faqTitle: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
      faqIntro: "கட்டணங்கள், பணமில்லா காப்பீடு (டெமோ) மற்றும் அவசர சிகிச்சை வழிமுறைகள்.",
    },
    common: {
      bookDemo: "முன்பதிவு (டெமோ)",
      viewProfile: "விவரம் பார்க்க",
      sampleVerification: "மாதிரி சரிபார்ப்பு",
      sampleData: "மாதிரி தரவு",
      directions: "வழிமுறைகள்",
      feeNotListed: "கட்டணம் குறிப்பிடப்படவில்லை",
      consultationFee: "ஆலோசனைக் கட்டணம்",
      femaleDoctorToggle: "பெண் மருத்துவர் மட்டும்",
      femaleDoctorBadge: "கோரிக்கையின் பேரில் பெண் மருத்துவர்",
      languageFilter: "மொழி வாரியாக வடிகட்டவும்",
      allLanguages: "அனைத்து மொழிகளும்",
      budgetFilterTitle: "பட்ஜெட் (ஆலோசனைக் கட்டணம்)",
      budgetAny: "எந்த பட்ஜெட்டும்",
      budgetUnder500: "₹500க்கு கீழ்",
      budget500To1000: "₹500 முதல் ₹1,000 வரை",
      budgetAbove1000: "₹1,000க்கு மேல்",
      hiddenFacilitiesNotice: "கட்டணம் குறிப்பிடப்படாத மையங்கள் மறைக்கப்பட்டுள்ளன",
      emergencyCallout: "அவசர சிகிச்சைக்கு உடனடியாக 112 ஐ அழைக்கவும் அல்லது அருகிலுள்ள அவசர சிகிச்சைப் பிரிவுக்குச் செல்லவும்.",
      demoDisclaimer: "செயல்விளக்க வலைத்தளம். அனைத்து மருத்துவர்கள், நோயாளிகள் மற்றும் தகவல்களும் கற்பனையானவை.",
      machineTranslationDemo: "இயந்திர உதவி மொழிபெயர்ப்பு (டெமோ)",
      sortBy: "வரிசைப்படுத்து",
      sortDefault: "பரிந்துரைக்கப்பட்டவை",
      sortFeeAsc: "கட்டணம்: குறைவு முதல் அதிகம்",
      sortFeeDesc: "கட்டணம்: அதிகம் முதல் குறைவு",
      sortNearest: "அருகிலுள்ளவை முதலில்",
    },
  },
  te: {
    nav: {
      findDoctors: "వైద్యులను కనుగొనండి",
      clinics: "క్లినిక్‌లు & ఆసుపత్రులు",
      labTests: "ల్యాబ్ పరీక్షలు",
      services: "ఆరోగ్య సేవలు",
      loginDemo: "సైన్ ఇన్ (డెమో)",
      skipLink: "ప్రధాన కంటెంట్‌కు వెళ్లండి",
    },
    hero: {
      headline: "ఆరోగ్య సంరక్షణ, మీ ఇంటికి సమీపంలో.",
      subtext: "వైద్యుడు, స్పెషాలిటీ, క్లినిక్, ఆసుపత్రి లేదా ప్రాంతం ఆధారంగా శోధించండి.",
      searchPlaceholder: "వైద్యుడు, స్పెషాలిటీ, క్లినిక్, ఆసుపత్రి లేదా ప్రాంతం",
      selectCity: "నగరాన్ని ఎంచుకోండి",
      selectLocality: "ప్రాంతాన్ని ఎంచుకోండి",
      findCareBtn: "సంరక్షణను కనుగొనండి",
      clearSearch: "శోధనను క్లియర్ చేయండి",
      noMatches: "సరిపోలే ఫలితాలు లేవు. దయచేసి మరొక స్పెషాలిటీ లేదా ప్రాంతాన్ని ప్రయత్నించండి.",
      noMatchesHint: "అన్ని ఆసుపత్రులు మరియు వైద్యులను చూడటానికి మీ శోధనను రీసెట్ చేయండి.",
      useLocation: "నా స్థానాన్ని ఉపయోగించండి",
    },
    sections: {
      specialitiesEyebrow: "ప్రత్యేక వైద్య విభాగాలు",
      specialitiesTitle: "వైద్య స్పెషాలిటీ ప్రకారం సంప్రదించండి",
      specialitiesIntro: "పారదర్శక నమూనా రుసుములతో విశ్వసనీయ వైద్యులను అన్వేషించండి.",
      clinicsEyebrow: "స్థానిక ఆరోగ్య కేంద్రాలు",
      clinicsTitle: "మీ సమీపంలోని క్లినిక్‌లు మరియు ఆసుపత్రులు",
      clinicsIntro: "మీ ప్రాంతంలో ధృవీకరించబడిన కమ్యూనిటీ క్లినిక్‌లు మరియు ఆసుపత్రులు.",
      doctorsEyebrow: "అనుభవజ్ఞులైన వైద్యులు",
      doctorsTitle: "మీ వైద్యుడిని కనుగొనండి",
      doctorsIntro: "స్పష్టమైన భాషా నైపుణ్యాలు, ₹ రుసుము మరియు నమూనా లభ్యతతో వైద్యులను చూడండి.",
      servicesEyebrow: "ఆరోగ్య సేవలు",
      servicesTitle: "పారదర్శక ఆరోగ్య సేవలు",
      servicesIntro: "ధరల షెడ్యూల్, ఇంటి వద్ద డయాగ్నస్టిక్ పరీక్షలు మరియు ప్రభుత్వ పథకాల సమాచారం.",
      familyEyebrow: "కుటుంబ శ్రేయస్సు",
      familyTitle: "కుటుంబ ఆరోగ్య మార్గదర్శకత్వం",
      familyIntro: "మీ కోసం, తల్లిదండ్రులు, పిల్లలు మరియు జీవిత భాగస్వామి కోసం ముందస్తు ఆరోగ్య సలహాలు.",
      faqEyebrow: "సాధారణ ప్రశ్నలు",
      faqTitle: "తరచుగా అడిగే ప్రశ్నలు",
      faqIntro: "రుసుములు, క్యాష్‌లెస్ బీమా (డెమో) మరియు అత్యవసర చికిత్స సమాచారం.",
    },
    common: {
      bookDemo: "బుక్ చేయండి (డెమో)",
      viewProfile: "ప్రొఫైల్ చూడండి",
      sampleVerification: "నమూనా ధృవీకరణ",
      sampleData: "నమూనా డేటా",
      directions: "దిశలు",
      feeNotListed: "రుసుము నమోదు చేయలేదు",
      consultationFee: "సంప్రదింపుల రుసుము",
      femaleDoctorToggle: "మహిళా వైద్యురాలు మాత్రమే",
      femaleDoctorBadge: "అభ్యర్థనపై మహిళా వైద్యురాలు",
      languageFilter: "భాష ద్వారా ఫిల్టర్ చేయండి",
      allLanguages: "అన్ని భాషలు",
      budgetFilterTitle: "బడ్జెట్ (సంప్రదింపుల రుసుము)",
      budgetAny: "ఏదైనా బడ్జెట్",
      budgetUnder500: "₹500 లోపు",
      budget500To1000: "₹500 నుండి ₹1,000",
      budgetAbove1000: "₹1,000 పైన",
      hiddenFacilitiesNotice: "రుసుము నమోదు చేయని కేంద్రాలు దాచబడ్డాయి",
      emergencyCallout: "అత్యవసర పరిస్థితులకు వెంటనే 112 కు కాల్ చేయండి లేదా సమీప ఎమర్జెన్సీ విభాగానికి వెళ్ళండి.",
      demoDisclaimer: "ప్రదర్శన వెబ్‌సైట్. వైద్యులు, రోగులు మరియు విషయాలన్నీ కల్పితమైనవి.",
      machineTranslationDemo: "యంత్ర సహాయక అనువాదం (డెమో)",
      sortBy: "క్రమబద్ధీకరించు",
      sortDefault: "సిఫార్సు చేయబడినవి",
      sortFeeAsc: "రుసుము: తక్కువ నుండి ఎక్కువ",
      sortFeeDesc: "రుసుము: ఎక్కువ నుండి తక్కువ",
      sortNearest: "సమీపంలోనివి ముందుగా",
    },
  },
};

/**
 * Returns dictionary strings for the given locale with recursive safe fallback to English.
 * Any missing key in another locale seamlessly falls back to English, avoiding empty strings or broken glyphs.
 */
export function getDictionary(locale: SupportedLocale = "en"): DictionaryStrings {
  const chosen = dictionaries[locale] || dictionaries.en;
  const en = dictionaries.en;

  return {
    nav: { ...en.nav, ...(chosen.nav || {}) },
    hero: { ...en.hero, ...(chosen.hero || {}) },
    sections: { ...en.sections, ...(chosen.sections || {}) },
    common: { ...en.common, ...(chosen.common || {}) },
  };
}
