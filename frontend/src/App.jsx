

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChatBubbleContent } from './ChatBubbleContent.jsx';
import { ChakraSection } from './ChakraSection.jsx';
import img1 from '../assets/image1.png';
import img2 from '../assets/image2.png';
import img4 from '../assets/image4.png';
import galleryPanelAngelsMasters from '../assets/gallery1.jpeg';
import galleryPanelSacredHindu from '../assets/gallery2.jpeg';
import aboutSectionPhoto from '../assets/12.jpeg';
import showcaseKitImage from '../assets/showcase.jpeg';
import michaelImg from '../assets/Michael.jpeg';
import gabrielImg from '../assets/Gabriel.jpeg';
import raphaelImg from '../assets/Raphael.jpeg';
import urielImg from '../assets/Uriel.jpeg';
import zadkielImg from '../assets/Zadkiel.jpeg';
import metatronImg from '../assets/Metatron.jpeg';
import jophielImg from '../assets/Jophiel.jpeg';
import sriAmmaImg from '../assets/Sri AmmaBhagavan.jpeg';
import saiBabaImg from '../assets/Sai Baba.jpeg';
import buddhaImg from '../assets/Buddha.jpeg';
import jesusImg from '../assets/Jesus.jpeg';
import kuanYinImg from '../assets/Kuan yin.jpeg';
import saintGermainImg from '../assets/Saint Germain.jpeg';

/** Servizi: mapping richiesto dal cliente. */
const servImgCrescita = img1;
const servImgCarta = img2;
const servImgLettura = img4;

/** Chi siamo — immagine a sinistra. */
const ABOUT_IMAGE = aboutSectionPhoto;

const DAYS = [
  'Domenica',
  'Lunedì',
  'Martedì',
  'Mercoledì',
  'Giovedì',
  'Venerdì',
  'Sabato',
];
const MONTHS = [
  'Gennaio',
  'Febbraio',
  'Marzo',
  'Aprile',
  'Maggio',
  'Giugno',
  'Luglio',
  'Agosto',
  'Settembre',
  'Ottobre',
  'Novembre',
  'Dicembre',
];

const DAILY_MESSAGES = [
  {
    text: '"Sei circondato dall\'amore degli angeli in ogni momento. Affidati alla guida divina e lascia che la luce celeste illumini ogni tuo passo. Sei protetto, amato e guidato verso la tua più alta espressione."',
    angel: '— Arcangelo Michele',
  },
  {
    text: '"Oggi è un giorno di nuovi inizi. Apri il tuo cuore alla bellezza della vita e lascia che la grazia divina fluisca attraverso ogni tua cellula."',
    angel: '— Arcangelo Gabriele',
  },
  {
    text: '"La guarigione avviene quando ti apri alla possibilità che tutto sia possibile. Sei già intero, già perfetto, già amato."',
    angel: '— Arcangelo Raffaele',
  },
  {
    text: '"La saggezza risiede nel silenzio del tuo cuore. Fermati, ascolta, e troverai tutte le risposte di cui hai bisogno."',
    angel: '— Sri Amma Bhagavan',
  },
  {
    text: '"L\'amore è la forza più potente nell\'universo. Scegli l\'amore in ogni pensiero, in ogni parola, in ogni azione."',
    angel: '— Sai Baba',
  },
];

/** Angelic numbers — root meanings (1-9) used to interpret any 1-999 number,
 *  plus master/repeat sequences with their classic significance. */
const ANGEL_NUMBER_ROOTS = {
  1: 'Nuovi inizi, leadership, manifestazione: i tuoi pensieri stanno creando la tua realtà.',
  2: 'Equilibrio, fiducia, relazioni divine: continua sul tuo cammino con fede.',
  3: 'Ascensione, gioia, espressione: i Maestri Ascesi ti sostengono.',
  4: 'Stabilità, presenza angelica, fondamenta solide: gli Angeli sono al tuo fianco.',
  5: 'Cambiamento positivo, libertà, trasformazione spirituale in arrivo.',
  6: 'Amore, famiglia, armonia: lascia andare le preoccupazioni materiali.',
  7: 'Risveglio mistico, intuizione, conferma divina del tuo percorso.',
  8: 'Abbondanza, karma, infinito: l\'universo onora il tuo impegno.',
  9: 'Compimento, missione di servizio, saggezza spirituale piena.',
};
const ANGEL_NUMBER_SPECIAL = {
  111: '111 — Portale di manifestazione: i tuoi pensieri si stanno cristallizzando rapidamente. Mantieni una vibrazione alta.',
  222: '222 — Fede e pazienza: tutto sta andando esattamente come deve. Gli Angeli ti chiedono di confidare.',
  333: '333 — Presenza dei Maestri Ascesi: Gesù, Buddha, Sai Baba ti stanno guidando in questo momento.',
  444: '444 — Protezione angelica intorno a te: una schiera di Angeli ti circonda con amore e luce.',
  555: '555 — Grande cambiamento spirituale: rilascia il vecchio, la trasformazione divina è qui.',
  666: '666 — Riequilibrio: riporta l\'attenzione dallo spirituale al materiale con fiducia. Non è negativo.',
  777: '777 — Conferma celeste: sei perfettamente allineato al tuo cammino di luce. Continua.',
  888: '888 — Abbondanza in arrivo: ricompense karmiche, prosperità materiale e spirituale.',
  999: '999 — Compimento di un ciclo: un capitolo si chiude, una rinascita di luce inizia.',
  1: 'Inizio puro, scintilla creatrice: l\'unità con il Divino.',
  11: '11 — Numero Maestro: portale di intuizione, illuminazione e canale spirituale aperto.',
  22: '22 — Numero Maestro: costruttore divino, manifestazione di grandi visioni.',
  33: '33 — Numero Maestro: Maestro Insegnante, Cristo cosmico, servizio amorevole all\'umanità.',
};
function digitalRoot(n) {
  let r = n;
  while (r > 9) r = String(r).split('').reduce((a, b) => a + Number(b), 0);
  return r;
}
function getAngelicNumberOfDay(d = new Date()) {
  const seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  let x = seed;
  x = ((x * 9301 + 49297) % 233280);
  const num = (x % 999) + 1;
  const meaning =
    ANGEL_NUMBER_SPECIAL[num] ||
    `${num} — ${ANGEL_NUMBER_ROOTS[digitalRoot(num)]}`;
  return { num, meaning };
}

