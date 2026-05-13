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

export function ChatBubbleContent({ role, text }) {
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
    </div>
  );
}
