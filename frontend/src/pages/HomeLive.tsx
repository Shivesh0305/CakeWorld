import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  ChevronRight,
  Clock3,
  Heart,
  MapPin,
  Menu as MenuIcon,
  MessageCircle,
  Phone,
  Quote,
  Send,
  ShieldCheck,
  Star,
  Utensils,
  X,
} from "lucide-react";
import { apiGet } from "@/lib/api";
import { useLanguage, type Language } from "@/lib/language";

const PHONE_NUMBER = "916362793729";
const PHONE_LABEL = "+91 63627 93729";
const STORE_ADDRESS = "416, Singanayakanahalli, Sree Sai Layout, Bengaluru, Muddanahalli, Karnataka 560119";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Cake World Bakery, ${STORE_ADDRESS}`)}`;
const MAPS_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(`Cake World Bakery, ${STORE_ADDRESS}`)}&output=embed`;

type MenuItem = {
  id: string;
  name: string;
  name_kn: string;
  category: string;
  category_kn: string;
  description: string;
  description_kn: string;
  price_inr: number | null;
  image_url: string;
  alt: string;
  is_visible: boolean;
  is_featured: boolean;
  sort_order: number;
};

const chapters = [
  ["01", "chapter1Title", "chapter1Text"],
  ["02", "chapter2Title", "chapter2Text"],
  ["03", "chapter3Title", "chapter3Text"],
  ["04", "chapter4Title", "chapter4Text"],
] as const;

const reviewData = [
  {
    id: "review-item-01",
    author: "Seenu Singh",
    detail: "Local Guide · a year ago",
    detailKn: "ಸ್ಥಳೀಯ ಗೈಡ್ · ಒಂದು ವರ್ಷದ ಹಿಂದೆ",
    quote: "Absolutely loved the cake from Cake World Bakery! The design was beautiful, just like I wanted, and the taste was even better – fresh, soft, and perfectly sweet.",
    quoteKn: "Cake World Bakeryಯ ಕೇಕ್ ತುಂಬಾ ಇಷ್ಟವಾಯಿತು! ವಿನ್ಯಾಸ ಸುಂದರವಾಗಿತ್ತು, ರುಚಿ ಇನ್ನೂ ಚೆನ್ನಾಗಿತ್ತು — ತಾಜಾ, ಮೃದುವಾಗಿ ಮತ್ತು ಸರಿಯಾದ ಸಿಹಿಯೊಂದಿಗೆ.",
  },
  {
    id: "review-item-02",
    author: "Deepak A",
    detail: "Local Guide · 2 years ago",
    detailKn: "ಸ್ಥಳೀಯ ಗೈಡ್ · 2 ವರ್ಷಗಳ ಹಿಂದೆ",
    quote: "Nice Place variety Of Cakes sweets and snacks. Good Tast.",
    quoteKn: "ಕೇಕ್, ಸಿಹಿತಿಂಡಿ ಮತ್ತು ತಿಂಡಿಗಳ ಉತ್ತಮ ವೈವಿಧ್ಯ. ರುಚಿ ಚೆನ್ನಾಗಿದೆ.",
  },
  {
    id: "review-item-03",
    author: "A happy regular",
    detail: "Customer review",
    detailKn: "ಗ್ರಾಹಕರ ವಿಮರ್ಶೆ",
    quote: "Taste and yummy nice food.....",
    quoteKn: "ರುಚಿಕರವಾದ ಮತ್ತು ಒಳ್ಳೆಯ ಆಹಾರ.....",
  },
];

function localized(language: Language, english: string, kannada: string) {
  return language === "kn" && kannada.trim() ? kannada : english;
}

function createWhatsAppHref(item: string, size: string, eggless: boolean, note: string, pickup: string) {
  const message = [
    "Hello Cake World Bakery!",
    `I would like to enquire about: ${item}.`,
    `Size or quantity: ${size}.`,
    `Eggless preference: ${eggless ? "Yes" : "No preference"}.`,
    note.trim() ? `Message or date: ${note.trim()}.` : "",
    pickup.trim() ? `Pickup: ${pickup}.` : "",
  ].filter(Boolean).join("\n");
  return `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}

