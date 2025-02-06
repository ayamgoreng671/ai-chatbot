import React from "react";
import { X } from "lucide-react";

const Sidebar = ({ sidebarOpen, setSidebarOpen, chatHistory, loadChat }) => {
  return (
    <div className={`fixed lg:relative lg:translate-x-0 w-64 h-screen bg-[#6F4E37] text-white p-5 transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:block`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">CodeMedic 🐔</h2>
        <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2">
          <X size={24} />
        </button>
      </div>

      <nav className="space-y-3 overflow-y-auto max-h-[80vh]">
        {chatHistory.length === 0 ? (
          <p className="text-gray-300">No previous chats</p>
        ) : (
          chatHistory.map((chat, index) => (
            <button key={index} onClick={() => loadChat(chat)} className="block w-full text-left p-3 bg-[#A67B5B] rounded hover:bg-[#ECB176] transition">
              {chat.title || `Chat ${index + 1}`}
            </button>
          ))
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
