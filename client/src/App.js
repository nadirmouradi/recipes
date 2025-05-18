import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import CreateRecipePage from './pages/recipes/CreateRecipePage';
import RecipeList from './pages/recipes/RecipeList';
import RecipeDetailPage from './pages/recipes/RecipeDetailPage';
import { RecipesProvider } from './context/RecipesContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
      <RecipesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create-recipe" element={<ProtectedRoute><CreateRecipePage /></ProtectedRoute>} />
            <Route path="/recipes" element={<ProtectedRoute><RecipeList /></ProtectedRoute>} />
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/recipe/:id" element={<ProtectedRoute><RecipeDetailPage /></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </RecipesProvider>
    </AuthProvider>
  );
};

export default App;
