import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Metrics from "./pages/Metrics";
import Tracking from "./pages/Tracking";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/metrics" element={<Metrics />} />
        <Route path="/tracking" element={<Tracking />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;