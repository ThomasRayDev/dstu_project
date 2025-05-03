import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import Project from './pages/Project';

import ProtectedRoute from './components/ProtectedRoute';
import EditProject from './pages/EditProject';
import { clearError } from './redux/slices/errorSlice';

function App() {
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();

  return (
    <>
      {error && (
        <div className="error">
          <div className="error-content">
            <span class="material-symbols-outlined">error</span>
            Ошибка: {error}
          </div>
          <span className="material-symbols-outlined" onClick={() => dispatch(clearError())}>
            close
          </span>
        </div>
      )}
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
          <Route path="/edit/:project_id" element={<EditProject />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
