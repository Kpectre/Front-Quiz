import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import Menue from "./components/Menue";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/menue/:name" element={<Menue />} />
      </Routes>
    </div>
  );
}

export default App;
