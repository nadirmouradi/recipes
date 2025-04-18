import React from 'react';
import { BrowserRouter, Route ,Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
          />

        </Routes>
    </BrowserRouter>
  );
};

export default App;
