// ai.tsx
import React, { useState, useRef, useEffect } from "react";
import { sendMessageToGemini } from "../services/api";
import { getPageContent } from "../services/getPageContent";

export const Chatbot: React.FC = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<
    { from: "user" | "bot"; text: string }[]
  >([]);
  const [isOpen, setIsOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput("");
    setLoading(true);

    setMessages((prev) => [...prev, { from: "user", text: userMessage }]);

    try {
      const pageContent = getPageContent();
      const prompt = `Berikut adalah informasi dari halaman web:\n${pageContent}\nPertanyaan: ${userMessage}`;
      const res = await sendMessageToGemini(prompt);
      setMessages((prev) => [...prev, { from: "bot", text: res.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Maaf, terjadi kesalahan koneksi." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Tombol Floating */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-black text-white rounded-full w-16 h-16 flex items-center justify-center shadow-xl hover:bg-gray-800 transition-transform duration-200 ${
          isOpen ? "rotate-45" : ""
        }`}
      >
        💬
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="mt-3 w-96 h-[500px] bg-white border border-gray-200 rounded-xl shadow-2xl flex flex-col overflow-hidden font-sans">
          {/* Header */}
          <div className="bg-black p-3 text-white font-bold text-sm flex justify-between items-center">
            <span>Gemini Assistant</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white font-bold text-lg hover:text-gray-300"
            >
              ×
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] p-3 rounded-xl text-sm shadow-sm break-words ${
                    m.from === "user"
                      ? "bg-black text-white rounded-br-none"
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-500 text-xs p-2 rounded-lg animate-pulse">
                  Sedang mengetik...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-200 flex gap-2">
            <input
              type="text"
              className="flex-1 border border-gray-300 px-3 py-2 rounded-full focus:outline-none focus:ring-1 focus:ring-black text-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Tanya sesuatu..."
              disabled={loading}
            />
            <button
              className={`px-4 py-2 rounded-full text-white text-sm font-medium transition-colors ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:bg-gray-800"
              }`}
              onClick={handleSend}
              disabled={loading}
            >
              {loading ? "..." : "Kirim"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