function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const nextLanguage = language === "en" ? "kn" : "en";
  return <button className="language-toggle" type="button" onClick={() => setLanguage(nextLanguage)} data-testid="language-toggle" aria-label={language === "en" ? "Switch to Kannada" : "Switch to English"}>{language === "en" ? "ಕನ್ನಡ" : "English"}</button>;
}

function Header({ isOpen, onToggle, onClose }: { isOpen: boolean; onToggle: () => void; onClose: () => void }) {
  const { t } = useLanguage();
  const links = [
    [t("navMenu"), "#menu", "nav-link-menu"],
    [t("navWay"), "#manifesto", "nav-link-manifesto"],
    [t("navCustom"), "#custom-orders", "nav-link-custom"],
    [t("navVisit"), "#visit", "nav-link-locations"],
    [t("navReviews"), "#reviews", "nav-link-reviews"],
  ];
  const orderHref = createWhatsAppHref("a birthday cake", t("pleaseAdvise"), false, "", t("takeawayFrom"));

  return (
    <header className="site-header" data-testid="main-navigation-bar">
      <div className="header-inner">
        <a className="brand-link" href="#home" onClick={onClose} data-testid="brand-logo-link"><span className="brand-name">Cake World<span>.</span></span><span className="brand-subtitle">{t("brandSubtitle")}</span></a>
        <nav className="desktop-nav" aria-label="Main navigation">{links.map(([label, href, testId]) => <a key={href} href={href} data-testid={testId}>{label}</a>)}</nav>
        <div className="header-actions"><LanguageToggle /><a className="header-order-link" href={orderHref} target="_blank" rel="noreferrer" data-testid="nav-whatsapp-cta"><MessageCircle size={15} /> {t("orderOnWhatsapp")}</a><button className="mobile-menu-toggle" type="button" aria-expanded={isOpen} aria-controls="mobile-navigation" onClick={onToggle} data-testid="mobile-menu-toggle">{isOpen ? <X size={20} /> : <MenuIcon size={20} />}</button></div>
      </div>
      <nav className={`mobile-nav ${isOpen ? "is-open" : ""}`} id="mobile-navigation" aria-label="Mobile navigation">
        {links.map(([label, href, testId]) => <a key={href} href={href} data-testid={`mobile-${testId}`} onClick={onClose}>{label}<ChevronRight size={16} /></a>)}
        <a className="mobile-nav-order" href={orderHref} target="_blank" rel="noreferrer" onClick={onClose} data-testid="mobile-nav-whatsapp-cta">{t("orderOnWhatsapp")} <ArrowUpRight size={16} /></a>
      </nav>
    </header>
  );
}

function Hero() {
  const { t } = useLanguage();
  const href = createWhatsAppHref("a birthday cake", t("pleaseAdvise"), false, "", t("takeawayFrom"));
  return <section className="hero-section" id="home" data-testid="hero-section"><div className="page-width hero-grid"><div className="hero-copy"><div className="eyebrow eyebrow-light" data-testid="live-baking-status-badge"><span className="status-dot" /> {t("openToday")}</div><h1 className="hero-title" data-testid="hero-headline"><span className="hero-line">{t("heroLine1")}</span><span className="hero-line">{t("heroLine2")}</span><span className="hero-line">{t("heroLine3")}</span></h1><p className="hero-description" data-testid="hero-subheading">{t("heroDescription")}</p><div className="hero-actions"><a className="button button-primary" href={href} target="_blank" rel="noreferrer" data-testid="hero-whatsapp-order-btn"><MessageCircle size={18} /> {t("orderFresh")} <ArrowUpRight size={17} /></a><a className="button button-secondary-dark" href={`tel:+${PHONE_NUMBER}`} data-testid="hero-direct-call-btn"><Phone size={17} /> {t("callBakery")}</a></div><div className="hero-footnote"><span><Heart size={14} fill="currentColor" /> {t("madeForLove")}</span><a href="#menu" data-testid="hero-scroll-menu-link">{t("seeMenu")} <ArrowDown size={15} /></a></div></div><figure className="hero-figure"><div className="hero-image-frame"><img src="https://static.prod-images.emergentagent.com/jobs/97bc0cba-d75d-4760-9020-70de12137d5a/images/52644be104f165919bfcb32e68df3626d590ebea189b4e10485489bc28b7f7dc.jpeg" alt="Dark chocolate celebration cake topped with cherries" className="hero-image" data-testid="hero-cake-image" /><span className="image-corner-note">{t("signatureCake")}</span></div><figcaption className="hero-caption"><span>Rich layers. Soft centres. A reason to gather.</span><span className="hero-caption-location">{t("locationTag")}</span></figcaption></figure></div></section>;
}

