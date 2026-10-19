export type SupportedLocale = "en" | "hi" | "kn" | "ta";

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
      budget500To1000: "₹500 to ₹1,000",
      budgetAbove1000: "Above ₹1,000",
      hiddenFacilitiesNotice: "facility with no listed fee is hidden",
      emergencyCallout: "For emergencies, call 112 immediately or go to the nearest emergency department.",
      demoDisclaimer: "Demonstration website. All clinicians, patients, and content are fictional.",
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
    },
  },
};

/**
 * Returns dictionary strings for the given locale with safe fallback to English.
 */
export function getDictionary(locale: SupportedLocale = "en"): DictionaryStrings {
  return dictionaries[locale] || dictionaries.en;
}
