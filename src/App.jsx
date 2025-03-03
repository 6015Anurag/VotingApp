import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./Components/Admin";
import User from "./Components/user";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<User />} />
      </Routes>
    </Router>
  );
}

export default App;