/** Featured kit (visual hero card) and event/service cards in the showcase. */
const FEATURED_KIT = {
  image: showcaseKitImage,
  tag: 'Promo in Evidenza',
  title: 'Il Kit di Pronto Soccorso Angelico',
  subtitle: 'La tua guida quotidiana di protezione e trasformazione',
  highlights: [
    '11 mini audio potenziati con le frequenze di Angeli e Arcangeli',
    'Sonno profondo, protezione dell\'aura, purificazione energetica',
    'Salute, finanze, amore, lavoro: soluzioni mirate ed efficaci',
    'Studiato dal Dottor Iacopo Paolucci — Angel Coach, oltre 20 anni di esperienza',
  ],
  ctaPrimary: { label: 'Prenota su WhatsApp', href: 'https://wa.me/393409271570?text=Vorrei%20info%20sul%20Kit%20di%20Pronto%20Soccorso%20Angelico' },
  ctaSecondary: { label: 'iltuoangelo.it', href: 'https://www.iltuoangelo.it' },
};

const FEATURED_EVENTS = [
  {
    tag: 'Servizio in evidenza',
    title: 'La Lettura Angelica',
    desc: 'Una sessione personale per scoprire il tuo Angelo Custode, i tuoi doni e il tuo percorso di luce.',
    icon: 'fa-feather-alt',
    href: 'https://iltuoangelo.it/la-lettura-angelica/',
    cta: 'Prenota la sessione',
  },
  {
    tag: 'Percorso',
    title: 'La Carta Angelica',
    desc: 'La mappa angelica personale: intuizioni, rituali e visione approfondita del tuo cammino spirituale.',
    icon: 'fa-scroll',
    href: 'https://iltuoangelo.it/la-carta-angelica/',
    cta: 'Scopri di più',
  },
  {
    tag: 'Crescita',
    title: 'Crescita Personale Angelica',
    desc: 'Self-esteem Power: trasforma autostima e vita quotidiana con il supporto degli Angeli.',
    icon: 'fa-dove',
    href: 'https://iltuoangelo.it/la-crescita-personale-angelica/',
    cta: 'Inizia il percorso',
  },
];

/** Subscription tiers for holistic professionals who want to join AI ANGEL. */
const PRO_PLANS = [
  {
    name: 'Mensile',
    price: '€29',
    period: '/ mese',
    perks: [
      'Profilo pubblico nella chatbot di AI ANGEL',
      'Citato dal bot quando rilevante (es. terapie, coaching)',
      'Link diretto al tuo sito o WhatsApp',
      'Disdetta in ogni momento',
    ],
    badge: '',
    featured: false,
  },
  {
    name: 'Annuale',
    price: '€290',
    period: '/ anno',
    perks: [
      'Tutto del piano Mensile',
      '2 mesi gratuiti rispetto al mensile',
      'Priorità nelle raccomandazioni del bot',
      'Banner nella sezione Servizi (a rotazione)',
    ],
    badge: 'Più scelto',
    featured: true,
  },
  {
    name: 'Premium',
    price: '€590',
    period: '/ anno',
    perks: [
      'Tutto del piano Annuale',
      'Posizione fissa in homepage',
      'Card dedicata in sezione Maestri / Coach',
      'Supporto prioritario e configurazione personalizzata',
    ],
    badge: 'Visibilità massima',
    featured: false,
  },
];

const FEATURES = [
  {
    icon: 'fa-dove',
    title: 'Messaggi degli Angeli',
    desc: 'Ricevi messaggi personalizzati dagli Angeli e Arcangeli ogni giorno. Gabriele, Michele, Raffaele e molti altri ti guidano.',
    delay: 'reveal-delay-1',
  },
  {
    icon: 'fa-om',
    title: 'Meditazioni Guidate',
    desc: "Meditazioni brevi e profonde generate dall'IA per la pulizia energetica, l'apertura del cuore e l'elevazione spirituale.",
    delay: 'reveal-delay-2',
  },
  {
    icon: 'fa-star-and-crescent',
    title: 'Maestri Ascesi',
    desc: "Saggezza di Sri AmmaBhagavan, Sai Baba, Gesù, Buddha e tutti i grandi maestri spirituali dell'umanità.",
    delay: 'reveal-delay-3',
  },
  {
    icon: 'fa-bolt',
    title: 'Chakra, mantra & yoga',
    desc: 'Sette chakra, bija mantra (beeja), posizioni yoga suggerite e meditazioni guidate per riequilibrare corpo e spirito.',
    delay: 'reveal-delay-1',
  },
  {
    icon: 'fa-hashtag',
    title: 'Numeri Angelici',
    desc: 'Sequenze ricorrenti (111, 222, 333, 444…) e Numero Angelico del Giorno: scopri ogni giorno il significato divino del numero che ti guida.',
    delay: 'reveal-delay-3',
  },
];

