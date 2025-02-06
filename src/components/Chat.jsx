import React, { useState, useEffect, useRef } from "react";
import { getAiResponse } from "../services/aiService";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";

const Chat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "You" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const aiResponse = await getAiResponse(input);
    const aiMessage = { text: aiResponse, sender: "Ayam" };
    setMessages((prev) => [...prev, aiMessage]);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100">
      {/* Header */}
      <div className="p-4 text-center text-white bg-blue-600 shadow-md text-xl font-bold">
        AYAM 🐔 Chat
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "You" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-4 rounded-xl text-base max-w-sm break-words shadow-md ${
                msg.sender === "You"
                  ? "bg-blue-500 text-white text-left"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkParse, remarkStringify]}
                components={{
                  code({ inline, className, children, ...props }) {
                    return inline ? (
                      <code className="bg-gray-200 px-1 rounded" {...props}>
                        {children}
                      </code>
                    ) : (
                      <pre className="bg-gray-800 text-white p-2 rounded-md overflow-auto">
                        <code {...props}>{children}</code>
                      </pre>
                    );
                  },
                }}
              >
                {`**${msg.sender}**: \n${msg.text}`}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input Bar */}
      <div className="sticky bottom-0 bg-white p-3 shadow-lg flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="w-full px-4 py-3 border border-gray-300 rounded-l-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-r-lg text-lg hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
