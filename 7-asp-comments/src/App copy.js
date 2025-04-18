import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import GenericPage from "./pages/GenericPage";
import Appbar from "./components/Appbar";
import "./styles/App.css"

function App() {
  return (
    <div className="app-with-appbar">
      <Appbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/comments" />} />
          <Route path="/comments" element={<GenericPage endpoint="comments" />} />
          <Route path="/posts" element={<GenericPage endpoint="posts" />} />
          <Route path="/albums" element={<GenericPage endpoint="albums" />} />
          <Route path="/todos" element={<GenericPage endpoint="todos" />} />
          <Route path="/users" element={<GenericPage endpoint="users" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;