function Marquee() {
  const { language } = useLanguage();
  const items = language === "kn" ? ["ಹುಟ್ಟುಹಬ್ಬದ ಕೇಕ್‌ಗಳು", "ಸಿಹಿತಿಂಡಿಗಳು ಮತ್ತು ಪೇಸ್ಟ್ರಿಗಳು", "ಚಿಕನ್ ಬರ್ಗರ್ + ಫ್ರೈಸ್", "ವೆಜ್ ಸ್ಯಾಂಡ್‌ವಿಚ್‌ಗಳು", "ಮುದ್ದನಹಳ್ಳಿಯಲ್ಲಿ ಟೇಕ್‌ಅವೇ"] : ["BIRTHDAY CAKES", "SWEETS & PASTRIES", "CHICKEN BURGER + FRIES", "VEG SANDWICHES", "TAKEAWAY IN MUDDANAHALLI"];
  return <section className="marquee-window" data-testid="editorial-marquee-ribbon" aria-label="Bakery highlights"><div className="marquee-track">{[...items, ...items].map((item, index) => <span className="marquee-item" key={`${item}-${index}`}>{item} <b>✦</b></span>)}</div></section>;
}

function Manifesto() {
  const { t } = useLanguage();
  return <section className="manifesto-section section" id="manifesto" data-testid="manifesto-section"><div className="page-width"><div className="section-intro reveal"><span className="eyebrow">{t("manifestoEyebrow")}</span><h2 className="section-title">{t("manifestoTitle")}</h2><p className="section-lede">{t("manifestoLead")}</p></div><div className="manifesto-grid">{chapters.map(([number, titleKey, textKey], index) => <article className="manifesto-chapter reveal" style={{ transitionDelay: `${index * 90}ms` }} key={number} data-testid={`manifesto-chapter-${number}`}><span className="chapter-number">{number}</span><h3>{t(titleKey)}</h3><p>{t(textKey)}</p></article>)}</div></div></section>;
}

function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  const { language, t } = useLanguage();
  const title = localized(language, item.name, item.name_kn);
  const category = localized(language, item.category, item.category_kn);
  const description = localized(language, item.description, item.description_kn);
  const href = createWhatsAppHref(item.name, t("pleaseAdvise"), false, "", t("takeawayFrom"));
  const price = item.price_inr === null ? t("askPrice") : `₹${item.price_inr}`;
  return <article className={`menu-card reveal ${item.is_featured ? "menu-card-featured" : ""}`} style={{ transitionDelay: `${index * 70}ms` }} data-testid={`live-menu-card-${item.id}`}>
    {item.image_url ? <div className="menu-image-wrap"><img src={item.image_url} alt={item.alt} className="menu-image" /><span className="menu-image-index">0{index + 1}</span></div> : <div className="menu-image-fallback"><span>0{index + 1}</span><strong>{title}</strong></div>}
    <div className="menu-card-body"><div className="menu-card-meta"><span>{category}</span><span>{item.is_featured ? "Featured" : t("liveStatus")}</span></div><h3>{title}</h3><div className="menu-price-row"><strong>{price}</strong><span>{item.price_inr === null ? t("ownerSetsPrice") : t("perItem")}</span></div><p>{description}</p><a className="text-link" href={href} target="_blank" rel="noreferrer" data-testid={`live-menu-order-${item.id}`}>{t("menuAsk")} <ArrowUpRight size={16} /></a></div>
  </article>;
}

