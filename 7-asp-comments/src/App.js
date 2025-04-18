import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import GenericPage from "./GenericPage";
import "./styles/App.css"

function App() {
  return (
    <div className="app-with-appbar">
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/comments" />} />
          <Route path="/comments" element={<GenericPage endpoint="comments" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;