import React, { useState, useEffect, useRef } from "react";
import { getAiResponse } from "../services/aiService";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import { Copy } from "lucide-react";

const Chat = ({ saveChat, activeChat }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(activeChat || []);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    setMessages(activeChat || []);
  }, [activeChat]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "You" };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");

    const aiResponse = await getAiResponse(input);
    const aiMessage = { text: aiResponse, sender: "Ai" };
    const finalMessages = [...updatedMessages, aiMessage];

    setMessages(finalMessages);
    saveChat(finalMessages);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#FED8B1]">
      <div className="p-4 text-center text-white bg-[#A67B5B] shadow-md text-xl font-bold">
        CodeMedic 🐔 
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}>
            <div className={`p-4 rounded-xl text-base max-w-sm break-words shadow-md ${msg.sender === "You" ? "bg-[#ECB176] text-white text-left" : "bg-gray-200 text-gray-900"}`}>
              
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkParse]}
                components={{
                  code({ inline, className, children, ...props }) {
                    return inline ? (
                      <code className="bg-gray-200 px-1 rounded" {...props}>
                        {children}
                      </code>
                    ) : (
                      <div className="relative">
                        <button
                          className="absolute top-2 right-2 text-gray-400 hover:text-white"
                          onClick={() => copyToClipboard(children)}
                        >
                          <Copy size={16} />
                        </button>
                        <pre className="bg-gray-800 text-white p-3 rounded-md overflow-auto">
                          <code {...props}>{children}</code>
                        </pre>
                      </div>
                    );
                  },
                }}
              >
                {`**${msg.sender}**:\n${msg.text}`}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      <div className="sticky bottom-0 bg-white p-3 shadow-lg flex">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message..." className="w-full px-4 py-3 border border-gray-300 rounded-l-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#ECB176]" />
        <button onClick={handleSend} className="px-6 py-3 bg-[#A67B5B] text-white font-semibold rounded-r-lg text-lg hover:bg-[#6F4E37] transition">Send</button>
      </div>
    </div>
  );
};

export default Chat;

