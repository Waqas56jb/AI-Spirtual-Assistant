import { useEffect, useMemo, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const mdComponents = {
  h1: ({ children, ...props }) => (
    <h3 className="msg-md-title msg-md-h1" {...props}>
      {children}
    </h3>
  ),
  h2: ({ children, ...props }) => (
    <h3 className="msg-md-title msg-md-h2" {...props}>
      {children}
    </h3>
  ),
  h3: ({ children, ...props }) => (
    <h4 className="msg-md-title msg-md-h3" {...props}>
      {children}
    </h4>
  ),
  h4: ({ children, ...props }) => (
    <h4 className="msg-md-title msg-md-h4" {...props}>
      {children}
    </h4>
  ),
  a: ({ children, href, ...props }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="msg-md-link" {...props}>
      {children}
    </a>
  ),
};

const DEFAULT_PRODUCTION_API = 'https://ai-spirtual-assistant-backend.vercel.app';
const API_BASE = (
  (import.meta.env.VITE_API_URL || '').replace(/\/$/, '') ||
  (import.meta.env.PROD ? DEFAULT_PRODUCTION_API : '')
);

const VISUAL_MARKER_RE = /^\s*\[ANGELIC_VISUAL\]\s*:\s*(.+)$/im;
const NUMBER_MARKER_RE = /^\s*\[ANGELIC_NUMBER\]\s*:\s*(\d{1,4})\s*$/im;

function parseMarkers(text) {
  if (!text) return { cleanText: '', visualTheme: null, angelicNumber: null };
  let visualTheme = null;
  let angelicNumber = null;

  const v = text.match(VISUAL_MARKER_RE);
  if (v) visualTheme = v[1].trim();

  const n = text.match(NUMBER_MARKER_RE);
  if (n) angelicNumber = n[1].trim();

  const cleanText = text
    .replace(VISUAL_MARKER_RE, '')
    .replace(NUMBER_MARKER_RE, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return { cleanText, visualTheme, angelicNumber };
}

async function fetchAngelicImage(theme) {
  const res = await fetch(`${API_BASE}/api/generate-image`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ theme }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.dataUrl) {
    throw new Error(data.error || 'Image generation failed.');
  }
  return data.dataUrl;
}

function useAngelicImage(theme) {
  const [state, setState] = useState({ url: null, loading: !!theme, error: null });
  const reqIdRef = useRef(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  useEffect(() => {
    if (!theme) {
      setState({ url: null, loading: false, error: null });
      return;
    }
    const myId = ++reqIdRef.current;
    setState({ url: null, loading: true, error: null });
    fetchAngelicImage(theme)
      .then((url) => {
        if (mountedRef.current && reqIdRef.current === myId) {
          setState({ url, loading: false, error: null });
        }
      })
      .catch((err) => {
        if (mountedRef.current && reqIdRef.current === myId) {
          setState({ url: null, loading: false, error: err.message || 'Errore immagine.' });
        }
      });
  }, [theme]);

  return state;
}

function ShareControls({ shareText, shareTitle, imageUrl }) {
  const [copied, setCopied] = useState(false);

  const onShare = async () => {
    const shareData = {
      title: shareTitle || 'AI ANGEL — Messaggio Angelico',
      text: shareText,
      url: 'https://ai-spirtual-assistant.vercel.app/',
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
    } catch {
      // fall through to clipboard
    }
    try {
      await navigator.clipboard.writeText(`${shareData.text}\n\n${shareData.url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt('Copia il messaggio:', `${shareData.text}\n\n${shareData.url}`);
    }
  };

  const onDownload = () => {
    if (!imageUrl) return;
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = `ai-angel-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const waText = encodeURIComponent(`${shareText}\n\nhttps://ai-spirtual-assistant.vercel.app/`);

  return (
    <div className="msg-share-row">
      <button type="button" className="msg-share-btn" onClick={onShare} aria-label="Condividi messaggio angelico">
        <i className="fas fa-share-alt" aria-hidden /> {copied ? 'Copiato!' : 'Condividi'}
      </button>
      <a
        className="msg-share-btn msg-share-btn--wa"
        href={`https://wa.me/?text=${waText}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Condividi su WhatsApp"
      >
        <i className="fab fa-whatsapp" aria-hidden /> WhatsApp
      </a>
      {imageUrl ? (
        <button
          type="button"
          className="msg-share-btn msg-share-btn--ghost"
          onClick={onDownload}
          aria-label="Scarica immagine angelica"
        >
          <i className="fas fa-download" aria-hidden /> Salva
        </button>
      ) : null}
    </div>
  );
}

function AngelicVisualFrame({ url, loading, error, theme }) {
  if (!theme && !url && !loading && !error) return null;
  return (
    <div className="msg-angelic-visual">
      <div className="msg-angelic-visual-frame">
        {loading ? (
          <div className="msg-angelic-visual-loading">
            <span className="msg-angelic-spinner" aria-hidden />
            <span>L&apos;Angelo sta dipingendo per te…</span>
          </div>
        ) : error ? (
          <div className="msg-angelic-visual-error">
            <i className="fas fa-feather-alt" aria-hidden /> Immagine non disponibile in questo momento.
          </div>
        ) : url ? (
          <img src={url} alt={theme} className="msg-angelic-visual-img" loading="lazy" />
        ) : null}
      </div>
    </div>
  );
}

export function ChatBubbleContent({ role, text, time }) {
  const parsed = useMemo(() => parseMarkers(text), [text]);

  if (role === 'user') {
    return (
      <div className="msg-bubble msg-bubble--plain">
        {text}
      </div>
    );
  }

  const { cleanText, visualTheme, angelicNumber } = parsed;
  const { url: imageUrl, loading, error } = useAngelicImage(visualTheme);

  const shareText = useMemo(() => {
    const trimmed = cleanText.replace(/\s+/g, ' ').slice(0, 240).trim();
    const head = angelicNumber
      ? `✦ Numero Angelico ${angelicNumber} ✦\n\n`
      : visualTheme
        ? `✦ Messaggio Angelico ✦\n\n`
        : '';
    return `${head}${trimmed}${trimmed.length >= 240 ? '…' : ''}`;
  }, [cleanText, angelicNumber, visualTheme]);

  return (
    <div className="msg-bubble msg-bubble--markdown">
      {angelicNumber ? (
        <div className="msg-angelic-number">
          <div className="msg-angelic-number-label">Numero Angelico</div>
          <div className="msg-angelic-number-value">{angelicNumber}</div>
        </div>
      ) : null}

      <AngelicVisualFrame url={imageUrl} loading={loading} error={error} theme={visualTheme} />

      <div className="msg-md">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
          {cleanText}
        </ReactMarkdown>
      </div>

      {time ? <div className="msg-time msg-time--in-bubble">{time}</div> : null}

      <ShareControls shareText={shareText} imageUrl={imageUrl} />

      <div className="msg-bot-promo" role="note">
        <p className="msg-bot-promo-text">
          Per approfondire l&apos;argomento, clicca su{' '}
          <a href="https://www.iltuoangelo.it" target="_blank" rel="noopener noreferrer" className="msg-bot-promo-link">
            www.iltuoangelo.it
          </a>{' '}
          (disponibile in italiano e in inglese) e contatta l&apos;Angel Coach al{' '}
          <a href="tel:+393409271570" className="msg-bot-promo-link">
            +39 340 927 1570
          </a>
          .
        </p>
        <a
          href="https://wa.me/393409271570"
          target="_blank"
          rel="noopener noreferrer"
          className="msg-wa-btn"
          aria-label="Contatta su WhatsApp"
        >
          <i className="fab fa-whatsapp" aria-hidden />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
