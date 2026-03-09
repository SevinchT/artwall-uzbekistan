import { useState, useRef, useEffect, KeyboardEvent, MouseEvent } from "react";
import { toast } from "sonner";

const suggestedQuestions = [
  "Show me art under $200",
  "What is Uzbek miniature art?",
  "How does AR try-on work?",
  "Find art for my living room",
];

interface Message {
  role: "user" | "assistant";
  content: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

export default function ArtWallChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Salom! I'm Zarina, your personal art advisor at ArtWall O'zbekiston ✨ I can help you discover authentic Uzbek artworks, learn about our artists, or guide you through the AR try-on experience. What brings you here today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const userMessage = text || input.trim();
    if (!userMessage) return;

    setInput("");
    setShowSuggestions(false);
    setIsLoading(true);

    const newMessages: Message[] = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);

    let assistantContent = "";

    try {
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok || !response.body) {
        if (response.status === 429) {
          toast.error("Rate limit exceeded. Please try again in a moment.");
        } else if (response.status === 402) {
          toast.error("AI credits exhausted.");
        }
        throw new Error("Failed to get response");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      // Add empty assistant message to start streaming into
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: "assistant", content: assistantContent };
                return updated;
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      if (!assistantContent) {
        setMessages((prev) => [
          ...prev.filter((m) => m.content !== ""),
          {
            role: "assistant",
            content: "I seem to have lost my connection to the gallery. Please try again in a moment.",
          },
        ]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSuggestionHover = (e: MouseEvent<HTMLButtonElement>, isEnter: boolean) => {
    e.currentTarget.style.background = isEnter ? "#C9A84C15" : "transparent";
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            right: "24px",
            width: "380px",
            maxWidth: "calc(100vw - 48px)",
            height: "520px",
            maxHeight: "calc(100vh - 140px)",
            background: "#111008",
            border: "1px solid #C9A84C40",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
            zIndex: 9999,
            boxShadow: "0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.1)",
            fontFamily: "'Inter', sans-serif",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #1a1400 0%, #2a1f00 100%)",
              borderBottom: "1px solid #C9A84C30",
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #C9A84C, #8B6914)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                flexShrink: 0,
              }}
            >
              ✦
            </div>
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
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              scrollbarWidth: "thin",
              scrollbarColor: "#C9A84C20 transparent",
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "80%",
                    padding: "10px 14px",
                    borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                    background: msg.role === "user" ? "linear-gradient(135deg, #C9A84C, #8B6914)" : "#1e1a0e",
                    border: msg.role === "assistant" ? "1px solid #C9A84C20" : "none",
                    color: msg.role === "user" ? "#111" : "#e8d5a3",
                    fontSize: "13.5px",
                    lineHeight: "1.6",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && messages[messages.length - 1]?.content === "" && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div
                  style={{
                    padding: "10px 16px",
                    borderRadius: "18px 18px 18px 4px",
                    background: "#1e1a0e",
                    border: "1px solid #C9A84C20",
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#C9A84C",
                        animation: "pulse 1.2s ease-in-out infinite",
                        animationDelay: `${i * 0.2}s`,
                      }}
                    />
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
                      fontFamily: "'Inter', sans-serif",
                    }}
                    onMouseEnter={(e) => handleSuggestionHover(e, true)}
                    onMouseLeave={(e) => handleSuggestionHover(e, false)}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: "12px 16px",
              borderTop: "1px solid #C9A84C20",
              background: "#0d0b04",
              display: "flex",
              gap: "8px",
              alignItems: "center",
            }}
          >
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
                fontFamily: "'Inter', sans-serif",
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
            >
              →
            </button>
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
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.boxShadow = "0 12px 40px rgba(201,168,76,0.6)";
        }}
        onMouseLeave={(e) => {
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