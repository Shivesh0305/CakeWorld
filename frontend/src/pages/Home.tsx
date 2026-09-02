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

const PHONE_NUMBER = "916362793729";
const PHONE_LABEL = "+91 63627 93729";
const STORE_ADDRESS =
  "416, Singanayakanahalli, Sree Sai Layout, Bengaluru, Muddanahalli, Karnataka 560119";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `Cake World Bakery, ${STORE_ADDRESS}`,
)}`;

const navLinks = [
  { label: "Menu", href: "#menu", testId: "nav-link-menu" },
  { label: "Our way", href: "#manifesto", testId: "nav-link-manifesto" },
  { label: "Custom cakes", href: "#custom-orders", testId: "nav-link-custom" },
  { label: "Visit", href: "#visit", testId: "nav-link-locations" },
  { label: "Reviews", href: "#reviews", testId: "nav-link-reviews" },
];

const marqueeItems = [
  "JUICES",
  "TEA",
  "SNACKS",
  "PUFFS",
  "COLD DRINKS",
  "CHOCOLATES",
  "CHAAT",
  "TAKEAWAY IN MUDDANAHALLI",
];

const chapters = [
  {
    number: "01",
    title: "Make it a moment",
    text: "From a birthday cake to a small treat on the way home, every order is made for a moment worth remembering.",
  },
  {
    number: "02",
    title: "Choose your kind",
    text: "Cakes, sweets, pastries and savoury favourites share the same counter, so there is always something for every craving.",
  },
  {
    number: "03",
    title: "Keep it personal",
    text: "Tell us what you are celebrating, how many people are coming and what you have in mind. We will help you choose.",
  },
  {
    number: "04",
    title: "Take it home warm",
    text: "Our Muddanahalli bakery is ready for takeaway when the craving cannot wait for another day.",
  },
];

type MenuItem = {
  id: string;
  category: string;
  name: string;
  description: string;
  note: string;
  image: string;
  alt: string;
};

const menuItems: MenuItem[] = [
  {
    id: "birthday-cakes",
    category: "Celebrations",
    name: "Birthday cakes",
    description: "A centrepiece for the candle moment, chosen with a little help from the people behind the counter.",
    note: "Made to order",
    image:
      "https://static.prod-images.emergentagent.com/jobs/97bc0cba-d75d-4760-9020-70de12137d5a/images/52644be104f165919bfcb32e68df3626d590ebea189b4e10485489bc28b7f7dc.jpeg",
    alt: "Dark chocolate celebration cake topped with cherries",
  },
  {
    id: "vanilla-berry",
    category: "Light & bright",
    name: "Vanilla berry cakes",
    description: "Soft layers, creamy finishes and fresh colour for celebrations that call for something lighter.",
    note: "Ask for today's options",
    image:
      "https://static.prod-images.emergentagent.com/jobs/97bc0cba-d75d-4760-9020-70de12137d5a/images/24e454598c599a4ca9f629ddf602d1d27f56236231ccbddb40cfe65094409e25.jpeg",
    alt: "Ivory frosted celebration cake with berries and flowers",
  },
  {
    id: "chocolate-pastries",
    category: "Rich & familiar",
    name: "Chocolate pastries",
    description: "Deep cocoa, generous cream and a little drama for the first forkful.",
    note: "Fresh counter picks",
    image:
      "https://static.prod-images.emergentagent.com/jobs/97bc0cba-d75d-4760-9020-70de12137d5a/images/35788acdcfcb35d2d7dc3406fa8baf3fefe82024b89ac7c154c8e1f48df14e1b.jpeg",
    alt: "Chocolate cake slice with cream layers and a cherry",
  },
  {
    id: "custom-cake-help",
    category: "Behind the counter",
    name: "Tell us the occasion",
    description: "Share the date, the size and the mood. We will help you find the right cake for the room.",
    note: "Chat with the bakery",
    image:
      "https://static.prod-images.emergentagent.com/jobs/97bc0cba-d75d-4760-9020-70de12137d5a/images/351ac4cb35b1252e3660c5f3a405631e9833834cf8f287732bdb920e5125afe8.jpeg",
    alt: "Baker piping cream onto a layered celebration cake",
  },
];

type CounterCategory = {
  id: string;
  name: string;
  description: string;
  marker: string;
  image: string;
  alt: string;
};

const counterCategories: CounterCategory[] = [
  {
    id: "juices",
    name: "Juices",
    description: "Bright, refreshing pours for a quick lift or a slow afternoon.",
    marker: "01",
    image: "https://static.prod-images.emergentagent.com/jobs/97bc0cba-d75d-4760-9020-70de12137d5a/images/356b1c9c3a5221d620e7f3676606efb7bbf131d927d9c7000f8306141a3e5728.jpeg",
    alt: "Fresh orange juice on a bakery counter",
  },
  {
    id: "tea",
    name: "Tea",
    description: "A familiar hot cup for the pause between one thing and the next.",
    marker: "02",
    image: "https://static.prod-images.emergentagent.com/jobs/97bc0cba-d75d-4760-9020-70de12137d5a/images/d6c2dc69c7800506853f8869241303f8fe3a4e0d81132054726a4cea294bb027.jpeg",
    alt: "Steaming Indian tea in a glass",
  },
  {
    id: "snacks",
    name: "Snacks",
    description: "Easy bakery-counter bites when you want something savoury.",
    marker: "03",
    image: "https://static.prod-images.emergentagent.com/jobs/97bc0cba-d75d-4760-9020-70de12137d5a/images/de8506b20ef1cef019639d9fea59992701bb86e2cadc5dc4951bdd904e0702f3.jpeg",
    alt: "Assorted savoury bakery snacks on a plate",
  },
  {
    id: "puffs",
    name: "Puffs",
    description: "Flaky, warm and made for the first bite on the way home.",
    marker: "04",
    image: "https://static.prod-images.emergentagent.com/jobs/97bc0cba-d75d-4760-9020-70de12137d5a/images/1e6d28b50b266ad6889ecab5f0d3c0d96df670580381eea4f577b161f44c92ec.jpeg",
    alt: "Golden flaky vegetable puffs",
  },
  {
    id: "cold-drinks",
    name: "Cold drinks",
    description: "Chilled favourites to pair with a pastry, puff or chaat.",
    marker: "05",
    image: "https://static.prod-images.emergentagent.com/jobs/97bc0cba-d75d-4760-9020-70de12137d5a/images/fbdcd95bc47e7401ed99f29015040f684dbfcb47663406709ac5ea4a87f3eb54.jpeg",
    alt: "Chilled lemon soda with ice and citrus",
  },
  {
    id: "chocolates",
    name: "Chocolates",
    description: "A little cocoa comfort, wrapped up for gifting or keeping.",
    marker: "06",
    image: "https://static.prod-images.emergentagent.com/jobs/97bc0cba-d75d-4760-9020-70de12137d5a/images/7e7889a38a0e11cab2697987a1e9b70498228a09560ca3e70d463d3fa10ab941.jpeg",
    alt: "Handmade chocolate truffles on a plate",
  },
  {
    id: "chaat",
    name: "Chaat",
    description: "Tangy, crunchy and full of the kind of flavour that wakes you up.",
    marker: "07",
    image: "https://static.prod-images.emergentagent.com/jobs/97bc0cba-d75d-4760-9020-70de12137d5a/images/aef9f88f5600ba746e764fb6bdc352670b620e98d0b2acf9a60b3f8a13ef41d1.jpeg",
    alt: "Colorful Indian chaat with sev and chutney",
  },
];


const reviews = [
  {
    id: "review-item-01",
    author: "Seenu Singh",
    detail: "Local Guide · a year ago",
    quote:
      "Absolutely loved the cake from Cake World Bakery! The design was beautiful, just like I wanted, and the taste was even better – fresh, soft, and perfectly sweet.",
  },
  {
    id: "review-item-02",
    author: "Deepak A",
    detail: "Local Guide · 2 years ago",
    quote: "Nice Place variety Of Cakes sweets and snacks. Good Tast.",
  },
  {
    id: "review-item-03",
    author: "A happy regular",
    detail: "Customer review",
    quote: "Taste and yummy nice food.....",
  },
];

function createWhatsAppHref(
  item: string,
  size: string,
  eggless: boolean,
  note: string,
  pickup = "",
) {
  const message = [
    "Hello Cake World Bakery!",
    `I would like to enquire about: ${item}.`,
    `Size or quantity: ${size}.`,
    `Eggless preference: ${eggless ? "Yes" : "No preference"}.`,
    note.trim() ? `Message or date: ${note.trim()}.` : "",
    pickup.trim() ? `Pickup: ${pickup}.` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}

function Header({ isOpen, onToggle, onClose }: { isOpen: boolean; onToggle: () => void; onClose: () => void }) {
  return (
    <header className="site-header" data-testid="main-navigation-bar">
      <div className="header-inner">
        <a className="brand-link" href="#home" data-testid="brand-logo-link" onClick={onClose}>
          <img className="brand-logo" src="https://customer-assets-cm19k8pv.emergentagent.net/job_pastry-paradise-178/artifacts/6gq4l6zx_image.png" alt="Cake World Bakery logo" data-testid="bakery-logo" />
          <span className="brand-lockup">
            <span className="brand-name">Cake World<span>.</span></span>
            <span className="brand-subtitle">Bakery · Bengaluru</span>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} data-testid={link.testId}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a
            className="header-directions-link"
            href={MAPS_URL}
            target="_blank"
            rel="noreferrer"
            data-testid="nav-directions-cta"
          >
            <MapPin size={15} strokeWidth={1.8} /> Directions
          </a>
          <a
            className="header-order-link"
            href={createWhatsAppHref("a birthday cake", "Please advise", false, "")}
            target="_blank"
            rel="noreferrer"
            data-testid="nav-whatsapp-cta"
          >
            <MessageCircle size={15} strokeWidth={1.8} /> Order on WhatsApp
          </a>
          <button
            className="mobile-menu-toggle"
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            onClick={onToggle}
            data-testid="mobile-menu-toggle"
          >
            {isOpen ? <X size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </div>
      <nav
        className={`mobile-nav ${isOpen ? "is-open" : ""}`}
        id="mobile-navigation"
        aria-label="Mobile navigation"
      >
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} data-testid={`mobile-${link.testId}`} onClick={onClose}>
            {link.label}
            <ChevronRight size={16} />
          </a>
        ))}
        <a
          className="mobile-nav-directions"
          href={MAPS_URL}
          target="_blank"
          rel="noreferrer"
          data-testid="mobile-nav-directions-cta"
          onClick={onClose}
        >
          Directions <MapPin size={16} />
        </a>
        <a
          className="mobile-nav-order"
          href={createWhatsAppHref("a birthday cake", "Please advise", false, "")}
          target="_blank"
          rel="noreferrer"
          data-testid="mobile-nav-whatsapp-cta"
          onClick={onClose}
        >
          Order on WhatsApp <ArrowUpRight size={16} />
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  const heroHref = createWhatsAppHref("a birthday cake", "Please advise", false, "");

  return (
    <section className="hero-section" id="home" data-testid="hero-section">
      <div className="page-width hero-grid">
        <div className="hero-copy">
          <div className="eyebrow eyebrow-light" data-testid="live-baking-status-badge">
            <span className="status-dot" /> Open today · takeaway ready
          </div>
          <h1 className="hero-title" data-testid="hero-headline">
            <span className="hero-line">A little more</span>
            <span className="hero-line">sweetness for</span>
            <span className="hero-line">every moment.</span>
          </h1>
          <p className="hero-description" data-testid="hero-subheading">
            Cake World Bakery is your neighbourhood stop for celebration cakes, pastries, sweets and savoury bites in Muddanahalli, Bengaluru.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href={heroHref} target="_blank" rel="noreferrer" data-testid="hero-whatsapp-order-btn">
              <MessageCircle size={18} /> Order fresh on WhatsApp <ArrowUpRight size={17} />
            </a>
            <a className="button button-secondary-dark" href={`tel:+${PHONE_NUMBER}`} data-testid="hero-direct-call-btn">
              <Phone size={17} /> Call the bakery
            </a>
          </div>
          <div className="hero-delivery-note" data-testid="free-delivery-banner">
            <span className="delivery-note-icon"><MapPin size={16} /></span>
            <span className="delivery-note-copy"><strong>Free delivery within 4 km</strong><small>Bring the celebration closer.</small></span>
          </div>
          <div className="hero-footnote">
            <span><Heart size={14} fill="currentColor" /> Made for the people you love</span>
            <a href="#menu" data-testid="hero-scroll-menu-link">See the menu <ArrowDown size={15} /></a>
          </div>
        </div>
        <figure className="hero-figure">
          <div className="hero-image-frame">
            <img
              src="https://static.prod-images.emergentagent.com/jobs/97bc0cba-d75d-4760-9020-70de12137d5a/images/52644be104f165919bfcb32e68df3626d590ebea189b4e10485489bc28b7f7dc.jpeg"
              alt="Dark chocolate celebration cake topped with cherries"
              className="hero-image"
              data-testid="hero-cake-image"
            />
            <span className="image-corner-note">01 / signature cake</span>
          </div>
          <figcaption className="hero-caption">
            <span>Rich layers. Soft centres. A reason to gather.</span>
            <span className="hero-caption-location">MUDDANAHALLI, BLR</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function Marquee() {
  const repeatedItems = [...marqueeItems, ...marqueeItems];

  return (
    <section className="marquee-window" data-testid="editorial-marquee-ribbon" aria-label="Bakery highlights">
      <div className="marquee-track">
        {repeatedItems.map((item, index) => (
          <span className="marquee-item" key={`${item}-${index}`}>
            {item} <b>✦</b>
          </span>
        ))}
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="manifesto-section section" id="manifesto" data-testid="manifesto-section">
      <div className="page-width">
        <div className="section-intro reveal">
          <span className="eyebrow">The bakehouse way</span>
          <h2 className="section-title">Good things deserve a little ceremony.</h2>
          <p className="section-lede">
            A bakery is more than a counter. It is the place you stop before the party, after a long day, or whenever a small sweet can change the mood.
          </p>
        </div>
        <div className="manifesto-grid">
          {chapters.map((chapter, index) => (
            <article
              className="manifesto-chapter reveal"
              style={{ transitionDelay: `${index * 90}ms` }}
              key={chapter.number}
              data-testid={`manifesto-chapter-${chapter.number}`}
            >
              <span className="chapter-number">{chapter.number}</span>
              <h3>{chapter.title}</h3>
              <p>{chapter.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  const href = createWhatsAppHref(item.name, "Please advise", false, "");

  return (
    <article
      className={`menu-card reveal ${index === 0 ? "menu-card-featured" : ""}`}
      style={{ transitionDelay: `${index * 80}ms` }}
      data-testid={`cake-card-${item.id}`}
    >
      <div className="menu-image-wrap">
        <img src={item.image} alt={item.alt} className="menu-image" />
        <span className="menu-image-index">0{index + 1}</span>
      </div>
      <div className="menu-card-body">
        <div className="menu-card-meta">
          <span>{item.category}</span>
          <span>{item.note}</span>
        </div>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <a className="text-link" href={href} target="_blank" rel="noreferrer" data-testid={`menu-order-${item.id}`}>
          Ask about this <ArrowUpRight size={16} />
        </a>
      </div>
    </article>
  );
}

function CounterCategoryCard({ item, index }: { item: CounterCategory; index: number }) {
  const href = createWhatsAppHref(item.name, "Please advise", false, "");

  return (
    <article
      className={`category-card reveal ${index === 0 ? "category-card-featured" : ""}`}
      style={{ transitionDelay: `${index * 70}ms` }}
      data-testid={`counter-category-${item.id}`}
    >
      <div className="category-image-wrap">
        <img src={item.image} alt={item.alt} className="category-image" />
        <span className="category-image-index">{item.marker}</span>
      </div>
      <div className="category-card-body">
        <div className="category-card-meta">
          <span>Counter pick</span>
          <span>Ask today</span>
        </div>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <a href={href} target="_blank" rel="noreferrer" data-testid={`counter-category-order-${item.id}`}>
          <MessageCircle size={15} /> Ask on WhatsApp <ArrowUpRight size={16} />
        </a>
      </div>
    </article>
  );
}

function MenuSection() {
  return (
    <section className="menu-section section" id="menu" data-testid="signature-menu-section">
      <div className="page-width">
        <div className="section-intro section-intro-wide reveal">
          <span className="eyebrow">From the counter</span>
          <h2 className="section-title">Find your favourite thing today.</h2>
          <p className="section-lede">
            Start with the classics, then scan the everyday counter. For exact availability or a custom cake, send the bakery a message before you visit.
          </p>
        </div>
        <div className="menu-grid">
          {menuItems.map((item, index) => <MenuCard item={item} index={index} key={item.id} />)}
        </div>
        <div className="category-heading reveal">
          <div>
            <span className="eyebrow">Everyday favourites</span>
            <h3>Something for the in-between moments.</h3>
          </div>
          <span className="category-heading-note">Ask about today's availability</span>
        </div>
        <div className="category-grid">
          {counterCategories.map((item, index) => <CounterCategoryCard item={item} index={index} key={item.id} />)}
        </div>
      </div>
    </section>
  );
}

function OrderStudio() {
  const [item, setItem] = useState("Birthday cake");
  const [size, setSize] = useState("Please advise");
  const [eggless, setEggless] = useState(false);
  const [note, setNote] = useState("");
  const [pickup, setPickup] = useState("Takeaway from Muddanahalli");
  const href = useMemo(() => createWhatsAppHref(item, size, eggless, note, pickup), [eggless, item, note, pickup, size]);

  return (
    <section className="order-section section" id="custom-orders" data-testid="whatsapp-order-calculator">
      <div className="page-width order-grid">
        <div className="order-copy reveal">
          <span className="eyebrow eyebrow-light">The easy part</span>
          <h2 className="section-title">Tell us what you are celebrating.</h2>
          <p className="section-lede section-lede-light">
            Choose a starting point and send a quick brief. The bakery team can help with flavour, size, availability and the little details that make it yours.
          </p>
          <div className="order-promise">
            <ShieldCheck size={19} />
            <span>No payment here. Just a clear WhatsApp enquiry to get the conversation started.</span>
          </div>
        </div>
        <form className="order-form reveal" onSubmit={(event) => event.preventDefault()}>
          <div className="form-heading">
            <span>Quick cake brief</span>
            <span className="form-step">01—05</span>
          </div>
          <label className="form-field" htmlFor="cake-item">
            <span>What are you looking for?</span>
            <select id="cake-item" value={item} onChange={(event) => setItem(event.target.value)} data-testid="calc-flavor-select">
              <option>Birthday cake</option>
              <option>Chocolate cake</option>
              <option>Vanilla berry cake</option>
              <option>Pastries or sweets</option>
              <option>Juices</option>
              <option>Tea</option>
              <option>Snacks</option>
              <option>Puffs</option>
              <option>Cold drinks</option>
              <option>Chocolates</option>
              <option>Chaat</option>
            </select>
          </label>
          <label className="form-field" htmlFor="cake-size">
            <span>Size or quantity</span>
            <select id="cake-size" value={size} onChange={(event) => setSize(event.target.value)} data-testid="calc-weight-select">
              <option>Please advise</option>
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
              <option>Multiple items</option>
            </select>
          </label>
          <label className="check-field" htmlFor="eggless-cake">
            <input id="eggless-cake" type="checkbox" checked={eggless} onChange={(event) => setEggless(event.target.checked)} data-testid="calc-dietary-checkbox" />
            <span>I would like an eggless option</span>
          </label>
          <label className="form-field" htmlFor="cake-note">
            <span>Date, message or extra detail <small>(optional)</small></span>
            <input id="cake-note" value={note} onChange={(event) => setNote(event.target.value)} placeholder="e.g. 12 June · Happy Birthday" data-testid="calc-inscription-input" />
          </label>
          <label className="form-field" htmlFor="pickup-point">
            <span>How would you like to receive it?</span>
            <select id="pickup-point" value={pickup} onChange={(event) => setPickup(event.target.value)} data-testid="calc-location-select">
              <option>Takeaway from Muddanahalli</option>
              <option>I will ask about availability</option>
            </select>
          </label>
          <a className="button button-primary button-wide" href={href} target="_blank" rel="noreferrer" data-testid="calc-whatsapp-submit-btn">
            <Send size={17} /> Send this brief on WhatsApp <ArrowUpRight size={16} />
          </a>
          <p className="form-footnote">You will be connected to {PHONE_LABEL}.</p>
        </form>
      </div>
    </section>
  );
}

function ReviewsSection() {
  return (
    <section className="reviews-section section" id="reviews" data-testid="reviews-section">
      <div className="page-width">
        <div className="reviews-heading reveal">
          <div>
            <span className="eyebrow eyebrow-light">From the review counter</span>
            <h2 className="section-title">The sweet word on the street.</h2>
          </div>
          <div className="review-score" data-testid="review-rating">
            <strong>3.7</strong>
            <div className="star-row" aria-label="3.7 out of 5 stars">
              {Array.from({ length: 5 }, (_, index) => <Star key={index} size={15} fill="currentColor" />)}
            </div>
            <span data-testid="review-count">75 reviews</span>
          </div>
        </div>
        <div className="review-grid">
          {reviews.map((review, index) => (
            <article className="review-card reveal" style={{ transitionDelay: `${index * 90}ms` }} key={review.id} data-testid={review.id}>
              <Quote size={27} className="quote-mark" />
              <p>“{review.quote}”</p>
              <div className="review-author">
                <strong>{review.author}</strong>
                <span>{review.detail}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function VisitSection() {
  return (
    <section className="visit-section section" id="visit" data-testid="ateliers-section">
      <div className="page-width visit-grid">
        <div className="visit-photo reveal">
          <img src={menuItems[3].image} alt="Baker decorating a layered cake at the counter" />
          <div className="visit-photo-label">Cake World Bakery<br />Muddanahalli</div>
        </div>
        <div className="visit-copy reveal">
          <span className="eyebrow">Come by for a bite</span>
          <h2 className="section-title">Find us when the craving calls.</h2>
          <p className="section-lede">Pick up a cake, take away something savoury, or stop in for the sweet thing you did not plan to buy.</p>
          <div className="visit-details">
            <div className="detail-row" data-testid="visit-address">
              <MapPin size={19} />
              <span>{STORE_ADDRESS}</span>
            </div>
            <div className="detail-row" data-testid="visit-hours">
              <Clock3 size={19} />
              <span>Open · closes 10:30 pm</span>
            </div>
            <div className="detail-row" data-testid="visit-phone">
              <Phone size={19} />
              <a href={`tel:+${PHONE_NUMBER}`} data-testid="visit-call-link">{PHONE_LABEL}</a>
            </div>
          </div>
          <div className="visit-actions">
            <a className="button button-dark" href={MAPS_URL} target="_blank" rel="noreferrer" data-testid="visit-directions-link">
              <MapPin size={17} /> Get directions <ArrowUpRight size={16} />
            </a>
            <span className="takeaway-badge" data-testid="takeaway-badge"><Utensils size={15} /> Takeaway available</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const href = createWhatsAppHref("a cake or bakery favourite", "Please advise", false, "");

  return (
    <footer className="site-footer" data-testid="main-footer">
      <div className="page-width footer-inner">
        <div className="footer-top">
          <div>
            <span className="eyebrow eyebrow-light">Leave room for dessert</span>
            <h2 className="footer-brand-title" data-testid="footer-brand-title">Cake World<span>.</span></h2>
          </div>
          <div className="footer-copy">
            <p>Good cakes, familiar favourites and a reason to come back tomorrow.</p>
            <div className="footer-actions">
              <a className="footer-action-primary" href={href} target="_blank" rel="noreferrer" data-testid="footer-whatsapp-order-btn"><MessageCircle size={17} /> Chat on WhatsApp <ArrowUpRight size={16} /></a>
              <a className="footer-action-secondary" href={`tel:+${PHONE_NUMBER}`} data-testid="footer-phone-call-btn"><Phone size={17} /> {PHONE_LABEL}</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Cake World Bakery · Bengaluru</span>
          <span>Made for the good stuff <Heart size={13} fill="currentColor" /></span>
        </div>
      </div>
    </footer>
  );
}

function MobileActionBar({ visible }: { visible: boolean }) {
  const href = createWhatsAppHref("a cake or bakery favourite", "Please advise", false, "");

  return (
    <div className={`mobile-action-bar ${visible ? "is-visible" : ""}`} data-testid="mobile-action-bar">
      <a href={href} target="_blank" rel="noreferrer" data-testid="mobile-whatsapp-order-btn"><MessageCircle size={17} /> WhatsApp</a>
      <a href={`tel:+${PHONE_NUMBER}`} data-testid="mobile-call-btn"><Phone size={17} /></a>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 },
    );
    document.querySelectorAll<HTMLElement>(".reveal").forEach((element) => observer.observe(element));

    const updateParallax = () => {
      setHasScrolled(window.scrollY > 320);
      document.documentElement.style.setProperty("--hero-shift", `${Math.min(window.scrollY * 0.08, 24)}px`);
    };
    window.addEventListener("scroll", updateParallax, { passive: true });
    updateParallax();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateParallax);
      document.documentElement.style.removeProperty("--hero-shift");
    };
  }, []);

  return (
    <div className="site-shell">
      <Header isOpen={menuOpen} onToggle={() => setMenuOpen((open) => !open)} onClose={() => setMenuOpen(false)} />
      <main>
        <Hero />
        <Marquee />
        <Manifesto />
        <MenuSection />
        <OrderStudio />
        <ReviewsSection />
        <VisitSection />
      </main>
      <Footer />
      <MobileActionBar visible={hasScrolled} />
    </div>
  );
}