function MenuSection({ items, loading, error }: { items: MenuItem[]; loading: boolean; error: boolean }) {
  const { t } = useLanguage();
  const enquiryHref = createWhatsAppHref("today's menu", t("pleaseAdvise"), false, "", t("takeawayFrom"));
  return <section className="menu-section section" id="menu" data-testid="signature-menu-section"><div className="page-width"><div className="menu-header-grid reveal"><div className="menu-heading-block"><span className="eyebrow">{t("menuEyebrow")}</span><h2 className="section-title">{t("menuTitle")}</h2></div><aside className="menu-live-rail"><span className="eyebrow">{t("liveCounter")}</span><strong className="menu-live-number" data-testid="live-menu-count">{String(items.length).padStart(2, "0")}</strong><span className="menu-live-caption">{t("liveItems")}</span><span className="menu-live-status"><span className="status-dot" /> {t("liveStatus")}</span></aside><p className="section-lede">{t("menuLead")}<br /><strong className="menu-range-label" data-testid="menu-price-range">{t("priceRange")}</strong></p></div>{loading && <div className="menu-loading" data-testid="live-menu-loading">{t("menuLoading")}</div>}{error && <div className="menu-loading" data-testid="live-menu-error">{t("menuError")} <a href={enquiryHref} target="_blank" rel="noreferrer" data-testid="live-menu-error-link">{t("orderOnWhatsapp")}</a></div>}{!loading && !error && <div className="menu-grid">{items.map((item, index) => <MenuCard item={item} index={index} key={item.id} />)}</div>}<div className="counter-callout reveal"><div><span className="eyebrow">{t("counterNote")}</span><h3>{t("counterTitle")}</h3></div><a className="button button-dark" href={enquiryHref} target="_blank" rel="noreferrer" data-testid="counter-whatsapp-link">{t("askFresh")} <ArrowUpRight size={16} /></a></div></div></section>;
}

function OrderStudio({ items }: { items: MenuItem[] }) {
  const { t, language } = useLanguage();
  const options = items.length ? items : [{ id: "default", name: "Birthday cake", name_kn: "ಹುಟ್ಟುಹಬ್ಬದ ಕೇಕ್", category: "", category_kn: "", description: "", description_kn: "", price_inr: null, image_url: "", alt: "", is_visible: true, is_featured: false, sort_order: 0 }];
  const [item, setItem] = useState(options[0].name);
  const [size, setSize] = useState("Please advise");
  const [eggless, setEggless] = useState(false);
  const [note, setNote] = useState("");
  const [pickup, setPickup] = useState("Takeaway from Muddanahalli");
  const href = useMemo(() => createWhatsAppHref(item, size, eggless, note, pickup), [eggless, item, note, pickup, size]);
  return <section className="order-section section" id="custom-orders" data-testid="whatsapp-order-calculator"><div className="page-width order-grid"><div className="order-copy reveal"><span className="eyebrow eyebrow-light">{t("orderEyebrow")}</span><h2 className="section-title">{t("orderTitle")}</h2><p className="section-lede section-lede-light">{t("orderLead")}</p><div className="order-promise"><ShieldCheck size={19} /><span>{t("orderPromise")}</span></div></div><form className="order-form reveal" onSubmit={(event) => event.preventDefault()}><div className="form-heading"><span>{t("formHeading")}</span><span className="form-step">01—05</span></div><label className="form-field" htmlFor="cake-item"><span>{t("lookingFor")}</span><select id="cake-item" value={item} onChange={(event) => setItem(event.target.value)} data-testid="calc-flavor-select">{options.map((option) => <option key={option.id} value={option.name}>{localized(language, option.name, option.name_kn)}</option>)}</select></label><label className="form-field" htmlFor="cake-size"><span>{t("sizeQuantity")}</span><select id="cake-size" value={size} onChange={(event) => setSize(event.target.value)} data-testid="calc-weight-select"><option value="Please advise">{t("pleaseAdvise")}</option><option value="Small">{t("small")}</option><option value="Medium">{t("medium")}</option><option value="Large">{t("large")}</option><option value="Multiple items">{t("multipleItems")}</option></select></label><label className="check-field" htmlFor="eggless-cake"><input id="eggless-cake" type="checkbox" checked={eggless} onChange={(event) => setEggless(event.target.checked)} data-testid="calc-dietary-checkbox" /><span>{t("egglessOption")}</span></label><label className="form-field" htmlFor="cake-note"><span>{t("noteLabel")} <small>(optional)</small></span><input id="cake-note" value={note} onChange={(event) => setNote(event.target.value)} placeholder="e.g. 12 June · Happy Birthday" data-testid="calc-inscription-input" /></label><label className="form-field" htmlFor="pickup-point"><span>{t("receiveLabel")}</span><select id="pickup-point" value={pickup} onChange={(event) => setPickup(event.target.value)} data-testid="calc-location-select"><option value="Takeaway from Muddanahalli">{t("takeawayFrom")}</option><option value="I will ask about availability">{t("askAvailability")}</option></select></label><a className="button button-primary button-wide" href={href} target="_blank" rel="noreferrer" data-testid="calc-whatsapp-submit-btn"><Send size={17} /> {t("sendBrief")} <ArrowUpRight size={16} /></a><p className="form-footnote">{t("connectedTo")} {PHONE_LABEL}.</p></form></div></section>;
}

