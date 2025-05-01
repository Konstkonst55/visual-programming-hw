import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import GenericPage from "./GenericPage";
import "./styles/App.css"
import Appbar from "./components/Appbar";

function App() {
  return (
    <div className="app-with-appbar">
      <Appbar></Appbar>
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/comments" />} />
          <Route path="/comments" element={<GenericPage endpoint="comments" />} />
          <Route path="/logs" element={<GenericPage endpoint="logs" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;