import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import Project from './pages/Project';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dev" element={<Project />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
