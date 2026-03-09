import { useState, useRef, useEffect } from "react";

const SYSTEM_PROMPT = `You are Zarina, ArtWall O'zbekiston's AI art advisor — an elegant, knowledgeable assistant for the first AR-powered Uzbek art marketplace.

Your personality: Warm, cultured, passionate about Uzbek art. You speak like a gallery curator who truly loves art. Keep responses concise (2-4 sentences max) but rich.

You help users with:
1. FINDING ARTWORKS: Suggest artworks by mood, style, color, price, or room type. Available styles: Miniature, Oil Painting, Digital Art, Textile/Ikat, Ceramics, Contemporary.
2. UZBEK ART KNOWLEDGE: Explain Uzbek art history, techniques (miniature painting, ikat weaving, blue ceramics of Rishtan), famous artists, Silk Road influence.
3. AR TRY-ON GUIDANCE: Guide users to click "Try on Wall" on any artwork, upload a room photo or choose a sample room, then adjust size and placement.
4. ARTIST INFO: Share about featured artists — Aziza Karimova (miniature), Bobur Yusupov (digital abstract), Malika Rashidova (textile/silk).
5. BUYING GUIDANCE: Explain pricing (shown in UZS and USD), shipping to 30+ countries, authenticity certificates.

Always end with a subtle invitation to explore more or try AR.
If asked something unrelated to art/ArtWall, gently redirect back.

Start every first message by introducing yourself as Zarina.`;

const suggestedQuestions = [
  "Show me art under $200",
  "What is Uzbek miniature art?",
  "How does AR try-on work?",
  "Find art for my living room",
];

export default function ArtWallChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Salom! I'm Zarina, your personal art advisor at ArtWall O'zbekiston ✨ I can help you discover authentic Uzbek artworks, learn about our artists, or guide you through the AR try-on experience. What brings you here today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text) => {
    const userMessage = text || input.trim();
    if (!userMessage) return;

    setInput("");
    setShowSuggestions(false);
    setIsLoading(true);

    const newMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();
      const assistantMessage = data.content?.[0]?.text || "I'm having a moment — please try again!";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: assistantMessage },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I seem to have lost my connection to the gallery. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: "fixed",
          bottom: "100px",
          right: "24px",
          width: "380px",
          height: "520px",
          background: "#111008",
          border: "1px solid #C9A84C40",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          zIndex: 9999,
          boxShadow: "0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.1)",
          fontFamily: "'Georgia', serif",
          overflow: "hidden",
        }}>

          {/* Header */}
          <div style={{
            background: "linear-gradient(135deg, #1a1400 0%, #2a1f00 100%)",
            borderBottom: "1px solid #C9A84C30",
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}>
            <div style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #C9A84C, #8B6914)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              flexShrink: 0,
            }}>✦</div>
            <div>
              <div style={{ color: "#C9A84C", fontWeight: "bold", fontSize: "15px", letterSpacing: "0.5px" }}>
                Zarina
              </div>
              <div style={{ color: "#888", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase" }}>
                AI Art Advisor · ArtWall
              </div>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#4ade80" }} />
              <span style={{ color: "#4ade80", fontSize: "11px" }}>Online</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "#666",
                cursor: "pointer",
                fontSize: "20px",
                marginLeft: "8px",
                lineHeight: 1,
              }}
            >×</button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            scrollbarWidth: "thin",
            scrollbarColor: "#C9A84C20 transparent",
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                display: "flex",
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              }}>
                <div style={{
                  maxWidth: "80%",
                  padding: "10px 14px",
                  borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  background: msg.role === "user"
                    ? "linear-gradient(135deg, #C9A84C, #8B6914)"
                    : "#1e1a0e",
                  border: msg.role === "assistant" ? "1px solid #C9A84C20" : "none",
                  color: msg.role === "user" ? "#111" : "#e8d5a3",
                  fontSize: "13.5px",
                  lineHeight: "1.6",
                  fontFamily: "'Georgia', serif",
                }}>
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{
                  padding: "10px 16px",
                  borderRadius: "18px 18px 18px 4px",
                  background: "#1e1a0e",
                  border: "1px solid #C9A84C20",
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "#C9A84C",
                      animation: "pulse 1.2s ease-in-out infinite",
                      animationDelay: `${i * 0.2}s`,
                    }} />
                  ))}
                </div>
              </div>
            )}

            {/* Suggested questions */}
            {showSuggestions && messages.length === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "4px" }}>
                <div style={{ color: "#555", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase" }}>
                  Quick questions
                </div>
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(q)}
                    style={{
                      background: "transparent",
                      border: "1px solid #C9A84C30",
                      borderRadius: "20px",
                      padding: "7px 14px",
                      color: "#C9A84C",
                      fontSize: "12px",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.2s",
                      fontFamily: "'Georgia', serif",
                    }}
                    onMouseEnter={e => e.target.style.background = "#C9A84C15"}
                    onMouseLeave={e => e.target.style.background = "transparent"}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: "12px 16px",
            borderTop: "1px solid #C9A84C20",
            background: "#0d0b04",
            display: "flex",
            gap: "8px",
            alignItems: "center",
          }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about art, artists, AR try-on..."
              style={{
                flex: 1,
                background: "#1a1400",
                border: "1px solid #C9A84C30",
                borderRadius: "24px",
                padding: "10px 16px",
                color: "#e8d5a3",
                fontSize: "13px",
                outline: "none",
                fontFamily: "'Georgia', serif",
              }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={isLoading || !input.trim()}
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                background: input.trim() ? "linear-gradient(135deg, #C9A84C, #8B6914)" : "#222",
                border: "none",
                cursor: input.trim() ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                transition: "all 0.2s",
                flexShrink: 0,
              }}
            >→</button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #C9A84C, #8B6914)",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          zIndex: 9999,
          boxShadow: "0 8px 32px rgba(201,168,76,0.4)",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.boxShadow = "0 12px 40px rgba(201,168,76,0.6)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 8px 32px rgba(201,168,76,0.4)";
        }}
      >
        {isOpen ? "✕" : "✦"}
      </button>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  );
}
