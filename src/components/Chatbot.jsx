import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import "./Chatbot.css";

const GREETING =
  "Hi! I'm Aqdar's assistant. Ask me about her projects, skills or certificates.\nمرحباً! اسألني عن مشاريع أقدار ومهاراتها وشهاداتها.";

const SUGGESTIONS = [
  "What projects has Aqdar built?",
  "شو مهارات أقدار؟",
  "Tell me about the graduation project",
  "كيف أتواصل معها؟",
];

const ERRORS = {
  rate_limited: "Too many messages, please wait a minute.\nرسائل كثيرة، جرّب بعد دقيقة.",
  not_configured: "The assistant isn't available right now. You can email aqdarahmad2@gmail.com.\nالمساعد غير متاح حالياً، راسلي أقدار على aqdarahmad2@gmail.com.",
  default: "Something went wrong. Please try again.\nصار خطأ، جرّب مرة ثانية.",
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]); // { role, content, error? }
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading, open]);

  useEffect(() => {
    if (!open) return undefined;
    inputRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function send(text) {
    const content = text.trim();
    if (!content || loading) return;
    const next = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.filter((m) => !m.error).map(({ role, content: c }) => ({ role, content: c })),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.reply) {
        setMessages([...next, { role: "assistant", content: ERRORS[data.error] || ERRORS.default, error: true }]);
      } else {
        setMessages([...next, { role: "assistant", content: data.reply }]);
      }
    } catch {
      setMessages([...next, { role: "assistant", content: ERRORS.default, error: true }]);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    send(input);
  }

  return (
    <div className="chatbot">
      {open && (
        <section className="chat-panel" role="dialog" aria-label="Chat with Aqdar's assistant">
          <header className="chat-header">
            <div>
              <strong>Ask about Aqdar</strong>
              <span>AI assistant · اسألني عن أقدار</span>
            </div>
            <button type="button" className="chat-close" onClick={() => setOpen(false)} aria-label="Close chat">
              <X size={20} />
            </button>
          </header>

          <div className="chat-messages" ref={listRef} aria-live="polite">
            <p className="chat-msg chat-bot" dir="auto">{GREETING}</p>
            {messages.length === 0 && (
              <div className="chat-suggestions">
                {SUGGESTIONS.map((s) => (
                  <button type="button" key={s} dir="auto" onClick={() => send(s)}>
                    {s}
                  </button>
                ))}
              </div>
            )}
            {messages.map((m, i) => (
              <p
                key={i}
                dir="auto"
                className={`chat-msg ${m.role === "user" ? "chat-user" : "chat-bot"}${m.error ? " chat-error" : ""}`}
              >
                {m.content}
              </p>
            ))}
            {loading && (
              <p className="chat-msg chat-bot chat-typing" aria-label="Typing">
                <i /><i /><i />
              </p>
            )}
          </div>

          <form className="chat-form" onSubmit={onSubmit}>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message · اكتب رسالتك"
              maxLength={500}
              dir="auto"
              aria-label="Your message"
            />
            <button type="submit" disabled={loading || !input.trim()} aria-label="Send">
              <Send size={18} />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        className="chat-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
      >
        {open ? <X size={26} /> : <MessageCircle size={26} />}
      </button>
    </div>
  );
}
