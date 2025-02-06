import React, { useState, useEffect } from "react";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import { Menu } from "lucide-react";
import "./App.css";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [activeChat, setActiveChat] = useState([]);

  useEffect(() => {
    const storedChats = JSON.parse(localStorage.getItem("chatHistory")) || [];
    setChatHistory(storedChats);
  }, []);

  const saveChat = (messages) => {
    const updatedChatHistory = [...chatHistory, { title: `Chat ${chatHistory.length + 1}`, messages }];
    setChatHistory(updatedChatHistory);
    setActiveChat(messages);
    localStorage.setItem("chatHistory", JSON.stringify(updatedChatHistory));
  };

  const loadChat = (chat) => {
    setSidebarOpen(false);
    setActiveChat(chat.messages);
  };

  return (
    <div className="flex min-h-screen bg-[#FED8B1]">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} chatHistory={chatHistory} loadChat={loadChat} />
      <div className="flex-1 flex flex-col">
        <div className="lg:hidden p-4 bg-[#A67B5B] text-white flex justify-between">
          <h2 className="text-xl font-bold">Ayam Chat</h2>
          <button onClick={() => setSidebarOpen(true)} className="p-2">
            <Menu size={24} />
          </button>
        </div>
        <Chat saveChat={saveChat} activeChat={activeChat} />
      </div>
    </div>
  );
}

export default App;
