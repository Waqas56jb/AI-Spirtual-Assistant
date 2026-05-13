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

export function ChatBubbleContent({ role, text, time }) {
  if (role === 'user') {
    return (
      <div className="msg-bubble msg-bubble--plain">
        {text}
      </div>
    );
  }

  return (
    <div className="msg-bubble msg-bubble--markdown">
      <div className="msg-md">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
          {text}
        </ReactMarkdown>
      </div>
      {time ? <div className="msg-time msg-time--in-bubble">{time}</div> : null}
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
