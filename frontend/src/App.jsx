import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { store } from './redux/store';
import { Provider } from 'react-redux';

import Login from './pages/Login';
import Home from './pages/Home';
import Project from './pages/Project';

import ProtectedRoute from './components/ProtectedRoute';
import EditProject from './pages/EditProject';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/project/:project_id"
            element={
              <ProtectedRoute>
                <Project />
              </ProtectedRoute>
            }
          />
          <Route path="/dev" element={<EditProject />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