function ReviewsSection() {
  const { t, language } = useLanguage();
  return <section className="reviews-section section" id="reviews" data-testid="reviews-section"><div className="page-width"><div className="reviews-heading reveal"><div><span className="eyebrow eyebrow-light">{t("reviewsEyebrow")}</span><h2 className="section-title">{t("reviewsTitle")}</h2></div><div className="review-score" data-testid="review-rating"><strong>3.7</strong><div className="star-row" aria-label="3.7 out of 5 stars">{Array.from({ length: 5 }, (_, index) => <Star key={index} size={15} fill="currentColor" />)}</div><span data-testid="review-count">{t("reviewCount")}</span></div></div><div className="review-grid">{reviewData.map((review, index) => <article className="review-card reveal" style={{ transitionDelay: `${index * 90}ms` }} key={review.id} data-testid={review.id}><Quote size={27} className="quote-mark" /><p>“{language === "kn" ? review.quoteKn : review.quote}”</p><div className="review-author"><strong>{review.author}</strong><span>{language === "kn" ? review.detailKn : review.detail}</span></div></article>)}</div></div></section>;
}

function VisitSection() {
  const { t } = useLanguage();
  return <section className="visit-section section" id="visit" data-testid="ateliers-section"><div className="page-width visit-grid"><div className="visit-photo reveal"><img src="https://static.prod-images.emergentagent.com/jobs/97bc0cba-d75d-4760-9020-70de12137d5a/images/351ac4cb35b1252e3660c5f3a405631e9833834cf8f287732bdb920e5125afe8.jpeg" alt="Baker decorating a layered cake at the counter" /><div className="visit-photo-label">Cake World Bakery<br />Muddanahalli</div></div><div className="visit-copy reveal"><span className="eyebrow">{t("visitEyebrow")}</span><h2 className="section-title">{t("visitTitle")}</h2><p className="section-lede">{t("visitLead")}</p><div className="visit-details"><div className="detail-row" data-testid="visit-address"><MapPin size={19} /><span>{STORE_ADDRESS}</span></div><div className="detail-row" data-testid="visit-hours"><Clock3 size={19} /><span>{t("hours")}</span></div><div className="detail-row" data-testid="visit-phone"><Phone size={19} /><a href={`tel:+${PHONE_NUMBER}`} data-testid="visit-call-link">{PHONE_LABEL}</a></div></div><div className="visit-actions"><a className="button button-dark" href={MAPS_URL} target="_blank" rel="noreferrer" data-testid="visit-directions-link"><MapPin size={17} /> {t("directions")} <ArrowUpRight size={16} /></a><span className="takeaway-badge" data-testid="takeaway-badge"><Utensils size={15} /> {t("takeaway")}</span></div><div className="map-panel" data-testid="store-google-map"><div className="map-panel-header"><span>{t("mapLabel")}</span><a href={MAPS_URL} target="_blank" rel="noreferrer" data-testid="map-open-link">{t("directions")} <ArrowUpRight size={14} /></a></div><div className="map-embed"><span className="map-embed-accessible-label">{t("mapTitle")}</span><iframe title={t("mapTitle")} src={MAPS_EMBED_URL} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div></div></div></div></section>;
}

