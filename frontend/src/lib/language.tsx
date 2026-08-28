import { createContext, useContext, useState, type ReactNode } from "react";

export type Language = "en" | "kn";

type Copy = Record<string, string>;

const dictionary: Record<Language, Copy> = {
  en: {
    brandSubtitle: "Bakery · Bengaluru",
    navMenu: "Menu",
    navWay: "Our way",
    navCustom: "Custom cakes",
    navVisit: "Visit",
    navReviews: "Reviews",
    orderOnWhatsapp: "Order on WhatsApp",
    openToday: "Open today · takeaway ready",
    heroLine1: "A little more",
    heroLine2: "sweetness for",
    heroLine3: "every moment.",
    heroDescription: "Cake World Bakery is your neighbourhood stop for celebration cakes, pastries, sweets and savoury bites in Muddanahalli, Bengaluru.",
    orderFresh: "Order fresh on WhatsApp",
    callBakery: "Call the bakery",
    madeForLove: "Made for the people you love",
    seeMenu: "See the menu",
    signatureCake: "01 / signature cake",
    locationTag: "MUDDANAHALLI, BLR",
    manifestoEyebrow: "The bakehouse way",
    manifestoTitle: "Good things deserve a little ceremony.",
    manifestoLead: "A bakery is more than a counter. It is the place you stop before the party, after a long day, or whenever a small sweet can change the mood.",
    chapter1Title: "Make it a moment",
    chapter1Text: "From a birthday cake to a small treat on the way home, every order is made for a moment worth remembering.",
    chapter2Title: "Choose your kind",
    chapter2Text: "Cakes, sweets, pastries and savoury favourites share the same counter, so there is always something for every craving.",
    chapter3Title: "Keep it personal",
    chapter3Text: "Tell us what you are celebrating, how many people are coming and what you have in mind. We will help you choose.",
    chapter4Title: "Take it home warm",
    chapter4Text: "Our Muddanahalli bakery is ready for takeaway when the craving cannot wait for another day.",
    menuEyebrow: "From the counter",
    menuTitle: "Find your favourite kind of sweet.",
    menuLead: "The menu is kept close to the counter. Check today's choices here, then message the bakery for exact availability and pricing.",
    liveCounter: "Live counter",
    liveItems: "visible choices",
    priceRange: "Listing range · ₹1–200 per person",
    liveStatus: "Updated by the bakery",
    askPrice: "Ask today",
    ownerSetsPrice: "owner sets price",
    perItem: "per item",
    menuAsk: "Ask about this",
    counterNote: "A fresh question is always welcome",
    counterTitle: "Not sure what to choose? Tell us the occasion.",
    askFresh: "Ask what is fresh",
    menuLoading: "Loading today's counter…",
    menuError: "The live menu is taking a moment. Ask the bakery directly for today's choices.",
    orderEyebrow: "The easy part",
    orderTitle: "Tell us what you are celebrating.",
    orderLead: "Choose a starting point and send a quick brief. The bakery team can help with flavour, size, availability and the little details that make it yours.",
    orderPromise: "No payment here. Just a clear WhatsApp enquiry to get the conversation started.",
    formHeading: "Quick cake brief",
    lookingFor: "What are you looking for?",
    sizeQuantity: "Size or quantity",
    egglessOption: "I would like an eggless option",
    noteLabel: "Date, message or extra detail",
    receiveLabel: "How would you like to receive it?",
    sendBrief: "Send this brief on WhatsApp",
    connectedTo: "You will be connected to",
    pleaseAdvise: "Please advise",
    small: "Small",
    medium: "Medium",
    large: "Large",
    multipleItems: "Multiple items",
    takeawayFrom: "Takeaway from Muddanahalli",
    askAvailability: "I will ask about availability",
    reviewsEyebrow: "From the review counter",
    reviewsTitle: "The sweet word on the street.",
    reviewCount: "75 reviews",
    visitEyebrow: "Come by for a bite",
    visitTitle: "Find us when the craving calls.",
    visitLead: "Pick up a cake, take away something savoury, or stop in for the sweet thing you did not plan to buy.",
    hours: "Open · closes 10:30 pm",
    directions: "Get directions",
    takeaway: "Takeaway available",
    mapLabel: "02 / find us",
    mapTitle: "Cake World Bakery on Google Maps",
    footerEyebrow: "Leave room for dessert",
    footerCopy: "Good cakes, familiar favourites and a reason to come back tomorrow.",
    chatWhatsApp: "Chat on WhatsApp",
    madeForGood: "Made for the good stuff",
  },
  kn: {
    brandSubtitle: "ಬೇಕರಿ · ಬೆಂಗಳೂರು",
    navMenu: "ಮೆನು",
    navWay: "ನಮ್ಮ ದಾರಿ",
    navCustom: "ಕಸ್ಟಮ್ ಕೇಕ್",
    navVisit: "ಭೇಟಿ",
    navReviews: "ವಿಮರ್ಶೆಗಳು",
    orderOnWhatsapp: "ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಆರ್ಡರ್",
    openToday: "ಇಂದು ತೆರೆದಿದೆ · ಟೇಕ್‌ಅವೇ ಸಿದ್ಧ",
    heroLine1: "ಇನ್ನಷ್ಟು ಸಿಹಿ",
    heroLine2: "ಪ್ರತಿ ಕ್ಷಣಕ್ಕೂ",
    heroLine3: "ನಿಮ್ಮ ಜೊತೆ.",
    heroDescription: "ಬೆಂಗಳೂರು ಮುದ್ದನಹಳ್ಳಿಯಲ್ಲಿರುವ Cake World Bakery — ಆಚರಣೆಯ ಕೇಕ್‌ಗಳು, ಪೇಸ್ಟ್ರಿಗಳು, ಸಿಹಿತಿಂಡಿಗಳು ಮತ್ತು ಖಾರದ ತಿಂಡಿಗಳ ನಿಮ್ಮ ಹತ್ತಿರದ ತಾಣ.",
    orderFresh: "ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಆರ್ಡರ್ ಮಾಡಿ",
    callBakery: "ಬೇಕರಿಗೆ ಕರೆ ಮಾಡಿ",
    madeForLove: "ನೀವು ಪ್ರೀತಿಸುವವರಿಗಾಗಿ",
    seeMenu: "ಮೆನು ನೋಡಿ",
    signatureCake: "01 / ವಿಶೇಷ ಕೇಕ್",
    locationTag: "ಮುದ್ದನಹಳ್ಳಿ, ಬೆಂಗಳೂರು",
    manifestoEyebrow: "ಬೇಕರಿಯ ದಾರಿ",
    manifestoTitle: "ಒಳ್ಳೆಯ ಸಂಗತಿಗಳಿಗೆ ಸ್ವಲ್ಪ ಸಂಭ್ರಮ ಬೇಕು.",
    manifestoLead: "ಬೇಕರಿ ಎಂದರೆ ಕೇವಲ ಕೌಂಟರ್ ಅಲ್ಲ. ಪಾರ್ಟಿಗೂ ಮುನ್ನ, ದೀರ್ಘ ದಿನದ ನಂತರ ಅಥವಾ ಮನಸ್ಸು ಬದಲಿಸುವ ಸಣ್ಣ ಸಿಹಿಗಾಗಿ ನಿಲ್ಲುವ ಜಾಗ.",
    chapter1Title: "ಕ್ಷಣವನ್ನು ವಿಶೇಷಗೊಳಿಸಿ",
    chapter1Text: "ಹುಟ್ಟುಹಬ್ಬದ ಕೇಕ್‌ನಿಂದ ಮನೆಗೆ ಹೋಗುವ ದಾರಿಯ ಸಣ್ಣ ಸಿಹಿವರೆಗೆ, ಪ್ರತಿಯೊಂದು ಆರ್ಡರ್ ನೆನಪಿನಲ್ಲಿ ಉಳಿಯುವ ಕ್ಷಣಕ್ಕಾಗಿ.",
    chapter2Title: "ನಿಮ್ಮ ರುಚಿಯನ್ನು ಆರಿಸಿ",
    chapter2Text: "ಕೇಕ್‌ಗಳು, ಸಿಹಿತಿಂಡಿಗಳು, ಪೇಸ್ಟ್ರಿಗಳು ಮತ್ತು ಖಾರದ ಮೆಚ್ಚಿನವುಗಳು ಒಂದೇ ಕೌಂಟರ್‌ನಲ್ಲಿ — ಪ್ರತಿಯೊಂದು ಹಸಿವಿಗೂ ಏನಾದರೂ ಇದೆ.",
    chapter3Title: "ನಿಮ್ಮದಾಗಿರಲಿ",
    chapter3Text: "ಏನು ಆಚರಿಸುತ್ತೀರಿ, ಎಷ್ಟು ಜನ ಬರುತ್ತಾರೆ ಮತ್ತು ಏನು ಬೇಕು ಎಂದು ಹೇಳಿ. ಆಯ್ಕೆ ಮಾಡಲು ನಾವು ಸಹಾಯ ಮಾಡುತ್ತೇವೆ.",
    chapter4Title: "ಬೆಚ್ಚಗೆ ಮನೆಗೆ ತೆಗೆದುಕೊಂಡು ಹೋಗಿ",
    chapter4Text: "ಮುದ್ದನಹಳ್ಳಿ ಬೇಕರಿ ಟೇಕ್‌ಅವೇಗೆ ಸಿದ್ಧವಾಗಿದೆ — ಸಿಹಿಯ ಆಸೆ ನಾಳೆಯವರೆಗೆ ಕಾಯಬೇಕಾಗಿಲ್ಲ.",
    menuEyebrow: "ಕೌಂಟರ್‌ನಿಂದ",
    menuTitle: "ನಿಮ್ಮ ಮೆಚ್ಚಿನ ಸಿಹಿಯನ್ನು ಹುಡುಕಿ.",
    menuLead: "ಮೆನು ಕೌಂಟರ್‌ನ ಹತ್ತಿರವೇ ಇರುತ್ತದೆ. ಇಂದಿನ ಆಯ್ಕೆಗಳನ್ನು ನೋಡಿ, ನಂತರ ನಿಖರ ಲಭ್ಯತೆ ಮತ್ತು ಬೆಲೆಗೆ ಬೇಕರಿಗೆ ಮೆಸೇಜ್ ಮಾಡಿ.",
    liveCounter: "ಲೈವ್ ಕೌಂಟರ್",
    liveItems: "ಲಭ್ಯವಿರುವ ಆಯ್ಕೆಗಳು",
    priceRange: "ಪಟ್ಟಿಯ ಶ್ರೇಣಿ · ಪ್ರತಿ ವ್ಯಕ್ತಿಗೆ ₹1–200",
    liveStatus: "ಬೇಕರಿಯಿಂದ ನವೀಕರಿಸಲಾಗಿದೆ",
    askPrice: "ಇಂದಿನ ಬೆಲೆ ಕೇಳಿ",
    ownerSetsPrice: "ಮಾಲೀಕರು ಬೆಲೆ ನಿಗದಿಪಡಿಸುತ್ತಾರೆ",
    perItem: "ಪ್ರತಿ ಐಟಂ",
    menuAsk: "ಇದರ ಬಗ್ಗೆ ಕೇಳಿ",
    counterNote: "ತಾಜಾ ಪ್ರಶ್ನೆಗಳಿಗೆ ಯಾವಾಗಲೂ ಸ್ವಾಗತ",
    counterTitle: "ಏನು ಆರಿಸಬೇಕು ಗೊತ್ತಿಲ್ಲವೇ? ನಿಮ್ಮ ಸಂದರ್ಭವನ್ನು ಹೇಳಿ.",
    askFresh: "ಇಂದು ತಾಜಾ ಏನು ಎಂದು ಕೇಳಿ",
    menuLoading: "ಇಂದಿನ ಕೌಂಟರ್ ಲೋಡ್ ಆಗುತ್ತಿದೆ…",
    menuError: "ಲೈವ್ ಮೆನು ಸ್ವಲ್ಪ ಸಮಯ ತೆಗೆದುಕೊಳ್ಳುತ್ತಿದೆ. ಇಂದಿನ ಆಯ್ಕೆಗಳಿಗೆ ನೇರವಾಗಿ ಬೇಕರಿಯನ್ನು ಕೇಳಿ.",
    orderEyebrow: "ಸುಲಭವಾದ ಭಾಗ",
    orderTitle: "ನೀವು ಏನು ಆಚರಿಸುತ್ತೀರಿ ಎಂದು ಹೇಳಿ.",
    orderLead: "ಒಂದು ಆಯ್ಕೆಯಿಂದ ಪ್ರಾರಂಭಿಸಿ ಮತ್ತು ಚಿಕ್ಕ ವಿವರ ಕಳುಹಿಸಿ. ರುಚಿ, ಗಾತ್ರ, ಲಭ್ಯತೆ ಮತ್ತು ನಿಮ್ಮ ವಿಶೇಷ ವಿವರಗಳಲ್ಲಿ ಬೇಕರಿ ತಂಡ ಸಹಾಯ ಮಾಡುತ್ತದೆ.",
    orderPromise: "ಇಲ್ಲಿ ಪಾವತಿ ಇಲ್ಲ. ಮಾತುಕತೆ ಆರಂಭಿಸಲು ಸರಳವಾದ ವಾಟ್ಸಾಪ್ ವಿಚಾರಣೆ ಮಾತ್ರ.",
    formHeading: "ತ್ವರಿತ ಕೇಕ್ ವಿವರ",
    lookingFor: "ನಿಮಗೆ ಏನು ಬೇಕು?",
    sizeQuantity: "ಗಾತ್ರ ಅಥವಾ ಪ್ರಮಾಣ",
    egglessOption: "ಎಗ್‌ಲೆಸ್ ಆಯ್ಕೆ ಬೇಕು",
    noteLabel: "ದಿನಾಂಕ, ಸಂದೇಶ ಅಥವಾ ಹೆಚ್ಚುವರಿ ವಿವರ",
    receiveLabel: "ಹೇಗೆ ಪಡೆಯಲು ಬಯಸುತ್ತೀರಿ?",
    sendBrief: "ಈ ವಿವರವನ್ನು ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಕಳುಹಿಸಿ",
    connectedTo: "ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಲಾಗುವುದು",
    pleaseAdvise: "ದಯವಿಟ್ಟು ಸಲಹೆ ನೀಡಿ",
    small: "ಸಣ್ಣ",
    medium: "ಮಧ್ಯಮ",
    large: "ದೊಡ್ಡ",
    multipleItems: "ಹಲವು ಐಟಂಗಳು",
    takeawayFrom: "ಮುದ್ದನಹಳ್ಳಿಯಿಂದ ಟೇಕ್‌ಅವೇ",
    askAvailability: "ಲಭ್ಯತೆಯನ್ನು ಕೇಳುತ್ತೇನೆ",
    reviewsEyebrow: "ವಿಮರ್ಶೆಗಳ ಕೌಂಟರ್‌ನಿಂದ",
    reviewsTitle: "ರಸ್ತೆಯ ಸಿಹಿ ಮಾತು.",
    reviewCount: "75 ವಿಮರ್ಶೆಗಳು",
    visitEyebrow: "ಒಂದು ಬೈಟ್‌ಗಾಗಿ ಬನ್ನಿ",
    visitTitle: "ಸಿಹಿಯ ಆಸೆ ಬಂದಾಗ ನಮ್ಮನ್ನು ಹುಡುಕಿ.",
    visitLead: "ಕೇಕ್ ತೆಗೆದುಕೊಂಡು ಹೋಗಿ, ಖಾರದ ತಿಂಡಿ ಪ್ಯಾಕ್ ಮಾಡಿ ಅಥವಾ ಯೋಜಿಸದ ಸಿಹಿಗಾಗಿ ನಿಲ್ಲಿ.",
    hours: "ತೆರೆದಿದೆ · ರಾತ್ರಿ 10:30ಕ್ಕೆ ಮುಚ್ಚುತ್ತದೆ",
    directions: "ದಾರಿ ಪಡೆಯಿರಿ",
    takeaway: "ಟೇಕ್‌ಅವೇ ಲಭ್ಯ",
    mapLabel: "02 / ನಮ್ಮನ್ನು ಹುಡುಕಿ",
    mapTitle: "Google Maps ನಲ್ಲಿ Cake World Bakery",
    footerEyebrow: "ಸಿಹಿಗೆ ಜಾಗ ಬಿಡಿ",
    footerCopy: "ಒಳ್ಳೆಯ ಕೇಕ್‌ಗಳು, ಪರಿಚಿತ ಮೆಚ್ಚಿನವುಗಳು ಮತ್ತು ಮತ್ತೆ ಬರಲು ಒಂದು ಕಾರಣ.",
    chatWhatsApp: "ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಚಾಟ್ ಮಾಡಿ",
    madeForGood: "ಒಳ್ಳೆಯ ಸಂಗತಿಗಳಿಗಾಗಿ",
  },
};

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function initialLanguage(): Language {
  if (typeof window !== "undefined" && window.localStorage.getItem("cake-world-language") === "kn") return "kn";
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);
  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem("cake-world-language", nextLanguage);
  };
  const t = (key: string) => dictionary[language][key] ?? dictionary.en[key] ?? key;

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