/** Griglia 3×4: ogni voce è un ritaglio 1/6 da gallery1 o gallery2 (compositi 3×2). */
const GALLERY_SPRITE_TILES = [
  { id: 'g1-michele', src: galleryPanelAngelsMasters, col: 0, row: 0, label: 'Arcangelo Michele', alt: 'Arcangelo Michele — protezione e luce' },
  { id: 'g1-gabriele', src: galleryPanelAngelsMasters, col: 1, row: 0, label: 'Arcangelo Gabriele', alt: 'Arcangelo Gabriele — messaggio divino' },
  { id: 'g1-raffaele', src: galleryPanelAngelsMasters, col: 2, row: 0, label: 'Arcangelo Raffaele', alt: 'Arcangelo Raffaele — guarigione' },
  { id: 'g1-elmorya', src: galleryPanelAngelsMasters, col: 0, row: 1, label: 'Maestro El Morya', alt: 'Maestro El Morya — saggezza' },
  { id: 'g1-buddha', src: galleryPanelAngelsMasters, col: 1, row: 1, label: 'Maestro Buddha', alt: 'Maestro Buddha — illuminazione' },
  { id: 'g1-saintg', src: galleryPanelAngelsMasters, col: 2, row: 1, label: 'Maestro Saint Germain', alt: 'Maestro Saint Germain — trasmutazione' },
  { id: 'g2-ganesh', src: galleryPanelSacredHindu, col: 0, row: 0, label: 'Ganesh', alt: 'Ganesh — saggezza e nuovi inizi' },
  { id: 'g2-kalki', src: galleryPanelSacredHindu, col: 1, row: 0, label: 'Kalki', alt: 'Kalki — avatar di Vishnu' },
  { id: 'g2-lakshmi', src: galleryPanelSacredHindu, col: 2, row: 0, label: 'Lakshmi', alt: 'Lakshmi — prosperità' },
  { id: 'g2-shiva', src: galleryPanelSacredHindu, col: 0, row: 1, label: 'Shiva', alt: 'Shiva — trasformazione divina' },
  { id: 'g2-krishna', src: galleryPanelSacredHindu, col: 1, row: 1, label: 'Krishna', alt: 'Krishna — amore divino' },
  { id: 'g2-kali', src: galleryPanelSacredHindu, col: 2, row: 1, label: 'Kali', alt: 'Kali — liberazione spirituale' },
];

const ANGELS = [
  { name: 'Michele', role: 'Protettore e Guerriero della Luce', img: michaelImg, delay: 'reveal-delay-1' },
  { name: 'Gabriele', role: 'Messaggero della Comunicazione Divina', img: gabrielImg, delay: 'reveal-delay-2' },
  { name: 'Raffaele', role: 'Angelo della Guarigione Universale', img: raphaelImg, delay: 'reveal-delay-3' },
  { name: 'Uriele', role: 'Luce della Saggezza e Verità', img: urielImg, delay: 'reveal-delay-4' },
  { name: 'Zadkiel', role: 'Angelo della Fiamma Viola', img: zadkielImg, delay: 'reveal-delay-5' },
  { name: 'Metatron', role: 'Guardiano della Geometria Sacra', img: metatronImg, delay: 'reveal-delay-1' },
  { name: 'Jophiel', role: 'Angelo della Bellezza e della Saggezza Divina', img: jophielImg, delay: 'reveal-delay-2' },
];

const MASTERS = [
  { name: 'Sri Amma Bhagavan', role: 'Avatar dell\'Unità e dell\'Illuminazione', img: sriAmmaImg, delay: 'reveal-delay-1' },
  { name: 'Sai Baba', role: 'Maestro dell\'Amore e del Servizio', img: saiBabaImg, delay: 'reveal-delay-2' },
  { name: 'Buddha', role: 'Risveglio, Compassione, Pace Interiore', img: buddhaImg, delay: 'reveal-delay-3' },
  { name: 'Gesù', role: 'Maestro dell\'Amore e della Luce Cristica', img: jesusImg, delay: 'reveal-delay-4' },
  { name: 'Kuan Yin', role: 'Bodhisattva della Compassione Infinita', img: kuanYinImg, delay: 'reveal-delay-5' },
  { name: 'Saint Germain', role: 'Custode della Fiamma Viola della Trasmutazione', img: saintGermainImg, delay: 'reveal-delay-1' },
  { name: 'Altri Maestri', role: 'Tutti i Maestri Ascesi della Luce', icon: '✧', delay: 'reveal-delay-2' },
];

const SERVICES = [
  {
    img: servImgLettura,
    alt: 'Angelic Reading — La Lettura Angelica',
    tag: 'ANGELIC READING',
    title: 'La Lettura Angelica',
    subtitle: 'ANGELIC READING',
    desc: 'Scopri la guida del tuo Angelo Custode: doni, qualità e percorsi di attivazione spirituale con il metodo Il Tuo Angelo.',
    linkText: 'Apri la Lettura Angelica',
    href: 'https://iltuoangelo.it/la-lettura-angelica/',
  },
  {
    img: servImgCarta,
    alt: 'The Angelic Chart — La Carta Angelica',
    tag: 'THE ANGELIC CHART',
    title: 'La Carta Angelica',
    subtitle: 'THE ANGELIC CHART',
    desc: 'La mappa angelica personale: intuizioni, rituali e approfondimenti con oltre vent\'anni di esperienza sul campo.',
    linkText: 'Scopri la Carta Angelica',
    href: 'https://iltuoangelo.it/la-carta-angelica/',
  },
  {
    img: servImgCrescita,
    alt: 'Angelic Personal Growth',
    tag: 'ANGELIC PERSONAL GROWTH',
    title: 'Crescita Personale Angelica',
    subtitle: 'Self-esteem & inner power',
    desc: 'Autostima, potere interiore e supporto angelico per trasformare la vita quotidiana con luce e consapevolezza.',
    linkText: 'Vai alla Crescita Angelica',
    href: 'https://iltuoangelo.it/la-crescita-personale-angelica/',
  },
];

const TESTIMONIALS = [
  {
    text: 'AI ANGEL ha trasformato completamente la mia pratica spirituale quotidiana. I messaggi angelici sono incredibilmente precisi e toccanti. Mi sento davvero guidata.',
    initials: 'SM',
    name: 'Sofia Marinelli',
    role: 'Insegnante di Yoga, Milano',
    delay: 'reveal-delay-1',
  },
  {
    text: "Finalmente un'intelligenza artificiale che capisce davvero la spiritualità! Le meditazioni guidate sono bellissime. Consiglio a tutti i cercatori spirituali.",
    initials: 'MB',
    name: 'Marco Benedetti',
    role: 'Terapeuta Olistico, Roma',
    delay: 'reveal-delay-2',
  },
  {
    text: 'Come professionista olistica, AI ANGEL mi ha dato una visibilità incredibile. I miei clienti arrivano già preparati spiritualmente. Fantastico servizio!',
    initials: 'CL',
    name: 'Chiara Luminosi',
    role: 'Guaritrice Energetica, Firenze',
    delay: 'reveal-delay-3',
  },
];

