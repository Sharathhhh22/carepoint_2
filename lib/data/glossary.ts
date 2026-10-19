export interface GlossaryItem {
  id: string;
  term: string;
  plainExplanation: string;
  translations: Record<string, { term: string; explanation: string }>;
}

export const glossaryData: GlossaryItem[] = [
  {
    id: "opd",
    term: "OPD",
    plainExplanation: "Outpatient visit. You visit a clinic or hospital for diagnosis or treatment and return home on the same day without an overnight stay.",
    translations: {
      en: {
        term: "OPD",
        explanation: "Outpatient visit. You visit a clinic or hospital for diagnosis or treatment and return home on the same day without an overnight stay.",
      },
      hi: {
        term: "ओपीडी (OPD)",
        explanation: "बाह्य रोगी विभाग। आप उसी दिन डॉक्टर से परामर्श लेकर घर लौट जाते हैं, अस्पताल में भर्ती होने की आवश्यकता नहीं होती।",
      },
      kn: {
        term: "ಒಪಿಡಿ (OPD)",
        explanation: "ಹೊರರೋಗಿ ವಿಭಾಗ. ನೀವು ಆಸ್ಪತ್ರೆಗೆ ದಾಖಲಾಗದೆ ಅದೇ ದಿನ ವೈದ್ಯರನ್ನು ಕಂಡು ಚಿಕಿತ್ಸೆ ಪಡೆದು ಮನೆಗೆ ಮರಳಬಹುದು.",
      },
      ta: {
        term: "OPD",
        explanation: "வெளிநோயாளி பிரிவு. நீங்கள் மருத்துவமனையில் தங்காமல் அதே நாளில் மருத்துவரை சந்தித்து சிகிச்சை பெறலாம்.",
      },
      te: {
        term: "ఓపీడీ (OPD)",
        explanation: "ఔట్ పేషెంట్ విభాగం. మీరు ఆసుపత్రిలో చేరకుండా అదే రోజు వైద్యుడిని సంప్రదించి ఇంటికి వెళ్ళవచ్చు.",
      },
    },
  },
  {
    id: "follow-up",
    term: "Follow-up",
    plainExplanation: "A subsequent review consultation with your doctor to check your recovery or test results. Many clinics include one follow-up within 7 days.",
    translations: {
      en: {
        term: "Follow-up",
        explanation: "A subsequent review consultation with your doctor to check your recovery or test results. Many clinics include one follow-up within 7 days.",
      },
      hi: {
        term: "फ़ॉलो-अप (Follow-up)",
        explanation: "स्वास्थ्य सुधार या जांच रिपोर्ट देखने के लिए डॉक्टर से दोबारा मिलना। अधिकांश क्लीनिक 7 दिनों में एक बार पुनः समीक्षा शुल्क-मुक्त देते हैं।",
      },
      kn: {
        term: "ಫಾಲೋ-ಅಪ್",
        explanation: "ಚೇತರಿಕೆ ಅಥವಾ ಪರೀಕ್ಷಾ ವರದಿಗಳನ್ನು ಪರಿಶೀಲಿಸಲು ವೈದ್ಯರನ್ನು ಮತ್ತೆ ಭೇಟಿ ಮಾಡುವುದು. ಹಲವು ಕ್ಲಿನಿಕ್‌ಗಳು 7 ದಿನಗಳಲ್ಲಿ ಉಚಿತ ಮರುಪರಿಶೀಲನೆ ನೀಡುತ್ತವೆ.",
      },
      ta: {
        term: "மறுபரிசீலனை (Follow-up)",
        explanation: "குணமடைவதையோ அல்லது பரிசோதனை முடிவுகளையோ சரிபார்க்க மருத்துவரை மீண்டும் சந்திக்கும் ஆலோசனை.",
      },
      te: {
        term: "ఫాలో-అప్",
        explanation: "కోలుకోవడం లేదా పరీక్ష నివేదికలను సమీక్షించడానికి డాక్టర్‌ను తిరిగి సంప్రదించడం.",
      },
    },
  },
  {
    id: "cashless-claim",
    term: "Cashless claim",
    plainExplanation: "A process where the hospital settles your eligible medical expenses directly with the insurance provider, so you do not pay out of pocket up to the approved limit.",
    translations: {
      en: {
        term: "Cashless claim",
        explanation: "A process where the hospital settles your eligible medical expenses directly with the insurance provider, so you do not pay out of pocket up to the approved limit.",
      },
      hi: {
        term: "कैशलेस क्लेम",
        explanation: "एक सुविधा जिसमें अस्पताल आपके अनुमोदित चिकित्सा बिल का भुगतान सीधे बीमा कंपनी से प्राप्त करता है।",
      },
      kn: {
        term: "ನಗದು ರಹಿತ ಕ್ಲೈಮ್",
        explanation: "ಆಸ್ಪತ್ರೆಯು ನಿಮ್ಮ ಚಿಕಿತ್ಸಾ ವೆಚ್ಚವನ್ನು ನೇರವಾಗಿ ವಿಮಾ ಕಂಪನಿಯೊಂದಿಗೆ ಇತ್ಯರ್ಥಪಡಿಸುವ ವ್ಯವಸ್ಥೆ.",
      },
      ta: {
        term: "பணமில்லா காப்பீடு",
        explanation: "மருத்துவமனை உங்கள் தகுதியான சிகிச்சை செலவுகளை நேரடியாக காப்பீட்டு நிறுவனத்துடன் தீர்க்கும் வசதி.",
      },
      te: {
        term: "క్యాష్‌లెస్ క్లెయిమ్",
        explanation: "ఆసుపత్రి మీ అర్హతగల వైద్య ఖర్చులను నేరుగా బీమా కంపెనీతో పరిష్కరించే ప్రక్రియ.",
      },
    },
  },
  {
    id: "pre-authorisation",
    term: "Pre-authorisation",
    plainExplanation: "Prior approval obtained from an insurance company or scheme before a planned procedure or hospitalization to confirm coverage eligibility.",
    translations: {
      en: {
        term: "Pre-authorisation",
        explanation: "Prior approval obtained from an insurance company or scheme before a planned procedure or hospitalization to confirm coverage eligibility.",
      },
      hi: {
        term: "पूर्व-अनुमोदन (Pre-authorisation)",
        explanation: "अस्पताल में भर्ती या उपचार से पहले बीमा कंपनी से मिलने वाली अग्रिम स्वीकृति।",
      },
      kn: {
        term: "ಪೂರ್ವ-ಅನುಮೋದನೆ",
        explanation: "ಯೋಜಿತ ಚಿಕಿತ್ಸೆ ಅಥವಾ ಆಸ್ಪತ್ರೆಗೆ ದಾಖಲಾಗುವ ಮೊದಲು ವಿಮಾ ಕಂಪನಿಯಿಂದ ಪಡೆಯುವ ಮುಂಗಡ ಅನುಮೋದನೆ.",
      },
      ta: {
        term: "முன் அனுமதி",
        explanation: "திட்டமிட்ட சிகிச்சை அல்லது சேர்க்கைக்கு முன் காப்பீட்டு நிறுவனத்திடம் இருந்து பெறப்படும் முன் அனுமதி.",
      },
      te: {
        term: "ముందస్తు అనుమతి (Pre-authorisation)",
        explanation: "చికిత్స లేదా ఆసుపత్రి చేరికకు ముందు బీమా సంస్థ నుండి పొందే ముందస్తు ఆమోదం.",
      },
    },
  },
  {
    id: "general-physician",
    term: "General physician",
    plainExplanation: "A medical doctor who treats routine adult illnesses, seasonal fevers, and manages long-term health checks. Often your primary first contact for care.",
    translations: {
      en: {
        term: "General physician",
        explanation: "A medical doctor who treats routine adult illnesses, seasonal fevers, and manages long-term health checks. Often your primary first contact for care.",
      },
      hi: {
        term: "सामान्य चिकित्सक (General Physician)",
        explanation: "एक डॉक्टर जो आम बीमारियों, मौसमी बुखार और नियमित स्वास्थ्य जांच का इलाज करते हैं।",
      },
      kn: {
        term: "ಸಾಮಾನ್ಯ ವೈದ್ಯರು",
        explanation: "ಸಾಮಾನ್ಯ ಕಾಯಿಲೆಗಳು, ಜ್ವರ ಮತ್ತು ನಿಯಮಿತ ಆರೋಗ್ಯ ತಪಾಸಣೆ ಮಾಡುವ ಪ್ರಾಥಮಿಕ ವೈದ್ಯರು.",
      },
      ta: {
        term: "பொது மருத்துவர்",
        explanation: "வழக்கமான நோய்கள், காய்ச்சல் மற்றும் வழக்கமான சுகாதார சோதனைகளுக்கு சிகிச்சை அளிக்கும் முதன்மை மருத்துவர்.",
      },
      te: {
        term: "సాధారణ వైద్యుడు",
        explanation: "సాధారణ అనారోగ్యాలు, జ్వరాలు మరియు సాధారణ ఆరోగ్య పరీక్షలను నిర్వహించే ప్రాథమిక వైద్యుడు.",
      },
    },
  },
  {
    id: "specialist",
    term: "Specialist",
    plainExplanation: "A doctor who has advanced training in a specific area of medicine, such as cardiology (heart), dermatology (skin), or orthopaedics (bones).",
    translations: {
      en: {
        term: "Specialist",
        explanation: "A doctor who has advanced training in a specific area of medicine, such as cardiology (heart), dermatology (skin), or orthopaedics (bones).",
      },
      hi: {
        term: "विशेषज्ञ चिकित्सक (Specialist)",
        explanation: "एक डॉक्टर जिन्होंने चिकित्सा के किसी विशेष क्षेत्र (जैसे हृदय रोग या त्वचा विज्ञान) में उच्च प्रशिक्षण प्राप्त किया हो।",
      },
      kn: {
        term: "ತಜ್ಞ ವೈದ್ಯರು",
        explanation: "ಹೃದ್ರೋಗ, ಚರ್ಮ ಅಥವಾ ಮೂಳೆಗಳಂತಹ ನಿರ್ದಿಷ್ಟ ವೈದ್ಯಕೀಯ ಕ್ಷೇತ್ರದಲ್ಲಿ ಉನ್ನತ ತರಬೇತಿ ಪಡೆದ ವೈದ್ಯರು.",
      },
      ta: {
        term: "மருத்துவ நிபுணர்",
        explanation: "இதயம், தோல் அல்லது எலும்பு போன்ற ஒரு குறிப்பிட்ட துறையில் சிறப்புப் பயிற்சி பெற்ற மருத்துவர்.",
      },
      te: {
        term: "నిపుణుడు (Specialist)",
        explanation: "గుండె, చర్మం లేదా ఎముకలు వంటి నిర్దిష్ట వైద్య విభాగంలో అధునాతన శిక్షణ పొందిన వైద్యుడు.",
      },
    },
  },
  {
    id: "consultation-fee",
    term: "Consultation fee",
    plainExplanation: "The fee charged by the doctor or clinic for examining you and offering medical advice during an OPD visit. Excludes lab tests and medicines.",
    translations: {
      en: {
        term: "Consultation fee",
        explanation: "The fee charged by the doctor or clinic for examining you and offering medical advice during an OPD visit. Excludes lab tests and medicines.",
      },
      hi: {
        term: "परामर्श शुल्क",
        explanation: "ओपीडी परामर्श के दौरान डॉक्टर द्वारा लिया जाने वाला शुल्क। इसमें लैब टेस्ट और दवाइयां शामिल नहीं हैं।",
      },
      kn: {
        term: "ಸಮಾಲೋಚನಾ ಶುಲ್ಕ",
        explanation: "ಪರೀಕ್ಷೆ ಮತ್ತು ವೈದ್ಯಕೀಯ ಸಲಹೆಗಾಗಿ ವೈದ್ಯರು ಪಡೆಯುವ ಶುಲ್ಕ. ಇದರಲ್ಲಿ ಲ್ಯಾಬ್ ಪರೀಕ್ಷೆಗಳು ಸೇರಿರುವುದಿಲ್ಲ.",
      },
      ta: {
        term: "ஆலோசனைக் கட்டணம்",
        explanation: "மருத்துவ ஆலோசனைக்காக பெறப்படும் கட்டணம். இதில் ஆய்வக சோதனைகள் மற்றும் மருந்துகள் சேர்க்கப்படவில்லை.",
      },
      te: {
        term: "సంప్రదింపుల రుసుము",
        explanation: "వైద్య సలహా కోసం డాక్టర్ లేదా క్లినిక్ వసూలు చేసే రుసుము. ఇందులో ల్యాబ్ పరీక్షలు మరియు మందులు చేర్చబడవు.",
      },
    },
  },
];

export function getGlossaryItem(idOrTerm: string): GlossaryItem | undefined {
  const clean = idOrTerm.toLowerCase().trim();
  return glossaryData.find(
    (item) => item.id.toLowerCase() === clean || item.term.toLowerCase() === clean
  );
}
