import { useEffect } from "react";
import { Bot, User, Send, Settings, AlertCircle } from "lucide-react";

export default function ChatPanel({
  messages,
  input,
  setInput,
  handleSend,
  loading,
  apiError,
  setShowConfig,
  apiKey,
  messagesEndRef,
}) {
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, messagesEndRef]);

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <h1>
          <Bot size={24} color="var(--accent)" /> AI CV Builder
        </h1>
        <button
          className="icon-btn"
          onClick={() => setShowConfig(true)}
          title="Settings"
        >
          <Settings size={20} />
        </button>
      </div>

      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.role}`}>
            <div className="avatar">
              {msg.role === "ai" ? <Bot size={20} /> : <User size={20} />}
            </div>
            <div className="bubble">{msg.content}</div>
          </div>
        ))}
        {loading && (
          <div className="message ai">
            <div className="avatar">
              <Bot size={20} />
            </div>
            <div className="bubble loading">Thinking...</div>
          </div>
        )}
        {apiError && (
          <div className="error-banner">
            <AlertCircle size={16} /> {apiError}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder={
            apiKey
              ? "Type your answer here..."
              : "Please configure API Key first"
          }
          disabled={!apiKey || loading}
        />
        <button
          className="send-button"
          onClick={handleSend}
          disabled={!input.trim() || !apiKey || loading}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
