import React from "react"; // Add this line
import Chat from "./components/Chat";

import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {

  return (
    <>
      <div className="flex flex-col  min-h-screen pl-80 bg-gray-200">
      {/* <p className="text-xl font-bold text-gray-800 mb-6">AYAM 🐔</p> */}
      <Chat />
    </div>
    </>
  );
}

export default App;