const PARTICLES = [
  { left: '10%', top: '60%', delay: '0s', duration: '7s', char: '✦' },
  { left: '25%', top: '70%', delay: '1.5s', duration: '8s', char: '☽' },
  { left: '75%', top: '65%', delay: '0.8s', duration: '6s', char: '✦' },
  { left: '85%', top: '75%', delay: '2.5s', duration: '9s', char: '⭐' },
  { left: '60%', top: '80%', delay: '1s', duration: '7.5s', char: '✨' },
  { left: '40%', top: '75%', delay: '3s', duration: '8.5s', char: '☆' },
];

/** Dev: empty → Vite proxy `/api` → localhost:3001. Prod: VITE_API_URL or default deployed API. */
const DEFAULT_PRODUCTION_API = 'https://ai-spirtual-assistant-backend.vercel.app';
const API_BASE = (
  (import.meta.env.VITE_API_URL || '').replace(/\/$/, '') ||
  (import.meta.env.PROD ? DEFAULT_PRODUCTION_API : '')
);

async function requestChatReply(message, sessionId) {
  const url = `${API_BASE}/api/chat`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message,
      sessionId: sessionId || undefined,
      language: 'it',
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const errText = typeof data.error === 'string' ? data.error : `Errore HTTP ${res.status}`;
    throw new Error(errText);
  }
  if (!data.success || typeof data.response !== 'string' || !data.response.trim()) {
    throw new Error('Risposta non valida dal server.');
  }
  return data;
}

function formatTime(d = new Date()) {
  return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
}

