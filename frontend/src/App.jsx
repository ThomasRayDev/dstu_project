import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { store } from './redux/store';
import { Provider } from 'react-redux';

import Login from './pages/Login';
import Home from './pages/Home';
import Project from './pages/Project';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dev" element={<Project />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
