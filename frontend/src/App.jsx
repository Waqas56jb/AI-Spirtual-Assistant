import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChatBubbleContent } from './ChatBubbleContent.jsx';

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
    title: 'Guarigione Energetica',
    desc: 'Tecniche di pulizia e riequilibrio dei chakra, Reiki, cristalli, e pratiche di guarigione olistica.',
    delay: 'reveal-delay-1',
  },
  {
    icon: 'fa-image',
    title: 'Arte Angelica IA',
    desc: "Genera immagini mozzafiato di angeli, scenari celesti e mandala spirituali con l'intelligenza artificiale.",
    delay: 'reveal-delay-2',
  },
  {
    icon: 'fa-moon',
    title: 'Astrologia Spirituale',
    desc: 'Connessioni tra astrologia, angeli planetari e il tuo percorso anima. Interpretazioni profonde e personalizzate.',
    delay: 'reveal-delay-3',
  },
];

const GALLERY_ITEMS = [
  {
    tall: true,
    src: 'https://images.unsplash.com/photo-1542042497-e4e85460cb8f?w=700&q=80',
    alt: 'Scultura angelica',
    label: 'Presenza Angelica',
  },
  {
    src: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80',
    alt: 'Luce sacra attraverso il vetro',
    label: 'Luce Celeste',
  },
  {
    wide: true,
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000&q=80',
    alt: 'Cielo e nubi',
    label: 'Regni Celesti',
  },
  {
    src: 'https://images.unsplash.com/photo-1438032007358-48b8e688e510?w=600&q=80',
    alt: 'Interno di chiesa',
    label: 'Santuario di Pace',
  },
  {
    src: 'https://images.unsplash.com/photo-1548625149-fc4a29dff105?w=600&q=80',
    alt: 'Vetrate e archi',
    label: "Finestre dell'Anima",
  },
  {
    src: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=600&q=80',
    alt: 'Cielo stellato',
    label: 'Infinito Divino',
  },
  {
    src: 'https://images.unsplash.com/photo-1579783902614-a3fb39279c0c?w=600&q=80',
    alt: 'Arte spirituale',
    label: 'Ali di Luce',
  },
];

const ANGELS = [
  {
    name: 'Michele',
    role: 'Protettore e Guerriero della Luce',
    img: 'https://images.unsplash.com/photo-1542042497-e4e85460cb8f?w=400&q=80',
    delay: 'reveal-delay-1',
  },
  {
    name: 'Gabriele',
    role: 'Messaggero della Comunicazione Divina',
    img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80',
    delay: 'reveal-delay-2',
  },
  {
    name: 'Raffaele',
    role: 'Angelo della Guarigione Universale',
    img: 'https://images.unsplash.com/photo-1438032007358-48b8e688e510?w=400&q=80',
    delay: 'reveal-delay-3',
  },
  {
    name: 'Uriele',
    role: 'Luce della Saggezza e Verità',
    img: 'https://images.unsplash.com/photo-1548625149-fc4a29dff105?w=400&q=80',
    delay: 'reveal-delay-4',
  },
  {
    name: 'Zadkiel',
    role: 'Angelo della Fiamma Viola',
    img: 'https://images.unsplash.com/photo-1579783902614-a3fb39279c0c?w=400&q=80',
    delay: 'reveal-delay-5',
  },
  {
    name: 'Metatron',
    role: 'Guardiano della Geometria Sacra',
    img: 'https://images.unsplash.com/photo-1516339901601-2e1a37cde0db?w=400&q=80',
    delay: 'reveal-delay-1',
  },
  {
    name: 'Sri Amma Bhagavan',
    role: "Maestro dell'Oneness e Risveglio",
    img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80',
    delay: 'reveal-delay-2',
  },
  {
    name: 'Sai Baba',
    role: "Avatar dell'Amore Divino",
    img: 'https://images.unsplash.com/photo-1438032007358-48b8e688e510?w=400&q=80',
    delay: 'reveal-delay-3',
  },
  {
    name: 'Buddha',
    role: "Maestro dell'Illuminazione",
    img: 'https://images.unsplash.com/photo-1601823981391-f5d6034e73fe?w=400&q=80',
    delay: 'reveal-delay-4',
  },
  {
    name: 'Gesù',
    role: "Maestro dell'Amore Incondizionato",
    img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80',
    delay: 'reveal-delay-5',
  },
  {
    name: 'Kuan Yin',
    role: 'Dea della Compassione',
    img: 'https://images.unsplash.com/photo-1542042497-e4e85460cb8f?w=400&q=80',
    delay: 'reveal-delay-1',
  },
  {
    name: 'Saint Germain',
    role: 'Maestro della Trasformazione',
    img: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=400&q=80',
    delay: 'reveal-delay-2',
  },
];