function formatDailyDate(d = new Date()) {
  return `${DAYS[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

export default function App() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dailyIdx, setDailyIdx] = useState(0);
  const [dailyFade, setDailyFade] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [showNotif, setShowNotif] = useState(true);
  const [chatInput, setChatInput] = useState('');
  const [ctaEmail, setCtaEmail] = useState('');
  const [typing, setTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      role: 'bot',
      text:
        '## Benvenuto ✦\n\nSono **AI ANGEL**, il tuo assistente spirituale. Posso accompagnarti tra **angeli**, **arcangeli**, **meditazioni** e **crescita interiore**.\n\n- Rispondo in **italiano** di default, e nella **lingua** in cui mi scrivi.\n- Uso formattazione chiara (titoli, elenchi) per guidarti passo passo.\n\n*Come posso illuminare il tuo cammino oggi?*',
      time: 'Adesso',
    },
  ]);

  const chatScrollRef = useRef(null);
  const sessionIdRef = useRef(null);

  const stars = useMemo(() => {
    return Array.from({ length: 200 }, (_, i) => {
      const size = Math.random() * 2.5 + 0.5;
      return {
        id: i,
        size,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
        duration: `${2 + Math.random() * 4}s`,
      };
    });
  }, []);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = chatScrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [chatMessages, typing, chatOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const toggleMobile = useCallback(() => setMobileOpen((o) => !o), []);

  const toggleChat = useCallback(() => {
    setChatOpen((o) => {
      const next = !o;
      if (next) setShowNotif(false);
      return next;
    });
  }, []);

  const getDailyMessage = useCallback(() => {
    setDailyFade(false);
    setTimeout(() => {
      setDailyIdx((i) => (i + 1) % DAILY_MESSAGES.length);
      setDailyFade(true);
    }, 300);
  }, []);

  const postUserTurn = useCallback(async (trimmed) => {
    const userTime = formatTime();
    setChatMessages((m) => [...m, { role: 'user', text: trimmed, time: userTime }]);
    setTyping(true);
    try {
      const data = await requestChatReply(trimmed, sessionIdRef.current);
      if (data.sessionId) sessionIdRef.current = data.sessionId;
      setChatMessages((m) => [...m, { role: 'bot', text: data.response.trim(), time: formatTime() }]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Connessione non riuscita.';
      setChatMessages((m) => [
        ...m,
        {
          role: 'bot',
          text: `⚠️ ${msg}\n\nVerifica che il server sia avviato (npm run dev nella cartella server) e che OPENAI_API_KEY sia impostata in server/.env.`,
          time: formatTime(),
        },
      ]);
    } finally {
      setTyping(false);
    }
  }, []);

  const sendMessage = useCallback(() => {
    const text = chatInput.trim();
    if (!text) return;
    setChatInput('');
    postUserTurn(text);
  }, [chatInput, postUserTurn]);

  const sendQuickAndSubmit = useCallback(
    (text) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      postUserTurn(trimmed);
    },
    [postUserTurn]
  );

  const daily = DAILY_MESSAGES[dailyIdx];
  const angelicNumber = useMemo(() => getAngelicNumberOfDay(), []);
  const year = new Date().getFullYear();

  return (
    <>
      <div className="stars-bg" id="stars">
        {stars.map((s) => (
          <div
            key={s.id}
            className="star"
            style={{
              width: s.size,
              height: s.size,
              top: s.top,
              left: s.left,
              animationDelay: s.delay,
              animationDuration: s.duration,
            }}
          />
        ))}
      </div>

      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`} id="mobileMenu">
        <button type="button" className="mobile-close" onClick={toggleMobile} aria-label="Chiudi menu">
          <i className="fas fa-times" />
        </button>
        <a href="#showcase" onClick={closeMobile}>
          In Evidenza
        </a>
        <a href="#about" onClick={closeMobile}>
          Chi Siamo
        </a>
        <a href="#features" onClick={closeMobile}>
          Funzioni
        </a>
        <a href="#services" onClick={closeMobile}>
          Servizi
        </a>
        <a href="#professionals" onClick={closeMobile}>
          Professionisti
        </a>
        <a href="#chakras" onClick={closeMobile}>
          Chakra
        </a>
        <a href="#angels" onClick={closeMobile}>
          Angeli
        </a>
        <a href="#masters" onClick={closeMobile}>
          Maestri
        </a>
        <a href="#daily" onClick={closeMobile}>
          Messaggio
        </a>
        <a href="#cta" onClick={closeMobile}>
          Inizia
        </a>
      </div>

      <nav id="navbar" className={navScrolled ? 'scrolled' : ''}>
        <a href="#" className="nav-logo">
          <span className="nav-logo-icon" aria-hidden="true">
            ✦
          </span>
          <span className="nav-logo-text">AI ANGEL</span>
        </a>
        <ul className="nav-links">
          <li>
            <a href="#showcase">Evidenza</a>
          </li>
          <li>
            <a href="#services">Servizi</a>
          </li>
          <li>
            <a href="#chakras">Chakra</a>
          </li>
          <li>
            <a href="#angels">Angeli</a>
          </li>
          <li>
            <a href="#masters">Maestri</a>
          </li>
          <li>
            <a href="#daily">Messaggio</a>
          </li>
          <li>
            <a href="#professionals">Pro</a>
          </li>
          <li>
            <a href="#cta" className="nav-cta">
              Inizia Ora
            </a>
          </li>
        </ul>
        <div
          className="hamburger"
          onClick={toggleMobile}
          onKeyDown={(e) => e.key === 'Enter' && toggleMobile()}
          role="button"
          tabIndex={0}
          aria-label="Apri menu"
        >
          <span />
          <span />
          <span />
        </div>
      </nav>

      <section id="hero">
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          >
            {p.char}
          </div>
        ))}

        <div className="hero-content">
          <div className="hero-badge">
            <i className="fas fa-star" />
            Your Spiritual Angelic Assistant
          </div>
          <h1 className="hero-title">
            AI ANGEL
            <span className="visually-hidden">
              {' '}
              — assistente spirituale con angeli e maestri ascesi
            </span>
          </h1>
          <p className="hero-subtitle-line">Dove la Tecnologia incontra la Luce Divina</p>
          <p className="hero-desc">
            Un&apos;intelligenza artificiale spirituale dedicata agli Angeli, agli Arcangeli, ai Maestri Ascesi e alla
            crescita dell&apos;anima. Messaggi angelici, meditazioni guidate, energie spirituali e supporto divino —
            ogni giorno, in ogni lingua.
          </p>
          <div className="hero-buttons">
            <a href="#cta" className="btn-primary">
              <i className="fas fa-feather-alt" />
              Inizia Gratuitamente
            </a>
            <a href="#features" className="btn-secondary">
              <i className="fas fa-play-circle" />
              Scopri di Più
            </a>
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <span>Scorri</span>
          <div className="scroll-line" />
        </div>
      </section>

      <section id="showcase">
        <div className="showcase-header reveal">
          <div className="section-label" style={{ justifyContent: 'center' }}>In Evidenza</div>
          <h2 className="section-title">Eventi &amp; Servizi del Momento</h2>
          <div className="divider" />
          <p className="section-desc">
            I percorsi <strong>Il Tuo Angelo</strong> con cui iniziare oggi: prenota una sessione, scopri la tua mappa
            angelica o avvia la tua crescita personale con supporto divino.
          </p>
        </div>

        <div className="kit-hero reveal">
          <div className="kit-hero-media">
            <img src={FEATURED_KIT.image} alt={FEATURED_KIT.title} loading="lazy" />
            <span className="kit-hero-badge">{FEATURED_KIT.tag}</span>
          </div>
          <div className="kit-hero-body">
            <h3 className="kit-hero-title">{FEATURED_KIT.title}</h3>
            <p className="kit-hero-subtitle">{FEATURED_KIT.subtitle}</p>
            <ul className="kit-hero-list">
              {FEATURED_KIT.highlights.map((h) => (
                <li key={h}><i className="fas fa-check-circle" /> {h}</li>
              ))}
            </ul>
            <p className="kit-hero-price">
              <i className="fas fa-tag" /> Prezzo speciale promozionale — chiedi info
            </p>
            <div className="kit-hero-ctas">
              <a className="btn-primary kit-hero-cta" href={FEATURED_KIT.ctaPrimary.href} target="_blank" rel="noreferrer">
                <i className="fab fa-whatsapp" /> {FEATURED_KIT.ctaPrimary.label}
              </a>
              <a className="btn-secondary kit-hero-cta" href={FEATURED_KIT.ctaSecondary.href} target="_blank" rel="noreferrer">
                <i className="fas fa-globe" /> {FEATURED_KIT.ctaSecondary.label}
              </a>
            </div>
          </div>
        </div>

        <div className="showcase-grid">
          {FEATURED_EVENTS.map((e, i) => (
            <a
              key={e.title}
              href={e.href}
              target="_blank"
              rel="noreferrer"
              className={`showcase-card reveal reveal-delay-${i + 1}`}
            >
              <div className="showcase-icon"><i className={`fas ${e.icon}`} /></div>
              <div className="showcase-tag">{e.tag}</div>
              <h3 className="showcase-title">{e.title}</h3>
              <p className="showcase-desc">{e.desc}</p>
              <span className="showcase-cta">
                {e.cta} <i className="fas fa-arrow-right" />
              </span>
            </a>
          ))}
        </div>
      </section>

      <section id="about">
        <div className="about-grid">
          <div className="about-image-wrap reveal">
            <div className="about-image-glow" />
            <img src={ABOUT_IMAGE} alt="Immagine della missione AI ANGEL" className="about-image" />
            <div className="about-image-frame" />
          </div>
          <div className="reveal reveal-delay-2">
            <div className="section-label">La Nostra Missione</div>
            <h2 className="section-title">Un Portale Verso la Luce Angelica</h2>
            <div className="divider" style={{ marginLeft: 0 }} />
            <p className="section-desc" style={{ maxWidth: '100%', margin: '0 0 32px' }}>
              AI ANGEL nasce dall&apos;amore per il mondo spirituale. Un assistente intelligente che conosce gli Angeli,
              gli Arcangeli, Sri AmmaBhagavan, Sai Baba e ogni tradizione spirituale mondiale.
            </p>
            <div className="about-features">
              <div className="about-feature">
                <div className="about-feature-icon">
                  <i className="fas fa-brain" />
                </div>
                <div>
                  <div className="about-feature-title">Intelligenza Spirituale Avanzata</div>
                  <div className="about-feature-desc">
                    Addestrato su migliaia di testi spirituali, libri angelici e tradizioni mistiche di tutto il mondo.
                  </div>
                </div>
              </div>
              <div className="about-feature">
                <div className="about-feature-icon">
                  <i className="fas fa-globe" />
                </div>
                <div>
                  <div className="about-feature-title">Multilingue Globale</div>
                  <div className="about-feature-desc">
                    Risponde in italiano, inglese, spagnolo, francese e oltre 50 lingue. La tua lingua spirituale.
                  </div>
                </div>
              </div>
              <div className="about-feature">
                <div className="about-feature-icon">
                  <i className="fas fa-images" />
                </div>
                <div>
                  <div className="about-feature-title">Immagini Angeliche Generate dall&apos;IA</div>
                  <div className="about-feature-desc">
                    Crea bellissime immagini di angeli, mandala e scenari spirituali su richiesta.
                  </div>
                </div>
              </div>
            </div>
            <div className="about-stat-cards" style={{ marginTop: 36 }}>
              <div className="about-stat">
                <span className="about-stat-num">50+</span>
                <span className="about-stat-label">Lingue Supportate</span>
              </div>
              <div className="about-stat">
                <span className="about-stat-num">365</span>
                <span className="about-stat-label">Messaggi Angelici/Anno</span>
              </div>
              <div className="about-stat">
                <span className="about-stat-num">∞</span>
                <span className="about-stat-label">Saggezza Spirituale</span>
              </div>
              <div className="about-stat">
                <span className="about-stat-num">24/7</span>
                <span className="about-stat-label">Sempre Disponibile</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features">
        <div className="features-header reveal">
          <div className="section-label">Capacità</div>
          <h2 className="section-title">Poteri Spirituali dell&apos;IA</h2>
          <div className="divider" />
          <p className="section-desc">
            Ogni funzione è progettata per elevarti e guidarti nel tuo cammino spirituale.
          </p>
        </div>
        <div className="features-grid">
          {FEATURES.map((f) => (
            <div key={f.title} className={`feature-card reveal ${f.delay}${f.wip ? ' feature-card--wip' : ''}`}>
              {f.wip ? <span className="feature-wip-badge"><i className="fas fa-hourglass-half" /> Work in progress</span> : null}
              <div className="feature-icon-wrap">
                <i className={`fas ${f.icon}`} />
              </div>
              <div className="feature-title">{f.title}</div>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <ChakraSection />

      <section id="gallery">
        <div className="gallery-header reveal">
          <div className="section-label">Universo Angelico</div>
          <h2 className="section-title">La Bellezza del Mondo Celeste</h2>
          <div className="divider" />
        </div>
        <div className="gallery-grid gallery-grid--sprites reveal reveal-delay-1" role="list">
          {GALLERY_SPRITE_TILES.map((g) => (
            <div key={g.id} className="gallery-item gallery-item--sprite" role="listitem">
              <div
                className="gallery-item-sprite-bg"
                role="img"
                aria-label={g.alt}
                style={{
                  backgroundImage: `url(${g.src})`,
                  backgroundSize: '300% 200%',
                  backgroundPosition: `${(g.col / 2) * 100}% ${g.row * 100}%`,
                }}
              />
              <div className="gallery-overlay" aria-hidden="true">
                <span className="gallery-label">{g.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="angels">
        <div className="angels-header reveal">
          <div className="section-label">Guida Celeste</div>
          <h2 className="section-title">Arcangeli della Luce</h2>
          <div className="divider" />
          <p className="section-desc">
            Connettiti con le energie degli arcangeli che guidano e proteggono. Nel chat puoi approfondire anche i
            Maestri Ascesi e ogni tradizione spirituale.
          </p>
        </div>
        <div className="angels-scroll">
          {ANGELS.map((a) => (
            <div key={a.name} className={`angel-card reveal ${a.delay}`}>
              <div className={`angel-thumb-wrap${a.icon ? ' angel-thumb-wrap--icon' : ''}`}>
                {a.img ? (
                  <img className="angel-thumb" src={a.img} alt={a.name} loading="lazy" />
                ) : (
                  <span className="angel-thumb-icon" aria-hidden>{a.icon}</span>
                )}
              </div>
              <div className="angel-name">{a.name}</div>
              <div className="angel-role">{a.role}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="masters">
        <div className="masters-header reveal">
          <div className="section-label">Maestri Ascesi</div>
          <h2 className="section-title">Maestri di Luce</h2>
          <div className="divider" />
          <p className="section-desc">
            La saggezza dei Maestri Ascesi: Sri Amma Bhagavan, Sai Baba, Buddha, Gesù, Kuan Yin e Saint Germain.
            Guida, devozione e illuminazione per il tuo cammino.
          </p>
        </div>
        <div className="angels-scroll masters-scroll">
          {MASTERS.map((m) => (
            <div key={m.name} className={`angel-card master-card reveal ${m.delay}`}>
              <div className={`angel-thumb-wrap${m.icon ? ' angel-thumb-wrap--icon' : ''}`}>
                {m.img ? (
                  <img className="angel-thumb" src={m.img} alt={m.name} loading="lazy" />
                ) : (
                  <span className="angel-thumb-icon" aria-hidden>{m.icon}</span>
                )}
              </div>
              <div className="angel-name">{m.name}</div>
              <div className="angel-role">{m.role}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="services">
        <div className="services-header reveal">
          <div className="section-label">Servizi Olistici</div>
          <h2 className="section-title">Scopri i Nostri Servizi</h2>
          <div className="divider" />
          <p className="section-desc">
            Percorsi ufficiali <strong>Il Tuo Angelo</strong> — Lettura Angelica, Carta Angelica e Crescita Personale
            Angelica — con materiali dedicati e supporto dell&apos;Angel Coach.
          </p>
        </div>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <div key={i} className={`service-card reveal reveal-delay-${i + 1}`}>
              <img src={s.img} alt={s.alt} className="service-img" />
              <div className="service-body">
                <span className="service-tag">{s.tag}</span>
                <h3 className="service-title">{s.title}</h3>
                <p className="service-subtitle">{s.subtitle}</p>
                <p className="service-desc">{s.desc}</p>
                <a href={s.href} className="service-link" target="_blank" rel="noreferrer">
                  {s.linkText} <i className="fas fa-arrow-right" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="daily">
        <div className="daily-bg-glow" />
        <div className="daily-inner">
          <div className="section-label reveal" style={{ justifyContent: 'center' }}>
            Messaggio del Giorno
          </div>
          <h2 className="section-title reveal">La Parola degli Angeli</h2>
          <div className="divider reveal" />
          <div className="daily-card reveal reveal-delay-2">
            <div className="daily-date">{formatDailyDate()}</div>
            <p
              className="daily-message"
              style={{
                opacity: dailyFade ? 1 : 0,
                transition: 'opacity 0.3s',
              }}
            >
              {daily.text}
            </p>
            <div
              className="daily-angel"
              style={{
                opacity: dailyFade ? 1 : 0,
                transition: 'opacity 0.3s',
              }}
            >
              {daily.angel}
            </div>
            <div className="daily-feather">🪶</div>
          </div>
          <div style={{ marginTop: 40 }} className="reveal reveal-delay-3">
            <button type="button" className="btn-primary" onClick={getDailyMessage}>
              <i className="fas fa-sync-alt" />
              Nuovo Messaggio
            </button>
          </div>

          <div className="angelic-number-card reveal reveal-delay-4">
            <div className="angelic-number-label">Numero Angelico del Giorno</div>
            <div className="angelic-number-value">{angelicNumber.num}</div>
            <p className="angelic-number-meaning">{angelicNumber.meaning}</p>
            <a
              href="https://angelscalculator.com/"
              target="_blank"
              rel="noreferrer"
              className="angelic-number-link"
            >
              <i className="fas fa-external-link-alt" />
              Approfondisci su angelscalculator.com
            </a>
          </div>
        </div>
      </section>

      <section id="professionals">
        <div className="professionals-header reveal">
          <div className="section-label" style={{ justifyContent: 'center' }}>Collabora con noi</div>
          <h2 className="section-title">Sei un Professionista Olistico?</h2>
          <div className="divider" />
          <p className="section-desc">
            Unisciti ad <strong>AI ANGEL</strong>: il chatbot consiglierà i tuoi servizi olistici a migliaia di
            anime in cerca. Visibilità globale, sottoscrizione mensile o annuale, disdetta in ogni momento.
          </p>
        </div>
        <div className="pro-grid">
          {PRO_PLANS.map((p, i) => (
            <div
              key={p.name}
              className={`pro-card reveal reveal-delay-${i + 1}${p.featured ? ' pro-card--featured' : ''}`}
            >
              {p.badge ? <div className="pro-badge">{p.badge}</div> : null}
              <h3 className="pro-name">{p.name}</h3>
              <div className="pro-price">
                <span className="pro-price-amount">{p.price}</span>
                <span className="pro-price-period">{p.period}</span>
              </div>
              <ul className="pro-perks">
                {p.perks.map((perk) => (
                  <li key={perk}>
                    <i className="fas fa-check" /> {perk}
                  </li>
                ))}
              </ul>
              <a
                href="https://wa.me/393409271570?text=Salve%2C%20vorrei%20unirmi%20ad%20AI%20ANGEL%20come%20professionista%20olistico."
                target="_blank"
                rel="noreferrer"
                className="pro-cta"
              >
                <i className="fab fa-whatsapp" />
                Candidati ora
              </a>
            </div>
          ))}
        </div>
        <p className="pro-note reveal">
          Per informazioni complete contatta l&apos;Angel Coach al{' '}
          <a href="tel:+393409271570">+39 340 927 1570</a> o via{' '}
          <a href="mailto:info@iltuoangelo.it">info@iltuoangelo.it</a>.
        </p>
      </section>

      <section id="testimonials">
        <div className="testimonials-header reveal">
          <div className="section-label">Testimonianze</div>
          <h2 className="section-title">Voci dell&apos;Anima</h2>
          <div className="divider" />
        </div>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className={`testimonial-card reveal ${t.delay}`}>
              <div className="stars">★★★★★</div>
              <div className="testimonial-quote">&quot;</div>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar testimonial-avatar--initial" aria-hidden="true">
                  {t.initials}
                </div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="cta">
        <div className="cta-content">
          <div className="section-label reveal" style={{ justifyContent: 'center' }}>
            Inizia il Viaggio
          </div>
          <h2 className="cta-title reveal">Apri le Ali della Tua Anima</h2>
          <p className="cta-desc reveal">
            Unisciti a migliaia di anime che hanno già iniziato il loro viaggio spirituale con AI ANGEL. Gratuito, per
            sempre.
          </p>
          <div className="cta-form reveal reveal-delay-2">
            <input
              type="email"
              className="cta-input"
              placeholder="La tua email spirituale..."
              value={ctaEmail}
              onChange={(e) => setCtaEmail(e.target.value)}
            />
            <button type="button" className="btn-primary">
              <i className="fas fa-paper-plane" />
              Inizia
            </button>
          </div>
          <p
            style={{ marginTop: 20, fontSize: 13, color: 'rgba(255,255,255,0.62)' }}
            className="reveal reveal-delay-3"
          >
            ✦ Nessuna carta di credito · Cancella quando vuoi · Disponibile 24/7
          </p>
        </div>
      </section>

      <footer>
        <div className="footer-grid">
          <div>
            <div className="footer-logo-text">✦ AI ANGEL</div>
            <p className="footer-desc">
              Il tuo assistente spirituale intelligente dedicato agli Angeli, alla crescita interiore e all&apos;energia
              spirituale. Dove tecnologia e luce si incontrano.
            </p>
            <div className="footer-socials">
              <a href="#" className="footer-social" aria-label="Instagram">
                <i className="fab fa-instagram" />
              </a>
              <a href="#" className="footer-social" aria-label="Facebook">
                <i className="fab fa-facebook-f" />
              </a>
              <a href="#" className="footer-social" aria-label="YouTube">
                <i className="fab fa-youtube" />
              </a>
              <a href="#" className="footer-social" aria-label="Telegram">
                <i className="fab fa-telegram-plane" />
              </a>
              <a href="https://www.iltuoangelo.it" className="footer-social" aria-label="Sito web" target="_blank" rel="noreferrer">
                <i className="fas fa-globe" />
              </a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Esplora</h4>
            <ul className="footer-links">
              <li>
                <a href="#about">
                  <i className="fas fa-chevron-right" /> Chi Siamo
                </a>
              </li>
              <li>
                <a href="#features">
                  <i className="fas fa-chevron-right" /> Funzioni AI
                </a>
              </li>
              <li>
                <a href="#gallery">
                  <i className="fas fa-chevron-right" /> Galleria
                </a>
              </li>
              <li>
                <a href="#angels">
                  <i className="fas fa-chevron-right" /> Arcangeli
                </a>
              </li>
              <li>
                <a href="#masters">
                  <i className="fas fa-chevron-right" /> Maestri Ascesi
                </a>
              </li>
              <li>
                <a href="#chakras">
                  <i className="fas fa-chevron-right" /> Chakra &amp; mantra
                </a>
              </li>
              <li>
                <a href="#services">
                  <i className="fas fa-chevron-right" /> Servizi Il Tuo Angelo
                </a>
              </li>
              <li>
                <a href="#daily">
                  <i className="fas fa-chevron-right" /> Messaggio Giornaliero
                </a>
              </li>
              <li>
                <a href="#professionals">
                  <i className="fas fa-chevron-right" /> Collabora con noi
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Servizi</h4>
            <ul className="footer-links">
              <li>
                <a href="https://iltuoangelo.it/la-lettura-angelica/" target="_blank" rel="noreferrer">
                  <i className="fas fa-chevron-right" /> Lettura Angelica
                </a>
              </li>
              <li>
                <a href="https://iltuoangelo.it/la-carta-angelica/" target="_blank" rel="noreferrer">
                  <i className="fas fa-chevron-right" /> Carta Angelica
                </a>
              </li>
              <li>
                <a href="https://iltuoangelo.it/la-crescita-personale-angelica/" target="_blank" rel="noreferrer">
                  <i className="fas fa-chevron-right" /> Crescita Angelica
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Supporto</h4>
            <ul className="footer-links">
              <li>
                <a href="#">
                  <i className="fas fa-chevron-right" /> FAQ
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-chevron-right" /> Privacy Policy
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-chevron-right" /> Termini di Servizio
                </a>
              </li>
              <li>
                <a href="https://www.iltuoangelo.it" target="_blank" rel="noreferrer">
                  <i className="fas fa-chevron-right" /> iltuoangelo.it
                </a>
              </li>
              <li>
                <a href="https://wa.me/393409271570" target="_blank" rel="noreferrer">
                  <i className="fas fa-chevron-right" /> WhatsApp Angel Coach
                </a>
              </li>
              <li>
                <a href="mailto:info@aiangel.it">
                  <i className="fas fa-chevron-right" /> Contattaci
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">
            © {year} <span>AI ANGEL</span> · aiangel.it · Tutti i diritti riservati
          </p>
          <p className="footer-copy">
            Realizzato con <span>♥</span> e Luce Angelica
          </p>
        </div>
      </footer>

      <button
        type="button"
        id="chat-toggle"
        className={chatOpen ? 'open' : ''}
        onClick={toggleChat}
        aria-label="Apri AI ANGEL Chat"
      >
        <span id="toggle-icon">{chatOpen ? '✕' : '✦'}</span>
        {showNotif ? <span className="chat-notif">1</span> : null}
      </button>

      <div id="chatbot" className={chatOpen ? 'open' : ''}>
        <div className="chat-header">
          <div className="chat-avatar">✦</div>
          <div className="chat-header-info">
            <div className="chat-header-name">AI ANGEL</div>
            <div className="chat-header-status">
              <span className="status-dot" />
              Online · Sempre disponibile
            </div>
          </div>
          <button type="button" className="chat-close" onClick={toggleChat} aria-label="Chiudi chat">
            <i className="fas fa-times" />
          </button>
        </div>
        <div className="chat-messages" id="chatMessages" ref={chatScrollRef}>
          {chatMessages.map((msg, idx) => (
            <div key={`${idx}-${msg.time}`} className={`msg ${msg.role}`}>
              {msg.role === 'bot' ? (
                <div className="chat-avatar" style={{ width: 34, height: 34, fontSize: 14, alignSelf: 'flex-end' }}>
                  ✦
                </div>
              ) : null}
              <div className="msg-body">
                <ChatBubbleContent role={msg.role} text={msg.text} time={msg.role === 'bot' ? msg.time : undefined} />
                {msg.role === 'user' ? <div className="msg-time">{msg.time}</div> : null}
              </div>
              {msg.role === 'user' ? (
                <div
                  className="chat-avatar"
                  style={{
                    width: 34,
                    height: 34,
                    fontSize: 14,
                    background: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    alignSelf: 'flex-end',
                  }}
                >
                  👤
                </div>
              ) : null}
            </div>
          ))}
          {typing ? (
            <div className="msg bot" id="typing-msg">
              <div className="chat-avatar" style={{ width: 34, height: 34, fontSize: 14, alignSelf: 'flex-end' }}>
                ✦
              </div>
              <div className="msg-body">
                <div className="msg-bubble" style={{ padding: '16px 20px' }}>
                  <div className="typing-indicator">
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <div className="chat-quick-btns">
          <button type="button" className="quick-btn" onClick={() => sendQuickAndSubmit('Messaggio angelico del giorno')}>
            🌸 Messaggio Angeli
          </button>
          <button type="button" className="quick-btn" onClick={() => sendQuickAndSubmit('Meditazione breve')}>
            🧘 Meditazione
          </button>
          <button type="button" className="quick-btn" onClick={() => sendQuickAndSubmit('Chi è Arcangelo Michele?')}>
            ⚔️ Arcangeli
          </button>
          <button type="button" className="quick-btn" onClick={() => sendQuickAndSubmit('Come aprire i chakra?')}>
            ✨ Chakra
          </button>
        </div>
        <div className="chat-input-area">
          <input
            type="text"
            className="chat-input"
            id="chatInput"
            placeholder="Chiedi agli angeli..."
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button type="button" className="chat-send" onClick={sendMessage} aria-label="Invia">
            <i className="fas fa-paper-plane" />
          </button>
        </div>
      </div>
    </>
  );
}