function Footer() {
  const { t } = useLanguage();
  const href = createWhatsAppHref("a cake or bakery favourite", t("pleaseAdvise"), false, "", t("takeawayFrom"));
  return <footer className="site-footer" data-testid="main-footer"><div className="page-width footer-inner"><div className="footer-top"><div><span className="eyebrow eyebrow-light">{t("footerEyebrow")}</span><h2 className="footer-brand-title" data-testid="footer-brand-title">Cake World<span>.</span></h2></div><div className="footer-copy"><p>{t("footerCopy")}</p><div className="footer-actions"><a className="footer-action-primary" href={href} target="_blank" rel="noreferrer" data-testid="footer-whatsapp-order-btn"><MessageCircle size={17} /> {t("chatWhatsApp")} <ArrowUpRight size={16} /></a><a className="footer-action-secondary" href={`tel:+${PHONE_NUMBER}`} data-testid="footer-phone-call-btn"><Phone size={17} /> {PHONE_LABEL}</a></div></div></div><div className="footer-bottom"><span>© 2026 Cake World Bakery · Bengaluru</span><span>{t("madeForGood")} <Heart size={13} fill="currentColor" /></span></div></div></footer>;
}

function MobileActionBar({ visible }: { visible: boolean }) {
  const { t } = useLanguage();
  const href = createWhatsAppHref("a cake or bakery favourite", t("pleaseAdvise"), false, "", t("takeawayFrom"));
  return <div className={`mobile-action-bar ${visible ? "is-visible" : ""}`} data-testid="mobile-action-bar"><a href={href} target="_blank" rel="noreferrer" data-testid="mobile-whatsapp-order-btn"><MessageCircle size={17} /> {t("orderOnWhatsapp")}</a><a href={`tel:+${PHONE_NUMBER}`} data-testid="mobile-call-btn"><Phone size={17} /></a></div>;
}

function useLiveMenu() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    apiGet<MenuItem[]>("/menu").then(setItems).catch(() => setError(true)).finally(() => setLoading(false));
  }, []);
  return { items, loading, error };
}

export default function HomeLive() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const menu = useLiveMenu();
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }), { threshold: 0.14 });
    document.querySelectorAll<HTMLElement>(".reveal").forEach((element) => observer.observe(element));
    const updateParallax = () => { setHasScrolled(window.scrollY > 320); document.documentElement.style.setProperty("--hero-shift", `${Math.min(window.scrollY * 0.08, 24)}px`); };
    window.addEventListener("scroll", updateParallax, { passive: true });
    updateParallax();
    return () => { observer.disconnect(); window.removeEventListener("scroll", updateParallax); document.documentElement.style.removeProperty("--hero-shift"); };
  }, []);
  return <div className="site-shell"><Header isOpen={menuOpen} onToggle={() => setMenuOpen((open) => !open)} onClose={() => setMenuOpen(false)} /><main><Hero /><Marquee /><Manifesto /><MenuSection {...menu} /><OrderStudio items={menu.items} /><ReviewsSection /><VisitSection /></main><Footer /><MobileActionBar visible={hasScrolled} /></div>;
}