const SERVICES = [
  {
    img: 'https://images.unsplash.com/photo-1542042497-e4e85460cb8f?w=700&q=80',
    alt: 'Lettura angelica',
    tag: 'Lettura Spirituale',
    title: 'Lettura delle Carte Angeliche',
    desc: 'Sessioni personali di lettura con le carte degli angeli per ricevere messaggi e guidance divina per il tuo cammino.',
    linkText: 'Prenota Ora',
  },
  {
    img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=700&q=80',
    alt: 'Meditazione guidata',
    tag: 'Meditazione',
    title: 'Meditazione Guidata con gli Angeli',
    desc: 'Sessioni di meditazione profonda che ti connettono alle energie angeliche per pace, guarigione e trasformazione.',
    linkText: 'Scopri di Più',
  },
  {
    img: 'https://images.unsplash.com/photo-1548625149-fc4a29dff105?w=700&q=80',
    alt: 'Luce e guarigione spirituale',
    tag: 'Guarigione',
    title: "Guarigione con l'Energia Angelica",
    desc: 'Sessioni di guarigione energetica che rimuovono blocchi e ripristinano l\'armonia del corpo, mente e spirito.',
    linkText: 'Prenota Sessione',
  },
];

const TESTIMONIALS = [
  {
    text: 'AI ANGEL ha trasformato completamente la mia pratica spirituale quotidiana. I messaggi angelici sono incredibilmente precisi e toccanti. Mi sento davvero guidata.',
    avatar: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=120&q=80',
    name: 'Sofia Marinelli',
    role: 'Insegnante di Yoga, Milano',
    delay: 'reveal-delay-1',
  },
  {
    text: "Finalmente un'intelligenza artificiale che capisce davvero la spiritualità! Le meditazioni guidate sono bellissime. Consiglio a tutti i cercatori spirituali.",
    avatar: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=120&q=80',
    name: 'Marco Benedetti',
    role: 'Terapeuta Olistico, Roma',
    delay: 'reveal-delay-2',
  },
  {
    text: 'Come professionista olistica, AI ANGEL mi ha dato una visibilità incredibile. I miei clienti arrivano già preparati spiritualmente. Fantastico servizio!',
    avatar: 'https://images.unsplash.com/photo-1542042497-e4e85460cb8f?w=120&q=80',
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
        <a href="#about" onClick={closeMobile}>
          Chi Siamo
        </a>
        <a href="#features" onClick={closeMobile}>
          Funzioni
        </a>
        <a href="#services" onClick={closeMobile}>
          Servizi
        </a>
        <a href="#angels" onClick={closeMobile}>
          Angeli
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
          <div className="nav-logo-icon">✦</div>
          <span className="nav-logo-text">AI ANGEL</span>
        </a>
        <ul className="nav-links">
          <li>
            <a href="#about">Chi Siamo</a>
          </li>
          <li>
            <a href="#features">Funzioni</a>
          </li>
          <li>
            <a href="#services">Servizi</a>
          </li>
          <li>
            <a href="#angels">Angeli</a>
          </li>
          <li>
            <a href="#daily">Messaggio</a>
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
        <div className="hero-bg" />
        <div className="hero-overlay" />

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
            Il Tuo Assistente Spirituale Intelligente
          </div>
          <h1 className="hero-title">AI ANGEL</h1>
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

      <section id="about">
        <div className="about-grid">
          <div className="about-image-wrap reveal">
            <div className="about-image-glow" />
            <img
              src="https://images.unsplash.com/photo-1542042497-e4e85460cb8f?w=800&q=85"
              alt="Arte e presenza angelica"
              className="about-image"
            />
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
                  <div className="about-feature-title">Multilingue — Italiano Prima</div>
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
            <div key={f.title} className={`feature-card reveal ${f.delay}`}>
              <div className="feature-icon-wrap">
                <i className={`fas ${f.icon}`} />
              </div>
              <div className="feature-title">{f.title}</div>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="gallery">
        <div className="gallery-header reveal">
          <div className="section-label">Universo Angelico</div>
          <h2 className="section-title">La Bellezza del Mondo Celeste</h2>
          <div className="divider" />
        </div>
        <div className="gallery-grid reveal reveal-delay-1">
          {GALLERY_ITEMS.map((g, i) => (
            <div key={i} className={`gallery-item${g.tall ? ' tall' : ''}${g.wide ? ' wide' : ''}`}>
              <img src={g.src} alt={g.alt} />
              <div className="gallery-overlay">
                <span className="gallery-label">{g.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="angels">
        <div className="angels-header reveal">
          <div className="section-label">Guida Celeste</div>
          <h2 className="section-title">Gli Arcangeli & Maestri</h2>
          <div className="divider" />
          <p className="section-desc">
            Connettiti con le potenti energie angeliche e i Maestri Ascesi che guidano l&apos;umanità.
          </p>
        </div>
        <div className="angels-scroll">
          {ANGELS.map((a) => (
            <div key={a.name} className={`angel-card reveal ${a.delay}`}>
              <div className="angel-thumb-wrap">
                <img className="angel-thumb" src={a.img} alt={a.name} loading="lazy" />
              </div>
              <div className="angel-name">{a.name}</div>
              <div className="angel-role">{a.role}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="services">
        <div className="services-header reveal">
          <div className="section-label">Servizi Olistici</div>
          <h2 className="section-title">Scopri i Nostri Servizi</h2>
          <div className="divider" />
          <p className="section-desc">Professionisti olistici selezionati per guidarti nel tuo cammino spirituale.</p>
        </div>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <div key={i} className={`service-card reveal reveal-delay-${i + 1}`}>
              <img src={s.img} alt={s.alt} className="service-img" />
              <div className="service-body">
                <span className="service-tag">{s.tag}</span>
                <h3 className="service-title">{s.title}</h3>
                <p className="service-desc">{s.desc}</p>
                <a href="https://www.iltuoangelo.it" className="service-link" target="_blank" rel="noreferrer">
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
        </div>
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
                <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
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
        <div className="cta-bg" />
        <div className="cta-overlay" />
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
            style={{ marginTop: 20, fontSize: 13, color: 'rgba(255,255,255,0.4)' }}
            className="reveal reveal-delay-3"
          >
            ✦ Nessuna carta di credito · Cancella quando vuoi · Sempre in italiano
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
                  <i className="fas fa-chevron-right" /> Angeli & Maestri
                </a>
              </li>
              <li>
                <a href="#daily">
                  <i className="fas fa-chevron-right" /> Messaggio Giornaliero
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Servizi</h4>
            <ul className="footer-links">
              <li>
                <a href="#services">
                  <i className="fas fa-chevron-right" /> Letture Angeliche
                </a>
              </li>
              <li>
                <a href="#services">
                  <i className="fas fa-chevron-right" /> Meditazioni
                </a>
              </li>
              <li>
                <a href="#services">
                  <i className="fas fa-chevron-right" /> Guarigione Energetica
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
                <ChatBubbleContent role={msg.role} text={msg.text} />
                <div className="msg-time">{msg.time}</div>
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
